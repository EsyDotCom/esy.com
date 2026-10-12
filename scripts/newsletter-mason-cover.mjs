#!/usr/bin/env node

/**
 * The cover for an issue of The Marketing Engineer: vinyl Mason acting out the
 * issue's title, in his vinyl world (the standard since 2026-10-12; see
 * org-docs/brand/VISUAL_LANGUAGE.md).
 *
 * Give it the issue number and one plain sentence of what Mason is doing that
 * shows the title. It edits his vinyl studio shot (run-80a49586) into that
 * scene on api.esy.com, with gpt-image-2.5 Sunburst, twice, and saves both
 * takes cropped to 16:9 as public/images/newsletter/covers/vinyl-mason/<n>-a.webp
 * and <n>-b.webp. Pick one, rename it <n>.webp, and point the issue's `cover`
 * at it in src/components/NewsletterPage/issues.ts.
 *
 *   node scripts/newsletter-mason-cover.mjs 4 "Mason stands on the top step of a winners' podium holding up a glowing trophy"
 *
 * Rules that keep him himself (they're in the instruction below too):
 * - Make him from his studio shot, never from words alone (he drifts).
 * - The whole scene is glossy vinyl, night, navy and teal.
 * - The scene shows the title plainly; it doesn't need to be clever.
 * - No words or numbers in the image: the title sits beside it on every page.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'public/images/newsletter/covers/vinyl-mason');
const API = process.env.ESY_API_URL || 'https://api.esy.com';
const STUDIO_SHOT = 'https://images.esy.com/artifacts/tool/run-80a49586/step-1.webp';
const SUNBURST = 'openai/gpt-image-2.5-sunburst-2026-09-08';

/* The key lives in the API repo's agent env; walk up to find it (worktrees). */
function apiKey() {
  if (process.env.ESY_API_KEY) return process.env.ESY_API_KEY;
  let dir = ROOT;
  for (let i = 0; i < 10; i += 1) {
    const f = path.join(dir, 'esy/server/api.esy.com/.env.agent');
    if (fs.existsSync(f)) {
      const line = fs.readFileSync(f, 'utf8').split('\n').find((l) => l.startsWith('ESY_API_KEY='));
      if (line) return line.slice('ESY_API_KEY='.length).trim();
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error('No ESY_API_KEY found');
}

async function api(pathname, init = {}) {
  const res = await fetch(`${API}${pathname}`, { ...init, headers: { Authorization: `Bearer ${apiKey()}`, 'Content-Type': 'application/json' } });
  const body = await res.text();
  if (!res.ok) throw new Error(`${init.method || 'GET'} ${pathname} → ${res.status}: ${body.slice(0, 300)}`);
  return JSON.parse(body);
}

// Mason as he always is, the vinyl world, and no words: the same for every cover.
const LOOK =
  'a squat, angular octopus whose head is a tall octagon with 45-degree cut corners and a small teal stripe on its left side, two big upright rectangular ivory eyes with small dark rectangular pupils, a navy collar under the head, and eight arms made of short blocky segments, navy and deep teal with bright teal tips';
const instruction = (scene) =>
  `This photo shows a toy character: ${LOOK}, a designer vinyl toy. Keep exactly this character, the same shape, colours and proportions, and photograph it in a completely new scene: ${scene}. ` +
  'The whole scene is a glossy designer-vinyl toy playset at the character’s scale: every object and surface is moulded vinyl with crisp 45-degree chamfered corners, polished to a shine, with translucent parts glowing teal and jade from inside. Deep navy and teal, night, a little warm lamp light. A wide composition with the character and its work on the right two thirds and calm space on the left. ' +
  'Photorealistic. No text, no letters, no numbers, no logos anywhere, no people. Any page, screen, newspaper or card shows only blank lines, shapes and pictures, never readable words or numbers.';

/** One take: start the edit, wait for it, crop the 3:2 render to 16:9 and save it. */
async function take(n, scene, letter) {
  const run = await api('/v1/runs', {
    method: 'POST',
    body: JSON.stringify({ templateId: 'edit-image', providers: { imageEditor: SUNBURST }, intake: { sourceUrl: STUDIO_SHOT, quality: 'high', instruction: instruction(scene) } }),
  });
  const id = run.id || run.runId;
  for (let i = 0; i < 150; i += 1) {
    await new Promise((r) => setTimeout(r, 5000));
    const cur = await api(`/v1/runs/${id}`);
    const status = (cur.status || '').toLowerCase();
    if (status === 'failed' || status === 'cancelled') throw new Error(`${id} ${status}`);
    if (status !== 'completed') continue;
    const url = (cur.steps || []).flatMap((s) => (s.outputs || []).map((o) => o.url)).filter((u) => u && /\.(webp|png)/.test(u)).pop();
    const raw = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })).arrayBuffer());
    const img = sharp(raw);
    const { width, height } = await img.metadata();
    const h = Math.round((width * 9) / 16);
    const file = path.join(OUT_DIR, `${n}-${letter}.webp`);
    await img.extract({ left: 0, top: Math.round((height - h) / 2), width, height: h }).resize(1536, 864).webp({ quality: 86 }).toFile(file);
    console.log(`  ${letter}: ${path.relative(ROOT, file)} (${id}, $${Number(cur.totalCosts?.actualUsd ?? 0).toFixed(3)})`);
    return;
  }
  throw new Error(`${id} timed out`);
}

const [n, scene] = process.argv.slice(2);
if (!n || !scene) {
  console.error('Usage: node scripts/newsletter-mason-cover.mjs <issue number> "<what Mason is doing that shows the title>"');
  process.exit(1);
}
fs.mkdirSync(OUT_DIR, { recursive: true });
console.log(`Issue ${n}: two takes of “${scene}”`);
await Promise.all(['a', 'b'].map((letter) => take(n, scene, letter)));
console.log(`Pick one, rename it ${n}.webp, and set the issue's cover to /images/newsletter/covers/vinyl-mason/${n}.webp.`);
