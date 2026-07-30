# P11 QA: multi-generation route solver and new SEO pages

Task: t_ddba0fd3
Status: NO-GO / block before deploy
Workspace: /root/projects/palcalculator
No deploy performed.

## Summary

P11 is not safe to deploy yet. Core CLI checks pass and most route/SEO behavior is good, but QA found two deploy blockers:

1. Mobile 390px route page rendering clips primary hero/H1 copy at the right edge.
2. Two new SEO FAQ questions still contain task-prohibited risky claim terms (`guaranteed`, `official`), even though the answers negate the claims.

Evidence JSON: `artifacts/p11-qa-results.json`
Mobile screenshot evidence: `/tmp/p11-route-mobile-390.png`

## Command verification

- `npm run test` — PASS: 33 tests passed in `src/main.test.ts`.
- `npm run lint` — PASS with warnings: 0 errors, 37 warnings in `src/main.tsx` (React fast-refresh / hook dependency pattern).
- `npm run build` — PASS with warning: Vite chunk-size warning; static generator reported 29 route-specific HTML files, 29 sitemap URLs, explicit slash redirects, and `404.html`.

## Route calculator browser QA

PASS: Direct route
- URL: `http://127.0.0.1:4173/breeding-route-calculator/`
- Scenario: target `Sibelyx`, owned Pals `Penking, Bushi`, max generations `1`.
- Observed: `Route found to Sibelyx`; 1 generation, 1 step, 0 missing Pals, route tree/caveats visible.

PASS: Multi-generation route
- Scenario: target `Caprity Noct`, owned Pals `Penking, Bushi`, max generations `2`.
- Observed: `Route found to Caprity Noct`; 2 generations, 2 steps, route tree/caveats visible.

PASS: Missing Pal / no-route state
- Scenario: target `Anubis` with insufficient owned Pals and max generations `2`.
- Observed: `Route unavailable`, `NO_ROUTE_WITHIN_CONSTRAINTS`, missing candidate guidance and caveats visible.

PASS: Owned Pal browser-local helper
- Scenario: add `Penking` to helper, then apply local list.
- Observed: helper shows `Penking`; message says `Applied 1 browser-local Pal(s) to the route calculator`; route text input becomes `Penking`.
- Privacy copy remains browser-local: no account, upload, backend sync, cookie identity, or raw owned-Pal analytics.

PASS: Share privacy
- Observed share URL: `http://127.0.0.1:4173/breeding-route-calculator/?target=anubis&maxGen=2`
- Owned Pal text/list is not encoded in the share URL.

FAIL: Mobile 390px
- Tool: `google-chrome --headless --disable-gpu --no-sandbox --window-size=390,844 --screenshot=/tmp/p11-route-mobile-390.png http://127.0.0.1:4173/breeding-route-calculator/`
- Observed: screenshot shows the route page H1/hero copy clipped at the right edge; primary content is not fully readable at 390px.
- Evidence: `/tmp/p11-route-mobile-390.png`

## SEO QA for five new pages

Checked pages:

- `/guides/how-to-breed-blazamut-palworld/`
- `/guides/how-to-breed-astegon-palworld/`
- `/guides/how-to-breed-grizzbolt-palworld/`
- `/guides/how-to-breed-lyleen-palworld/`
- `/guides/palworld-breeding-path-finder/`

PASS: Local static routes
- All five `dist/.../index.html` files exist after `npm run build`.

PASS: Meta descriptions
- All five source and dist meta descriptions are between 140 and 160 characters.

PASS: Canonical, robots, schema
- All five pages have self-referencing canonical URLs.
- All five pages have `index,follow` robots metadata.
- All five pages include `TechArticle` and `FAQPage` JSON-LD.
- All five pages link to `/data-sources/`.

PASS: Sitemap count and share/query leaks
- `dist/sitemap.xml` contains 29 canonical URLs.
- No sitemap URL contains a query string.
- No sitemap URL contains `/share/`.

FAIL: Risky claim terms in new SEO copy
- `src/guides-data.json:2301` / `/guides/how-to-breed-astegon-palworld/`: `Does easiest mean guaranteed fastest for Astegon?`
- `src/guides-data.json:2690` / `/guides/palworld-breeding-path-finder/`: `Is the path finder an official Palworld route source?`
- Task explicitly listed `official` and `guaranteed` as risky claims to avoid. These are negated FAQ questions, but they still expose the risky terms in page copy/schema.

## Conclusion

NO-GO until the mobile clipping and risky FAQ wording are fixed, then QA should rerun:

- `npm run test`
- `npm run lint`
- `npm run build`
- Static SEO check for the five P11 pages
- 390px mobile route page screenshot/browser QA
