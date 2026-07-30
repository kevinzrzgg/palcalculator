# P11 SEO Copy Batch — Five P10 Guide Pages

Project: PalCalculator
Task: t_0ac800a5
Prepared by: copy_bot
Status: copy handoff only; no source code, sitemap, route, deploy, DNS, GSC, Cloudflare, login, backend storage, or save-file upload changes.

## Source inputs used

- `artifacts/p10-seo-next-content-brief.md`
- `src/guides-data.json`
- `src/data/version.json`
- Existing guide tone from Anubis, Jetragon, Orserk, Shadowbeak, breeding combo, route, FAQ, passive, and IV guide entries.

## Shared copy rules for implementation

- PalCalculator should be described as an unofficial fan-made Palworld calculator and guide site in first-screen copy.
- Exact parent pairs, exact routes, passive inheritance odds, and special-combo overrides are not hardcoded in this handoff.
- Current data version: `palworld-1-0_public-web_2026-07-16_r1`.
- Current caveats to preserve: verified special-combo override table is pending; passive data is seed-only; passive inheritance odds are not supported; server-side save upload is not supported; full IV exactness with every modifier is not supported.
- Use `/data-sources/` as the visible data-source and caveat link.
- Use clean canonical guide URLs only. Do not encode browser-local owned-Pal lists in share URLs by default.
- FAQPage schema should be emitted only if the same Q&A is visible on the page.
- Preferred schema: `TechArticle`; avoid `HowTo` unless downstream implementation adds complete visible steps and schema review.

## JSON-ready content blocks

The blocks below follow the existing `src/guides-data.json` shape closely enough for a frontend agent to adapt. They are markdown handoff blocks, not source implementation.

---

## Page 1 — How to Breed Blazamut in Palworld

