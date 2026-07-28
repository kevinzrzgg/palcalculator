# P10 Product Scope — Next Feature After Share Links

Project: PalCalculator
Live site: https://palcalculator.com/
Artifact path: `/root/projects/palcalculator/artifacts/p10-product-next-feature-scope.md`
Owner role: product_bot
Date: 2026-07-28
Status: DONE for product scope; no source code changed and no deploy performed.

## 1. Decision

Recommended P10 primary feature:

> Ship a real browser-local multi-generation route solver upgrade for `/breeding-route-calculator/`: users enter a target and their owned Pals, choose a generation limit, and get a step-by-step route tree with alternatives, missing-Pal explanations, and practical next actions.

Recommended fallback:

> If route-solver complexity or performance proves too risky for one implementation cycle, ship mobile-first route calculator polish focused on above-fold task start, compact result summaries, missing-Pal guidance, and stronger copy/share affordance on the existing solver.

Why P10 should lead with deeper route solving:

- It directly strengthens the original product wedge: route-first planning from owned Pals, not just parent-pair lookup.
- P5 already added browser-local owned-Pal state; P8 made safe sharing and crawlable navigation work. The next improvement should make the core route result materially better.
- Current `solveRoute()` still behaves mostly like direct-pair or simplest-pair fallback. It does not yet search true multi-generation paths despite the UI and PRD describing max generations, route steps, missing Pals, and alternatives.
- It requires no login, backend, database, DNS, Cloudflare dashboard, analytics dashboard, GSC/Bing access, payment, account, or deploy decision.
- It creates stronger downstream hooks for later SEO/internal-link modules because guide CTAs can point to a uniquely useful route result, not just a caveated shell.

## 2. Evidence inspected

### Current app and code structure

- `package.json`
  - Static React/Vite app with `npm run test`, `npm run lint`, and `npm run build` verification scripts.
- `src/main.tsx`
  - Routes include home, breeding, route, IV, stats, passive, Palworld 1.0 breeding, data, privacy, terms, and guide pages.
  - Existing analytics queue/event hooks are first-party and privacy-safe.
  - P5 local owned-Pal helper exists on the route page using `localStorage` key `palcalculator:owned-pals:v1`.
  - P8 share URLs now use existing calculator routes plus query strings; route sharing intentionally omits browser-local owned-Pal lists and raw owned text.
  - Route-changing discovery UI uses real anchors via `RouteAnchor`.
- `src/calculators.ts`
  - `solveRoute(targetInput, ownedInput, maxGenerations)` resolves target/owned names and handles target already owned, empty-owned fallback, direct owned pair, simplest fallback, and no-route/invalid states.
  - It does not yet perform a breadth-first or dynamic-programming search that can use intermediate children across multiple generations.
  - Normal breeding graph support exists from current Pal data; special-combo overrides remain explicitly unsupported.
- `src/main.test.ts`
  - Current tests cover production data contract, route unsupported edge cases, P5 local-owned helper guardrails, P8 share URL/privacy/crawlable-link guardrails, sitemap rules, and guide metadata.
- `src/guides-data.json`
  - Current guide source has 14 guide routes after P5/P6/P8 work.
- Dataset counts verified locally:
  - 297 Pals.
  - 44,253 normal breeding pairs.
  - 3 passive seed records.
  - 14 guide pages.
  - 24 sitemap URLs.

### Backlog and product artifacts

- `artifacts/post-launch-iteration-backlog.md`
  - Earlier priority already shipped share/copy result URLs and crawlable anchors.
  - Data quality and mobile first-use path remain important, but owner/dashboard analytics and search decisions are still outside this repo-safe task.
- `artifacts/p5-product-scope.md`
  - Recommended no-owner path was browser-local owned Pal route UX, plus data quality tests and SEO content support.
  - It noted current route solver/data limitations and warned against server storage or raw owned-Pal analytics.
- `artifacts/p5-owned-pal-route-ux.md`
  - Browser-local owned Pal helper was implemented: add/remove/clear/apply local list, stores only Pal IDs, no account/backend/upload/sync, events use count buckets only.
