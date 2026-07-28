#!/usr/bin/env python3
"""Live production verification for the P7 AITDK SEO issue repair deployment."""
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
DEPLOYMENT_URL = 'https://6fa54afe.palcalculator.pages.dev'
ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
RESULTS = ROOT / 'artifacts' / 'p7-live-results.json'

REPRESENTATIVE_ROUTES = [
    '/',
    '/breeding-calculator/',
    '/iv-calculator/',
    '/passive-skill-calculator/',
    '/guides/palworld-breeding-faq/',
    '/guides/palworld-base-worker-passives/',
]

HEADERS = {
    'User-Agent': 'Hermes-PalCalculator-P7-AITDK-Live-Verification/1.0',
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


def route_from_url(url: str) -> str:
    path = urlparse(url).path or '/'
    return path if path.endswith('/') else f'{path}/'


def attr_string(value: Any) -> str:
    if isinstance(value, str):
        return value
    if value is None:
        return ''
    return str(value)


def html_metadata_check(route: str) -> dict[str, Any]:
    expected_url = f'{BASE}{route}'
    resp = fetch(route)
    soup = BeautifulSoup(resp.text, 'html.parser')
    title_tags = soup.find_all('title')
    desc_tags = soup.find_all('meta', attrs={'name': 'description'})
    canonical_tags = soup.find_all('link', rel='canonical')
    h1_tags = soup.find_all('h1')
    h2_tags = soup.find_all('h2')
    img_tags = soup.find_all('img')
    missing_alt = [attr_string(img.get('src')) or '<inline>' for img in img_tags if not attr_string(img.get('alt')).strip()]
    desc = attr_string(desc_tags[0].get('content')) if desc_tags else ''
    title = title_tags[0].get_text(strip=True) if title_tags else ''
    canonical = attr_string(canonical_tags[0].get('href')) if canonical_tags else None
    return {
        'route': route,
        'url': expected_url,
        'status_code': resp.status_code,
        'final_url': resp.url,
        'title': title,
        'title_length': len(title),
        'title_ok': len(title) > 0 and len(title) <= 60,
        'description': desc,
        'description_length': len(desc),
        'description_ok': len(desc) >= 140 and len(desc) <= 160,
        'canonical': canonical,
        'canonical_ok': len(canonical_tags) == 1 and canonical == expected_url,
        'h1_count': len(h1_tags),
        'h1_ok': len(h1_tags) == 1,
        'h2_count': len(h2_tags),
        'h2_static_present': len(h2_tags) >= 1,
        'img_count': len(img_tags),
        'missing_alt': missing_alt,
        'img_alt_ok': not missing_alt,
        'ok': resp.status_code == 200
            and len(title) > 0 and len(title) <= 60
            and len(desc) >= 140 and len(desc) <= 160
            and len(canonical_tags) == 1 and canonical == expected_url
            and len(h1_tags) == 1
            and not missing_alt,
    }


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
    sitemap_routes = [route_from_url(url) for url in sitemap_locs]
    html_results = [html_metadata_check(route) for route in REPRESENTATIVE_ROUTES]

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
        'sitemap_ok': sitemap.status_code == 200 and len(sitemap_locs) == 24 and all(url.startswith(BASE) for url in sitemap_locs),
        'robots_status_code': robots.status_code,
        'robots_text': robots.text,
        'robots_ok': robots.status_code == 200 and 'Allow: /' in robots.text and 'Disallow: /share/' in robots.text and 'Sitemap: https://palcalculator.com/sitemap.xml' in robots.text,
        'representative_routes': REPRESENTATIVE_ROUTES,
        'representative_routes_in_sitemap': all(f'{BASE}{route}' in sitemap_locs for route in REPRESENTATIVE_ROUTES),
        'html_results': html_results,
        'html_ok': all(bool(row['ok']) for row in html_results),
        'html_h2_static_note': 'Core static app shells may not include H2 before hydration; rendered browser checks verify H2 in the live DOM.',
    }


