# palcalculator setup/domain/repo/permissions gate

Checked at: 2026-07-16T03:56:40Z
Task: t_455467ef
Card status: BLOCKED
Artifact: /root/projects/palcalculator/artifacts/setup-gate.md

## Scope

This read-only setup gate audits owner-controlled external prerequisites for palcalculator launch readiness:

- Domain ownership/status and launch-relevant DNS readiness.
- GitHub repository access and permissions.
- Cloudflare account/site/DNS/Pages or Workers permissions, where visible.
- Google Search Console access/readiness.
- Bing Webmaster access/readiness.
- Analytics access/configuration readiness.
- Explicit owner production deploy/public launch permission.

No deploy, publish, repository creation, Cloudflare resource creation, DNS mutation, search/webmaster verification, analytics mutation, code push, or other production/public state change was performed.

## Checks performed

Read-only checks only:

1. Inspected local project/control/artifact files under `/root/projects/palcalculator`.
2. Rechecked DNS for `palcalculator.com` using `dig` and registrar using a limited `whois` registrar line.
3. Checked local git/project shape without initializing or modifying a repo.
4. Checked GitHub CLI auth status and candidate repo lookup for `kevinzrzgg/palcalculator`.
5. Checked Cloudflare tooling/env variable names without printing token values.
6. Ran read-only Cloudflare API probes only when an existing token was available; output redacted account IDs and token values.
7. Checked local availability of Google/GSC/Bing/analytics tooling/config evidence without reading credential secrets.
8. Searched project files for analytics/search/permission markers.
9. Validated this artifact contains owner action list, BLOCKED status, launch gate, and no-deploy confirmation.

## Current prerequisite status

| Prerequisite | Status | Non-secret evidence |
|---|---|---|
| Domain ownership/status | PARTIAL / domain registered | `palcalculator.com` resolves; registrar line: `DYNADOT LLC`. |
| DNS launch readiness | BLOCKED | Current NS: `ns1.dyna-ns.net., ns2.dyna-ns.net.`; current A: `185.53.179.146`. Nameservers are not Cloudflare nameservers. |
| GitHub repository access | BLOCKED | `gh auth status` indicates authenticated GitHub access as `kevinzrzgg`: `True`; candidate repo `kevinzrzgg/palcalculator` exists: `False`. |
| GitHub repo permissions | BLOCKED / unconfirmed | CLI auth appears usable, but canonical repo is missing or unconfirmed; owner has not authorized repo creation/push in this card. |
| Cloudflare token/account visibility | PARTIAL | Existing token available/verified via read-only probe: `True`. Account names, if visible, are non-secret only in command output; account IDs were redacted. |
| Cloudflare zone for palcalculator.com | BLOCKED | Read-only zone query result_count: `0`; `palcalculator.com` is not confirmed as a Cloudflare zone. |
| Cloudflare Pages/Workers project | BLOCKED / not confirmed | Read-only Pages probe did not confirm a project named `palcalculator` (`has_palcalculator: false`; Pages list returned no usable project list in this run). No app repo/config present locally to deploy. |
| Google Search Console | BLOCKED / unknown | `gws`/Google config access not available or not proven; no verified property evidence found. |
| Bing Webmaster | BLOCKED / unknown | No Bing Webmaster tooling/access/verification evidence found. |
| Analytics | BLOCKED / missing | No confirmed analytics provider/property ID/config found in local project evidence. |
| Explicit owner production deploy/public launch approval | BLOCKED / missing | Current task says do not deploy/publish; prior artifacts/comments consistently state explicit approval is missing. |

## Missing owner action list

Owner must complete or explicitly confirm these before launch can proceed:

1. GitHub repo: create or explicitly authorize creation of canonical repository `kevinzrzgg/palcalculator`; confirm visibility and automation push permissions.
2. DNS/Cloudflare zone: add `palcalculator.com` to the intended Cloudflare account or confirm an alternate DNS plan; update Dynadot nameservers to Cloudflare nameservers when ready; confirm apex/www routing strategy.
3. Cloudflare permissions/project: provide or confirm a project-appropriate Cloudflare token/account with Pages/Workers/custom-domain permissions; confirm Pages project name, candidate `palcalculator`.
4. GSC/Bing: provide or confirm Google Search Console and Bing Webmaster access/verification plan, or explicitly defer to a manual post-launch task.
5. Analytics: choose analytics provider (for example GA4/Plausible/Cloudflare Web Analytics/Clarity/Umami) and provide property/site ID/access, or explicitly defer.
6. Production approval: after QA_GO/PM acceptance, owner must explicitly approve production deploy, DNS cutover, custom-domain binding, search/sitemap submission, and public launch.

