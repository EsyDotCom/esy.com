#!/usr/bin/env node

/**
 * Esy's icon suite (2026-10-14; picked on /prototypes/mason-icon, shown on
 * esy.com/brand#icons). One script writes every icon file the site serves and
 * the brand kit offers, each mark on each of its grounds:
 *
 *   The e            transparent (the bare e that was live until 2026-10-14),
 *                    on navy (the browser tab: Zev's pick), on black, on white
 *   Mason, flat      transparent, on navy (small app sizes), on teal
 *   Mason, vinyl     on teal (the home-screen icon, head 75% of the width), on
 *                    navy (head 88% of the height), the tab icon (on navy,
 *                    head the full height: the biggest he can be at 16 and
 *                    32), cut out (alpha), and Android's adaptive foreground
 *
 * Every variant is written as SVG (flat marks) or PNG at 16, 32, 48, 180 and
 * 512 (plus 1024 for Mason) into public/brand/icons/. The live icons come
 * from the same drawings: src/app/icon.png and src/app/favicon.ico are vinyl
 * Mason on navy (the e on navy until 2026-10-18), src/app/apple-icon.png is
 * vinyl Mason on teal; public/favicon/* is kept in step.
 *
 * The tiled e is redrawn on a 16-pixel grid (32 units a pixel in a 512 box)
 * so its straight edges land on whole pixels at 16 and 32. The vinyl sources
 * live beside this script (scripts/brand-icons/): edit-image renders of his
 * head from the studio shot. The teal render is keyed here (no extra run) for
 * the tile's crop, the cut-out, the navy tile and the Android foreground.
 *
 *   node scripts/brand-icons.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'scripts/brand-icons');
const out = (p) => path.join(ROOT, p);
const C = { navy: '#0A2540', ink: '#061527', teal: '#00A896', mint: '#2BD8BB', ivory: '#F4F1EA', black: '#000000', white: '#FFFFFF' };
const SIZES = [16, 32, 48, 180, 512];

const svgDoc = (label, note, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-label="${label}">\n  <!-- ${note} Made by scripts/brand-icons.mjs. -->\n${body}</svg>\n`;

/* ── The e ──────────────────────────────────────────────────────────── */

// The bare e: the Black Ops One glyph, near edge to edge, exactly as the live
// icon.svg drew it until 2026-10-14 (without its dark-mode colour switch, so
// the file is one colour wherever it's used).
const E_GLYPH = 'M360 0 95 265V797L360 1062H537V0ZM607 426V611H840V797H607V1062H982L1247 797V426ZM607 0V248H1201V133L1069 0Z';
const eBare = () => svgDoc('Esy', 'The e, transparent.', `  <g transform="translate(9 28) scale(0.43) translate(-95 1062) scale(1 -1)"><path fill="${C.teal}" d="${E_GLYPH}"/></g>\n`);

// The tiled e, in whole pixels inside a 12 × 12 box at (2, 2): the left stroke
// 5 px with 3-px cuts, a 1-px gap, the right block 6 px with its 3-px top cut
// and the notch that opens into the gap, a 2-px gap, the bottom bar.
const at = (x, y) => `${(x + 2) * 32},${(y + 2) * 32}`;
const E_GRID = [
  `M${at(3, 0)} L${at(5, 0)} L${at(5, 12)} L${at(3, 12)} L${at(0, 9)} L${at(0, 3)} Z`,
  `M${at(6, 0)} L${at(9, 0)} L${at(12, 3)} L${at(12, 7)} L${at(6, 7)} L${at(6, 5)} L${at(8, 5)} L${at(8, 3)} L${at(6, 3)} Z`,
  `M${at(6, 9)} L${at(12, 9)} L${at(12, 10.5)} L${at(10.5, 12)} L${at(6, 12)} Z`,
].join(' ');
const eTile = (ground, name) =>
  svgDoc('Esy', `The e on ${name}, drawn on a 16-px grid so it's sharp at 16 and 32.`, `  <rect width="512" height="512" rx="96" fill="${ground}"/>\n  <path fill="${C.teal}" d="${E_GRID}"/>\n`);

/* ── Mason, flat ────────────────────────────────────────────────────── */