```json
{
  "key": "guideBlazamut",
  "path": "/guides/how-to-breed-blazamut-palworld/",
  "label": "Blazamut Breeding Guide",
  "h1": "How to Breed Blazamut in Palworld",
  "title": "How to Breed Blazamut in Palworld",
  "description": "Plan Blazamut breeding in Palworld with parent-pair lookup, route checks, Blazamut Ryu caveats, passive follow-up, and data-source notes safely.",
  "keywords": "how to breed Blazamut Palworld, Palworld Blazamut breeding, Blazamut parent pairs, Blazamut breeding route",
  "ogDescription": "Use PalCalculator to plan Blazamut breeding with parent-pair lookup, owned-Pal route checks, Blazamut Ryu caveats, and visible data-version notes.",
  "primaryCta": { "label": "Check Blazamut parent pairs", "href": "/breeding-calculator/" },
  "secondaryCta": { "label": "Plan a Blazamut route", "href": "/breeding-route-calculator/" },
  "intro": [
    "Breeding Blazamut in Palworld is easier to plan when you verify the current parent-pair options instead of relying on one saved chart. Start with Blazamut as the target, then move into route planning if the direct parents are missing from your Palbox.",
    "PalCalculator is an unofficial fan-made Palworld calculator and guide site. Use this page as a safe workflow for checking current Blazamut breeding options, version notes, and caveats before spending resources."
  ],
  "sections": [
    {
      "heading": "Start with the Blazamut result you need",
      "paragraphs": [
        "Players searching for Blazamut usually need one of three answers: which parent pairs are available in the current dataset, whether a route can be built from owned Pals, or what to do after the first hatch for passives, IVs, and stats.",
        "Short answer: search Blazamut as the target in the breeding calculator, review the parent-pair results and caveats, then use the route calculator if you do not own a practical direct pair."
      ]
    },
    {
      "heading": "Check current Blazamut parent pairs",
      "paragraphs": [
        "Open `/breeding-calculator/`, choose target-to-parent mode if the UI separates modes, and search for Blazamut. Review the parent pairs shown for the selected data version, then check any labels for normal-formula support, special-combo assumptions, unsupported states, or data-source notes.",
        "Do not treat this page as a static combo table. Exact Blazamut pairs should be generated from current app data during implementation or left for users to verify in the calculator."
      ]
    },
    {
      "heading": "When to use a route instead of one direct pair",
      "paragraphs": [
        "A direct pair is useful only when you can actually execute it. If one or both parents are missing, open `/breeding-route-calculator/`, set Blazamut as the target, add owned Pals where supported, choose a max generation limit, and review route steps, missing-Pal notes, and alternatives.",
        "A route should be read as a planning result for the current data and constraints. If no route appears, try checking spelling, increasing max generations, adding more owned Pals, or reviewing `/data-sources/` for unsupported areas."
      ]
    },
    {
      "heading": "Blazamut vs Blazamut Ryu caveat",
      "paragraphs": [
        "Blazamut and Blazamut Ryu should be treated as separate targets. If you want Blazamut Ryu, search for that exact target in the calculator instead of assuming the base Blazamut page covers the variant.",
        "Variant searches can be patch-sensitive, so keep target names, aliases, and data-source notes visible when another guide or screenshot gives a different result."
      ]
    },
    {
      "heading": "Passive and IV follow-up after Blazamut breeding",
      "paragraphs": [
        "After you have a Blazamut parent-pair or route plan, use `/passive-skill-calculator/` to organize desired traits by role. Treat desired passives as planning targets, not certain outcomes.",
        "After hatching candidates, use `/iv-calculator/` and `/stats-calculator/` to compare hidden stat estimates and practical stat outcomes before investing heavily in one Blazamut."
      ]
    },
    {
      "heading": "Why another guide may show different Blazamut combos",
      "paragraphs": [
        "Different guides can disagree because of patch timing, data-source choices, special-combo handling, aliases, or unsupported states. Prefer results that show data version and caveats instead of silently presenting one chart as always current.",
        "If PalCalculator does not support a Blazamut result yet, the safe product copy should say unavailable in the current dataset rather than filling the gap with a guessed pair."
      ]
    }
  ],
  "links": [
    { "label": "check Blazamut parent pairs", "href": "/breeding-calculator/" },
    { "label": "plan a Blazamut route from owned Pals", "href": "/breeding-route-calculator/" },
    { "label": "Palworld 1.0 breeding calculator", "href": "/palworld-1-0-breeding-calculator/" },
    { "label": "breeding combos guide", "href": "/guides/palworld-breeding-combos/" },
    { "label": "breeding path finder workflow", "href": "/guides/palworld-breeding-path-finder/" },
    { "label": "plan Blazamut passives", "href": "/passive-skill-calculator/" },
    { "label": "data-source and special-combo caveats", "href": "/data-sources/" }
  ],
  "faqs": [
    { "question": "Can you breed Blazamut in Palworld?", "answer": "Use PalCalculator's current breeding data to check Blazamut parent-pair and route availability. This guide keeps exact pairs in the calculator so results stay tied to the selected dataset." },
    { "question": "What parents make Blazamut?", "answer": "Open the breeding calculator, search Blazamut in target-to-parent mode, and review parent pairs shown for the current data version. If the direct parents are not practical, use the route calculator next." },
    { "question": "Is Blazamut Ryu the same target as Blazamut?", "answer": "No. Blazamut and Blazamut Ryu should be checked as separate targets. Search the exact variant name in the calculator before following a route." },
    { "question": "What if no Blazamut route appears?", "answer": "Recheck the target spelling, add more owned Pals, increase max generations, remove strict filters, and review /data-sources/ for unsupported areas before assuming the route is impossible." },
    { "question": "Can a Blazamut route solve passive skills too?", "answer": "No. A route can help reach the target, while passive planning is a separate layer with RNG and data-support caveats. Use the passive skill calculator after route planning." }
  ]
}
```

---

## Page 2 — How to Breed Astegon in Palworld

