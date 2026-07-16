# PalCalculator Post-launch Data Review Plan

Project: PalCalculator
Production URLs:
- https://palcalculator.com
- https://www.palcalculator.com
Plan date: 2026-07-16
Owner: review_bot
Status: DONE — actionable v1 plan; do not treat as a data-backed review until analytics/search data sources are connected.

## 0. Ground rules and current context

This plan is for the live no-login calculator site after launch. It defines what to measure, how to classify early outcomes, and when to iterate/kill/scale.

Current launch facts from upstream artifacts:
- Production apex and www are live and smoke checks pass.
- Static SEO routes, sitemap, robots, legal/trust pages, and 404 behavior have prior verification evidence.
- Current site is Cloudflare-first/static and has no login, payments, server-side save upload, or account wall.
- First-party in-browser event hooks exist in source as `window.palcalculatorEvents`, but an owner-approved analytics destination/provider is still pending.
- Search-engine submission, GSC/Bing verification, analytics vendor activation, and public promotion must not be performed from this plan without owner approval.

Non-goals for this task:
- Do not submit to GSC/Bing.
- Do not change production DNS, deploy settings, or public indexability.
- Do not expose secrets, raw logs, tokens, or user-provided gameplay state.

## 1. North-star metric and launch-week KPI targets

### North-star metric

Weekly successful calculator sessions from qualified discovery traffic.

Definition:
- A successful calculator session is a session with at least one `tool_success` event on a calculator page.
- Qualified discovery traffic means traffic from organic search, referral, social/community, AI/search discovery, or direct visits that land on the homepage or calculator-related routes and are not obvious bot/internal QA traffic.
- Because PalCalculator is a no-login utility, success is measured by completed tool outcomes and return/share signals, not signups or revenue.

Recommended primary dashboard card:
- `weekly_successful_calculator_sessions = count_distinct(session_id where event_name = tool_success and channel != internal_qa)`

### Launch-week KPI targets

These are v1 targets for the first 7 days after analytics is connected. Mark all as `[待确认]` until a real analytics provider and bot/internal traffic filtering are active.

| Metric | Target for launch week | Why it matters | Evidence source |
|---|---:|---|---|
| Site availability | >= 99% successful uptime checks for apex, www, sitemap, robots | Production must stay reachable before interpreting product data | Cloudflare/uptime probe |
| Valid page views | >= 100 human-like page_view events | Minimum signal to distinguish no-demand vs no-instrumentation | Analytics provider |
| Calculator engagement rate | >= 35% of valid sessions with at least one calculator interaction/success | Confirms users understand how to use the tool | Analytics event funnel |
| Tool success rate | >= 75% of calculator attempts end in tool_success, excluding validation errors caused by invalid Pal names | Confirms core calculator utility works | `tool_success` / `tool_error` |
| Error rate | <= 5% unrecoverable tool_error events | Detects broken data, route, formula, or JS failures | Event logs + console/error logs |
| Share/copy intent | >= 3% of successful sessions fire share_copy or share_open | Early retention/distribution signal for no-login utility | `share_copy`, `share_open` |
| Return usage | >= 8% of users/sessions return within 7 days, if privacy-safe visitor/session measurement is available | Indicates utility value beyond one-off curiosity | Cookieless/consented analytics only |
| Organic discovery | Any GSC impressions by day 7 after submission/verification; do not require clicks yet | New domains often need indexing latency | GSC after approved setup |
| Brand/direct validation | >= 10 direct or branded visits after promotion | Confirms users can recall/find the site | Analytics + referrer |

Guardrail targets:
- 0 P0 privacy/compliance incidents.
- 0 official/endorsed/guaranteed claims introduced in analytics labels, page copy, schema, or campaign copy.
- 0 event payloads containing raw owned-Pal lists, save-file contents, exact private route state, IP addresses, emails, tokens, or personal identifiers.

## 2. Event taxonomy for the current no-login calculator site

### 2.1 Naming and shared properties

