#!/usr/bin/env python3
"""Live production verification for the P11 route solver and SEO pages deployment."""
from __future__ import annotations

import json
import os
import re
import shutil
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

BASE = 'https://palcalculator.com'
DEPLOYMENT_URL = os.environ.get('P11_DEPLOYMENT_URL', 'https://9aec368d.palcalculator.pages.dev')
ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
RESULTS = ROOT / 'artifacts' / 'p11-live-results.json'
SCREENSHOT = Path('/tmp/p11-route-mobile-live-390.png')

P11_GUIDE_ROUTES = [
    '/guides/how-to-breed-blazamut-palworld/',
    '/guides/how-to-breed-astegon-palworld/',
    '/guides/how-to-breed-grizzbolt-palworld/',
    '/guides/how-to-breed-lyleen-palworld/',
    '/guides/palworld-breeding-path-finder/',
]
REPRESENTATIVE_ROUTES = [
    '/',
    '/breeding-route-calculator/',
    '/breeding-route-calculator/?target=anubis&maxGen=2',
    *P11_GUIDE_ROUTES,
]
FORBIDDEN_TERMS = ['official', 'guaranteed', '100% accurate', 'exact odds', 'cheat', 'bypass', 'complete wiki']
HEADERS = {
    'User-Agent': 'Hermes-PalCalculator-P11-Live-Verification/1.0',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
}


def fetch(path_or_url: str) -> requests.Response:
    url = path_or_url if path_or_url.startswith('http') else urljoin(BASE, path_or_url)
    last_exc: Exception | None = None
    resp: requests.Response | None = None
    for _ in range(18):
        try:
            resp = requests.get(url, headers=HEADERS, timeout=20, allow_redirects=True)
            if resp.status_code < 500:
                return resp
        except Exception as exc:  # pragma: no cover - diagnostic script
            last_exc = exc
        time.sleep(5)
    if last_exc:
        raise last_exc
    if resp is None:
        raise RuntimeError(f'No response while fetching {url}')
    return resp


def local_asset_names() -> list[str]:
    assets = DIST / 'assets'
    return sorted(p.name for p in assets.glob('index-*.*') if p.suffix in {'.js', '.css'})


def parse_json_ld(soup: BeautifulSoup) -> list[Any]:
    values: list[Any] = []
    for tag in soup.find_all('script', attrs={'type': 'application/ld+json'}):
        try:
            values.append(json.loads(tag.string or tag.text or ''))
        except json.JSONDecodeError:
            values.append({'parse_error': tag.string or tag.text or ''})
    return values


def schema_types(json_ld: list[Any]) -> set[str]:
    found: set[str] = set()
    for item in json_ld:
        if isinstance(item, dict):
            value = item.get('@type')
            if isinstance(value, str):
                found.add(value)
            elif isinstance(value, list):
                found.update(v for v in value if isinstance(v, str))
    return found


def meta_description(soup: BeautifulSoup) -> str:
    tag = soup.find('meta', attrs={'name': 'description'})
    return tag.get('content', '') if tag else ''


def faq_count(json_ld: list[Any]) -> int:
    for item in json_ld:
        if isinstance(item, dict) and item.get('@type') == 'FAQPage':
            entity = item.get('mainEntity')
            if isinstance(entity, list):
                return len(entity)
    return 0


def guide_check(route: str) -> dict[str, object]:
    resp = fetch(route)
    text = resp.text
    soup = BeautifulSoup(text, 'html.parser')
    canonical = soup.find('link', rel='canonical')
    robots = soup.find('meta', attrs={'name': 'robots'})
    json_ld = parse_json_ld(soup)
    types = schema_types(json_ld)
    expected = f'{BASE}{route}'
    description = meta_description(soup)
    lower = text.lower()
    forbidden_matches = [term for term in FORBIDDEN_TERMS if term in lower]
    article_url_ok = any(isinstance(item, dict) and item.get('@type') == 'TechArticle' and item.get('url') == expected for item in json_ld)
    return {
        'route': route,
        'status_code': resp.status_code,
        'final_url': resp.url,
        'description_length': len(description),
        'canonical': canonical.get('href') if canonical else None,
        'canonical_ok': bool(canonical and canonical.get('href') == expected),
        'robots': robots.get('content') if robots else None,
        'robots_ok': bool(robots and robots.get('content') == 'index,follow'),
        'schema_types': sorted(types),
        'faq_count': faq_count(json_ld),
        'faq_schema_ok': 'FAQPage' in types and faq_count(json_ld) >= 3,
        'tech_article_schema_ok': 'TechArticle' in types and article_url_ok,
        'data_sources_link': '/data-sources/' in text,
        'forbidden_matches': forbidden_matches,
        'ok': resp.status_code == 200
            and bool(canonical and canonical.get('href') == expected)
            and bool(robots and robots.get('content') == 'index,follow')
            and 140 <= len(description) <= 160
            and '/data-sources/' in text
            and 'FAQPage' in types
            and 'TechArticle' in types
            and article_url_ok
            and not forbidden_matches,
    }


