# PalCalculator PRD v1

Project: palcalculator
Market: US / English
Stage: 02 PRD and route contract
Generated: 2026-07-16
Default stack: Cloudflare-first
Upstream source: /root/projects/palcalculator/artifacts/research.md

## 1. Executive product decision

Decision: BUILD a Palworld calculator hub branded as PalCalculator.

Do not position this as a generic `palcalculator` exact-match site. The upstream research found weak/noisy exact-match demand for `palcalculator`, but strong Palworld calculator intent around breeding, 1.0 breeding, IV, stats, passive skills, and route planning. PalCalculator should therefore use the short brand name while every indexable promise makes the Palworld context explicit.

One-line positioning:
For Palworld players who want to breed or evaluate a target Pal without spreadsheet work, PalCalculator is a fast fan-made Palworld 1.0 calculator hub that combines breeding pairs, shortest owned-Pal routes, IV/stat checks, and passive-skill planning in one mobile-first tool.

Primary competitive wedge:
- Not just parent-pair lookup.
- Route-first: “I have these Pals; what is the shortest path to the Pal/build I want?”
- Trust-first: clear Palworld 1.0 data version, source/update policy, formula caveats, and fan-site disclaimer.
- UX-first: calculator inputs above the fold, no account wall, shareable result URLs, and fast Cloudflare edge delivery.

## 2. Opportunity and evidence summary

Upstream verdict: BUILD Palworld 1.0 calculator hub; do not target exact `palcalculator` alone.

Key evidence from research:
- Google autosuggest normalizes the opportunity toward `pal calculator`, `pal calculator breeding`, `pal calculator palworld`, `palworld calculator`, `palworld calculator 1.0`, `palworld calculator breeding`, `palworld calculator iv`, `palworld calculator stats`, and `palworld calculator passive`.
- Keyword tooling found `palworld 1.0 breeding calculator` as a rising term plus `breeding calculator palworld`, `pal breeding calculator`, `pal analyzer`, and `palworld save editor`.
- Competitors validate demand: Palworld.gg, Palpedia, Pal Routes, PalworldBreedCalculator.com, Game8, Wikily/Paldex, PalDB, Pal-Breed, and XGamingServer all cover overlapping tools.
- Gap: many tools solve one isolated task; PalCalculator can win by bundling route, breeding, IV/stat, passive planning, share links, and beginner-friendly explanations with current 1.0 data.

Caveat for downstream SEO copy freeze:
- Research used public autosuggest, Bing RSS, Steam APIs, keyword API, and direct competitor metadata because configured Tavily search/extract returned 401. Manual live Google SERP review is still recommended before final title/meta copy freeze.

## 3. Product type

Site type: hybrid calculator/tool hub.

Primary type:
- Calculator utility site for Palworld.

Secondary types:
- Data lookup shell for Pal data, passives, formulas, and source/update notes.
- Programmatic SEO pages for specific Pal tasks once data quality is proven.

Not a:
- Generic PAL/fitness/airline/PayPal calculator.
- Full Palworld wiki.
- Save editor at MVP.
- Paid SaaS at launch.

## 4. ICP and JTBD

### ICP scoring

| ICP | Scenario | Pain strength | Frequency | SEO reach | MVP fit | Priority |
|---|---|---:|---:|---:|---:|---|
| Breeding optimizer | Wants a specific Pal or breed result quickly | 5 | 5 | 5 | 5 | Primary |
| Build optimizer | Wants to verify IVs/stats/passives for a combat or base Pal | 4 | 4 | 4 | 4 | Secondary |
| Returning/1.0 player | Needs updated 1.0 data and routes after patch changes | 4 | 3 | 4 | 4 | Secondary |
| Power importer | Wants Palbox/save import and route history | 5 | 3 | 3 | 2 | Later |
| Content/wiki reader | Wants broad lore/items/map info | 2 | 4 | 4 | 1 | Not target |

Primary ICP:
High-intent Palworld players planning breeding outcomes or target builds, especially those who know the Pal they want and need the fewest reliable breeding steps from their current Palbox.

### P0 user tasks

1. Calculate child from two parent Pals.
   - Trigger: user has two Pals and wants to know the offspring.
   - Success: child, special-combo marker, and caveats are visible immediately.

