# PalCalculator QA Acceptance Report

Project: palcalculator
Stage: 09 QA acceptance
QA agent: qa_bot
Date: 2026-07-16
Preview tested: `npm run preview -- --port 4177` at `http://localhost:4177/`
Source directory: `/root/projects/palcalculator`

## Verdict

QA NO-GO.

Core calculator interactions are no longer pending/example-only: breeding pair, reverse parent lookup, route solver, IV/stat estimate, stats bands, passive planner caveats, route pages, legal/trust pages, build, lint, and unit tests were exercised successfully. However, P0 launch requirements are not clear because share/copy result URLs and analytics events are absent, and the available package preview serves unknown/share/result paths as homepage 200s rather than 404s. Production SEO also remains conditionally blocked by owner canonical-origin / production-indexing approval from the upstream SEO recheck.

## Commands and validation evidence

Commands run in `/root/projects/palcalculator`:

```text
npm test && npm run build && npm run lint
```

Result:

```text
Test Files  1 passed (1)
Tests       6 passed (6)
vite build succeeded
Generated 10 route-specific HTML files, 4 sitemap URLs, explicit slash redirects, and 404.html.
eslint exit_code=0 with 18 react-refresh/only-export-components warnings, 0 errors
```

Preview command:

```text
npm run preview -- --port 4177
```

Preview started successfully:

```text
Local: http://localhost:4177/
```

Browser console evidence:

- Initial homepage navigation: 0 console messages, 0 JS errors.
- After exercised calculator flows: 0 console messages, 0 JS errors.
- Analytics globals checked in browser: `gtag`, `dataLayer`, `plausible`, and `clarity` were all `undefined`.

Mobile evidence:

- Screenshot: `/root/projects/palcalculator/artifacts/qa-screenshots/mobile-emulated-breeding.png`
- Scrolled calculator screenshot: `/root/projects/palcalculator/artifacts/qa-screenshots/mobile-emulated-breeding-workspace.png`
- Selenium mobile-emulation metrics at 390px width: `innerWidth=390`, `documentElement.scrollWidth=390`, no outlier elements beyond viewport.

## P0 / P1 / P2 findings

### P0-1 — Missing share/copy result state despite P0 PRD requirement

Severity: P0
Category: Functional / MVP requirement
Status: Open

Evidence:

- PRD requires `Sharing | shareable URL state for route/build outputs | No account required` and value hierarchy includes route steps plus copy/share result links.
- UI hero claims `Copy/share URL state, no account wall`.
- Source search found no `navigator.clipboard`, copy/share controls, result-state query serialization, or URLSearchParams-based calculator state.
- Manual browser testing found no visible Copy, Share, Copy result, or equivalent controls on breeding, route, IV/stats, or passive pages.

Steps tested:

1. Open `/breeding-calculator/`, `/breeding-route-calculator/`, `/iv-calculator/`, `/stats-calculator/`, and `/passive-skill-calculator/` in the local preview.
2. Complete default/edited calculator states.
3. Search visible controls and source for copy/share implementation.

Expected:

- P0 route/build outputs expose shareable URL state and/or copy/share controls without login.

Actual:

- Calculator state changes render results, but no share/copy result UI or stateful result URL is available.

Recommended owner/agent:

- frontend_bot: add URL state serialization and a copy/share control for route/build outputs; keep private owned-Pal input policy aligned with privacy copy.
- analytics/ops owner: ensure share/copy event tracking does not leak raw private Palbox state.

### P0-2 — Basic analytics events are absent

Severity: P0
Category: Analytics / launch requirement
Status: Open

Evidence:

- PRD P0 scope requires basic event tracking: `page_view`, `tool_start`, `tool_success`, `tool_error`, and `share/copy`.
- Browser runtime check returned `gtag`, `dataLayer`, `plausible`, and `clarity` as `undefined`.
- Source search found no analytics/event dispatch implementation.
- Upstream PM acceptance also listed analytics provider/events as pending.

Expected:

- Owner-approved analytics provider or explicit no-analytics launch decision with PM acceptance updated accordingly; if analytics is enabled, events should fire without storing raw private inputs.

Actual:

- No provider and no event dispatch were detected.

Recommended owner/agent:

- product/ops owner: decide GA4/Plausible/Cloudflare/no analytics.
- frontend_bot: implement or intentionally remove P0 analytics requirement and update privacy copy once owner decision exists.

### P0-3 — Available `npm run preview` does not represent deployed 404/share/result behavior

Severity: P0 for QA against the available preview; likely deploy-preview/config gap rather than React functional bug
Category: Routing / SEO / preview environment
Status: Open

Evidence from `http://localhost:4177` served by `npm run preview -- --port 4177`:

```text
/nonexistent-seo-test-qa -> 200 text/html title_home=True
/share/test -> 200 text/html title_home=True
/results/test -> 200 text/html title_home=True
```

This conflicts with the SEO recheck's static `dist/` probe, where Python static serving plus generated files showed unknown/share/result paths as 404. The Vite preview server appears to apply SPA fallback behavior and does not enforce Cloudflare Pages `_redirects` semantics.

Expected:

- The QA preview/deploy preview used for acceptance should mirror Cloudflare Pages behavior: unknown paths and share/result-state paths return 404 or the intended noindex behavior, not homepage 200 soft-404s.

Actual:

- The package preview QA entrypoint returns homepage 200s for unknown/share/result paths.

Recommended owner/agent:

- ops_bot/frontend_bot: provide a Cloudflare Pages-equivalent local preview command, e.g. Wrangler Pages preview or a documented static server plus redirect/404 probe, and/or adjust `npm run preview` so QA does not pass a non-production routing model.

