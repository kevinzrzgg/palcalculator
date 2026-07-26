# PalCalculator P5 SEO Brief — Next Content Batch

Project: PalCalculator
Site: https://palcalculator.com
Prepared by: seo_bot
Task: t_b5f62308
Artifact: /root/projects/palcalculator/artifacts/p5-seo-brief.md

## Status and evidence basis

This is a shippable content brief only. It does not implement pages, final copy, routing, sitemap changes, or deploys.

Repository/context inspected:

- Current sitemap: `public/sitemap.xml` lists 18 indexable URLs.
- Current guide content source: `src/guides-data.json` contains 8 guide pages.
- Current route metadata/rendering: `src/main.tsx` maps core tool routes plus guide data into route metadata and static guide pages.
- Current calculator/data support: `src/calculators.ts`, `src/data/pals.latest.json`, `src/data/passives.latest.json`, `src/data/version.json`, `src/data/special-combos.latest.json`.
- Prior briefs: `artifacts/seo-content-expansion-brief.md` and `artifacts/p2-seo-content-brief.md`.
- PRD route direction: `artifacts/prd.md`.

External research caveat:

- Hermes `web_search` is still blocked by Tavily HTTP 401 in this environment.
- Fallback checks used Google Suggest and Bing RSS from the terminal. Useful observed suggestions included:
  - `best palworld breeding combos`, `best palworld breeding combos 1.0`, `best palworld breeding combos 2026`, `best palworld breeding combos tier list`, `best palworld breeding combos early game`, `good palworld breeding combos`.
  - `palworld breeding guide`, `palworld breeding guide 2026`, `palworld breeding guide new pals`, `palworld breeding guide anubis`, `palworld breeding guide best pals`, `palworld breeding guide updated`, `palworld breeding guide passive skills`.
  - `how to breed orserk palworld 1.0`, `how to breed orserk palworld`, `palworld how to breed perfect orserk`.
  - `how to breed shadowbeak palworld 1.0`, `how to breed shadowbeak palworld`, `how to breed the best shadowbeak palworld`, `how to breed to get shadowbeak palworld`.
  - `palworld best base worker passives`.
- Recheck in GSC/Ahrefs/browser SERP before final copy freeze if exact volume, KD, or live SERP shape is required.

## Current indexable sitemap inventory — do not duplicate

The current sitemap already covers 18 URLs:

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
14. `/guides/palworld-iv-explained/`
15. `/guides/best-passive-skills-for-breeding-palworld/`
16. `/guides/how-to-breed-anubis-palworld/`
17. `/guides/how-to-breed-jetragon-palworld/`
18. `/guides/palworld-breeding-route-examples/`

Current data limits that must shape this batch:

- `pals.latest.json` includes 297 Pals and supports target-specific pages for Orserk, Shadowbeak, Blazamut, Astegon, Grizzbolt, Lyleen, etc.
- `passives.latest.json` currently includes only `Artisan`, `Serious`, and `Swift`, so passive pages must stay framework/caveat-led unless the data set expands.
- `special-combos.latest.json` has an empty `combos` array and a blocking caveat: verified special-combo override table is pending. Do not publish pages that claim complete special-combo coverage.
- `version.json` states normal breeding graph, passives seed data, selected base stats, caveated stat formulas, and unsupported special-combo/passive/IV certainty.

## Recommended P5 batch

Recommended implementation scope: 6 new guide pages plus 1 internal section upgrade.

URL slugs in this brief are the trailing-slash `Target URL` values below; none currently collide with the 18 sitemap URLs inspected above.

Priority order:

1. `/guides/palworld-breeding-faq/`
2. `/guides/how-to-breed-orserk-palworld/`
3. `/guides/how-to-breed-shadowbeak-palworld/`
4. `/guides/best-palworld-breeding-combos/`
5. `/guides/palworld-breeding-with-owned-pals/`
6. `/guides/palworld-base-worker-passives/`
7. Section upgrade: add a “Current data limits before you follow a combo” block to `/guides/palworld-breeding-combos/` and link it to `/data-sources/`.

Why this mix:

