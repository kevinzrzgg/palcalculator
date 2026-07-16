# PalCalculator SEO Copy Freeze v1

Project: palcalculator
Stage: 05-copy
Market: US / English
Primary keyword family: Palworld calculator / Palworld breeding calculator / Palworld 1.0 breeding calculator
Canonical origin placeholder: `{CANONICAL_ORIGIN}`
Status: [DONE]
Date: 2026-07-16
Owner profile: copy_bot

## 1. Copy freeze conclusion

PalCalculator should launch copy as an unofficial fan-made Palworld calculator hub, not as a generic `palcalculator` exact-match page. The copy emphasizes route-first utility: start with a target Pal, check breeding pairs, solve from owned Pals, estimate IV/stat ranges, and plan passive inheritance with clear data-version caveats.

Primary public positioning:

> PalCalculator is an unofficial fan-made Palworld 1.0 calculator hub for breeding routes, IV/stat checks, passive planning, and owned-Pal optimization.

Primary CTA:

> Start with a target Pal

Secondary CTAs:

- Calculate breeding
- Find shortest route
- Check IVs
- Calculate stats
- Plan passives
- View data sources

Launch pricing copy:

> Free for normal player use at MVP. No login or payment required for P0 calculators.

Do not add pricing tables, paid plan prices, checkout buttons, ads, affiliate modules, or account-gated copy at MVP unless the owner approves a later scope change.

## 2. Inputs and validation basis

Read upstream artifacts:

- `/root/projects/palcalculator/artifacts/research.md`
- `/root/projects/palcalculator/artifacts/prd.md`
- `/root/projects/palcalculator/artifacts/route-contract.md`
- `/root/projects/palcalculator/artifacts/pricing.md`
- `/root/projects/palcalculator/artifacts/compliance.md`

Live/current SERP recheck:

- Configured `web_search` failed with Tavily 401 Unauthorized.
- Fallback Bing RSS check was run for core terms.
- Visible competitor/result patterns still support the same copy direction: Palworld.gg, Palpedia, Game8, XGamingServer, Host Havoc, Drawpie, and Pal Routes all compete around breeding calculators and/or Palworld 1.0 calculators.
- Bing RSS showed Pal Routes copy around shortest routes from owned Pals, confirming route-first differentiation is a real SERP/user-task wedge.

Key constraints frozen into copy:

- Make Palworld explicit in every indexable title, H1, meta description, and hero.
- Calculator UI must appear above SEO body copy.
- Show data version, update date, and caveat links on every P0 tool route.
- Use fan-made/unofficial language and no affiliation language.
- Do not use official logos, copied game art, screenshots, sprites, extracted assets, or official-style branding.
- Do not claim perfect accuracy, certainty, always-current data, deterministic passive inheritance, or guaranteed results.
- Do not persist owned-Pal lists or save-file contents server-side at MVP.
- Do not require login or payment for P0 calculators.

## 3. Global message hierarchy

### 3.1 Above-the-fold message

Problem:

> Breeding in Palworld gets messy fast when you are checking pairs, routes, IVs, stats, and passive skills in separate tabs.

Agitate:

> One wrong assumption can send you down the wrong breeding chain, waste time, or make you trust outdated data.

Solve:

> PalCalculator gives you fast Palworld 1.0 calculators with route steps, data-version notes, and clear caveats.

### 3.2 Value pillars

1. Start from your goal
   - Enter the Pal you want, then choose breeding, route, IV/stat, or passive planning.
2. See the next step
   - Get parent pairs, route steps, missing Pals, and copy/share actions.
3. Check the caveats
   - Results show data version, formula assumptions, and unsupported states instead of guessing.
4. Stay lightweight
   - No login, no payment, and no server-side save-file upload in MVP.
5. Use a fan-made tool clearly
   - PalCalculator is an independent fan tool with visible source and disclaimer pages.

### 3.3 Words to prefer

- unofficial
- fan-made
- Palworld 1.0
- selected data version
- route found
- planning guidance
- formula assumptions
- caveats
- browser-local
- no login required
- copy/share result

### 3.4 Words or claims to avoid in product copy

Avoid affiliation or certainty language, including:

- official
- endorsed
- approved
- authorized
- partnered
- sponsored
- guaranteed
- always correct
- 100% accurate
- perfect IVs
- exact passive odds
- deterministic passive inheritance
- instantly updated
- complete database
- free forever
- no tracking
- anonymous
- secure upload

Exception: legal/disclaimer copy may say “not affiliated with, endorsed by, sponsored by, or approved by...” because that sentence reduces affiliation risk.

## 4. Global UI copy components

### 4.1 Sitewide short disclaimer

Use in footer and compact trust blocks:

> PalCalculator is an unofficial fan-made tool and is not affiliated with, endorsed by, sponsored by, or approved by Pocketpair or the Palworld team. Palworld and related names are trademarks or properties of their respective owners.