```json
{
  "key": "guideAstegon",
  "path": "/guides/how-to-breed-astegon-palworld/",
  "label": "Astegon Breeding Guide",
  "h1": "How to Breed Astegon in Palworld",
  "title": "How to Breed Astegon in Palworld",
  "description": "Plan Astegon breeding in Palworld with parent-pair lookup, route planning, easiest-way caveats, missing-parent notes, and data version checks.",
  "keywords": "how to breed Astegon Palworld, Palworld Astegon breeding, Astegon parent pairs, easiest way to breed Astegon",
  "ogDescription": "Use PalCalculator to plan Astegon breeding with target-parent lookup, route planning, easiest-way caveats, and current data-source notes.",
  "primaryCta": { "label": "Find Astegon parent pairs", "href": "/breeding-calculator/" },
  "secondaryCta": { "label": "Try an Astegon route", "href": "/breeding-route-calculator/" },
  "intro": [
    "The easiest way to breed Astegon depends on your current Palbox, direct parent availability, max-generation settings, and the data version you are using. A copied combo may be quick for one player and impractical for another.",
    "PalCalculator is an unofficial fan-made Palworld calculator and guide site. Use this page to check Astegon parent pairs, route options, and caveats without turning one workflow into a universal claim."
  ],
  "sections": [
    {
      "heading": "What “easiest way” should mean for Astegon",
      "paragraphs": [
        "For Astegon, easiest should mean the most practical workflow for the player's current constraints, not one global answer for everyone. Compare direct pair availability, owned Pals, missing parents, generation count, and data-source caveats before choosing a route.",
        "Short answer: check Astegon parent pairs first, then use route planning if none of the direct options fit your Palbox."
      ]
    },
    {
      "heading": "Find Astegon parent pairs",
      "paragraphs": [
        "Open `/breeding-calculator/`, search Astegon as the target, and review parent pairs for the selected data version. Check whether any result has normal-formula labels, special-combo caveats, unavailable states, or data-source notes.",
        "Exact Astegon pairs should be generated from the current app data during implementation or verified in the calculator by the user. This handoff does not hardcode an unreviewed pair table."
      ]
    },
    {
      "heading": "Use a route when direct parents are missing",
      "paragraphs": [
        "If a direct Astegon pair requires parents you do not own, use `/breeding-route-calculator/`. Set Astegon as the target, add owned Pals where supported, choose a practical max-generation limit, and review route steps, missing-Pal notes, and alternatives.",
        "If the route looks too long, compare whether catching one missing parent is easier than breeding several intermediates. The most useful route is the one you can actually execute in your save."
      ]
    },
    {
      "heading": "How to compare Astegon route options",
      "paragraphs": [
        "Compare routes by generation count, missing Pals, parent availability, passive goals, and data caveats. A shorter route is not always more practical if it depends on a Pal you cannot get yet.",
        "Use route output as decision support. Recheck data-source notes when another guide shows a different Astegon combo or when Palworld updates change breeding assumptions."
      ]
    },
    {
      "heading": "Passive, IV, and stats follow-up",
      "paragraphs": [
        "After you can reach Astegon, decide what the final Pal is for. Use `/passive-skill-calculator/` for role-based passive planning, then use `/iv-calculator/` and `/stats-calculator/` to evaluate hatch candidates.",
        "Do not treat an Astegon parent pair as a solution for desired passives or ideal stats. Those are separate planning layers with RNG, estimate, and data-support caveats."
      ]
    },
    {
      "heading": "When Astegon results differ across sites",
      "paragraphs": [
        "Astegon combo results can differ across sites because of patch timing, special-combo handling, source choices, aliases, or missing data. Check the current PalCalculator data version and any caveat labels before committing resources.",
        "If a result is unsupported in the current dataset, the page should communicate that state clearly rather than copying a pair from another source without review."
      ]
    }
  ],
  "links": [
    { "label": "find Astegon parent pairs", "href": "/breeding-calculator/" },
    { "label": "try an Astegon route", "href": "/breeding-route-calculator/" },
    { "label": "breeding tree basics", "href": "/guides/palworld-breeding-tree/" },
    { "label": "owned-Pal route planning", "href": "/guides/palworld-breeding-with-owned-pals/" },
    { "label": "path finder workflow", "href": "/guides/palworld-breeding-path-finder/" },
    { "label": "plan Astegon passives", "href": "/passive-skill-calculator/" },
    { "label": "current data version notes", "href": "/data-sources/" }
  ],
  "faqs": [
    { "question": "What is the easiest way to breed Astegon?", "answer": "The easiest way depends on your owned Pals and the current data version. Start with Astegon target-parent lookup, then use route planning if direct parents are missing or impractical." },
    { "question": "What parents make Astegon?", "answer": "Search Astegon in the breeding calculator and review parent pairs shown for the selected dataset. This guide does not hardcode unreviewed pair lists." },
    { "question": "Should I use a direct pair or route for Astegon?", "answer": "Use a direct pair when you own both parents. Use a route when you need multiple generations, missing-parent notes, or alternatives from your current Palbox." },
    { "question": "Why does another Astegon guide show a different combo?", "answer": "Guides can differ because of patch timing, data sources, aliases, or special-combo assumptions. Check visible data-source notes before following a resource-heavy plan." },
    { "question": "Can PalCalculator plan Astegon passives?", "answer": "Use the passive skill calculator to organize desired traits after you choose a route or parent pair. Passive planning is separate from reaching Astegon and should keep RNG caveats visible." }
  ]
}
```

