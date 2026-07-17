# Remove Ads Report

## Summary

Removed third-party ad integrations and reserved ad slot layout from PalCalculator so calculator content follows the hero without blank monetization space.

## Removed from React/Vite source

- `src/main.tsx`
  - Removed the EffectiveCPMNetwork native slot component and all five native slot mounts.
  - Removed the HighPerformanceFormat iframe component and all four iframe slot mounts.
  - Removed the global `window.atOptions` typing that only supported the iframe ad script.
  - Removed ad component rendering between `ToolHero` and the calculator/page content, so tool panels move up normally.

## Removed CSS

- `src/styles.css`
  - Removed reserved slot styles for native/iframe ad containers.
  - Removed responsive banner/rectangle ad rules that could reserve mobile or desktop whitespace.

## Preserved

- Google Analytics and Microsoft Clarity static-route tags remain in `scripts/generate-static-routes.mjs`.
- Route metadata, canonical URLs, sitemap/robots generation, favicon links, and calculator index settings were not changed.

## Verification

- `npm run test` — passed, 10 tests.
- `npm run lint` — passed with the existing React refresh/hook warnings only, 0 errors.
- `npm run build` — passed, generated 10 route-specific HTML files, 10 sitemap URLs, slash redirects, and `404.html`.
- Built output search — no `effectivecpmnetwork`, `highperformanceformat`, `container-`, or visible ad label strings found in `dist`.
- Source search — no `effectivecpmnetwork`, `highperformanceformat`, `container-`, or visible ad label strings found in `src`.

## Notes

A regression test now checks the application source and stylesheet do not reintroduce the removed third-party ad mounts or reserved slot styles.