def static_checks() -> dict[str, object]:
    production_home = fetch('/')
    deployment_home = fetch(DEPLOYMENT_URL)
    route_home = fetch('/breeding-route-calculator/')
    route_query = fetch('/breeding-route-calculator/?target=anubis&maxGen=2')
    html = production_home.text
    script_paths = re.findall(r'<script[^>]+src="([^"]+index-[^"]+\.js)"', html)
    css_paths = re.findall(r'<link[^>]+href="([^"]+index-[^"]+\.css)"', html)
    dist_assets = local_asset_names()
    live_assets = [Path(p).name for p in script_paths + css_paths]
    pages = [guide_check(route) for route in P11_GUIDE_ROUTES]
    sitemap = fetch('/sitemap.xml')
    robots = fetch('/robots.txt')
    sitemap_locs = re.findall(r'<loc>(.*?)</loc>', sitemap.text)
    representative_statuses = {route: fetch(route).status_code for route in REPRESENTATIVE_ROUTES}
    return {
        'checked_at': datetime.now(timezone.utc).isoformat(),
        'base': BASE,
        'deployment_url': DEPLOYMENT_URL,
        'production_home_status_code': production_home.status_code,
        'deployment_url_status_code': deployment_home.status_code,
        'route_home_status_code': route_home.status_code,
        'route_query_status_code': route_query.status_code,
        'dist_assets': dist_assets,
        'live_assets': live_assets,
        'live_assets_match_dist': all(asset in live_assets for asset in dist_assets),
        'representative_statuses': representative_statuses,
        'representative_statuses_ok': all(code == 200 for code in representative_statuses.values()),
        'guide_results': pages,
        'guides_ok': all(bool(p['ok']) for p in pages),
        'sitemap_status_code': sitemap.status_code,
        'sitemap_url_count': len(sitemap_locs),
        'sitemap_urls': sitemap_locs,
        'sitemap_has_query': any('?' in url for url in sitemap_locs),
        'sitemap_has_share': any('/share/' in url for url in sitemap_locs),
        'sitemap_ok': sitemap.status_code == 200
            and len(sitemap_locs) == 29
            and all(f'{BASE}{route}' in sitemap_locs for route in P11_GUIDE_ROUTES)
            and not any('?' in url for url in sitemap_locs)
            and not any('/share/' in url for url in sitemap_locs),
        'robots_status_code': robots.status_code,
        'robots_text': robots.text,
        'robots_ok': robots.status_code == 200
            and 'Allow: /' in robots.text
            and 'Disallow: /share/' in robots.text
            and 'Sitemap: https://palcalculator.com/sitemap.xml' in robots.text,
    }