function cut(x, y, w, h, [tl, tr, br, bl]) {
  return [[x + tl, y], [x + w - tr, y], [x + w, y + tr], [x + w, y + h - br], [x + w - br, y + h], [x + bl, y + h], [x, y + h - bl], [x, y + tl]]
    .map(([a, b]) => `${a},${b}`).join(' ');
}
function gem(x, y, w, h) {
  const d = w * 0.55;
  return [[x + w / 2, y], [x + w, y + d], [x + w, y + h - d], [x + w / 2, y + h], [x, y + h - d], [x, y + d]].map(([a, b]) => `${a},${b}`).join(' ');
}
// His head in the 512 box (384 × 448, the toy's cuts), with the toy's stripe
// width (44 of 384), two eyes and pupils. `k` scales it about the centre.
const head = ({ fill, stripe, eye, pupil }, k = 1) => {
  const t = 256 - 256 * k;
  return (
    `  <g transform="translate(${t} ${t}) scale(${k})">\n` +
    `    <polygon points="${cut(64, 32, 384, 448, [96, 96, 64, 64])}" fill="${fill}"/>\n` +
    `    <polygon points="${gem(118, 96, 44, 128)}" fill="${stripe}"/>\n` +
    `    <rect x="128" y="256" width="96" height="128" rx="10" fill="${eye}"/>\n` +
    `    <rect x="288" y="256" width="96" height="128" rx="10" fill="${eye}"/>\n` +
    `    <rect x="160" y="288" width="32" height="64" fill="${pupil}"/>\n` +
    `    <rect x="320" y="288" width="32" height="64" fill="${pupil}"/>\n` +
    `  </g>\n`
  );
};
const TEAL_HEAD = { fill: C.teal, stripe: C.navy, eye: C.ivory, pupil: C.navy };
const NAVY_HEAD = { fill: C.navy, stripe: C.mint, eye: C.ivory, pupil: C.ink };
// On a tile the head sits at 60%, so its farthest corner reaches 30% from the
// centre: inside Android's adaptive safe zone (33%). Tiles are full-bleed; the
// phone rounds them.
const flatBare = () => svgDoc('Mason', 'Mason, flat, transparent.', head(TEAL_HEAD));
const flatTile = (ground, h, name) => svgDoc('Mason', `Mason, flat, on ${name}.`, `  <rect width="512" height="512" fill="${ground}"/>\n${head(h, 0.6)}`);

/* ── Mason, vinyl: the cut-out ─────────────────────────────────────── */

/**
 * Key the head out of its teal render: flood-fill the background from the
 * edges on "tealness" (green minus red), so the teal stripe inside the head is
 * never reached; alpha ramps across the edge, and edge pixels lose the teal
 * spill. Returns the keyed RGBA and the head's bounds (alpha over half).
 */
async function keyHead(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, N = W * H;
  const gr = new Float32Array(N);
  for (let i = 0; i < N; i++) gr[i] = data[i * 3 + 1] - data[i * 3];
  const BG = gr[5 * W + 5], HEAD = 12, T = 55;
  const bg = new Uint8Array(N);
  const stack = [];
  for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
  for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
  while (stack.length) {
    const p = stack.pop();
    if (bg[p] || gr[p] < T) continue;
    bg[p] = 1;
    const x = p % W;
    if (x > 0) stack.push(p - 1);
    if (x < W - 1) stack.push(p + 1);
    if (p >= W) stack.push(p - W);
    if (p < N - W) stack.push(p + W);
  }
  // A 3-px band around the background, where the edge is ramped and despilled.
  const near = new Uint8Array(N);
  for (let p = 0; p < N; p++) {
    if (!bg[p]) continue;
    const x = p % W, y = (p / W) | 0;
    for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
      const xx = x + dx, yy = y + dy;
      if (xx >= 0 && yy >= 0 && xx < W && yy < H) near[yy * W + xx] = 1;
    }
  }
  const rgba = Buffer.alloc(N * 4);
  const box = { x0: W, y0: H, x1: 0, y1: 0 };
  for (let p = 0; p < N; p++) {
    const r = data[p * 3], b = data[p * 3 + 2];
    let g = data[p * 3 + 1];
    let a = 1;
    if (bg[p] || near[p]) a = Math.min(1, Math.max(0, (BG - gr[p]) / (BG - HEAD)));
    if (bg[p] && gr[p] > BG * 0.6) a = 0;
    if (near[p] && a > 0) g = Math.min(g, Math.max(r, b));
    rgba.set([r, g, b, Math.round(a * 255)], p * 4);
    if (a > 0.5) {
      const x = p % W, y = (p / W) | 0;
      box.x0 = Math.min(box.x0, x); box.x1 = Math.max(box.x1, x);
      box.y0 = Math.min(box.y0, y); box.y1 = Math.max(box.y1, y);
    }
  }
  return { rgba, W, H, box };
}

