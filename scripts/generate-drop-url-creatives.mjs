#!/usr/bin/env node

/**
 * Generate the sample post art for the drop-your-URL heroes, through Esy.
 *
 * WHY THIS EXISTS. The prototype's cards started as CSS gradients, which was
 * fast but off-brand: our own rule is that section art is generated through
 * api.esy.com, not drawn ad hoc. The cards also carry our own headline type on
 * top, so every render asks for a clean scene with room in the frame and
 * `textPolicy: 'none'` — the OCR gate then rejects any invented lettering.
 *
 * One run per creative: POST /v1/runs, poll until it settles, take the
 * artifact's image URL, and write the file into public/. Runs are sequential
 * on purpose — this is a handful of images, and a queue that fails loudly one
 * at a time is easier to read than sixteen parallel failures.
 *
 * Usage:
 *   node scripts/generate-drop-url-creatives.mjs                 # everything missing
 *   node scripts/generate-drop-url-creatives.mjs --only shop-0   # one piece
 *   node scripts/generate-drop-url-creatives.mjs --force         # re-render existing
 *   node scripts/generate-drop-url-creatives.mjs --backdrops     # the three hero backdrops
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public/prototypes/drop-url/creatives');
const BG_DIR = path.join(ROOT, 'public/prototypes/drop-url/backdrops');
const API_BASE = process.env.ESY_API_URL || 'https://api.esy.com';
const TEMPLATE = 'generate-illustration';

/* The key lives in the API repo's agent env, never in this repo. Walk up from
 * here to find it, because this repo is often checked out as a worktree several
 * levels deeper than the normal client/esy.com. */
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

/**
 * One render per beat in sample-feed.ts, keyed the same way (`<vertical>-<i>`),
 * so a card can find its picture by id. The scenes are deliberately plain and
 * un-lettered: our own headline type goes on top of them in the card.
 */
const CREATIVES = [
  { id: 'shop-0', scene: 'A warm retail studio shelf of folded knitwear in oatmeal and rust, morning light raking across the fabric, shallow depth of field, generous empty space in the upper half' },
  { id: 'shop-1', scene: 'Flat overhead arrangement of three folded garments in different sizes on a pale linen backdrop, soft daylight, calm negative space at the top' },
  { id: 'shop-2', scene: 'A kraft-paper parcel tied with cotton string on a wooden packing bench, tape dispenser and scissors just out of focus behind it, warm window light' },
  { id: 'shop-3', scene: 'Close view of hands folding tissue paper into an open shipping box on a workshop bench, soft side light, warm neutral palette' },

  { id: 'saas-0', scene: 'A quiet modern desk at dawn with a closed laptop, a ceramic mug and a notebook, cool blue window light, wide empty space above the desk' },
  { id: 'saas-1', scene: 'Two colleagues at a whiteboard seen from behind, gesturing at clean abstract shapes, bright office, muted navy and teal palette, no writing visible' },
  { id: 'saas-2', scene: 'An overhead view of a single monitor on an uncluttered desk in a calm office, plant at the edge of the frame, cool daylight, screen glowing plain and blank' },
  { id: 'saas-3', scene: 'A small team of four around a low table in a bright room, laptops closed, relaxed conversation, natural light, wide framing' },

  { id: 'local-0', scene: 'A restaurant terrace in late afternoon, empty tables with glasses catching the low sun, string lights overhead, warm amber tones, people blurred in the distance' },
  { id: 'local-1', scene: 'A still lake at golden hour with a wooden dock reaching into the water, pine ridge behind, calm and inviting, wide sky' },
  { id: 'local-2', scene: 'A barrel sauna on a snowy lakeside deck at dusk, warm light spilling from the doorway, blue winter air, steam rising' },
  { id: 'local-3', scene: 'A baker in an apron pulling a tray from an oven in a small kitchen before opening, warm low light, steam, calm early-morning mood' },

  { id: 'studio-0', scene: 'A renovated living room in soft daylight, mid-century furniture, plaster walls, one large window, architectural photography, generous empty wall space' },
  { id: 'studio-1', scene: 'A design studio table scattered with material samples, wood, stone and fabric swatches arranged in a grid, overhead daylight, muted palette' },
  { id: 'studio-2', scene: 'A close architectural detail of a stair handrail meeting a plaster wall, raking light, quiet minimal composition' },
  { id: 'studio-3', scene: 'An empty bright studio space with drafting tables and large windows, plants, late afternoon light, wide calm framing' },
];

