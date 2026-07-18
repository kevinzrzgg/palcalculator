# PalCalculator SEO Content Expansion Implementation

## Summary

Implemented the first three SEO content expansion pages as indexable guide routes:

- `/guides/palworld-breeding-combos/`
- `/guides/palworld-breeding-tree/`
- `/guides/palworld-1-0-breeding-guide/`

The implementation uses the copy handoff in `artifacts/seo-content-expansion-copy.md`, keeps the visible copy fan-made/data-version-aware, and does not add ads or deployment changes.

## Files changed

- `src/guides-data.json` — shared frontend/static content source for the first three guide pages, including metadata, CTAs, sections, internal links, and visible FAQ Q&A.
- `src/main.tsx` — adds guide route keys, SPA route matching/head updates, guide page rendering, FAQ/TechArticle JSON-LD, and light internal guide links from the homepage plus breeding/route tool pages.
- `src/styles.css` — adds minimal guide/link-button/FAQ styling in the existing card/content style.
- `scripts/generate-static-routes.mjs` — reads `src/guides-data.json`, prerenders crawlable guide body copy into initial HTML, emits route-specific metadata/canonical/robots/keywords/OG, includes FAQPage + TechArticle schema, and adds guide routes to generated sitemap/redirects.
- `public/sitemap.xml` — includes the three new indexable guide URLs and existing indexable tool pages; `/share/` remains excluded.
- `src/main.test.ts` — adds guide route, sitemap count, metadata-length, visible FAQ, static generator, and no `/share/` assertions.

## SEO checks

- Titles are 30, 28, and 27 characters, all under 60.
- Meta descriptions are 121, 119, and 114 characters, all under 160.
- Canonicals are self-referencing HTTPS apex-domain trailing-slash URLs.
- Robots are `index,follow`.
- Guide static HTML includes visible H1, intro/body copy, internal links, FAQ text, FAQPage JSON-LD, and TechArticle JSON-LD before hydration.
- `dist/sitemap.xml` contains 13 URLs and no `/share/` URL.
- Analytics, Microsoft Clarity, favicon links, existing GSC/Bing/public static assets, and existing route metadata patterns were preserved.
- No third-party ad markers or reserved ad slot styles were found in source/static guide output.

## Verification

Commands run successfully:

- `npm run test` — 11 tests passed.
- `npm run lint` — passed with existing warnings only; no errors.
- `npm run build` — passed; generated 13 route-specific HTML files, 13 sitemap URLs, explicit slash redirects, and `404.html`.

Additional output inspection confirmed all three guide `dist/.../index.html` files exist, include title/description/canonical/robots/H1/FAQ markers, have roughly 1000+ visible body words each, and `dist/sitemap.xml` excludes `/share/`.

## Deployment

No deployment was performed. QA/ops should deploy and smoke-test the pushed commit.
