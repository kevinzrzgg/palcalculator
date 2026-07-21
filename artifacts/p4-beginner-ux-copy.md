# P4 Beginner UX Copy Deck — PalCalculator

Project: palcalculator
Owner role: copy_bot
Stage: P4 beginner UX upgrade
Artifact path: `/root/projects/palcalculator/artifacts/p4-beginner-ux-copy.md`
Source spec: `/root/projects/palcalculator/artifacts/p4-beginner-ux-product-spec.md`
Status: DONE copy artifact
Date: 2026-07-21

## 1. Copy guardrails for frontend_bot

Use these as exact English strings for implementation. Keep labels and helper text visible near the controls they explain. Do not rewrite caveats into certainty claims.

Global rules:
- PalCalculator is a fan-made Palworld calculator hub.
- Treat examples as editable demos, not recommended best paths.
- Results depend on selected data, formula support, special-combo handling, and game patches.
- Do not imply examples are private recommendations, platform guidance, complete certainty, fixed passive odds, or exhaustive data coverage.
- Do not log raw owned-Pal lists, exact stat fields, free-text passive input, share URLs, emails, tokens, or save data in analytics.
- Keep helper text to one short sentence on mobile where possible.

Preferred words:
- fan-made
- selected data version
- current dataset
- planning guidance
- caveat
- editable example
- browser-local
- route found
- stat bands
- recognized passives

Avoid in UI claims:
- affiliation language
- certainty language
- absolute accuracy language
- always-fresh data language
- universal-best-path language
- fixed passive-odds language
- exhaustive database language

---

## 2. Homepage 3-step section

Route: `/`
Placement: near the top of the homepage after the hero/tool cards and before long guide content.
Component suggestion: `BeginnerHowToSection`

### Section strings

Section eyebrow:
Beginner path

Section heading:
How to use PalCalculator

Section intro:
New to Palworld breeding calculators? Start with a goal, try an editable example, then read the result notes before spending resources.

Section subtitle / supporting copy:
Pick what you know now. PalCalculator can help with parent pairs, multi-step routes, IV/stat checks, and passive planning while keeping fan-made data caveats visible.

Footer note:
Fan-made Palworld helper. Results depend on the selected data version, supported formulas, special-combo handling, and game patches.

### Card 1 — choose goal

Card number:
1

Card title:
Choose your goal

Card body:
Know the Pal you want? Start with Route or Target to Parents. Know two parents? Use Pair to Child. Checking a Pal you own? Use IV, Stats, or Passives.

CTA label:
Help me choose a tool

CTA title / aria-label:
Jump to the PalCalculator tool cards

Vocabulary note:
Route = plan steps from Pals you own to a target Pal. Pair = check what two parents make, or find possible parents for a target child. IV/Stats = estimate stat quality and expected bands. Passives = plan desired skills with RNG caveats.

### Card 2 — try example

Card number:
2

Card title:
Try an example

Card body:
Use safe prefilled examples like Anubis parent lookup, a route demo, level 50 stat bands, or Artisan + Serious passive planning.

CTA label:
Try Anubis example

CTA title / aria-label:
Open an editable Anubis parent lookup example

Example note:
Examples are demos you can edit. They are not claims about the best path for every player.

### Card 3 — read result

Card number:
3

Card title:
Read what it means

Card body:
After a result appears, check the beginner notes: This means..., Next step..., and Caveat....

CTA label:
See result guide

CTA title / aria-label:
Learn how to read PalCalculator result notes

Result note:
Use the result as planning guidance, then verify caveats before committing rare Pals or resources.

---

## 3. Tool chooser helper copy

Use if frontend_bot adds a small chooser or scroll target from the homepage card.

Chooser heading:
Which tool should I use?

Chooser intro:
Choose the calculator that matches the question you can answer right now.

Option: Breeding Calculator
Question:
I know two parents, or I know the child I want.

Answer:
Use Breeding to check a direct parent/child relationship.

CTA label:
Open Breeding Calculator

Option: Breeding Route Calculator
Question:
I know my target Pal and some Pals I already own.

Answer:
Use Route to plan possible steps from your owned Pals to the target.

CTA label:
Open Route Calculator

Option: IV Calculator
Question:
I caught or bred a Pal and want to judge visible stats.

Answer:
Use IV to estimate broad stat quality from level and observed stats.

CTA label:
Open IV Calculator

Option: Stats Calculator
Question:
I want expected HP, Attack, or Defense bands for a Pal.

