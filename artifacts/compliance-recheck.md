# PalCalculator Compliance Recheck After Frontend Implementation

Project: palcalculator
Market: US / English
Stage: 04b-compliance-recheck
Date: 2026-07-16
Reviewer: compliance_bot
Status: GO FOR REVIEW / NOT FINAL PRODUCTION LAUNCH

This is a product compliance recheck against `/root/projects/palcalculator/artifacts/compliance.md` and the implemented frontend handoff. It is not legal advice.

## Inputs reviewed

- `/root/projects/palcalculator/artifacts/compliance.md`
- `/root/projects/palcalculator/artifacts/frontend-report.md`
- `/root/projects/palcalculator/src/main.tsx`
- `/root/projects/palcalculator/src/main.test.ts`
- `/root/projects/palcalculator/index.html`
- `/root/projects/palcalculator/public/robots.txt`
- `/root/projects/palcalculator/public/sitemap.xml`
- `/root/projects/palcalculator/public/data/pals.latest.json`
- Fresh local validation: `npm test`, `npm run build`, Vite route smoke for P0 routes and public assets.

## Acceptance gate

Compliance result: GO for downstream QA/SEO/owner review. No P0 compliance regression was found in the implemented UI/copy.

Production launch note: keep this as "GO for review" rather than unconditional launch GO until the P1/P2 repair list below is resolved or owner-approved, especially final canonical domain, legal contact/retention, analytics provider, and production data source/version.

## Fresh validation evidence

- Frontend artifact exists: `/root/projects/palcalculator/artifacts/frontend-report.md`.
- `npm test`: PASS, 1 test file / 2 tests passed.
- `npm run build`: PASS, Vite build completed; generated `dist/index.html`, CSS, JS, and source map.
- Local Vite route smoke on port 4177 returned 200 for:
  - `/`
  - `/breeding-calculator/`
  - `/breeding-route-calculator/`
  - `/iv-calculator/`
  - `/stats-calculator/`
  - `/passive-skill-calculator/`
  - `/palworld-1-0-breeding-calculator/`
  - `/data-sources/`
  - `/privacy/`
  - `/terms/`
  - `/sitemap.xml`
  - `/robots.txt`
  - `/data/pals.latest.json`
- Static banned-claim scan over `src`, `public`, and `index.html` found expected uses of sensitive terms only in safe contexts: `unofficial`, sitewide no-affiliation disclaimer, and Terms negations such as "Do not rely on calculator output as guaranteed, official, always current, or perfectly accurate." No affirmative official/guaranteed/perfect/100%-accurate claim was found.

## Compliance checklist against `compliance.md`

### 1. Affiliation / trademark / fan-site positioning

Result: PASS.

Evidence:
- Above-fold copy says "Unofficial fan-made Palworld tool".
- Meta description and JSON-LD description say "Unofficial fan-made Palworld calculator hub".
- Sitewide footer disclaimer says the tool is not affiliated with, endorsed by, sponsored by, or approved by Pocketpair or the Palworld team.
- Terms page says references to Palworld are for identification/compatibility only and the site does not claim ownership of Palworld marks, logos, characters, artwork, or game assets.

No repair required for current copy.

### 2. Copyright / official asset risk

Result: PASS.

Evidence:
- Source uses text, generic UI, CSS, and lucide-react icons.
- No official Palworld logos, screenshots, sprites, copied character art, extracted game icons, or official-style visual assets were found in reviewed frontend files.
- Seed entries are text-only example Pals and are explicitly marked `example_only` / `DATASET_VERSION_PENDING` with blocking caveats.

No repair required for current implementation.

### 3. Accuracy / guarantee claims

Result: PASS.

Evidence:
- UI repeatedly uses pending/unavailable states instead of fabricated Palworld outputs.
- Data badge says "Palworld 1.0 pending verification" and "Data version pending".
- Breeding, route, IV/stat, and passive tools return `DATASET_VERSION_PENDING`, `FORMULA_VERSION_PENDING`, `ROUTE_DATA_PENDING`, or equivalent caveat states.
- Copy says results depend on selected data versions, source quality, patches, formulas, modifiers, and RNG.
- Terms explicitly tells users not to rely on outputs as guaranteed, official, always current, or perfectly accurate.

No affirmative banned claim such as "100% accurate", "guaranteed route", "official data", "perfect IV calculator", or "deterministic passive inheritance" was found.

### 4. Data-source / dataset transparency

