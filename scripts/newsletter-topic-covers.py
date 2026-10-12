#!/usr/bin/env python3
"""
Topic covers, round 2 of /prototypes/newsletter-topic-cover/ (2026-10-11): one
scene per topic on the live covers' desk, in three cover styles. Written to
public/prototypes/newsletter-topic-cover/<style>-<topic>.webp at 1536x864.

The scenes are edit-image runs on api.esy.com over the live covers' desk plate
(run-478aa4ef), each the pick of three ideas for its topic:
  dots  The night crew: five Dots sit along the desk's edge, each on a small job,
        the screen off (run-7c897fc7).
  muse  Working late: Jolly, Muse's mascot, types at the desk while the phone
        lies lit, waiting for an OK (run-389691f4).
  clay  The claymation build: lumps of clay ride a little conveyor and come out
        as contact cards, the terminal glowing orange (run-4d7b682e).
The characters are cut out on api.esy.com (remove-image-background) for F; the
clay row was first set on white (run-8fc5bd6d), because the remover found
nothing in it against the dark desk.

  D · Scene   the photo alone, cooled a little toward the room's navy.
  E · Tagged  the photo, with the product's own logo and name on a chip (its
              colours ran along the bottom edge until round 3 dropped them).
  F · Poster  the characters on the product's own colour, on a ledge, with a
              four-word hook.
Logos are the companies' own files (public/images/tools/logos/), never redrawn.
No esy mark: the page and the email already say who it's from.

Usage: python3 scripts/newsletter-topic-covers.py [style ...]   (needs Chrome, Pillow, numpy)
  L · Glow + app takes a real screenshot per topic: SCREENSHOT_DOTS=shot.png ... glow-app
"""

import io
import os
import subprocess
import tempfile
import urllib.request

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public/prototypes/newsletter-topic-cover')
LOGOS = os.path.join(ROOT, 'public/images/tools/logos')
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
W, H = 1536, 864
ART = 'https://images.esy.com/artifacts/tool'

NAVY = (10, 37, 64)
HN = lambda s, i=0: ImageFont.truetype('/System/Library/Fonts/HelveticaNeue.ttc', s, index=i)
SERIF_I = lambda s: ImageFont.truetype(os.path.join(ROOT, 'public/fonts/cormorant-garamond-700-italic.ttf'), s)

TOPICS = {
  'dots': dict(
    scene='run-7c897fc7', cut='run-1db00347',
    logos=[('openai.svg', 'Dots')],
    palette=[(124, 179, 58), (242, 194, 48), (142, 195, 230), (240, 143, 168), (242, 138, 46)],  # the five Dots
    field=(247, 241, 230), ink=NAVY, kicker='OPENAI · DOTS', hook='The team that never logs off.',
    poster=dict(h=520, max_w=900, cx=1070, sit=0.8, level=5),  # they sit on the ledge, legs over its edge
  ),
  'muse': dict(
    scene='run-389691f4', cut='run-8524d0f5',
    logos=[('meta.png', 'Muse')],
    palette=[(0, 100, 224), (0, 130, 251), (238, 226, 200)],  # Meta's blues and Jolly's cream
    field=(0, 100, 224), ink=(255, 255, 255), kicker='META · MUSE', hook='Works late. Asks first.',
    poster=dict(h=520, max_w=900, cx=1080, sit=0.9),  # Jolly sits behind the ledge
  ),
  'clay': dict(
    scene='run-4d7b682e', cut='run-86124f6c',
    logos=[('clay.png', 'Clay'), ('claude.png', 'Claude Code')],
    palette=[(58, 110, 196), (76, 168, 72), (240, 190, 50), (226, 110, 130), (217, 119, 87)],  # Clay's clay, Claude's orange
    field=(217, 119, 87), ink=(255, 255, 255), kicker='CLAY × CLAUDE CODE', hook='Raw lists in. Leads out.',
    poster=dict(h=400, max_w=1000, cx=1010, sit=0.86, level=4),  # the clay row rests on it
  ),
}


def fetch(url):
  # images.esy.com refuses Python's default user agent
  req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
  return Image.open(io.BytesIO(urllib.request.urlopen(req).read()))


