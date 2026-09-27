#!/usr/bin/env node

/**
 * Generate the background images for the education hero's Scene direction
 * (E, /prototypes/education/scene/), through Esy's own API.
 *
 * Same approach as generate-drop-url-creatives.mjs: our rule is that site art
 * is generated through api.esy.com, not drawn ad hoc. One run per backdrop:
 * POST /v1/runs, poll until it settles, save the artifact into public/.
 *
 * The headline and signup sit over the LEFT half of the frame, so every prompt
 * asks for a dark, empty left side with the detail on the right. A busy left
 * side makes white type unreadable no matter how good the picture is.
 *
 * Usage:
 *   node scripts/generate-education-backdrops.mjs              # everything missing
 *   node scripts/generate-education-backdrops.mjs --only desk  # one backdrop
 *   node scripts/generate-education-backdrops.mjs --force      # re-render existing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public/prototypes/education/backdrops');
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

/** Two candidates for the one Scene hero; the prototype shows whichever reads best. */
const BACKDROPS = [
  {
    id: 'desk',
    scene:
      "A marketing engineer's workspace at blue hour, seen from behind and to the side: a wide dark desk by a tall window over a city at dusk, one monitor glowing with abstract teal charts and flowing curves, a notebook and a coffee cup, deep navy and teal tones, soft rim light. The left half of the frame is dark, calm and empty, all detail sits on the right",
  },
  {
    id: 'flow',
    scene:
      'Abstract editorial artwork: luminous teal and jade lines flowing between small glowing nodes, like a marketing system drawn in light, drifting across a deep navy field with a faint grain. Painterly and calm. The left half of the frame is dark and nearly empty, the flowing lines gather on the right',
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
async function render(backdrop) {
  const run = await api('/v1/runs', {
    method: 'POST',
    body: JSON.stringify({
      templateId: TEMPLATE,
      intake: {
        // The no-lettering clause backs up textPolicy: the OCR gate fails a
        // run whose picture invents a sign, a caption or screen text.
        prompt: `${backdrop.scene}. Cinematic editorial image. No text, no lettering, no logos, no readable screen content, no watermarks anywhere in the image.`,
        style: 'cinematic',
        aspectRatio: '16:9',
        quality: 'xhigh',
        categories: 'business,technology,interiors',
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
  const queue = BACKDROPS.filter((b) => (!only || b.id === only) && (force || !exists(b.id)));
  if (!queue.length) return console.log('Nothing to render.');
  console.log(`Rendering ${queue.length} backdrop${queue.length > 1 ? 's' : ''} via ${API_BASE}…`);

  let spend = 0;
  for (const backdrop of queue) {
    const started = Date.now();
    process.stdout.write(`  ${backdrop.id} … `);
    try {
      const run = await render(backdrop);
      const url = imageUrlOf(run);
      const bytes = Buffer.from(await (await fetch(url)).arrayBuffer());
      const file = path.join(OUT_DIR, `${backdrop.id}.${url.includes('.png') ? 'png' : 'webp'}`);
      fs.writeFileSync(file, bytes);
      // actualUsd is what the providers reported; estimatedUsd is what we booked before they answered.
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