Shorter inline version:

> Unofficial fan-made Palworld tool. Results depend on the selected data version.

### 4.2 Data-version badge copy

Default badge:

> Data: Palworld 1.0 · Updated {LAST_UPDATED}

Tooltip:

> Calculator results use the selected data version. Patches can change breeding, stats, and passive behavior.

Link text:

> View data sources and caveats

Unavailable placeholder:

> Data version pending — do not publish until source and update date are set.

### 4.3 Result caveat copy

Breeding:

> Breeding results depend on the selected data version and special-combo rules. If a Pal or combo is missing, check the data source notes.

Route solver:

> This is the best route found for the current dataset and your constraints. Try relaxing constraints if no route appears.

IV/stat:

> IV and stat outputs are ranges when rounding, modifiers, or formula support create uncertainty.

Passive planner:

> Passive inheritance can involve RNG. Use this as planning guidance, not a certainty claim.

Share URLs:

> Share links may include selected Pals or calculator settings. Do not share a link if you consider that state private.

### 4.4 Empty states

Generic Pal selector:

> Type a Pal name to start. Example: Anubis, Jetragon, Orserk.

No result:

> No result found for this data version and filter set. Check spelling, remove a constraint, or review the data-source notes.

Invalid Pal:

> We could not match that Pal name. Try a full name or choose from the suggestions.

Unsupported data:

> This calculator does not have enough verified data for that result yet.

Loading:

> Checking the current dataset...

Long route solve:

> Searching route options. Large owned-Pal lists can take longer.

### 4.5 Button / CTA microcopy

Primary buttons:

- Start with a target Pal
- Find shortest route
- Calculate breeding
- Check IV ranges
- Calculate stat bands
- Plan passive route
- Copy this result
- Share this route
- View data sources

Secondary buttons:

- Switch to parent pairs
- Switch to target search
- Add owned Pals
- Clear owned list
- Relax constraints
- Try an example
- Open breeding route
- Check this Pal’s IVs
- See formula caveats

Avoid:

- Submit
- Click here
- Learn more
- Get started without context

## 5. Route-by-route SEO copy freeze

### 5.1 Home `/`

Index: yes
Canonical: `{CANONICAL_ORIGIN}/`
Primary keyword: Palworld calculator, PalCalculator
Schema: WebSite, SoftwareApplication
Primary component: CalculatorHub
Primary CTA: Start with a target Pal
Target word count: 700-1,000 words below calculator UI

Title:

> PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators

Meta description:

> Use PalCalculator for unofficial fan-made Palworld 1.0 breeding routes, parent pairs, IV/stat checks, passive planning, and shareable results. No login required.

OG title:

> PalCalculator — Unofficial Palworld Calculator Hub

OG description:

> Start with a target Pal, find breeding pairs or routes, check IV/stat ranges, and plan passives with data-version caveats.

H1:

> PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators

Hero eyebrow:

> Unofficial fan-made Palworld 1.0 calculator hub

Hero headline:

> Stop jumping between Palworld calculators.

Hero subhead:

> Start with the Pal you want, then find breeding pairs, shortest owned-Pal routes, IV/stat ranges, and passive planning notes with clear data-version caveats.

Hero trust line:

> Free MVP tools · No login required · Data-version notes on every result

Hero primary CTA:

> Start with a target Pal

Hero secondary CTA:

> Choose a calculator

Above-fold tool picker labels:

- Breeding: Parent pair or target Pal
- Route: Owned Pals to target Pal
- IV: Estimate HP, Attack, and Defense IV ranges
- Stats: Compare expected stat bands by level
- Passives: Plan desired passive skills with RNG caveats

H2 sections:

1. H2: Choose the Palworld calculator for your next task
   - Copy: Pick the task you are trying to finish now. PalCalculator keeps the calculator first, then shows notes, caveats, and related tools after the result.

2. H2: Find a route from the Pals you already own
   - Copy: Paste or select your owned Pals, choose a target, and see route steps, missing Pals, and alternatives where the current dataset supports them.

3. H2: Check breeding, IVs, stats, and passives in one flow
   - Copy: Move from a breeding result to route planning, IV/stat checks, or passive planning without rebuilding your search in another tab.

4. H2: Built with source and update notes
   - Copy: Every tool page should show the selected Palworld data version, last update, formula caveats, and a link to the data-source policy.

5. H2: Free, lightweight, and browser-first at MVP
   - Copy: P0 calculators should work without login or payment. Owned-Pal lists should be handled browser-side unless a later feature clearly says otherwise.

Final CTA block:

Headline:

> Ready to plan your next Pal?

Body:

> Start with a target Pal and move from breeding pairs to route steps, IV/stat checks, and passive notes.

