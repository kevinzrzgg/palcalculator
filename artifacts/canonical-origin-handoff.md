# PalCalculator Canonical Production Origin Handoff

Project: palcalculator
Task: t_a7b1b85f
Agent: ops_bot
UTC checked: 2026-07-16T05:06:22Z

## Decision status

BLOCKED — `https://palcalculator.com` is confirmed registered/owned, but it is not yet confirmed as the owner-approved production canonical origin for SEO launch.

Do not treat the current hardcoded `https://palcalculator.com` values in frontend metadata, `robots.txt`, or `sitemap.xml` as production-approved until the owner explicitly confirms the canonical production origin.

## Evidence inspected

1. Prior setup artifacts:
   - `/root/projects/palcalculator/artifacts/setup-gate-domain-cloudflare.md`
     - says `palcalculator.com` is registered and owned.
     - says DNS remains on Dynadot nameservers, not Cloudflare.
     - says no explicit production deploy or public launch approval was found.
   - `/root/projects/palcalculator/artifacts/setup-gate-domain-repo-cloudflare.md`
     - says `palcalculator.com` is registered and owned.
     - says production launch remains blocked pending owner setup and approval.
   - `/root/projects/palcalculator/artifacts/route-contract.md`
     - line 8 / section 2 keep `{CANONICAL_ORIGIN}` until owner confirms the domain.
     - says if `palcalculator.com` is approved and owned, canonical origin should become `https://palcalculator.com`.
   - `/root/projects/palcalculator/artifacts/seo-audit.md`
     - flags final canonical domain as not owner-confirmed.

2. Fresh DNS/WHOIS checks performed during this task:
   - WHOIS: `PALCALCULATOR.COM` registered at Dynadot; creation `2026-07-16T02:50:32Z`; expiry `2027-07-16T02:50:32Z`; status `clientTransferProhibited`.
   - NS: `ns1.dyna-ns.net`, `ns2.dyna-ns.net`.
   - A: `185.53.179.146`.
   - SOA: `ns1.dyna-ns.net hostmaster.palcalculator.com`.

Interpretation: registration/ownership is present, but DNS still points at registrar/default infrastructure and there is no deploy/public-launch approval or explicit final-origin approval in the inspected artifacts.

## Required owner decision

Owner must explicitly answer:

"Is `https://palcalculator.com` the final owner-approved canonical production origin for PalCalculator, with apex as primary and any `www` host redirected to the apex? May build/deploy use this exact origin in canonical tags, `sitemap.xml`, and `robots.txt` for production indexing?"

If the answer is no, owner must provide the exact final canonical origin, including scheme and host, for example `https://www.example.com` or another approved domain.

## Safe frontend/deploy coordination until owner confirms

Frontend/deploy should not hardcode a production origin without owner approval. Use a build-time canonical-origin input and fail or noindex production builds when it is unset or placeholder.

Recommended variable:

```text
VITE_CANONICAL_ORIGIN=https://palcalculator.com
```

Required normalization/validation:

- Require `https://` for production.
- Strip trailing slash before joining route paths.
- Reject placeholders such as `{CANONICAL_ORIGIN}`, empty values, `http://localhost`, and preview/development hosts for production indexing.
- Generate canonical URLs with trailing slash paths, e.g. `${origin}/breeding-calculator/`.
- Generate `robots.txt` sitemap declaration from the same origin.
- Generate `sitemap.xml` loc values from the same origin.
- If production data is still pending or canonical origin is not approved, set affected tool routes to `noindex,follow` and/or remove them from sitemap per SEO audit.

## Production indexing gate

Until the owner decision above is recorded and frontend/deploy consumes the approved origin safely:

- SEO GO must remain blocked for canonical-origin acceptance.
- Production indexing must remain blocked or conservative (`noindex,follow` / no sitemap entries for unready routes).
- Search console submission and public launch should not proceed.

## Handoff for downstream agents

- `frontend_bot`: parameterize canonical, sitemap, and robots generation from a single build-time origin; do not rely on the current hardcoded `https://palcalculator.com` unless this task is later unblocked with owner approval.
- `seo_bot`: for recheck, accept `https://palcalculator.com` only if this task has been unblocked/completed with explicit owner confirmation. Otherwise keep SEO status blocked on canonical origin and production indexing.
- `deploy_bot`/owner: provide explicit canonical-origin approval before Cloudflare Pages production deployment, custom-domain binding, search console submission, or public launch.

Final line: [BLOCKED]
