#!/usr/bin/env python3
import json
import re
import sys
from datetime import datetime, timezone
from html.parser import HTMLParser
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
from xml.etree import ElementTree as ET

BASE_URL = "https://palcalculator.com"
DEPLOYMENT_URL = "https://ed7b7846.palcalculator.pages.dev"
TASK_ID = "t_1a5db122"
COMMIT = "be2a2f2"
DEPLOYMENT_ID = "ed7b7846-3218-49f3-8041-a9c0fb1af36a"

ROUTES = [
    "/",
    "/breeding-calculator/",
    "/breeding-route-calculator/",
    "/iv-calculator/",
    "/stats-calculator/",
    "/passive-skill-calculator/",
    "/palworld-1-0-breeding-calculator/",
    "/about/",
    "/contact/",
    "/editorial-policy/",
    "/advertising-disclosure/",
    "/privacy/",
    "/terms/",
    "/data-sources/",
    "/guides/how-to-breed-anubis-palworld/",
    "/guides/best-palworld-breeding-combos/",
    "/guides/how-to-breed-faleris-palworld/",
    "/guides/how-to-breed-selyne-palworld/",
]
CORE = {
    "/",
    "/breeding-calculator/",
    "/breeding-route-calculator/",
    "/iv-calculator/",
    "/stats-calculator/",
    "/passive-skill-calculator/",
    "/palworld-1-0-breeding-calculator/",
}
TRUST = {"/about/", "/contact/", "/editorial-policy/", "/advertising-disclosure/", "/privacy/", "/terms/", "/data-sources/"}
REPRESENTATIVE_OLD_GUIDES = {"/guides/how-to-breed-anubis-palworld/", "/guides/best-palworld-breeding-combos/"}
REPRESENTATIVE_NEW_GUIDES = {"/guides/how-to-breed-faleris-palworld/", "/guides/how-to-breed-selyne-palworld/"}
RISKY_RE = re.compile(r"\b(official|guaranteed|100% accurate|exact odds|cheat|bypass|complete wiki)\b", re.I)
SAFE_RISKY_CONTEXT_RE = re.compile(
    r"(unofficial|not affiliated|not official|no\.?\s+palcalculator is an unofficial|not be treated as guaranteed|not treated as official|do not rely|not claimed|no .*guaranteed|not guaranteed)",
    re.I,
)

class HeadParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.in_title = False
        self.metas = []
        self.links = []
        self.scripts = []
        self.h1s = []
        self.in_h1 = False
        self._h1_parts = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title":
            self.in_title = True
        elif tag == "meta":
            self.metas.append(attrs)
        elif tag == "link":
            self.links.append(attrs)
        elif tag == "script":
            self.scripts.append(attrs)
        elif tag == "h1":
            self.in_h1 = True
            self._h1_parts = []

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        elif tag == "h1" and self.in_h1:
            self.in_h1 = False
            self.h1s.append("".join(self._h1_parts).strip())

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.in_h1:
            self._h1_parts.append(data)

def fetch(url):
    req = Request(url, headers={"User-Agent": "palcalculator-p14-live-check/1.0"})
    try:
        with urlopen(req, timeout=25) as resp:
            body = resp.read()
            return {
                "status": resp.status,
                "content_type": resp.headers.get("content-type", ""),
                "body": body,
                "text": body.decode("utf-8", errors="replace"),
                "error": None,
            }
    except HTTPError as e:
        body = e.read()
        return {"status": e.code, "content_type": e.headers.get("content-type", ""), "body": body, "text": body.decode("utf-8", errors="replace"), "error": str(e)}
    except URLError as e:
        return {"status": None, "content_type": "", "body": b"", "text": "", "error": str(e)}

def meta_content(parser, name=None, prop=None):
    for meta in parser.metas:
        if name and meta.get("name", "").lower() == name.lower():
            return meta.get("content", "")
        if prop and meta.get("property", "").lower() == prop.lower():
            return meta.get("content", "")
    return ""

def canonical(parser):
    for link in parser.links:
        if link.get("rel") == "canonical":
            return link.get("href", "")
    return ""

def schema_types(text):
    types = set(re.findall(r'"@type"\s*:\s*"([^"]+)"', text))
    types.update(re.findall(r"'@type'\s*:\s*'([^']+)'", text))
    return sorted(types)

def risky_scan(text):
    unsafe = []
    caveated = []
    compact = re.sub(r"\s+", " ", text)
    for match in RISKY_RE.finditer(compact):
        context = compact[max(0, match.start() - 120):match.end() + 120]
        item = {"term": match.group(0), "context": context}
        if SAFE_RISKY_CONTEXT_RE.search(context):
            caveated.append(item)
        else:
            unsafe.append(item)
    return unsafe, caveated

