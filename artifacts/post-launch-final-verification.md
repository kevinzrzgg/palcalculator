# PalCalculator Post-launch Final Verification

Project: palcalculator
Date: 2026-07-16

## Verdict

LIVE / DNS propagated / smoke checks passing.

Production URLs:

```text
https://palcalculator.com
https://www.palcalculator.com
```

## DNS propagation

Expected nameservers:

```text
aleena.ns.cloudflare.com
alex.ns.cloudflare.com
```

Fresh resolver checks:

| Resolver | Status | NS answers |
|---|---|---|
| 1.1.1.1 | propagated | aleena.ns.cloudflare.com, alex.ns.cloudflare.com |
| 8.8.8.8 | propagated | aleena.ns.cloudflare.com, alex.ns.cloudflare.com |
| 9.9.9.9 | propagated | aleena.ns.cloudflare.com, alex.ns.cloudflare.com |
| 208.67.222.222 | propagated | aleena.ns.cloudflare.com, alex.ns.cloudflare.com |

## HTTPS smoke checks

| URL | Expected | Result |
|---|---:|---:|
| https://palcalculator.com | 200 | 200 |
| https://www.palcalculator.com | 200 | 200 |
| https://palcalculator.com/sitemap.xml | 200 | 200 |
| https://palcalculator.com/robots.txt | 200 | 200 |
| https://palcalculator.com/share/test | 404 | 404 |
| https://palcalculator.com/results/test | 404 | 404 |

## Evidence artifacts

Earlier detailed ops evidence:

```text
/root/projects/palcalculator/artifacts/domain-launch-verification.md
/root/projects/palcalculator/artifacts/domain-launch-raw-evidence.json
```

This final verification supersedes the earlier temporary “partial DNS propagation” note: current resolver checks show NS propagation complete across tested resolvers.

## Next step

Route to `review_bot` for post-launch data review plan:

```text
/root/projects/palcalculator/artifacts/review-plan.md
```
