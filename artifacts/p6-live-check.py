#!/usr/bin/env python3
"""Live production verification for the P6 SEO guide pages deployment."""
from __future__ import annotations

import json
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
DEPLOYMENT_URL = 'https://a3f4b9fd.palcalculator.pages.dev'
ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
RESULTS = ROOT / 'artifacts' / 'p6-live-results.json'

ROUTES = [
    '/guides/palworld-breeding-faq/',
    '/guides/how-to-breed-orserk-palworld/',
    '/guides/how-to-breed-shadowbeak-palworld/',
    '/guides/palworld-breeding-with-owned-pals/',
    '/guides/best-palworld-breeding-combos/',
    '/guides/palworld-base-worker-passives/',
]

HEADERS = {
    'User-Agent': 'Hermes-PalCalculator-P6-Live-Verification/1.0',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
}


def fetch(path_or_url: str) -> requests.Response:
    url = path_or_url if path_or_url.startswith('http') else urljoin(BASE, path_or_url)
    last_exc: Exception | None = None
    resp: requests.Response | None = None
    for _ in range(12):
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


def faq_count(json_ld: list[Any]) -> int:
    for item in json_ld:
        if isinstance(item, dict) and item.get('@type') == 'FAQPage':
            entity = item.get('mainEntity')
            if isinstance(entity, list):
                return len(entity)
    return 0


def page_check(route: str) -> dict[str, object]:
    resp = fetch(route)
    text = resp.text
    soup = BeautifulSoup(text, 'html.parser')
    canonical = soup.find('link', rel='canonical')
    robots = soup.find('meta', attrs={'name': 'robots'})
    title = soup.find('title')
    h1 = soup.find('h1')
    json_ld = parse_json_ld(soup)
    types = schema_types(json_ld)
    expected = f'{BASE}{route}'
    visible_text = soup.get_text(' ', strip=True)
    article_url_ok = any(isinstance(item, dict) and item.get('@type') == 'TechArticle' and item.get('url') == expected for item in json_ld)
    return {
        'route': route,
        'url': expected,
        'status_code': resp.status_code,
        'final_url': resp.url,
        'bytes': len(resp.content),
        'title': title.get_text(strip=True) if title else None,
        'h1': h1.get_text(strip=True) if h1 else None,
        'canonical': canonical.get('href') if canonical else None,
        'canonical_ok': bool(canonical and canonical.get('href') == expected),
        'robots': robots.get('content') if robots else None,
        'robots_ok': bool(robots and robots.get('content') == 'index,follow'),
        'visible_unofficial_caveat': 'unofficial fan-made' in visible_text.lower(),
        'data_sources_link': '/data-sources/' in text,
        'schema_types': sorted(types),
        'faq_count': faq_count(json_ld),
        'faq_schema_ok': 'FAQPage' in types and faq_count(json_ld) >= 7,
        'tech_article_schema_ok': 'TechArticle' in types and article_url_ok,
        'ok': resp.status_code == 200
            and bool(canonical and canonical.get('href') == expected)
            and bool(robots and robots.get('content') == 'index,follow')
            and 'unofficial fan-made' in visible_text.lower()
            and '/data-sources/' in text
            and 'FAQPage' in types
            and faq_count(json_ld) >= 7
            and 'TechArticle' in types
            and article_url_ok,
    }