Use lower_snake_case event names. Keep event payloads small, aggregated, and privacy-safe.

Required common properties:
- `page_path`: current path, e.g. `/breeding-calculator/`.
- `page_slug`: stable route key, e.g. `breeding`, `route`, `iv`, `stats`, `passives`, `one0`, `home`, `privacy`, `terms`, `data_sources`.
- `tool_type`: only for tool events; one of `breeding`, `route`, `iv`, `stats`, `passive`, `one0`.
- `data_version`: current dataset version, e.g. `palworld-1-0_public-web_2026-07-16_r1` when available.
- `device_type`: `desktop`, `mobile`, `tablet`, `unknown`.
- `referrer_host`: host only, not full URL with query strings.
- `session_id`: privacy-safe analytics session id if provider supports it; do not create durable cross-site identity unless disclosed/consented.
- `internal_qa`: boolean flag or filtered view for known internal tests, if feasible.

Do not send:
- Raw owned-Pal lists.
- Raw Palbox/save-file contents.
- Exact pasted input strings.
- Full share URL state.
- IP address, email, account identifier, tokens, cookies, or precise fingerprinting fields.

### 2.2 Core event list

| Event | When it fires | Required properties | Optional safe properties | Notes |
|---|---|---|---|---|
| `page_view` | On initial route load and client-side route change | `page_path`, `page_slug`, `device_type`, `referrer_host` | `canonical_url`, `robots_directive` | Must fire for homepage, calculator routes, data/legal pages. |
| `tool_start` | User changes input or explicitly starts a calculator flow | `tool_type`, `page_slug`, `data_version` | `input_mode`, `has_owned_list`, `max_generation_bucket` | Avoid firing too often; debounce or only count first interaction per tool/session. |
| `tool_success` | Calculator returns a usable result | `tool_type`, `page_slug`, `data_version`, `result_type`, `duration_bucket` | `result_count_bucket`, `generation_bucket`, `missing_count_bucket`, `caveat_count_bucket` | Buckets only; no raw result details needed. |
| `tool_error` | Calculator returns an error, unavailable state, validation failure, or runtime failure | `tool_type`, `page_slug`, `data_version`, `error_code`, `recoverable` | `input_mode`, `duration_bucket` | Use stable error codes such as `INVALID_PAL`, `NO_ROUTE`, `FORMULA_UNSUPPORTED`, `RUNTIME_ERROR`. |
| `share_copy` | User clicks copy/share result URL | `tool_type`, `page_slug`, `result_type` | `copy_status` = `success`/`fallback`/`failed` | Do not send the generated URL or encoded state. |
| `share_open` | User opens a share URL or clicks the open-share link | `tool_type`, `page_slug`, `result_type` | `source` = `button`/`shared_url` | If `/share/*` remains 404/noindex, track only the UI open action or future share route open after implementation. |
| `outbound_click` | User clicks an external source/reference/community link | `page_slug`, `outbound_host`, `link_context` | `tool_type` | Host only; do not store full query-bearing URL. |
| `canonical_check` | Synthetic/ops check verifies canonical URL, robots, sitemap, or redirect | `check_type`, `url`, `status` | `http_status`, `canonical_url`, `robots_directive` | Ops event, not user analytics; useful for launch monitoring. |
| `site_search` | If a site search/filter box is added later | `page_slug`, `query_length_bucket`, `result_count_bucket` | `search_scope` | Do not store raw search query if it may contain pasted private state. |
| `internal_nav` | Optional: click from one internal route to another | `from_page`, `to_page`, `link_context` | `tool_type` | Helps identify whether homepage cards/CTAs drive tool usage. |

### 2.3 Current source-event mapping

The current source search shows these first-party events are already referenced:
- `page_view`
- `tool_success`
- `tool_error`
- `share_copy`
- `share_open`

