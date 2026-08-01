# P12 SEO Next Content Brief — Next Five Palworld Long-tail Pages

Project: PalCalculator
Site: https://palcalculator.com
Task: t_59eeb0fc
Prepared by: seo_bot
Artifact: /root/projects/palcalculator/artifacts/p12-seo-next-content-brief.md
Status: content brief only; no source code, sitemap, route, deploy, DNS, GSC, Cloudflare, login, backend storage, or save-file upload changes.

## Executive recommendation

Proceed with a small P12 implementation batch of 5 guide pages:

1. `/guides/how-to-breed-faleris-palworld/`
2. `/guides/how-to-breed-kitsun-palworld/`
3. `/guides/how-to-breed-suzaku-palworld/`
4. `/guides/how-to-breed-helzephyr-palworld/`
5. `/guides/how-to-breed-selyne-palworld/`

Why this batch:

- It does not duplicate the current 29 sitemap URLs or 19 `src/guides-data.json` guide entries.
- All five targets exist in `src/data/pals.latest.json` and are marked `canBeBredAsChild: true` and `canBreedAsParent: true` in the current public-web dataset.
- Google Suggest over terminal returned direct long-tail demand for each selected target, including 1.0 and variant/combo modifiers for several pages.
- The pages extend the proven P11 target-Pal workflow template without changing source behavior.
- Each page can stay safe by teaching users to verify current parent pairs/routes in the calculators instead of publishing unreviewed static combo tables.

## Evidence basis inspected

Repository files and artifacts read:

- `public/sitemap.xml`: 29 current canonical URLs.
- `src/guides-data.json`: 19 current guide pages; paths listed below to avoid duplicates.
- `src/data/pals.latest.json`: checked selected and reserve targets against current 297-Pal dataset.
- `src/data/passives.latest.json`: seed-only passive support (`Artisan`, `Serious`, `Swift`) means passive pages must remain caveated.
- `src/data/version.json`: current data version is `palworld-1-0_public-web_2026-07-16_r1`; unsupported domains include verified special-combo override table, passive inheritance probabilities, server-side save upload, and full IV certainty with every modifier.
- `src/data/special-combos.latest.json`: `combos: []` and `SPECIAL_COMBO_TABLE_PENDING` blocking caveat.
- `artifacts/p10-seo-next-content-brief.md`: P10 selected Blazamut, Astegon, Grizzbolt, Lyleen, and breeding path finder; deferred Faleris/Kitsun as safe next target-Pal candidates.
- `artifacts/p11-seo-copy-batch.md`: P11 copy handoff and safe target-Pal page shape.
- `artifacts/p11-seo-pages-implementation.md`: confirms five P11 pages were implemented and sitemap count became 29.
- `artifacts/p11-live-verification.md`: confirms P11 was live-verified with 29 sitemap URLs and five P11 guides present.
- `artifacts/p12-preflight-repo-clean.md`: confirms preflight repo status was clean and no deploy was performed.

External research caveat:

- `web_search` failed in this environment with Tavily HTTP 401.
- Fallback discovery used Google Suggest via `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&q=...` from terminal.
- Observed relevant suggestions included:
  - `palworld how to breed faleris`, `palworld how to breed faleris aqua`, `palworld 1.0 how to breed faleris`, `palworld faleris breed combo`, `how to breed faleris aqua palworld 1.0`.
  - `palworld how to breed kitsun`, `palworld how to breed kitsun noct`, `how to breed kitsun palworld 1.0`.
  - `palworld how to breed suzaku`, `palworld how to breed suzaku aqua`, `how to breed suzaku palworld 1.0`.
  - `palworld how to breed helzephyr`, `palworld how to breed helzephyr lux`, `palworld helzephyr breed combo`.
  - `palworld how to breed selyne`, `palworld 1.0 how to breed selyne`, `palworld selyne breed combo`.
  - Reserve demand signals also appeared for `Blazamut Ryu`, `Lyleen Noct`, `Faleris Aqua`, `Kitsun Noct`, `Suzaku Aqua`, `Bellanoir`, `Bellanoir Libero`, `Knocklem`, `Warsect Terra`, `Frostallion Noct`, `Xenolord`, and `Xenogard`.

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
25. `/guides/how-to-breed-blazamut-palworld/`
26. `/guides/how-to-breed-astegon-palworld/`
27. `/guides/how-to-breed-grizzbolt-palworld/`
28. `/guides/how-to-breed-lyleen-palworld/`
29. `/guides/palworld-breeding-path-finder/`

