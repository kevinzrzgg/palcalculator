# PalCalculator SEO Content Expansion Brief — Batch 1

Project: PalCalculator
Site: https://palcalculator.com
Prepared by: seo_bot
Workspace: /root/projects/palcalculator
Artifact: /root/projects/palcalculator/artifacts/seo-content-expansion-brief.md

## Status and evidence basis

This is a conservative SEO content brief for 3–5 new informational/supporting pages that extend the existing MVP calculator routes.

Existing core tool routes already covered by the site/app and current sitemap/build context:
- `/breeding-calculator/`
- `/breeding-route-calculator/`
- `/iv-calculator/`
- `/stats-calculator/`
- `/passive-skill-calculator/`
- `/palworld-1-0-breeding-calculator/`
- `/data-sources/`

Manual checks performed during this task:
- Local repo/source review: `src/main.tsx`, `scripts/generate-static-routes.mjs`, `public/sitemap.xml`, `dist/sitemap.xml`, prior `artifacts/research.md`, prior `artifacts/seo-audit.md`, and `artifacts/search-engine-submit-plan.md`.
- Manual SERP/source fallback checks: configured `web_search`/`web_extract` failed with Tavily 401, so I used Google Suggest and Bing RSS from this worker plus prior research. These checks are sufficient for a content-expansion brief, but should be rechecked in a browser/SEO tool before copy freeze if Ahrefs/GSC/keyword volume is required.
- Google Suggest examples observed:
  - `palworld breeding combos`, `palworld breeding combos 1.0`, `palworld breeding combos 2026`, `palworld breeding combos list`, `palworld breeding combos anubis`, `palworld breeding combos chart`, `palworld breeding combos jetragon`.
  - `palworld breeding tree`, `palworld breeding tree calculator`, `palworld breeding tree guide`, `palworld breeding tree generator`, `palworld breeding tree chart`, `palworld breeding tree maker`, `palworld breeding tree anubis`.
  - `palworld breeding calculator`, `palworld breeding calculator 1.0`, `palworld breeding calculator tree`, `palworld breeding calculator game8`, `palworld breeding calculator app`.
- Bing RSS examples observed:
  - For `palworld breeding combos`: Palworld.gg breeding combinations, Game8 best breeding combinations 1.0, KeenGamer 1.0 breeding guide, chart/fusion-combination pages.
  - For `palworld breeding tree`: Palworld.gg, Palworld Breeding Tree & Combinations, Game8, and 1.0 guide pages.
  - For `palworld 1.0 breeding guide`: guide/combo pages from KeenGamer, Game8, Drawpie, IGN.

Important caveat for copy_bot/frontend_bot: all new content must remain fan-made and data-version-aware. Do not claim official status, guaranteed accuracy, complete special-combo coverage, deterministic passive inheritance, or 100% correct formulas.

## Keyword cluster shortlist and target URL matrix

Priority clusters:

1. Palworld breeding combos / combo list intent
   - Primary searcher need: find parent-child combos, 1.0 combo lists, specific examples like Anubis/Jetragon, and then use a calculator.
   - Recommended URL: `/guides/palworld-breeding-combos/`
   - Role: informational landing page that funnels to `/breeding-calculator/` and `/palworld-1-0-breeding-calculator/`.

2. Palworld breeding tree / breeding path intent
   - Primary searcher need: understand multi-step breeding paths, route trees, and owned-Pal paths to a target.
   - Recommended URL: `/guides/palworld-breeding-tree/`
   - Role: guide page that explains tree/path concepts and funnels to `/breeding-route-calculator/`.

3. Palworld 1.0 breeding guide / updated mechanics intent
   - Primary searcher need: understand what changed/what data version the calculator uses, how to use updated 1.0 breeding tools, and where caveats apply.
   - Recommended URL: `/guides/palworld-1-0-breeding-guide/`
   - Role: version-specific guide that connects the 1.0 landing calculator with data-source/update-policy trust copy.

4. Palworld breeding FAQ / beginner questions intent
   - Primary searcher need: quick answers around how breeding works, special combos, passives, RNG, data freshness, and why calculators differ.
   - Recommended URL: `/guides/palworld-breeding-faq/`
   - Role: AEO/FAQ support page and internal-link hub. Useful after the first 3 pages; can also be merged into page FAQs if implementation bandwidth is low.

5. Best Palworld breeding combos / recommended combos intent
   - Primary searcher need: opinionated “best combos” for progression or popular targets.
   - Recommended URL: `/guides/best-palworld-breeding-combos/`
   - Role: higher-risk editorial page. Implement only if copy_bot can cite data/version assumptions and avoid pretending universal best choices.

