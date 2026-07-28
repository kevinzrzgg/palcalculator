# P8 SEO Handoff — Crawlable Internal Links and Share URL Guardrails

Project: PalCalculator
Artifact path: `/root/projects/palcalculator/artifacts/p8-seo-crawlable-links.md`
Owner role: seo_bot
Date: 2026-07-28
Status: DONE for SEO handoff; no source-code implementation or deploy in this task.

## 1. SEO decision

P8 should make route-changing discovery UI crawlable by rendering stable `<a href="/.../">` links for internal route navigation, while keeping form/state actions as buttons.

Share URLs should remain user-to-user utility URLs on existing calculator routes with query strings. They should not create indexable query-state inventory, `/share/*` pages, `/results/*` pages, or sitemap entries.

## 2. Evidence inspected

- Product scope: `artifacts/p8-product-share-links-scope.md`
  - Requires existing route + query-string share URLs only.
  - Requires crawlable anchors for header, hero CTAs, homepage cards, footer, guide cards, guide CTAs, related-tool CTAs, and share-open actions.
  - Requires query-state URLs to canonicalize to base routes and stay out of sitemap.
- SPA source: `src/main.tsx`
  - `shareUrl()` builds query-string URLs on existing `routes` (`src/main.tsx:76-81`).
  - Base canonical and OG URLs are set to `${canonicalOrigin}${route.path}` (`src/main.tsx:105-115`).
  - Current runtime robots meta is always `index,follow` (`src/main.tsx:111`), so P8 implementation should add a query-state `noindex,follow` branch.
  - Header brand and primary nav are real anchors with stable `href` values (`src/main.tsx:139`).
  - `ToolHero` still uses route-changing buttons for several CTAs (`src/main.tsx:141`).
  - `Hub` homepage tool cards still render as route-changing buttons (`src/main.tsx:218`).
  - Guide cards and guide page CTAs are anchors (`src/main.tsx:216`, `src/main.tsx:220`).
  - Share "Open share URL" is already an anchor (`src/main.tsx:181`).
  - Footer legal/guide/sitemap links are anchors (`src/main.tsx:225`).
- Static route generator: `scripts/generate-static-routes.mjs`
  - Generates only configured canonical routes into route HTML and sitemap (`scripts/generate-static-routes.mjs:68-76`).
  - Static non-guide page body currently exposes only Data Sources / Privacy / Terms anchors, not homepage tool-card anchors (`scripts/generate-static-routes.mjs:42-45`).
  - Static 404 carries `noindex,follow` (`scripts/generate-static-routes.mjs:81-83`).
- Sitemap/robots:
  - `public/sitemap.xml` contains 24 canonical routes and no query URLs, `/share/`, or `/results/` URLs.
  - `public/robots.txt` currently disallows `/share/` and declares the sitemap. `/results/` is not disallowed, but nonexistent `/results/*` should remain 404/noindex unless a future task creates it.
- Tests:
  - Existing tests assert `/share/` is absent from sitemap and static sitemap count remains 24 (`src/main.test.ts:328-339`, `src/main.test.ts:341-378`).
  - Existing tests assert share/copy hooks exist but do not yet enforce crawlable anchors or query-state noindex (`src/main.test.ts:150-164`).

## 3. Button-only/navigation gaps to fix

### Must become crawlable anchors

1. Homepage hero primary CTA
   - Current label: `Plan a breeding route`.
   - Current behavior: button calls `navigate('route')` from hub hero.
   - SEO target: `<a className="primary link-button" href="/breeding-route-calculator/">Plan a breeding route</a>` with SPA enhancement allowed.

2. Homepage hero secondary CTA
   - Current label: `Check parent pairs`.
   - Current behavior: button calls `navigate('breeding')` from hub hero.
   - SEO target: `<a className="secondary link-button" href="/breeding-calculator/">Check parent pairs</a>`.

