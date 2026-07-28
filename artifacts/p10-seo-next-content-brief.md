# P10 SEO Next Content Brief — Low-risk Palworld Content Batch

Project: PalCalculator
Site: https://palcalculator.com
Task: t_52e60c94
Prepared by: seo_bot
Artifact: /root/projects/palcalculator/artifacts/p10-seo-next-content-brief.md
Status: content brief only; no source code, sitemap, route, deploy, Cloudflare, or GSC changes.

## Executive recommendation

Proceed with a small P10 implementation batch of 5 guide pages:

1. `/guides/how-to-breed-blazamut-palworld/`
2. `/guides/how-to-breed-astegon-palworld/`
3. `/guides/how-to-breed-grizzbolt-palworld/`
4. `/guides/how-to-breed-lyleen-palworld/`
5. `/guides/palworld-breeding-path-finder/`

Why this batch:

- It does not duplicate the 24 current sitemap routes.
- It avoids dashboard-only work while the `www` to apex redirect remains an owner/Cloudflare blocker.
- Four target-Pal pages extend the already proven Anubis/Jetragon/Orserk/Shadowbeak pattern with specific search demand signals from Google Suggest.
- One workflow page targets route/path-finder language that maps directly to PalCalculator's differentiator without inventing exact route guarantees.
- All pages can be written safely from current repository data by teaching users how to verify in the calculators rather than hardcoding unreviewed pair tables.

## Evidence basis inspected

Repository files and artifacts read:

- `public/sitemap.xml`: 24 current canonical sitemap URLs.
- `src/main.tsx`: route metadata combines 10 core routes plus `src/guides-data.json` guide routes; guide pages emit `TechArticle` and `FAQPage` JSON-LD when visible FAQ data exists.
- `src/guides-data.json`: 14 current guide pages.
- `src/data/pals.latest.json`: 297 Pals; checked candidate targets including Blazamut, Astegon, Grizzbolt, Lyleen, Faleris, Faleris Aqua, Kitsun, Kitsun Noct, Blazamut Ryu.
- `src/data/passives.latest.json`: only 3 seeded passives: Artisan, Serious, Swift.
- `src/data/special-combos.latest.json`: `combos: []` with `SPECIAL_COMBO_TABLE_PENDING` blocking caveat.
- `src/data/version.json`: current dataset is `palworld-1-0_public-web_2026-07-16_r1`; unsupported domains include verified special-combo override table, guaranteed passive inheritance odds, server-side save upload, and full IV exactness with all modifiers.
- `artifacts/p9-gsc-indexing-status.md`: live sitemap/robots pass, 24 apex URLs are indexable and 200; `https://www.palcalculator.com/...` still returns 200 and needs owner Cloudflare redirect action.
- `artifacts/post-launch-iteration-backlog.md`: remaining owner/dashboard gates mean this task should stay repo-safe and should not submit to GSC/Bing or change production indexing.
- `artifacts/route-contract.md`, `artifacts/p2-seo-content-brief.md`, and `artifacts/p5-seo-brief.md`: prior route/content strategy and no-overclaim acceptance rules.

External research caveat:

- `web_search` failed with Tavily HTTP 401 in this environment.
- Fallback keyword discovery used Google Suggest over terminal. Observed suggestions included:
  - `palworld how to breed blazamut`, `palworld 1.0 how to breed blazamut`, `palworld blazamut breed combo`, `palworld how to breed blazamut ryu`.
  - `palworld how to breed astegon`, `palworld 1.0 how to breed astegon`, `palworld easiest way to breed astegon`, `palworld astegon breed combo`.
  - `palworld how to breed grizzbolt`, `palworld 1.0 how to breed grizzbolt`, `palworld how to breed to get grizzbolt`, `palworld breeding grizzbolt combo`.
  - `palworld how to breed lyleen`, `palworld how to breed lyleen noct`, `palworld 1.0 how to breed lyleen`, `palworld lyleen breed combo`.
  - `palworld how to breed faleris`, `palworld how to breed faleris aqua`, `palworld 1.0 how to breed faleris`, `palworld faleris breed combo`.
  - `palworld how to breed kitsun`, `palworld how to breed kitsun noct`, `how to breed kitsun palworld 1.0`.
  - `palworld breeding route calculator`, `palworld breeding path finder`, `palworld breeding shortest path calculator`, `palworld 1.0 breeding path calculator`.
  - `palworld best passive skills for base workers`, `palworld work speed passives`, `palworld work speed passive skills`, `palworld best work speed passives`, `palworld do workspeed passives stack`, `palworld 1.0 work speed passives`.
  - `palworld iv breeding calculator`.