Recommended first implementation batch: pages 1, 2, and 3.
Reason: they match observed autosuggest/SERP terms, map cleanly to existing calculators, and avoid the higher editorial risk of “best” claims. Page 4 is the next-best AEO support page if frontend/copy capacity allows a fourth page.

## Page brief 1 — Palworld Breeding Combos

Target URL: `/guides/palworld-breeding-combos/`
Canonical: `https://palcalculator.com/guides/palworld-breeding-combos/`
Index rule: `index,follow` only after the page has unique visible copy, internal links, FAQ, and no placeholder sections. Add to sitemap at launch if indexed.

Primary keyword:
- palworld breeding combos

Secondary keywords:
- palworld breeding combos 1.0
- palworld breeding combos list
- palworld breeding combos chart
- palworld breeding calculator combos
- palworld parent pairs
- palworld breeding combinations

Search intent:
- Mixed informational + tool-seeking. Users want a combo list or chart, but many will convert into calculator usage once they know they can search parent pairs or target children.

Page goal:
- Explain how Palworld breeding combos are represented in PalCalculator, show safe example workflows, and move users to the breeding calculator without creating a thin duplicate combo database page.

Proposed title <=60 chars:
- Palworld Breeding Combos Guide
  - Length: 33

Meta description <=160 chars:
- Learn Palworld breeding combos, parent-pair lookup, 1.0 caveats, and when to use PalCalculator's fan-made breeding tools.
  - Length: 122

H1:
- Palworld Breeding Combos Guide

Section outline:
- Intro: “Use combos as a starting point, then verify in the calculator”
- H2: What are Palworld breeding combos?
- H2: Parent pair → child vs target child → parent pairs
- H2: How to check a combo in PalCalculator
  - Step 1: open `/breeding-calculator/`
  - Step 2: choose pair mode or target mode
  - Step 3: check data version and caveats
- H2: Palworld 1.0 combo caveats
  - Normal breeding data vs special combo overrides
  - Why different websites can disagree after patches
- H2: Example combo workflows to include
  - “I have two parents: what child do I get?”
  - “I want Anubis/Jetragon/Orserk: which parent pairs should I check?”
  - Keep examples clearly labelled as examples, not universal recommendations.
- H2: When to use the route calculator instead
- H2: Data sources and update policy
- FAQ section

FAQ targets:
- What is a breeding combo in Palworld?
- Are PalCalculator breeding combos official?
- Does PalCalculator include Palworld 1.0 breeding combos?
- Why do different Palworld breeding combo charts disagree?
- Can a breeding combo guarantee passive skills?
- Should I use a combo list or a breeding route calculator?

Internal links:
- `/breeding-calculator/` with anchor “Palworld breeding calculator”
- `/palworld-1-0-breeding-calculator/` with anchor “Palworld 1.0 breeding calculator”
- `/breeding-route-calculator/` with anchor “breeding route calculator”
- `/passive-skill-calculator/` with anchor “passive skill planner”
- `/data-sources/` with anchor “data sources and update policy”

Structured data:
- `Article` or `TechArticle` is acceptable.
- `FAQPage` only if the exact Q&A is visible on the page.

Unique value angle:
- Not another giant combo dump. The page should explain how to turn combo intent into calculator workflows with version/caveat awareness.

## Page brief 2 — Palworld Breeding Tree

Target URL: `/guides/palworld-breeding-tree/`
Canonical: `https://palcalculator.com/guides/palworld-breeding-tree/`
Index rule: `index,follow` after the route/tree explanation, example flow, and internal links are fully visible. Add to sitemap at launch if indexed.

Primary keyword:
- palworld breeding tree

Secondary keywords:
- palworld breeding tree calculator
- palworld breeding tree guide
- palworld breeding tree chart
- palworld breeding route
- palworld breeding path
- palworld breeding tree generator

Search intent:
- Users want to understand or generate multi-step breeding paths, not just direct parent pairs.

Page goal:
- Teach the concept of a breeding tree and position PalCalculator’s route solver as the next action for players who have a current Palbox/owned-Pal list.

Proposed title <=60 chars:
- Palworld Breeding Tree Guide
  - Length: 30

Meta description <=160 chars:
- Understand Palworld breeding trees, route steps, owned-Pal paths, and how PalCalculator finds caveated breeding routes.
  - Length: 118

H1:
- Palworld Breeding Tree Guide