Action required before data review:
- Decide whether `window.palcalculatorEvents` should remain a local debug queue, be forwarded to a provider, or be replaced by GA4/Plausible/Cloudflare Web Analytics/other.
- Add/confirm `tool_start`, `outbound_click`, and `internal_nav` if the owner wants a complete launch funnel.
- Document provider, event retention, cookie/consent behavior, and opt-out in `/privacy/` before enabling non-essential analytics.

## 3. Funnel and dashboard views

### 3.1 Minimum no-login funnel

1. `page_view` on entry route.
2. `tool_start` or first input interaction.
3. `tool_success` or `tool_error`.
4. `share_copy` / `share_open` or internal navigation to another tool.
5. Return session within 7 days, if privacy-safe measurement exists.

Primary funnel breakdowns:
- By route: homepage, breeding, route, IV, stats, passive, Palworld 1.0 entry.
- By channel: organic, direct, referral, social/community, AI/search discovery, internal QA.
- By device: mobile vs desktop.
- By data version: current build vs future updates.
- By error code: invalid input vs unsupported data vs runtime failure.

### 3.2 Tool-specific review cards

Breeding calculator:
- Success sessions.
- Parent-to-child vs target-to-parents usage split.
- Result-count buckets for reverse lookup.
- Invalid Pal errors.

Route calculator:
- Success sessions.
- Generation bucket: 0, 1, 2, 3, 4+.
- Missing-Pal bucket: 0, 1-2, 3-5, 6+.
- No-route/error rate.

IV/stats calculators:
- Success sessions.
- Confidence bucket.
- Formula unsupported/error rate.
- Extreme/out-of-range validation errors.

Passive planner:
- Success sessions.
- Recognized passive count bucket.
- Unrecognized passive rate.
- Follow-through to route calculator.

Share/copy:
- Share action rate after success.
- Copy fallback/error rate.
- Shared URL opens if future share routing supports it.

## 4. Data four states and response playbooks

### State A — No traffic

Definition:
- Production uptime is healthy, but analytics shows fewer than 20 valid human-like page views in 7 days, and/or GSC has no impressions after approved verification and normal indexing latency.

Likely causes:
- Site not submitted/verified yet.
- Calculator pages intentionally `noindex,follow` and absent from sitemap.
- No promotion or backlinks.
- Canonical/indexing approval still pending.
- Analytics not connected or blocked.

How to diagnose:
- Verify analytics is installed and firing on live production with a test page_view.
- Verify Cloudflare/uptime logs show real HTTP requests.
- Check robots/sitemap/canonical against the owner-approved origin.
- After owner approval, verify GSC/Bing status and sitemap fetch, but do not submit from this task.

Actions:
- Ops: connect approved analytics or confirm explicit no-analytics decision.
- SEO: after owner approval, verify GSC/Bing, submit sitemap, and decide whether calculator routes stay noindex or become indexable.
- Product/marketing: make one controlled launch announcement in an approved channel and track referral tags.

Decision:
- Do not kill in first 7 days if no promotion/search setup happened.
- If still no traffic by day 30 after search setup + at least 3 relevant community/referral placements, consider kill or major repositioning.

### State B — Traffic but no usage

Definition:
- >= 100 valid page views in a 7-day window, but < 20% of sessions produce `tool_success` and tool_start/success are low.

Likely causes:
- Landing page promise is unclear.
- Calculator UI is too far below fold on mobile.
- Primary navigation/CTAs do not drive users into tools.
- Users expect a different Palworld feature or exact data not provided.
- Tool routes remain noindex and organic lands mostly on homepage/legal/data pages.

How to diagnose:
- Compare landing route to tool_start rate.
- Segment by mobile vs desktop.
- Review top referrer/query intent if available.
- Inspect scroll/click behavior only if privacy-safe and disclosed.

Actions:
- Product: tighten homepage hero and route cards around the highest-intent use case: Palworld breeding calculator and route planning.
- Frontend: ensure calculator workspace/primary CTA is visible and tappable on mobile.
- SEO: add visible FAQ/AEO content to explain what each calculator does, without overclaiming accuracy.
- Ops: confirm `tool_start` fires on first meaningful interaction, not only final result.

