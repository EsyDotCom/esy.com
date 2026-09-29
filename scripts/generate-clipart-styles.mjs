#!/usr/bin/env node

/**
 * One subject in six clip.art styles, for the homepage's clip.art case study
 * (/prototypes/home-clipart/, the "style range" direction).
 *
 * Runs Esy's own clip-art workflow (generate-clip-art-asset-v2, the one
 * clip.art uses) once per style on the same subject as the replay's real run
 * (run-e9d17422, a hot dog in sunglasses), and saves the transparent result
 * into public/prototypes/home-clipart/<style>.webp. One run per style: POST
 * /v1/runs, poll until it settles, save the final artifact.
 *
 *   node scripts/generate-clipart-styles.mjs            # every style missing
 *   node scripts/generate-clipart-styles.mjs --force    # re-render all
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'public/prototypes/home-clipart');
const API_BASE = process.env.ESY_API_URL || 'https://api.esy.com';
const TEMPLATE = 'generate-clip-art-asset-v2';
const SUBJECT = 'a fun, happy anthropomorphic hot dog wearing sunglasses';
const STYLES = ['flat', 'watercolor', 'outline', 'pixel', 'clay', '3d'];

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
  const res = await fetch(`${API_BASE}${pathname}`, {
    ...init,
    headers: { Authorization: `Bearer ${apiKey()}`, 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`${init.method || 'GET'} ${pathname} → ${res.status}: ${body.slice(0, 300)}`);
  return body ? JSON.parse(body) : null;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Start one run and wait for it; returns the finished run. */
async function render(style) {
  const run = await api('/v1/runs', {
    method: 'POST',
    body: JSON.stringify({
      templateId: TEMPLATE,
      intake: {
        prompt: SUBJECT,
        style,
        aspectRatio: '1:1',
        quality: 'medium',
        backgroundRemovalEnabled: true,
        elementType: 'subject',
        categories: 'food',
        textPolicy: 'none',
        textBearing: false,
      },
    }),
  });
  const id = run.id || run.run?.id;
  for (let i = 0; i < 90; i += 1) {
    await sleep(4000);
    const r = await api(`/v1/runs/${id}`);
    const cur = r.run || r;
    if (cur.status === 'completed') return cur;
    if (cur.status === 'failed' || cur.status === 'cancelled') throw new Error(`${id} ${cur.status}: ${cur.error || ''}`);
  }
  throw new Error(`${id} timed out`);
}

/** The last image a run produced: the cutout when there is one. */
function finalImage(run) {
  const urls = (run.steps || []).flatMap((s) => (s.outputs || []).map((o) => o.url)).filter((u) => u && /\.(webp|png)$/.test(u));
  return urls[urls.length - 1];
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const force = process.argv.includes('--force');
let spend = 0;
await Promise.all(
  STYLES.map(async (style) => {
    const file = path.join(OUT_DIR, `${style}.webp`);
    if (!force && fs.existsSync(file)) return;
    const run = await render(style);
    const url = finalImage(run);
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    fs.writeFileSync(file, buf);
    const cost = run.totalCosts?.actualUsd ?? run.totalCosts?.estimatedUsd ?? 0;
    spend += cost;
    console.log(`  ${style} → ${path.relative(ROOT, file)} (${run.id}, $${cost.toFixed(3)})`);
  }),
);
console.log(`Done. Spend: $${spend.toFixed(3)}`);