Avoid in P12:

- Duplicating existing generic combo/tree/route/FAQ/passive/IV pages.
- New pages for Blazamut, Astegon, Grizzbolt, Lyleen, or breeding path finder because they shipped in P11.
- Programmatic `/breed/{pal-slug}/`, `/iv/{pal-slug}/`, `/stats/{pal-slug}/`, or `/best-passives/{pal-slug}/` templates until unique data/tool output, canonical rules, and quality gates are proven.
- Static parent-pair tables copied from external pages without current app-data generation and review.
- Claims of being a rights-holder source, certain outcomes, perfect IVs, exact passive odds, every special combo, or universal best routes/builds.

## Candidate pool: 12 safe-ish long-tail pages

| Priority | Candidate URL | Target keyword | Intent | Current data evidence | Search/suggest evidence | Main caveat |
|---:|---|---|---|---|---|---|
| 1 | `/guides/how-to-breed-faleris-palworld/` | how to breed Faleris Palworld | Target-Pal how-to + variant awareness | `Faleris` and `Faleris Aqua` exist and are breedable in current dataset. | Direct, Aqua, 1.0, and breed-combo suggestions observed. | Mention Aqua as a separate target; do not merge variant routes. |
| 2 | `/guides/how-to-breed-kitsun-palworld/` | how to breed Kitsun Palworld | Target-Pal how-to + Noct variant caveat | `Kitsun` and `Kitsun Noct` exist and are breedable. | Direct, Noct, and 1.0 suggestions observed. | Keep Noct distinct; avoid copied exact combos. |
| 3 | `/guides/how-to-breed-suzaku-palworld/` | how to breed Suzaku Palworld | Target-Pal how-to + Aqua variant caveat | `Suzaku` and `Suzaku Aqua` exist and are breedable. | Direct, Aqua, Reddit, and 1.0 suggestions observed. | Do not treat Reddit/video combos as reviewed source data. |
| 4 | `/guides/how-to-breed-helzephyr-palworld/` | how to breed Helzephyr Palworld | Target-Pal how-to + Lux variant caveat | `Helzephyr` and `Helzephyr Lux` exist and are breedable. | Direct, Lux, and breed-combo suggestions observed. | Keep Lux as a separate variant or later page. |
| 5 | `/guides/how-to-breed-selyne-palworld/` | how to breed Selyne Palworld | Target-Pal how-to + 1.0 freshness intent | `Selyne` exists and is breedable. | Direct, 1.0, and breed-combo suggestions observed. | Patch-sensitive target; emphasize data-version verification. |
| 6 | `/guides/how-to-breed-faleris-aqua-palworld/` | how to breed Faleris Aqua Palworld | Variant target-Pal how-to | `Faleris Aqua` exists and is breedable. | Direct and 1.0 suggestions observed. | Defer until base Faleris page ships to avoid thin variant duplication. |
| 7 | `/guides/how-to-breed-kitsun-noct-palworld/` | how to breed Kitsun Noct Palworld | Variant target-Pal how-to | `Kitsun Noct` exists and is breedable. | Direct suggestion observed. | Defer until base Kitsun page ships; ensure enough unique Noct copy. |
| 8 | `/guides/how-to-breed-suzaku-aqua-palworld/` | how to breed Suzaku Aqua Palworld | Variant target-Pal how-to | `Suzaku Aqua` exists and is breedable. | Direct suggestion observed. | Good reserve page after base Suzaku; needs unique variant handling. |
| 9 | `/guides/how-to-breed-bellanoir-palworld/` | how to breed Bellanoir Palworld | High-value target-Pal how-to | `Bellanoir` and `Bellanoir Libero` exist and are breedable. | Direct, Libero, and breed-guide suggestions observed. | Higher risk because raid/boss expectations can invite unsupported special-rule claims. |
| 10 | `/guides/how-to-breed-knocklem-palworld/` | how to breed Knocklem Palworld | Target-Pal how-to + 1.0 query | `Knocklem` exists and is breedable. | Knocklem, 1.0, Reddit, and breed-combo suggestions observed. | Suggest includes `Knocklem Ignis`; current checked list should confirm that variant before a variant page. |
| 11 | `/guides/how-to-breed-frostallion-noct-palworld/` | how to breed Frostallion Noct Palworld | Variant target-Pal how-to | `Frostallion Noct` exists and is breedable. | Direct and 1.0 suggestions observed. | Legendary/variant expectations make unsupported combo claims riskier. |
| 12 | `/guides/how-to-breed-xenolord-palworld/` | how to breed Xenolord Palworld | Newer target-Pal how-to | `Xenolord` exists and is breedable. | Direct, perfect, and 1.0 suggestions observed. | Avoid “perfect” build framing and verify current route support before publishing examples. |

