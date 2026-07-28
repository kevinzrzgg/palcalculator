#!/usr/bin/env python3
"""Live production verification for the P8 share/link deployment."""
from __future__ import annotations

import json
import re
import shutil
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

BASE = 'https://palcalculator.com'
DEPLOYMENT_URL = 'https://a52c2361.palcalculator.pages.dev'
ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
RESULTS = ROOT / 'artifacts' / 'p8-live-results.json'

REPRESENTATIVE_ROUTES = [
    '/',
    '/breeding-calculator/',
    '/breeding-route-calculator/',
    '/iv-calculator/',
    '/stats-calculator/',
    '/passive-skill-calculator/',
]

QUERY_CHECKS = [
    {
        'name': 'breeding_pair',
        'path': '/breeding-calculator/?mode=pair&parentA=penking&parentB=bushi',
        'expected_h1': 'Palworld Breeding Calculator',
        'expected_text': 'Penking + Bushi',
        'expected_share': f'{BASE}/breeding-calculator/?mode=pair&parentA=penking&parentB=bushi',
        'expected_canonical': f'{BASE}/breeding-calculator/',
    },
    {
        'name': 'breeding_target',
        'path': '/breeding-calculator/?mode=target&target=anubis',
        'expected_h1': 'Palworld Breeding Calculator',
        'expected_text': 'parent pairs found for Anubis',
        'expected_share': f'{BASE}/breeding-calculator/?mode=target&target=anubis',
        'expected_canonical': f'{BASE}/breeding-calculator/',
    },
    {
        'name': 'route',
        'path': '/breeding-route-calculator/?target=anubis&maxGen=5',
        'expected_h1': 'Palworld Breeding Route Calculator',
        'expected_text': 'Route found to Anubis',
        'expected_share': f'{BASE}/breeding-route-calculator/?target=anubis&maxGen=5',
        'expected_canonical': f'{BASE}/breeding-route-calculator/',
    },
    {
        'name': 'iv',
        'path': '/iv-calculator/?pal=anubis&level=50&hp=500&attack=130&defense=100',
        'expected_h1': 'Palworld IV Calculator',
        'expected_text': 'Caveated IV bands calculated',
        'expected_share': f'{BASE}/iv-calculator/?pal=anubis&level=50&hp=500&attack=130&defense=100',
        'expected_canonical': f'{BASE}/iv-calculator/',
    },
    {
        'name': 'stats',
        'path': '/stats-calculator/?pal=anubis&level=30&hp=360&attack=95&defense=75',
        'expected_h1': 'Palworld Stats Calculator',
        'expected_text': 'Expected stat bands calculated',
        'expected_share': f'{BASE}/stats-calculator/?pal=anubis&level=30&hp=360&attack=95&defense=75',
        'expected_canonical': f'{BASE}/stats-calculator/',
    },
    {
        'name': 'passives',
        'path': '/passive-skill-calculator/?target=anubis&passives=artisan,serious',
        'expected_h1': 'Palworld Passive Skill Calculator',
        'expected_text': 'Passive plan captured',
        'expected_share': f'{BASE}/passive-skill-calculator/?target=anubis&passives=artisan%2Cserious',
        'expected_canonical': f'{BASE}/passive-skill-calculator/',
    },
]

HEADERS = {
    'User-Agent': 'Hermes-PalCalculator-P8-Live-Verification/1.0',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
}


def fetch(path_or_url: str) -> requests.Response:
    url = path_or_url if path_or_url.startswith('http') else urljoin(BASE, path_or_url)
    last_exc: Exception | None = None
    resp: requests.Response | None = None
    for _ in range(24):
        try:
            resp = requests.get(url, headers=HEADERS, timeout=20, allow_redirects=True)
            if resp.status_code < 500:
                return resp
        except Exception as exc:
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


def route_from_url(url: str) -> str:
    path = urlparse(url).path or '/'
    return path if path.endswith('/') else f'{path}/'


