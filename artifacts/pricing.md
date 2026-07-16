# PalCalculator Pricing / Monetization Strategy v1

Project: palcalculator
Market: US / English
Stage: 03-pricing
Date: 2026-07-16
Owner profile: pricing_bot
Status: [DONE]

## 1. Executive decision

Recommendation: launch PalCalculator as a free, no-login Palworld calculator hub. Do not ship payments, subscription, account wall, or paid gating in MVP.

Why:
- PRD explicitly says “Paid SaaS at launch” is not the product type and “Do not build payments/subscription for MVP.”
- User intent is free gaming utility: breeding calculator, route solver, IV/stat calculator, and passive planner.
- Differentiation should come from fast route-first UX, current Palworld 1.0 data, trust layer, and shareable results, not monetization friction.
- MVP conversion is engagement: tool completion, share/copy, cross-tool navigation, and trust-page visibility.

MVP commercial posture:
- Free: YES, all P0 calculators usable without login.
- Paid: NO for MVP. Only “supporter features coming later” / waitlist copy is acceptable.
- Ads: NOT at launch; consider after traffic validation and never above calculator inputs.
- Affiliate: MAYBE later for gaming/server-hosting referrals after compliance review.
- Lead-gen: LOW priority for MVP; optional newsletter/Discord/patch-alert signup only if privacy copy is ready.

## 2. Upstream inputs read

- `/root/projects/palcalculator/artifacts/prd.md`
- `/root/projects/palcalculator/artifacts/route-contract.md`
- `/root/projects/palcalculator/artifacts/research.md`
- `/root/projects/palcalculator/project-control.md`

Important upstream facts:
- Domain candidate in project-control: `palcalculator.com`; final Cloudflare/DNS/GitHub/deploy permissions remain pending.
- P0 calculators: breeding, reverse parent search, route solver, IV/stat, stats, passive planner shell, data sources, privacy, terms.
- P1 / later: saved Palbox, route history, browser-local import/export, pal-specific SEO pages, account/supporter features.
- NOT-DO: no login requirement for P0, no payment/subscription for MVP, no server-side save upload, no official-looking branding.

## 3. Competitor / monetization anchor table

This table is a monetization anchor, not a claim that each competitor has an identical business model. Source basis: upstream research competitor map and visible product positioning described there.

| Competitor / substitute | Observed user value | Pricing / monetization implication for PalCalculator |
|---|---|---|
| Palworld.gg Breeding Calculator | Broad Palworld database/tool ecosystem | User expects core calculators to be free; broad databases set a high free baseline. |
| Palpedia Breeding + Builder | Free-looking breeding and IV/stat utility pages with 1.0 freshness emphasis | PalCalculator should not paywall basic breeding or IV/stat checks. |
| Pal Routes | Strong direct competitor for owned-Pal shortest route and Palbox paste | Route solver must be free at MVP; paid route solving would lose against a feature-matched free alternative. |
| PalworldBreedCalculator.com | Focused breeding calculator with exact-match SEO | Pair/reverse breeding is commodity and should remain free. |
| Game8 calculator pages | Authority content site with guide/calculator pages | Ads/content monetization is plausible after traffic, but calculator UX must not be buried under ads. |
| Wikily / Paldex / PalDB | Broad database calculators and dense tool navigation | PalCalculator can win on speed/simplicity, not price. |
| XGamingServer Palworld tools | Calculator page adjacent to server-hosting business | Server-hosting affiliate/referral is the most natural later affiliate path, but needs compliance and disclosure. |
| Manual spreadsheet / Discord advice | Free but time-consuming | Value prop is time saved; still not enough evidence for MVP subscription. |

Conclusion from anchors: free utility is the market default. Any paid path must be optional supporter/storage/convenience, not blocking calculator answers.

## 4. Safe MVP monetization model

### 4.1 Free tier — launch default

Name: Free
Price: $0
Availability: launch
CTA: “Start with a target Pal” / “Calculate breeding” / “Find shortest route”
Account required: no
Payment required: no