Decision:
- Day 7: iterate copy/CTA if engagement < 20%.
- Day 14: if engagement remains < 25% after copy/CTA fixes, prioritize one flagship tool route instead of broad hub messaging.
- Day 30: if traffic quality is good but usage remains < 20%, kill or pivot positioning.

### State C — Usage but no retention/share

Definition:
- Tool success rate is healthy (>= 50-75%), but share_copy/share_open is < 3% and return usage is < 8% over 7 days.

Likely causes:
- One-off utility with no reason to come back.
- Share URL is not visible/trustworthy or does not preserve enough useful state.
- Results are useful but not socially shareable.
- Missing update cadence or patch freshness reason to revisit.

How to diagnose:
- Compare share rate by tool type.
- Check copy failure/fallback rate.
- Review whether result pages/URLs are usable without private data leakage.
- Segment return usage by organic/referral/social.

Actions:
- Product: make result summaries more share-worthy while keeping encoded state privacy-safe.
- Frontend: improve share CTA label, status feedback, and mobile placement.
- SEO/content: publish/update data freshness notes and patch-response policy on `/data-sources/`.
- Ops: track share_copy status and shared URL opens without storing raw URL state.

Decision:
- Day 14: iterate share affordance if success is healthy but share < 3%.
- Day 30: if no retention/share but organic tool usage grows, continue SEO utility path; if neither grows, consider kill/pivot.

### State D — Usage with SEO signals

Definition:
- Tool_success events are growing, GSC/Bing shows impressions/clicks for relevant Palworld calculator queries, referral/social mentions appear, and errors remain low.

Likely causes:
- Search intent matches current utility.
- Data/version caveats build trust.
- Users find calculator outputs useful enough to return/share.

How to diagnose:
- Track queries and landing pages by impressions, clicks, CTR, and position.
- Compare organic landing pages to downstream tool_success.
- Watch error rate and no-result states by route.
- Monitor compliance/copy for overclaim risk as SEO pages expand.

Actions:
- SEO: after owner approval, decide whether noindexed calculator pages should become indexable and enter sitemap.
- Product: prioritize top-used tool improvements and FAQ sections.
- Content: expand only pages with unique utility and visible data/caveats; avoid thin programmatic pages.
- Ops: add weekly uptime/error/data-version checks.

Decision:
- Scale if day-30 organic clicks, tool_success, and error guardrails are all positive.
- Iterate if impressions grow but CTR/tool usage is weak.
- Keep conservative if compliance/data-source uncertainties remain.

## 5. Channel attribution plan

### 5.1 Channel definitions

| Channel | Rule | Examples | Required notes |
|---|---|---|---|
| Organic search | Referrer host from known search engines or GSC/Bing query/click data | Google, Bing, DuckDuckGo | Requires approved GSC/Bing setup for query data. |
| Direct | No referrer and no campaign tag | Typed URL, bookmark, copied URL | Separate likely direct from internal QA where possible. |
| Referral | Non-search, non-social external websites | gaming blogs, wiki pages, tools directories | Store host only, not full URL with personal query params. |
| Social/community | Known social/community hosts | Reddit, X/Twitter, Discord web, YouTube, TikTok, Steam community | Public posting requires owner approval. |
| AI/search discovery | Referrers or campaign tags from AI answer/search surfaces | Perplexity, ChatGPT browsing links, Gemini, Copilot, You.com, phind | Use `utm_source=ai_*` only for links the owner controls; otherwise infer by referrer host. |
| Internal/QA | Known internal IP/probe/user-agent/campaign flag | launch smoke tests, QA browsers, uptime checks | Exclude from KPI denominators. |

### 5.2 UTM and campaign rules

