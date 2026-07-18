# PalCalculator SEO Content Expansion QA — Batch 1

Task: t_d121f5ce
Workspace: /root/projects/palcalculator
QA profile: qa_bot
Date: 2026-07-18

## Verdict

GO for the first three SEO content expansion pages.

No P0/P1 blockers found. The new guide pages build, render route-specific static HTML, are indexable, have correct self canonicals, are included in the sitemap, keep `/share/` excluded, and do not reintroduce ad markers.

## Scope reviewed

Upstream artifacts read:
- `artifacts/seo-content-expansion-brief.md`
- `artifacts/seo-content-expansion-copy.md`
- `artifacts/seo-content-expansion-implementation.md`

Implementation files inspected:
- `src/guides-data.json`
- `src/main.tsx`
- `src/main.test.ts`
- `scripts/generate-static-routes.mjs`
- `public/sitemap.xml`
- generated `dist/` route output

New routes verified:
- `/guides/palworld-breeding-combos/`
- `/guides/palworld-breeding-tree/`
- `/guides/palworld-1-0-breeding-guide/`

## Command verification

Executed:
- `npm run test && npm run lint && npm run build`

Results:
- `npm run test`: PASS — 1 test file, 11 tests passed.
- `npm run lint`: PASS — 0 errors, 25 existing warnings in `src/main.tsx` (`react-refresh/only-export-components` and `react-hooks/exhaustive-deps`).
- `npm run build`: PASS — Vite build succeeded and `scripts/generate-static-routes.mjs` generated 13 route-specific HTML files, 13 sitemap URLs, slash redirects, and `404.html`.

## Static SEO checks

Automated inspection of generated `dist` HTML found:

| Route | HTML exists | Title length | Meta description | Canonical | Robots | H1 count | Schema | Dead internal links |
|---|---:|---:|---:|---:|---:|---:|---|---:|
| `/guides/palworld-breeding-combos/` | yes | 30 | present, 121 chars | self HTTPS trailing slash | `index,follow` | 1 | `TechArticle`, `FAQPage` | 0 |
| `/guides/palworld-breeding-tree/` | yes | 28 | present, 119 chars | self HTTPS trailing slash | `index,follow` | 1 | `TechArticle`, `FAQPage` | 0 |
| `/guides/palworld-1-0-breeding-guide/` | yes | 27 | present, 114 chars | self HTTPS trailing slash | `index,follow` | 1 | `TechArticle`, `FAQPage` | 0 |

Additional static observations:
- FAQ text is visible in each generated guide page.
- Body copy is present in initial generated HTML before hydration.
- All guide pages include crawlable internal links to relevant calculator/data routes.
- JSON-LD parsed successfully for each guide page.

## Sitemap and route checks

`dist/sitemap.xml` contains 13 URLs:
1. `/`
2. `/breeding-calculator/`
3. `/breeding-route-calculator/`
4. `/iv-calculator/`
5. `/stats-calculator/`
6. `/passive-skill-calculator/`
7. `/palworld-1-0-breeding-calculator/`
8. `/data-sources/`
9. `/privacy/`
10. `/terms/`
11. `/guides/palworld-breeding-combos/`
12. `/guides/palworld-breeding-tree/`
13. `/guides/palworld-1-0-breeding-guide/`

`/share/` is excluded from sitemap.

Local preview HTTP status checks:
- Existing sitemap routes: 200.
- New guide routes: 200.
- `/share/test/`: 404.
- `/guides/not-a-page/`: 404.

## Internal link checks

Guide-page outgoing links were checked against the local preview server and all returned 200:
- `/breeding-calculator/`
- `/breeding-route-calculator/`
- `/palworld-1-0-breeding-calculator/`
- `/passive-skill-calculator/`
- `/iv-calculator/`
- `/stats-calculator/`
- `/data-sources/`

Hydrated homepage DOM was also checked in browser preview and contains visible links to all three new guide pages from the “Palworld breeding guides” section and footer.

## Ad marker regression check

Searched source and generated output for known removed ad/script/container markers, including:
- `effectivecpmnetwork`
- `highperformanceformat`
- `atOptions`
- `data-palcalculator-ad-key`
- `NativeAd`
- `HighPerformanceAd`
- `Advertisement`
- `ad-slot`
- `native-ad`
- `iframe-ad`
- `iframe-ad-grid`
- `iframe-ad-mount`

Result: no matches found.

## Findings

P0: none.

P1: none.

P2 / notes:
- Lint still reports 25 warnings in `src/main.tsx`; these are non-blocking and consistent with the implementation handoff noting “existing warnings only.”
- Non-guide generated static HTML is intentionally minimal; the guide links from relevant pages are present after React hydration and in the SPA/footer, while the guide pages themselves contain crawlable static outbound links.

## Final QA conclusion

GO. The first batch of SEO content pages meets the requested pre-deploy QA checks.
