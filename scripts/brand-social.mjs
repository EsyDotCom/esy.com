#!/usr/bin/env node

/**
 * The social media kit's profile pictures (2026-10-18; esy.com/brand#social).
 * Three marks, each at every platform's upload size from
 * src/components/BrandKit/social-kit.json, written to
 * public/brand/social/<mark>-<platform>.png with a zip of each mark:
 *
 *   mason     vinyl Mason's head on his render's teal (#2BE1CA), as the
 *             phone's home-screen icon is (the canon's profile picture)
 *   e-vinyl   the vinyl e on navy
 *   wordmark  esy, the header's wordmark, on navy
 *
 * Every platform but LinkedIn shows the picture as a circle (GitHub, Skool and
 * Substack as a rounded square), so each mark is circle-safe: its box's
 * diagonal stays within 80% of the circle's diameter. Sources are the cut-outs
 * and the white wordmark scripts/brand-icons.mjs and the logo files already
 * write, so run that first if the icons change.
 *
 *   node scripts/brand-social.mjs
 *
 * The banners come from scripts/export-linkedin-banners.mjs (the desk banner
 * at every size, run first), copied into public/brand/social/banners/, and
 * each mark's profile pictures also go into their own ZIP (no all-in-one kit ZIP).
 */
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const KIT = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/components/BrandKit/social-kit.json'), 'utf8'));
const OUT = path.join(ROOT, 'public/brand/social');
const NAVY = { r: 10, g: 37, b: 64, alpha: 1 };
const TEAL = { r: 43, g: 225, b: 202, alpha: 1 };
const SAFE = 0.8; // the mark's diagonal, as a share of the circle's diameter

const MARKS = {
  mason: { file: 'public/brand/icons/mason-vinyl-cutout-1024.png', ground: TEAL },
  'e-vinyl': { file: 'public/brand/icons/e-vinyl-transparent-1024.png', ground: NAVY },
  wordmark: { file: 'public/brand/logo/esy-wordmark-white.svg', ground: NAVY, density: 600 },
};

/** A 1024 master: the trimmed mark, scaled so its diagonal is SAFE of the square, centred on its ground. */
async function master({ file, ground, density }) {
  const src = sharp(path.join(ROOT, file), density ? { density } : {});
  const trimmed = await src.png().toBuffer().then((b) => sharp(b).trim().png().toBuffer());
  const { width: w, height: h } = await sharp(trimmed).metadata();
  const k = (1024 * SAFE) / Math.hypot(w, h);
  const fw = Math.round(w * k), fh = Math.round(h * k);
  const fitted = await sharp(trimmed).resize(fw, fh, { kernel: 'lanczos3' }).png().toBuffer();
  return sharp({ create: { width: 1024, height: 1024, channels: 4, background: ground } })
    .composite([{ input: fitted, left: Math.round((1024 - fw) / 2), top: Math.round((1024 - fh) / 2) }])
    .flatten({ background: ground })
    .png()
    .toBuffer();
}

fs.mkdirSync(OUT, { recursive: true });
let count = 0;
for (const [id, mark] of Object.entries(MARKS)) {
  const m = await master(mark);
  const files = [];
  for (const p of KIT.avatars) {
    const name = `${id}-${p.id}.png`;
    await sharp(m).resize(p.size, p.size, { kernel: 'lanczos3' }).png({ compressionLevel: 9 }).toFile(path.join(OUT, name));
    files.push(name);
    count += 1;
  }
  // One zip per mark, so a platform's file is one download away from the rest.
  const zip = path.join(OUT, `${id}-profile-pictures.zip`);
  fs.rmSync(zip, { force: true });
  execFileSync('zip', ['-q', '-X', zip, ...files], { cwd: OUT });
  count += 1;
}
// The banners: the desk banner at each size, as scripts/export-linkedin-banners.mjs
// exported it to public/prototypes/linkedin-banner/, copied here under the
// kit's names. JPEG where the platform caps the file (YouTube 6 MB, Bluesky 1 MB).
const BANNERS = path.join(OUT, 'banners');
fs.mkdirSync(BANNERS, { recursive: true });
for (const b of KIT.banners) {
  const src = path.join(ROOT, 'public/prototypes/linkedin-banner', b.from);
  const dst = path.join(BANNERS, b.file);
  const img = sharp(src).resize(b.width, b.height, { fit: 'cover' });
  if (b.file.endsWith('.jpg')) await img.jpeg({ quality: b.id === 'bluesky' ? 82 : 90, mozjpeg: true }).toFile(dst);
  else await img.png({ compressionLevel: 9 }).toFile(dst);
  count += 1;
}
// No all-in-one ZIP: it duplicated every file (about 11 MB). Each mark keeps its own ZIP.
fs.rmSync(path.join(OUT, 'esy-social-kit.zip'), { force: true });
console.log(`Wrote ${count} files to ${path.relative(ROOT, OUT)}/.`);