2. Find all parent pairs for a target Pal.
   - Trigger: user wants Anubis/Jetragon/Orserk/etc. and needs viable parents.
   - Success: sorted parent pairs with filters and direct link to route planning.

3. Solve shortest route from owned Pals to target Pal.
   - Trigger: user has a limited Palbox and wants the fewest generations.
   - Success: route steps, generation count, missing ingredients, and copy/share link.

4. Estimate IV/stat quality.
   - Trigger: user has Pal level/stats and wants to know if it is worth keeping/breeding.
   - Success: IV range/score, expected stat bands, and formula assumptions.

5. Plan passive-skill inheritance without overpromising certainty.
   - Trigger: user wants a target Pal with selected passives.
   - Success: candidate parents/routes and RNG/inheritance caveats.

6. Verify data freshness.
   - Trigger: user is worried calculators are outdated after Palworld 1.0 updates.
   - Success: data version, update date, and source/update policy are visible.

## 5. Positioning and value proposition

Positioning statement:
For Palworld 1.0 players who need fast breeding, route, IV/stat, and passive planning, PalCalculator provides a browser-based fan-made calculator hub that turns a target Pal or current Palbox into step-by-step routes and shareable results, unlike dense wikis or single-purpose calculators that make users stitch breeding, stats, and passive information together manually.

Value hierarchy:
1. Get the answer fast: calculator UI above the fold.
2. Know what to do next: route steps and copy/share result links.
3. Trust the result: Palworld 1.0 data version, formulas, assumptions, caveats.
4. Stay lightweight: no login, no server-side save upload, mobile-first.
5. Expand via long-tail pages only where each page has real tool value.

Primary CTA:
- Start with a target Pal.

Secondary CTAs:
- Calculate breeding pair.
- Check IVs/stats.
- Plan passives.
- Paste owned Pal list (browser-local when available).

## 6. MVP scope

### P0 scope: launchable MVP

| Area | Requirement | Notes |
|---|---|---|
| Breeding calculator | parent + parent => child | Include special combo marker and data version. |
| Reverse breeding | target child => parent pairs | Sort/filter pairs; link to route solver. |
| Route solver | owned Pals + target => shortest route | Manual selection/paste of owned Pal names; step-by-step display. |
| IV/stat calculator | Pal + level + observed stats + modifiers => IV/stat estimate | Show ranges and formula caveats. |
| Passive planner shell | desired passives + target Pal => planning notes / candidate routes where data supports | Avoid deterministic promises. |
| SEO shells | core indexable tool pages | Each page must include a working tool entry point, not only copy. |
| Trust layer | data version, update policy, fan-site disclaimer, privacy note | Visible on tool pages. |
| Sharing | shareable URL state for route/build outputs | No account required. |
| Analytics | basic event tracking | page_view, tool_start, tool_success, tool_error, share/copy. |
| Performance | fast mobile UX | Cloudflare Pages static-first; Workers only where needed. |

### P1 scope: after MVP validation

- Browser-local Palbox CSV/JSON import/export.
- “What can I breed from my owned Pals?” reverse discovery.
- Compare route alternatives by generations, rarity, passive probability, missing Pals.
- Pal-specific long-tail pages: `/breed/anubis/`, `/stats/jetragon/`, etc.
- Capture-rate, work-suitability, base Pal, condenser, and damage calculators if query evidence remains strong.
- Patch notes/data changelog pages.
- Supporter features only after usage evidence: saved Palbox, route history, saved collections.

### Later / exploratory

- Save-file parsing.
- User accounts.
- Public build galleries.
- Community route submissions.
- API access.

## 7. NOT-DO list

1. Do not target `palcalculator` alone as the SEO head term.
2. Do not build a thin clone of a parent-pair breeding calculator.
3. Do not present the site as official or use official-looking branding.
4. Do not use copyrighted game art/logos/assets without permission.
5. Do not publish stale or unsourced breeding data; no hidden data version.
6. Do not overpromise passive inheritance or exact IV certainty where formulas/RNG/rounding create uncertainty.
7. Do not upload save files to a server in MVP; if import exists, prefer browser-local parsing and clear privacy copy.
8. Do not bury the tool below long SEO text.
9. Do not create broad wiki pages that do not contain a concrete calculator/user task.
10. Do not require login to complete P0 tasks.
11. Do not build payments/subscription for MVP.
12. Do not scrape/clone competitor data as the only source of truth.

