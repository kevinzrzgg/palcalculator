# PalCalculator SEO Recheck After Repairs

Project: palcalculator
Stage: 10-seo-recheck-after-repairs
Keyword focus: palcalculator, Palworld calculator, Palworld breeding calculator, Palworld 1.0 breeding calculator
Market: US / English
Audit date UTC: 2026-07-16T06:02:08Z
Fact source directory: `/root/projects/palcalculator`

## Verdict

SEO CONDITIONAL NO-GO — technical SEO repairs pass, but production SEO GO remains blocked by canonical-origin / production-indexing approval.

The current implementation rebuilds successfully, emits route-specific static HTML for all 10 P0 routes, removes the broad SPA catch-all, returns real 404s for unknown paths, excludes share/result-style paths from indexation, and ships a versioned Palworld 1.0 public-web data build with working normal breeding, reverse lookup, route states, and caveated IV/stat outputs.

However, owner approval for `https://palcalculator.com` as the final production canonical origin is still not recorded. Per the ops handoff, production deploy/search submission/indexing must remain blocked or conservative until the owner explicitly confirms the canonical origin and production indexing approval. Current static output is conservative: homepage/data/legal pages are indexable, while calculator tool routes are `noindex,follow` and absent from the sitemap.

## Validation evidence

Commands run in `/root/projects/palcalculator`:

```text
npm test && npm run build
```

Result:

```text
Test Files  1 passed (1)
Tests       6 passed (6)
✓ built in 1.35s
Generated 10 route-specific HTML files, 4 sitemap URLs, explicit slash redirects, and 404.html.
exit_code=0
```

Local static HTTP probe served `dist/` with `python3 -m http.server 4176 --directory dist` and checked route HTML/statuses.

## Route-specific static metadata check

| Route | HTTP | Robots | Initial title | Canonical | Initial H1 | SEO assessment |
|---|---:|---|---|---|---|---|
| `/` | 200 | `index,follow` | `PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators` | `https://palcalculator.com/` | `PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators` | PASS pending canonical approval |
| `/breeding-calculator/` | 200 | `noindex,follow` | `Palworld Breeding Calculator - Parent Pairs, Children & Combos` | `https://palcalculator.com/breeding-calculator/` | `Palworld Breeding Calculator` | PASS metadata; intentionally not indexable yet |
| `/breeding-route-calculator/` | 200 | `noindex,follow` | `Palworld Breeding Route Calculator - Shortest Path from Owned Pals` | `https://palcalculator.com/breeding-route-calculator/` | `Palworld Breeding Route Calculator` | PASS metadata; intentionally not indexable yet |
| `/iv-calculator/` | 200 | `noindex,follow` | `Palworld IV Calculator - Check HP, Attack & Defense IVs` | `https://palcalculator.com/iv-calculator/` | `Palworld IV Calculator` | PASS metadata; intentionally not indexable yet |
| `/stats-calculator/` | 200 | `noindex,follow` | `Palworld Stats Calculator - Estimate Pal Stats by Level` | `https://palcalculator.com/stats-calculator/` | `Palworld Stats Calculator` | PASS metadata; intentionally not indexable yet |
| `/passive-skill-calculator/` | 200 | `noindex,follow` | `Palworld Passive Skill Calculator - Plan Breeding Passives` | `https://palcalculator.com/passive-skill-calculator/` | `Palworld Passive Skill Calculator` | PASS metadata; intentionally not indexable yet |
| `/palworld-1-0-breeding-calculator/` | 200 | `noindex,follow` | `Palworld 1.0 Breeding Calculator - Updated Combos & Routes` | `https://palcalculator.com/palworld-1-0-breeding-calculator/` | `Palworld 1.0 Breeding Calculator` | PASS metadata; intentionally not indexable yet |
| `/data-sources/` | 200 | `index,follow` | `PalCalculator Data Sources & Update Policy` | `https://palcalculator.com/data-sources/` | `PalCalculator Data Sources & Update Policy` | PASS pending canonical approval |
| `/privacy/` | 200 | `index,follow` | `Privacy Policy` | `https://palcalculator.com/privacy/` | `Privacy Policy` | PASS pending canonical approval |
| `/terms/` | 200 | `index,follow` | `Terms of Use` | `https://palcalculator.com/terms/` | `Terms of Use` | PASS pending canonical approval |

