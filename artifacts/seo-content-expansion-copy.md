# PalCalculator SEO Content Expansion Copy — Batch 1

Project: PalCalculator
Site: https://palcalculator.com
Owner profile: copy_bot
Status: DONE copy artifact
Required downstream artifact: `/root/projects/palcalculator/artifacts/seo-content-expansion-copy.md`

## Copy guardrails for frontend_bot

Use these blocks as production-ready English page copy for the first three SEO guide pages. Keep the wording visible in static HTML, not hidden behind interaction-only UI.

Global rules:
- PalCalculator is an unofficial fan-made Palworld calculator and guide site.
- Results depend on the selected data version, current app dataset, and supported formula/combo rules.
- Do not rewrite this copy into certainty claims about promised outcomes, instant freshness, certain passive outcomes, perfect accuracy, or exhaustive special-combo data.
- Use FAQPage schema only when the matching FAQ text is visible on the same route.
- Keep all internal links as crawlable `<a href="/.../">` links.

---

## Page 1: `/guides/palworld-breeding-combos/`

Canonical URL: `https://palcalculator.com/guides/palworld-breeding-combos/`
Robots: `index,follow` after implementation review
Recommended schema: `Article` plus `FAQPage` only for visible Q&A

### SEO metadata

Title tag:
Palworld Breeding Combos Guide

Meta description:
Learn Palworld breeding combos, parent-pair lookup, 1.0 caveats, and when to use PalCalculator's fan-made breeding tools.

OG title:
Palworld Breeding Combos Guide

OG description:
Use PalCalculator to understand Palworld breeding combinations, check parent pairs, review 1.0 caveats, and move from combo ideas to calculator workflows.

### H1

Palworld Breeding Combos Guide

### Intro / first-screen copy

Palworld breeding combos are useful when you want a quick answer: which child comes from two parents, or which parent pairs can lead to the Pal you want. PalCalculator turns that combo intent into a calculator workflow, so you can check parent pairs, review data-version notes, and move into route planning when one direct pair is not enough.

PalCalculator is an unofficial fan-made Palworld tool. Use the copy below as guidance, then verify specific parent pairs in the calculator because patches, special-combo rules, and data-source updates can change what a result means.

Primary CTA: Calculate breeding
Secondary CTA: Use the 1.0 breeding calculator

CTA link targets:
- Calculate breeding: `/breeding-calculator/`
- Use the 1.0 breeding calculator: `/palworld-1-0-breeding-calculator/`

### Section 1 — What are Palworld breeding combos?

A Palworld breeding combo is a parent-pair relationship that helps you answer one of two questions: “If I breed these two Pals, what child should I check?” or “If I want this target Pal, which parent pairs should I review?”

For planning, the second question is usually more useful. A combo list can show possibilities, but a calculator can help you filter the list, switch between pair-to-child and target-to-parent views, and keep version caveats close to the result.

Short answer block:
A breeding combo is a parent-child lookup, not a full breeding plan. If you need multiple generations, use a route calculator instead of treating one combo as the whole answer.

### Section 2 — Parent pair to child vs target child to parent pairs

There are two common ways to use breeding combo data.

Parent pair to child:
Use this when you already have two Pals and want to check what child the selected dataset returns. This is the quickest mode when you are cleaning up a Palbox, comparing possible breeders, or checking a specific pair before spending resources.

Target child to parent pairs:
Use this when you know the Pal you want and need parent-pair options. This mode is better for planning because it starts from your goal and shows possible combinations to investigate.

PalCalculator should make both modes clear. A user looking for a “Palworld breeding combos list” may actually need a target search, not a static chart.

### Section 3 — How to check a combo in PalCalculator

Use this workflow for specific combos:

1. Open the Palworld breeding calculator at `/breeding-calculator/`.
2. Choose the mode that matches your question: pair-to-child if you have two parents, or target-to-parent if you know the Pal you want.
3. Enter the Pal names using the selector suggestions when possible.
4. Review the returned child or parent pairs.
5. Check the data-version note and any special-combo caveat near the result.
6. If the result is part of a longer plan, open the breeding route calculator and plan the steps from your owned Pals.

Inline caveat:
If a Pal name, alias, pair, or special combo is missing, treat the result as unavailable for the current dataset rather than filling the gap with a guess.

