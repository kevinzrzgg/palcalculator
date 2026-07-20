# PalCalculator P2 SEO Content Brief — Batch 2

Project: PalCalculator
Site: https://palcalculator.com
Prepared by: seo_bot
Workspace: /root/projects/palcalculator
Artifact: /root/projects/palcalculator/artifacts/p2-seo-content-brief.md

## Status and evidence basis

This brief plans the second SEO content batch after the first live guide batch:

- `/guides/palworld-breeding-combos/`
- `/guides/palworld-breeding-tree/`
- `/guides/palworld-1-0-breeding-guide/`

Source review performed:

- Prior batch brief and implementation handoffs: `artifacts/seo-content-expansion-brief.md`, `artifacts/seo-content-expansion-implementation.md`, `artifacts/seo-content-expansion-live-verification.md`.
- Product/route strategy: `artifacts/prd.md`.
- Current implemented guide data: `src/guides-data.json`.
- Current route/tool context: `src/main.tsx`, `package.json`.

SERP/API research caveat:

- `web_search` is currently blocked by Tavily HTTP 401, so recommendations below are heuristic and based on current site strategy, prior Batch 1 research, already-live guide routes, internal product positioning, and owner-approved P2 topic direction. Recheck in Google Search Console, Ahrefs, or a browser SERP pass before final copy freeze if exact volume/difficulty is required.

Global IP/data caveat for all pages:

- PalCalculator must stay positioned as an unofficial fan-made Palworld calculator/guide site.
- Do not claim official status, guaranteed results, complete data, deterministic passive inheritance, perfect IV certainty, or 100% accuracy.
- If a specific combo, route, passive recommendation, or IV example is not generated from the current app dataset, label it as an example workflow and ask users to verify in the calculator.

## P2 page selection

Recommended implementation batch: all 5 owner-approved topics, with careful differentiation to avoid thin or duplicative pages.

1. `/guides/how-to-breed-anubis-palworld/`
   - Standalone reason: strong target-Pal intent and beginner-to-midgame utility. This is not just another combo list; it should be a target-specific workflow page that routes users into target-parent search, route solving, passive planning, and IV checks.

2. `/guides/how-to-breed-jetragon-palworld/`
   - Standalone reason: high-value endgame/legendary target intent. The page deserves its own URL because users searching Jetragon usually need constraints, caveats, and alternatives rather than a generic breeding-combo explanation.

3. `/guides/best-passive-skills-for-breeding-palworld/`
   - Standalone reason: passive planning is a separate decision layer from parent-pair breeding. It links directly to `/passive-skill-calculator/` and supports multiple tool pages without duplicating combo/tree pages.

4. `/guides/palworld-iv-explained/`
   - Standalone reason: IV search intent is educational and diagnostic, not breeding-list intent. It supports `/iv-calculator/` and `/stats-calculator/` with caveated formula, rounding, and modifier explanations.

5. `/guides/palworld-breeding-route-examples/`
   - Standalone reason: examples can bridge the gap between abstract tree concepts and calculator usage. To avoid duplication with `/guides/palworld-breeding-tree/`, this page should focus on reusable example formats and decision patterns, not another definition of breeding trees.

Deferred/avoid for now:

- Programmatic `/breed/{pal-slug}/` pages beyond Anubis/Jetragon. These can become P3 after data quality, templates, and canonical/index rules are proven.
- Thin “best combo” list pages. Batch 1 already deferred broad best-combo editorial content due unsupported universal ranking risk.

## Page brief 1 — How to Breed Anubis in Palworld

Target URL: `/guides/how-to-breed-anubis-palworld/`
Canonical: `https://palcalculator.com/guides/how-to-breed-anubis-palworld/`
Index rule: `index,follow` after unique target-specific copy, visible caveats, internal links, FAQ, and no placeholder combo tables.

Primary keyword:

- how to breed Anubis Palworld

Secondary keywords:

- Palworld Anubis breeding
- Anubis breeding combos
- how to get Anubis Palworld breeding
- Palworld Anubis parent pairs
- Anubis breeding route
- best passives for Anubis Palworld

Intent:

- Target-specific how-to + tool-seeking. Searchers want a practical path to Anubis, not a generic explanation of what breeding is.

Title <=60 chars:

- How to Breed Anubis in Palworld
- Length: 31

Meta description <=160 chars:

- Learn how to plan Anubis breeding in Palworld with parent-pair lookup, route steps, passive caveats, and PalCalculator tools.
- Length: 125

H1:

- How to Breed Anubis in Palworld

Outline:

- Intro: Anubis breeding as a target workflow, with fan-made/data-version caveat.
- H2: Before you plan an Anubis breeding route
  - Check data version.
  - Decide whether you need a direct pair or a multi-generation route.
  - Confirm owned Pals and constraints.
- H2: Find Anubis parent pairs in PalCalculator
  - Use `/breeding-calculator/` target-parent mode.
  - Explain why exact pairs should be generated from current data, not hardcoded unless verified.
- H2: Build an Anubis route from owned Pals
  - Use `/breeding-route-calculator/`.
  - Mention max generations, missing-Pal notes, and alternatives.
- H2: Plan passives for Anubis without overpromising RNG
  - Link to passive planner.
  - Discuss combat/base-use intent without claiming one universal best build.
- H2: Check Anubis IVs and stats before keeping breeders
  - Link to IV and stats calculators.
  - Include formula/rounding caveats.
- H2: Common mistakes when breeding Anubis
  - Following outdated combo screenshots.
  - Confusing route availability with passive guarantees.
  - Ignoring data-version notes.
- FAQ section.

FAQ targets:

- Can you breed Anubis in Palworld?
- What parents should I use to breed Anubis?
- Does PalCalculator guarantee Anubis breeding results?
- Can I plan Anubis passives in the same tool?
- Should I use a direct combo or a route for Anubis?
- How do I check Anubis IVs after breeding?

CTA/internal links:

- Primary CTA: `/breeding-calculator/` with anchor “find Anubis parent pairs”.
- Secondary CTA: `/breeding-route-calculator/` with anchor “plan an Anubis breeding route”.
- Supporting links:
  - `/passive-skill-calculator/` with anchor “plan Anubis passive skills”.
  - `/iv-calculator/` with anchor “check Anubis IVs”.
  - `/stats-calculator/` with anchor “compare Anubis stats”.
  - `/guides/palworld-breeding-combos/` with anchor “Palworld breeding combos guide”.
  - `/guides/palworld-breeding-tree/` with anchor “breeding tree guide”.
  - `/data-sources/` with anchor “data sources and update policy”.

Why standalone:

- Anubis has target-Pal search intent that is more specific than a generic combo page. A standalone URL can provide a task flow from target search to route planning, passive planning, and IV checks while still avoiding unsupported exact-combo promises.

## Page brief 2 — How to Breed Jetragon in Palworld

Target URL: `/guides/how-to-breed-jetragon-palworld/`
Canonical: `https://palcalculator.com/guides/how-to-breed-jetragon-palworld/`
Index rule: `index,follow` only after target-specific content clearly explains supported/unsupported breeding states and does not invent legendary/special-combo claims.

Primary keyword:

- how to breed Jetragon Palworld

Secondary keywords:

- Palworld Jetragon breeding
- Jetragon breeding combos
- can you breed Jetragon Palworld
- Jetragon parent pairs
- Jetragon breeding route
- Palworld legendary breeding caveats

Intent:

- Target-specific availability/caveat intent. Users need to know whether and how Jetragon can be planned through the current dataset, and what to do when a route is unavailable.

Title <=60 chars:

- How to Breed Jetragon in Palworld
- Length: 33

Meta description <=160 chars:

- Check Jetragon breeding options in Palworld with route planning, parent-pair caveats, data-version notes, and fan-made calculator links.
- Length: 136

H1:

- How to Breed Jetragon in Palworld

Outline:

- Intro: Jetragon as a high-value target with extra caveat sensitivity.
- H2: Can you breed Jetragon in the current dataset?
  - Do not hardcode yes/no unless verified from current app data.
  - Show how to check availability in PalCalculator.
- H2: Check Jetragon parent-pair options
  - Use target-parent search.
  - Explain unavailable, unsupported, or special-combo caveat states.
- H2: Try a Jetragon route from owned Pals
  - Use route calculator with owned Pals and max-generation controls.
  - Interpret no-route and missing-Pal states.
- H2: Legendary and special-combo caveats
  - Differentiate normal breeding formula, special combos, unavailable data, and patch timing.
- H2: Passive and IV planning after a Jetragon route
  - Avoid claiming guaranteed passives or perfect stats.