- `artifacts/p5-data-quality.md`
  - Tests now guard 297-Pal data, 44,253 normal pairs, empty special-combo table caveat, 3-passive seed limit, and route/stat unsupported edge cases.
  - It explicitly records that route solving is still a direct-pair/fallback solver, not the multi-generation BFS route planner recommended by the research/product path.
- `artifacts/p5-seo-brief.md`
  - P5 content already expanded toward FAQ, Orserk, Shadowbeak, owned-Pal route planning, best-combos, and base-worker passive themes.
  - Future content should remain calculator-led and caveated rather than broad wiki copy.
- `artifacts/p8-product-share-links-scope.md`
  - P8 default privacy decision: route share URLs include target + max generations only; they do not encode owned lists or raw owned text by default.
- `artifacts/p8-share-links-implementation.md`, `artifacts/p8-qa.md`, and `artifacts/p8-live-verification.md`
  - P8 share URL hydration, crawlable anchors, query-state noindex/canonical guardrails, QA, deploy, and live verification passed.
  - Production has 24 sitemap URLs, no query/share/results leaks, and route query URLs canonicalize to base routes with runtime `noindex,follow`.

## 3. Candidate comparison

Scoring scale: 1 low, 5 high. Weighted qualitatively by product impact first, then repo-safe feasibility and risk.

| Candidate | User value | Feasibility without owner/backend/DNS | Data/privacy risk | SEO/conversion support | Recommendation |
|---|---:|---:|---:|---:|---|
| Deeper multi-generation route solver | 5 | 4 | 3 | 5 | Primary P10 |
| Data quality expansion | 4 | 3 | 4 | 4 | Important, but better as support/follow-up unless verified sources are ready |
| Passive planner UX | 3 | 4 | 3 | 3 | Useful later; current 3-passive seed data limits product value |
| Mobile calculator polish | 4 | 5 | 1 | 4 | Best fallback if solver scope slips |
| Internal link/conversion modules | 3 | 5 | 1 | 4 | Low-risk support work; less differentiated than route depth |

### Candidate notes

#### A. Deeper multi-generation route solver

User task:
A player knows the target Pal and has a partial Palbox. They need a practical path, not just a direct parent pair or a generic missing-parent fallback.

Why now:
P5 created local owned-Pal state and P8 created privacy-safe share URLs. The next missing piece is the solver itself: a result that can actually use owned Pals across generations.

Strength:
Highest alignment with ICP/JTBD and original positioning: “I have these Pals; what is the shortest path to the Pal/build I want?”

Risk:
Algorithm complexity, result readability, performance on 44k normal pairs, and avoiding false certainty while special combos remain unsupported.

Mitigation:
Keep scope to normal-formula graph in current dataset, max generation cap 1-4 or 1-5, bounded alternatives, explicit caveats, deterministic tie-breaks, and tests on known cases plus performance ceiling.

#### B. Data quality expansion

User task:
User wants confidence that combos/passives/stats match the current game.

Strength:
Trust layer and SEO credibility improve. Special-combo and passive gaps are visible current limitations.

Risk:
Verified source collection can become research/data work, not a self-contained product feature. Unsafe copying or unverified special-combo claims would violate existing guardrails.

Recommended handling:
Do not make broad data expansion the primary P10 unless a data agent first supplies a verified source policy and safe dataset patch. Create a follow-up data card after P10 if route solver exposes specific missing-data pain.

#### C. Passive planner UX

User task:
User wants to plan desired passives for a target Pal and then connect that plan to breeding/route steps.

Strength:
Good future wedge for “perfect Pal” workflows.

Risk:
Current passive data has only 3 passives and no inheritance odds. A richer UI could overpromise despite caveats.

Recommended handling:
Defer until route solver and/or passive dataset is stronger. P10 can leave a handoff seam for future passive constraints but should not implement passive odds.

#### D. Mobile calculator polish

User task:
Mobile user wants the first calculator action and result summary without scrolling through too much copy.

Strength:
Very feasible and low risk. It improves every tool page.

Risk:
It is polish, not a new differentiated capability. P8/P5 already improved share/navigation/local list; another polish-only cycle may delay the route-first wedge.

Recommended handling:
Use as fallback or include small route-page-only UX refinements inside the primary implementation.