/**
 * The three hero backdrops, one per direction. These sit behind centred
 * display type, so every prompt asks for a quiet middle and detail pushed to
 * the edges — a busy centre makes the headline unreadable no matter how good
 * the picture is. Landscape, and rendered at the top quality tier because a
 * full-bleed background is the largest thing on the page.
 */
const BACKDROPS = [
  {
    id: 'dusk',
    scene:
      'A still northern fjord at night seen from a low shore: deep navy sky, a soft teal-green aurora arcing across the upper third, dark ridge silhouettes on both sides, a pale moon low on the right, moonlight laid across calm black water. Painterly, atmospheric, very dark and uncluttered through the centre of the frame, detail concentrated at the edges',
  },
  {
    id: 'daybreak',
    scene:
      'A wide calm morning landscape in warm cream and sand: low rolling hills under a pale gold sky, a soft sun just above the horizon on the right, thin mist in the valleys, no buildings. Painterly and airy, very light and almost empty through the middle of the frame, detail only along the bottom edge',
  },
  {
    id: 'ledger',
    scene:
      'A dark teal dawn over still water: layered headlands receding into mist, a faint jade glow along the horizon, deep green-blue tones throughout, glassy reflections. Painterly, calm, minimal, with an empty uncluttered centre and detail low in the frame',
  },
];

const CATEGORIES = 'business,lifestyle,food,nature,interiors,people';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(pathname, init = {}) {
  const res = await fetch(`${API_BASE}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`${init.method || 'GET'} ${pathname} → ${res.status}: ${body.slice(0, 400)}`);
  return body ? JSON.parse(body) : null;
}

/** Start a run and wait for it to settle. Returns the finished run. */
async function render(creative, { aspectRatio = '3:4', quality = 'high' } = {}) {
  const run = await api('/v1/runs', {
    method: 'POST',
    body: JSON.stringify({
      templateId: TEMPLATE,
      intake: {
        // The scene carries the whole brief; the no-lettering clause is belt
        // and braces beside textPolicy, because the OCR gate fails the run if
        // the model invents a sign or a caption.
        prompt: `${creative.scene}. Editorial marketing photography. No text, no lettering, no logos, no watermarks anywhere in the image.`,
        style: 'cinematic',
        aspectRatio,
        quality,
        categories: CATEGORIES,
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
  // The two sets differ in shape, quality tier and destination; everything
  // else about a render is the same.
  const backdrops = process.argv.includes('--backdrops');
  const dir = backdrops ? BG_DIR : OUT_DIR;
  const set = backdrops ? BACKDROPS : CREATIVES;
  const opts = backdrops ? { aspectRatio: '16:9', quality: 'xhigh' } : {};
  fs.mkdirSync(dir, { recursive: true });

  const queue = set.filter((c) => (!only || c.id === only) && (force || !fs.existsSync(path.join(dir, `${c.id}.webp`))));
  if (!queue.length) return console.log('Nothing to render.');
  console.log(`Rendering ${queue.length} creative${queue.length > 1 ? 's' : ''} via ${API_BASE}…`);

  let spend = 0;
  for (const creative of queue) {
    const started = Date.now();
    process.stdout.write(`  ${creative.id} … `);
    try {
      const run = await render(creative, opts);
      const url = imageUrlOf(run);
      const bytes = Buffer.from(await (await fetch(url)).arrayBuffer());
      const file = path.join(dir, `${creative.id}.${url.includes('.png') ? 'png' : 'webp'}`);
      fs.writeFileSync(file, bytes);
      // The run carries a full ledger; actualUsd is what the providers
      // reported, estimatedUsd is what we booked before they answered.
      const costs = run.totalCosts || {};
      const cost = Number(costs.actualUsd ?? costs.estimatedUsd ?? 0);
      spend += cost;
      console.log(`${(bytes.length / 1024).toFixed(0)} KB, ${((Date.now() - started) / 1000).toFixed(0)}s, $${cost.toFixed(3)}`);
    } catch (err) {
      console.log(`FAILED\n     ${err.message}`);
    }
  }
  console.log(`Done. Sample spend: $${spend.toFixed(2)}. Files in ${path.relative(ROOT, dir)}.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