Result: PASS for current pending-data implementation; P1 before production data launch.

Evidence:
- `/data-sources/` renders and explains that production Palworld data is pending.
- Public JSON includes `DATASET_VERSION_PENDING`, `source-pending`, `example_only`, and blocking caveats.
- UI marks unsupported domains instead of calculating from unverifiable data.

Repair before production data launch:
- Replace pending placeholders with verified dataset version, generated date, source categories, correction workflow, and update cadence.
- Keep competitor pages from being the sole source of truth.
- Keep data version and last-updated visible on tool pages after the real dataset ships.

### 5. Privacy / user data / local state

Result: PASS for MVP static frontend posture; P1 before production launch.

Evidence:
- No login, payment, account wall, or server-side save-file upload is implemented.
- Privacy copy says selected Pals, owned-Pal text, stat fields, and passive choices are handled in the browser UI unless a later owner-approved backend changes that.
- Privacy copy warns that share URLs may include selected Pals/settings and should not be shared if considered private.
- Analytics provider is explicitly pending; no analytics script was found in reviewed frontend files.

Repair before production launch:
- Add owner-approved contact/privacy email.
- Add exact analytics provider if any is enabled.
- Add specific retention periods for analytics/logs if analytics or backend logging is enabled.
- If local storage is added later, disclose exact local storage behavior and provide clear local-data clearing instructions.

### 6. Legal/trust route coverage

Result: PASS for route existence; P1 frontend hardening recommended.

Evidence:
- `/privacy/`, `/terms/`, and `/data-sources/` returned 200 in local route smoke.
- Footer renders legal/trust navigation controls for Data Sources, Privacy, and Terms.
- `robots.txt` disallows `/share/` and links sitemap.
- `sitemap.xml` includes P0 public pages and legal/trust routes.

Repair / hardening:
- Convert footer legal/trust navigation buttons to real `<a href="/privacy/">`, `<a href="/terms/">`, and `<a href="/data-sources/">` links, or ensure equivalent crawlable links exist. Current JS buttons work for SPA users, but real anchors are safer for legal-page discoverability, crawlers, and no-JS checks.
- Confirm final canonical origin before production. Current files use `https://palcalculator.com/`; this must match the owner-approved domain.

### 7. Commercial / payment / affiliate claims

Result: PASS.

Evidence:
- UI says free for normal player use at MVP and no login/payment required for P0 calculators.
- No checkout, paid tier table, affiliate module, ads, or subscription claims were found.
- Copy does not say "free forever", "no ads ever", or similar future-binding claims.

No repair required unless ads, affiliate links, supporter plans, or payments are added later.

### 8. Moderation / UGC / uploads

Result: PASS / not applicable for current MVP.

Evidence:
- Current frontend has no comments, public submissions, image uploads, AI-generated public content, or user-uploaded files.
- No OpenAI Moderation gate is required for this P0 calculator-only implementation.

Repair only if future features add public UGC, comments, uploads, or AI-generated public content.

## Repair list

### P0 blockers

None found in the reviewed implementation.

### P1 before production launch or production-data launch

1. Confirm final canonical origin/domain and update `index.html`, `public/sitemap.xml`, and `public/robots.txt` if `palcalculator.com` is not the final owner-approved domain.
2. Add owner-approved legal/privacy contact email to Privacy/Terms/Data Sources.
3. Add exact analytics provider and concrete retention periods before enabling analytics.
4. Replace `DATASET_VERSION_PENDING` / `source-pending` with verified data version, last-updated date, source categories, update workflow, and correction path before presenting real Palworld results.
5. Use crawlable anchor links for footer legal/trust routes, not only SPA buttons, or otherwise prove legal links are discoverable in no-JS/crawler checks.

### P2 follow-up / QA polish

1. Consider expanding `/privacy/` and `/terms/` from concise summaries into fuller legal-page copy before public launch, using the required sections in `compliance.md`.
2. Run a browser/mobile QA pass to visually confirm footer disclaimer and data badges are visible on every route.
3. Re-run banned-claim scan after SEO/copy edits and after production data import.

## Downstream handoff

- Recommended next agent: QA_bot for browser/mobile UI QA and no-JS/legal-link discoverability checks.
- SEO_bot should confirm canonical origin, metadata, sitemap, and indexability after owner confirms the production domain.
- backend/data_bot must resolve verified Palworld data source/version before any real calculator outputs are enabled.

Final line: [DONE]