Before copy freeze, recheck GSC/Ahrefs/real SERP if exact volume, difficulty, or SERP layout is required.

## Current sitemap inventory — do not duplicate

Current sitemap URLs:

1. `/`
2. `/breeding-calculator/`
3. `/breeding-route-calculator/`
4. `/iv-calculator/`
5. `/stats-calculator/`
6. `/passive-skill-calculator/`
7. `/palworld-1-0-breeding-calculator/`
8. `/data-sources/`
9. `/privacy/`
10. `/terms/`
11. `/guides/palworld-breeding-combos/`
12. `/guides/palworld-breeding-tree/`
13. `/guides/palworld-1-0-breeding-guide/`
14. `/guides/palworld-iv-explained/`
15. `/guides/best-passive-skills-for-breeding-palworld/`
16. `/guides/how-to-breed-anubis-palworld/`
17. `/guides/how-to-breed-jetragon-palworld/`
18. `/guides/palworld-breeding-route-examples/`
19. `/guides/palworld-breeding-faq/`
20. `/guides/how-to-breed-orserk-palworld/`
21. `/guides/how-to-breed-shadowbeak-palworld/`
22. `/guides/palworld-breeding-with-owned-pals/`
23. `/guides/best-palworld-breeding-combos/`
24. `/guides/palworld-base-worker-passives/`

Avoid in P10:

- New generic pages that duplicate existing combo/tree/FAQ/owned-Pal/base-worker/route-example intent.
- Programmatic `/breed/{pal-slug}/`, `/iv/{pal-slug}/`, `/stats/{pal-slug}/`, or `/best-passives/{pal-slug}/` templates until unique data/tool output, canonical rules, and quality gates are proven.
- Exact “best combo” rankings, guaranteed shortest paths, perfect IV pages, deterministic passive inheritance claims, or complete special-combo tables.

## Candidate pool: 10 low-risk pages