### Section 4 — Palworld 1.0 combo caveats

Palworld 1.0 searches often include freshness intent. Players want to know whether a combo is current, whether special combinations are represented, and why two sites may not show the same answer.

Use these caveats on the page:
- PalCalculator uses fan-made data and selected data-version notes.
- Patches can change breeding behavior or expose conflicts between datasets.
- Normal breeding formula results and special-combo overrides should be labelled separately where the app supports them.
- Different websites can disagree when they update at different times, include different special-combo assumptions, or handle missing data differently.

Do not present this page as a complete combo database. Its unique role is to explain how to verify combos in PalCalculator and when to move from a static list mindset to an interactive calculator.

### Section 5 — Example combo workflows

Use examples as workflows, not as unsupported exact combo claims.

Example workflow A: “I have two parents. What child do I get?”
Open the breeding calculator, choose pair-to-child mode, select Parent Pal A and Parent Pal B, then review the child result with its combo type and data-version note. If the result looks unexpected, check whether a special-combo note is shown.

Example workflow B: “I want Anubis, Jetragon, Orserk, or another target Pal. Which parent pairs should I check?”
Open target-to-parent mode, search for the target Pal, then review available parent pairs. Use filters or route planning if the list is too broad or if you do not own the listed parents.

Example workflow C: “I found a combo chart. Should I trust it?”
Use the chart as a starting point, then verify the pair in PalCalculator and compare the visible data-version notes. If the sources disagree, prefer the workflow that shows caveats and unsupported states instead of silent certainty.

### Section 6 — When to use the route calculator instead

A single breeding combo is not enough when you need a multi-step path. If you know your current Palbox and want to reach a target Pal through several generations, use the breeding route calculator.

The route calculator is the better next step when:
- You do not own either parent in a direct pair.
- You want the shortest practical path from owned Pals.
- You need to see missing Pals or alternative route steps.
- You are planning passives and want breeding steps plus RNG caveats.

CTA block:
Headline: Turn a combo idea into a breeding plan
Body: Start with a parent pair or target Pal, then move into route planning when the combo becomes a multi-generation path.
Primary CTA: Open the Palworld breeding calculator
Primary CTA URL: `/breeding-calculator/`
Secondary CTA: Find a breeding route
Secondary CTA URL: `/breeding-route-calculator/`

### Internal link suggestions

- Link to `/breeding-calculator/` with anchor “Palworld breeding calculator”.
- Link to `/palworld-1-0-breeding-calculator/` with anchor “Palworld 1.0 breeding calculator”.
- Link to `/breeding-route-calculator/` with anchor “breeding route calculator”.
- Link to `/passive-skill-calculator/` with anchor “passive skill planner”.
- Link to `/data-sources/` with anchor “data sources and update policy”.

### FAQ

Q: What is a breeding combo in Palworld?
A: A breeding combo is a parent-pair relationship used to check a child result or find possible parents for a target Pal. It is useful for direct lookups, but it is not the same as a full multi-generation breeding route.

Q: Is PalCalculator an official Palworld breeding combo source?
A: No. PalCalculator is an unofficial fan-made calculator and guide site. Use its visible data-version notes and caveats when checking any result.

Q: Does PalCalculator include Palworld 1.0 breeding combos?
A: PalCalculator is built around selected Palworld 1.0 breeding workflows where the current dataset supports them. Check the 1.0 calculator and data-source notes before relying on a specific combo.

Q: Why do different Palworld breeding combo charts disagree?
A: Charts can differ because of patch timing, data-source choices, special-combo handling, aliases, or missing data. When results disagree, verify the pair in a calculator that shows version and caveat notes.

Q: Can a breeding combo guarantee passive skills?
A: No. A parent pair can help with breeding planning, but passive inheritance can involve RNG and supported-data limits. Use the passive skill planner for caveated guidance instead of treating a combo as a certainty.

Q: Should I use a combo list or a breeding route calculator?
A: Use a combo list or breeding calculator for direct parent-child questions. Use a route calculator when you need multiple generations, owned-Pal planning, missing-Pal notes, or alternatives.

Q: What should I do if a Pal or combo is missing?
A: Check spelling, use selector suggestions, remove filters, and review the data-source notes. If the current dataset does not support the result, the page should show an unavailable state rather than inventing an answer.

