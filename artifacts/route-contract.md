# PalCalculator Route Contract v1

Project: palcalculator
Market: US / English
Stage: 02 PRD and route contract
Generated: 2026-07-16
Default stack: Cloudflare-first
Canonical origin placeholder: `{CANONICAL_ORIGIN}` until owner confirms domain

## 1. Route contract principles

1. Use PalCalculator as the brand, but make Palworld explicit in every indexable route title/H1/meta.
2. Calculator UI appears above the fold on all P0 tool pages.
3. Every indexable route has one canonical URL with trailing slash.
4. Share/result state is shareable but noindex by default.
5. Programmatic Pal-specific routes are P1 and must not ship as thin duplicated pages.
6. Data version, update date, and fan-site disclaimer must be visible or linked from every tool route.
7. Cloudflare-first: static routes on Pages; Workers/D1/KV/R2 only where compute/storage is required.

## 2. Canonical URL plan

Final canonical origin is pending owner domain confirmation.

Use this placeholder in downstream contracts:
- `{CANONICAL_ORIGIN}`

If `palcalculator.com` is approved and owned, canonical origin should become:
- `https://palcalculator.com`

URL rules:
- Canonical page path: trailing slash, e.g. `{CANONICAL_ORIGIN}/breeding-calculator/`.
- Non-canonical variants without trailing slash should 301 to trailing slash.
- Query-string app state should keep canonical pointing to the base tool page unless explicitly promoted.
- `/share/*` and opaque result URLs default to `noindex, follow`.
- Sitemap includes only indexable canonical routes.

## 3. P0 route table

| Route | Status | Index | Canonical | Page title direction | H1 | Primary component | Primary CTA | Required data | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `/` | P0 | yes | `{CANONICAL_ORIGIN}/` | PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators | PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators | CalculatorHub | Start with a target Pal | Pal index, tool links, data version | Must disambiguate from generic PAL meanings. |
| `/breeding-calculator/` | P0 | yes | `{CANONICAL_ORIGIN}/breeding-calculator/` | Palworld Breeding Calculator | Palworld Breeding Calculator | BreedingCalculator | Calculate breeding | Pal, BreedingPair, SpecialCombo | Parent->child and target->pairs. |
| `/breeding-route-calculator/` | P0 | yes | `{CANONICAL_ORIGIN}/breeding-route-calculator/` | Palworld Breeding Route Calculator | Palworld Breeding Route Calculator | RouteSolver | Find shortest route | Pal, BreedingPair, SpecialCombo, RouteResult | Flagship differentiator. |
| `/iv-calculator/` | P0 | yes | `{CANONICAL_ORIGIN}/iv-calculator/` | Palworld IV Calculator | Palworld IV Calculator | IvCalculator | Check IVs | Pal, StatFormula | Show ranges/caveats. |
| `/stats-calculator/` | P0 | yes | `{CANONICAL_ORIGIN}/stats-calculator/` | Palworld Stats Calculator | Palworld Stats Calculator | StatsCalculator | Calculate stats | Pal, StatFormula | May share engine with IV. |
| `/passive-skill-calculator/` | P0/P1 | yes | `{CANONICAL_ORIGIN}/passive-skill-calculator/` | Palworld Passive Skill Calculator | Palworld Passive Skill Calculator | PassivePlanner | Plan passives | Pal, PassiveSkill, BreedingPair | P0 shell acceptable if caveated; full planner can be P1. |
| `/palworld-1-0-breeding-calculator/` | P0 | yes | `{CANONICAL_ORIGIN}/palworld-1-0-breeding-calculator/` | Palworld 1.0 Breeding Calculator | Palworld 1.0 Breeding Calculator | BreedingCalculator | Use 1.0 calculator | Same as breeding | Can reuse component with distinct copy/canonical. |
| `/data-sources/` | P0 | yes | `{CANONICAL_ORIGIN}/data-sources/` | PalCalculator Data Sources & Update Policy | PalCalculator Data Sources & Update Policy | DataSourcesPage | View latest data version | DataVersion, source list | Trust route. |
| `/privacy/` | P0 | yes | `{CANONICAL_ORIGIN}/privacy/` | Privacy Policy | Privacy Policy | LegalPage | N/A | Analytics/import disclosures | Required before analytics/import launch. |
| `/terms/` | P0 | yes | `{CANONICAL_ORIGIN}/terms/` | Terms of Use | Terms of Use | LegalPage | N/A | Disclaimer | Include unofficial fan-site notice. |

