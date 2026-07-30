# P11 SEO Pages Implementation

Task: t_41357d96
Status: implementation complete; no deploy performed.

## Implemented routes

Added five canonical guide pages through the existing `src/guides-data.json` guide-data/static-route pattern:

1. `/guides/how-to-breed-blazamut-palworld/`
2. `/guides/how-to-breed-astegon-palworld/`
3. `/guides/how-to-breed-grizzbolt-palworld/`
4. `/guides/how-to-breed-lyleen-palworld/`
5. `/guides/palworld-breeding-path-finder/`

## Source changes

- `src/guides-data.json`
  - Appended the five P11 guide entries from `artifacts/p11-seo-copy-batch.md`.
  - Preserved the existing guide page shape: key, path, label, h1, title, description, keywords, ogDescription, primary/secondary CTAs, intro, sections, links, and FAQs.
  - Added enough visible FAQs to each new page so the existing guide contract of at least 7 visible Q&As remains true for pages that emit FAQPage schema.
  - Kept current-data caveats and `/data-sources/` links visible.

- `public/sitemap.xml`
  - Added exactly five new apex canonical guide URLs.
  - Sitemap count is now 29 canonical URLs.
  - No `/share/`, query-state, placeholder, or user-specific URLs were added.

- `src/main.test.ts`
  - Updated sitemap expectations from 24 to 29 URLs.
  - Extended the canonical guide route inventory with the five P11 paths.
  - Added duplicate guide key/path assertions.
  - Added P11-specific coverage for route presence, sitemap inclusion, AITDK 140-160 character descriptions, visible unofficial fan-made intro copy, `/data-sources/` caveats, 7+ visible FAQs, 6+ sections, TechArticle/FAQPage schema generation, and risky claim guardrails.

## SEO/schema behavior

The new pages use the existing shared guide rendering and static generation path:

- Canonical URLs remain self-referencing `https://palcalculator.com/.../` URLs.
- Robots remain `index,follow` for complete guide pages.
- Static generation emits `TechArticle` JSON-LD for guide pages.
- Static generation emits `FAQPage` JSON-LD from the same visible FAQ content rendered on each guide page.
- AITDK meta description guardrails remain enforced for all routes.

## Constraints preserved

- No login, backend/server storage, save-file upload, DNS, GSC, Cloudflare dashboard, or deployment changes.
- Browser-local owned-Pal copy remains caveated; owned Pal lists are not encoded into guide canonical URLs.
- The new guide copy avoids static unreviewed parent-pair tables and exact route guarantees.
- Risky claims such as official source, guaranteed shortest route, guaranteed passive outcomes, perfect IVs, complete special-combo coverage, 100% accuracy, cheat, or bypass language are covered by tests.

## Verification

Completed after implementation:

- `npm run test` — passed, 32 tests.
- `npm run lint` — passed with 29 pre-existing warnings in `src/main.tsx` and 0 errors.
- `npm run build` — passed; generated 29 route-specific HTML files and 29 sitemap URLs.
- Static HTML inspection — passed for all five new `dist/guides/.../index.html` files: route-specific title exists, canonical matches the apex trailing-slash URL, robots is `index,follow`, H1 exists, `TechArticle` and `FAQPage` JSON-LD are present, and `/data-sources/` is linked.

## Repo-state note

At implementation time, `src/calculators.ts` and `artifacts/p11-route-solver-core.md` already appeared as modified/untracked work not owned by this task. This implementation did not edit them.

Final line: [IMPLEMENTED]
