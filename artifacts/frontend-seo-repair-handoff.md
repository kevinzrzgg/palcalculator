# PalCalculator frontend SEO repair handoff

Task: `t_a493338a` — repair technical SEO static routing and metadata
Project directory: `/root/projects/palcalculator`

## Result

Implemented the P0 technical SEO repair in the frontend/static build path.

Key changes:
- Added `scripts/generate-static-routes.mjs` and wired it into `npm run build` after Vite.
- Build now emits route-specific static HTML for all 10 P0 routes:
  - `/`
  - `/breeding-calculator/`
  - `/breeding-route-calculator/`
  - `/iv-calculator/`
  - `/stats-calculator/`
  - `/passive-skill-calculator/`
  - `/palworld-1-0-breeding-calculator/`
  - `/data-sources/`
  - `/privacy/`
  - `/terms/`
- Each emitted route HTML has route-specific initial `<title>`, meta description, canonical, OG title/description, OG URL, robots directive, and an initial static H1 before React loads.
- Removed broad Cloudflare Pages catch-all `/* /index.html 200`; replaced it with explicit no-trailing-slash to trailing-slash redirects only.
- Added `404.html` with `noindex,follow`.
- Applied the conservative data-pending indexability fallback from the SEO audit:
  - tool routes are `noindex,follow` while production Palworld data remains pending;
  - sitemap now includes only `/`, `/data-sources/`, `/privacy/`, and `/terms/`.
- Converted primary header navigation, homepage tool cards, hero CTAs, and footer trust/legal links from button-only navigation to crawlable `<a href="/.../">` links while preserving React client-side enhancement.

## Changed files

- `package.json`
- `public/_redirects`
- `public/sitemap.xml`
- `public/404.html`
- `scripts/generate-static-routes.mjs`
- `src/main.tsx`
- `src/styles.css`
- `artifacts/frontend-seo-repair-handoff.md`

Note: `stage-status.md` and several upstream artifacts were already modified/untracked in the working tree before this handoff and were not part of this repair.

## Validation run

Commands run in `/root/projects/palcalculator`:

```text
npm test && npm run build
```

Result:

```text
Test Files  1 passed (1)
Tests       2 passed (2)
✓ built in 2.18s
Generated 10 route-specific HTML files, 4 sitemap URLs, explicit slash redirects, and 404.html.
exit_code=0
```

## Static HTTP probes

Served `dist/` locally with:

```text
python3 -m http.server 4174 --directory dist
```

Probe results:

```text
/ -> 200 text/html | title='PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators' | robots='index,follow' | canonical='https://palcalculator.com/' | h1='PalCalculator: Palworld Breeding, IV, Stats & Passive Calculators'
/breeding-calculator/ -> 200 text/html | title='Palworld Breeding Calculator - Parent Pairs, Children & Combos' | robots='noindex,follow' | canonical='https://palcalculator.com/breeding-calculator/' | h1='Palworld Breeding Calculator'
/breeding-route-calculator/ -> 200 text/html | title='Palworld Breeding Route Calculator - Shortest Path from Owned Pals' | robots='noindex,follow' | canonical='https://palcalculator.com/breeding-route-calculator/' | h1='Palworld Breeding Route Calculator'
/iv-calculator/ -> 200 text/html | title='Palworld IV Calculator - Check HP, Attack & Defense IVs' | robots='noindex,follow' | canonical='https://palcalculator.com/iv-calculator/' | h1='Palworld IV Calculator'
/stats-calculator/ -> 200 text/html | title='Palworld Stats Calculator - Estimate Pal Stats by Level' | robots='noindex,follow' | canonical='https://palcalculator.com/stats-calculator/' | h1='Palworld Stats Calculator'
/passive-skill-calculator/ -> 200 text/html | title='Palworld Passive Skill Calculator - Plan Breeding Passives' | robots='noindex,follow' | canonical='https://palcalculator.com/passive-skill-calculator/' | h1='Palworld Passive Skill Calculator'
/palworld-1-0-breeding-calculator/ -> 200 text/html | title='Palworld 1.0 Breeding Calculator - Updated Combos & Routes' | robots='noindex,follow' | canonical='https://palcalculator.com/palworld-1-0-breeding-calculator/' | h1='Palworld 1.0 Breeding Calculator'
/data-sources/ -> 200 text/html | title='PalCalculator Data Sources & Update Policy' | robots='index,follow' | canonical='https://palcalculator.com/data-sources/' | h1='PalCalculator Data Sources & Update Policy'
/privacy/ -> 200 text/html | title='Privacy Policy' | robots='index,follow' | canonical='https://palcalculator.com/privacy/' | h1='Privacy Policy'
/terms/ -> 200 text/html | title='Terms of Use' | robots='index,follow' | canonical='https://palcalculator.com/terms/' | h1='Terms of Use'
/nonexistent-seo-test-12345 -> 404 text/html;charset=utf-8 | homepage_title=False
/sitemap_index.xml -> 404 text/html;charset=utf-8 | homepage_title=False
/sitemap.xml -> 200 application/xml
/robots.txt -> 200 text/plain
/404.html -> 200 text/html | title='404 - Page Not Found | PalCalculator' | robots='noindex,follow' | h1='404 - Page Not Found'
```

## Remaining dependencies / risks

- Canonical origin is still set to the current frontend assumption `https://palcalculator.com`; ops/owner confirmation remains required for production SEO GO.
- Tool pages are intentionally `noindex,follow` and removed from sitemap until backend/data repair provides verified production Palworld calculator data.
- This is a code-changing frontend repair and should receive human/code review plus seo_bot recheck before being treated as final GO.
