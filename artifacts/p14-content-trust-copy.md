# P14 Content + Trust Copy Handoff

Project: PalCalculator
Task: `t_53ff6449`
Prepared by: copy_bot
Status: copy handoff only; no source code, sitemap, route, deploy, DNS, GSC, Cloudflare dashboard, login, backend storage, checkout, paywall, or ad-density changes.

## Source inputs used

- `artifacts/p14-adsense-low-value-audit.md`
- `src/main.tsx`
- `src/guides-data.json`
- `src/data/version.json`
- Prior copy handoffs: `artifacts/p11-seo-copy-batch.md`, `artifacts/p13-seo-copy-batch.md`

## Shared implementation rules

- Describe PalCalculator as an `unofficial fan-made` Palworld calculator and guide site near first-screen or trust copy.
- Current data version referenced in copy: `palworld-1-0_public-web_2026-07-16_r1`.
- Current data label: `Palworld 1.0 public-web data build`.
- Current last-updated value from source data: `2026-07-16`.
- Current supported data domains: Pals, aliases, normal-formula breeding pairs, passive seed data, caveated stat formulas, selected base stats.
- Current unsupported domains: verified special-combo override table, passive inheritance probabilities, server-side save upload, full IV exactness with all modifiers.
- Do not publish exact parent pairs, exact routes, exact passive probabilities, or exact IV claims unless generated from current app data and reviewed during implementation.
- Use a real owner-approved contact method before publishing `/contact/` or correction-path copy. Until then, keep `[OWNER_APPROVED_CONTACT_METHOD]` as a blocking placeholder.
- Keep AdSense language gentle and transparent: ads may support site maintenance, ads do not influence calculator output, no account or payment is required.
- Suggested footer group: `Trust & data`: About, Contact, Editorial Policy, Advertising Disclosure, Data Sources, Privacy, Terms, Sitemap.
- FAQPage schema should only be emitted for Q&A visible on the page.
- Preferred page schema: `WebPage` for trust pages, `SoftwareApplication` or `TechArticle` only where already aligned with visible page content.

## Risky term policy for implementation

Avoid positive claims using: official, guaranteed, 100% accurate, exact odds, cheat, bypass, complete wiki, always current, perfect IV, best build, all combos, every combo.

Allowed only as negative/caution copy, such as `not official`, `not guaranteed`, `does not claim exact odds`, or `unsupported states are not guessed`.

---

# New trust pages

## Page: `/about/`

```json
{
  "key": "about",
  "path": "/about/",
  "label": "About",
  "h1": "About PalCalculator",
  "title": "About PalCalculator | Fan-Made Palworld Calculator Tools",
  "description": "Learn what PalCalculator does, why it exists, how its fan-made Palworld calculator data is reviewed, and where to report corrections safely.",
  "descriptionLength": 140,
  "keywords": "PalCalculator about, Palworld calculator about, fan-made Palworld tools",
  "lastReviewed": "2026-08-04",
  "intro": [
    "PalCalculator is an unofficial fan-made calculator and guide site for Palworld players who want clearer planning tools before spending in-game resources. The site focuses on practical questions: which parent pair should I check, can I route from the Pals I already own, how should I read a caveated IV or stat estimate, and what passive goals should I plan separately from a breeding route?",
    "The goal is not to replace in-game testing or community discussion. PalCalculator is meant to make the planning step easier, show data-version caveats where they matter, and avoid hiding unsupported states behind confident-looking copy."
  ],
  "sections": [
    {
      "heading": "Why PalCalculator exists",
      "paragraphs": [
        "Palworld breeding and stat planning can become confusing quickly. A player may start with a simple target such as Anubis, then realize the real task includes parent availability, route length, passive inheritance, IV ranges, data freshness, and patch timing.",
        "PalCalculator brings those workflows into one browser-based hub. Instead of asking players to memorize a static chart, the site points them toward the calculator that matches the job: direct parent-pair lookup, owned-Pal route planning, IV estimation, expected stat bands, or passive planning."
      ]
    },
    {
      "heading": "What the site can help with",
      "paragraphs": [
        "Use PalCalculator when you want to check a parent pair, search possible parents for a target Pal, compare a route from owned Pals, understand why a result is unavailable, estimate broad IV ranges, preview stat bands, or organize passive goals before choosing breeders.",
        "The tools are planning aids. Results depend on the selected data version, supported formulas, public source quality, patch timing, and user inputs. When data is missing or unsupported, the safer product behavior is to show a caveat rather than invent a route or combo."
      ]
    },
    {
      "heading": "Independent fan-made status",
      "paragraphs": [
        "PalCalculator is independent and fan-made. References to Palworld, Pal names, game mechanics, patches, or related terms are used so players can identify the game content they are planning around.",
        "PalCalculator is not affiliated with, endorsed by, sponsored by, or approved by Pocketpair or the Palworld team. Palworld and related names remain the property of their respective owners."
      ]
    },
    {
      "heading": "How the site treats data and caveats",
      "paragraphs": [
        "The site uses public game-data references, selected formula assumptions, and visible data-version notes. Some areas are intentionally marked as unsupported when the current build does not have enough reviewed information.",
        "Current examples include caveats around verified special-combo override coverage, passive inheritance probabilities, server-side save uploads, and full IV exactness with every possible modifier. This is intentional: a clear limitation is more useful than a confident guess."
      ]
    },
    {
      "heading": "Who maintains PalCalculator",
      "paragraphs": [
        "PalCalculator is maintained at the site level by the PalCalculator maintainer/team. If the owner does not want to publish a personal name, this page can remain brand-level while still giving users a clear correction path.",
        "For data corrections, privacy questions, or broken-page reports, use the Contact page once an owner-approved public contact method is available. Reports should include the Pal name, route or calculator used, game version, current result, expected result, and a source or reproduction note."
      ]
    }
  ],
  "links": [
    { "label": "Contact PalCalculator", "href": "/contact/" },
    { "label": "Data Sources", "href": "/data-sources/" },
    { "label": "Editorial Policy", "href": "/editorial-policy/" },
    { "label": "Privacy Policy", "href": "/privacy/" },
    { "label": "Terms of Use", "href": "/terms/" }
  ],
  "faqs": [
    { "question": "Is PalCalculator official?", "answer": "No. PalCalculator is an unofficial fan-made Palworld calculator and guide site." },
    { "question": "What is PalCalculator for?", "answer": "It helps players plan parent-pair checks, owned-Pal routes, IV/stat estimates, passive goals, and data-version caveats before spending in-game resources." },
    { "question": "Who maintains the site?", "answer": "The site can be maintained under the PalCalculator maintainer/team name while still offering a public correction path through Contact." },
    { "question": "Does PalCalculator replace in-game verification?", "answer": "No. Use results as planning guidance tied to the current dataset, then verify in game when patch timing or resource cost matters." }
  ]
}
```

