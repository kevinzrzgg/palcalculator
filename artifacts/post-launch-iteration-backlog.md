# PalCalculator Post-launch Iteration Backlog

Project: PalCalculator
Live site: https://palcalculator.com
Artifact date: 2026-07-16
Owner: product_bot
Status: DONE — first 7/14/30-day backlog, based on existing review/QA/SEO/product artifacts; no production code changed.

## 0. Source artifacts reviewed

- `/root/projects/palcalculator/artifacts/review-plan.md`
- `/root/projects/palcalculator/artifacts/prd.md`
- `/root/projects/palcalculator/artifacts/route-contract.md`
- `/root/projects/palcalculator/artifacts/data-contract.md`
- `/root/projects/palcalculator/artifacts/pm-acceptance.md`
- `/root/projects/palcalculator/artifacts/qa-report.md`
- `/root/projects/palcalculator/artifacts/seo-audit.md`
- `/root/projects/palcalculator/artifacts/launch-gates.md`
- `/root/projects/palcalculator/artifacts/post-launch-final-verification.md`
- `/root/projects/palcalculator/artifacts/setup-gate-webmaster-analytics.md`

Key current context:
- Production apex and www smoke checks now pass; `/sitemap.xml`, `/robots.txt`, `/share/test`, and `/results/test` have final production verification evidence.
- Earlier SEO repairs pass for static metadata, 404 behavior, sitemap exclusion of share/result paths, and data-backed caveated calculator utility.
- Calculator tool routes remain conservative: `noindex,follow` and absent from sitemap until owner approves production indexing and current data scope.
- Analytics provider/config remains owner-dependent. First-party hooks/events exist in planning, but provider activation and privacy copy must be approved before non-essential tracking.
- No GSC/Bing submission or public promotion should occur without owner approval.

## 1. Product principle for the first 30 days

Do not expand scope before measurement, trust, and conversion basics are reliable.

The no-regret iteration path is:
1. Make production observability trustworthy.
2. Remove obvious UX friction that affects every user.
3. Keep data and legal/trust claims conservative.
4. Only index/expand calculator pages after owner accepts the caveated data scope and search setup is ready.
5. Use 7/14/30-day evidence to choose between no-traffic, traffic-no-usage, usage-no-retention/share, and usage-with-SEO-signal playbooks from the review plan.

North-star metric from review plan:
- Weekly successful calculator sessions from qualified discovery traffic.
- Definition: distinct sessions with at least one privacy-safe `tool_success` event on a calculator page, excluding internal QA/bot traffic.

## 2. Top 5 first priorities

| Priority | Task | Category | Window | Impact | Effort | Risk | Why now |
|---:|---|---|---|---|---|---|---|
| 1 | Decide and implement the analytics/search measurement gate | Analytics dependency | Day 0-7 | Very high | Medium | High if delayed | Without provider/GSC/Bing decisions, the launch cannot be judged and no iteration should be called data-backed. |
| 2 | Add/verify share/copy result URL state and events | Calculator UX + Analytics | Day 0-7 | High | Medium | Medium | QA found share/copy missing; sharing is a PRD P0 and launch-week distribution/retention signal. |
| 3 | Confirm canonical/indexing policy for calculator routes | Content/SEO + Owner decision | Day 0-7 | High | Low/Medium | High if wrong | SEO GO is blocked by owner approval and tool-route indexability choice; wrong indexing can expose immature/caveated routes. |
| 4 | Tighten first-use mobile calculator path and crawlable anchors | Calculator UX + SEO | Day 7-14 | Medium/High | Medium | Low | Button-driven nav and below-fold workspace reduce crawlability and mobile task start. |
| 5 | Establish data-quality/error review loop for top calculators | Data quality | Day 7-14 | High | Medium | Medium | Early errors/unrecognized inputs should become UX/data fixes before content expansion. |

## 3. Backlog by category

### A. Content / SEO

#### SEO-1 — Owner canonical and production indexability decision
Window: Day 0-7
Priority: P0
Owner: owner + ops_bot + seo_bot
Impact: High
Effort: Low if owner decision is available; medium if build config must change
Risk: High if skipped

Problem:
- Current static output uses `https://palcalculator.com` as canonical origin.
- SEO audit says SEO GO remains blocked until owner explicitly approves canonical origin and production indexing policy.
- Calculator routes currently have `noindex,follow` and are absent from sitemap.

