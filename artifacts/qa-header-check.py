#!/usr/bin/env python3
import base64
import json
import os
import shutil
import subprocess
import tempfile
import time
import urllib.request
from pathlib import Path

import websocket

ROOT = Path('/root/projects/palcalculator')
OUT = ROOT / 'artifacts' / 'qa-screenshots'
OUT.mkdir(parents=True, exist_ok=True)
CHROME = shutil.which('google-chrome') or shutil.which('chromium') or shutil.which('chromium-browser')
if not CHROME:
    raise SystemExit('Chrome executable not found')

class CDP:
    def __init__(self, ws_url):
        self.ws = websocket.create_connection(ws_url, timeout=5)
        self.n = 0
    def call(self, method, params=None):
        self.n += 1
        msg_id = self.n
        self.ws.send(json.dumps({'id': msg_id, 'method': method, 'params': params or {}}))
        while True:
            msg = json.loads(self.ws.recv())
            if msg.get('id') == msg_id:
                if 'error' in msg:
                    raise RuntimeError(f'{method}: {msg["error"]}')
                return msg.get('result', {})
    def close(self):
        self.ws.close()

def wait_json(url, timeout=8):
    deadline = time.time() + timeout
    last = None
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=1) as r:
                return json.load(r)
        except Exception as e:
            last = e
            time.sleep(0.15)
    raise RuntimeError(f'timed out waiting for {url}: {last}')

def wait_complete(cdp):
    deadline = time.time() + 8
    while time.time() < deadline:
        state = cdp.call('Runtime.evaluate', {'expression': 'document.readyState', 'returnByValue': True})['result'].get('value')
        if state == 'complete':
            time.sleep(0.3)
            return
        time.sleep(0.1)
    raise RuntimeError('document did not complete')

metrics_expr = r'''(() => {
  const all = Array.from(document.body.querySelectorAll('*'));
  const rects = all.map((e) => {
    const r = e.getBoundingClientRect();
    return { tag: e.tagName, cls: e.className || '', text: (e.textContent || '').trim().slice(0,80), left: r.left, right: r.right, width: r.width };
  });
  const overflowing = rects.filter(r => r.right > window.innerWidth + 1 || r.left < -1)
    .sort((a,b) => Math.abs(b.right-window.innerWidth)-Math.abs(a.right-window.innerWidth)).slice(0,8);
  const img = document.querySelector('.brand-mark');
  const brand = document.querySelector('.brand');
  return {
    path: location.pathname,
    innerWidth: window.innerWidth,
    docScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    maxRight: Math.max(...rects.map(r => r.right), 0),
    minLeft: Math.min(...rects.map(r => r.left), 0),
    overflowing,
    brandText: brand ? brand.textContent.trim() : null,
    brandImageSrc: img ? img.getAttribute('src') : null,
    brandImageComplete: img ? img.complete : null,
    brandImageNatural: img ? [img.naturalWidth, img.naturalHeight] : null,
    navTexts: Array.from(document.querySelectorAll('nav a')).map(a => a.textContent.trim()),
    navRects: Array.from(document.querySelectorAll('nav a')).map(a => { const r=a.getBoundingClientRect(); return {text:a.textContent.trim(), left:r.left, right:r.right, top:r.top, bottom:r.bottom}; }),
    h1: document.querySelector('h1')?.textContent.trim(),
    ctas: Array.from(document.querySelectorAll('.hero button')).map(b => b.textContent.trim()),
  };
})()'''