## Launch gate statement

Production remains BLOCKED. Launch must not proceed until the owner-controlled gates above are satisfied and the owner explicitly approves deploy/public launch. In particular, missing/blocked repo, DNS/Cloudflare zone readiness, Cloudflare permissions/project confirmation, and explicit production approval are hard launch blockers.

## Evidence and paths inspected

Primary paths/evidence inspected without exposing secrets:

- `/root/projects/palcalculator/project-control.md`
- `/root/projects/palcalculator/stage-status.md`
- `/root/projects/palcalculator/blocked-log.md`
- `/root/projects/palcalculator/handoff.md` if present
- `/root/projects/palcalculator/artifacts/setup-gate.md`
- `/root/projects/palcalculator/artifacts/setup-gate-domain-cloudflare.md`
- `/root/projects/palcalculator/artifacts/setup-gate-github.md`
- `/root/projects/palcalculator/artifacts/setup-gate-domain-repo-cloudflare.md`
- `/root/projects/palcalculator/artifacts/setup-gate-search-analytics.md`
- `/root/projects/palcalculator/artifacts/setup-gate-owner-permission.md`
- Local command categories: DNS lookup, limited WHOIS registrar lookup, `gh auth status`, `gh repo view`, `wrangler whoami`, read-only Cloudflare API token/zone/pages probes, project file search, config/tool presence checks.

Observed local project shape:

```text
PWD=/root/projects/palcalculator

GIT=
CONFIG_FILES={"package.json": false, "wrangler.json": false, "wrangler.jsonc": false, "wrangler.toml": false, ".env": false, ".env.local": false, "robots.txt": false, "public/robots.txt": false, "sitemap.xml": false, "public/sitemap.xml": false}
```

DNS summary:

```text
NS=ns1.dyna-ns.net. ns2.dyna-ns.net. 
A=185.53.179.146 
CNAME_www=
TXT=
REGISTRAR=DYNADOT LLC
```

GitHub summary (tokens redacted by command filter):

```text
GH_VERSION=gh version 2.93.0 (2026-05-27)

GH_AUTH=
github.com
  ✓ Logged in to github.com account kevinzrzgg (/root/.config/gh/hosts.yml)
  - Active account: true
  - Git operations protocol: https
  - token: [REDACTED]
  - Token scopes: 'gist', 'read:org', 'repo'

REPO_VIEW=
GraphQL: Could not resolve to a Repository with the name 'kevinzrzgg/palcalculator'. (repository)
```

Cloudflare local summary (tokens/account IDs redacted by command filter):

```text
WRANGLER_VERSION=4.92.0

CF_ENV_NAMES=CLOUDFLARE_API_SEORAPIDINDEXCHECKER_TOKEN 
CF_TOKEN_PRESENT=***
CF_SEORAPID_TOKEN_PRESENT=***
WRANGLER_WHOAMI=

 ⛅️ wrangler 4.92.0 (update available 4.111.0)
──────────────────────────────────────────────
Getting User settings...
You are not authenticated. Please run `wrangler login`.
```

Cloudflare read-only API summary (tokens/account IDs not printed):

```json
{
  "token_available": true,
  "token_verify": {
    "http_status": 200,
    "success": true,
    "errors": []
  },
  "zone_query": {
    "http_status": 200,
    "success": true,
    "result_count": 0,
    "zone_names": []
  },
  "accounts_visible": {
    "http_status": 200,
    "success": true,
    "count": 1,
    "names": [
      "Kevinzrzgg@gmail.com's Account"
    ]
  },
  "pages_probe": [
    {
      "account_name": "Kevinzrzgg@gmail.com's Account",
      "http_status": null,
      "success": null,
      "project_count": 0,
      "has_palcalculator": false,
      "matching_names": []
    }
  ]
}
```

GSC/Bing/analytics local evidence summary:

```text
TOOLS=gws:no gcloud:no firebase:yes wrangler:yes gh:yes npm:yes 
CONFIG_DIRS={"/root/.config/gcloud": false, "/root/.config/gws": false, "/root/.credentials": false, "/root/.config/gh": true, "/root/.config/firebase": false}
ENV_NAMES=
```

## Card status

BLOCKED.

## No production change confirmation

Confirmed: this run performed no deploy, no publish, no repo creation, no code push, no Cloudflare zone/resource/project creation, no DNS mutation, no custom domain binding, no search/webmaster verification or submission, no analytics mutation, and no other production state change.