Acceptance criteria:
- Written owner decision recorded: final canonical origin is either `https://palcalculator.com` or another exact origin.
- Apex/www redirect policy recorded: preferred apex primary with www redirect, or explicit alternative.
- Decision recorded for calculator tool routes:
  - Keep noindex until more QA/data confidence, or
  - Change approved tool routes to `index,follow` and add to sitemap.
- If origin differs from current canonical, route HTML, sitemap, and robots are regenerated and rechecked.
- No GSC/Bing submission happens until this decision is recorded.

Owner decisions needed:
- Is `https://palcalculator.com` final canonical production origin?
- Should calculator routes become indexable now, or stay `noindex,follow` while data/QA grows?

#### SEO-2 — GSC/Bing setup and sitemap submission path
Window: Day 0-14
Priority: P0/P1 depending launch approval
Owner: owner + ops_bot/seo_bot
Impact: High
Effort: Medium
Risk: Medium; public submission without approval is not allowed

Problem:
- Webmaster audit found no proven local GSC/Bing property, verification record, or submission.
- Review plan requires organic discovery data before judging no-traffic vs no-indexing.

Acceptance criteria:
- Owner chooses: agent-managed verification, owner-manual verification, or deferred webmaster setup.
- GSC property and Bing Webmaster property are verified, or a deferral is recorded.
- Sitemap submission occurs only after canonical/indexing approval.
- First weekly report labels search data as `verified`, `missing`, `manual_deferred`, or `waiting_platform_refresh`.

Owner decisions needed:
- Who owns GSC/Bing access and verification?
- DNS TXT vs HTML/meta verification method?
- Submit sitemap immediately after approval, or defer?

#### SEO-3 — Add visible FAQ/AEO blocks only after route/index decision
Window: Day 14-30
Priority: P1
Owner: copy_bot + seo_bot + frontend_bot
Impact: Medium
Effort: Medium
Risk: Medium if thin/overclaiming

Acceptance criteria:
- First FAQ blocks are added only to routes with real visible calculator utility.
- Questions answer concrete user tasks: breeding pair, route solver, IV/stat caveats, passive inheritance caveats, Palworld 1.0 data freshness.
- FAQPage schema is added only when the Q&A is visible on-page.
- Copy avoids official, guaranteed, perfect, or always-current claims.
- Each FAQ links to `/data-sources/` where appropriate.

Owner decisions needed:
- Whether to prioritize breeding calculator, route calculator, or Palworld 1.0 route for the first FAQ expansion.

### B. Calculator UX

#### UX-1 — Add share/copy result URL state
Window: Day 0-7
Priority: P0
Owner: frontend_bot + product_bot
Impact: High
Effort: Medium
Risk: Medium due privacy-sensitive state

Problem:
- QA found no visible Copy/Share controls or result URL state, despite PRD P0 requirement and hero copy.

Acceptance criteria:
- Breeding, route, IV/stats, and passive pages expose a clear Copy/Share action where a result exists.
- URL state uses stable Pal slugs/settings and does not include uploaded save files, raw private data, secrets, or full analytics payloads.
- Owned-Pal list sharing is explicit: if included, UI warns users not to share if they consider that state private; otherwise omit owned lists from share state by default.
- Copy success/failure feedback is visible on mobile and desktop.
- `share_copy` / `copy_result` and `share_open` / `share_result` event hooks fire in the privacy-safe event queue or selected provider.
- Share/result paths remain noindex or 404 as intended; canonical remains base route unless later promoted.

Owner decisions needed:
- Should owned-Pal lists ever be encoded in share URLs, or should first iteration share only target/result summary?
- Exact event names to standardize: review plan uses `share_copy`/`share_open`; route contract uses `copy_result`/`share_result`. Choose one mapping or alias both.

#### UX-2 — Make first calculator action easier above mobile fold
Window: Day 7-14
Priority: P1
Owner: frontend_bot + product_bot
Impact: Medium/High
Effort: Medium
Risk: Low

Problem:
- QA found no horizontal overflow, but calculator workspace can sit below the first mobile fold because hero/status content takes the top screen.

Acceptance criteria:
- On 390px mobile, primary page route shows a visible calculator start control or direct jump CTA without requiring long scrolling.
- Homepage primary CTA routes to the flagship tool selected for launch-week review, likely breeding or route calculator.
- Tool pages keep trust/data badge visible but do not let long explanatory copy bury the first input.
- Manual/mobile QA screenshot verifies no horizontal overflow and first-use path is visible/tappable.

Owner decisions needed:
- Which flagship outcome leads the hero for the first 14 days: breeding calculator or route solver?

#### UX-3 — Convert primary internal navigation to crawlable anchors
Window: Day 7-14
Priority: P1
Owner: frontend_bot + seo_bot
Impact: Medium
Effort: Low/Medium
Risk: Low