| Priority | Candidate URL | Target keyword | Intent | Why low risk | Main caveat |
|---:|---|---|---|---|---|
| 1 | `/guides/how-to-breed-blazamut-palworld/` | how to breed Blazamut Palworld | Target-Pal how-to + calculator workflow | Blazamut exists in current 297-Pal dataset and Google Suggest showed direct and 1.0 variants. | Do not hardcode parent pairs unless generated from current app data and reviewed. |
| 2 | `/guides/how-to-breed-astegon-palworld/` | how to breed Astegon Palworld | Target-Pal how-to + “easiest way” planning | Astegon exists in current dataset; Suggest showed direct, 1.0, easiest-way, and breed-combo variants. | “Easiest” must mean a workflow for checking options, not a universal claim. |
| 3 | `/guides/how-to-breed-grizzbolt-palworld/` | how to breed Grizzbolt Palworld | Target-Pal how-to + route troubleshooting | Grizzbolt exists in current dataset; Suggest showed “to get Grizzbolt” and breed-combo language. | Avoid claiming complete special-combo coverage. |
| 4 | `/guides/how-to-breed-lyleen-palworld/` | how to breed Lyleen Palworld | Target-Pal how-to with variant caveats | Lyleen and Lyleen Noct exist in current dataset; Suggest showed Lyleen Noct and 1.0 variants. | Keep Lyleen and Lyleen Noct distinct; do not merge variant data. |
| 5 | `/guides/palworld-breeding-path-finder/` | Palworld breeding path finder | Tool-seeking route/path intent | Suggest explicitly showed path finder, shortest path calculator, and 1.0 breeding path calculator. | Use “path found for current data and constraints,” not guaranteed shortest. |
| 6 | `/guides/how-to-breed-faleris-palworld/` | how to breed Faleris Palworld | Target-Pal how-to | Faleris and Faleris Aqua exist; Suggest showed direct, Aqua, 1.0, and breed-combo variants. | Treat Aqua as a separate variant mention or later page, not a hidden duplicate. |
| 7 | `/guides/how-to-breed-kitsun-palworld/` | how to breed Kitsun Palworld | Target-Pal how-to | Kitsun and Kitsun Noct exist; Suggest showed direct, Noct, and 1.0 variants. | Keep copy target-specific and avoid duplicating existing generic combo pages. |
| 8 | `/guides/palworld-work-speed-passives/` | Palworld work speed passives | Passive planning sub-intent | Suggest showed work-speed passive variants; current data recognizes Artisan, Serious, Swift. | Passive data is seed-only; no complete list or inheritance odds. |
| 9 | `/guides/palworld-iv-breeding-calculator/` | Palworld IV breeding calculator | IV + breeding decision support | Supports existing IV, stats, breeding, and passive pages with low reliance on exact combo data. | Do not imply perfect IV prediction or guaranteed breeding improvements. |
| 10 | `/guides/palworld-missing-parents-breeding-route/` | Palworld missing parents breeding route | Route troubleshooting | Differentiates from route examples by focusing on no-route/missing-parent interpretation. | Could overlap with route examples/owned-Pal pages; defer unless copy can stay troubleshooting-specific. |

Deferred optional targets for later:

- `/guides/how-to-breed-blazamut-ryu-palworld/`: Suggest showed Blazamut Ryu and current data includes Blazamut Ryu, but it is safer after the base Blazamut page proves the target-page template.
- `/guides/how-to-breed-faleris-aqua-palworld/`: current data includes Faleris Aqua; safer after base Faleris page to avoid variant-page duplication.
- `/guides/how-to-breed-kitsun-noct-palworld/`: current data includes Kitsun Noct; safer after base Kitsun page.
- `/guides/how-to-breed-lyleen-noct-palworld/`: current data includes Lyleen Noct; safer after base Lyleen page.

## Recommended P10 implementation batch: 5 pages

Implementation principle: produce pages through the existing `src/guides-data.json` guide-data/static-route pattern, but this task does not implement them. Every page should be complete before indexation, with visible copy, internal links, FAQ, schema, sitemap entry, and static HTML verification.

### Page 1 — How to Breed Blazamut in Palworld

Target keyword: `how to breed Blazamut Palworld`
Search intent: target-Pal how-to; users want a practical way to check parent pairs, route options, and 1.0 caveats.
Slug: `/guides/how-to-breed-blazamut-palworld/`
Title tag: `How to Breed Blazamut in Palworld`
H1: `How to Breed Blazamut in Palworld`
Meta description: `Plan Blazamut breeding in Palworld with parent-pair lookup, route checks, 1.0 data notes, and PalCalculator caveats.`
Schema type: `TechArticle` plus `FAQPage` only for visible Q&A.
Internal links:

- `/breeding-calculator/` with anchor `check Blazamut parent pairs`.
- `/breeding-route-calculator/` with anchor `plan a Blazamut route from owned Pals`.
- `/palworld-1-0-breeding-calculator/` with anchor `Palworld 1.0 breeding calculator`.
- `/guides/palworld-breeding-combos/` with anchor `breeding combos guide`.
- `/guides/palworld-breeding-path-finder/` with anchor `breeding path finder workflow` after that page ships.
- `/data-sources/` with anchor `data-source and special-combo caveats`.

Content angle:

- Above the fold: “Use this as a workflow for checking current Blazamut breeding options in PalCalculator; it is not an official or guaranteed combo table.”
- H2: Check current Blazamut parent pairs.
- H2: When to use a route instead of one direct pair.
- H2: Blazamut vs Blazamut Ryu caveat.
- H2: Passive and IV follow-up after the route.
- H2: Why another guide may show different Blazamut combos.
- FAQ: Can you breed Blazamut? What parents make Blazamut? Is Blazamut Ryu the same page? Does PalCalculator guarantee the route? What if no route appears?

Data caveats:

- Current Pal exists in `pals.latest.json`.
- Exact parent pairs should be generated from the current calculator/data during implementation or left as “check in calculator”.
- Special-combo override table is pending; avoid claiming complete special-combo support.

### Page 2 — How to Breed Astegon in Palworld

Target keyword: `how to breed Astegon Palworld`
Search intent: target-Pal how-to plus “easiest way” planning.
Slug: `/guides/how-to-breed-astegon-palworld/`
Title tag: `How to Breed Astegon in Palworld`
H1: `How to Breed Astegon in Palworld`
Meta description: `Plan Astegon breeding in Palworld with parent-pair lookup, route planning, easiest-way caveats, and data notes.`
Schema type: `TechArticle` plus `FAQPage` only for visible Q&A.
Internal links:

- `/breeding-calculator/` with anchor `find Astegon parent pairs`.
- `/breeding-route-calculator/` with anchor `try an Astegon route`.
- `/guides/palworld-breeding-tree/` with anchor `breeding tree basics`.
- `/guides/palworld-breeding-with-owned-pals/` with anchor `owned-Pal route planning`.
- `/guides/palworld-breeding-path-finder/` with anchor `path finder workflow` after that page ships.
- `/data-sources/` with anchor `current data version notes`.

Content angle:

- Treat “easiest” as a decision workflow: direct pair availability, owned-Pal inventory, missing parents, generations, and data caveats.
- Show users how to verify current Astegon pairs in target-parent mode.
- Explain how the route solver can find a path when the user lacks direct parents.
- Include a short “when Astegon results differ across sites” section.

Data caveats:

- Current Pal exists in `pals.latest.json`.
- Do not claim “easiest” globally unless a reviewer approves exact examples generated from data.
- Do not imply official data or always-current patch support.

### Page 3 — How to Breed Grizzbolt in Palworld

Target keyword: `how to breed Grizzbolt Palworld`
Search intent: target-Pal how-to; “how to get” and combo lookup.
Slug: `/guides/how-to-breed-grizzbolt-palworld/`
Title tag: `How to Breed Grizzbolt in Palworld`
H1: `How to Breed Grizzbolt in Palworld`
Meta description: `Check Grizzbolt breeding options in Palworld with parent-pair lookup, route planning, caveats, and PalCalculator data notes.`
Schema type: `TechArticle` plus `FAQPage` only for visible Q&A.
Internal links:

- `/breeding-calculator/` with anchor `check Grizzbolt parent pairs`.
- `/breeding-route-calculator/` with anchor `plan a Grizzbolt breeding route`.
- `/guides/how-to-breed-anubis-palworld/` with anchor `Anubis target-Pal workflow`.
- `/guides/how-to-breed-orserk-palworld/` with anchor `Orserk target-Pal workflow`.
- `/passive-skill-calculator/` with anchor `plan Grizzbolt passives`.
- `/iv-calculator/` with anchor `check IV ranges`.
- `/data-sources/` with anchor `data caveats`.

Content angle:

- Make this a target-specific workflow, not a copied combo chart.
- Explain parent-pair lookup, route from owned Pals, passive planning, and IV/stat follow-up.
- Include no-route troubleshooting: spelling/alias checks, max-generation constraints, missing parents, data-source notes.

Data caveats:

- Current Pal exists in `pals.latest.json`.
- Do not publish exact “best Grizzbolt combo” claims without reviewed data-generated examples.
- Special-combo and patch-sensitive results must stay caveated.

### Page 4 — How to Breed Lyleen in Palworld

