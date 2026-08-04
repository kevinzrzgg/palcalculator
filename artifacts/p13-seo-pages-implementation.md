# P13 SEO pages implementation — PalCalculator

Task: t_4b80ec0b
Status: implemented locally; no deploy performed.

## What changed

- Added five new guide pages to `src/guides-data.json`:
  - `/guides/how-to-breed-faleris-palworld/`
  - `/guides/how-to-breed-kitsun-palworld/`
  - `/guides/how-to-breed-suzaku-palworld/`
  - `/guides/how-to-breed-helzephyr-palworld/`
  - `/guides/how-to-breed-selyne-palworld/`
- Added the five canonical URLs to `public/sitemap.xml`, increasing the source sitemap from 29 to 34 URLs.
- Updated `src/main.test.ts` expectations for the 34 URL sitemap, duplicate route/key coverage, metadata length checks, and P13-specific risky-term guardrails.

## SEO and safety notes

- Static generation remains data-driven from `src/guides-data.json` via `scripts/generate-static-routes.mjs`.
- New pages preserve self canonical URLs, `index,follow` robots metadata, `TechArticle` and visible `FAQPage` schema, visible `/data-sources/` links, and calculator CTAs.
- Copy keeps exact parent-pair tables out of static content and routes users to calculators for current-data verification.
- No query-state URLs, `/share/` URLs, placeholder pages, login/backend/storage claims, DNS, Cloudflare, GSC, or deploy work was added.
- Risky term guardrails cover: official, guaranteed, 100% accurate, exact odds, cheat, bypass, and complete wiki.

## Verification run

- `npm run test` — PASS: 34 tests passed.
- `npm run lint` — PASS: 0 errors, 37 existing warnings in `src/main.tsx` from React fast-refresh / hook dependency patterns.
- `npm run build` — PASS: TypeScript build, Vite production build, and static route generation completed.
- Build output: `Generated 34 route-specific HTML files, 34 sitemap URLs, explicit slash redirects, and 404.html.`
- Generated HTML spot-check for each new route confirmed: title, 140–160 character meta description, self canonical, `index,follow`, H1, `TechArticle`, `FAQPage`, `/data-sources/` link, no `/share/`, and no query in canonical.

## Files changed

- `src/guides-data.json`
- `public/sitemap.xml`
- `src/main.test.ts`
- `artifacts/p13-seo-pages-implementation.md`

Final line: [DONE]
