# PalCalculator Design Source and Frontend Handoff v1

Project: palcalculator
Stage: 06-design
Market: US / English
Status: [DONE]
Date: 2026-07-16
Owner profile: design_bot
Primary inputs:
- /root/projects/palcalculator/artifacts/prd.md
- /root/projects/palcalculator/artifacts/route-contract.md
- /root/projects/palcalculator/artifacts/compliance.md
- /root/projects/palcalculator/artifacts/copy.md

## 1. Design source conclusion

PalCalculator should launch as a text/data-first Palworld calculator hub with a route-planning workstation feel: fast controls above the fold, compact result panels, visible data-version/caveat chips, and original abstract route/egg/node visuals instead of official Palworld art.

Design decision:
- Build a pragmatic gamer utility UI, not a generic AI SaaS landing page.
- Use calculator cards, route diagrams, compact tables, status chips, and source/caveat panels as the core visual language.
- Keep SEO copy below the calculator UI and never let decorative sections push the tool below the fold.
- Do not use official Palworld logos, character art, screenshots, sprites, extracted icons, or official-style trade dress.

Primary design promise:
> Start with a target Pal, choose the calculator task, and see the next route, caveat, or related tool without leaving the flow.

## 2. Visual Style Rationale

### Option A — Generic AI SaaS gradient dashboard

Description:
- White page, purple/blue gradients, abstract glowing cards, Inter-style typography, large centered hero, three feature cards.

Pros:
- Easy to implement.
- Familiar conversion pattern.

Cons:
- Too close to generic AI SaaS visual language.
- Does not communicate game utility or data trust.
- Risk of burying calculator UI behind marketing hero copy.
- Violates the project need to avoid a default SaaS look.

Decision: REJECTED.

### Option B — Dark gamer wiki / cyber HUD

Description:
- Near-black background, neon accent, game-like panels, dense stats cards, glowing borders.

Pros:
- Fits a gaming audience.
- Makes data panels and route graphs feel natural.

Cons:
- Heavy dark theme can reduce readability for long SEO/legal copy.
- Neon styling can feel unofficial in a risky way if it resembles game UI.
- Higher accessibility burden for contrast, focus states, and table readability.

Decision: NOT FOR MVP DEFAULT. Can inspire compact node/route motifs, but not the full theme.

### Option C — Clean field-guide calculator workspace

Description:
- Warm light background, slate text, teal utility accents, amber result/action highlights, rounded but not overly soft cards, original line icons, route nodes, egg/branch diagrams.

Pros:
- Text/data-first and safe for compliance.
- Readable on mobile and desktop.
- Friendly for beginners while still useful for power users.
- Lets calculator UI, result tables, and caveats dominate over decorative art.
- Works with long frozen SEO content and legal copy.

Cons:
- Needs careful component density so it does not become bland.
- Requires original small icon system to avoid asset dependency.

Decision: SELECTED.

Final visual direction:
- “Clean field-guide calculator workspace”: utility-first, lightly playful, route-first.
- Abstract motifs: route lines, branch paths, eggs, database/version tags, stat bars, passive chips.
- Tone: helpful, transparent, caveated, fan-made.

## 3. Brand and visual principles

1. Calculator first
   - The user must see a usable calculator entry point above the fold on every P0 tool page.
   - Hero copy is short; controls appear before feature storytelling.

2. Route-first differentiation
   - Homepage and route page should visually emphasize pathfinding from owned Pals to target Pal.
   - Use route nodes and step lists as the signature design element.

3. Trust is visible
   - Data version, last updated, formula caveats, and source links are persistent near inputs/results.
   - Legal/footer disclaimer is present sitewide.

4. Text/data-first IP safety
   - No official game art/logos/screenshots/sprites/extracted assets.
   - Use original icons and generic silhouettes only.

5. Mobile-first density
   - Forms stack clearly on mobile.
   - Results become cards instead of wide tables.
   - Sticky bottom action can be used only for primary calculate/copy actions, not ads.

## 4. Design tokens

### 4.1 Color system

Use at most three core colors, following the 60/30/10 rule.

60% main/background:
- Token: --color-bg
- Value: #F7F4EA
- Use: page background, large whitespace, SEO/legal content areas.
- Rationale: warm field-guide paper tone; softer than stark white and game-safe.

