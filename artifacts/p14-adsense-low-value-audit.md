# P14 AdSense Low-Value Content Recovery Audit

Task: `t_7b0212c7`  
Site: `https://palcalculator.com`  
Scope: audit/recommendation only; no source edits, no deploy  
Inputs from owner screenshots: AdSense says `palcalculator.com` needs attention for `low-value content`; ads.txt is authorized. AITDK says AdSense/Analytics are detected, robots index/follow, robots.txt and sitemap are available, and homepage word count is about 1276.

## Executive recommendation

PalCalculator is technically crawlable and has a healthy 34-URL sitemap, but it still has a credible AdSense low-value risk because the money pages are app/tool shells with thin static HTML, several trust pages are extremely light, and the newest P13 guide cluster is mechanically similar and mostly workflow/caveat copy rather than distinctive hands-on examples.

Priority for P14 should be content depth and trust, not ads or backend work:

1. Expand the homepage and the six core calculator entry pages with crawlable, page-specific educational sections, examples, FAQs, and internal links.
2. Add lightweight trust/ownership pages or sections: About, Contact/Corrections, Editorial & Data Review Policy, Advertising/Affiliate Disclosure. These can be static pages; no login, backend, Stripe, or dashboard work is required.
3. Upgrade `/data-sources/`, `/privacy/`, and `/terms/` from policy stubs into visible trust pages with last-updated dates, owner/contact path, data limitations, correction workflow, and AdSense disclosure.
4. Strengthen P11/P13 guide pages with original page-specific examples generated from current app data where safe; avoid publishing more near-template pages until the core pages are accepted.

Recommended P14 success target before re-requesting AdSense review: every sitemap URL should have a clear human purpose, visible original value, and enough crawlable page-specific copy that the site no longer looks like a thin calculator shell plus templated guide farm.

## Evidence gathered

### Source inventory

Relevant source files inspected:

- `src/main.tsx`: route metadata, tool UI, trust page components, guide rendering, disclaimer, JSON-LD.
- `src/guides-data.json`: 24 guide routes and their intro/sections/links/FAQs.
- `scripts/generate-static-routes.mjs`: static route generation, sitemap, 404, Ads/Analytics injection.
- `public/sitemap.xml`: canonical 34 URL sitemap.
- `public/robots.txt`: `Allow: /`, `/share/` disallowed, sitemap declared.
- `artifacts/p13-live-verification-results.json`: confirms P13 live verification and previous QA details.

Key source details:

- Route metadata in `src/main.tsx` defines homepage, six tool/calculator entry points, data sources, privacy, terms, and 24 guide pages.
- `scripts/generate-static-routes.mjs` generates one static HTML page per route and writes 34 sitemap URLs.
- Non-guide static body generation currently uses the same compact pattern for all calculator/trust pages: route H1/description, a list of calculator links, a list of guide links, and links to data/privacy/terms.
- Trust copy exists, but the React-rendered `/data-sources/`, `/privacy/`, and `/terms/` components are short and lack a complete public contact/editorial/advertising transparency story.

### Live inventory

Live checks used a browser-like user agent after default Python requests were blocked with 403. With user-agent set, live sitemap, robots.txt, homepage, and all sitemap URLs returned 200.

Sitemap status:

- `https://palcalculator.com/sitemap.xml`: 200
- Sitemap URLs: 34
- `https://palcalculator.com/robots.txt`: 200
- robots.txt body: `User-agent: *`, `Allow: /`, `Disallow: /share/`, sitemap declared
- Query/share/result URLs are not in sitemap, consistent with prior P13 verification.

Live route word-count sample from static HTML extraction:

| Group | URLs | Live visible/static word-count finding |
| --- | ---: | --- |
| Homepage | 1 | `/` about 189 extracted words in static HTML; AITDK screenshot reports 1276 after rendering |
| Calculator pages | 6 | `/breeding-calculator/`, `/breeding-route-calculator/`, `/iv-calculator/`, `/stats-calculator/`, `/passive-skill-calculator/`, `/palworld-1-0-breeding-calculator/` each about 184-186 words in static HTML |
| Trust/policy pages | 3 | `/data-sources/`, `/privacy/`, `/terms/` each about 183-185 words in static HTML |
| P11/P13/guide pages | 24 | about 577-1247 live static words, depending on page |

