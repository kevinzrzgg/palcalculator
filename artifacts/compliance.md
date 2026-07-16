# PalCalculator Compliance, IP, and Source Policy Review v1

Project: palcalculator
Market: US / English
Stage: 04-compliance
Date: 2026-07-16
Status: DONE, with owner/legal review recommended before public launch
Prepared by: compliance_bot

Important note: This report is a product compliance and launch-readiness checklist, not legal advice. Final Terms, Privacy, IP use, trademark positioning, and any monetization or affiliate disclosures should be reviewed by the owner and, where appropriate, qualified counsel.

## 1. Inputs reviewed

- `/root/projects/palcalculator/artifacts/prd.md`
- `/root/projects/palcalculator/artifacts/route-contract.md`
- `/root/projects/palcalculator/artifacts/research.md`

Upstream facts used:
- PalCalculator is planned as a fast, fan-made Palworld 1.0 calculator hub for breeding, route solving, IV/stat calculation, and passive planning.
- MVP is no-login, free, Cloudflare-first, and does not include paid subscriptions.
- MVP should avoid server-side save-file upload and prefer browser-local owned-Pal / Palbox parsing if import is added.
- Basic analytics are planned: page_view, tool_start, tool_success, tool_error, copy_result/share_result, and related non-secret properties.
- Route contract already requires `/privacy/`, `/terms/`, `/data-sources/`, fan-site disclaimer, data version labels, and noindex share/result-state URLs by default.
- Final domain is not confirmed; `{CANONICAL_ORIGIN}` remains the placeholder.

Key missing /待确认 items that do not block this stage:
- Final canonical domain and legal contact email.
- Exact analytics provider: GA4, Plausible, Cloudflare Web Analytics, Microsoft Clarity, or other.
- Exact Palworld data source and update workflow.
- Whether browser-local Palbox CSV/JSON import ships in MVP or P1.
- Whether any ads, affiliate links, Discord/newsletter, or support/contact forms ship at launch.
- Whether any official-looking assets, screenshots, icons, or game art will be used by design/frontend.

## 2. Compliance Gate conclusion

Gate result: PASS FOR PLANNING / NEEDS OWNER REVIEW BEFORE LAUNCH.

One-line conclusion:
PalCalculator can proceed as a fan-made, text/data-first Palworld calculator hub if it ships with clear unofficial/disclaimer language, no copyrighted game art or official-style branding, visible data-source/version caveats, privacy disclosure for analytics/share/local state, and strict bans on official/guaranteed/100%-accurate claims.

P0 launch blockers if not resolved before production:
1. No `/privacy/` or `/terms/` page while analytics, share URLs, or import features are live.
2. Any claim that PalCalculator is official, endorsed, partnered, approved, affiliated, or sponsored by Pocketpair / Palworld rights holders.
3. Use of official Palworld logos, copyrighted game art, icons, screenshots, extracted assets, or official-style trade dress without permission.
4. Publishing breeding/stat/passive data without source, version, last-updated date, or caveat handling.
5. Server-side save-file / Palbox upload or account storage without a new privacy/security design and owner approval.
6. Claims that breeding routes, passive inheritance, IVs, or stats are guaranteed, perfectly accurate, or always current.

## 3. Product and data inventory

### 3.1 User-provided data

MVP expected user inputs:
- Pal names or slugs selected in autocomplete.
- Parent Pal A / Parent Pal B.
- Target Pal.
- Owned Pal list manually selected or pasted as text/CSV-like list.
- IV/stat fields: Pal, level, observed HP/Attack/Defense, souls, condenser stars, passives/trust/modifiers where supported.
- Desired passive skills.
- Optional URL state for copy/share results.

Policy requirement:
- Treat owned-Pal lists, route constraints, and share state as user-provided gameplay state.
- Do not store raw owned-Pal lists server-side in MVP unless a later privacy/security design approves it.
- Prefer client-side calculation/static JSON. If Worker APIs are used, do not persist request bodies by default.
- If request logging is needed, log only metadata buckets and error codes, not full raw Palbox/save contents.