#### E. Internal link/conversion modules

User task:
User lands on a guide or tool and needs the next best calculator/guide action.

Strength:
Low-risk growth support after P5/P6 guide expansion and P8 crawlable anchors.

Risk:
Can become SEO decoration if core route result remains shallow.

Recommended handling:
Do after P10 route depth, when links can point into a stronger route workflow.

## 4. P10 primary feature scope

### Feature name

P10 frontend: multi-generation route solver and practical route results.

### Target route

`/breeding-route-calculator/`

### One-line positioning

For Palworld players with a partial Palbox, PalCalculator should find the shortest caveated breeding route from owned Pals to a target Pal using the current browser-local data, without accounts or server storage.

### P0 behavior

1. Existing target input, owned-Pal text input, max generation input, browser-local owned-Pal helper, query hydration, share controls, and caveat copy remain intact.
2. `solveRoute()` searches the normal breeding graph across multiple generations up to a bounded max generation value.
3. If target is already owned, return the existing zero-generation success state.
4. If a direct owned pair exists, return a one-generation route.
5. If no direct pair exists, search intermediate Pals that can be produced from owned or previously-produced Pals.
6. Return a single best route plus a small bounded set of alternatives.
7. Each step includes parent A, parent B, child, generation/step order, whether each parent is owned or produced earlier, and caveats.
8. Results explain missing Pals or blockers clearly when no complete route exists within constraints.
9. If no owned Pals are supplied, keep the current educational fallback: show simple target pairs and missing parents, but label it as “starter pair guidance,” not a solved owned-Pal route.
10. Result copy states that special-combo overrides remain unsupported in this dataset and routes use current normal-formula graph unless future data expands.
11. Share URL remains target + maxGen only by default. It must not include browser-local owned list or raw owned text.
12. Analytics must remain count/bucket/status-only and must not include raw Pal lists, exact target-owned combinations, full share URLs, identifiers, cookies, tokens, or save data.

### P1 behavior, if implementation budget allows

- Add “why this route?” explanation: fewest generations, then fewest missing/produced intermediates, then rarity/parent-score tie-break.
- Add route alternative cards that explain tradeoffs: fewer missing Pals, lower rarity parents, or shorter generation count.
- Add a compact route summary line above the full steps for mobile: “2 generations, 3 steps, 1 missing parent, 2 alternatives.”
- Add a safe “copy route steps” plain-text action that copies only displayed route steps/caveats, not raw owned-Pal source text.

### Later / not in P10

- No save-file or Palbox import.
- No backend solver, D1/KV/R2, Workers API, account, sync, or server-side route storage.
- No short links or `/share/*` pages.
- No sharing of owned-Pal lists by default.
- No passive inheritance odds.
- No exact IV/stat solver work.
- No verified special-combo expansion unless a separate data-quality task supplies reviewed data.
- No programmatic Pal-specific route pages.
- No GSC/Bing, DNS, Cloudflare dashboard, analytics provider, public promotion, or deploy work.

## 5. Acceptance criteria for P10 implementation

### Functional acceptance

- [ ] Existing route calculator text input still works when browser-local owned helper is unused.
- [ ] Browser-local owned Pal helper still add/removes/clears/applies saved Pals with localStorage-only behavior.
- [ ] Route solver returns target-owned success when owned list includes target.
- [ ] Route solver returns direct one-generation success when owned Pals can directly breed target.
- [ ] Route solver can return a true multi-generation route where at least one step produces an intermediate Pal used in a later step.
- [ ] Route solver respects `maxGenerations`; lowering max generation can change a success into a recoverable no-route/constraint state.
- [ ] Empty-owned behavior remains useful but is labeled as missing-parent/starter guidance, not as an owned-Pal route.
- [ ] No-route state explains likely causes: unsupported target, too few owned Pals, too-low generation cap, normal-formula-only data, or missing source data.
- [ ] Alternatives are bounded so the UI and analytics payload do not grow unbounded.
- [ ] Route result includes visible data version and special-combo caveat.

### Privacy acceptance

