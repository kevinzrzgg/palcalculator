# P8 Product Scope — Share URLs and Crawlable Internal Links

Project: PalCalculator
Artifact path: `/root/projects/palcalculator/artifacts/p8-product-share-links-scope.md`
Owner role: product_bot
Date: 2026-07-28
Status: DONE for product scope; no source-code implementation or deploy in this task.

## 1. Decision

P8 should ship two tightly scoped UX/SEO fixes:

1. Result sharing uses query-string state on the existing calculator routes only. Do not create `/share/*`, `/results/*`, or other new result pages in P8.
2. Primary site navigation and discovery CTAs render as real crawlable anchors with stable `href` values, while preserving the current SPA click enhancement.

Product principle: make useful calculator states shareable without turning private or user-entered planning state into indexable URLs.

## 2. Evidence inspected

Current repo/artifacts reviewed:

- `artifacts/post-launch-iteration-backlog.md`
  - UX-1 requires Copy/Share controls for breeding, route, IV/stats, and passive pages.
  - UX-1 requires URL state to use stable Pal slugs/settings and avoid uploaded save files, raw private data, secrets, and full analytics payloads.
  - UX-1 leaves owned-Pal URL sharing as an owner/product decision.
  - UX-3 requires header, brand, homepage cards, hero CTAs, footer links, and related-tool CTAs to render as crawlable links.
- `artifacts/route-contract.md`
  - Query-string app state should canonicalize to the base tool page.
  - `/share/*` and opaque result URLs default to `noindex, follow`.
  - Sitemap includes only indexable canonical routes.
- `artifacts/prd.md`
  - Shareable result URLs are part of the core value proposition and P0 route/route-result tasks.
  - MVP should remain no-login, no server-side save upload, mobile-first, and caveat-forward.
- `artifacts/p5-product-scope.md`
  - Browser-local owned Pal helper is localStorage-only.
  - Analytics payloads must not include raw owned-Pal lists, exact private route state, share URLs, emails, IPs, tokens, cookies, or save data.
- `src/main.tsx`
  - `shareUrl(tool, payload)` already creates query-string URLs on the base route using `window.location.origin`.
  - Current share payloads are: breeding `{ mode, a, b, target }`, route `{ target, owned, maxGen }`, IV/stats `{ pal, level, hp, attack, defense }`, passives `{ target, desired }`.
  - Current `ShareControls` fires `share_copy` and `share_open` without sending the full share URL.
  - Header brand/nav, guide cards, guide CTAs, footer links are already anchors with `href` plus SPA interception.
  - Hero CTAs and homepage tool cards still include button-driven navigation that should become crawlable anchors where the action changes route.

## 3. Share URL scope

### 3.1 URL shape

Use existing calculator routes with query strings:

- `/breeding-calculator/?mode=pair&parentA=penking&parentB=bushi`
- `/breeding-calculator/?mode=target&target=anubis`
- `/palworld-1-0-breeding-calculator/?mode=target&target=anubis`
- `/breeding-route-calculator/?target=anubis&maxGen=3`
- `/iv-calculator/?pal=anubis&level=50&hp=500&attack=130&defense=100`
- `/stats-calculator/?pal=anubis&level=50`
- `/passive-skill-calculator/?target=anubis&passives=artisan,serious`

Do not create or link:

- `/share/{id}/`
- `/results/{id}/`
- opaque hash-result pages
- persisted server-side result records

If future P9+ requires short links, it needs a separate privacy/security review and should still default to `noindex, follow`.

### 3.2 Encoding rules

Use stable internal IDs/slugs where available. Display names may be accepted on read for compatibility, but generated URLs should prefer normalized slugs/IDs.

Allowed state in generated P8 share URLs:

| Tool | Allowed by default | Not allowed by default |
|---|---|---|
| Breeding | mode, parent A slug, parent B slug, target child slug, data version if needed for cache/debug display | raw free-text notes, analytics payload, localStorage contents |
| Route | target Pal slug, max generations, non-private constraints if present later | browser-local owned-Pal list, pasted owned-Pal text, save-file content, Palbox import content |
| IV | Pal slug, level, observed HP/Attack/Defense numbers, supported modifier flags when implemented | screenshots, notes, unbounded raw text, identifiers |
| Stats | Pal slug, level, supported modifier flags/IV values when implemented | raw comments, unsupported private metadata |
| Passives | target Pal slug, desired passive slugs from supported passive dataset | unknown free-text passive notes, raw private planning notes |