### 3.2 Automatic data and analytics

Planned analytics from route contract:
- page_view: page_slug, route_group/device_type/referrer.
- tool_start: tool_type, page_slug, data_version.
- tool_success: tool_type, page_slug, result_count_bucket, duration_bucket, data_version.
- tool_error: tool_type, page_slug, error_code, recoverable, data_version.
- copy_result/share_result: tool_type, page_slug, result_type.
- internal_nav: from_page, to_page, link_context.

Privacy requirements:
- Disclose analytics provider and events in `/privacy/` before launch.
- Do not log raw owned-Pal lists, save-file contents, exact private route state, IP-derived identity beyond standard analytics provider handling, or secrets.
- Use aggregated/bucketed counts and duration buckets where possible.
- Define retention period in the Privacy Policy, e.g. analytics event data retained up to 14 months, operational/security logs retained up to 30-90 days. Final retention value is [待确认] and must be kept consistent across site and policy.

### 3.3 Cookies / local storage

Likely storage surfaces:
- Analytics cookies or cookieless analytics identifiers depending on provider.
- Browser localStorage/sessionStorage for recent selected Pals, owned-Pal list drafts, or UI preferences if implemented.
- Share URLs containing encoded app state.

Policy requirements:
- If using non-essential cookies or Microsoft Clarity/GA-style tracking, add a Cookie Policy or Privacy section plus consent/banner strategy appropriate for target markets.
- If using strictly necessary local storage for calculator state, disclose it in Privacy/Cookie copy.
- Provide a simple way to clear browser-local data: browser settings and/or a “Clear local data” UI.

### 3.4 Third parties to disclose

Confirmed/planned or likely:
- Cloudflare Pages / Workers / CDN / security logs: hosting and edge delivery.
- Analytics provider: [待确认].
- Data sources for Palworld calculator dataset: [待确认], must be listed on `/data-sources/`.

Possible future / only if added:
- Ad networks: disclose if ads are added.
- Affiliate networks/server-hosting referrals: disclose if affiliate links are added.
- Email/newsletter/Discord/support form providers: disclose if collection exists.
- Payment processor: not MVP; if future supporter features ship, add Stripe/payment and refund/subscription terms.
- OpenAI Moderation API or other moderation provider: only needed if comments, public submissions, user-generated text/images, AI generation, or image uploads are added.

## 4. IP, trademark, fan-site, and brand policy

### 4.1 Required positioning

Allowed positioning:
- “PalCalculator is a fan-made Palworld calculator hub.”
- “Unofficial Palworld breeding, IV, stats, and passive calculators.”
- “Built for Palworld players who want to plan routes and understand caveats.”

Required disclaimer language:
- Footer short disclaimer on every page:
  “PalCalculator is an unofficial fan-made tool and is not affiliated with, endorsed by, sponsored by, or approved by Pocketpair or the Palworld team. Palworld and related names are trademarks or properties of their respective owners.”
- Terms longer disclaimer:
  “This site is provided as an independent fan tool. References to Palworld, Pal names, game mechanics, or related terms are for identification and compatibility purposes only. We do not claim ownership of Palworld or related trademarks, logos, characters, artwork, or game assets.”

### 4.2 Banned / high-risk IP and trademark practices

Do not:
- Use official Palworld logos, key art, character art, icons, screenshots, sprites, extracted assets, UI frames, sound, or copied database files unless permission/license is documented.
- Use a visual identity that looks like an official Pocketpair/Palworld product.
- Use “official”, “authorized”, “approved”, “partner”, “endorsed”, “sponsored”, “from Pocketpair”, “Palworld’s calculator”, or similar affiliation claims.
- Register social profiles or metadata implying official ownership.
- Use competitor site data as the sole source of truth or scrape/copy their compiled data without permission.

Preferred launch-safe design:
- Text/data-first UI.
- Original icons, generic shapes, tables, badges, and route diagrams.
- No copied game artwork required for MVP.
- If screenshots or official assets are later considered, require documented license/permission or owner/counsel approval first.