Problem:
- QA/SEO reported header nav, brand, hero CTAs, and cards are button-driven rather than real anchors.

Acceptance criteria:
- Header, brand/home link, homepage tool cards, hero CTAs, footer legal/trust links, and related-tool CTAs render as `<a href="/.../">` or equivalent crawlable links.
- Client-side enhancement may intercept clicks, but href remains correct.
- Keyboard accessibility remains intact.
- Static route files and sitemap continue to pass build checks.

Owner decisions needed:
- None, unless design wants different card hierarchy.

#### UX-4 — Improve validation feedback for passive and stat edge cases
Window: Day 14-30
Priority: P2
Owner: frontend_bot + backend_bot
Impact: Medium
Effort: Medium
Risk: Low

Acceptance criteria:
- Unknown passive tokens are shown explicitly with suggestions or “unrecognized” feedback.
- Extreme impossible stat values produce an explicit impossible/out-of-range warning, not only a broad caveat label.
- Errors map to existing contract codes: `INVALID_PASSIVE`, `IMPOSSIBLE_STAT_VALUE`, `INVALID_STAT`, or equivalent.
- Analytics/error hooks bucket these cases without storing raw input strings.

Owner decisions needed:
- Threshold policy for “impossible” vs “high band / check modifiers”.

### C. Data quality

#### DATA-1 — Weekly data version and calculator fixture audit
Window: Day 0-30 recurring weekly
Priority: P1
Owner: backend_bot/data owner + product_bot
Impact: High
Effort: Medium
Risk: Medium if data goes stale

Acceptance criteria:
- Weekly check records current `dataVersion`, last updated date, included domains, unsupported domains, and checksum/build evidence.
- Fixture tests cover at minimum: valid parent-to-child, reverse parents for a known target, target already owned, no route, invalid Pal, IV/stat caveat, passive caveat.
- `/data-sources/` matches current data files and caveats.
- Any mismatch becomes a repair task before indexation/content expansion.

Owner decisions needed:
- Who owns Palworld patch monitoring and source verification?
- How quickly should data be refreshed after a Palworld patch?

#### DATA-2 — Launch error review loop
Window: Day 7-30, after analytics/event queue exists
Priority: P1
Owner: product_bot + frontend_bot + backend_bot
Impact: High
Effort: Low/Medium
Risk: Low

Acceptance criteria:
- Daily days 1-7, then weekly: review top `tool_error` codes by route and device.
- Segment recoverable validation errors vs unrecoverable runtime/data errors.
- Convert high-frequency errors into backlog items with route, reproduction, acceptance criteria, and owner.
- Error report excludes raw owned-Pal lists, raw pasted text, IPs, emails, or full share URLs.

Owner decisions needed:
- Who is the daily launch-week error reviewer?

### D. Compliance / trust

#### TRUST-1 — Analytics privacy disclosure before provider activation
Window: Day 0-7 if analytics is enabled; otherwise Day 0 decision to defer
Priority: P0
Owner: owner + compliance_bot + frontend_bot
Impact: High
Effort: Low/Medium
Risk: High if skipped

Problem:
- Privacy page currently says provider is pending; enabling analytics without updating privacy/consent posture would violate the project’s own compliance gate.

Acceptance criteria:
- Owner chooses analytics provider or explicit no-analytics MVP.
- Privacy page names provider, event categories, retention period, cookie/local-storage behavior, and opt-out/consent posture where needed.
- No analytics payload includes raw owned-Pal lists, save data, full share URLs, IP addresses, emails, tokens, cookies, or precise fingerprinting fields beyond provider defaults.
- Internal QA filtering is documented.

Owner decisions needed:
- Provider: Cloudflare Web Analytics, Plausible, GA4, Clarity, Umami/PostHog, or no analytics.
- Retention period and cookie/consent stance.

#### TRUST-2 — Keep unofficial/caveated claims intact during SEO/content growth
Window: Day 0-30
Priority: P1
Owner: copy_bot + compliance_bot + seo_bot
Impact: Medium/High
Effort: Low
Risk: Medium

Acceptance criteria:
- New copy does not claim official affiliation, endorsement, guaranteed accuracy, perfect routes, deterministic passive inheritance, or always-current data.
- Every expanded route keeps data version/source/caveat access visible.
- Any use of official-looking art, screenshots, icons, logos, ads, affiliate links, accounts, uploads, or comments triggers compliance review before release.

Owner decisions needed:
- None for conservative copy; owner approval needed for any monetization/assets/public community features.