---

## Page 2: `/guides/palworld-breeding-tree/`

Canonical URL: `https://palcalculator.com/guides/palworld-breeding-tree/`
Robots: `index,follow` after implementation review
Recommended schema: `Article` plus `FAQPage` only for visible Q&A

### SEO metadata

Title tag:
Palworld Breeding Tree Guide

Meta description:
Understand Palworld breeding trees, route steps, owned-Pal paths, and how PalCalculator finds caveated breeding routes.

OG title:
Palworld Breeding Tree Guide

OG description:
Learn how Palworld breeding trees work, when a direct combo becomes a route, and how to use PalCalculator's route solver with owned-Pal and data-version caveats.

### H1

Palworld Breeding Tree Guide

### Intro / first-screen copy

A Palworld breeding tree is a route, not just one combo. Instead of checking a single parent pair, a tree shows how multiple breeding steps can connect the Pals you already have to the target Pal you want.

PalCalculator is an unofficial fan-made Palworld calculator. Its route tools are designed to help you plan with visible constraints, missing-Pal notes, and data-version caveats rather than hiding uncertainty behind a static chart.

Primary CTA: Find shortest route
Secondary CTA: Check direct combos

CTA link targets:
- Find shortest route: `/breeding-route-calculator/`
- Check direct combos: `/breeding-calculator/`

### Section 1 — What a Palworld breeding tree means

A breeding tree is a step-by-step path from available parents to a target Pal. Each step produces a child that may become a parent in the next generation. That makes a tree useful when your goal cannot be reached with one simple pair from your current Palbox.

A direct combo answers: “What does this pair make?”
A breeding tree answers: “How do I get from what I own to what I want?”

Short answer block:
Use a breeding tree when the important question is the path. Use a direct breeding combo when the important question is one parent pair.

### Section 2 — Direct combo vs multi-generation route

A direct combo can be enough when you already own both parents and only need to verify the child result. A multi-generation route becomes useful when one of those parents is missing, when several intermediate Pals are required, or when you want to compare practical paths.

Common direct-combo tasks:
- Check a child from two selected parents.
- Find parent-pair options for one target Pal.
- Confirm whether a special-combo note applies.

Common route/tree tasks:
- Start from your owned Pals.
- Set a target Pal.
- Limit max generations.
- Review missing Pals and alternative route steps.
- Decide whether the route is practical before breeding.

### Section 3 — How PalCalculator builds route steps

The breeding route calculator should take the user’s constraints and search the current dataset for supported paths. The route result should be readable without needing a separate chart.

Expected route inputs:
- Target Pal.
- Owned Pals or current Palbox list.
- Max generations.
- Optional exclusions or constraints where supported.
- Data version and special-combo setting where supported.

Expected route output copy:
- Route found for selected dataset and constraints.
- Step-by-step breeding plan.
- Generation count.
- Missing Pals if the route requires something you did not list.
- Alternative routes where supported.
- Caveats for unsupported or uncertain data.

Keep owned-Pal handling browser-first at MVP unless a later feature explicitly says otherwise.

### Section 4 — Example route-tree format

Use a text-first format that frontend_bot can render as cards or ordered steps. Do not insert unsupported exact Pal routes unless they are generated from current app data.

Example layout:

Route summary:
Target Pal: [Target Pal]
Dataset: [Selected Palworld data version]
Constraints: [Owned Pals, max generations, filters]
Result status: Route found / No route found / Missing data

Step 1:
Parent A: [Owned or required Pal]
Parent B: [Owned or required Pal]
Child: [Intermediate Pal]
Note: [Owned, missing, special-combo, or caveat note]

Step 2:
Parent A: [Intermediate Pal]
Parent B: [Owned or required Pal]
Child: [Target Pal]
Note: [Generation and caveat note]

If the current app cannot verify the example, keep placeholders in implementation docs but not in visible production content. Visible examples should explain the format, not pretend to be a verified route.

### Section 5 — When a route may not be available

A route result may be unavailable for normal reasons. The page should help users interpret those states instead of treating them as errors.

