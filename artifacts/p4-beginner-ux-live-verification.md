# P4 Beginner UX Live Verification — PalCalculator

Status: PASS

Verified at: 2026-07-21T02:57:57Z
Cloudflare Pages project: `palcalculator`
Production branch: `main`
Deployment URL: `https://e886efee.palcalculator.pages.dev`
Production domain: `https://palcalculator.com/`
Task: `t_2bb4ade4`

## Preconditions

- Confirmed `artifacts/p4-beginner-ux-qa.md` reports `GO / PASS` for the P4 beginner UX upgrade.
- Built current source with `npm run build`.
  - Result: PASS.
  - Build generated 18 route-specific HTML files, 18 sitemap URLs, explicit slash redirects, and `404.html`.

## Deployment

Command used without printing secrets:

- `wrangler pages deploy dist --project-name palcalculator --branch main --commit-dirty=true`

Result: PASS. Cloudflare Pages uploaded 22 files, reused 18 already-uploaded files, uploaded `_redirects`, and completed deployment at `https://e886efee.palcalculator.pages.dev`.

## Live production asset verification

Checked `https://palcalculator.com/` with cache-control disabled and a Hermes verification user agent.

- Live production HTML references the same built assets as local `dist`:
  - `/assets/index-edStYQzY.js`
  - `/assets/index-CpDzVnKF.css`
- Live JS bundle returned HTTP 200 and contains all required beginner UX strings:
  - `How to use PalCalculator`
  - `Choose your goal`
  - `Try an example`
  - `Read what it means`
  - `Try Anubis example`
  - `Try: Anubis parent lookup`
  - `Try: Penking + Bushi pair`
  - `Try: Jetragon target lookup`
  - `Try: route to Anubis from Penking + Bushi`
  - `Try: no owned Pals yet`
  - `Try: level 50 Anubis IV bands`
  - `Try: Anubis expected stats`
  - `Try: Swift mobility passive plan`
  - `This means...`, `Next step...`, `Caveat...`
  - `PASSIVE_RNG_CAVEATED`, `PASSIVE_NAMES_UNSUPPORTED`

## Browser interaction checks

Headless Chrome exercised live production UI at `https://palcalculator.com/`:

| Check | Result |
| --- | --- |
| Homepage beginner section shows `How to use PalCalculator`, `Choose your goal`, `Try an example`, and `Read what it means` | PASS |
| Homepage `Try Anubis example` opens `/breeding-calculator/` and shows `66 parent pairs found for Anubis` plus result explainer labels | PASS |
| Breeding page `Try: Penking + Bushi pair` shows `Penking + Bushi → Sibelyx` | PASS |
| Passive page `Try: Swift mobility passive plan` shows `1 desired passive(s) recognized` and `PASSIVE_RNG_CAVEATED` | PASS |
| Route page `Try: no owned Pals yet` shows `Route found to Anubis` | PASS |

## Live page metadata, sitemap, robots, favicon, and no-ad checks

Representative pages were fetched from production and verified for HTTP 200, self-referencing canonical, `index,follow` robots, favicon/apple-touch-icon links, and no removed ad markers.

| Route | HTTP | Canonical | Robots | Favicon links | Ad marker hits |
| --- | ---: | --- | --- | --- | --- |
| `/` | 200 | PASS | PASS | PASS | none |
| `/breeding-calculator/` | 200 | PASS | PASS | PASS | none |
| `/breeding-route-calculator/` | 200 | PASS | PASS | PASS | none |
| `/iv-calculator/` | 200 | PASS | PASS | PASS | none |
| `/stats-calculator/` | 200 | PASS | PASS | PASS | none |
| `/passive-skill-calculator/` | 200 | PASS | PASS | PASS | none |
| `/palworld-1-0-breeding-calculator/` | 200 | PASS | PASS | PASS | none |
| `/guides/how-to-breed-anubis-palworld/` | 200 | PASS | PASS | PASS | none |

Additional production checks:

- `https://palcalculator.com/sitemap.xml`: HTTP 200, 18 URLs, includes representative checked routes.
- `https://palcalculator.com/robots.txt`: HTTP 200, contains `Allow: /`, `Disallow: /share/`, and `Sitemap: https://palcalculator.com/sitemap.xml`.
- `https://palcalculator.com/favicon.ico`: HTTP 200.
- `https://palcalculator.com/favicon.svg`: HTTP 200.
- Removed ad/script/container marker scan: PASS, no hits for `adsbygoogle`, `googlesyndication`, `ad-slot`, `ad-container`, `ad-banner`, `native-ad`, `effectivecpmnetwork`, `highperformanceformat`, `atOptions`, `NativeAd`, `HighPerformanceAd`, `Advertisement`, `iframe-ad`, `iframe-ad-grid`, or `iframe-ad-mount`.

## Evidence artifacts

- Automated live verification script: `artifacts/p4-beginner-ux-live-check.py`
- Automated live verification JSON: `artifacts/p4-beginner-ux-live-results.json`

## Verdict

PASS. The QA-passed P4 beginner UX upgrade is deployed to Cloudflare Pages production/main and live-verifies on `https://palcalculator.com/` with beginner examples/helper copy, interactive result explainers, sitemap, robots, canonical URLs, favicons/icons, and no-ad regressions all passing.