### 4.3 Domain and metadata risk

The brand `PalCalculator` is acceptable as a fan-tool brand only if page titles and copy make Palworld context and unofficial status clear.

If final domain is `palcalculator.com` or similar:
- Avoid implying it is the official Palworld domain.
- Homepage above-fold should say “fan-made” or “unofficial” near the primary tool description.
- Footer disclaimer must be present sitewide.
- Open Graph/Twitter card descriptions should include “unofficial” or “fan-made” where space allows.

## 5. Data-source and accuracy policy

### 5.1 Required `/data-sources/` content

The `/data-sources/` page must include:
- Current Palworld data version.
- Dataset build/version ID.
- Last updated date.
- Source categories used, for example: official patch notes/manual verification/community-reported corrections/public game data where allowed. Final list is [待确认].
- What is included: Pals, breeding pairs, special combos, passive skills, stat formulas.
- What is not included or uncertain.
- Formula assumptions for IV/stat calculator.
- How corrections are submitted.
- Update cadence and patch-response policy.
- Statement that competitor pages are not the sole source of truth.

Minimum source policy copy:
“Calculator results depend on the selected data version and may lag behind new Palworld patches. We show data version and last-updated information on tool pages and mark unsupported or uncertain data instead of fabricating results.”

### 5.2 Accuracy caveats by tool

Breeding calculator:
- Show data version and special-combo marker.
- For no result/data conflict, show unavailable/caveat state instead of guessing.

Route solver:
- Explain tie-break rules and constraints.
- If no route exists within constraints, state that constraints may be too strict.
- Do not claim “shortest” unless the algorithm’s graph/data version supports the claim; otherwise use “shortest route found for this data version and constraints.”

IV/stat calculator:
- Show formula version and modifiers included/excluded.
- Use ranges/confidence, not exact certainty where rounding or missing modifiers exist.

Passive planner:
- Explicit RNG/inheritance caveat.
- Avoid deterministic probability claims unless formula/data supports them.
- If unsupported, provide planning notes and next actions, not fabricated odds.

### 5.3 Banned accuracy claims

Do not use:
- “100% accurate”
- “guaranteed route”
- “always correct”
- “official data” unless sourced from an official API/document and legally allowed.
- “perfect IV calculator”
- “deterministic passive inheritance”
- “updated instantly after every patch” unless true and operationally guaranteed.

Safer alternatives:
- “Uses the selected data version.”
- “Shows formula assumptions and caveats.”
- “Best route found for the current dataset and constraints.”
- “Passive inheritance can involve RNG; use results as planning guidance.”

## 6. Legal page route contract

Required P0 legal/trust routes:
- `/privacy/` — Privacy Policy.
- `/terms/` — Terms of Use.
- `/data-sources/` — Data Sources & Update Policy.

Recommended if cookies/ads/affiliate/support are added:
- `/cookies/` or a clear Cookie section inside Privacy.
- `/affiliate-disclosure/` or a disclosure section near affiliate links.
- `/refund/` only if payments/supporter subscriptions launch later.

Canonical requirements:
- Legal routes should use trailing slash and self-referencing canonical URLs.
- If alternate paths exist, redirect to canonical route with 301/308.
- Footer links to Privacy, Terms, Data Sources, and optional Contact must render non-404 on every page.

## 7. Draft legal page content requirements

### 7.1 Privacy Policy required sections

Required before launch:
1. Who operates the site: owner/entity [待确认].
2. Contact email: `privacy@{domain}` or another owner-approved email [待确认].
3. What users provide:
   - Pal names/targets/parents.
   - Owned-Pal lists or pasted text if used.
   - IV/stat inputs.
   - Desired passive skills.
   - Share URL state.
4. What is collected automatically:
   - Basic logs, device/browser, referrer, page views.
   - Analytics events listed above.
   - IP address as processed by hosting/security/analytics providers where applicable.
5. How data is used:
   - Provide calculators.
   - Improve performance and tool reliability.
   - Debug errors and protect abuse/security.
   - Measure aggregate usage.