def browser_checks() -> dict[str, Any]:
    from playwright.sync_api import sync_playwright

    console_errors: list[str] = []
    route_results: list[dict[str, Any]] = []
    with sync_playwright() as p:
        chrome = shutil.which('google-chrome') or shutil.which('chromium') or shutil.which('chromium-browser')
        if chrome:
            browser = p.chromium.launch(headless=True, executable_path=chrome)
        else:
            browser = p.chromium.launch(headless=True)
        page = browser.new_page(user_agent=HEADERS['User-Agent'], viewport={'width': 1365, 'height': 900})
        page.on('console', lambda msg: console_errors.append(f'{msg.type}: {msg.text}') if msg.type in {'error', 'warning'} else None)
        page.on('pageerror', lambda exc: console_errors.append(str(exc)))
        for route in REPRESENTATIVE_ROUTES:
            expected_url = f'{BASE}{route}'
            page.goto(expected_url, wait_until='networkidle', timeout=45000)
            data = page.evaluate("""() => {
                const desc = document.querySelectorAll('meta[name="description"]');
                const canon = document.querySelectorAll('link[rel="canonical"]');
                const title = document.title || '';
                const h1 = Array.from(document.querySelectorAll('h1')).map((el) => el.textContent.trim()).filter(Boolean);
                const h2 = Array.from(document.querySelectorAll('h2')).map((el) => el.textContent.trim()).filter(Boolean);
                const imgs = Array.from(document.querySelectorAll('img')).map((img) => ({src: img.getAttribute('src'), alt: img.getAttribute('alt') || '', ariaHidden: img.getAttribute('aria-hidden')}));
                return {
                    title,
                    titleLength: title.length,
                    descriptionCount: desc.length,
                    description: desc[0]?.getAttribute('content') || '',
                    descriptionLength: (desc[0]?.getAttribute('content') || '').length,
                    canonicalCount: canon.length,
                    canonical: canon[0]?.getAttribute('href') || null,
                    h1Count: h1.length,
                    h1,
                    h2Count: h2.length,
                    h2,
                    imgs,
                    missingAlt: imgs.filter((img) => !img.alt.trim()).map((img) => img.src || '<inline>'),
                    brandAlt: document.querySelector('img.brand-mark[src="/brand-icon.svg"]')?.getAttribute('alt') || null,
                    brandAriaHidden: document.querySelector('img.brand-mark[src="/brand-icon.svg"]')?.getAttribute('aria-hidden') || null,
                };
            }""")
            route_results.append({
                'route': route,
                'url': expected_url,
                **data,
                'title_ok': data['titleLength'] > 0 and data['titleLength'] <= 60,
                'description_ok': data['descriptionCount'] == 1 and 140 <= data['descriptionLength'] <= 160,
                'canonical_ok': data['canonicalCount'] == 1 and data['canonical'] == expected_url,
                'h1_ok': data['h1Count'] == 1,
                'h2_ok': data['h2Count'] >= 1,
                'img_alt_ok': len(data['missingAlt']) == 0,
                'ok': data['titleLength'] > 0 and data['titleLength'] <= 60
                    and data['descriptionCount'] == 1 and 140 <= data['descriptionLength'] <= 160
                    and data['canonicalCount'] == 1 and data['canonical'] == expected_url
                    and data['h1Count'] == 1
                    and data['h2Count'] >= 1
                    and len(data['missingAlt']) == 0,
            })
        browser.close()

    brand_alts = {row['route']: row['brandAlt'] for row in route_results}
    return {
        'routes_checked': len(route_results),
        'route_results': route_results,
        'console_errors': console_errors,
        'brand_alts': brand_alts,
        'ok': all(bool(row['ok']) for row in route_results) and not console_errors,
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
        result['html_ok'],
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
        'representative_routes': REPRESENTATIVE_ROUTES,
        'html_ok': result['html_ok'],
        'browser_ok': isinstance(result['browser_checks'], dict) and result['browser_checks'].get('ok') is True,
    }, indent=2))
    if not result['ok']:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
