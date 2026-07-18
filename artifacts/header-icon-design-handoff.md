# PalCalculator Header Icon Design Handoff

Task: `t_ad8a9029`
Owner profile: `design_bot`
Date: 2026-07-18
Status: implementation-ready assets placed in repo

## 1. Screenshot issue addressed

The red-box header area in `/root/.hermes/cache/images/img_affd78190169.jpg` currently reads as a generic dark square with `PC` text. It is legible but not distinctive, and at favicon/header scale it does not communicate the product's calculator + breeding-route purpose. The homepage hero CTAs also create mild ambiguity because `Start with a target Pal` and `Calculate breeding` both sound like breeding starts; frontend should preserve one clear primary route-first action and one plain secondary calculator action.

## 2. Final icon concept

Direction: compact rounded-square mark with an original calculator body, small grid buttons, route curve/nodes, and a subtle egg shape. It avoids official Palworld characters, sprites, logos, UI frames, or copied trade dress.

Meaning:
- Rounded square: app/favicon container and header brand anchor.
- Warm calculator card: tool/calculation utility.
- Teal route curve + nodes: breeding route planning.
- Teal-outlined egg: subtle breeding motif without depicting any copyrighted Pal.

## 3. Asset paths

Source / inline-ready SVG:
- `/root/projects/palcalculator/public/brand-icon.svg` — canonical header/app icon source with `<title>` and `<desc>`.
- `/root/projects/palcalculator/public/favicon.svg` — favicon SVG variant with compact `aria-label`.

Generated raster assets:
- `/root/projects/palcalculator/public/favicon-32x32.png` — 32×32 PNG.
- `/root/projects/palcalculator/public/favicon.ico` — ICO containing 32×32 and 48×48 frames.
- `/root/projects/palcalculator/public/apple-touch-icon.png` — 180×180 PNG.
- `/root/projects/palcalculator/public/icon-192.png` — 192×192 PNG.
- `/root/projects/palcalculator/public/icon-512.png` — 512×512 PNG.

Frontend placement already applied:
- `/root/projects/palcalculator/src/main.tsx` uses `<img className="brand-mark" src="/brand-icon.svg" alt="" width="40" height="40" aria-hidden="true"/>` in the header brand link.
- `/root/projects/palcalculator/src/styles.css` updates `.brand-mark` for an image mark with fixed 40px display size, 14px radius, and a subtle shadow.

## 4. Colors

Core brand tokens reused from the existing selected design system:
- Ink / container: `#17212B`
- Warm card / inner calculator: `#FFFDF7`
- Page-warm motif fill: `#F7F4EA`
- Action teal / route + egg outline: `#2A9D8F`

No new brand color was introduced. This keeps the site within the existing 60/30/10 palette direction.

## 5. Sizing guidance

Header:
- Display at 40×40 CSS px on desktop, matching the previous square footprint.
- Keep border radius visually around 14px at 40px.
- Use as decorative inside the text brand link (`alt=""`, `aria-hidden="true"`) because the adjacent text already says `PalCalculator`.

Favicons/app icons:
- SVG source is built on a 64×64 viewBox and remains readable at 32×32.
- The icon uses no text, so it will not blur or become unreadable at small sizes.
- Preserve transparent-free full-square background for app icon masks and browser favicon rendering.

## 6. CTA/header copy notes for frontend_bot

Recommended next frontend copy adjustment if optimizing the two hero CTAs further:
- Primary: `Plan a breeding route` or `Start with target Pal`
- Secondary: `Check parent pair`

Reason: the current pair `Start with a target Pal` + `Calculate breeding` can sound like two versions of the same action. The primary should mean route/owned-Pal planning; the secondary should mean direct parent-pair calculator.

Do not add decorative mascot/character art to solve this. Keep the header clean and data-tool oriented.

## 7. Acceptance criteria

- Header top-left mark is an original non-text icon, not a `PC` letter tile.
- Mark remains identifiable at 32px and 40px.
- Brand link still reads `PalCalculator` next to the mark.
- Favicon SVG and PNG/ICO assets are updated from the same visual source.
- No official Palworld logo, character, sprite, screenshot, extracted asset, or official-style trade dress is used.
- Colors match the existing calm field-guide calculator style.
- Build, lint, and tests should pass before deployment.
