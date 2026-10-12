#!/usr/bin/env python3
"""
Mason as a toy, in use (2026-10-11): vinyl against flocked on newsletter covers
and YouTube thumbnails, for /prototypes/mason-toy/ (round 3).

The pictures are edit-image runs on api.esy.com (RUNS below), each built
entirely of its material: the Camouflage covers from his flat camouflaged
figure (so his markings stay exact), everything else from the material's
studio shot. The model draws no text and no logos. This script adds them:
  - newsletter covers (1536x864): the product's own logo file and name on the
    blank tag or label the scene left for it, found by its paper colour;
  - YouTube thumbnails (1280x720), on the channel's A · Desk system: the
    product's logo on a lit tile, DIN Condensed pill or headline, esy wordmark.
Logos are the companies' own files in public/images/tools/logos/, never redrawn.

Usage: python3 scripts/mason-toy-media.py   (needs Chrome, Pillow, numpy)
"""

import io
import os
import subprocess
import tempfile
import urllib.request

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public/prototypes/mason-toy')
LOGOS = os.path.join(ROOT, 'public/images/tools/logos')
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
ART = 'https://images.esy.com/artifacts/tool'

NAVY, INK = (10, 37, 64), (8, 18, 32)
JADE, WHITE = (0, 212, 170), (255, 255, 255)
SUP = '/System/Library/Fonts/Supplemental/'
DIN = lambda s: ImageFont.truetype(SUP + 'DIN Condensed Bold.ttf', s)
HN = lambda s, i=0: ImageFont.truetype('/System/Library/Fonts/HelveticaNeue.ttc', s, index=i)
SERIF_I = lambda s: ImageFont.truetype(os.path.join(ROOT, 'public/fonts/cormorant-garamond-700-italic.ttf'), s)
OPS = lambda s: ImageFont.truetype(os.path.join(ROOT, 'public/fonts/black-ops-one-regular.ttf'), s)

# The renders, by material: toy = plain vinyl, flocked = flocked vinyl.
RUNS = {
  'toy': {'camo-dots': 'run-c2028dde', 'camo-muse': 'run-48858c43', 'camo-clay': 'run-13e65593', 'jar': 'run-9a0922b7',
          'crate': 'run-fd63edca', 'yt-desk': 'run-6ba0167b', 'yt-close': 'run-2cff756a', 'yt-tutorial': 'run-81443424'},
  'flocked': {'camo-dots': 'run-9998daae', 'camo-muse': 'run-3ad150f2', 'camo-clay': 'run-b9310db5', 'jar': 'run-207c2e0b',
              'crate': 'run-674299eb', 'yt-desk': 'run-c5869eed', 'yt-close': 'run-1f448b07', 'yt-tutorial': 'run-054ab6ca'},
}
# Each newsletter cover: whose logos go on it, and a point inside the blank tag or label (in the 1536x1024 render).
COVERS = {
  'camo-dots': dict(logos=[('openai.svg', 'Dots')], seed={'toy': (972, 735), 'flocked': (924, 735)}),
  'camo-muse': dict(logos=[('meta.png', 'Muse')], seed={'toy': (1101, 765), 'flocked': (1005, 747)}),
  'camo-clay': dict(logos=[('clay.png', 'Clay'), ('claude.png', 'Claude Code')], seed={'toy': (910, 790), 'flocked': (994, 720)}),
  'jar': dict(logos=[('openai.svg', 'Dots')], seed={'toy': (1038, 798), 'flocked': (1110, 850)}),
  'crate': dict(logos=[('clay.png', 'Clay'), ('claude.png', 'Claude Code')], seed={'toy': (1092, 789), 'flocked': (1113, 768)}),
}


def fetch(run):
  # images.esy.com refuses Python's default user agent
  req = urllib.request.Request(f'{ART}/{run}/step-1.webp', headers={'User-Agent': 'Mozilla/5.0'})
  return Image.open(io.BytesIO(urllib.request.urlopen(req).read())).convert('RGB').resize((1536, 1024), Image.LANCZOS)


