# PalCalculator P2 SEO Content QA

Task: `t_bcd294af`
Date: 2026-07-20
Workspace: `/root/projects/palcalculator`
Result: GO / PASS

## Scope

QA verified the second P2 SEO content batch before deploy:

- `/guides/palworld-iv-explained/`
- `/guides/best-passive-skills-for-breeding-palworld/`
- `/guides/how-to-breed-anubis-palworld/`
- `/guides/how-to-breed-jetragon-palworld/`
- `/guides/palworld-breeding-route-examples/`

Input artifacts reviewed:

- `artifacts/p2-seo-content-brief.md`
- `artifacts/p2-seo-content-copy.md`
- `artifacts/p2-seo-content-implementation.md`
- `src/guides-data.json`
- `src/main.tsx`
- `scripts/generate-static-routes.mjs`
- `scripts/preview-static.mjs`
- `src/main.test.ts`
- `public/sitemap.xml`

## Required command verification

All required project verification commands passed:

- `npm run test` — PASS, 15/15 tests.
- `npm run lint` — PASS with 0 errors and 25 existing warnings in `src/main.tsx`.
- `npm run build` — PASS. Vite built successfully and `scripts/generate-static-routes.mjs` reported: `Generated 18 route-specific HTML files, 18 sitemap URLs, explicit slash redirects, and 404.html.`

Lint warning note: the warnings are the existing React Fast Refresh / hook dependency warnings already noted by the implementation handoff; no lint errors were present.

## Static HTML metadata verification

For every P2 route, QA inspected the generated `dist/guides/.../index.html` file and confirmed:

- Built HTML file exists.
- `<title>` matches the route-specific guide title and stays within the accepted title length.
- `<meta name="description">` matches the guide description and stays within the accepted description length.
- Canonical is self-referencing, HTTPS, apex-domain, and trailing-slash on `https://palcalculator.com`.
- `<meta name="robots" content="index,follow">` is present.
- One route-specific visible H1 is present.
- `FAQPage` JSON-LD is present and backed by visible FAQ content.
- `TechArticle` JSON-LD is present and matches guide page metadata.
- At least 7 visible FAQ entries are present on each P2 page.
- Each page includes a visible `/data-sources/` internal link / data caveat path.
- No ad marker strings were present in the generated P2 HTML.

FAQ counts observed:

- `/guides/palworld-iv-explained/` — 7 visible FAQ entries.
- `/guides/best-passive-skills-for-breeding-palworld/` — 7 visible FAQ entries.
- `/guides/how-to-breed-anubis-palworld/` — 7 visible FAQ entries.
- `/guides/how-to-breed-jetragon-palworld/` — 7 visible FAQ entries.
- `/guides/palworld-breeding-route-examples/` — 7 visible FAQ entries.

## Local static preview verification

`npm run preview -- --port 4173` could not bind because port 4173 was already in use. QA started the same static preview server on port 4183 instead:

- `npm run preview -- --port 4183` — server running at `http://127.0.0.1:4183/`.

HTTP checks against the local static preview passed:

- `/guides/palworld-iv-explained/` — 200
- `/guides/best-passive-skills-for-breeding-palworld/` — 200
- `/guides/how-to-breed-anubis-palworld/` — 200
- `/guides/how-to-breed-jetragon-palworld/` — 200
- `/guides/palworld-breeding-route-examples/` — 200
- `/sitemap.xml` — 200
- `/guides/not-real/` — 404

Browser spot-check on `/guides/how-to-breed-anubis-palworld/` confirmed:

- Browser title: `How to Breed Anubis in Palworld`.
- Canonical: `https://palcalculator.com/guides/how-to-breed-anubis-palworld/`.
- Description: `Learn how to plan Anubis breeding in Palworld with parent-pair lookup, route steps, passive caveats, and PalCalculator tools.`
- Robots: `index,follow`.
- H1: `How to Breed Anubis in Palworld`.
- Header brand image renders from `/brand-icon.svg`.
- Header nav links render: Breeding, Route, IV, Stats, Passives, Data Sources.
- `document.body.scrollWidth === document.documentElement.clientWidth`; no horizontal overflow observed in the browser viewport.

## Sitemap verification

Both sitemap sources were checked:

- `public/sitemap.xml` — 18 URLs.
- `dist/sitemap.xml` — 18 URLs.

Confirmed sitemap contents:

- Existing 13 indexable URLs are still present:
  - `/`
  - `/breeding-calculator/`
  - `/breeding-route-calculator/`
  - `/iv-calculator/`
  - `/stats-calculator/`
  - `/passive-skill-calculator/`
  - `/palworld-1-0-breeding-calculator/`
  - `/data-sources/`
  - `/privacy/`
  - `/terms/`
  - `/guides/palworld-breeding-combos/`
  - `/guides/palworld-breeding-tree/`
  - `/guides/palworld-1-0-breeding-guide/`
- All 5 P2 guide URLs are present.
- `/share/` is excluded from both public and generated sitemaps.

## Internal link verification

QA parsed root-relative `<a href="/...">` links from the generated P2 HTML files and checked them against generated routes and public assets.

Result: PASS — no dead internal links found in the P2 generated HTML.

## Ad marker / ad regression verification

QA scanned generated `dist` `.html`, `.js`, `.css`, and `.xml` files for the blocked ad-marker patterns used in prior cleanup work:

- `ad-slot`
- `native-ad`
- `data-palcalculator-ad-key`
- `effectivecpmnetwork`
- `highperformanceformat`
- `container-`
- `atOptions`
- `NativeAd`
- `HighPerformanceAd`
- `Advertisement`

Result: PASS — no matching ad marker files found in `dist`.

## Header/icon/mobile overflow regression verification

QA verified the relevant CSS guards are still present in `src/styles.css`:

- `html,body,#root{max-width:100%;overflow-x:clip}`
- `.site-header` has `width:100%` and `min-width:0`.
- `.brand-mark` has fixed dimensions and `flex:0 0 auto`.
- `nav` has `min-width:0`, `max-width:100%`, and `flex-wrap:wrap`.
- Mobile media rule at `max-width:850px` stacks the header and lets nav use full width.

Browser spot-check also showed the brand icon and header nav rendering correctly with no horizontal overflow at the active viewport.

## Decision

GO / PASS for deploy handoff.

No P0/P1/P2 blocking issues were found in the P2 SEO content page implementation. The only note is operational: local preview port 4173 was already occupied during QA, so port 4183 was used for HTTP verification.