## 8. Canonical URL plan and page matrix

Canonical host: `https://palcalculator.com/` if owned; otherwise use the final owner-approved domain. Until domain confirmation, downstream docs should refer to `{CANONICAL_ORIGIN}`.

URL rules:
- Trailing slash canonical URLs.
- One canonical per user task.
- Tool pages are indexable only when they have working calculator UI and unique intent.
- Result/share URLs should be canonicalized to the base tool page unless they contain stable, useful public content intended for indexing.
- Parameterized app state is shareable but noindex by default unless later promoted to programmatic SEO pages.

| Route | Index | Primary keyword / intent | H1 | Primary user task | CTA | Schema | Notes |
|---|---|---|---|---|---|---|---|
| `/` | yes | Palworld calculator, PalCalculator | PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators | Choose a calculator or start by target Pal | Start with a target Pal | WebSite, SoftwareApplication | Clarify Palworld above fold. |
| `/breeding-calculator/` | yes | palworld breeding calculator | Palworld Breeding Calculator | Parent pair -> child; target -> pairs | Calculate breeding | SoftwareApplication, FAQPage | P0. |
| `/breeding-route-calculator/` | yes | palworld breeding route calculator | Palworld Breeding Route Calculator | Owned Pals -> shortest target route | Find shortest route | SoftwareApplication, FAQPage | P0 flagship. |
| `/iv-calculator/` | yes | palworld iv calculator | Palworld IV Calculator | Estimate IVs from observed stats | Check IVs | SoftwareApplication, FAQPage | P0. |
| `/stats-calculator/` | yes | palworld stats calculator | Palworld Stats Calculator | Estimate expected stats and compare ranges | Calculate stats | SoftwareApplication, FAQPage | P0; may share engine with IV. |
| `/passive-skill-calculator/` | yes | palworld passive skill calculator | Palworld Passive Skill Calculator | Plan target passives and inheritance route | Plan passives | SoftwareApplication, FAQPage | P0/P1 depending data availability. |
| `/palworld-1-0-breeding-calculator/` | yes | palworld 1.0 breeding calculator | Palworld 1.0 Breeding Calculator | Assure updated data for 1.0 breeding | Use 1.0 calculator | SoftwareApplication, FAQPage | Can route to same app with 1.0 copy. |
| `/data-sources/` | yes | palworld calculator data source | PalCalculator Data Sources & Update Policy | Verify freshness and caveats | View latest data version | Article | Trust page. |
| `/privacy/` | yes | privacy | Privacy Policy | Understand local/import tracking | N/A | WebPage | Required if analytics/import exists. |
| `/terms/` | yes | terms | Terms of Use | Terms/fan-site disclaimer | N/A | WebPage | Include unofficial fan-site disclaimer. |
| `/breed/{pal-slug}/` | later yes | how to breed {pal} palworld | How to Breed {Pal} in Palworld | Find routes/pairs for one Pal | Calculate route | SoftwareApplication, FAQPage | P1 programmatic; only after data quality. |
| `/iv/{pal-slug}/` | later yes | {pal} iv calculator palworld | {Pal} IV Calculator | Check IVs for one Pal | Check IVs | SoftwareApplication, FAQPage | P1. |
| `/stats/{pal-slug}/` | later yes | {pal} stats calculator palworld | {Pal} Stats Calculator | Compare expected stat bands | Calculate stats | SoftwareApplication, FAQPage | P1. |
| `/best-passives/{pal-slug}/` | later yes | best passives for {pal} | Best Passives for {Pal} | Plan passive targets | Plan passives | FAQPage | P1; content must avoid unsupported claims. |
| `/share/{result-id}/` | no by default | share result | Shared PalCalculator Result | Open shared route/build | Open result | WebPage noindex | Only index if editorialized later. |

## 9. Functional requirements and states

### 9.1 Shared calculator shell