Answer:
Use Stats to compare broad expected stat bands for the selected Pal and level.

CTA label:
Open Stats Calculator

Option: Passive Skill Calculator
Question:
I want to plan desired passive skills.

Answer:
Use Passives to capture desired skills and keep inheritance caveats visible.

CTA label:
Open Passive Planner

---

## 4. Tool-page helper text and example buttons

Pattern for every P0 tool page:
- Tool helper line near the top of the calculator panel.
- Examples row above or inside the calculator panel, before results.
- Input helper text directly under the matching label/control.
- Result explainer below result title/body and before share/copy controls.

### 4.1 Breeding Calculator

Routes:
- `/breeding-calculator/`
- `/palworld-1-0-breeding-calculator/`

Tool helper line:
Breeding Calculator checks direct parent/child lookups: choose Pair to Child when you know two parents, or Target to Parents when you know the Pal you want.

1.0 route extra helper line:
Same workflow, with Palworld 1.0 data-version notes visible.

Examples row heading:
Try an editable breeding example

Examples row body:
Click an example to fill safe demo values, then replace them with your own Pals.

Example button 1 label:
Try: Anubis parent lookup

Example button 1 description:
Fills Target to Parents with Anubis so you can review possible parent pairs in the current dataset.

Example button 1 analytics id:
anubis_parent_lookup

Example button 2 label:
Try: Penking + Bushi pair

Example button 2 description:
Fills Pair to Child with Penking and Bushi so you can see how a direct parent lookup works.

Example button 2 analytics id:
penking_bushi_pair

Example button 3 label:
Try: Jetragon target lookup

Example button 3 description:
Fills Target to Parents with Jetragon if supported by the current dataset. If unsupported, show the unavailable state instead of guessing.

Example button 3 analytics id:
jetragon_target_lookup

Mode switch helper:
Use Pair to Child when you know two parents. Use Target to Parents when you know the child you want.

Pair to Child mode label:
Pair to Child

Target to Parents mode label:
Target to Parents

Parent A helper:
Type one Pal you own or want to test, e.g. Penking.

Parent B helper:
Type the second parent, e.g. Bushi.

Target child helper:
Type the Pal you want to breed, e.g. Anubis.

Empty state:
Choose a mode, type Pal names, or start with an editable example.

No-result / unavailable helper:
No supported result appears for this data version. Check spelling, switch modes, or review the data-source notes.

### 4.2 Breeding Route Calculator

Route:
- `/breeding-route-calculator/`

Tool helper line:
Route Calculator starts with the Pal you want and the Pals you own, then searches for a caveated multi-step path.

Examples row heading:
Try an editable route example

Examples row body:
Use a route demo to see target, owned Pals, missing Pals, and max generations before entering your own list.

Example button 1 label:
Try: route to Anubis from Penking + Bushi

Example button 1 description:
Fills target Anubis, owned Pals Penking and Bushi, and max generations 3.

Example button 1 analytics id:
anubis_route_penking_bushi

Example button 2 label:
Try: no owned Pals yet

Example button 2 description:
Fills target Anubis with an empty owned-Pal list so you can see missing-parent guidance.

Example button 2 analytics id:
anubis_route_no_owned

Example button 3 label:
Try: longer route search

Example button 3 description:
Keeps target Anubis and raises max generations to show how broader constraints can change route search.

Example button 3 analytics id:
anubis_route_longer_search

Target Pal helper:
The Pal you want at the end of the route.

Max generations helper:
Higher can find longer routes, but results may be harder to follow.

Owned Pals helper:
Optional. Paste names you already have, separated by commas or new lines. This stays browser-local in the MVP.

Empty owned list note:
No owned Pals entered. The route may show missing parents or a broader planning path.

No-result / unavailable helper:
No route appears under these constraints. Check Pal names, add more owned Pals, increase max generations, or review data-source notes.

### 4.3 IV Calculator

Route:
- `/iv-calculator/`

Tool helper line:
IV Calculator estimates broad stat-quality bands from the Pal, level, and visible stats you enter.

Examples row heading:
Try an editable IV example

Examples row body:
Use a safe demo to learn the fields, then replace the values with your own in-game stats.

Example button 1 label:
Try: level 50 Anubis IV bands

Example button 1 description:
Fills Anubis at level 50 with safe demo stat values so you can review broad IV bands and caveats.

Example button 1 analytics id:
anubis_iv_level_50

Example button 2 label:
Try: modifier caveat check

