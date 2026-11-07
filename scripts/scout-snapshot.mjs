#!/usr/bin/env node
/* Scout's public snapshot for esy.com/scout (2026-11-07).

   Scout (the scout.esy.com repo) is private: its creator files hold every line
   of each study. The public page shows only who is on the roster and how many
   lines are counted, seen, Esy's reading or not checked. This script reads the
   creator files and writes just that to src/data/scout/snapshot.json, so no
   line of a study, post or transcript ever reaches esy.com.

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

const out = path.join(path.dirname(new URL(import.meta.url).pathname), '../src/data/scout/snapshot.json');
await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`${snapshot.creators.length} creators, ${Object.values(lines).reduce((a, b) => a + b, 0)} lines → ${path.relative(process.cwd(), out)}`);
