# PalCalculator Frontend Implementation Report

Project: palcalculator
Stage: 07-frontend
Owner profile: frontend_bot
Status: BLOCKED ON REPO/WORKTREE SETUP
Date: 2026-07-16

## 1. Current conclusion

Frontend code implementation cannot be performed in this run because `/root/projects/palcalculator` contains planning artifacts only and has no application repository/worktree, `.git` directory, `package.json`, or `src` directory. I therefore prepared this implementation handoff for the Cloudflare-first frontend and did not invent or scaffold a fake application outside an approved repo.

Required upstream contracts were available and read:
- `/root/projects/palcalculator/artifacts/design.md`
- `/root/projects/palcalculator/artifacts/data-contract.md`
- `/root/projects/palcalculator/artifacts/route-contract.md`
- `/root/projects/palcalculator/artifacts/copy.md`
- `/root/projects/palcalculator/artifacts/pricing.md`
- `/root/projects/palcalculator/artifacts/compliance.md`

Repository availability evidence:

```text
pwd: /root/.hermes/kanban/boards/palcalculator/workspaces/t_eda7a4a7
/root/projects/palcalculator/.git: missing
/root/projects/palcalculator/package.json: missing
/root/projects/palcalculator/src: missing
```

Upstream backend/data handoff also states that `/root/projects/palcalculator` contains planning artifacts only and real frontend/backend implementation is blocked until repo/worktree and verified data source are available.

## 2. Cloudflare-first frontend recommendation

Use a static-first Cloudflare Pages app. Preferred stack once repo is available:

- Framework: Astro, Next.js static export, or Vite/React static build. If no preference exists, use Astro or Vite/React for a lightweight calculator hub.
- Hosting: Cloudflare Pages.
- Data: versioned static JSON in `/public/data/` or equivalent immutable asset paths.
- Compute: client-side pure functions for P0 calculators.
- Workers: optional later only if route solving benchmarks prove client-side solving is too slow or if approved short-link storage is added.
- Storage: no server-side owned-Pal list, save-file, or raw route request storage in MVP.
- Analytics: only bucketed events; no raw owned-Pal/save contents.

Recommended static data layout from the data contract:

```text
/public/data/version.json
/public/data/pals.latest.json
/public/data/breeding-pairs.latest.json
/public/data/special-combos.latest.json
/public/data/passives.latest.json
/public/data/stat-formulas.latest.json
/public/data/aliases.latest.json
/public/data/schema-version.json
```

Immutable build paths should be supported later for cache safety:

```text
/data/builds/{datasetVersion}/version.json
/data/builds/{datasetVersion}/pals.json
/data/builds/{datasetVersion}/breeding-pairs.json
/data/builds/{datasetVersion}/special-combos.json
/data/builds/{datasetVersion}/passives.json
/data/builds/{datasetVersion}/stat-formulas.json
```

## 3. Route implementation checklist

Implement these P0 routes with trailing-slash canonicals. `{CANONICAL_ORIGIN}` remains pending owner/domain confirmation.

| Route | Component | Key requirement |
|---|---|---|
| `/` | `CalculatorHub` | H1: `PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators`; tool picker and target Pal entry above fold. |
| `/breeding-calculator/` | `BreedingCalculator` | Pair-to-child and target-to-parents modes, autocomplete, result cards/table, special combo marker, copy/share. |
| `/breeding-route-calculator/` | `RouteSolver` | Owned Pals + target Pal -> shortest route, missing Pals, alternatives, constraints, copy/share. This is the flagship differentiator. |
| `/iv-calculator/` | `IvCalculator` | Pal, level, observed HP/Attack/Defense, modifiers, IV bands and caveats. |
| `/stats-calculator/` | `StatsCalculator` | Stat calculation using verified formula contract; caveats visible. |
| `/passive-skill-calculator/` | `PassivePlanner` | P0 shell acceptable if fully caveated; avoid unsupported deterministic/passive-odds claims. |
| `/palworld-1-0-breeding-calculator/` | `BreedingCalculator` | Reuse breeding component with 1.0-specific title/H1/copy/canonical. |
| `/data-sources/` | `DataSourcesPage` | Dataset version, last updated, source categories, unsupported domains, formula assumptions, correction path. |
| `/privacy/` | `LegalPage` | Analytics, local storage, share state, Cloudflare hosting disclosures. |
| `/terms/` | `LegalPage` | Unofficial fan-site terms and disclaimer. |

Do not ship P1 programmatic routes such as `/breed/{pal-slug}/`, `/iv/{pal-slug}/`, or `/stats/{pal-slug}/` until data quality and unique copy are ready. `/share/{result-id}/` should default to `noindex, follow`.