Use UTM tags only for owner-approved public promotion. Recommended fields:
- `utm_source`: `reddit`, `x`, `discord`, `youtube`, `directory`, `ai_search`, etc.
- `utm_medium`: `social`, `community`, `referral`, `owned`, `ai_discovery`.
- `utm_campaign`: `launch_week`, `palworld_1_0`, or a short approved campaign name.
- `utm_content`: optional placement label, e.g. `breeding_thread`, `route_demo`.

Do not put usernames, private group names, emails, tokens, or raw user state into UTM fields.

### 5.3 Attribution reports

Daily launch report:
- Sessions by channel.
- Tool_success by channel.
- Tool_success rate by channel.
- Top 10 referrer hosts.
- Error rate by channel.

Weekly report:
- Channel trend vs previous period.
- Best landing route per channel.
- Share/copy rate per channel.
- Organic query/impression/click summary if GSC/Bing is approved and connected.
- Recommendation: stop, iterate, or scale by channel.

## 6. 7-day, 14-day, and 30-day iterate/kill/scale checkpoints

### Day 0-1 setup checklist

Ops:
- Confirm live apex/www uptime checks.
- Confirm analytics provider decision: GA4, Plausible, Cloudflare Web Analytics, other, or explicit no-analytics.
- If analytics is enabled, confirm `/privacy/` names provider, retention, cookie/local storage behavior, and event categories.
- Verify `page_view`, `tool_success`, `tool_error`, `share_copy`, and `share_open` fire on production without sensitive payloads.
- Set up internal QA filtering.

SEO:
- Confirm owner-approved canonical origin and indexability policy.
- Only after approval, verify GSC/Bing and sitemap. Do not submit without explicit approval.
- Record whether calculator routes remain `noindex,follow` or are moved to `index,follow`.

Product:
- Choose one flagship outcome for the first review: likely breeding calculator or route solver.
- Define who reviews daily errors and who approves public promotion.

### Day 7 checkpoint — launch health and first signal

Required inputs:
- Uptime/smoke report.
- Valid page views and sessions.
- Tool funnel by route.
- Error codes and JS/runtime issues.
- Share/copy counts.
- Initial channel/referrer split.
- GSC/Bing status if approved.

Iterate if:
- Traffic exists but calculator engagement < 35%.
- Mobile usage is materially worse than desktop.
- `tool_error` > 5% unrecoverable or `INVALID_PAL`/unrecognized passive errors are common.
- Share/copy is present but copy fails or fallback is frequent.

Scale if:
- >= 100 valid page views, >= 35% calculator engagement, >= 75% tool success, and no P0 compliance/privacy issues.
- At least one channel produces repeatable qualified users.

Kill/pause only if:
- Production is unstable, compliance/privacy issue appears, or owner withdraws launch approval.
- Do not kill for low traffic if search/promotion setup was not completed.

Day 7 actions:
- Fix instrumentation gaps before judging product performance.
- Prioritize one or two P1 UX/copy improvements, not broad expansion.
- Write a short launch-week report with data confidence labels: `verified`, `partial`, `missing`, `waiting_platform_refresh`.

### Day 14 checkpoint — intent fit and early retention

Required inputs:
- Two-week sessions and tool_success trend.
- Channel quality and top landing pages.
- Share/copy and return usage.
- Search impressions/clicks if approved and connected.
- Top error/validation buckets.

Iterate if:
- Organic/referral traffic exists but CTR or tool engagement is weak.
- Tool success is good but share/return signals are low.
- One calculator clearly outperforms others.

Scale if:
- Tool_success grows week-over-week.
- Share/copy >= 3% of successful sessions or return usage >= 8%.
- GSC impressions begin for relevant Palworld calculator terms.
- Error/compliance guardrails stay clean.

Kill/pivot if:
- After analytics/search/promotion are verified, two weeks show meaningful traffic but < 20% engagement and no obvious UX/copy fix.
- Referrers/queries consistently indicate a different demand than the current product serves.

Day 14 actions:
- If breeding/route wins, make it the homepage primary path.
- Add FAQ/AEO sections to the winning route if owner approves SEO expansion.
- Improve share result copy/state if usage is good but sharing is weak.