Example button 2 description:
Shows why level, visible stats, and modifiers should be checked before trusting a narrow estimate.

Example button 2 analytics id:
iv_modifier_caveat_check

Pal helper:
Choose the Pal whose stats you are checking.

Level helper:
Use the in-game level shown for that Pal.

Observed HP helper:
Enter the visible in-game HP value. If upgrades or modifiers apply, read the caveat before trusting exact bands.

Observed Attack helper:
Enter the visible in-game Attack value. Passive skills and modifiers can widen the estimate.

Observed Defense helper:
Enter the visible in-game Defense value. Rounding and modifiers can make exact values uncertain.

Shared observed stats helper:
Enter visible in-game stats. If souls, condenser stars, passives, or other modifiers apply, read caveats before trusting exact bands.

No-result / unavailable helper:
The current inputs do not produce a supported IV estimate. Recheck level, stats, modifiers, and data-version notes.

### 4.4 Stats Calculator

Route:
- `/stats-calculator/`

Tool helper line:
Stats Calculator shows broad expected HP, Attack, and Defense bands for a selected Pal and level.

Examples row heading:
Try an editable stats example

Examples row body:
Start with a level 50 demo, then change the Pal or level to compare expected stat bands.

Example button 1 label:
Try: Anubis expected stats

Example button 1 description:
Fills Anubis at level 50 so you can compare broad expected HP, Attack, and Defense bands.

Example button 1 analytics id:
anubis_stats_level_50

Example button 2 label:
Try: change level comparison

Example button 2 description:
Starts with Anubis and invites you to change level to see how expected bands move.

Example button 2 analytics id:
stats_level_comparison

Pal helper:
Choose the Pal whose expected stats you want to compare.

Level helper:
Use the level you want to preview or compare.

Observed HP helper:
Optional for expected-stat workflows. If shown, use visible in-game HP only when checking against a real Pal.

Observed Attack helper:
Optional for expected-stat workflows. If shown, use visible in-game Attack only when checking against a real Pal.

Observed Defense helper:
Optional for expected-stat workflows. If shown, use visible in-game Defense only when checking against a real Pal.

No-result / unavailable helper:
The current dataset does not have enough supported stat data for this estimate. Try another Pal or review data-source notes.

### 4.5 Passive Skill Calculator

Route:
- `/passive-skill-calculator/`

Tool helper line:
Passive Skill Calculator helps you capture desired passives for planning, while keeping inheritance RNG caveats visible.

Examples row heading:
Try an editable passive example

Examples row body:
Use a passive-planning demo to learn the format, then replace the target and desired skills.

Example button 1 label:
Try: Artisan + Serious passive plan

Example button 1 description:
Fills target Anubis with Artisan and Serious as desired passives for a work-speed planning example.

Example button 1 analytics id:
artisan_serious_passive_plan

Example button 2 label:
Try: combat passive plan

Example button 2 description:
Fills a supported combat-style passive set when current passive labels support it. If unsupported, keep the generic desired-passive example.

Example button 2 analytics id:
combat_passive_plan

Target Pal helper:
The Pal you eventually want with these passives.

Desired passives helper:
Type passive names separated by commas, e.g. Artisan, Serious.

Unrecognized passive helper:
Some passive names were not recognized in the current dataset. Check spelling or choose from supported passive names.

No-result / unavailable helper:
The passive plan needs review. Check the target Pal and passive names before using this with breeding or route tools.

---

## 5. Result interpretation templates

Implementation rule:
Use the exact labels below for success and recoverable error/no-result states. Put this block below the result title/body and above share/copy controls.

Required label 1:
This means...

Required label 2:
Next step...

Required label 3:
Caveat...

### 5.1 Breeding Calculator — Pair to Child success

This means...
The selected parent pair returns this child in the current fan-made dataset.

Next step...
If this matches your goal, review caveats and plan the breeding step. If you need a different child, switch to Target to Parents.

Caveat...
Special-combo handling, selected data version, and game patches can change some results.

### 5.2 Breeding Calculator — Target to Parents success

This means...
The calculator found parent pairs that can lead to the target Pal in the current fan-made dataset.

Next step...
Pick a pair you already own, or open Route to find a path from Pals you have.

Caveat...
Parent-pair lists depend on selected data, special-combo handling, and patch timing.

### 5.3 Breeding Calculator — no result / unavailable

This means...
PalCalculator cannot show a supported breeding result for these inputs and this data version.