30% secondary/structure:
- Token: --color-ink
- Value: #17212B
- Use: body text, headings, nav, card borders when strong, route line contrast.
- Rationale: high readability and grounded utility feel.

10% accent/action:
- Token: --color-action
- Value: #2A9D8F
- Use: primary CTA, active tabs, selected route node, success/result highlight, focus ring.
- Rationale: teal suggests calculation/confirmation without looking like generic AI purple.

Small semantic extensions, not brand colors:
- --color-warn: #B7791F for caveats, missing data, unsupported states.
- --color-error: #C2413A for invalid inputs and impossible stats.
- --color-muted: #687684 for secondary text.
- --color-card: #FFFDF7 for cards/forms.
- --color-line: #D8D0C2 for borders/dividers.

Accessibility requirements:
- Body text on background: #17212B on #F7F4EA.
- Action text/buttons must pass WCAG AA; use white text on #227C73 when contrast is needed.
- Never use color alone for rarity, warning, invalid, or unsupported states; pair with icon/text.

### 4.2 Typography

Primary font stack:
- font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

English fallback option if frontend wants more native web rendering:
- font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", Arial, sans-serif;

Type scale:
- Hero H1 desktop: 48px / 1.08 / 700
- Hero H1 mobile: 34px / 1.12 / 700
- Page H1 desktop: 40px / 1.12 / 700
- H2: 28px / 1.2 / 700
- H3/card title: 20px / 1.25 / 700
- Body: 16px / 1.65 / 400
- Small/meta: 13px / 1.45 / 500
- Button: 15px / 1 / 700
- Table/result number: 20px / 1.2 / 700

### 4.3 Spacing

Base spacing unit: 4px.
- --space-1: 4px
- --space-2: 8px
- --space-3: 12px
- --space-4: 16px
- --space-5: 20px
- --space-6: 24px
- --space-8: 32px
- --space-10: 40px
- --space-12: 48px
- --space-16: 64px

Layout widths:
- --container-max: 1180px
- --content-max: 760px for SEO/legal prose
- --tool-max: 1040px for calculator workspace

### 4.4 Radius, shadow, borders

- --radius-sm: 8px for inputs/chips.
- --radius-md: 14px for cards.
- --radius-lg: 22px for hero/tool workspaces.
- --border: 1px solid #D8D0C2.
- --shadow-card: 0 10px 30px rgba(23, 33, 43, 0.08).
- --shadow-focus: 0 0 0 3px rgba(42, 157, 143, 0.28).

Use shadows sparingly. Border + background is the default; shadows only for the main calculator shell, active result, and modal/popover overlays.

### 4.5 Icon and illustration style

Allowed:
- Original line icons: calculator, route nodes, egg, stat bars, database cylinder, shield/caveat, copy/share.
- Simple geometric Pal placeholder silhouette only if original and generic.
- Route diagrams using circles, labels, connecting lines.

Not allowed:
- Official Palworld logo.
- Official characters, Pals, screenshots, sprites, extracted item icons, UI frames, or copied artwork.
- Visual style that implies official product ownership.

## 5. Information architecture

### 5.1 Global navigation

Desktop nav:
- Logo/wordmark: PalCalculator
- Breeding
- Route
- IV
- Stats
- Passives
- Data Sources
- Compact badge: Unofficial fan-made

Mobile nav:
- Header: PalCalculator wordmark + menu button.
- Menu drawer links: Breeding, Route, IV, Stats, Passives, Data Sources, Privacy, Terms.
- Keep primary CTA visible in page hero/tool, not in crowded nav.

Footer:
- Short disclaimer: “PalCalculator is an unofficial fan-made tool and is not affiliated with, endorsed by, sponsored by, or approved by Pocketpair or the Palworld team. Palworld and related names are trademarks or properties of their respective owners.”
- Links: Data Sources, Privacy, Terms, Contact if later approved.
- Data version link.

### 5.2 Route IA

P0 routes:
- / — Calculator hub and tool picker.
- /breeding-calculator/ — Parent pair to child and target to parents.
- /breeding-route-calculator/ — Flagship route solver.
- /iv-calculator/ — IV range estimator.
- /stats-calculator/ — Expected stat bands.
- /passive-skill-calculator/ — Passive planning with RNG caveats.
- /palworld-1-0-breeding-calculator/ — 1.0-focused breeding calculator variant.
- /data-sources/ — Data/version/source/update policy.
- /privacy/ — Privacy policy shell requiring owner details before production.
- /terms/ — Terms of Use shell requiring owner/legal review before production.