### Day 30 checkpoint — Kill / Iterate / Scale decision

Required inputs:
- 30-day sessions, tool_success, tool_error, share/copy, return usage.
- Channel and campaign performance.
- GSC/Bing impressions/clicks/queries/CTR/position, if approved.
- Maintenance cost and P0/P1 bug count.
- Compliance/SEO status and owner approvals.

Scale if all/most are true:
- Sustained organic/referral/social/AI discovery signal.
- Weekly successful calculator sessions are growing or stable at a useful baseline.
- Tool success rate >= 75% and unrecoverable errors <= 5%.
- At least one retention/share signal is positive.
- No unresolved P0 compliance/privacy/indexability issue.

Scale actions:
- Make approved calculator routes indexable and add to sitemap if owner accepts data/caveat scope.
- Add route-specific FAQs and schema only where visible content exists.
- Expand unique tool pages only where data supports unique value.
- Start a controlled backlink/community outreach plan.

Iterate if:
- There are impressions or traffic, but CTR/engagement/share is weak.
- One tool works but the hub positioning is diluted.
- Errors/validation friction explain conversion loss.

Iterate actions:
- Reposition around the highest-performing use case.
- Improve validation for unknown passives/impossible stats.
- Tighten homepage CTAs and mobile above-fold tool access.
- Improve data freshness and correction workflow copy.

Kill/pause if:
- After verified analytics, search setup, and reasonable promotion, there is no qualified traffic and no SEO signals.
- Traffic arrives but almost nobody uses the calculators after two focused iterations.
- Maintenance/compliance burden exceeds likely upside.
- Palworld data quality cannot be maintained safely without overclaiming.

Kill/pause actions:
- Keep domain/site parked or static with no misleading claims.
- Do not leave stale indexed calculator pages with outdated data.
- Preserve learnings for the next fan-tool/site project.

## 7. Privacy and compliance constraints

Hard constraints:
- No sensitive personal data in analytics payloads.
- No server-side save-file or raw Palbox upload in MVP.
- No raw owned-Pal list, exact private route state, share URL payload, pasted text, IP address, email, token, or cookie value in events.
- No claims that the site is official, endorsed, approved, sponsored, partnered, or affiliated with Pocketpair/Palworld rights holders.
- No claims that results are guaranteed, 100% accurate, perfect, official, always current, or deterministic where data/formulas do not support that.
- Keep visible unofficial fan-tool disclaimers and data/version caveats.
- Keep `/privacy/`, `/terms/`, and `/data-sources/` accurate before enabling analytics or changing data/indexing behavior.
- If GA4, Clarity, ad pixels, remarketing, or other non-essential tracking is enabled, decide cookie/consent posture first and update privacy copy accordingly.

Safe analytics design:
- Use buckets for result counts, durations, generation counts, missing counts, and query lengths.
- Use stable error codes instead of raw error bodies.
- Store referrer host, not full referrer URL.
- Keep retention limited and documented.
- Maintain an internal QA filter so launch checks do not pollute KPI decisions.

Compliance review triggers:
- Enabling a new analytics provider.
- Making calculator routes indexable.
- Adding public share/result pages.
- Adding ads, affiliate links, Discord/newsletter/contact forms, accounts, payments, uploads, comments, or AI-generated public content.
- Adding official-looking art, screenshots, icons, logos, or copied game assets.

## 8. Concrete next actions

### Ops next actions

1. Decide and document analytics provider.
   - Options: Cloudflare Web Analytics, Plausible, GA4, other, or explicit no-analytics.
   - Acceptance: production `page_view`, `tool_success`, `tool_error`, `share_copy`, and `share_open` can be verified without sensitive payloads.

2. Create a production monitoring checklist.
   - Apex and www HTTP 200.
   - `/sitemap.xml` HTTP 200.
   - `/robots.txt` HTTP 200.
   - Unknown/share/result test paths return expected 404/noindex behavior.
   - Canonical URL matches owner-approved origin.

