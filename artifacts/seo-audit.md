# PalCalculator SEO Recheck

Project: palcalculator
Stage: 10-seo-recheck
Keyword focus: palcalculator, Palworld calculator, Palworld breeding calculator, Palworld 1.0 breeding calculator
Market: US / English
Audit date: 2026-07-16
Fact source directory: `/root/projects/palcalculator`
Frontend handoff: `/root/projects/palcalculator/artifacts/frontend-report.md`

## Verdict

SEO REPAIR LIST — not SEO GO yet.

The frontend artifact is present and locally buildable, and the route list, robots.txt, sitemap.xml, fan-site disclaimer, data caveats, and SoftwareApplication JSON-LD are implemented. However, the current Vite SPA + Cloudflare Pages catch-all fallback is not safe for SEO launch as-is: it creates soft-404 risk, ships one static title/meta/canonical for every route, and indexes calculator pages while production Palworld data is still pending.

## Validation evidence

Commands run in `/root/projects/palcalculator`:

```text
npm test
```

Result:

```text
Test Files  1 passed (1)
Tests       2 passed (2)
exit_code=0
```

```text
npm run build
```

Result:

```text
dist/index.html                   0.90 kB │ gzip:  0.49 kB
dist/assets/index-Fpdp7px_.css    5.90 kB │ gzip:  1.87 kB
dist/assets/index-B6sYoiBC.js   212.97 kB │ gzip: 67.25 kB │ map: 898.75 kB
✓ built in 755ms
exit_code=0
```

Static artifact checks:

- `dist/index.html` exists, 905 bytes.
- `dist/robots.txt` exists and allows public crawl, disallows `/share/`, and declares `https://palcalculator.com/sitemap.xml`.
- `dist/sitemap.xml` exists with 10 P0 canonical URLs.
- `dist/_redirects` contains only `/* /index.html 200`.
- Route table in `src/main.tsx` includes 10 P0 routes:
  - `/`
  - `/breeding-calculator/`
  - `/breeding-route-calculator/`
  - `/iv-calculator/`
  - `/stats-calculator/`
  - `/passive-skill-calculator/`
  - `/palworld-1-0-breeding-calculator/`
  - `/data-sources/`
  - `/privacy/`
  - `/terms/`

## Page matrix recheck

| Route | Sitemap | Static title/meta/canonical | Rendered H1/content | Indexability assessment |
|---|---:|---|---|---|
| `/` | yes | correct for homepage | React renders homepage | OK after domain confirmation |
| `/breeding-calculator/` | yes | uses homepage title/meta/canonical in initial HTML | React can render route-specific H1 after JS | P0 repair needed |
| `/breeding-route-calculator/` | yes | uses homepage title/meta/canonical in initial HTML | React can render route-specific H1 after JS | P0 repair needed |
| `/iv-calculator/` | yes | uses homepage title/meta/canonical in initial HTML | React can render route-specific H1 after JS | P0 repair needed |
| `/stats-calculator/` | yes | uses homepage title/meta/canonical in initial HTML | React can render route-specific H1 after JS | P0 repair needed |
| `/passive-skill-calculator/` | yes | uses homepage title/meta/canonical in initial HTML | React can render route-specific H1 after JS | P0 repair needed |
| `/palworld-1-0-breeding-calculator/` | yes | uses homepage title/meta/canonical in initial HTML | React can render route-specific H1 after JS | P0 repair needed |
| `/data-sources/` | yes | uses homepage title/meta/canonical in initial HTML | React can render trust page after JS | P1 repair needed |
| `/privacy/` | yes | uses homepage title/meta/canonical in initial HTML | React can render legal page after JS | P1 repair needed |
| `/terms/` | yes | uses homepage title/meta/canonical in initial HTML | React can render legal page after JS | P1 repair needed |

## What passes

1. Frontend artifact is present, and this task is not blocked by a missing frontend.
2. Build and tests pass locally.
3. P0 routes are represented in app routing and sitemap.
4. `robots.txt` includes `Disallow: /share/`, matching the noindex/share-route plan at a crawl-policy level.
5. Sitemap lists only the 10 intended canonical P0 routes; no `/share/`, no programmatic thin Pal pages.
6. UI copy makes Palworld and fan-made/unofficial status visible.
7. Data uncertainty is visible: the app uses `DATASET_VERSION_PENDING`, `FORMULA_VERSION_PENDING`, unavailable states, and explicit caveats instead of fabricated calculator output.
8. JSON-LD SoftwareApplication is present in React source and accurately describes a free web app at a global level.