## Recommended P12 implementation batch: 5 pages

Implementation principle: use the existing `src/guides-data.json` guide-data/static-route pattern only in a later implementation task. This P12 task does not implement. Every approved page should be complete before indexation, with visible copy, internal links, FAQ, schema, sitemap entry, static HTML verification, and no source of unsupported exact claims.

### Page 1 — How to Breed Faleris in Palworld

Target keyword: `how to breed Faleris Palworld`
Search intent: target-Pal how-to; users want current parent pairs, route options, and Faleris Aqua distinction.
Slug: `/guides/how-to-breed-faleris-palworld/`
Title tag: `How to Breed Faleris in Palworld`
H1: `How to Breed Faleris in Palworld`
Meta description: `Plan Faleris breeding in Palworld with parent-pair lookup, route checks, Aqua variant notes, passive follow-up, and visible data-source caveats.`
Meta length: 144 characters.
Schema type: `TechArticle` plus `FAQPage` only for visible Q&A.

Content angle:

- Above the fold: PalCalculator is an independent fan-made Palworld calculator and guide site; use this as a verification workflow, not a static combo chart.
- H2: Start with Faleris as the exact target.
- H2: Check current Faleris parent pairs.
- H2: When to use a route from owned Pals.
- H2: Faleris vs Faleris Aqua caveat.
- H2: Passive, IV, and stat follow-up.
- H2: Why another page may show different Faleris combos.
- FAQ: Can you breed Faleris? What parents make Faleris? Is Faleris Aqua the same target? What if no route appears? Can a Faleris route solve passives?

Internal links:

- `/breeding-calculator/` with anchor `check Faleris parent pairs`.
- `/breeding-route-calculator/` with anchor `plan a Faleris route from owned Pals`.
- `/palworld-1-0-breeding-calculator/` with anchor `Palworld 1.0 breeding calculator`.
- `/guides/how-to-breed-blazamut-palworld/` with anchor `Blazamut target-Pal workflow`.
- `/guides/palworld-breeding-path-finder/` with anchor `breeding path finder workflow`.
- `/passive-skill-calculator/` with anchor `plan Faleris passives`.
- `/data-sources/` with anchor `data-source caveats`.

Data caveats:

- Current data includes `Faleris` and `Faleris Aqua`; both are breedable in current dataset.
- Treat Aqua as a separate target and likely later page, not hidden content inside the base Faleris page.
- Exact Faleris parent pairs should be generated from current app data during implementation or left as “check in calculator”.
- Special-combo override table is pending; do not claim all special cases are covered.

### Page 2 — How to Breed Kitsun in Palworld

Target keyword: `how to breed Kitsun Palworld`
Search intent: target-Pal how-to with Kitsun Noct variant awareness and 1.0 freshness.
Slug: `/guides/how-to-breed-kitsun-palworld/`
Title tag: `How to Breed Kitsun in Palworld`
H1: `How to Breed Kitsun in Palworld`
Meta description: `Plan Kitsun breeding in Palworld with parent lookup, route planning, Kitsun Noct variant notes, passive follow-up, and visible data-source caveats.`
Meta length: 147 characters.
Schema type: `TechArticle` plus `FAQPage` only for visible Q&A.