- [ ] No backend, account, upload, server persistence, cookie identity, or cloud sync is added.
- [ ] localStorage continues to store only Pal IDs in the existing browser-local key.
- [ ] Generated route share URLs include target and max generation only by default.
- [ ] Generated route share URLs do not include owned Pals, raw owned text, localStorage contents, full result JSON, analytics payloads, or identifiers.
- [ ] Analytics events use safe buckets/properties only: route/tool/status/result-count bucket/generation bucket/duration bucket/storage scope/data version/device/referrer host.
- [ ] Analytics events do not include raw Pal lists, exact target-owned combinations, full URLs, IPs, emails, cookies, tokens, or save data.
- [ ] Privacy copy continues to state that browser-local owned-Pal data is not included in share URLs.

### SEO/canonical acceptance

- [ ] Base route canonical remains `https://palcalculator.com/breeding-route-calculator/`.
- [ ] Query-state URLs remain runtime `noindex,follow` and canonicalize to the base route.
- [ ] Sitemap contains no query URLs, `/share/`, `/results/`, or programmatic route-result pages.
- [ ] No new indexable pages are introduced by this feature.
- [ ] Existing crawlable anchors and guide links are not regressed.

### UX/mobile acceptance

- [ ] At 390px width, the user can identify the route task, target input/start action, owned-Pal helper, and current result without horizontal overflow.
- [ ] Route summary is readable before long detailed step lists.
- [ ] Missing-Pal and alternative-route sections are scannable on mobile.
- [ ] Copy/share controls remain visible after a meaningful route result.
- [ ] Loading or expensive search states do not freeze the page without feedback if implementation needs async/yielding behavior.

### Verification acceptance

- [ ] Unit tests cover multi-generation success, max-generation failure, direct route success, target-owned shortcut, empty-owned fallback, invalid target, alternatives bound, and caveat propagation.
- [ ] Static/source tests keep P8 share privacy guardrails: no owned list in route share payload, query-state noindex, sitemap no leaks.
- [ ] P5 local-owned helper tests continue passing.
- [ ] `npm run test` passes.
- [ ] `npm run lint` passes with 0 errors; existing warnings can remain only if unchanged and documented.
- [ ] `npm run build` passes.
- [ ] Implementation artifact records changed files, test output, known limits, and no-deploy status.

## 6. Likely files touched by implementer

Expected source/test files:

- `src/calculators.ts`
  - Replace or extend `solveRoute()` with bounded multi-generation search over normal breeding pairs.
  - Consider helper structures: pairs by parent, producible generation map, predecessor steps, route reconstruction, alternative ranking.
- `src/main.tsx`
  - Render richer route result details, route summary, alternatives, missing/blocker explanation, and optional copy-steps action.
  - Preserve existing localStorage helper and share URL privacy boundary.
- `src/main.test.ts`
  - Add route solver tests and preserve P5/P8 static/privacy tests.
- `src/styles.css`
  - Only if needed for route summary/alternatives/mobile readability.
- `artifacts/p10-route-solver-implementation.md`
  - Implementation handoff artifact.

Files not expected:

- `public/sitemap.xml` should not need new URLs.
- `scripts/generate-static-routes.mjs` should not need route additions.
- No Cloudflare, DNS, Wrangler, or deployment files should be changed.

## 7. Technical implementation notes for frontend/backend agent

Recommended algorithm shape:

1. Build a normalized set of owned Pal IDs from valid owned input.
2. Precompute breeding pair references from the existing normal graph.
3. Generation 0 = owned IDs.
4. For each generation up to max:
   - Consider pairs whose parents are already available from generation <= current.
   - Mark newly producible children with predecessor pair and step metadata.
   - Stop when target is first reached, because the first reached generation is the shortest generation count.
5. Reconstruct the route by walking predecessor pairs for target and any intermediate children not originally owned.
6. Deduplicate repeated intermediate steps.
7. Rank alternatives by generation count, missing parents, parent rarity sum, and deterministic ID tie-break.
8. Cap work and alternatives so large graphs do not create UI/performance issues.

Important caveat:
The existing generated normal graph has 44,253 pairs. A naive all-pairs scan across a small max generation cap may still be acceptable in a browser, but implementation should verify runtime and add tests/perf guardrails. If performance is poor, index pairs by parent ID and only expand from newly available Pals.