All checked route HTML includes route-specific meta description, canonical, OG title, OG description, OG URL, robots directive, and an initial static H1 before React loads.

## 404 / unknown path / excluded path check

Local probe results:

```text
/nonexistent-seo-test-12345 -> 404 text/html;charset=utf-8 | homepage_title=False
/sitemap_index.xml -> 404 text/html;charset=utf-8 | homepage_title=False
/share/test -> 404 text/html;charset=utf-8 | homepage_title=False
/results/test -> 404 text/html;charset=utf-8 | homepage_title=False
/sitemap.xml -> 200 application/xml
/robots.txt -> 200 text/plain
/404.html -> 200 text/html
```

Static artifact checks:

- `dist/_redirects` contains only explicit no-trailing-slash to trailing-slash 301 redirects.
- There is no broad `/* /index.html 200` catch-all fallback in the generated `_redirects`.
- `dist/404.html` exists and includes `meta name="robots" content="noindex,follow"`.
- Unknown paths are not emitted as static route files.

## Sitemap / robots / indexability

`dist/robots.txt`:

```text
User-agent: *
Allow: /
Disallow: /share/
Sitemap: https://palcalculator.com/sitemap.xml
```

`dist/sitemap.xml` currently contains exactly 4 URLs:

```text
https://palcalculator.com/
https://palcalculator.com/data-sources/
https://palcalculator.com/privacy/
https://palcalculator.com/terms/
```

Sitemap/exclusion assessment:

- PASS: `/share/` is disallowed in robots and no share URL appears in sitemap.
- PASS: `/results/` / result-state-style paths are not in sitemap and return 404 in the static probe.
- PASS: calculator tool routes are absent from sitemap while their generated HTML is `noindex,follow`.
- PASS: sitemap contains no programmatic thin Pal pages.
- WATCH: because backend data repair now provides real normal breeding/data-backed utility, calculator pages can become indexable after owner-approved canonical origin and production indexing approval. The current noindex posture is conservative rather than a technical metadata failure.

## Backend/data readiness check

Backend handoff reviewed: `/root/projects/palcalculator/artifacts/backend-data-repair.md`.

Data build evidence:

- `dataVersion`: `palworld-1-0_public-web_2026-07-16_r1`
- `gameVersionLabel`: `Palworld 1.0 public-web data build`
- Pals: 297
- Normal breeding pairs: 44,253
- Tests verify child-from-parents, reverse parent pairs, route states, and caveated IV/stat bands.

Data caveats that remain correctly disclosed:

- verified special combo override table unsupported
- guaranteed passive inheritance odds unsupported
- server-side save upload unsupported
- exact IV with all modifiers unsupported

SEO interpretation: this is no longer a pending/example-only shell. It is a working, caveated MVP data build. Indexation of calculator routes is technically plausible after owner canonical/deploy approval, but current `noindex,follow` is acceptable as a conservative production-indexing block.

## Canonical origin / production indexing gate

Ops handoff reviewed: `/root/projects/palcalculator/artifacts/canonical-origin-handoff.md`.

Current status:

- `https://palcalculator.com` is registered/owned, but explicit owner approval as the final production canonical origin is not recorded.
- DNS was reported as still on Dynadot/default infrastructure at the ops check.
- Ops explicitly instructed SEO not to treat `https://palcalculator.com` as production-approved until owner confirms it.

Required owner decision before SEO GO / GSC submission / production indexing:

```text
Is https://palcalculator.com the final owner-approved canonical production origin for PalCalculator, with apex as primary and any www host redirected to the apex? May build/deploy use this exact origin in canonical tags, sitemap.xml, and robots.txt for production indexing?
```