Inputs:
- Pal selector with autocomplete, aliases, and empty-state examples.
- Data version selector/label, default latest stable Palworld 1.0 data.
- Optional owned-Pal list input for route tasks.

States:
- Empty: show example query and top tasks.
- Loading: skeleton/results spinner under controls, not full page block.
- Success: results visible with copy/share, data version, caveats.
- No result: explain why and suggest relaxing filters or checking spelling.
- Invalid input: inline validation, no page reload.
- Data unavailable: show `[待确认]`/unavailable state rather than fabricated results.

### 9.2 Breeding calculator

Inputs:
- parent_a Pal
- parent_b Pal
- optional filters: include/exclude special combos, data version

Outputs:
- child Pal
- special combo marker if applicable
- link to reverse target pairs
- link to route solver with child as target
- source/update note

Edge cases:
- Same parent twice.
- Unknown Pal name.
- Pal not breedable or excluded by data.
- Special combo overrides normal formula.

### 9.3 Reverse parent search

Inputs:
- target Pal
- optional filters: owned-only, rarity, generation count, special only, exclude legendary/special

Outputs:
- parent pair list
- sorting by availability/simple route/rarity/name
- link each pair to route details

Edge cases:
- Target has no normal pair but has special combo.
- Very large result set; paginate/filter.
- Data conflict; show caveat.

### 9.4 Breeding route solver

Inputs:
- owned Pal list selected manually or pasted as text/CSV-like list
- target Pal
- optional constraints: max generations, exclude Pals, include passives where supported

Outputs:
- shortest route / fewest generations
- step-by-step breeding plan
- missing Pals needed
- alternative routes if available
- copy/share URL

Edge cases:
- User owns target already.
- No route within constraints.
- Owned list empty: fallback to general parent pairs.
- Duplicate/misspelled Pal names.
- Route ties: show alternatives and tie-break rule.

### 9.5 IV/stat calculator

Inputs:
- Pal
- level
- observed HP/Attack/Defense
- souls / condenser stars / passives / trust or other known modifiers as supported by data

Outputs:
- estimated IV range/score
- expected stat bands
- formula assumptions
- confidence/caveat where rounding or missing modifiers apply

Edge cases:
- Missing modifiers produce broad range.
- Impossible stat values.
- Unsupported Pal/data version.
- Uncertain formulas must be explicit.

### 9.6 Passive planner

Inputs:
- target Pal
- desired passive skills
- optional owned Pals / candidate parents

Outputs:
- candidate route notes
- inheritance caveats and RNG warning
- recommended next action: choose parents, breed route, or verify data

Edge cases:
- Passive combination unavailable/unsupported.
- Too many desired passives.
- Data cannot guarantee probability.

## 10. Data contract needs

Full implementation belongs to the backend/data stage, but PRD requires these domain objects and policies.

Required data entities:
- Pal: id, slug, display_name, aliases, elements, rarity, breedability flags, data_version.
- BreedingPair: parent_a_id, parent_b_id, child_id, combo_type, source, data_version.
- SpecialCombo: parent constraints, child_id, explanation, source, data_version.
- PassiveSkill: id, name, category, effects, compatibility notes, source, data_version.
- StatFormula: pal_id/base stats, supported modifiers, formula_version, caveats, source.
- RouteResult: target_pal_id, owned_pal_ids, steps, generations, missing_pals, alternatives, constraints, data_version.
- ShareState: route/build parameters encoded safely in URL or short id.

Data policies:
- Display latest data version and last updated date on every tool page.
- Keep source/update policy at `/data-sources/`.
- Prefer deterministic static JSON for P0 if dataset size allows.
- Use Workers only for route solving if client-side performance is insufficient.
- Do not send save files/server-side Palbox data in MVP unless owner approves a privacy/security design.
- Never fabricate missing data; show unavailable/caveat states.

## 11. Non-functional requirements

Performance:
- Mobile LCP target under 2.5s on production build.
- Calculator interactions should feel instant for common cases; route solving should show progress if >500ms.
- Cloudflare Pages static-first; Workers for APIs/compute only when necessary.

Accessibility:
- Keyboard-usable forms and autocomplete.
- Labels for every input.
- Color is not the only signal for rarity/warnings.