---

## Page 3 — How to Breed Grizzbolt in Palworld

```json
{
  "key": "guideGrizzbolt",
  "path": "/guides/how-to-breed-grizzbolt-palworld/",
  "label": "Grizzbolt Breeding Guide",
  "h1": "How to Breed Grizzbolt in Palworld",
  "title": "How to Breed Grizzbolt in Palworld",
  "description": "Check Grizzbolt breeding in Palworld with parent-pair lookup, owned-Pal route planning, passive and IV follow-up, plus data-source caveats safely.",
  "keywords": "how to breed Grizzbolt Palworld, Palworld Grizzbolt breeding, Grizzbolt parent pairs, Grizzbolt breeding combo",
  "ogDescription": "Use PalCalculator to check Grizzbolt parent-pair options, route planning from owned Pals, passive follow-up, IV checks, and data caveats.",
  "primaryCta": { "label": "Check Grizzbolt parent pairs", "href": "/breeding-calculator/" },
  "secondaryCta": { "label": "Plan a Grizzbolt route", "href": "/breeding-route-calculator/" },
  "intro": [
    "Grizzbolt breeding searches often start with a simple combo question, but the useful answer depends on whether you own the parents, need a route, or want to plan passives after the target is reachable.",
    "PalCalculator is an unofficial fan-made Palworld calculator and guide site. Use this page to check Grizzbolt parent-pair and route workflows while keeping data-version notes and unsupported-state caveats visible."
  ],
  "sections": [
    {
      "heading": "Start with the Grizzbolt question",
      "paragraphs": [
        "Most Grizzbolt searches mean one of four tasks: check current parent pairs, find a route from owned Pals, troubleshoot no-route results, or plan passives and IVs after hatching candidates.",
        "Short answer: search Grizzbolt as the target in the breeding calculator first. If the direct parents are not practical, move the target into route planning."
      ]
    },
    {
      "heading": "Check Grizzbolt parent-pair options",
      "paragraphs": [
        "Open `/breeding-calculator/`, choose target-to-parent mode if needed, and search for Grizzbolt. Review the returned parent pairs for the selected data version and check any caveat labels before following a result.",
        "Do not publish exact Grizzbolt combo claims unless implementation generates them from current app data and a reviewer accepts them. This page is designed to route users to the live calculator result."
      ]
    },
    {
      "heading": "Plan a Grizzbolt route from owned Pals",
      "paragraphs": [
        "If direct parent pairs are missing from your Palbox, use `/breeding-route-calculator/`. Set Grizzbolt as the target, add owned Pals where supported, choose max generations, and review route steps, missing-Pal notes, and no-route states.",
        "Use missing-parent notes as planning signals. Sometimes catching one missing Pal is simpler than extending the breeding chain; sometimes a longer route is more practical because it uses Pals you already have."
      ]
    },
    {
      "heading": "Troubleshoot no-route and mismatch states",
      "paragraphs": [
        "If no Grizzbolt route appears, recheck spelling, selector aliases, owned-Pal inputs, filters, and max-generation settings. Then review `/data-sources/` for current unsupported areas, especially special-combo handling and patch-sensitive data.",
        "If another guide shows a Grizzbolt combo that PalCalculator does not show, compare data versions and caveats before deciding which result to follow."
      ]
    },
    {
      "heading": "Plan Grizzbolt passives after target access",
      "paragraphs": [
        "After finding a parent pair or route, open `/passive-skill-calculator/` to organize desired traits for Grizzbolt's role. The route helps you reach the target; it does not make passive inheritance certain.",
        "Use role-based copy rather than one universal best-build claim. Combat, utility, and breeder goals may call for different passive priorities."
      ]
    },
    {
      "heading": "Check IVs and stats before keeping candidates",
      "paragraphs": [
        "Use `/iv-calculator/` to estimate hidden stat ranges from observed stats, then use `/stats-calculator/` when you want to compare practical outcomes after level and modifiers.",
        "A Grizzbolt candidate with useful passives may still need stat review. Keep IV estimates caveated where inputs, rounding, modifiers, or formulas are incomplete."
      ]
    }
  ],
  "links": [
    { "label": "check Grizzbolt parent pairs", "href": "/breeding-calculator/" },
    { "label": "plan a Grizzbolt breeding route", "href": "/breeding-route-calculator/" },
    { "label": "Anubis target-Pal workflow", "href": "/guides/how-to-breed-anubis-palworld/" },
    { "label": "Orserk target-Pal workflow", "href": "/guides/how-to-breed-orserk-palworld/" },
    { "label": "plan Grizzbolt passives", "href": "/passive-skill-calculator/" },
    { "label": "check IV ranges", "href": "/iv-calculator/" },
    { "label": "data caveats", "href": "/data-sources/" }
  ],
  "faqs": [
    { "question": "How do you get Grizzbolt through breeding?", "answer": "Search Grizzbolt as the target in PalCalculator's breeding calculator, review current parent-pair options, then use the route calculator if direct parents are missing or impractical." },
    { "question": "What parents make Grizzbolt?", "answer": "Use target-to-parent lookup in the breeding calculator and check the results for the current data version. This page avoids hardcoding unreviewed parent pairs." },
    { "question": "What if no Grizzbolt route appears?", "answer": "Check spelling, owned-Pal inputs, filters, and max generations, then review /data-sources/ for unsupported states. A no-route result may be caused by constraints rather than the target alone." },
    { "question": "Can I plan Grizzbolt passives from the same route?", "answer": "Use the route for target access and the passive skill calculator for desired traits. Passive inheritance has RNG and data-support caveats, so treat the passive list as a plan." },
    { "question": "Why might Grizzbolt combos differ across guides?", "answer": "Patch timing, data-source choices, aliases, and special-combo handling can differ. Prefer pages that show current data version and caveats." }
  ]
}
```