6. Third-party processors:
   - Cloudflare.
   - Analytics provider [待确认].
   - Any future providers only if used.
7. Local/browser storage and share URLs:
   - Explain local state and share URLs may encode selected Pals/settings.
   - Warn users not to share URLs containing state they consider private.
8. Save file / Palbox handling:
   - MVP: no server-side save-file upload.
   - If import exists, browser-local unless policy changes.
9. Retention:
   - Specific retention periods [待确认], not vague “as long as necessary” only.
10. Children:
   - Not directed to children under 13; if under 13, do not use without parent/guardian permission.
11. User choices:
   - Clear local data, browser controls, analytics opt-out/consent if applicable, contact email.
12. Policy changes and effective date.

### 7.2 Terms of Use required sections

Required before launch:
1. Acceptance of terms.
2. Unofficial fan-site disclaimer and no affiliation/endorsement.
3. Ownership/IP statement:
   - The site owns its original UI/text/code.
   - Palworld names/marks/assets belong to their owners.
   - No rights are claimed in Palworld IP.
4. Permitted use:
   - Personal gameplay planning and informational use.
5. Prohibited use:
   - Abuse, scraping, interfering with service, using outputs to misrepresent official data, uploading illegal/malicious content if upload features later exist.
6. Calculator/data disclaimer:
   - Results may be incomplete/outdated/wrong; use at your own discretion.
   - Patches can change mechanics.
7. No warranty / limitation of liability suitable for a free fan tool.
8. Third-party links and affiliate disclosure if added.
9. Changes/suspension of service.
10. Contact email.

### 7.3 Cookie Policy / consent requirements

If using only Cloudflare and strictly necessary local storage:
- A Privacy section may be sufficient for US-first launch, but a clear Cookie/Local Storage section is still recommended.

If using GA4, Clarity, ads, affiliate pixels, remarketing, or non-essential cookies:
- Add cookie banner/consent mode or equivalent compliance approach before enabling non-essential tracking for regions requiring consent.
- List cookie categories: necessary, analytics, preferences, advertising if any.
- Provide opt-out/management instructions.

### 7.4 Refund Policy

Not required for MVP because PRD says no subscriptions/payments at launch.

If future supporter features, subscriptions, ads-free tier, saved Palbox, or paid API launch:
- Add `/refund/` or a refund section before payment launch.
- Use hosted Stripe checkout/customer portal if Stripe is used.
- Terms must disclose recurring billing, cancellation flow, renewal interval, and refund rules.

## 8. Moderation and user-generated content policy

Current MVP does not include comments, public submissions, image uploads, AI-generated outputs, or public user-generated content. Therefore OpenAI Moderation API is not required for P0 calculator-only launch.

If any of the following are added later, add a moderation gate before public launch:
- Public route/build gallery.
- Community route submissions.
- Comments, contact forms displayed publicly, or reviews.
- User-uploaded images/files.
- AI-generated descriptions, strategy recommendations, or public content.

Recommended moderation implementation if needed:
- Use OpenAI `omni-moderation-latest` for text and supported images.
- Treat `flagged` as a policy signal, not automatic account punishment.
- Store decision logs with `flagged`, `categories`, `category_scores`, `category_applied_input_types`, route, user/session id if applicable, and final decision.
- Product decisions should include: allow, warning, review, block.
- API/network failures must return `moderation_error` or route to review; never default failures to safe.
- Keep false-positive appeal/manual review path for blocked public submissions.
- Avoid logging raw sensitive content unless necessary and disclosed.

## 9. Risk register

### P0 — must fix before launch

1. Missing legal pages
- Risk: Analytics/share/import launches without Privacy/Terms.
- Requirement: `/privacy/`, `/terms/`, `/data-sources/` render non-404 and are linked from footer.

2. Official/affiliation confusion
- Risk: Trademark/IP confusion with Palworld/Pocketpair.
- Requirement: Sitewide unofficial/fan-made disclaimer, no official-style brand language.

