# P5 Research/Data Audit: PalCalculator useful gaps

Project: PalCalculator
Task: `t_cab35cb8`
Workspace: `/root/projects/palcalculator`
Date: 2026-07-27
Owner inputs required: none for this audit; implementation and production indexing/deploy remain out of scope.

## Executive summary

PalCalculator already presents the right broad promise for current Palworld calculator intent: breeding pairs, route planning, IV/stat checking, passive planning, and Palworld 1.0 caveats. The largest useful gap is that several promises are currently shell-level or caveated placeholders rather than full data-backed calculators.

Highest-value no-owner-input improvement path:

1. Turn route planning into a real multi-generation graph solver, because current `solveRoute()` only returns target direct pairs/fallbacks and does not actually use `maxGenerations` for BFS-style routing.
2. Add a verified special-combo override table, because every normal breeding output currently carries `SPECIAL_COMBO_NOT_APPLIED` and the public data build declares `verified special combo override table` unsupported.
3. Expand passives from the 3-item seed list (`Artisan`, `Serious`, `Swift`) into a full verified passive dataset with effects/categories/caveats.
4. Expand stat data and formula inputs beyond the current sparse/caveated state: only 20/297 Pals have any `stats` object populated, and none have all `hp`, `attack`, and `defense` populated in the current JSON audit.
5. Add safe, data-backed “what can I make from owned Pals?” and “top target workflows” content only after the data/functions above are accurate enough to avoid thin or misleading pages.

## Evidence reviewed

Local source and artifacts:

- `src/main.tsx` — current SPA routes, calculator UI, guide rendering, data-source page.
- `src/calculators.ts` — breeding formula, route solver, IV/stat estimator, passive planner data hooks.
- `src/guides-data.json` — 8 guide pages currently shipped through the app.
- `src/data/*.json` and `public/data/*.json` — current data build and public static data files.
- `public/sitemap.xml` — current public route list.
- `artifacts/research.md` — original keyword/competitor intent research.
- `artifacts/seo-content-expansion-brief.md` and `artifacts/p2-seo-content-brief.md` — content intent and caveat requirements.
- `artifacts/post-launch-iteration-backlog.md` — prior launch/backlog priorities.

Live checks performed with direct HTTP requests because the configured Tavily `web_search`/`web_extract` tools returned 401 Unauthorized:

- `https://palcalculator.com/` — status 200; title `PalCalculator: Palworld Breeding & IV Tools`; description promises breeding routes, IV/stat checks, passive planning, and owned-Pal optimization.
- `https://palcalculator.com/data-sources/` — status 200; title `PalCalculator Data Sources & Update Policy`.
- `https://palcalculator.com/breeding-route-calculator/` — status 200; title `Palworld Breeding Route Calculator`.
- `https://palcalculator.com/passive-skill-calculator/` — status 200; title `Palworld Passive Skill Calculator`.
- `https://palroutes.com/` — status 200; title/description explicitly claim shortest route from owned Pals to target Pal; page text includes Palbox/passive/IV/special/breeding signals.
- `https://www.palpedia.net/breeding` — status 200; description covers parent, child, multiple-pal breeding, mutations, unique combos, and wild egg mechanics for Palworld 1.0.0.
- `https://www.palpedia.net/builder` — status 200; description covers builds, IVs, and expected stats at any level.
- `https://palworld.gg/breeding-calculator` — status 200; description covers offspring and every breeding combo.
- `https://paldb.cc/en/Iv_Calc` — status 200; IV/stat/database competitor page available.

Current local data counts from JSON audit:

- Pals: 297 in `src/data/pals.latest.json`.
- Generated normal pairs: 44,253 in `src/data/breeding-pairs.latest.json`.
- Special combos: 0 in `src/data/special-combos.latest.json`.
- Passives: 3 in `src/data/passives.latest.json`.
- Pals with any stats object populated: 20/297.
- Pals with all `hp`, `attack`, and `defense` populated: 0/297 in the current audit script.
- Aliases: 594 in `src/data/aliases.latest.json`.

