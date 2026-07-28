# P7 AITDK SEO acceptance criteria: image alt + meta descriptions

Task: t_1d3f1825
Site: https://palcalculator.com/
Screenshot evidence: `/root/.hermes/cache/images/img_f4d377361759.jpg`
Source inspected: `src/main.tsx`, `scripts/generate-static-routes.mjs`, `src/guides-data.json`, `index.html`, `src/main.test.ts`.

## AITDK screenshot findings

AITDK Issues for `palcalculator.com` shows:

- Image Alt Text Check: warning, "1 images missing alt text. Add descriptive alt text to improve accessibility and SEO."
- Meta Description Check: informational warning, "SEO meta descriptions should be 140-160 characters to ensure full display and boost clicks."
- Already green in the screenshot: Meta Title Check, Canonical URL Check, H1 Check, H2 Check.

This card should only define source-change acceptance criteria. Do not deploy from this task.

## Required source changes

### 1. Fix the single image alt warning

Current likely trigger:

- `src/main.tsx:139` renders the header brand image as:
  - source: `/brand-icon.svg`
  - current alt: empty string
  - current accessibility state: `aria-hidden="true"`

Although an empty `alt` can be valid for decorative images, this brand mark is inside the homepage/sitewide brand link and AITDK is counting it as the one missing alt image. Acceptance criteria for the implementing agent:

- In `src/main.tsx`, change the brand icon to a descriptive non-empty alt, exactly `alt="PalCalculator logo"`.
- Remove `aria-hidden="true"` from that `<img>` so the non-empty alt is not suppressed.
- Keep width, height, class name, source, and surrounding brand link behavior unchanged.
- Add or update a test that searches `src/main.tsx` and fails if the brand icon has `alt=""`, has no `alt`, or still has `aria-hidden="true"`.

Expected final image source shape:

- `<img className="brand-mark" src="/brand-icon.svg" alt="PalCalculator logo" width="40" height="40"/>`

QA check:

- Run a local/lived page scan or DOM check and confirm there are zero `img` elements with missing/empty alt on indexable pages.
- For the current app, the key DOM selector is `img.brand-mark[src="/brand-icon.svg"]`; it must have `alt="PalCalculator logo"` and must not have `aria-hidden="true"`.

### 2. Bring meta descriptions to 140-160 characters

Current audit result from source inspection:

- `src/main.tsx`: all 10 hardcoded route descriptions are outside 140-160 chars. Homepage is 130 chars.
- `scripts/generate-static-routes.mjs`: 9 of 10 hardcoded route descriptions are outside 140-160 chars. Only `/breeding-calculator/` is exactly 140 chars.
- `src/guides-data.json`: all 14 guide descriptions are outside 140-160 chars.
- Overall: 33 of 34 inspected indexable route descriptions are outside the AITDK target range.

Important implementation detail:

- The SPA route metadata in `src/main.tsx` and the static prerender metadata in `scripts/generate-static-routes.mjs` currently drift for most core routes. The fix should either centralize route metadata in one shared source or update both files with the same final descriptions for the 10 non-guide routes.
- Guide page descriptions come from `src/guides-data.json` and flow into both SPA route metadata and static prerendered HTML through `guidePages.map(...)`; update that JSON for guide routes.
- Keep title, canonical, H1, and H2 behavior unchanged because AITDK already reports those checks as green.

Required length guard:

- Every indexable route's `<meta name="description">` content must be between 140 and 160 characters inclusive.
- The corresponding `og:description` should also stay useful and can match the meta description where no stronger OG-specific text exists.
- Add or update tests in `src/main.test.ts` so core route and guide descriptions must be `>= 140` and `<= 160`, not only `<= 160`.
- Add a static-generator parity test so the 10 hardcoded routes in `scripts/generate-static-routes.mjs` cannot drift from the SPA route descriptions in `src/main.tsx` again, or refactor to import a shared metadata file and test the shared source.

## Recommended exact replacement descriptions

All strings below were counted with Python and are 140-160 characters inclusive.