Included P0 capabilities:
- Parent + parent -> child breeding calculator.
- Target Pal -> parent pairs.
- Owned-Pal list + target -> shortest route, using manual select/paste input.
- IV/stat estimate with formula caveats.
- Passive-skill planner shell with RNG and unsupported-data caveats.
- Data version badge, update policy, fan-site disclaimer, privacy/terms.
- Copy/share URL state without storing private save-file contents.

Free limits and guardrails:
- No hard visible quota for normal client-side calculations in MVP.
- If a Worker API is used for route solving, add abuse controls invisibly: IP/session rate limiting, request size caps, max owned-Pal list length, max generations/constraints, and cache safe public computations.
- Share URLs should encode safe state or use short IDs only if no private Palbox/save content is persisted.
- No “unbounded use” wording; describe as “free for normal player use” if needed.

### 4.2 Paid / supporter — not implemented in MVP

Status: coming later / waitlist only.
Final paid price: OWNER_DECISION_REQUIRED.
Payment provider and checkout flow: OWNER_DECISION_REQUIRED.
Do not build or expose a buy button until owner approves pricing, tax/refund terms, and compliance copy.

Possible later Supporter / Pro value, only after repeated usage proves demand:
- Browser-local or account-backed saved Palbox sets.
- Route history.
- Saved build/route collections.
- Cross-device sync.
- Patch update alerts.
- More convenient import/export, if privacy and security are approved.

Pro / Supporter quota boundaries for later design:
- Saved Palbox sets: cap required, e.g. OWNER_DECISION_REQUIRED exact cap.
- Saved route history: cap required, e.g. OWNER_DECISION_REQUIRED exact cap.
- Saved collections/share pages: cap required, e.g. OWNER_DECISION_REQUIRED exact cap.
- Import/export file size and count: cap required.
- Worker/API-heavy solve frequency: cap required if server-side compute is used.
- No use of the word “unlimited” in paid plan copy or entitlement schema.

Suggested pricing posture, not final price:
- MVP page: no pricing table; use free calculator CTAs.
- Optional copy below tool pages: “Supporter features like saved Palbox and route history may come later.”
- Later test: ask users to join waitlist for saved Palbox / route history before building payments.

### 4.3 Ads strategy

Launch: no display ads.
Reason: the PRD requires calculator inputs above the fold and fast mobile UX. Ads at launch add layout, performance, and trust risk before traffic is validated.

After traction, ads may be tested only if all conditions pass:
- Tool-start rate and tool-success rate are healthy.
- Mobile LCP remains under target.
- Ads are below calculator controls/results or in non-blocking content areas.
- No interstitial, sticky overlay, or deceptive ad placement.
- Compliance review confirms disclosure and privacy implications.

Ad placement rule:
- Never above primary calculator inputs.
- Never between input and result for P0 calculations.
- Prefer low-density placements after result explanation or below FAQ/content sections.

### 4.4 Affiliate strategy

Launch: no affiliate links required.
Later candidates:
- Palworld server hosting referrals.
- Gaming hardware/controller/store links if genuinely useful.
- Game deal links only if compliant and not misleading.

Affiliate gate:
- OWNER_DECISION_REQUIRED: approved affiliate categories and partners.
- COMPLIANCE_REQUIRED: disclosure language, privacy/cookie behavior, non-official fan-site clarity.
- UX gate: affiliate modules must not look like calculator results or official recommendations.

Recommended first affiliate experiment:
- A small “Want to host a Palworld server?” resource link below relevant non-calculator content, not on top of route/IV calculators.

### 4.5 Lead-gen / community strategy

MVP optional, not required:
- Patch-update email waitlist.
- Discord/community link.
- “Notify me when saved Palbox launches.”

Rules:
- Do not block calculator use behind email capture.
- Privacy page must disclose email/analytics provider before capture.
- Keep signup copy separate from official Palworld/Pocketpair branding.

## 5. Cost model and safety caps

### 5.1 Cost assumption