- H2: When the calculator cannot show a Jetragon route
  - Next actions: relax constraints, check data sources, update spelling/aliases, or wait for verified data.
- FAQ section.

FAQ targets:

- Can Jetragon be bred in Palworld?
- Why does a Jetragon route not appear?
- Does PalCalculator include special Jetragon combos?
- Can I guarantee passives when breeding Jetragon?
- Should I use the breeding calculator or route calculator for Jetragon?
- How often should I recheck Jetragon breeding data?

CTA/internal links:

- Primary CTA: `/breeding-calculator/` with anchor “check Jetragon parent pairs”.
- Secondary CTA: `/breeding-route-calculator/` with anchor “try a Jetragon route”.
- Supporting links:
  - `/palworld-1-0-breeding-calculator/` with anchor “Palworld 1.0 breeding calculator”.
  - `/passive-skill-calculator/` with anchor “passive skill planner”.
  - `/iv-calculator/` with anchor “IV calculator”.
  - `/guides/palworld-1-0-breeding-guide/` with anchor “Palworld 1.0 breeding guide”.
  - `/data-sources/` with anchor “data version notes”.

Why standalone:

- Jetragon intent is not safely served by a generic combo page because users often need availability, special-combo, legendary, and no-route explanations. The page can rank for target-specific questions while making uncertainty explicit.

## Page brief 3 — Best Passive Skills for Breeding in Palworld

Target URL: `/guides/best-passive-skills-for-breeding-palworld/`
Canonical: `https://palcalculator.com/guides/best-passive-skills-for-breeding-palworld/`
Index rule: `index,follow` after the page provides a goal-based framework and avoids unsupported universal rankings.

Primary keyword:

- best passive skills for breeding Palworld

Secondary keywords:

- Palworld breeding passives
- Palworld passive skill breeding
- best passives Palworld
- Palworld passive inheritance
- Palworld passive skill calculator
- how to breed passives Palworld

Intent:

- Planning/advice intent. Users want to decide which passives to target and how to think about inheritance without assuming the calculator can guarantee outcomes.

Title <=60 chars:

- Best Passive Skills for Breeding in Palworld
- Length: 44

Meta description <=160 chars:

- Plan Palworld breeding passives by goal, use PalCalculator's passive planner, and keep inheritance RNG and data caveats clear.
- Length: 126

H1:

- Best Passive Skills for Breeding in Palworld

Outline:

- Intro: “Best” depends on role, target Pal, and goals.
- H2: What passive skills mean in breeding plans
  - Passive target selection vs route availability.
- H2: Choose passives by goal, not one universal list
  - Work speed/base work.
  - Combat/damage.
  - Movement/utility.
  - Breeding/project constraints.
- H2: How to use the passive skill calculator
  - Enter target Pal and desired passives.
  - Review recognized passives and caveats.
  - Move back to route/breeding calculators.
- H2: Passive inheritance caveats
  - RNG, unsupported probabilities, data-source limits.
- H2: Example passive-planning workflow
  - Target Pal -> desired role -> passive shortlist -> route check -> IV/stat check.
- H2: Common passive-planning mistakes
  - Treating desired passives as guaranteed.
  - Ignoring target role.
  - Copying old builds without checking current data.
- FAQ section.

FAQ targets:

- What are the best passive skills for breeding in Palworld?
- Can breeding guarantee passive skills?
- Should I plan passives before or after choosing parents?
- Does PalCalculator calculate passive inheritance odds?
- Which tool should I use for passive planning?
- How do IVs and passives interact in planning?

CTA/internal links:

- Primary CTA: `/passive-skill-calculator/` with anchor “plan passive skills”.
- Secondary CTA: `/breeding-route-calculator/` with anchor “find a breeding route”.
- Supporting links:
  - `/breeding-calculator/` with anchor “check parent pairs”.
  - `/iv-calculator/` with anchor “check IV ranges”.
  - `/stats-calculator/` with anchor “compare expected stats”.
  - `/guides/how-to-breed-anubis-palworld/` with anchor “Anubis breeding workflow”.
  - `/guides/how-to-breed-jetragon-palworld/` with anchor “Jetragon breeding workflow”.
  - `/data-sources/` with anchor “passive data caveats”.

Why standalone:

- Passive-skill intent is cross-cutting and not answered fully by combo/tree pages. A dedicated page can capture advice queries while pushing users to the passive planner and related calculators.

