# P5 Product Scope — PalCalculator no-owner improvements

Project: PalCalculator
Live site: https://palcalculator.com/
Artifact path: `/root/projects/palcalculator/artifacts/p5-product-scope.md`
Owner role: product_bot
Date: 2026-07-27
Status: DONE for product scope; no frontend/backend code changed by this task.

## 1. Decision

Recommended P5 scope: ship one immediately useful browser-local route-planning upgrade, backed by data/quality tests and a small next SEO content batch, then run QA and deploy only after QA GO.

The highest-confidence "we can do now" feature is:

> Add a browser-local owned Pal helper for the Route Calculator so players can maintain a small local owned-Pal list, add/remove Pals safely, and feed that list into route solving without accounts, uploads, owner dashboard access, or server storage.

Why this should lead P5:

- It improves the core calculator value, not just surrounding content.
- It matches current user intent already represented in the app: route solving from owned Pals to a target Pal.
- It is shippable in the static React/Vite app with `localStorage` only.
- It avoids owner-only dependencies: no GSC, analytics dashboard, Cloudflare dashboard, account system, database, payment, backend, DNS, or production deploy decision is needed for implementation.
- It strengthens an existing P4 beginner path: users can now move from "try an example" to "use my own Pals" without pasting the same list repeatedly.

## 2. Evidence inspected

Repository / source files:

- `src/main.tsx`
  - Routes currently include home, breeding, route, IV, stats, passive, 1.0 breeding, data, privacy, terms, and 8 guide pages.
  - `RouteSolver` currently stores `target`, `owned`, and `maxGen` in React state; owned Pals are entered as a text area only.
  - Safe first-party analytics queue exists via `window.palcalculatorEvents` and optional `window.palcalculatorTrack`.
  - Current event names include `page_view`, `tool_start`, `tool_success`, `tool_error`, `share_copy`, `share_open`, `beginner_section_view`, `beginner_example_click`, `result_explainer_view`, and `internal_nav`.
  - `sessionStorage` is already used only for a safe beginner example id; no account/backend storage exists.
- `src/calculators.ts`
  - Current calculator engine is client-side and static-data driven.
  - `solveRoute(targetInput, ownedInput, maxGenerations)` accepts a comma/newline string and normalizes known Pal names/aliases.
  - Route results expose target, owned Pals, target-owned shortcut, generation count, route steps, missing Pals, alternatives, constraints, tie-break rule, data version, and caveats.
  - MVP still uses normal CombiRank formula and explicitly caveats missing special-combo override coverage.
- `src/guides-data.json`
  - Current content set contains 8 guide pages: breeding combos, breeding tree, 1.0 breeding guide, IV explained, passive skills, Anubis, Jetragon, and route examples.
- `public/sitemap.xml`
  - Current sitemap has 18 URLs: 10 tool/legal/data routes plus 8 guide routes.
- Data snapshot from source JSON:
  - 297 Pals.
  - 3 passive skills in current passive seed data.
  - Data version `palworld-1-0_public-web_2026-07-16_r1`.
  - Game label `Palworld 1.0 public-web data build`.
  - Last updated `2026-07-16`.

Artifacts/backlog reviewed:

- `artifacts/post-launch-iteration-backlog.md`
  - Previous top priorities included analytics/search gates, share/copy result URLs, calculator indexability, first-use mobile path, and data/error review.
  - Several owner/dashboard-dependent items remain intentionally gated.
- `artifacts/p4-beginner-ux-product-spec.md`
  - P4 defined a beginner journey: choose goal, try example, read result.
  - It explicitly forbids raw-input analytics and overclaiming official/guaranteed/perfect outcomes.
- `artifacts/p4-beginner-ux-implementation.md`
  - P4 was implemented in `src/main.tsx`, `src/guides-data.json`, `src/styles.css`, and tests.
  - Test/lint/build passed at implementation time.
- `artifacts/p4-beginner-ux-qa.md` and `artifacts/p4-beginner-ux-live-verification.md`
  - P4 beginner UX passed QA and live verification on production.
  - Mobile overflow, examples, result explainers, sitemap/canonical/robots, and no-ad markers passed.