Data-version handling:

- P8 may omit `dataVersion` from URLs and display the current build's data badge/caveats.
- If included, use a short known build ID only; do not include a full source list or debug payload.
- Opened old URLs should validate values against the current dataset and show caveats/validation errors rather than fabricating missing data.

### 3.3 Route and owned-Pal privacy boundary

Default decision for P8: do not encode owned-Pal lists or user-entered route `owned` text in generated share URLs.

Reasoning:

- Owned-Pal state is user-provided gameplay state and may reveal a user's save/progression preferences.
- P5 made the owned-Pal helper browser-local by design.
- The backlog explicitly requires owned-Pal sharing to be either explicit with warning or omitted by default.

P8 acceptance behavior:

1. Route share URL copies target + non-private settings only, e.g. `target=anubis&maxGen=3`.
2. Copy feedback or helper copy says the owned list is not included by default: "Your browser-local owned Pal list is not included in this share URL."
3. Opening a route share URL should prefill the target/max generations and leave owned-Pal text/list under the opener's control.
4. If implementation chooses to support owned-list sharing in P8 anyway, it must be behind an explicit opt-in control before copy, with a warning such as: "This URL will include your entered owned-Pal list. Do not share it if you consider that private." The default must remain off.
5. Any opt-in owned-list URL must contain only validated Pal slugs/IDs, not raw pasted text, save data, comments, or unknown tokens.
6. Analytics for share copy/open must never include the owned list, full URL, exact route text, exact passive free text, IP, email, token, cookie, or save content.

## 4. Copy/share UX acceptance criteria

A P8 implementation is accepted only if all of the following pass:

1. Breeding, route, IV, stats, and passive calculators show Copy/Share controls only when there is a current result or recoverable result state worth sharing.
2. Copy success/failure feedback is visible on desktop and 390px mobile.
3. Clipboard failure falls back to displaying a selectable URL.
4. Open-share link uses a real `href` to the generated URL.
5. Opening a generated URL pre-populates the supported fields for that route.
6. Invalid or obsolete query values show validation/caveat states; they are not silently guessed.
7. Event names remain `share_copy` and `share_open` for P8; if downstream wants legacy aliases, alias `copy_result` -> `share_copy` and `share_result` -> `share_open` without duplicating analytics payloads.
8. Event payloads include only route/tool/result type, status/source, device, referrer host, and data-version fields already considered privacy-safe.
9. Privacy copy continues to warn that share URLs may include selected Pals/settings and should not be shared if considered private.

## 5. Canonical, noindex, and sitemap policy

P8 policy:

1. Base route remains canonical for every query-state URL.
   - `/breeding-calculator/?mode=target&target=anubis` canonicalizes to `https://palcalculator.com/breeding-calculator/`.
   - `/breeding-route-calculator/?target=anubis&maxGen=3` canonicalizes to `https://palcalculator.com/breeding-route-calculator/`.
2. Query-state URLs should not be added to `public/sitemap.xml`.
3. No new `/share/*` or `/results/*` pages are introduced.
4. If a user or crawler reaches `/share/*` or `/results/*`, the existing 404/noindex behavior remains acceptable unless a future task creates those routes explicitly.
5. Runtime head management should set `meta[name="robots"]` to `noindex,follow` when meaningful share/query state is present on a calculator route. The static base HTML for canonical routes can remain `index,follow` according to the current route-indexing decision.
6. Open Graph URL for query-state pages should remain the canonical base route unless a later owner-approved sharing card design is scoped.
7. Sitemap/build verification must continue to show only canonical base tool/legal/guide routes, not query URLs.

Rationale: share URLs are for users, not a new long-tail SEO surface. Indexable programmatic Pal-specific pages remain P1/P9+ and require unique page value.

## 6. Crawlable internal-link scope

### 6.1 Links that must be real anchors

The following controls should render as `<a href="/.../">` or an equivalent crawlable anchor with a stable route href:

1. Header brand/home link.
2. Header primary nav links.
3. Homepage hero CTAs that navigate to another route.
4. Homepage tool cards.
5. Homepage beginner-path route CTAs.
6. Footer Data Sources, Privacy, Terms, guide, and sitemap links.
7. Guide cards.
8. Guide primary/secondary CTAs.
9. Related-tool CTAs on calculator and guide pages.
10. Share "open URL" action.

