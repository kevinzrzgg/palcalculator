# P4 Beginner UX Product Spec — PalCalculator

Project: palcalculator
Owner role: product_bot
Stage: P4 post-launch UX improvement
Artifact path: `/root/projects/palcalculator/artifacts/p4-beginner-ux-product-spec.md`
Date: 2026-07-21

## 1. Product decision

Decision: build a beginner-first UX layer on top of the existing PalCalculator tools so a first-time Palworld player can understand what the site does, choose the right calculator, fill safe example inputs, and interpret the first result without owner explanation.

One-line goal:
A new user should be able to land on the homepage, follow a 3-step “How to use PalCalculator” path, click an example, and understand the result through “This means / Next step / Caveat” copy in under one minute.

Non-negotiable constraints:
- Keep PalCalculator positioned as an unofficial fan-made Palworld calculator hub.
- Do not claim official status, guaranteed outcomes, perfect accuracy, or 100% current data.
- Do not add ads or move calculator controls below SEO copy.
- Do not change sitemap/canonical/indexability decisions for this P4 unless explicitly requested by SEO/owner.
- Do not collect raw user inputs in analytics, including full owned-Pal lists, exact stat values, passive text, share URLs, save data, emails, tokens, or private identifiers.

Primary problem to solve:
Current users can see multiple tools, but beginners may not know:
- What PalCalculator does.
- Which button to click first.
- What “Start,” “Route,” “Pair,” “IV,” “Stats,” or “Passives” mean.
- How to fill Pal names, owned-Pal lists, stats, and desired passives.
- How to interpret a result or decide what to do next.

## 2. Target users and beginner jobs

Primary beginner ICP:
A Palworld player who has heard of breeding, IVs, or passives but does not yet know the calculator vocabulary. They want a practical next action, not a wiki lecture.

Beginner JTBD:
1. “I want a specific Pal, such as Anubis. Tell me where to start.”
2. “I own a few Pals. Tell me whether I can route toward my target.”
3. “I see numbers/passives. Tell me whether the result is useful and what to do next.”
4. “Tell me what is uncertain so I do not waste resources on a false promise.”

## 3. New-user journey in 3 steps

### Step 1 — Homepage: choose a beginner path

Entry point: `/`

User sees a new section near the top of the homepage, directly after the hero/tool picker and before long guide/card content:

Section title:
“How to use PalCalculator”

Section subtitle:
“Pick a goal, try an example, then read what the result means. PalCalculator is a fan-made Palworld helper, so every result includes caveats and data-version notes.”

3 cards:
1. “Pick what you know”
   - Copy: “Know the Pal you want? Start with Route or Parent Pairs. Know two parents? Use Pair to Child. Checking a Pal you already own? Use IV, Stats, or Passives.”
   - CTA: “Help me choose a tool”
   - Behavior: scrolls to tool cards or opens a small tool chooser; no modal required for MVP.
2. “Try a safe example”
   - Copy: “Use prefilled examples like Anubis parent lookup, a route-planning demo, IV/stat bands, or passive planning.”
   - CTA: “Try Anubis example”
   - Behavior: navigates to `/breeding-calculator/` in target-to-parents mode with target example prefilled, or uses current frontend state equivalent.
3. “Read the result”
   - Copy: “Results should tell you: This means..., Next step..., Caveat...”
   - CTA: “See result guide”
   - Behavior: links to the matching guide section or scrolls to example result copy.

Success for Step 1:
The user understands Route = multi-step path from owned Pals, Pair = direct parent/child lookup, IV/Stats = evaluate numbers, Passives = plan desired skills with RNG caveats.

### Step 2 — Tool page: click an example or fill guided inputs

Entry points:
- `/breeding-calculator/`
- `/breeding-route-calculator/`
- `/iv-calculator/`
- `/stats-calculator/`
- `/passive-skill-calculator/`
- `/palworld-1-0-breeding-calculator/`

Every P0 tool page receives an “Examples” row above or inside the calculator panel, not buried below results.

Required pattern:
- A short helper line explaining the tool in beginner language.
- 2–3 example buttons using non-private, non-user-specific values.
- Inline helper text under each input explaining what to type.
- Existing defaults may remain, but the user must see that examples are clickable and editable.

Example button copy format:
- “Try: Anubis parent lookup”
- “Try: route to Anubis from Penking + Bushi”
- “Try: level 50 Anubis IV bands”
- “Try: Artisan + Serious passive plan”

Success for Step 2:
A user can either click an example and see a result, or understand enough helper text to replace example values with their own Pals.

### Step 3 — Result: explain meaning and next action

