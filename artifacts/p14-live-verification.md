# P14 live verification — AdSense recovery improvements

Task: `t_1a5db122`
Status: PASS / deployed and live-verified
Verified at: `2026-08-04T13:03:11Z`
Production origin: `https://palcalculator.com/`

## Conclusion

PASS. P14 AdSense recovery trust/depth improvements were deployed to Cloudflare Pages production/main and live production checks passed for the homepage, core calculators, new trust pages, representative old/new guide pages, sitemap/robots/ads.txt/canonical/schema basics, browser console smoke, and 390px mobile representative pages.

## QA gate

Confirmed parent QA GO from task `t_0d266e6f` and artifacts `artifacts/p14-qa.md` / `artifacts/p14-qa-results.json`. No deploy was performed before that GO handoff.

## Pre-deploy verification

| Check | Result | Evidence |
|---|---|---|
| `npm run test` | PASS | Vitest: 1 test file passed, 35 tests passed. |
| `npm run lint` | PASS with warnings | ESLint completed with 0 errors and 41 existing warnings in `src/main.tsx` from React fast-refresh / hook dependency warning classes. |
| `npm run build` | PASS | `tsc -b`, Vite build, and static route generation completed; generated 38 route-specific HTML files and 38 sitemap URLs. |

## Git and deploy

- Source commit deployed: `734e8f7` (source commit `be2a2f2` plus preserved live-verification artifacts in `docs: add P14 live verification`).
- Push: `origin/main` updated through `734e8f7` before final deploy.
- Cloudflare Pages project: `palcalculator`.
- Deploy command: `npx wrangler pages deploy dist --project-name palcalculator --branch main`.
- Final deploy result: PASS; uploaded 0 files, 68 already uploaded, `_redirects` uploaded.
- Production deployment: `26d37ab1-05f8-41e1-83d8-05c3349fc591`.
- Deployment URL: `https://26d37ab1.palcalculator.pages.dev`.
- Deployment list confirmed latest production branch `main`, source `734e8f7`.

## Live route checks

Live checker: `artifacts/p14-live-check.py`.
Structured evidence: `artifacts/p14-live-verification-results.json`.

Checked routes:

- Core pages: `/`, `/breeding-calculator/`, `/breeding-route-calculator/`, `/iv-calculator/`, `/stats-calculator/`, `/passive-skill-calculator/`, `/palworld-1-0-breeding-calculator/`.
- Trust pages: `/about/`, `/contact/`, `/editorial-policy/`, `/advertising-disclosure/`, `/privacy/`, `/terms/`, `/data-sources/`.
- Representative old guides: `/guides/how-to-breed-anubis-palworld/`, `/guides/best-palworld-breeding-combos/`.
- Representative new guides: `/guides/how-to-breed-faleris-palworld/`, `/guides/how-to-breed-selyne-palworld/`.

All checked routes returned HTTP 200, self-canonical URLs, `meta robots` = `index,follow`, useful meta descriptions, `/data-sources/` links, and no unsafe positive risky-claim matches. Caveated/negated strings such as “unofficial fan-made” and “not be treated as guaranteed inheritance” were recorded as safe context in the JSON evidence.

## Sitemap, robots, ads.txt, schema, snippets

- `https://palcalculator.com/sitemap.xml`: HTTP 200, 38 URLs, includes new P14 trust pages, no query URLs, `/share/` URLs, or result/result-state leaks.
- `https://palcalculator.com/robots.txt`: HTTP 200, includes `Allow: /`, `Disallow: /share/`, and `Sitemap: https://palcalculator.com/sitemap.xml`.
- `https://palcalculator.com/ads.txt`: HTTP 200, includes `google.com, pub-8075999128078609, DIRECT, f08c47fec0942fa0`.
- New trust pages expose `WebPage` and `FAQPage` structured data where applicable.
- Homepage source includes Google Analytics `G-8G78ED7TNS` and AdSense client `ca-pub-8075999128078609`.
- No paywall, checkout, subscription, forced login, intrusive overlay, or dense ad unit was observed in source/static/browser checks.

## Browser console smoke

Browser tool checks used `browser_navigate` plus `browser_console(clear=true)` on:

- `/`
- `/breeding-route-calculator/`
- `/about/`
- `/guides/how-to-breed-faleris-palworld/`

Result: PASS. Total console messages: 0. Total JavaScript errors: 0.

## 390px mobile smoke

Generated live 390px-wide screenshots with headless Chrome and visually inspected representative pages:

- `artifacts/p14-live-mobile/home.png`
- `artifacts/p14-live-mobile/route.png`
- `artifacts/p14-live-mobile/about.png`
- `artifacts/p14-live-mobile/faleris.png`

Result: PASS. Content stacks correctly with no visible horizontal clipping/overflow and no intrusive ads, paywall, overlay, or login prompt.

## Notes

- Required Telegram RUNNING self-report was attempted first, but the terminal security guard returned `pending_approval` because the Chinese message tripped a confusable-Unicode guard. Work continued under the task fallback instruction and this result is recorded in Kanban.
- No Cloudflare dashboard, DNS, GSC, backend storage, login, payment, Stripe, paywall, or intrusive ad-density changes were performed.

Final line: [DONE]