def run_case(width, path):
    port = 9300 + (width % 1000) + abs(hash(path)) % 200
    tmp = tempfile.mkdtemp(prefix=f'pc-chrome-{width}-')
    proc = subprocess.Popen([
        CHROME, '--headless=new', '--no-sandbox', '--disable-gpu', '--remote-allow-origins=*', '--hide-scrollbars',
        f'--remote-debugging-port={port}', f'--user-data-dir={tmp}', f'--window-size={width},900',
        f'http://127.0.0.1:4173{path}'
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        pages = wait_json(f'http://127.0.0.1:{port}/json/list')
        page = next(p for p in pages if p.get('type') == 'page')
        cdp = CDP(page['webSocketDebuggerUrl'])
        try:
            cdp.call('Page.enable')
            cdp.call('Runtime.enable')
            cdp.call('Emulation.setDeviceMetricsOverride', {'width': width, 'height': 900, 'deviceScaleFactor': 1, 'mobile': width < 768})
            cdp.call('Page.navigate', {'url': f'http://127.0.0.1:4173{path}'})
            wait_complete(cdp)
            metrics = cdp.call('Runtime.evaluate', {'expression': metrics_expr, 'returnByValue': True})['result']['value']
            name = ('home' if path == '/' else path.strip('/').replace('/','-')) + f'-{width}.png'
            shot = cdp.call('Page.captureScreenshot', {'format': 'png', 'captureBeyondViewport': False})['data']
            (OUT / name).write_bytes(base64.b64decode(shot))
            metrics['screenshot'] = str(OUT / name)
            return metrics
        finally:
            cdp.close()
    finally:
        proc.terminate()
        try: proc.wait(timeout=3)
        except subprocess.TimeoutExpired: proc.kill()
        shutil.rmtree(tmp, ignore_errors=True)

def cta_case(path, button_text):
    port = 9555 + abs(hash(path)) % 200
    tmp = tempfile.mkdtemp(prefix='pc-chrome-cta-')
    proc = subprocess.Popen([
        CHROME, '--headless=new', '--no-sandbox', '--disable-gpu', '--remote-allow-origins=*',
        f'--remote-debugging-port={port}', f'--user-data-dir={tmp}', '--window-size=1280,900',
        f'http://127.0.0.1:4173{path}'
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        pages = wait_json(f'http://127.0.0.1:{port}/json/list')
        page = next(p for p in pages if p.get('type') == 'page')
        cdp = CDP(page['webSocketDebuggerUrl'])
        try:
            cdp.call('Page.enable'); cdp.call('Runtime.enable')
            cdp.call('Page.navigate', {'url': f'http://127.0.0.1:4173{path}'})
            wait_complete(cdp)
            expr = f'''(() => {{ const buttons = Array.from(document.querySelectorAll('.hero button')); const b = buttons.find(b => (b.textContent || '').replace(/\\s+/g, ' ').trim().includes({json.dumps(button_text)})) || document.querySelector('.hero button.primary'); if (!b) return {{found:false, beforeTexts: buttons.map(b => b.textContent)}}; b.click(); return {{found:true, clickedText:(b.textContent || '').replace(/\\s+/g, ' ').trim()}}; }})()'''
            clicked = cdp.call('Runtime.evaluate', {'expression': expr, 'returnByValue': True})['result']['value']
            time.sleep(0.8)
            result = cdp.call('Runtime.evaluate', {'expression': r'''(() => ({
              clicked: true,
              path: location.pathname,
              scrollY: Math.round(window.scrollY),
              activeMarker: document.activeElement?.getAttribute('data-tool-input') || '',
              activeLabel: document.activeElement?.closest('label')?.textContent.trim() || '',
              ctas: Array.from(document.querySelectorAll('.hero button')).map(b => b.textContent.trim())
            }))()''', 'returnByValue': True})['result']['value']
            result.update(clicked)
            return result
        finally:
            cdp.close()
    finally:
        proc.terminate()
        try: proc.wait(timeout=3)
        except subprocess.TimeoutExpired: proc.kill()
        shutil.rmtree(tmp, ignore_errors=True)

out = {
    'layout': [run_case(w, p) for w in [320,360,390,1280] for p in ['/', '/breeding-route-calculator/', '/breeding-calculator/']],
    'cta': {
        'route_primary': cta_case('/breeding-route-calculator/', 'Choose target Pal below'),
        'breeding_primary': cta_case('/breeding-calculator/', 'Check parent pairs below'),
    }
}
print(json.dumps(out, indent=2))