Every successful or recoverable result gets a beginner interpretation block immediately below the result title/body and above share/copy controls.

Required labels:
- “This means...”
- “Next step...”
- “Caveat...”

The block must be specific to the tool and state. Examples:

Breeding target-to-parents result:
- This means: “The calculator found parent pairs that can lead to Anubis in the current fan-made dataset.”
- Next step: “Pick a pair you already own, or open Route to find a path from your owned Pals.”
- Caveat: “Special-combo overrides and patch changes may affect some results; check the data version before committing resources.”

Route result:
- This means: “This is the shortest route PalCalculator found within your current constraints.”
- Next step: “Breed step 1 first, then use the child as a parent in the next listed step. If too many parents are missing, increase max generations or add more owned Pals.”
- Caveat: “The route is planning guidance, not an official or guaranteed in-game outcome.”

IV/stat result:
- This means: “Your observed stats fall into broad expected bands for the selected Pal and level.”
- Next step: “Check modifiers such as souls, condenser stars, passives, and level before deciding whether to keep or breed this Pal.”
- Caveat: “Rounding and unsupported modifiers can make exact IV values uncertain.”

Passive result:
- This means: “Your desired passives were captured for planning.”
- Next step: “Use this with Route/Pair tools to pick parents, then verify in-game outcomes.”
- Caveat: “Passive inheritance can involve RNG; PalCalculator must not promise deterministic odds unless supported by verified data.”

Success for Step 3:
A beginner can answer: what did I get, what should I do next, and what should I not overtrust?

## 4. Priority UX upgrades

### P4.1 Homepage “How to use PalCalculator” 3-step section

Scope:
- Add a new beginner section on `/` near the top, after hero/tool cards and before guide links or production data copy.
- Use three cards matching Step 1 above.
- Make tool vocabulary explicit:
  - “Route” = “plan steps from Pals you own to a target Pal.”
  - “Pair” = “check what two parents make, or find possible parents for a target.”
  - “IV/Stats” = “estimate stat quality and expected bands.”
  - “Passives” = “plan desired skills with RNG caveats.”

Minimum copy:
- Heading: “How to use PalCalculator”
- Intro: “New to Palworld breeding calculators? Start with a goal, try an example, then read the result notes.”
- Footer note: “Fan-made and unofficial. Results depend on the selected data version and game patches.”

### P4.2 Tool-page example buttons / prefilled examples

Scope:
Add example buttons for every P0 calculator page. Example buttons must set current tool state and fire only safe, aggregate analytics.

Required examples:
1. Breeding calculator
   - “Try: Anubis parent lookup”
     - Mode: target-to-parents
     - Target: Anubis
   - “Try: Penking + Bushi pair”
     - Mode: pair-to-child
     - Parent A: Penking
     - Parent B: Bushi
   - “Try: Jetragon target lookup” if supported by current data; otherwise use a supported high-interest Pal and caveat missing data.

2. Breeding route calculator
   - “Try: route to Anubis from Penking + Bushi”
     - Target: Anubis
     - Owned Pals: Penking, Bushi
     - Max generations: 3
   - “Try: no owned Pals yet”
     - Target: Anubis
     - Owned Pals: empty
     - Purpose: demonstrate missing-parent output.

3. IV calculator
   - “Try: level 50 Anubis IV bands”
     - Pal: Anubis
     - Level: 50
     - Observed HP/Attack/Defense: use current safe defaults if data supports them.
   - “Try: impossible stat check” only if frontend has a clear recoverable error state; otherwise defer.

4. Stats calculator
   - “Try: Anubis expected stats”
     - Pal: Anubis
     - Level: 50
     - Defaults: current HP/Attack/Defense fields or empty observed values if frontend separates expected stats from IV.

5. Passive skill calculator
   - “Try: work-speed passives”
     - Target: Anubis
     - Desired passives: Artisan, Serious
   - “Try: combat passives” only if passive data labels support this; otherwise use generic desired-passive input.

6. 1.0 breeding calculator
   - Reuse breeding examples and add copy: “Same workflow, with Palworld 1.0 data-version notes visible.”

Implementation notes for frontend_bot:
- If URL query-state exists, examples may use URLs; otherwise examples can call local state setters.
- Examples must be editable after click.
- Do not hardcode claims that a pair is special, best, guaranteed, or optimal unless current data proves it.

### P4.3 Clearer input helper text

Add helper text under every input label. Required helper text:

Breeding — Pair to Child:
- Parent A: “Type one Pal you own or want to test, e.g. Penking.”
- Parent B: “Type the second parent, e.g. Bushi.”
- Mode switch: “Use Pair to Child when you know two parents. Use Target to Parents when you know the child you want.”