### E. Analytics dependency

#### AN-1 — Select provider and normalize event taxonomy
Window: Day 0-7
Priority: P0
Owner: owner + product_bot + ops_bot/frontend_bot
Impact: Very high
Effort: Medium
Risk: High if wrong provider/privacy choice

Acceptance criteria:
- Provider or no-analytics decision is documented.
- Event names are normalized across docs:
  - `page_view`
  - `tool_start`
  - `tool_success`
  - `tool_error`
  - share/copy events, with selected names and any aliases documented
  - `internal_nav` and `outbound_click` if included in v1
- Required properties are privacy-safe: route/tool/data version/device/referrer host/buckets/error codes only.
- Internal QA filtering is available or clearly marked missing.
- A launch dashboard or report template can show sessions, page views, tool success, tool errors, share/copy, channel, route, and device.

Owner decisions needed:
- Provider and event naming standard.
- Whether to use cookieless analytics or consent-gated analytics.

#### AN-2 — Production event verification checklist
Window: Day 0-14
Priority: P1
Owner: frontend_bot + ops_bot + qa_bot
Impact: High
Effort: Medium
Risk: Medium

Acceptance criteria:
- On production, verify a test session triggers `page_view`, `tool_start`, `tool_success`, `tool_error`, and share/copy events without sensitive payloads.
- Verification output includes route, event name, safe properties, and pass/fail; no secrets or raw private inputs.
- Known internal QA traffic is tagged or filterable.
- If provider is deferred, first-party local/debug queue is verified enough for QA but product decisions are labeled `missing analytics`.

Owner decisions needed:
- Whether provider setup is agent-managed or owner-manual.

### F. Growth tests

#### GROW-1 — Controlled launch announcement and referral ledger
Window: Day 7-14 after analytics/search readiness
Priority: P1
Owner: owner + growth/copy_bot + product_bot
Impact: Medium/High
Effort: Medium
Risk: Medium if public claims are loose

Acceptance criteria:
- One approved channel/placement is selected, e.g. relevant Palworld community, social post, directory, or owner-controlled channel.
- Copy is caveated: fan-made, unofficial, Palworld 1.0 public-web data, no guaranteed perfect results.
- UTM tags avoid usernames, private group names, emails, tokens, or private route state.
- Referral ledger records date, channel, URL/host, message variant, owner approval, and results when available.
- No public posting occurs without owner approval.

Owner decisions needed:
- Which public/community channels are approved?
- Who posts: owner manually or agent-assisted draft only?

#### GROW-2 — Route-specific headline/CTA A/B-style copy test without heavy infra
Window: Day 14-30
Priority: P2
Owner: product_bot + copy_bot + frontend_bot
Impact: Medium
Effort: Low/Medium
Risk: Low

Acceptance criteria:
- Choose one route: breeding or route solver.
- Test one low-risk copy/CTA variant for a full week or until minimum signal is reached.
- Do not introduce misleading claims.
- Track route page view to tool_start/tool_success and share/copy rate.
- Keep only the variant if it improves meaningful tool engagement without increasing errors/compliance risk.

Owner decisions needed:
- Which route is first test route?
- Whether lightweight A/B is acceptable or variants should be sequential/manual only.

## 4. 7/14/30-day execution plan

### Day 0-7: measurement and P0 usability gate

Goal: be able to measure launch health and remove the most obvious P0 share/observability gaps.

Must-do tasks:
1. AN-1 — select analytics/no-analytics and normalize taxonomy.
2. TRUST-1 — update privacy posture before enabling provider, or record no-analytics/deferred decision.
3. SEO-1 — record canonical and calculator indexability decision.
4. UX-1 — add/verify share/copy result URL state and events.
5. AN-2 — verify production events or first-party queue and internal QA filter.
6. DATA-1 — run baseline data version/fixture audit.

Day-7 report must include:
- Data confidence: `verified`, `partial`, `missing`, or `waiting_platform_refresh` by source.
- Availability and smoke status.
- Valid sessions/page views if analytics exists.
- Tool starts/success/errors by route if analytics exists.
- Share/copy counts if implemented.
- Canonical/indexability decision status.
- P0 issues and next owner.

Do not do in Day 0-7:
- Do not submit to GSC/Bing without owner approval.
- Do not index calculator routes unless owner accepts caveated MVP data scope.
- Do not start broad public promotion before measurement/privacy/search posture is ready.

### Day 8-14: first conversion and search-readiness iteration

Goal: improve first-use path and prepare/execute controlled discovery only after gates.