def logo(name, size):
  """A company's own logo file at `size` px; SVGs are rasterised by Chrome on a transparent page."""
  path = os.path.join(LOGOS, name)
  if name.endswith('.svg'):
    tmp = tempfile.mkdtemp(); shot = os.path.join(tmp, 'logo.png'); page = os.path.join(tmp, 'logo.html')
    open(page, 'w').write(f'<html><body style="margin:0;background:transparent"><img src="file://{path}" style="width:192px;height:192px"></body></html>')
    subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--default-background-color=00000000',
                    '--window-size=192,192', f'--screenshot={shot}', f'file://{page}'], capture_output=True, check=True)
    path = shot
  im = Image.open(path).convert('RGBA')
  im = im.crop(im.getbbox())
  k = size / max(im.size)
  return im.resize((max(1, int(im.width * k)), max(1, int(im.height * k))), Image.LANCZOS)


# ── Newsletter covers: the logo printed on the blank paper the scene left for it ──
def find_paper(img, seed):
  """The blank tag or label: the patch of its own paper colour grown out from a point inside it."""
  a = np.asarray(img, np.int32)
  sx, sy = seed
  paper = np.median(a[sy - 6:sy + 7, sx - 6:sx + 7].reshape(-1, 3), axis=0)
  near = np.abs(a - paper).sum(axis=2) < 60
  win = np.zeros_like(near); win[max(0, sy - 220):sy + 220, max(0, sx - 260):sx + 260] = True
  m = Image.fromarray(((near & win) * 255).astype(np.uint8)).copy()
  ImageDraw.floodfill(m, (sx, sy), 128)
  ys, xs = np.nonzero(np.asarray(m) == 128)
  xl, xr = np.percentile(xs, [3, 97]); yt, yb = np.percentile(ys, [6, 97])
  return int(xl), int(yt), int(xr), int(yb), paper


def cover(material, kind):
  c = COVERS[kind]
  img = fetch(RUNS[material][kind])
  l, t, r, b, paper = find_paper(img, c['seed'][material])
  w, h = r - l, b - t
  layer = Image.new('RGBA', img.size, (0, 0, 0, 0)); d = ImageDraw.Draw(layer)
  name = ' × '.join(label for _, label in c['logos'])
  if w > h * 1.6:
    # a wide label: logos then the name, in one row
    # sized down until the row fits inside the label with a margin
    k = 1.0
    while True:
      s = int(h * 0.62 * k); f = HN(max(8, int(h * 0.3 * k)), 1)
      marks = [logo(n, s) for n, _ in c['logos']]
      total = sum(m.width for m in marks) + 8 * (len(marks) - 1) + 12 + d.textlength(name, font=f)
      if total <= w * 0.86 or k < 0.4:
        break
      k *= 0.9
    x = l + (w - total) / 2
    for m in marks:
      layer.alpha_composite(m, (int(x), int(t + (h - m.height) / 2))); x += m.width + 8
    d.text((x + 4, t + h / 2), name, font=f, fill=NAVY + (255,), anchor='lm')
  else:
    # a tag: logos above, the name beneath
    s = int(w * (0.36 if len(c['logos']) > 1 else 0.5)); f = HN(int(w * (0.1 if len(c['logos']) > 1 else 0.17)), 1)
    marks = [logo(n, s) for n, _ in c['logos']]
    total = sum(m.width for m in marks) + int(w * 0.06) * (len(marks) - 1)
    x = l + (w - total) // 2; y = t + int(h * 0.28)
    for m in marks:
      layer.alpha_composite(m, (x, y)); x += m.width + int(w * 0.06)
    d.text((l + w / 2, y + max(m.height for m in marks) + int(h * 0.07)), name, font=f, fill=NAVY + (255,), anchor='ma')
  # printed on the paper, so it takes the paper's light
  la = np.asarray(layer, np.float32); la[..., :3] *= min(1.0, float(paper.mean()) / 235); layer = Image.fromarray(la.astype(np.uint8))
  out = img.convert('RGBA'); out.alpha_composite(layer)
  return out.convert('RGB').crop((0, 100, 1536, 964))


# ── YouTube thumbnails, on the A · Desk system ──
def tile(name, size, lift=True):
  """The product's logo on a rounded white tile, lit from behind in jade like the template's objects."""
  t = Image.new('RGBA', (size, size), (0, 0, 0, 0))
  ImageDraw.Draw(t).rounded_rectangle((0, 0, size - 1, size - 1), int(size * 0.22), fill=(250, 250, 248, 255))
  m = logo(name, int(size * 0.62))
  t.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
  return t