Next step...
Check spelling, try selector suggestions, switch modes, or choose an editable example.

Caveat...
Unsupported data should stay unavailable instead of being filled with a guess.

### 5.4 1.0 Breeding Calculator — success

This means...
The result uses the current Palworld 1.0-focused dataset and the visible caveats on this page.

Next step...
Review the data-version notes before using the pair or target list in a longer plan.

Caveat...
Palworld 1.0 data can still change with patches, corrections, and special-combo updates.

### 5.5 Route Calculator — success

This means...
This is the shortest route PalCalculator found within your current target, owned-Pal list, and generation limit.

Next step...
Breed step 1 first, then use the child as a parent in the next listed step. If too many parents are missing, add owned Pals or increase max generations.

Caveat...
This is planning guidance from a fan-made dataset, not a promise about every in-game outcome.

### 5.6 Route Calculator — target already owned

This means...
Your owned-Pal list already includes the target Pal.

Next step...
Use Breeding if you want parent-pair options, or use IV/Stats/Passives to evaluate the Pal you already have.

Caveat...
Owned-Pal text is interpreted from your browser-local input and may need spelling cleanup.

### 5.7 Route Calculator — no route / unavailable

This means...
No supported route was found with the current constraints.

Next step...
Check Pal names, add more owned Pals, increase max generations, or try the no-owned-Pals example to understand the missing-parent state.

Caveat...
A missing route can mean strict constraints, missing data, unsupported combos, or patch differences.

### 5.8 IV Calculator — success

This means...
Your observed stats fall into broad expected bands for the selected Pal and level.

Next step...
Confirm level, visible stats, passives, souls, condenser stars, and other modifiers before deciding whether to keep or breed this Pal.

Caveat...
Rounding and unsupported modifiers can make exact IV values uncertain.

### 5.9 IV Calculator — invalid or unsupported input

This means...
The current inputs do not map cleanly to a supported IV estimate.

Next step...
Recheck the Pal, level, visible stats, and known modifiers, then try again.

Caveat...
Some formulas or modifiers may not be fully represented in the current build.

### 5.10 Stats Calculator — success

This means...
PalCalculator estimated broad expected stat bands for the selected Pal and level.

Next step...
Use the bands as a comparison point, then check IVs or modifiers if your real Pal looks outside the expected range.

Caveat...
Expected stats depend on supported formulas, selected data, and visible modifier assumptions.

### 5.11 Stats Calculator — invalid or unsupported input

This means...
The current dataset does not have enough supported stat information for this estimate.

Next step...
Try another Pal or level, or review data-source notes before relying on the result.

Caveat...
Unsupported stat cases should show uncertainty instead of pretending the formula is complete.

### 5.12 Passive Skill Calculator — success

This means...
Your desired passives were recognized for planning.

Next step...
Use Breeding or Route to choose candidate parents, then verify outcomes in game.

Caveat...
Passive inheritance can involve RNG, so this planner should not imply fixed odds.

### 5.13 Passive Skill Calculator — unrecognized or incomplete input

This means...
PalCalculator recognized only part of the passive plan, or the target Pal needs review.

Next step...
Check spelling, use supported passive names, and keep the plan editable.

Caveat...
Unsupported passive data should remain caveated rather than converted into odds or promises.

---

## 6. Result-to-next-tool CTA copy

Use these inside result explainers or directly below them where relevant.

Breeding target result primary CTA:
Plan a route from my Pals

Breeding target result primary CTA helper:
Open Route with this target if you do not already own a listed parent pair.

Breeding pair result secondary CTA:
Find parents for a target instead

Breeding pair result secondary CTA helper:
Switch to Target to Parents when you know the child you want.

Route result primary CTA:
Check this Pal's IVs

Route result primary CTA helper:
After you breed or catch the target, use visible stats to estimate broad IV bands.

Route no-result CTA:
Try a wider route search

Route no-result CTA helper:
Increase max generations or add more owned Pals before trying again.

IV result primary CTA:
Compare expected stats

IV result primary CTA helper:
Open Stats to see broad HP, Attack, and Defense bands for the same Pal and level.

Stats result primary CTA:
Check IV bands

Stats result primary CTA helper:
Use observed stats when you want a caveated IV estimate for a real Pal.

Passive result primary CTA:
Find a breeding route

Passive result primary CTA helper:
Use Route or Breeding to look for candidate parents after choosing desired passives.

Passive result secondary CTA:
Check passive guide