A route may not appear when:
- The target Pal name or alias is not matched.
- The generation limit is too strict.
- The owned-Pal list is too small.
- A required special combo is not supported by the current dataset.
- The selected filters exclude needed parents.
- Data is missing, uncertain, or not yet represented in the app.

Helpful fallback copy:
No route found for this data version and constraint set. Try increasing max generations, removing exclusions, checking Pal names, or reviewing the data-source notes.

### Section 6 — Passive and IV caveats inside breeding trees

A breeding tree can tell you a possible path, but it should not promise ideal passives or perfect stats. Passive inheritance can involve RNG, and IV/stat planning depends on supported formulas, observed stats, and modifiers.

After finding a route, users may want to:
- Open the passive skill planner to check desired-passive assumptions.
- Use the IV calculator before deciding whether a breeder Pal is worth keeping.
- Use the stats calculator to compare expected stat bands.
- Recheck data-source notes after patches.

CTA block:
Headline: Build the route from the Pals you already own
Body: Add your owned Pals, choose a target, and review the best route found for the current dataset and constraints.
Primary CTA: Open the breeding route calculator
Primary CTA URL: `/breeding-route-calculator/`
Secondary CTA: Plan passives next
Secondary CTA URL: `/passive-skill-calculator/`

### Internal link suggestions

- Link to `/breeding-route-calculator/` with anchor “Palworld breeding route calculator”.
- Link to `/breeding-calculator/` with anchor “direct breeding combo calculator”.
- Link to `/passive-skill-calculator/` with anchor “passive skill planner”.
- Link to `/iv-calculator/` with anchor “IV calculator”.
- Link to `/data-sources/` with anchor “data version notes”.

### FAQ

Q: What is a Palworld breeding tree?
A: A Palworld breeding tree is a multi-step route that shows how parent pairs can lead from available Pals to a target Pal. It is most useful when one direct combo is not enough.

Q: Is a breeding tree the same as a breeding combo?
A: No. A combo is one parent-pair relationship, while a tree can include several generations and intermediate Pals. Use a route calculator when you need the path, not just one pair.

Q: Can PalCalculator use my owned Pals for a route?
A: The route calculator is designed around owned-Pal planning where the current app supports it. MVP copy should keep owned-Pal inputs browser-first unless a later feature clearly states otherwise.

Q: Why does a breeding route show missing Pals?
A: A missing-Pal note means the route may require a parent or intermediate Pal outside the list you provided. Use it to decide whether to catch, breed, trade for, or route around that missing requirement.

Q: Can a breeding tree guarantee passives?
A: No. A breeding tree can organize the path, but passive inheritance can involve RNG and supported-data limits. Use passive planning notes as guidance, not as a certainty claim.

Q: How many generations should I allow?
A: Start with a smaller generation limit if you want a simple route, then increase it if no path appears. Larger limits may find more options but can also produce routes that are less practical to execute.

Q: What should I do if no route appears?
A: Check spelling, add more owned Pals, relax filters, increase max generations, and review data-version notes. If data is unsupported, PalCalculator should say that clearly instead of making up a route.

---

## Page 3: `/guides/palworld-1-0-breeding-guide/`

Canonical URL: `https://palcalculator.com/guides/palworld-1-0-breeding-guide/`
Robots: `index,follow` after implementation review
Recommended schema: `Article` plus `FAQPage` only for visible Q&A

### SEO metadata

Title tag:
Palworld 1.0 Breeding Guide

Meta description:
Use this Palworld 1.0 breeding guide to check combos, routes, data-version notes, and fan-made calculator caveats.

OG title:
Palworld 1.0 Breeding Guide

OG description:
Use PalCalculator's fan-made Palworld 1.0 breeding workflows to check parent pairs, target parents, route steps, passives, and data-version caveats.

### H1

Palworld 1.0 Breeding Guide

### Intro / first-screen copy

Palworld 1.0 breeding searches usually have one hidden question: “Is this information updated enough for the plan I am about to follow?” This guide explains how to use PalCalculator’s 1.0 breeding workflows while keeping data-version notes, unsupported states, and fan-made caveats visible.

PalCalculator is an unofficial fan-made Palworld calculator. It can help you check parent pairs, target-parent options, route steps, IV/stat planning, and passive notes where the selected dataset supports those workflows.

