#!/usr/bin/env node
/* Scout's public snapshot for esy.com/scout (2026-11-07).

   Scout (the scout.esy.com repo) is private: its creator files hold every line
   of each study. The public page shows only who is on the roster and how many
   lines are counted, seen, Esy's reading or not checked. This script reads the
   creator files and writes just that to src/data/scout/snapshot.json, so no
   line of a study, post or transcript ever reaches esy.com.

   2026-11-07 (Zev): esy.com/scout also shows each creator's game plan, so it writes
   src/data/scout/creators.json too, holding only what a visitor could check on the
   creator's own public pages: the top of the funnel (each platform they post on, with
   its audience as the profile showed it), the game plan (Esy's reading), where each
   platform sends people (routes), what they sell at the price shown (ladder), and their
   social profiles. Never videos, posts, transcripts, the compare table, claims or Esy's
   private notes (fit, facets). Lines that tie a dollar figure to a person's revenue or
   income are dropped (no income claims about named people).

   Usage: node scripts/scout-snapshot.mjs ../scout.esy.com
*/

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const scout = process.argv[2];
if (!scout) {
  console.error('Usage: node scripts/scout-snapshot.mjs <path to the scout.esy.com repo>');
  process.exit(1);
}

const dir = path.join(scout, 'src/data/creators');
const files = (await readdir(dir)).filter((f) => f.endsWith('.json'));
const plans = (await Promise.all(files.map(async (f) => JSON.parse(await readFile(path.join(dir, f), 'utf8')))))
  // Real creators only: not @esydotcom itself, not samples.
  .filter((p) => p.schema === 'scout-creator/1' && !p.self && !p.sample)
  .sort((a, b) => a.name.localeCompare(b.name));

const lines = { counted: 0, seen: 0, reading: 0, open: 0 };
for (const p of plans) for (const c of p.claims ?? []) if (c.basis in lines) lines[c.basis] += 1;

const snapshot = {
  schema: 'scout-snapshot/1',
  takenOn: new Date().toISOString().slice(0, 10),
  // "Mindstream (Adam Biddlecombe & Matt Village)" reads as Mindstream in the grid.
  creators: plans.map((p) => ({ id: p.id, name: p.name.replace(/\s*\(.*\)\s*$/, ''), avatar: p.youtube?.avatar || '' })),
  lines,
};

// ── The public game plans ──────────────────────────────────────────────────────────────
// A line is dropped when it ties money to someone's revenue or income ("his story to $3M",
// "monthly revenue"); product prices ("$184/mo") stay, they're on the creator's own page.
const INCOME = /\b(revenue|income|earn(?:s|ed|ings)?|ARR|MRR|net worth|made \$|makes \$|story to \$)/i;
const keep = (...texts) => !texts.some((t) => t && INCOME.test(t));
const clean = (o, keys) => Object.fromEntries(keys.filter((k) => o[k] !== undefined && o[k] !== '').map((k) => [k, o[k]]));

const publicPlans = plans.map((p) => ({
  id: p.id,
  name: p.name.replace(/\s*\(.*\)\s*$/, ''),
  avatar: p.youtube?.avatar || '',
  readOn: p.capturedOn,
  // The game plan is Esy's reading of the evidence; it's dropped if it states income.
  game: keep(p.game) ? p.game : null,
  // Where they post: the top of the funnel, biggest audience first, as each profile showed it.
  platforms: [...(p.platforms ?? [])].sort((a, b) => (b.followers ?? 0) - (a.followers ?? 0)).map((x) => clean(x, ['name', 'followers', 'url'])),
  routes: (p.routes ?? [])
    .map((r) => ({ from: r.from, kind: r.kind, hops: (r.hops ?? []).filter((h) => keep(h.at, h.does)).map((h) => clean(h, ['at', 'does', 'basis', 'url'])) }))
    .filter((r) => r.hops.length),
  ladder: (p.ladder ?? []).filter((l) => keep(l.name, l.price, l.what)).map((l) => clean(l, ['name', 'price', 'kind', 'what', 'basis', 'url'])),
  links: (p.sources ?? [])
    .filter((s) => s.group === 'social' && s.status !== 'not found')
    .map((s) => clean(s, ['kind', 'handle', 'url', 'label'])),
}));

const plansOut = path.join(path.dirname(new URL(import.meta.url).pathname), '../src/data/scout/creators.json');
await mkdir(path.dirname(plansOut), { recursive: true });
await writeFile(plansOut, `${JSON.stringify({ schema: 'scout-public-creators/1', takenOn: snapshot.takenOn, creators: publicPlans }, null, 2)}\n`);
const dropped = plans.reduce((n, p) => n + (p.ladder?.length ?? 0) + (p.routes ?? []).reduce((m, r) => m + (r.hops?.length ?? 0), 0), 0)
  - publicPlans.reduce((n, p) => n + p.ladder.length + p.routes.reduce((m, r) => m + r.hops.length, 0), 0);
console.log(`${publicPlans.length} public game plans (${dropped} income lines dropped, ${publicPlans.filter((p) => !p.game).length} game plans withheld) → ${path.relative(process.cwd(), plansOut)}`);

const out = path.join(path.dirname(new URL(import.meta.url).pathname), '../src/data/scout/snapshot.json');
await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`${snapshot.creators.length} creators, ${Object.values(lines).reduce((a, b) => a + b, 0)} lines → ${path.relative(process.cwd(), out)}`);
