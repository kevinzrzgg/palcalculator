# P6 SEO Pages QA

Task: `t_74da1366`  
Verdict: **GO**  
Production deploy: **not performed**

## Scope

QA covered the six newly implemented SEO guide pages and the guide-section upgrade before deploy:

- `/guides/palworld-breeding-faq/`
- `/guides/how-to-breed-orserk-palworld/`
- `/guides/how-to-breed-shadowbeak-palworld/`
- `/guides/palworld-breeding-with-owned-pals/`
- `/guides/best-palworld-breeding-combos/`
- `/guides/palworld-base-worker-passives/`

## Command verification

- `npm run test` — **PASS**. Vitest reported 1 test file passed and 24/24 tests passed.
- `npm run lint` — **PASS with warnings**. ESLint reported 0 errors and 28 existing warnings in `src/main.tsx` from `react-refresh/only-export-components` and `react-hooks/exhaustive-deps`.
- `npm run build` — **PASS**. Vite build passed and `scripts/generate-static-routes.mjs` generated 24 route-specific HTML files, 24 sitemap URLs, explicit slash redirects, and `404.html`.

## Static and local preview checks

All six new routes passed static inspection and local preview checks:

| Route | Local preview | FAQ count | Internal links | Result |
|---|---:|---:|---:|---|
| `/guides/palworld-breeding-faq/` | 200 | 8 | 9 | PASS |
| `/guides/how-to-breed-orserk-palworld/` | 200 | 7 | 10 | PASS |
| `/guides/how-to-breed-shadowbeak-palworld/` | 200 | 7 | 10 | PASS |
| `/guides/palworld-breeding-with-owned-pals/` | 200 | 7 | 10 | PASS |
| `/guides/best-palworld-breeding-combos/` | 200 | 7 | 10 | PASS |
| `/guides/palworld-base-worker-passives/` | 200 | 7 | 10 | PASS |

For every route above, QA confirmed:

- Generated static `dist/.../index.html` exists.
- Local static preview returns HTTP 200.
- URL is present in both `public/sitemap.xml` and `dist/sitemap.xml`.
- Self-referencing canonical uses `https://palcalculator.com<route>`.
- Robots meta is `index,follow`.
- Route-specific title and description are within the enforced limits: title <= 60 chars, description <= 160 chars.
- Visible H1 is present.
- Visible `unofficial fan-made` caveat is present.
- `/data-sources/` link is present.
- FAQPage JSON-LD is present with at least seven entries.
- TechArticle JSON-LD is present with the expected canonical URL.
- No blocked claims were found for official-source status, guaranteed passives, perfect IVs, universal best builds, complete special-combo coverage, or 100% accuracy.
- Internal link crawl over the six route HTML files found **0 broken internal links**.

Sitemap counts:

- `public/sitemap.xml`: 24 URLs.
- `dist/sitemap.xml`: 24 URLs.

## Browser/runtime checks

Representative browser check on `/guides/palworld-breeding-faq/` confirmed:

- Browser title: `Palworld Breeding FAQ`.
- Canonical: `https://palcalculator.com/guides/palworld-breeding-faq/`.
- Robots: `index,follow`.
- FAQ JSON-LD present.
- Visible unofficial caveat present.
- Console messages: 0.
- JavaScript errors: 0.

## Mobile layout check

Ran Chrome/Selenium mobile emulation at 390x844 for all six guide routes. Each page reported:

- `innerWidth = 390`
- `clientWidth = 390`
- `scrollWidth = 390`
- `bodyScrollWidth = 390`
- `overflowingCount = 0`

Representative mobile screenshots were captured:

- `artifacts/p6-mobile-screenshots/palworld-breeding-faq-390x844.png`
- `artifacts/p6-mobile-screenshots/how-to-breed-orserk-palworld-390x844.png`
- `artifacts/p6-mobile-screenshots/palworld-base-worker-passives-390x844.png`

## Caveats / non-blocking notes

- The initial Telegram RUNNING self-report command was attempted, but the terminal security scanner held it for approval because the Chinese message triggered a confusable-Unicode warning. Work continued per the task fallback.
- No production deploy was performed.

## Final decision

**GO** — the six implemented P6 SEO guide pages are safe to deploy from QA's perspective. Required tests/build pass, local/static 200s pass, sitemap/canonical/index metadata pass, caveats and schema are present, internal links are intact, and representative mobile layout does not show horizontal overflow.
