# P13 SEO Copy Batch — Five P12 Guide Pages

Project: PalCalculator
Task: t_c5616714
Prepared by: copy_bot
Status: copy handoff only; no source code, sitemap, route, deploy, DNS, GSC, Cloudflare, login, backend storage, or save-file upload changes.

## Source inputs used

- `artifacts/p12-seo-next-content-brief.md`
- `src/guides-data.json`
- `src/data/version.json`
- Existing P11 target-Pal guide style from `artifacts/p11-seo-copy-batch.md` and implemented guide entries.

## Shared copy rules for implementation

- Current data version: `palworld-1-0_public-web_2026-07-16_r1`.
- PalCalculator should be described as an independent fan-made Palworld calculator and guide site in first-screen copy.
- Exact parent pairs, exact routes, passive inheritance probabilities, special-combo override coverage, login/storage claims, and save-file upload claims are not hardcoded in this handoff.
- Current caveats to preserve: verified special-combo override table is pending; passive data is seed-only; passive inheritance probabilities are not supported; server-side save upload is not supported; full IV exactness with every modifier is not supported.
- Use `/data-sources/` as the visible data-source and caveat link.
- FAQPage schema should be emitted only if the same Q&A is visible on the page.
- Preferred schema: `TechArticle`; avoid `HowTo` unless downstream implementation adds complete visible steps and schema review.
- Keep variant targets separate: Faleris Aqua, Kitsun Noct, Suzaku Aqua, and Helzephyr Lux should not inherit base-page routes without current-data verification.

## JSON-ready content blocks

The blocks below follow the existing `src/guides-data.json` shape closely enough for a frontend agent to adapt. They are markdown handoff blocks, not source implementation.

---

## Page 1 — How to Breed Faleris in Palworld