3. Copyrighted assets
- Risk: Use of official logo/art/screenshots/extracted icons.
- Requirement: Text/data-first original UI unless license/permission is documented.

4. Unsourced or stale data
- Risk: Calculator gives wrong results while claiming accuracy.
- Requirement: data version, last updated, source/update policy, caveat states.

5. Server-side save-file upload
- Risk: Personal/local game data handling without policy/security.
- Requirement: Not in MVP; browser-local only unless new privacy/security design is approved.

### P1 — should fix or disclose before launch

1. Analytics provider unknown
- Add provider name and retention to Privacy before enabling.

2. Contact email unknown
- Add owner-approved privacy/contact email before launch.

3. Share URL privacy copy
- Tell users share URLs may encode selected Pals/settings and should not be shared if considered private.

4. Passive/IV overclaim risk
- Add inline caveats and avoid deterministic claims.

5. Affiliate/ads future scope
- If added, disclose sponsorship/affiliate relationship near links and in Terms/Privacy.

### P2 — acceptable with follow-up

1. Manual live Google SERP review still recommended before SEO copy freeze.
2. Programmatic Pal-specific pages can wait until unique value and data quality are proven.
3. Cookie banner approach can be finalized once analytics provider and target region policy are known.

## 10. Banned claims and safe copy rules

### 10.1 Banned words/phrases unless specifically qualified and evidenced

Affiliation/IP:
- official
- endorsed
- approved
- authorized
- sponsored by Pocketpair
- partnered with Palworld
- Palworld’s official calculator
- official Palworld data

Accuracy/result certainty:
- 100% accurate
- guaranteed
- always correct
- perfect IVs
- exact passive odds
- deterministic passive inheritance
- instantly updated
- complete database
- all future patches covered

Privacy/security:
- anonymous if analytics/logs exist
- we collect no data if analytics/logs/local/share state exist
- private forever
- secure upload if no audited upload/security design exists

Commercial:
- free forever if ads/supporter/payment may be added later
- no ads ever unless committed
- no tracking if analytics exists

### 10.2 Safe copy alternatives

- “Unofficial fan-made Palworld calculator.”
- “Uses the selected data version and shows update notes.”
- “Results are planning guidance and may change after game updates.”
- “Best route found for the current dataset and constraints.”
- “Passive inheritance can involve RNG; review the caveats before breeding.”
- “No login required for MVP tools.”
- “Owned-Pal lists are processed in your browser unless a feature clearly says otherwise.”
- “Analytics help us understand aggregate tool usage and errors.”

## 11. Page and UI requirements for frontend/copy/QA

Every P0 tool page must include:
- Palworld-qualified title/H1.
- Calculator UI above the fold.
- Visible data version or link to `/data-sources/`.
- Caveat/disclaimer link or short inline disclaimer.
- Footer links to `/privacy/`, `/terms/`, `/data-sources/`.
- No official-looking asset dependency.

Recommended inline trust component:
- Data version badge: “Data: Palworld [version], updated [date]”.
- Caveat link: “How results are calculated”.
- Fan-site badge/link: “Unofficial fan-made tool”.

For result/share URLs:
- Default noindex, follow.
- Canonical should point to the base tool page unless intentionally promoted later.
- Do not expose private save files or raw uploaded content.

For forms/inputs:
- Inline validation for invalid Pal names and impossible stat values.
- Do not send secrets or hidden tokens to client bundle.
- Do not log raw Palbox/save content.

## 12. QA compliance checklist

Pre-launch QA must verify:

Legal/trust pages:
- [ ] `/privacy/` returns 200 and is linked in footer.
- [ ] `/terms/` returns 200 and is linked in footer.
- [ ] `/data-sources/` returns 200 and is linked from every tool page.
- [ ] Contact email/domain placeholder is replaced or clearly owner-approved.
- [ ] Privacy lists Cloudflare and analytics provider if enabled.
- [ ] Privacy includes specific retention periods.
- [ ] Terms includes fan-made/no-affiliation disclaimer.
- [ ] Data Sources includes version, last updated, sources, unsupported data, correction path.