Breeding — Target to Parents:
- Target child: “Type the Pal you want to breed, e.g. Anubis.”

Route:
- Target Pal: “The Pal you want at the end of the route.”
- Max generations: “Higher can find longer routes, but results may be harder to follow.”
- Owned Pals: “Optional. Paste names you already have, separated by commas or new lines. This stays browser-local in the MVP.”

IV/Stats:
- Pal: “Choose the Pal whose stats you are checking.”
- Level: “Use the in-game level shown for that Pal.”
- Observed HP/Attack/Defense: “Enter visible in-game stats. If souls, condenser stars, passives, or other modifiers apply, read caveats before trusting exact bands.”

Passives:
- Target Pal: “The Pal you eventually want with these passives.”
- Desired passives: “Type passive names separated by commas, e.g. Artisan, Serious.”

### P4.4 Result interpretation copy

Add a reusable result explainer component or per-tool equivalent with exactly these labels:
- “This means...”
- “Next step...”
- “Caveat...”

Acceptance rules:
- It must appear for success and recoverable error/no-result states.
- It must not appear as generic boilerplate only; copy must mention the active tool/result category.
- The caveat must include fan-made/data-version/RNG/formula uncertainty where relevant.
- It must not use banned claims such as “guaranteed,” “official,” “perfect,” or “100% accurate.”

### P4.5 Guide-to-tool CTAs

Current guide pages already have primary and secondary CTAs. P4 makes them beginner-specific.

Upgrade requirements:
- Every guide page should include a CTA panel with:
  - “Try this in the calculator” or more specific equivalent.
  - One sentence explaining which input will be prefilled or what the user should type.
  - A secondary CTA to the related tool.
- Guide CTAs should use example scenarios when relevant:
  - Anubis guide → “Try Anubis parent lookup” and “Plan an Anubis route.”
  - Route examples guide → “Try the route demo.”
  - IV explained guide → “Try level 50 Anubis IV bands.”
  - Passive guide → “Try Artisan + Serious passive plan.”
- If prefilled query parameters are not implemented, CTA copy may say “Open calculator and try: Anubis” rather than pretending prefill exists.

## 5. Example scenarios to include

### Scenario A — Anubis target parent lookup

User story:
“As a beginner who wants Anubis, I need to know whether I should search by target child or by parent pair.”

Tool:
`/breeding-calculator/`

Example state:
- Mode: Target to Parents
- Target: Anubis

Expected beginner explanation:
- This means: “These are parent pairs that can produce Anubis in the current dataset.”
- Next step: “If you own one of these pairs, use it. If not, open Route to see a path from Pals you own.”
- Caveat: “Fan-made data and special-combo handling can change after patches.”

### Scenario B — Route planning example

User story:
“As a beginner with a small Palbox, I need a route from what I own to the target.”

Tool:
`/breeding-route-calculator/`

Example state:
- Target: Anubis
- Owned Pals: Penking, Bushi
- Max generations: 3

Expected beginner explanation:
- This means: “PalCalculator found the shortest route it can find under these constraints.”
- Next step: “Breed the first listed pair, then use the child in the next step if there is one.”
- Caveat: “This is planning guidance; game patches, data coverage, and special-combo rules can change outcomes.”

### Scenario C — IV/stat example

User story:
“As a beginner checking a Pal I caught, I need to know whether the numbers are broadly good or whether modifiers make them uncertain.”

Tools:
`/iv-calculator/` and `/stats-calculator/`

Example state:
- Pal: Anubis
- Level: 50
- Observed stats: current safe defaults used by the frontend, unless frontend_bot separates observed IV inputs from expected stats.

Expected beginner explanation:
- This means: “The stats fall into low/mid/high expected bands for the selected Pal and level.”
- Next step: “Confirm level and modifiers before deciding to keep, breed, or discard.”
- Caveat: “Exact IVs may be uncertain because rounding and modifiers are not fully represented.”

### Scenario D — Passive skill example

User story:
“As a beginner trying to breed a work Pal, I need to plan desired passives without assuming inheritance is guaranteed.”

Tool:
`/passive-skill-calculator/`

Example state:
- Target: Anubis
- Desired passives: Artisan, Serious

Expected beginner explanation:
- This means: “The planner recognized desired passives for the target.”
- Next step: “Use breeding/route tools to choose candidate parents and verify outcomes in game.”
- Caveat: “Passive inheritance can involve RNG; do not claim guaranteed odds without verified support.”

## 6. Analytics events to preserve/add