```json
{
  "key": "guideFaleris",
  "path": "/guides/how-to-breed-faleris-palworld/",
  "label": "Faleris Breeding Guide",
  "h1": "How to Breed Faleris in Palworld",
  "title": "How to Breed Faleris in Palworld",
  "description": "Plan Faleris breeding in Palworld with parent-pair lookup, route checks, Aqua variant notes, passive follow-up, and visible data-source caveats.",
  "keywords": "how to breed Faleris Palworld, Palworld Faleris breeding, Faleris parent pairs, Faleris breed combo, Faleris Aqua caveat",
  "ogDescription": "Use PalCalculator to plan Faleris breeding with parent-pair lookup, owned-Pal route checks, Faleris Aqua caveats, and current data notes.",
  "primaryCta": {
    "label": "Check Faleris parent pairs",
    "href": "/breeding-calculator/"
  },
  "secondaryCta": {
    "label": "Plan a Faleris route",
    "href": "/breeding-route-calculator/"
  },
  "intro": [
    "Breeding Faleris in Palworld is easier to plan when you verify current parent-pair options instead of following one saved combo chart. Start with Faleris as the target, then decide whether a direct pair or a route from owned Pals is the practical next step.",
    "PalCalculator is an independent fan-made Palworld calculator and guide site. Use this page as a verification workflow for Faleris, with version notes, variant caveats, and calculator handoffs kept visible before you spend resources."
  ],
  "sections": [
    {
      "heading": "Start with Faleris as the exact target",
      "paragraphs": [
        "Choose Faleris as the target before comparing parent-pair options. Searches that mention Faleris Aqua should be treated as a separate variant intent, not silently folded into the base Faleris page.",
        "Short answer: search Faleris in the breeding calculator, review current parent-pair options and caveats, then use route planning if none of the direct pairs fit your Palbox."
      ]
    },
    {
      "heading": "Check current Faleris parent pairs",
      "paragraphs": [
        "Open `/breeding-calculator/`, use target-to-parent lookup where available, and search for Faleris. Review the returned parent pairs, the selected data version, and any caveat labels before following a result.",
        "This handoff does not publish a static Faleris combo table. Downstream implementation should either generate pairs from current app data with review or keep the page focused on calculator verification."
      ]
    },
    {
      "heading": "When to use a route from owned Pals",
      "paragraphs": [
        "If a direct pair requires parents you do not own, open `/breeding-route-calculator/`, set Faleris as the target, add owned Pals where supported, choose a practical generation limit, and review route steps plus missing-Pal notes.",
        "A route result is constraint-based. If no route appears, recheck spelling, add more owned Pals, relax filters, increase the generation limit, or review `/data-sources/` for unsupported areas."
      ]
    },
    {
      "heading": "Faleris vs Faleris Aqua caveat",
      "paragraphs": [
        "Faleris and Faleris Aqua exist as separate targets in the current dataset. If a player wants the Aqua variant, send them to search that exact target rather than implying base Faleris parent pairs apply to both.",
        "Variant pages can be added later when they have unique copy, unique internal links, and reviewed current-data behavior instead of thin duplicated sections."
      ]
    },
    {
      "heading": "Passive, IV, and stat follow-up",
      "paragraphs": [
        "After you can reach Faleris, move to `/passive-skill-calculator/` if you care about role-based traits. Desired passives are planning targets and may require repeated breeding attempts.",
        "Use `/iv-calculator/` and `/stats-calculator/` after hatching candidates to compare stat ranges and practical outcomes before choosing long-term breeders."
      ]
    },
    {
      "heading": "Why another page may show different Faleris combos",
      "paragraphs": [
        "Faleris results can differ across websites because of patch timing, source choices, variant handling, aliases, or special-combo assumptions. Prefer pages that expose data-source notes instead of hiding uncertainty.",
        "If PalCalculator cannot show a Faleris result for the current dataset or constraints, the safe page behavior is to show an unavailable state rather than copying an unreviewed pair from another source."
      ]
    }
  ],
  "links": [
    {
      "label": "check Faleris parent pairs",
      "href": "/breeding-calculator/"
    },
    {
      "label": "plan a Faleris route from owned Pals",
      "href": "/breeding-route-calculator/"
    },
    {
      "label": "Palworld 1.0 breeding calculator",
      "href": "/palworld-1-0-breeding-calculator/"
    },
    {
      "label": "Blazamut target-Pal workflow",
      "href": "/guides/how-to-breed-blazamut-palworld/"
    },
    {
      "label": "breeding path finder workflow",
      "href": "/guides/palworld-breeding-path-finder/"
    },
    {
      "label": "plan Faleris passives",
      "href": "/passive-skill-calculator/"
    },
    {
      "label": "data-source caveats",
      "href": "/data-sources/"
    }
  ],
  "faqs": [
    {
      "question": "Can you breed Faleris in Palworld?",
      "answer": "Use PalCalculator's current breeding data to check Faleris parent-pair and route availability. This guide keeps exact pairs in the calculator so results stay tied to the selected dataset."
    },
    {
      "question": "What parents make Faleris?",
      "answer": "Open the breeding calculator, search Faleris in target-to-parent mode, and review the parent pairs shown for the current data version. Use route planning if direct parents are impractical."
    },
    {
      "question": "Is Faleris Aqua covered by this page?",
      "answer": "This page is for base Faleris. Search Faleris Aqua as a separate target before following variant-specific breeding advice."
    },
    {
      "question": "What if no Faleris route appears?",
      "answer": "Recheck spelling, add more owned Pals, increase max generations, remove strict filters, and review /data-sources/ for unsupported areas before changing the plan."
    },
    {
      "question": "Can a Faleris route solve passives too?",
      "answer": "No. A route helps with target access. Use the passive skill calculator as a separate planning layer for desired traits and current support caveats."
    }
  ]
}
```

---

## Page 2 — How to Breed Kitsun in Palworld