P1 routes remain design-ready but not visually prioritized at MVP:
- /breed/{pal-slug}/
- /iv/{pal-slug}/
- /stats/{pal-slug}/
- /best-passives/{pal-slug}/
- /share/{result-id}/ noindex by default.

## 6. Page blueprints and wireframes

### 6.1 Shared page structure for all tool pages

Desktop order:
1. Header/nav.
2. Compact trust eyebrow: Unofficial fan-made Palworld 1.0 calculator · Data: {DATA_VERSION} · Updated {LAST_UPDATED}
3. H1 and subhead from copy freeze.
4. Primary calculator shell above the fold.
5. Data version/caveat row under inputs or result header.
6. Result panel.
7. Related calculator actions.
8. SEO H2 sections from copy freeze.
9. Visible FAQ if FAQ schema is emitted.
10. Footer with disclaimer/legal links.

Mobile order:
1. Header.
2. Trust eyebrow and H1.
3. Tool tabs/mode switch.
4. Calculator inputs.
5. Sticky calculate/share action only after user enters data.
6. Result cards.
7. Caveat/source accordion.
8. Related actions.
9. SEO sections/FAQ.
10. Footer.

Shared desktop wireframe:

```
+--------------------------------------------------------------------------------+
| Header: PalCalculator | Breeding | Route | IV | Stats | Passives | Data Sources |
+--------------------------------------------------------------------------------+
| Eyebrow: Unofficial fan-made Palworld 1.0 calculator · Data: v...               |
| H1: [route-specific H1]                                                         |
| Subhead: [copy freeze subhead]                                                  |
|                                                                                |
| +--------------------------- Calculator Shell --------------------------------+ |
| | Mode tabs / task selector                                                    | |
| | +-------------------- inputs --------------------+ +---- trust/caveat ----+ | |
| | | labels, autocomplete, filters, data version    | | Data badge, source   | | |
| | | primary button + secondary action              | | formula caveats     | | |
| | +------------------------------------------------+ +----------------------+ | |
| | +---------------------------- result area -------------------------------+ | |
| | | empty/loading/success/no-result/invalid state                           | | |
| | +-----------------------------------------------------------------------+ | |
| +----------------------------------------------------------------------------+ |
| Related tools                                                                  |
| SEO sections / FAQ                                                             |
| Footer disclaimer and legal links                                              |
+--------------------------------------------------------------------------------+
```

Shared mobile wireframe:

```
+--------------------------------+
| PalCalculator            Menu  |
+--------------------------------+
| Unofficial · Data v...         |
| H1                             |
| Short subhead                  |
| [Mode tabs scroll if needed]   |
| +----------------------------+ |
| | Input label                | |
| | Autocomplete/input         | |
| | Filters                    | |
| | Primary CTA                | |
| +----------------------------+ |
| [Data/caveat accordion]        |
| [Result card stack]            |
| [Copy / Share / Related action]|
| [SEO H2 sections]              |
| [FAQ accordion]                |
| [Footer]                       |
+--------------------------------+
```

### 6.2 Homepage `/`

Design intent:
- Convert broad “Palworld calculator” users into a specific tool task.
- Signature component: target-first hub with tool cards.

Desktop layout:
- Two-column hero:
  - Left: H1, subhead, trust line, target Pal input.
  - Right: route preview card showing Target Pal -> Breeding -> Route -> IV/Stats -> Passives.
- Tool picker cards below hero: Breeding, Route, IV, Stats, Passives.
- Data trust strip: data version, source policy, no login, fan-made.
- SEO H2 sections below.

Desktop homepage wireframe:

```
[Header]
[Hero grid]
  Left:
    Eyebrow: Unofficial fan-made Palworld 1.0 calculator hub
    H1: PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators
    Subhead
    + Target Pal autocomplete -------------------------------------+
    | Type a Pal name to start. Example: Anubis, Jetragon, Orserk |
    | [Start with a target Pal] [Choose a calculator]              |
    +--------------------------------------------------------------+
    Trust: Free MVP tools · No login required · Data-version notes
  Right:
    Route preview card with node diagram
[Tool cards: Breeding | Route | IV | Stats | Passives]
[Data trust strip]
[SEO sections]
[FAQ]
[Footer]
```

