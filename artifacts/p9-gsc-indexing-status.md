# P9 GSC sitemap/indexing status report — PalCalculator

Checked at: 2026-07-28T14:43:32Z
Task: `t_ad6397b8`
Production canonical origin: `https://palcalculator.com`
Evidence files:
- `/root/projects/palcalculator/artifacts/p9-gsc-live-checks.json`
- `/root/projects/palcalculator/artifacts/p9-www-redirect-verification.md`

## Executive conclusion

- Live sitemap is reachable: `https://palcalculator.com/sitemap.xml` returned HTTP 200 and contains 24 URLs.
- Repo sitemap and live sitemap match exactly: 24 canonical URLs, all on apex HTTPS and trailing-slash route format.
- Live robots is reachable: `https://palcalculator.com/robots.txt` returned HTTP 200; it allows normal crawling, disallows `/share/`, and declares the apex sitemap.
- All 24 canonical sitemap URLs returned HTTP 200, `rel=canonical` to themselves, and `meta robots` = `index,follow` in fetched live HTML.
- Known remaining blocker: `https://www.palcalculator.com/...` still returns HTTP 200, not a host-level 301. This is an owner/operator Cloudflare zone Redirect Rule or Bulk Redirect action, documented in `artifacts/p9-www-redirect-verification.md`; do not wait on it to clean up GSC sitemap submissions.
- Direct Google Search Console access/API is unavailable in this run unless the owner provides browser access/login or a configured API path. This report is based on live HTTP/browser checks plus repository/artifact evidence, not on private GSC rows.

## Live sitemap and robots verification

```text
sitemap: https://palcalculator.com/sitemap.xml -> HTTP 200, 24 <loc> URLs
robots:  https://palcalculator.com/robots.txt  -> HTTP 200
robots body:
User-agent: *
Allow: /
Disallow: /share/
Sitemap: https://palcalculator.com/sitemap.xml
```

## 24 canonical URL checklist

| # | URL | HTTP | Canonical | Robots | Expected GSC treatment |
|---:|---|---:|---|---|---|
| 1 | `https://palcalculator.com/` | 200 | `https://palcalculator.com/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 2 | `https://palcalculator.com/breeding-calculator/` | 200 | `https://palcalculator.com/breeding-calculator/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 3 | `https://palcalculator.com/breeding-route-calculator/` | 200 | `https://palcalculator.com/breeding-route-calculator/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 4 | `https://palcalculator.com/iv-calculator/` | 200 | `https://palcalculator.com/iv-calculator/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 5 | `https://palcalculator.com/stats-calculator/` | 200 | `https://palcalculator.com/stats-calculator/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 6 | `https://palcalculator.com/passive-skill-calculator/` | 200 | `https://palcalculator.com/passive-skill-calculator/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 7 | `https://palcalculator.com/palworld-1-0-breeding-calculator/` | 200 | `https://palcalculator.com/palworld-1-0-breeding-calculator/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 8 | `https://palcalculator.com/data-sources/` | 200 | `https://palcalculator.com/data-sources/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 9 | `https://palcalculator.com/privacy/` | 200 | `https://palcalculator.com/privacy/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 10 | `https://palcalculator.com/terms/` | 200 | `https://palcalculator.com/terms/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 11 | `https://palcalculator.com/guides/palworld-breeding-combos/` | 200 | `https://palcalculator.com/guides/palworld-breeding-combos/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 12 | `https://palcalculator.com/guides/palworld-breeding-tree/` | 200 | `https://palcalculator.com/guides/palworld-breeding-tree/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 13 | `https://palcalculator.com/guides/palworld-1-0-breeding-guide/` | 200 | `https://palcalculator.com/guides/palworld-1-0-breeding-guide/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 14 | `https://palcalculator.com/guides/palworld-iv-explained/` | 200 | `https://palcalculator.com/guides/palworld-iv-explained/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 15 | `https://palcalculator.com/guides/best-passive-skills-for-breeding-palworld/` | 200 | `https://palcalculator.com/guides/best-passive-skills-for-breeding-palworld/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 16 | `https://palcalculator.com/guides/how-to-breed-anubis-palworld/` | 200 | `https://palcalculator.com/guides/how-to-breed-anubis-palworld/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 17 | `https://palcalculator.com/guides/how-to-breed-jetragon-palworld/` | 200 | `https://palcalculator.com/guides/how-to-breed-jetragon-palworld/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 18 | `https://palcalculator.com/guides/palworld-breeding-route-examples/` | 200 | `https://palcalculator.com/guides/palworld-breeding-route-examples/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 19 | `https://palcalculator.com/guides/palworld-breeding-faq/` | 200 | `https://palcalculator.com/guides/palworld-breeding-faq/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 20 | `https://palcalculator.com/guides/how-to-breed-orserk-palworld/` | 200 | `https://palcalculator.com/guides/how-to-breed-orserk-palworld/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 21 | `https://palcalculator.com/guides/how-to-breed-shadowbeak-palworld/` | 200 | `https://palcalculator.com/guides/how-to-breed-shadowbeak-palworld/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 22 | `https://palcalculator.com/guides/palworld-breeding-with-owned-pals/` | 200 | `https://palcalculator.com/guides/palworld-breeding-with-owned-pals/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 23 | `https://palcalculator.com/guides/best-palworld-breeding-combos/` | 200 | `https://palcalculator.com/guides/best-palworld-breeding-combos/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |
| 24 | `https://palcalculator.com/guides/palworld-base-worker-passives/` | 200 | `https://palcalculator.com/guides/palworld-base-worker-passives/` | `index,follow` | Eligible; submit/request indexing if GSC says Discovered/Crawled-not-indexed. |