```json
{
  "key": "guideKitsun",
  "path": "/guides/how-to-breed-kitsun-palworld/",
  "label": "Kitsun Breeding Guide",
  "h1": "How to Breed Kitsun in Palworld",
  "title": "How to Breed Kitsun in Palworld",
  "description": "Plan Kitsun breeding in Palworld with parent lookup, route planning, Kitsun Noct variant notes, passive follow-up, and visible data-source caveats.",
  "keywords": "how to breed Kitsun Palworld, Palworld Kitsun breeding, Kitsun parent pairs, Kitsun breed combo, Kitsun Noct caveat",
  "ogDescription": "Use PalCalculator to plan Kitsun breeding with target-parent lookup, owned-Pal route planning, Kitsun Noct caveats, and current data notes.",
  "primaryCta": {
    "label": "Find Kitsun parent pairs",
    "href": "/breeding-calculator/"
  },
  "secondaryCta": {
    "label": "Try a Kitsun route",
    "href": "/breeding-route-calculator/"
  },
  "intro": [
    "Kitsun breeding searches often mix a direct parent-pair question with variant intent. Keep the target clean: check base Kitsun first, then treat Kitsun Noct as a separate target if that is what the player wants.",
    "PalCalculator is an independent fan-made Palworld calculator and guide site. Use this page to verify current Kitsun breeding options, route status, passive follow-up, and data-source caveats before committing resources."
  ],
  "sections": [
    {
      "heading": "Choose Kitsun instead of a mixed variant target",
      "paragraphs": [
        "Start by selecting Kitsun as the exact target. Do not assume base Kitsun and Kitsun Noct share the same parent-pair results or route behavior.",
        "Short answer: search Kitsun in target-to-parent mode, review current parent pairs, then use route planning when the direct parents are missing or inconvenient."
      ]
    },
    {
      "heading": "Find current Kitsun parent pairs",
      "paragraphs": [
        "Open `/breeding-calculator/`, search Kitsun as the target, and review parent-pair options for the selected data version. Check caveat labels before treating a pair as usable.",
        "Keep exact pair examples out of static copy unless downstream implementation generates them from current app data and review confirms the output."
      ]
    },
    {
      "heading": "Use route planning when direct parents are missing",
      "paragraphs": [
        "Open `/breeding-route-calculator/`, set Kitsun as the target, add owned Pals where supported, and compare route steps, missing-Pal notes, and no-route states.",
        "If no Kitsun route appears, change constraints deliberately: check spelling, relax filters, add more owned Pals, or increase max generations before assuming the target cannot be planned."
      ]
    },
    {
      "heading": "Kitsun Noct caveat",
      "paragraphs": [
        "Kitsun Noct exists as a distinct variant in the current dataset. Mention it only as a separate target or later page, not as hidden content inside the base Kitsun page.",
        "When another guide combines Kitsun variants, use PalCalculator's target selector and data notes to separate base and Noct results cleanly."
      ]
    },
    {
      "heading": "Passive, IV, and stats follow-up",
      "paragraphs": [
        "Once Kitsun target access is solved, use `/passive-skill-calculator/` to plan desired traits by role. Avoid implying that a parent pair automatically carries the final trait set.",
        "Use `/iv-calculator/` and `/stats-calculator/` after hatching candidates to decide which Kitsun is worth keeping for breeding, combat, or utility goals."
      ]
    },
    {
      "heading": "Common mistakes with old Kitsun combo screenshots",
      "paragraphs": [
        "Old screenshots can be useful reminders, but they may use different patch timing, aliases, or source assumptions. Verify the result in the current calculator instead of copying a static chart.",
        "If PalCalculator shows an unavailable or no-route state, keep that state visible and route the user to data-source notes rather than filling the gap with a guessed combo."
      ]
    }
  ],
  "links": [
    {
      "label": "find Kitsun parent pairs",
      "href": "/breeding-calculator/"
    },
    {
      "label": "try a Kitsun route",
      "href": "/breeding-route-calculator/"
    },
    {
      "label": "Shadowbeak target-Pal workflow",
      "href": "/guides/how-to-breed-shadowbeak-palworld/"
    },
    {
      "label": "Lyleen variant caveat example",
      "href": "/guides/how-to-breed-lyleen-palworld/"
    },
    {
      "label": "owned-Pal route planning",
      "href": "/guides/palworld-breeding-with-owned-pals/"
    },
    {
      "label": "check IV ranges after hatching",
      "href": "/iv-calculator/"
    },
    {
      "label": "current data version notes",
      "href": "/data-sources/"
    }
  ],
  "faqs": [
    {
      "question": "Can you breed Kitsun in Palworld?",
      "answer": "Check Kitsun in PalCalculator's current breeding calculator to review parent-pair and route availability for the selected dataset."
    },
    {
      "question": "What parents make Kitsun?",
      "answer": "Search Kitsun in target-to-parent mode and review the parent pairs shown in the calculator. This guide avoids static unreviewed pair lists."
    },
    {
      "question": "Is Kitsun Noct covered here?",
      "answer": "This page is for base Kitsun. Treat Kitsun Noct as a separate target and search that exact name before following variant advice."
    },
    {
      "question": "Should I use a direct pair or a route for Kitsun?",
      "answer": "Use a direct pair when you own both parents. Use the route calculator when you need multiple generations, missing-Pal notes, or alternatives from your current Palbox."
    },
    {
      "question": "Why do Kitsun combo guides differ?",
      "answer": "Guides can differ because of patch timing, data-source choices, aliases, variants, or unsupported states. Compare data notes before committing resources."
    }
  ]
}
```