## Page: `/contact/`

```json
{
  "key": "contact",
  "path": "/contact/",
  "label": "Contact",
  "h1": "Contact PalCalculator",
  "title": "Contact PalCalculator | Corrections, Privacy & Data Reports",
  "description": "Contact PalCalculator for Palworld data corrections, privacy questions, broken pages, or calculator caveats without sending private save files.",
  "descriptionLength": 143,
  "keywords": "PalCalculator contact, Palworld calculator corrections, PalCalculator data report",
  "lastReviewed": "2026-08-04",
  "blockingPlaceholder": "Replace [OWNER_APPROVED_CONTACT_METHOD] before publishing this route or adding it to sitemap.",
  "intro": [
    "Use this page to report data corrections, broken links, calculator caveats, privacy questions, or copy that seems unclear. PalCalculator works best when players can point to a specific result and explain what needs review.",
    "Please do not send passwords, tokens, private account details, save files, full Palbox exports, or personal identifiers. A good report should include only the details needed to reproduce the issue."
  ],
  "sections": [
    {
      "heading": "Public contact method",
      "paragraphs": [
        "Contact path: [OWNER_APPROVED_CONTACT_METHOD].",
        "Implementation note: publish this page only after the owner approves a real email alias, GitHub issue link, form URL, or social/contact profile that does not require users to log into PalCalculator."
      ]
    },
    {
      "heading": "What to include in a data correction",
      "paragraphs": [
        "Include the Pal name, calculator page or guide URL, game version or patch context, current PalCalculator result, expected result, source link if available, and steps to reproduce the issue.",
        "Helpful example: I searched Anubis on `/breeding-calculator/`, selected target-to-parent mode, and the current data version showed an unavailable state. Another source suggests a different result. Here is the source link and patch context for review."
      ]
    },
    {
      "heading": "What not to send",
      "paragraphs": [
        "Do not send account passwords, API keys, cookies, save files, payment details, personal identifiers, or screenshots that expose private information. PalCalculator does not need those items to review a public data or copy issue.",
        "If a report depends on your owned-Pal list, summarize the relevant Pals in plain text instead of uploading a full save or private inventory file."
      ]
    },
    {
      "heading": "What happens after a report",
      "paragraphs": [
        "Reports should be reviewed against the current data sources, current app behavior, and editorial policy. If the issue is confirmed, the fix may be a data update, clearer caveat copy, a guide correction, or a decision to keep an unsupported state visible.",
        "Some reports may not become immediate site changes, especially when the data is patch-sensitive, conflicting, or outside the current supported domains."
      ]
    },
    {
      "heading": "Privacy and advertising questions",
      "paragraphs": [
        "For privacy questions, include the page URL, browser behavior you noticed, and whether the issue concerns localStorage, share URLs, analytics, or advertising scripts.",
        "For advertising concerns, include the page URL and a short description. Ads may support site maintenance, but ad placement should not change calculator output or require an account, payment, or login gate."
      ]
    }
  ],
  "links": [
    { "label": "Data Sources", "href": "/data-sources/" },
    { "label": "Editorial Policy", "href": "/editorial-policy/" },
    { "label": "Privacy Policy", "href": "/privacy/" },
    { "label": "Advertising Disclosure", "href": "/advertising-disclosure/" },
    { "label": "About PalCalculator", "href": "/about/" }
  ],
  "faqs": [
    { "question": "Do I need an account to report a correction?", "answer": "No PalCalculator account should be required. Use the owner-approved public contact path once it is added." },
    { "question": "Should I send my save file?", "answer": "No. Do not send save files or private identifiers. Summarize only the Pal names, page, result, and source details needed for review." },
    { "question": "What makes a correction report useful?", "answer": "A useful report includes the Pal name, page URL, game version, current result, expected result, source link, and reproduction notes." },
    { "question": "Can I report ad or privacy concerns here?", "answer": "Yes. Include the page URL and a short description of the issue without sending private account, token, or payment details." }
  ]
}
```

## Page: `/editorial-policy/`

