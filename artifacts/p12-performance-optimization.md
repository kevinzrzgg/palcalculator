# P12 Performance Optimization

Timestamp: 2026-08-01 14:48:58 UTC
Task: `t_df6a23f6` — reduce initial bundle warning without changing behavior
Deploy: not performed

## Goal

Address the Vite production build warning where the single emitted JavaScript chunk exceeded the 500 kB warning threshold after P11, while preserving calculator behavior, guide pages, sitemap/canonical/robots/schema output, share URL privacy, and localStorage behavior.

## Baseline build output

Command: `npm run build`

Before the change, Vite emitted one JavaScript asset above the warning threshold:

| Asset | Size | Gzip | Source map |
| --- | ---: | ---: | ---: |
| `dist/assets/index-BU2H6ri9.js` | 509.62 kB | 120.50 kB | 1,302.80 kB |
| `dist/assets/index-CmXCt1iC.css` | 11.33 kB | 2.96 kB | n/a |
| `dist/index.html` | 2.06 kB | 0.92 kB | n/a |

Vite warning observed:

> Some chunks are larger than 500 kB after minification.

The build still generated 29 route-specific HTML files and 29 sitemap URLs.

## Inspection notes

The emitted source map showed the largest contributors were:

| Source | Source content size |
| --- | ---: |
| `react-dom/client` production bundle | 536,016 bytes |
| `src/guides-data.json` | 160,453 bytes |
| `src/data/pals.latest.json` | 118,507 bytes |
| `src/main.tsx` | 66,158 bytes |
| `src/calculators.ts` | 18,107 bytes |

Low-risk split points were static data and vendor code because they do not change runtime behavior, route matching, calculator state, share URL serialization, localStorage keys, or rendered copy.

## Change implemented

Updated `vite.config.ts` to keep sourcemaps enabled and add conservative `manualChunks` output grouping:

- `react-vendor`: React, React DOM, and scheduler dependencies.
- `calculator-data`: JSON data under `src/data/`.
- `guides-data`: `src/guides-data.json`.
- main app chunk remains separate.

This is build-output chunking only; no application source behavior or route definitions were changed.

## After build output

Command: `npm run build`

After the change, no JavaScript chunk exceeded 500 kB and the Vite chunk-size warning was not emitted:

| Asset | Size | Gzip | Source map |
| --- | ---: | ---: | ---: |
| `dist/assets/index-D8h5Ca41.js` | 69.67 kB | 20.47 kB | 154.77 kB |
| `dist/assets/calculator-data-8JnNABxB.js` | 111.80 kB | 9.53 kB | 138.75 kB |
| `dist/assets/guides-data-Dwi_nuJR.js` | 138.17 kB | 31.20 kB | 168.42 kB |
| `dist/assets/react-vendor-CnQ8cts2.js` | 189.68 kB | 59.69 kB | 841.17 kB |
| `dist/assets/rolldown-runtime-Bh1tDfsg.js` | 0.56 kB | 0.36 kB | n/a |
| `dist/assets/index-CmXCt1iC.css` | 11.33 kB | 2.96 kB | n/a |
| `dist/index.html` | 2.39 kB | 1.00 kB | n/a |

Build output still reported:

> Generated 29 route-specific HTML files, 29 sitemap URLs, explicit slash redirects, and 404.html.

## Verification

- `npm run test` — passed: 33 tests, 1 file.
- `npm run lint` — passed with 0 errors and 37 pre-existing warnings in `src/main.tsx`.
- `npm run build` — passed; no Vite chunk-size warning emitted; 29 route-specific HTML files and 29 sitemap URLs generated.

## Notes

A previous attempt to run `npm run test`, `npm run lint`, and `npm run build` in parallel caused resource contention/timeouts and two Vitest timeout failures. Rerunning the commands serially passed.

No deploy was performed.