- It avoids duplicating the existing 8 guides by adding quick-answer FAQ, two new target-Pal workflows, one carefully caveated editorial page, one owned-Pal route intent page, and one passive-by-role support page.
- Every page can be implemented with the current app/data as caveated workflow copy; no page requires unsupported exact special-combo tables, passive odds, official claims, or full IV formula certainty.
- It strengthens internal links around the existing core calculators instead of creating broad wiki pages.

## Page brief 1 — Palworld Breeding FAQ

Target URL: `/guides/palworld-breeding-faq/`
Canonical: `https://palcalculator.com/guides/palworld-breeding-faq/`
Index rule: `index,follow` only if Q&A copy is unique and not duplicated verbatim from existing guide FAQs.

Title tag:

- Palworld Breeding FAQ
- Length: 21

Meta description:

- Quick answers about Palworld breeding combos, routes, passives, 1.0 data, and PalCalculator's fan-made caveats.
- Length: 112

Target intent:

- Quick-answer/AEO intent for beginners who are not yet ready to choose between the breeding calculator, route calculator, passive planner, IV tool, or data-source page.

Recommended H1:

- Palworld Breeding FAQ

Primary internal links:

- `/breeding-calculator/` with anchor “check parent pairs”.
- `/breeding-route-calculator/` with anchor “plan a route from owned Pals”.
- `/palworld-1-0-breeding-calculator/` with anchor “Palworld 1.0 breeding calculator”.
- `/passive-skill-calculator/` with anchor “plan passive skills”.
- `/iv-calculator/` with anchor “check IV ranges”.
- `/data-sources/` with anchor “data version and correction notes”.
- `/privacy/` with anchor “browser-local privacy notes”.

Copy requirements:

- Use short answer-first Q&A blocks; each answer should route the user to the right tool.
- Include at least these questions:
  - Is PalCalculator official?
  - Are Palworld breeding results guaranteed?
  - What is the difference between a combo and a route?
  - Why does the route solver ask for owned Pals?
  - Does PalCalculator include special breeding combos?
  - Can breeding guarantee passive skills?
  - Does PalCalculator store my Palbox?
  - How do I report incorrect data?
- Avoid duplicate FAQ text already present on the 8 current guide pages; rewrite as short routing answers.
- Use `FAQPage` JSON-LD only for visible Q&A on this page.

## Page brief 2 — How to Breed Orserk in Palworld

Target URL: `/guides/how-to-breed-orserk-palworld/`
Canonical: `https://palcalculator.com/guides/how-to-breed-orserk-palworld/`
Index rule: `index,follow` after target-specific copy, caveats, internal links, FAQ, and no unsupported exact special-combo claims.

Title tag:

- How to Breed Orserk in Palworld
- Length: 31

Meta description:

- Plan Orserk breeding in Palworld with parent-pair lookup, owned-Pal routes, passive caveats, and PalCalculator data notes.
- Length: 123

Target intent:

- Target-Pal how-to intent. Google Suggest showed `how to breed orserk palworld 1.0`, `how to breed orserk palworld`, and `palworld how to breed perfect orserk`.

Recommended H1:

- How to Breed Orserk in Palworld

Primary internal links:

- `/breeding-calculator/` with anchor “find Orserk parent pairs”.
- `/breeding-route-calculator/` with anchor “plan an Orserk route from owned Pals”.
- `/passive-skill-calculator/` with anchor “plan Orserk passives”.
- `/iv-calculator/` with anchor “check Orserk IV ranges”.
- `/stats-calculator/` with anchor “compare Orserk stats”.
- `/guides/palworld-breeding-combos/` with anchor “breeding combos guide”.
- `/guides/palworld-breeding-with-owned-pals/` with anchor “owned-Pal route planning”.
- `/data-sources/` with anchor “current data caveats”.

Copy requirements:

- Start with an unofficial/fan-made and data-version caveat above the fold.
- Explain Orserk as a target workflow: check target-parent pairs first, then use route planning if the direct parents are missing.
- Do not hardcode Orserk parent pairs unless generated from current app data during implementation and reviewed.
- Include a “perfect Orserk” section that explicitly separates route, passives, IVs, and stats; do not promise perfect outcomes.
- Include no-result/unavailable troubleshooting: spelling, aliases, max generations, owned-Pal list, unsupported special combos, data-source notes.
- FAQ targets: Can you breed Orserk in Palworld? What parents make Orserk? Can I plan perfect Orserk passives? Should I use a direct combo or a route? Why might Orserk results differ from another guide?