Target keyword: `how to breed Lyleen Palworld`
Search intent: target-Pal how-to with variant awareness.
Slug: `/guides/how-to-breed-lyleen-palworld/`
Title tag: `How to Breed Lyleen in Palworld`
H1: `How to Breed Lyleen in Palworld`
Meta description: `Plan Lyleen breeding in Palworld with parent lookup, owned-Pal routes, Lyleen Noct caveats, and data-version notes.`
Schema type: `TechArticle` plus `FAQPage` only for visible Q&A.
Internal links:

- `/breeding-calculator/` with anchor `find Lyleen parent pairs`.
- `/breeding-route-calculator/` with anchor `plan a Lyleen route`.
- `/passive-skill-calculator/` with anchor `plan Lyleen passives`.
- `/guides/palworld-base-worker-passives/` with anchor `base worker passive planning`.
- `/guides/palworld-work-speed-passives/` with anchor `work speed passive guide` if that page ships later.
- `/data-sources/` with anchor `PalCalculator data notes`.

Content angle:

- Use Lyleen as a base-work/passive-planning bridge without making a universal best-worker claim.
- Add a variant caveat that Lyleen and Lyleen Noct are not the same target; users should verify the exact target in the calculator.
- Include role-based next steps: parent pairs, route, work-speed passive planning, IV/stat checks.

Data caveats:

- Current data includes Lyleen and Lyleen Noct.
- Exact route/combo examples must be generated from app data or omitted.
- Passive data is seed-only; do not imply complete work-speed passive coverage.

### Page 5 — Palworld Breeding Path Finder

Target keyword: `Palworld breeding path finder`
Search intent: tool-seeking; users want shortest path / route calculator language rather than a guide article.
Slug: `/guides/palworld-breeding-path-finder/`
Title tag: `Palworld Breeding Path Finder`
H1: `Palworld Breeding Path Finder`
Meta description: `Learn how to use PalCalculator as a Palworld breeding path finder with owned Pals, missing-parent notes, and route caveats.`
Schema type: `TechArticle`; optional `FAQPage` for visible Q&A. Avoid `HowTo` unless complete visible steps are implemented and reviewed.
Internal links:

- `/breeding-route-calculator/` with anchor `open the breeding path finder`.
- `/breeding-calculator/` with anchor `check direct parent pairs first`.
- `/guides/palworld-breeding-with-owned-pals/` with anchor `owned-Pal route planning`.
- `/guides/palworld-breeding-route-examples/` with anchor `route example patterns`.
- `/guides/palworld-breeding-tree/` with anchor `breeding tree basics`.
- `/data-sources/` with anchor `route data caveats`.

Content angle:

- Distinguish path finder from existing route examples: this page is the tool-entry and interpretation guide for “path finder / shortest path calculator” searches.
- Explain the safe route sequence: choose target, add owned Pals, set max generations, read missing parents, compare alternatives, verify caveats.
- Use “shortest route found within current data and constraints” only; do not claim guaranteed shortest, official, or 100% complete.

Data caveats:

- Results depend on the current normal breeding graph, max generations, owned-Pal list, unsupported special-combo handling, and patch timing.
- Share/query state must canonicalize to clean tool pages and stay noindex if implemented as URL state.

## Non-selected candidates: keep in reserve

### `/guides/how-to-breed-faleris-palworld/`

Good candidate, but place after the top four target-Pal pages because Lyleen/Astegon/Grizzbolt/Blazamut give a cleaner first template spread. If implemented later, mention Faleris Aqua only as a separate variant caveat unless a standalone Aqua page is approved.

### `/guides/how-to-breed-kitsun-palworld/`

Good candidate, especially because Suggest showed Kitsun Noct and 1.0 variants. Defer until the target-Pal template has been QAed with higher-priority epic targets. Keep Kitsun Noct separate if search demand justifies it.

### `/guides/palworld-work-speed-passives/`

Useful passive sub-intent, but it risks overlapping with existing `/guides/palworld-base-worker-passives/` and `/guides/best-passive-skills-for-breeding-palworld/`. Implement only if copy can be narrowly about recognized work-speed terms, current seed-passive support, and calculator workflow.