If yes, unblock production indexation and update tool-route indexability according to launch choice. If no, provide the exact final canonical origin and regenerate canonical/robots/sitemap from that origin.

## What is fixed since prior SEO audit

1. PASS: route-specific initial HTML now exists for all 10 P0 routes.
2. PASS: each route has unique title/meta description/canonical/OG/H1 in the initial HTML.
3. PASS: broad SPA catch-all fallback has been removed from `_redirects`.
4. PASS: `404.html` exists with `noindex,follow`.
5. PASS: unknown paths and XML-looking nonexistent paths return 404 in local static probing.
6. PASS: share/result-style paths are not indexed and are not in sitemap.
7. PASS: backend data is no longer example-only/pending; normal breeding, reverse lookup, route states, and caveated IV/stat outputs are test-covered.
8. PASS: `/data-sources/` exposes data version, included domains, unsupported domains, sources, update date, and correction path.

## Remaining repair / decision list

### P0-1: Owner canonical-origin and production indexing approval is still missing

Severity: P0 blocker for SEO GO and search submission.

Evidence:

- Ops handoff says `https://palcalculator.com` is registered/owned but not owner-approved as the final production canonical origin.
- Current static output uses `https://palcalculator.com` in canonical URLs, robots sitemap declaration, and sitemap locs.

Required repair/decision:

- Owner must explicitly confirm the final canonical origin and apex/www redirect policy.
- If confirmed as `https://palcalculator.com`, production deploy/search submission can proceed after deploy QA.
- If not confirmed, regenerate route HTML, robots, and sitemap with the approved origin; keep indexing blocked until then.

### P0-2: Decide when to index calculator tool routes

Severity: P0 launch-indexing decision, not a static metadata failure.

Evidence:

- Tool routes are currently `noindex,follow` and absent from sitemap.
- Backend data repair shows real, test-covered calculator utility for normal formula breeding and caveated stats, with explicit unsupported-domain caveats.

Required decision:

- If owner approves production indexing and accepts the current caveated MVP data scope, change calculator routes to `index,follow` and add them to sitemap.
- If owner wants to wait for verified special-combo override data or further QA, keep calculator routes `noindex,follow` and absent from sitemap.

### P1-1: Crawlable internal anchors should be rechecked in source after frontend claim

Severity: P1.

Evidence:

- Frontend repair handoff claims header, cards, hero CTAs, and footer trust/legal links were converted to crawlable `<a href="/.../">` links.
- Current `src/main.tsx` still contains several button-driven navigation components in the source snapshot reviewed during this task.

Required repair/check:

- Confirm the latest intended source version is present.
- Ensure primary navigation, homepage route cards, hero CTAs, and footer internal links emit real anchors in the built HTML/React render, not button-only navigation.
- This does not block the current static metadata/404 repair because sitemap and static route files are present, but it remains a crawlability/UX quality issue.

### P1-2: FAQ/AEO structured content remains a growth improvement

Severity: P1/P2 depending on launch scope.

Required improvement:

- Add visible FAQ sections to core calculator pages after the above-fold tool.
- Add FAQPage schema only for questions/answers visible on that route.
- Keep answers caveated and data-version-aware.

### P1-3: Analytics/privacy launch decision remains pending

Severity: P1 before public launch if analytics is enabled.

Required decision:

- Decide GA4/Clarity/no analytics.
- If analytics is enabled, update Privacy with provider, event names, retention/cookie behavior, and avoid collecting private save-file/Palbox content.

## Acceptance gate result

Not SEO GO yet.

Current implementation is technically much improved and passes the recheck for static routing, route metadata, 404 behavior, sitemap exclusion of share/result paths, and data-readiness evidence. The remaining SEO GO blocker is not a code-level metadata failure; it is the owner/deploy decision for canonical origin and production indexation. Keep production search submission blocked until that approval exists.

Recommended next action: owner/deploy approval for canonical origin and production indexing policy, then one final SEO deploy recheck against the real production URL.