def static_checks() -> dict[str, Any]:
    production_home = fetch('/')
    deployment_home = fetch(DEPLOYMENT_URL)
    html = production_home.text
    script_paths = re.findall(r'<script[^>]+src="([^"]+index-[^"]+\.js)"', html)
    css_paths = re.findall(r'<link[^>]+href="([^"]+index-[^"]+\.css)"', html)
    dist_assets = local_asset_names()
    live_assets = [Path(p).name for p in script_paths + css_paths]

    sitemap = fetch('/sitemap.xml')
    robots = fetch('/robots.txt')
    sitemap_locs = re.findall(r'<loc>(.*?)</loc>', sitemap.text)
    bad_sitemap_locs = [loc for loc in sitemap_locs if '?' in loc or '/share/' in loc or '/results/' in loc]

    soup = BeautifulSoup(html, 'html.parser')
    anchors = [a.get('href') for a in soup.find_all('a') if a.get('href')]
    required_anchor_hrefs = [
        '/breeding-calculator/',
        '/breeding-route-calculator/',
        '/iv-calculator/',
        '/stats-calculator/',
        '/passive-skill-calculator/',
        '/palworld-1-0-breeding-calculator/',
    ]
    button_card_count = html.count('button class="card"') + html.count("button class='card'")
    return {
        'checked_at': datetime.now(timezone.utc).isoformat(),
        'base': BASE,
        'deployment_url': DEPLOYMENT_URL,
        'production_home_status_code': production_home.status_code,
        'deployment_url_status_code': deployment_home.status_code,
        'dist_assets': dist_assets,
        'live_assets': live_assets,
        'live_assets_match_dist': all(asset in live_assets for asset in dist_assets),
        'sitemap_status_code': sitemap.status_code,
        'sitemap_url_count': len(sitemap_locs),
        'sitemap_urls': sitemap_locs,
        'sitemap_bad_locs': bad_sitemap_locs,
        'sitemap_ok': sitemap.status_code == 200 and len(sitemap_locs) == 24 and all(url.startswith(BASE) for url in sitemap_locs) and not bad_sitemap_locs,
        'robots_status_code': robots.status_code,
        'robots_text': robots.text,
        'robots_ok': robots.status_code == 200 and 'Allow: /' in robots.text and 'Disallow: /share/' in robots.text and 'Sitemap: https://palcalculator.com/sitemap.xml' in robots.text,
        'representative_routes': REPRESENTATIVE_ROUTES,
        'representative_routes_in_sitemap': all(f'{BASE}{route}' in sitemap_locs for route in REPRESENTATIVE_ROUTES),
        'static_anchor_hrefs': anchors,
        'required_anchor_hrefs': required_anchor_hrefs,
        'required_anchor_hrefs_present': all(href in anchors for href in required_anchor_hrefs),
        'button_card_count': button_card_count,
        'static_crawlable_links_ok': all(href in anchors for href in required_anchor_hrefs) and button_card_count == 0,
    }


