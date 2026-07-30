# P11 Route Solver UX Implementation

Project: PalCalculator
Task: t_a8419fff
Workspace: /root/projects/palcalculator
Status: implementation complete; no deploy performed.

## Summary

Surfaced the P11 multi-generation route solver output in `/breeding-route-calculator/` with a practical result UX. The route calculator now renders a compact summary, practical next action copy, step-by-step route cards, a nested route tree, bounded alternatives, missing-Pal explanations, and clear data/special-combo caveats while preserving browser-local owned Pal privacy.

## Files changed

- `src/main.tsx`
  - Added typed route-result rendering helpers:
    - `RouteTreeView` / `RouteTreeBranch` for nested owned/bred/missing route nodes.
    - `RouteStepList` for ordered generation/step cards with owned-vs-bred parent labels.
    - `RouteResultDetails` and `RouteFailureDetails` for success and no-route states.
    - `MissingPalGuidance`, `RouteAlternatives`, and `RouteCaveats` sections.
  - Integrated the new solver result shape returned by `solveRoute()` into the existing `RouteSolver` result box.
  - Preserved the existing browser-local owned Pal helper and localStorage key.
  - Preserved route share privacy: `ShareControls` still receives `payload={{ target, maxGen }}` only; owned Pal text and localStorage state are not encoded.
  - Kept copy caveated as fan-made, data-versioned, normal-formula route graph guidance.
- `src/styles.css`
  - Added mobile-friendly styling for `.route-summary`, `.route-tree`, `.route-alternatives`, `.missing-pal-guidance`, and route caveat blocks.
  - Kept mobile media rules so route summary and alternatives collapse to one column on narrow screens.
- `src/main.test.ts`
  - Added a P11 static frontend contract test for route tree UX, alternatives, missing explanations, privacy guardrails, and route-specific CSS hooks.
  - Existing P8 share URL privacy and crawlable-link tests continue to run.
- `artifacts/p11-route-solver-ux.md`
  - This implementation handoff artifact.

## UX behavior notes

- Solved route:
  - Shows generation count, step count, missing Pal count, and alternative count before detailed lists.
  - Shows “Practical next action” copy telling users to breed step 1 first and use produced children in later steps.
  - Shows a nested tree where leaves are marked as owned, bred, or missing.
  - Shows bounded alternatives with their own ordered steps.
- Target already owned:
  - Shows zero-step success and suggests using Breeding/Passives for next checks.
- No owned Pals / starter guidance:
  - Labels the result as starter guidance and tells users to add owned Pals to turn it into an owned-Pal route.
- No route / invalid / capped states:
  - Shows missing candidate guidance when available and suggests checking names, adding owned Pals, or increasing max generations within the browser-local cap.

## Privacy and SEO guardrails

- No login, backend, upload, save-file import, server storage, cookie identity, or cloud sync was added.
- Existing browser-local helper still stores only Pal IDs in `palcalculator:owned-pals:v1`.
- Route share URL payload remains target + maxGen only. It does not include owned Pals, raw owned text, localStorage contents, result JSON, analytics payloads, or identifiers.
- No new routes, result pages, share pages, sitemap URLs, DNS, Cloudflare dashboard, GSC/Bing, or deploy work was added.
- Existing canonical/query-state behavior remains source-tested: query-state route URLs noindex at runtime and canonicalize to the base route.

## Caveats intentionally preserved

- Route results use the current normal-formula route graph only.
- Verified special-combo override data remains unsupported and visibly caveated.
- PalCalculator remains an unofficial fan-made tool; output is planning guidance, not guaranteed or official.

## Verification

Commands run from `/root/projects/palcalculator`:

- `npm run test -- src/main.test.ts -t "renders P11 route tree UX"` — failed first before implementation, then passed after UI/styling changes.
- `npm run test` — passed: 33 tests.
- `npm run lint` — passed with 0 errors and 37 warnings in `src/main.tsx` from the existing React fast-refresh / hook dependency warning pattern plus the new colocated route UI helpers.
- `npm run build` — passed: TypeScript build, Vite production build, and static route generation completed. Generator reported 29 route-specific HTML files, 29 sitemap URLs, explicit slash redirects, and `404.html`.

No production deploy was performed.

Final line: [DONE]