CTA:

> Start with a target Pal

FAQ:

Q: Is PalCalculator an official Palworld tool?
A: No. PalCalculator is an unofficial fan-made tool and is not affiliated with Pocketpair or the Palworld team.

Q: What can I calculate here?
A: The MVP is planned around breeding pairs, breeding routes from owned Pals, IV/stat ranges, passive planning notes, and source/update pages.

Q: Do I need an account?
A: No. MVP calculators should be usable without login or payment.

Q: How does PalCalculator handle accuracy?
A: Results depend on the selected data version. Tool pages should show update notes, formula assumptions, and unsupported states instead of guessing.

Q: Can I share results?
A: Yes, copy/share actions are planned. Share URLs may include selected Pals or settings, so avoid sharing links you consider private.

### 5.2 Breeding calculator `/breeding-calculator/`

Index: yes
Canonical: `{CANONICAL_ORIGIN}/breeding-calculator/`
Primary keyword: palworld breeding calculator
Schema: SoftwareApplication, FAQPage
Primary component: BreedingCalculator
Primary CTA: Calculate breeding
Target word count: 650-900 words below calculator UI

Title:

> Palworld Breeding Calculator - Parent Pairs, Children & Combos

Meta description:

> Calculate Palworld breeding results by parent pair or target Pal. Find children, parent pairs, special combos, data-version notes, and route links.

OG title:

> Palworld Breeding Calculator

OG description:

> Enter two parents to find the child, or choose a target Pal to see possible parent pairs and route links.

H1:

> Palworld Breeding Calculator

Hero eyebrow:

> Parent pairs, target search, and special-combo notes

Hero headline:

> Find the child or the parents in one Palworld breeding tool.

Hero subhead:

> Enter two parent Pals to calculate the child, or start with a target Pal and review possible parent pairs for the selected data version.

Primary CTA:

> Calculate breeding

Secondary CTA:

> Find parent pairs

Mode switch labels:

- Pair to child
- Target to parents

Input labels:

- Parent Pal A
- Parent Pal B
- Target child Pal
- Include special combos
- Data version

Result labels:

- Child Pal
- Parent pair
- Combo type
- Special combo note
- Data version
- Route link

H2 sections:

1. H2: Calculate a child from two parent Pals
   - Copy: Choose Parent Pal A and Parent Pal B to see the breeding result for the selected data version. Special combinations should be marked clearly when they override normal rules.

2. H2: Search parent pairs for a target Pal
   - Copy: Start with the Pal you want and review available parent pairs. Use filters to narrow results, then open the route calculator when you want a step-by-step path.

3. H2: Check special combos and caveats
   - Copy: Some results depend on special-combo rules or data-version differences. PalCalculator should show those notes near the result, not hide them in a guide.

4. H2: Move from breeding to route planning
   - Copy: A parent pair is useful, but a route tells you what to do next. Send the target Pal to the route calculator to plan from your owned Pals.

FAQ:

Q: Can I calculate both parent-to-child and target-to-parent results?
A: Yes. Use Pair to child when you have two parents, or Target to parents when you know the Pal you want.

Q: Are special breeding combos included?
A: Special combos should be shown when the current dataset supports them, with a visible marker and data-version note.

Q: What if no breeding pair appears?
A: Check spelling, remove filters, and review the data-source notes. The tool should show unavailable states rather than guessing.

Q: Can I turn a breeding result into a route?
A: Yes. Breeding results should link to the route calculator with the child or target Pal preselected.

### 5.3 Breeding route calculator `/breeding-route-calculator/`

Index: yes
Canonical: `{CANONICAL_ORIGIN}/breeding-route-calculator/`
Primary keyword: palworld breeding route calculator
Schema: SoftwareApplication, FAQPage
Primary component: RouteSolver
Primary CTA: Find shortest route
Target word count: 700-1,000 words below calculator UI

Title:

> Palworld Breeding Route Calculator - Shortest Path from Owned Pals

Meta description:

> Plan a Palworld breeding route from your owned Pals to a target Pal. Find route steps, missing Pals, alternatives, constraints, and shareable results.

OG title:

> Palworld Breeding Route Calculator

OG description:

> Paste or select owned Pals, choose a target, and find the best route found for the current dataset and constraints.

H1:

> Palworld Breeding Route Calculator

Hero eyebrow:

> Route-first Palworld breeding planner

Hero headline:

> Turn your current Palbox into a breeding route.

Hero subhead:

> Select or paste owned Pals, choose your target, and see step-by-step breeding routes, missing Pals, and alternative paths where supported.

Primary CTA:

> Find shortest route

Secondary CTA:

> Try with example Pals

Input labels:

- Target Pal
- Owned Pals
- Paste owned Pal list
- Max generations
- Exclude Pals
- Include special combos
- Data version