## Key redirect / alternate URL checks

| Variant URL | HTTP | Location | SEO/GSC interpretation |
|---|---:|---|---|
| `http://palcalculator.com/` | 301 | `https://palcalculator.com/` | HTTP to HTTPS redirect; should appear as redirect/alternate, not canonical indexed URL. |
| `http://www.palcalculator.com/` | 301 | `https://www.palcalculator.com/` | HTTP to HTTPS redirect; should appear as redirect/alternate, not canonical indexed URL. |
| `https://www.palcalculator.com/` | 200 | `` | BLOCKER: live duplicate host; canonical points to apex but host-level 301 still missing. |
| `https://palcalculator.com/breeding-calculator` | 301 | `/breeding-calculator/` | No-slash redirects to slash URL; expected GSC alternate/redirect URL. |
| `https://www.palcalculator.com/breeding-calculator` | 301 | `/breeding-calculator/` | No-slash redirects to slash URL; expected GSC alternate/redirect URL. |
| `https://www.palcalculator.com/guides/palworld-breeding-combos/` | 200 | `` | BLOCKER: live duplicate host; canonical points to apex but host-level 301 still missing. |
| `https://www.palcalculator.com/sitemap.xml` | 200 | `` | BLOCKER: live duplicate host; canonical points to apex but host-level 301 still missing. |
| `https://www.palcalculator.com/robots.txt` | 200 | `` | BLOCKER: live duplicate host; canonical points to apex but host-level 301 still missing. |
| `https://palcalculator.com/breeding-calculator/?mode=target&target=Anubis` | 200 | `` | Query/share state canonicalizes to clean route; browser-rendered tool query sets noindex,follow after JS hydration. |
| `https://www.palcalculator.com/breeding-calculator/?mode=target&target=Anubis` | 200 | `` | BLOCKER: live duplicate host; canonical points to apex but host-level 301 still missing. |

Additional browser evidence:
- Browser-rendered query state check on `https://palcalculator.com/breeding-calculator/?mode=target&target=Anubis`: canonical = `https://palcalculator.com/breeding-calculator/`, robots = `noindex,follow` after hydration.
- Browser-rendered www guide check on `https://www.palcalculator.com/guides/palworld-breeding-combos/`: canonical = `https://palcalculator.com/guides/palworld-breeding-combos/`, robots = `index,follow`; because the host still serves HTTP 200, the www redirect blocker remains real.

## Expected GSC indexing statuses

For the 24 apex sitemap URLs:
- Best/target state: `Indexed` or `Submitted and indexed`.
- Acceptable early state after a recent sitemap expansion: `Discovered - currently not indexed` or `Crawled - currently not indexed`, especially for the newest guide pages.
- Action: inspect and request indexing for the newest six first; do not repeatedly request every old URL unless GSC shows crawl/indexing errors.

For no-slash variants such as `/breeding-calculator`:
- Expected state: `Page with redirect` / alternate URL, because live `_redirects` sends no-slash to trailing-slash canonical.
- Action: no indexing request; keep canonical sitemap with trailing slash only.

For HTTP variants:
- Expected state: `Page with redirect`, because `http://palcalculator.com/...` redirects to HTTPS.
- Action: no indexing request.

For query/share-state URLs such as `?mode=target&target=Anubis`:
- Expected state: alternate canonical / duplicate, and for tool query state browser-rendered robots becomes `noindex,follow`.
- Action: no indexing request; canonical clean route is the URL to index.

For www variants:
- Current problem: `https://www.palcalculator.com/...` returns 200. It canonicalizes to apex but lacks host-level 301.
- Expected until fixed: GSC may show duplicate without user-selected canonical, alternate page with proper canonical, or duplicate/canonical conflict style rows.
- Required owner action: Cloudflare zone-level Redirect Rule/Bulk Redirect from `www.palcalculator.com/*` to `https://palcalculator.com/*` preserving path/query.

## GSC Sitemaps cleanup: rows to remove

Keep only the real sitemap submission:
- `https://palcalculator.com/sitemap.xml`

