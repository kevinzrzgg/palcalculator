# Domain, DNS, Cloudflare, and Deploy Permissions Audit — palcalculator

Audited: 2026-07-16
Task: t_1d7bb228
Agent: ops_recovery_bot
Project: palcalculator
Domain: palcalculator.com

## Scope

This audit gathered launch-readiness evidence for owner-controlled infrastructure prerequisites:
- Domain ownership and status
- DNS provider and delegation status
- Cloudflare account, zone, and DNS access
- Cloudflare Pages and Workers permissions
- Deploy authorization status

**No production actions were performed.** This audit performed inspection only. No deploy, publish, DNS mutation, Cloudflare configuration change, zone creation, custom-domain binding, or other production state change occurred.

## Executive Summary

**Status: BLOCKED for production launch**

The domain `palcalculator.com` is registered and owned, but critical infrastructure setup remains incomplete:

1. **Domain DNS**: Still delegated to Dynadot nameservers; not yet migrated to Cloudflare
2. **GitHub repo**: Candidate repo `kevinzrzgg/palcalculator` does not exist
3. **Cloudflare access**: No `CLOUDFLARE_API_TOKEN` in current environment; cannot verify account/zone/Pages/Workers permissions
4. **Search/analytics**: No Google Search Console, Bing Webmaster, or analytics configuration detected
5. **Deploy permission**: No explicit production deploy or public launch approval found

Research, PRD, compliance, and local development work can continue. Production deployment, DNS cutover, and public launch remain blocked until owner completes required setup actions.

## Detailed Findings

### 1. Domain Ownership and Status

**Evidence inspected:**
- `whois palcalculator.com`
- DNS queries for A, NS, CNAME, TXT, SOA records

**Current state: CONFIRMED — domain is registered and owned**

Domain details:
- Registrar: Dynadot Inc (IANA ID: 472)
- Creation date: 2026-07-16T02:50:32Z
- Expiry date: 2027-07-16T02:50:32Z
- Status: clientTransferProhibited
- Current A record: 185.53.179.146 (Dynadot parking/default)
- Current nameservers: ns1.dyna-ns.net, ns2.dyna-ns.net

**Conclusion:** Domain ownership is confirmed. The domain is currently on Dynadot's default DNS with a parking page IP.

**Owner actions required:**
- None for domain ownership itself (already owned)
- See DNS/Cloudflare section below for nameserver migration

### 2. DNS Provider and Delegation Status

**Evidence inspected:**
- `dig +short palcalculator.com NS`
- `dig +short palcalculator.com A`
- `dig +short palcalculator.com CNAME`
- `dig +short palcalculator.com TXT`
- `dig +short palcalculator.com SOA`

**Current state: BLOCKED — DNS delegated to Dynadot, not Cloudflare**

DNS delegation:
- Authoritative nameservers: ns1.dyna-ns.net, ns2.dyna-ns.net
- SOA: ns1.dyna-ns.net hostmaster.palcalculator.com
- A record: 185.53.179.146 (Dynadot parking page)
- No CNAME records
- No TXT records (no verification records for GSC/Bing/Cloudflare present)

**Conclusion:** DNS is currently managed by Dynadot's default nameservers. Cloudflare DNS/Pages custom domain cannot be used until the domain is added to Cloudflare and nameservers are changed.

**Owner actions required:**
1. Add/import `palcalculator.com` into the intended Cloudflare account
2. Note the Cloudflare-assigned nameservers (typically `*.ns.cloudflare.com`)
3. Update nameservers at Dynadot registrar control panel to point to Cloudflare nameservers
4. Wait for DNS propagation (typically 24-48 hours)
5. Confirm apex vs www routing policy (e.g., apex primary with www redirect)

### 3. GitHub Repository Access and Permissions

**Evidence inspected:**
- `gh auth status`
- `gh api user`
- `gh repo view kevinzrzgg/palcalculator`

**Current state: BLOCKED — candidate repo does not exist**

GitHub access:
- GitHub CLI installed: /usr/bin/gh
- Authenticated user: kevinzrzgg
- Token scopes: gist, read:org, repo
- Token status: active
- Candidate repo `kevinzrzgg/palcalculator`: does not exist (GraphQL error: "Could not resolve to a Repository")

**Conclusion:** GitHub authentication is present for user `kevinzrzgg` with appropriate scopes, but the canonical repository has not been created yet.