Section outline:
- Intro: “A breeding tree is a route, not just one combo”
- H2: What a Palworld breeding tree means
- H2: Direct combo vs multi-generation route
- H2: How PalCalculator builds route steps
  - Owned Pals input
  - Target Pal
  - Max generations
  - Alternatives/missing Pal notes
- H2: Example route-tree format
  - Use a text-first sample layout; do not invent unsupported exact route claims unless generated from current app data.
- H2: When a route may not be available
  - Missing data, generation limit, unavailable Pal names/aliases, unsupported special combos
- H2: Passive and IV caveats inside breeding trees
- H2: Next steps after finding a route
- FAQ section

FAQ targets:
- What is a Palworld breeding tree?
- Is a breeding tree the same as a breeding combo?
- Can PalCalculator use my owned Pals for a route?
- Why does a breeding route have missing Pals?
- Can a breeding tree guarantee passives?
- How many generations should I allow?

Internal links:
- `/breeding-route-calculator/` with anchor “Palworld breeding route calculator”
- `/breeding-calculator/` with anchor “direct breeding combo calculator”
- `/passive-skill-calculator/` with anchor “passive skill planner”
- `/iv-calculator/` with anchor “IV calculator”
- `/data-sources/` with anchor “data version notes”

Structured data:
- `Article` plus optional `FAQPage` for visible FAQs.
- Avoid `HowTo` schema unless the page shows complete user-visible steps that match schema requirements.

Unique value angle:
- Route-first explanation for users with owned Pals, which differentiates PalCalculator from generic combo charts.

## Page brief 3 — Palworld 1.0 Breeding Guide

Target URL: `/guides/palworld-1-0-breeding-guide/`
Canonical: `https://palcalculator.com/guides/palworld-1-0-breeding-guide/`
Index rule: `index,follow` after copy references the current PalCalculator data version and links to `/data-sources/`. Add to sitemap at launch if indexed.

Primary keyword:
- palworld 1.0 breeding guide

Secondary keywords:
- palworld 1.0 breeding combos
- palworld 1.0 breeding calculator
- palworld breeding guide 1.0
- palworld breeding calculator 1.0
- palworld 1.0 breeding tree

Search intent:
- Informational and freshness-driven. Users want updated 1.0 guidance and a calculator they can trust enough to try.

Page goal:
- Provide a version-specific guide that explains how to use the 1.0 breeding calculator, what data is included, and what caveats remain.

Proposed title <=60 chars:
- Palworld 1.0 Breeding Guide
  - Length: 29

Meta description <=160 chars:
- Use this Palworld 1.0 breeding guide to check combos, routes, data-version notes, and fan-made calculator caveats.
  - Length: 113

H1:
- Palworld 1.0 Breeding Guide

Section outline:
- Intro: “Updated guidance for Palworld 1.0 calculator workflows”
- H2: What this guide covers
- H2: How Palworld 1.0 breeding data is handled in PalCalculator
- H2: Use case 1 — check parent pair results
- H2: Use case 2 — find parents for a target Pal
- H2: Use case 3 — plan a route from owned Pals
- H2: Use case 4 — plan passives without overpromising RNG
- H2: Data freshness, unsupported domains, and correction workflow
- H2: Common mistakes when using 1.0 breeding guides
- FAQ section

FAQ targets:
- Is PalCalculator updated for Palworld 1.0?
- What does PalCalculator mean by fan-made data?
- Does the 1.0 calculator include special combos?
- Why should I check data version before using a guide?
- Can Palworld 1.0 breeding guarantee passives?
- Where can I report a data correction?

Internal links:
- `/palworld-1-0-breeding-calculator/` with anchor “Palworld 1.0 breeding calculator”
- `/breeding-calculator/` with anchor “parent-pair breeding calculator”
- `/breeding-route-calculator/` with anchor “route calculator”
- `/passive-skill-calculator/` with anchor “passive skill calculator”
- `/data-sources/` with anchor “PalCalculator data sources”

Structured data:
- `Article` plus optional visible `FAQPage`.

Unique value angle:
- Freshness and transparency. The page should explain exactly what PalCalculator does and does not claim for 1.0.

## Page brief 4 — Palworld Breeding FAQ

Target URL: `/guides/palworld-breeding-faq/`
Canonical: `https://palcalculator.com/guides/palworld-breeding-faq/`
Index rule: `index,follow` only if it is not a near-duplicate of FAQ blocks on other pages. If FAQs are duplicated across guide pages, canonicalize or consolidate rather than indexing duplicates.

Primary keyword:
- palworld breeding faq