P0 should be designed to have very low marginal cost:
- Static calculator UI and JSON data served via Cloudflare Pages/static assets.
- Client-side calculation preferred where feasible.
- Worker API only if route solving is too heavy for client-side performance.
- No server-side save-file upload or persistent Palbox storage in MVP.
- No third-party paid AI/API dependency in P0.

Because exact Cloudflare account plan, Workers usage pricing, analytics provider, and storage choices are not confirmed, this report does not assert a final dollar cost. It defines unit-cost drivers and required caps for the implementation handoff.

### 5.2 Unit cost table

| Unit | MVP path | Expected marginal cost category | Required cap / control |
|---|---|---:|---|
| Page view | Static Cloudflare Pages route | Very low | Cache static assets; keep JS/data bundle lean. |
| Calculator start | Browser-side UI event | Very low | Analytics event must avoid raw private data. |
| Breeding pair lookup | Static JSON + client function | Very low | Validate inputs; no server needed by default. |
| Reverse parent search | Static JSON + client function | Very low | Filter/sort client-side if dataset permits. |
| Route solve | Prefer client-side; Worker fallback if needed | Low to medium if Worker-heavy | Max owned-Pal list length, max generations, timeout, cache safe public results, rate-limit abuse. |
| IV/stat calculation | Client-side formula | Very low | Formula version/caveats; no external API. |
| Passive planner shell | Static data + client notes | Very low | Do not compute unsupported probabilities. |
| Share result | Encoded URL state preferred | Very low | No raw save data; noindex result URLs by default. |
| Saved Palbox/history | Not in MVP | Storage + auth cost later | OWNER_DECISION_REQUIRED before building; hard saved-item caps required. |

### 5.3 Free tier cost safety

Free tier is safe if P0 remains static/client-heavy. The only cost-sensitive risk is server-side route solving or future stored user features.

Implementation guardrails for backend/frontend:
- Start with static JSON and pure functions.
- Benchmark route solving before introducing Worker APIs.
- If using Workers, return duration buckets and error codes but do not log raw owned Pal lists.
- Add server-side request body size caps if any API endpoint accepts owned-Pal lists.
- Keep all P0 features usable without account creation.

## 6. Entitlement / feature matrix

| Capability | Free MVP | Later Supporter / Pro | Notes |
|---|---:|---:|---|
| Breeding calculator | Yes | Yes | Do not paywall commodity lookup. |
| Reverse parent search | Yes | Yes | Free baseline. |
| Breeding route solver | Yes | Yes | Flagship must be free for SEO/product validation. |
| IV/stat calculator | Yes | Yes | Free baseline. |
| Passive planner shell | Yes | Yes | Caveated; no deterministic promise. |
| Data sources/update policy | Yes | Yes | Trust layer, not monetized. |
| Share/copy result | Yes | Yes | No login required. |
| Browser-local Palbox paste | Yes if implemented | Yes | Prefer local; no server upload. |
| Saved Palbox across sessions/devices | No | Possible later | Requires owner decision, auth/privacy/storage. |
| Route history | No | Possible later | Requires caps and privacy review. |
| Saved collections | No | Possible later | Requires caps and moderation/privacy review. |
| Patch alerts/newsletter | Optional | Optional | Not a gate to use tools. |
| API access | No | Later exploratory | Not part of MVP. |

## 7. Pricing page / CTA recommendation

MVP should not have a public paid pricing page.

Recommended site copy:
- Primary CTA: “Start with a target Pal.”
- Secondary CTAs: “Calculate breeding,” “Find shortest route,” “Check IVs,” “Plan passives.”
- Footer/soft monetization copy: “PalCalculator is free for normal player use. Supporter features like saved Palbox sets and route history may be explored after launch.”

If a `/pricing/` or pricing section is required by the site template, use this instead of a paid table:

| Plan | For | What is available now | CTA |
|---|---|---|---|
| Free | Palworld players who need breeding, route, IV/stat, and passive planning | All MVP calculators, data version notes, copy/share links, no login required | Start calculating |
| Supporter | Players who want saved Palbox, route history, and collections later | Coming later; not available at MVP | Join waitlist / request feature |

Do not show a dollar price or checkout button in MVP.

