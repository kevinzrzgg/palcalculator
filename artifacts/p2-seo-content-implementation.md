# PalCalculator P2 SEO Content Implementation

Task: `t_64b65eca`
Date: 2026-07-20
Workspace: `/root/projects/palcalculator`

## Summary

Implemented the second P2 SEO content batch using the approved SEO brief and copy artifact. The React/Vite app now has five additional indexable guide routes with route-specific metadata, crawlable static initial HTML, FAQ/TechArticle JSON-LD, internal guide/tool links, and sitemap coverage.

## Implemented URLs

- `/guides/palworld-iv-explained/`
- `/guides/best-passive-skills-for-breeding-palworld/`
- `/guides/how-to-breed-anubis-palworld/`
- `/guides/how-to-breed-jetragon-palworld/`
- `/guides/palworld-breeding-route-examples/`

## Changed files

- `src/guides-data.json`
  - Added the five P2 guide content records from `artifacts/p2-seo-content-copy.md`.
  - Preserved the existing three Batch 1 guides.
  - Added cross-cluster related links between Batch 1 and Batch 2 guide pages.
- `src/main.tsx`
  - Extended guide route typing to include all P2 guide keys.
  - Added guide link cards to IV, stats, passive, and data-source tool contexts so calculators link to related guide content.
  - Expanded footer guide links to include all guide pages.
- `public/sitemap.xml`
  - Preserved the existing 13 URLs and added the 5 P2 guide URLs for a total of 18 sitemap URLs.
- `src/main.test.ts`
  - Updated guide route/sitemap assertions from 3 guide pages / 13 URLs to 8 guide pages / 18 URLs.
  - Added P2 assertions for title/description length, CTAs, internal links, sitemap presence, and ad-marker exclusion.
- `artifacts/p2-seo-content-implementation.md`
  - This implementation handoff.

## Static-route behavior

`npm run build` runs `scripts/generate-static-routes.mjs`, which reads `src/guides-data.json`. No separate static route list was duplicated for the new P2 pages. The generated output reported:

- `Generated 18 route-specific HTML files, 18 sitemap URLs, explicit slash redirects, and 404.html.`

Post-build inspection confirmed every P2 route has:

- title length <= 60
- meta description length <= 160
- self canonical on `https://palcalculator.com/.../`
- `robots` = `index,follow`
- visible H1
- 7 visible FAQ entries
- FAQPage JSON-LD
- TechArticle JSON-LD
- data-source link
- no ad-slot/native-ad/data-palcalculator-ad-key markers

## Verification

Commands run:

- `npm run test` — PASS, 15/15 tests.
- `npm run lint` — PASS, 0 errors; existing React Fast Refresh / hook dependency warnings remain.
- `npm run build` — PASS; generated 18 route-specific HTML files and 18 sitemap URLs.
- Custom generated HTML inspection — PASS for all five P2 guide files.

## Notes and caveats

- The Anubis and Jetragon guides intentionally do not hardcode exact parent pairs or routes. They preserve copy artifact caveats and direct users to verify current results in the calculators.
- Passive-skill copy stays role-based and avoids a universal ranking claim.
- IV copy uses estimates/ranges/caveats and avoids perfect-certainty language.
- Route examples are workflow patterns, not unverified exact Pal paths.
- Deployment was intentionally not performed; QA/ops will handle deployment per task instructions.
