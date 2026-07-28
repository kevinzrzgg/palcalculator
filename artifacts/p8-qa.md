# P8 QA — Share URLs and Crawlable Internal Links

Project: PalCalculator
Task: `t_392907f6`
QA owner: `qa_bot`
Generated: 2026-07-28T00:54:59Z
Production deploy: not performed

## Conclusion

GO — P8 is safe to deploy from QA perspective.

No P0/P1 blockers were found. The implementation passed command verification, browser share/query hydration checks, privacy boundary checks, crawlable-link checks, sitemap/canonical guardrails, and a 390px mobile route smoke check.

## Verification commands

Run from `/root/projects/palcalculator`:

| Command | Result | Evidence |
|---|---:|---|
| `npm run test` | PASS | Vitest: 1 test file passed, 27 tests passed. |
| `npm run lint` | PASS | ESLint exited 0 with 0 errors and 29 warnings. Warnings are the known React Fast Refresh / hook dependency class already present in this file. |
| `npm run build` | PASS | `tsc -b`, Vite build, and `scripts/generate-static-routes.mjs` passed; generated 24 route-specific HTML files, 24 sitemap URLs, slash redirects, and `404.html`. |

## Browser QA

Local preview used: `http://127.0.0.1:4173`.

### Share/copy and query hydration

| Flow | URL tested | Result |
|---|---|---|
| Breeding pair | `/breeding-calculator/?mode=pair&parentA=penking&parentB=bushi` | PASS: fields hydrated as `penking`/`bushi`; result rendered `Penking + Bushi → Sibelyx`; share href stayed on the same route/query; canonical stayed `https://palcalculator.com/breeding-calculator/`; robots changed to `noindex,follow`. |
| Breeding target parents | `/breeding-calculator/?mode=target&target=anubis` | PASS: Target child hydrated as `anubis`; result rendered `66 parent pairs found for Anubis`; share href stayed route/query-only; canonical base route and `noindex,follow` passed. |
| Route | `/breeding-route-calculator/?target=anubis&maxGen=5` | PASS: target and max generations hydrated; result rendered `Route found to Anubis`; share href only included `target` and `maxGen`; owned-Pal privacy copy was visible. |
| IV | `/iv-calculator/?pal=anubis&level=50&hp=500&attack=130&defense=100` | PASS: all numeric fields hydrated; result rendered `Caveated IV bands calculated`; canonical base route and query `noindex,follow` passed. |
| Stats | `/stats-calculator/?pal=anubis&level=30&hp=360&attack=95&defense=75` | PASS: all numeric fields hydrated; result rendered `Expected stat bands calculated`; share href contained only route/query fields. |
| Passives | `/passive-skill-calculator/?target=anubis&passives=artisan,serious` | PASS: target/passives hydrated; result rendered `Passive plan captured` with 2 recognized passives; share href normalized to `passives=artisan%2Cserious`; canonical base route and query `noindex,follow` passed. |

Clipboard behavior: clicking `Copy/share result URL` in the browser produced visible URL fallback when clipboard write was unavailable, and `Open share URL` remained a real anchor href.

Console: no browser console messages or JS errors were observed during the final browser check.

### Owned-Pal localStorage privacy boundary

PASS.

Evidence:
- Added `Anubis` through the browser-local owned Pal helper.
- The helper displayed the saved local Pal and kept the route input separate.
- Route share href remained `http://127.0.0.1:4173/breeding-route-calculator/?target=anubis&maxGen=5`.
- The share href did not include `owned`, raw route text, or the browser-local owned-Pal list.
- Visible copy stated: `Your browser-local owned Pal list is not included in this share URL.`
- Observed first-party analytics event payloads stayed limited to safe route/tool/result/status/device/referrer/data-version buckets. The owned-list helper emitted only `owned_count_bucket` and `storage_scope`, not raw Pal names, full share URLs, emails, IPs, cookies, tokens, or save data.

### Crawlable internal links

PASS.

Browser snapshot confirmed real anchors for:
- header brand and primary nav,
- homepage hero CTAs,
- homepage tool cards,
- beginner result guide CTA,
- calculator related-tool hero CTAs,
- guide cards,
- footer/legal/guide/sitemap links,
- share `Open share URL` controls.

Static/build checks confirmed:
- `dist/index.html` contains anchors to all six main tool routes and guide links.
- `button.card` count in `dist/index.html`: 0.
- 25 generated HTML files checked.
- Broken internal links: 0.
- Bad generated canonicals: 0.
- Unexpected static robots values: 0.

### Sitemap/canonical/query indexing

PASS.

| File | `<loc>` count | Query/share/results leaks |
|---|---:|---:|
| `public/sitemap.xml` | 24 | 0 |
| `dist/sitemap.xml` | 24 | 0 |

Representative query pages kept canonical URLs on base calculator routes and runtime robots as `noindex,follow`. Base/generated static pages stayed `index,follow`; generated 404 stayed noindex.

### Mobile smoke

PASS at 390x844 route page emulation.

Evidence from headless Chrome with device metrics override:
- URL: `/breeding-route-calculator/?target=anubis&maxGen=5`
- viewport: 390x844
- document scrollWidth: 390
- clientWidth: 390
- horizontal overflow: false
- H1 visible: `Palworld Breeding Route Calculator`
- share href visible and route/query-only
- owned-Pal privacy copy visible
- runtime robots: `noindex,follow`
- canonical: `https://palcalculator.com/breeding-route-calculator/`
- header nav anchors remained real hrefs.

## P0/P1/P2

P0: none.

P1: none.

P2:
- `npm run lint` still reports 29 warnings in `src/main.tsx` for React Fast Refresh and missing hook dependencies. Lint exits 0, and these match the known existing warning class from the implementation handoff. Not a deployment blocker for P8.

## Artifacts

- Detailed JSON evidence: `/root/projects/palcalculator/artifacts/p8-qa-results.json`
- This report: `/root/projects/palcalculator/artifacts/p8-qa.md`

## Final status

DONE / GO — safe to deploy after owner review. No production deploy was performed.
