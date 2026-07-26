# P5 QA: no-owner improvements before deploy

Task: `t_c35cb8e9`
Workspace: `/root/projects/palcalculator`
Generated: 2026-07-26T23:26:05Z
Decision: **GO for the currently implemented P5 frontend/backend/data changes**
Production deploy: **not performed**

## Scope read

Parent handoffs reviewed:

- `artifacts/p5-owned-pal-route-ux.md`
- `artifacts/p5-data-quality.md`
- `artifacts/p5-seo-copy.md`

The P5 SEO copy artifact provides six new guide drafts, but those new routes are not implemented in `src/guides-data.json`, `dist/`, or `dist/sitemap.xml` in this workspace. I treated them as not in deploy scope under the task wording “new content pages if implemented.” The live/static deployable still contains the existing 8 guide pages and 18 sitemap URLs.

## Required command verification

- `npm run test` — PASS
  - `src/main.test.ts`: 23 tests passed.
- `npm run lint` — PASS
  - 0 errors.
  - 28 existing warnings in `src/main.tsx` for react-refresh/only-export-components and react-hooks/exhaustive-deps.
- `npm run build` — PASS
  - `tsc -b && vite build && node scripts/generate-static-routes.mjs` passed.
  - Generated 18 route-specific HTML files, 18 sitemap URLs, explicit slash redirects, and `404.html`.

## Browser/static checks

Preview server: `npm run preview` at `http://127.0.0.1:4173/`.

Checked:

- Homepage loads with title `PalCalculator: Palworld Breeding & IV Tools`.
- Homepage canonical is `https://palcalculator.com/` and robots is `index,follow`.
- Route calculator loads with canonical `https://palcalculator.com/breeding-route-calculator/`.
- Route calculator owned-Pal helper is visible and labelled browser-local.
- Adding `Anubis` creates a removable chip.
- `Use local list in route` writes `Anubis` into the route input and the route result changes to the target-owned shortcut.
- Browser console showed no JS errors after route interaction.
- `curl` status checks:
  - `/` -> 200
  - `/breeding-route-calculator/` -> 200
  - `/breeding-calculator/` -> 200
  - `/privacy/` -> 200
  - `/data-sources/` -> 200
  - `/guides/palworld-breeding-combos/` -> 200
  - `/guides/how-to-breed-orserk-palworld/` -> 404, expected because this P5 copy route is not implemented or in sitemap.

Mobile/static layout evidence:

- Captured headless Chrome screenshots:
  - `artifacts/p5-qa-screenshots/home-320.png`
  - `artifacts/p5-qa-screenshots/route-390.png`
- CSS contracts for mobile containment are present:
  - `html,body,#root{max-width:100%;overflow-x:clip}`
  - wrapping nav
  - `.hero>*{min-width:0}`
  - data badge `overflow-wrap:anywhere`
- No broken header/nav stacking or blank content was observed in the screenshots. Some long heading/CTA text reaches the screenshot viewport edge at very narrow widths, but no blocking layout break was found under the existing overflow containment contract.

## Sitemap, canonical, and content checks

- `dist/sitemap.xml` has 18 `<loc>` entries.
- `/share/` is excluded from sitemap.
- Existing guide pages remain in sitemap.
- The six P5 copy routes from `artifacts/p5-seo-copy.md` are absent from the app and sitemap, so they will not accidentally deploy as incomplete indexed pages.
- Existing guide metadata remains bounded by static tests: titles <= 60 chars, descriptions <= 160 chars, visible unofficial/fan-made caveats.

## Privacy and analytics checks

Owned-Pal helper contract verified in source and browser:

- Storage key: `palcalculator:owned-pals:v1`.
- Storage is browser-local localStorage only.
- Visible copy says there is no account, upload, backend sync, cookie identity, or raw owned-Pal analytics.
- Owned-list event names are present:
  - `owned_list_add`
  - `owned_list_remove`
  - `owned_list_clear`
  - `owned_list_apply`
- Event payload contract uses `owned_count_bucket` and `storage_scope: 'browser_local'`.
- Static source exclusions confirm no `owned_pals: owned` or `owned_list: owned` raw-list payloads.
- Privacy page states analytics payloads avoid raw inputs, share URLs, emails, IP addresses, tokens, and save data.

## Issues

No blocking P0/P1/P2 issues found for the currently implemented changes.

Informational note only: P5 SEO copy has not been implemented as routes. If product expects those six new guide pages in this deploy, hand work back to frontend/copy implementation before deploying. If this deploy is only the owned-Pal helper + data-quality edge fix, QA is GO.

## Final decision

**GO** for deploying the currently implemented P5 no-owner/frontend/backend/data changes.

No production deploy was performed.
