# PalCalculator QA Repair Summary

Project: palcalculator
Date: 2026-07-16
Owner: default orchestrator repair after qa_bot NO-GO

## QA blockers repaired

qa_bot reported QA NO-GO for:

1. Missing P0 share/copy URL state.
2. Missing analytics events/provider decision.
3. `npm run preview` serving unknown `/share/*` / `/results/*` paths as homepage 200s instead of a Cloudflare-equivalent static 404.

Repairs implemented:

- Added per-tool `Copy/share result URL` controls for breeding, route, IV, stats, and passive tools.
- Added URL state generation via `URLSearchParams`.
- Added clipboard copy via `navigator.clipboard.writeText`, with URL fallback text.
- Added first-party analytics/event queue hooks:
  - `window.palcalculatorEvents`
  - optional `window.palcalculatorTrack`
  - events: `page_view`, `tool_success`, `tool_error`, `share_copy`, `share_open`
- Replaced `npm run preview` with `scripts/preview-static.mjs`, a static preview server that serves `dist/` and returns real `404.html` responses for unknown/share/result paths.
- Added tests covering share/copy URL state, analytics hooks, and static preview script use.

## Validation evidence

Commands run in `/root/projects/palcalculator`:

```text
npm test && npm run build && npm run lint
```

Result:

```text
Vitest: 1 file, 8 tests passed
Vite build: passed
Static generation: 10 route-specific HTML files, 4 sitemap URLs, explicit slash redirects, and 404.html
ESLint: exit 0, warnings only
```

Static preview probe using `npm run preview -- --port 4177`:

```text
/ -> 200 text/html; charset=utf-8
/breeding-calculator/ -> 200 text/html; charset=utf-8
/sitemap.xml -> 200 application/xml; charset=utf-8
/robots.txt -> 200 text/plain; charset=utf-8
/nonexistent-seo-test-qa -> 404 text/html; charset=utf-8
/share/test -> 404 text/html; charset=utf-8
/results/test -> 404 text/html; charset=utf-8
```

## Remaining non-code launch gates

These are not QA code blockers, but still block production/public launch:

- Owner confirmation for final production canonical origin and indexing approval.
- Cloudflare DNS/Pages setup and permissions.
- GSC/Bing/analytics provider decision before production submission/tracking.
- Explicit production deploy/public launch approval.

## Verdict

QA code blockers from the latest qa_bot NO-GO are repaired and locally verified. Production launch remains blocked by owner/setup gates, not by the repaired code path.