## Page brief 3 — How to Breed Shadowbeak in Palworld

Target URL: `/guides/how-to-breed-shadowbeak-palworld/`
Canonical: `https://palcalculator.com/guides/how-to-breed-shadowbeak-palworld/`
Index rule: `index,follow` after target-specific content that clearly labels normal-formula, special-combo, unsupported, and patch-sensitive caveats.

Title tag:

- How to Breed Shadowbeak in Palworld
- Length: 35

Meta description:

- Check Shadowbeak breeding options with parent-pair lookup, route planning, passive and IV caveats, and PalCalculator data notes.
- Length: 126

Target intent:

- Target-Pal how-to intent. Google Suggest showed `how to breed shadowbeak palworld 1.0`, `how to breed shadowbeak palworld`, `how to breed the best shadowbeak palworld`, and `how to breed to get shadowbeak palworld`.

Recommended H1:

- How to Breed Shadowbeak in Palworld

Primary internal links:

- `/breeding-calculator/` with anchor “check Shadowbeak parent pairs”.
- `/breeding-route-calculator/` with anchor “try a Shadowbeak route”.
- `/passive-skill-calculator/` with anchor “plan Shadowbeak passive skills”.
- `/iv-calculator/` with anchor “estimate Shadowbeak IV ranges”.
- `/stats-calculator/` with anchor “compare expected Shadowbeak stats”.
- `/guides/best-passive-skills-for-breeding-palworld/` with anchor “passive skills guide”.
- `/guides/palworld-breeding-route-examples/` with anchor “route examples guide”.
- `/data-sources/` with anchor “data version notes”.

Copy requirements:

- Differentiate Shadowbeak target-specific planning from the existing Anubis/Jetragon pages.
- Do not claim exact best builds, guaranteed Legend inheritance, or complete special-combo coverage.
- Include “best Shadowbeak” language only as goal selection: combat, mount/utility, future breeder, or current Palbox practicality.
- Add a caveated workflow: target-parent lookup -> route from owned Pals -> passive shortlist -> IV/stat check -> verify after patches.
- Include a section about when the calculator cannot show a route and what the user can safely try next.
- FAQ targets: Can Shadowbeak be bred in Palworld? What parents make Shadowbeak? Can I breed the best Shadowbeak? Does a route guarantee passives? Why did another guide show a different Shadowbeak combo?

## Page brief 4 — Best Palworld Breeding Combos

Target URL: `/guides/best-palworld-breeding-combos/`
Canonical: `https://palcalculator.com/guides/best-palworld-breeding-combos/`
Index rule: `index,follow` only after editorial review. If copy cannot support safe examples, launch as `noindex,follow` or defer.

Title tag:

- Best Palworld Breeding Combos
- Length: 30

Meta description:

- Explore useful Palworld breeding combo ideas by goal, with 1.0 data caveats and links to verify routes in PalCalculator.
- Length: 119

Target intent:

- Editorial recommendation intent. Suggestions show `best palworld breeding combos`, `best palworld breeding combos 1.0`, `best palworld breeding combos 2026`, `tier list`, `early game`, and `good palworld breeding combos`.

Recommended H1:

- Best Palworld Breeding Combos

Primary internal links:

- `/breeding-calculator/` with anchor “verify a parent pair”.
- `/breeding-route-calculator/` with anchor “check the route from your owned Pals”.
- `/palworld-1-0-breeding-calculator/` with anchor “1.0 breeding calculator”.
- `/passive-skill-calculator/` with anchor “passive planner”.
- `/guides/how-to-breed-anubis-palworld/` with anchor “Anubis breeding workflow”.
- `/guides/how-to-breed-orserk-palworld/` with anchor “Orserk breeding workflow”.
- `/guides/how-to-breed-shadowbeak-palworld/` with anchor “Shadowbeak breeding workflow”.
- `/data-sources/` with anchor “data-source caveats”.

Copy requirements:

- Do not publish as a thin top-10 chart.
- Define “best” by player goal, not universal ranking:
  - Early/mid-game practicality.
  - Target-Pal access.
  - Route simplicity from owned Pals.
  - Passive planning fit.
  - IV/stat follow-up value.
