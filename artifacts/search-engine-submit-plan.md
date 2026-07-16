# PalCalculator Search Engine Setup and Sitemap Submission Plan

Project: PalCalculator
Date: 2026-07-16
Status: OWNER_REPORTED_GSC_SUBMITTED_REQUESTED_INDEXING / BING_READY_FOR_OWNER

## Executive summary

Owner update received: the owner reports that Google Search Console sitemap submission is complete and that URL Inspection indexing was requested for `https://palcalculator.com/`.

I did not verify Google Search Console through an API or logged-in browser, so this artifact records the GSC step as owner-reported, not API-verified. I also did not submit to Bing Webmaster Tools because no verified local Bing/GSC API or logged-in browser access exists in this worker environment.

Public SEO file checks are still good when resolving the domain through propagated public DNS/Cloudflare. The local worker's default resolver still has a stale apex A answer (`185.53.179.146`), but major public resolvers checked now return Cloudflare nameservers and Cloudflare A records.

## Current search engine status

| Channel | Status | Evidence / note | Next action |
|---|---|---|---|
| Google Search Console | OWNER_REPORTED_SUBMITTED | Owner reported sitemap submitted in GSC and indexing requested for `https://palcalculator.com/`. No API proof available locally. | Monitor GSC sitemap row and URL Inspection status over the next few days. |
| Google sitemap URL | READY / LIVE | `https://palcalculator.com/sitemap.xml` returns 200 via propagated Cloudflare resolution; sitemap has 4 canonical URLs. | No action unless GSC reports fetch errors. |
| Google URL Inspection | OWNER_REPORTED_REQUESTED_INDEXING | Owner reported indexing request for homepage. | Do not repeatedly request indexing; wait for Google processing. |
| Bing Webmaster Tools | READY_FOR_OWNER | No local Bing Webmaster API key/tooling/login state found. | Owner should import from GSC or manually add site and submit sitemap. |
| Local API/CLI submission | NOT_AVAILABLE | `gcloud`, `gsutil`, `gws` missing; no Google/GSC/Bing/Webmaster/IndexNow env vars; no local gcloud config/ADC. | Provision safe API credentials later only if owner wants agent-side submission/verification. |

## Evidence collected in this follow-up

### DNS / reachability notes

Public resolver checks at follow-up:

| Resolver | `palcalculator.com NS` | `palcalculator.com A` |
|---|---|---|
| `1.1.1.1` | `aleena.ns.cloudflare.com`, `alex.ns.cloudflare.com` | `104.21.59.233`, `172.67.185.26` |
| `1.0.0.1` | `aleena.ns.cloudflare.com`, `alex.ns.cloudflare.com` | `104.21.59.233`, `172.67.185.26` |
| `8.8.8.8` | `aleena.ns.cloudflare.com`, `alex.ns.cloudflare.com` | `172.67.185.26`, `104.21.59.233` |
| `8.8.4.4` | `alex.ns.cloudflare.com`, `aleena.ns.cloudflare.com` | `104.21.59.233`, `172.67.185.26` |
| `9.9.9.9` | `aleena.ns.cloudflare.com`, `alex.ns.cloudflare.com` | `104.21.59.233`, `172.67.185.26` |
| `208.67.222.222` | `alex.ns.cloudflare.com`, `aleena.ns.cloudflare.com` | `104.21.59.233`, `172.67.185.26` |

Caveat: this worker's default resolver still returned stale apex A `185.53.179.146` during direct `curl -4 https://palcalculator.com`, causing a timeout from this host. That appears to be local resolver cache/stale DNS, not the current public resolver state. Forced Cloudflare-resolution checks below succeeded.

### Live URL checks via propagated Cloudflare resolution

Checks used Cloudflare IP `104.21.59.233` for `palcalculator.com` to bypass this worker's stale default resolver.

| URL checked | Result | Notes |
|---|---:|---|
| `https://palcalculator.com/` | 200 | Homepage reachable. Canonical points to `https://palcalculator.com/`. Meta robots: `index,follow`. |
| `https://palcalculator.com/sitemap.xml` | 200 | XML sitemap reachable and parseable. |
| `https://palcalculator.com/robots.txt` | 200 | Robots file reachable. References the sitemap. |
| `https://www.palcalculator.com` | 200 | WWW hostname reachable through default resolver. |
| `https://www.palcalculator.com/sitemap.xml` | 200 | XML sitemap reachable on www too. |
| `https://www.palcalculator.com/robots.txt` | 200 | Robots reachable on www too. |

### robots.txt

```txt
User-agent: *
Allow: /
Disallow: /share/
Sitemap: https://palcalculator.com/sitemap.xml
```

Interpretation:
- Search crawlers are allowed site-wide.
- `/share/` is intentionally disallowed.
- Sitemap is advertised correctly.

### sitemap.xml

Sitemap URL: `https://palcalculator.com/sitemap.xml`

The live sitemap contains 4 indexable URLs:

```txt
https://palcalculator.com/
https://palcalculator.com/data-sources/
https://palcalculator.com/privacy/
https://palcalculator.com/terms/
```

### Canonical / metadata spot-checks