### `/guides/palworld-iv-breeding-calculator/`

Useful educational bridge between breeding and IV pages. Defer because the current site already has `/iv-calculator/`, `/stats-calculator/`, and `/guides/palworld-iv-explained/`. This should wait for evidence that users need a breeding-specific IV decision page.

### `/guides/palworld-missing-parents-breeding-route/`

Useful troubleshooting angle but likely overlaps with route examples and owned-Pal pages. Defer unless GSC/analytics later shows no-route or missing-parent queries.

## Copy acceptance criteria for all P10 pages

- Unique English copy; do not lightly rewrite existing 14 guide pages.
- Title tag <= 60 characters and meta description <= 160 characters.
- One visible H1 matching the page topic.
- First-screen statement that PalCalculator is an unofficial fan-made Palworld calculator/guide site.
- Visible data-version/source caveat with link to `/data-sources/`.
- No use of `official`, `endorsed`, `approved`, `guaranteed`, `100% accurate`, `perfect IV`, deterministic passive inheritance, complete special-combo coverage, or universal best-build claims.
- At least 5 meaningful H2/H3 sections per standalone guide page.
- At least 4 visible FAQ Q&As if FAQPage schema is emitted.
- Descriptive crawlable internal links to relevant calculators and related guide pages.
- Specific Pal combo/route examples only if generated from the current app data during implementation and reviewed; otherwise phrase as workflow guidance and send users to verify in the calculator.
- AEO-friendly short-answer blocks are allowed, but no keyword stuffing.

## Frontend implementation acceptance criteria for downstream task

When this brief is handed to frontend/copy workers, implementation should satisfy:

- Each approved URL returns HTTP 200 and static initial HTML includes route-specific title, meta description, canonical, robots, H1, meaningful crawlable body copy, internal links, and visible FAQs before React hydration.
- Canonical URLs are self-referencing, HTTPS apex-domain, and trailing-slash.
- Add a URL to `public/sitemap.xml` and generated `dist/sitemap.xml` only after the page is complete and indexable.
- Draft, thin, duplicate, placeholder, parameterized, query-state, share-state, and unsupported exact-route pages stay out of sitemap.
- `FAQPage` JSON-LD is emitted only for visible FAQ content on the same route.
- Prefer `TechArticle` for target-Pal/workflow guide pages; avoid `HowTo` unless visible steps and caveats are schema-compliant.
- Unknown guide paths must continue to return real 404s; no SPA soft-404 regression.
- Existing 24 sitemap URLs, metadata, canonical behavior, robots behavior, query-state noindex behavior, guide links, and calculator functions must not regress.
- Run after implementation: `npm run test`, `npm run lint`, `npm run build`.
- Inspect generated static HTML for every new page in `dist/guides/.../index.html` before deploy.

## Suggested implementation order

1. Blazamut target page.
2. Astegon target page.
3. Grizzbolt target page.
4. Lyleen target page.
5. Breeding Path Finder workflow page.

Reasoning:

- The first four pages reuse a proven target-Pal template and have clear Google Suggest demand.
- The path-finder page can then internally link to the target pages and route guides as a workflow hub.
- Do not implement passive/IV troubleshooting reserve pages until there is measurement evidence or owner approval for a broader P11.

## Handoff summary

Current conclusion: `[DONE]` for planning only.

Next recommended agent: copy_bot or frontend_bot, depending the board flow.

Must read before implementation:

- `artifacts/p10-seo-next-content-brief.md`
- `artifacts/p9-gsc-indexing-status.md`
- `src/guides-data.json`
- `src/main.tsx`
- `src/data/version.json`
- `src/data/special-combos.latest.json`

Do not assume:

- GSC access is available.
- The `www` redirect blocker is fixed.
- Exact parent pairs, special-combo overrides, passive inheritance odds, or perfect IV formulas can be claimed without data-generation and review.

Final line: [DONE]