Result labels:

- Route found
- Generations
- Step-by-step breeding plan
- Missing Pals
- Alternative routes
- Constraints used
- Copy route
- Share route

H2 sections:

1. H2: Start from the Pals you already have
   - Copy: Instead of scanning every parent pair manually, add your owned Pals and let the route solver show the path from your current list to the target Pal.

2. H2: See each breeding step before you commit
   - Copy: Route results should list each parent pair, child, generation count, missing Pal, and constraint used so players can verify the plan before breeding.

3. H2: Compare alternatives when the route is not simple
   - Copy: If multiple paths exist, show alternatives and tie-break notes. If no route appears, explain whether constraints may be too strict.

4. H2: Keep owned-Pal data browser-first
   - Copy: MVP owned-Pal inputs should be processed in the browser unless a feature clearly explains otherwise. Do not upload save files server-side for MVP.

FAQ:

Q: What does the route calculator do?
A: It uses your owned Pal list, target Pal, constraints, and selected data version to find a breeding route where supported.

Q: Is the shortest route always the only route?
A: No. The tool should show the best route found for the current dataset and constraints, plus alternatives where supported.

Q: What if I already own the target Pal?
A: The success state should say no breeding is needed and offer related tasks such as IV/stat checks or passive planning.

Q: Does PalCalculator store my owned Pal list?
A: MVP copy should say owned-Pal lists are processed browser-side unless a feature clearly states otherwise.

### 5.4 IV calculator `/iv-calculator/`

Index: yes
Canonical: `{CANONICAL_ORIGIN}/iv-calculator/`
Primary keyword: palworld iv calculator
Schema: SoftwareApplication, FAQPage
Primary component: IvCalculator
Primary CTA: Check IVs
Target word count: 600-850 words below calculator UI

Title:

> Palworld IV Calculator - Check HP, Attack & Defense IVs

Meta description:

> Estimate Palworld IV ranges from observed stats, level, modifiers, and formula caveats. Check HP, Attack, Defense, confidence notes, and data version.

OG title:

> Palworld IV Calculator

OG description:

> Enter a Pal, level, observed stats, and supported modifiers to estimate IV ranges with formula caveats.

H1:

> Palworld IV Calculator

Hero eyebrow:

> HP, Attack, Defense, and formula caveats

Hero headline:

> Check whether a Pal is worth keeping or breeding.

Hero subhead:

> Enter observed stats, level, and supported modifiers to estimate IV ranges and see where rounding or missing data may affect confidence.

Primary CTA:

> Check IV ranges

Secondary CTA:

> See formula caveats

Input labels:

- Pal
- Level
- Observed HP
- Observed Attack
- Observed Defense
- Souls / enhancements
- Condenser stars
- Passive modifiers
- Data version

Result labels:

- HP IV range
- Attack IV range
- Defense IV range
- Confidence note
- Formula version
- Modifier caveats

H2 sections:

1. H2: Estimate IV ranges from observed stats
   - Copy: Add the Pal, level, observed stats, and supported modifiers. The calculator should return ranges rather than false certainty when rounding or missing modifiers matter.

2. H2: Understand confidence before breeding
   - Copy: IV outputs should explain formula assumptions, unsupported modifiers, and impossible stat values so players know whether to retest or adjust inputs.

3. H2: Move from IV checks to breeding plans
   - Copy: After checking a Pal’s IV range, use breeding and passive tools to plan whether that Pal belongs in your route.

FAQ:

Q: Why does the IV calculator show ranges?
A: Ranges are safer when rounding, modifiers, or formula support create uncertainty.

Q: What stats can I check?
A: MVP copy supports HP, Attack, and Defense where the selected data and formulas allow it.

Q: What happens with impossible stats?
A: The tool should show inline validation and explain which input may be wrong.

Q: Are passives included?
A: Supported passive modifiers can be included when data exists. Unsupported modifiers should be shown as caveats.

### 5.5 Stats calculator `/stats-calculator/`

Index: yes
Canonical: `{CANONICAL_ORIGIN}/stats-calculator/`
Primary keyword: palworld stats calculator
Schema: SoftwareApplication, FAQPage
Primary component: StatsCalculator
Primary CTA: Calculate stats
Target word count: 600-850 words below calculator UI

Title:

> Palworld Stats Calculator - Estimate Pal Stats by Level

Meta description:

> Calculate expected Palworld stat bands by Pal, level, modifiers, and IV inputs. Review HP, Attack, Defense, formula version, and caveats.

OG title:

> Palworld Stats Calculator

OG description:

> Estimate expected stat bands for a Pal build with level, modifiers, IV inputs, and formula notes.

H1:

> Palworld Stats Calculator

Hero eyebrow:

> Expected stat bands by level and modifiers

Hero headline:

> Estimate a Pal’s stats before you build around it.