Mobile layout:
- H1 and target Pal input first.
- Tool cards become a vertical task list with one-line explanations.
- Route preview becomes a simple horizontal scroll node card or hidden after tool list if space is tight.

Key components:
- CalculatorHub
- PalAutocomplete
- ToolPickerCard
- DataVersionBadge
- TrustStrip

### 6.3 Breeding calculator `/breeding-calculator/`

Design intent:
- Make two modes obvious: Pair to child and Target to parents.
- Keep special-combo and route-link affordances visible.

Desktop layout:
- H1 and compact copy.
- Main shell with mode tabs.
- Pair mode: Parent Pal A, Parent Pal B, Include special combos, Data version, Calculate breeding.
- Target mode: Target child Pal, filters, Find parent pairs.
- Results: child card or parent pair table.
- Each result row includes Route link and Copy result.

Wireframe:

```
[H1: Palworld Breeding Calculator]
[Shell]
  Tabs: Pair to child | Target to parents
  Pair mode:
    [Parent Pal A autocomplete] [Parent Pal B autocomplete]
    [Include special combos toggle] [Data version select/badge]
    [Calculate breeding]
  Result success:
    Child Pal card
    Combo type chip: normal/special
    Caveat line
    [Open breeding route] [Copy this result] [Share]
  Target mode result:
    Parent pair table: Parent A | Parent B | Combo type | Caveat | Route
```

Mobile:
- Tabs full width.
- Inputs stacked.
- Parent pair results as cards, not a table.

### 6.4 Breeding route calculator `/breeding-route-calculator/`

Design intent:
- This is the flagship page; make route solving feel like the core product.
- Show owned-Pal input and target input side-by-side on desktop.

Desktop layout:
- Top shell split:
  - Left panel: Target Pal, Owned Pals, Paste owned Pal list, constraints.
  - Right panel: route preview/result.
- Result success includes route nodes and step-by-step table.
- Missing Pals and alternatives appear as secondary cards.

Wireframe:

```
[H1: Palworld Breeding Route Calculator]
[Shell: two-column]
  Left controls:
    [Target Pal]
    [Owned Pals selector]
    [Paste owned Pal list textarea]
    [Max generations] [Exclude Pals] [Include special combos]
    [Find shortest route]
  Right result:
    Empty: Try with example Pals
    Loading: Searching route options...
    Success:
      Route found · 3 generations · Data v...
      Node diagram: Owned A + Owned B -> Child -> Target
      Step cards/table
      Missing Pals
      Alternative routes
      [Copy route] [Share route]
```

Mobile:
- Controls first.
- Route result uses vertical timeline cards.
- Step cards: Generation, Parent A, Parent B, Child, caveat.
- Missing Pals chips wrap under result header.

Signature visual component:
- RouteTimeline: circles connected by thick #2A9D8F line for active route, #D8D0C2 for alternatives.

### 6.5 IV calculator `/iv-calculator/`

Design intent:
- Make uncertainty/ranges feel intentional and trustworthy.

Desktop layout:
- Form left: Pal, level, observed stats, modifiers.
- Result right: three stat range bars for HP, Attack, Defense.
- Formula caveat panel under result.

Wireframe:

```
[Inputs]
  Pal | Level
  Observed HP | Attack | Defense
  Souls / enhancements | Condenser stars | Passive modifiers
  [Check IV ranges]
[Result]
  HP IV range: [---- range bar ----]
  Attack IV range: [---- range bar ----]
  Defense IV range: [---- range bar ----]
  Confidence note
  Formula version
  [See formula caveats]
```

Mobile:
- Numeric inputs use large touch targets.
- Result bars stack vertically.
- Impossible stat validation is inline below the field.

### 6.6 Stats calculator `/stats-calculator/`

Design intent:
- Similar to IV but focused on expected stat output.

Desktop layout:
- Inputs left: Pal, level, IV inputs, modifiers, data version.
- Results right: Expected HP, Attack, Defense cards, stat band chart.
- Related action: Add IV inputs / Open breeding route.

Mobile:
- Stat cards in a 1-column stack.
- Optional IV inputs inside a collapsible section.

### 6.7 Passive skill calculator `/passive-skill-calculator/`

Design intent:
- Make caveats impossible to miss; never imply deterministic inheritance.

