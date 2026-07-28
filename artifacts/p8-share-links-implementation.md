# P8 Share Links Implementation

Project: PalCalculator
Task: `t_4767a958` — P8 frontend: implement share URLs and crawlable internal links
Owner role: frontend_bot
Date: 2026-07-28
Status: implementation complete; pending review, no production deploy performed.

## Summary

Implemented P8 privacy-safe calculator share URLs, query-param hydration, query-state indexing guardrails, and crawlable route-discovery anchors.

Primary changed files:

- `src/main.tsx`
- `src/main.test.ts`
- `scripts/generate-static-routes.mjs`
- `artifacts/p8-share-links-implementation.md`

Upstream scope artifacts used:

- `artifacts/p8-product-share-links-scope.md`
- `artifacts/p8-seo-crawlable-links.md`

## Share URL behavior

Generated share URLs now use existing calculator routes plus query strings only. No `/share/*`, `/results/*`, opaque hashes, or persisted result pages were added.

Implemented URL state shapes:

- Breeding pair: `/breeding-calculator/?mode=pair&parentA=<pal-slug>&parentB=<pal-slug>`
- Breeding target: `/breeding-calculator/?mode=target&target=<pal-slug>`
- Palworld 1.0 breeding: `/palworld-1-0-breeding-calculator/?mode=target&target=<pal-slug>` or pair equivalent
- Route: `/breeding-route-calculator/?target=<pal-slug>&maxGen=<number>`
- IV/Stats: `/iv-calculator/?pal=<pal-slug>&level=<number>&hp=<number>&attack=<number>&defense=<number>` and `/stats-calculator/?pal=<pal-slug>&level=<number>&hp=<number>&attack=<number>&defense=<number>`
- Passives: `/passive-skill-calculator/?target=<pal-slug>&passives=<passive-id-list>`

Generated values are normalized through supported Pal/passive lookups where applicable. Numeric values are bounded before encoding.

## Query hydration

Calculator components now initialize supported fields from current query params:

- Breeding hydrates `mode`, `parentA`, `parentB`, and `target`.
- Route hydrates `target` and `maxGen`.
- IV/Stats hydrate `pal`, `level`, `hp`, `attack`, and `defense`.
- Passives hydrates `target` and `passives`.

Unknown Pal/passive query values remain visible in the editable inputs so the existing validation/result states can show unsupported input instead of guessing a replacement.

## Privacy boundary

Route share URLs intentionally omit both:

- the browser-local owned-Pal `localStorage` list, and
- raw user-entered route owned text.

The route calculator renders visible helper copy after the share control:

> Your browser-local owned Pal list is not included in this share URL.

Share analytics continue to use safe event payloads and do not include full share URLs, raw owned lists, raw user route text, emails, IPs, cookies, tokens, or save data.

## SEO/query indexing guardrails

Runtime head updates now set calculator query-state pages to `noindex,follow` while preserving the canonical and Open Graph URL on the base route.

Examples:

- `/breeding-route-calculator/?target=anubis&maxGen=3`
  - canonical remains `https://palcalculator.com/breeding-route-calculator/`
  - robots becomes `noindex,follow`
- `/breeding-route-calculator/`
  - robots remains `index,follow`

Sitemap generation remains canonical-route-only. Verification found no query URLs, `/share/`, or `/results/` leaks in `public/sitemap.xml` or `dist/sitemap.xml`.

## Crawlable internal links

Route-changing discovery UI was converted from button-only navigation to real anchors with stable `href` values while preserving SPA enhancement for unmodified left clicks.

Implemented:

- Added a shared `RouteAnchor` helper that renders `<a href="...">` and only intercepts safe same-tab clicks.
- Header brand/nav now use `RouteAnchor` and preserve modifier-click/default anchor behavior.
- Homepage hero route CTAs are real anchors.
- Calculator hero CTAs that navigate to another route are real anchors.
- Homepage tool cards are real `<a className="card" href="...">` controls.
- Beginner step 3 result-guide CTA is a real anchor.
- Static prerendered non-guide pages now include crawlable links to the six main tool routes and guide routes before React hydration.

Same-page and state-mutating actions remain buttons, including input focus jumps, examples, local owned-Pal list controls, mode switches, and copy-to-clipboard.

## Tests added/updated

Added source/static contract coverage for:

- privacy-safe share payload construction,
- route share omission of `owned`,
- query hydration helper usage,
- query-state `noindex,follow`,
- crawlable `RouteAnchor` usage for route-changing UI,
- absence of button-only homepage tool cards,
- static prerender tool/guide link discovery,
- no `/share/` or `/results/` in static generator routes.

## Verification

Commands run from `/root/projects/palcalculator`:

- `npm run test` — PASS, 27 tests passed.
- `npm run lint` — PASS, 0 errors; existing React Fast Refresh / hook dependency warnings remain.
- `npm run build` — PASS; generated 24 route-specific HTML files, 24 sitemap URLs, slash redirects, and `404.html`.
- Post-build sitemap/static check — PASS:
  - `public/sitemap.xml` loc count: 24; bad query/share/results locs: `[]`
  - `dist/sitemap.xml` loc count: 24; bad query/share/results locs: `[]`
  - `dist/index.html` contains anchors to all six main tool routes and `/guides/palworld-breeding-route-examples/`.

## Deploy status

No production deploy was performed for P8.