Guide page live word-count range:

- Strongest guide pages: `/guides/palworld-breeding-route-examples/` about 1247 words; `/guides/best-passive-skills-for-breeding-palworld/` about 1130; `/guides/how-to-breed-anubis-palworld/` about 1104; `/guides/palworld-iv-explained/` about 1087.
- Thin newest/P13-style pages: `/guides/how-to-breed-faleris-palworld/` about 677; `/guides/how-to-breed-kitsun-palworld/` about 609; `/guides/how-to-breed-suzaku-palworld/` about 598; `/guides/how-to-breed-helzephyr-palworld/` about 577; `/guides/how-to-breed-selyne-palworld/` about 579.

## Likely low-value causes

### 1. Core calculator pages look thin to non-JS or static-first review

The highest-value pages are the six calculator entry points, but static HTML currently gives each only a H1, one sentence, and navigation lists. Even though React renders richer interactive UI for users, AdSense reviewers and quality classifiers may evaluate the static/crawlable content and see each calculator URL as a near-duplicate thin shell.

Risk signals:

- Similar static body across all tool pages.
- Low page-specific explanatory content before JavaScript execution.
- Calculators do useful work, but the crawler-visible landing copy does not fully explain use cases, examples, limitations, data source methodology, or how to interpret results.
- The homepage may render to more words in browser tools, but source/static extraction is still compact and navigation-heavy.

### 2. Trust footprint is underdeveloped for monetization

AdSense low-value reviews often overlap with perceived site quality/trust. PalCalculator has privacy/terms/data-source URLs, which is good, but the visible trust content is still minimal.

Missing or weak elements:

- No dedicated About page explaining what PalCalculator is, who maintains it, and why it exists.
- No dedicated Contact/Corrections page or visible non-login correction workflow. Current copy says to use owner support/contact path before launch, which is not enough as a public trust signal.
- No standalone Editorial/Data Review Policy page describing source selection, caveat handling, update cadence, and human review expectations.
- No Advertising/Affiliate Disclosure page or section explaining AdSense, cookies, ad personalization, and no paywall/account requirement.
- No visible last-updated date on trust pages.

### 3. Data-source page is a trust opportunity but currently too short

`/data-sources/` should be one of the strongest pages for an unofficial game calculator. It currently lists dataset fields and source refs, but should become a fuller methodology page that helps both users and reviewers understand why outputs are caveated and not copied from a wiki.

Risk signals:

- Source categories are present but not explained enough for a non-technical reviewer.
- Correction path is not public/actionable.
- No explicit editorial process: how conflicts are handled, when unsupported states stay unavailable, when a page gets updated, and how risky claims are avoided.

### 4. P13 pages are useful as long-tail landing pages but can look templated

The newest P13 pages are the thinnest guide group and share the same structure:

- exact target selection
- parent-pair check
- owned-Pal route planning
- variant caveat
- passive/IV/stat follow-up
- no-route troubleshooting

This is a safe editorial pattern, but repeated across many Pal-specific pages it can look like low-value programmatic SEO unless each page adds distinctive, concrete, reviewed examples.

Risk signals:

- Several P13 pages are under ~700 static words.
- Many sections describe workflows instead of giving page-specific route examples, parent-pair examples, player scenarios, or data-specific interpretation.
- Heavy caveats protect accuracy but can also make pages feel non-committal if there are no original examples.

### 5. Original commentary and practical examples are uneven

The strongest guide pages explain concepts and decision frameworks. The weakest pages repeatedly tell users to check the calculator without giving enough sample interpretation. For AdSense recovery, the site needs to show human-added value beyond a tool and route list.

Examples of missing value:

- No page-specific example result blocks for core calculator pages.
- No comparison tables showing when to use Breeding vs Route vs IV vs Stats vs Passives.
- No beginner mistakes/checklists directly embedded on each calculator page.
- No concrete correction/data-review case study.
- No visible screenshots/images are required, but if added later they should have descriptive alt text and not be decorative filler.

## P14 priorities

### P0: Do not change monetization mechanics during recovery

Do not add new ad placements, sticky ads, interstitials, login gates, paywalls, subscription offers, or backend storage during P14. The current issue is low-value content, not ads.txt or availability. Keep AdSense script presence, but focus the review request on improved content/trust.