```json
{
  "key": "editorialPolicy",
  "path": "/editorial-policy/",
  "label": "Editorial Policy",
  "h1": "Editorial and Data Review Policy",
  "title": "Editorial and Data Review Policy | PalCalculator",
  "description": "Read how PalCalculator reviews fan-made Palworld calculator copy, data caveats, source conflicts, unsupported states, and correction reports.",
  "descriptionLength": 141,
  "keywords": "PalCalculator editorial policy, Palworld data review policy, calculator caveats",
  "lastReviewed": "2026-08-04",
  "intro": [
    "PalCalculator should be useful even before a user interacts with JavaScript. This editorial policy explains how calculator pages, guide pages, data-source notes, examples, FAQs, and caveats should be reviewed before publication.",
    "The policy is simple: do not invent results, do not hide uncertainty, and do not turn a player workflow into a claim that the current data cannot support."
  ],
  "sections": [
    {
      "heading": "Editorial goals",
      "paragraphs": [
        "Every indexable page should help a real Palworld player complete a planning task. A page should explain what the tool does, what inputs matter, how to read outputs, what limits apply, and where to go next.",
        "Pages should not exist only to repeat route links or capture keywords. If a page cannot add a specific workflow, example, table, FAQ, caveat, or data explanation, it should stay unpublished or be merged into a stronger page."
      ]
    },
    {
      "heading": "Data and example rules",
      "paragraphs": [
        "Exact parent pairs, exact route steps, special-combo labels, passive probability claims, and narrow IV interpretations should only be published when generated from current app data and reviewed for caveats.",
        "When current data is incomplete, the correct editorial choice is to explain the unsupported state. Do not borrow a result from another chart simply to make a page look more complete."
      ]
    },
    {
      "heading": "How source conflicts are handled",
      "paragraphs": [
        "Public data sources can disagree because of patch timing, naming, aliases, special-combo assumptions, or parsing gaps. When sources conflict, the page should identify the caveat and avoid choosing a confident result without review.",
        "A correction can lead to a data update, a clearer limitation, a changed guide example, or a decision to keep a result unavailable until the current dataset supports it."
      ]
    },
    {
      "heading": "Guide page selection",
      "paragraphs": [
        "New guide pages should be chosen because they answer a distinct search or player workflow. Pal-specific pages should include target-specific cautions, related guides, examples or unsupported-state walkthroughs, and enough original explanation to stand apart from sibling pages.",
        "Thin pages, duplicated templates, and placeholder pages should not be added to the sitemap. If exact data is not reviewed yet, the page can still teach a workflow, but it must be transparent about what remains in the calculator."
      ]
    },
    {
      "heading": "Language rules",
      "paragraphs": [
        "Use plain, practical language. Prefer words like estimate, range, planning guidance, current dataset, reviewed example, unsupported state, and data-version caveat.",
        "Avoid positive claims that imply rights-holder status, total coverage, instant freshness, certain outcomes, or probability support the app does not provide. If risky words are needed, use them only in warnings such as not guaranteed or not official."
      ]
    },
    {
      "heading": "Review cadence and visible dates",
      "paragraphs": [
        "Trust pages and data-source notes should include a visible last-reviewed or last-updated date. Guide pages that rely on patch-sensitive workflows should include a last-reviewed line or link to the Data Sources page.",
        "After major Palworld updates, review the data-version page, core calculator pages, and thin guide pages before publishing more search pages."
      ]
    },
    {
      "heading": "Corrections workflow",
      "paragraphs": [
        "Correction reports should include page URL, Pal name, calculator mode, current result, expected result, source link, game version, and reproduction notes. Reports should not require save files, account tokens, or private identifiers.",
        "If the owner-approved contact path is not ready, do not publish contact-dependent correction copy as if it were live. Keep the placeholder visible in implementation planning until resolved."
      ]
    }
  ],
  "links": [
    { "label": "Contact", "href": "/contact/" },
    { "label": "Data Sources", "href": "/data-sources/" },
    { "label": "About", "href": "/about/" },
    { "label": "Privacy", "href": "/privacy/" },
    { "label": "Terms", "href": "/terms/" }
  ],
  "faqs": [
    { "question": "Does PalCalculator publish invented routes?", "answer": "No. Exact routes should be generated from current app data and reviewed, or the page should explain the unsupported state instead." },
    { "question": "Why do pages use caveats so often?", "answer": "Caveats help players understand patch timing, unsupported formulas, source conflicts, and data-version limits before spending resources." },
    { "question": "Can a thin guide still be useful?", "answer": "Only if it answers a distinct task with original explanation, examples, FAQs, and links. Otherwise it should be expanded, merged, or held back." },
    { "question": "How are corrections reviewed?", "answer": "Reports are compared against current sources, app behavior, and data limitations before changing copy or data." }
  ]
}
```

## Page: `/advertising-disclosure/`