---

## Page 4 — How to Breed Lyleen in Palworld

```json
{
  "key": "guideLyleen",
  "path": "/guides/how-to-breed-lyleen-palworld/",
  "label": "Lyleen Breeding Guide",
  "h1": "How to Breed Lyleen in Palworld",
  "title": "How to Breed Lyleen in Palworld",
  "description": "Plan Lyleen breeding in Palworld with parent-pair lookup, owned-Pal routes, Lyleen Noct caveats, passive planning, and data-source notes safely.",
  "keywords": "how to breed Lyleen Palworld, Palworld Lyleen breeding, Lyleen parent pairs, Lyleen Noct caveat",
  "ogDescription": "Use PalCalculator to plan Lyleen breeding with parent lookup, route planning, Lyleen Noct caveats, passive planning, and data-source notes.",
  "primaryCta": { "label": "Find Lyleen parent pairs", "href": "/breeding-calculator/" },
  "secondaryCta": { "label": "Plan a Lyleen route", "href": "/breeding-route-calculator/" },
  "intro": [
    "Lyleen breeding is easiest to plan when you keep the target, route, and passive goals separate. First verify current parent pairs, then decide whether a route from owned Pals is more practical, then plan role-based passives if you care about base work or breeding projects.",
    "PalCalculator is an unofficial fan-made Palworld calculator and guide site. Use this page to check Lyleen workflows with visible data-version notes, Lyleen Noct caveats, and unsupported-state language."
  ],
  "sections": [
    {
      "heading": "Choose Lyleen as the exact target",
      "paragraphs": [
        "Start by selecting Lyleen as the target in the breeding calculator. Do not merge Lyleen and Lyleen Noct results; they should be checked as distinct targets with their own target names and data states.",
        "Short answer: search Lyleen in target-to-parent mode, review current parent pairs, then use route planning if direct options are missing from your Palbox."
      ]
    },
    {
      "heading": "Find Lyleen parent pairs",
      "paragraphs": [
        "Open `/breeding-calculator/`, choose target-to-parent mode if available, and search for Lyleen. Review the parent pairs, selected data version, caveat labels, and any unsupported-state copy before following the result.",
        "Exact parent-pair examples should be generated from current app data during implementation or left to the calculator. This page should teach verification rather than publish an unreviewed combo chart."
      ]
    },
    {
      "heading": "Plan a Lyleen route from owned Pals",
      "paragraphs": [
        "If you do not own a practical direct pair, use `/breeding-route-calculator/`. Set Lyleen as the target, add owned Pals where the tool supports browser-local owned-Pal planning, pick a practical max generation limit, and review route steps and missing-Pal notes.",
        "Owned-Pal inputs should be framed as browser-local in MVP copy unless a later reviewed feature explicitly adds account or server-side storage."
      ]
    },
    {
      "heading": "Lyleen Noct and variant caveats",
      "paragraphs": [
        "Lyleen Noct deserves separate target treatment. If a player wants Lyleen Noct, send them to the calculator target selector for that exact name instead of implying this base Lyleen page covers both.",
        "Variant-sensitive pages should avoid hidden redirects, mixed data, or copied route claims. Use the data-source notes when another guide combines variants without explaining the difference."
      ]
    },
    {
      "heading": "Base work and passive planning without overclaiming",
      "paragraphs": [
        "Lyleen can connect naturally to base-worker and passive-planning content, but avoid saying one build is best for every player. Use `/passive-skill-calculator/` and `/guides/palworld-base-worker-passives/` to frame passives by role and current support.",
        "Current passive data is seed-only, so do not imply complete work-speed passive coverage or exact inheritance odds. Treat desired passives as a planning layer after target access."
      ]
    },
    {
      "heading": "IV and stat checks after Lyleen breeding",
      "paragraphs": [
        "After hatching candidates, use `/iv-calculator/` and `/stats-calculator/` if you need to compare breeder quality or role fit. IV estimates should stay caveated when inputs, formulas, modifiers, or rounding create uncertainty.",
        "A clean Lyleen plan separates target access, passive goals, and stat review instead of presenting one combo as the whole project."
      ]
    }
  ],
  "links": [
    { "label": "find Lyleen parent pairs", "href": "/breeding-calculator/" },
    { "label": "plan a Lyleen route", "href": "/breeding-route-calculator/" },
    { "label": "plan Lyleen passives", "href": "/passive-skill-calculator/" },
    { "label": "base worker passive planning", "href": "/guides/palworld-base-worker-passives/" },
    { "label": "breeding tree basics", "href": "/guides/palworld-breeding-tree/" },
    { "label": "Palworld IV explained", "href": "/guides/palworld-iv-explained/" },
    { "label": "PalCalculator data notes", "href": "/data-sources/" }
  ],
  "faqs": [
    { "question": "How do you breed Lyleen in Palworld?", "answer": "Search Lyleen as the target in PalCalculator's breeding calculator, review current parent pairs and caveats, then use the route calculator if direct parents are not practical." },
    { "question": "What parents make Lyleen?", "answer": "Use target-to-parent lookup for Lyleen in the current calculator dataset. This guide does not hardcode unreviewed parent-pair lists." },
    { "question": "Is Lyleen Noct the same as Lyleen for breeding?", "answer": "No. Treat Lyleen and Lyleen Noct as separate targets. Search the exact variant name in the calculator before following a route." },
    { "question": "Can I use owned Pals to plan Lyleen?", "answer": "Use the route calculator for owned-Pal planning where supported. Current MVP copy should describe owned-Pal inputs as browser-local unless a later reviewed feature says otherwise." },
    { "question": "Which passives should I plan for Lyleen?", "answer": "Choose passives by role and current support. Use the passive skill calculator and base-worker guide, and avoid treating passive inheritance as certain." }
  ]
}
```