Content angle:

- Above the fold: start with Kitsun as the exact target, then verify parent pairs and route status in the calculator.
- H2: Choose Kitsun instead of a mixed variant target.
- H2: Find current Kitsun parent pairs.
- H2: Use route planning when direct parents are missing.
- H2: Kitsun Noct caveat and when to make a separate Noct page.
- H2: Passive, IV, and stats follow-up.
- H2: Common mistakes when using old Kitsun combo screenshots.
- FAQ: Can you breed Kitsun? What parents make Kitsun? Is Kitsun Noct covered here? Should I use a direct pair or route? Why do Kitsun combo guides differ?

Internal links:

- `/breeding-calculator/` with anchor `find Kitsun parent pairs`.
- `/breeding-route-calculator/` with anchor `try a Kitsun route`.
- `/guides/how-to-breed-shadowbeak-palworld/` with anchor `Shadowbeak target-Pal workflow`.
- `/guides/how-to-breed-lyleen-palworld/` with anchor `Lyleen variant caveat example`.
- `/guides/palworld-breeding-with-owned-pals/` with anchor `owned-Pal route planning`.
- `/iv-calculator/` with anchor `check IV ranges after hatching`.
- `/data-sources/` with anchor `current data version notes`.

Data caveats:

- Current data includes `Kitsun` and `Kitsun Noct`; both are breedable.
- Keep Noct separate. Do not imply base Kitsun parent pairs apply to Kitsun Noct.
- Do not use static combo tables unless generated from current app data and reviewed.
- Keep passive inheritance as a planning target with RNG/support caveats.

### Page 3 — How to Breed Suzaku in Palworld

Target keyword: `how to breed Suzaku Palworld`
Search intent: target-Pal how-to; users also ask about Suzaku Aqua and 1.0 results.
Slug: `/guides/how-to-breed-suzaku-palworld/`
Title tag: `How to Breed Suzaku in Palworld`
H1: `How to Breed Suzaku in Palworld`
Meta description: `Plan Suzaku breeding in Palworld with parent-pair lookup, route checks, Suzaku Aqua caveats, passive follow-up, and visible data-source notes.`
Meta length: 142 characters.
Schema type: `TechArticle` plus `FAQPage` only for visible Q&A.

Content angle:

- Above the fold: use the page to choose the right calculator workflow for Suzaku, not to memorize one unreviewed pair.
- H2: Start with the Suzaku result you need.
- H2: Check current Suzaku parent-pair options.
- H2: Plan a Suzaku route when a direct pair is impractical.
- H2: Suzaku Aqua variant caveat.
- H2: Passive and IV follow-up after target access.
- H2: How to handle Reddit/video combo mismatches safely.
- FAQ: Can you breed Suzaku? What parents make Suzaku? Is Suzaku Aqua the same target? What if another guide shows a different combo? What if no route appears?

Internal links:

- `/breeding-calculator/` with anchor `check Suzaku parent pairs`.
- `/breeding-route-calculator/` with anchor `plan a Suzaku breeding route`.
- `/guides/palworld-1-0-breeding-guide/` with anchor `Palworld 1.0 breeding guide`.
- `/guides/how-to-breed-faleris-palworld/` with anchor `Faleris target-Pal workflow` after that page ships.
- `/passive-skill-calculator/` with anchor `plan Suzaku passives`.
- `/stats-calculator/` with anchor `compare expected stats`.
- `/data-sources/` with anchor `data caveats`.

Data caveats:

- Current data includes `Suzaku` and `Suzaku Aqua`; both are breedable.
- Treat `Suzaku Aqua` as a separate variant mention or later page.
- Do not make a static claim from Reddit/video suggestions; current app data must be the implementation source.
- Do not imply all patch-sensitive combo differences are solved.

### Page 4 — How to Breed Helzephyr in Palworld