```json
{
  "key": "advertisingDisclosure",
  "path": "/advertising-disclosure/",
  "label": "Advertising Disclosure",
  "h1": "Advertising Disclosure",
  "title": "Advertising Disclosure | PalCalculator",
  "description": "Learn how PalCalculator may use ads or sponsor disclosures, how ads support maintenance, and why ads do not affect calculator results or access.",
  "descriptionLength": 144,
  "keywords": "PalCalculator advertising disclosure, Palworld calculator ads, fan site disclosure",
  "lastReviewed": "2026-08-04",
  "intro": [
    "PalCalculator may display advertising, including Google AdSense, to help support maintenance of the fan-made calculator and guide site. Advertising should be clearly separated from calculator results, data-source notes, and editorial decisions.",
    "No account, payment, subscription, or checkout is required to use the core calculators described in this handoff. Advertising support should not become a paywall or a reason to hide useful content."
  ],
  "sections": [
    {
      "heading": "How advertising may appear",
      "paragraphs": [
        "Advertising may appear as standard page ads or clearly labeled sponsor/support messages if the owner later approves them. Ads should not interrupt a calculator result, block the main workflow, or make a page feel like it exists only for ad inventory.",
        "If Google AdSense is used, Google may use cookies or similar technologies for ad delivery, measurement, fraud prevention, and personalization controls. The Privacy Policy should explain those details in plain language."
      ]
    },
    {
      "heading": "Ads do not change calculator output",
      "paragraphs": [
        "Calculator results, caveats, source notes, and guide recommendations should not change because of an ad, advertiser, sponsor, or potential affiliate relationship.",
        "If PalCalculator ever adds sponsored links, affiliate links, or paid placements, those items should be clearly labeled near the relevant link or section."
      ]
    },
    {
      "heading": "No paywall requirement",
      "paragraphs": [
        "The copy in this P14 handoff assumes the site remains a public browser-based calculator hub. Users should not need to create an account, pay, upload a save file, or provide private details to use core planning workflows.",
        "A gentle support message is acceptable when it does not pressure users, hide calculator output, or make trust pages sound like a checkout funnel."
      ]
    },
    {
      "heading": "Reporting ad concerns",
      "paragraphs": [
        "If an ad appears broken, misleading, intrusive, or too close to a calculator result, users should be able to report the page URL and a short description through the Contact page once the owner-approved method is live.",
        "Do not ask users to send private account details, tokens, payment information, or save files when reporting an ad issue."
      ]
    }
  ],
  "links": [
    { "label": "Privacy Policy", "href": "/privacy/" },
    { "label": "Contact", "href": "/contact/" },
    { "label": "Editorial Policy", "href": "/editorial-policy/" },
    { "label": "About", "href": "/about/" }
  ],
  "faqs": [
    { "question": "Does advertising affect calculator results?", "answer": "No. Ads should not affect calculator output, caveats, source notes, or guide copy." },
    { "question": "Do users need to pay to use PalCalculator?", "answer": "No account, checkout, or payment is required for the core calculator workflows described in this handoff." },
    { "question": "Does PalCalculator use Google AdSense?", "answer": "The site may display Google AdSense ads. Privacy copy should explain cookies, measurement, and personalization controls." },
    { "question": "How should sponsor or affiliate links be handled?", "answer": "Any sponsor, affiliate, or paid placement should be clearly labeled near the link or section where it appears." }
  ]
}
```

---

# Core page content modules

The modules below are implementation-ready copy blocks for homepage and calculator pages. They are intentionally page-specific, crawlable, and designed to be placed below the hero/tool intro and above generic guide-link lists.

## Homepage: `/`

```json
{
  "path": "/",
  "recommendedH2Blocks": [
    {
      "heading": "What PalCalculator helps you decide",
      "body": [
        "PalCalculator helps with five common Palworld planning jobs: checking parent pairs, planning a route from Pals you already own, estimating IV ranges, comparing expected stat bands, and organizing passive-skill goals before you choose breeders.",
        "Start from the question you can answer right now. If you know two parents, use the Breeding Calculator. If you know the target Pal but not the path, use Route. If you already have a candidate Pal, use IV or Stats. If your plan is about traits, use Passives before returning to breeding or route planning."
      ]
    },
    {
      "heading": "Choose the right calculator",
      "table": [
        { "ifYouKnow": "Two parent Pals", "use": "Breeding Calculator", "why": "Checks the child result for a direct parent pair." },
        { "ifYouKnow": "The target Pal and your current Palbox", "use": "Route Calculator", "why": "Searches for a bounded path from owned Pals to the target." },
        { "ifYouKnow": "A Pal's level and visible stats", "use": "IV Calculator", "why": "Estimates broad hidden stat ranges from observed values." },
        { "ifYouKnow": "A Pal and level to compare", "use": "Stats Calculator", "why": "Previews expected HP, Attack, and Defense bands." },
        { "ifYouKnow": "Desired traits or a role", "use": "Passive Skill Calculator", "why": "Captures passive goals without claiming inheritance outcomes." }
      ]
    },
    {
      "heading": "Beginner example: I want Anubis but only own Penking and Bushi",
      "body": [
        "A player who wants Anubis usually should not start by copying one chart. First, search Anubis in the Breeding Calculator to understand target-parent options for the current dataset. Next, open the Route Calculator with Anubis as the target and Penking, Bushi as owned Pals. Review whether the tool finds a route, reports missing Pals, or asks for looser constraints.",
        "After the target route is practical, move to Passives if you care about work, combat, movement, or breeder traits. Use IV and Stats only after you have candidates to evaluate. This sequence keeps each decision separate and avoids treating one parent pair as a full build plan."
      ]
    },
    {
      "heading": "Use the site safely",
      "body": [
        "PalCalculator is an unofficial fan-made site. Treat results as planning guidance tied to the current dataset, not as a rights-holder source or a promise about every future patch.",
        "Check data-version notes before following a long route. Recheck after major updates, when another guide disagrees, or when a result depends on special-combo behavior. If a result is unavailable, that may be a useful warning rather than an error to ignore."
      ]
    },
    {
      "heading": "Data and privacy at a glance",
      "body": [
        "Owned-Pal route helpers should remain browser-local unless a future reviewed feature clearly says otherwise. No account, server-side Palbox upload, or payment is required for the core calculator workflows described here.",
        "For source categories, unsupported domains, corrections, privacy details, terms, and advertising transparency, use the Trust & data links in the footer."
      ],
      "links": ["/data-sources/", "/about/", "/contact/", "/editorial-policy/", "/privacy/", "/terms/", "/advertising-disclosure/"]
    }
  ],
  "recommendedFaqs": [
    { "question": "Which Palworld calculator should I use first?", "answer": "Use Breeding for direct parent-pair checks, Route for owned-Pal paths, IV for hidden stat estimates, Stats for expected stat bands, and Passives for trait planning." },
    { "question": "Is PalCalculator fan-made?", "answer": "Yes. PalCalculator is an unofficial fan-made site with visible data-version and caveat notes." },
    { "question": "Are owned Pals uploaded to a server?", "answer": "The current owned-Pal helper should be described as browser-local localStorage only, with no account, upload, or backend sync." },
    { "question": "What should I do when no route appears?", "answer": "Check spelling, add more owned Pals, increase max generations, and review data-source notes before assuming a route is impossible." },
    { "question": "Can a breeding result solve passives and IVs too?", "answer": "No. Use breeding or route tools for target access, then use passive, IV, and stats tools as separate planning layers." }
  ],
  "primaryCta": "Plan a breeding route",
  "secondaryCta": "Check parent pairs"
}
```

