# P13 QA — five new SEO guide pages

Task: `t_1941d753`
Status: GO / safe to deploy
Deploy performed: no

## Conclusion

GO. The five P13 guide pages are safe for the next approved deploy step. Test, lint, build, sitemap, static SEO, risky-term, local HTTP, and 390px mobile smoke checks passed with no deploy performed.

## Commands run

| Check | Result | Evidence |
|---|---|---|
| `npm run test` | PASS | Vitest: 1 test file passed, 34 tests passed. |
| `npm run lint` | PASS with warnings | ESLint completed with 0 errors and 37 warnings in `src/main.tsx` (React fast-refresh / hook dependency warnings; same warning class documented in P13 implementation handoff). |
| `npm run build` | PASS | `tsc -b`, Vite production build, and `scripts/generate-static-routes.mjs` completed. Static generator reported 34 route-specific HTML files, 34 sitemap URLs, explicit slash redirects, and `404.html`. |

## Sitemap

PASS.

- `public/sitemap.xml`: 34 `<loc>` URLs.
- `dist/sitemap.xml`: 34 `<loc>` URLs after rebuild.
- No sitemap query URLs.
- No `/share/` URLs.
- No `/results/` URLs.
- Five P13 URLs present:
  - `https://palcalculator.com/guides/how-to-breed-faleris-palworld/`
  - `https://palcalculator.com/guides/how-to-breed-kitsun-palworld/`
  - `https://palcalculator.com/guides/how-to-breed-suzaku-palworld/`
  - `https://palcalculator.com/guides/how-to-breed-helzephyr-palworld/`
  - `https://palcalculator.com/guides/how-to-breed-selyne-palworld/`

## Five new page static checks

| Route | HTTP | Meta desc length | Canonical | Robots | Schema | Links / CTAs | Risky terms |
|---|---:|---:|---|---|---|---|---|
| `/guides/how-to-breed-faleris-palworld/` | 200 | 144 | self | `index,follow` | `TechArticle`, `FAQPage` with 5 Qs | `/data-sources/` + calculator CTAs present | PASS |
| `/guides/how-to-breed-kitsun-palworld/` | 200 | 147 | self | `index,follow` | `TechArticle`, `FAQPage` with 5 Qs | `/data-sources/` + calculator CTAs present | PASS |
| `/guides/how-to-breed-suzaku-palworld/` | 200 | 142 | self | `index,follow` | `TechArticle`, `FAQPage` with 5 Qs | `/data-sources/` + calculator CTAs present | PASS |
| `/guides/how-to-breed-helzephyr-palworld/` | 200 | 144 | self | `index,follow` | `TechArticle`, `FAQPage` with 5 Qs | `/data-sources/` + calculator CTAs present | PASS |
| `/guides/how-to-breed-selyne-palworld/` | 200 | 146 | self | `index,follow` | `TechArticle`, `FAQPage` with 5 Qs | `/data-sources/` + calculator CTAs present | PASS |

Notes:
- Static HTML was checked under `dist/guides/.../index.html` after rebuild.
- Risk scan checked source and dist for: `official`, `guaranteed`, `100% accurate`, `exact odds`, `cheat`, `bypass`, `complete wiki`.
- The generated pages contain the required safety caveat word `Unofficial`; this was treated as a caveat, not an `official` claim. No standalone official-claim matches or other blocked terms were found in the five new pages.

## Local preview and smoke

PASS.

`npm run preview` could not start a second server because `0.0.0.0:4173` was already in use. I verified the existing local static preview at `http://127.0.0.1:4173` was reachable and returned current rebuilt `dist` content.

HTTP 200 smoke passed for:

- `/`
- `/breeding-route-calculator/`
- `/guides/how-to-breed-lyleen-palworld/` (old guide representative)
- `/guides/how-to-breed-faleris-palworld/` (new guide representative)
- `/guides/how-to-breed-kitsun-palworld/`
- `/guides/how-to-breed-suzaku-palworld/`
- `/guides/how-to-breed-helzephyr-palworld/`
- `/guides/how-to-breed-selyne-palworld/`

Headless Chrome CDP 390x844 mobile smoke passed for:

| Route | Title/H1/canonical/robots | Width / overflow |
|---|---|---|
| `/` | PASS | `innerWidth=390`, `clientWidth=390`, `bodyScrollWidth=390`, `docScrollWidth=390`, `overflowCount=0` |
| `/breeding-route-calculator/` | PASS | `innerWidth=390`, `clientWidth=390`, `bodyScrollWidth=390`, `docScrollWidth=390`, `overflowCount=0` |
| `/guides/how-to-breed-lyleen-palworld/` | PASS | `innerWidth=390`, `clientWidth=390`, `bodyScrollWidth=390`, `docScrollWidth=390`, `overflowCount=0` |
| `/guides/how-to-breed-faleris-palworld/` | PASS | `innerWidth=390`, `clientWidth=390`, `bodyScrollWidth=390`, `docScrollWidth=390`, `overflowCount=0` |

## Preservation checks

PASS.

- Route solver and existing route calculator path smoke passed.
- P11/P12 sitemap behavior preserved at 34 indexable URLs with no query/share/results leaks.
- Share privacy guardrails remain covered by existing passing test suite.
- No login, backend/server storage, DNS, Cloudflare dashboard, GSC, or deploy actions were performed.

## Evidence file

Structured JSON evidence: `artifacts/p13-qa-results.json`

Final line: [DONE]