Desktop layout:
- Target Pal autocomplete.
- Desired passive skills multi-select with selected chips.
- Optional owned parents field.
- Result: candidate parent/route notes, unsupported flags, RNG caveat, next action.

Wireframe:

```
[Target Pal]
[Desired passive skills multi-select]
[Optional owned parents]
[Plan passive route]
[Result]
  Candidate notes
  Desired passives chips
  Unsupported flags
  RNG caveat panel
  Next action: Open breeding route
```

Mobile:
- Passive chips are selectable pill buttons.
- If too many passives selected, show inline warning and explain limits.

### 6.8 Palworld 1.0 breeding calculator `/palworld-1-0-breeding-calculator/`

Design intent:
- Reuse BreedingCalculator component but emphasize freshness/update notes.

Differences from `/breeding-calculator/`:
- Data/version panel is larger and appears immediately under hero.
- CTA: Use 1.0 calculator.
- Add “What changed / unsupported” caveat link if backend/data provides content.

### 6.9 Data sources `/data-sources/`

Design intent:
- Trust document with scannable source blocks.

Desktop layout:
- H1 and intro.
- Current data version summary table.
- Source categories cards.
- Included / unsupported two-column list.
- Formula assumptions.
- Correction path.
- Update policy.

Mobile:
- Version summary cards stack.
- Tables become definition lists.

Do not publish with unresolved production placeholders unless owner approves:
- Dataset version.
- Last updated date.
- Formula version.
- Contact/correction path.

### 6.10 Privacy `/privacy/` and Terms `/terms/`

Design intent:
- Plain legal pages, readable, no distracting game styling.

Layout:
- Narrow prose width: 760px.
- Summary box at top for key points.
- Section headings with anchor links.
- Footer links.

Production warning:
- Must replace owner/entity, contact email, analytics provider, retention period, and final domain placeholders before launch.

## 7. Component system

### 7.1 Header

Props:
- currentRoute
- dataVersion optional
- navLinks

States:
- default desktop
- mobile collapsed
- mobile open drawer
- active route

Accessibility:
- menu button has aria-expanded and aria-controls.
- active link uses aria-current="page".

### 7.2 DataVersionBadge

Content:
- “Data: Palworld {version} · Updated {LAST_UPDATED}”
- Link: “View data sources and caveats”
- Tooltip text from copy freeze.

States:
- current
- pending/unset: “Data version pending — do not publish until source and update date are set.”
- outdated/caution if backend provides flag.

### 7.3 CalculatorShell

Props:
- title
- mode tabs
- input area
- result area
- caveat slot
- related actions

Visual:
- Card background #FFFDF7.
- Border #D8D0C2.
- Radius 22px.
- Desktop padding 28-32px; mobile padding 16px.

### 7.4 PalAutocomplete

Requirements:
- Label is always visible.
- Placeholder examples: Anubis, Jetragon, Orserk.
- Shows suggestions with aliases if data supports.
- Invalid state suggests closest names.
- Keyboard navigable.

States:
- empty
- focused
- suggestions open
- selected
- invalid/no match
- disabled/data unavailable

### 7.5 ModeTabs

Used by:
- Breeding calculator pair/target modes.
- Tool picker if frontend uses tabs for home.

Requirements:
- Button semantics or tablist semantics.
- Mobile horizontal scroll allowed but active tab must be fully visible.

### 7.6 ResultPanel

Shared result states:
- empty
- loading
- success
- no result
- invalid input
- data unavailable
- partial/caveated

Always include:
- data version
- caveat line
- copy/share action where relevant
- related next step

### 7.7 RouteTimeline

Used by:
- Route solver.
- Homepage visual preview.
- Breeding result route link preview.

Elements:
- route step node
- parent pair connector
- child node
- missing Pal chip
- generation count
- alternative route toggle

States:
- empty/example
- loading/progress
- success route
- no route
- target already owned
- alternatives available

### 7.8 StatRangeBar

Used by:
- IV calculator.
- Stats calculator.

Visual:
- Horizontal range bar with min/max labels.
- Numeric value/range text never hidden.
- Warn state uses icon + text, not color alone.

### 7.9 CaveatCallout

Types:
- data
- formula
- privacy
- RNG/passive
- unsupported
- legal/fan-site

