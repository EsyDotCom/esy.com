#!/usr/bin/env python3
"""
Download the site's Google Fonts into src/fonts/, so builds never fetch them.

Why: next/font/google downloads every font from Google during `next build`.
In October 2026 Vercel's and Netlify's build machines started getting font
URLs back that Next's loader can't parse ("Cannot read properties of null
(reading '1')"), failing builds that touched no font code. Committing the
files and loading them with next/font/local takes Google out of the build.

Usage:
  python3 scripts/fetch-google-fonts.py            # every family below
  python3 scripts/fetch-google-fonts.py inter      # one family

Each family is a Google Fonts CSS2 query. Only the latin subset is kept (every
call on the site asked for latin). Files land at
src/fonts/<slug>/<slug>-<weight>-<style>.woff2; a weight range such as
100-900 means a variable font. The script prints the files with their weight
and style, which is what each localFont() `src` entry needs.
"""

import os
import re
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'src/fonts')
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

# slug -> the CSS2 family query (variable fonts as a weight range, the rest as listed weights)
FAMILIES = {
  'geist': 'Geist:wght@100..900',
  'geist-mono': 'Geist+Mono:wght@100..900',
  'newsreader': 'Newsreader:wght@200..800',
  'inter': 'Inter:wght@100..900',
  'literata': 'Literata:wght@200..900',
  'zcool-xiaowei': 'ZCOOL+XiaoWei',
  'noto-serif-jp': 'Noto+Serif+JP:wght@200..900',
  'black-ops-one': 'Black+Ops+One',
  'cormorant-garamond': 'Cormorant+Garamond:ital,wght@0,300..700;1,300..700',
  'young-serif': 'Young+Serif',
  'figtree': 'Figtree:wght@300..900',
  'anton': 'Anton',
  'jetbrains-mono': 'JetBrains+Mono:wght@100..800',
  'funnel-display': 'Funnel+Display:wght@300..800',
  'archivo': 'Archivo:wght@100..900',
  'ibm-plex-mono': 'IBM+Plex+Mono:wght@400;500',
}


def get(url):
  return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA})).read()


def fetch(slug, query):
  css = get(f'https://fonts.googleapis.com/css2?family={query}&display=swap').decode()
  # Google labels each @font-face block with its subset in a comment: keep `/* latin */` only
  blocks = re.findall(r'/\*\s*([\w-]+)\s*\*/\s*@font-face\s*\{(.*?)\}', css, re.S)
  if not blocks:  # single-subset families come without the comment
    blocks = [('latin', b) for b in re.findall(r'@font-face\s*\{(.*?)\}', css, re.S)]
  os.makedirs(os.path.join(OUT, slug), exist_ok=True)
  seen = {}
  for subset, body in blocks:
    if subset != 'latin':
      continue
    style = re.search(r'font-style:\s*(\w+)', body).group(1)
    weight = re.search(r'font-weight:\s*([\d ]+);', body).group(1).strip()
    url = re.search(r'src:\s*url\(([^)]+)\)', body).group(1)
    name = f"{slug}-{weight.replace(' ', '-')}-{style}.woff2"
    if name in seen:
      continue
    path = os.path.join(OUT, slug, name)
    with open(path, 'wb') as f:
      f.write(get(url))
    seen[name] = (weight, style)
    print(f'{slug}/{name}\tweight={weight}\tstyle={style}\t{os.path.getsize(path) // 1024} KB')
  if not seen:
    raise SystemExit(f'{slug}: no latin files in the CSS')


if __name__ == '__main__':
  only = sys.argv[1:]
  for slug, query in FAMILIES.items():
    if not only or slug in only:
      fetch(slug, query)