Primary CTA: Use 1.0 calculator
Secondary CTA: View data sources

CTA link targets:
- Use 1.0 calculator: `/palworld-1-0-breeding-calculator/`
- View data sources: `/data-sources/`

### Section 1 — What this guide covers

This guide is for players who want a version-aware breeding workflow, not a static promise that every possible interaction is covered. Use it to decide which PalCalculator tool fits your current question.

Use the 1.0 breeding calculator when:
- You want to check a parent pair.
- You want possible parents for a target Pal.
- You are comparing 1.0-focused combo information.
- You need special-combo caveats near the result.

Use the route calculator when:
- You need multiple generations.
- You want to start from owned Pals.
- You need missing-Pal or alternative-route notes.

Use passive, IV, or stats calculators when:
- The route exists, but you still need to decide which breeder is worth using.
- You want passive planning guidance with RNG caveats.
- You want stat or IV ranges where formulas support them.

### Section 2 — How Palworld 1.0 breeding data is handled in PalCalculator

PalCalculator copy should frame 1.0 data as selected, visible, and caveated. The page should show users where data-version notes live and what to do when a result is missing or uncertain.

Production copy for the data note:
Calculator results depend on the selected Palworld data version and supported source categories. Patches can change breeding, stats, and passive behavior, so check the data-source page before relying on a long route or expensive breeding plan.

Use this page to link consistently to `/data-sources/` with the anchor “PalCalculator data sources”.

Do not imply instant data refreshes. Do not imply every special combo is covered. Do not imply passive outcomes are certain.

### Section 3 — Use case 1: check parent pair results

If you already have two parents, start with a direct pair lookup.

Workflow:
1. Open `/palworld-1-0-breeding-calculator/`.
2. Choose pair-to-child mode if the UI separates modes.
3. Enter Parent Pal A and Parent Pal B.
4. Review the returned child, combo type, and data-version note.
5. If the result conflicts with another source, compare patch timing, special-combo notes, and unsupported-data states.

Short answer block:
A parent-pair result is a lookup for the selected dataset. If you need a practical path from your Palbox, send the target Pal to the route calculator.

### Section 4 — Use case 2: find parents for a target Pal

If you know the Pal you want, use target-to-parent search instead of scanning a long combo list manually.

Workflow:
1. Choose target-to-parent mode.
2. Search the target Pal by name.
3. Review candidate parent pairs.
4. Check whether any pair depends on special-combo rules.
5. Use route planning if you do not own the needed parents.

This workflow is safer than relying on one saved chart because it keeps the result tied to the app’s selected data version and caveat language.

### Section 5 — Use case 3: plan a route from owned Pals

A Palworld 1.0 combo can become a multi-step route quickly. If you do not own the direct parents for a target Pal, open the breeding route calculator.

Route workflow:
1. Add or paste owned Pals where supported.
2. Choose the target Pal.
3. Set max generations and any supported constraints.
4. Review the best route found for the current dataset and constraints.
5. Check missing-Pal notes and alternatives before committing resources.

Helpful copy for route result pages:
This route is based on the selected dataset and your current constraints. If no route appears, try relaxing filters, increasing max generations, adding more owned Pals, or reviewing the data-source notes.

### Section 6 — Use case 4: plan passives without overpromising RNG

Breeding guides often blur the line between reaching a target Pal and getting ideal passives. PalCalculator should keep those tasks separate.

Use the passive skill calculator after you have a target or route idea. Select desired passives, review candidate planning notes where supported, and keep RNG caveats visible. The tool should not promise exact passive odds or certain inheritance.

Use IV and stats tools when you are deciding whether a parent is worth keeping. Outputs should show ranges, formula assumptions, and unsupported modifier caveats when those matter.

### Section 7 — Data freshness, unsupported states, and corrections

A good 1.0 breeding guide should show what the tool knows and what it does not know.

Use this production copy near the bottom of the page:
PalCalculator is maintained as a fan-made planning tool. If a result is unavailable, conflicted, or not supported by the current dataset, the page should show that state directly. Before following a long route, review the data-source page for version notes, included source categories, unsupported areas, and the correction path.

Correction CTA:
Think a result is wrong? Review the data-source notes first, then use the listed correction path when available.

### Section 8 — Common mistakes when using 1.0 breeding guides