---

## Page 3 — How to Breed Suzaku in Palworld

```json
{
  "key": "guideSuzaku",
  "path": "/guides/how-to-breed-suzaku-palworld/",
  "label": "Suzaku Breeding Guide",
  "h1": "How to Breed Suzaku in Palworld",
  "title": "How to Breed Suzaku in Palworld",
  "description": "Plan Suzaku breeding in Palworld with parent-pair lookup, route checks, Suzaku Aqua caveats, passive follow-up, and visible data-source notes.",
  "keywords": "how to breed Suzaku Palworld, Palworld Suzaku breeding, Suzaku parent pairs, Suzaku breed combo, Suzaku Aqua caveat",
  "ogDescription": "Use PalCalculator to plan Suzaku breeding with parent-pair lookup, route checks, Suzaku Aqua caveats, passive follow-up, and current data notes.",
  "primaryCta": {
    "label": "Check Suzaku parent pairs",
    "href": "/breeding-calculator/"
  },
  "secondaryCta": {
    "label": "Plan a Suzaku route",
    "href": "/breeding-route-calculator/"
  },
  "intro": [
    "Suzaku breeding searches often come from combo charts, videos, or 1.0 freshness questions. The safer workflow is to use this page to choose the right calculator path, then verify current parent-pair or route results from the selected dataset.",
    "PalCalculator is an independent fan-made Palworld calculator and guide site. Use this guide for Suzaku target planning, Aqua variant separation, passive follow-up, and transparent data-source caveats."
  ],
  "sections": [
    {
      "heading": "Start with the Suzaku result you need",
      "paragraphs": [
        "Select Suzaku as the target first. If the search intent is Suzaku Aqua, send the user to search that exact variant rather than mixing base and Aqua routes.",
        "Short answer: check Suzaku parent pairs in the breeding calculator, then move to route planning if the direct parents are not practical for your Palbox."
      ]
    },
    {
      "heading": "Check current Suzaku parent-pair options",
      "paragraphs": [
        "Open `/breeding-calculator/`, search Suzaku as the target, and review parent pairs with the selected data version visible. Check caveat labels before acting on a result.",
        "Do not turn this page into a static combo table unless the exact pairs are generated from current app data during implementation and reviewed before publishing."
      ]
    },
    {
      "heading": "Plan a Suzaku route when a direct pair is impractical",
      "paragraphs": [
        "Use `/breeding-route-calculator/` when you do not own a practical direct pair. Set Suzaku as the target, add owned Pals where supported, choose a max generation limit, and read route steps plus missing-Pal notes.",
        "Route results can change with constraints. If no route appears, check spelling, remove strict filters, add more owned Pals, or review `/data-sources/` for unsupported states."
      ]
    },
    {
      "heading": "Suzaku Aqua variant caveat",
      "paragraphs": [
        "Suzaku and Suzaku Aqua exist as separate targets in the current dataset. Base Suzaku copy should mention Aqua only as a variant caveat or future page opportunity.",
        "If another guide or video uses Aqua results inside base Suzaku advice, verify the exact target in PalCalculator before following the plan."
      ]
    },
    {
      "heading": "Passive and IV follow-up after target access",
      "paragraphs": [
        "After reaching a Suzaku route or parent-pair plan, use `/passive-skill-calculator/` to organize desired traits by role. Treat passive planning as separate from target access.",
        "Use `/iv-calculator/` and `/stats-calculator/` after hatching candidates when you need to compare stat ranges or practical outcomes."
      ]
    },
    {
      "heading": "How to handle Reddit or video combo mismatches",
      "paragraphs": [
        "Community posts and videos can lag behind patches or use different data assumptions. Use them as leads, then verify against PalCalculator's current dataset and data-source notes.",
        "When results disagree, preserve the mismatch as a caveat and send users to calculator verification rather than choosing an unreviewed static claim."
      ]
    }
  ],
  "links": [
    {
      "label": "check Suzaku parent pairs",
      "href": "/breeding-calculator/"
    },
    {
      "label": "plan a Suzaku breeding route",
      "href": "/breeding-route-calculator/"
    },
    {
      "label": "Palworld 1.0 breeding guide",
      "href": "/guides/palworld-1-0-breeding-guide/"
    },
    {
      "label": "Faleris target-Pal workflow",
      "href": "/guides/how-to-breed-faleris-palworld/"
    },
    {
      "label": "plan Suzaku passives",
      "href": "/passive-skill-calculator/"
    },
    {
      "label": "compare expected stats",
      "href": "/stats-calculator/"
    },
    {
      "label": "data caveats",
      "href": "/data-sources/"
    }
  ],
  "faqs": [
    {
      "question": "Can you breed Suzaku in Palworld?",
      "answer": "Use PalCalculator's current breeding data to check Suzaku parent-pair and route availability for the selected dataset."
    },
    {
      "question": "What parents make Suzaku?",
      "answer": "Open the breeding calculator, search Suzaku in target-to-parent mode, and review current parent pairs plus any caveat labels."
    },
    {
      "question": "Is Suzaku Aqua the same target?",
      "answer": "No. Suzaku Aqua should be checked as its own target. Do not apply base Suzaku route copy to the Aqua variant without verification."
    },
    {
      "question": "What if another guide shows a different Suzaku combo?",
      "answer": "Compare patch timing and data-source notes, then verify the exact target in the current calculator before spending resources."
    },
    {
      "question": "What if no Suzaku route appears?",
      "answer": "Recheck spelling, add owned Pals, relax filters, increase max generations, and review /data-sources/ for unsupported areas."
    }
  ]
}
```

