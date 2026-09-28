#!/usr/bin/env node

/**
 * Generate lead images for the image-led article prototypes
 * (/prototypes/article/), through Esy's own API.
 *
 * Same approach as generate-education-backdrops.mjs: site art is generated
 * through api.esy.com, not drawn ad hoc. One run per image: POST /v1/runs,
 * poll until it settles, save the artifact into public/.
 *
 * The images illustrate a real article ("Building Multi-Agent Workflows with
 * Claude Code"). They follow the docs' art direction: isometric where the
 * system acts, pinned to the brand hexes so the palette doesn't drift, and no
 * lettering anywhere (the OCR gate rejects invented text). The Cover direction
 * puts the title over the image, so every prompt asks for a quiet lower-left.
 *
 * Usage:
 *   node scripts/generate-article-images.mjs                 # everything missing
 *   node scripts/generate-article-images.mjs --only workshop # one image
 *   node scripts/generate-article-images.mjs --force         # re-render existing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public/prototypes/article');
const API_BASE = process.env.ESY_API_URL || 'https://api.esy.com';
const TEMPLATE = 'generate-illustration';

/* The key lives in the API repo's agent env, never in this repo. Walk up from
 * here to find it, because this repo is often checked out as a worktree. */
function keyFile() {
  let dir = ROOT;
  for (let i = 0; i < 10; i += 1) {
    const candidate = path.join(dir, 'esy/server/api.esy.com/.env.agent');
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

function apiKey() {
  if (process.env.ESY_API_KEY) return process.env.ESY_API_KEY;
  const file = keyFile();
  if (!file) throw new Error('No ESY_API_KEY in the environment, and no api.esy.com/.env.agent above this repo');
  const line = fs.readFileSync(file, 'utf8').split('\n').find((l) => l.startsWith('ESY_API_KEY='));
  if (!line) throw new Error(`No ESY_API_KEY in ${file}`);
  return line.slice('ESY_API_KEY='.length).trim();
}

const PALETTE = 'palette pinned to deep navy #1B2A44, warm cream #EDE6D6 and jade #2E9E78, with soft shadows';

/** Two candidates for one article's lead image; the prototypes use whichever reads best. */
const IMAGES = [
  {
    id: 'workshop',
    scene: `Isometric editorial illustration of a tidy AI workshop: four small, friendly robot agents at their own workstations, each handling one step, passing glowing task cards along a conveyor to a final station where a finished report is assembled. Clean, calm, ${PALETTE}. The lower-left third of the frame is open floor with nothing on it`,
  },
  {
    id: 'lanes',
    scene: `Isometric editorial illustration: four parallel lanes of glowing task cards, each lane tended by a small robot agent, merging at the right into one bright finished document on a pedestal, on a clean floating platform. Calm and orderly, ${PALETTE}. The lower-left third of the frame is empty and quiet`,
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(pathname, init = {}) {
  const res = await fetch(`${API_BASE}${pathname}`, {
    ...init,
    headers: { Authorization: `Bearer ${apiKey()}`, 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`${init.method || 'GET'} ${pathname} → ${res.status}: ${body.slice(0, 400)}`);
  return body ? JSON.parse(body) : null;
}

/** Start a run and wait for it to settle. Returns the finished run. */
async function render(image) {
  const run = await api('/v1/runs', {
    method: 'POST',
    body: JSON.stringify({
      templateId: TEMPLATE,
      intake: {
        prompt: `${image.scene}. No text, no lettering, no numbers, no logos, no readable screens, no watermarks anywhere in the image.`,
        style: 'isometric',
        aspectRatio: '16:9',
        quality: 'xhigh',
        categories: 'technology,business',
        textPolicy: 'none',
        textBearing: false,
      },
    }),
  });

  const id = run.id || run.runId;
  for (let i = 0; i < 150; i += 1) {
    await sleep(4000);
    const state = await api(`/v1/runs/${id}`);
    const status = (state.status || '').toLowerCase();
    if (['succeeded', 'completed', 'complete', 'success'].includes(status)) return state;
    if (['failed', 'error', 'cancelled', 'canceled'].includes(status)) {
      throw new Error(`run ${id} ${status}: ${state.error || state.failureReason || 'no reason given'}`);
    }
  }
  throw new Error(`run ${id} did not settle in 10 minutes`);
}

/** The render step carries the picture; later steps are metadata and the gate. */
function imageUrlOf(run) {
  const fromSteps = (run.steps || []).flatMap((step) => (step.outputs || []).map((o) => o.url)).filter(Boolean);
  const candidates = [
    ...fromSteps,
    run.artifact?.url,
    run.artifact?.imageUrl,
    run.output?.url,
    ...(run.artifacts || []).map((a) => a.url || a.imageUrl),
  ].filter(Boolean);
  if (!candidates.length) throw new Error(`no image URL on run ${run.id}: ${JSON.stringify(run).slice(0, 500)}`);
  return candidates[0];
}

async function main() {
  const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;
  const force = process.argv.includes('--force');
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const exists = (id) => ['webp', 'png'].some((ext) => fs.existsSync(path.join(OUT_DIR, `${id}.${ext}`)));
  const queue = IMAGES.filter((img) => (!only || img.id === only) && (force || !exists(img.id)));
  if (!queue.length) return console.log('Nothing to render.');
  console.log(`Rendering ${queue.length} image${queue.length > 1 ? 's' : ''} via ${API_BASE}…`);

  let spend = 0;
  for (const image of queue) {
    const started = Date.now();
    process.stdout.write(`  ${image.id} … `);
    try {
      const run = await render(image);
      const url = imageUrlOf(run);
      const bytes = Buffer.from(await (await fetch(url)).arrayBuffer());
      const file = path.join(OUT_DIR, `${image.id}.${url.includes('.png') ? 'png' : 'webp'}`);
      fs.writeFileSync(file, bytes);
      const costs = run.totalCosts || {};
      const cost = Number(costs.actualUsd ?? costs.estimatedUsd ?? 0);
      spend += cost;
      console.log(`${(bytes.length / 1024).toFixed(0)} KB, ${((Date.now() - started) / 1000).toFixed(0)}s, $${cost.toFixed(3)} (run ${run.id || ''})`);
    } catch (err) {
      console.log(`FAILED\n     ${err.message}`);
    }
  }
  console.log(`Done. Spend: $${spend.toFixed(2)}. Files in ${path.relative(ROOT, OUT_DIR)}.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