SPA navigation may intercept clicks with `preventDefault()` and `history.pushState`, but the href must remain correct for crawlers, keyboard users, context menus, and no-JavaScript fallbacks.

### 6.2 Controls that may remain buttons

Buttons are acceptable when the action is not route navigation:

- Mode switches inside a calculator.
- Example-fill controls that update current form state.
- In-page jump/focus controls, unless they can naturally be `href="#section"` anchors.
- Add/remove/clear owned-Pal local list controls.
- Copy-to-clipboard controls.
- Form validation or calculation actions if added later.

### 6.3 Current implementation gap to close

From `src/main.tsx`:

- Already anchor-like: header brand/nav, guide cards, guide CTAs, footer links, share open link.
- Needs product acceptance coverage in P8 implementation:
  - `ToolHero` route-changing CTAs currently use buttons for hero navigation.
  - `Hub` tool cards currently render as buttons.
  - Beginner helper CTAs that navigate to another route should become anchors where feasible; example-fill buttons can stay buttons.

## 7. P8 acceptance checklist for implementers

### Share URLs

- [ ] Generated share URLs use current route + query string, not new share/result pages.
- [ ] Generated values use stable Pal/passive slugs/IDs where possible.
- [ ] Breeding pair mode encodes mode + parentA + parentB.
- [ ] Breeding target mode encodes mode + target.
- [ ] Palworld 1.0 breeding uses the same encoding on `/palworld-1-0-breeding-calculator/`.
- [ ] Route sharing encodes target + max generations by default.
- [ ] Route sharing does not encode browser-local owned-Pal list or raw user-entered owned text by default.
- [ ] If owned-list sharing exists, it is explicit opt-in with a privacy warning before copy and encodes only validated Pal slugs/IDs.
- [ ] IV sharing encodes Pal + level + observed numeric stats and supported modifiers only.
- [ ] Stats sharing encodes Pal + level + supported modifiers/IV values only.
- [ ] Passive sharing encodes target + supported passive slugs only.
- [ ] Opening URLs hydrates supported fields and validates unsupported/obsolete values visibly.
- [ ] Copy success/fallback feedback works on desktop and 390px mobile.
- [ ] Share analytics does not include raw input strings, owned lists, full share URLs, or identifiers.

### SEO/canonical

- [ ] Query-state URLs keep canonical URL on the base route.
- [ ] Query-state URLs are runtime `noindex,follow`.
- [ ] Base route static pages keep the owner-approved index policy.
- [ ] Sitemap has no query URLs and no `/share/*` or `/results/*` URLs.
- [ ] `/share/*` and `/results/*` are not introduced; if probed, they remain non-indexable 404s.

### Crawlable links

- [ ] Header brand and primary nav are real anchors.
- [ ] Hero route CTAs are real anchors when they navigate routes.
- [ ] Homepage tool cards are real anchors.
- [ ] Footer legal/trust/guide links are real anchors.
- [ ] Guide cards and guide CTAs are real anchors.
- [ ] Calculator related-tool CTAs are real anchors.
- [ ] SPA click handling preserves href, keyboard accessibility, focus behavior, and `cmd/ctrl-click` where practical.
- [ ] Static route generation, sitemap checks, `npm run test`, `npm run lint`, and `npm run build` pass after implementation.

## 8. Non-goals

P8 does not include:

- Backend storage for result state.
- Short-link service.
- Accounts, save-file upload, Palbox import, or cloud sync.
- New `/share/*`, `/results/*`, or programmatic Pal-specific pages.
- Production deploy.
- GSC/Bing submission or a calculator-route indexing policy change beyond query-state noindex/canonical behavior.
- A redesign of calculator logic or data quality.

## 9. Handoff recommendation

Next implementer should update `src/main.tsx` and tests only after reviewing this scope. The likely implementation tasks are:

1. Add query parsing/hydration for supported calculator fields.
2. Generate share URLs with normalized slugs and the P8 privacy boundary.
3. Switch route-navigation buttons/cards to anchors where scoped.
4. Add tests for share payload privacy, URL hydration, canonical/noindex behavior, and crawlable hrefs.
5. Run `npm run test`, `npm run lint`, and `npm run build`.