---

## Page 5 — Palworld Breeding Path Finder

```json
{
  "key": "guideBreedingPathFinder",
  "path": "/guides/palworld-breeding-path-finder/",
  "label": "Breeding Path Finder Guide",
  "h1": "Palworld Breeding Path Finder",
  "title": "Palworld Breeding Path Finder",
  "description": "Use PalCalculator as a Palworld breeding path finder with owned-Pal route planning, missing-parent notes, clean constraints, and data caveats.",
  "keywords": "Palworld breeding path finder, Palworld breeding route calculator, Palworld breeding shortest path calculator, breeding path Palworld",
  "ogDescription": "Learn how to use PalCalculator as a Palworld breeding path finder with owned-Pal inputs, route constraints, missing-parent notes, and data caveats.",
  "primaryCta": { "label": "Open the breeding path finder", "href": "/breeding-route-calculator/" },
  "secondaryCta": { "label": "Check direct parent pairs first", "href": "/breeding-calculator/" },
  "intro": [
    "A Palworld breeding path finder helps when one direct combo is not enough. Instead of scanning static charts, you choose a target, add the Pals you already own where supported, set practical constraints, and read the route, missing-parent notes, or no-route state.",
    "PalCalculator is an unofficial fan-made Palworld calculator and guide site. Use this guide to understand path-finder results as current-data planning output, not as an official or always-complete route table."
  ],
  "sections": [
    {
      "heading": "What a breeding path finder does",
      "paragraphs": [
        "A breeding path finder searches for a multi-generation route from available or selected Pals to the target Pal you want. It is most useful when direct parent pairs are missing, impractical, or hard to compare manually.",
        "Short answer: use the breeding calculator for one parent-pair question and the breeding route calculator when you need a path from owned Pals, missing-parent notes, alternatives, or max-generation constraints."
      ]
    },
    {
      "heading": "Path finder vs direct parent-pair lookup",
      "paragraphs": [
        "Direct parent-pair lookup answers: which parents can produce this target, or what child comes from two selected parents. A path finder answers: how can I get from what I have to the target across one or more generations?",
        "Start with direct lookup when you already own both parents. Use the path finder when the route matters more than one combo."
      ]
    },
    {
      "heading": "How to use PalCalculator as a path finder",
      "paragraphs": [
        "Open `/breeding-route-calculator/`, choose the target Pal, add owned Pals where the tool supports browser-local owned-Pal planning, set max generations, and review the returned route status.",
        "Read each route as a constraint-based result: target, selected data version, owned-Pal assumptions, generation limit, missing parents, route steps, and caveats. If you change constraints, the route can change."
      ]
    },
    {
      "heading": "How to read missing-parent notes",
      "paragraphs": [
        "A missing-parent note is not automatically a failure. It tells you which parent or intermediate Pal may be needed outside your current owned-Pal list. Use that note to decide whether to catch the Pal, breed an intermediate, raise max generations, or compare another route.",
        "If every route depends on missing or unsupported data, review `/data-sources/` before spending resources. Unsupported states should be visible, not hidden behind a guessed path."
      ]
    },
    {
      "heading": "Shortest path wording and caveats",
      "paragraphs": [
        "Avoid saying the tool has the shortest route for every player and every patch. Safer copy: PalCalculator can search for a short route found within the current data, owned-Pal inputs, max-generation setting, and supported breeding rules.",
        "A path with fewer generations may still be less practical if it requires rare or missing parents. Compare route practicality, not just length."
      ]
    },
    {
      "heading": "Privacy and share-state boundaries",
      "paragraphs": [
        "Owned-Pal inputs should be described as browser-local unless a later reviewed product feature explicitly adds account storage or server-side syncing. Do not imply login, backend storage, or save-file upload for this page.",
        "If downstream implementation adds shareable route URLs, keep canonical indexed pages clean. Query-state, draft-state, placeholder, or user-specific URLs should stay out of the sitemap and use noindex rules where appropriate."
      ]
    },
    {
      "heading": "Next tools after a path is found",
      "paragraphs": [
        "After a route appears, use `/passive-skill-calculator/` for desired traits and `/iv-calculator/` or `/stats-calculator/` to evaluate hatch candidates. A route solves target access; it does not solve passive RNG or stat uncertainty by itself.",
        "Recheck data-source notes after major patches, when guides disagree, or before following a long route."
      ]
    }
  ],
  "links": [
    { "label": "open the breeding path finder", "href": "/breeding-route-calculator/" },
    { "label": "check direct parent pairs first", "href": "/breeding-calculator/" },
    { "label": "owned-Pal route planning", "href": "/guides/palworld-breeding-with-owned-pals/" },
    { "label": "route example patterns", "href": "/guides/palworld-breeding-route-examples/" },
    { "label": "breeding tree basics", "href": "/guides/palworld-breeding-tree/" },
    { "label": "Palworld breeding FAQ", "href": "/guides/palworld-breeding-faq/" },
    { "label": "route data caveats", "href": "/data-sources/" }
  ],
  "faqs": [
    { "question": "What is a Palworld breeding path finder?", "answer": "It is a route-planning workflow that searches for breeding paths from selected or owned Pals to a target Pal under the current data and constraints." },
    { "question": "When should I use the path finder instead of the breeding calculator?", "answer": "Use the breeding calculator for direct parent-pair questions. Use the path finder when you need multiple generations, owned-Pal planning, missing-parent notes, or route alternatives." },
    { "question": "Can the path finder use my owned Pals?", "answer": "Use owned-Pal planning where the route calculator supports it. Current MVP copy should describe those inputs as browser-local unless a reviewed feature explicitly adds account or server-side storage." },
    { "question": "Why does a path show missing parents?", "answer": "A missing-parent note means the route may need a parent or intermediate Pal outside your current owned-Pal list. Use it to decide whether to catch, breed, or route around that requirement." },
    { "question": "Does PalCalculator always find the shortest breeding path?", "answer": "No. Treat the result as a route found within current data, selected constraints, max generations, and supported rules. Compare practicality as well as route length." },
    { "question": "Should route URLs with my Palbox be indexed?", "answer": "No. Indexed pages should stay clean and canonical. User-specific query-state or share-state URLs should stay out of the sitemap and use noindex behavior where appropriate." }
  ]
}
```