Passive result secondary CTA helper:
Read how passive planning differs from route and IV planning.

---

## 7. Guide-page CTA copy

Implementation rule:
Each guide page should show a beginner-specific CTA panel. If query prefill is not implemented, say what to try after opening the calculator instead of implying automatic prefill.

Generic panel eyebrow:
Try this in PalCalculator

Generic fallback body:
Open the matching calculator and use the example values below. If the fields are not prefilled, type them manually.

### 7.1 `/guides/palworld-breeding-combos/`

CTA heading:
Check a combo in the calculator

Body:
Use Pair to Child for two known parents, or Target to Parents when you know the Pal you want.

Primary CTA label:
Try Anubis parent lookup

Primary CTA URL:
`/breeding-calculator/`

Primary helper:
Open Breeding Calculator, choose Target to Parents, and try: Anubis.

Secondary CTA label:
Check Penking + Bushi

Secondary CTA URL:
`/breeding-calculator/`

Secondary helper:
Use Pair to Child and try: Penking + Bushi.

### 7.2 `/guides/palworld-breeding-tree/`

CTA heading:
Plan a route instead of one combo

Body:
Use Route when a direct parent pair is not enough and you need steps from Pals you own.

Primary CTA label:
Try the Anubis route demo

Primary CTA URL:
`/breeding-route-calculator/`

Primary helper:
Open Route Calculator and try target Anubis with owned Pals Penking, Bushi and max generations 3.

Secondary CTA label:
Check direct parent pairs

Secondary CTA URL:
`/breeding-calculator/`

Secondary helper:
Use Breeding Calculator if you only need one parent/child lookup.

### 7.3 `/guides/palworld-1-0-breeding-guide/`

CTA heading:
Use the 1.0 breeding workflow

Body:
Check the same parent/child workflow with Palworld 1.0 data-version notes visible.

Primary CTA label:
Open 1.0 breeding calculator

Primary CTA URL:
`/palworld-1-0-breeding-calculator/`

Primary helper:
Try Target to Parents with Anubis, then review data-version caveats before following the result.

Secondary CTA label:
View data sources

Secondary CTA URL:
`/data-sources/`

Secondary helper:
Check source and update notes before committing to a long breeding plan.

### 7.4 `/guides/palworld-iv-explained/`

CTA heading:
Try an IV estimate with caveats visible

Body:
Use a level 50 Anubis demo to see how observed stats become broad IV bands.

Primary CTA label:
Try level 50 Anubis IV bands

Primary CTA URL:
`/iv-calculator/`

Primary helper:
Open IV Calculator and try: Anubis, level 50, with safe demo stats or your own visible stats.

Secondary CTA label:
Compare expected stats

Secondary CTA URL:
`/stats-calculator/`

Secondary helper:
Use Stats Calculator when you want expected HP, Attack, and Defense bands instead of an IV estimate.

### 7.5 `/guides/best-passive-skills-for-breeding-palworld/`

CTA heading:
Plan passives without hiding RNG

Body:
Choose desired passives for planning, then use breeding tools to look for candidate parents.

Primary CTA label:
Try Artisan + Serious passive plan

Primary CTA URL:
`/passive-skill-calculator/`

Primary helper:
Open Passive Skill Calculator and try target Anubis with desired passives Artisan, Serious.

Secondary CTA label:
Find a breeding route

Secondary CTA URL:
`/breeding-route-calculator/`

Secondary helper:
Use Route after choosing passives if you need a path from Pals you own.

### 7.6 `/guides/how-to-breed-anubis-palworld/`

CTA heading:
Start with an Anubis calculator example

Body:
Use Anubis as the target, then decide whether you need direct parent pairs or a route from owned Pals.

Primary CTA label:
Try Anubis parent lookup

Primary CTA URL:
`/breeding-calculator/`

Primary helper:
Open Breeding Calculator, choose Target to Parents, and try: Anubis.

Secondary CTA label:
Plan an Anubis route

Secondary CTA URL:
`/breeding-route-calculator/`

Secondary helper:
Open Route Calculator and try Anubis with owned Pals you actually have.

### 7.7 `/guides/how-to-breed-jetragon-palworld/`

CTA heading:
Check Jetragon support before planning

Body:
Use the calculator to verify whether Jetragon is supported in the current dataset before following a long plan.

Primary CTA label:
Try Jetragon target lookup

Primary CTA URL:
`/breeding-calculator/`