### P1: Homepage and core calculator pages first

The homepage and core calculators are the most important AdSense review targets. They should stop looking like thin app shells.

Target pages:

1. `/`
2. `/breeding-calculator/`
3. `/breeding-route-calculator/`
4. `/iv-calculator/`
5. `/stats-calculator/`
6. `/passive-skill-calculator/`
7. `/palworld-1-0-breeding-calculator/`

### P2: Trust pages second

Target pages:

1. `/data-sources/`
2. `/privacy/`
3. `/terms/`
4. New `/about/`
5. New `/contact/` or `/corrections/`
6. New `/editorial-policy/`
7. Optional new `/advertising-disclosure/` if not merged into About/Privacy

### P3: Strengthen guide pages after core/trust

Start with the newest/thinnest P13 pages, then review older P11 pages and topic guides.

First guide pages to enhance:

1. `/guides/how-to-breed-selyne-palworld/`
2. `/guides/how-to-breed-helzephyr-palworld/`
3. `/guides/how-to-breed-suzaku-palworld/`
4. `/guides/how-to-breed-kitsun-palworld/`
5. `/guides/how-to-breed-faleris-palworld/`
6. `/guides/how-to-breed-grizzbolt-palworld/`
7. `/guides/how-to-breed-lyleen-palworld/`
8. `/guides/how-to-breed-astegon-palworld/`
9. `/guides/how-to-breed-blazamut-palworld/`
10. `/guides/palworld-breeding-path-finder/`

## Page-by-page P14 action plan

### Homepage: `/`

Current issue: Static page is mostly route/guide lists. AITDK reported 1276 words after rendering, but source/static extraction shows much less crawlable standalone value.

Actions:

- Add a crawlable `What PalCalculator helps with` section explaining the five main jobs: parent pairs, owned-Pal routes, IV estimates, stat bands, passive planning.
- Add a `Choose the right calculator` comparison table:
  - If you know two parents -> Breeding Calculator
  - If you know target and owned Pals -> Route Calculator
  - If checking hidden stat quality -> IV Calculator
  - If comparing expected stat bands -> Stats Calculator
  - If planning desired traits -> Passive Skill Calculator
- Add a `How to use the site safely` section with caveats: unofficial fan-made, data version, unsupported states, no guaranteed passive inheritance, no exact odds.
- Add a `Data and privacy at a glance` section linking to Data Sources, Privacy, Terms, About/Contact/Editorial Policy.
- Add one original beginner scenario: `I want Anubis but only own Penking and Bushi` and explain the sequence of pages to use without claiming a guaranteed route unless generated from app data.
- Keep the tool cards, but make them secondary to explanatory content rather than the main content.

Acceptance criteria:

- Static homepage has at least 900-1200 genuinely useful words excluding navigation/footer/link lists.
- Contains at least one internal comparison table and one beginner workflow example.
- Links to all six calculator pages plus data/trust pages using descriptive anchors.
- Keeps `unofficial fan-made` caveat visible above or near the first actionable section.
- No risky terms from the policy section below.

### Breeding Calculator: `/breeding-calculator/`

Current issue: Static page is one sentence plus navigation. The React tool is useful, but the landing page needs standalone educational value.

Actions:

- Add sections:
  - `What this calculator does`
  - `Pair to Child vs Target to Parents`
  - `How to check a parent pair`
  - `How to find parents for a target Pal`
  - `How to read unavailable/special-combo states`
  - `Common mistakes before following a combo`
  - `Related workflows: Route, Passives, Data Sources`
- Add 2-3 safe examples using current demo values already in UI copy: Anubis target lookup, Penking + Bushi pair, Jetragon unavailable/needs caveat example if the data returns no result.
- Include a short glossary: parent pair, child result, target parent lookup, normal formula, special combo, unsupported state.

Acceptance criteria:

- At least 800 words of page-specific static explanatory copy.
- At least 2 editable example descriptions and 1 unsupported-state explanation.
- Internal links to Route, Passive, 1.0 Breeding, Data Sources, and at least 3 relevant guide pages.
- Does not claim all parent pairs are covered or official.

### Breeding Route Calculator: `/breeding-route-calculator/`

Current issue: This is a differentiating feature but static copy does not fully explain owned-Pal planning or route interpretation.

Actions:

- Add sections:
  - `What a route calculator adds beyond a combo list`
  - `Inputs: target Pal, owned Pals, max generations`
  - `How to read route steps, route tree, missing Pals, alternatives`
  - `Browser-local owned-Pal helper privacy`
  - `When no route appears`
  - `How to compare practical routes`
- Add one safe route interpretation example using the existing demo `target Anubis, owned Pals Penking + Bushi, max generations 3`. If exact generated output is added, it must be generated from current app data during implementation and not hand-invented.
- Add a mini checklist for reviewing a route before spending resources.

Acceptance criteria:

- At least 900 words of route-specific static copy.
- Explains all result states: found, already owned, no route, missing Pals, alternatives.
- Clearly states owned-Pal helper uses localStorage only, no account/upload/backend sync.
- Links to Breeding, Passives, IV, Stats, Data Sources, and route-related guides.

### IV Calculator: `/iv-calculator/`

Current issue: Static copy is too short for a YMYL-like calculator review pattern, even though this is game content. It should explain limitations and inputs thoroughly.

Actions:

- Add sections:
  - `What IVs mean in Palworld`
  - `Inputs needed for an estimate`
  - `Why results are ranges, not proof`
  - `Modifiers to check before trusting an estimate`
  - `Example level/stat workflow`
  - `When to use Stats Calculator instead`
- Add a visible caveat block: formula assumptions, modifiers, rounding, patch changes, unsupported states.
- Add one sample interpretation of a broad IV band without implying exact/perfect values.

Acceptance criteria:

- At least 800 words of IV-specific copy.
- Mentions level, observed HP/Attack/Defense, passives/modifiers, rounding, data version, unsupported formulas.
- Uses words like `estimate`, `range`, and `planning signal`; avoids `exact`, `perfect`, `guaranteed` except inside a warning not to claim them.
- Links to Stats, Passives, Data Sources, and IV guide.

### Stats Calculator: `/stats-calculator/`

Current issue: Thin static entry page and likely too similar to IV page unless it explains a different job.

Actions:

- Add sections:
  - `Stats calculator vs IV calculator`
  - `Expected HP/Attack/Defense bands`
  - `How level and base stats affect estimates`
  - `When stats can look outside a band`
  - `Use cases: breeder review, combat planning, checking odd inputs`
- Add a comparison table between Stats and IV.
- Add examples that are clearly illustrative and caveated.

Acceptance criteria:

- At least 700-900 words of stats-specific copy.
- The page has a distinct intent from `/iv-calculator/`.
- Includes at least one table and one example interpretation.
- Links to IV, Data Sources, and relevant guides.

### Passive Skill Calculator: `/passive-skill-calculator/`

Current issue: Thin static copy; high risk if it seems to promise passive outcomes.

Actions:

- Add sections:
  - `What passive planning can and cannot do`
  - `Choose passives by role`
  - `How to enter desired passives`
  - `Recognized vs unsupported passive names`
  - `Why inheritance odds are not claimed`
  - `Next step: check parent pairs or routes`
- Add role table: base worker, combat, mount/utility, future breeder.
- Add caveated examples: `Artisan + Serious` for work planning, `Swift` for movement/utility, without claiming guaranteed inheritance.

Acceptance criteria:

- At least 800 words of passive-specific copy.
- Includes role-based planning table.
- Explicitly says passive inheritance may involve RNG and exact odds are not claimed.
- Links to Breeding, Route, IV, Stats, Data Sources, passive guide, base-worker-passives guide.

### Palworld 1.0 Breeding Calculator: `/palworld-1-0-breeding-calculator/`

Current issue: It overlaps heavily with `/breeding-calculator/`. Without unique 1.0-specific content, it can look duplicative.

Actions:

- Position it as the version-aware entry point, not a duplicate calculator.
- Add sections:
  - `What is different about the 1.0 calculator page`
  - `Data freshness and patch timing`
  - `Special-combo coverage caveats`
  - `When to use the standard breeding calculator instead`
  - `Before relying on an old combo chart`
- Add a version-review checklist.

Acceptance criteria:

- At least 700-900 words of 1.0-specific copy.
- Clearly differentiates from `/breeding-calculator/`.
- Links to Data Sources and 1.0 guide prominently.
- Avoids implying instant updates, complete coverage, or official game data.