**Owner actions required:**
1. Confirm canonical repository owner/name (default candidate: kevinzrzgg/palcalculator)
2. Confirm repository visibility during build (private, public, or internal)
3. Confirm repository visibility after launch
4. Explicitly authorize automation to create the repository and push code, or create it manually first
5. If using a different owner/org or name, provide the canonical repository identifier

### 4. Cloudflare Account, Zone, DNS, Pages, and Workers Permissions

**Evidence inspected:**
- Environment variable check for `CLOUDFLARE_API_TOKEN`
- `wrangler` installation check
- Attempted `wrangler whoami`, `wrangler pages project list`, `wrangler kv namespace list`, `wrangler d1 list`, `wrangler r2 bucket list`

**Current state: BLOCKED — no Cloudflare API token in current environment**

Cloudflare tooling:
- `wrangler` installed: /root/.nvm/versions/node/v22.22.1/bin/wrangler
- `CLOUDFLARE_API_TOKEN`: not present in current run environment
- All wrangler commands fail with authentication error in non-interactive environment

Prior evidence context (from /root/projects/palcalculator/artifacts/setup-gate.md):
- A previous run had an active token and reported 0 Cloudflare zones for `palcalculator.com`
- That prior evidence is useful historical context but is not reproducible in this current run

**Conclusion:** Cloudflare account, zone, DNS, Pages, and Workers permissions cannot be verified in this run. The domain is also not yet delegated to Cloudflare DNS.

**Owner actions required:**
1. Provide/restore a valid `CLOUDFLARE_API_TOKEN` with appropriate permissions:
   - Account read access
   - Zone read/write access (for DNS management)
   - Pages read/write access (for deployment)
   - Workers/KV/D1/R2 read/write access if needed by application architecture
2. Add/import `palcalculator.com` zone into the intended Cloudflare account
3. Confirm Cloudflare account ID to use
4. Confirm Pages project name (default candidate: `palcalculator`)
5. Approve Pages/Workers/KV/D1/R2 resource creation at appropriate build/deploy stage
6. Approve custom-domain binding to Pages project only after QA and PM acceptance

### 5. Google Search Console and Bing Webmaster Access

**Evidence inspected:**
- Check for `gws` command (Google Workspace CLI)
- Environment variable scan for Google/GSC/Search/Bing/Webmaster indicators

**Current state: UNKNOWN — no search console access detected**

Search console access:
- `gws` command: not found
- Google Search Console environment variables: none detected
- Bing Webmaster environment variables: none detected

**Conclusion:** Google Search Console and Bing Webmaster access are not configured or verified in this environment. Production search console submission and indexing validation cannot proceed until access is provided or explicitly deferred.

**Owner actions required:**
1. Provide Google Search Console access for `palcalculator.com` domain, OR
2. Confirm manual/deferred GSC setup after initial deployment
3. Provide Bing Webmaster Tools access for `palcalculator.com` domain, OR
4. Confirm manual/deferred Bing setup after initial deployment
5. Clarify whether search console verification should be automated or handled manually post-launch

### 6. Analytics Configuration

**Evidence inspected:**
- Environment variable scan for analytics provider indicators (GA4, Plausible, Cloudflare Analytics, Umami, Clarity)

**Current state: UNKNOWN — no analytics configuration detected**

Analytics access:
- No Google Analytics (GA4) environment variables detected
- No Plausible environment variables detected
- No Cloudflare Web Analytics identifiers detected
- No Umami environment variables detected
- No Microsoft Clarity environment variables detected

**Conclusion:** Analytics provider and configuration are not present. Production analytics validation cannot proceed until the owner confirms the analytics strategy.

**Owner actions required:**
1. Confirm analytics provider:
   - Cloudflare Web Analytics (recommended for Cloudflare-first projects)
   - Google Analytics 4 (GA4)
   - Plausible
   - Umami
   - Microsoft Clarity
   - Other provider
   - Explicit no-analytics decision for MVP
2. Provide necessary credentials/configuration if automation should set up analytics
3. OR confirm manual/deferred analytics setup after initial deployment

### 7. Production Deploy and Public Launch Permission

**Evidence inspected:**
- Kanban task body and comments (t_1d7bb228)
- /root/projects/palcalculator/project-control.md
- /root/projects/palcalculator/stage-status.md
- /root/projects/palcalculator/blocked-log.md
- /root/projects/palcalculator/artifacts/setup-gate.md
- /root/projects/palcalculator/handoff.md

**Current state: BLOCKED — no explicit production deploy or public launch approval**

Authorization status:
- Task body explicitly states: "Do not deploy, publish, mutate DNS, change Cloudflare config, or alter production state"
- project-control.md states: setup is blocked; launch depends on owner permission
- No explicit production deploy approval found in task thread or control files

