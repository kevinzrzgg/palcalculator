# P8 Share/Link Improvements Live Verification

Status: PASS

Verified at: 2026-07-28T01:00:58Z
Cloudflare Pages project: `palcalculator`
Production branch: `main`
Deployment URL: `https://a52c2361.palcalculator.pages.dev`
Production domain: `https://palcalculator.com/`
Task: `t_068b5b6c`
Automated JSON evidence: `artifacts/p8-live-results.json`
Automated verification script: `artifacts/p8-live-check.py`

## Preconditions

- Parent QA task `t_392907f6` reported **GO / safe to deploy** for P8.
- Parent QA artifacts: `artifacts/p8-qa.md` and `artifacts/p8-qa-results.json`.
- Required initial Telegram RUNNING self-report was attempted first. `hermes send` returned `pending_approval` because the Chinese text hit the tool approval/security guard, so work continued under the task fallback instruction.
- Cloudflare Pages project access was verified with `npx wrangler pages project list`; project `palcalculator` is present with `palcalculator.com` and `www.palcalculator.com` domains.

## Fresh pre-deploy verification

Run from `/root/projects/palcalculator` before deployment:

| Check | Result |
| --- | --- |
| `npm run test` | PASS: 1 test file, 27 tests passed |
| `npm run lint` | PASS: exit 0; 0 errors, 29 existing warnings in `src/main.tsx` |
| `npm run build` | PASS: Vite build succeeded; generated 24 route-specific HTML files, 24 sitemap URLs, explicit slash redirects, and `404.html` |

Lint warnings are the existing React fast-refresh/component-export and hook dependency warnings noted by upstream QA; they are not P8 deployment blockers.

## Deployment

Command used without printing secrets:

- `npx wrangler pages deploy dist --project-name palcalculator --branch main --commit-dirty=true`

Result: PASS.

Cloudflare output:

- Uploaded 27 files, with 20 already uploaded.
- Uploaded `_redirects`.
- Deployment complete at `https://a52c2361.palcalculator.pages.dev`.

Live production HTML references the same built assets as local `dist`:

- `index-Cmn6hg4O.js`
- `index-yHrI7ep4.css`

## Live production verification

Automated live check command:

- `python artifacts/p8-live-check.py`

Result: PASS.

The script verified `https://palcalculator.com/`, the deployment URL, six representative base routes, six representative query/share URLs, sitemap, robots, live asset filenames, static crawlable anchors, rendered crawlable anchors, canonical/robots behavior, and browser console errors.

Summary from `artifacts/p8-live-results.json`:

| Check | Result |
| --- | --- |
| Production home HTTP | PASS: 200 |
| Deployment URL HTTP | PASS: 200 |
| Live assets match local `dist` | PASS |
| Sitemap | PASS: 24 URLs, no query/share/results leaks |
| Robots | PASS: includes `Allow: /`, `Disallow: /share/`, and production sitemap |
| Representative base routes in sitemap | PASS |
| Static crawlable anchors | PASS: required tool anchors present, `button.card` count 0 |
| Browser base route canonical/robots/crawlable links | PASS |
| Browser query hydration/share URLs/canonical/noindex | PASS |
| Browser console errors | PASS: none |

## Representative query/share checks

All query-state pages kept canonical URLs on the base calculator route and runtime robots as `noindex,follow`.

| Flow | Production URL | Result |
| --- | --- | --- |
| Breeding pair | `https://palcalculator.com/breeding-calculator/?mode=pair&parentA=penking&parentB=bushi` | PASS: fields hydrated, result text seen, share href matched the same route/query, canonical base route, `noindex,follow` |
| Breeding target parents | `https://palcalculator.com/breeding-calculator/?mode=target&target=anubis` | PASS: target hydrated, parent-pair result seen, share href matched, canonical base route, `noindex,follow` |
| Route | `https://palcalculator.com/breeding-route-calculator/?target=anubis&maxGen=5` | PASS: route target/maxGen hydrated, route result seen, share href omitted owned/localStorage data, canonical base route, `noindex,follow` |
| IV | `https://palcalculator.com/iv-calculator/?pal=anubis&level=50&hp=500&attack=130&defense=100` | PASS: state hydrated, IV result seen, share href matched, canonical base route, `noindex,follow` |
| Stats | `https://palcalculator.com/stats-calculator/?pal=anubis&level=30&hp=360&attack=95&defense=75` | PASS: state hydrated, stats result seen, share href matched, canonical base route, `noindex,follow` |
| Passives | `https://palcalculator.com/passive-skill-calculator/?target=anubis&passives=artisan,serious` | PASS: target/passives hydrated, passive result seen, share href normalized to `passives=artisan%2Cserious`, canonical base route, `noindex,follow` |

## Crawlable links, sitemap, canonical, robots

- `https://palcalculator.com/sitemap.xml`: HTTP 200, 24 URLs.
- Sitemap contains no query URLs, `/share/`, or `/results/` URLs.
- `https://palcalculator.com/robots.txt`: HTTP 200.
- Robots content includes `Allow: /`, `Disallow: /share/`, and `Sitemap: https://palcalculator.com/sitemap.xml`.
- Static production HTML includes crawlable anchors for the six core tool routes and guide/legal links.
- Rendered homepage and tool pages have real `a[href]` navigation; `button.card` count remained 0.

## Verdict

PASS. P8 share URL hydration and crawlable internal-link improvements are deployed to Cloudflare Pages production/main and live-verified on `https://palcalculator.com/`.