### Data Sources: `/data-sources/`

Current issue: Currently a short data status page. This should become the strongest trust page.

Actions:

- Add sections:
  - `What data PalCalculator uses`
  - `What data is intentionally unsupported`
  - `How conflicts are handled`
  - `Update cadence and last reviewed date`
  - `Correction workflow`
  - `Why unsupported states are shown instead of guessed`
  - `Trademark/fan-made status`
- Add a source table with columns: source/category, used for, not used for, caveats.
- Add correction instructions that do not require login: provide a public email alias, GitHub issue URL, form URL, or other owner-approved contact path.
- Add a visible `Last reviewed` date.

Acceptance criteria:

- At least 900 words of trust/methodology copy.
- Has a public correction/contact path before AdSense resubmission.
- Includes visible source categories and unsupported domains.
- Links to About/Contact/Editorial Policy/Privacy/Terms.

### Privacy: `/privacy/`

Current issue: Policy exists but is short. For AdSense, privacy should clearly explain ads, analytics, localStorage, and cookies.

Actions:

- Add sections:
  - `Summary`
  - `Calculator inputs and browser-local storage`
  - `Share URLs`
  - `Analytics`
  - `Advertising and Google AdSense`
  - `Cookies and personalization controls`
  - `No account, no payment, no server-side Palbox upload`
  - `Contact for privacy/corrections`
  - `Last updated`
- Link to Google ad/privacy resources where appropriate.
- Keep language plain and factual.

Acceptance criteria:

- At least 700 words of privacy-specific copy.
- Mentions Google AdSense and cookies/similar technologies.
- Explains localStorage-only owned-Pal helper and share URL privacy.
- Includes contact/correction path and last-updated date.

### Terms: `/terms/`

Current issue: Terms are very short and should better explain acceptable use, unofficial status, data caveats, no guarantee, and user responsibility.

Actions:

- Add sections:
  - `Unofficial fan-site status`
  - `Calculator output limitations`
  - `Acceptable use`
  - `No warranties / no guaranteed accuracy`
  - `Trademarks and game references`
  - `Advertising disclosure link`
  - `Changes and contact`
- Keep it concise but enough to signal legitimacy.

Acceptance criteria:

- At least 500-700 words.
- Clear unofficial fan-made language.
- Does not overpromise accuracy, completeness, or official support.
- Links to Privacy, Data Sources, About/Contact.

### New About page: `/about/`

Purpose: Provide ownership/editorial transparency without exposing private personal data if the owner does not want that.

Actions:

- Create a static page explaining:
  - What PalCalculator is.
  - Why it exists for Palworld players.
  - It is unofficial fan-made and independent.
  - How the data/caveat philosophy works.
  - Who maintains it at the site/brand level. If owner does not want a personal name, use `PalCalculator maintainer/team` plus a contact path.
  - How to report corrections.

Acceptance criteria:

- Sitemap inclusion only after content is complete.
- At least 500 words.
- Links to Contact/Corrections, Data Sources, Privacy, Terms.
- Uses no official/endorsed language.

### New Contact or Corrections page: `/contact/` or `/corrections/`

Purpose: Close the trust gap. Current source copy refers to an owner support/contact path but does not expose one publicly.

Actions:

- Add owner-approved public contact method: email alias, form, GitHub issue, or social profile.
- Explain what to include in a correction report: Pal name, game version, expected result, current PalCalculator result, source link, reproduction steps.
- Explain what not to send: passwords, save files, account tokens, private identifiers.
- Link from header/footer and Data Sources.

Acceptance criteria:

- Publicly reachable from footer and data-source page.
- Does not require login.
- Contains privacy guidance for reports.
- Included in sitemap only when owner-approved contact method is real.

### New Editorial/Data Review Policy page: `/editorial-policy/`

Purpose: Show original human process and reduce template/programmatic-content risk.

Actions:

- Explain editorial rules:
  - All pages must be useful without JavaScript.
  - No invented routes or exact combos unless generated/reviewed from current app data.
  - Unsupported states stay unavailable.
  - Risky terms are banned unless used as warnings.
  - Last-reviewed dates and data versions matter.
- Explain how new guide pages are chosen and reviewed.

Acceptance criteria:

- At least 600 words.
- Linked from Data Sources/About/footer.
- Gives reviewers confidence the site is maintained, not scraped/programmatic spam.