**Conclusion:** Production deployment, DNS cutover, custom-domain binding, search console submission, directory submission, and public promotion are not authorized.

**Owner actions required:**
1. After QA_GO and PM acceptance stages complete, explicitly approve production deployment
2. Explicitly approve public launch and promotional activities
3. Confirm launch timing/coordination requirements if any

## Repository and Configuration Evidence

**Project files inspected:**
- /root/projects/palcalculator/artifacts/prd.md
- /root/projects/palcalculator/artifacts/route-contract.md
- /root/projects/palcalculator/artifacts/compliance.md
- /root/projects/palcalculator/artifacts/copy.md
- /root/projects/palcalculator/artifacts/setup-gate.md
- /root/projects/palcalculator/project-control.md
- /root/projects/palcalculator/stage-dag.md

**Project configuration files searched:**
- No package.json, wrangler.toml, .env.example, or other configuration files found in current project directory
- Current project directory contains only planning/artifact markdown files
- Implementation files (source code, build config, deployment config) do not exist yet

**Intended infrastructure (from PRD and control files):**
- Canonical domain: palcalculator.com (PRD line 169)
- Target stack: Cloudflare-first (Cloudflare Pages + Workers/D1/KV/R2 as needed)
- Intended deploy target: Cloudflare Pages
- Default Pages project name: palcalculator (inferred from project name)
- Intended repo: kevinzrzgg/palcalculator (from project-control.md)

## Missing Owner Actions — Summary

Production launch is blocked until the owner completes or approves:

**Critical blockers:**
1. ✗ Cloudflare zone creation: add palcalculator.com to Cloudflare account
2. ✗ DNS delegation: change nameservers from Dynadot to Cloudflare
3. ✗ Cloudflare API token: provide token with account/zone/Pages/Workers permissions
4. ✗ GitHub repo: confirm canonical repo and authorize creation/push
5. ✗ Production deploy permission: explicitly approve deployment after QA/PM acceptance

**Deferred/clarification needed:**
6. ? Search console access: GSC and Bing Webmaster (automated vs manual setup)
7. ? Analytics configuration: provider choice and credentials (or defer to manual)
8. ? Custom domain binding approval: after QA_GO
9. ? Public launch approval: timing and coordination

**Already confirmed:**
- ✓ Domain ownership: palcalculator.com is registered and owned

## Safe to Continue Now

The following work can proceed without production infrastructure:
- Research (already complete)
- PRD and route contract (already complete)
- Compliance planning (in progress)
- Pricing strategy (in progress)
- SEO copy drafting (waiting on upstream)
- Design/frontend drafts and local development (waiting on upstream)
- Backend/data contract drafting (waiting on upstream)
- Local testing and QA preparation (waiting on implementation)

## Pipeline Impact

**Unblocked for now:**
- All planning, research, and documentation stages
- Local/non-production design and implementation work
- Non-production build/test work

**Blocked until owner action:**
- Cloudflare resource creation (Pages project, Workers, KV, D1, R2)
- GitHub repository creation and push
- DNS cutover and custom domain binding
- Production deployment
- Search console verification and submission
- Analytics production validation
- Public launch and directory/promotional activities

## Verification Statement

This audit performed inspection only using:
- DNS query tools (dig, whois)
- GitHub CLI read-only queries (gh auth status, gh repo view)
- Environment variable checks (without printing secret values)
- Local file inspection

**No production actions were performed:**
- ✓ No deploy or publish operations
- ✓ No DNS record mutations
- ✓ No Cloudflare configuration changes
- ✓ No Cloudflare zone, Pages, Workers, or other resource creation
- ✓ No custom domain binding
- ✓ No GitHub repository creation or push
- ✓ No search console submission
- ✓ No directory submission
- ✓ No public promotional actions
- ✓ No secrets or tokens printed or exposed

## Recommendation

Card status: **BLOCKED**

This setup gate confirms that critical infrastructure prerequisites are not yet in place. Production launch cannot proceed until the owner completes the required DNS/Cloudflare/GitHub setup and provides explicit deploy authorization.

Next steps:
1. Owner addresses the five critical blockers listed above
2. Owner clarifies the deferred/optional items (search console, analytics, timing)
3. After owner confirmation, ops_bot can be unblocked to verify updated infrastructure state
4. After QA_GO and PM acceptance, ops_bot can proceed with production deployment (pending explicit launch approval)

Consolidator agents can use this artifact to determine final gate status: **BLOCKED until owner action**.