---

## Page 4 — How to Breed Helzephyr in Palworld

```json
{
  "key": "guideHelzephyr",
  "path": "/guides/how-to-breed-helzephyr-palworld/",
  "label": "Helzephyr Breeding Guide",
  "h1": "How to Breed Helzephyr in Palworld",
  "title": "How to Breed Helzephyr in Palworld",
  "description": "Plan Helzephyr breeding in Palworld with parent lookup, route planning, Helzephyr Lux caveats, passive follow-up, and visible data-source notes.",
  "keywords": "how to breed Helzephyr Palworld, Palworld Helzephyr breeding, Helzephyr parent pairs, Helzephyr breed combo, Helzephyr Lux caveat",
  "ogDescription": "Use PalCalculator to plan Helzephyr breeding with parent lookup, route planning, Helzephyr Lux caveats, passive follow-up, and data notes.",
  "primaryCta": {
    "label": "Find Helzephyr parent pairs",
    "href": "/breeding-calculator/"
  },
  "secondaryCta": {
    "label": "Try a Helzephyr route",
    "href": "/breeding-route-calculator/"
  },
  "intro": [
    "Helzephyr breeding is safest to plan as a current-data workflow: select Helzephyr as the target, review parent-pair options, then route from owned Pals if a direct pair is not practical.",
    "PalCalculator is an independent fan-made Palworld calculator and guide site. Use this page to verify Helzephyr routes, keep Helzephyr Lux separate, and preserve data-source caveats before following a combo."
  ],
  "sections": [
    {
      "heading": "Select Helzephyr as the exact target",
      "paragraphs": [
        "Start with the base Helzephyr target. If the player wants Helzephyr Lux, treat that as a separate variant search and not as a hidden subsection with mixed parent pairs.",
        "Short answer: search Helzephyr in target-to-parent mode first, then use route planning if direct parents are unavailable or inconvenient."
      ]
    },
    {
      "heading": "Find current Helzephyr parent pairs",
      "paragraphs": [
        "Open `/breeding-calculator/`, search Helzephyr, and review parent pairs for the selected data version. Check labels for normal formula support, special-combo assumptions, unavailable states, and data-source notes.",
        "This copy intentionally avoids static unreviewed pair tables. Exact examples should come only from current app data during implementation and review."
      ]
    },
    {
      "heading": "Use the route calculator if direct parents are missing",
      "paragraphs": [
        "Open `/breeding-route-calculator/`, set Helzephyr as the target, add owned Pals where supported, and compare route steps, missing-Pal notes, alternatives, and no-route states.",
        "A longer route can still be practical if it uses Pals you already own. Compare generation count with missing-parent effort before choosing a plan."
      ]
    },
    {
      "heading": "Helzephyr Lux caveat",
      "paragraphs": [
        "Helzephyr Lux exists as a separate variant target in the current dataset. Mention it as a caveat or later page, but do not imply base Helzephyr pairs apply to Lux.",
        "If search demand grows for Helzephyr Lux, create a unique variant page only after base Helzephyr has shipped and the variant copy can stand on its own."
      ]
    },
    {
      "heading": "Passive, IV, and stats after a route",
      "paragraphs": [
        "Once a Helzephyr parent pair or route is available, use `/passive-skill-calculator/` to plan desired traits by role without treating inheritance as certain.",
        "Use `/iv-calculator/` and `/stats-calculator/` after hatching candidates when deciding which Helzephyr to keep or invest in."
      ]
    },
    {
      "heading": "Why combo results can differ between sites",
      "paragraphs": [
        "Different sites can update at different times, apply variant names differently, or assume unsupported special-combo data. PalCalculator should keep those caveats visible.",
        "If a Helzephyr result is missing or conflicts with another source, route users to calculator verification and `/data-sources/` instead of publishing a borrowed answer."
      ]
    }
  ],
  "links": [
    {
      "label": "find Helzephyr parent pairs",
      "href": "/breeding-calculator/"
    },
    {
      "label": "try a Helzephyr route",
      "href": "/breeding-route-calculator/"
    },
    {
      "label": "breeding tree basics",
      "href": "/guides/palworld-breeding-tree/"
    },
    {
      "label": "route example patterns",
      "href": "/guides/palworld-breeding-route-examples/"
    },
    {
      "label": "plan Helzephyr passives",
      "href": "/passive-skill-calculator/"
    },
    {
      "label": "check IV estimates",
      "href": "/iv-calculator/"
    },
    {
      "label": "current data notes",
      "href": "/data-sources/"
    }
  ],
  "faqs": [
    {
      "question": "Can you breed Helzephyr in Palworld?",
      "answer": "Check Helzephyr in PalCalculator's current breeding calculator to review parent-pair and route availability for the selected dataset."
    },
    {
      "question": "What parents make Helzephyr?",
      "answer": "Use target-to-parent lookup for Helzephyr in the breeding calculator. Review current pairs and data caveats instead of relying on a copied chart."
    },
    {
      "question": "Is Helzephyr Lux the same target?",
      "answer": "No. Helzephyr Lux should be checked as a separate target before following variant-specific advice."
    },
    {
      "question": "How do I route from owned Pals to Helzephyr?",
      "answer": "Use the route calculator, add owned Pals where supported, set a practical generation limit, and compare route steps plus missing-Pal notes."
    },
    {
      "question": "Can this page choose the best Helzephyr build?",
      "answer": "No. It can route players to parent-pair, passive, IV, and stats tools, but role choices and current support should guide build planning."
    }
  ]
}
```