def static_checks() -> dict[str, object]:
    production_home = fetch('/')
    deployment_home = fetch(DEPLOYMENT_URL)
    html = production_home.text
    script_paths = re.findall(r'<script[^>]+src="([^"]+index-[^"]+\.js)"', html)
    css_paths = re.findall(r'<link[^>]+href="([^"]+index-[^"]+\.css)"', html)
    dist_assets = local_asset_names()
    live_assets = [Path(p).name for p in script_paths + css_paths]

    pages = [page_check(route) for route in ROUTES]
    sitemap = fetch('/sitemap.xml')
    robots = fetch('/robots.txt')
    sitemap_locs = re.findall(r'<loc>(.*?)</loc>', sitemap.text)
    expected_urls = [f'{BASE}{route}' for route in ROUTES]

    return {
        'checked_at': datetime.now(timezone.utc).isoformat(),
        'base': BASE,
        'deployment_url': DEPLOYMENT_URL,
        'production_home_status_code': production_home.status_code,
        'deployment_url_status_code': deployment_home.status_code,
        'dist_assets': dist_assets,
        'live_assets': live_assets,
        'live_assets_match_dist': all(asset in live_assets for asset in dist_assets),
        'page_results': pages,
        'pages_ok': all(bool(p['ok']) for p in pages),
        'sitemap_status_code': sitemap.status_code,
        'sitemap_url_count': len(sitemap_locs),
        'sitemap_urls': sitemap_locs,
        'sitemap_ok': sitemap.status_code == 200 and len(sitemap_locs) == 24 and all(url in sitemap_locs for url in expected_urls),
        'robots_status_code': robots.status_code,
        'robots_text': robots.text,
        'robots_ok': robots.status_code == 200 and 'Allow: /' in robots.text and 'Disallow: /share/' in robots.text and 'Sitemap: https://palcalculator.com/sitemap.xml' in robots.text,
    }


def browser_checks() -> dict[str, object]:
    from playwright.sync_api import sync_playwright

    console_errors: list[str] = []
    route = ROUTES[0]
    with sync_playwright() as p:
        chrome = shutil.which('google-chrome') or shutil.which('chromium') or shutil.which('chromium-browser')
        if chrome:
            browser = p.chromium.launch(headless=True, executable_path=chrome)
        else:
            browser = p.chromium.launch(headless=True)
        page = browser.new_page(user_agent=HEADERS['User-Agent'], viewport={'width': 390, 'height': 844}, is_mobile=True)
        page.on('console', lambda msg: console_errors.append(msg.text) if msg.type == 'error' else None)
        page.on('pageerror', lambda exc: console_errors.append(str(exc)))
        page.goto(BASE + route, wait_until='networkidle', timeout=30000)
        title = page.title()
        h1_visible = page.get_by_role('heading', name='Palworld Breeding FAQ').first.is_visible()
        caveat_visible = page.get_by_text('unofficial fan-made', exact=False).first.is_visible()
        canonical = page.locator('link[rel="canonical"]').get_attribute('href')
        robots = page.locator('meta[name="robots"]').get_attribute('content')
        metrics = page.evaluate("""() => ({
            innerWidth: window.innerWidth,
            clientWidth: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
            bodyScrollWidth: document.body.scrollWidth,
            overflowingCount: Array.from(document.querySelectorAll('body *')).filter((el) => {
                const rect = el.getBoundingClientRect();
                return rect.width > 0 && (rect.right > window.innerWidth + 1 || rect.left < -1);
            }).length,
        })""")
        browser.close()

    return {
        'route': route,
        'title': title,
        'h1_visible': h1_visible,
        'caveat_visible': caveat_visible,
        'canonical': canonical,
        'robots': robots,
        'mobile_metrics': metrics,
        'console_errors': console_errors,
        'ok': title == 'Palworld Breeding FAQ'
            and h1_visible
            and caveat_visible
            and canonical == BASE + route
            and robots == 'index,follow'
            and not console_errors
            and metrics['scrollWidth'] == metrics['clientWidth']
            and metrics['bodyScrollWidth'] == metrics['clientWidth']
            and metrics['overflowingCount'] == 0,
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
        result['live_assets_match_dist'],
        result['pages_ok'],
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
        'pages_ok': result['pages_ok'],
        'sitemap_url_count': result['sitemap_url_count'],
        'sitemap_ok': result['sitemap_ok'],
        'robots_ok': result['robots_ok'],
        'browser_ok': isinstance(result['browser_checks'], dict) and result['browser_checks'].get('ok') is True,
    }, indent=2))
    if not result['ok']:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
