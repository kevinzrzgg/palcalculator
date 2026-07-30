# P11 Route Solver Core Implementation

Project: PalCalculator
Task: t_db90e6ad
Workspace: /root/projects/palcalculator
Status: implementation complete; no deploy performed.

## Summary

Implemented a browser-local bounded multi-generation route solver in `src/calculators.ts`. The solver now searches the current normal breeding graph from recognized owned Pals, reconstructs ordered breeding steps and a route tree, exposes bounded alternatives where feasible, and returns explicit fallback/error states for invalid targets, too-low generation caps, too-high generation caps, no-owned starter guidance, and owned-route not found.

## Files changed

- `src/calculators.ts`
  - Added a reusable generated normal-pair list and parent-pair lookup map from the existing current data build.
  - Reworked `solveRoute()` into a bounded BFS/DP-style search:
    - generation 0 is the recognized browser-local/text owned Pal set;
    - each generation expands pairs whose parents were available before that generation;
    - target discovery stops at the first reached generation;
    - predecessor pairs reconstruct the final ordered route steps and nested `routeTree`.
  - Preserved the target-owned shortcut with `generations: 0` and no steps.
  - Preserved no-owned behavior as educational starter-pair guidance, while labeling it with `fallbackState: 'starter-pair-guidance'` and returning missing-Pal explanations.
  - Preserved direct-pair behavior as a one-generation route when both parents are owned.
  - Added guardrails:
    - `MAX_GENERATIONS_TOO_LOW` remains for non-owned targets below 1 generation.
    - `MAX_GENERATIONS_TOO_HIGH` caps browser-local search above 8 generations.
    - alternatives are capped to 3.
    - `searchStats` reports pair scans and cap metadata.
  - Kept caveats tied to current normal-formula data and special-combo unsupported status.
  - Optimized `childFromParents()` to use the precomputed pair map instead of recomputing the formula for known parents.
- `src/main.test.ts`
  - Added coverage for a true two-generation route: `Penking, Bushi` to `Caprity Noct` through `Sibelyx`.
  - Added max-generation boundary coverage where the same route fails with `maxGenerations = 1`.
  - Added direct-pair and target-owned preservation checks.
  - Added invalid target and performance guardrail checks.
  - Existing P8 share URL privacy tests continue to assert that route share payloads include target/maxGen only and do not include owned lists/raw owned text.

## Solver output shape notes

Successful route results now include:

- `steps`: ordered flat route steps with generation, parents, child, owned-parent flags, source pair id, combo type, and caveats.
- `routeTree`: nested target-first tree whose leaves are owned/missing Pals and bred nodes reference their producing step.
- `alternatives`: bounded alternative routes when other reachable target pairs exist within the cap.
- `missingPals` and `missingPalExplanations`: empty for solved owned routes, populated for starter guidance or no-route states.
- `fallbackState`: deterministic state label such as `target-owned`, `starter-pair-guidance`, `solved-owned-route`, `owned-route-not-found`, or `performance-guardrail`.
- `constraints` and `searchStats`: max generation, special-combo exclusion, recognized-owned count, available-Pal count, pair scans, scan limit, and max generation cap.

## Known limits intentionally preserved

- Uses the existing normal CombiRank formula graph only.
- Verified special-combo overrides remain unsupported and caveated.
- No backend, account, upload, save-file import, cloud sync, DNS/GSC/Cloudflare dashboard, or deploy work was added.
- Route share URLs continue to omit browser-local owned-Pal lists by default.
- UI rendering still consumes the existing flat steps summary; this task focused on the backend/core return shape for downstream frontend/QA work.

## Verification

Commands run from `/root/projects/palcalculator`:

- `npm run test -- src/main.test.ts` — passed: 31 tests.
- `npm run test` — passed: 31 tests.
- `npm run lint` — passed with 0 errors and 29 warnings in `src/main.tsx` from existing React fast-refresh / hook dependency warnings.
- `npm run build` — passed: TypeScript build, Vite production build, and static route generation completed. Generator reported 24 route-specific HTML files, 24 sitemap URLs, explicit slash redirects, and `404.html`.

No production deploy was performed.

Final line: [DONE]