Content rules:
- Use safe copy from copy.md.
- Never hide caveats behind only a tooltip; show short visible text plus link.

### 7.10 ToolPickerCard

Used by homepage and related tools.

Fields:
- tool name
- one-line task
- primary action
- route link
- icon

Visual:
- Card with icon, task, and arrow.
- Active/primary route card gets subtle #2A9D8F border.

## 8. State design matrix

### 8.1 Shared state requirements

| State | Visual pattern | Copy source | Frontend behavior |
|---|---|---|---|
| Empty | Light placeholder card with example input | copy.md empty states | Do not disable page; show examples |
| Loading | Inline skeleton/result spinner under controls | “Checking the current dataset...” | Do not block full page |
| Long solve | Progress strip in result area | “Searching route options. Large owned-Pal lists can take longer.” | Show if route solve >500ms |
| Success | Result card/table with data badge and actions | route-specific result labels | Show copy/share and related tools |
| No result | Warning callout + suggestions | “No result found...” | Suggest spelling/filter/source notes |
| Invalid input | Inline error under field | “We could not match...” | Focus invalid field; no page reload |
| Data unavailable | Amber unsupported callout | “This calculator does not have enough verified data...” | Do not fabricate result |
| Partial/caveated | Success plus caveat chip/panel | tool-specific caveats | Distinguish partial from failure |
| Target already owned | Success/info card | PRD route solver edge case | Offer IV/stat/passive next actions |
| Unsupported passive combo | Unsupported flag + next action | Passive caveat copy | Offer route/data source links |
| Share warning | Privacy callout near share action | Share URL copy | Warn that URL can include selected state |

### 8.2 Error severity tokens

- Info: data/version/general caveat.
- Warning: missing data, broad IV range, no route under constraints.
- Error: invalid Pal, impossible stat value, unsupported route computation failure.
- Legal/privacy: share URL/private state, fan-made disclaimer.

## 9. Content-fit matrix

| Route | Above-fold content | Calculator UI placement | SEO/body content handling | FAQ/schema fit | Caveat/trust placement |
|---|---|---|---|---|---|
| `/` | Eyebrow, H1, subhead, target input, trust line | Hero left, visible immediately | H2 sections below tool picker; 700-1,000 words allowed | FAQ after SEO sections | Trust strip below tool cards and footer |
| `/breeding-calculator/` | H1, short subhead, mode tabs | First main card above fold | H2 copy below results; pair/target examples can be side notes | FAQ visible after H2 copy | Data badge inside shell and result |
| `/breeding-route-calculator/` | H1, route-first subhead, target/owned controls | Flagship shell immediately under hero | Route education below results; no SEO wall before controls | FAQ after alternatives explanation | Data badge, browser-first privacy note, caveat panel |
| `/iv-calculator/` | H1, formula caveat subhead, stat form | Main form above fold | Explanation below result bars; formula notes link | FAQ after formula section | Formula version and confidence notes near result |
| `/stats-calculator/` | H1, expected stats subhead, stat form | Main form above fold | Compare builds copy below results | FAQ after stat explanation | Formula version near result |
| `/passive-skill-calculator/` | H1, RNG caveat subhead, passive form | Main form above fold | Passive caveat copy below result; avoid certainty | FAQ highly visible because caveats matter | RNG caveat inside result and near CTA |
| `/palworld-1-0-breeding-calculator/` | H1, 1.0 data freshness copy | Breeding shell above fold | Update/freshness H2 sections below | FAQ after freshness copy | Larger data version/update panel before result |
| `/data-sources/` | H1, source intro, current version summary | No calculator | Version/source/update sections; 800-1,200 words | FAQ visible if schema used | Version table at top; unsupported list clear |
| `/privacy/` | H1, legal summary | No calculator | Narrow legal prose; anchor navigation | No FAQ unless visible/legal approved | Privacy summary box |
| `/terms/` | H1, terms summary | No calculator | Narrow legal prose; anchor navigation | No FAQ unless visible/legal approved | Fan-site disclaimer prominent |

## 10. Responsive layout specifications

### 10.1 Breakpoints

- Mobile: 0-639px
- Tablet: 640-899px
- Desktop: 900px+
- Wide desktop: 1200px+

### 10.2 Desktop layout

Header:
- 72px height.
- Container max 1180px.
- Nav visible.