## Breeding Calculator: `/breeding-calculator/`

```json
{
  "path": "/breeding-calculator/",
  "blocks": [
    { "heading": "What this calculator does", "body": "Use the Breeding Calculator for direct parent-child questions. Pair to Child is for two known parents. Target to Parents is for the Pal you want. Each result should stay tied to the visible data version and caveat labels." },
    { "heading": "Pair to Child vs Target to Parents", "body": "Pair to Child answers: if I breed these two Pals, what child does the current dataset return? Target to Parents answers: which parent-pair options should I review for this target? If neither parent is practical, move into Route instead of forcing one static combo." },
    { "heading": "Example: Penking + Bushi", "body": "Use Penking + Bushi as an editable pair example to show how a direct lookup works. Implementation may display the generated child only if it comes from current app data at render time. The explanatory copy should focus on reading the result, combo type, rule label, and caveats." },
    { "heading": "Example: Anubis target lookup", "body": "Search Anubis as the target when the question is which parents may produce Anubis in the selected dataset. Review parent pairs, then switch to Route if the listed parents are missing from your Palbox." },
    { "heading": "Unavailable or special-combo states", "body": "If a Pal, pair, alias, or special-combo state is unsupported, show that state directly. Do not fill missing data with an unreviewed combo from another chart. Useful unavailable copy tells the player what to try next: check spelling, switch mode, review data sources, or verify after a patch." },
    { "heading": "Common mistakes", "items": ["Using Pair to Child when the real question is target planning.", "Treating one parent pair as a full route.", "Assuming passive inheritance is solved by the same combo.", "Following old screenshots without checking data version.", "Ignoring unsupported-state labels because another site shows a different answer."] }
  ],
  "glossary": [
    { "term": "Parent pair", "definition": "Two selected Pals used for a direct breeding lookup." },
    { "term": "Child result", "definition": "The Pal returned by the current dataset for a selected parent pair." },
    { "term": "Target lookup", "definition": "A search that starts with the child Pal you want and returns possible parents." },
    { "term": "Normal formula", "definition": "A supported calculation path based on the current normal-formula dataset." },
    { "term": "Special combo", "definition": "A relationship that may depend on override rules and should be labeled only where current data supports it." },
    { "term": "Unsupported state", "definition": "A visible limitation when current data should not be guessed." }
  ],
  "links": ["/breeding-route-calculator/", "/passive-skill-calculator/", "/palworld-1-0-breeding-calculator/", "/data-sources/", "/guides/how-to-breed-anubis-palworld/", "/guides/how-to-breed-jetragon-palworld/", "/guides/palworld-breeding-combos/"],
  "faqs": [
    { "question": "When should I use Pair to Child?", "answer": "Use it when you already know two parents and want to check the child result in the current dataset." },
    { "question": "When should I use Target to Parents?", "answer": "Use it when you know the Pal you want and need possible parent pairs to review." },
    { "question": "What if a parent pair is unavailable?", "answer": "Check spelling and data-source notes, then treat unsupported states as limitations instead of guessing." },
    { "question": "Should I use Route after finding a parent pair?", "answer": "Use Route when the direct parents are missing or when you need a multi-generation path from owned Pals." },
    { "question": "Does a parent pair decide passive skills?", "answer": "No. Use passive planning separately because inheritance can involve RNG and current data limits." }
  ]
}
```

## Breeding Route Calculator: `/breeding-route-calculator/`

