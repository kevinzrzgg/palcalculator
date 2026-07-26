#!/usr/bin/env python3
"""Live production verification for the P4 beginner UX deployment."""
from __future__ import annotations

import json
import shutil
import re
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

BASE = 'https://palcalculator.com'
ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
RESULTS = ROOT / 'artifacts' / 'p4-beginner-ux-live-results.json'

ROUTES = [
    '/',
    '/breeding-calculator/',
    '/breeding-route-calculator/',
    '/iv-calculator/',
    '/stats-calculator/',
    '/passive-skill-calculator/',
    '/palworld-1-0-breeding-calculator/',
    '/guides/how-to-breed-anubis-palworld/',
]

BEGINNER_BUNDLE_STRINGS = [
    'How to use PalCalculator',
    'Choose your goal',
    'Try an example',
    'Read what it means',
    'Try Anubis example',
    'Try: Anubis parent lookup',
    'Try: Penking + Bushi pair',
    'Try: Jetragon target lookup',
    'Try: route to Anubis from Penking + Bushi',
    'Try: no owned Pals yet',
    'Try: level 50 Anubis IV bands',
    'Try: Anubis expected stats',
    'Try: Swift mobility passive plan',
    'This means...',
    'Next step...',
    'Caveat...',
    'PASSIVE_RNG_CAVEATED',
    'PASSIVE_NAMES_UNSUPPORTED',
]

AD_MARKERS = [
    'adsbygoogle',
    'googlesyndication',
    'ad-slot',
    'ad-container',
    'ad-banner',
    'native-ad',
    'effectivecpmnetwork',
    'highperformanceformat',
    'atOptions',
    'NativeAd',
    'HighPerformanceAd',
    'Advertisement',
    'iframe-ad',
    'iframe-ad-grid',
    'iframe-ad-mount',
]

HEADERS = {
    'User-Agent': 'Hermes-PalCalculator-P4-Live-Verification/1.0',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
}


def fetch(path_or_url: str) -> requests.Response:
    url = path_or_url if path_or_url.startswith('http') else urljoin(BASE, path_or_url)
    last_exc: Exception | None = None
    resp: requests.Response | None = None
    for _ in range(5):
        try:
            resp = requests.get(url, headers=HEADERS, timeout=20, allow_redirects=True)
            if resp.status_code < 500:
                return resp
        except Exception as exc:  # pragma: no cover - diagnostic script
            last_exc = exc
        time.sleep(3)
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
    hits = [m for m in AD_MARKERS if m.lower() in text.lower()]
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
        'ad_marker_hits': hits,
    }


def static_checks() -> dict[str, object]:
    home = fetch('/')
    html = home.text
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
    missing_bundle_strings = [s for s in BEGINNER_BUNDLE_STRINGS if s not in bundle_text]
    page_results = [page_check(route) for route in ROUTES]

    sitemap = fetch('/sitemap.xml')
    robots = fetch('/robots.txt')
    favicon_ico = fetch('/favicon.ico')
    favicon_svg = fetch('/favicon.svg')
    sitemap_locs = re.findall(r'<loc>(.*?)</loc>', sitemap.text)

    return {
        'checked_at': datetime.now(timezone.utc).isoformat(),
        'base': BASE,
        'home_status_code': home.status_code,
        'dist_assets': dist_assets,
        'live_assets': live_assets,
        'live_assets_match_dist': all(asset in live_assets for asset in dist_assets),
        'script_assets': script_paths,
        'css_assets': css_paths,
        'bundle_status': bundle_status,
        'missing_bundle_strings': missing_bundle_strings,
        'beginner_bundle_ok': not missing_bundle_strings,
        'page_results': page_results,
        'pages_ok': all(p['status_code'] == 200 and p['canonical_ok'] and p['robots_ok'] and p['favicon_ok'] and not p['ad_marker_hits'] for p in page_results),
        'sitemap_status_code': sitemap.status_code,
        'sitemap_url_count': len(sitemap_locs),
        'sitemap_ok': sitemap.status_code == 200 and len(sitemap_locs) == 18 and all(f'{BASE}{route}' in sitemap_locs for route in ROUTES),
        'robots_status_code': robots.status_code,
        'robots_ok': robots.status_code == 200 and 'Allow: /' in robots.text and 'Disallow: /share/' in robots.text and 'Sitemap: https://palcalculator.com/sitemap.xml' in robots.text,
        'favicon_ico_status_code': favicon_ico.status_code,
        'favicon_svg_status_code': favicon_svg.status_code,
        'favicons_ok': favicon_ico.status_code == 200 and favicon_svg.status_code == 200,
    }


