# Search Console & Analytics Readiness Audit — palcalculator

**Task:** t_ead89df6  
**Auditor:** ops_recovery_bot  
**Date:** 2026-07-16T11:42:51Z  
**Project:** palcalculator  
**Domain:** palcalculator.com  

---

## Executive Summary

**Status: BLOCKED**

Google Search Console and Bing Webmaster Tools access remain unverified. Analytics provider undecided. Domain DNS still delegated to Dynadot; Cloudflare zone not yet active. No verification files, DNS TXT records, or auth tokens found.

**Launch Blockers:**
1. GSC access/readiness unproven — no tooling, auth, verification, or DNS delegation
2. Bing Webmaster access unproven — no verification evidence
3. Analytics provider not chosen — no GA4/Plausible/Clarity/Umami/Cloudflare config

**Non-blocking readiness gaps:**
- robots.txt and sitemap.xml generation deferred until post-implementation/QA (expected)

---

## Checks Performed

### 1. Domain DNS & Verification Records

**Check:** DNS NS, TXT, and A records for palcalculator.com

```
dig palcalculator.com NS +short
ns2.dyna-ns.net.
ns1.dyna-ns.net.

dig palcalculator.com TXT +short
(no output — no TXT records)
```

**Findings:**
- Domain NS still on Dynadot (ns1/ns2.dyna-ns.net)
- No TXT verification records for Google/Bing
- No Cloudflare nameservers assigned
- DNS not yet migrated to Cloudflare

**Evidence paths:** DNS query output above

---

### 2. Google Search Console Readiness

**Checks:**
- Environment variables: `env | grep -iE 'google|gsc|search_console'`
- CLI tools: `which gws gcloud`
- Auth directories: `ls ~/.config/gcloud`
- Verification files: `find /root/projects/palcalculator -name 'google-site-verification*'`

**Findings:**
- **CLI tools:** `gws` CLI not installed; `gcloud` CLI not installed
- **Auth state:** `~/.config/gcloud` directory does not exist
- **Environment:** No GOOGLE_*, GSC_*, SEARCH_CONSOLE_* variables found
- **Verification:** No local `google-site-verification` HTML file
- **DNS:** No TXT verification record (domain still on Dynadot NS)

**Status:** **BLOCKED / not proven**

**Evidence paths:**
- DNS TXT check: no records
- Environment check: no relevant variables
- Filesystem: no verification files in `/root/projects/palcalculator`

---

### 3. Bing Webmaster Tools Readiness

**Checks:**
- Environment variables: `env | grep -iE 'bing|webmaster|msvalidate'`
- Verification files: `find /root/projects/palcalculator -name 'msvalidate*' -o -name 'BingSiteAuth*'`
- DNS TXT/CNAME records

**Findings:**
- **Environment:** No BING_*, WEBMASTER_*, MSVALIDATE_* variables
- **Verification files:** No `msvalidate.01` or `BingSiteAuth.xml` file
- **DNS:** No TXT or CNAME verification record for Bing
- **Auth state:** No authenticated Bing Webmaster session evidence

**Status:** **BLOCKED / not proven**

**Evidence paths:**
- DNS TXT check: no records
- Environment check: no relevant variables
- Filesystem: no verification files in `/root/projects/palcalculator`

---

### 4. Analytics Configuration Readiness

**Checks:**
- Environment variables: `env | grep -iE 'ga_|google_analytics|gtm_|plausible|clarity|umami|analytics'`
- Project config/docs: PRD, compliance.md, blocked-log.md analytics references
- Cloudflare Web Analytics: zone config (no zone active)