### Optional Advertising Disclosure page: `/advertising-disclosure/`

Purpose: If privacy page becomes too long, split ad disclosure out.

Actions:

- Explain PalCalculator may display Google AdSense ads.
- Ads do not change calculator output.
- No paid placement or affiliate recommendation should appear unless explicitly disclosed.
- Link to Privacy for cookie/measurement detail.

Acceptance criteria:

- At least 300-500 words if standalone.
- Linked from footer/privacy/about.

## Guide page improvement plan

### Thin P13 Pal-specific pages

Targets:

- `/guides/how-to-breed-selyne-palworld/` (~579 live words)
- `/guides/how-to-breed-helzephyr-palworld/` (~577)
- `/guides/how-to-breed-suzaku-palworld/` (~598)
- `/guides/how-to-breed-kitsun-palworld/` (~609)
- `/guides/how-to-breed-faleris-palworld/` (~677)

Actions for each page:

- Add a `Quick answer` block specific to the target Pal.
- Add `Before you follow a route` checklist specific to that Pal/variant risk.
- Add at least one reviewed example workflow:
  - If exact parent pairs/routes are generated from current data, show them with data version and caveat labels.
  - If exact data is unsupported, show a transparent unavailable-state example and what the user should try next.
- Add a `Common mistakes for [Pal]` section with variant confusion, old screenshots/charts, passive assumptions, and route vs direct pair confusion.
- Add a `When this page was last reviewed` line.
- Add page-specific internal links to related Pal pages where relevant.

Acceptance criteria per page:

- At least 850-1000 words after excluding navigation/footer.
- At least one page-specific example block or transparent unsupported-state walkthrough.
- At least 6 FAQs if the page remains in sitemap.
- No copied paragraph shells except shared legal/caveat disclaimer.

### P11/P12 topic pages

Targets:

- `/guides/how-to-breed-blazamut-palworld/`
- `/guides/how-to-breed-astegon-palworld/`
- `/guides/how-to-breed-grizzbolt-palworld/`
- `/guides/how-to-breed-lyleen-palworld/`
- `/guides/palworld-breeding-path-finder/`
- `/guides/palworld-breeding-with-owned-pals/`
- `/guides/best-palworld-breeding-combos/`
- `/guides/palworld-base-worker-passives/`

Actions:

- Add stronger original examples, tables, or decision trees.
- Add last-reviewed data version.
- Reduce generic `open the calculator` repetition by showing how to interpret results.
- Ensure pages with `best` in title explain criteria and avoid unsupported ranking claims.

Acceptance criteria:

- Topic pages stay above 900 useful words unless their intent is intentionally short FAQ.
- Pal pages stay above 850 useful words.
- Each page has a unique section/table not shared with sibling pages.

### Stronger guide pages

Current stronger pages still need trust metadata but are lower priority:

- `/guides/palworld-breeding-combos/`
- `/guides/palworld-breeding-route-examples/`
- `/guides/palworld-iv-explained/`
- `/guides/best-passive-skills-for-breeding-palworld/`
- `/guides/how-to-breed-anubis-palworld/`
- `/guides/how-to-breed-jetragon-palworld/`
- `/guides/how-to-breed-orserk-palworld/`
- `/guides/palworld-breeding-faq/`
- `/guides/how-to-breed-shadowbeak-palworld/`

Actions:

- Add last-reviewed and data-version line.
- Add author/editorial note or link to Editorial Policy.
- Add one additional page-specific example or table where missing.

## Information architecture fixes

### Header/footer

Actions:

- Keep calculator links in primary nav.
- Add footer links to About, Contact/Corrections, Editorial Policy, Data Sources, Privacy, Terms, Sitemap.
- Consider a small `Trust & data` footer group so policy pages are discoverable without overwhelming top navigation.

Acceptance criteria:

- Trust pages are linked sitewide from the footer.
- Data Sources remains linked from all calculator pages and relevant guide pages.
- No orphan trust URLs.

### Internal linking

Actions:

- Add contextual internal links from each calculator page to 2-4 relevant guides.
- Add guide-to-calculator links with descriptive anchors.
- Add trust links where caveats are mentioned: `data-version notes`, `privacy`, `correction workflow`, `editorial policy`.

Acceptance criteria:

- Every sitemap URL has at least 3 relevant inbound internal links from other static pages.
- Every calculator page links to at least one guide and one trust/data page.
- Every guide links to one calculator, one data/trust page, and 2 related guides where useful.

## Static rendering recommendations

The current static generator is likely the most important technical/content bridge. Without changing app features, P14 should make static HTML richer for the non-guide routes.

Actions for a later implementation task:

- Update `scripts/generate-static-routes.mjs` so non-guide pages render page-specific static content instead of only generic link lists.
- Keep static copy and React copy aligned; avoid a mismatch where users see different claims than crawlers.
- If adding new trust pages, define route metadata in both `src/main.tsx` and the static generator.
- Preserve the 34 current URLs; add trust URLs only after content is complete and approved.

Acceptance criteria:

- Static extraction of each calculator/trust page returns the intended page-specific sections, not just navigation lists.
- No route loses canonical, robots index/follow, AdSense script, Analytics script, favicon, or assets.
- `npm run build` still generates route-specific HTML and sitemap.

## Risky terms policy

Avoid these terms in positive claims:

- `official`
- `guaranteed`
- `100% accurate`
- `exact odds`
- `cheat`
- `bypass`
- `complete wiki`
- `always current`
- `perfect IV`
- `best build` when not backed by reviewed criteria
- `all combos` or `every combo` unless data support is verified and scoped

Allowed usage:

- These terms may appear only as warnings, policy statements, or disclaimers, e.g. `Do not treat calculator output as guaranteed`.
- Use safer alternatives: `unofficial fan-made`, `estimate`, `range`, `planning guidance`, `current dataset`, `supported where data is available`, `reviewed example`, `unsupported state`, `data-version caveat`.

Implementation acceptance criteria:

- Add a test or script check that scans visible copy and metadata for risky terms.
- Allowlist negative-policy phrases such as `not guaranteed`, `do not claim exact odds`, `not official`, and `unsupported rather than guessed`.
- Block any new page from sitemap if it contains unreviewed risky positive claims.

## AdSense re-review readiness checklist

Do not request AdSense review again until these are true:

- [ ] Homepage static/content-rendered page has clear original explanation, examples, and trust links.
- [ ] Six calculator pages have page-specific crawlable copy, examples, FAQs/checklists, and internal links.
- [ ] `/data-sources/`, `/privacy/`, and `/terms/` are expanded with visible last-updated dates.
- [ ] Public contact/correction path exists and is linked from footer and Data Sources.
- [ ] About and Editorial/Data Review Policy pages exist or equivalent sections are linked sitewide.
- [ ] P13 thin guide pages have page-specific examples or unsupported-state walkthroughs.
- [ ] No guide page relies only on generic `open the calculator` language.
- [ ] Static extraction confirms no calculator/trust page is under about 700 words of useful page-specific content.
- [ ] Sitemap and robots still work; current 34 URLs are preserved, with any new trust URLs added only after final content is approved.
- [ ] No intrusive ad placements, paywalls, login gates, or backend changes were added.
- [ ] Risky terms scan passes.
- [ ] Live QA confirms 200/canonical/index/follow for important pages.

## Suggested next Kanban breakdown

Recommended follow-up tasks after this audit:

1. `P14A Core calculator content expansion`  
   Expand homepage and six calculator pages with static/page-specific content, examples, comparison tables, FAQs/checklists, and internal links.

2. `P14B Trust pages expansion`  
   Expand Data Sources, Privacy, Terms and add About, Contact/Corrections, Editorial Policy, optionally Advertising Disclosure.

3. `P14C Thin guide enhancement`  
   Upgrade P13 thin Pal-specific guide pages with current-data examples or transparent unsupported-state walkthroughs and last-reviewed metadata.

4. `P14D QA and AdSense resubmission readiness`  
   Run live/static extraction, sitemap/robots/canonical checks, risky-terms scan, and produce a final AdSense re-review note.

## Final prioritization

If only one implementation batch is approved, do P14A plus the minimum trust footer links first. Core calculator thinness is the largest low-value signal because these pages are the product. If two batches are approved, add P14B before touching more long-tail guide pages. Additional guide content helps, but AdSense recovery is more likely if the site first looks like a complete, transparent, useful calculator resource rather than a collection of thin app shells and templated guides.
