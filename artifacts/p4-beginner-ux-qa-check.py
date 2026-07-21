#!/usr/bin/env python3
"""Static regression checks for the P4 beginner UX QA artifact.

This script intentionally avoids long-lived browser/CDP sessions so it is stable in
headless CI/agent environments. Interactive and viewport evidence is recorded in
`p4-beginner-ux-qa.md`; this script verifies the source/build invariants that back
that report.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'src'
DIST = ROOT / 'dist'
RESULTS = ROOT / 'artifacts' / 'p4-beginner-ux-qa-results.json'

REQUIRED_SOURCE_STRINGS = [
    'How to use PalCalculator',
    'Choose your goal',
    'Try an example',
    'Read what it means',
    'Try: Anubis parent lookup',
    'Try: Penking + Bushi pair',
    'Try: Jetragon target lookup',
    'Try: route to Anubis from Penking + Bushi',
    'Try: no owned Pals yet',
    'Try: level 50 Anubis IV bands',
    'Try: Anubis expected stats',
    'Try: Artisan + Serious passive plan',
    'Try: Swift mobility passive plan',
    'No desired passives recognized',
    'PASSIVE_NAMES_UNSUPPORTED',
    'This means...',
    'Next step...',
    'Caveat...',
    'Optional. Paste names you already have, separated by commas or new lines. This stays browser-local in the MVP.',
]

AD_MARKERS = [
    'adsbygoogle',
    'googlesyndication',
    'ad-slot',
    'ad-container',
    'ad-banner',
]

REPRESENTATIVE_ROUTES = [
    '/',
    '/breeding-calculator/',
    '/breeding-route-calculator/',
    '/iv-calculator/',
    '/stats-calculator/',
    '/passive-skill-calculator/',
    '/palworld-1-0-breeding-calculator/',
]


def dist_index_for(route: str) -> Path:
    if route == '/':
        return DIST / 'index.html'
    return DIST / route.strip('/') / 'index.html'


def read(path: Path) -> str:
    return path.read_text(encoding='utf-8', errors='ignore')


def main() -> None:
    main_tsx = read(SRC / 'main.tsx')
    guides = json.loads(read(SRC / 'guides-data.json'))
    sitemap = read(DIST / 'sitemap.xml')
    valid_routes = {
        '/' if p.parent == DIST else '/' + str(p.parent.relative_to(DIST)).strip('/') + '/'
        for p in DIST.glob('**/index.html')
    }

    missing_source_strings = [s for s in REQUIRED_SOURCE_STRINGS if s not in main_tsx]

    route_meta = []
    for route in REPRESENTATIVE_ROUTES:
        html_path = dist_index_for(route)
        html = read(html_path)
        route_meta.append({
            'route': route,
            'html_exists': html_path.exists(),
            'canonical_ok': f'<link rel="canonical" href="https://palcalculator.com{route}"' in html,
            'robots_ok': '<meta name="robots" content="index,follow"' in html,
            'icon_ok': 'rel="icon"' in html or 'brand-icon.svg' in html,
        })

    guide_ctas = []
    for guide in guides:
        for kind in ('primaryCta', 'secondaryCta'):
            href = guide[kind]['href']
            guide_ctas.append({
                'guide': guide['path'],
                'kind': kind,
                'label': guide[kind]['label'],
                'href': href,
                'href_resolves_to_static_route': href in valid_routes,
            })

    text_files = [SRC / 'main.tsx'] + [
        p for p in DIST.rglob('*')
        if p.is_file() and p.suffix.lower() in {'.js', '.css', '.html', '.xml', '.txt', '.json'}
    ]
    ad_hits = []
    for marker in AD_MARKERS:
        for path in text_files:
            if marker in read(path).lower():
                ad_hits.append({'marker': marker, 'path': str(path.relative_to(ROOT))})

    passives = json.loads(read(SRC / 'data' / 'passives.latest.json'))['passives']
    passive_names = {p['displayName'].lower() for p in passives}
    combat_example_supported = {'musclehead', 'ferocious'}.issubset(passive_names)
    combat_example_present = 'Try: combat passive plan' in main_tsx
    swift_example_present = 'Try: Swift mobility passive plan' in main_tsx

    result = {
        'sitemap_url_count': len(re.findall(r'<loc>', sitemap)),
        'sitemap_ok': len(re.findall(r'<loc>', sitemap)) == 18,
        'missing_source_strings': missing_source_strings,
        'route_meta': route_meta,
        'all_route_meta_ok': all(r['html_exists'] and r['canonical_ok'] and r['robots_ok'] and r['icon_ok'] for r in route_meta),
        'guide_ctas': guide_ctas,
        'all_guide_ctas_ok': all(c['href_resolves_to_static_route'] for c in guide_ctas),
        'ad_hits': ad_hits,
        'no_ad_markers_ok': not ad_hits,
        'passive_dataset_names': sorted(passive_names),
        'combat_example_present': combat_example_present,
        'swift_example_present': swift_example_present,
        'combat_example_supported': combat_example_supported,
        'known_p1_blocker_present': combat_example_present and not combat_example_supported,
        'passive_repair_ok': swift_example_present and not combat_example_present and 'PASSIVE_NAMES_UNSUPPORTED' in main_tsx,
    }
    result['ok'] = (
        result['sitemap_ok']
        and not result['missing_source_strings']
        and result['all_route_meta_ok']
        and result['all_guide_ctas_ok']
        and result['no_ad_markers_ok']
        and result['passive_repair_ok']
    )

    RESULTS.write_text(json.dumps(result, indent=2), encoding='utf-8')
    print(json.dumps({
        'results_path': str(RESULTS),
        'ok': result['ok'],
        'sitemap_url_count': result['sitemap_url_count'],
        'all_route_meta_ok': result['all_route_meta_ok'],
        'all_guide_ctas_ok': result['all_guide_ctas_ok'],
        'no_ad_markers_ok': result['no_ad_markers_ok'],
        'passive_repair_ok': result['passive_repair_ok'],
        'known_p1_blocker_present': result['known_p1_blocker_present'],
        'missing_source_strings': result['missing_source_strings'],
    }, indent=2))

    if not result['ok']:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