Target keyword: `how to breed Helzephyr Palworld`
Search intent: target-Pal how-to plus Helzephyr Lux and breed-combo modifiers.
Slug: `/guides/how-to-breed-helzephyr-palworld/`
Title tag: `How to Breed Helzephyr in Palworld`
H1: `How to Breed Helzephyr in Palworld`
Meta description: `Plan Helzephyr breeding in Palworld with parent lookup, route planning, Helzephyr Lux caveats, passive follow-up, and visible data-source notes.`
Meta length: 144 characters.
Schema type: `TechArticle` plus `FAQPage` only for visible Q&A.

Content angle:

- Above the fold: focus on current-data verification and route planning for Helzephyr.
- H2: Select Helzephyr as the exact target.
- H2: Find current Helzephyr parent pairs.
- H2: Use the route calculator if direct parents are missing.
- H2: Helzephyr Lux caveat.
- H2: Passive, IV, and stats after a route.
- H2: Why combo results can differ between sites.
- FAQ: Can you breed Helzephyr? What parents make Helzephyr? Is Helzephyr Lux the same target? How do I route from owned Pals? Can this page choose the best build?

Internal links:

- `/breeding-calculator/` with anchor `find Helzephyr parent pairs`.
- `/breeding-route-calculator/` with anchor `try a Helzephyr route`.
- `/guides/palworld-breeding-tree/` with anchor `breeding tree basics`.
- `/guides/palworld-breeding-route-examples/` with anchor `route example patterns`.
- `/passive-skill-calculator/` with anchor `plan Helzephyr passives`.
- `/iv-calculator/` with anchor `check IV estimates`.
- `/data-sources/` with anchor `current data notes`.

Data caveats:

- Current data includes `Helzephyr` and `Helzephyr Lux`; both are breedable.
- Lux should stay as a distinct variant target or reserve page.
- Do not publish universal best-build or best-route claims.
- Exact examples must be generated from current app data during implementation and reviewed.

### Page 5 — How to Breed Selyne in Palworld

Target keyword: `how to breed Selyne Palworld`
Search intent: target-Pal how-to with 1.0 freshness and combo lookup intent.
Slug: `/guides/how-to-breed-selyne-palworld/`
Title tag: `How to Breed Selyne in Palworld`
H1: `How to Breed Selyne in Palworld`
Meta description: `Plan Selyne breeding in Palworld with parent-pair lookup, route checks, patch-sensitive caveats, passive follow-up, and visible data-source notes.`
Meta length: 146 characters.
Schema type: `TechArticle` plus `FAQPage` only for visible Q&A.

Content angle:

- Above the fold: Selyne searches should stay version-aware because Suggest includes 1.0 and breed-combo modifiers.
- H2: Check Selyne in the current dataset first.
- H2: Find current Selyne parent pairs.
- H2: Route planning when direct parents are missing.
- H2: 1.0 and patch-sensitive caveats.
- H2: Passive, IV, and stats follow-up.
- H2: What to do when another guide differs.
- FAQ: Can you breed Selyne? What parents make Selyne? Is this updated for 1.0? What if no Selyne route appears? Should I trust one combo screenshot?

Internal links:

- `/breeding-calculator/` with anchor `check Selyne parent pairs`.
- `/breeding-route-calculator/` with anchor `plan a Selyne route`.
- `/palworld-1-0-breeding-calculator/` with anchor `Palworld 1.0 breeding calculator`.
- `/guides/palworld-1-0-breeding-guide/` with anchor `1.0 breeding caveats`.
- `/guides/palworld-breeding-faq/` with anchor `breeding FAQ`.
- `/passive-skill-calculator/` with anchor `plan Selyne passives`.
- `/data-sources/` with anchor `data-source notes`.

Data caveats:

- Current data includes `Selyne` and marks it breedable in the current dataset.
- Do not publish exact parent pairs without current app-data generation and review.
- Keep copy version-aware and transparent about patch timing.
- Avoid treating a breed-combo suggestion as proof of all supported routes.

## Non-selected candidates: keep in reserve

### `/guides/how-to-breed-faleris-aqua-palworld/`

Good reserve after the base Faleris page ships. It has direct and 1.0 suggestion evidence and exists in current data, but it should not be launched before the base page unless implementation can produce unique Aqua-specific copy and links.

