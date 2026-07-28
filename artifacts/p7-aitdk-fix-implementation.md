# P7 AITDK SEO fix implementation

Task: `t_182b79d5`
Site evidence: `/root/.hermes/cache/images/img_f4d377361759.jpg`
Input criteria: `artifacts/p7-aitdk-seo-criteria.md`
No production deploy performed.

## Implemented fixes

### Image alt text

- Updated `src/main.tsx` header brand image from an empty decorative alt to `alt="PalCalculator logo"`.
- Removed `aria-hidden="true"` from the brand image so the descriptive alt is not suppressed.
- Preserved the image source, dimensions, class, and surrounding homepage brand link behavior.

Verified rendered homepage DOM at local static preview `http://127.0.0.1:4174/`:

- `img.brand-mark[src="/brand-icon.svg"]` has `alt="PalCalculator logo"`.
- It has no `aria-hidden` attribute.
- There are zero rendered `img` elements with missing or empty alt text on the homepage.

### Meta descriptions

- Rewrote the 10 core route descriptions in `src/main.tsx` to the 140-160 character AITDK target range.
- Updated the matching 10 static-generator route descriptions in `scripts/generate-static-routes.mjs` and matched their `ogDescription` values to prevent stale preview copy.
- Updated the homepage shell metadata in `index.html` to the same 149-character homepage description used by SPA and static generation.
- Rewrote all 14 guide descriptions in `src/guides-data.json` to 140-160 characters.

## Test coverage added

Updated `src/main.test.ts` to guard:

- Brand icon HTML must include `alt="PalCalculator logo"`.
- Brand icon HTML must not include `alt=""` or `aria-hidden="true"`.
- Guide descriptions must be between 140 and 160 characters inclusive, not only <=160.
- The 10 non-guide SPA route descriptions and static-generator route descriptions must stay in parity by path.
- Homepage `index.html` description must match the SPA homepage description.
- Every indexable route description covered by tests must stay in the 140-160 character range.

## Verification

Commands run from `/root/projects/palcalculator`:

1. `npm run test`
   - PASS: 1 test file, 25 tests.
2. `npm run lint`
   - PASS: exit code 0.
   - Existing warnings remain in `src/main.tsx` for react-refresh component export placement and hook dependency warnings; no lint errors.
3. `npm run build`
   - PASS: TypeScript, Vite build, and static route generation completed.
   - Generated 24 route-specific HTML files, 24 sitemap URLs, slash redirects, and `404.html`.
4. Static dist scan:
   - Checked 24 generated `dist/**/index.html` files.
   - Every indexable page had exactly one `<meta name="description">` with 140-160 character content.
   - No static `<img>` tag had missing or empty alt text.
5. Browser DOM check on local static preview:
   - Homepage rendered one image: `/brand-icon.svg` with `alt="PalCalculator logo"`.
   - Rendered homepage meta description count was 1 and length was 149.

## Files changed

- `src/main.tsx`
- `scripts/generate-static-routes.mjs`
- `src/guides-data.json`
- `index.html`
- `src/main.test.ts`
- `artifacts/p7-aitdk-fix-implementation.md`