Secondary keywords:
- how does breeding work in palworld
- palworld breeding questions
- palworld breeding calculator faq
- palworld passive breeding questions
- palworld special breeding combos

Search intent:
- Quick-answer AEO/FAQ intent. SERP signal was weaker than combo/tree/1.0 guide terms, but it supports internal linking and AI-answer-friendly structure.

Page goal:
- Answer beginner and caveat questions in concise, crawlable blocks and push users to the right calculator.

Proposed title <=60 chars:
- Palworld Breeding FAQ
  - Length: 21

Meta description <=160 chars:
- Quick answers about Palworld breeding combos, routes, passives, 1.0 data, and PalCalculator's fan-made caveats.
  - Length: 112

H1:
- Palworld Breeding FAQ

Section outline:
- Intro: “Short answers before you calculate”
- H2: Combo basics
- H2: Route/tree basics
- H2: Palworld 1.0 data and update questions
- H2: Passive and RNG questions
- H2: Accuracy, official status, and correction questions
- H2: Which PalCalculator tool should I use?

FAQ targets:
- Is PalCalculator official?
- Are breeding results guaranteed?
- What is the difference between a combo and a route?
- Why does a route solver ask for owned Pals?
- What does `normal breeding formula` mean?
- Does PalCalculator store my Palbox?
- How do I report incorrect data?

Internal links:
- `/breeding-calculator/`
- `/breeding-route-calculator/`
- `/palworld-1-0-breeding-calculator/`
- `/passive-skill-calculator/`
- `/privacy/`
- `/data-sources/`

Structured data:
- `FAQPage` is the primary schema opportunity, but only for visible Q&A content. Avoid stuffing every page with identical FAQ schema.

Unique value angle:
- Short, honest answers with clear routing to the right tool.

## Page brief 5 — Best Palworld Breeding Combos

Target URL: `/guides/best-palworld-breeding-combos/`
Canonical: `https://palcalculator.com/guides/best-palworld-breeding-combos/`
Index rule: hold as `noindex,follow` or leave out of sitemap until copy_bot has a defensible editorial framework and data/citation plan. Add to sitemap only after review.

Primary keyword:
- best palworld breeding combos

Secondary keywords:
- best breeding combinations palworld 1.0
- best palworld combos
- palworld breeding combos anubis
- palworld breeding combos jetragon
- palworld breeding combos list

Search intent:
- Editorial recommendation intent. Users want shortcuts and popular examples, but the page is riskier because “best” depends on progression, owned Pals, patch version, passives, and player goals.

Page goal:
- If implemented, provide a conservative “how to choose good combos” guide, not unsupported universal rankings.

Proposed title <=60 chars:
- Best Palworld Breeding Combos
  - Length: 30

Meta description <=160 chars:
- Explore useful Palworld breeding combo ideas by goal, with 1.0 data caveats and links to verify routes in PalCalculator.
  - Length: 119

H1:
- Best Palworld Breeding Combos

Section outline:
- Intro: “Best depends on your goal and current Palbox”
- H2: How we define a useful combo
- H2: Early/mid/late-game combo categories, if copy_bot can verify examples
- H2: Popular target examples, with calculator verification links
- H2: Passive planning caveats
- H2: Check the route before committing resources
- FAQ section

FAQ targets:
- What are the best Palworld breeding combos?
- Are best combos the same for every player?
- How do passives change combo choice?
- Should I follow a combo chart or route from owned Pals?
- How often should I recheck combos after updates?

Internal links:
- `/breeding-calculator/`
- `/breeding-route-calculator/`
- `/passive-skill-calculator/`
- `/palworld-1-0-breeding-calculator/`
- `/data-sources/`

Structured data:
- `Article` only. Avoid `ItemList` ranking schema unless the list is genuinely ranked, stable, and supported.

Unique value angle:
- Goal-based and caveated; do not publish as a thin top-10 list unless data/review quality is high.

## Which 3 pages to implement first

Implement first:

1. `/guides/palworld-breeding-combos/`
   - Strongest observed combo/list autosuggest and SERP validation.
   - Cleanly supports the existing breeding calculator.

2. `/guides/palworld-breeding-tree/`
   - Strong observed tree/calculator/guide autosuggest.
   - Differentiates PalCalculator with the route solver and owned-Pal workflow.

3. `/guides/palworld-1-0-breeding-guide/`
   - Strong freshness intent and ties directly to current Palworld 1.0 positioning.
   - Provides the safest trust/data-version bridge between calculator UX and source caveats.