## 4. Design implementation checklist

Design direction to implement:

- Visual style: clean field-guide calculator workspace.
- Tone: helpful, transparent, caveated, fan-made.
- Do not use official Palworld logos, character art, screenshots, sprites, extracted icons, official UI frames, or official-style trade dress.
- Keep calculator UI above SEO body copy on every P0 tool route.
- Make data version, last updated date, formula caveats, and source links persistent near inputs/results.
- Sitewide footer must include the fan-made unofficial disclaimer and links to Data Sources, Privacy, Terms, and Contact only if later approved.

Core tokens:

```css
:root {
  --color-bg: #F7F4EA;
  --color-ink: #17212B;
  --color-action: #2A9D8F;
  --color-warn: #B7791F;
  --color-error: #C2413A;
  --color-muted: #687684;
  --color-card: #FFFDF7;
  --color-line: #D8D0C2;
  --container-max: 1180px;
  --content-max: 760px;
  --tool-max: 1040px;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --border: 1px solid #D8D0C2;
  --shadow-card: 0 10px 30px rgba(23, 33, 43, 0.08);
  --shadow-focus: 0 0 0 3px rgba(42, 157, 143, 0.28);
}
```

Typography:

```css
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", Arial, sans-serif;
  color: var(--color-ink);
  background: var(--color-bg);
}
```

Component system to create:

- `AppShell` with global nav and footer disclaimer.
- `CalculatorShell` shared layout for all tool pages.
- `DataVersionBadge` with tooltip and link to `/data-sources/`.
- `CaveatPanel` for formula/source/unsupported-state caveats.
- `ToolPicker` for homepage and cross-tool navigation.
- `PalAutocomplete` using aliases and verified data.
- `ResultCard` / responsive table-card hybrid.
- `RouteTimeline` signature component for route steps.
- `CopyShareButton` with noindex/canonical-safe state handling.
- `EmptyState`, `InvalidPalState`, `NoResultState`, `UnsupportedState`, `LoadingState`, `LongSolveState`.
- `SeoContentSection` and `FaqBlock` with schema consistency.

Responsive requirements:

- Mobile form controls stack cleanly.
- Results become cards instead of wide tables.
- Touch targets should be at least 44px.
- Avoid horizontal scroll.
- A sticky bottom action is acceptable only for primary calculate/copy actions, not ads.

## 5. Copy, pricing, and disclaimer requirements

Primary public positioning:

> PalCalculator is an unofficial fan-made Palworld 1.0 calculator hub for breeding routes, IV/stat checks, passive planning, and owned-Pal optimization.

Primary CTA:

> Start with a target Pal

Secondary CTAs:

- Calculate breeding
- Find shortest route
- Check IVs
- Calculate stats
- Plan passives
- View data sources

Pricing/monetization visible requirement:

> Free for normal player use at MVP. No login or payment required for P0 calculators.

Do not add pricing tables, paid plan prices, checkout buttons, ads, affiliate modules, or account-gated copy at MVP unless owner approves a later scope change.

Required footer/sitewide disclaimer:

> PalCalculator is an unofficial fan-made tool and is not affiliated with, endorsed by, sponsored by, or approved by Pocketpair or the Palworld team. Palworld and related names are trademarks or properties of their respective owners.

Inline short version:

> Unofficial fan-made Palworld tool. Results depend on the selected data version.

Avoid product claims such as official, endorsed, approved, partnered, guaranteed, always correct, 100% accurate, perfect IVs, exact passive odds, deterministic passive inheritance, instantly updated, complete database, free forever, no tracking, anonymous, or secure upload.

## 6. Data and calculator integration plan

Until verified Palworld production data exists, frontend calculators must show blocked/unavailable/caveated states rather than fake results.

Minimum behavior by tool:

### Breeding calculator

Inputs:
- Parent A autocomplete
- Parent B autocomplete
- Target child autocomplete
- Mode switch: pair-to-child / target-to-parents

Results:
- parent_a
- parent_b
- child
- combo_type: normal | special | unavailable
- data_version
- caveats

States:
- Empty: show example pattern such as Lamball + Cattiva only when backed by verified data, otherwise label as example-only.
- Invalid Pal: suggest closest names.
- No result: explain data limitation and link data sources.

### Route solver

Inputs:
- Target Pal autocomplete
- Owned Pal selector or paste textarea
- Constraints: max generations, exclude Pals, special combos toggle

Results:
- target_pal
- owned_pals
- generations
- ordered steps: parent_a, parent_b, child
- missing_pals
- alternatives
- constraints
- data_version
- duration bucket for analytics only