## Copy QA checklist

- Five selected pages drafted: Blazamut, Astegon, Grizzbolt, Lyleen, breeding path finder.
- Each page includes title, slug/path, description, hero/intro, sections, FAQ, internal links, caveats, and calculator CTAs.
- Descriptions are intended to stay between 140 and 160 characters after exact JSON escaping is removed.
- Copy avoids static unreviewed parent-pair tables, exact route claims, exact passive odds, special-combo coverage claims, login/storage claims, save-file upload claims, and Cloudflare/GSC actions.
- Every page links users back to calculator verification and `/data-sources/`.
- Frontend implementation should still run `npm run test`, `npm run lint`, `npm run build`, and inspect generated static HTML for each URL.

## Downstream handoff

Next recommended agent: frontend_bot.

Must read before implementation:

- `artifacts/p11-seo-copy-batch.md`
- `artifacts/p10-seo-next-content-brief.md`
- `src/guides-data.json`
- `src/main.tsx`
- `src/data/version.json`
- `src/data/special-combos.latest.json`

Implementation notes:

- Add pages through the existing guide-data/static-route pattern only after reviewing current source structure.
- Keep the path-finder page as an explanatory guide and route-entry hub, not a query-state indexation surface.
- Keep exact examples out unless generated from current app data and reviewed.

Final line: [DONE]