const blank = (s) => sharp({ create: { width: s, height: s, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } });
const trimmedHead = async ({ rgba, W, H }) => sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).trim().png().toBuffer();

/** The cut-out: the keyed head centred in a transparent 1024 square, 900 px at its longest. */
async function vinylCutout(keyed) {
  const fitted = await sharp(await trimmedHead(keyed)).resize(900, 900, { fit: 'inside' }).png().toBuffer();
  const { width, height } = await sharp(fitted).metadata();
  return blank(1024).composite([{ input: fitted, left: Math.round((1024 - width) / 2), top: Math.round((1024 - height) / 2) }]).png().toBuffer();
}

/**
 * The home-screen icon (iOS, the App Store, profile pictures): cropped from
 * the original render around the head so the head spans `share` of the tile's
 * width, centred on its own teal. iOS only rounds the corners, so the head can
 * be big; cropping the render (not enlarging a shrunk copy) keeps it sharp.
 */
async function vinylTile(file, keyed, share) {
  const { box, W, H } = keyed;
  const side = Math.min(W, H, Math.round((box.x1 - box.x0) / share));
  const cx = (box.x0 + box.x1) / 2, cy = (box.y0 + box.y1) / 2;
  const left = Math.max(0, Math.min(W - side, Math.round(cx - side / 2)));
  const top = Math.max(0, Math.min(H - side, Math.round(cy - side / 2)));
  return sharp(file).extract({ left, top, width: side, height: side }).resize(1024, 1024, { kernel: 'lanczos3' }).png().toBuffer();
}

/**
 * The navy tile, which is also the browser tab (2026-10-18). The keyed head
 * sits on brand navy at `share` of the tile's height. Zev wanted more head
 * and less border than the old reframed render, whose head filled under half
 * the tile. A soft centre glow (one step up from navy) lifts the navy head off
 * its navy ground, so the stripe and eyes still read at 16 and 32.
 */
async function vinylOnNavy(keyed, share) {
  const head = await trimmedHead(keyed);
  const { width: w, height: h } = await sharp(head).metadata();
  const fh = Math.round(1024 * share), fw = Math.round((w * fh) / h);
  const fitted = await sharp(head).resize(fw, fh, { kernel: 'lanczos3' }).png().toBuffer();
  const ground = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024"><defs><radialGradient id="g" cx="50%" cy="50%" r="62%">` +
      `<stop offset="0" stop-color="#16385F"/><stop offset="1" stop-color="${C.navy}"/></radialGradient></defs>` +
      `<rect width="1024" height="1024" fill="url(#g)"/></svg>`,
  );
  return sharp(ground).composite([{ input: fitted, left: Math.round((1024 - fw) / 2), top: Math.round((1024 - fh) / 2) }]).png().toBuffer();
}

/** His head alone on transparent, as tall as the icon: the tab icon on its
 *  own, with no tile (2026-10-18, Zev: "lets try a transparent version"). */
async function vinylClear(keyed, share) {
  const head = await trimmedHead(keyed);
  const { width: w, height: h } = await sharp(head).metadata();
  const fh = Math.round(1024 * share), fw = Math.round((w * fh) / h);
  const fitted = await sharp(head).resize(fw, fh, { kernel: 'lanczos3' }).png().toBuffer();
  return blank(1024).composite([{ input: fitted, left: Math.round((1024 - fw) / 2), top: Math.round((1024 - fh) / 2) }]).png().toBuffer();
}

/**
 * Android's adaptive-icon foreground: the keyed head on transparent, small
 * enough that its bounding box's corners stay inside the centred safe circle
 * (66% across, so 33% from the centre; sized to 31% for margin). The launcher
 * draws it over a background layer: teal, the render's own #2BE1CA.
 */
async function androidForeground(keyed) {
  const head = await trimmedHead(keyed);
  const { width: w, height: h } = await sharp(head).metadata();
  const k = (0.31 * 1024) / (Math.hypot(w, h) / 2);
  const fw = Math.round(w * k), fh = Math.round(h * k);
  const fitted = await sharp(head).resize(fw, fh).png().toBuffer();
  return blank(1024).composite([{ input: fitted, left: Math.round((1024 - fw) / 2), top: Math.round((1024 - fh) / 2) }]).png().toBuffer();
}

/* ── Writers ───────────────────────────────────────────────────────── */

