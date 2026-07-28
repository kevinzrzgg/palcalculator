# P6 SEO Pages Implementation

Task: `t_b4b56e3d`  
Scope: implement six P5 SEO guide pages, add them to routing/sitemap/static generation, apply the safe breeding-combos guide section upgrade, and verify locally.  
Production deploy: not performed.

## Implemented routes

The following new guide routes are now present in `src/guides-data.json`, `public/sitemap.xml`, generated static route output, guide cards, footer guide links, and route metadata derived from guide data:

- `/guides/palworld-breeding-faq/`
- `/guides/how-to-breed-orserk-palworld/`
- `/guides/how-to-breed-shadowbeak-palworld/`
- `/guides/palworld-breeding-with-owned-pals/`
- `/guides/best-palworld-breeding-combos/`
- `/guides/palworld-base-worker-passives/`

## Existing page upgrade

Updated `/guides/palworld-breeding-combos/` with the section:

- `Current data limits before you follow a combo`

The section keeps the safe caveat that normal-formula workflows are supported where the selected dataset has data, while verified special-combo override table support is pending. It links the existing combo guide toward data-source review and the new best-combos framework page.

## SEO and content guardrails preserved

- All new guide pages keep visible `unofficial fan-made` caveats in initial static content.
- Every new guide page links to `/data-sources/`.
- Metadata stays within test-enforced limits: title <= 60 chars, meta description <= 160 chars.
- FAQPage JSON-LD is generated only from visible FAQ content already rendered on the same route.
- No exact Orserk/Shadowbeak parent pairs, exact routes, passive odds, guaranteed outcomes, official-source claims, complete special-combo coverage claims, or universal best-build claims were added.
- Owned-Pal privacy copy remains browser-local and does not imply account/server-side Palbox syncing.

## Code/test changes

Changed files:

- `src/guides-data.json`
  - Added the six new P5 guide entries.
  - Added the breeding-combos data-limit section upgrade.
  - Added crawlable internal links among relevant calculator and guide routes.
- `src/main.tsx`
  - Made guide route key handling data-driven so future guide keys from JSON can render without updating a hardcoded union.
  - Added a fallback guide CTA panel for new guide pages that do not have custom helper copy in `guideCtas`.
- `src/main.test.ts`
  - Updated sitemap/guide route expectations from 18 to 24 URLs.
  - Added P5 route, sitemap, metadata, FAQ, caveat, and combo-section tests.
- `public/sitemap.xml`
  - Added six new indexable guide URLs.
- `artifacts/p6-seo-pages-implementation.md`
  - This implementation report.

## Verification

Commands run:

- `npm run test` — PASS, 24 tests.
- `npm run lint` — PASS, 0 errors, 28 existing warnings from the project lint configuration.
- `npm run build` — PASS. Build generated 24 route-specific HTML files, 24 sitemap URLs, explicit slash redirects, and `404.html`.

Additional static inspection after build confirmed each new route's generated `dist/.../index.html` includes:

- route-specific `<title>`
- self-referencing canonical URL on `https://palcalculator.com`
- `index,follow` robots meta
- visible `<h1>`
- FAQPage JSON-LD
- `/data-sources/` internal link
- visible `unofficial fan-made` caveat

## Notes

- No production deploy was performed, per task requirement.
- The initial Telegram RUNNING self-report command was attempted but was held for terminal security approval because the Chinese message triggered a confusable-Unicode scan. Work continued as instructed by the task body fallback.