- Use exact combo examples only if implementation generates them from current app data and reviewers accept the caveats.
- If exact examples are not verified, write as “how to choose and verify useful combos in PalCalculator”.
- Include a “why best combo lists disagree” section covering patches, special-combo tables, data-source choices, and player inventory.
- Avoid `ItemList`/ranking schema unless a reviewed, visible, stable list exists.

## Page brief 5 — Palworld Breeding With Owned Pals

Target URL: `/guides/palworld-breeding-with-owned-pals/`
Canonical: `https://palcalculator.com/guides/palworld-breeding-with-owned-pals/`
Index rule: `index,follow` after unique workflow copy; avoid duplicating the existing breeding tree and route examples pages.

Title tag:

- Palworld Breeding With Owned Pals
- Length: 34

Meta description:

- Learn how to plan Palworld breeding routes from the Pals you own, compare missing parents, and read PalCalculator route caveats.
- Length: 128

Target intent:

- Route-planner/job-to-be-done intent: users have a Palbox/current inventory and want to know what they can breed or what path gets them to a target.

Recommended H1:

- Palworld Breeding With Owned Pals

Primary internal links:

- `/breeding-route-calculator/` with anchor “route calculator from owned Pals”.
- `/breeding-calculator/` with anchor “direct parent-pair lookup”.
- `/guides/palworld-breeding-tree/` with anchor “breeding tree basics”.
- `/guides/palworld-breeding-route-examples/` with anchor “route example patterns”.
- `/guides/how-to-breed-anubis-palworld/` with anchor “Anubis route workflow”.
- `/guides/how-to-breed-orserk-palworld/` with anchor “Orserk route workflow”.
- `/privacy/` with anchor “browser-local Palbox privacy”.
- `/data-sources/` with anchor “data version notes”.

Copy requirements:

- Focus on the owned-Pal input workflow, not another definition of breeding trees.
- Explain what to paste/type, why route results differ by player, and how missing-Pal notes should be interpreted.
- Include privacy copy: current MVP inputs are browser-local unless a later owner-approved backend changes that; do not imply account or server-side Palbox storage.
- Include route-comparison criteria: generations, missing parents, practical catching/breeding effort, passive goals, and caveats.
- Include no-result troubleshooting: add more owned Pals, increase max generations, check spelling/aliases, remove strict assumptions, review data-source notes.
- Use `Article` plus optional visible FAQ schema; avoid `HowTo` schema unless implementation has complete visible step requirements.

## Page brief 6 — Palworld Base Worker Passives

Target URL: `/guides/palworld-base-worker-passives/`
Canonical: `https://palcalculator.com/guides/palworld-base-worker-passives/`
Index rule: `index,follow` only if copy stays role-based and does not imply current passive data is complete.

Title tag:

- Palworld Base Worker Passives
- Length: 30

Meta description:

- Plan Palworld base worker passives by role, use PalCalculator's passive planner, and avoid guaranteed inheritance claims.
- Length: 116

Target intent:

- Passive-planning sub-intent. Fallback suggestion showed `palworld best base worker passives`; current site already has a broad passive guide, so this page must be narrower: base-work planning and workflow, not a duplicate best-passives page.

Recommended H1:

- Palworld Base Worker Passives

Primary internal links:

- `/passive-skill-calculator/` with anchor “base worker passive planner”.
- `/guides/best-passive-skills-for-breeding-palworld/` with anchor “general passive skills guide”.
- `/breeding-route-calculator/` with anchor “route to a base worker target”.
- `/breeding-calculator/` with anchor “check parent pairs”.
- `/iv-calculator/` with anchor “check IVs before keeping breeders”.
- `/stats-calculator/` with anchor “compare expected stats”.
- `/guides/how-to-breed-anubis-palworld/` with anchor “Anubis base-work planning example”.
- `/data-sources/` with anchor “passive data caveats”.

Copy requirements:

- Must state current passive seed data is limited and visible data-source notes should be checked.
- Use role categories and planning questions rather than a universal ranking:
  - Work speed/base productivity.
  - Stamina/uptime where applicable.
  - Transport/movement utility.
  - Early-game practicality vs late-game optimization.