---

## Page 5 — How to Breed Selyne in Palworld

```json
{
  "key": "guideSelyne",
  "path": "/guides/how-to-breed-selyne-palworld/",
  "label": "Selyne Breeding Guide",
  "h1": "How to Breed Selyne in Palworld",
  "title": "How to Breed Selyne in Palworld",
  "description": "Plan Selyne breeding in Palworld with parent-pair lookup, route checks, patch-sensitive caveats, passive follow-up, and visible data-source notes.",
  "keywords": "how to breed Selyne Palworld, Palworld Selyne breeding, Selyne parent pairs, Selyne breed combo, Palworld 1.0 Selyne breeding",
  "ogDescription": "Use PalCalculator to plan Selyne breeding with current parent-pair lookup, route planning, 1.0 caveats, passive follow-up, and data notes.",
  "primaryCta": {
    "label": "Check Selyne parent pairs",
    "href": "/breeding-calculator/"
  },
  "secondaryCta": {
    "label": "Plan a Selyne route",
    "href": "/breeding-route-calculator/"
  },
  "intro": [
    "Selyne breeding searches often carry 1.0 freshness intent, so the page should stay version-aware from the first screen. Use current calculator data first, then compare routes, caveats, and follow-up tools before committing resources.",
    "PalCalculator is an independent fan-made Palworld calculator and guide site. Use this Selyne guide to verify parent pairs, route status, patch-sensitive notes, and data-source caveats instead of relying on one combo screenshot."
  ],
  "sections": [
    {
      "heading": "Check Selyne in the current dataset first",
      "paragraphs": [
        "Start by searching Selyne as the exact target and reading the selected data version. This keeps 1.0 and patch-sensitive questions tied to visible calculator support.",
        "Short answer: use target-to-parent lookup for Selyne, then move into route planning if the direct parent options are missing or impractical."
      ]
    },
    {
      "heading": "Find current Selyne parent pairs",
      "paragraphs": [
        "Open `/breeding-calculator/`, search Selyne as the target, and review parent pairs for the current data version. Check caveat labels before following a result.",
        "Do not publish exact Selyne pair tables in this handoff. Downstream implementation should generate pairs from current app data with review or keep users in the calculator for verification."
      ]
    },
    {
      "heading": "Route planning when direct parents are missing",
      "paragraphs": [
        "Open `/breeding-route-calculator/`, set Selyne as the target, add owned Pals where supported, choose a practical generation limit, and review route steps, missing-Pal notes, and no-route states.",
        "If no Selyne route appears, recheck spelling, add more owned Pals, relax filters, increase max generations, or review `/data-sources/` before changing targets."
      ]
    },
    {
      "heading": "1.0 and patch-sensitive caveats",
      "paragraphs": [
        "Selyne pages should be explicit about the selected data version because users may be comparing 1.0-era guides and combo screenshots. Keep the data-source link near the workflow copy.",
        "If another source disagrees, treat that as a prompt to compare patch timing and calculator support rather than as proof that one static answer should replace the current-data workflow."
      ]
    },
    {
      "heading": "Passive, IV, and stats follow-up",
      "paragraphs": [
        "After you can reach Selyne, use `/passive-skill-calculator/` for desired traits by role. Passive planning should stay separate from the route itself.",
        "Use `/iv-calculator/` and `/stats-calculator/` after hatching candidates if you need to compare hidden stat ranges, expected stats, or breeder quality."
      ]
    },
    {
      "heading": "What to do when another guide differs",
      "paragraphs": [
        "When another guide shows a different Selyne combo, compare data version, variant assumptions, source timing, and caveat labels. Recheck inside PalCalculator before following an expensive plan.",
        "If PalCalculator cannot support a Selyne result for the current dataset or constraints, show the unavailable state clearly and link to data-source notes."
      ]
    }
  ],
  "links": [
    {
      "label": "check Selyne parent pairs",
      "href": "/breeding-calculator/"
    },
    {
      "label": "plan a Selyne route",
      "href": "/breeding-route-calculator/"
    },
    {
      "label": "Palworld 1.0 breeding calculator",
      "href": "/palworld-1-0-breeding-calculator/"
    },
    {
      "label": "1.0 breeding caveats",
      "href": "/guides/palworld-1-0-breeding-guide/"
    },
    {
      "label": "breeding FAQ",
      "href": "/guides/palworld-breeding-faq/"
    },
    {
      "label": "plan Selyne passives",
      "href": "/passive-skill-calculator/"
    },
    {
      "label": "data-source notes",
      "href": "/data-sources/"
    }
  ],
  "faqs": [
    {
      "question": "Can you breed Selyne in Palworld?",
      "answer": "Use PalCalculator's current breeding data to check Selyne parent-pair and route availability for the selected dataset."
    },
    {
      "question": "What parents make Selyne?",
      "answer": "Search Selyne in target-to-parent mode in the breeding calculator, then review current parent pairs and caveat labels."
    },
    {
      "question": "Is this updated for Palworld 1.0?",
      "answer": "The page should show the selected data version and route users to /data-sources/ so 1.0 and patch-sensitive assumptions remain visible."
    },
    {
      "question": "What if no Selyne route appears?",
      "answer": "Check spelling, add owned Pals, increase max generations, remove strict filters, and review data-source notes for unsupported areas."
    },
    {
      "question": "Should I trust one Selyne combo screenshot?",
      "answer": "Treat screenshots as leads only. Verify Selyne in the current calculator and compare patch timing before spending resources."
    }
  ]
}
```