IP/trademark:
- [ ] No “official/endorsed/approved/partner” claims in title/meta/H1/body/footer/schema/OG.
- [ ] No official Palworld logo/art/screenshots/assets unless permission is documented.
- [ ] Footer disclaimer appears sitewide.
- [ ] Open Graph images are original/generic, not copied official art.

Data/accuracy:
- [ ] Tool pages show data version.
- [ ] IV/stat pages show formula caveats.
- [ ] Passive planner includes RNG/inheritance caveat.
- [ ] No-result/data-unavailable states do not fabricate results.
- [ ] Source/update policy says competitors are not sole source of truth.

Privacy/security:
- [ ] Analytics events do not include raw owned-Pal lists, raw save contents, secrets, or precise private state.
- [ ] Share URLs do not include sensitive/private uploaded files.
- [ ] `/share/*` or equivalent result routes are noindex by default.
- [ ] No server-side save-file upload exists in MVP unless a new reviewed policy is added.
- [ ] If local storage is used, UI or Privacy explains how to clear it.

Cookies/third parties:
- [ ] Cookie/local storage disclosure matches actual implementation.
- [ ] If non-essential cookies/pixels are used, consent/banner approach is implemented as required.
- [ ] Affiliate/ad disclosures exist if affiliate links or ads are present.

## 13. Acceptance gate mapping

Required disclaimers:
- Sitewide unofficial/fan-made disclaimer: REQUIRED.
- Terms no-affiliation and IP ownership statement: REQUIRED.
- Data accuracy/formula caveats: REQUIRED.
- Privacy analytics/local/share/import disclosures: REQUIRED.

Banned claims:
- Official/endorsed/approved/partner: BANNED.
- 100% accurate/guaranteed/perfect/always current: BANNED.
- We collect no data: BANNED if analytics/logs/share/local state exist.
- Official data: BANNED unless officially licensed/source-supported.

Source/data policy:
- `/data-sources/` REQUIRED.
- Data version and last updated date REQUIRED on tool pages.
- Missing data must show unavailable/caveat states.
- Competitor scrape must not be sole source of truth.

Pages needed:
- `/privacy/` P0.
- `/terms/` P0.
- `/data-sources/` P0.
- `/cookies/` optional/recommended if non-essential cookies or tracking pixels are used; otherwise can be a Privacy section.
- `/refund/` not required until payments/subscriptions launch.
- `/contact/` optional but recommended; at minimum include contact email in Privacy/Terms/Data Sources.

## 14. Downstream handoff summary

Status: DONE / needs owner and legal copy review before production.

Must-read files for downstream agents:
- `/root/projects/palcalculator/artifacts/prd.md`
- `/root/projects/palcalculator/artifacts/route-contract.md`
- `/root/projects/palcalculator/artifacts/compliance.md`

For copy_bot:
- Use “unofficial” / “fan-made” language.
- Do not use banned affiliation or accuracy claims.
- Add data-version, caveat, and disclaimer copy to tool pages.
- Recheck live Google SERP before final SEO copy freeze as upstream noted.

For design/frontend_bot:
- Build text/data-first UI; do not rely on official game art/logos.
- Add footer legal links and sitewide short disclaimer.
- Add DataVersionBadge and caveat links on every tool page.
- Ensure `/share/*` or app-state result pages are noindex by default.

For backend/data_bot:
- Define exact source/update policy and dataset versioning.
- Prefer static JSON/client-side computation for P0.
- Do not persist owned-Pal lists or save/import data by default.
- Never fabricate missing data; return structured caveats/errors.

For QA_bot:
- Run the QA checklist in section 12.
- Search built pages for banned words: official, endorsed, approved, guaranteed, 100% accurate, perfect, always current, official data.
- Verify Privacy/Terms/Data Sources are live and internally linked.

Recommended next agent: copy_bot or backend/data_bot can proceed in parallel; QA_bot should run after implementation.

[DONE]
