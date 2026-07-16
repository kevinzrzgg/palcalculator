# palcalculator.com domain launch verification

Checked at: 2026-07-16T07:52:50Z

## Verdict

PARTIAL / DNS propagation still mixed.

Cloudflare-side setup is active:
- Zone `palcalculator.com`: active.
- Cloudflare assigned nameservers: `aleena.ns.cloudflare.com`, `alex.ns.cloudflare.com`.
- Cloudflare DNS records are present and proxied:
  - `palcalculator.com` CNAME -> `palcalculator.pages.dev`
  - `www.palcalculator.com` CNAME -> `palcalculator.pages.dev`
- Cloudflare Pages project `palcalculator` lists all domains:
  - `palcalculator.pages.dev`
  - `palcalculator.com`
  - `www.palcalculator.com`
- Pages custom domains are active:
  - `palcalculator.com`: active
  - `www.palcalculator.com`: active

Public resolver propagation is not complete yet. Some resolvers still return Dynadot nameservers and/or old apex parking IP, so apex `https://palcalculator.com` may fail for users routed through stale DNS caches.

## Public DNS propagation evidence

Expected NS set: `aleena.ns.cloudflare.com`, `alex.ns.cloudflare.com`

| Resolver | Result | NS answers |
|---|---:|---|
| Cloudflare `1.0.0.1` | propagated | `aleena.ns.cloudflare.com`, `alex.ns.cloudflare.com` |
| Google `8.8.4.4` | propagated | `aleena.ns.cloudflare.com`, `alex.ns.cloudflare.com` |
| Quad9 `9.9.9.9` | propagated for NS, but apex A was still stale in a follow-up check | `aleena.ns.cloudflare.com`, `alex.ns.cloudflare.com` |
| OpenDNS `208.67.222.222` | propagated | `aleena.ns.cloudflare.com`, `alex.ns.cloudflare.com` |
| Cloudflare `1.1.1.1` | stale | `ns1.dyna-ns.net`, `ns2.dyna-ns.net` |
| Google `8.8.8.8` | stale | `ns1.dyna-ns.net`, `ns2.dyna-ns.net` |

Default resolver on this host was also stale at check time:
- `palcalculator.com NS` -> Dynadot NS
- `palcalculator.com A` -> `185.53.179.146` (old parking / non-Cloudflare)
- `www.palcalculator.com A` -> Cloudflare IPs `172.67.185.26`, `104.21.59.233`

## Cloudflare API evidence

Queried with the available Cloudflare token from `/root/.hermes/.env`; token values were not printed or stored.

- Zone query HTTP status: 200
- Zone API success: true
- Zone status: active
- Pages project query HTTP status: 200
- Pages custom-domain query HTTP status: 200
- Pages custom-domain API success: true
- `palcalculator.com` custom-domain status: active
- `www.palcalculator.com` custom-domain status: active

Raw sanitized evidence is saved at:
`/root/projects/palcalculator/artifacts/domain-launch-raw-evidence.json`

## Smoke tests

Because this host's default resolver still sends apex `palcalculator.com` to the old parking IP, direct default-resolver apex checks timed out:

| URL | Result |
|---|---|
| `https://palcalculator.com/` | timed out via stale default resolver |
| `https://palcalculator.com/sitemap.xml` | timed out via stale default resolver |
| `https://palcalculator.com/robots.txt` | timed out via stale default resolver |
| `https://palcalculator.com/share/test` | timed out via stale default resolver |
| `https://palcalculator.com/results/test` | timed out via stale default resolver |

Forced apex checks through a propagated Cloudflare IP (`104.21.59.233`) succeeded for the site and static SEO files:

| URL | HTTP | Notes |
|---|---:|---|
| `https://palcalculator.com/` | 200 | HTML served |
| `https://palcalculator.com/sitemap.xml` | 200 | XML served |
| `https://palcalculator.com/robots.txt` | 200 | text served |
| `https://palcalculator.com/share/test` | 404 | Same as fallback Pages domain for this test ID |
| `https://palcalculator.com/results/test` | 404 | Same as fallback Pages domain for this test ID |

Default-resolver `www` checks are already working:

| URL | HTTP | Notes |
|---|---:|---|
| `https://www.palcalculator.com/` | 200 | HTML served |
| `https://www.palcalculator.com/sitemap.xml` | 200 | XML served |
| `https://www.palcalculator.com/robots.txt` | 200 | text served |
| `https://www.palcalculator.com/share/test` | 404 | Same as fallback Pages domain for this test ID |
| `https://www.palcalculator.com/results/test` | 404 | Same as fallback Pages domain for this test ID |

Fallback Pages domain comparison:

| URL | HTTP |
|---|---:|
| `https://palcalculator.pages.dev/` | 200 |
| `https://palcalculator.pages.dev/sitemap.xml` | 200 |
| `https://palcalculator.pages.dev/robots.txt` | 200 |
| `https://palcalculator.pages.dev/share/test` | 404 |
| `https://palcalculator.pages.dev/results/test` | 404 |

The `/share/test` and `/results/test` 404s appear application-level / expected for nonexistent test IDs because they also return 404 on the fallback Pages domain; this is not a domain-binding failure.

## Blockers

No concrete Cloudflare or Pages configuration error found.

Only remaining issue is public DNS propagation/caching. This is expected after a registrar nameserver change and is not actionable from Cloudflare/Pages unless it persists beyond the registrar/TTL window.

## Next actions

1. Recheck public DNS propagation in 2-4 hours, especially:
   - `dig @1.1.1.1 palcalculator.com NS +short`
   - `dig @8.8.8.8 palcalculator.com NS +short`
   - `dig palcalculator.com A +short` from the production monitoring host
2. When all major resolvers return Cloudflare nameservers and Cloudflare A records for apex, repeat the direct apex smoke tests without `--resolve`.
3. If stale Dynadot NS or `185.53.179.146` persists after 24-48 hours, re-check Dynadot delegation and DS/DNSSEC settings.
