/**
 * Export the LinkedIn banner prototypes to upload-ready PNGs.
 *
 * Screenshots each bare 1584×396 canvas (/prototypes/linkedin-banner/<v>/raw/)
 * from a running dev or preview server into
 * public/prototypes/linkedin-banner/<v>.png, which the prototype pages offer
 * as the download and the prototype index shows as the card.
 *
 *   node scripts/export-linkedin-banners.mjs                    # localhost:3217
 *   BASE=http://localhost:3000 node scripts/export-linkedin-banners.mjs
 *
 * Playwright isn't a dependency of this repo; install it for the run with
 * `npm i --no-save playwright && npx playwright install chromium`.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.env.ROOT || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'public/prototypes/linkedin-banner');

const { chromium } = await import('playwright').catch(() => {
  console.error('Needs playwright: npm i --no-save playwright && npx playwright install chromium');
  process.exit(1);
});
const BASE = process.env.BASE || 'http://localhost:3217';
const VARIANTS = ['masthead', 'proof', 'scene', 'nameplate', 'desks', 'night'];

await mkdir(OUT_DIR, { recursive: true });
const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
// 1× on purpose: LinkedIn wants exactly 1584×396 and re-compresses anything else.
const page = await browser.newPage({ viewport: { width: 1600, height: 600 }, deviceScaleFactor: 1 });

for (const variant of VARIANTS) {
  await page.goto(`${BASE}/prototypes/linkedin-banner/${variant}/raw/`, { waitUntil: 'networkidle', timeout: 180000 });
  // Wait for web fonts and the backdrop, so nothing exports in a fallback face.
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => (img.complete ? null : img.decode().catch(() => null))));
  });
  const file = path.join(OUT_DIR, `${variant}.png`);
  await page.locator('#banner').screenshot({ path: file });
  console.log(`  ${variant} → ${path.relative(ROOT, file)}`);
}
await browser.close();
