#!/usr/bin/env python3
"""
Make a newsletter issue's cover: the issue's real page on the monitor at Zev's desk.

Every cover is the same photo (a dark navy home office with small teal lights,
the room from the homepage video and the YouTube thumbnails), with one thing
changing: the page on the screen. The photo was made once on api.esy.com
(generate-photoreal-image, run-478aa4ef) with a plain white screen, so a real
page can be laid onto it in perspective. Picked 2026-10-11 (round 4 of
/prototypes/newsletter/, J · Real screen).

Usage:
  python3 scripts/newsletter-cover.py <issue-number> <url> [--left N]

  --left N   where the 1280px-wide crop of the page starts (default 160); use 0
             when the page's headline starts at its left edge.

Captures the page with headless Chrome at 1600x1000, crops a 16:10 window from
the top, lays it on the monitor, cools the room toward navy, pushes the desk
right so the lead card's title has the left side, and writes
public/images/newsletter/covers/<n>.webp. Needs Chrome, Pillow and numpy.
"""

import argparse
import io
import os
import subprocess
import tempfile
import urllib.request

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, 'public/images/newsletter/covers')
PLATE_URL = 'https://images.esy.com/artifacts/photo-image/run-478aa4ef/image.webp'
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
SCREEN_SEED = (1060, 390)  # a pixel inside the white screen, to find it by flood fill


def plate():
  # images.esy.com refuses Python's default user agent
  req = urllib.request.Request(PLATE_URL, headers={'User-Agent': 'Mozilla/5.0'})
  return Image.open(io.BytesIO(urllib.request.urlopen(req).read())).convert('RGB')


def screen_of(img):
  """The white screen as a mask, and its four corners (TL, TR, BR, BL)."""
  white = Image.fromarray(((np.asarray(img).min(axis=2) > 200) * 255).astype(np.uint8)).copy()
  ImageDraw.floodfill(white, SCREEN_SEED, 128)  # only the screen's own region, not other bright spots
  mask = np.array(white) == 128
  ys, xs = np.nonzero(mask)
  pts = np.stack([xs, ys], 1)
  quad = [pts[np.argmin(xs + ys)], pts[np.argmax(xs - ys)], pts[np.argmax(xs + ys)], pts[np.argmin(xs - ys)]]
  return Image.fromarray((mask * 255).astype(np.uint8)), [tuple(int(v) for v in p) for p in quad]


def perspective(dst, src):
  # PIL maps each output (photo) pixel back to an input (page) pixel
  a, b = [], []
  for (x, y), (u, v) in zip(dst, src):
    a += [[x, y, 1, 0, 0, 0, -u * x, -u * y], [0, 0, 0, x, y, 1, -v * x, -v * y]]
    b += [u, v]
  return np.linalg.solve(np.array(a, float), np.array(b, float)).tolist()


def capture(url):
  path = os.path.join(tempfile.mkdtemp(), 'page.png')
  subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=1600,1000',
                  '--virtual-time-budget=8000', f'--screenshot={path}', url], capture_output=True, check=True)
  return Image.open(path).convert('RGB')


def cover(page, left):
  photo = plate()
  mask, quad = screen_of(photo)

  # the page, as a 16:10 window from its top (clear of cookie banners at the bottom)
  page = page.crop((left, 0, left + 1280, 800))
  w, h = page.size
  warped = page.transform(photo.size, Image.PERSPECTIVE, perspective(quad, [(0, 0), (w, 0), (w, h), (0, h)]), Image.BICUBIC)
  warped = Image.eval(warped, lambda v: int(v * 0.96)).filter(ImageFilter.GaussianBlur(0.4))  # a lit screen, slightly soft

  # cool the warm wood and lamp light toward the brand's navy and teal; the screen stays true
  cool = np.clip(np.asarray(photo).astype(float) * np.array([0.80, 0.94, 1.06]) * 0.92 + np.array([2, 8, 16]), 0, 255)
  room = Image.fromarray(cool.astype(np.uint8))
  edge = mask.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
  shot = Image.composite(warped, room, edge)

  # push the desk right so the title has the left 55%: shrink the photo, right-align it, and fill
  # the left with the room itself, blurred and dimmed
  k = 0.82
  small = shot.resize((int(shot.width * k), int(shot.height * k)), Image.LANCZOS)
  canvas = shot.resize((1536, 1024)).filter(ImageFilter.GaussianBlur(24))
  canvas = Image.blend(canvas, Image.new('RGB', canvas.size, (6, 21, 39)), 0.45)
  fade = Image.new('L', (small.width, 1))
  for x in range(small.width):
    fade.putpixel((x, 0), int(255 * min(1, x / 160)))
  canvas.paste(small, (1536 - small.width, 70), fade.resize(small.size))
  return canvas.crop((0, 110, 1536, 110 + 864))  # 16:9


if __name__ == '__main__':
  ap = argparse.ArgumentParser(description='Make a newsletter cover with the issue\'s real page on the monitor.')
  ap.add_argument('n', type=int)
  ap.add_argument('url')
  ap.add_argument('--left', type=int, default=160)
  args = ap.parse_args()
  os.makedirs(OUT_DIR, exist_ok=True)
  out = os.path.join(OUT_DIR, f'{args.n}.webp')
  cover(capture(args.url), args.left).save(out, quality=86)
  print(out)
