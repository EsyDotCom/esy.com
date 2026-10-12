#!/usr/bin/env python3
"""
The Marketing Engineer's channel and social banners in glossy vinyl (2026-10-11),
for /prototypes/vinyl-banners/. Five concepts, each one 2560x1440 picture made
on api.esy.com (edit-image over a plain navy placeholder, so it comes back at
YouTube's full size), with the art in the left half of a band across the middle
and the right half left dark for the words:

  network  a long vinyl network of chamfered nodes and glowing teal tubes into a jade hub
  bench    vinyl Mason wiring up a small glowing network
  line     a conveyor: rough lumps in, through a glowing gantry, precise jade tiles out
  kit      our 45-degree pieces laid out like a model kit, a few lit from inside
  skyline  a vinyl city at night, light running between the towers

Each picture is cut three ways, with the words set here in our own type (the
esy wordmark in Black Ops One, the name in Cormorant, the line in Helvetica Neue)
and kept clear of what each site covers:
  youtube   2560x1440; words inside the centre 1546x423 that phones show
  linkedin  1584x396, the middle 4:1 strip; words right, clear of the photo bottom left
  x         1500x500, the middle 3:1 strip; words right, clear of the photo bottom left

Usage: python3 scripts/vinyl-banners.py   (needs Pillow)
"""

import io
import os
import urllib.request

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public/prototypes/vinyl-banners')
FONTS = os.path.join(ROOT, 'public/fonts')
SERIF = lambda s: ImageFont.truetype(os.path.join(FONTS, 'cormorant-garamond-700-normal.ttf'), s)
SERIF_I = lambda s: ImageFont.truetype(os.path.join(FONTS, 'cormorant-garamond-700-italic.ttf'), s)
OPS = lambda s: ImageFont.truetype(os.path.join(FONTS, 'black-ops-one-regular.ttf'), s)
HN = lambda s: ImageFont.truetype('/System/Library/Fonts/HelveticaNeue.ttc', s, index=0)
JADE, WHITE, SOFT = (0, 212, 170), (248, 250, 252), (209, 218, 228)

# The renders (edit-image, 2560x1440, high), 2026-10-11.
RUNS = {'network': 'run-bf6a4afd', 'bench': 'run-19371777', 'line': 'run-bd6d7574', 'kit': 'run-094fde2a', 'skyline': 'run-9cad22d1'}
# The line under the name: the channel sells the videos, the profiles sell learning it.
LINES = {'youtube': 'Watch me build the AI systems that run marketing.', 'social': 'Learn to build the AI systems that run marketing.'}


def fetch(run):
  # images.esy.com refuses Python's default user agent
  req = urllib.request.Request(f'https://images.esy.com/artifacts/tool/{run}/step-1.webp', headers={'User-Agent': 'Mozilla/5.0'})
  return Image.open(io.BytesIO(urllib.request.urlopen(req).read())).convert('RGB').resize((2560, 1440), Image.LANCZOS)


def wash(img, x0, x1, strength=0.88):
  """G · Desk's wash: navy deepening smoothly to the right from x0 to x1 (eased), so the words sit on calm navy wherever the art reaches."""
  t = np.clip((np.arange(img.width) - x0) / max(1, x1 - x0), 0, 1)
  t = t * t * (3 - 2 * t)  # smoothstep: no visible edge at either end
  mask = Image.fromarray(np.tile((t * 255 * strength).astype(np.uint8), (img.height, 1)))
  return Image.composite(Image.new('RGB', img.size, (8, 20, 36)), img, mask)


def words(img, right, middle, name_size, line, sub_k=0.29):
  """The esy wordmark over "The Marketing Engineer" (Engineer in jade italic) and one line, right-aligned at `right`, centred on `middle`,
  over a wash that starts a little left of the words."""
  d = ImageDraw.Draw(img)
  mark, name, name_i, sub = OPS(int(name_size * 0.47)), SERIF(name_size), SERIF_I(name_size), HN(int(name_size * sub_k))
  a, b = 'The Marketing ', 'Engineer'
  name_w = d.textlength(a, font=name) + d.textlength(b, font=name_i)
  gap1, gap2 = int(name_size * 0.2), int(name_size * 0.22)
  mark_h, name_h, sub_h = int(name_size * 0.47), name_size, int(name_size * sub_k)
  top = middle - (mark_h + gap1 + name_h + gap2 + sub_h) / 2
  left = int(right - max(name_w, d.textlength(line, font=sub)))
  img = wash(img, max(0, left - int(name_size * 3.2)), left - int(name_size * 0.2))
  d = ImageDraw.Draw(img)
  # the wordmark: e in jade, sy in white
  mw = d.textlength('esy', font=mark)
  d.text((right - mw, top), 'e', font=mark, fill=JADE)
  d.text((right - mw + d.textlength('e', font=mark), top), 'sy', font=mark, fill=WHITE)
  y = top + mark_h + gap1
  d.text((right - name_w, y), a, font=name, fill=WHITE)
  d.text((right - d.textlength(b, font=name_i), y), b, font=name_i, fill=JADE)
  y += name_h + gap2
  d.text((right - d.textlength(line, font=sub), y), line, font=sub, fill=SOFT)
  return img


def youtube(art):
  # phones show only x 507-2053 of the desktop strip (y 508-932): every word stays inside it
  return words(art.copy(), 2053 - 40, 720, 108, LINES['youtube'], 0.32)


def strip(art, h, size):
  """The middle band of the picture at the given height, scaled to the site's upload size."""
  y0 = (1440 - h) // 2
  return art.crop((0, y0, 2560, y0 + h)).resize(size, Image.LANCZOS)


def linkedin(art):
  return words(strip(art, 640, (1584, 396)), 1584 - 64, 190, 70, LINES['social'], 0.38)


def x_header(art):
  return words(strip(art, 853, (1500, 500)), 1500 - 60, 240, 74, LINES['social'], 0.38)


if __name__ == '__main__':
  os.makedirs(OUT, exist_ok=True)
  for concept, run in RUNS.items():
    art = fetch(run)
    for fmt, fn in (('youtube', youtube), ('linkedin', linkedin), ('x', x_header)):
      fn(art).save(os.path.join(OUT, f'{concept}-{fmt}.png'), optimize=True)
      print(concept, fmt)
