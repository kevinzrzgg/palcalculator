#!/usr/bin/env python3
"""Live production verification for the P5 deployment."""
from __future__ import annotations

import json
import re
import shutil
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, cast
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

BASE = 'https://palcalculator.com'
DEPLOYMENT_URL = 'https://f73d408a.palcalculator.pages.dev'
ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
RESULTS = ROOT / 'artifacts' / 'p5-live-results.json'

ROUTES = [
    '/',
    '/breeding-route-calculator/',
    '/breeding-calculator/',
    '/privacy/',
    '/data-sources/',
    '/guides/palworld-breeding-combos/',
]

P5_BUNDLE_STRINGS = [
    'Browser-local owned Pal helper',
    'Stored only in this browser with localStorage',
    'No account, upload, backend sync, cookie identity, or raw owned-Pal analytics is added',
    'Use local list in route',
    'Clear local list',
    'palcalculator:owned-pals:v1',
    'owned_list_add',
    'owned_list_remove',
    'owned_list_clear',
    'owned_list_apply',
    'owned_count_bucket',
    'browser_local',
]

HEADERS = {
    'User-Agent': 'Hermes-PalCalculator-P5-Live-Verification/1.0',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
}


def fetch(path_or_url: str) -> requests.Response:
    url = path_or_url if path_or_url.startswith('http') else urljoin(BASE, path_or_url)
    last_exc: Exception | None = None
    resp: requests.Response | None = None
    for _ in range(8):
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


def page_check(route: str) -> dict[str, object]:
    resp = fetch(route)
    text = resp.text
    soup = BeautifulSoup(text, 'html.parser')
    canonical = soup.find('link', rel='canonical')
    robots = soup.find('meta', attrs={'name': 'robots'})
    icon_hrefs = [link.get('href') for link in soup.find_all('link') if 'icon' in (link.get('rel') or []) or link.get('rel') == ['apple-touch-icon']]
    expected = f'{BASE}{route}'
    return {
        'route': route,
        'status_code': resp.status_code,
        'final_url': resp.url,
        'canonical': canonical.get('href') if canonical else None,
        'canonical_ok': bool(canonical and canonical.get('href') == expected),
        'robots': robots.get('content') if robots else None,
        'robots_ok': bool(robots and robots.get('content') == 'index,follow'),
        'favicon_links': icon_hrefs,
        'favicon_ok': any(h in icon_hrefs for h in ['/favicon.ico', '/favicon.svg']) and '/apple-touch-icon.png' in icon_hrefs,
    }


def static_checks() -> dict[str, object]:
    production_home = fetch('/')
    deployment_home = fetch(DEPLOYMENT_URL)
    html = production_home.text
    script_paths = re.findall(r'<script[^>]+src="([^"]+index-[^"]+\.js)"', html)
    css_paths = re.findall(r'<link[^>]+href="([^"]+index-[^"]+\.css)"', html)
    bundle_text = ''
    bundle_status = []
    for script in script_paths:
        resp = fetch(script)
        bundle_status.append({'asset': script, 'status_code': resp.status_code, 'bytes': len(resp.content)})
        bundle_text += resp.text

    dist_assets = local_asset_names()
    live_assets = [Path(p).name for p in script_paths + css_paths]
    missing_bundle_strings = [s for s in P5_BUNDLE_STRINGS if s not in bundle_text]
    page_results = [page_check(route) for route in ROUTES]

    sitemap = fetch('/sitemap.xml')
    robots = fetch('/robots.txt')
    p5_unimplemented = fetch('/guides/how-to-breed-orserk-palworld/')
    sitemap_locs = re.findall(r'<loc>(.*?)</loc>', sitemap.text)

    return {
        'checked_at': datetime.now(timezone.utc).isoformat(),
        'base': BASE,
        'deployment_url': DEPLOYMENT_URL,
        'production_home_status_code': production_home.status_code,
        'deployment_url_status_code': deployment_home.status_code,
        'dist_assets': dist_assets,
        'live_assets': live_assets,
        'live_assets_match_dist': all(asset in live_assets for asset in dist_assets),
        'script_assets': script_paths,
        'css_assets': css_paths,
        'bundle_status': bundle_status,
        'missing_bundle_strings': missing_bundle_strings,
        'p5_bundle_ok': not missing_bundle_strings,
        'page_results': page_results,
        'pages_ok': all(p['status_code'] == 200 and p['canonical_ok'] and p['robots_ok'] and p['favicon_ok'] for p in page_results),
        'sitemap_status_code': sitemap.status_code,
        'sitemap_url_count': len(sitemap_locs),
        'sitemap_ok': sitemap.status_code == 200 and len(sitemap_locs) == 18 and all(f'{BASE}{route}' in sitemap_locs for route in ROUTES),
        'robots_status_code': robots.status_code,
        'robots_ok': robots.status_code == 200 and 'Allow: /' in robots.text and 'Disallow: /share/' in robots.text and 'Sitemap: https://palcalculator.com/sitemap.xml' in robots.text,
        'unimplemented_p5_copy_route': {
            'route': '/guides/how-to-breed-orserk-palworld/',
            'status_code': p5_unimplemented.status_code,
            'expected_status_code': 404,
            'ok': p5_unimplemented.status_code == 404,
        },
    }


