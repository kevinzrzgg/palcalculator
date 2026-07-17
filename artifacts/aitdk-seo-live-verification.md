# AITDK SEO Live Verification

## Result

PASS — AITDK SEO fixes were deployed to Cloudflare Pages production and verified live on `https://palcalculator.com/`.

## Deployment

- Command: `wrangler pages deploy dist --project-name palcalculator --branch main --commit-dirty=true`
- Result: PASS
- Deployment URL: `https://69785ddb.palcalculator.pages.dev`
- Verified at: `2026-07-16T12:56:51Z`

## Build

- Command: `npm run build`
- Result: PASS
- Output: Vite build completed and `scripts/generate-static-routes.mjs` generated 10 route-specific HTML files, 10 sitemap URLs, explicit slash redirects, and `404.html`.

## Live checks

### `https://palcalculator.com/`

- HTTP status: 200
- Title: `PalCalculator: Palworld Breeding & IV Tools`
- Title length: 43 chars (<=60)
- Canonical: `https://palcalculator.com/`
- Robots: `index,follow`
- Description meta: present
- Favicon links: present (`/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png`)

### `https://palcalculator.com/breeding-calculator/`

- HTTP status: 200
- Title: `Palworld Breeding Calculator - Parent Pairs`
- Title length: 43 chars
- Canonical: `https://palcalculator.com/breeding-calculator/`
- Robots: `index,follow`
- Description meta: present
- Favicon links: present (`/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png`)

### `https://palcalculator.com/sitemap.xml`

- HTTP status: 200
- URL count: 10

### `https://palcalculator.com/robots.txt`

- HTTP status: 200
- `Disallow: /share/`: present

## Overall

All required live verification checks passed.