| Page | HTTP | Canonical | Robots meta | Title/H1 present |
|---|---:|---|---|---|
| `/` | 200 | `https://palcalculator.com/` | `index,follow` | yes |
| `/data-sources/` | 200 | `https://palcalculator.com/data-sources/` | `index,follow` | yes |
| `/privacy/` | 200 | `https://palcalculator.com/privacy/` | `index,follow` | yes |
| `/terms/` | 200 | `https://palcalculator.com/terms/` | `index,follow` | yes |

No critical production SEO code bug was found in the sitemap/robots/canonical checks. No production code changes were made.

## Local tooling/access inspection

Checked without printing secrets:

| Tool/access | Status | Evidence |
|---|---|---|
| `curl` | available | `/usr/bin/curl` |
| `jq` | available | `/usr/bin/jq` |
| `wrangler` | available | Cloudflare tooling present, but not sufficient for GSC/Bing submission |
| `gcloud` | missing | No Google Cloud CLI in PATH |
| `gsutil` | missing | No Google Cloud storage tooling in PATH |
| `gws` | missing | No local Google Workspace/GSC helper CLI in PATH |
| Google local auth config | missing | `~/.config/gcloud` and ADC file not present |
| GSC/Search Console env vars | missing | No matching env var names found |
| Bing/Webmaster/IndexNow env vars | missing | No matching env var names found |
| `/root/.hermes/.env` | present | No Google/GSC/Bing/Webmaster/IndexNow key names found; Cloudflare token name exists but was not printed and is not used for GSC/Bing |

Conclusion: verified GSC/Bing submission access is not available locally. GSC is owner-reported complete; Bing remains owner-side unless credentials are provisioned later.

## Owner UI steps: Google Search Console monitoring

Since the owner reports GSC setup is already done:

1. Open Google Search Console:
   - https://search.google.com/search-console
2. Open the `palcalculator.com` property.
3. Open `Sitemaps`.
4. Confirm submitted sitemap is:
   - `https://palcalculator.com/sitemap.xml`
5. Record exact status shown by Google:
   - `Success`, `Couldn't fetch`, `Pending`, or another exact message.
6. If Google says `Couldn't fetch`, wait 5-15 minutes and retry once; the live sitemap currently returns HTTP 200 through propagated Cloudflare DNS.
7. Open URL Inspection for:
   - `https://palcalculator.com/`
8. Confirm whether it shows `URL is on Google`, `URL is not on Google`, or `Indexing requested`.
9. Do not repeatedly click `Request indexing`; after one request, wait for Google processing.

What to record after follow-up:
- GSC property type used: Domain or URL-prefix.
- Sitemap status and last read time.
- URL Inspection status for homepage.
- Any non-secret error text.

## Owner UI steps: Bing Webmaster Tools

Bing is the remaining search-console setup item.

Fast path if GSC has already been verified:

1. Open Bing Webmaster Tools:
   - https://www.bing.com/webmasters
2. Sign in with the owner Microsoft account.
3. Click `Add a Site`.
4. Choose `Import from Google Search Console` if offered and if the same operator can authorize Google.
5. Select `palcalculator.com`.
6. Complete import.
7. In Bing Webmaster Tools, open the `palcalculator.com` site.
8. Go to `Sitemaps`.
9. Submit:
   - `https://palcalculator.com/sitemap.xml`
10. Confirm sitemap status is queued/successful.

Manual DNS verification path:

1. Open Bing Webmaster Tools:
   - https://www.bing.com/webmasters
2. Click `Add a Site`.
3. Enter:
   - `https://palcalculator.com`
4. When Bing asks for verification, choose DNS/CNAME or meta tag. DNS is preferred for Cloudflare-managed domains.
5. Open Cloudflare dashboard for `palcalculator.com`.
6. Add the exact DNS verification record Bing provides.
7. Return to Bing Webmaster Tools and click `Verify`.
8. Open the verified site.
9. Go to `Sitemaps`.
10. Submit:
    - `https://palcalculator.com/sitemap.xml`
11. Confirm sitemap status is queued/successful.

What to record after completion:
- Verification method used.
- Sitemap submitted: `https://palcalculator.com/sitemap.xml`.
- Bing sitemap status.
- Any errors shown by Bing.

## Optional future API/CLI route

If the owner wants a future agent to submit/verify without UI clicks, provision access safely without pasting secrets into chat:

- Google Search Console:
  - Install/configure a Google CLI/helper or service account flow with Search Console API enabled.
  - Grant the authenticated identity owner/full permission on the GSC property.
  - Provide only confirmation that credentials are installed; do not paste tokens.
- Bing Webmaster Tools:
  - Provide a Bing Webmaster API key or supported OAuth/token setup via a root-only env file.
  - The agent should verify only the variable name exists, not print the token.

Suggested env var names if using API access later:

```txt
PALCALCULATOR_GSC_CREDENTIALS_FILE=/root/.hermes/secrets/palcalculator-gsc.json
PALCALCULATOR_BING_WEBMASTER_API_KEY=[stored in root-only env/secret file]
```

## Next action

1. Owner should monitor GSC sitemap and URL Inspection states; current GSC submission/indexing request is recorded as owner-reported.
2. Owner should complete Bing Webmaster Tools setup and submit `https://palcalculator.com/sitemap.xml`.
3. If Bing/GSC API verification is desired later, provision safe credentials locally and ask a follow-up worker to verify without printing secrets.
4. Recheck direct apex access from this worker later; public resolvers are propagated, but this worker's default resolver still had stale apex A cache during this run.