## Page brief 4 — Palworld IV Explained

Target URL: `/guides/palworld-iv-explained/`
Canonical: `https://palcalculator.com/guides/palworld-iv-explained/`
Index rule: `index,follow` after the page includes clear educational content, formula caveats, visible examples, and links to IV/stat tools.

Primary keyword:

- Palworld IV explained

Secondary keywords:

- Palworld IV guide
- what are IVs in Palworld
- Palworld IV calculator
- Palworld stats calculator
- Palworld perfect IV caveat
- Palworld stat formula

Intent:

- Educational + diagnostic. Users want to understand what IVs mean and how to estimate them, then use a calculator to check a Pal.

Title <=60 chars:

- Palworld IV Explained
- Length: 21

Meta description <=160 chars:

- Learn what Palworld IVs mean, why stats vary, how IV calculators estimate ranges, and where formula caveats apply.
- Length: 114

H1:

- Palworld IV Explained

Outline:

- Intro: IVs as hidden stat variation, with caveated calculator support.
- H2: What IVs mean in Palworld
  - Explain in plain language.
  - Avoid implying official formula certainty.
- H2: Why two Pals can have different stats
  - Level, species/base stats, modifiers, souls, condenser stars, passives, rounding.
- H2: How an IV calculator estimates ranges
  - Inputs: Pal, level, observed HP/Attack/Defense, known modifiers.
  - Output: ranges/confidence, not guaranteed exact truth.
- H2: When IV estimates are uncertain
  - Missing modifiers, unsupported formula pieces, impossible observed stats, patch changes.
- H2: IVs vs passives vs breeding route
  - Explain the relationship across tools.
- H2: Example IV-check workflow
  - Observe stats -> enter calculator -> review caveats -> decide whether to keep breeder.
- FAQ section.

FAQ targets:

- What are IVs in Palworld?
- Does PalCalculator show perfect IVs?
- Why does my IV estimate show a range?
- What inputs do I need for an IV calculator?
- Are IVs more important than passives?
- Can breeding guarantee better IVs?

CTA/internal links:

- Primary CTA: `/iv-calculator/` with anchor “use the Palworld IV calculator”.
- Secondary CTA: `/stats-calculator/` with anchor “compare expected stats”.
- Supporting links:
  - `/passive-skill-calculator/` with anchor “plan passive skills”.
  - `/breeding-route-calculator/` with anchor “plan breeding routes”.
  - `/guides/best-passive-skills-for-breeding-palworld/` with anchor “passive skills guide”.
  - `/data-sources/` with anchor “formula and data caveats”.

Why standalone:

- IV education is a distinct search intent from breeding combos. A standalone page supports the IV/stat calculators and can reduce confusion before users enter observed stats.

## Page brief 5 — Palworld Breeding Route Examples

Target URL: `/guides/palworld-breeding-route-examples/`
Canonical: `https://palcalculator.com/guides/palworld-breeding-route-examples/`
Index rule: `index,follow` only if examples are unique, visible, caveated, and not duplicated from the breeding-tree guide. Do not publish exact Pal routes unless generated from current app data.

Primary keyword:

- Palworld breeding route examples

Secondary keywords:

- Palworld breeding route guide
- Palworld breeding path examples
- Palworld breeding tree examples
- Palworld route calculator examples
- Palworld owned Pals breeding route
- Palworld breeding route planner

Intent:

- Practical workflow intent. Users understand the idea of breeding routes but want examples showing how to enter owned Pals, read missing-Pal notes, and compare alternatives.

Title <=60 chars:

- Palworld Breeding Route Examples
- Length: 32

Meta description <=160 chars:

- See caveated Palworld breeding route examples, owned-Pal planning patterns, missing-Pal notes, and calculator workflow tips.
- Length: 124

H1:

- Palworld Breeding Route Examples

Outline:

- Intro: route examples as workflow patterns, not guaranteed exact routes.
- H2: What this page adds beyond the breeding tree guide
  - Breeding-tree guide defines concepts; this page shows example patterns and interpretation.
- H2: Example 1 — direct pair is enough
  - Demonstrate what a short route result means.
- H2: Example 2 — missing parent requires a multi-step route
  - Show missing-Pal notes and next decisions.
- H2: Example 3 — owned-Pal list changes the best route
  - Explain why a route can differ by player inventory.