## 4. P1 / programmatic route table

These routes must wait until backend/data quality is proven and copy/SEO can guarantee unique page value.

| Route pattern | Index default | Canonical pattern | Purpose | Required unique value | Notes |
|---|---|---|---|---|---|
| `/breed/{pal-slug}/` | yes when complete | `{CANONICAL_ORIGIN}/breed/{pal-slug}/` | Pal-specific breeding routes/pairs | Actual pair/route calculator state, examples, FAQ for that Pal | No thin duplicated pages. |
| `/iv/{pal-slug}/` | yes when complete | `{CANONICAL_ORIGIN}/iv/{pal-slug}/` | Pal-specific IV calculator | Pal-specific base stats and calculator preselect | P1. |
| `/stats/{pal-slug}/` | yes when complete | `{CANONICAL_ORIGIN}/stats/{pal-slug}/` | Pal-specific stat calculator | Pal-specific stat ranges/examples | P1. |
| `/best-passives/{pal-slug}/` | yes when complete | `{CANONICAL_ORIGIN}/best-passives/{pal-slug}/` | Passive planning page | Role/use-case caveats and planner entry | Avoid unsupported recommendations. |
| `/palworld-1-0/{calculator-topic}/` | maybe | `{CANONICAL_ORIGIN}/palworld-1-0/{calculator-topic}/` | Update/freshness long-tail | 1.0-specific data and update notes | Do not duplicate P0 routes. |
| `/share/{result-id}/` | no | `{CANONICAL_ORIGIN}/share/{result-id}/` | Shared route/build result | Open shared state | `noindex, follow`; no private data. |

## 5. Page-level contract

### 5.1 Home `/`

Purpose:
- Explain PalCalculator as a Palworld calculator hub.
- Route users to the right task quickly.

Above-fold requirements:
- H1: PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators
- Subhead: fan-made Palworld 1.0 calculators for breeding routes, IV/stat checks, passive planning, and owned-Pal optimization.
- Primary target Pal input or tool picker.
- Cards for Breeding, Route, IV, Stats, Passive.
- Data version badge.

Internal links:
- All P0 tool pages.
- Data sources.
- Privacy/terms in footer.

### 5.2 Breeding calculator `/breeding-calculator/`

Primary tasks:
- Parent pair -> child.
- Target child -> all parent pairs.

Required UI modules:
- Mode switch: Pair to child / Target to parents.
- Pal autocomplete inputs.
- Results table/cards.
- Special combo marker.
- Link to route solver with target.
- Copy/share result.

Required result fields:
- parent_a
- parent_b
- child
- combo_type: normal | special | unavailable
- data_version
- caveats

Empty/error states:
- Empty: show example like Lamball + Cattiva.
- Invalid Pal: suggest closest names.
- No result: explain data limitation and link data sources.

### 5.3 Route solver `/breeding-route-calculator/`

Primary task:
- Owned Pals + target Pal -> shortest route.

Required UI modules:
- Target Pal autocomplete.
- Owned Pal selector/paste textarea.
- Constraints: max generations, exclude Pals, special combos toggle.
- Step-by-step route result.
- Missing Pal list.
- Alternative routes.
- Copy/share route.

Required result fields:
- target_pal
- owned_pals
- generations
- steps: ordered parent_a, parent_b, child
- missing_pals
- alternatives
- constraints
- data_version
- duration_ms or duration_bucket for analytics only

Empty/error states:
- Owned list empty: show general shortest parent routes.
- Target already owned: success state saying no breeding needed.
- No route: explain constraint issue and suggest relaxing filters.
- Long solve: loading/progress state.

### 5.4 IV calculator `/iv-calculator/`

Primary task:
- Estimate IV range/score from observed stats.

Required UI modules:
- Pal autocomplete.
- Level input.
- Observed HP/Attack/Defense inputs.
- Modifier controls: souls, condenser stars, passives/trust if supported.
- Result bands and caveat explainer.