def logo(name, size):
  """A company's own logo file at `size` px; SVGs are rasterised by Chrome on a transparent page."""
  path = os.path.join(LOGOS, name)
  if name.endswith('.svg'):
    shot = os.path.join(tempfile.mkdtemp(), 'logo.png')
    html = f'<html><body style="margin:0;background:transparent"><img src="file://{path}" style="width:192px;height:192px"></body></html>'
    page = os.path.join(os.path.dirname(shot), 'logo.html')
    open(page, 'w').write(html)
    subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--default-background-color=00000000',
                    '--window-size=192,192', f'--screenshot={shot}', f'file://{page}'], capture_output=True, check=True)
    path = shot
  im = Image.open(path).convert('RGBA')
  return im.crop(im.getbbox()).resize((size, size), Image.LANCZOS)


def scene(t):
  """The 4:3 scene cut to its 16:9 band, cooled a little toward the room's navy (colours on the toys stay true)."""
  im = fetch(f"{ART}/{t['scene']}/step-1.webp").convert('RGB').resize((1536, 1024), Image.LANCZOS).crop((0, 140, 1536, 1004))
  a = np.asarray(im).astype(float)
  cool = np.clip(a * np.array([0.86, 0.96, 1.05]) + np.array([0, 4, 10]), 0, 255)
  return Image.fromarray((a * 0.6 + cool * 0.4).astype(np.uint8))


def rule(img, palette, h=12):
  """The product's colours as equal segments along the bottom edge."""
  d = ImageDraw.Draw(img)
  seg = W / len(palette)
  for i, c in enumerate(palette):
    d.rectangle((int(i * seg), H - h, int((i + 1) * seg), H), fill=c)


def tagged(t):
  img = scene(t).convert('RGBA')  # no colour rule along the bottom any more (Zev, 2026-10-11)
  # the chip: each logo then its product name, white, bottom right above the rule
  d = ImageDraw.Draw(img)
  f, size, gap = HN(34, 1), 52, 14
  parts = [(logo(n, size), label) for n, label in t['logos']]
  width = sum(size + gap + d.textlength(label, font=f) for _, label in parts) + (len(parts) - 1) * 40 + 48
  x1, y1 = W - 40, H - 40
  x0, y0 = x1 - width, y1 - 84
  d.rounded_rectangle((x0, y0, x1, y1), 42, fill=(255, 255, 255, 240))
  x = x0 + 24
  for i, (mark, label) in enumerate(parts):
    if i:
      d.text((x - 30, y0 + 23), '×', font=HN(30), fill=(120, 130, 145))
    img.alpha_composite(mark, (int(x), y0 + 16))
    x += size + gap
    d.text((x, y0 + 23), label, font=f, fill=NAVY)
    x += d.textlength(label, font=f) + 40
  return img