- H2: Example 4 — target passive planning after route selection
  - Push to passive planner; avoid guarantee language.
- H2: How to compare two route options
  - Generations, missing Pals, rarity/practicality, caveats.
- H2: Route examples that should stay noindex or unpublished
  - Placeholder, unsupported, copied chart, or unverified exact route examples.
- FAQ section.

FAQ targets:

- What is a Palworld breeding route example?
- Why does my route differ from someone else's route?
- Can PalCalculator find routes from my owned Pals?
- Why does a route show missing Pals?
- Are route examples guaranteed to work after updates?
- Should I optimize for shortest route or desired passives?

CTA/internal links:

- Primary CTA: `/breeding-route-calculator/` with anchor “try the breeding route calculator”.
- Secondary CTA: `/guides/palworld-breeding-tree/` with anchor “learn breeding tree basics”.
- Supporting links:
  - `/breeding-calculator/` with anchor “check direct parent pairs”.
  - `/passive-skill-calculator/` with anchor “plan passives after a route”.
  - `/iv-calculator/` with anchor “check IVs before keeping breeders”.
  - `/guides/how-to-breed-anubis-palworld/` with anchor “Anubis route workflow”.
  - `/guides/how-to-breed-jetragon-palworld/` with anchor “Jetragon route workflow”.
  - `/data-sources/` with anchor “data version notes”.

Why standalone:

- The existing breeding-tree page is conceptual. A route-examples page can target example/workflow queries and serve as a bridge from education to calculator use, as long as it does not repeat the same definitions or invent unsupported exact routes.

## Sitemap, index, and canonical rules

General rules:

- Use trailing-slash canonical URLs for every approved P2 page.
- Each published P2 page must have one self-referencing canonical URL on `https://palcalculator.com`.
- Add a P2 URL to `public/sitemap.xml` and generated `dist/sitemap.xml` only after the page has complete visible content, route-specific metadata, internal links, and no placeholder sections.
- Keep all parameterized calculator states, generated share URLs, and user-state URLs out of the sitemap. Use `noindex,follow` or a real 404 where appropriate.
- Do not index draft, duplicate, thin, placeholder, copied, or unsupported exact-route pages.
- If later programmatic `/breed/{pal-slug}/` pages are introduced, canonicalize target-specific guide pages and programmatic pages carefully so Anubis/Jetragon pages do not duplicate generic templates.
- FAQPage JSON-LD is allowed only when every Q&A is visible on the same page.
- Article or TechArticle JSON-LD is acceptable for guide pages when route metadata and visible content match.
- No `HowTo` schema unless the page contains complete visible steps that satisfy schema requirements and do not imply guaranteed game outcomes.
- No `ItemList` or ranking schema for passive or route pages unless the list is genuinely stable, reviewed, and visible.

Recommended P2 sitemap additions after implementation/review:

- `https://palcalculator.com/guides/how-to-breed-anubis-palworld/`
- `https://palcalculator.com/guides/how-to-breed-jetragon-palworld/`
- `https://palcalculator.com/guides/best-passive-skills-for-breeding-palworld/`
- `https://palcalculator.com/guides/palworld-iv-explained/`
- `https://palcalculator.com/guides/palworld-breeding-route-examples/`

## Internal-link architecture

From existing live guide pages:

- `/guides/palworld-breeding-combos/`
  - Add contextual links to Anubis and Jetragon pages from “Example combo workflows”.
  - Add link to passive-skills page from passive caveat text.
- `/guides/palworld-breeding-tree/`
  - Add link to route-examples page from “Example route-tree format”.
  - Add links to Anubis/Jetragon pages as target-specific route examples.
- `/guides/palworld-1-0-breeding-guide/`
  - Add links to Anubis, Jetragon, passive skills, and IV explained in relevant use-case sections.

From tool pages:

- `/breeding-calculator/`: link to Anubis, Jetragon, breeding combos, and route examples.
- `/breeding-route-calculator/`: link to breeding tree, route examples, Anubis, and Jetragon.
- `/passive-skill-calculator/`: link to best passive skills guide plus Anubis/Jetragon examples.
- `/iv-calculator/` and `/stats-calculator/`: link to IV explained and relevant passive/route planning content.
- `/data-sources/`: link back to IV explained and 1.0 breeding guide as explanatory resources.

## Copy acceptance criteria