3. Route page hero secondary CTA
   - Current label: `Need parent/child lookup?`.
   - Current behavior: button calls `navigate('breeding')`.
   - SEO target: anchor to `/breeding-calculator/`.

4. Breeding / Palworld 1.0 breeding page hero secondary CTA
   - Current label: `Plan multi-step route`.
   - Current behavior: button calls `navigate('route')`.
   - SEO target: anchor to `/breeding-route-calculator/`.

5. Other non-guide calculator page hero CTAs that navigate routes
   - Current fallback labels: `Plan a breeding route` and `Check parent pairs`.
   - Current behavior: buttons call `navigate('route')` / `navigate('breeding')`.
   - SEO target: anchors to `/breeding-route-calculator/` and `/breeding-calculator/`.

6. Homepage tool cards
   - Current behavior: `Hub` maps breeding, route, IV, stats, passives, and 1.0 routes into `<button className="card">` controls.
   - SEO target: six `<a className="card" href="...">` cards:
     - `/breeding-calculator/`
     - `/breeding-route-calculator/`
     - `/iv-calculator/`
     - `/stats-calculator/`
     - `/passive-skill-calculator/`
     - `/palworld-1-0-breeding-calculator/`

7. Beginner path step 3 result-guide CTA
   - Current label: `See result guide`.
   - Current behavior: button calls `navigate('guideRouteExamples')`.
   - SEO target: anchor to `/guides/palworld-breeding-route-examples/`.

8. Static prerender homepage/body links
   - Current generator body for non-guide routes only prints Data Sources / Privacy / Terms links.
   - SEO target: the homepage static prerender should include crawlable links to the six main tool routes and guide hub/guide routes, even before React hydrates. This gives no-JS crawlers and static HTML validators the same discovery path as the JS UI.

### May remain buttons

These are not route-navigation links and should stay buttons unless turned into same-page hash links:

- `Choose target Pal below` on the route page: same-page input focus.
- `Check parent pairs below` on breeding/1.0 pages: same-page input focus.
- `Help me choose a tool`: same-page scroll to the card section; optional `href="#tool-cards"` only if an id is added.
- Example-fill controls in `ExamplesRow` and beginner step 2: they mutate form/session state and are not indexable destination pages.
- Mode switches, local owned-Pal add/remove/clear/apply, copy-to-clipboard, validation/calculation actions.

## 4. Recommended implementation shape

Use a small internal route-link helper so all SPA-enhanced anchors share one behavior:

- It should render a real `<a href={route.path}>`.
- On unmodified left click for same-origin internal paths, it may call `preventDefault()`, `navigate(route.key)`, and track `internal_nav`.
- It should not hijack modifier-clicks, middle-clicks, downloads, external links, or target attributes. Cmd/Ctrl-click and context-menu copy should keep the real URL.
- It should keep current class styling by reusing `link-button` / `card` classes instead of creating new visual patterns.

Suggested helper behavior:

- `href` source of truth: `routes.find(r => r.key === key)?.path`.
- Do not hardcode route strings in many places when the route table already exists.
- Track safe analytics payload only: from page, to path, link context, not query strings or raw user state.

## 5. Exact anchor targets and recommended anchor text