## 8. OWNER_DECISION_REQUIRED items

These are explicit owner decisions required before any paid/payment implementation:

1. Whether PalCalculator should ever introduce paid supporter features, or remain ads/affiliate-only.
2. Final paid plan name, price, billing interval, and regional/tax handling.
3. Payment provider and checkout flow, including Stripe Tax / refund / terms copy if Stripe is used.
4. Whether accounts are allowed for saved Palbox, route history, and cross-device sync.
5. Exact caps for saved Palbox sets, saved routes, saved collections, import file size, and any server-side route/API usage.
6. Whether affiliate monetization is allowed, which categories are approved, and where disclosures appear.
7. Whether display ads are allowed after traction, and maximum placement density.
8. Whether email/Discord lead capture is allowed, which provider is used, and privacy-copy requirements.
9. Whether any Palbox/save-file import can persist server-side. Default answer for MVP should be no.
10. Whether domain `palcalculator.com` and final canonical origin are confirmed for public launch.

## 9. 交付物 / Deliverables

- Primary deliverable: `/root/projects/palcalculator/artifacts/pricing.md`
- Pricing strategy: free MVP, no paid checkout, later Supporter/Pro only after owner decision.
- Cost model: unit-cost table and abuse-control guardrails for static/client-first Cloudflare implementation.
- Monetization matrix: free / paid / ads / affiliate / lead-gen treatment and downstream handoff.

## 10. 验收清单 / Acceptance gate self-check

Pricing Gate requirements:
- Clear free strategy: PASS — free no-login MVP, all P0 calculators included.
- Clear paid strategy: PASS — no paid MVP; later supporter/storage features only after owner decision and usage evidence.
- Clear ads strategy: PASS — no ads at launch; optional later below calculator flow after traction and compliance review.
- Clear affiliate strategy: PASS — optional later gaming/server-hosting affiliate after owner/compliance approval.
- Clear lead-gen strategy: PASS — optional patch/waitlist/community signup; never gate calculator usage.
- Explicit OWNER_DECISION_REQUIRED items: PASS — listed above.

Skill checklist:
- [x] 不得出现 unlimited in plan copy except this checklist warning; product copy must not promise it.
- [x] 必须有竞品定价表 / monetization anchor table.
- [x] 必须有单位成本 / unit cost table.
- [x] 必须有 Pro 额度上限 / explicit Pro/supporter caps are required before build; exact numbers are owner decisions.

## 11. Risks

P0 risks:
- Accidentally adding login/payment friction before validating search traffic and tool completion.
- Server-side route solving without rate limits or request size caps.
- Persisting owned Palbox/save-file data without privacy/security approval.
- Affiliate or ad modules creating official-looking or misleading recommendations.

P1 risks:
- Paid features are too weak unless users repeatedly need saved Palbox/route history.
- Ads can hurt LCP and calculator completion if placed too high.
- Programmatic Pal pages may become thin if shipped before unique calculator data is ready.

## 12. 下游交接 / Downstream handoff

Status: [DONE]
One-line conclusion: Ship a free MVP with no payment flow; defer monetization to traffic-validated ads/affiliate/waitlist/supporter features and require owner decisions before any paid implementation.

Next recommended agents:
- compliance_bot: review ads/affiliate disclosures, fan-site disclaimer, privacy/import risks, and email/waitlist requirements.
- copy_bot: keep MVP copy free-tool-first; do not write paid plan prices or checkout CTAs.
- backend_bot: implement static/client-heavy calculators first; only add Worker APIs with abuse controls.
- frontend_bot/design_bot: keep calculator inputs above monetization modules.

Downstream must read:
- `/root/projects/palcalculator/artifacts/prd.md`
- `/root/projects/palcalculator/artifacts/route-contract.md`
- `/root/projects/palcalculator/artifacts/pricing.md`

Downstream must not assume:
- Paid price is approved.
- Payment/checkout is approved.
- Ads or affiliates are approved for launch.
- Server-side Palbox/save-file storage is approved.
- Final Cloudflare/DNS/GitHub/production deployment permission exists.

[DONE]