Mistake 1: Treating a saved combo chart as current forever.
Better approach: Verify the pair in a calculator that shows selected data version and caveats.

Mistake 2: Confusing a direct combo with a full route.
Better approach: Use direct breeding lookup for one pair and route planning for multi-generation paths.

Mistake 3: Assuming passives are solved by the same combo.
Better approach: Use passive planning as a separate step with RNG caveats.

Mistake 4: Ignoring unsupported or missing data states.
Better approach: Treat missing results as a signal to check filters, spelling, generation limits, or data-source notes.

Mistake 5: Comparing different websites without checking patch timing.
Better approach: Look for visible update notes before trusting a result for a resource-heavy plan.

CTA block:
Headline: Check 1.0 breeding results with caveats visible
Body: Use the 1.0 breeding calculator for parent pairs, then move to route, passive, IV, or stats tools when the plan needs more detail.
Primary CTA: Use the Palworld 1.0 breeding calculator
Primary CTA URL: `/palworld-1-0-breeding-calculator/`
Secondary CTA: Read data-source notes
Secondary CTA URL: `/data-sources/`

### Internal link suggestions

- Link to `/palworld-1-0-breeding-calculator/` with anchor “Palworld 1.0 breeding calculator”.
- Link to `/breeding-calculator/` with anchor “parent-pair breeding calculator”.
- Link to `/breeding-route-calculator/` with anchor “route calculator”.
- Link to `/passive-skill-calculator/` with anchor “passive skill calculator”.
- Link to `/iv-calculator/` with anchor “IV calculator”.
- Link to `/stats-calculator/` with anchor “stats calculator”.
- Link to `/data-sources/` with anchor “PalCalculator data sources”.

### FAQ

Q: Is PalCalculator updated for Palworld 1.0?
A: PalCalculator includes 1.0-focused breeding workflows where the selected dataset supports them. Always check the visible data-version and data-source notes before relying on a specific result.

Q: What does PalCalculator mean by fan-made data?
A: It means PalCalculator is an independent player-focused tool, not a rights-holder source. Results should be read with the site’s version notes, source categories, and caveats.

Q: Does the 1.0 calculator include special combos?
A: Special combos should be shown where the current dataset supports them, with clear labels and caveats. If a special combo is unsupported or missing, the tool should show that state instead of guessing.

Q: Why should I check data version before using a breeding guide?
A: Palworld patches can change mechanics or make older guides less useful. Data-version notes help you judge whether a result fits the current calculator dataset.

Q: Can Palworld 1.0 breeding guarantee passives?
A: No. Passive inheritance can involve RNG and supported-data limits. Use the passive skill calculator for planning guidance while keeping caveats visible.

Q: Where can I report a data correction?
A: Use the correction path listed on the data-source page when available. If the page does not yet list a contact or issue path, treat that as a launch blocker for correction workflow copy.

Q: Which calculator should I use first?
A: Use the 1.0 breeding calculator for direct parent-pair or target-parent questions. Use the route calculator when you need a multi-generation path from owned Pals.

---

## Frontend handoff checklist

For each implemented guide page:
- [ ] Route returns HTTP 200.
- [ ] Static initial HTML includes route-specific title, meta description, canonical, robots, H1, intro, body sections, FAQ, and crawlable links.
- [ ] The visible first-screen copy identifies PalCalculator as an unofficial fan-made Palworld tool.
- [ ] A visible data/version caveat links to `/data-sources/`.
- [ ] FAQPage JSON-LD is used only if the exact Q&A appears visibly on the same route.
- [ ] Sitemap includes only reviewed indexable guide pages.
- [ ] The implementation avoids certainty claims and does not imply affiliation.

## Copy self-check

- Pages delivered: 3
- Target routes:
  - `/guides/palworld-breeding-combos/`
  - `/guides/palworld-breeding-tree/`
  - `/guides/palworld-1-0-breeding-guide/`
- Each page includes title, meta description, H1, intro, 6–8 sections, FAQ 7 Q&A, internal links, CTA blocks, fan-made/data caveats, and frontend-ready content blocks.
- No specific breeding combo or route output is invented.
- No promise of perfect accuracy, certain passive inheritance, instant freshness, or exhaustive special-combo data is made.
