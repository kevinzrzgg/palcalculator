# PalCalculator P2 SEO Content Live Verification — Batch 2

Status: PASS

Verified at: 2026-07-20T00:56:34Z
Cloudflare Pages project: `palcalculator`
Production branch: `main`
Deployment URL: `https://e11d05dd.palcalculator.pages.dev`
Production domain: `https://palcalculator.com/`

## Preconditions

- Confirmed `/root/projects/palcalculator/artifacts/p2-seo-content-qa.md` reports `GO / PASS` for the P2 second SEO content batch.
- Built current source with `npm run build`.
  - Result: PASS.
  - Build generated 18 route-specific HTML files, 18 sitemap URLs, explicit slash redirects, and `404.html`.

## Deployment

Command used without printing secrets:

- `wrangler pages deploy dist --project-name palcalculator --branch main --commit-dirty=true`

Result: PASS. Cloudflare Pages uploaded 22 files, reused 18 already-uploaded files, uploaded `_redirects`, and completed deployment at `https://e11d05dd.palcalculator.pages.dev`.

## Live production page verification

Checked live URLs on `https://palcalculator.com` with cache-control disabled and a Hermes verification user agent.

| Route | HTTP | Final URL | Title | Description | Canonical | Robots | Favicon links | Ad marker hits |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| `/guides/palworld-iv-explained/` | 200 | `https://palcalculator.com/guides/palworld-iv-explained/` | `Palworld IV Explained` | present, 110 chars | `https://palcalculator.com/guides/palworld-iv-explained/` | `index,follow` | `/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png` | none |
| `/guides/best-passive-skills-for-breeding-palworld/` | 200 | `https://palcalculator.com/guides/best-passive-skills-for-breeding-palworld/` | `Best Passive Skills for Breeding in Palworld` | present, 119 chars | `https://palcalculator.com/guides/best-passive-skills-for-breeding-palworld/` | `index,follow` | `/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png` | none |
| `/guides/how-to-breed-anubis-palworld/` | 200 | `https://palcalculator.com/guides/how-to-breed-anubis-palworld/` | `How to Breed Anubis in Palworld` | present, 121 chars | `https://palcalculator.com/guides/how-to-breed-anubis-palworld/` | `index,follow` | `/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png` | none |
| `/guides/how-to-breed-jetragon-palworld/` | 200 | `https://palcalculator.com/guides/how-to-breed-jetragon-palworld/` | `How to Breed Jetragon in Palworld` | present, 132 chars | `https://palcalculator.com/guides/how-to-breed-jetragon-palworld/` | `index,follow` | `/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png` | none |
| `/guides/palworld-breeding-route-examples/` | 200 | `https://palcalculator.com/guides/palworld-breeding-route-examples/` | `Palworld Breeding Route Examples` | present, 116 chars | `https://palcalculator.com/guides/palworld-breeding-route-examples/` | `index,follow` | `/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png` | none |

## Sitemap, robots, and favicon checks

- `https://palcalculator.com/sitemap.xml`: HTTP 200, `application/xml`, 18 URLs.
- Sitemap includes all five P2 guide URLs:
  - `https://palcalculator.com/guides/palworld-iv-explained/`
  - `https://palcalculator.com/guides/best-passive-skills-for-breeding-palworld/`
  - `https://palcalculator.com/guides/how-to-breed-anubis-palworld/`
  - `https://palcalculator.com/guides/how-to-breed-jetragon-palworld/`
  - `https://palcalculator.com/guides/palworld-breeding-route-examples/`
- `https://palcalculator.com/robots.txt`: HTTP 200, `text/plain; charset=utf-8`, and contains:
  - `Allow: /`
  - `Disallow: /share/`
  - `Sitemap: https://palcalculator.com/sitemap.xml`
- `https://palcalculator.com/favicon.ico`: HTTP 200, `image/vnd.microsoft.icon`.
- `https://palcalculator.com/favicon.svg`: HTTP 200, `image/svg+xml`.

## Ad marker regression check

Live HTML for the five P2 guide pages, sitemap, and robots was scanned for known removed ad/script/container markers:

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
- `iframe-ad`
- `iframe-ad-grid`
- `iframe-ad-mount`
- `ad-container`

Result: PASS, no marker hits found.

## Decision

PASS. The P2 second SEO content batch was deployed to Cloudflare Pages production/main and live-verifies on `https://palcalculator.com/` with HTTP 200 responses, valid metadata/canonicals/robots/favicon links, sitemap inclusion, working robots.txt, and no removed ad markers.