def put(img, im, x, y, glow=JADE, strength=0.55):
  layer = Image.new('RGBA', img.size, (0, 0, 0, 0)); layer.alpha_composite(im, (int(x), int(y)))
  a = layer.split()[3].filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(30)).point(lambda v: int(v * strength))
  img = Image.composite(Image.new('RGBA', img.size, glow + (255,)), img, a)
  return Image.alpha_composite(img, layer)


def wordmark(img, x, y, size=34):
  d = ImageDraw.Draw(img); f = OPS(size)
  d.text((x, y), 'e', font=f, fill=JADE); d.text((x + d.textlength('e', font=f), y), 'sy', font=f, fill=WHITE)


def pill(img, cx, y, a, b, size=110):
  """The template's dark pill: white words, the last one jade, with a jade edge and glow."""
  d = ImageDraw.Draw(img); f = DIN(size)
  tw = d.textlength(a + b, font=f)
  box = (cx - tw / 2 - 36, y, cx + tw / 2 + 36, y + size * 1.12)
  edge = Image.new('RGBA', img.size, (0, 0, 0, 0)); ImageDraw.Draw(edge).rounded_rectangle(box, 28, outline=JADE + (255,), width=6)
  a_ = edge.split()[3].filter(ImageFilter.GaussianBlur(14)).point(lambda v: int(v * 0.9))
  img = Image.composite(Image.new('RGBA', img.size, JADE + (255,)), img, a_)
  d = ImageDraw.Draw(img); d.rounded_rectangle(box, 28, fill=INK + (235,), outline=JADE, width=5)
  x = box[0] + 36; yy = y + size * 0.2
  d.text((x, yy), a, font=f, fill=WHITE); d.text((x + d.textlength(a, font=f), yy), b, font=f, fill=JADE)
  return img


def frame(material, kind, y0):
  return fetch(RUNS[material][kind]).crop((0, y0, 1536, y0 + 864)).resize((1280, 720), Image.LANCZOS).convert('RGBA')


def yt_desk(material):
  # news (Dots): Mason at his desk with the five Dots; OpenAI's mark on the left, the pill over the desk
  img = frame(material, 'yt-desk', 100)
  img = put(img, tile('openai.svg', 230), 70, 150)
  img = pill(img, 640, 560, 'MEET ', 'DOTS', 104)
  wordmark(img, 30, 24)
  return img


def yt_close(material):
  # news (Muse): Mason close, pointing left at Meta's mark and a three-word claim
  img = frame(material, 'yt-close', 80)
  img = put(img, tile('meta.png', 190), 70, 120, glow=(0, 130, 251))
  d = ImageDraw.Draw(img); f = DIN(150)
  d.text((70, 350), 'IT ASKS', font=f, fill=WHITE)
  d.text((70, 490), 'FIRST.', font=f, fill=JADE)
  wordmark(img, 1150, 24)  # top right: the claim owns the left
  return img


def yt_tutorial(material):
  # tutorial (Clay + Claude Code): Mason at his lead machine on the left; the two marks and a two-line title on the right
  img = frame(material, 'yt-tutorial', 100)
  # the machine runs under the title's side, so a navy scrim comes in from the right to keep the words clean
  scrim = Image.new('L', img.size, 0)
  for x in range(img.width):
    ImageDraw.Draw(scrim).line((x, 0, x, img.height), fill=int(225 * min(1, max(0, (x - 560) / 200))))
  img = Image.composite(Image.new('RGBA', img.size, (8, 20, 36, 255)), img, scrim)
  img = put(img, tile('clay.png', 130), 720, 96)
  img = put(img, tile('claude.png', 130), 876, 96, glow=(217, 119, 87))
  d = ImageDraw.Draw(img)
  d.text((720, 270), 'Clay + Claude Code', font=HN(58, 1), fill=WHITE)
  d.text((720, 350), 'a lead list that', font=SERIF_I(84), fill=JADE)
  d.text((720, 435), 'builds itself', font=SERIF_I(84), fill=JADE)
  wordmark(img, 30, 24)
  return img


YT = {'yt-desk': yt_desk, 'yt-close': yt_close, 'yt-tutorial': yt_tutorial}

if __name__ == '__main__':
  os.makedirs(OUT, exist_ok=True)
  for material in RUNS:
    for kind in COVERS:
      cover(material, kind).save(os.path.join(OUT, f'use-{material}-{kind}.webp'), quality=88); print(material, kind)
    for kind, fn in YT.items():
      fn(material).convert('RGB').save(os.path.join(OUT, f'use-{material}-{kind}.webp'), quality=88); print(material, kind)
