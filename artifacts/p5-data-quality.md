# P5 Data Quality Checks: calculator invariants

Project: PalCalculator
Task: `t_99bc01a3`
Workspace: `/root/projects/palcalculator`
Date: 2026-07-26 UTC

## Summary

This task added regression coverage for calculator and dataset invariants that can be verified locally without external credentials. One small safe calculator edge-case fix was made: `solveRoute()` now rejects `maxGenerations < 1` for non-owned targets instead of returning a one-generation fallback that violates the requested constraint.

## Files changed

- `src/calculators.ts`
  - Added an explicit `MAX_GENERATIONS_TOO_LOW` error path after the target-owned shortcut and before route fallback selection.
  - The target-owned shortcut still succeeds with zero generations, so users can pass `maxGenerations = 0` only when the target is already owned.
- `src/main.test.ts`
  - Added alias invariants that ensure every entry in `src/data/aliases.latest.json` points to an existing Pal and resolves through `findPal()`.
  - Added breeding-pair invariants that ensure `src/data/breeding-pairs.latest.json` has exactly `n * (n + 1) / 2` unordered normal pairs for the current Pal roster, valid parent/child references, expected normal-formula metadata, one unordered entry per parent pair, and sampled alignment with `childFromParents()`.
  - Added special-combo/passive seed limit checks that keep the empty special-combo table and 3-passive seed dataset explicit and caveated.
  - Added route/stat unsupported edge-case checks for `maxGenerations = 0`, target-already-owned, and a Pal with no supported HP/attack/defense base stats.

## Data quality coverage now guarded

Current local dataset facts covered by tests:

- Pals: 297 loaded through `src/data/pals.latest.json`.
- Alias rows: at least 2 per Pal and all resolve to valid Pal IDs through the calculator lookup map.
- Normal breeding pairs: 44,253 expected/generated unordered parent pairs for 297 Pals.
- Pair references: every sampled and iterated pair uses valid parent/child IDs and the `normal-combirank-closest-average` rule.
- Special combos: currently intentionally empty, with `SPECIAL_COMBO_TABLE_PENDING` blocking caveat and `verified special combo override table` listed as unsupported.
- Passives: currently intentionally seed-only with 3 supported passives (`Artisan`, `Serious`, `Swift`) and `PASSIVE_SEED` caveats.
- Stat estimates: Pals without supported HP/attack/defense bases return empty expected/IV bands plus `BASE_STATS_PARTIAL`, not exact unsupported claims.

## Current limits intentionally preserved

These are documented limits, not fixed in this task:

- Route solving is still a direct-pair/fallback solver, not the multi-generation BFS route planner recommended by the P5 research audit.
- Special-combo overrides are not applied because the verified table is empty.
- Passive support remains the 3-item seed dataset; inheritance odds are not claimed.
- Stat/IV output remains broad caveated bands; exact IV solving and all modifiers remain unsupported.

## Verification

Commands required by the task were run after changes:

- `npm run test` — passed, 23 tests.
- `npm run lint` — passed with 0 errors and 28 pre-existing warnings in `src/main.tsx`.
- `npm run build` — passed; Vite built the app and `scripts/generate-static-routes.mjs` generated 18 route-specific HTML files, 18 sitemap URLs, explicit slash redirects, and `404.html`.

No production deploy was performed.
