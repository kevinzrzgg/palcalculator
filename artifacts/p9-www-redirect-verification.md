# P9 www-to-apex redirect audit

Status: BLOCKED — Cloudflare zone-level redirect required
Task: `t_50b85c56` — P9 ops: audit and implement www to apex 301 redirect
Project: PalCalculator
Checked at: 2026-07-28T22:36Z
Production domain: `https://palcalculator.com/`
Cloudflare Pages project: `palcalculator`
Latest restore deployment URL: `https://3414acbd.palcalculator.pages.dev`

## Summary

`www.palcalculator.com` currently serves the same Pages site as the apex domain with HTTP 200 responses. Cloudflare Pages `_redirects` cannot safely solve host-level `www` to apex canonicalization because Pages `_redirects` sources are file paths and Cloudflare documentation marks domain-level redirects as unsupported in `_redirects`.

I attempted the repo-managed route first, verified it did not change live behavior, then restored the original repo-managed `_redirects` content and redeployed that restoration. No repository source redirect change was kept because the repo-managed mechanism is not capable of host-level canonicalization.

## Initial live behavior

Before the attempted repo-managed change:

| URL | Result |
| --- | --- |
| `http://palcalculator.com/` | 301 to `https://palcalculator.com/` |
| `https://palcalculator.com/` | 200 |
| `http://www.palcalculator.com/` | 301 to `https://www.palcalculator.com/` |
| `https://www.palcalculator.com/` | 200 — duplicate host remains live |
| `https://palcalculator.com/sitemap.xml` | 200 |
| `https://www.palcalculator.com/sitemap.xml` | 200 — duplicate host remains live |
| `https://palcalculator.com/robots.txt` | 200 |
| `https://www.palcalculator.com/robots.txt` | 200 — duplicate host remains live |
| `https://www.palcalculator.com/guides/palworld-breeding-combos/` | 200 — duplicate guide route remains live |

## Repo/config inspection

Repo-managed redirect files and generation:

- `public/_redirects` exists and contains path-only trailing-slash redirects.
- `scripts/generate-static-routes.mjs` generates `dist/_redirects` after Vite build.
- Existing deployment mechanism from prior ops cards is direct Cloudflare Pages deploy:
  - `npx wrangler pages deploy dist --project-name palcalculator --branch main --commit-dirty=true`

Cloudflare documentation checked:

- `https://developers.cloudflare.com/pages/configuration/redirects/`
- The `_redirects` structure defines source as “A file path”.
- The same table lists “Domain-level redirects” as unsupported for `_redirects`.
- Cloudflare’s Pages guide for this exact need is `https://developers.cloudflare.com/pages/how-to/www-redirect/`, which uses Bulk Redirects / zone-level redirecting instead of Pages `_redirects`.

## Repo-managed attempt and rollback

Attempted temporary generated rules:

```text
https://www.palcalculator.com/* https://palcalculator.com/:splat 301
http://www.palcalculator.com/* https://palcalculator.com/:splat 301
```

Verification after deployment showed the rules did not apply:

| URL | Result |
| --- | --- |
| `https://www.palcalculator.com/` | 200, no Location header |
| `https://www.palcalculator.com/guides/palworld-breeding-combos/` | 200, no Location header |
| `https://www.palcalculator.com/sitemap.xml` | 200, no Location header |
| `https://www.palcalculator.com/robots.txt` | 200, no Location header |

Because this confirmed the repo-managed `_redirects` path cannot solve the host canonicalization, I removed those temporary source changes, rebuilt, and redeployed restored `_redirects` content. The restore deployment completed at `https://3414acbd.palcalculator.pages.dev`.

## Verification commands run

Pre/restore verification:

- `npm run test` — PASS: 27 tests passed after restore.
- `npm run lint` — PASS exit 0; 29 existing warnings in `src/main.tsx`.
- `npm run build` — PASS; generated 24 route-specific HTML files, 24 sitemap URLs, explicit slash redirects, and `404.html`.
- `dist/_redirects` restored to path-only slash redirects.
- Restore deployment: `npx wrangler pages deploy dist --project-name palcalculator --branch main --commit-dirty=true` — PASS, deployment URL `https://3414acbd.palcalculator.pages.dev`.

Post-restore live verification:

| URL | Result |
| --- | --- |
| `http://palcalculator.com/` | 301 to `https://palcalculator.com/` |
| `https://palcalculator.com/` | 200 |
| `http://www.palcalculator.com/` | 301 to `https://www.palcalculator.com/` |
| `https://www.palcalculator.com/` | 200 — still needs zone-level redirect |
| `https://www.palcalculator.com/guides/palworld-breeding-combos/` | 200 — still needs zone-level redirect |
| `https://www.palcalculator.com/breeding-calculator` | 301 to `/breeding-calculator/` on the same `www` host; existing slash redirect remains OK |
| `https://palcalculator.com/sitemap.xml` | 200 |
| `https://www.palcalculator.com/sitemap.xml` | 200 — still needs zone-level redirect |
| `https://palcalculator.com/robots.txt` | 200 |
| `https://www.palcalculator.com/robots.txt` | 200 — still needs zone-level redirect |

## Required Cloudflare dashboard action

Use a zone-level redirect, not Pages `_redirects`.

Recommended Cloudflare Redirect Rule steps:

1. Open Cloudflare dashboard.
2. Select the `palcalculator.com` zone/website.
3. Go to `Rules` → `Redirect Rules`.
4. Create a new redirect rule named: `Redirect www to apex`.
5. Matching condition:
   - Field: `Hostname`
   - Operator: `equals`
   - Value: `www.palcalculator.com`
6. Redirect target:
   - Type: Dynamic URL redirect, preserving path.
   - Expression: `concat("https://palcalculator.com", http.request.uri.path)`
   - Preserve query string: enabled.
   - Status code: `301`.
7. Deploy/save the rule.
8. Verify:
   - `curl -sSI https://www.palcalculator.com/` should return `301` with `Location: https://palcalculator.com/`.
   - `curl -sSI https://www.palcalculator.com/guides/palworld-breeding-combos/` should return `301` with `Location: https://palcalculator.com/guides/palworld-breeding-combos/`.
   - `curl -sSI "https://www.palcalculator.com/breeding-calculator/?mode=target&target=anubis"` should return `301` and preserve the query string on the apex URL.
   - `curl -sSI https://palcalculator.com/`, `/sitemap.xml`, and `/robots.txt` on apex should remain `200`.

Cloudflare Bulk Redirects are also acceptable if preferred by the owner’s Cloudflare plan/UI. In that path, create a URL redirect list mapping `https://www.palcalculator.com/*` to `https://palcalculator.com/${1}` with status `301`, attach it via a Bulk Redirect Rule for the zone, and ensure `www` remains proxied in DNS.

## Verdict

BLOCKED. The requested canonical `www` → apex redirect requires a Cloudflare zone-level Redirect Rule or Bulk Redirect, which is outside repo-managed Pages `_redirects` and should be applied by the owner/operator in the Cloudflare dashboard.
