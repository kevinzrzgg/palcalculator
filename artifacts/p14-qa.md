# P14 QA: AdSense recovery content and technical SEO

Verdict: GO / safe for next approved deploy step
No deploy performed.

## Scope

Pre-deploy QA for P14 AdSense low-value-content recovery changes:
- build/test/lint verification
- sitemap and crawl-safety checks
- trust page status, metadata, content, and links
- desktop and 390px mobile rendering checks
- AdSense-sensitive basics: ads.txt, robots.txt, sitemap, privacy/terms/contact/editorial/disclosure/about, analytics/AdSense snippets, no intrusive monetization

## Command verification

| Check | Result | Evidence |
|---|---:|---|
| `npm run test` | PASS | 1 test file passed, 35/35 tests passed |
| `npm run lint` | PASS with warnings | 0 errors, 41 existing warnings in `src/main.tsx` from react-refresh/hook rules |
| `npm run build` | PASS | Vite build succeeded; static route generator reported 38 route-specific HTML files and 38 sitemap URLs |

## Sitemap and crawl-safety

Result: PASS

- `dist/sitemap.xml` contains 38 URLs, matching the implementation generator output.
- No sitemap URL contains query state, `/share/`, `result`, or `results` leaks.
- `dist/robots.txt` is present and allows crawling while disallowing `/share/`:
  - `User-agent: *`
  - `Allow: /`
  - `Disallow: /share/`
  - `Sitemap: https://palcalculator.com/sitemap.xml`
- `dist/sitemap.xml` is served as `200 application/xml` by local preview.

## Trust pages

Result: PASS

Checked local preview HTTP 200 responses for:
- `/about/`
- `/contact/`
- `/editorial-policy/`
- `/advertising-disclosure/`
- `/privacy/`
- `/terms/`
- `/data-sources/`

Static metadata checks passed for all trust pages:
- self canonical URL under `https://palcalculator.com/.../`
- `meta name="robots"` = `index,follow`
- visible last-reviewed or last-updated date
- useful explanatory content, caveats, correction/privacy/ad disclosure copy as applicable
- footer/nav trust links present

Risky-claim scan found no unsafe positive claims. Matches for words such as “official” or “guarantee” were negated/caveated, e.g. “unofficial fan-made”, “not affiliated”, and “No ... guaranteed”.

## Homepage and core calculator rendering

Result: PASS

Desktop browser checks:
- `/` rendered hero, nav, cards, beginner/how-it-works modules, guide grid, and trust footer links cleanly.
- Desktop DOM metrics showed no horizontal overflow: `scrollWidth` = `clientWidth` = 1280.
- `/about/` desktop DOM metrics also showed no horizontal overflow.
- Browser console checks after navigation reported 0 console messages and 0 JavaScript errors.

390px mobile screenshot checks:
- `artifacts/p14-screenshots/home.png`
- `artifacts/p14-screenshots/breeding-calculator.png`
- `artifacts/p14-screenshots/breeding-route-calculator.png`
- `artifacts/p14-screenshots/iv-calculator.png`
- `artifacts/p14-screenshots/stats-calculator.png`
- `artifacts/p14-screenshots/passive-skill-calculator.png`
- `artifacts/p14-screenshots/about.png`
- `artifacts/p14-screenshots/contact.png`
- `artifacts/p14-screenshots/editorial-policy.png`
- `artifacts/p14-screenshots/advertising-disclosure.png`

Observed 390px pages stack content correctly, keep navigation usable, and show the P14 depth/trust content without clipped text, visible horizontal overflow, intrusive overlay, paywall, or login/payment gate.

## AdSense-sensitive basics

Result: PASS

- `dist/ads.txt` present and unchanged in expected form: `google.com, pub-8075999128078609, DIRECT, f08c47fec0942fa0`
- `dist/robots.txt` present.
- `dist/sitemap.xml` present and served.
- Privacy, terms, contact, editorial policy, advertising disclosure, about, and data sources are accessible.
- Built source includes Google Analytics snippet: `G-8G78ED7TNS`.
- Built source includes Google AdSense script with client `ca-pub-8075999128078609`.
- No intrusive ad density, modal ad, paywall, checkout, subscription, login gate, backend storage, Stripe/subscription flow, or forced account path observed in source/static/browser checks.

Note: Browser runtime loaded Google/AdSense support scripts on localhost, but no intrusive ad units or blocking overlays were visible in the sampled rendered pages.

## Issues

None found.

## Recommendation

GO: P14 is safe for the next owner-approved deploy step. No deploy was performed by QA.

Detailed machine-readable evidence: `artifacts/p14-qa-results.json`.
