#!/usr/bin/env node

/**
 * Generate the cover art for the sample newsletter issues
 * (/prototypes/newsletter/ round 2 and the L3 issue pages), through Esy's
 * own API. Same approach as generate-education-backdrops.mjs (copied from it,
 * 2026-10-09): site art is generated through api.esy.com, one run per cover,
 * POST /v1/runs, poll until it settles, save the artifact into public/.
 *
 * Each cover is about its issue's subject, with no people and no text. The
 * issue's title sits over the LEFT side of the lead card, so every prompt asks
 * for a dark, calm left side with the subject on the right.
 *
 * Usage:
 *   node scripts/generate-newsletter-covers.mjs              # everything missing
 *   node scripts/generate-newsletter-covers.mjs --only 1     # one issue
 *   node scripts/generate-newsletter-covers.mjs --force      # re-render existing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, process.env.COVERS_OUT || 'public/prototypes/newsletter/covers');
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

/* One look for every cover, so the issues read as a series, in Esy's theme
 * (Zev, 2026-10-09): the v1 scenes were the right idea, so each cover stays a
 * concrete, cinematic scene of its issue's subject, but lit only in the
 * brand's colours: a navy world, teal and jade light, no warm or rainbow
 * colour, no people. */
const STYLE =
  'Cinematic editorial image with a duotone palette: everything in deep navy (#0A2540) shadow and teal (#00A896) to jade (#00D4AA) light, no warm colours, no other hues, soft glow, gentle film grain, calm and quiet, no people, no characters';

/** Topic covers for the /topics prototypes (2026-10-09), same series style.
 *  Run with COVERS_SET=topics COVERS_OUT=public/prototypes/topics/covers. */
const TOPIC_COVERS = [
  {
    id: 'agentic-workflows',
    scene:
      'A quiet production line at night on the right side of the frame: glowing panels moving along a track between three stations, each station checking a panel with a soft scan of light, the last station lit brighter jade under a single lamp',
  },
  {
    id: 'ai-models',
    scene:
      'A row of tall glowing monoliths of different heights standing in a dark hall on the right side of the frame, the newest one at the end of the row taller, brighter and sharper than the rest, light reflecting on a polished floor',
  },
  {
    id: 'ai-image-generation',
    scene:
      'A vast wall of floating picture frames on the right side of the frame, many already holding glowing landscapes and still lifes, one new frame in front filling with light as its picture appears',
  },
  {
    id: 'ai-coding-tools',
    scene:
      'A dark workbench on the right side of the frame with an open laptop glowing on it, thin lines of light rising from the keyboard and assembling into a floating structure of panels and frames above it',
  },
];

/** Art for the /tools prototypes (2026-10-09): a hero and one cover per job.
 *  Run with COVERS_SET=tools COVERS_OUT=public/images/tools/art. */
const TOOL_COVERS = [
  { id: 'hero', scene: 'A vast dark workshop on the right side of the frame with rows of glowing workbenches stretching into the distance, each bench holding a different luminous instrument or machine, soft teal light pooling on each one, mist in the air' },
  { id: 'writing-content', scene: 'On the right side of the frame, a single glowing quill-like stylus writing lines of light that become floating pages, the pages drifting upward and stacking' },
  { id: 'images-video', scene: 'On the right side of the frame, a glowing camera lens made of light projecting a stack of luminous picture frames and film strips into the air' },
  { id: 'seo-ai-search', scene: 'On the right side of the frame, a glowing compass rose hovering over a dark map of tiny lit points, beams of light linking a few points into a path' },
  { id: 'email', scene: 'On the right side of the frame, a stream of glowing envelopes flying in a long arc toward a softly lit open doorway' },
  { id: 'social-ads', scene: 'On the right side of the frame, many small glowing screens floating at different depths, ripples of light spreading out from one bright screen to the rest' },
  { id: 'automation-agents', scene: 'On the right side of the frame, a quiet line of glowing geometric machines passing a single bright cube along a track from one to the next' },
  { id: 'data-prospecting', scene: 'On the right side of the frame, a vast grid of tiny lit nodes with a few nodes glowing brighter and connected by fine threads of light into a cluster' },
  { id: 'building-with-ai', scene: 'On the right side of the frame, a glowing laptop on a dark workbench with structures of light panels assembling themselves in the air above the keyboard' },
];

/** One cover per sample issue, by issue number (src/components/NewsletterPage/issues.ts). */
const ISSUE_COVERS = [
  {
    id: '1',
    scene:
      'A vast gallery wall on the right side of the frame covered floor to ceiling in neat rows of small hand-drawn illustrations (animals, fruit, stars, flowers) drawn as glowing teal line art, thousands of them receding into the distance, one empty frame at the edge being filled by a piece floating into place',
  },
  {
    id: '2',
    scene:
      'An empty newsroom at night on the right side of the frame: three desks in a row each with a glowing teal monitor and neat stacks of papers, a fourth desk at the end under a single jade lamp with one approved page laid flat, big windows with a city at night beyond',
  },
  {
    id: '3',
    scene:
      'On the right side of the frame, a tall stack of glowing blank web pages floating in deep navy space among soft clouds, one page lifting out of the stack toward a luminous teal speech bubble shape above it, thin light lines connecting them',
  },
];

/** Which covers to render: the issues (default) or the topics. */
const BACKDROPS = process.env.COVERS_SET === 'topics' ? TOPIC_COVERS : process.env.COVERS_SET === 'tools' ? TOOL_COVERS : ISSUE_COVERS;

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
        prompt: `${STYLE}. ${backdrop.scene}. The left half of the frame is dark navy and empty. No text, no lettering, no logos, no readable screen content, no watermarks anywhere in the image.`,
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
  console.log(`Rendering ${queue.length} cover${queue.length > 1 ? 's' : ''} via ${API_BASE}…`);

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