Preserve existing safe events from the route contract and implementation where present:
- `page_view`
- `tool_success`
- `tool_error`
- share/copy events (`share_copy` currently exists; route contract names may be `copy_result`/`share_result`)
- `share_open` if already implemented

Add or normalize the following P4 events if useful:

1. `beginner_section_view`
   - When: homepage “How to use PalCalculator” section enters viewport, or simpler MVP: on homepage route load with section present.
   - Properties: `page_slug`, `section_id`, `device_type`, `data_version`.
   - Do not include: user-entered values.

2. `beginner_example_click`
   - When: user clicks an example button.
   - Properties: `tool_type`, `example_id`, `example_group`, `page_slug`, `data_version`.
   - Example IDs: `anubis_parent_lookup`, `anubis_route_penking_bushi`, `anubis_iv_level_50`, `artisan_serious_passive_plan`.
   - Do not include: raw owned list, exact custom stat values, free-text passive input.

3. `result_explainer_view`
   - When: result explainer renders after a result or recoverable error.
   - Properties: `tool_type`, `result_state` (`success`, `no_result`, `invalid_input`, `caveated`), `data_version`.
   - Do not include: result details, full pair lists, raw inputs.

4. `internal_nav`
   - When: user clicks guide-to-tool or result-to-next-tool CTA.
   - Properties: `from_page`, `to_page`, `link_context`, `tool_type` where applicable.

5. `tool_start`
   - Existing PRD required it, but current app may only emit success/error after default result. Add a safe start event when a user actively changes an input, clicks calculate, or clicks an example.
   - Properties: `tool_type`, `page_slug`, `start_source` (`manual_input`, `example_button`, `cta`), `data_version`.
   - Do not include raw input values.

Privacy rule:
Analytics can count which example was used and which result state occurred, but must not log the user’s full typed Palbox, exact stat fields, desired passive text, query string, share URL, or save/import content.

## 7. Exact acceptance criteria for copy_bot

copy_bot must deliver final English UX copy for the homepage, tool helper text, result interpretation blocks, and guide-to-tool CTAs.

Required copy_bot acceptance criteria:
1. Homepage includes a “How to use PalCalculator” section with exactly three beginner steps: choose goal, try example, read result.
2. Copy explains Route, Pair, IV/Stats, and Passives in beginner language without assuming prior calculator knowledge.
3. Tool-page helper text exists for every input listed in section 4.3.
4. Every tool has at least two example button labels; breeding/route/IV/passives must include Anubis or the closest supported high-intent target.
5. Result copy uses the exact labels “This means...”, “Next step...”, and “Caveat...” for success and recoverable no-result/error states.
6. Result copy never uses banned claims: official, endorsed, approved, guaranteed, perfect, 100% accurate, always current, best in all cases.
7. Copy preserves fan-made/unofficial caveats and visible data-version uncertainty.
8. Guide CTA copy is specific to the guide, not generic “click here.”
9. Copy avoids ads, monetization promises, or affiliate language.
10. Copy is short enough for mobile: helper text should generally be one sentence; result explanation bullets should be scannable.
11. Copy distinguishes “example” from “recommended best path” so users do not interpret examples as universal advice.
12. Copy marks unsupported or uncertain logic transparently rather than filling gaps with guesses.

copy_bot deliverable:
- A copy deck or patch-ready copy table with route, component/section, current/new copy, and notes.

## 8. Exact acceptance criteria for frontend_bot

frontend_bot must implement the UX upgrade without breaking current routes, data caveats, analytics privacy, or static build behavior.

Required frontend_bot acceptance criteria:
1. `/` renders a visible “How to use PalCalculator” 3-step section on desktop and mobile.
2. The homepage section appears before long guide content and does not push core tool entry points below a confusing wall of SEO text.
3. Each P0 tool page renders an Examples row with accessible buttons.
4. Clicking an example updates the relevant tool state and displays a result or recoverable caveated state without page reload.
5. Example state remains editable after click.
6. Breeding example supports target-to-parents for Anubis and pair-to-child for Penking + Bushi, unless current data proves a safer supported replacement is needed and documented.
7. Route example supports target Anubis, owned Pals Penking/Bushi, and max generations 3.
8. IV/stat example supports Anubis level 50 with safe defaults or clearly separated expected-stat mode.
9. Passive example supports Anubis with Artisan, Serious as desired passives where present in passive data; otherwise use supported passives and document replacement.
10. Inputs include visible helper text and retain accessible labels.
11. Results include a visible interpretation block with “This means...”, “Next step...”, and “Caveat...” for success and recoverable error/no-result states.
12. Result copy appears before share/copy controls so users understand what they are sharing.
13. Guide pages include beginner-specific guide-to-tool CTAs; if prefilled query parameters are not implemented, CTA copy must not imply prefill.
14. Analytics preserves existing safe events and adds P4 events only with allowlisted aggregate properties.
15. Analytics does not log raw inputs, exact owned-Pal lists, exact stat values, desired passive free text, query strings, share URLs, save/import content, secrets, or emails.
16. Existing canonical tags, sitemap entries, robots behavior, data-source links, privacy/terms links, and fan-site disclaimer remain intact.
17. No ads or monetization blocks are added.
18. Mobile QA confirms no horizontal scroll, hidden controls, or inaccessible example buttons at common widths around 360px and 390px.
19. Keyboard QA confirms example buttons, inputs, mode switch, result links, and guide CTAs are reachable and understandable.
20. `npm run test`, `npm run lint`, and `npm run build` pass after implementation.