| Path | Length | Replacement meta description |
| --- | ---: | --- |
| `/` | 149 | Fan-made Palworld 1.0 calculator hub for breeding routes, parent pairs, IV/stat estimates, passive planning, and owned-Pal optimization with caveats. |
| `/breeding-calculator/` | 146 | Check Palworld parent pairs, target parents, child results, special-combo caveats, and data-version-aware breeding notes in a fan-made calculator. |
| `/breeding-route-calculator/` | 141 | Plan Palworld breeding routes from owned Pals to a target Pal with constraints, missing-parent notes, alternatives, and visible data caveats. |
| `/iv-calculator/` | 148 | Estimate Palworld IV ranges from observed HP, attack, defense, level, and modifier notes while keeping formula assumptions and data caveats visible. |
| `/stats-calculator/` | 143 | Preview Palworld HP, attack, and defense stat bands by Pal and level, with IV context, formula assumptions, and data-version caveats explained. |
| `/passive-skill-calculator/` | 154 | Plan Palworld passive skill targets for breeding, compare desired passives, and keep inheritance RNG caveats clear without unsupported probability claims. |
| `/palworld-1-0-breeding-calculator/` | 146 | Use the Palworld 1.0 breeding calculator entry point for updated parent pairs, route planning, data freshness notes, and version-specific caveats. |
| `/data-sources/` | 151 | Review PalCalculator dataset status, source categories, update policy, formula assumptions, unsupported Palworld data, and correction workflow details. |
| `/privacy/` | 153 | Read how PalCalculator handles browser-local calculator state, share URLs, hosting logs, analytics, ads, and privacy choices for fan-made Palworld tools. |
| `/terms/` | 151 | Read PalCalculator terms for unofficial fan-site status, Palworld trademark references, data accuracy caveats, user responsibility, and acceptable use. |
| `/guides/palworld-breeding-combos/` | 142 | Learn Palworld breeding combos, parent-pair lookup, 1.0 caveats, route handoffs, and when to use PalCalculator fan-made breeding tools safely. |
| `/guides/palworld-breeding-tree/` | 141 | Understand Palworld breeding trees, route steps, owned-Pal paths, missing-parent notes, and how PalCalculator finds caveated breeding routes. |
| `/guides/palworld-1-0-breeding-guide/` | 146 | Use this Palworld 1.0 breeding guide to check combos, routes, data-version notes, special-combo caveats, and fan-made calculator workflows safely. |
| `/guides/palworld-iv-explained/` | 142 | Learn what Palworld IVs mean, why stats vary, how IV calculators estimate ranges, and where formula, modifier, and data-version caveats apply. |
| `/guides/best-passive-skills-for-breeding-palworld/` | 148 | Plan Palworld breeding passives by goal, compare worker and combat skills, use PalCalculator planning tools, and keep inheritance RNG caveats clear. |
| `/guides/how-to-breed-anubis-palworld/` | 145 | Learn how to plan Anubis breeding in Palworld with parent-pair lookup, route steps, passive caveats, and PalCalculator data-version notes safely. |
| `/guides/how-to-breed-jetragon-palworld/` | 143 | Check Jetragon breeding options in Palworld with route planning, parent-pair caveats, data-version notes, and fan-made calculator links safely. |
| `/guides/palworld-breeding-route-examples/` | 141 | See caveated Palworld breeding route examples, owned-Pal planning patterns, missing-parent notes, alternatives, and calculator workflow tips. |
| `/guides/palworld-breeding-faq/` | 140 | Get quick answers about Palworld breeding combos, routes, passives, 1.0 data, owned-Pal planning, and PalCalculator fan-made caveats safely. |
| `/guides/how-to-breed-orserk-palworld/` | 144 | Plan Orserk breeding in Palworld with parent-pair lookup, owned-Pal routes, passive caveats, data-version notes, and calculator handoffs safely. |
| `/guides/how-to-breed-shadowbeak-palworld/` | 143 | Check Shadowbeak breeding options with parent-pair lookup, route planning, passive and IV caveats, and PalCalculator data-version notes safely. |
| `/guides/palworld-breeding-with-owned-pals/` | 142 | Learn how to plan Palworld breeding routes from the Pals you own, compare missing parents, use route constraints, and read calculator caveats. |
| `/guides/best-palworld-breeding-combos/` | 145 | Explore useful Palworld breeding combo ideas by goal, with 1.0 data caveats, route handoffs, and links to verify results in PalCalculator safely. |
| `/guides/palworld-base-worker-passives/` | 145 | Plan Palworld base worker passives by role, compare work-speed skills, use PalCalculator planning notes, and avoid guaranteed inheritance claims. |

## Implementation QA checklist

After another agent implements the source changes, run:

1. `npm run test`
2. `npm run lint`
3. `npm run build`
4. Inspect generated static HTML in `dist/` and verify every indexable route has exactly one `<meta name="description">` with content length 140-160.
5. Check the live or preview DOM for `img.brand-mark`: non-empty `alt="PalCalculator logo"`, no `aria-hidden="true"`.
6. Re-run AITDK against `https://palcalculator.com/`; expected outcome is:
   - Image Alt Text Check: green / 0 images missing alt text.
   - Meta Description Check: no length warning for homepage; ideally no warnings for all indexable route URLs.
   - Existing green checks for title, canonical, H1, and H2 remain green.

## Non-goals for this task

- No source-code implementation was performed here.
- No deploy was performed here.
- No changes should be made to sitemap URL inclusion, canonical URL logic, title text, H1, or H2 solely for this AITDK issue.