Required result fields:
- pal
- level
- observed_stats
- modifiers
- iv_range_by_stat
- confidence/caveats
- data_version
- formula_version

Error states:
- Impossible stat values.
- Missing modifier caveat.
- Unsupported Pal/data version.

### 5.5 Stats calculator `/stats-calculator/`

Primary task:
- Calculate expected stat ranges for a Pal/build.

Required UI modules:
- Pal autocomplete.
- Level/modifiers/passives controls.
- Expected HP/Attack/Defense output.
- Comparison notes when IV inputs are supplied.

Required result fields:
- pal
- level
- modifiers
- expected_stats
- stat_bands
- formula_version
- caveats

### 5.6 Passive skill calculator `/passive-skill-calculator/`

Primary task:
- Plan desired passives for a target Pal.

Required UI modules:
- Target Pal autocomplete.
- Passive multi-select.
- Optional owned parents.
- Route/candidate notes.
- RNG/inheritance caveat.

Required result fields:
- target_pal
- desired_passives
- candidate_parents/routes when supported
- unsupported_or_uncertain_flags
- caveats
- data_version

Acceptance caveat:
- If full passive route logic is not ready, MVP can ship a planner shell with transparent limitations only if it still helps users move to breeding route or data pages. Do not fabricate passive probabilities.

### 5.7 Data sources `/data-sources/`

Required content:
- Current Palworld data version.
- Last updated date.
- Source categories and update method.
- Formula assumptions and unsupported data list.
- Contact/correction path if available.
- Statement that competitor pages are not the sole source of truth.

### 5.8 Legal routes `/privacy/`, `/terms/`

Privacy required topics:
- Analytics events and non-secret properties.
- Local/share URL state.
- Palbox/import handling if added.
- No server-side save file upload in MVP unless policy changes.

Terms required topics:
- Unofficial fan-made site.
- No affiliation/endorsement by Pocketpair.
- Data accuracy caveats.
- User responsibility for using results.

## 6. Component contract

| Component | Used by | Inputs | Outputs/events | Notes |
|---|---|---|---|---|
| CalculatorHub | `/` | tool list, data_version | tool_click, target_start | Homepage task router. |
| PalAutocomplete | all tools | pal list, aliases | selected pal id/slug | Must handle misspellings gracefully. |
| BreedingCalculator | breeding, 1.0 page, programmatic breed pages | parent ids or target id | child or pair list | Pure function preferred. |
| RouteSolver | route page, breed pages | owned ids, target id, constraints | RouteResult | Client-side if performant; Worker fallback allowed. |
| IvCalculator | IV page, Pal IV pages | Pal, level, observed stats, modifiers | IV ranges | Formula caveats required. |
| StatsCalculator | stats page, Pal stats pages | Pal, level, modifiers, optional IVs | expected stat bands | Shares formula data. |
| PassivePlanner | passive page, best-passive pages | target, desired passives, optional owned Pals | candidates/caveats | No deterministic overclaim. |
| DataVersionBadge | all tool pages | data_version, updated_at | click to data sources | Trust component. |
| ResultShare | all result pages | serialized safe state | share URL/copy event | No private save data. |

## 7. Data/API contract draft

Prefer static JSON assets for P0:
- `/data/pals.latest.json`
- `/data/breeding-pairs.latest.json`
- `/data/special-combos.latest.json`
- `/data/passives.latest.json`
- `/data/stat-formulas.latest.json`
- `/data/version.json`

If Worker APIs are required, use these logical endpoints:

| Endpoint | Method | Purpose | Request | Response | Cache |
|---|---|---|---|---|---|
| `/api/breeding/child` | POST | Parent pair -> child | `{parentA, parentB, dataVersion?}` | `{child, comboType, caveats, dataVersion}` | cache by body hash if safe |
| `/api/breeding/parents` | POST | Target -> parent pairs | `{target, filters?, dataVersion?}` | `{pairs, resultCount, caveats, dataVersion}` | cache |
| `/api/route/solve` | POST | Owned list -> route | `{target, ownedPals, constraints?, dataVersion?}` | `{route, alternatives, missingPals, caveats, dataVersion}` | cache only if no private data stored |
| `/api/iv/calculate` | POST | IV estimate | `{pal, level, observedStats, modifiers?, dataVersion?}` | `{ivRanges, confidence, caveats, formulaVersion, dataVersion}` | cache optional |
| `/api/stats/calculate` | POST | Expected stats | `{pal, level, modifiers?, ivs?, dataVersion?}` | `{expectedStats, bands, caveats, formulaVersion, dataVersion}` | cache optional |