Hero subhead:

> Choose a Pal, level, and supported modifiers to see expected HP, Attack, and Defense bands with formula assumptions shown near the result.

Primary CTA:

> Calculate stat bands

Secondary CTA:

> Add IV inputs

Input labels:

- Pal
- Level
- IV inputs
- Souls / enhancements
- Condenser stars
- Passive modifiers
- Data version

Result labels:

- Expected HP
- Expected Attack
- Expected Defense
- Stat band
- Formula version
- Caveats

H2 sections:

1. H2: Preview expected stats by level
   - Copy: Use the stats calculator to estimate how a Pal’s HP, Attack, and Defense may look at a selected level with supported modifiers.

2. H2: Compare builds with visible assumptions
   - Copy: Stat outputs should show formula version and modifier caveats so players can compare builds without assuming unsupported data is included.

3. H2: Connect stat planning with breeding routes
   - Copy: After reviewing stat bands, move to breeding or route planning to decide which parents or target Pals to prioritize.

FAQ:

Q: Is the stats calculator the same as the IV calculator?
A: No. The stats calculator estimates expected stat bands, while the IV calculator estimates IV ranges from observed stats.

Q: Which stats are included?
A: MVP copy focuses on HP, Attack, and Defense where data and formulas support them.

Q: Why do formula caveats matter?
A: Patches, modifiers, rounding, and unsupported inputs can change the result or confidence level.

### 5.6 Passive skill calculator `/passive-skill-calculator/`

Index: yes
Canonical: `{CANONICAL_ORIGIN}/passive-skill-calculator/`
Primary keyword: palworld passive skill calculator
Schema: SoftwareApplication, FAQPage
Primary component: PassivePlanner
Primary CTA: Plan passives
Target word count: 650-900 words below calculator UI

Title:

> Palworld Passive Skill Calculator - Plan Breeding Passives

Meta description:

> Plan Palworld passive skills for a target Pal with candidate routes, parent notes, RNG caveats, unsupported-data flags, and links to breeding tools.

OG title:

> Palworld Passive Skill Calculator

OG description:

> Choose a target Pal and desired passives to plan next breeding steps with clear inheritance and data caveats.

H1:

> Palworld Passive Skill Calculator

Hero eyebrow:

> Passive planning with RNG caveats

Hero headline:

> Plan passives without pretending RNG disappears.

Hero subhead:

> Choose a target Pal and desired passive skills to see candidate planning notes, related breeding routes, and inheritance caveats where supported.

Primary CTA:

> Plan passive route

Secondary CTA:

> Open breeding route

Input labels:

- Target Pal
- Desired passive skills
- Optional owned parents
- Data version

Result labels:

- Candidate parents or route notes
- Desired passives
- Unsupported flags
- RNG caveat
- Next action

H2 sections:

1. H2: Choose the passives you want to plan around
   - Copy: Start with a target Pal and desired passive skills. The planner should help you decide the next breeding action where data supports it.

2. H2: Keep passive inheritance caveats visible
   - Copy: Passive inheritance can involve RNG. PalCalculator should never present unsupported odds or deterministic outcomes as certainty.

3. H2: Move from passive planning to route steps
   - Copy: When a candidate path exists, send the target and constraints to the breeding route calculator so players can see practical next steps.

FAQ:

Q: Can the passive planner promise exact passive inheritance?
A: No. Passive inheritance can involve RNG, so copy must frame outputs as planning guidance.

Q: What if a passive combination is unsupported?
A: The result should show an unsupported-data flag and suggest checking breeding routes or data sources.

Q: Can I use owned Pals in passive planning?
A: Optional owned-parent inputs can help planning where supported, but MVP should not store private owned-Pal lists server-side.

### 5.7 Palworld 1.0 breeding calculator `/palworld-1-0-breeding-calculator/`

Index: yes
Canonical: `{CANONICAL_ORIGIN}/palworld-1-0-breeding-calculator/`
Primary keyword: palworld 1.0 breeding calculator
Schema: SoftwareApplication, FAQPage
Primary component: BreedingCalculator
Primary CTA: Use 1.0 calculator
Target word count: 650-900 words below calculator UI

Title:

> Palworld 1.0 Breeding Calculator - Updated Combos & Routes

Meta description:

> Use a Palworld 1.0 breeding calculator for parent pairs, children, special combos, route links, data-version notes, and update caveats.

OG title:

> Palworld 1.0 Breeding Calculator

OG description:

> Calculate breeding pairs and routes using the selected Palworld 1.0 dataset with visible update and caveat notes.

H1:

> Palworld 1.0 Breeding Calculator

Hero eyebrow:

> Built around selected Palworld 1.0 data

Hero headline:

> Use 1.0 breeding data without losing the caveats.

Hero subhead:

> Calculate parent pairs, children, and route links for the selected Palworld 1.0 dataset while checking update notes and unsupported states.

Primary CTA:

> Use 1.0 calculator

Secondary CTA:

> View data version

H2 sections:

1. H2: Calculate breeding with visible 1.0 data notes
   - Copy: Use this page when freshness is the main concern. The calculator should show the current dataset, last update, and special-combo caveats near the result.

2. H2: Move from parent pairs to route planning
   - Copy: A 1.0 pair result should link directly into the route calculator for players who want the shortest path from their owned Pals.

3. H2: Check unsupported data before trusting a result
   - Copy: If data is missing, conflicted, or unsupported, the page should say so clearly rather than filling gaps with guesses.

FAQ:

Q: What makes this page different from the main breeding calculator?
A: This page targets players specifically looking for Palworld 1.0 breeding data and update notes. It can reuse the same calculator component with 1.0-focused copy.

Q: Does PalCalculator update instantly after patches?
A: No instant-update claim should be made. The page should show the selected data version and last-updated date.

Q: Can I find routes here?
A: Breeding results should link to route planning, especially when users need a step-by-step path from owned Pals.

### 5.8 Data sources `/data-sources/`

Index: yes
Canonical: `{CANONICAL_ORIGIN}/data-sources/`
Primary keyword: palworld calculator data source
Schema: Article
Primary component: DataSourcesPage
Primary CTA: View latest data version
Target word count: 800-1,200 words

Title:

> PalCalculator Data Sources & Update Policy

Meta description:

> Review PalCalculator data sources, Palworld version notes, last-updated dates, formula assumptions, unsupported data, and correction paths.

H1:

> PalCalculator Data Sources & Update Policy

Hero headline:

> See what data PalCalculator uses before you trust a result.

Hero subhead:

> Calculator outputs depend on the selected Palworld data version, formula assumptions, and supported source categories.

Required H2 sections and copy:

1. H2: Current data version
   - Copy: Show `Palworld version`, `dataset build ID`, `last updated`, and `formula version` before launch. Do not publish this page with placeholders unless owner-approved.

2. H2: Source categories
   - Copy: List approved source categories such as patch notes, manual verification, allowed public game data, and community-reported corrections where permitted. Competitor pages must not be the sole source of truth.

3. H2: What is included
   - Copy: Pals, breeding pairs, special combos, passive skills, stat formulas, and route rules where supported.

4. H2: What is unsupported or uncertain
   - Copy: List missing data, uncertain formulas, unsupported passive calculations, and known caveats.

5. H2: Correction path
   - Copy: Give users a contact or issue path to report suspected data problems. Contact email is [待确认].

6. H2: Update policy
   - Copy: Explain how quickly the site aims to review patches without making instant-update claims.

FAQ:

Q: Why do data sources matter?
A: Breeding, stats, and passive behavior can change after patches. Source and update notes help users judge the result.

Q: Does PalCalculator copy competitor data?
A: Competitor pages must not be the sole source of truth. The production data workflow must document approved sources and verification steps.

Q: What happens when data is missing?
A: Tools should show unavailable or caveated states instead of fabricating a result.

### 5.9 Privacy `/privacy/`

Index: yes
Canonical: `{CANONICAL_ORIGIN}/privacy/`
Schema: WebPage
Primary component: LegalPage
Target word count: legal owner review required

Title:

> Privacy Policy

Meta description:

> Read how PalCalculator handles calculator inputs, browser-local state, share URLs, analytics, hosting logs, and future import features.

H1:

> Privacy Policy

Required copy points for legal drafting:

- Who operates the site: [待确认]
- Contact email: [待确认]
- Calculator inputs may include Pal names, parent pairs, target Pal, owned-Pal lists, IV/stat fields, desired passives, and share URL state.
- MVP should not upload save files or persist owned-Pal lists server-side unless a feature clearly says otherwise.
- Analytics provider is [待确认]. Do not enable analytics copy without naming provider and retention.
- Cloudflare may process hosting, security, and edge-delivery logs.
- Share URLs may encode selected Pals or settings.
- Browser storage may hold recent calculator state if implemented.
- Users can clear local data through browser controls and/or a future UI control.
- Retention periods are [待确认].
- Not directed to children under 13.

### 5.10 Terms `/terms/`

Index: yes
Canonical: `{CANONICAL_ORIGIN}/terms/`
Schema: WebPage
Primary component: LegalPage
Target word count: legal owner review required

Title:

> Terms of Use

Meta description:

> Read PalCalculator terms for unofficial fan-tool use, data caveats, permitted use, third-party links, and no-affiliation notices.

H1:

> Terms of Use

Required disclaimer copy:

> This site is provided as an independent fan tool. References to Palworld, Pal names, game mechanics, or related terms are for identification and compatibility purposes only. We do not claim ownership of Palworld or related trademarks, logos, characters, artwork, or game assets.