| Current UI area | Anchor text | Target href | SEO reason |
|---|---|---|---|
| Header brand | PalCalculator | `/` | Already OK; homepage discovery. |
| Header nav | Breeding | `/breeding-calculator/` | Already OK; primary calculator route. |
| Header nav | Route | `/breeding-route-calculator/` | Already OK; primary calculator route. |
| Header nav | IV | `/iv-calculator/` | Already OK; primary calculator route. |
| Header nav | Stats | `/stats-calculator/` | Already OK; primary calculator route. |
| Header nav | Passives | `/passive-skill-calculator/` | Already OK; primary calculator route. |
| Header nav | Data Sources | `/data-sources/` | Already OK; trust/caveat route. |
| Hub hero | Plan a breeding route | `/breeding-route-calculator/` | Converts route-changing button to crawlable internal link. |
| Hub hero | Check parent pairs | `/breeding-calculator/` | Converts route-changing button to crawlable internal link. |
| Hub tool card | Palworld Breeding Calculator | `/breeding-calculator/` | Important tool route discovery from homepage. |
| Hub tool card | Palworld Breeding Route Calculator | `/breeding-route-calculator/` | Important tool route discovery from homepage. |
| Hub tool card | Palworld IV Calculator | `/iv-calculator/` | Important tool route discovery from homepage. |
| Hub tool card | Palworld Stats Calculator | `/stats-calculator/` | Important tool route discovery from homepage. |
| Hub tool card | Palworld Passive Skill Calculator | `/passive-skill-calculator/` | Important tool route discovery from homepage. |
| Hub tool card | Palworld 1.0 Breeding Calculator | `/palworld-1-0-breeding-calculator/` | Important alternate tool entry point. |
| Beginner step 3 | See result guide | `/guides/palworld-breeding-route-examples/` | Route-changing guide CTA should be crawlable. |
| Guide cards | Read guide | each `guide.path` | Already OK. |
| Guide primary/secondary CTAs | existing guide CTA labels | existing `page.primaryCta.href` / `page.secondaryCta.href` | Already OK. |
| Guide related links | existing guide link labels | existing `page.links[].href` | Already OK. |
| Footer | Data Sources / Privacy / Terms / guide labels / Sitemap | existing route paths | Already OK. |
| Share controls | Open share URL | generated current-route query URL | Already OK as a user utility link; must be noindex/canonicalized. |

## 6. Share/query-state indexing guardrails

P8 should preserve these SEO constraints:

1. Generated share URLs must use existing calculator routes with query strings only:
   - `/breeding-calculator/?mode=target&target=anubis`
   - `/breeding-route-calculator/?target=anubis&maxGen=3`
   - `/iv-calculator/?pal=anubis&level=50&hp=500&attack=130&defense=100`
   - `/stats-calculator/?pal=anubis&level=50`
   - `/passive-skill-calculator/?target=anubis&passives=artisan,serious`
   - `/palworld-1-0-breeding-calculator/?mode=target&target=anubis`
2. Do not add `/share/*`, `/results/*`, short-link pages, or opaque hash-result pages in P8.
3. Do not add query URLs to `public/sitemap.xml`, generated `dist/sitemap.xml`, static route generator route arrays, footer links, static prerender internal links, guide links, or any XML feed.
4. Query-state URLs should keep canonical URL on the base route:
   - Query URL: `/breeding-route-calculator/?target=anubis&maxGen=3`
   - Canonical: `https://palcalculator.com/breeding-route-calculator/`
5. Runtime head should set `meta[name="robots"]` to `noindex,follow` when meaningful share/query state exists on a calculator route. Base routes can remain `index,follow`.
6. `og:url` should remain the base canonical route unless a future task explicitly scopes per-result social cards.
7. Route share must not encode browser-local owned Pal list or raw owned text by default. If owner later approves opt-in owned-list sharing, encode only validated Pal IDs/slugs and warn before copy.
8. Analytics must not include raw input strings, owned lists, full share URLs, query strings, emails, IPs, cookies, tokens, or save data.
9. Unknown query values should hydrate into visible validation/caveat states, not guessed or silently rewritten into indexable content.

## 7. Sitemap / robots recommendations

Current sitemap status is acceptable: canonical base routes and guide routes only, with no `/share/`, `/results/`, or query-state URLs.

For P8 implementation, add test coverage rather than relying on manual review:

- Assert `public/sitemap.xml` and generated `dist/sitemap.xml` contain exactly canonical URLs and no `?`, `/share/`, or `/results/` in `<loc>` values.
- Assert `scripts/generate-static-routes.mjs` does not include `/share/`, `/results/`, or any route with `?`.
- Assert runtime query-state head logic sets `noindex,follow` while canonical stays on the base route.
- Optional but recommended: add `Disallow: /results/` to `public/robots.txt` if the team wants symmetric crawl-budget guardrails with `/share/`. Do not use robots.txt as the only index-control mechanism; nonexistent paths should remain 404/noindex and query-state URLs should use runtime noindex/canonical.