- `artifacts/p2-seo-content-brief.md`
  - Current P2 content batch already covered Anubis, Jetragon, passive skills, IV explained, and route examples.
  - Any P5 SEO batch must avoid duplicating those 8 existing guide URLs.
- `artifacts/analytics-setup-report.md`
  - Cloudflare Web Analytics covers page views on live HTML.
  - Custom calculator events are currently first-party queue/callback only unless a custom provider is later approved.
  - Event payload contract excludes raw owned-Pal lists, exact input strings, share URLs, emails, IPs, tokens, cookies, and save data.
- `artifacts/data-contract.md`
  - Static/client-first P0 remains the right baseline.
  - Do not persist owned-Pal lists or save-file contents server-side in MVP.
  - Share/result/user-state URLs default to noindex/canonical base route unless explicitly promoted later.

## 3. Scope ranking

### P5.1 — Browser-local owned Pal route UX upgrade

Decision: DO NOW / lead scope.

Goal:
Make `/breeding-route-calculator/` more useful for real users by turning the current free-text owned-Pal input into a local, editable owned-Pal helper that stays in the browser and can feed the route solver.

User problem:
A player may revisit route planning across several targets. Today they must paste or retype owned Pals into one text area. That works for demos, but it is friction for real planning.

MVP behavior:

- Route page keeps the existing text-area path for compatibility.
- Add a browser-local owned Pal helper/list near the route calculator.
- User can add a Pal by name from the existing Pal datalist / autocomplete pattern.
- User can remove individual owned Pals and clear the local list.
- User can apply the local list to the route solver text area, or the solver can read directly from that list if implementation stays simple and transparent.
- Store only stable Pal IDs/slugs or display names in `localStorage` under a PalCalculator-specific key.
- Show copy such as: "Stored only in this browser. Do not use this for private save files. Clearing browser data removes it."
- Keep the result caveat/result explainer visible.
- If `localStorage` is unavailable, gracefully fall back to current text-area behavior.

Analytics-safe events allowed:

- Allowed: `owned_list_add`, `owned_list_remove`, `owned_list_apply`, or a normalized `tool_start` with `start_source: "owned_list"`.
- Allowed properties: route/tool/data version/device/count bucket only, e.g. `owned_count_bucket: "1-5"`.
- Not allowed: raw Pal names, full owned list, localStorage contents, share URL, exact target/owned combo, save data, user identifier, IP, email, token, cookie.

Acceptance criteria:

1. Existing route calculator text input still works.
2. User can add a valid Pal to a browser-local owned list from the route page.
3. User can remove a Pal and clear the local list.
4. Owned list persists across reload in the same browser via `localStorage` only.
5. No backend, account, upload, database, cookie identity, or dashboard dependency is added.
6. UI clearly states browser-local storage and caveats.
7. Route solving can use the local list without requiring raw owned-Pal analytics.
8. Unknown/unsupported Pal names remain recoverable validation states, not guessed data.
9. Tests cover local-only storage behavior, route solver handoff, and privacy markers.
10. `npm run test`, `npm run lint`, and `npm run build` pass.

Non-goals:

- No Palbox/save-file import.
- No server sync.
- No account/profile system.
- No sharing of the full owned list by default.
- No new production deploy from the implementation card.
- No exact-route guarantee or official-data claims.

### P5.2 — Calculator invariant and data quality tests

Decision: DO NOW in parallel after research/data audit, but keep implementation limited.

Goal:
Increase confidence in current calculators and dataset without needing new external data or owner dashboards.

Focus areas:

- Breeding pair invariants: same inputs produce deterministic child, order-insensitive normal pair behavior, target reverse search returns bounded/sorted pairs.
- Alias invariants: ID/slug/display-name lookups map consistently for high-interest Pals.
- Route solver edge cases: target already owned, empty owned list, unknown target, partial owned list, max generation bounds as currently supported.
- Passive planner edge cases: supported passives recognized, unsupported tokens produce error/caveat state, no deterministic odds claimed.
- Stat/IV edge cases: unknown Pal, missing/partial stats, impossible-looking values remain caveated rather than overclaimed.
- Dataset coverage artifact: record current 297-Pal / 3-passive limitations and any unsafe gaps found.

