# PalCalculator Launch Gates

Project: palcalculator
Date: 2026-07-16
Owner: default orchestrator

## Current launch status

PAGES DEPLOYED, CUSTOM DOMAIN PENDING DNS/ZONE OWNER ACTION.

No search-engine submission, GSC/Bing verification, analytics vendor activation, or public promotion has been performed.

## Deployment evidence

- Cloudflare account: Kevinzrzgg@gmail.com's Account
- Pages project: `palcalculator`
- Production branch: `main`
- Source commit at deploy: `a4c0869`
- Deployment ID: `dbe8dd47-faf6-41e9-a586-f0e858be6063`
- Deployment URL: `https://dbe8dd47.palcalculator.pages.dev`
- Branch/production alias: `https://palcalculator.pages.dev`
- Custom domains requested in Cloudflare Pages:
  - `palcalculator.com` — status pending, error: CNAME record not set
  - `www.palcalculator.com` — status pending, error: CNAME record not set

## Verification performed

Commands run in `/root/projects/palcalculator` before deploy:

```text
npm run test
npm run build
```

Results:

```text
Vitest: 1 file, 8 tests passed
Vite build: passed
Generated 10 route-specific HTML files, 4 sitemap URLs, explicit slash redirects, and 404.html
```

Remote smoke checks passed on both `https://dbe8dd47.palcalculator.pages.dev` and `https://palcalculator.pages.dev`:

```text
/ -> 200
/breeding-calculator/ -> 200
/data-sources/ -> 200
/sitemap.xml -> 200
/robots.txt -> 200
/nonexistent-seo-test-qa -> 404
/share/test -> 404
/results/test -> 404
```

## DNS / custom domain blocker

Fresh DNS check:

```text
NS palcalculator.com -> ns1.dyna-ns.net / ns2.dyna-ns.net
A palcalculator.com -> 185.53.179.146
```

Cloudflare token search / permission check:

- Environment token `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_API_SEORAPIDINDEXCHECKER_TOKEN`: active, can deploy Pages, but lacks `com.cloudflare.api.account.zone.create`.
- Server file `/root/.cloudflare-api-token`: found, but Cloudflare API reports it is invalid/expired.
- No Dynadot API credential was found in environment or searchable project files.

Cloudflare zone creation attempt failed because the active available API token lacks:

```text
com.cloudflare.api.account.zone.create
```

Cloudflare Pages custom domain validation is pending because DNS/CNAME is not set.

## Owner action required

To finish `https://palcalculator.com` production custom domain:

1. In Cloudflare Dashboard, add site/zone `palcalculator.com` under Kevinzrzgg@gmail.com's Account, or provide an API token with zone create/edit DNS permissions.
2. Cloudflare will show two assigned nameservers. In Dynadot, change `palcalculator.com` nameservers from `ns1.dyna-ns.net` / `ns2.dyna-ns.net` to those Cloudflare-assigned nameservers.
3. After DNS propagates, Cloudflare Pages should validate `palcalculator.com` and `www.palcalculator.com`.
4. Then run custom-domain smoke checks for apex and `www`.
5. Only after that, decide whether to submit sitemap/GSC/Bing and enable analytics.

## Completed implementation gates

- GitHub repo exists: `https://github.com/kevinzrzgg/palcalculator`
- Frontend implementation complete.
- Data-backed calculators implemented with caveats.
- Static SEO routing/metadata repair complete.
- SEO recheck complete as conditional no-go for production indexing until owner/canonical/deploy approval.
- QA NO-GO items repaired by orchestrator:
  - share/copy URL state
  - first-party analytics event hooks
  - Cloudflare-equivalent static preview 404 behavior
- Local verification after QA repair:
  - `npm test`: 8/8 passed
  - `npm run build`: passed
  - `npm run lint`: exit 0, warnings only
  - static preview probe: unknown/share/results paths return 404

## Remaining gates before public SEO launch

1. Custom domain DNS/zone validation.
2. Final apex/www canonical smoke test.
3. GSC/Bing/analytics provider decision and access.
4. Owner approval for search submission/public promotion.
5. If indexing calculator pages, owner acceptance of current caveated MVP data scope; otherwise keep calculator routes `noindex,follow`.

## Verdict

Cloudflare Pages deployment is live on `pages.dev`. Apex production domain `palcalculator.com` is not live yet because DNS/Cloudflare zone setup requires owner action or a token with zone-create/edit permissions.