Required copy points for legal drafting:

- Acceptance of terms.
- Unofficial fan-site disclaimer and no affiliation.
- PalCalculator owns original UI/text/code only.
- Palworld names and marks belong to their respective owners.
- Personal gameplay planning and informational use only.
- Do not abuse, scrape, interfere with service, or misrepresent outputs as rights-holder data.
- Calculator outputs may be incomplete, outdated, or wrong.
- Patches can change mechanics.
- No warranty / limitation language appropriate for a free fan tool.
- Third-party links, ads, or affiliate disclosures only if added later.
- Contact email: [待确认].

## 6. Schema copy blocks

### 6.1 WebSite schema copy

name:

> PalCalculator

description:

> PalCalculator is an unofficial fan-made Palworld calculator hub for breeding routes, IV/stat checks, passive planning, and data-version-aware results.

potentialAction search placeholder:

> Search Palworld calculators, Pals, breeding routes, IV/stat tools, and passive planning pages.

### 6.2 SoftwareApplication schema copy for tool pages

applicationCategory:

> GameApplication

operatingSystem:

> Web

isAccessibleForFree:

> true

offers:

> Free MVP calculators; no payment required for P0 tools.

description base:

> An unofficial fan-made Palworld calculator that helps players plan breeding, route, IV/stat, or passive tasks using the selected data version and visible caveats.

Tool-specific descriptions:

- Breeding: Calculate Palworld children from parent pairs or find parent pairs for a target Pal with special-combo notes.
- Route: Find the best breeding route found from owned Pals to a target Pal for the selected dataset and constraints.
- IV: Estimate HP, Attack, and Defense IV ranges from observed stats, level, and supported modifiers.
- Stats: Estimate expected Palworld stat bands by Pal, level, IV inputs, and supported modifiers.
- Passive: Plan desired passive skills with candidate breeding notes, unsupported-data flags, and RNG caveats.

### 6.3 FAQPage schema copy rules

Use FAQ schema only for FAQs visible on the same page.

FAQ answer style:

- First sentence answers directly.
- Second sentence gives caveat or next action.
- Avoid promotional fluff.
- Avoid unsupported accuracy claims.

### 6.4 Article schema copy for `/data-sources/`

headline:

> PalCalculator Data Sources & Update Policy

description:

> How PalCalculator documents Palworld data versions, source categories, formula assumptions, unsupported data, and correction paths.

articleSection:

> Data sources, update policy, formula caveats, unsupported data, correction path

## 7. Use-case cards using BAB

### Card 1: You know the target Pal

Before:

> You search parent pairs in one tab and route steps in another.

After:

> You start with the target Pal and move directly from pairs to route planning.

Bridge:

> Enter the target Pal and choose breeding or route mode.

CTA:

> Start with a target Pal

### Card 2: You have a limited Palbox

Before:

> You know what you own, but not which chain gets you to the target fastest.

After:

> You see route steps, missing Pals, and alternatives for the selected dataset.

Bridge:

> Paste your owned Pal list and choose a target.

CTA:

> Find shortest route

### Card 3: You are checking a breeder Pal

Before:

> A Pal looks strong, but you are not sure whether its stats are worth breeding.

After:

> You see IV ranges, stat bands, and formula caveats before you commit.

Bridge:

> Enter level, observed stats, and supported modifiers.

CTA:

> Check IV ranges

### Card 4: You want a passive build

Before:

> You chase passives without seeing which assumptions are supported by data.

After:

> You get planning notes and RNG caveats before moving to breeding routes.

Bridge:

> Select desired passives and review candidate next steps.

CTA:

> Plan passive route

## 8. Feature copy using FAB

### Feature: Target-first calculator hub

Feature:

> Start with a target Pal and choose the calculator you need.

Advantage:

> You do not have to rebuild the same search across breeding, route, IV/stat, and passive tools.

Benefit:

> You get from question to next action faster.

### Feature: Owned-Pal route solver

Feature:

> Route planning from selected or pasted owned Pals.

Advantage:

> The result is based on what you already have, not only global parent-pair tables.

Benefit:

> You can plan a practical breeding path instead of scanning every possible pair.

### Feature: Data-version badge

Feature:

> Every tool page shows data version and update notes.

Advantage:

> Players can see whether a result matches the current dataset and formula assumptions.

Benefit:

> You can trust the context of the result even when Palworld patches change mechanics.

### Feature: Caveated IV/stat outputs

Feature:

> IV and stat calculators show ranges, confidence notes, and formula caveats.

Advantage:

> The tool does not hide uncertainty from rounding, modifiers, or unsupported formulas.

Benefit:

> You make better breeding decisions without false certainty.

### Feature: Browser-first MVP