API rules:
- Validate Pal slugs server/client side.
- Return structured caveats, not silent failure.
- No secret tokens in responses.
- Do not persist owned Pal lists or save/import content unless explicitly approved.
- Error response shape: `{error: {code, message, field?, recoverable}, dataVersion?}`.

## 8. SEO metadata contract

Each indexable tool page must include:
- `<title>` with Palworld + task.
- Meta description that promises the specific calculator task.
- Canonical link.
- Open Graph title/description.
- H1 matching user task.
- FAQ content only when visible on page.
- SoftwareApplication schema for actual tools.

Initial title directions:
- `/`: PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators
- `/breeding-calculator/`: Palworld Breeding Calculator - Parent Pairs, Children & Combos
- `/breeding-route-calculator/`: Palworld Breeding Route Calculator - Shortest Path from Owned Pals
- `/iv-calculator/`: Palworld IV Calculator - Check HP, Attack & Defense IVs
- `/stats-calculator/`: Palworld Stats Calculator - Estimate Pal Stats by Level
- `/passive-skill-calculator/`: Palworld Passive Skill Calculator - Plan Breeding Passives
- `/palworld-1-0-breeding-calculator/`: Palworld 1.0 Breeding Calculator - Updated Combos & Routes

Copy freeze caveat:
- Manual live Google SERP review is recommended before final SEO copy freeze due upstream Tavily 401 fallback.

## 9. Analytics event contract

Events must avoid raw private data.

| Event | When | Properties |
|---|---|---|
| `page_view` | route load | page_slug, route_group, device_type, referrer |
| `tool_start` | user starts calculation | tool_type, page_slug, data_version |
| `tool_success` | valid result shown | tool_type, page_slug, result_count_bucket, duration_bucket, data_version |
| `tool_error` | validation/no-route/system error | tool_type, page_slug, error_code, recoverable, data_version |
| `copy_result` | copy clicked | tool_type, page_slug, result_type |
| `share_result` | share URL created | tool_type, page_slug, result_type |
| `internal_nav` | related tool clicked | from_page, to_page, link_context |

Do not log:
- Raw save-file contents.
- Full owned Pal list if it can be considered user-provided private state.
- IP-derived identity beyond standard analytics provider handling.

## 10. Acceptance tests for route contract

1. Every P0 route in the table renders a non-404 page.
2. Every indexable route has a self-referencing canonical URL with trailing slash.
3. `/share/{result-id}/` or equivalent result URLs are noindex by default.
4. The homepage and tool pages mention Palworld above the fold.
5. Calculator components expose empty, loading, success, invalid input, and no-result states.
6. Tool pages link to `/data-sources/`, `/privacy/`, and `/terms/` where relevant.
7. Data version badge is present on every P0 tool route.
8. Sitemap includes P0 indexable routes and excludes share/result state routes.
9. Route/API contracts avoid save-file upload and raw private data persistence in MVP.
10. Programmatic Pal routes remain disabled/noindex until they provide unique calculator value.

## 11. Downstream implementation notes

For backend/data agent:
- Decide whether route solving can run client-side against static JSON or needs a Worker.
- Provide stable slug schema for all Pals/passives.
- Provide formula caveats for IV/stat outputs.
- Provide versioned data files and update policy.

For design/frontend agents:
- Build mobile-first tool controls above the fold.
- Keep SEO copy below primary task UI.
- Use text/data-first UI; do not rely on official game art.
- Make copy/share visible in results.

For SEO/copy agents:
- Use Palworld-qualified phrases, not generic `palcalculator`.
- Recheck live Google SERP before final SEO copy freeze.
- Avoid programmatic page generation until unique data/tool value exists.

[DONE]
