# P8 Git preservation: deployed P6/P7 state

## Summary
- Preserved the deployed P6/P7 production source and verification artifacts in Git before P8 feature work.
- P6 added six crawlable SEO guide pages and live-verification artifacts.
- P7 preserved AITDK-focused image alt/meta-description repairs and live-verification artifacts.
- Excluded unrelated stale modification to `artifacts/p4-beginner-ux-qa-results.json`; it was restored and not committed.

## Preservation commit
- Commit: `d5c0a982ff4749b5fed33f8529e6c0dda8a4b7ce`
- Short SHA: `d5c0a98`
- Message: `feat: preserve P6 P7 deployed state`
- Branch: `main`
- Remote target: `origin/main`

## Included file groups
- `index.html`
- `public/sitemap.xml`
- `scripts/generate-static-routes.mjs`
- `src/guides-data.json`
- `src/main.test.ts`
- `src/main.tsx`
- `artifacts/p6-*`
- `artifacts/p7-*`

## Verification before preservation commit
- `npm run test` — PASS, 25/25 tests passed.
- `npm run lint` — PASS with 0 errors and 28 existing warnings from `react-refresh/only-export-components` and `react-hooks/exhaustive-deps`.
- `npm run build` — PASS; Vite build succeeded and static route generation reported 24 route-specific HTML files, 24 sitemap URLs, explicit slash redirects, and 404.html.

## Timestamp
- Verification/preservation recorded at 2026-07-28T00:13:56Z.