```json
{
  "path": "/breeding-route-calculator/",
  "blocks": [
    { "heading": "What a route calculator adds beyond a combo list", "body": "A combo list answers one parent-child relationship. The Route Calculator answers a planning question: can your current Pals connect to the target within a practical generation limit?" },
    { "heading": "Inputs that shape the route", "body": "The key inputs are target Pal, owned Pals, and max generations. Owned-Pal state should be browser-local localStorage only in the current product, with no account, upload, or backend sync." },
    { "heading": "How to read a route", "body": "A useful route result explains generation count, ordered steps, the route tree, missing Pals, alternatives, and caveats. Breed step 1 first, then use produced children as parents for later steps." },
    { "heading": "Example: route to Anubis from Penking + Bushi", "body": "Use the existing editable demo with target Anubis, owned Pals Penking and Bushi, and max generations 3. If implementation wants exact route steps, generate them from the current route solver and show data-version caveats beside the example." },
    { "heading": "When no route appears", "body": "No route can mean strict constraints, too few owned Pals, unsupported data, spelling mismatch, special-combo limits, or patch differences. The next action is to add owned Pals, increase max generations, try the no-owned-Pals demo, or review Data Sources." },
    { "heading": "Compare practical routes", "items": ["Fewer generations are simpler, but missing parents may matter more.", "A route using owned Pals can be easier than a shorter route that requires rare parents.", "Passive goals may change which parent candidates are worth keeping.", "Data caveats should be checked before a long chain."] }
  ],
  "links": ["/breeding-calculator/", "/passive-skill-calculator/", "/iv-calculator/", "/stats-calculator/", "/data-sources/", "/guides/palworld-breeding-tree/", "/guides/palworld-breeding-route-examples/", "/guides/palworld-breeding-with-owned-pals/"],
  "faqs": [
    { "question": "What does a breeding route show?", "answer": "It shows a possible multi-step path from current constraints to a target Pal, including steps, missing Pals, alternatives, and caveats." },
    { "question": "Are owned Pals uploaded?", "answer": "No. Current copy should describe the owned-Pal helper as browser-local localStorage only." },
    { "question": "What if the target is already owned?", "answer": "No breeding steps are needed. Use Breeding for parent checks or Passives for trait planning if you want to improve the Pal." },
    { "question": "Why do two players get different routes?", "answer": "Routes depend on owned Pals, generation limit, data version, and supported route graph constraints." },
    { "question": "What should I do when no route appears?", "answer": "Check names, add owned Pals, increase max generations, relax constraints, and review Data Sources." }
  ]
}
```

## IV Calculator: `/iv-calculator/`

```json
{
  "path": "/iv-calculator/",
  "blocks": [
    { "heading": "What IVs mean in Palworld", "body": "IVs are hidden stat variation values that may explain why two Pals of the same species and level show different HP, Attack, or Defense. They are one input for planning, not a final verdict by themselves." },
    { "heading": "Inputs needed for an estimate", "body": "Ask for Pal, level, observed HP, observed Attack, observed Defense, and any known modifiers the current app supports. Missing modifier details can widen the result or make an estimate unavailable." },
    { "heading": "Why results are ranges", "body": "A range means more than one value can explain the observed stats. Rounding, passives, upgrades, condenser stars, formula assumptions, and patch changes can all affect confidence." },
    { "heading": "Sample interpretation", "body": "If a level 50 Anubis demo returns a broad HP or Attack band, explain it as a planning signal. Recheck level, visible stats, passives, and upgrades before choosing whether to keep the Pal as a breeder or combat candidate." },
    { "heading": "When to use Stats instead", "body": "Use IV when you want to work backward from observed stats. Use Stats when you want to preview expected stat bands for a Pal and level before comparing real candidates." }
  ],
  "links": ["/stats-calculator/", "/passive-skill-calculator/", "/data-sources/", "/guides/palworld-iv-explained/", "/guides/best-passive-skills-for-breeding-palworld/"],
  "faqs": [
    { "question": "What does the IV Calculator estimate?", "answer": "It estimates broad hidden stat ranges from the Pal, level, observed stats, and supported modifier assumptions." },
    { "question": "Why is my IV result a range?", "answer": "Rounding, missing modifiers, unsupported formulas, or patch changes can make more than one value possible." },
    { "question": "Should I trust an IV estimate by itself?", "answer": "No. Use it with role, passives, stats, resources, and data-version notes." },
    { "question": "What inputs should I double-check?", "answer": "Check Pal name, level, HP, Attack, Defense, passives, upgrades, stars, and selected data version." },
    { "question": "How is IV different from Stats?", "answer": "IV works backward from observed values; Stats previews expected bands from selected Pal and level." }
  ]
}
```

## Stats Calculator: `/stats-calculator/`

```json
{
  "path": "/stats-calculator/",
  "blocks": [
    { "heading": "Stats Calculator vs IV Calculator", "body": "Stats Calculator previews expected HP, Attack, and Defense bands for a Pal and level. IV Calculator estimates hidden stat quality from observed values. Use Stats for comparison, IV for diagnosis." },
    { "heading": "Expected stat bands", "body": "Expected bands help you judge whether a Pal looks close to the current formula assumptions. They are not proof that every modifier has been accounted for." },
    { "heading": "How level and base stats affect estimates", "body": "Species, level, base stats, supported formulas, and known modifiers shape the returned bands. A changed level or unsupported modifier can move the expected range." },
    { "heading": "Example interpretation", "body": "A level 50 Anubis stat demo can show what a normal comparison looks like. If your actual Pal sits outside a band, recheck visible stats, modifiers, data version, and whether the formula supports your case." },
    { "heading": "Use cases", "items": ["Compare hatch candidates after a breeding project.", "Check whether observed stats look unusual before running IV estimates.", "Plan a combat or work candidate without treating one stat as the full decision.", "Debug odd inputs before assuming the calculator is wrong."] }
  ],
  "comparisonTable": [
    { "question": "I know visible stats and want hidden quality", "tool": "IV Calculator" },
    { "question": "I want expected HP/Attack/Defense by level", "tool": "Stats Calculator" },
    { "question": "I need to choose breeders after hatching", "tool": "Use both, then check Passives" }
  ],
  "links": ["/iv-calculator/", "/passive-skill-calculator/", "/data-sources/", "/guides/palworld-iv-explained/"],
  "faqs": [
    { "question": "What does the Stats Calculator show?", "answer": "It previews broad expected HP, Attack, and Defense bands for selected Pal and level inputs." },
    { "question": "Why can my real Pal look outside a band?", "answer": "Modifiers, upgrades, formula assumptions, rounding, unsupported data, or patch changes can affect real stats." },
    { "question": "Should I use Stats before IV?", "answer": "Use Stats for broad comparison and IV when you want to estimate hidden stat ranges from observed values." },
    { "question": "Can stats decide the best breeder alone?", "answer": "No. Consider role, passives, route cost, resources, and caveats too." },
    { "question": "Where are formula caveats explained?", "answer": "Use Data Sources and the IV guide for formula and data-version notes." }
  ]
}
```

