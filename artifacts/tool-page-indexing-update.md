# Calculator tool page indexing update

## Changed routes

The static route generator now emits `index,follow` robots metadata for these calculator tool pages and includes them in the generated sitemap:

- `/breeding-calculator/`
- `/breeding-route-calculator/`
- `/iv-calculator/`
- `/stats-calculator/`
- `/passive-skill-calculator/`
- `/palworld-1-0-breeding-calculator/`

Existing indexable informational routes remain in the generated sitemap:

- `/`
- `/data-sources/`
- `/privacy/`
- `/terms/`

## SEO caveats

- These pages are unofficial fan-made Palworld tools and should not imply affiliation with, endorsement by, or approval from Pocketpair or the Palworld team.
- Calculator copy should continue to surface data-version, formula, RNG, and accuracy caveats instead of making unsupported official or guaranteed-result claims.
- `/share/` remains disallowed in `robots.txt` so generated/share state URLs do not become crawl targets.
- The generated `404.html` remains `noindex,follow`.