Remove any GSC Sitemaps rows that are ordinary page URLs submitted as if they were sitemap files. Examples include, but are not limited to:
- Any `https://palcalculator.com/guides/.../` URL submitted under Sitemaps.
- Any tool/page URL such as `https://palcalculator.com/breeding-calculator/`, `/iv-calculator/`, `/stats-calculator/`, etc. submitted under Sitemaps.
- Any `https://www.palcalculator.com/...` sitemap/page submissions.
- Any `http://...` or no-trailing-slash page submissions.

Why: the GSC Sitemaps screen is for sitemap files, not individual URLs. Individual pages should be discovered from `sitemap.xml` or checked with URL Inspection; submitting pages as “sitemaps” creates noisy failed/invalid rows.

### 中文点击步骤：删除错误 Sitemap 行

1. 打开 Google Search Console。
2. 选择资源：`palcalculator.com`（建议用 Domain Property；如果只有 URL-prefix，就选 `https://palcalculator.com/`）。
3. 左侧菜单点击 `索引` / `Indexing` → `站点地图` / `Sitemaps`。
4. 在“已提交的站点地图”列表里，只保留 `https://palcalculator.com/sitemap.xml`。
5. 逐个点开所有普通页面 URL 行，例如 `/guides/.../`、`/breeding-calculator/`、`www.palcalculator.com/...`、`http://...`。
6. 进入该行详情后，点击右上角三点菜单 `⋮`。
7. 点击 `移除站点地图` / `Remove sitemap`。
8. 弹窗确认移除。
9. 回到 Sitemaps 页面，确认列表只剩 `sitemap.xml` 这一条真实 sitemap。
10. 如果 `sitemap.xml` 状态不是成功，重新提交：在“添加新的站点地图”输入框填 `sitemap.xml`，点击 `提交`。

注意：删除错误的 sitemap 行不会删除网页，也不会让页面从 Google 索引中移除；它只是清理错误提交记录。

## Request indexing priority: newest six guide pages

Prioritize URL Inspection → Request Indexing for the newest six sitemap URLs first:

1. `https://palcalculator.com/guides/palworld-breeding-faq/`
2. `https://palcalculator.com/guides/how-to-breed-orserk-palworld/`
3. `https://palcalculator.com/guides/how-to-breed-shadowbeak-palworld/`
4. `https://palcalculator.com/guides/palworld-breeding-with-owned-pals/`
5. `https://palcalculator.com/guides/best-palworld-breeding-combos/`
6. `https://palcalculator.com/guides/palworld-base-worker-passives/`

中文操作：
1. GSC 顶部搜索框粘贴其中一个完整 URL。
2. 等 URL Inspection 完成。
3. 如果显示“URL 不在 Google 上”或“已发现/已抓取但未编入索引”，点击 `请求编入索引`。
4. 如果显示 canonical 指向 apex 且没有 robots/noindex 阻塞，提交即可。
5. 每个 URL 完成后回到列表，继续下一个；不要对 http、www、无斜杠、带 query 的变体请求索引。

## Next 7-day monitoring plan

Day 0 (now):
- Clean GSC Sitemaps rows so only `https://palcalculator.com/sitemap.xml` remains.
- Submit/re-submit `sitemap.xml` if needed.
- Request indexing for the six newest guide pages listed above.
- Leave www redirect as owner-action blocker; do not attempt repo `_redirects` workaround again.

Day 1-2:
- Check GSC Sitemaps: last read/fetch should update and discovered URL count should be 24.
- URL Inspection sample: homepage, one core tool page, and two newest guide pages.
- Expected: some pages may still be `Discovered`/`Crawled not indexed`; that is normal for a young/updated site.

Day 3-4:
- Recheck Coverage/Pages report for `Duplicate, Google chose different canonical`, `Alternate page with proper canonical`, and `Page with redirect`.
- Treat http/no-slash/query rows as OK if apex canonical URLs are clean.
- Treat www rows as unresolved until Cloudflare zone redirect is live.

Day 5-7:
- Confirm at least a subset of the 24 canonical URLs are indexed; focus on top commercial/search-intent guide pages if crawl budget is slow.
- Re-fetch sitemap and robots after any deployment.
- After owner fixes www redirect, validate these commands and then monitor GSC duplicate-host rows falling away:
  - `curl -sSI https://www.palcalculator.com/`
  - `curl -sSI https://www.palcalculator.com/guides/palworld-breeding-combos/`
  - `curl -sSI "https://www.palcalculator.com/breeding-calculator/?mode=target&target=anubis"`

## Remaining blocker / owner action

Owner/operator still needs to apply a Cloudflare zone-level redirect:
- Source host: `www.palcalculator.com`
- Target: `https://palcalculator.com` + original path
- Preserve query string: yes
- Status: 301

Until this is done, GSC may continue to surface duplicate/alternate rows for `www` URLs even though the apex sitemap itself is correct.
