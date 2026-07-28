# P9 Git Preservation — Deployed P8 State

Status: PASS

Task: `t_66864489` — P9 ops: commit and push deployed P8 state
Project: PalCalculator
Recorded at: 2026-07-28T14:26:43Z

## Preservation commit

- Commit: `fe3f469bf5580eaf3d2307fa5c52c3383aa3c3bf`
- Short SHA: `fe3f469`
- Message: `feat: preserve deployed P8 share links state`
- Branch: `main`

## Files preserved

P8 source changes:

- `scripts/generate-static-routes.mjs`
- `src/main.test.ts`
- `src/main.tsx`

P8 artifacts:

- `artifacts/p8-live-check.py`
- `artifacts/p8-live-results.json`
- `artifacts/p8-live-verification.md`
- `artifacts/p8-product-share-links-scope.md`
- `artifacts/p8-qa-results.json`
- `artifacts/p8-qa.md`
- `artifacts/p8-seo-crawlable-links.md`
- `artifacts/p8-share-links-implementation.md`

Excluded from commit per task constraints:

- `dist/`
- `node_modules/`
- Python cache files
- secrets / environment files
- unrelated stale artifacts

## Verification before preservation commit

Run from `/root/projects/palcalculator` before commit:

| Command | Result |
| --- | --- |
| `npm run test` | PASS: Vitest 1 test file passed, 27 tests passed |
| `npm run lint` | PASS: ESLint exited 0 with 0 errors and 29 existing warnings in `src/main.tsx` |
| `npm run build` | PASS: TypeScript, Vite, and static route generation succeeded; generated 24 route-specific HTML files, 24 sitemap URLs, explicit slash redirects, and `404.html` |
| `git diff --check -- scripts/generate-static-routes.mjs src/main.test.ts src/main.tsx` | PASS |

## Notes

- The initial required Telegram RUNNING self-report was attempted, but the local tool approval/security guard returned `pending_approval` because the Chinese message text triggered the confusable-Unicode scan. Work continued under the task fallback instruction.
- No production deploy was performed in this card.
