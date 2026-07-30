# P11 QA rerun: fixed route mobile and SEO terms

Task: t_18abe10f
Status: GO / safe to deploy
Generated: 2026-07-30T08:01:16Z
Workspace: /root/projects/palcalculator
No deploy performed.

Evidence JSON: `artifacts/p11-qa-rerun-results.json`
Mobile screenshot evidence: `/tmp/p11-route-mobile-390-rerun.png`

## Summary

P11 QA rerun is GO. The previous blockers are fixed: the 390px route page hero/header/buttons/data badge no longer clip at the right edge, and the risky forbidden terms are absent from the five P11 guide source data objects and built static HTML.

## Command verification

- `npm run test` — PASS: Vitest completed with 1 test file passed and 33 tests passed in `src/main.test.ts`.
- `npm run lint` — PASS with existing warnings: ESLint exit 0; 0 errors and 37 warnings in `src/main.tsx` (`react-refresh/only-export-components` and `react-hooks/exhaustive-deps`, consistent with prior QA).
- `npm run build` — PASS with existing Vite chunk-size warning: `tsc -b`, Vite build, and `scripts/generate-static-routes.mjs` completed; generated 29 route-specific HTML files, 29 sitemap URLs, explicit slash redirects, and `404.html`.

## Mobile 390px route page

PASS.

Command:

`google-chrome --headless --disable-gpu --no-sandbox --window-size=390,844 --screenshot=/tmp/p11-route-mobile-390-rerun.png http://127.0.0.1:4173/breeding-route-calculator/`

Evidence:

- Screenshot file exists at `/tmp/p11-route-mobile-390-rerun.png`.
- PNG dimensions verified as 390x844.
- Visual inspection: header/logo/nav, route H1, hero paragraph, primary CTA, secondary lookup button, and data badge are fully visible without right-edge clipping. The lower route workspace card begins below the fold, which is normal vertical overflow rather than horizontal clipping.

## Route calculator browser QA

PASS: Direct route

- URL: `http://127.0.0.1:4173/breeding-route-calculator/`
- Scenario: target `Sibelyx`, owned Pals `Penking, Bushi`, max generations `1`.
- Observed: `Route found to Sibelyx`; 1 generation, 1 step, 0 missing Pals; step and route tree list `Bushi (owned) + Penking (owned) → Sibelyx`; caveats visible.

PASS: Multi-generation route

- Scenario: target `Caprity Noct`, owned Pals `Penking, Bushi`, max generations `2`.
- Observed: `Route found to Caprity Noct`; 2 generations, 2 steps, 0 missing Pals; step 1 `Bushi + Penking → Sibelyx`; step 2 `Penking + Sibelyx → Caprity Noct`; route tree and caveats visible.

PASS: Missing Pal / no-route state

- Scenario: target `Anubis`, owned Pals `Penking, Bushi`, max generations `2`.
- Observed: `Route unavailable`, `NO_ROUTE_WITHIN_CONSTRAINTS`, `owned-route-not-found`, missing candidate guidance, practical next action, and caveats visible.

PASS: Owned Pal browser-local helper

- Scenario: add `Penking` through the browser-local owned Pal helper, then click `Use local list in route`.
- Observed: helper displayed `Penking`, reported `Applied 1 browser-local Pal(s) to the route calculator.`, and the route owned input became `Penking`.
- Privacy copy remains clear: stored only in this browser with localStorage; no account, upload, backend sync, cookie identity, or raw owned-Pal analytics.

PASS: Share privacy

- Observed share URL: `http://127.0.0.1:4173/breeding-route-calculator/?target=anubis&maxGen=2`
- Owned Pal text/list is not encoded in the URL.
- Page copy says the browser-local owned Pal list is not included in the share URL.

PASS: Browser console

- `browser_console` reported 0 console messages and 0 JavaScript errors during route QA.

## SEO QA for five new pages

Checked pages:

- `/guides/how-to-breed-blazamut-palworld/`
- `/guides/how-to-breed-astegon-palworld/`
- `/guides/how-to-breed-grizzbolt-palworld/`
- `/guides/how-to-breed-lyleen-palworld/`
- `/guides/palworld-breeding-path-finder/`

PASS: Risky forbidden terms absent

Terms scanned: `official`, `guaranteed`, `100% accurate`, `exact odds`, `cheat`, `bypass`, `complete wiki`.

- Source scan across the five P11 guide objects in `src/guides-data.json`: 0 matches.
- Built static HTML scan across the five P11 `dist/.../index.html` files: 0 matches.

PASS: Local static routes

- All five built `dist/.../index.html` files exist.

PASS: Meta descriptions

All five source and built meta descriptions are 140–160 characters:

- `/guides/how-to-breed-blazamut-palworld/`: 144 source / 144 dist
- `/guides/how-to-breed-astegon-palworld/`: 142 source / 142 dist
- `/guides/how-to-breed-grizzbolt-palworld/`: 146 source / 146 dist
- `/guides/how-to-breed-lyleen-palworld/`: 144 source / 144 dist
- `/guides/palworld-breeding-path-finder/`: 142 source / 142 dist

PASS: Canonical, robots, schema, data-sources link

- All five pages have self-referencing canonical URLs.
- All five pages have `index,follow` robots metadata.
- All five pages include `TechArticle` and `FAQPage` JSON-LD.
- All five pages link to `/data-sources/`.

PASS: Sitemap count and leak checks

- `dist/sitemap.xml` contains 29 URLs.
- No sitemap URL contains a query string.
- No sitemap URL contains `/share/`.
- All five P11 guide URLs are present in the sitemap.

## Conclusion

GO / safe to deploy. No deploy performed.
