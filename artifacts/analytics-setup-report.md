# PalCalculator analytics setup report

Task: t_fabe74c0
Date: 2026-07-16
Status: CONFIGURED

## Executive summary

PalCalculator now has a privacy-first minimal analytics path in source for the requested events: `page_view`, `tool_success`, `tool_error`, `share_copy`, and `share_open`.

Current live production HTML also shows Cloudflare Web Analytics beacon injection for aggregate page-view analytics on both `https://palcalculator.com` and `https://www.palcalculator.com`. No GA4/GTM/Plausible/Clarity/PostHog tracker was found in the live HTML probe.

Important caveat: Cloudflare Web Analytics covers aggregate page-view analytics. The custom calculator events are implemented as first-party browser events in `window.palcalculatorEvents` and forwarded to an optional `window.palcalculatorTrack(event, payload)` callback. If the owner wants dashboarded custom events beyond the in-browser queue, the next provider decision should be Cloudflare-native Zaraz/Workers Analytics Engine or another privacy-first custom-event destination.

## What was already implemented before this task

Source file: `src/main.tsx`

Existing hooks found:
- `window.palcalculatorEvents` local event array.
- `window.palcalculatorTrack?.(event, payload)` optional forwarding hook.
- `page_view` on initial route load and SPA navigation.
- `tool_success` / `tool_error` in calculator React effects.
- `share_copy` and `share_open` from share controls.

Existing privacy posture:
- No account/payment requirement.
- No server-side save upload.
- Share URLs are generated client-side.
- Prior privacy copy said analytics provider was pending.

## Changes made

Files changed:
- `src/main.tsx`
- `src/main.test.ts`

Source changes:
1. Typed analytics event names to the minimal required set:
   - `page_view`
   - `tool_success`
   - `tool_error`
   - `share_copy`
   - `share_open`
2. Added shared privacy-safe event context:
   - `page_path`
   - `page_slug`
   - `device_type`
   - `referrer_host` host only, not full URL
   - `data_version`
3. Added `trackToolResult()` so calculator success/error events consistently include:
   - `tool_type`
   - `result_type`
   - `error_code` only for error events
   - `recoverable`
4. Updated share events so they do not send the generated share URL or encoded state.
5. Updated privacy page copy to disclose possible Cloudflare Web Analytics aggregate page views and first-party diagnostic calculator events, with explicit exclusions for raw inputs, share URLs, emails, IP addresses, tokens, and save data.
6. Expanded static tests to assert the first-party analytics hook and required event/property labels remain present.

## Cloudflare / provider evidence inspected without printing secrets

Environment/config evidence:
- `CLOUDFLARE_API_TOKEN` is present and verified active.
- `CLOUDFLARE_ACCOUNT_ID` / `CF_ACCOUNT_ID` are present and match the visible Cloudflare account.
- Cloudflare zone probe for `palcalculator.com` succeeded and returned one active zone.
- Cloudflare Pages project list succeeded and included `palcalculator`.
- No `.env*` files or `wrangler.toml` files were present in the repo search.
- No analytics-specific environment variable names for GA/GTM/Plausible/Umami/PostHog/Clarity were found.

Live HTML evidence:
- `https://palcalculator.com` returned 200 with a browser-like user agent and included a Cloudflare Web Analytics beacon script.
- `https://www.palcalculator.com` returned 200 with a browser-like user agent and included a Cloudflare Web Analytics beacon script.
- Live HTML probe did not find GA4/GTM/Plausible/Clarity/PostHog markers.

No secrets, account IDs, tokens, or beacon tokens are included in this report.

## Event payload safety contract

Do send:
- Route/page identifiers.
- Tool type.
- Result/error category.
- Data version.
- Device bucket.
- Referrer hostname only.
- Copy/share action status.

Do not send:
- Raw owned-Pal lists.
- Raw Palbox/save-file contents.
- Exact pasted input strings.
- Full share URL or encoded share state.
- Email, IP address, account ID, token, cookies, or fingerprinting fields.

## Verification run

Commands run from `/root/projects/palcalculator`:

```text
npm test && npm run lint && npm run build
```

Result:
- Vitest: 1 file passed, 8 tests passed.
- ESLint: 0 errors, 24 warnings. Warnings are React hook/fast-refresh warnings in the existing single-file app style.
- Build: TypeScript + Vite build succeeded and static routes were generated.

## Owner UI steps if custom event dashboards are required

Cloudflare Web Analytics is the preferred privacy-first page-view provider and appears active on live production already. For custom event dashboards, pick one of these owner-approved paths:

1. Cloudflare-native path, preferred if staying Cloudflare-first:
   - Cloudflare Dashboard → select the account/site for `palcalculator.com`.
   - Confirm Web Analytics is enabled for `palcalculator.com`.
   - If custom events are required, create/approve a Cloudflare Zaraz or Workers Analytics Engine destination.
   - Provide only non-secret integration instructions to engineering; do not paste API tokens into chat.
   - Engineering can then attach `window.palcalculatorTrack(event, payload)` to the approved destination.

2. Privacy-first SaaS path, if a custom-event UI is more important:
   - Choose Plausible or Umami for `palcalculator.com`.
   - Create the site/property in the provider dashboard.
   - Share the public site domain / measurement ID only if it is intended to be public.
   - Keep server tokens/API keys in deployment secrets, not source.
   - Confirm retention and cookie/consent behavior, then update `/privacy/` accordingly.

3. Avoid for this MVP unless owner explicitly accepts consent/compliance overhead:
   - GA4/GTM.
   - Microsoft Clarity.
   - Ad/remarketing pixels.
   - Session replay/fingerprinting tools.

## Final notes

No invasive tracker was added. No raw user inputs, emails, IP addresses, tokens, save data, or generated share URLs are collected by the first-party events added in this task.
