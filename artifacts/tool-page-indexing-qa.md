# Calculator tool page indexing QA

## Result

PASS — calculator tool page indexing and generated sitemap output match the acceptance criteria.

## Commands run

- `npm run test` — passed: 1 test file, 8 tests.
- `npm run lint` — passed with existing warnings only: 0 errors, 28 warnings in `src/main.tsx`.
- `npm run build` — passed; Vite built successfully and `scripts/generate-static-routes.mjs` generated 10 route-specific HTML files, 10 sitemap URLs, slash redirects, and `404.html`.

## Artifact reviewed

- Read upstream artifact: `artifacts/tool-page-indexing-update.md`.
- Confirmed documented changed calculator routes and SEO caveats, including `/share/` remaining disallowed and `404.html` remaining `noindex,follow`.

## Generated sitemap verification

Parsed `dist/sitemap.xml` after `npm run build` and confirmed exactly 10 `<loc>` entries, including all required routes:

- `https://palcalculator.com/`
- `https://palcalculator.com/breeding-calculator/`
- `https://palcalculator.com/breeding-route-calculator/`
- `https://palcalculator.com/iv-calculator/`
- `https://palcalculator.com/stats-calculator/`
- `https://palcalculator.com/passive-skill-calculator/`
- `https://palcalculator.com/palworld-1-0-breeding-calculator/`
- `https://palcalculator.com/data-sources/`
- `https://palcalculator.com/privacy/`
- `https://palcalculator.com/terms/`

`/share/` was not present in any sitemap URL.

## Generated HTML metadata verification

Parsed generated HTML files under `dist/` and confirmed every required route has:

- `<meta name="robots" content="index,follow"/>`
- A canonical URL matching `https://palcalculator.com{route}`

Checked routes:

- `/`
- `/breeding-calculator/`
- `/breeding-route-calculator/`
- `/iv-calculator/`
- `/stats-calculator/`
- `/passive-skill-calculator/`
- `/palworld-1-0-breeding-calculator/`
- `/data-sources/`
- `/privacy/`
- `/terms/`

## Share and 404 checks

- `public/robots.txt` contains `Disallow: /share/`.
- No generated `dist/share/` path exists after build.
- Generated `dist/404.html` has `<meta name="robots" content="noindex,follow"/>`.