**Findings:**
- **Provider:** Not yet chosen (PRD line 100: "Analytics provider: [待确认]")
- **GA4:** No GA4 measurement ID, no GTM container ID in environment
- **Plausible:** No PLAUSIBLE_DOMAIN or API key
- **Microsoft Clarity:** No CLARITY_PROJECT_ID
- **Umami:** No UMAMI_WEBSITE_ID or tracker URL
- **Cloudflare Web Analytics:** No active Cloudflare zone; no token/beacon config
- **Event schema:** Analytics event contract defined in PRD (page_view, tool_start, tool_success, tool_error, copy_result, share_result) — ready for implementation once provider chosen

**Status:** **MISSING / provider undecided**

**Evidence paths:**
- `/root/projects/palcalculator/artifacts/prd.md` line 352-358: analytics events defined
- `/root/projects/palcalculator/artifacts/compliance.md` line 70-82: analytics privacy requirements defined
- Environment check: no analytics provider env vars
- `/root/projects/palcalculator/artifacts/blocked-log.md` line 8: "GSC/Bing/analytics SETUP_REQUIRED"

---

### 5. Sitemap & robots.txt Readiness

**Check:** Presence of robots.txt and sitemap.xml in project

```
find /root/projects/palcalculator -name 'robots.txt' -o -name 'sitemap.xml'
(no matches)
```

**Findings:**
- No robots.txt or sitemap.xml in project directory
- PRD line 342: "Sitemap includes indexable canonical pages only"
- PRD line 343: "Robots noindex for share/app-state pages by default"
- **This is expected** — sitemap/robots generation is deferred until after implementation/QA

**Status:** **NOT YET IMPLEMENTED (non-blocker)**

**Evidence paths:**
- Filesystem search: no robots.txt or sitemap.xml found
- `/root/projects/palcalculator/artifacts/prd.md` line 342-344: sitemap/robots requirements defined

---

## Owner Actions Required

### Critical blockers (must resolve before launch):

1. **Google Search Console access:**
   - Option A: Grant agent GSC property owner/verifier access via service account or CLI tooling
   - Option B: Confirm manual owner-managed GSC setup post-launch
   - After DNS migration to Cloudflare, add DNS TXT verification record OR upload `google-site-verification-*.html` file

2. **Bing Webmaster Tools access:**
   - Option A: Grant agent Bing Webmaster access via API key or CLI tooling
   - Option B: Confirm manual owner-managed Bing Webmaster setup post-launch
   - After DNS migration to Cloudflare, add DNS TXT/CNAME verification OR upload `BingSiteAuth.xml` file

3. **Analytics provider decision:**
   - Choose one: GA4, Plausible, Microsoft Clarity, Umami, or Cloudflare Web Analytics
   - Provide measurement ID / project ID / API key as appropriate
   - Update `/root/projects/palcalculator/artifacts/compliance.md` line 100 with chosen provider
   - Ensure Privacy Policy discloses analytics provider and event types before launch

4. **DNS migration to Cloudflare:**
   - Add Cloudflare zone for palcalculator.com
   - Update Dynadot NS records to Cloudflare-assigned nameservers
   - Verify DNS propagation before GSC/Bing verification attempts

### Non-blocking (can defer to post-implementation):

5. **Sitemap generation:** Implement after static site generator / Pages build is live
6. **robots.txt generation:** Implement after route contract finalized and canonical/noindex strategy confirmed

---

## Evidence Summary

**No state changes performed.** This audit inspected:
- DNS records via `dig palcalculator.com NS/TXT`
- Environment variables via `env | grep`
- Filesystem searches via `find /root/projects/palcalculator`
- Existing project artifacts: PRD, compliance.md, blocked-log.md

**No production operations:** No authentication, no DNS mutations, no Cloudflare zone changes, no verification file uploads, no sitemap submissions, no analytics property creation.

**No secrets exposed:** All checks performed against public DNS, local environment, and owner-controlled project files only.

---

## Status: BLOCKED

3 critical blockers before search/analytics readiness:
1. GSC access unproven
2. Bing Webmaster access unproven
3. Analytics provider undecided

Owner confirmation required for each item above.

[AUDIT COMPLETE]