const pngFromSvg = (svg, size) => sharp(Buffer.from(svg), { density: Math.max(72, 72 * (size / 512) * 4) }).resize(size, size).png().toBuffer();
const pngFrom = (buf, size) => sharp(buf).resize(size, size).png().toBuffer();

/** An .ico holding PNG images (every current browser reads PNG-in-ICO). */
function ico(images) {
  const head = Buffer.alloc(6 + images.length * 16);
  head.writeUInt16LE(0, 0);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(images.length, 4);
  let offset = head.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + i * 16;
    head.writeUInt8(size, e);
    head.writeUInt8(size, e + 1);
    head.writeUInt16LE(1, e + 4);
    head.writeUInt16LE(32, e + 6);
    head.writeUInt32LE(data.length, e + 8);
    head.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([head, ...images.map((im) => im.data)]);
}

let count = 0;
const write = async (p, data) => {
  fs.mkdirSync(path.dirname(out(p)), { recursive: true });
  fs.writeFileSync(out(p), data);
  count += 1;
};

/** One variant: its SVG (if it has one) and a PNG at every size. */
async function variant(name, { svg, raster, sizes = SIZES }) {
  if (svg) await write(`public/brand/icons/${name}.svg`, svg);
  for (const s of sizes) await write(`public/brand/icons/${name}-${s}.png`, svg ? await pngFromSvg(svg, s) : await pngFrom(raster, s));
}

const E = {
  'e-transparent': eBare(),
  'e-navy': eTile(C.navy, 'navy'),
  'e-black': eTile(C.black, 'black'),
  'e-white': eTile(C.white, 'white'),
};
for (const [name, svg] of Object.entries(E)) await variant(name, { svg });
const icoImages = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await pngFromSvg(E['e-navy'], size) })));
await write('public/brand/icons/e-navy.ico', ico(icoImages));

const FLAT = {
  'mason-flat-transparent': flatBare(),
  'mason-flat-navy': flatTile(C.navy, TEAL_HEAD, 'navy'),
  'mason-flat-teal': flatTile(C.teal, NAVY_HEAD, 'teal'),
};
for (const [name, svg] of Object.entries(FLAT)) await variant(name, { svg, sizes: [...SIZES, 1024] });

// One teal render feeds the home-screen tile (head 75% of the width), the
// navy tile and tab icon (head 88% of the height), the Android foreground and
// the cut-out.
const TEAL_RENDER = path.join(SRC, 'vinyl-teal-render.webp');
const keyed = await keyHead(TEAL_RENDER);
const VINYL = {
  'mason-vinyl-teal': await vinylTile(TEAL_RENDER, keyed, 0.75),
  'mason-vinyl-navy': await vinylOnNavy(keyed, 0.88),
  // The browser tab: the same tile with his head as tall as the icon (Zev:
  // "the largest it can be"), since a favicon has no room to spare for a border.
  'mason-vinyl-tab': await vinylOnNavy(keyed, 1),
  // The tab icon without its tile: his head alone, as tall as the icon.
  'mason-vinyl-tab-transparent': await vinylClear(keyed, 1),
  'mason-vinyl-cutout': await vinylCutout(keyed),
  'mason-vinyl-android-foreground': await androidForeground(keyed),
};
for (const [name, raster] of Object.entries(VINYL)) await variant(name, { raster, sizes: [...SIZES, 1024] });

// The live site: vinyl Mason on navy, full height, in the tab (the e until 2026-10-18), and
// vinyl Mason on teal on a phone's home screen.
// Which tab icon is live: the transparent head (being tried, 2026-10-18) or
// 'mason-vinyl-tab', the same head on navy.
const TAB = 'mason-vinyl-tab-transparent';
const tabImages = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await pngFrom(VINYL[TAB], size) })));
await write(`public/brand/icons/${TAB}.ico`, ico(tabImages));
await write('src/app/icon.png', await pngFrom(VINYL[TAB], 512));
await write('src/app/favicon.ico', ico(tabImages));
await write('src/app/apple-icon.png', await pngFrom(VINYL['mason-vinyl-teal'], 180));
await write('public/favicon/favicon.ico', ico(tabImages));
for (const s of [16, 32, 192, 512]) await write(`public/favicon/favicon-${s}x${s}.png`, await pngFrom(VINYL[TAB], s));
await write('public/favicon/apple-touch-icon.png', await pngFrom(VINYL['mason-vinyl-teal'], 180));

console.log(`Wrote ${count} files.`);
