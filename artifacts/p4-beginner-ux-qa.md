# P4 Beginner UX QA — PalCalculator

Status: GO / PASS
Date: 2026-07-21
Task: t_e3c02fae
Workspace: `/root/projects/palcalculator`

## Scope

Verified the P4 beginner UX upgrade from a first-time user perspective after the passive example repair handoff in `artifacts/p4-passive-repair.md`.

Read inputs:

- `artifacts/p4-beginner-ux-implementation.md`
- `artifacts/p4-passive-repair.md`
- Source implementation in `src/main.tsx`, `src/styles.css`, `src/guides-data.json`, `src/calculators.ts`
- Static build output in `dist/`

## Build/test verification

Commands run from `/root/projects/palcalculator`:

| Command | Result |
| --- | --- |
| `npm run test` | PASS — 18/18 tests in `src/main.test.ts` |
| `npm run lint` | PASS — 0 errors, 28 existing warnings (`react-refresh/only-export-components`, `react-hooks/exhaustive-deps`) |
| `npm run build` | PASS — Vite/tsc build succeeded; generated 18 route HTML files and 18 sitemap URLs |
| `python3 artifacts/p4-beginner-ux-qa-check.py` | PASS — static source/build invariants, guide CTA hrefs, sitemap, no-ad markers, and passive repair checks |

Additional evidence:

- Automated JSON: `artifacts/p4-beginner-ux-qa-results.json`
- Mobile overflow CDP check: 28 route/viewport combinations across 320, 360, 390, and 768 px passed with no horizontal overflow.
- Interactive CDP/browser checks covered homepage example navigation and key calculator example buttons.

## First-time user / homepage path

PASS.

A first-time user can understand the purpose and next action within the first screen and beginner section:

- Hero states the site is an unofficial fan-made Palworld breeding, IV, stats, and passive calculator hub.
- Beginner section includes `How to use PalCalculator`, `Choose your goal`, `Try an example`, and `Read what it means`.
- Vocabulary for Route / Pair / IV / Stats / Passives is visible.
- `Try Anubis example` navigates to `/breeding-calculator/`, switches to Target to Parents, fills Anubis, and shows `66 parent pairs found for Anubis` with result explainer labels.

## Tool examples and result explanations

PASS.

Verified sample interactions:

- Breeding `Try: Penking + Bushi pair` -> result `Penking + Bushi → Sibelyx`.
- Breeding `Try: Jetragon target lookup` -> result `10 parent pairs found for Jetragon`.
- Route `Try: no owned Pals yet` -> target Anubis route output with missing-parent/alternative context.
- IV `Try: modifier caveat check` -> caveated Anubis level 50 IV bands.
- Stats `Try: change level comparison` -> Anubis level 30 expected stat bands.
- Passive `Try: Swift mobility passive plan` -> `1 desired passive(s) recognized` and `PASSIVE_RNG_CAVEATED`.

For calculator result states, the beginner explanation block appears with all required labels:

- `This means...`
- `Next step...`
- `Caveat...`

## Passive repair regression

PASS.

The prior blocker is fixed:

- `Try: combat passive plan` is no longer present.
- Replacement example `Try: Swift mobility passive plan` uses `Swift`, which exists in the current passive dataset (`Artisan`, `Serious`, `Swift`).
- Unsupported manual input `Musclehead, Ferocious` was browser-verified to show:
  - `No desired passives recognized`
  - `0 desired passive(s) recognized`
  - `PASSIVE_NAMES_UNSUPPORTED`
  - supported-name guidance: `Artisan, Serious, Swift`
- The unsupported state now uses passive error explainer copy instead of success-only copy.

## Mobile overflow verification

PASS.

Headless Chrome/CDP measured `documentElement.scrollWidth`, `documentElement.clientWidth`, and `body.scrollWidth` at these widths:

- 320 px
- 360 px
- 390 px
- 768 px

Routes checked:

- `/`
- `/breeding-calculator/`
- `/breeding-route-calculator/`
- `/iv-calculator/`
- `/stats-calculator/`
- `/passive-skill-calculator/`
- `/guides/how-to-breed-anubis-palworld/`

No horizontal overflow was detected in all 28 combinations.

## Sitemap, canonical, robots, favicon/header icon, no ads

PASS.

- `dist/sitemap.xml` contains 18 `<loc>` URLs.
- Representative generated pages have self-referencing canonical URLs and `<meta name="robots" content="index,follow">`.
- `dist/robots.txt` allows `/`, disallows `/share/`, and references `https://palcalculator.com/sitemap.xml`.
- Header icon and favicon references are present (`/brand-icon.svg`, favicon links, apple touch icon, manifest).
- No ad slot/script markers found for `adsbygoogle`, `googlesyndication`, `ad-slot`, `ad-container`, or `ad-banner`.

## Guide CTA verification

PASS.

All 8 guide pages have primary and secondary CTA hrefs resolving to generated static routes:

| Guide | Primary CTA | Primary href | Secondary CTA | Secondary href |
| --- | --- | --- | --- | --- |
| `/guides/palworld-breeding-combos/` | Try Anubis parent lookup | `/breeding-calculator/` | Check Penking + Bushi | `/palworld-1-0-breeding-calculator/` |
| `/guides/palworld-breeding-tree/` | Try the Anubis route demo | `/breeding-route-calculator/` | Check direct parent pairs | `/breeding-calculator/` |
| `/guides/palworld-1-0-breeding-guide/` | Open 1.0 breeding calculator | `/palworld-1-0-breeding-calculator/` | View data sources | `/data-sources/` |
| `/guides/palworld-iv-explained/` | Try level 50 Anubis IV bands | `/iv-calculator/` | Compare expected stats | `/stats-calculator/` |
| `/guides/best-passive-skills-for-breeding-palworld/` | Try Artisan + Serious passive plan | `/passive-skill-calculator/` | Find a breeding route | `/breeding-route-calculator/` |
| `/guides/how-to-breed-anubis-palworld/` | Try Anubis parent lookup | `/breeding-calculator/` | Plan an Anubis route | `/breeding-route-calculator/` |
| `/guides/how-to-breed-jetragon-palworld/` | Try Jetragon target lookup | `/breeding-calculator/` | Review data sources | `/breeding-route-calculator/` |
| `/guides/palworld-breeding-route-examples/` | Try the route demo | `/breeding-route-calculator/` | Check direct combos | `/guides/palworld-breeding-tree/` |

## Verdict

GO / PASS.

P4 beginner UX is acceptable from a first-time user QA perspective. The prior passive example blocker has been repaired and verified; automated test/lint/build pass; homepage/tool examples/result explainers/mobile/no-ads/sitemap/canonical/robots/favicon/header icon/guide CTA checks pass.