## Current capabilities vs likely user intents

| User intent | Current coverage | Gap severity | Notes |
|---|---|---:|---|
| “What child do these two parents make?” | Present via `childFromParents()` and pair mode. | Medium | Uses normal CombiRank closest-average formula; special combo overrides are not applied. |
| “What parents can make this target Pal?” | Present via generated `pairsByChild`, limited display. | Medium | Useful, but still normal-formula only; no filters for owned Pals, special combos, availability, or passive goals. |
| “Find a route from my owned Pals to a target.” | UI exists, but logic is mostly direct-pair fallback. | High | `solveRoute()` checks target already owned, direct owned pair, or simplest target pair. It does not build multi-generation route trees despite `maxGenerations`. |
| “Paste/import my Palbox and optimize routes.” | Textarea for owned Pals exists. | High | No Palbox parser/import format, no dedupe/suggestion feedback, no privacy prompt around shareable owned lists. |
| “Plan passive skills.” | Passive planner shell exists. | High | Only 3 passives are seeded; no effects/categories, no inheritance odds, no parent candidate integration. |
| “Calculate exact IVs/expected stats.” | Caveated stat band UI exists. | High | Sparse base stats and simplified formula make this an educational band checker, not a competitive IV calculator. |
| “Check Palworld 1.0 freshness and sources.” | Good visible data-version and source policy exists. | Medium | Current dataset date is 2026-07-16; needs recurring patch/source audit before stronger freshness claims. |
| “Read guides before using a tool.” | 8 guide pages exist and are in sitemap. | Low-Medium | Good coverage for combo/tree/1.0/IV/passives/Anubis/Jetragon/examples; next content should be data-backed rather than generic. |
| “What can I breed from the Pals I own?” | Not meaningfully present. | High | This is a strong differentiator from direct target lookup, but requires reliable graph/data first. |
| “Compare route alternatives by practicality.” | Alternatives exist as first few target pairs. | Medium-High | No scoring by rarity, distance from owned Pals, biome/location, passive compatibility, or missing-parent count beyond simple direct fallback. |

## High-value gaps to fix first

### 1. Real route graph solver

Why it matters:

- Route/owned-Pal intent was identified as a flagship differentiator in prior research.
- Pal Routes directly owns “shortest route from owned Pals to target” messaging on its live page.
- PalCalculator’s live meta and route page already promise route planning from owned Pals, so logic depth should catch up with copy.

Observed current limitation:

- `src/calculators.ts:81-105` does not search a multi-generation graph. It returns target-owned, direct pair, no-owned fallback, partial-owned fallback, or no-route.
- `maxGenerations` is shown in UI and returned in constraints, but it does not drive a generation-by-generation search.

Safe addition:

- Build client-side BFS/iterative deepening over verified normal + special pairs.
- Start from owned Pal IDs; at each generation add children available from known parents; stop when target is produced or `maxGenerations` is reached.
- Track predecessor pair for route reconstruction.
- Score alternatives by fewest generations, fewest missing Pals, parent rarity sum, and special-combo caveats.
- Keep route output caveated and cap search depth for performance.

Recommended checks:

- Fixtures: target already owned, direct owned pair, 2-generation route, no owned Pals, invalid Pal, impossible/unbreedable target, special combo route once data exists.
- Performance budget on mobile for 297 Pals / 44k+ normal pairs.
- Verify that `maxGenerations=1` and `maxGenerations=3` can produce different outputs on known fixtures.

### 2. Verified special combo override table

Why it matters:

- Users and competitors mention unique/special breeding combos.
- Current data explicitly lists `verified special combo override table` as unsupported.
- Every normal pair result caveat says `SPECIAL_COMBO_NOT_APPLIED`.

Safe addition:

- Add special combos only when cross-checked from at least two public data sources or from an official/datamined source with clear license/source notes.
- Store them in `special-combos.latest.json` with `parentAId`, `parentBId`, `childId`, `isOrderSensitive`, `sourceRefs`, and caveats.
- Apply overrides before normal formula output in `childFromParents()`, `parentsForTarget()`, and route graph generation.

Recommended sources/checks:

- Current Palworld.gg breeding calculator data.
- Palpedia breeding page for unique combos/mutations/wild egg caveats.
- PalDB or another public game-data source for cross-check.
- Steam/Pocketpair official patch notes only for patch/version awareness, not full combo tables.

Unsupported-risk caveat:

- Do not claim “all special combos” until the source set and count are documented.
- If one source disagrees, show a caveat or withhold the combo instead of choosing silently.

### 3. Full passive skill dataset and better passive planner

Why it matters:

- Autosuggest/prior research identified passive skill planning as a real intent.
- Current passive planner recognizes only `Artisan`, `Serious`, and `Swift`, which makes the page feel like a demo for most real queries.
- Competitor pages mention passive paths/builds, but a clear beginner-friendly planner remains a useful wedge.

Safe addition:

- Expand passives to a verified list with display name, stable ID, category (`work`, `combat`, `movement`, `negative`, etc.), effect text, numeric modifiers where safely sourced, sourceRefs, and caveats.
- Add explicit unrecognized-passive feedback and suggestions.
- Add goal presets without universal “best” claims: base worker, mount/movement, combat attacker, breeder candidate.
- Integrate passive planner with breeding/route output as “planning notes,” not deterministic odds.

Recommended checks:

- Validate aliases/case-insensitive matching.
- Ensure negative or exclusive passives do not get recommended as universal best picks.
- Keep “passive inheritance RNG” visible; do not provide exact probability unless formula/source is verified.

### 4. Stat and IV data expansion

Why it matters:

- Live title and meta advertise IV/stat tools.
- Competitors such as Palpedia Builder, Game8, Wikily/Paldex, and PalDB already provide richer IV/stat tooling.
- Current audit found only 20 Pals with any stats object, and no Pal with all `hp`, `attack`, `defense` populated in the current JSON structure.

Safe addition:

- Populate base HP/Attack/Defense for all Pals where sources can be cross-checked.
- Add formula fields for level, souls, condenser stars, passives, partner/trust, alpha/lucky modifiers only if source-backed.
- Distinguish “expected stat preview” from “IV reverse solve.”
- For unsupported modifiers, keep outputs as bands and explain what input is missing.

Recommended checks:

- Fixture known Pal/level examples from source pages.
- Impossible values produce explicit `IMPOSSIBLE_STAT_VALUE` or similar instead of only broad labels.
- No formula should imply exact IV certainty if rounding/modifier handling remains incomplete.

### 5. Owned-Pal reverse discovery

Why it matters:

- Prior research called out “I have these Pals, what can I breed?” as a P1 differentiator.
- Users with a Palbox/owned list often do not know the target yet; direct target calculators miss this exploratory intent.

Safe addition:

- Add a data-backed “What can I breed?” report: input owned Pals, output direct children and near-term unlocks.
- Group by rarity, element, work/combat tag, or popular target only if data supports those fields.
- Keep all processing browser-local; avoid save-file upload until owner approves privacy/compliance details.

Recommended checks:

- Empty list and invalid-name feedback.
- Large pasted list performance.
- Privacy language if share URLs include owned names.

### 6. Data-backed target pages and guide upgrades

Why it matters:

- Current guide pages are useful but intentionally generic/caveated.
- Anubis/Jetragon pages can become stronger if they embed current generated parent-pair summaries or explicit “unsupported in this data build” states.

Safe addition:

- Before broad `/breed/{pal-slug}/` programmatic pages, upgrade 2-5 top target pages using generated current data snapshots.
- Candidate pages: Anubis, Jetragon, Orserk, Xenolord/other high-interest 1.0 targets only after verification.
- Include data-version, top parent pairs, route-entry CTA, passive/IV follow-up CTAs, and noindex if data confidence is not sufficient.