SEO/indexability:
- Canonical tags on every indexable route.
- Sitemap includes indexable canonical pages only.
- Robots noindex for share/app-state pages by default.
- FAQ/schema only when visible content exists.

Privacy/compliance:
- Fan-made/unofficial disclaimer on footer and terms.
- Privacy page before analytics or import features launch.
- Browser-local Palbox parsing preferred.
- No secret or private tokens in client bundle.

Analytics:
- page_view: page_slug, referrer, device_type.
- tool_start: tool_type, page_slug, data_version.
- tool_success: tool_type, result_count, duration_bucket, data_version.
- tool_error: tool_type, error_type, data_version.
- copy_result/share_result: tool_type, page_slug.
- outbound_click if affiliate/server-hosting links are later added.

## 12. Conversion goals

MVP conversion definition is engagement, not payment.

Primary goals:
- User completes a calculator task.
- User copies or shares a result.
- User clicks from one calculator to another related task.

Suggested measurable targets for first validation window:
- Tool-start rate from core pages: >= 35% of sessions on tool pages.
- Tool-success rate after start: >= 70% for breeding and IV/stat calculators; >= 50% for route solver if constraints are complex.
- Copy/share action: >= 8% of successful route/build results.
- Bounce reduction: homepage users click a tool or start target input within 10 seconds at >= 25%.
- Data trust: `/data-sources/` linked from every tool page and receives no unresolved freshness complaints during QA.

Commercial direction:
- Launch free.
- Consider ads only after traction and never above calculator inputs.
- Affiliate links may be explored for gaming/server hosting later after compliance review.
- Do not add subscription/paywall until repeated usage proves saved Palbox/route history value.

## 13. Acceptance criteria

PRD Gate acceptance:
- Canonical URL plan exists and includes index/noindex decisions.
- User tasks are explicit and tied to Palworld calculator intent.
- MVP route contract exists in /root/projects/palcalculator/artifacts/route-contract.md.
- NOT-DO list prevents generic PAL/wide wiki/scope creep.
- Acceptance criteria are measurable and include edge cases.

Product acceptance for MVP implementation:
1. `/`, `/breeding-calculator/`, `/breeding-route-calculator/`, `/iv-calculator/`, `/stats-calculator/`, `/passive-skill-calculator/`, `/palworld-1-0-breeding-calculator/`, `/data-sources/`, `/privacy/`, and `/terms/` render without 404.
2. Every indexable tool page has a canonical URL, H1, title/meta, calculator entry point above the fold, data version label, and fan-site disclaimer path.
3. Breeding calculator returns a child for valid parent pair and shows a clear invalid/no-result state for bad input.
4. Reverse target search returns parent pairs or a no-result explanation for a valid target.
5. Route solver handles owned list empty, target already owned, no route, and at least one successful multi-step route.
6. IV/stat calculator handles valid inputs, impossible stats, missing modifiers, and unsupported data with explicit caveats.
7. Passive planner does not claim deterministic inheritance; unsupported combinations show a caveat.
8. Share/copy result works without login and does not expose private data.
9. Mobile viewport can complete each P0 task without horizontal scrolling or hidden controls.
10. Basic analytics events fire for page_view, tool_start, tool_success, tool_error, copy/share in non-secret form.
11. Sitemap and robots exclude share/result-state URLs unless deliberately promoted later.
12. No copyrighted game art/logos are required for launch.

## 14. Downstream handoff

Next recommended agents:
- pricing_bot: define free/ad/affiliate/supporter monetization strategy without payment launch.
- compliance_bot: validate fan-site disclaimer, IP/asset limits, privacy/import risks, source/update policy.
- copy_bot after PRD+compliance: produce SEO copy freeze using Palworld-specific keyword clusters and live SERP recheck caveat.
- backend_bot: define data schema, source policy, formulas, route algorithm/API boundaries.
- design_bot/frontend_bot later: build mobile-first calculator UI with calculator above fold.

Do not assume:
- Final domain is confirmed.
- Google live SERP has been manually rechecked.
- Palworld data source is production-ready.
- Save-file import is approved.
- Official assets can be used.

[DONE]