## 8. Risks and mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| Solver becomes slow on 44k pairs | P1 | Bounded max generation, indexed expansion, deterministic caps, test/perf smoke |
| UI implies exact/official route certainty | P1 | Keep fan-made, data-version, normal-formula-only, and special-combo caveats visible |
| Route sharing leaks owned-Pal state | P0 | Preserve P8 rule: share target + maxGen only; tests must assert no owned/raw text in URL |
| Multi-step result is hard to read on mobile | P1 | Summary-first card, ordered steps, collapsible/compact alternatives if needed |
| Special-combo gap causes misleading route | P1 | Label normal-formula route; do not claim complete combo coverage |
| Implementation refactors too much single-file React | P2 | Keep edits local to solver/result rendering; no broad architecture rewrite in P10 |

## 9. Fallback scope if primary is too risky

Fallback feature: mobile-first route calculator result polish.

Use this only if implementer finds real multi-generation route search cannot be safely completed within the cycle.

Fallback acceptance:

- [ ] Keep existing solver behavior unchanged except for clearer labels.
- [ ] Move/clarify the route start path so target input and owned-Pal helper are easier to reach on 390px mobile.
- [ ] Add a compact result summary above route details.
- [ ] Split result explanations into clear sections: status, missing Pals, alternatives, caveats, next action.
- [ ] Improve empty-owned and no-route copy so users know what to try next.
- [ ] Keep P8 share privacy and query noindex/canonical behavior intact.
- [ ] Run `npm run test`, `npm run lint`, and `npm run build`.

This fallback is lower impact than the primary route solver, but it is still repo-safe and improves conversion/usefulness without owner dependencies.

## 10. Agent handoff

Recommended next card:

Title: `P10 frontend: implement multi-generation route solver`
Assignee: `frontend_bot` or `backend_bot` depending board convention for calculator engine work. If one owner must be chosen, use `frontend_bot` because the app is currently a static client-side React/Vite implementation and the solver lives in `src/calculators.ts`.

Suggested card body:

```text
Goal: Implement P10 multi-generation route solver for PalCalculator without backend, login, DNS, Cloudflare dashboard, or deploy.
Read first:
- artifacts/p10-product-next-feature-scope.md
- artifacts/p8-product-share-links-scope.md
- artifacts/p8-share-links-implementation.md
- artifacts/p5-owned-pal-route-ux.md
- artifacts/p5-data-quality.md
- src/calculators.ts
- src/main.tsx

Scope:
- Extend solveRoute() to search current normal breeding graph across bounded generations.
- Render practical route summary, ordered steps, missing/blocker explanations, and bounded alternatives on /breeding-route-calculator/.
- Preserve localStorage-only owned-Pal helper and P8 share URL privacy: route share URLs include target + maxGen only, not owned list/raw owned text.
- No backend, account, upload, server storage, new share/result pages, sitemap additions, DNS/dashboard work, or deploy.

Verify:
- npm run test
- npm run lint
- npm run build
- Write artifacts/p10-route-solver-implementation.md with changed files, test output, privacy notes, and no-deploy status.
```

QA follow-up after implementation:

Title: `P10 QA: verify multi-generation route solver`
Assignee: `qa_bot`
Parent: implementation card

QA should browser-test desktop and 390px mobile route flows, query hydration, share privacy, localStorage helper, no-route states, sitemap/query noindex guardrails, and run `npm run test`, `npm run lint`, `npm run build`.

Ops follow-up:
Only create an ops deploy card after QA GO. Do not include deploy in the product or implementation card.

## 11. Product acceptance checklist for this artifact

- [x] Reviewed current app capabilities and code structure.
- [x] Reviewed post-launch backlog.
- [x] Reviewed P5 artifacts and P8 artifacts.
- [x] Compared deeper route solver, data quality expansion, passive planner UX, mobile calculator polish, and internal link/conversion modules.
- [x] Recommended one primary P10 product feature and one fallback.
- [x] Included acceptance criteria, privacy boundaries, likely files touched, test plan, risks, and agent handoff.
- [x] Did not change source code and did not deploy.

Final line: [DONE]
