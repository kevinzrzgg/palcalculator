# P14 AdSense Recovery Implementation

Task: `t_c08606b6`
Status: implemented, no deploy
Date: 2026-08-04

## Summary

Implemented P14 content and trust enhancements for PalCalculator. The frontend now has four new indexable trust routes, deeper crawlable content modules for the homepage and six core calculator pages, updated trust/footer navigation, and sitemap/test coverage for the new 38 URL inventory.

## Changed files

- `src/p14-content.json`
  - New structured copy source for P14 trust pages and page-depth modules.
  - Includes `/about/`, `/contact/`, `/editorial-policy/`, `/advertising-disclosure/` content, metadata, FAQs, related links, and last-reviewed dates.
  - Includes crawlable depth modules for `/`, `/breeding-calculator/`, `/breeding-route-calculator/`, `/iv-calculator/`, `/stats-calculator/`, `/passive-skill-calculator/`, and `/palworld-1-0-breeding-calculator/`.
- `src/main.tsx`
  - Imports P14 content and registers trust routes in SPA route metadata.
  - Adds trust page rendering with `WebPage` and visible FAQ JSON-LD.
  - Adds reusable page-depth rendering for core calculator pages.
  - Expands `/data-sources/`, `/privacy/`, and `/terms/` with stronger trust/content modules.
  - Adds About/Contact to header nav and a footer `Trust & data` group.
  - Preserves query-state canonical/noindex behavior for calculator share URLs.
- `scripts/generate-static-routes.mjs`
  - Reads `src/p14-content.json` so static route generation includes trust pages and crawlable content modules.
  - Emits 38 route-specific HTML files and 38 sitemap URLs.
  - Keeps `FAQPage` schema for visible trust-page Q&A and `WebPage` schema for trust pages.
- `public/sitemap.xml`
  - Adds four indexable trust URLs: `/about/`, `/contact/`, `/editorial-policy/`, `/advertising-disclosure/`.
  - Sitemap URL count is now 38.
- `src/main.test.ts`
  - Updates sitemap count assertions from 34 to 38 where appropriate.
  - Adds P14 coverage for trust routes, metadata lengths, content source, internal links, and sitemap guardrails.

## Route and indexing decisions

All four new trust pages are included as `index,follow` routes and in sitemap because the task explicitly requested these pages with self-canonical/index-follow behavior.

Contact note: the copy handoff contained `[OWNER_APPROVED_CONTACT_METHOD]` as a blocker. No dedicated external contact method was present in repo context, so the implementation removed the placeholder and uses the existing public correction workflow anchored at `/data-sources/#corrections` plus `/contact/` instructions. If the owner later approves a dedicated email alias, form, issue tracker, or social contact profile, update `/contact/`, `/data-sources/`, and related trust copy before the next AdSense review request.

## Verification

Commands run:

- `npm run test` — passed, 35 tests.
- `npm run lint` — passed with existing warnings only; no lint errors.
- `npm run build` — passed. Build output reported: `Generated 38 route-specific HTML files, 38 sitemap URLs, explicit slash redirects, and 404.html.`

Additional local checks:

- `public/sitemap.xml` contains 38 `<loc>` entries.
- The four trust paths are present in sitemap.
- No query URLs, `/share/`, or `/results/` URLs are present in sitemap.

## Not changed

- No deploy.
- No ad-density changes, ad slots, sticky/interstitial ads, paywall, login, backend storage, Stripe, DNS, GSC, or Cloudflare dashboard changes.
- Existing P11 route solver behavior, P12 chunk split/performance posture, P13 guide pages, localStorage-only owned-Pal helper, and privacy-safe share URLs were preserved.