## Passive Skill Calculator: `/passive-skill-calculator/`

```json
{
  "path": "/passive-skill-calculator/",
  "blocks": [
    { "heading": "What passive planning can and cannot do", "body": "Passive planning helps you organize desired traits by target Pal and role. It does not claim that a selected parent pair or route will produce the desired passive set on the next hatch." },
    { "heading": "Choose passives by role", "body": "Start from the job. A base worker, combat Pal, mount, utility Pal, and future breeder can need different passive priorities." },
    { "heading": "Role examples", "table": [
      { "role": "Base worker", "planningFocus": "Work speed, stamina, task fit, and realistic early-game availability." },
      { "role": "Combat", "planningFocus": "Damage, survivability, element strategy, and stat review after hatching." },
      { "role": "Mount or utility", "planningFocus": "Movement, stamina, travel convenience, and quality-of-life goals." },
      { "role": "Future breeder", "planningFocus": "Traits worth preserving across later projects without promising inheritance outcomes." }
    ] },
    { "heading": "Examples to keep caveated", "body": "Use Artisan + Serious as a work-planning example and Swift as a movement/utility example. The copy should say recognized passive names are planning targets, not outcome promises." },
    { "heading": "Recognized vs unsupported names", "body": "If a passive name is unsupported or misspelled, show a clear message and keep the user's plan editable. Do not convert unsupported passive names into probability claims." },
    { "heading": "Next step after passive planning", "body": "After choosing desired passives, use Breeding for direct parent-pair checks or Route when you need a path from owned Pals. Use IV and Stats after hatching candidates." }
  ],
  "links": ["/breeding-calculator/", "/breeding-route-calculator/", "/iv-calculator/", "/stats-calculator/", "/data-sources/", "/guides/best-passive-skills-for-breeding-palworld/", "/guides/palworld-base-worker-passives/"],
  "faqs": [
    { "question": "Can PalCalculator predict passive inheritance odds?", "answer": "No. Current copy should not claim exact passive probabilities. Use passive planning as organization, not certainty." },
    { "question": "Which passives should I choose first?", "answer": "Choose passives by role: work, combat, mount, utility, or future breeder." },
    { "question": "What happens when a passive name is unsupported?", "answer": "The planner should show an unsupported or unrecognized state and keep the input editable." },
    { "question": "Should I plan passives before routes?", "answer": "You can shortlist passives first, but still check route practicality and current data support before committing resources." },
    { "question": "Do passives replace IV and stat checks?", "answer": "No. Use IV and Stats after hatching candidates when stat quality matters." }
  ]
}
```

## Palworld 1.0 Breeding Calculator: `/palworld-1-0-breeding-calculator/`

```json
{
  "path": "/palworld-1-0-breeding-calculator/",
  "blocks": [
    { "heading": "What is different about the 1.0 page", "body": "This page should be positioned as the version-aware entry point for Palworld 1.0 breeding workflows. It can share the same calculator mechanics as the standard Breeding page, but the surrounding copy should focus on patch timing, data freshness, and 1.0 caveats." },
    { "heading": "Data freshness and patch timing", "body": "Palworld 1.0 searches often mean: is this result current enough to use? Show the current data version, last-updated date, supported domains, and unsupported domains near the workflow." },
    { "heading": "Special-combo coverage caveats", "body": "If verified special-combo override table support is pending, say so plainly. Do not imply complete special-combo coverage unless implementation verifies and labels it." },
    { "heading": "When to use the standard Breeding Calculator", "body": "Use the standard page for general parent-pair education and everyday direct lookups. Use the 1.0 page when the player's main concern is version-aware planning after a patch or guide mismatch." },
    { "heading": "Before relying on an old combo chart", "items": ["Check the current data version.", "Look for normal-formula, special-combo, unavailable, and unsupported labels.", "Compare route practicality instead of only checking one pair.", "Review Data Sources when another guide disagrees.", "Recheck after major game updates."] }
  ],
  "links": ["/breeding-calculator/", "/breeding-route-calculator/", "/data-sources/", "/guides/palworld-1-0-breeding-guide/", "/guides/palworld-breeding-combos/"],
  "faqs": [
    { "question": "What makes this the 1.0 calculator page?", "answer": "It should foreground Palworld 1.0 data-version notes, patch timing, and current supported/unsupported domains." },
    { "question": "Is the 1.0 page a duplicate of Breeding Calculator?", "answer": "It can share the tool, but the page copy should focus on version freshness and 1.0-specific caveats." },
    { "question": "Does it include every special combo?", "answer": "Do not claim that unless current data support is verified and labeled. Unsupported states should stay visible." },
    { "question": "When should I use this page?", "answer": "Use it when checking Palworld 1.0 breeding results, patch-sensitive combos, or old guide mismatches." },
    { "question": "Where can I check data status?", "answer": "Use Data Sources for version notes, source categories, unsupported domains, and corrections." }
  ]
}
```

---

# Optional trust upgrades for existing pages

These are not new routes, but they should be included in the implementation plan because the audit identified `/data-sources/`, `/privacy/`, and `/terms/` as current trust gaps.

## `/data-sources/` expansion modules