States:
- Empty owned list: show general route guidance only if verified data exists.
- Target already owned: success state saying no breeding needed.
- No route: explain constraint issue and suggest relaxing filters.
- Long solve: loading/progress state.

### IV/stats calculators

Inputs:
- Pal autocomplete
- Level
- Observed HP/Attack/Defense
- Modifiers: souls, condenser stars, passives/trust if supported

Results:
- IV ranges and stat ranges
- formula assumptions
- caveats for rounding/modifiers/uncertain formula

### Passive planner

P0 can be a shell if full planner is unsupported, but it must explain RNG and unsupported-data limitations and avoid guaranteed inheritance claims.

## 7. SEO and metadata implementation checklist

For every indexable route:

- Title and H1 must include Palworld, not only `palcalculator`.
- Canonical URL uses trailing slash.
- Calculator UI appears above SEO copy.
- Data version and caveat link are visible.
- Footer includes disclaimer/legal links.
- FAQ schema must match visible FAQ copy.
- Sitemap includes only indexable canonical routes.
- `/share/*` and query-state result pages default to `noindex, follow` and canonicalize to the base tool route.
- Do not emit thin programmatic pages before unique content/data quality is ready.

Suggested metadata structure once repo exists:

```ts
const routes = [
  { path: '/', title: 'PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators', h1: 'PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators' },
  { path: '/breeding-calculator/', title: 'Palworld Breeding Calculator', h1: 'Palworld Breeding Calculator' },
  { path: '/breeding-route-calculator/', title: 'Palworld Breeding Route Calculator', h1: 'Palworld Breeding Route Calculator' },
  { path: '/iv-calculator/', title: 'Palworld IV Calculator', h1: 'Palworld IV Calculator' },
  { path: '/stats-calculator/', title: 'Palworld Stats Calculator', h1: 'Palworld Stats Calculator' },
  { path: '/passive-skill-calculator/', title: 'Palworld Passive Skill Calculator', h1: 'Palworld Passive Skill Calculator' },
  { path: '/palworld-1-0-breeding-calculator/', title: 'Palworld 1.0 Breeding Calculator', h1: 'Palworld 1.0 Breeding Calculator' },
  { path: '/data-sources/', title: 'PalCalculator Data Sources & Update Policy', h1: 'PalCalculator Data Sources & Update Policy' },
  { path: '/privacy/', title: 'Privacy Policy', h1: 'Privacy Policy' },
  { path: '/terms/', title: 'Terms of Use', h1: 'Terms of Use' },
];
```

## 8. Build/lint/test plan once repo exists

Minimum verification commands should be adapted to the actual stack, but the acceptance gate should include:

```bash
npm install
npm run lint
npm run typecheck
npm run test -- --run
npm run build
npm run preview
```

Manual smoke checks:

- All P0 routes return 200 locally.
- Internal nav links do not point to `#` or missing routes.
- Calculator controls are visible above fold on desktop and mobile widths.
- Pricing/free/no-login message is visible.
- Footer disclaimer is visible on every route.
- Data version badge/caveat link is visible on every tool route.
- Invalid/missing/unavailable states are visible in UI, not only console.
- Mobile viewport has no horizontal overflow.
- Sitemap/robots/canonical/meta/schema are consistent.

## 9. Blockers and open items

P0 blocker for this stage:

- No repo/worktree/package manifest is available for actual implementation.

P0 blockers before public launch:

- Verified production Palworld dataset source, version, last-updated date, and update workflow are still pending.
- Final canonical origin/domain is pending.
- Privacy/Terms/Data Sources pages must exist before analytics, share URLs, or import features are live.
- Analytics provider and retention period are pending.
- Legal operator/contact email is pending.

Non-blocking but important P1/P2 decisions:

- Whether browser-local import ships in MVP or P1.
- Whether route solver remains purely client-side after benchmark.
- Whether later supporter/waitlist copy appears below tool pages.

## 10. Recommended next action

Next recommended agent/action:

1. Repo/setup owner should create or attach the application repository/worktree for PalCalculator under `/root/projects/palcalculator` or provide the correct repo path.
2. Backend/data implementer should provide verified static JSON data files or explicitly marked placeholder files that keep calculators unavailable until verification.
3. frontend_bot can then implement the routes/components above and run local lint/build/smoke evidence.
4. QA_bot should run route, mobile, SEO, disclaimer, and error-state checks after implementation.

## 11. Acceptance gate status

Frontend Gate status: BLOCKED.

- Routes render: not testable because no repo/app exists.
- Copy/design/data contract implemented: handoff prepared, code not implementable without repo.
- Pricing/disclaimer visible: specified in this report, not implementable without repo.
- Local build/lint evidence: not available because no `package.json` or app source exists.

Final status: [BLOCKED]
