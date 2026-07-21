# P4 Passive Example Repair

Date: 2026-07-21
Task: t_e0d14e97
Workspace: `/root/projects/palcalculator`

## Defect repaired

The Passive Skill Calculator no longer offers the unsupported `Try: combat passive plan` example that filled `Musclehead, Ferocious` while the current passive dataset only supports `Artisan`, `Serious`, and `Swift`.

## Implementation changes

- Replaced the unsupported combat example with `Try: Swift mobility passive plan`, which fills `Swift` from the supported passive dataset.
- Changed passive planner result handling so zero recognized desired passives becomes an error/recoverable unsupported input state:
  - title: `No desired passives recognized`
  - code: `PASSIVE_NAMES_UNSUPPORTED`
  - severity: `error`
  - details list the supported passive names from the current data version.
- Updated passive error explainer copy so the beginner guidance says to use supported passive names from the current data version instead of presenting success copy.
- Added a regression test that extracts passive example `setDesired(...)` values from `src/main.tsx`, checks each example recognizes at least one supported passive from `passives.latest.json`, and verifies zero-recognized passive copy/error-state markers remain present.

## Verification

- `npm run test` — PASS, 18/18 tests.
- `npm run lint` — PASS, 0 errors, 28 existing warnings.
- `npm run build` — PASS, Vite/tsc build succeeded; generated 18 route-specific HTML files and 18 sitemap URLs.

## QA handoff

Rerun P4 beginner UX QA for `/passive-skill-calculator/`. The replacement example to click is `Try: Swift mobility passive plan`; unsupported manual input such as `Musclehead, Ferocious` should now show a recoverable unsupported state instead of a success explainer.
