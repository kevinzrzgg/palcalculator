#!/usr/bin/env python3
from __future__ import annotations
import json, re, time, urllib.parse, urllib.request
from pathlib import Path

ROOT = Path('/root/projects/palcalculator')
OUT_ROOT = ROOT / 'zh-CN'
SOURCES = sorted([p for p in ROOT.glob('*.md')] + [p for p in (ROOT / 'artifacts').glob('*.md')])
SOURCES = [p for p in SOURCES if OUT_ROOT not in p.parents]

CODE_FENCE_RE = re.compile(r'```[\s\S]*?```')
INLINE_CODE_RE = re.compile(r'`[^`\n]+`')
URL_RE = re.compile(r'https?://[^\s)\]>"\']+')
TASK_RE = re.compile(r'\bt_[0-9a-f]{8}\b')
PATH_RE = re.compile(r'(?<![\w`])(?:/root/projects/palcalculator|/root/\.hermes|/[A-Za-z0-9_.-]+(?:/[A-Za-z0-9_.-]+)+/?)')
ENV_RE = re.compile(r'\b[A-Z][A-Z0-9_]{2,}\b')
PLACE_RE = re.compile(r'xzzp\d{6}zzx')


def dest_for(src: Path) -> Path:
    rel = src.relative_to(ROOT)
    if rel.parent == Path('.'):
        return OUT_ROOT / f'{src.stem}.zh-CN{src.suffix}'
    return OUT_ROOT / rel.parent / f'{src.stem}.zh-CN{src.suffix}'


def protect(text: str):
    vals = []
    def add(v):
        # Lowercase token avoids matching ENV_RE, preventing nested placeholders.
        token = f'xzzp{len(vals):06d}zzx'
        vals.append((token, v))
        return token
    def sub(pattern, s):
        return pattern.sub(lambda m: add(m.group(0)), s)
    # protect full code fences before inline code
    for pat in [CODE_FENCE_RE, INLINE_CODE_RE, URL_RE, TASK_RE, PATH_RE, ENV_RE]:
        text = sub(pat, text)
    return text, vals


def restore(text: str, vals):
    # normalize tokens if Google inserts spaces around them only; exact tokens are usually preserved.
    text = re.sub(r'xzzp\s*(\d{6})\s*zzx', r'xzzp\1zzx', text)
    for token, val in vals:
        text = text.replace(token, val)
    return text


def google_translate(q: str, attempts=4) -> str:
    if not q.strip():
        return q
    url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=' + urllib.parse.quote(q)
    last = None
    for i in range(attempts):
        try:
            req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
            raw = urllib.request.urlopen(req, timeout=30).read().decode('utf-8')
            data = json.loads(raw)
            return ''.join(part[0] for part in data[0] if part and part[0] is not None)
        except Exception as e:
            last = e
            time.sleep(1.5 * (i + 1))
    raise RuntimeError(f'Google translate failed: {last}')


def split_chunks(text: str, max_chars=3200):
    lines = text.splitlines(keepends=True)
    chunks, cur = [], ''
    for line in lines:
        if len(cur) + len(line) > max_chars and cur:
            chunks.append(cur)
            cur = line
        else:
            cur += line
    if cur:
        chunks.append(cur)
    return chunks


def translate_doc(src: Path, dst: Path):
    text = src.read_text(encoding='utf-8')
    masked, vals = protect(text)
    parts = []
    for ch in split_chunks(masked):
        # If a chunk is only placeholders/markdown punctuation/Chinese, keep/translate harmlessly.
        parts.append(google_translate(ch))
        time.sleep(0.08)
    out = restore(''.join(parts), vals)
    # Light cleanup: Google sometimes translates markdown table separator pipes spacing OK; keep trailing newline.
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(out.rstrip() + '\n', encoding='utf-8')
    return len(out)


def main():
    rows = []
    for src in SOURCES:
        dst = dest_for(src)
        try:
            size = translate_doc(src, dst)
            rows.append((src.relative_to(ROOT).as_posix(), dst.relative_to(ROOT).as_posix(), 'DONE', size))
            print(f'DONE {src.relative_to(ROOT)} -> {dst.relative_to(ROOT)} {size} bytes')
        except Exception as e:
            rows.append((src.relative_to(ROOT).as_posix(), dst.relative_to(ROOT).as_posix(), f'ERROR: {e}', 0))
            print(f'ERROR {src}: {e}')
    idx = ['# PalCalculator 中文版 Markdown 索引', '', f'源目录：`{ROOT}`', f'输出目录：`{OUT_ROOT}`', '', '| Source | 中文版 | Status | Size |', '|---|---|---:|---:|']
    for src, dst, st, size in rows:
        idx.append(f'| `{src}` | `{dst}` | {st} | {size} |')
    idx.append('')
    (OUT_ROOT / 'INDEX.md').write_text('\n'.join(idx), encoding='utf-8')
    print(f'INDEX {OUT_ROOT / "INDEX.md"}')
    print(f'TRANSLATED_DONE={sum(1 for r in rows if r[2]=="DONE")} TOTAL={len(rows)}')

if __name__ == '__main__':
    main()