## P0 issues to repair before SEO GO

### P0-1: Cloudflare Pages catch-all fallback creates soft-404 and duplicate-indexing risk

Evidence:

```text
public/_redirects: /* /index.html 200
dist/_redirects:   /* /index.html 200
```

Impact:

- Unknown URLs such as `/nonexistent-seo-test-12345` will be served as homepage/app HTML with HTTP 200 on Cloudflare Pages.
- XML-looking nonexistent URLs such as `/sitemap_index.xml` can also fall back to app HTML instead of returning 404.
- This violates the Cloudflare/static-site P0 check: unknown paths must be real 404s.

Required repair:

- Replace the broad SEO-host fallback with explicit routing that preserves real 404s, or move to prerendered/static route files.
- Add a real `404.html` with `noindex, follow`.
- If SPA fallback is still required for app state, scope it narrowly and do not allow arbitrary unknown paths to return 200.

Acceptance check:

```text
/nonexistent-seo-test-12345 -> 404
/sitemap_index.xml -> 404 unless a real sitemap index exists
/favicon.ico -> 200 image/icon or real 404, not homepage HTML
```

### P0-2: Every route currently ships the homepage canonical in initial HTML

Evidence from `dist/index.html`:

```html
<link rel="canonical" href="https://palcalculator.com/"/>
```

Impact:

- All sitemap routes served through the same SPA document initially declare the homepage as canonical.
- Tool routes in the sitemap conflict with the canonical signal, so Google may consolidate them into `/` or ignore route-specific pages.

Required repair:

- Produce per-route HTML with route-specific canonical tags, or use an SSR/static-export framework for the P0 route set.
- Required examples:
  - `/breeding-calculator/` -> `https://palcalculator.com/breeding-calculator/`
  - `/breeding-route-calculator/` -> `https://palcalculator.com/breeding-route-calculator/`
  - `/iv-calculator/` -> `https://palcalculator.com/iv-calculator/`

### P0-3: Every route currently ships the homepage title/meta description in initial HTML

Evidence from `dist/index.html`:

```html
<title>PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators</title>
<meta name="description" content="Unofficial fan-made Palworld 1.0 calculator hub for breeding routes, IV/stat checks, passive planning, and owned-Pal optimization."/>
```

`src/main.tsx` changes `document.title` on client navigation, but direct-loaded route HTML still starts with homepage metadata.

Impact:

- Search snippets and canonical understanding are weak for tool-intent pages.
- Route contract requires each indexable tool page to include a title, meta description, canonical, OG title/description, and H1 matching the user task.

Required repair:

- Generate unique static HTML metadata per route before deploy.
- Use the title directions from `artifacts/route-contract.md` and detailed copy from `artifacts/copy.md`.

### P0-4: Indexable calculator pages are listed in sitemap while production data is pending

Evidence:

- UI and frontend report state production Palworld data is pending.
- Data files are explicit example-only seed data.
- Calculator result states return `DATASET_VERSION_PENDING`, `BREEDING_DATA_PENDING`, `FORMULA_VERSION_PENDING`, and similar unavailable states.

Impact:

- The pages are honest, but they may be thin/unsatisfying for high-intent searchers if indexed before real calculator output exists.
- PRD P0 launchable scope calls for actual breeding, route, IV/stat, and passive planning utility with data version/freshness, not only unavailable shells.

Required repair options:

1. Preferred: complete verified Palworld data import and ship working P0 calculator results before indexable launch.
2. Conservative fallback: keep only `/`, `/data-sources/`, `/privacy/`, and `/terms/` indexable until real calculator data exists; temporarily remove tool pages from sitemap and set route-specific `noindex,follow` for tool routes.

### P0-5: Canonical origin is still not owner-confirmed in upstream contract

Evidence:

- `artifacts/route-contract.md` says canonical origin is `{CANONICAL_ORIGIN}` until owner confirms domain.
- Frontend hardcodes `https://palcalculator.com/` in canonical, robots sitemap declaration, and sitemap locs.

Impact:

- If `palcalculator.com` is not the final owned production domain, all canonical/sitemap signals will be wrong.

Required repair:

- Owner/deploy agent must confirm final domain before production SEO GO.
- If the domain is confirmed, record the confirmation in deployment handoff.
- If not confirmed, parameterize canonical origin via build-time env and block production indexation until set.

## P1 issues

### P1-1: Internal navigation uses buttons/history state instead of crawlable anchors

Evidence:

- Header and route cards use `<button>` plus `window.history.pushState`.
- Static source contains only one internal anchor href: `/sitemap.xml`.

Impact:

- Google can discover URLs from sitemap, but crawlable semantic internal links are weak.
- Users without JS and non-Google crawlers do not get a normal link graph.

Repair:

- Convert primary nav, route cards, and footer internal links to real `<a href="/route/">` links, while preserving React enhancement if desired.

### P1-2: FAQ/AEO readiness is incomplete

Evidence:

- SoftwareApplication JSON-LD exists, but no visible FAQ sections or FAQPage schema are present for core tool pages.
- Copy freeze and SEO workflow call for FAQ content and AI-answer-ready Q&A blocks.

Repair:

- Add short visible FAQ sections for each core calculator route after the above-fold tool.
- Only add FAQPage JSON-LD for questions/answers visible on that route.
- Suggested topics:
  - What is a Palworld breeding calculator?
  - Can I find the shortest breeding route from owned Pals?
  - Why do results depend on data version?
  - Is PalCalculator official?

### P1-3: Data sources page needs real source/update details before trust launch

Evidence:

- Current data page says source/update workflow is pending.

Repair:

- After backend/data import, show actual data version, last update date, source categories, formula assumptions, unsupported domains, and correction workflow.

### P1-4: Analytics/measurement plan remains pending

Evidence:

- Frontend report notes analytics provider is pending; no analytics script is installed.

Repair:

- Before launch, decide GA4/Clarity or no analytics.
- If enabled, update Privacy with provider, event names, retention/cookie behavior, and avoid collecting private Palbox/save-file content.

## P2 improvements

1. Add WebSite schema with `potentialAction` only if search/action behavior is implemented accurately.
2. Add BreadcrumbList schema only if visible breadcrumbs or clear hierarchy is added.
3. Add Open Graph image once a non-infringing brand/social card is available.
4. Add `lastmod` to sitemap after a real deploy/update process exists.
5. Add a favicon or confirm `/favicon.ico` returns an icon/real 404 in production.

## Recommended implementation path

1. Decide whether this remains Vite SPA or migrates to static-prerendered routes.
   - Best SEO path: prerender the 10 P0 routes into separate HTML files with per-route metadata.
   - Acceptable simple alternative: generate route-specific static HTML shells for each P0 route and hydrate the same React app.
2. Remove or narrow `/* /index.html 200`; add `404.html`; verify unknown paths return 404 on Cloudflare Pages.
3. Generate per-route `<title>`, `<meta name="description">`, canonical, OG title/description, and route H1 in initial HTML.
4. Confirm final canonical origin before deploy.
5. Decide indexability for data-pending calculators:
   - If verified production data is imported: keep tool pages indexable.
   - If data is still pending: noindex or remove tool routes from sitemap until calculator value is real.
6. Replace button-only route navigation with crawlable anchors.
7. Add visible route-specific FAQ/AEO sections and matching schema where accurate.
8. Re-run local build/test and Cloudflare Pages HTTP probes:
   - `/` 200
   - all P0 routes 200
   - no-trailing-slash variants 301 to trailing slash if configured
   - `/nonexistent-seo-test-12345` 404
   - `/sitemap_index.xml` 404 unless real
   - `/sitemap.xml` 200 XML
   - `/robots.txt` 200 text/plain
   - `/favicon.ico` icon or real 404

## Acceptance gate result

Not SEO GO.

Repair list severity summary:

- P0: SPA catch-all soft-404 risk.
- P0: route-specific canonical tags missing in initial HTML.
- P0: route-specific title/meta/OG missing in initial HTML.
- P0: calculator tool routes are indexable while production data remains pending.
- P0: final canonical domain still needs owner confirmation.
- P1: internal links should use crawlable anchors.
- P1: FAQ/AEO content and FAQPage schema not yet implemented.
- P1: data source and analytics details still pending.

Recommended next agent: frontend_bot or deploy_bot to implement SEO technical repairs, then seo_bot recheck after route-specific static output and 404 behavior are fixed.
