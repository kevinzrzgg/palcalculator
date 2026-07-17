# Remove Ads Live Verification

Status: PASS

Verified at: 2026-07-17T14:57:25Z
Commit deployed: `4104264`
Cloudflare Pages project: `palcalculator`
Production branch: `main`
Deployment URL: `https://a07bc464.palcalculator.pages.dev`
Production domain: `https://palcalculator.com/`

## Preconditions

- Confirmed `/root/projects/palcalculator/artifacts/remove-ads-qa.md` reports `Status: PASS`.
- Built current source with `npm run build`.
  - Result: PASS.
  - Build generated 10 route-specific HTML files, 10 sitemap URLs, explicit slash redirects, and `404.html`.
- Local post-build spot checks:
  - `dist/index.html`: no ad marker hits.
  - `dist/breeding-route-calculator/index.html`: no ad marker hits.
  - `dist/sitemap.xml`: 10 `<loc>` URLs.
  - `dist/robots.txt`: present.

## Deployment

Command used without printing secrets:

- `wrangler pages deploy dist --project-name=palcalculator --branch=main --commit-dirty=true`

Result: PASS. Cloudflare Pages uploaded 13 files, reused 15 already-uploaded files, uploaded `_redirects`, and completed deployment at `https://a07bc464.palcalculator.pages.dev`.

## Live production verification

Checked these live URLs with cache-control disabled and a Hermes verification user agent:

| URL | HTTP | Final URL | Bytes | Marker hits | Ad-like attribute hits | Empty ad-like slots |
| --- | ---: | --- | ---: | --- | ---: | ---: |
| `https://palcalculator.com/` | 200 | `https://palcalculator.com/` | 2725 | none | 0 | 0 |
| `https://palcalculator.com/breeding-route-calculator/` | 200 | `https://palcalculator.com/breeding-route-calculator/` | 2730 | none | 0 | 0 |
| `https://palcalculator.com/sitemap.xml` | 200 | `https://palcalculator.com/sitemap.xml` | 782 | none | 0 | 0 |
| `https://palcalculator.com/robots.txt` | 200 | `https://palcalculator.com/robots.txt` | 88 | none | 0 | 0 |

Marker scan terms:

- `Advertisement`
- `effectivecpmnetwork`
- `highperformanceformat`
- `ad-slot`
- `native-ad`
- `iframe-ad`
- `ad-container`
- `atOptions`
- `d3u598arehftfk`
- `d1y7vkl2sccx9w`

Additional blank-slot scan checked live HTML for empty `div`, `section`, or `aside` elements with ad-like `id` or `class` names such as ad slot/container/unit/banner/placeholder, advertisement, native-ad, or iframe-ad. Result: PASS, none found on the verified production pages.

## Sitemap and robots

- Live `https://palcalculator.com/sitemap.xml`: PASS, exactly 10 `<loc>` URLs.
- Live `https://palcalculator.com/robots.txt`: PASS, returned HTTP 200 and contains:
  - `User-agent: *`
  - `Allow: /`
  - `Disallow: /share/`
  - `Sitemap: https://palcalculator.com/sitemap.xml`

## Decision

PASS. The current ad-removal build was deployed to Cloudflare Pages production/main, the required live pages contain no removed ad script/UI markers and no detectable blank ad slots, and live sitemap/robots remain valid.
