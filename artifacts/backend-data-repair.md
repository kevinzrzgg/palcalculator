# PalCalculator backend/data repair handoff

Generated: 2026-07-16
Task: t_1be67cb6
Status: repaired with explicit caveats

## Summary

Replaced the frontend-only example dataset with a versioned Palworld 1.0 public-web data build sufficient to exercise P0 calculator utility for normal breeding, reverse parent lookup, route fallback states, passive capture, and caveated IV/stat bands.

The build does not claim official status or perfect accuracy. Special-combo override data remains a documented unsupported/blocking domain because this worker did not find a separately verified special-combo table that satisfies the no-fabrication rule.

## Data version

- dataVersion: `palworld-1-0_public-web_2026-07-16_r1`
- gameVersionLabel: `Palworld 1.0 public-web data build`
- lastUpdated: `2026-07-16`
- checksum: recorded in `public/data/version.json`

## Data files updated/created

Public runtime data:

- `public/data/version.json`
- `public/data/schema-version.json`
- `public/data/pals.latest.json`
- `public/data/aliases.latest.json`
- `public/data/breeding-pairs.latest.json`
- `public/data/special-combos.latest.json`
- `public/data/passives.latest.json`
- `public/data/stat-formulas.latest.json`

Bundled app data mirrors:

- `src/data/version.json`
- `src/data/schema-version.json`
- `src/data/pals.latest.json`
- `src/data/aliases.latest.json`
- `src/data/breeding-pairs.latest.json`
- `src/data/special-combos.latest.json`
- `src/data/passives.latest.json`
- `src/data/stat-formulas.latest.json`

Calculator code:

- `src/calculators.ts`
- `src/main.tsx`
- `src/main.test.ts`

## Source categories and caveats

Sources recorded in `version.json` and exposed on `/data-sources/`:

- Palworld.gg breeding calculator rendered public Pal list / CombiRank table: `https://palworld.gg/breeding-calculator`
- PalDB public Pal list: `https://paldb.cc/en/Pals`
- PalDB individual Pal pages for selected base stat fields: example `https://paldb.cc/en/Anubis`
- Pocketpair/Steam official news feed for patch/version awareness: `https://store.steampowered.com/news/app/1623730`

Unsupported domains are explicitly listed instead of guessed:

- verified special combo override table
- guaranteed passive inheritance odds
- server-side save upload
- full IV exactness with all modifiers

## Validation evidence

Commands run in `/root/projects/palcalculator`:

```text
npm test -- --run
```

Result:

```text
Test Files  1 passed (1)
Tests  6 passed (6)
```

```text
npm run build
```

Result:

```text
tsc -b && vite build && node scripts/generate-static-routes.mjs
✓ built in 615ms
Generated 10 route-specific HTML files, 4 sitemap URLs, explicit slash redirects, and 404.html.
```

Data verification command output:

```text
{
  dataVersion: 'palworld-1-0_public-web_2026-07-16_r1',
  pals: 297,
  pairs: 44253,
  specialCombos: 0,
  unsupported: [
    'verified special combo override table',
    'guaranteed passive inheritance odds',
    'server-side save upload',
    'full IV exactness with all modifiers'
  ]
}
```

Search check:

- `src/` and `public/data/` contain no live `DATASET_VERSION_PENDING`, `example_only`, `source-pending`, `BREEDING_DATA_PENDING`, `ROUTE_DATA_PENDING`, or `FORMULA_VERSION_PENDING` production states, except negative assertions in tests.

## Acceptance coverage

1. Pals, aliases, normal breeding pairs, passive seed data, stat-formula caveats, selected base stats, data version, source metadata, update workflow, unsupported domains, and correction path are present.
2. Parent pair to child and target to parents return real data-backed outputs through `src/calculators.ts`.
3. Route solver returns target-owned, empty-owned fallback, direct/partial route, no-route/invalid explanation, alternatives, and tie-break text.
4. IV/stat engine returns formula-versioned caveated ranges/bands and unsupported modifier caveats; exact unsupported domains are not hidden.
5. `/data-sources/` now displays version, last updated, source categories, update/correction policy, unsupported domains, and caveats.
6. No official/guaranteed claims are made; unsupported special combo and exact IV/passive domains are caveated instead of fabricated.

## Remaining backend/data blocker

To fully clear special-combo acceptance without caveat, a downstream data worker or human owner must provide a separately verified Palworld 1.0 special-combo override source/table and permission to use it. Until then the app should not mark outputs as `comboType: special`.