copy_bot must deliver for each implemented P2 page:

- Unique English copy that satisfies the assigned search intent and does not lightly rewrite Batch 1 pages.
- Title tag <=60 characters and meta description <=160 characters.
- One visible H1 matching the page topic.
- Clear first-screen statement that PalCalculator is an unofficial fan-made Palworld guide/calculator site.
- Visible data-version/source caveat and a link to `/data-sources/`.
- No official, guaranteed, 100% accurate, perfect IV, deterministic passive inheritance, or complete special-combo claims.
- At least 5 meaningful H2/H3 sections per guide page.
- At least 4 visible FAQ Q&As per page if FAQPage schema is planned.
- Descriptive internal links to relevant calculators and related guides.
- Specific Pal combo/route examples only if generated from current app data; otherwise present them as workflow examples and instruct users to verify in the calculator.
- AEO-friendly short answer blocks where useful, without keyword stuffing.
- Target-specific pages must include target-specific value beyond a generic template: availability caveats, tool workflow, route/passive/IV next steps, and common mistakes.

## Frontend acceptance criteria

frontend_bot must implement the approved P2 pages so that:

- Each approved URL returns HTTP 200 and static initial HTML includes route-specific title, meta description, canonical, robots, H1, and meaningful crawlable body copy before React hydration.
- Canonical URLs are self-referencing, HTTPS, apex-domain, and trailing-slash.
- Indexable P2 pages use `index,follow`; draft/deferred pages use `noindex,follow` and are absent from sitemap.
- Sitemap generation includes only indexable complete P2 pages plus existing indexable pages.
- Internal links are crawlable `<a href="/.../">` anchors, not button-only navigation.
- FAQPage JSON-LD is emitted only for visible FAQ content on the same route.
- Article/TechArticle JSON-LD matches visible title/description and does not conflict with page type.
- Unknown guide paths still return a real 404 and the implementation does not reintroduce broad SPA catch-all soft-404 behavior.
- Existing calculator routes, Batch 1 guide routes, route metadata, favicon/robots/sitemap behavior, analytics/Clarity snippets, and static route generation are not regressed.
- Run and pass: `npm run test`, `npm run lint`, `npm run build`.
- After build, inspect generated `dist/guides/.../index.html` files for title, description, canonical, robots, H1, visible FAQ text, and internal links.

## Suggested implementation order

1. `Palworld IV Explained`
   - Lowest risk, supports existing IV/stat calculators, little dependency on exact combo data.
2. `Best Passive Skills for Breeding in Palworld`
   - Strong support for passive planner and target-Pal pages; keep advice goal-based.
3. `How to Breed Anubis in Palworld`
   - Use the now-written passive and IV pages as supporting links.
4. `How to Breed Jetragon in Palworld`
   - Requires the strongest caveat handling; avoid unsupported availability claims.
5. `Palworld Breeding Route Examples`
   - Implement after copy has enough route-example patterns to avoid duplicating the Batch 1 breeding-tree page.

## Handoff notes for downstream workers

For copy_bot:

- Start from the page briefs above, not from competitor pages.
- Keep each page helpful even if exact combo/route data is unavailable.
- For Anubis/Jetragon, write “how to check the current route in PalCalculator” unless current app data is used to generate exact examples.
- For passive skills, avoid a universal “best” list; use role-based guidance.
- For IVs, emphasize estimates/ranges/caveats rather than perfect certainty.

For frontend_bot:

- Extend the existing guide-data/static-route approach used by Batch 1 unless the project has since changed architecture.
- Keep content in initial static HTML.
- Update internal guide-link blocks so Batch 1 and Batch 2 pages form a coherent cluster.
- Keep sitemap and route metadata sourced from one canonical route/content data source to avoid mismatches.

## Final recommendation

Proceed with 5 P2 pages:

1. `/guides/palworld-iv-explained/`
2. `/guides/best-passive-skills-for-breeding-palworld/`
3. `/guides/how-to-breed-anubis-palworld/`
4. `/guides/how-to-breed-jetragon-palworld/`
5. `/guides/palworld-breeding-route-examples/`

This batch expands PalCalculator from broad breeding guides into target-Pal, passive-planning, IV-education, and practical-route support pages. The pages are distinct enough to deserve standalone URLs if copy and frontend implementation preserve unique intent, visible caveats, and strong calculator CTAs.
