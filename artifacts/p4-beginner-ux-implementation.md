# P4 Beginner UX Implementation — PalCalculator

Status: DONE for implementation
Date: 2026-07-21
Task: t_f913708c

## Summary
Implemented the P4 beginner UX layer so first-time Palworld users can choose a tool, try safe editable examples, and interpret results without external explanation.

## Changed areas
- `src/main.tsx`
  - Added homepage `How to use PalCalculator` 3-step section.
  - Added editable example rows to Breeding, 1.0 Breeding, Route, IV, Stats, and Passive tools.
  - Added visible helper text under core inputs.
  - Added result interpretation blocks with the exact labels `This means...`, `Next step...`, and `Caveat...` before share/copy controls.
  - Added safe aggregate analytics event names for beginner section/example/result/CTA interactions without raw user inputs.
  - Added beginner-specific guide CTA panel copy and helper text.
- `src/guides-data.json`
  - Updated guide CTA labels to beginner-specific calculator actions.
- `src/styles.css`
  - Added responsive styles for beginner section, examples, helper text, result explainer, and CTA helper copy.
- `src/main.test.ts`
  - Added regression tests for beginner examples, helper copy, result explainer labels, no ad markers, guide CTA copy, and sitemap invariance.

## Example coverage
- Breeding: `Try: Anubis parent lookup`, `Try: Penking + Bushi pair`, `Try: Jetragon target lookup`.
- Route: `Try: route to Anubis from Penking + Bushi`, `Try: no owned Pals yet`, `Try: longer route search`.
- IV: `Try: level 50 Anubis IV bands`, `Try: modifier caveat check`.
- Stats: `Try: Anubis expected stats`, `Try: change level comparison`.
- Passives: `Try: Artisan + Serious passive plan`, `Try: combat passive plan`.

## Preserved constraints
- Existing routes and sitemap count remain unchanged at 18 URLs.
- No login, database, payment, ad slots, or third-party ad mounts were added.
- Canonical/robots/static route behavior was not changed.
- Analytics additions use allowlisted aggregate properties only; raw owned-Pal lists, exact stat fields, desired passive free text, query strings, share URLs, emails, tokens, and save/import content are not logged by the new events.

## Verification
- `npm run test` — PASS, 17/17 tests.
- `npm run lint` — PASS with existing warning-only React Fast Refresh / exhaustive-deps warnings, 0 errors.
- `npm run build` — PASS; generated 18 route-specific HTML files and 18 sitemap URLs.

## Notes
- Jetragon remains an editable target lookup example with caveated unavailable-state behavior if current data cannot support it.
- The homepage Anubis example stores only the safe example id in `sessionStorage` to open the Breeding Calculator in target mode; no user input is persisted.