Recommended checks:

- Generated page must match calculator output from the same data build.
- Do not hardcode target-specific claims that can drift from data.
- If a legendary/special combo is unsupported, say so clearly rather than implying a route exists.

## Lower-priority opportunities

- Capture-rate calculator: useful P1/P2 SEO/tool route if accurate formulas and capture modifiers can be sourced.
- Work suitability/base calculator: useful if the dataset adds work suitability, work speed, food, partner skill, and base-task fields.
- Patch/data changelog page: useful after the site has an actual recurring data refresh process.
- Import/export owned-Pal JSON/CSV: useful after local privacy copy and schema are approved.
- Shareable route/result URLs: prior backlog already marked this as important; include owned list only with explicit user awareness.

## Unsupported-risk caveats to preserve

These caveats should stay visible unless the underlying data/functionality is actually implemented and verified:

- Unofficial fan-made site; not affiliated with Pocketpair.
- Normal breeding formula may differ from special-combo overrides until the special table is verified and applied.
- Passive inheritance is RNG-influenced; do not imply deterministic outcomes or exact odds without a source-backed probability model.
- IV/stat calculators are caveated when formulas, rounding, souls, condenser stars, passives, partner/trust, alpha/lucky modifiers, or base stats are incomplete.
- No server-side save upload or raw Palbox persistence in MVP.
- Public/community data sources are not official; data can change after patches.
- Competitor pages should be references/cross-checks, not sole source-of-truth.

## Recommended source/check matrix

| Data/content area | Candidate public sources | Minimum check before implementation | Caveat if not met |
|---|---|---|---|
| Pal roster/names/elements | Palworld.gg, PalDB, Palpedia | Counts, IDs/slugs, display names, element lists align or discrepancies documented. | Label as public-web dataset; avoid “complete official roster.” |
| Normal breeding formula/CombiRank | Palworld.gg, PalDB/Paldex-style sources, current app fixtures | Formula reproduces known examples and pair count is stable for current roster. | Keep `normal formula` caveat. |
| Special combos | Palpedia unique combos/mutations, Palworld.gg, PalDB/community data | Two-source agreement or explicit high-confidence source with version date. | Do not apply silently; show unsupported or disputed state. |
| Passives | PalDB/passive pages, Palworld.gg passive list, Palpedia/Game8 for explanatory cross-check | Names, effects, categories, negative/positive flags, and patch date captured. | Planner remains seed/example only. |
| Base stats/IV formulas | PalDB individual pages, Palpedia Builder, Game8/Wikily formula explanations | Base stats and formula terms validated on fixtures. | Keep broad bands; do not claim exact IVs. |
| Route examples/content | Generated from local calculator data only | Snapshot includes dataVersion and can be reproduced by tests. | Present as workflow examples, not exact recommended combos. |
| Patch freshness | Steam/Pocketpair news feed, official channels | Record last checked date and whether data-affecting patch exists. | Avoid “updated for latest patch” claims. |

## Suggested implementation sequence

1. Data QA task: verify current JSON/data-source mismatch risks and add fixture tests for existing calculators.
2. Backend/data task: implement special-combo schema + override application once verified data is collected.
3. Backend/frontend task: replace route fallback with real multi-generation solver and route fixtures.
4. Backend/data task: expand passive dataset and passive validation/suggestions.
5. Backend/data task: expand base stats/formula support and impossible-stat validation.
6. SEO/content task: upgrade top target guides with generated data blocks from the verified calculator build.

## Acceptance criteria for this audit artifact

- Lists current data and content coverage with concrete repo evidence.
- Identifies high-value data/calculator gaps without requiring owner credentials or production deploy.
- Separates safe additions from unsupported-risk caveats.
- Recommends source checks before any stronger production claims.