Must-do tasks:
1. UX-2 — improve mobile first calculator action and flagship CTA.
2. UX-3 — convert primary navigation to crawlable anchors.
3. SEO-2 — verify/submit GSC/Bing if approved, or record manual/deferred status.
4. DATA-2 — start error review loop from analytics or QA event output.
5. GROW-1 — one controlled launch announcement only after owner approval.
6. Decide first content/FAQ expansion candidate based on early route usage or strategic flagship choice.

Day-14 decision rules:
- If traffic exists but calculator engagement is below 25-35%, prioritize copy/CTA/mobile tool visibility over content expansion.
- If tool success is healthy but share/copy is below 3%, iterate share affordance and result summary.
- If one tool clearly outperforms others, make it the homepage primary path for the next period.
- If analytics/search are still missing, do not infer demand failure; label as instrumentation/setup gap.

### Day 15-30: validate intent fit and choose iterate/scale/hold

Goal: use evidence to decide whether to expand SEO, deepen flagship UX, or pause.

Must-do tasks:
1. SEO-3 — add FAQ/AEO only to the winning or strategically selected route.
2. UX-4 — improve passive/stat validation based on actual or QA-observed friction.
3. DATA-1/DATA-2 — continue weekly data/version/error audits.
4. GROW-2 — run one low-risk headline/CTA test if measurement is ready.
5. Prepare Day-30 decision note: Kill / Iterate / Scale / Continue monitoring.

Day-30 scale criteria:
- Weekly successful calculator sessions are growing or stable at a useful baseline.
- Tool success rate is near or above 75%, or route solver has clear caveated success with manageable error rate.
- Unrecoverable tool errors are below 5%.
- At least one retention/share/referral/search signal is positive.
- No unresolved P0 compliance/privacy/indexability issue.

Day-30 iterate criteria:
- Some impressions/traffic exist, but CTR/engagement/share is weak.
- One tool works but hub positioning is diluted.
- Errors/validation friction explain conversion loss.

Day-30 hold/kill/pause criteria:
- After verified analytics, search setup, and reasonable promotion, there is no qualified traffic and no SEO signal.
- Traffic arrives but almost nobody uses calculators after two focused iterations.
- Maintenance/compliance burden exceeds likely upside.
- Palworld data quality cannot be maintained safely without overclaiming.

## 5. Owner decision register

| Decision | Needed by | Options | Default recommendation | Blocks |
|---|---|---|---|---|
| Final canonical origin | Day 0-7 | `https://palcalculator.com` or alternate exact origin | Approve apex `https://palcalculator.com` if domain ownership/deploy are confirmed | SEO GO, GSC/Bing submission, sitemap trust |
| Calculator route indexability | Day 0-7 | Keep `noindex,follow`; or index selected/all tool routes | Keep noindex until analytics/share/canonical gates pass; then index breeding + route first if owner accepts data caveats | SEO growth |
| Analytics provider | Day 0-7 | Cloudflare Web Analytics, Plausible, GA4, Clarity, Umami/PostHog, no analytics | Prefer privacy-light/cookieless provider or explicit no-analytics if owner wants conservative launch | Data review, KPI judgment |
| Event naming | Day 0-7 | `share_copy/share_open`, `copy_result/share_result`, or alias both | Alias both internally; report as `share_copy` and `share_open` per review plan | Dashboard consistency |
| Share URL privacy scope | Day 0-7 | Include target/settings only; include owned list with warning; no share state | Start with target/settings/result summary only; do not include owned list by default | Share UX |
| Flagship tool | Day 7-14 | Breeding calculator, route solver, IV/stat, passive | Breeding + route, with route as wedge if UX is clear | Homepage CTA, growth copy |
| Public promotion channel | Day 7-14 | Reddit/X/Discord/directory/owner channel/defer | One owner-approved low-risk channel with UTM/referral ledger | Growth test |
| Data maintenance owner | Day 7-14 | backend/data owner, product owner, owner manual | Assign a named data owner and weekly patch check | Trust/data quality |

## 6. Acceptance checklist for this backlog artifact

- [x] Reads review-plan and product/PRD artifacts.
- [x] Defines no-regret first iteration tasks prioritized by impact/effort/risk.
- [x] Separates tasks into content/SEO, calculator UX, data quality, compliance/trust, analytics dependency, and growth tests.
- [x] Includes acceptance criteria for each task.
- [x] Includes owner decisions needed.
- [x] Includes concrete 7/14/30-day execution windows.
- [x] Includes top 5 priorities.
- [x] Does not require production code changes in this task.

Final line: [DONE]
