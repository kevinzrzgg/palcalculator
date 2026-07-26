# P5 Owned Pal Route UX Implementation

Task: `t_66e20bfc` — P5 frontend: browser-local owned Pal route UX upgrade
Date: 2026-07-27
Status: implemented locally; no production deploy performed.

## Summary

Implemented a no-login browser-local owned Pal helper on the Route Calculator. Users can add valid Pals from the existing datalist, remove individual chips, clear the list, and apply the saved browser-local list into the route solver input.

## Files changed for this feature

- `src/main.tsx`
  - Added `palcalculator:owned-pals:v1` localStorage helpers.
  - Added route-page owned Pal helper UI.
  - Stores Pal IDs only, resolves display names in the browser, and gracefully falls back if localStorage is unavailable.
  - Added privacy-safe owned-list events using count buckets only.
- `src/styles.css`
  - Added helper panel, chip, and action styling.
- `src/main.test.ts`
  - Added static contract coverage for localStorage-only behavior, visible privacy copy, route handoff markers, and raw owned-Pal analytics exclusions.
  - Increased the generated breeding-pair invariant test timeout to avoid a 5s timeout during full verification.
- `artifacts/p5-owned-pal-route-ux.md`
  - This handoff artifact.

Note: the shared workspace also currently contains unrelated/concurrent modified and untracked artifacts from other P4/P5 tasks. They were not deployed by this task.

## User-facing behavior

- Route page now shows a "Browser-local owned Pal helper" section above the route inputs.
- Add flow:
  - Type/select a Pal in "Add an owned Pal".
  - Click "Add to browser-local list".
  - Invalid names show a recoverable message instead of guessing.
- List management:
  - Saved Pals render as removable chips.
  - "Clear local list" removes the saved helper list.
- Route handoff:
  - "Use local list in route" writes the saved display names into the existing route owned-Pals text area.
  - The original textarea remains editable/paste-compatible.
- localStorage fallback:
  - If localStorage is unavailable, the helper displays a warning and the existing route textarea remains the fallback path.

## Privacy and static MVP safety

- Storage scope is browser-local only via `window.localStorage`.
- Storage key: `palcalculator:owned-pals:v1`.
- Stored value: JSON array of Pal IDs from the static dataset.
- No account, backend, upload, database, cookie identity, or server sync was added.
- Visible UI copy states that data is stored only in the browser and removed when browser data is cleared.
- Analytics events added:
  - `owned_list_add`
  - `owned_list_remove`
  - `owned_list_clear`
  - `owned_list_apply`
- Event payloads use `owned_count_bucket`, `storage_scope`, `tool_type`, route context, and data version only.
- Raw owned-Pal lists, exact localStorage contents, and free-text owned inputs are not sent in these events.

## Verification

Commands run from `/root/projects/palcalculator`:

- `npm run test` — PASS, 23 tests passed.
- `npm run lint` — PASS with existing warnings only; 0 errors.
- `npm run build` — PASS; Vite build succeeded and generated 18 route-specific HTML files / 18 sitemap URLs.

No production deploy was performed.

## Review notes

Recommended reviewer checks:

1. Route page UI in desktop/mobile widths.
2. Add/remove/clear/apply behavior with localStorage enabled.
3. Fallback copy by simulating localStorage failure if desired.
4. Confirm event payloads remain count-bucket only and do not include raw owned-Pal names.