def browser_checks() -> dict[str, object]:
    from playwright.sync_api import sync_playwright

    checks: dict[str, object] = {}
    with sync_playwright() as p:
        chrome = shutil.which('google-chrome') or shutil.which('chromium') or shutil.which('chromium-browser')
        if chrome:
            browser = p.chromium.launch(headless=True, executable_path=chrome)
        else:
            browser = p.chromium.launch(headless=True)
        page = browser.new_page(extra_http_headers=HEADERS)
        page.goto(BASE + '/', wait_until='networkidle', timeout=30000)
        for text in ['How to use PalCalculator', 'Choose your goal', 'Try an example', 'Read what it means']:
            page.get_by_text(text, exact=True).first.wait_for(timeout=10000)
        page.get_by_role('button', name='Try Anubis example').click()
        page.wait_for_url('**/breeding-calculator/', timeout=10000)
        page.get_by_text('66 parent pairs found for Anubis').first.wait_for(timeout=10000)
        for text in ['This means...', 'Next step...', 'Caveat...']:
            page.get_by_text(text, exact=True).first.wait_for(timeout=10000)
        checks['homepage_anubis_example'] = 'PASS'

        page.goto(BASE + '/breeding-calculator/', wait_until='networkidle', timeout=30000)
        page.get_by_role('button', name='Try: Penking + Bushi pair').click()
        page.get_by_text('Penking + Bushi → Sibelyx').first.wait_for(timeout=10000)
        checks['breeding_pair_example'] = 'PASS'

        page.goto(BASE + '/passive-skill-calculator/', wait_until='networkidle', timeout=30000)
        page.get_by_role('button', name='Try: Swift mobility passive plan').click()
        page.get_by_text('1 desired passive(s) recognized').first.wait_for(timeout=10000)
        page.get_by_text('PASSIVE_RNG_CAVEATED').first.wait_for(timeout=10000)
        checks['passive_swift_example'] = 'PASS'

        page.goto(BASE + '/breeding-route-calculator/', wait_until='networkidle', timeout=30000)
        page.get_by_role('button', name='Try: no owned Pals yet').click()
        page.get_by_text('Route found to Anubis').first.wait_for(timeout=10000)
        checks['route_no_owned_example'] = 'PASS'
        browser.close()
    return checks


def main() -> None:
    result = static_checks()
    try:
        result['browser_checks'] = browser_checks()
        result['browser_ok'] = all(v == 'PASS' for v in result['browser_checks'].values())
    except Exception as exc:
        result['browser_checks'] = {'error': repr(exc)}
        result['browser_ok'] = False
    result['ok'] = all([
        result['home_status_code'] == 200,
        result['live_assets_match_dist'],
        result['beginner_bundle_ok'],
        result['pages_ok'],
        result['sitemap_ok'],
        result['robots_ok'],
        result['favicons_ok'],
        result['browser_ok'],
    ])
    RESULTS.write_text(json.dumps(result, indent=2), encoding='utf-8')
    print(json.dumps({
        'ok': result['ok'],
        'results_path': str(RESULTS),
        'live_assets_match_dist': result['live_assets_match_dist'],
        'beginner_bundle_ok': result['beginner_bundle_ok'],
        'pages_ok': result['pages_ok'],
        'sitemap_ok': result['sitemap_ok'],
        'robots_ok': result['robots_ok'],
        'favicons_ok': result['favicons_ok'],
        'browser_ok': result['browser_ok'],
        'browser_checks': result['browser_checks'],
    }, indent=2))
    if not result['ok']:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
