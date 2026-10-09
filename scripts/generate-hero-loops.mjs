#!/usr/bin/env node

/**
 * Generate the photoreal hero backgrounds for /prototypes/hero-backdrop/
 * (2026-10-09), through Esy's own API: a still per concept on
 * `generate-photoreal-image`, then a slow shot from that still on
 * `generate-photoreal-video`. Same run/poll approach as
 * generate-newsletter-covers.mjs.
 *
 * Zev's brief: professional, elegant and subtle, matching what the site is
 * for (learning to build AI marketing systems). Real places and real light,
 * no people, no symbols, nothing gimmicky. The headline sits on the LEFT, so
 * every still keeps the left side calm and dark.
 *
 * Usage:
 *   node scripts/generate-hero-loops.mjs stills            # every missing still
 *   node scripts/generate-hero-loops.mjs loops             # every missing loop (needs its still)
 *
 * Stills land in public/images/hero-loops/. Loops stay in Esy's storage: the
 * script records each loop's URL in scripts/hero-loops.runs.json, and
 * src/components/EducationHero/heroLoops.ts points the site at it.
 *   node scripts/generate-hero-loops.mjs stills --only desk --force
 *
 * Cost (2026-10-09): a still is capped at $0.75; a loop at 720p 16:9 is
 * $0.3024/s, so 8s is about $2.42.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public/images/hero-loops');
const API_BASE = process.env.ESY_API_URL || 'https://api.esy.com';

/* The key lives in the API repo's agent env, never in this repo. */
function apiKey() {
  if (process.env.ESY_API_KEY) return process.env.ESY_API_KEY;
  let dir = ROOT;
  for (let i = 0; i < 10; i += 1) {
    const file = path.join(dir, 'esy/server/api.esy.com/.env.agent');
    if (fs.existsSync(file)) {
      const line = fs.readFileSync(file, 'utf8').split('\n').find((l) => l.startsWith('ESY_API_KEY='));
      if (line) return line.slice('ESY_API_KEY='.length).trim();
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error('No ESY_API_KEY in the environment, and none in api.esy.com/.env.agent above this repo');
}

/* One art direction for all five, so they read as one site. */
const ART_DIRECTION =
  'Quiet, high-end editorial photography. Deep navy shadows with cool teal-blue light and a little warm neutral, low contrast, ' +
  'restrained colour, fine grain. Nothing staged, no people, no hands, no text, no logos, no readable screens, no symbols or props placed for meaning.';

const PURPOSE = 'full-width website hero background behind a white headline on the left, for a site that teaches people to build AI marketing systems';

/* The five concepts (Zev picked "elegant and subtle", 2026-10-09). `motion`
 * is the one thing that happens in the shot, for the video step. */
export const CONCEPTS = [
  {
    id: 'desk',
    name: 'The desk at dusk',
    prompt: 'A clean, minimal wooden desk beside a tall floor-to-ceiling window at blue hour, an open laptop on the right side of the desk whose screen glows softly and is out of focus, a city softly blurred beyond the glass. The left of the frame is the dark, empty wall and window edge.',
    register: 'editorial',
    motion: 'The light outside the window fades very slowly toward night while the laptop glow stays steady; the camera is almost still, with the faintest slow push in.',
  },
  {
    id: 'architecture',
    name: 'Light on architecture',
    prompt: 'A minimal modern interior of smooth concrete and glass, late low sunlight entering from the right and casting long, crisp, parallel window shadows across a pale concrete wall and floor on the right half. The left of the frame falls into deep, even shadow.',
    register: 'editorial',
    motion: 'The sunlight shadows slide very slowly across the wall as the sun moves; nothing else moves and the camera is locked off.',
  },
  {
    id: 'city',
    name: 'City through glass',
    prompt: 'A night city seen through a tall window, completely out of focus: large soft bokeh lights in navy, teal and a little warm white filling the right side, faint reflections on the glass. The left side is dark glass with almost no light.',
    register: 'editorial',
    motion: 'The out-of-focus city lights shimmer and breathe gently, a few drift slowly as traffic moves; the camera is locked off.',
  },
  {
    id: 'glass',
    name: 'Dark glass, moving light',
    prompt: 'A macro photograph of a dark, smooth surface where black glass meets brushed dark metal, a single soft band of cool teal-white light lying across the right side of the surface. Most of the frame, especially the left, is near-black.',
    register: 'editorial',
    motion: 'The soft band of light travels very slowly across the surface from right to left and softens as it goes; the camera is locked off.',
  },
  {
    id: 'studio',
    name: 'The studio, early morning',
    prompt: 'A pristine, premium modern design studio at first daylight: a long pale oak desk with two slim monitors far back on the right, both out of focus and dark, polished concrete floor, no cables or clutter, very fine haze, a soft beam of early light falling from a high window on the right. The left of the frame is a calm, dim, smooth plaster wall. Immaculate, quiet, expensive.',
    register: 'editorial',
    motion: 'The early morning light warms and strengthens very gradually while fine dust drifts slowly through the beam; the camera is locked off.',
  },
  // Round 3 (2026-10-09): Zev liked B6 (the desk at dusk behind his
  // portrait), so five more in that feel, two of them real skylines he
  // named (New York, Miami). The portrait sits in front of each.
  {
    id: 'desk-night',
    name: 'Night office',
    prompt: 'A refined home office late at night: a dark walnut desk on the right with a laptop glowing softly, a warm brass desk lamp casting a small pool of light, a tall bookshelf in shadow, the city lights through a large window behind. The left of the frame is a dark, quiet wall.',
    register: 'editorial',
    motion: 'The city lights beyond the window twinkle softly and the lamp light stays steady; the camera is almost still, with the faintest slow push in.',
  },
  {
    id: 'desk-highrise',
    name: 'High floor',
    prompt: 'A corner office on a high floor at dusk: floor-to-ceiling windows with a wide city skyline turning blue, a clean desk on the right with two slim monitors glowing softly and out of focus, a leather chair. The left of the frame is a darker stretch of window and wall.',
    register: 'editorial',
    motion: 'Lights come on one by one across the skyline as dusk deepens; the camera is locked off.',
  },
  {
    id: 'desk-loft',
    name: 'Loft',
    prompt: 'A loft workspace in the evening: exposed brick and tall black steel-framed windows, a long desk on the right with a monitor glowing softly, a couple of large green plants, city lights outside. The left of the frame is a dark brick wall in shadow.',
    register: 'editorial',
    motion: 'The plants sway very slightly in a soft draught and the window light dims slowly into evening; the camera is locked off.',
  },
  {
    id: 'city-nyc',
    name: 'New York',
    prompt: 'A clean, minimal workspace inside a high-floor office in Manhattan: a wooden desk on the right with an open laptop glowing softly and out of focus, a tall floor-to-ceiling window behind it with the Manhattan skyline at blue hour, the Empire State Building and Midtown towers lighting up. The left of the frame is the dark wall and window edge. No legible signage.',
    register: 'editorial',
    motion: 'Lights come on slowly across the Manhattan towers as dusk deepens; the camera is almost still, with the faintest slow push in.',
  },
  {
    id: 'city-miami',
    name: 'Miami',
    prompt: 'A clean, minimal workspace inside a high-floor office in Miami: a wooden desk on the right with an open laptop glowing softly and out of focus, a tall floor-to-ceiling window behind it with the Brickell towers and Biscayne Bay at dusk, a soft pink and blue sky reflected on calm water. The left of the frame is the dark wall and window edge. No legible signage.',
    register: 'editorial',
    motion: 'The dusk sky deepens slowly and the tower lights shimmer on the bay; the camera is almost still, with the faintest slow push in.',
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

/** Start a run and wait for it to settle (video can take several minutes). */
async function run(templateId, intake) {
  const started = await api('/v1/runs', { method: 'POST', body: JSON.stringify({ templateId, intake }) });
  const id = started.id || started.runId;
  for (let i = 0; i < 300; i += 1) {
    await sleep(5000);
    const state = await api(`/v1/runs/${id}`);
    const status = (state.status || '').toLowerCase();
    if (['succeeded', 'completed', 'complete', 'success'].includes(status)) return state;
    if (['failed', 'error', 'cancelled', 'canceled'].includes(status)) {
      throw new Error(`run ${id} ${status}: ${state.error || state.failureReason || 'no reason given'}`);
    }
  }
  throw new Error(`run ${id} did not settle in 25 minutes`);
}

/** Every URL the run produced, the render step's first. */
function urlsOf(r) {
  return [
    ...(r.steps || []).flatMap((s) => (s.outputs || []).map((o) => o.url || o.videoUrl)),
    r.artifact?.url, r.artifact?.videoUrl, r.artifact?.imageUrl,
    ...(r.artifacts || []).map((a) => a.url || a.videoUrl || a.imageUrl),
  ].filter(Boolean);
}

const costOf = (r) => Number(r.totalCosts?.actualUsd ?? r.totalCosts?.estimatedUsd ?? 0);
const metaFile = path.join(ROOT, 'scripts/hero-loops.runs.json');
const readMeta = () => (fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile, 'utf8')) : {});
const writeMeta = (m) => fs.writeFileSync(metaFile, `${JSON.stringify(m, null, 2)}\n`);

async function still(c) {
  const r = await run('generate-photoreal-image', {
    prompt: c.prompt, artDirection: ART_DIRECTION, purpose: PURPOSE,
    negativeSpace: 'left', aspectRatio: '4:3', quality: 'high',
  });
  const url = urlsOf(r).find((u) => /\.(webp|png|jpe?g)(\?|$)/i.test(u)) || urlsOf(r)[0];
  if (!url) throw new Error(`no image on run ${r.id}`);
  fs.writeFileSync(path.join(OUT_DIR, `${c.id}.webp`), Buffer.from(await (await fetch(url)).arrayBuffer()));
  return { runId: r.id, url, cost: costOf(r) };
}

async function loop(c, stillUrl) {
  const r = await run('generate-photoreal-video', {
    referenceImageUrl: stillUrl, motionBrief: c.motion, register: c.register,
    durationSeconds: '8', aspectRatio: '16:9', resolution: '720p', generateAudio: false,
    constraints: 'no people, no hands, no camera shake, no cuts, no new objects appearing',
  });
  const url = urlsOf(r).find((u) => /\.(mp4|webm|mov)(\?|$)/i.test(u)) || urlsOf(r)[0];
  if (!url) throw new Error(`no video on run ${r.id}`);
  return { runId: r.id, url, cost: costOf(r) };
}

async function main() {
  const stage = process.argv[2];
  if (!['stills', 'loops'].includes(stage)) throw new Error('Say which: stills or loops');
  const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;
  const force = process.argv.includes('--force');
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const meta = readMeta();
  // A still is done when its file exists; a loop when its URL is recorded.
  const done = (c) => (stage === 'stills' ? fs.existsSync(path.join(OUT_DIR, `${c.id}.webp`)) : !!meta[c.id]?.loop?.url);
  const queue = CONCEPTS.filter((c) => (!only || c.id === only) && (force || !done(c)));
  if (!queue.length) return console.log('Nothing to render.');
  console.log(`Rendering ${queue.length} ${stage} via ${API_BASE}…`);

  // All at once: each run is independent, and video runs take minutes.
  const results = await Promise.allSettled(queue.map(async (c) => {
    const t = Date.now();
    const m = meta[c.id] || {};
    if (stage === 'loops' && !m.still?.url) throw new Error(`${c.id}: render its still first`);
    const out = stage === 'stills' ? await still(c) : await loop(c, m.still.url);
    meta[c.id] = { ...m, [stage === 'stills' ? 'still' : 'loop']: out };
    console.log(`  ${c.id}: ${((Date.now() - t) / 1000).toFixed(0)}s, $${out.cost.toFixed(3)} (run ${out.runId})`);
    return out.cost;
  }));
  writeMeta(meta);
  results.forEach((r, i) => r.status === 'rejected' && console.log(`  ${queue[i].id}: FAILED ${r.reason?.message}`));
  const spend = results.reduce((s, r) => s + (r.status === 'fulfilled' ? r.value : 0), 0);
  console.log(`Done. Spend: $${spend.toFixed(2)}.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