```json
{
  "path": "/data-sources/",
  "blocks": [
    { "heading": "What data PalCalculator uses", "body": "PalCalculator uses public game-data references for Pal names, aliases, normal-formula breeding pairs, seed passive data, selected base stats, and caveated stat formulas. Each output should be read with the current data version." },
    { "heading": "What data is intentionally unsupported", "body": "Current unsupported areas include verified special-combo override table coverage, passive inheritance probabilities, server-side save upload, and full IV exactness with all modifiers." },
    { "heading": "Why unsupported states are shown instead of guessed", "body": "If the current dataset cannot support a result, PalCalculator should show a clear unavailable or caveated state. This protects players from following unreviewed routes and helps reviewers see that the site has an editorial process." },
    { "heading": "Correction workflow", "body": "Correction reports should include Pal name, page URL, game version, current result, expected result, source link, and reproduction notes. Publish only after replacing `[OWNER_APPROVED_CONTACT_METHOD]` with a real public contact path." }
  ],
  "sourceTableColumns": ["source/category", "used for", "not used for", "caveats"],
  "links": ["/about/", "/contact/", "/editorial-policy/", "/privacy/", "/terms/", "/advertising-disclosure/"]
}
```

## `/privacy/` expansion modules

```json
{
  "path": "/privacy/",
  "blocks": [
    { "heading": "Summary", "body": "PalCalculator is a browser-first fan-made calculator site. Core calculator workflows should not require an account, payment, save-file upload, or server-side Palbox sync." },
    { "heading": "Calculator inputs and browser-local storage", "body": "Selected Pals, owned-Pal helper state, stat fields, passive choices, and similar workflow inputs are handled in the browser unless a later reviewed feature clearly states otherwise. Owned-Pal helper data should be localStorage only." },
    { "heading": "Share URLs", "body": "Share URLs may include selected Pals or settings. Users should avoid sharing URLs that reveal private planning details they do not want others to see." },
    { "heading": "Analytics", "body": "Analytics may measure aggregate page views and first-party tool events for diagnostics. Event payloads should avoid raw owned-Pal lists, emails, tokens, save files, payment details, and private identifiers." },
    { "heading": "Advertising and Google AdSense", "body": "PalCalculator may use Google AdSense. Google ad scripts may use cookies or similar technologies for ad delivery, measurement, fraud prevention, and personalization controls." },
    { "heading": "Contact for privacy questions", "body": "Use `[OWNER_APPROVED_CONTACT_METHOD]` after it is approved. Do not ask users to send secrets, tokens, account details, or save files for privacy reports." }
  ]
}
```

## `/terms/` expansion modules

```json
{
  "path": "/terms/",
  "blocks": [
    { "heading": "Unofficial fan-site status", "body": "PalCalculator is an independent fan-made site. References to Palworld, Pal names, game mechanics, patches, and related terms are for identification and compatibility with player workflows." },
    { "heading": "Calculator output limitations", "body": "Results depend on selected data versions, public source quality, formulas, modifiers, RNG, game patches, and supported domains. Use results as planning guidance and verify in game when the cost of a mistake is high." },
    { "heading": "Acceptable use", "body": "Use the site for personal planning, learning, and correction reports. Do not attempt to overload the site, scrape in ways that harm service availability, or submit private account details through correction channels." },
    { "heading": "Advertising disclosure link", "body": "Advertising, if present, supports site maintenance and does not change calculator output. Link to `/advertising-disclosure/` and `/privacy/` for details." },
    { "heading": "Changes and contact", "body": "Terms and trust pages should include a last-updated or last-reviewed date plus a public contact path once approved." }
  ]
}
```

---

# Downstream implementation checklist

- [ ] Add route metadata for `/about/`, `/contact/`, `/editorial-policy/`, and `/advertising-disclosure/` only after `[OWNER_APPROVED_CONTACT_METHOD]` is resolved for Contact.
- [ ] Add new trust pages to footer `Trust & data` group when implemented.
- [ ] Keep sitemap at current 34 URLs until new trust pages are implemented and reviewed, then add approved trust URLs.
- [ ] Expand static HTML generation for homepage and non-guide calculator/trust pages so crawlers see page-specific content, not just route and guide lists.
- [ ] Keep React-rendered copy and static-generated copy aligned.
- [ ] Add visible last-reviewed dates to trust pages and data-sensitive guide pages.
- [ ] Add contextual links from each calculator page to one trust/data page and at least 2-4 relevant guides.
- [ ] Do not add paywall, login, backend storage, Stripe, intrusive ads, or new ad density during AdSense recovery.
- [ ] Run risky-term scan on visible copy and meta descriptions before QA.
- [ ] Validate meta descriptions remain 140-160 characters where applicable.

## Meta description validation table

| Path | Description length | Status |
| --- | ---: | --- |
| `/about/` | 140 | pass |
| `/contact/` | 143 | pass |
| `/editorial-policy/` | 141 | pass |
| `/advertising-disclosure/` | 144 | pass |

## Risky-term scan notes

The handoff intentionally includes risky words only in policy/warning contexts. Downstream source scan should allow negative phrases such as `unofficial`, `not official`, `not guaranteed`, `does not claim exact odds`, `not a promise`, `not guessed`, and `do not claim`.

Expected positive-claim risky hits in this handoff: none.

## Handoff summary

This P14 copy package gives frontend/SEO agents implementation-ready content for four new trust pages and deeper crawlable modules for the homepage plus six core calculator pages. The copy is designed to improve AdSense low-value-content recovery by adding original player-focused explanations, examples, FAQs, data caveats, privacy/trust details, internal-link targets, and a clear correction workflow placeholder without adding intrusive monetization or backend scope.