## Copy QA checklist

- Five selected P12 pages drafted: Faleris, Kitsun, Suzaku, Helzephyr, and Selyne.
- Each page includes title, slug/path, label, H1, 140-160 character description, keywords, OG description, intro/hero copy, sections, FAQ, internal links, calculator CTAs, and caveats.
- No static unreviewed parent-pair combo tables are included; every page routes users to calculators for current parent-pair or route verification.
- Every page links users back to `/data-sources/` and relevant calculators.
- Variant caveats are explicit and kept separate from base target pages.
- Frontend implementation should still run `npm run test`, `npm run lint`, `npm run build`, and inspect generated static HTML for each URL.

## Validation summary

- `/guides/how-to-breed-faleris-palworld/` meta description length: 144 characters.
- `/guides/how-to-breed-kitsun-palworld/` meta description length: 147 characters.
- `/guides/how-to-breed-suzaku-palworld/` meta description length: 142 characters.
- `/guides/how-to-breed-helzephyr-palworld/` meta description length: 144 characters.
- `/guides/how-to-breed-selyne-palworld/` meta description length: 146 characters.
- P13 block count: 5.
- Duplicate slugs within P13: none.
- Duplicate keys within P13: none.
- Existing-source path collisions: none.
- Existing-source key collisions: none.
- Risky-term scan: PASS.

## Downstream handoff

Next recommended agent: frontend_bot after owner/reviewer approval.

Must read before implementation:

- `artifacts/p13-seo-copy-batch.md`
- `artifacts/p12-seo-next-content-brief.md`
- `src/guides-data.json`
- `src/main.tsx`
- `src/data/version.json`
- `src/data/special-combos.latest.json`

Implementation notes:

- Add pages through the existing guide-data/static-route pattern only after reviewing current source structure.
- Keep exact examples out unless generated from current app data and reviewed.
- Ensure each route emits static HTML with title, meta description, canonical, robots, H1, body copy, internal links, and visible FAQ content before hydration.
- Add sitemap URLs only after each page is complete and indexable.

Final line: [DONE]
