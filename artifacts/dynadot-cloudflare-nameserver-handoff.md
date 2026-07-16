# Dynadot → Cloudflare Nameserver Handoff for PalCalculator

Project: palcalculator
Date: 2026-07-16

## Status

Cloudflare zone was created successfully for `palcalculator.com`.

Zone status: `pending` until registrar nameservers are changed.

## Cloudflare nameservers to set in Dynadot

Use exactly these two nameservers:

```text
aleena.ns.cloudflare.com
alex.ns.cloudflare.com
```

## Current public DNS still shows Dynadot

```text
ns1.dyna-ns.net
ns2.dyna-ns.net
```

## DNS records already created in Cloudflare

```text
CNAME palcalculator.com -> palcalculator.pages.dev proxied
CNAME www.palcalculator.com -> palcalculator.pages.dev proxied
```

Cloudflare Pages custom domains are already added:

```text
palcalculator.com
www.palcalculator.com
```

They remain pending until Dynadot nameservers are changed and DNS propagates.

## Dynadot click path

English UI:

1. Log in to Dynadot.
2. Go to **My Domains** → **Manage Domains**.
3. Select `palcalculator.com`.
4. Click **Name Servers** or **DNS Settings**.
5. Choose **Name Servers** / **Custom name servers**.
6. Remove Dynadot nameservers.
7. Add:
   - `aleena.ns.cloudflare.com`
   - `alex.ns.cloudflare.com`
8. Save.

中文界面大意：

1. 登录 Dynadot。
2. 进入 **我的域名** → **管理域名**。
3. 选择 `palcalculator.com`。
4. 点 **名称服务器 / DNS 设置**。
5. 选择 **自定义名称服务器**。
6. 删除原来的：
   - `ns1.dyna-ns.net`
   - `ns2.dyna-ns.net`
7. 填入：
   - `aleena.ns.cloudflare.com`
   - `alex.ns.cloudflare.com`
8. 保存。

## After owner completes Dynadot step

Run:

```bash
dig +short NS palcalculator.com
```

Expected eventually:

```text
aleena.ns.cloudflare.com.
alex.ns.cloudflare.com.
```

Then re-check Pages domain validation and smoke-test:

```text
https://palcalculator.com
https://www.palcalculator.com
```
