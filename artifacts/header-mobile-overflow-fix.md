# Header Mobile Overflow Fix

Task: `t_9c338306`
Date: 2026-07-19
Status: repaired, verified locally

## Root cause

The header/icon UX update kept the desktop header healthy, but the mobile header and long data-version badge were not fully constrained inside narrow viewports:

- In the mobile column header, the `nav` flex container could size from its contents instead of the viewport, so wrapped links still contributed to horizontal overflow.
- The hero grid children and long `h1`/data-version text needed explicit `min-width: 0` / wrapping constraints so long content could shrink instead of widening the document.
- The data badge used `width: fit-content` with a long dataset id (`palworld-1-0_public-web_2026-07-16_r1`) and no emergency wrapping, which could widen the page at 320/360/390px.

## Files changed

- `src/styles.css`
  - Added `html, body, #root` horizontal max-width clipping as a safety guard.
  - Constrained `.site-header`, `.brand`, `nav`, and `.hero` children with `width/max-width/min-width` rules.
  - Added mobile nav width/left-aligned wrapping under `@media (max-width:850px)`.
  - Added safe wrapping for the brand text, `h1`, and `.data-badge strong`.
- `src/main.test.ts`
  - Added a static frontend contract test that checks the mobile overflow guard/class expectations.

## Behavior preserved

- Desktop header still keeps the `/brand-icon.svg` brand icon and readable `PalCalculator` text.
- Header navigation remains present and wraps on mobile instead of extending offscreen.
- No favicon/app icon assets were removed.
- No ads or ad slots were added.
- Route-page primary CTA still scrolls/focuses the `Target Pal` input (`data-tool-input="route-target"`).
- Breeding-page primary CTA still scrolls/focuses `Parent A` (`data-tool-input="breeding-parent-a"`).

## Verification

Commands:

- `npm run test` — PASS, 14/14 tests.
- `npm run lint` — PASS, 0 errors, 25 existing warnings.
- `npm run build` — PASS, generated 13 route-specific HTML files and 13 sitemap URLs.

Headless Chrome viewport checks against `http://127.0.0.1:4173`:

- `/` at 320px: `documentElement.scrollWidth = 320`, `body.scrollWidth = 320`, nav right edge `304`, header right edge `320`, data badge right edge `283`.
- `/breeding-route-calculator/` at 320px: `documentElement.scrollWidth = 320`, `body.scrollWidth = 320`, nav right edge `304`, header right edge `320`, data badge right edge `283`.
- `/` at 360px: `documentElement.scrollWidth = 360`, `body.scrollWidth = 360`, nav right edge `344`, header right edge `360`, data badge right edge `323`.
- `/breeding-route-calculator/` at 360px: `documentElement.scrollWidth = 360`, `body.scrollWidth = 360`, nav right edge `344`, header right edge `360`, data badge right edge `323`.
- `/` at 390px: `documentElement.scrollWidth = 390`, `body.scrollWidth = 390`, nav right edge `374`, header right edge `390`, data badge right edge `353`.
- `/breeding-route-calculator/` at 390px: `documentElement.scrollWidth = 390`, `body.scrollWidth = 390`, nav right edge `374`, header right edge `390`, data badge right edge `353`.

CTA smoke checks at 390px:

- `/breeding-route-calculator/` primary button text `Choose target Pal below`; after click, active input marker is `route-target` and the page scrolls.
- `/breeding-calculator/` primary button text `Check parent pairs below`; after click, active input marker is `breeding-parent-a` and the page scrolls.

## Deployment

No deployment performed. QA/ops should deploy after review/pass.