Implement next if bandwidth allows:
- `/guides/palworld-breeding-faq/`

Defer until after copy review:
- `/guides/best-palworld-breeding-combos/`

## Sitemap, index, and canonical rules

General rules:
- Use trailing-slash canonical URLs for all guide pages.
- Each implemented guide page must have one self-referencing canonical URL, e.g. `https://palcalculator.com/guides/palworld-breeding-combos/`.
- Add a page to sitemap only if it is intended to be indexable and has complete visible content.
- Do not add placeholder, draft, duplicate, thin, empty, search-result, share-result, or parameter/state URLs to sitemap.
- Keep `/share/`, generated result paths, and any future user-state URLs out of sitemap. Use `noindex,follow` or 404 where appropriate.
- If a page is merged/consolidated later, use a 301 redirect to the preferred URL or set canonical to the preferred route, but avoid indexing two near-duplicate FAQ pages.
- FAQPage schema may be used only when every Q&A is visible to users on that exact route.
- Article schema can be used on guide pages if the implementation includes stable title/description/date-modified fields.
- Maintain fan-made caveats in visible content and metadata. Avoid “official,” “guaranteed,” “100% accurate,” or “complete special combos” claims.

Suggested first sitemap additions after implementation/review:
- `https://palcalculator.com/guides/palworld-breeding-combos/`
- `https://palcalculator.com/guides/palworld-breeding-tree/`
- `https://palcalculator.com/guides/palworld-1-0-breeding-guide/`

Optional later sitemap addition:
- `https://palcalculator.com/guides/palworld-breeding-faq/`

Hold or noindex until editorial review:
- `https://palcalculator.com/guides/best-palworld-breeding-combos/`

## Acceptance criteria for copy_bot

copy_bot must deliver for each implemented guide page:
- Unique English copy that satisfies the assigned search intent and is not a light rewrite of competitor pages.
- Title tag <=60 characters and meta description <=160 characters.
- One visible H1 matching the page topic.
- Clear first-screen value statement that identifies PalCalculator as an unofficial fan-made Palworld calculator/guide.
- Visible data/version caveat and link to `/data-sources/`.
- No official, guaranteed, 100% accurate, deterministic passive inheritance, or complete special-combo claims.
- At least 5 meaningful H2/H3 sections per guide page.
- At least 4 visible FAQ Q&As per page if FAQ schema is planned.
- Internal links using descriptive anchors to the relevant calculators and `/data-sources/`.
- If examples include specific Pal combos/routes, they must be generated from the current app data or explicitly labelled as examples requiring calculator verification.
- Include AEO-friendly short answer blocks where useful, but do not keyword-stuff.

## Acceptance criteria for frontend_bot

frontend_bot must implement each approved page so that:
- The URL returns HTTP 200 and static initial HTML includes route-specific title, meta description, canonical, robots, H1, and meaningful crawlable body copy before React hydration.
- The canonical URL is self-referencing, HTTPS, apex-domain, and trailing-slash.
- Indexable pages use `index,follow`; draft/deferred pages use `noindex,follow` and are absent from sitemap.
- `dist/sitemap.xml` includes only indexable guide pages and existing indexable pages.
- Internal links are crawlable `<a href="/.../">` anchors, not button-only navigation.
- FAQPage JSON-LD is emitted only for visible FAQ content on the same page.
- 404 behavior remains intact for unknown guide paths and does not reintroduce a broad SPA catch-all.
- Existing calculator routes and current static route generation are not regressed.
- Build/test/lint commands pass after implementation: `npm run test`, `npm run lint`, `npm run build`.

## Suggested handoff notes for implementation tasks

For copy_bot:
- Start with the first 3 pages only.
- Use the page briefs above as route contracts.
- Keep examples conservative and data-version-aware.
- If unsure about a specific combo/route, write the section as “how to verify this in PalCalculator” instead of inventing exact output.

For frontend_bot:
- Extend the existing static route generation approach in `scripts/generate-static-routes.mjs` or the project’s chosen route/content architecture.
- Ensure guide content exists in initial static HTML, not only in client-rendered hidden state.
- Update sitemap generation from the same route metadata source to avoid mismatches.

## Final recommendation

Proceed with the first 3 guide pages:
1. `/guides/palworld-breeding-combos/`
2. `/guides/palworld-breeding-tree/`
3. `/guides/palworld-1-0-breeding-guide/`

These pages expand PalCalculator beyond MVP tool pages while reinforcing the existing calculators, matching observed search intent, and preserving the project’s conservative fan-made/data-caveat positioning.