def browser_checks() -> dict[str, object]:
    from playwright.sync_api import sync_playwright

    checks: dict[str, object] = {}
    console_errors: list[str] = []
    with sync_playwright() as p:
        chrome = shutil.which('google-chrome') or shutil.which('chromium') or shutil.which('chromium-browser')
        if chrome:
            browser = p.chromium.launch(headless=True, executable_path=chrome)
        else:
            browser = p.chromium.launch(headless=True)
        page = browser.new_page(user_agent=HEADERS['User-Agent'])
        page.on('console', lambda msg: console_errors.append(msg.text) if msg.type == 'error' else None)
        page.on('pageerror', lambda exc: console_errors.append(str(exc)))

        page.goto(BASE + '/', wait_until='networkidle', timeout=30000)
        for text in ['PalCalculator: Palworld Breeding, IV', 'How to use PalCalculator']:
            page.get_by_text(text, exact=False).first.wait_for(timeout=10000)
        checks['homepage_loads'] = 'PASS'

        page.goto(BASE + '/breeding-route-calculator/', wait_until='networkidle', timeout=30000)
        page.get_by_text('Browser-local owned Pal helper', exact=True).first.wait_for(timeout=10000)
        page.get_by_text('Stored only in this browser with localStorage', exact=False).first.wait_for(timeout=10000)
        page.get_by_label('Add an owned Pal').fill('Anubis')
        page.get_by_role('button', name='Add to browser-local list').click()
        page.get_by_text('Anubis added to your browser-local list.', exact=True).first.wait_for(timeout=10000)
        page.get_by_text('Anubis').first.wait_for(timeout=10000)
        page.get_by_role('button', name='Use local list in route').click()
        page.get_by_text('Applied 1 browser-local Pal(s) to the route calculator.', exact=True).first.wait_for(timeout=10000)
        page.get_by_text('Anubis already owned', exact=True).first.wait_for(timeout=10000)
        checks['owned_pal_helper_add_apply'] = 'PASS'

        page.goto(BASE + '/privacy/', wait_until='networkidle', timeout=30000)
        page.get_by_text('event payloads avoid raw inputs, share URLs, emails, IP addresses, tokens, and save data', exact=False).first.wait_for(timeout=10000)
        checks['privacy_payload_copy'] = 'PASS'

        browser.close()

    checks['console_errors'] = console_errors
    checks['console_ok'] = not console_errors
    return checks


def main() -> None:
    result = static_checks()
    try:
        result['browser_checks'] = browser_checks()
        result['browser_ok'] = all(v == 'PASS' for k, v in result['browser_checks'].items() if k not in {'console_errors', 'console_ok'}) and result['browser_checks']['console_ok']
    except Exception as exc:
        result['browser_checks'] = {'error': repr(exc)}
        result['browser_ok'] = False
    unimplemented_p5_copy_route = cast(dict[str, Any], result['unimplemented_p5_copy_route'])
    result['ok'] = all([
        result['production_home_status_code'] == 200,
        result['deployment_url_status_code'] == 200,
        result['live_assets_match_dist'],
        result['p5_bundle_ok'],
        result['pages_ok'],
        result['sitemap_ok'],
        result['robots_ok'],
        bool(unimplemented_p5_copy_route) and unimplemented_p5_copy_route.get('ok') is True,
        result['browser_ok'],
    ])
    RESULTS.write_text(json.dumps(result, indent=2), encoding='utf-8')
    print(json.dumps({
        'ok': result['ok'],
        'results_path': str(RESULTS),
        'deployment_url': DEPLOYMENT_URL,
        'live_assets': result['live_assets'],
        'dist_assets': result['dist_assets'],
        'live_assets_match_dist': result['live_assets_match_dist'],
        'p5_bundle_ok': result['p5_bundle_ok'],
        'pages_ok': result['pages_ok'],
        'sitemap_ok': result['sitemap_ok'],
        'robots_ok': result['robots_ok'],
        'unimplemented_p5_copy_route': result['unimplemented_p5_copy_route'],
        'browser_ok': result['browser_ok'],
        'browser_checks': result['browser_checks'],
    }, indent=2))
    if not result['ok']:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
