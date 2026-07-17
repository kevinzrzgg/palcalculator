# AITDK SEO QA

## Result

PASS — local QA confirms the AITDK SEO metadata fixes are present in the production build.

## Source artifact reviewed

- Read `artifacts/aitdk-seo-fix.md`.

## Commands run

- `npm run test` — PASS, 1 test file, 9/9 tests passed.
- `npm run lint` — PASS with existing warnings only: 0 errors, 27 warnings from `react-refresh/only-export-components` and `react-hooks/exhaustive-deps` in `src/main.tsx`.
- `npm run build` — PASS; Vite build completed and `scripts/generate-static-routes.mjs` generated 10 route-specific HTML files, 10 sitemap URLs, explicit slash redirects, and `404.html`.

## Static build checks

### `dist/index.html`

- Title: `PalCalculator: Palworld Breeding & IV Tools`
- Title length: 43 chars (<=60)
- Canonical: `https://palcalculator.com/`
- Robots: `index,follow`
- Description meta: present
- Favicon links: present (`/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png`)

### `dist/breeding-calculator/index.html`

- Title: `Palworld Breeding Calculator - Parent Pairs`
- Title length: 43 chars (<=60)
- Canonical: `https://palcalculator.com/breeding-calculator/`
- Robots: `index,follow`
- Description meta: present
- Favicon links: present (`/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png`)

### Favicon assets

Confirmed public assets exist and are copied to `dist/`:

- `favicon.ico`
- `favicon.svg`
- `favicon-32x32.png`
- `apple-touch-icon.png`

### Sitemap and robots

- `dist/sitemap.xml` contains 10 URLs.
- Calculator pages included:
  - `/breeding-calculator/`
  - `/breeding-route-calculator/`
  - `/iv-calculator/`
  - `/stats-calculator/`
  - `/passive-skill-calculator/`
  - `/palworld-1-0-breeding-calculator/`
- `/share/` is not present in the sitemap.
- `dist/robots.txt` contains `Disallow: /share/`.

## SPA canonical/navigation check

Full browser execution was attempted against the local static preview, but the browser tool could not launch because the Playwright Chromium executable is not installed in this environment. As a fallback, source inspection confirmed `src/main.tsx` calls `updateHead(route)` whenever the current route state changes and on browser back/forward-derived route state changes. `updateHead` rewrites `document.title`, canonical, description, robots, keywords, and Open Graph URL/title/description for the active route, so the root route should not retain the breeding calculator canonical after SPA navigation.

## Notes

No blocking QA failures found.
