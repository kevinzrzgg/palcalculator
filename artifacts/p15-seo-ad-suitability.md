# P15 SEO Ad Suitability — PalCalculator

Status: planning-only; no source edits, no deploy  
Context: AdSense re-review is pending after P14 recovery work. Use this page-level plan only after AdSense returns a result.

## Executive summary

PalCalculator should monetize reading pages before workflow pages. Guide pages are the safest first AdSense inventory. Calculator pages should stay low-ad with strict no-ad zones around user inputs and results. Trust/policy pages should remain ad-free during the first approval cycle.

## Page classification

### Ad-safe after approval

Use one conservative in-content unit first:

- `/guides/palworld-breeding-combos/`
- `/guides/palworld-breeding-tree/`
- `/guides/palworld-1-0-breeding-guide/`
- `/guides/palworld-iv-explained/`
- `/guides/best-passive-skills-for-breeding-palworld/`
- `/guides/how-to-breed-anubis-palworld/`
- `/guides/how-to-breed-jetragon-palworld/`
- `/guides/palworld-breeding-route-examples/`
- `/guides/palworld-breeding-faq/`
- `/guides/how-to-breed-orserk-palworld/`
- `/guides/how-to-breed-shadowbeak-palworld/`
- `/guides/palworld-breeding-with-owned-pals/`
- `/guides/best-palworld-breeding-combos/`
- `/guides/palworld-base-worker-passives/`
- `/guides/how-to-breed-blazamut-palworld/`
- `/guides/how-to-breed-astegon-palworld/`
- `/guides/how-to-breed-grizzbolt-palworld/`
- `/guides/how-to-breed-lyleen-palworld/`
- `/guides/palworld-breeding-path-finder/`
- `/guides/how-to-breed-faleris-palworld/`
- `/guides/how-to-breed-kitsun-palworld/`
- `/guides/how-to-breed-suzaku-palworld/`
- `/guides/how-to-breed-helzephyr-palworld/`
- `/guides/how-to-breed-selyne-palworld/`

Recommended rule: one unit after the first meaningful section. Add a second unit only on long guides after observing stable approval and user metrics.

### Low-ad pages after approval

Use 0-1 unit only below workflow/supporting educational content:

- `/`
- `/breeding-calculator/`
- `/breeding-route-calculator/`
- `/iv-calculator/`
- `/stats-calculator/`
- `/passive-skill-calculator/`
- `/palworld-1-0-breeding-calculator/`

Calculator no-ad zones:

- Any input/select/form area
- Result cards
- Route tree
- Missing Pal explanations
- Owned-Pal localStorage helper
- Share controls and query hydration flows
- Warnings/caveat panels immediately tied to results

### No-ad / review-sensitive pages for phase 1

Keep ad-free at least through the first stable approval cycle:

- `/about/`
- `/contact/`
- `/editorial-policy/`
- `/advertising-disclosure/`
- `/privacy/`
- `/terms/`
- `/data-sources/`

Reason: these pages support trust, policy clarity, and AdSense recovery. Monetizing them early can make the site look less credible.

## SEO-safe placement rules

1. Never place ads above the H1 or before primary navigation/tool context.
2. Avoid ads before a calculator's first input.
3. Avoid layout shifts around results.
4. Do not insert ads inside FAQ structured-data blocks in a way that separates questions from answers.
5. Keep disclosure text clear when future sponsor/affiliate placements are added.
6. Use responsive units only; no sticky/interstitial/pop-up in phase 1.
7. Keep trust pages clean.

## Monitoring after approval

- GSC: crawl/index status for 38 URLs, sudden ranking drops, page experience warnings.
- Analytics: guide-to-calculator click rate, calculator completion rate, engagement time.
- AdSense: policy alerts, invalid traffic warnings, viewability, RPM.
- UX QA: mobile 390px overflow, console errors, form usability, CLS/layout shifts.

## If AdSense rejects again

Do not implement ads. Focus additional work on:

1. More original examples on calculator pages.
2. Distinctive examples on the newest guide cluster.
3. A dedicated owner-approved contact method if available.
4. More visible data-review/correction workflow.

## Final recommendation

After approval, start with guide-page ads only plus a single light homepage placement. Keep calculators mostly ad-free and trust pages fully ad-free until the site has stable AdSense status and measurable traffic.