- Safe examples can mention currently supported passive names (`Artisan`, `Serious`, `Swift`) only as data-recognized examples, not complete best lists.
- Connect base-worker passive planning back to route and breeding tools.
- Avoid claims about exact inheritance odds or guaranteed passive outcomes.
- This page should not duplicate `/guides/best-passive-skills-for-breeding-palworld/`; it should be narrower, base-work focused, and strongly calculator-led.

## Section upgrade 7 — Add a data-limit block to Breeding Combos Guide

Target existing URL: `/guides/palworld-breeding-combos/`
Suggested section heading:

- Current data limits before you follow a combo

Target intent:

- Reduce confusion and support E-E-A-T/trust for users comparing PalCalculator to static combo charts.

Internal links:

- `/data-sources/` with anchor “current PalCalculator data-source notes”.
- `/palworld-1-0-breeding-calculator/` with anchor “1.0 breeding calculator”.
- `/guides/best-palworld-breeding-combos/` with anchor “how to choose useful combos”.

Copy requirements:

- Explain that current normal-formula breeding data is supported, while verified special-combo override table support is pending.
- Tell users to treat unsupported special-combo states as unavailable rather than guessed.
- Mention that pages should not claim complete combo coverage, official status, guaranteed outcomes, or passive certainty.
- Add this as a section within the current page, not a standalone URL, because `/data-sources/` already owns the full source/update-policy intent.

## Sitemap, canonical, and schema rules for P5

- Add a proposed P5 URL to `public/sitemap.xml` and generated `dist/sitemap.xml` only after the page has complete visible copy, unique route metadata, internal links, FAQ where planned, and no placeholder sections.
- Use trailing-slash canonical URLs on `https://palcalculator.com`.
- Keep parameterized calculator states, share URLs, unsupported exact-route pages, placeholders, drafts, and duplicate FAQ pages out of the sitemap.
- All indexable pages must include `index,follow`; noindex any draft or thin/deferred version.
- `FAQPage` JSON-LD is allowed only when every Q&A is visible on the same page.
- `TechArticle` or `Article` JSON-LD is acceptable when title/description/URL match visible page content.
- Avoid `HowTo` schema for route/breeding pages unless visible steps satisfy schema requirements and do not imply guaranteed game outcomes.
- Avoid `ItemList`/ranking schema for best-combo or passive pages unless the list is stable, visible, reviewed, and genuinely ranked.

Recommended sitemap additions after implementation/review:

- `https://palcalculator.com/guides/palworld-breeding-faq/`
- `https://palcalculator.com/guides/how-to-breed-orserk-palworld/`
- `https://palcalculator.com/guides/how-to-breed-shadowbeak-palworld/`
- `https://palcalculator.com/guides/best-palworld-breeding-combos/` only after editorial review; otherwise noindex/defer.
- `https://palcalculator.com/guides/palworld-breeding-with-owned-pals/`
- `https://palcalculator.com/guides/palworld-base-worker-passives/` only if differentiated from the existing best-passives guide.

## Internal-link architecture

From existing pages after P5 implementation:

- `/guides/palworld-breeding-combos/`
  - Link to `/guides/best-palworld-breeding-combos/` from “Example combo workflows” or the new data-limit block.
  - Link to `/guides/palworld-breeding-faq/` from caveat/FAQ copy.
  - Link to Orserk and Shadowbeak target pages where target examples are mentioned.

- `/guides/palworld-breeding-tree/`
  - Link to `/guides/palworld-breeding-with-owned-pals/` from owned-Pal route sections.
  - Link to Orserk and Shadowbeak pages as additional target workflows.

- `/guides/palworld-1-0-breeding-guide/`
  - Link to the FAQ page for quick caveat answers.
  - Link to best-combos only if that page is reviewed/indexable.
  - Link to Orserk and Shadowbeak as 1.0 target-Pal examples.

- `/guides/best-passive-skills-for-breeding-palworld/`
  - Link to `/guides/palworld-base-worker-passives/` as a narrower base-work sub-guide.
  - Link to Orserk/Shadowbeak target pages where target-specific passive planning is discussed.