Hero:
- Home: 2-column grid 52/48.
- Tool pages: 1-column intro plus full-width tool shell.
- Max top spacing 48px; do not create a tall empty marketing hero.

Calculator shell:
- Desktop grid can be 55/45 for controls/result on route/IV/stats pages.
- Breeding table can use a full-width result table after controls.
- Keep primary CTA aligned with inputs, not floating far away.

SEO content:
- Use `content-max` 760px or two-column cards for selected sections.
- Do not place long copy inside the calculator shell.

### 10.3 Mobile layout

Header:
- 56px height.
- Drawer nav.

Hero/tool:
- H1 first, then subhead, then inputs.
- Maximum 24px vertical gap between hero text and calculator.
- Inputs full width with 44px minimum touch height.
- Use accordions for filters and caveats if needed, but default caveat line remains visible.

Results:
- Tables become cards.
- Route timeline vertical.
- Copy/share buttons full width or 2-column button row.
- Avoid horizontal scrolling except optional chip rows; no hidden core controls.

Footer:
- Legal/disclaimer text can be compact but readable; no tiny low-contrast legal text.

## 11. Accessibility notes

Keyboard:
- All forms, autocomplete, tabs, filters, copy/share actions, and accordions are keyboard usable.
- Focus ring uses --shadow-focus and remains visible on light/dark card backgrounds.
- Autocomplete supports ArrowDown/ArrowUp/Enter/Escape.

Semantics:
- One H1 per page.
- Form controls use `<label>` or aria-label with visible text.
- Result updates use aria-live="polite" for success/no-result/loading changes.
- Error summaries should focus or announce invalid fields where practical.

Contrast:
- Body text, buttons, chips, and warnings must meet WCAG AA.
- Do not communicate special combos, rarity, warnings, or errors by color alone.

Motion:
- Route line animation optional; respect prefers-reduced-motion.
- Loading states should not use intense flashing/pulsing.

Touch:
- Minimum 44px touch targets for buttons, inputs, chips, and menu items.
- Mobile forms should avoid controls smaller than 16px font to prevent iOS zoom.

## 12. SEO, compliance, and copy guardrails for frontend

Must preserve:
- Palworld-qualified title/H1/meta on every indexable route.
- Calculator UI above SEO body copy.
- DataVersionBadge or equivalent visible on every P0 tool page.
- Link to `/data-sources/` from tool pages.
- Footer links to `/privacy/`, `/terms/`, and `/data-sources/`.
- Sitewide short disclaimer.
- Visible FAQ content if FAQ schema is emitted.

Must not add:
- Official-looking logo/art/game screenshots/sprites/icons/extracted assets.
- “Official”, “endorsed”, “approved”, “authorized”, “partnered”, “sponsored”, “guaranteed”, “100% accurate”, “perfect IVs”, “exact passive odds”, “always current”, “instantly updated”, “free forever”, “no tracking”, or similar claims outside the required negative disclaimer sentence.
- Ads, affiliate modules, pricing tables, checkout, account wall, or paid plan UI at MVP.
- Server-side save-file upload UI unless a later privacy/security design approves it.

## 13. Frontend-ready handoff checklist

### 13.1 Required frontend files/components

Suggested component inventory:
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `components/trust/DataVersionBadge.tsx`
- `components/trust/CaveatCallout.tsx`
- `components/tools/CalculatorShell.tsx`
- `components/tools/PalAutocomplete.tsx`
- `components/tools/ModeTabs.tsx`
- `components/tools/ToolPickerCard.tsx`
- `components/tools/ResultPanel.tsx`
- `components/route/RouteTimeline.tsx`
- `components/stats/StatRangeBar.tsx`
- `components/legal/LegalPageLayout.tsx`

Suggested CSS tokens:
```css
:root {
  --color-bg: #F7F4EA;
  --color-card: #FFFDF7;
  --color-ink: #17212B;
  --color-muted: #687684;
  --color-line: #D8D0C2;
  --color-action: #2A9D8F;
  --color-action-strong: #227C73;
  --color-warn: #B7791F;
  --color-error: #C2413A;

  --font-sans: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --container-max: 1180px;
  --content-max: 760px;
  --tool-max: 1040px;
}
```

### 13.2 Implementation checklist