def route_check(path):
    url = BASE_URL + path
    result = fetch(url)
    parser = HeadParser()
    parser.feed(result["text"])
    risky_matches, caveated_risky_matches = risky_scan(result["text"])
    expected_canonical = BASE_URL + path
    return {
        "url": url,
        "group": "core" if path in CORE else "trust" if path in TRUST else "old_guide" if path in REPRESENTATIVE_OLD_GUIDES else "new_guide" if path in REPRESENTATIVE_NEW_GUIDES else "other",
        "status": result["status"],
        "content_type": result["content_type"],
        "title": parser.title.strip(),
        "h1s": parser.h1s,
        "canonical": canonical(parser),
        "canonical_expected": expected_canonical,
        "canonical_ok": canonical(parser) == expected_canonical,
        "robots": meta_content(parser, name="robots"),
        "robots_ok": meta_content(parser, name="robots") == "index,follow",
        "description_length": len(meta_content(parser, name="description")),
        "schema_types": schema_types(result["text"]),
        "has_data_sources_link": "/data-sources/" in result["text"],
        "has_unofficial_caveat": "unofficial fan-made" in result["text"].lower() or "fan-made" in result["text"].lower(),
        "risky_matches": risky_matches,
        "caveated_risky_matches": caveated_risky_matches,
        "passed": result["status"] == 200 and canonical(parser) == expected_canonical and meta_content(parser, name="robots") == "index,follow" and len(meta_content(parser, name="description")) >= 120 and not risky_matches,
    }

def main():
    failures = []
    route_results = {path: route_check(path) for path in ROUTES}
    for path, result in route_results.items():
        if not result["passed"]:
            failures.append(f"route {path} failed: status={result['status']} canonical_ok={result['canonical_ok']} robots={result['robots']} desc_len={result['description_length']} risky={result['risky_matches']}")

    sitemap_resp = fetch(BASE_URL + "/sitemap.xml")
    sitemap_urls = []
    sitemap_parse_error = None
    try:
        root = ET.fromstring(sitemap_resp["text"])
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        sitemap_urls = [node.text for node in root.findall(".//sm:loc", ns)]
    except Exception as e:
        sitemap_parse_error = str(e)
    sitemap_leaks = [u for u in sitemap_urls if u and ("?" in u or "/share/" in u or "result" in u)]
    sitemap_expected_paths = [BASE_URL + path for path in ["/about/", "/contact/", "/editorial-policy/", "/advertising-disclosure/"]]
    sitemap = {
        "status": sitemap_resp["status"],
        "content_type": sitemap_resp["content_type"],
        "url_count": len(sitemap_urls),
        "expected_count": 38,
        "missing_p14_trust_urls": [url for url in sitemap_expected_paths if url not in sitemap_urls],
        "query_share_results_leaks": sitemap_leaks,
        "parse_error": sitemap_parse_error,
        "passed": sitemap_resp["status"] == 200 and len(sitemap_urls) == 38 and not sitemap_leaks and sitemap_parse_error is None,
    }
    if not sitemap["passed"]:
        failures.append(f"sitemap failed: {sitemap}")

    robots_resp = fetch(BASE_URL + "/robots.txt")
    robots_body = robots_resp["text"]
    robots = {
        "status": robots_resp["status"],
        "content_type": robots_resp["content_type"],
        "has_allow": "Allow: /" in robots_body,
        "has_share_disallow": "Disallow: /share/" in robots_body,
        "has_sitemap": "Sitemap: https://palcalculator.com/sitemap.xml" in robots_body,
        "body": robots_body,
    }
    robots["passed"] = robots["status"] == 200 and robots["has_allow"] and robots["has_share_disallow"] and robots["has_sitemap"]
    if not robots["passed"]:
        failures.append(f"robots failed: {robots}")

    ads_resp = fetch(BASE_URL + "/ads.txt")
    ads_body = ads_resp["text"].strip()
    ads = {
        "status": ads_resp["status"],
        "content_type": ads_resp["content_type"],
        "body": ads_body,
        "expected_line_present": "google.com, pub-8075999128078609, DIRECT, f08c47fec0942fa0" in ads_body,
    }
    ads["passed"] = ads["status"] == 200 and ads["expected_line_present"]
    if not ads["passed"]:
        failures.append(f"ads.txt failed: {ads}")

    homepage = fetch(BASE_URL + "/")
    script_checks = {
        "google_analytics_snippet_present": "G-8G78ED7TNS" in homepage["text"],
        "google_adsense_snippet_present": "ca-pub-8075999128078609" in homepage["text"],
        "no_intrusive_paywall_terms": not re.search(r"paywall|checkout|subscription|login required|sign in to use", homepage["text"], re.I),
    }
    script_checks["passed"] = all(script_checks.values())
    if not script_checks["passed"]:
        failures.append(f"homepage snippet/paywall failed: {script_checks}")

    deployment = fetch(DEPLOYMENT_URL + "/")
    deployment_url_check = {
        "url": DEPLOYMENT_URL + "/",
        "status": deployment["status"],
        "content_type": deployment["content_type"],
        "has_p14_about_link": "/about/" in deployment["text"],
        "passed": deployment["status"] == 200 and "/about/" in deployment["text"],
    }
    if not deployment_url_check["passed"]:
        failures.append(f"deployment url failed: {deployment_url_check}")

    result = {
        "task_id": TASK_ID,
        "verified_at_utc": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "base_url": BASE_URL,
        "deployment_url": DEPLOYMENT_URL,
        "deployment_id": DEPLOYMENT_ID,
        "commit": COMMIT,
        "qa_go_confirmed": True,
        "routes": route_results,
        "sitemap": sitemap,
        "robots": robots,
        "ads_txt": ads,
        "homepage_snippets": script_checks,
        "deployment_url_check": deployment_url_check,
        "passed": not failures,
        "failures": failures,
    }
    print(json.dumps(result, indent=2))
    return 0 if result["passed"] else 1

if __name__ == "__main__":
    sys.exit(main())
