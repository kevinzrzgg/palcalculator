# Header Icon and CTA UX Implementation

Task: `t_6ffc3137`
Date: 2026-07-18
Status: implementation complete, committed/push pending at artifact creation time

## Summary

Implemented the PalCalculator header brand/icon and hero CTA clarity optimization from `artifacts/header-icon-design-handoff.md`.

## Changes made

- Header brand mark now uses `/brand-icon.svg` as an image asset in `src/main.tsx`, with the adjacent `PalCalculator` text preserved for readability.
- Favicon/app icon links were kept in the base HTML and static route generator, and a web app manifest was added at `/site.webmanifest` referencing `/icon-192.png` and `/icon-512.png`.
- Homepage hero CTAs now separate the two workflows:
  - Primary: `Plan a breeding route`
  - Secondary: `Check parent pairs`
- `/breeding-route-calculator/` hero no longer repeats a self-navigation route button. Its primary CTA is `Choose target Pal below`, which scrolls/focuses the route Target Pal input.
- `/breeding-calculator/` hero now uses `Check parent pairs below`, which focuses the pair/target lookup workspace, with a secondary route-planning CTA only for multi-step workflows.
- Added inline microcopy explaining the difference:
  - Route planning = target Pal + owned Pals + shortest caveated path.
  - Breeding calculator = parent/child lookup or target-child parent options.
- Preserved SEO/canonical/static route generation, sitemap, Microsoft Clarity, Google Analytics, and no-ads state.

## Files changed

- `src/main.tsx`
- `src/styles.css`
- `src/main.test.ts`
- `index.html`
- `scripts/generate-static-routes.mjs`
- `public/site.webmanifest`
- Existing icon assets from the design handoff remain in `public/`.

## Verification

Commands run:

- `npm run test` — passed, 13/13 tests.
- `npm run lint` — passed with 25 existing warnings, 0 errors.
- `npm run build` — passed; generated 13 route-specific HTML files and 13 sitemap URLs.

Static route spot check after build:

- `dist/index.html` includes `/site.webmanifest`, Clarity, GA, and canonical link.
- `dist/breeding-route-calculator/index.html` includes `/site.webmanifest`, Clarity, GA, and canonical link.
- `dist/breeding-calculator/index.html` includes `/site.webmanifest`, Clarity, GA, and canonical link.
- `dist/404.html` includes icon/manifest and analytics tags and remains noindex.

## Notes for QA/Ops

- No deployment was performed.
- Please verify the header brand mark and hero CTAs visually on the next preview/production build, especially the route page `Choose target Pal below` focus behavior.
