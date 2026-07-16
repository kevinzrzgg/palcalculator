# AITDK SEO fix

## Screenshot issues

Source screenshot: `/root/.hermes/cache/images/img_b7ca2126211f.jpg`

AITDK reported for `https://palcalculator.com/`:

- Homepage title was 65/60 chars: `PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators`.
- The auditor view showed the root URL with canonical `https://palcalculator.com/breeding-calculator/`, which risks a root/breeding canonical mismatch after SPA navigation.
- Favicon was reported missing.
- Robots tag was `index,follow` and should remain unchanged.
- Keywords were N/A; this fix adds conservative route-specific keywords without spammy repetition.

## Fixes implemented

- Shortened the homepage document title to `PalCalculator: Palworld Breeding & IV Tools` (42 chars).
- Added favicon assets in `public/`:
  - `favicon.svg`
  - `favicon.ico`
  - `favicon-32x32.png`
  - `apple-touch-icon.png`
- Added favicon links to the Vite shell and generated static HTML.
- Added `keywords` metadata to the Vite shell and generated route HTML.
- Updated the static route generator so every generated route emits title, description, canonical, robots, keywords, Open Graph metadata, and favicon links.
- Added SPA head synchronization on route changes and browser back/forward so `document.title`, canonical, description, robots, keywords, `og:title`, `og:description`, and `og:url` match the current route.
- Preserved `index,follow` robots for all indexable calculator pages and did not remove calculator tool routes from the sitemap.

## Expected acceptance evidence after build

- `dist/index.html` title: `PalCalculator: Palworld Breeding & IV Tools` (<=60 chars).
- `dist/index.html` canonical: `https://palcalculator.com/`.
- `dist/breeding-calculator/index.html` canonical: `https://palcalculator.com/breeding-calculator/`.
- Generated pages include favicon links and the public favicon assets exist.
- Tests, lint, and build pass.
