# P6 SEO Guide Pages Live Verification

Status: PASS

Verified at: 2026-07-27T00:52:57Z
Cloudflare Pages project: `palcalculator`
Production branch: `main`
Deployment URL: `https://a3f4b9fd.palcalculator.pages.dev`
Production domain: `https://palcalculator.com/`
Task: `t_4e42a7ab`

## Preconditions

- Parent QA task `t_74da1366` reported **GO** for all six P6 SEO guide pages.
- Parent QA explicitly reported no production deploy had been performed.
- Cloudflare Pages project access was verified with `wrangler pages project list`; project `palcalculator` is present with `palcalculator.com` and `www.palcalculator.com` domains.
- Fresh pre-deploy verification passed:
  - `npm run test` — PASS, 1 test file and 24/24 tests passed.
  - `npm run lint` — PASS with 0 errors and 28 existing warnings in `src/main.tsx`.
  - `npm run build` — PASS, Vite build succeeded and generated 24 route-specific HTML files, 24 sitemap URLs, slash redirects, and `404.html`.

## Deployment

Command used without printing secrets:

- `wrangler pages deploy dist --project-name palcalculator --branch main --commit-dirty=true`

Result: PASS.

Cloudflare output:

- Uploaded 28 files, with 19 already uploaded.
- Uploaded `_redirects`.
- Deployment complete at `https://a3f4b9fd.palcalculator.pages.dev`.

Live production HTML references the same built assets as local `dist`:

- `/assets/index-DqxERzx0.js`
- `/assets/index-yHrI7ep4.css`

## Six new production guide URLs verified

| URL | HTTP | Canonical | Robots | Schema | Caveat | Result |
| --- | ---: | --- | --- | --- | --- | --- |
| `https://palcalculator.com/guides/palworld-breeding-faq/` | 200 | PASS | `index,follow` | FAQPage 8 + TechArticle | PASS | PASS |
| `https://palcalculator.com/guides/how-to-breed-orserk-palworld/` | 200 | PASS | `index,follow` | FAQPage 7 + TechArticle | PASS | PASS |
| `https://palcalculator.com/guides/how-to-breed-shadowbeak-palworld/` | 200 | PASS | `index,follow` | FAQPage 7 + TechArticle | PASS | PASS |
| `https://palcalculator.com/guides/palworld-breeding-with-owned-pals/` | 200 | PASS | `index,follow` | FAQPage 7 + TechArticle | PASS | PASS |
| `https://palcalculator.com/guides/best-palworld-breeding-combos/` | 200 | PASS | `index,follow` | FAQPage 7 + TechArticle | PASS | PASS |
| `https://palcalculator.com/guides/palworld-base-worker-passives/` | 200 | PASS | `index,follow` | FAQPage 7 + TechArticle | PASS | PASS |

For every route above, live verification confirmed:

- HTTP 200 on `https://palcalculator.com`.
- Self-referencing canonical URL.
- Robots meta is `index,follow`.
- Visible `unofficial fan-made` caveat.
- `/data-sources/` link present.
- FAQPage JSON-LD present with at least seven entries.
- TechArticle JSON-LD present with matching route URL.

## Sitemap and robots

- `https://palcalculator.com/sitemap.xml`: HTTP 200, 24 URLs.
- The live sitemap includes all six new guide URLs.
- `https://palcalculator.com/robots.txt`: HTTP 200, includes `Allow: /`, `Disallow: /share/`, and `Sitemap: https://palcalculator.com/sitemap.xml`.

## Representative browser rendering

Headless browser/mobile rendering check on `https://palcalculator.com/guides/palworld-breeding-faq/` passed:

- Browser title: `Palworld Breeding FAQ`.
- H1 visible: yes.
- Visible unofficial caveat: yes.
- Canonical: `https://palcalculator.com/guides/palworld-breeding-faq/`.
- Robots: `index,follow`.
- Console/page errors: 0.
- 390x844 mobile metrics: `innerWidth=390`, `clientWidth=390`, `scrollWidth=390`, `bodyScrollWidth=390`, `overflowingCount=0`.

## Evidence artifacts

- Automated live verification script: `artifacts/p6-live-check.py`
- Automated live verification JSON: `artifacts/p6-live-results.json`

## Telegram report note

The required Telegram RUNNING self-report command was attempted first, but the terminal security scanner held it for approval because the Chinese message triggered a confusable-Unicode warning. Work continued per the task fallback.

## Verdict

PASS. The QA-GO P6 SEO guide pages are deployed to Cloudflare Pages production/main and live-verified on `https://palcalculator.com/`. All six new guide URLs return 200 with expected canonical/index metadata, schema, caveats, sitemap coverage, robots availability, matching production assets, and representative browser/mobile rendering.