3. Add internal QA filtering.
   - Filter by explicit QA campaign parameter, known test user-agent, or dashboard segment.
   - Keep internal smoke tests out of KPI denominators.

4. Prepare data review dashboard.
   - Cards: sessions, page_view, tool_success, tool_error, share_copy/share_open, channel split, top referrer hosts, device split, route split.
   - Mark missing sources as `missing` rather than inventing values.

5. Do not submit to GSC/Bing or enable non-essential tracking until owner approval and privacy copy are aligned.

### SEO next actions

1. Confirm final canonical/indexing decision with owner.
   - Is `https://palcalculator.com` the final canonical production origin?
   - Should calculator routes remain `noindex,follow` initially, or become indexable after approval?

2. After approval only, set up/verify GSC and Bing Webmaster Tools and submit sitemap.
   - Track sitemap fetch, coverage/indexing, impressions, clicks, queries, and CTR.
   - Respect platform refresh delays; label as `waiting_platform_refresh` where appropriate.

3. Build an SEO decision table for tool routes.
   - Route, current robots directive, data readiness, query intent, indexability decision, needed copy/FAQ, risk notes.

4. Add FAQ/AEO content only where visible on-page answers exist.
   - Prioritize breeding and route pages if data proves usage.
   - Keep caveated language and avoid official/guaranteed claims.

5. Track AI/search discovery separately.
   - Watch referrers from AI answer/search tools where visible.
   - Use approved UTM tags for owner-controlled links.

### Product next actions

1. Pick the launch-week flagship metric owner.
   - Recommended: successful breeding/route calculator sessions.

2. Review top tool_error codes daily in week 1.
   - Convert high-frequency recoverable errors into UX improvements.
   - Prioritize unrecognized passive names and impossible/out-of-range stat validation if they appear in data.

3. Improve share/copy UX if usage exists but distribution is weak.
   - Button placement, copy feedback, state preservation, privacy-safe result summary.

4. Decide the first content/product iteration based on data state.
   - No traffic: distribution/search setup.
   - Traffic no usage: landing/CTA/tool visibility.
   - Usage no retention/share: share/results/freshness loop.
   - Usage with SEO signals: indexability/content expansion/backlinks.

5. Keep a weekly review log.
   - Include metrics, confidence state, decisions, owner, and next action.
   - Do not record secrets, raw user data, or personally identifying analytics exports.

## 9. Report templates

### Daily launch note, days 1-7

```text
Date:
Data confidence: verified / partial / missing / waiting_platform_refresh
Availability:
Valid sessions:
Page views:
Tool_success:
Tool_error rate:
Top tool:
Share_copy/share_open:
Top channels/referrers:
P0 issues:
Decision today: monitor / fix instrumentation / iterate UX / hold for owner approval
Next action + owner:
```

### Weekly decision note

```text
Period:
North-star metric:
Data confidence by source:
- Analytics:
- Search Console/Bing:
- Uptime/logs:
- Channel ledger:

Four-state classification:
- no traffic / traffic no usage / usage no retention-share / usage with SEO signals

Decision:
- kill / iterate / scale / continue monitoring

Rationale:
Actions for ops:
Actions for SEO:
Actions for product:
Risks/compliance notes:
```

## 10. Final acceptance checklist

- [x] North-star metric defined.
- [x] Launch-week KPI targets defined with `[待确认]` caveat until analytics is connected.
- [x] Event taxonomy covers `page_view`, `tool_success`, `tool_error`, `share_copy`, `share_open`, outbound, canonical/ops, and future search events.
- [x] Four data states and playbooks defined.
- [x] Channel attribution covers organic, direct, referral, social/community, and AI/search discovery.
- [x] 7-day, 14-day, and 30-day iterate/kill/scale checkpoints defined.
- [x] Privacy/compliance constraints included.
- [x] Concrete next actions for ops, SEO, and product included.

Final line: [DONE]