- [ ] Implement global tokens before page-specific styling.
- [ ] Build Header/Footer with legal/disclaimer links.
- [ ] Build DataVersionBadge and CaveatCallout first because every tool page uses them.
- [ ] Build CalculatorShell as shared layout.
- [ ] Build homepage CalculatorHub and ToolPickerCard.
- [ ] Build BreedingCalculator with Pair to child and Target to parents modes.
- [ ] Build RouteSolver layout with vertical mobile timeline and desktop two-column shell.
- [ ] Build IV/Stats shared stat form and StatRangeBar pattern.
- [ ] Build PassivePlanner with visible RNG caveat and unsupported flags.
- [ ] Build DataSourcesPage and legal page layouts.
- [ ] Add all empty/loading/success/no-result/invalid/data-unavailable states.
- [ ] Add responsive behavior for mobile/tablet/desktop.
- [ ] Add accessibility labels, focus states, aria-live result updates, and keyboard autocomplete behavior.
- [ ] Add metadata/canonical/schema only when visible copy exists.
- [ ] Default `/share/*` result state pages to noindex if implemented.

### 13.3 QA checklist for design implementation

Desktop:
- [ ] Homepage shows target input and tool cards above the fold at 1440x900.
- [ ] Every P0 tool page shows calculator controls above SEO copy at 1440x900.
- [ ] Route solver result can display route steps, missing Pals, alternatives, and copy/share actions without layout break.
- [ ] Long H1/meta-derived copy wraps without overflow.

Mobile:
- [ ] Every P0 task can be completed at 390x844 without horizontal scrolling.
- [ ] Tables become cards.
- [ ] Route timeline becomes vertical.
- [ ] Tap targets are at least 44px.
- [ ] Footer legal disclaimer remains readable.

States:
- [ ] Empty, loading, long solve, success, no result, invalid input, data unavailable, and partial/caveated states are implemented.
- [ ] Invalid Pal and impossible stat errors are inline and focusable.
- [ ] Data unavailable never fabricates a result.
- [ ] Passive planner always shows RNG/inheritance caveat.

Compliance:
- [ ] No official Palworld art/logo/screenshots/assets.
- [ ] Sitewide fan-made disclaimer present.
- [ ] Data source/privacy/terms links present.
- [ ] Banned claims scan passes.

## 14. Asset plan

Create original assets only:
- Wordmark: text-only “PalCalculator” with route-node dot as optional original mark.
- Icons: SVG line icons for calculator, route, egg, stat bars, passive chip, database, warning, copy, share.
- OG image: original abstract route diagram with PalCalculator wordmark and “Unofficial Palworld calculator hub” text; no official art.
- Placeholder visuals: generic nodes/chips/tables, no character silhouettes that resemble copyrighted Pals.

Asset source log requirement:
- If any third-party icon set is used, record license and attribution if required.
- Prefer self-authored inline SVG to avoid license ambiguity.

## 15. Open items /待确认

These do not block the design source but must be resolved before production launch:
- Final canonical origin/domain.
- Dataset version, last-updated date, formula version, and exact source/update workflow.
- Analytics provider and retention period.
- Legal operator/entity and contact/privacy email.
- Whether browser-local import ships in MVP or P1.
- Whether any contact form/newsletter/Discord link exists.
- Final backend decision: static JSON/client-side route solving vs Worker fallback.

## 16. Downstream handoff summary

Status: [DONE]

One-line conclusion:
PalCalculator should use a clean field-guide calculator workspace design: warm light background, slate structure, teal action accent, calculator-first layouts, route timeline as signature component, and visible data/compliance caveats on every tool page.

Deliverable:
- /root/projects/palcalculator/artifacts/design.md

Must-read for frontend_bot:
- /root/projects/palcalculator/artifacts/design.md
- /root/projects/palcalculator/artifacts/copy.md
- /root/projects/palcalculator/artifacts/route-contract.md
- /root/projects/palcalculator/artifacts/compliance.md

Frontend must not assume:
- Official assets can be used.
- Final domain is confirmed.
- Data version and update date are available.
- Analytics provider/retention are approved.
- Server-side save-file or owned-Pal storage is approved.
- Paid/account/ads/affiliate features are approved for MVP.

Next recommended agent:
- frontend_bot to implement the design source and route pages.
- backend/data_bot in parallel if dataset/schema/route solving is not already ready.
- QA_bot after implementation for responsive, accessibility, SEO/schema, compliance, and banned-claim validation.

[DONE]