frontend_bot deliverable:
- Patch implementing components/copy wiring.
- Test/build/lint output summary.
- Notes on any example substitutions caused by current data support.

## 9. QA checklist

### Desktop and mobile beginner flow

- [ ] Desktop homepage: user can identify what PalCalculator does without reading guide pages.
- [ ] Mobile homepage: “How to use PalCalculator” is visible and scannable without horizontal scroll.
- [ ] User can explain Route vs Pair after reading the section.
- [ ] User can click an example and see a result/caveated state.
- [ ] User can edit example values after clicking.
- [ ] Mode switch labels are understandable: Pair to Child and Target to Parents.
- [ ] Route page explains target, owned Pals, and max generations.
- [ ] IV/stat pages explain observed stats and modifier caveats.
- [ ] Passive page explains RNG/inheritance caveats.

### Result comprehension

- [ ] Every successful result includes “This means...”, “Next step...”, and “Caveat...”.
- [ ] Recoverable errors/no-result states tell the user what to try next.
- [ ] Share/copy controls appear after the user can understand the result.
- [ ] Caveats mention fan-made/data-version/formula/RNG uncertainty as appropriate.
- [ ] No official/guaranteed/perfect/100% claims appear.

### SEO, legal, and privacy preservation

- [ ] No ads are added.
- [ ] Footer fan-site disclaimer remains visible.
- [ ] `/data-sources/`, `/privacy/`, and `/terms/` links remain available.
- [ ] Existing canonical URLs remain self-referencing and trailing-slash based.
- [ ] `public/sitemap.xml` and generated `dist/sitemap.xml` remain unchanged unless a separate SEO task approves changes.
- [ ] Robots/noindex behavior for share/result state remains unchanged.
- [ ] Guide-to-tool CTAs do not create thin new indexable pages.
- [ ] Analytics payload review confirms no raw inputs are collected.

### Regression checks

- [ ] `npm run test` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Manual spot check on `/`, `/breeding-calculator/`, `/breeding-route-calculator/`, `/iv-calculator/`, `/stats-calculator/`, `/passive-skill-calculator/`, and one guide page.
- [ ] Browser console has no new runtime errors during example clicks.

## 10. Suggested implementation sequence

1. copy_bot creates final copy table for homepage, input helpers, examples, result interpretation, and guide CTAs.
2. frontend_bot adds small reusable components:
   - `BeginnerHowToSection`
   - `ExampleButtons` or per-tool example row
   - `InputHelpText` pattern if not already in field labels
   - `ResultExplainer`
3. frontend_bot wires example button state setters and safe analytics.
4. frontend_bot updates guide CTA copy without changing route/index contracts.
5. QA verifies beginner journey, mobile, accessibility, analytics privacy, and build/test/lint.

## 11. Downstream handoff summary

Status: DONE for product spec.

Must-read files for downstream agents:
- `/root/projects/palcalculator/artifacts/p4-beginner-ux-product-spec.md`
- `/root/projects/palcalculator/artifacts/prd.md`
- `/root/projects/palcalculator/artifacts/route-contract.md`
- `/root/projects/palcalculator/artifacts/compliance.md`
- `/root/projects/palcalculator/src/main.tsx`
- `/root/projects/palcalculator/src/calculators.ts`

Do not assume:
- Example scenarios are official recommendations.
- Special combos are fully supported in the current MVP data.
- Query prefill already exists.
- Analytics provider is finalized.
- Raw user inputs are safe to log.

Recommended next tasks:
- copy_bot: produce patch-ready beginner UX copy table.
- frontend_bot: implement P4 beginner examples/result explainer/components after copy is ready.
- qa_bot: run desktop/mobile beginner-flow QA and analytics payload inspection after implementation.

[DONE]