Acceptance criteria:

1. New or improved tests exercise current calculator functions without requiring network or dashboards.
2. Any safe small data bug discovered can be fixed with an artifact note; larger source-verification needs become follow-up, not guessed data.
3. Artifact `artifacts/p5-data-quality.md` documents current checks and remaining data limitations.
4. `npm run test`, `npm run lint`, and `npm run build` pass.

Non-goals:

- No unverified new Palworld facts.
- No scraping/copying competitor tables as sole source of truth.
- No special-combo claims unless verified.

### P5.3 — Next SEO content batch brief/copy

Decision: DO NOW as planning/copy work; implementation should wait for brief/copy/QA sequencing.

Goal:
Prepare the next content expansion without duplicating the existing 18 URLs or the 8 existing guide topics.

Recommended page/theme constraints:

- Must support calculator intent, not generic wiki content.
- Must be useful even with current static/caveated dataset.
- Must visibly link to relevant tools and `/data-sources/`.
- Must not claim official status, guaranteed routes, perfect IVs, universal best passives, complete special combos, or always-current data.
- Must avoid adding thin programmatic `/breed/{pal}` pages until data templates/indexing policy are stronger.

Likely safe directions for seo_bot to validate:

1. Beginner route workflow page focused on owned-Pal planning and local/private input boundaries.
2. "Palworld breeding calculator vs breeding route calculator" decision page to reduce tool-choice confusion.
3. "Palworld breeding data version / why calculators disagree" trust page tied to `/data-sources/`.
4. Role-based passive-planning pages or sections only if not duplicative of the existing passive guide.
5. Stat/IV modifier checklist page only if it adds practical diagnostic value beyond IV explained.

Acceptance criteria for SEO brief:

- Artifact `artifacts/p5-seo-brief.md` lists 4-8 candidate URLs/sections with title, meta, intent, non-duplication rationale, internal links, and copy requirements.
- It explicitly excludes the existing sitemap URLs.
- It marks any topic that should remain noindex/draft until data support improves.

Acceptance criteria for copy:

- Artifact `artifacts/p5-seo-copy.md` drafts the chosen pages/sections or markdown-ready entries.
- Copy is English, calculator-led, caveated, and non-duplicative.
- No source implementation unless a later frontend implementation card asks.

### P5.4 — Analytics-safe event normalization only where touched

Decision: INCLUDE as guardrail, not standalone provider work.

Current state:
The source already has safe local event hooks and Cloudflare Web Analytics on live production. Custom dashboard/provider wiring still requires owner/provider approval and should not block P5 implementation.

P5 guardrail:
Any P5 frontend work may add or normalize events only if they remain first-party/privacy-safe and avoid raw inputs.

Acceptance criteria:

- Event names/properties are documented in the implementation artifact.
- Payloads use categories/count buckets, not raw Pal lists, exact stat fields, free-text passives, target+owned combos, full referrers, share URLs, identifiers, or secrets.
- If no provider is configured, events may remain in `window.palcalculatorEvents`; product decisions must not pretend a dashboard exists.

Non-goals:

- No GA4/GTM/Clarity/Zaraz/Workers Analytics Engine custom-event wiring without owner/provider approval.
- No dashboard-dependent acceptance criteria for P5 implementation.

## 4. Recommended task graph

Existing Kanban graph already matches the recommended decomposition. Do not create duplicate cards.

1. `t_f14cb71b` — product_bot — P5 product scope: choose next no-owner improvements
   - Output: this artifact.
   - Status target: DONE.

Parallel inputs / planning:

2. `t_cab35cb8` — research_bot — P5 research/data audit: PalCalculator useful gaps
   - Output: `artifacts/p5-research-data-audit.md`.
   - Purpose: identify high-value data/content/calculator gaps and safe checks before backend/data improvements.

