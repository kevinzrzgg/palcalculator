#!/usr/bin/env python3
import json
import re
import ssl
import sys
import time
import urllib.request
from datetime import datetime, timezone
from urllib.error import HTTPError, URLError

BASE = "https://palcalculator.com"
DEPLOYMENT_URL = "https://10b3ab96.palcalculator.pages.dev"
PAGES = ["/", "/breeding-route-calculator/", "/breeding-calculator/"]
ASSETS = [
    "/brand-icon.svg",
    "/favicon.svg",
    "/favicon.ico",
    "/apple-touch-icon.png",
    "/icon-192.png",
    "/icon-512.png",
    "/site.webmanifest",
]
META = ["/sitemap.xml", "/robots.txt"]
AD_MARKERS = [
    "adsbygoogle",
    "googlesyndication",
    "doubleclick",
    "ad-slot",
    "ad-container",
    "AdSense",
    "adsense",
]

ctx = ssl.create_default_context()


def fetch(path, attempts=4):
    url = path if path.startswith("http") else BASE + path
    last = None
    for attempt in range(1, attempts + 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "PalCalculatorLiveVerify/1.0"})
            with urllib.request.urlopen(req, timeout=25, context=ctx) as r:
                body = r.read()
                headers = dict(r.headers.items())
                return {
                    "url": url,
                    "status": r.status,
                    "content_type": headers.get("Content-Type", ""),
                    "length": len(body),
                    "body": body,
                    "headers": headers,
                }
        except (HTTPError, URLError, TimeoutError) as exc:
            last = repr(exc)
            time.sleep(3 * attempt)
    raise RuntimeError(f"failed to fetch {url}: {last}")

results = {
    "verified_at": datetime.now(timezone.utc).isoformat(),
    "base": BASE,
    "deployment_url": DEPLOYMENT_URL,
    "pages": {},
    "assets": {},
    "meta": {},
    "app_bundle": {},
    "ad_markers_found": [],
    "sitemap_url_count": None,
    "pass": False,
}

ok = True
app_bundle_paths = set()
for path in PAGES:
    resp = fetch(path)
    text = resp["body"].decode("utf-8", errors="replace")
    expected_canonical = BASE + path
    canonical_ok = f'<link rel="canonical" href="{expected_canonical}"' in text
    app_bundle_paths.update(re.findall(r'<script[^>]+src="([^"]+\.js)"', text))
    app_bundle_paths.update(re.findall(r'<link[^>]+href="([^"]+\.css)"', text))
    page_markers = [m for m in AD_MARKERS if m in text]
    if page_markers:
        results["ad_markers_found"].append({"path": path, "markers": page_markers})
    page_ok = resp["status"] == 200 and canonical_ok and not page_markers
    ok = ok and page_ok
    results["pages"][path] = {
        "status": resp["status"],
        "content_type": resp["content_type"],
        "length": resp["length"],
        "canonical_ok": canonical_ok,
        "expected_canonical": expected_canonical,
        "ad_markers": page_markers,
        "pass": page_ok,
    }

bundle_text = ""
for bundle_path in sorted(app_bundle_paths):
    resp = fetch(bundle_path)
    text = resp["body"].decode("utf-8", errors="replace")
    bundle_markers = [m for m in AD_MARKERS if m in text]
    if bundle_markers:
        results["ad_markers_found"].append({"path": bundle_path, "markers": bundle_markers})
    bundle_text += "\n" + text
    bundle_ok = resp["status"] == 200 and resp["length"] > 0 and not bundle_markers
    ok = ok and bundle_ok
    results["app_bundle"][bundle_path] = {
        "status": resp["status"],
        "content_type": resp["content_type"],
        "length": resp["length"],
        "ad_markers": bundle_markers,
        "pass": bundle_ok,
    }

bundle_requirements = {
    "brand_icon_svg_reference": "/brand-icon.svg" in bundle_text,
    "home_route_cta": "Plan a breeding route" in bundle_text,
    "home_breeding_cta": "Check parent pairs" in bundle_text,
    "route_cta": "Choose target Pal below" in bundle_text,
    "breeding_cta": "Check parent pairs below" in bundle_text,
}
results["app_bundle_requirements"] = bundle_requirements
ok = ok and all(bundle_requirements.values())

for path in ASSETS:
    resp = fetch(path)
    body = resp["body"]
    asset_ok = resp["status"] == 200 and resp["length"] > 0
    if path == "/site.webmanifest":
        text = body.decode("utf-8", errors="replace")
        asset_ok = asset_ok and "/icon-192.png" in text and "/icon-512.png" in text
    ok = ok and asset_ok
    results["assets"][path] = {
        "status": resp["status"],
        "content_type": resp["content_type"],
        "length": resp["length"],
        "pass": asset_ok,
    }

for path in META:
    resp = fetch(path)
    text = resp["body"].decode("utf-8", errors="replace")
    meta_ok = resp["status"] == 200
    details = {}
    if path == "/sitemap.xml":
        urls = re.findall(r"<loc>(.*?)</loc>", text)
        results["sitemap_url_count"] = len(urls)
        details["url_count"] = len(urls)
        details["sample_urls"] = urls[:5]
        meta_ok = meta_ok and len(urls) == 13 and all(u.startswith(BASE + "/") for u in urls)
    if path == "/robots.txt":
        details["has_sitemap"] = f"Sitemap: {BASE}/sitemap.xml" in text
        details["allows_root"] = "Allow: /" in text
        details["disallows_share"] = "Disallow: /share/" in text
        meta_ok = meta_ok and details["has_sitemap"] and details["allows_root"] and details["disallows_share"]
    ok = ok and meta_ok
    results["meta"][path] = {
        "status": resp["status"],
        "content_type": resp["content_type"],
        "length": resp["length"],
        "details": details,
        "pass": meta_ok,
    }

results["pass"] = bool(ok)
print(json.dumps(results, ensure_ascii=False, indent=2))
sys.exit(0 if ok else 1)
