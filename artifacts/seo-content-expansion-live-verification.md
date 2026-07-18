# PalCalculator SEO Content Expansion Live Verification — Batch 1

Status: PASS

Verified at: 2026-07-18T09:20:48Z
Cloudflare Pages project: `palcalculator`
Production branch: `main`
Deployment URL: `https://2abfa0c2.palcalculator.pages.dev`
Production domain: `https://palcalculator.com/`

## Preconditions

- Confirmed `/root/projects/palcalculator/artifacts/seo-content-expansion-qa.md` reports GO/PASS for the first three SEO content expansion pages.
- Built current source with `npm run build`.
  - Result: PASS.
  - Build generated 13 route-specific HTML files, 13 sitemap URLs, explicit slash redirects, and `404.html`.

## Deployment

Command used without printing secrets:

- `wrangler pages deploy dist --project-name palcalculator --branch main --commit-dirty=true`

Result: PASS. Cloudflare Pages uploaded 18 files, reused 13 already-uploaded files, uploaded `_redirects`, and completed deployment at `https://2abfa0c2.palcalculator.pages.dev`.

## Live production page verification

Checked live URLs with cache-control disabled and a Hermes verification user agent.

| Route | HTTP | Final URL | Title | Description | Canonical | Robots | Favicon links | Ad marker hits |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| `/guides/palworld-breeding-combos/` | 200 | `https://palcalculator.com/guides/palworld-breeding-combos/` | `Palworld Breeding Combos Guide` | present, 121 chars | `https://palcalculator.com/guides/palworld-breeding-combos/` | `index,follow` | `/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png` | none |
| `/guides/palworld-breeding-tree/` | 200 | `https://palcalculator.com/guides/palworld-breeding-tree/` | `Palworld Breeding Tree Guide` | present, 119 chars | `https://palcalculator.com/guides/palworld-breeding-tree/` | `index,follow` | `/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png` | none |
| `/guides/palworld-1-0-breeding-guide/` | 200 | `https://palcalculator.com/guides/palworld-1-0-breeding-guide/` | `Palworld 1.0 Breeding Guide` | present, 114 chars | `https://palcalculator.com/guides/palworld-1-0-breeding-guide/` | `index,follow` | `/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png` | none |

## Sitemap, robots, and favicon checks

- `https://palcalculator.com/sitemap.xml`: HTTP 200, 13 URLs.
- Sitemap includes all three new guide URLs:
  - `https://palcalculator.com/guides/palworld-breeding-combos/`
  - `https://palcalculator.com/guides/palworld-breeding-tree/`
  - `https://palcalculator.com/guides/palworld-1-0-breeding-guide/`
- `https://palcalculator.com/robots.txt`: HTTP 200 and contains:
  - `Allow: /`
  - `Disallow: /share/`
  - `Sitemap: https://palcalculator.com/sitemap.xml`
- `https://palcalculator.com/favicon.ico`: HTTP 200, 226 bytes.
- `https://palcalculator.com/favicon.svg`: HTTP 200, 530 bytes.

## Ad marker regression check

Live HTML for the three new guide pages, sitemap, and robots was scanned for known removed ad/script/container markers:

- `effectivecpmnetwork`
- `highperformanceformat`
- `atOptions`
- `data-palcalculator-ad-key`
- `NativeAd`
- `HighPerformanceAd`
- `Advertisement`
- `ad-slot`
- `native-ad`
- `iframe-ad`
- `iframe-ad-grid`
- `iframe-ad-mount`
- `ad-container`

Result: PASS, no marker hits found.

## Decision

PASS. The first batch of SEO content expansion pages was deployed to Cloudflare Pages production/main and live-verifies on `https://palcalculator.com/` with HTTP 200 responses, valid metadata/canonicals/robots/favicon links, sitemap inclusion, working robots.txt, and no removed ad markers.
