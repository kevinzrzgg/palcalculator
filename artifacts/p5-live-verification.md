# P5 Live Verification — PalCalculator

Status: PASS

Verified at: 2026-07-26T23:33:24Z
Cloudflare Pages project: `palcalculator`
Production branch: `main`
Deployment URL: `https://f73d408a.palcalculator.pages.dev`
Production domain: `https://palcalculator.com/`
Task: `t_9154190e`

## Preconditions

- Parent QA task `t_c35cb8e9` reported **GO** for the currently implemented P5 frontend/backend/data changes.
- Repository/workspace was not clean, but it matched the expected deploy state for this shared workspace:
  - Modified source files: `src/calculators.ts`, `src/main.test.ts`, `src/main.tsx`, `src/styles.css`.
  - Modified/added artifact files from previous P4/P5 tasks were present.
  - Existing deploy flow supports dirty-worktree deploys via `--commit-dirty=true`, as used in prior production deploys.
- Cloudflare Pages permissions were available: `wrangler pages project list` returned the existing `palcalculator` project with `palcalculator.com` and `www.palcalculator.com` domains.
- Fresh production build command: `npm run build` — PASS.
  - Generated `dist/assets/index-Dx1p2p-m.js` and `dist/assets/index-yHrI7ep4.css`.
  - Generated 18 route-specific HTML files, 18 sitemap URLs, explicit slash redirects, and `404.html`.

## Deployment

Command used without printing secrets:

- `wrangler pages deploy dist --project-name palcalculator --branch main --commit-dirty=true`

Result: PASS.

Cloudflare output:

- Uploaded 22 files, with 19 already uploaded.
- Uploaded `_redirects`.
- Deployment complete at `https://f73d408a.palcalculator.pages.dev`.

## Changed / affected production URLs verified

| URL | HTTP | Canonical | Robots | Favicon links | Result |
| --- | ---: | --- | --- | --- | --- |
| `https://palcalculator.com/` | 200 | PASS | `index,follow` | PASS | PASS |
| `https://palcalculator.com/breeding-route-calculator/` | 200 | PASS | `index,follow` | PASS | PASS |
| `https://palcalculator.com/breeding-calculator/` | 200 | PASS | `index,follow` | PASS | PASS |
| `https://palcalculator.com/privacy/` | 200 | PASS | `index,follow` | PASS | PASS |
| `https://palcalculator.com/data-sources/` | 200 | PASS | `index,follow` | PASS | PASS |
| `https://palcalculator.com/guides/palworld-breeding-combos/` | 200 | PASS | `index,follow` | PASS | PASS |
| `https://palcalculator.com/guides/how-to-breed-orserk-palworld/` | 404 | n/a | n/a | n/a | PASS — expected; P5 copy route is not implemented or in sitemap |

Additional checks:

- `https://palcalculator.com/sitemap.xml`: HTTP 200, 18 URLs, includes representative checked routes.
- `https://palcalculator.com/robots.txt`: HTTP 200, contains `Allow: /`, `Disallow: /share/`, and `Sitemap: https://palcalculator.com/sitemap.xml`.
- Live production HTML references the same built assets as local `dist`:
  - `/assets/index-Dx1p2p-m.js`
  - `/assets/index-yHrI7ep4.css`
- P5 bundle strings present in the live JS bundle:
  - Browser-local owned Pal helper copy.
  - `palcalculator:owned-pals:v1` localStorage key.
  - `owned_list_add`, `owned_list_remove`, `owned_list_clear`, `owned_list_apply` event names.
  - `owned_count_bucket` and `browser_local` payload markers.

## Browser interaction checks

Headless Chrome exercised live production UI at `https://palcalculator.com/`:

| Check | Result |
| --- | --- |
| Homepage loads and shows beginner content | PASS |
| `/breeding-route-calculator/` shows Browser-local owned Pal helper | PASS |
| Adding `Anubis` to the browser-local list creates confirmation/chip state | PASS |
| `Use local list in route` applies the local list to the route input | PASS |
| Route result changes to `Anubis already owned` | PASS |
| `/privacy/` contains the sensitive-payload avoidance copy | PASS |
| Browser console errors during checks | PASS — none |

## Evidence artifacts

- Automated live verification script: `artifacts/p5-live-check.py`
- Automated live verification JSON: `artifacts/p5-live-results.json`

## Verdict

PASS. The QA-passed P5 implemented changes are deployed to Cloudflare Pages production/main and live-verify on `https://palcalculator.com/`. The custom production domain serves the newly built assets, representative affected routes return expected HTTP/canonical/robots metadata, sitemap/robots remain valid, the P5 browser-local owned Pal helper works in production, privacy copy is present, and the unimplemented P5 SEO draft route remains a 404 outside the sitemap as expected.