def browser_checks() -> dict[str, object]:
    from playwright.sync_api import sync_playwright

    console_errors: list[str] = []
    with sync_playwright() as p:
        chrome = shutil.which('google-chrome') or shutil.which('chromium') or shutil.which('chromium-browser')
        launch_kwargs = {'headless': True}
        if chrome:
            launch_kwargs['executable_path'] = chrome
        browser = p.chromium.launch(**launch_kwargs)
        page = browser.new_page(user_agent=HEADERS['User-Agent'], viewport={'width': 390, 'height': 844}, is_mobile=True)
        page.on('console', lambda msg: console_errors.append(msg.text) if msg.type == 'error' else None)
        page.on('pageerror', lambda exc: console_errors.append(str(exc)))
        page.goto(BASE + '/breeding-route-calculator/', wait_until='networkidle', timeout=45000)
        mobile_metrics = page.evaluate("""() => ({
            innerWidth: window.innerWidth,
            clientWidth: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
            bodyScrollWidth: document.body.scrollWidth,
            overflowingCount: Array.from(document.querySelectorAll('body *')).filter((el) => {
                const rect = el.getBoundingClientRect();
                return rect.width > 0 && (rect.right > window.innerWidth + 1 || rect.left < -1);
            }).length,
        })""")
        page.screenshot(path=str(SCREENSHOT), full_page=False)

        target = page.get_by_label(re.compile('Target Pal', re.I))
        max_gen = page.get_by_label(re.compile('Max generations', re.I))
        owned = page.get_by_label(re.compile('Owned Pals .*route input', re.I))

        target.fill('Sibelyx')
        max_gen.fill('1')
        owned.fill('Penking, Bushi')
        page.wait_for_timeout(800)
        direct_text = page.locator('main').inner_text(timeout=10000)
        direct_ok = 'Route found to Sibelyx' in direct_text and '1 generation' in direct_text and 'Bushi' in direct_text and 'Penking' in direct_text

        target.fill('Caprity Noct')
        max_gen.fill('2')
        owned.fill('Penking, Bushi')
        page.wait_for_timeout(800)
        multi_text = page.locator('main').inner_text(timeout=10000)
        multi_ok = 'Route found to Caprity Noct' in multi_text and '2 generation' in multi_text and 'Sibelyx' in multi_text

        target.fill('Anubis')
        max_gen.fill('2')
        owned.fill('Penking, Bushi')
        page.wait_for_timeout(800)
        missing_text = page.locator('main').inner_text(timeout=10000)
        missing_ok = 'Route unavailable' in missing_text and 'NO_ROUTE_WITHIN_CONSTRAINTS' in missing_text

        share = page.get_by_role('link', name=re.compile('Open share URL', re.I)).get_attribute('href') or ''
        share_privacy_ok = 'target=anubis' in share.lower() and 'maxGen=2' in share and 'Penking' not in share and 'Bushi' not in share
        canonical = page.locator('link[rel="canonical"]').get_attribute('href')
        robots = page.locator('meta[name="robots"]').get_attribute('content')
        browser.close()

    return {
        'route': '/breeding-route-calculator/',
        'screenshot': str(SCREENSHOT),
        'mobile_metrics': mobile_metrics,
        'direct_route_ok': direct_ok,
        'multi_generation_route_ok': multi_ok,
        'missing_route_ok': missing_ok,
        'share_href': share,
        'share_privacy_ok': share_privacy_ok,
        'canonical': canonical,
        'robots': robots,
        'console_errors': console_errors,
        'ok': direct_ok
            and multi_ok
            and missing_ok
            and share_privacy_ok
            and canonical == BASE + '/breeding-route-calculator/'
            and robots == 'index,follow'
            and not console_errors
            and mobile_metrics['scrollWidth'] == mobile_metrics['clientWidth']
            and mobile_metrics['bodyScrollWidth'] == mobile_metrics['clientWidth']
            and mobile_metrics['overflowingCount'] == 0,
    }


def main() -> None:
    result = static_checks()
    try:
        result['browser_checks'] = browser_checks()
    except Exception as exc:
        result['browser_checks'] = {'error': repr(exc), 'ok': False}
    result['ok'] = all([
        result['production_home_status_code'] == 200,
        result['deployment_url_status_code'] == 200,
        result['route_home_status_code'] == 200,
        result['route_query_status_code'] == 200,
        result['live_assets_match_dist'],
        result['representative_statuses_ok'],
        result['guides_ok'],
        result['sitemap_ok'],
        result['robots_ok'],
        isinstance(result['browser_checks'], dict) and result['browser_checks'].get('ok') is True,
    ])
    RESULTS.write_text(json.dumps(result, indent=2), encoding='utf-8')
    print(json.dumps({
        'ok': result['ok'],
        'results_path': str(RESULTS),
        'deployment_url': DEPLOYMENT_URL,
        'live_assets_match_dist': result['live_assets_match_dist'],
        'representative_statuses_ok': result['representative_statuses_ok'],
        'guides_ok': result['guides_ok'],
        'sitemap_url_count': result['sitemap_url_count'],
        'sitemap_ok': result['sitemap_ok'],
        'robots_ok': result['robots_ok'],
        'browser_ok': isinstance(result['browser_checks'], dict) and result['browser_checks'].get('ok') is True,
    }, indent=2))
    if not result['ok']:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
