# Header Icon and CTA UX QA

Task: `t_011fbf45`
Date: 2026-07-19
Status: **GO / PASS**

## Scope

Re-ran QA verification for the PalCalculator header icon and CTA clarity optimization from parent frontend task `t_6ffc3137`, after the mobile overflow repair accepted in commit `60bc17b`.

Reference artifacts read:
- `artifacts/header-icon-design-handoff.md`
- `artifacts/header-icon-ux-implementation.md`

Reference screenshot supplied by task:
- `/root/.hermes/cache/images/img_affd78190169.jpg`

Additional QA evidence generated:
- `artifacts/header-icon-ux-qa-results.json`
- `artifacts/qa-header-check.py`
- `artifacts/qa-screenshots/home-320.png`
- `artifacts/qa-screenshots/home-360.png`
- `artifacts/qa-screenshots/home-390.png`
- `artifacts/qa-screenshots/home-1280.png`
- `artifacts/qa-screenshots/breeding-route-calculator-320.png`
- `artifacts/qa-screenshots/breeding-route-calculator-360.png`
- `artifacts/qa-screenshots/breeding-route-calculator-390.png`
- `artifacts/qa-screenshots/breeding-route-calculator-1280.png`
- `artifacts/qa-screenshots/breeding-calculator-320.png`
- `artifacts/qa-screenshots/breeding-calculator-360.png`
- `artifacts/qa-screenshots/breeding-calculator-390.png`
- `artifacts/qa-screenshots/breeding-calculator-1280.png`

## Command verification

All required commands pass:

- `npm run test` — PASS, 14/14 tests.
- `npm run lint` — PASS with 0 errors and 25 existing warnings from `react-refresh/only-export-components` and `react-hooks/exhaustive-deps`.
- `npm run build` — PASS; generated 13 route-specific HTML files, 13 sitemap URLs, explicit slash redirects, and `404.html`.

## Checks performed

### 1. Header icon asset and brand area

Pass:

- Header brand uses a real image asset: `.brand-mark` with `src="/brand-icon.svg"` in `src/main.tsx`.
- Brand text `PalCalculator` remains visible next to the mark.
- The prior text-only `PC` brand tile is not present in app source; the only remaining `PC` string is a regression-test assertion that rejects the old tile.
- Runtime/CDP checks confirmed `.brand-mark` loads with natural dimensions and the header nav labels are present: Breeding, Route, IV, Stats, Passives, Data Sources.
- Desktop screenshot at 1280px shows the real icon, visible brand text, and aligned/unbroken nav.

### 2. Mobile and desktop layout

Pass after repair:

- Tested `/`, `/breeding-route-calculator/`, and `/breeding-calculator/` at 320px, 360px, 390px, and 1280px.
- For every tested page/viewport, `document.documentElement.scrollWidth` matched `window.innerWidth`, `maxRight` did not exceed viewport width, and the overflow candidate list was empty.
- Visual screenshots at 320px and 390px show header/nav wrapping cleanly with no horizontal clipping.

Representative metrics:

| Page | Width | Document scroll width | Max element right | Overflowing elements |
| --- | ---: | ---: | ---: | ---: |
| `/` | 320 | 320 | 320 | 0 |
| `/` | 390 | 390 | 390 | 0 |
| `/breeding-route-calculator/` | 320 | 320 | 320 | 0 |
| `/breeding-route-calculator/` | 390 | 390 | 390 | 0 |
| `/breeding-calculator/` | 320 | 320 | 320 | 0 |
| `/breeding-calculator/` | 390 | 390 | 390 | 0 |
| `/` | 1280 | 1280 | 1280 | 0 |

### 3. CTA clarity and route/breeding behavior

Pass:

- Homepage primary CTA: `Plan a breeding route`.
- Homepage secondary CTA: `Check parent pairs`.
- Homepage microcopy distinguishes route planning from direct parent/child lookup.
- Route page CTAs: `Choose target Pal below` and `Need parent/child lookup?`.
- Clicking route primary CTA stays on `/breeding-route-calculator/` and focuses `data-tool-input="route-target"` (`Target Pal`).
- Breeding page CTAs: `Check parent pairs below` and `Plan multi-step route`.
- Clicking breeding primary CTA stays on `/breeding-calculator/` and focuses `data-tool-input="breeding-parent-a"` (`Parent A`).
- This avoids redundant/confusing self-navigation while preserving a distinct route-planning handoff.

### 4. Favicons and app icons

Preview HTTP checks pass:

- `/brand-icon.svg` — `200`, `image/svg+xml`, 929 bytes.
- `/favicon.svg` — `200`, `image/svg+xml`, 783 bytes.
- `/favicon.ico` — `200`, `image/x-icon`, 13942 bytes.
- `/apple-touch-icon.png` — `200`, `image/png`, 56500 bytes.
- `/icon-192.png` — `200`, `image/png`, 58147 bytes.
- `/icon-512.png` — `200`, `image/png`, 359926 bytes.
- `/site.webmanifest` — `200`, 433 bytes, references `/icon-192.png` and `/icon-512.png`.

Built asset checks pass for all the same files under `dist/`.

### 5. SEO, robots, sitemap, canonical, analytics, and ads

Pass:

- `dist/index.html` canonical: `https://palcalculator.com/`.
- `dist/breeding-route-calculator/index.html` canonical: `https://palcalculator.com/breeding-route-calculator/`.
- `dist/breeding-calculator/index.html` canonical: `https://palcalculator.com/breeding-calculator/`.
- `dist/data-sources/index.html` canonical: `https://palcalculator.com/data-sources/`.
- `dist/404.html` remains `noindex,follow`.
- `dist/robots.txt` allows `/`, disallows `/share/`, and points to `https://palcalculator.com/sitemap.xml`.
- `dist/sitemap.xml` contains 13 indexable canonical URLs.
- Clarity and Google Analytics tags remain present in built HTML.
- No ad markers found in `src` or `dist` for: `adsbygoogle`, `googlesyndication`, `doubleclick`, `ad-slot`, `ad-container`, `AdSense`, `adsense`.

## Verdict

**GO / PASS.** The previous P1 mobile horizontal overflow finding is fixed at 320px, 360px, and 390px. Header icon, brand visibility, desktop/mobile nav, CTA clarity/behavior, favicon/app icons, no-ads state, sitemap, robots, canonical, and build health all pass.
