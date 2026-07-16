# Calculator tool page indexing live verification

## Result

PASS — deployed the updated `dist/` build to Cloudflare Pages production and live-verified the indexed calculator tool pages on `https://palcalculator.com`.

## Deployment

- UTC verification time: `2026-07-16T11:31:50Z`
- Cloudflare Pages project: `palcalculator`
- Deployment URL: `https://49b9d92f.palcalculator.pages.dev`
- Deployment ID: `49b9d92f-9d12-46fc-974b-e65f504842b1`
- Environment / branch: `Production` / `main`
- Source commit deployed: `5c5eb0b fix: index calculator tool pages`

## Commands run

- `npm run build` — passed; Vite built successfully and `scripts/generate-static-routes.mjs` generated 10 route-specific HTML files, 10 sitemap URLs, slash redirects, and `404.html`.
- `wrangler pages deploy dist --project-name palcalculator --branch main --commit-dirty=true` — passed; uploaded 7 new files, reused 17 existing files, and deployed `https://49b9d92f.palcalculator.pages.dev`.
- `wrangler pages deployment list --project-name palcalculator --json` — confirmed latest production deployment ID `49b9d92f-9d12-46fc-974b-e65f504842b1`, branch `main`, source `5c5eb0b`.
- Live HTTPS checks used `curl --resolve palcalculator.com:443:172.67.185.26 ...` because this runner's default resolver still returns stale Dynadot IPv4 `185.53.179.146`; public resolvers `1.1.1.1` and `8.8.8.8` returned Cloudflare A records `172.67.185.26` and `104.21.59.233`.

## Live sitemap verification

Fetched `https://palcalculator.com/sitemap.xml` over Cloudflare HTTPS.

- HTTP status: `200`
- URL count: `10`
- Required routes missing: none
- `/share/` URLs present: none

Confirmed live sitemap includes:

- `https://palcalculator.com/`
- `https://palcalculator.com/breeding-calculator/`
- `https://palcalculator.com/breeding-route-calculator/`
- `https://palcalculator.com/iv-calculator/`
- `https://palcalculator.com/stats-calculator/`
- `https://palcalculator.com/passive-skill-calculator/`
- `https://palcalculator.com/palworld-1-0-breeding-calculator/`
- `https://palcalculator.com/data-sources/`
- `https://palcalculator.com/privacy/`
- `https://palcalculator.com/terms/`

## Live robots.txt verification

Fetched `https://palcalculator.com/robots.txt` over Cloudflare HTTPS.

- HTTP status: `200`
- Contains `Allow: /`: yes
- Contains `Disallow: /share/`: yes

## Representative live page metadata verification

All representative pages returned HTTP `200`, had `<meta name="robots" content="index,follow">`, and had the expected canonical URL.

| Route | HTTP | Robots | Canonical |
| --- | ---: | --- | --- |
| `/` | 200 | `index,follow` | `https://palcalculator.com/` |
| `/breeding-calculator/` | 200 | `index,follow` | `https://palcalculator.com/breeding-calculator/` |
| `/breeding-route-calculator/` | 200 | `index,follow` | `https://palcalculator.com/breeding-route-calculator/` |
| `/iv-calculator/` | 200 | `index,follow` | `https://palcalculator.com/iv-calculator/` |
| `/stats-calculator/` | 200 | `index,follow` | `https://palcalculator.com/stats-calculator/` |
| `/passive-skill-calculator/` | 200 | `index,follow` | `https://palcalculator.com/passive-skill-calculator/` |
| `/palworld-1-0-breeding-calculator/` | 200 | `index,follow` | `https://palcalculator.com/palworld-1-0-breeding-calculator/` |

## Notes

- The runner's default DNS cache/path still resolves `palcalculator.com` IPv4 to Dynadot parking IP `185.53.179.146`, causing plain `curl -4 https://palcalculator.com/...` to time out from this host. Public DNS and Cloudflare-pinned HTTPS checks verify the live Cloudflare production deployment.
- Upstream QA artifact reviewed: `artifacts/tool-page-indexing-qa.md`.