def browser_checks() -> dict[str, Any]:
    from playwright.sync_api import sync_playwright

    console_errors: list[str] = []
    console_warnings: list[str] = []
    ignored_console_messages: list[str] = []
    query_results: list[dict[str, Any]] = []
    base_results: list[dict[str, Any]] = []

    def record_console(msg: Any) -> None:
        text = f'{msg.type}: {msg.text}'
        # Google ad iframes can emit a report-only frame-ancestors CSP message in
        # headless Chrome. Track it separately so app JS errors still fail the run.
        if msg.type == 'error' and "Framing 'https://www.google.com/' violates the following report-only Content Security Policy directive" in msg.text:
            ignored_console_messages.append(text)
        elif msg.type == 'error':
            console_errors.append(text)
        elif msg.type == 'warning':
            console_warnings.append(text)

    with sync_playwright() as p:
        chrome = shutil.which('google-chrome') or shutil.which('chromium') or shutil.which('chromium-browser')
        if chrome:
            browser = p.chromium.launch(headless=True, executable_path=chrome)
        else:
            browser = p.chromium.launch(headless=True)
        page = browser.new_page(user_agent=HEADERS['User-Agent'], viewport={'width': 1365, 'height': 900})
        page.on('console', record_console)
        page.on('pageerror', lambda exc: console_errors.append(str(exc)))

        for route in REPRESENTATIVE_ROUTES:
            expected_url = f'{BASE}{route}'
            page.goto(expected_url, wait_until='networkidle', timeout=45000)
            data = page.evaluate("""() => ({
                title: document.title || '',
                h1: Array.from(document.querySelectorAll('h1')).map((el) => el.textContent.trim()).filter(Boolean),
                canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null,
                robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || null,
                anchorHrefs: Array.from(document.querySelectorAll('a[href]')).map((a) => a.getAttribute('href')),
                buttonCardCount: document.querySelectorAll('button.card').length,
            })""")
            anchor_hrefs = data['anchorHrefs']
            base_results.append({
                'route': route,
                'url': expected_url,
                **data,
                'canonical_ok': data['canonical'] == expected_url,
                'robots_ok': data['robots'] == 'index,follow',
                'crawlable_links_ok': route != '/' or all(href in anchor_hrefs for href in ['/breeding-calculator/', '/breeding-route-calculator/', '/iv-calculator/', '/stats-calculator/', '/passive-skill-calculator/', '/palworld-1-0-breeding-calculator/']) and data['buttonCardCount'] == 0,
            })

        for check in QUERY_CHECKS:
            page.goto(f"{BASE}{check['path']}", wait_until='networkidle', timeout=45000)
            data = page.evaluate("""() => {
                const share = Array.from(document.querySelectorAll('a[href]')).find((a) => (a.textContent || '').includes('Open share URL'));
                const bodyText = document.body.textContent || '';
                return {
                    url: window.location.href,
                    h1: Array.from(document.querySelectorAll('h1')).map((el) => el.textContent.trim()).filter(Boolean),
                    bodyText,
                    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null,
                    robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || null,
                    shareHref: share?.href || null,
                    ownedPrivacyCopySeen: bodyText.includes('Your browser-local owned Pal list is not included in this share URL.'),
                    anchorHrefs: Array.from(document.querySelectorAll('a[href]')).map((a) => a.getAttribute('href')),
                    buttonCardCount: document.querySelectorAll('button.card').length,
                };
            }""")
            query_results.append({
                'name': check['name'],
                'path': check['path'],
                'url': data['url'],
                'h1': data['h1'],
                'canonical': data['canonical'],
                'robots': data['robots'],
                'share_href': data['shareHref'],
                'owned_privacy_copy_seen': data['ownedPrivacyCopySeen'],
                'button_card_count': data['buttonCardCount'],
                'expected_text_seen': check['expected_text'] in data['bodyText'],
                'expected_h1_seen': check['expected_h1'] in data['h1'],
                'share_href_ok': data['shareHref'] == check['expected_share'],
                'canonical_ok': data['canonical'] == check['expected_canonical'],
                'robots_ok': data['robots'] == 'noindex,follow',
                'owned_leak_in_route_share': check['name'] == 'route' and data['shareHref'] and ('owned' in data['shareHref'].lower()),
                'ok': check['expected_text'] in data['bodyText']
                    and check['expected_h1'] in data['h1']
                    and data['shareHref'] == check['expected_share']
                    and data['canonical'] == check['expected_canonical']
                    and data['robots'] == 'noindex,follow'
                    and data['buttonCardCount'] == 0
                    and not (check['name'] == 'route' and data['shareHref'] and ('owned' in data['shareHref'].lower()))
            })
        browser.close()

    return {
        'base_results': base_results,
        'query_results': query_results,
        'console_errors': console_errors,
        'console_warnings': console_warnings,
        'ignored_console_messages': ignored_console_messages,
        'base_ok': all(row['canonical_ok'] and row['robots_ok'] and row['crawlable_links_ok'] for row in base_results),
        'query_ok': all(bool(row['ok']) for row in query_results),
        'console_ok': not console_errors,
        'ok': all(row['canonical_ok'] and row['robots_ok'] and row['crawlable_links_ok'] for row in base_results) and all(bool(row['ok']) for row in query_results) and not console_errors,
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
        result['sitemap_ok'],
        result['robots_ok'],
        result['representative_routes_in_sitemap'],
        result['static_crawlable_links_ok'],
        isinstance(result['browser_checks'], dict) and result['browser_checks'].get('ok') is True,
    ])
    RESULTS.write_text(json.dumps(result, indent=2), encoding='utf-8')
    print(json.dumps({
        'ok': result['ok'],
        'results_path': str(RESULTS),
        'deployment_url': DEPLOYMENT_URL,
        'live_assets_match_dist': result['live_assets_match_dist'],
        'sitemap_url_count': result['sitemap_url_count'],
        'sitemap_ok': result['sitemap_ok'],
        'robots_ok': result['robots_ok'],
        'static_crawlable_links_ok': result['static_crawlable_links_ok'],
        'browser_base_ok': isinstance(result['browser_checks'], dict) and result['browser_checks'].get('base_ok') is True,
        'browser_query_ok': isinstance(result['browser_checks'], dict) and result['browser_checks'].get('query_ok') is True,
        'browser_console_ok': isinstance(result['browser_checks'], dict) and result['browser_checks'].get('console_ok') is True,
    }, indent=2))
    if not result['ok']:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