### `/guides/how-to-breed-kitsun-noct-palworld/`

Good reserve after the base Kitsun page ships. Keep Noct-specific copy distinct and avoid copying base Kitsun sections with only the target name changed.

### `/guides/how-to-breed-suzaku-aqua-palworld/`

Good reserve after the base Suzaku page. Direct suggestion evidence exists and current data includes Suzaku Aqua, but variant pages should wait until the base target template has been QAed.

### `/guides/how-to-breed-bellanoir-palworld/`

Good demand signal, but defer because Bellanoir/Bellanoir Libero searches can bring raid/boss expectations and unsupported special-rule assumptions. Safer after current special-combo caveats improve or a reviewer signs off on strict unavailable-state copy.

### `/guides/how-to-breed-knocklem-palworld/`

Good reserve target with 1.0 and combo suggestions. Before implementation, verify whether `Knocklem Ignis` exists in current data if that variant is mentioned; do not create a variant page without dataset confirmation.

### `/guides/how-to-breed-frostallion-noct-palworld/`

Good reserve target, but higher risk because legendary/variant searches often expect a single static answer. Use only if copy stays as calculator-verification workflow with clear caveats.

### `/guides/how-to-breed-xenolord-palworld/`

Good reserve target with direct and 1.0 suggestions. Defer because `perfect Xenolord` suggestions can pull the page toward risky perfect-build language; implement only with a strict no-perfect-outcome guardrail.

## Copy acceptance criteria for all P12 pages

- Unique English copy; do not lightly rewrite P11 target-Pal pages.
- Title tag should be concise and unique; target-Pal titles above are all under 60 characters.
- Meta descriptions must stay 140-160 characters after implementation escaping is removed.
- One visible H1 matching the approved page topic.
- First-screen copy should state that PalCalculator is an independent fan-made Palworld calculator and guide site.
- Visible data-version/source caveat with link to `/data-sources/`.
- No source, sitemap, or production changes in this planning task.
- No use of claims that imply rights-holder status, certain outcomes, exact passive probabilities, perfect IVs, every special combo, exploit-style instructions, or universal best routes/builds.
- At least 5 meaningful H2/H3 sections per standalone guide page.
- At least 4 visible FAQ Q&As if FAQPage schema is emitted.
- Descriptive crawlable internal links to relevant calculators and related guide pages.
- Specific Pal combo/route examples only if generated from current app data during implementation and reviewed; otherwise phrase as workflow guidance and send users to verify in the calculator.
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
- Existing 29 sitemap URLs, metadata, canonical behavior, robots behavior, query-state noindex behavior, guide links, and calculator functions must not regress.
- Run after implementation: `npm run test`, `npm run lint`, `npm run build`.
- Inspect generated static HTML for every new page in `dist/guides/.../index.html` before deploy.

## Suggested implementation order

1. Faleris target page.
2. Kitsun target page.
3. Suzaku target page.
4. Helzephyr target page.
5. Selyne target page.

Reasoning:

- Faleris and Kitsun were already safe P10 reserve candidates and have repeated Suggest evidence.
- Suzaku and Helzephyr add additional target-Pal demand while keeping the same low-risk calculator-verification pattern.
- Selyne captures 1.0 freshness intent without requiring special-combo certainty.
- Variant pages should come later, after the base target pages are implemented and measured.

## Handoff summary

Current conclusion: `[DONE]` for planning only.

Next recommended agent: copy_bot for JSON-ready copy blocks, then frontend_bot for implementation after approval.

Must read before implementation:

- `artifacts/p12-seo-next-content-brief.md`
- `artifacts/p11-seo-copy-batch.md`
- `artifacts/p11-seo-pages-implementation.md`
- `src/guides-data.json`
- `src/data/pals.latest.json`
- `src/data/version.json`
- `src/data/special-combos.latest.json`

Do not assume:

- GSC access is available.
- Exact parent pairs, special-combo overrides, passive inheritance probabilities, or perfect IV formulas can be claimed without data-generation and review.
- Any user-specific owned-Pal state can be indexed or stored server-side.

Final line: [DONE]