## 8. QA checklist for implementer

### Crawlable-link QA

- [ ] View page source or built `dist/index.html`: homepage static HTML includes anchors to all six main tool routes.
- [ ] Browser Elements panel: header nav, hero route CTAs, homepage tool cards, footer links, guide cards, guide CTAs, related-tool CTAs, and share-open controls render as `<a href="...">`.
- [ ] `document.querySelectorAll('button.card')` returns 0 for route-changing homepage tool cards.
- [ ] `document.querySelectorAll('a.card[href]')` includes the six tool-card routes.
- [ ] Cmd/Ctrl-click and middle-click on internal cards/CTAs open/copy real URLs instead of being swallowed by SPA navigation.
- [ ] Keyboard focus and visible focus styles still work for cards/CTAs.
- [ ] Same-page actions remain buttons or valid hash links and do not create fake crawl targets.

### Share/query-state QA

- [ ] Copy/share controls appear only when there is meaningful result state.
- [ ] Open-share action is a real `<a href="current-route?state=...">`.
- [ ] Generated share URL contains only supported slugs/settings for that tool.
- [ ] Route share URL omits browser-local owned list/raw owned text by default.
- [ ] Opening a valid query URL hydrates supported fields.
- [ ] Opening invalid/obsolete query values shows visible validation/caveats.
- [ ] Query URL canonical remains the base route.
- [ ] Query URL runtime robots meta becomes `noindex,follow`.
- [ ] Base route without query remains `index,follow`.
- [ ] Full share URL and raw user input are absent from analytics payloads.

### Build/test QA

- [ ] `npm run test`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] After build, grep generated sitemap `<loc>` values for query/share/results leaks.
- [ ] Spot-check built route HTML for crawlable homepage and guide anchors.

## 9. Suggested test additions

Add source/static contract tests around the current `static frontend contract` suite:

1. `ToolHero`/homepage route CTAs
   - Assert route-changing CTAs use anchors to `/breeding-route-calculator/` and `/breeding-calculator/`.
   - Assert only same-page focus CTAs keep `focusHeroInput` buttons.

2. Homepage tool cards
   - Assert source contains `<a className="card"` or the route-link helper output for the six tool cards.
   - Assert source no longer contains the current `<button className="card" key={r.key} onClick={() => navigate(r.key)}>` pattern.

3. Static prerender discovery
   - Assert `scripts/generate-static-routes.mjs` homepage body includes the six canonical tool links.
   - After build, assert `dist/index.html` has anchors for all six tool routes.

4. Query-state noindex/canonical
   - Unit-test helper logic if extracted, or jsdom-test `updateHead()` behavior with `window.location.search`.
   - Expected: base route = `index,follow`; query state = `noindex,follow`; canonical and `og:url` remain base route.

5. Sitemap leak prevention
   - Parse `<loc>` values from `public/sitemap.xml` and `dist/sitemap.xml`.
   - Fail if any loc includes `?`, `/share/`, or `/results/`.

## 10. Handoff to implementation agent

Implement only source/test changes needed to satisfy the above. Do not deploy in P8. The likely source files are:

- `src/main.tsx`: route-link helper, hero CTA anchors, hub card anchors, beginner guide CTA anchor, query-state robots logic.
- `scripts/generate-static-routes.mjs`: homepage/static body internal links, and optionally stronger generated sitemap guard tests.
- `src/main.test.ts`: crawlable-anchor and query-state/sitemap guard tests.
- `public/robots.txt`: optional `/results/` disallow if owner wants symmetric guardrail.

The SEO acceptance line is: important route discovery must be available as real href anchors, and user share/query URLs must be useful but non-indexable.