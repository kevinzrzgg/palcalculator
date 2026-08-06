# P15 Monetization Readiness Plan — AdSense Review Pending

Status: planning-only; no source edits, no deploy  
Context: PalCalculator.com has submitted AdSense re-review after P14 AdSense low-value-content recovery. Production should remain stable while review is pending.

## Executive recommendation

Do not change the live site during the AdSense review unless there is a factual error or a broken page. Prepare the monetization plan now, but implement only after AdSense returns a result.

Primary rule: protect the calculator experience first. PalCalculator monetization should be guide/content-led, with calculator pages kept low-ad and input/result areas treated as no-ad zones.

## Current production posture to preserve

- Production: `https://palcalculator.com/`
- Sitemap: 38 URLs after P14 trust/content work
- AdSense re-review: submitted by owner
- P14 added: About, Contact, Editorial Policy, Advertising Disclosure, deeper homepage/tool content
- Do not alter: routes, sitemap, robots, canonical, ads.txt, Analytics/AdSense snippets, Cloudflare/DNS/GSC settings, calculator share privacy, localStorage-only owned Pal behavior

## Monetization principles

1. Wait for AdSense approval before live ad placements.
2. Keep all calculators free and usable.
3. No paywall, login, Stripe subscription, forced signup, sticky overlay, interstitial, or ad wall in the first monetization phase.
4. Put ads mostly on guide/content pages, not inside calculator input or result workflows.
5. Keep trust pages either ad-free or extremely light-ad to preserve review and user trust.
6. Use transparent disclosure for future sponsor/support/affiliate placements.
7. Measure impact before increasing density.

## First AdSense placement map after approval

### Homepage

Recommended first batch:
- 1 responsive display unit after the intro/tool cards or guide grid.
- No above-the-fold ad before the primary tool links.
- No sticky ad.

Reason: homepage is navigational and trust-sensitive; monetize lightly.

### Guide pages

Recommended first batch:
- 1 in-content ad after the intro/first major section.
- Optional second ad before FAQ only on long guide pages with substantial content.
- Do not place ads between every section.

Reason: guide pages are the best ad inventory because users are reading rather than actively entering calculator values.

### Calculator pages

Recommended first batch:
- No ad inside forms, inputs, route tree, result cards, or owned-Pal localStorage controls.
- Optional one responsive unit below the results area or below supporting FAQ/content modules.
- Optional one bottom content ad after educational sections, not above the calculator.

No-ad zones:
- Parent selectors
- Target selectors
- IV/stat input fields
- Passive selection controls
- Route solver result tree
- Missing Pal explanations
- Share URL controls
- Owned Pal localStorage helper

Reason: ads inside workflow areas reduce trust and may look like low-quality tool monetization.

### Trust pages

Recommended:
- Keep `/about/`, `/contact/`, `/editorial-policy/`, `/advertising-disclosure/`, `/privacy/`, `/terms/`, `/data-sources/` ad-free for the first AdSense approval cycle.

Reason: these pages support AdSense trust and should not look monetized first.

## Density caps

Initial cap after approval:
- Homepage: max 1 ad unit.
- Guide pages under ~900 words: max 1 ad unit.
- Guide pages over ~1100 words: max 2 ad units.
- Calculator pages: max 1 ad unit, below the active workflow.
- Trust/policy pages: 0 ad units.

Mobile rules:
- No sticky mobile anchor in phase 1.
- No ad before H1 or immediately after H1.
- No two ads within one mobile viewport.
- Keep calculator inputs/results free of ads.

## Support and sponsor options

Support PalCalculator can be prepared after AdSense result, but should remain optional and non-pushy:
- A small footer/support link is acceptable after approval.
- No forced donation popups.
- No supporter-only calculator features in early phase.

Sponsor option:
- A simple sponsor information page can be implemented later if a real sponsor/offer exists.
- Sponsor placements should use clear labels such as `Sponsored` or `Advertising disclosure`.
- Avoid game-affiliation language that implies official partnership.

Affiliate option:
- Defer live affiliate links until after AdSense result.
- If added later, use transparent disclosure and page-by-page relevance.
- Avoid thin affiliate blocks that add no user value.

## Decision tree

### If AdSense approves

1. Wait 24-48 hours and confirm account/site status is stable.
2. Implement phase-1 ad placements only:
   - homepage 1 unit
   - guide pages 1 unit; long guides optionally 2
   - calculator pages 0-1 below workflow
   - trust pages 0
3. QA mobile, console, CLS/layout, calculator workflow, sitemap/robots/canonical.
4. Monitor AdSense policy center, GSC, Analytics, and user behavior.
5. Do not expand density until 2-4 weeks of stable data.

### If AdSense rejects again for low-value content

1. Do not add ads or new monetization.
2. Re-read rejection details and compare with P14 changes.
3. Prioritize additional original examples on the 6 core calculator pages and newest template-like guide pages.
4. Consider adding a dedicated owner-approved external contact method if available.
5. Re-submit only after visible additional content improvements and GSC crawl.

### If AdSense is pending more than 14 days

1. Do not repeatedly resubmit.
2. Keep production stable.
3. Prepare implementation branches/plans only.
4. Continue light content QA and monitor GSC indexing.

## Metrics to monitor after approval

- AdSense: RPM, viewability, policy alerts, invalid traffic warnings
- Analytics: calculator completion rate, guide-to-calculator clicks, bounce/engagement time
- GSC: indexed pages, crawl errors, query growth
- UX: mobile overflow, page speed/chunk regressions, complaints about ads

## Implementation sequence after approval

Recommended P16 after AdSense approval:
1. product/frontend: implement ad config with conservative page-type rules.
2. frontend: add only phase-1 slots.
3. qa: verify no calculator workflow disruption.
4. ops: deploy and live-verify.

Recommended P16 if rejected:
1. seo/copy: strengthen lowest-value pages.
2. frontend: implement additional content only.
3. qa/ops: deploy content improvements; wait for crawl; re-request review later.

## Non-goals for now

- No subscription or paid plan
- No login
- No Stripe
- No heavy affiliate block
- No ad-wall or interstitial
- No sticky ads in phase 1
- No trust-page monetization

Final recommendation: wait for the AdSense result, keep the live site stable, and use this plan only as a ready-to-implement blueprint after approval or rejection.