3. `t_b5f62308` — seo_bot — P5 SEO brief: next PalCalculator content batch
   - Output: `artifacts/p5-seo-brief.md`.
   - Purpose: choose non-duplicative next content topics from current sitemap/guides.

Implementation / production-prep children:

4. `t_66e20bfc` — frontend_bot — P5 frontend: browser-local owned Pal route UX upgrade
   - Parent: `t_f14cb71b`.
   - Output: code change + `artifacts/p5-owned-pal-route-ux.md`.
   - Must verify: `npm run test`, `npm run lint`, `npm run build`.

5. `t_99bc01a3` — backend_bot — P5 backend/data: calculator invariant and dataset quality checks
   - Parent: `t_cab35cb8`.
   - Output: tests/small safe fixes if any + `artifacts/p5-data-quality.md`.
   - Must verify: `npm run test`, `npm run lint`, `npm run build`.

6. `t_a64b7018` — copy_bot — P5 copy: draft next SEO content pages
   - Parent: `t_b5f62308`.
   - Output: `artifacts/p5-seo-copy.md`.
   - No source edits unless later implementation card asks.

Fan-in QA and deploy:

7. `t_c35cb8e9` — qa_bot — P5 QA: verify no-owner improvements before deploy
   - Parents: `t_66e20bfc`, `t_99bc01a3`, `t_a64b7018`.
   - Output: `artifacts/p5-qa.md`, `artifacts/p5-qa-results.json`.
   - Complete GO only if code/copy/data changes are safe to deploy.

8. `t_9154190e` — ops_bot — P5 ops: deploy and live-verify P5 after QA GO
   - Parent: `t_c35cb8e9`.
   - Output: `artifacts/p5-live-verification.md`.
   - Deploy only after QA GO.

## 5. P5 acceptance checklist

Product-scope acceptance:

- [x] Inspected current repo and key source files: `src/main.tsx`, `src/calculators.ts`, `src/guides-data.json`.
- [x] Inspected current artifacts/backlog under `artifacts/`, especially P4, P2, analytics, data, and post-launch artifacts.
- [x] Prioritized shippable-now changes that do not need owner dashboard credentials.
- [x] Covered browser-local UX, calculator clarity, SEO content batch, data coverage/validation, and analytics-safe events.
- [x] Wrote scope, non-goals, acceptance criteria, dependencies, and recommended task graph.
- [x] Did not implement frontend/backend code or deploy production.

Implementation acceptance for downstream cards:

- [ ] P5 route UX uses browser-local storage only and gracefully degrades.
- [ ] P5 calculator/data tests increase confidence without inventing new game data.
- [ ] P5 SEO copy avoids duplicate current guide topics and unsupported claims.
- [ ] QA verifies static build, browser UX, mobile, sitemap/canonical, and analytics privacy.
- [ ] Ops deploys only after QA GO and writes live verification evidence.

## 6. Dependencies and blockers

No owner/dashboard credentials are required for the recommended P5 implementation path.

Known dependencies:

- Existing repo remains shared; agents must check `git status` before editing and avoid overwriting each other.
- P5 QA should wait for frontend/backend/copy parent cards.
- Deploy should wait for QA GO.
- Any external analytics dashboard, GSC/Bing action, DNS, account, payment, public promotion, or Cloudflare custom-event provider setup remains owner-approved follow-up, not part of P5 no-owner scope.

Known risks:

- Current passive seed data has only 3 passives, so passive-related copy/features must stay caveated.
- Route solver currently uses normal formula outputs and caveats missing special-combo override coverage.
- The existing app is a compact single-file React implementation; frontend work should be small and tested to avoid broad refactors.
- Local owned-Pal UX must not create a false sense of server sync or privacy-safe sharing.

## 7. Final recommendation

Proceed with the existing task graph and make `t_66e20bfc` the flagship P5 implementation: browser-local owned Pal route UX. Support it with backend/data invariant tests and a non-duplicative SEO brief/copy batch, then fan into QA and deploy only after QA GO.

Final line: [DONE]