- Tool pages:
  - `/breeding-calculator/`: add contextual guide links to FAQ, Orserk, Shadowbeak, best combos.
  - `/breeding-route-calculator/`: add links to owned-Pals guide, route examples, Orserk, Shadowbeak.
  - `/passive-skill-calculator/`: add links to base-worker passives and broad passive guide.
  - `/iv-calculator/` and `/stats-calculator/`: add links to target pages where IV/stat follow-up is relevant.
  - `/data-sources/`: link back to FAQ and the combo-guide data-limit section if anchor support exists.

## Copy acceptance criteria

For every implemented P5 page, copy_bot must deliver:

- Unique English copy that satisfies the assigned intent and does not lightly rewrite existing 8 guide pages.
- Title tag <=60 characters and meta description <=160 characters.
- One visible H1 matching the page topic.
- Clear above-the-fold statement that PalCalculator is an unofficial fan-made Palworld calculator/guide site.
- Visible data-version/source caveat with link to `/data-sources/`.
- No official, guaranteed, 100% accurate, perfect IV, deterministic passive inheritance, complete special-combo, or universal best-build claims.
- At least 5 meaningful H2/H3 sections for standalone guide pages.
- At least 4 visible FAQ Q&As if FAQ schema is planned.
- Descriptive internal links to relevant calculators and related guides.
- Specific Pal combo/route examples only if generated from current app data during implementation and reviewed; otherwise present examples as workflows and direct users to verify in the calculator.
- AEO-friendly short answer blocks where useful, without keyword stuffing.

## Frontend implementation acceptance criteria for downstream task

frontend_bot should implement approved P5 pages so that:

- Each approved URL returns HTTP 200 and static initial HTML includes route-specific title, meta description, canonical, robots, H1, meaningful crawlable body copy, internal links, and visible FAQs before React hydration.
- Canonical URLs are self-referencing, HTTPS, apex-domain, and trailing-slash.
- Indexable P5 pages use `index,follow`; draft/deferred pages use `noindex,follow` and are absent from sitemap.
- Sitemap generation includes only indexable complete P5 pages plus existing indexable pages.
- Internal links are crawlable `<a href="/.../">` anchors, not button-only navigation.
- FAQPage JSON-LD is emitted only for visible FAQ content on the same route.
- Unknown guide paths still return real 404 and do not reintroduce SPA catch-all soft-404 behavior.
- Existing calculator routes, current 18 sitemap URLs, Batch 1/P2 guide routes, route metadata, favicon/robots/sitemap behavior, analytics snippets, and static route generation are not regressed.
- Run and pass after implementation: `npm run test`, `npm run lint`, `npm run build`.
- Inspect generated `dist/guides/.../index.html` pages for title, description, canonical, robots, H1, visible body copy, FAQ text, and internal links.

## Handoff notes

For copy_bot:

- Start with the first 3 P5 pages if bandwidth is limited: FAQ, Orserk, Shadowbeak.
- Use this brief as the route contract, not competitor pages.
- Keep target-Pal pages useful even if exact pairs are not hardcoded; teach users how to check current results in PalCalculator.
- For “best combos” and base-worker passives, write a planning framework unless exact data examples are reviewed and supported.

For frontend_bot:

- Extend the existing `src/guides-data.json` + static-route generation approach unless the architecture changes.
- Consider the section upgrade to `/guides/palworld-breeding-combos/` at the same time as adding best-combos/FAQ internal links.
- Keep guide content in initial static HTML.
- Update sitemap from one canonical route/content source to avoid mismatches.

## Final recommendation

Proceed with P5 in this order:

1. `/guides/palworld-breeding-faq/`
2. `/guides/how-to-breed-orserk-palworld/`
3. `/guides/how-to-breed-shadowbeak-palworld/`
4. `/guides/palworld-breeding-with-owned-pals/`
5. `/guides/best-palworld-breeding-combos/` after editorial review
6. `/guides/palworld-base-worker-passives/` if copy is clearly differentiated from the existing passive guide
7. Add the data-limit section to `/guides/palworld-breeding-combos/`

This batch gives PalCalculator a safe next SEO layer: one AEO hub, two new high-intent target-Pal workflows, one route-JTBD page, and two caveated planning pages. It stays aligned with current data support while leaving exact combo tables, passive odds, and programmatic pages for a later data-quality gate.