Primary helper:
Open Breeding Calculator, choose Target to Parents, and try: Jetragon. If unsupported, keep the unavailable state visible.

Secondary CTA label:
Review data sources

Secondary CTA URL:
`/data-sources/`

Secondary helper:
Check data-version notes before treating any Jetragon workflow as usable.

### 7.8 `/guides/palworld-breeding-route-examples/`

CTA heading:
Try a route example in the calculator

Body:
Use a route demo to see target, owned Pals, missing parents, and generation limits in context.

Primary CTA label:
Try the route demo

Primary CTA URL:
`/breeding-route-calculator/`

Primary helper:
Open Route Calculator and try target Anubis with owned Pals Penking, Bushi and max generations 3.

Secondary CTA label:
Check direct combos

Secondary CTA URL:
`/breeding-calculator/`

Secondary helper:
Use Breeding Calculator if you only need one parent-pair lookup.

---

## 8. Analytics-safe event copy notes

These are implementation notes, not user-facing strings.

For `beginner_example_click`, safe properties:
- `tool_type`
- `example_id`
- `example_group`
- `page_slug`
- `data_version`

For `result_explainer_view`, safe properties:
- `tool_type`
- `result_state`
- `data_version`

For `tool_start`, safe properties:
- `tool_type`
- `page_slug`
- `start_source`
- `data_version`

Never include:
- raw owned-Pal list
- exact custom stat fields
- desired passive free text
- query string
- share URL
- save/import content
- email, token, or private identifier

---

## 9. Patch-ready summary table

| Route / component | String key | Exact copy |
|---|---|---|
| `/` beginner section | heading | How to use PalCalculator |
| `/` beginner section | intro | New to Palworld breeding calculators? Start with a goal, try an editable example, then read the result notes before spending resources. |
| `/` card 1 | title | Choose your goal |
| `/` card 1 | body | Know the Pal you want? Start with Route or Target to Parents. Know two parents? Use Pair to Child. Checking a Pal you own? Use IV, Stats, or Passives. |
| `/` card 1 | cta | Help me choose a tool |
| `/` card 2 | title | Try an example |
| `/` card 2 | body | Use safe prefilled examples like Anubis parent lookup, a route demo, level 50 stat bands, or Artisan + Serious passive planning. |
| `/` card 2 | cta | Try Anubis example |
| `/` card 3 | title | Read what it means |
| `/` card 3 | body | After a result appears, check the beginner notes: This means..., Next step..., and Caveat.... |
| `/` card 3 | cta | See result guide |
| Breeding | helper | Breeding Calculator checks direct parent/child lookups: choose Pair to Child when you know two parents, or Target to Parents when you know the Pal you want. |
| Breeding | example 1 | Try: Anubis parent lookup |
| Breeding | example 2 | Try: Penking + Bushi pair |
| Breeding | example 3 | Try: Jetragon target lookup |
| Route | helper | Route Calculator starts with the Pal you want and the Pals you own, then searches for a caveated multi-step path. |
| Route | example 1 | Try: route to Anubis from Penking + Bushi |
| Route | example 2 | Try: no owned Pals yet |
| IV | helper | IV Calculator estimates broad stat-quality bands from the Pal, level, and visible stats you enter. |
| IV | example 1 | Try: level 50 Anubis IV bands |
| Stats | helper | Stats Calculator shows broad expected HP, Attack, and Defense bands for a selected Pal and level. |
| Stats | example 1 | Try: Anubis expected stats |
| Passives | helper | Passive Skill Calculator helps you capture desired passives for planning, while keeping inheritance RNG caveats visible. |
| Passives | example 1 | Try: Artisan + Serious passive plan |
| Result explainer | label 1 | This means... |
| Result explainer | label 2 | Next step... |
| Result explainer | label 3 | Caveat... |

---

## 10. Acceptance self-check

- Homepage has exactly three beginner steps: choose goal, try example, read result.
- Route, Pair, IV/Stats, and Passives are explained in beginner language.
- Helper text is provided for every input listed in the product spec.
- Each P0 tool has at least two example button labels.
- Breeding, Route, IV, Stats, and Passives include Anubis or a clearly caveated supported replacement path.
- Result templates use exact labels: This means..., Next step..., Caveat....
- Caveats preserve fan-made/data-version/formula/RNG uncertainty.
- Guide CTAs are specific and do not say vague “click here.”
- Examples are described as editable demos, not universal recommendations.
- Unsupported states stay transparent instead of being filled with guesses.

[DONE]
