#!/usr/bin/env python3
"""Live production verification for the P12 performance optimization deployment."""
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
DEPLOYMENT_URL = os.environ.get('P12_DEPLOYMENT_URL', 'https://3603313e.palcalculator.pages.dev')
ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
RESULTS = ROOT / 'artifacts' / 'p12-live-results.json'
SCREENSHOT = Path('/tmp/p12-route-mobile-live-390.png')

REPRESENTATIVE_GUIDE = '/guides/how-to-breed-lyleen-palworld/'
ROUTES = [
    '/',
    '/breeding-route-calculator/',
    '/breeding-route-calculator/?target=anubis&maxGen=3',
    REPRESENTATIVE_GUIDE,
]
FORBIDDEN_TERMS = ['official', 'guaranteed', '100% accurate', 'exact odds', 'cheat', 'bypass', 'complete wiki']
HEADERS = {
    'User-Agent': 'Hermes-PalCalculator-P12-Live-Verification/1.0',
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


def soup_for(path: str) -> tuple[requests.Response, BeautifulSoup]:
    resp = fetch(path)
    return resp, BeautifulSoup(resp.text, 'html.parser')


def canonical(soup: BeautifulSoup) -> str | None:
    tag = soup.find('link', rel='canonical')
    value = tag.get('href') if tag else None
    return value if isinstance(value, str) else None


def robots_meta(soup: BeautifulSoup) -> str | None:
    tag = soup.find('meta', attrs={'name': 'robots'})
    value = tag.get('content') if tag else None
    return value if isinstance(value, str) else None


def local_asset_names() -> list[str]:
    assets = DIST / 'assets'
    return sorted(
        p.name
        for p in assets.iterdir()
        if p.is_file() and p.suffix in {'.js', '.css'} and not p.name.endswith('.map')
    )


def page_summary(path: str, expected_canonical: str, expected_robots: str) -> dict[str, Any]:
    resp, soup = soup_for(path)
    title = soup.find('title')
    h1 = soup.find('h1')
    canon = canonical(soup)
    robots = robots_meta(soup)
    return {
        'path': path,
        'status_code': resp.status_code,
        'final_url': resp.url,
        'title': title.get_text(strip=True) if title else None,
        'h1': h1.get_text(strip=True) if h1 else None,
        'canonical': canon,
        'canonical_ok': canon == expected_canonical,
        'robots': robots,
        'robots_ok': robots == expected_robots,
        'ok': resp.status_code == 200 and canon == expected_canonical and robots == expected_robots,
    }


def static_checks() -> dict[str, Any]:
    production_home = fetch('/')
    deployment_home = fetch(DEPLOYMENT_URL)
    home_html = production_home.text
    live_assets = sorted(set(Path(p).name for p in re.findall(r'(?:src|href)="/assets/([^"]+\.(?:js|css))"', home_html)))
    dist_assets = local_asset_names()

    pages = {
        'home': page_summary('/', BASE + '/', 'index,follow'),
        'route_solver': page_summary('/breeding-route-calculator/', BASE + '/breeding-route-calculator/', 'index,follow'),
        # Query-state noindex is applied by the hydrated browser app; the static shell remains index,follow.
        # browser_checks() verifies the runtime noindex/canonical behavior for this query URL.
        'route_query_static_shell': page_summary('/breeding-route-calculator/?target=anubis&maxGen=3', BASE + '/breeding-route-calculator/', 'index,follow'),
        'representative_guide': page_summary(REPRESENTATIVE_GUIDE, BASE + REPRESENTATIVE_GUIDE, 'index,follow'),
    }

    sitemap = fetch('/sitemap.xml')
    robots = fetch('/robots.txt')
    sitemap_locs = re.findall(r'<loc>(.*?)</loc>', sitemap.text)
    guide_resp = fetch(REPRESENTATIVE_GUIDE)
    forbidden_matches = [term for term in FORBIDDEN_TERMS if term in guide_resp.text.lower()]

    return {
        'checked_at': datetime.now(timezone.utc).isoformat(),
        'base': BASE,
        'deployment_url': DEPLOYMENT_URL,
        'production_home_status_code': production_home.status_code,
        'deployment_url_status_code': deployment_home.status_code,
        'dist_assets': dist_assets,
        'live_assets': live_assets,
        'live_assets_match_dist': all(asset in live_assets for asset in dist_assets),
        'pages': pages,
        'pages_ok': all(page['ok'] for page in pages.values()),
        'sitemap_status_code': sitemap.status_code,
        'sitemap_url_count': len(sitemap_locs),
        'sitemap_urls': sitemap_locs,
        'sitemap_ok': sitemap.status_code == 200
        and len(sitemap_locs) == 29
        and f'{BASE}{REPRESENTATIVE_GUIDE}' in sitemap_locs
        and f'{BASE}/breeding-route-calculator/' in sitemap_locs
        and not any('?' in url for url in sitemap_locs)
        and not any('/share/' in url for url in sitemap_locs),
        'robots_status_code': robots.status_code,
        'robots_text': robots.text,
        'robots_ok': robots.status_code == 200
        and 'Allow: /' in robots.text
        and 'Disallow: /share/' in robots.text
        and 'Sitemap: https://palcalculator.com/sitemap.xml' in robots.text,
        'representative_guide_forbidden_matches': forbidden_matches,
        'representative_guide_safe': not forbidden_matches,
    }


def browser_checks() -> dict[str, Any]:
    from playwright.sync_api import sync_playwright

    console_errors: dict[str, list[str]] = {path: [] for path in ROUTES}
    with sync_playwright() as p:
        chrome = shutil.which('google-chrome') or shutil.which('chromium') or shutil.which('chromium-browser')
        launch_kwargs: dict[str, Any] = {'headless': True}
        if chrome:
            launch_kwargs['executable_path'] = chrome
        browser = p.chromium.launch(**launch_kwargs)

        # Browser console smoke on homepage, route solver query/share URL, and representative guide.
        for route in ROUTES:
            page = browser.new_page(user_agent=HEADERS['User-Agent'], viewport={'width': 1280, 'height': 900})
            page.on('console', lambda msg, route=route: console_errors[route].append(msg.text) if msg.type == 'error' else None)
            page.on('pageerror', lambda exc, route=route: console_errors[route].append(str(exc)))
            page.goto(BASE + route, wait_until='networkidle', timeout=45000)
            page.locator('main').inner_text(timeout=10000)
            page.close()

        # 390px mobile smoke and route/share privacy flow.
        page = browser.new_page(user_agent=HEADERS['User-Agent'], viewport={'width': 390, 'height': 844}, is_mobile=True)
        mobile_console_errors: list[str] = []
        page.on('console', lambda msg: mobile_console_errors.append(msg.text) if msg.type == 'error' else None)
        page.on('pageerror', lambda exc: mobile_console_errors.append(str(exc)))
        page.goto(BASE + '/breeding-route-calculator/?target=anubis&maxGen=3', wait_until='networkidle', timeout=45000)
        page.screenshot(path=str(SCREENSHOT), full_page=False)
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
        text = page.locator('main').inner_text(timeout=10000)
        route_query_hydrated = 'Anubis' in text and ('Route unavailable' in text or 'Route found' in text)
        share = page.get_by_role('link', name=re.compile('Open share URL', re.I)).get_attribute('href') or ''
        share_privacy_ok = 'target=anubis' in share.lower() and 'maxGen=3' in share and 'owned' not in share.lower()
        query_canonical = page.locator('link[rel="canonical"]').get_attribute('href')
        query_robots = page.locator('meta[name="robots"]').get_attribute('content')
        page.close()
        browser.close()

    console_clean = all(not errors for errors in console_errors.values()) and not mobile_console_errors
    mobile_ok = (
        mobile_metrics['scrollWidth'] == mobile_metrics['clientWidth']
        and mobile_metrics['bodyScrollWidth'] == mobile_metrics['clientWidth']
        and mobile_metrics['overflowingCount'] == 0
    )
    return {
        'routes_checked': ROUTES,
        'console_errors': console_errors,
        'mobile_console_errors': mobile_console_errors,
        'console_clean': console_clean,
        'mobile_screenshot': str(SCREENSHOT),
        'mobile_metrics': mobile_metrics,
        'mobile_ok': mobile_ok,
        'route_query_hydrated': route_query_hydrated,
        'share_href': share,
        'share_privacy_ok': share_privacy_ok,
        'query_canonical': query_canonical,
        'query_robots': query_robots,
        'query_meta_ok': query_canonical == BASE + '/breeding-route-calculator/' and query_robots == 'noindex,follow',
        'ok': console_clean and mobile_ok and route_query_hydrated and share_privacy_ok and query_canonical == BASE + '/breeding-route-calculator/' and query_robots == 'noindex,follow',
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
        result['representative_guide_safe'],
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
        'representative_guide_safe': result['representative_guide_safe'],
        'browser_ok': isinstance(result['browser_checks'], dict) and result['browser_checks'].get('ok') is True,
    }, indent=2))
    if not result['ok']:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
