# P12 QA: performance optimization and SEO brief safety

Task: `t_14715c24`
Date: 2026-08-01
Deploy: not performed
Conclusion: GO — safe to proceed to the next approved step; no deploy was performed by QA.

## Scope

Validated the P12 frontend performance optimization and the P12 SEO next-content brief before deploy.

Inputs inspected:

- `artifacts/p12-performance-optimization.md`
- `artifacts/p12-seo-next-content-brief.md`
- `vite.config.ts`
- `public/sitemap.xml`
- generated `dist/` output

## Command verification

| Check | Result | Notes |
| --- | --- | --- |
| `npm run test` | PASS | 33/33 tests passed in `src/main.test.ts`. |
| `npm run lint` | PASS | 0 errors; 37 pre-existing warnings in `src/main.tsx` from fast-refresh/export and hook dependency rules. |
| `npm run build` | PASS | TypeScript, Vite build, and static route generation completed. |

Build output after P12 chunk split:

- `dist/assets/index-D8h5Ca41.js` — 69.67 kB, gzip 20.47 kB
- `dist/assets/calculator-data-8JnNABxB.js` — 111.80 kB, gzip 9.53 kB
- `dist/assets/guides-data-Dwi_nuJR.js` — 138.17 kB, gzip 31.20 kB
- `dist/assets/react-vendor-CnQ8cts2.js` — 189.68 kB, gzip 59.69 kB
- `dist/assets/rolldown-runtime-Bh1tDfsg.js` — 0.56 kB, gzip 0.36 kB
- `dist/assets/index-CmXCt1iC.css` — 11.33 kB, gzip 2.96 kB

No Vite `Some chunks are larger than 500 kB` warning was emitted. Largest JS chunk is now 189.68 kB.

## Sitemap and route regression checks

- `public/sitemap.xml`: 29 `<loc>` entries.
- `dist/sitemap.xml`: 29 `<loc>` entries.
- Public and generated sitemap URL paths match exactly.
- `dist/` contains 29 route-specific `index.html` files.
- `dist/index.html` asset references all exist:
  - `/assets/index-D8h5Ca41.js`
  - `/assets/rolldown-runtime-Bh1tDfsg.js`
  - `/assets/react-vendor-CnQ8cts2.js`
  - `/assets/calculator-data-8JnNABxB.js`
  - `/assets/guides-data-Dwi_nuJR.js`
  - `/assets/index-CmXCt1iC.css`

No SEO implementation was done in P12, so preserving 29 sitemap URLs is expected and confirmed.

## Browser smoke checks

Local static preview: `npm run preview` at `http://127.0.0.1:4173/`.

Routes smoked:

1. `/`
   - Title: `PalCalculator: Palworld Breeding & IV Tools`
   - Main content, tool cards, guide links, and brand icon rendered.
   - Browser console: clean.

2. `/breeding-route-calculator/?target=anubis&maxGen=3`
   - Title: `Palworld Breeding Route Calculator`
   - Query/share state hydrated into the route calculator.
   - Robots meta: `noindex,follow` for query-state route.
   - Canonical: `https://palcalculator.com/breeding-route-calculator/`
   - Share URL excludes browser-local owned-Pal state and page shows: `Your browser-local owned Pal list is not included in this share URL.`
   - Browser console: clean.

3. `/guides/how-to-breed-lyleen-palworld/`
   - Title/H1 rendered as `How to Breed Lyleen in Palworld`.
   - Static guide content, internal links, FAQ, footer guide links, and data-version caveats rendered.
   - Browser console: clean.

4. 390px mobile route smoke
   - Captured `artifacts/qa-screenshots/p12-route-mobile-390.png` from Chrome headless at 390 x 844.
   - Header/nav wraps onto two rows without clipped controls.
   - Hero, CTAs, data-version card, and text fit within the viewport; no obvious horizontal overflow or broken asset visible in the first mobile viewport.

## SEO brief safety validation

Validated `artifacts/p12-seo-next-content-brief.md`:

- Candidate table count: 12 rows.
- Candidate table duplicate URLs: none.
- Recommended implementation batch count: 5 URLs.
- Recommended implementation batch duplicate URLs: none.
- Recommended URLs overlapping current sitemap: none.
- Risky claim phrase hits: none for `official`, `guaranteed`, `100% accurate`, `exact odds`, `cheat`, `bypass`, or `complete wiki`.
- The brief clearly states it is planning only and does not perform source, sitemap, route, deploy, DNS, GSC, Cloudflare, login, backend storage, or save-file upload changes.
- The brief uses safe caveats around independent fan-site status, special-combo uncertainty, passive RNG, exact parent-pair generation, variants, and patch-sensitive data.

Recommended P12 content pages from the brief:

1. `/guides/how-to-breed-faleris-palworld/`
2. `/guides/how-to-breed-kitsun-palworld/`
3. `/guides/how-to-breed-suzaku-palworld/`
4. `/guides/how-to-breed-helzephyr-palworld/`
5. `/guides/how-to-breed-selyne-palworld/`

## Notes and constraints

- No deploy performed.
- No production behavior changes made by QA.
- No backend/server storage, login, DNS, GSC, or Cloudflare-dashboard work performed.
- Existing modified `vite.config.ts` and untracked P12 upstream artifacts were present before QA; QA added this report and one mobile screenshot artifact.
- The requested Telegram RUNNING self-report was attempted first, but the command was held by the terminal security approval guard. Status is recorded in Kanban instead.

## Final decision

GO. P12 performance chunk split is verified, sitemap count remains 29, generated assets exist, representative local routes and query/share behavior smoke cleanly, 390px mobile route view has no obvious first-viewport regression, and the SEO brief is safe for downstream copy/frontend planning.