### P1-1 — Primary internal navigation remains button-driven in React source

Severity: P1
Category: SEO crawlability / accessibility / navigation
Status: Open

Evidence:

- `src/main.tsx` header nav, brand, hero CTAs, and homepage cards use `<button onClick={() => navigate(...) }>` and `history.pushState` rather than anchors.
- The SEO recheck already flagged this as P1 source recheck: frontend handoff claimed crawlable anchors, but current source still contains button-driven navigation.
- Static route HTML files and sitemap reduce indexation risk, but crawlable internal links are still weaker than real `<a href="/.../">` links.

Expected:

- Header, cards, hero CTAs, and footer legal/trust internal navigation should emit real anchors or anchor-like links with hrefs while preserving React enhancement.

Actual:

- Main app navigation is button-driven, except the sitemap footer link.

Recommended owner/agent:

- frontend_bot: convert internal navigation controls to anchors with hrefs and enhance client-side navigation via click handlers only where appropriate.

### P2-1 — Passive planner silently ignores unknown passive names

Severity: P2
Category: UX / validation
Status: Open

Evidence:

- Entering `FooPassive, Serious` produced `1 desired passive(s) recognized` and the usual caveats.
- The UI did not explicitly list `FooPassive` as unrecognized or suggest corrections.

Expected:

- Unknown passive names should be surfaced as unrecognized inputs so users can correct typos.

Actual:

- Unknown names are silently dropped from the recognized count.

Recommended owner/agent:

- frontend_bot: show unrecognized passive tokens and suggested valid names where possible.

### P2-2 — IV/stat extreme values receive broad caveat labels but no hard impossible-stat error

Severity: P2
Category: UX / validation
Status: Open

Evidence:

- Setting observed attack to `999999` on the IV page produced `high band / check modifiers` rather than a hard impossible or likely-invalid warning.
- This is honest and caveated, but less actionable than the PRD wording around impossible stats.

Expected:

- Extremely impossible values should get an explicit impossible/out-of-range warning or validation hint.

Actual:

- Values outside the expected band are only labeled `high band / check modifiers`.

Recommended owner/agent:

- frontend_bot/backend_bot: add thresholds or validation copy for impossible/out-of-range stat entries while preserving caveats.

## Passed checks

### Build/test/lint

- `npm test`: pass, 6/6 tests.
- `npm run build`: pass, Vite build succeeded and static routes generated.
- `npm run lint`: pass exit code 0, warnings only.

### Calculator behavior

- Breeding pair default: `Penking + Bushi -> Sibelyx`; result shows data version, normal formula rule, caveats, and no fabricated special-combo certainty.
- Breeding invalid parent: `NotAPal` returns `Pair unavailable`, `INVALID_PAL`, and data-version-aware error copy.
- Target-to-parents default: `Anubis` returns `66 parent pairs found`, first 10 sorted pairs displayed.
- Route default: target `Anubis` with `Penking, Bushi` returns route found, generation count, missing Pals, alternatives, and tie rule.
- Route target already owned: owned `Anubis` returns `Anubis already owned`, 0 generations, 0 missing Pals.
- Route invalid target: `NotAPal` returns `Route unavailable`, `INVALID_PAL`.
- IV page: default Anubis level 50 returns caveated IV bands and unsupported exact-formula caveats.
- Stats page: default Anubis level 50 returns expected stat bands with caveats.
- Passive planner: default `Artisan, Serious` recognizes two passives and avoids deterministic inheritance claims.

### Mobile

- 390px mobile emulation did not show horizontal overflow by Selenium metrics.
- Header, wrapped nav, hero CTA, calculator fields, segmented controls, and result box are readable/tappable in captured screenshots.
- Note: calculator workspace is below first mobile fold because the hero/status content occupies the top screen; this is acceptable for current QA but should be watched against the PRD phrase `calculator UI above the fold`.

### Trust/compliance visible in UI

- Fan-made unofficial disclaimer visible in footer.
- Data version visible on tool pages.
- Caveats shown on calculator outputs.
- No login/payment wall encountered.
- No official Palworld art/logos observed in the tested UI.

## Routes / static output spot-check

Routes returning 200 in Vite preview:

```text
/ -> 200
/breeding-calculator/ -> 200
/breeding-route-calculator/ -> 200
/iv-calculator/ -> 200
/stats-calculator/ -> 200
/passive-skill-calculator/ -> 200
/palworld-1-0-breeding-calculator/ -> 200
/data-sources/ -> 200
/privacy/ -> 200
/terms/ -> 200
/sitemap.xml -> 200
/robots.txt -> 200
```

Problematic Vite preview fallback results:

```text
/nonexistent-seo-test-qa -> 200 homepage HTML
/share/test -> 200 homepage HTML
/results/test -> 200 homepage HTML
```

## Acceptance gate

QA GO criteria are not met because P0 issues remain open:

1. Share/copy result URL state is missing.
2. Basic analytics events/provider decision are missing.
3. The available `npm run preview` does not prove production 404/share/result routing and returns soft-404 homepage 200s.
4. Upstream SEO recheck remains conditional NO-GO pending canonical-origin and production-indexing approval.

Recommended next agents:

1. frontend_bot for share/copy URL state, analytics hooks once approved, anchor navigation, passive/stat validation improvements.
2. ops_bot or deploy_bot for Cloudflare Pages-equivalent preview/deploy routing validation and canonical-origin owner approval.
3. product_bot to update PM acceptance after share/analytics/canonical decisions.
4. seo_bot for final deploy SEO recheck against the real production URL after owner approval.

Final line: [QA NO-GO]
