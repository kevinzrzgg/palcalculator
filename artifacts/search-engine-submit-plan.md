# PalCalculator Search Engine Setup and Sitemap Submission Plan

Project: PalCalculator
Date: 2026-07-16
Status: BLOCKED_WITH_STEPS

## Executive summary

I verified the live sitemap, robots.txt, homepage canonical basics, and sitemap page canonicals for https://palcalculator.com. The site is ready for owner-side search engine setup, but I did not submit the sitemap to Google Search Console or Bing Webmaster Tools because no verified local GSC/Bing CLI/API access or browser login state was available in this worker environment.

Do not treat this as submission success. The next action is for the owner/operator to log in to Google Search Console and Bing Webmaster Tools and submit `https://palcalculator.com/sitemap.xml` using the UI steps below.

## Evidence collected

### Live URL checks

| URL checked | Result | Notes |
|---|---:|---|
| `https://palcalculator.com` | 200 | Homepage reachable. Canonical points to `https://palcalculator.com/`. Meta robots: `index,follow`. |
| `https://www.palcalculator.com` | 200 | WWW hostname reachable. |
| `https://palcalculator.com/sitemap.xml` | 200 | XML sitemap reachable and parseable. |
| `https://palcalculator.com/robots.txt` | 200 | Robots file reachable. References the sitemap. |
| `http://palcalculator.com` | redirects/final 200 | Final URL observed as `https://palcalculator.com/`. |
| `http://www.palcalculator.com` | redirects/final 200 | Final URL observed as `https://www.palcalculator.com/`. |

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

No critical SEO bug was found that required production code changes in this task.

## Local tooling/access inspection

Checked without printing secrets:

| Tool/access | Status | Evidence |
|---|---|---|
| `curl` | available | `/usr/bin/curl` |
| `jq` | available | `/usr/bin/jq` |
| `node` / `npm` | available | Node v22 path present; project scripts readable |
| `wrangler` | available | Cloudflare tooling present, but not sufficient for GSC/Bing submission |
| `gcloud` | missing | No Google Cloud CLI in PATH |
| `gsutil` | missing | No Google Cloud storage tooling in PATH |
| `gws` | missing | No local Google Workspace/GSC helper CLI in PATH |
| Google local auth config | missing | `~/.config/gcloud` and ADC file not present |
| GSC/Search Console env vars | missing | No matching env var names found |
| Bing/Webmaster/IndexNow env vars | missing | No matching env var names found |
| `/root/.hermes/.env` | present | Only relevant name found was `CLOUDFLARE_API_SEORAPIDINDEXCHECKER_TOKEN`; value not printed and not used for GSC/Bing |

Conclusion: verified GSC/Bing submission access is not available locally. Submission must be done by the owner/operator through the browser UI or by provisioning safe API credentials in a future task.

## Owner UI steps: Google Search Console

Goal: add/verify `palcalculator.com` and submit `https://palcalculator.com/sitemap.xml`.

Recommended property type: Domain property, because it covers both apex and www.

1. Open Google Search Console:
   - https://search.google.com/search-console
2. Click the property selector in the top-left.
3. Click `Add property`.
4. Choose `Domain`.
5. Enter:
   - `palcalculator.com`
6. Google will show a DNS TXT verification record.
7. Open Cloudflare dashboard for `palcalculator.com`.
8. Go to `DNS` → `Records`.
9. Add the TXT record exactly as Google shows it.
   - Type: `TXT`
   - Name: usually `@` or `palcalculator.com` depending on Cloudflare UI
   - Content: Google verification value
   - TTL: Auto
10. Return to Google Search Console and click `Verify`.
11. After verification succeeds, open the new `palcalculator.com` property.
12. In the left sidebar, click `Sitemaps`.
13. Under `Add a new sitemap`, enter:
   - `sitemap.xml`
   - Full sitemap URL should resolve to `https://palcalculator.com/sitemap.xml`.
14. Click `Submit`.
15. Confirm the sitemap row appears with status such as `Success` or `Couldn't fetch` pending refresh.
16. If Google says `Couldn't fetch`, wait 5-15 minutes and retry; the live sitemap currently returns HTTP 200.
17. Optional after sitemap submission: use URL Inspection for `https://palcalculator.com/` and click `Request indexing` if available.

What to record after completion:
- Property type used: Domain or URL-prefix.
- Verification method: DNS TXT recommended.
- Sitemap submitted: `https://palcalculator.com/sitemap.xml`.
- GSC sitemap status and last read time.
- Any errors shown by Google.

## Owner UI steps: Bing Webmaster Tools

Goal: add/verify `palcalculator.com` and submit `https://palcalculator.com/sitemap.xml`.

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

Owner/operator should complete the GSC and Bing UI steps above. After that, update this artifact or comment back with:

```txt
GSC verified: yes/no
GSC sitemap status: [exact status]
Bing verified: yes/no
Bing sitemap status: [exact status]
Any screenshot/error text: [paste non-secret text only]
```

Then a follow-up worker can verify the public sitemap fetch status again and record DONE_SUBMITTED if the search consoles show successful sitemap submission.