def poster(t):
  img = Image.new('RGBA', (W, H), t['field'] + (255,))
  d = ImageDraw.Draw(img)
  # the ledge the characters sit on, a shade darker than the field
  ledge_y = H - 150
  darker = tuple(int(c * 0.82) for c in t['field'])
  cut = fetch(f"{ART}/{t['cut']}/step-1.webp").convert('RGBA')
  p = t['poster']
  if p.get('level'):  # the desk photo was shot at an angle: level the row so it sits flat on the ledge
    cut = cut.rotate(p['level'], expand=True, resample=Image.BICUBIC)
  cut = cut.crop(cut.getbbox())
  k = min(p['h'] / cut.height, p['max_w'] / cut.width)
  cut = cut.resize((int(cut.width * k), int(cut.height * k)), Image.LANCZOS)
  cx, sit = p['cx'], p['sit']  # cx: the right half, since the issue title takes the left
  top = int(ledge_y - cut.height * sit)
  img.alpha_composite(cut, (cx - cut.width // 2, top))
  d.rectangle((0, ledge_y, W, H), fill=darker)
  if t is TOPICS['dots']:  # their legs hang in front of the ledge
    legs = cut.crop((0, int(cut.height * sit), cut.width, cut.height))
    img.alpha_composite(legs, (cx - cut.width // 2, ledge_y))
  # the kicker and the hook, centred over the characters
  d = ImageDraw.Draw(img)
  d.text((cx, 110), t['kicker'], font=HN(26, 1), fill=t['ink'], anchor='ma')
  d.text((cx, 150), t['hook'], font=SERIF_I(76), fill=t['ink'], anchor='ma')
  return img


# ── Round 3: five versions of E. No colour rule; the logo is always the company's own file ──
# Where each scene leaves room: a patch of bare wall for the sign, and the monitor's screen.
WALL = {'dots': (560, 220, 150), 'muse': (250, 120, 120), 'clay': (560, 220, 150)}  # centre x, y, logo size (Muse's wall is left of Jolly)
SCREEN = {  # the monitor's corners (TL, TR, BR, BL) in the 1536x864 cover, measured on the scene
  'dots': [(746, 40), (1384, 30), (1386, 482), (747, 474)],
  'clay': [(746, 40), (1384, 30), (1386, 482), (747, 474)],
  'muse': [(824, 46), (1376, 40), (1372, 477), (824, 432)],
}
GLOW = {'openai.svg': (200, 255, 236), 'meta.png': (0, 130, 251), 'clay.png': (255, 120, 140), 'claude.png': (217, 119, 87)}


def mark(name, size, white=False):
  """A logo file at `size`; `white` turns a black mark (OpenAI's) white, as on its own dark-background versions."""
  im = logo(name, size)
  if white:
    a = im.split()[3]
    im = Image.new('RGBA', im.size, (255, 255, 255, 255)); im.putalpha(a)
  return im


def marks(t, size, white_black=True):
  return [(mark(n, size, white=white_black and n == 'openai.svg'), n, label) for n, label in t['logos']]


def add_light(img, alpha, color, blur, strength):
  """Additive light from a mask: a glow on the wall, not paint."""
  m = np.asarray(alpha.filter(ImageFilter.GaussianBlur(blur)), np.float32)[..., None] / 255
  base = np.asarray(img.convert('RGB'), np.float32)
  return Image.fromarray(np.clip(base + m * np.array(color, np.float32) * strength, 0, 255).astype(np.uint8)).convert('RGBA')


def topic_of(t):
  return next(k for k, v in TOPICS.items() if v is t)


# G · Glow: the logo lit on the wall like a sign, its light spilling round it, the name beneath
def glow(t):
  img = scene(t).convert('RGBA')
  cx, cy, size = WALL[topic_of(t)]
  ms = marks(t, size)
  gap = 50
  total = sum(m.width for m, _, _ in ms) + gap * (len(ms) - 1)
  layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
  x = cx - total // 2
  for m, n, _ in ms:
    layer.alpha_composite(m, (int(x), cy - size // 2))
    lone = Image.new('L', (W, H), 0); lone.paste(m.split()[3], (int(x), cy - size // 2))
    img = add_light(img, lone, GLOW[n], 90, 0.55)   # the spill on the wall
    img = add_light(img, lone, GLOW[n], 22, 0.9)    # the halo
    x += m.width + gap
  img.alpha_composite(layer)
  d = ImageDraw.Draw(img)
  name = ' × '.join(label for _, _, label in ms)
  f = HN(38 if len(ms) == 1 else 30, 1)
  txt = Image.new('L', (W, H), 0); ImageDraw.Draw(txt).text((cx, cy + size // 2 + 26), name, font=f, fill=255, anchor='ma')
  img = add_light(img, txt, GLOW[ms[0][1]], 14, 0.8)
  ImageDraw.Draw(img).text((cx, cy + size // 2 + 26), name, font=f, fill=(255, 255, 255), anchor='ma')
  return img


# H · On screen: the logo and name lit on the monitor, as if the product is what's running
def on_screen(t):
  img = scene(t).convert('RGBA')
  topic = topic_of(t)
  quad = SCREEN[topic]
  light = topic == 'muse'
  sw, sh = 1280, 800
  screen = Image.new('RGBA', (sw, sh), (245, 241, 232, 255) if light else (10, 14, 20, 255))
  ms = marks(t, 230, white_black=not light)
  gap = 90
  total = sum(m.width for m, _, _ in ms) + gap * (len(ms) - 1)
  x = (sw - total) // 2
  for m, _, _ in ms:
    screen.alpha_composite(m, (x, 200)); x += m.width + gap
  d = ImageDraw.Draw(screen)
  d.text((sw // 2, 500), ' × '.join(label for _, _, label in ms), font=HN(92 if len(ms) == 1 else 76, 1), fill=NAVY if light else (255, 255, 255), anchor='ma')
  coeffs = perspective(quad, [(0, 0), (sw, 0), (sw, sh), (0, sh)])
  warped = screen.transform((W, H), Image.PERSPECTIVE, coeffs, Image.BICUBIC)
  mask = Image.new('L', (W, H), 0); ImageDraw.Draw(mask).polygon(quad, fill=255)
  img.paste(warped, (0, 0), mask)
  img = img.copy()
  if not light:  # a lit screen lights the room round it a little (the screen itself stays as drawn)
    lit = add_light(img, mask, GLOW[ms[-1][1]], 60, 0.25)
    lit.paste(img.crop((0, 0, W, H)), (0, 0), mask)
    img = lit
  return img


def perspective(dst, src):
  a, b = [], []
  for (x, y), (u, v) in zip(dst, src):
    a += [[x, y, 1, 0, 0, 0, -u * x, -u * y], [0, 0, 0, x, y, 1, -v * x, -v * y]]
    b += [u, v]
  return np.linalg.solve(np.array(a, float), np.array(b, float)).tolist()


# I · Bug: the logo alone, small and white-on-dark, top right, like a channel's corner mark
def bug(t):
  img = scene(t).convert('RGBA')
  ms = marks(t, 64)
  x = W - 48
  for m, _, _ in reversed(ms):
    x -= m.width
    img.alpha_composite(m, (x, 44))
    x -= 22
  return img


# J · Credit: an editorial credit line top right, logo, company · product, a hairline
def credit(t):
  img = scene(t).convert('RGBA')
  d = ImageDraw.Draw(img)
  f = HN(24, 1)
  text = t['kicker']
  tw = d.textlength(text, font=f) + 6 * (len(text) - 1)  # letterspaced
  ms = marks(t, 40)
  logos_w = sum(m.width for m, _, _ in ms) + 12 * (len(ms) - 1)
  x1, y = W - 56, 56
  x = x1 - tw
  for ch in text:
    d.text((x, y + 8), ch, font=f, fill=(255, 255, 255)); x += d.textlength(ch, font=f) + 6
  lx = x1 - tw - 20 - logos_w
  for m, _, _ in ms:
    img.alpha_composite(m, (int(lx), y)); lx += m.width + 12
  d.line((x1 - tw - 20 - logos_w, y + 62, x1, y + 62), fill=(255, 255, 255, 140), width=1)
  return img


# K · Night chip: E's chip in dark glass, white words, the logo with a soft halo
def night_chip(t, base=None, left=False):
  """K's chip; `base` swaps the desk scene for another picture, `left` puts the chip bottom left."""
  img = (base if base is not None else scene(t)).convert('RGBA')
  d = ImageDraw.Draw(img)
  f, size, gap = HN(34, 1), 52, 14
  ms = marks(t, size)
  width = sum(size + gap + d.textlength(label, font=f) for _, _, label in ms) + (len(ms) - 1) * 40 + 48
  x1, y1 = W - 40, H - 40
  x0, y0 = x1 - width, y1 - 84
  if left:
    x0, x1 = 40, 40 + width
  glass = Image.new('RGBA', (W, H), (0, 0, 0, 0))
  ImageDraw.Draw(glass).rounded_rectangle((x0, y0, x1, y1), 42, fill=(8, 18, 32, 200), outline=(255, 255, 255, 46), width=2)
  img.alpha_composite(glass)
  d = ImageDraw.Draw(img)
  x = x0 + 24
  for i, (m, n, label) in enumerate(ms):
    if i:
      d.text((x - 30, y0 + 23), '×', font=HN(30), fill=(150, 165, 185))
    lone = Image.new('L', (W, H), 0); lone.paste(m.split()[3], (int(x), y0 + 16))
    img = add_light(img, lone, GLOW[n], 10, 0.7)
    img.alpha_composite(m, (int(x), y0 + 16))
    d = ImageDraw.Draw(img)
    x += size + gap
    d.text((x, y0 + 23), label, font=f, fill=(255, 255, 255))
    x += d.textlength(label, font=f) + 40
  return img


# ── Round 4: G with an app on the monitor ──
# L · Glow + app: G's sign on the wall, and on the screen the kind of app the issue is about, at work.
# The screens are pages in scripts/newsletter-topic-screens/<topic>.html, drawn as stand-ins (not the
# products' own interfaces); for a real issue, pass a screenshot from the setup it describes instead:
# SCREENSHOT_<TOPIC>=path/to/shot.png
SCREEN_PAGES = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'newsletter-topic-screens')
SCREEN_SIZE = {'dots': (1280, 888), 'muse': (1280, 940), 'clay': (1280, 888)}  # each quad's own shape


def app_screen(topic):
  """The screen's picture: a real screenshot when one is given, else the stand-in page rendered by Chrome."""
  given = os.environ.get(f'SCREENSHOT_{topic.upper()}')
  sw, sh = SCREEN_SIZE[topic]
  if given:
    return Image.open(given).convert('RGB').resize((sw, sh), Image.LANCZOS)
  shot = os.path.join(tempfile.mkdtemp(), 'screen.png')
  subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', f'--window-size={sw},{sh}',
                  f'--screenshot={shot}', f'file://{SCREEN_PAGES}/{topic}.html'], capture_output=True, check=True)
  return Image.open(shot).convert('RGB').crop((0, 0, sw, sh))


def glow_app(t):
  topic = topic_of(t)
  img = glow(t)
  quad = SCREEN[topic]
  screen = app_screen(topic)
  # a monitor at night is a touch dimmer and softer than the page it shows
  screen = Image.fromarray((np.asarray(screen, np.float32) * (0.9 if topic == 'muse' else 0.82)).astype(np.uint8))
  sw, sh = screen.size
  warped = screen.convert('RGBA').transform((W, H), Image.PERSPECTIVE, perspective(quad, [(0, 0), (sw, 0), (sw, sh), (0, sh)]), Image.BICUBIC)
  mask = Image.new('L', (W, H), 0); ImageDraw.Draw(mask).polygon(quad, fill=255)
  mask = mask.filter(ImageFilter.GaussianBlur(0.8))  # no hard jaggies at the bezel
  # the screen's light falls on the desk and wall round it; the screen itself is pasted back clean
  lit = add_light(img, mask, (150, 175, 210) if topic != 'muse' else (120, 140, 170), 70, 0.22)
  lit.paste(warped, (0, 0), mask)
  return lit


# ── Round 5: Camouflage. Mason takes on the product's look; its logo rides on a tag ──
# M is drawn in code (mason-camo.tsx). N and O are edit-image runs on api.esy.com over the
# live covers' desk plate with M's figure laid flat on it and the tag left blank
# (captured from /prototypes/newsletter-topic-mason/<topic>/): the model makes him a
# vinyl toy (N) or a felt toy (O). The logo goes on the tag here, from the company's own file.
CAMO_RUNS = {
  'camo-toy': {'dots': 'run-70564b86', 'muse': 'run-f22c5db8', 'clay': 'run-f517cb4b'},
  'camo-felt': {'dots': 'run-de0d5fde', 'muse': 'run-abb6c895', 'clay': 'run-b8f23c02'},
}


# where each tag hangs in the renders (1536x1024): a point inside it to grow the tag from
TAG_SEED = {'dots': (705, 917), 'muse': (731, 832), 'clay': (732, 812)}


def find_tag(img, topic):
  """The blank tag's box: the patch of the tag's own paper colour grown out from its known spot.
  Matching the paper's colour (not just "pale") keeps the fill off the desk's sheen."""
  a = np.asarray(img.convert('RGB'), np.int32)
  sx, sy = TAG_SEED[topic]
  paper = np.median(a[sy - 6:sy + 7, sx - 6:sx + 7].reshape(-1, 3), axis=0)
  near = np.abs(a - paper).sum(axis=2) < 60
  # only within reach of the seed, so nothing far away joins
  win = np.zeros_like(near); win[sy - 170:sy + 170, sx - 170:sx + 170] = True
  m = Image.fromarray(((near & win) * 255).astype(np.uint8)).copy()
  ImageDraw.floodfill(m, (sx, sy), 128)
  ys, xs = np.nonzero(np.asarray(m) == 128)
  # the string and stray fibres stick out; take the solid card
  xl, xr = np.percentile(xs, [3, 97]); yt, yb = np.percentile(ys, [8, 98])
  return int(xl), int(yt), int(xr), int(yb)


def camo(kind):
  def make(t):
    topic = topic_of(t)
    img = fetch(f"{ART}/{CAMO_RUNS[kind][topic]}/step-1.webp").convert('RGB').resize((1536, 1024), Image.LANCZOS)
    l, top, r, b = find_tag(img, topic)
    tw, th = r - l, b - top
    layer = Image.new('RGBA', img.size, (0, 0, 0, 0))
    ms = marks(t, int(tw * (0.36 if len(t['logos']) > 1 else 0.5)), white_black=False)
    gap = int(tw * 0.06)
    total = sum(m.width for m, _, _ in ms) + gap * (len(ms) - 1)
    x, y = l + (tw - total) // 2, top + int(th * 0.26)
    for m, _, _ in ms:
      layer.alpha_composite(m, (x, y)); x += m.width + gap
    name = ' × '.join(label for _, _, label in ms)
    f = HN(int(tw * (0.1 if len(ms) > 1 else 0.17)), 1)
    ImageDraw.Draw(layer).text((l + tw // 2, y + ms[0][0].height + int(th * 0.07)), name, font=f, fill=NAVY + (255,), anchor='ma')
    # printed on the paper, so it takes the tag's light: darken by how far the tag is from white
    shade = np.asarray(img.crop((l, top, r, b)), np.float32).mean() / 245
    la = np.asarray(layer, np.float32); la[..., :3] *= min(1.0, shade); layer = Image.fromarray(la.astype(np.uint8))
    out = img.convert('RGBA'); out.alpha_composite(layer)
    out = out.convert('RGB').crop((0, 140, 1536, 1004))
    a = np.asarray(out).astype(float)
    cool = np.clip(a * np.array([0.86, 0.96, 1.05]) + np.array([0, 4, 10]), 0, 255)
    return Image.fromarray((a * 0.6 + cool * 0.4).astype(np.uint8))
  return make


# ── Round 6: abstract vinyl networks. No character: glossy chamfered vinyl shapes joined by glowing
# light, each issue's idea as a system. generate-photoreal-image runs on api.esy.com (4:3, cut to 16:9).
#   P · Network  the issue's idea: Dots' five nodes wired to one hub; Muse's lit path stopping at a gate;
#                Clay's rough lumps going through a network and coming out as precise tiles
#   Q · Systems  a hub with eight cables; a city grid of light pulses with one block waiting; a lattice
#                that runs from rough at the bottom to precise at the top
# The shapes carry no names; the product's own logo rides on K's dark glass chip, bottom left, where the
# art leaves the frame empty.
NET_RUNS = {
  'net': {'dots': 'run-940cbf44', 'muse': 'run-4d96cf23', 'clay': 'run-92607403'},
  'sys': {'dots': 'run-3836b099', 'muse': 'run-877886ab', 'clay': 'run-0e0adc28'},
}


def network(kind):
  def make(t):
    im = fetch(f"https://images.esy.com/artifacts/photo-image/{NET_RUNS[kind][topic_of(t)]}/image.webp").convert('RGB')
    im = im.resize((1536, 1024), Image.LANCZOS).crop((0, 80, 1536, 944))
    return night_chip(t, base=im, left=True)
  return make


def save(img, style, topic):
  os.makedirs(OUT, exist_ok=True)
  img.convert('RGB').save(os.path.join(OUT, f'{style}-{topic}.webp'), quality=90)
  print(style, topic)


STYLES = {'scene': scene, 'tagged': tagged, 'poster': poster,
          'glow': glow, 'screen': on_screen, 'bug': bug, 'credit': credit, 'night-chip': night_chip, 'glow-app': glow_app,
          'camo-toy': camo('camo-toy'), 'camo-felt': camo('camo-felt'),
          'net': network('net'), 'sys': network('sys')}

if __name__ == '__main__':
  import sys
  for style in sys.argv[1:] or STYLES:
    for topic, t in TOPICS.items():
      save(STYLES[style](t), style, topic)