Feature:

> P0 calculators are designed to work without login, payment, or server-side save-file upload.

Advantage:

> Players can calculate quickly with lower privacy and friction risk.

Benefit:

> More users can complete a calculator task on mobile without setup.

## 9. Pricing and monetization copy freeze

MVP pricing section, if a template requires it:

H2:

> Free Palworld calculators for MVP

Body:

> PalCalculator’s launch focus is fast calculator utility, not payment flow. P0 tools should be usable without login or payment: breeding, route solving, IV/stat checks, passive planning notes, data sources, and copy/share actions.

Plan card:

Plan name:

> Free

For:

> Palworld players who want breeding, route, IV/stat, and passive planning tools.

Available now:

> MVP calculators, data-version notes, caveats, and share/copy actions.

CTA:

> Start calculating

Optional future waitlist copy:

> Supporter features like saved Palbox sets, route history, and collections may be explored after launch.

Waitlist CTA:

> Request saved Palbox features

Do not publish:

- Dollar price
- Checkout CTA
- Paid plan comparison
- Subscription promise
- Ads/affiliate module
- “free forever” claim

## 10. SEO implementation notes for frontend/design

Do not let design remove or rewrite frozen SEO blocks without copy/SEO review.

Every indexable tool route must include:

- Self-referencing canonical with trailing slash.
- Palworld-qualified title and H1.
- Calculator UI above SEO copy.
- Data-version badge or link near result area.
- Link to `/data-sources/`.
- Footer links to `/privacy/`, `/terms/`, and `/data-sources/`.
- Visible FAQ if FAQ schema is used.
- Sitewide short disclaimer.

Recommended page order for tool pages:

1. Trust/eyebrow line.
2. H1.
3. Short subhead.
4. Primary calculator UI.
5. Data-version/caveat line.
6. Result area.
7. Related calculator CTAs.
8. SEO explainer H2 sections.
9. FAQ.
10. Footer disclaimer and legal links.

## 11. Compliance scan result

Status: PASS FOR COPY FREEZE, with owner/legal review still required before public launch.

Copy avoids:

- Affiliation claims.
- Perfect-accuracy claims.
- Deterministic passive inheritance claims.
- Instant-update claims.
- Payment/subscription claims.
- Server-side save-file upload claims.
- Official asset dependency.

Copy intentionally includes disclaimer language that contains terms like “endorsed,” “sponsored,” and “approved” only inside the negative no-affiliation sentence required by compliance.

Placeholders still requiring owner or downstream resolution before production:

- `{CANONICAL_ORIGIN}` final domain.
- `{LAST_UPDATED}` and dataset build/version values.
- Analytics provider and retention period.
- Legal operator/entity.
- Contact/privacy email.
- Exact data-source workflow.
- Whether browser-local import ships in MVP or P1.

## 12. Acceptance gate self-check

SEO-Copy Freeze Gate:

- [x] Title/meta/H1/H2 frozen for all P0 routes.
- [x] Hero, sections, FAQ, schema copy, and CTA microcopy included.
- [x] Route contract followed: Palworld explicit in indexable routes.
- [x] Calculator-first page structure preserved.
- [x] Compliance-safe disclaimers included.
- [x] Banned accuracy/affiliation/payment claims avoided outside required negative disclaimer.
- [x] Pricing decision followed: free MVP, no login, no payment.
- [x] Data-source and caveat language included.
- [x] Design/frontend handoff constraints included.

## 13. Downstream handoff summary

Status: [DONE]

One-line conclusion:

> PalCalculator copy is frozen as an unofficial fan-made Palworld 1.0 calculator hub with route-first positioning, free MVP CTAs, visible data/caveat language, and route-specific SEO copy for all P0 pages.

Deliverable:

- `/root/projects/palcalculator/artifacts/copy.md`

Must-read for downstream agents:

- `/root/projects/palcalculator/artifacts/copy.md`
- `/root/projects/palcalculator/artifacts/route-contract.md`
- `/root/projects/palcalculator/artifacts/compliance.md`
- `/root/projects/palcalculator/artifacts/pricing.md`

Next recommended agents:

- design_bot: create visual direction using text/data-first UI and no official game assets.
- frontend_bot: implement route pages, calculator-first layout, SEO metadata, footer/legal links, data-version/caveat components.
- backend/data_bot: define actual data source workflow, dataset versions, formula caveats, and route solver boundaries.
- QA_bot after implementation: validate route rendering, metadata, schema, legal links, noindex share routes, and banned-claim scan.

Downstream must not assume:

- Final domain is confirmed.
- Dataset version and last-updated value are ready.
- Analytics provider and retention are approved.
- Official assets can be used.
- Server-side owned-Pal/save-file storage is approved.
- Paid, ads, affiliate, or account features are approved for MVP.

[DONE]
