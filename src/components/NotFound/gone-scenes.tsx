'use client';

// esy.com's 410 worlds (2026-10-06, prototype): what Mason does with a page
// that was retired on purpose. A 404 is a piece that was never part of the
// build; a 410 is one that was, and was taken out. All three reuse the 404's
// gate and slab (scenes.tsx) on the same reef sim.
//
//   archive — the 410 slab sits in his gate. He lifts it out, files it in a
//             crate, and fits a fresh piece in its place. Kept, not lost.
//   buried  — he digs a hole beside his finished gate and buries the 410
//             slab under the sand. Gone for good.
//   movedOn — the 410 slab lies on the seabed with weed growing over it,
//             while he builds his new gate. The site moved on.

import type { CSSProperties } from 'react';

import { Box, C } from '@/components/BrandShapes/draw';
import { GROUND, ReefSim, besideSlot, buildJobs, type Job, type SimItem } from '@/components/BrandShapes/sim';
import { octagon } from '@/components/BrandShapes/symbols';
import { GATE, RING, SURFACE, Slab404, TOP, ringSide } from './scenes';
import './gone.css';

type V = [number, number];

/** The gate's eight sides; `skip` leaves the top one out (it's the slot the slabs fit). */
function Gate({ skip = false }: { skip?: boolean }) {
  return (
    <g>
      {[0, 1, 2, 3, 4, 5, 6, 7]
        .filter((k) => !(skip && k === 0))
        .map((k) => (
          <polygon key={k} points={ringSide(...GATE, RING.outer, RING.inner, k)} fill={k % 2 ? C.teal : C.ivory} stroke={C.navy} strokeWidth={1.5} />
        ))}
    </g>
  );
}

/** The top slot's outline, dashed while it's empty. */
const Gap = () => <polygon className="gn-gap" points={ringSide(...GATE, RING.outer, RING.inner, 0)} fill="none" stroke={C.mint} strokeWidth={2} strokeDasharray="6 5" />;

const SLOT: V = [TOP[0], TOP[1] + 6];
const slab410 = (fill = '#E2DCCB') => <Slab404 w={92} h={30} fill={fill} code="410" />;

// ── A · Archive ────────────────────────────────────────────────────────────
// The crate sits at the left; its front is drawn over the filed slab so the
// slab drops in rather than resting on top.
// Tall enough to clear the footer card, which covers the scene's lower edge.
const CRATE = { x: 150, w: 170, top: 262 };

const ARCHIVE_ITEMS: SimItem[] = [
  // 0: the retired page, starting in the gate, ending in the crate.
  { home: SLOT, slot: [CRATE.x + CRATE.w / 2, CRATE.top + 18], rot: -8, shape: slab410() },
  // 1: the fresh piece, waiting on the seabed at the right, ending in the gate.
  { home: [1100, GROUND - 16], slot: SLOT, rot: 0, marks: 'is-whole', shape: <Box x={-46} y={-15} w={92} h={30} c={[10, 10, 10, 10]} fill={C.teal} stroke={C.navy} strokeWidth={2} /> },
];
const ARCHIVING: Job[] = [
  { kind: 'rest', dur: 1.2 },
  { kind: 'walk', x: SLOT[0] },
  { kind: 'pick', item: 0 },
  { kind: 'walk', x: besideSlot(ARCHIVE_ITEMS[0]) },
  { kind: 'place', item: 0 },
  { kind: 'look', dur: 1.8 },
  { kind: 'walk', x: ARCHIVE_ITEMS[1].home[0] },
  { kind: 'pick', item: 1 },
  { kind: 'walk', x: besideSlot(ARCHIVE_ITEMS[1]) },
  { kind: 'place', item: 1 },
  { kind: 'rest', dur: 3 },
  { kind: 'look', dur: 2.2 },
  { kind: 'reset', dur: 1.6 },
];

function Crate({ part }: { part: 'back' | 'front' }) {
  const { x, w, top } = CRATE;
  if (part === 'back') return <Box x={x + 6} y={top - 8} w={w - 12} h={GROUND - top + 8} c={[0, 0, 0, 0]} fill="#0C3550" />;
  return (
    <g>
      <Box x={x} y={top + 22} w={w} h={GROUND - top - 18} c={[0, 0, 6, 6]} fill={C.wing} stroke={C.navy} strokeWidth={1.5} />
      {[0, 1].map((n) => (
        <Box key={n} x={x + 10} y={top + 34 + n * 20} w={w - 20} h={6} c={2} fill="#1E4A70" />
      ))}
      {/* The archive mark: the octagon, nothing written. */}
      <polygon points={octagon(x + w / 2, top + 44, 18).map((p) => p.join(',')).join(' ')} fill="none" stroke={C.mint} strokeWidth={2} />
    </g>
  );
}

export function ArchiveScene() {
  return (
    <ReefSim
      items={ARCHIVE_ITEMS}
      jobs={ARCHIVING}
      start={560}
      surface={SURFACE}
      className="gn-archive"
      label="Mason lifting a slab marked 410 out of his gate, filing it in a crate, and fitting a new piece in its place"
      back={
        <g>
          <Gate skip />
          <Gap />
          <Crate part="back" />
        </g>
      }
      front={<Crate part="front" />}
    />
  );
}

// ── B · Buried ─────────────────────────────────────────────────────────────
// The footer card covers the seabed itself, so nothing goes down into it:
// Mason sets the slab on the sand and heaps sand over it, and the heap rises
// above the seabed where it can be seen. Small diamonds mark the spot.
const SPOT = 420;
const HEAP_H = 64;
const BURY_ITEMS: SimItem[] = [{ home: [660, GROUND - 16], slot: [SPOT, GROUND - 16], rot: -6, shape: slab410() }];
const BURYING: Job[] = [
  { kind: 'rest', dur: 1 },
  { kind: 'walk', x: BURY_ITEMS[0].home[0] },
  { kind: 'pick', item: 0 },
  { kind: 'walk', x: SPOT + 120 },
  { kind: 'place', item: 0 },
  { kind: 'flag', cls: 'is-heaped', on: true },
  { kind: 'dig', dur: 2.4 },
  { kind: 'rest', dur: 2.6 },
  { kind: 'look', dur: 2.4 },
  { kind: 'rest', dur: 1.6 },
  { kind: 'flag', cls: 'is-heaped', on: false },
  { kind: 'reset', dur: 1.6 },
];

export function BuriedScene() {
  const top = GROUND - HEAP_H;
  return (
    <ReefSim
      items={BURY_ITEMS}
      jobs={BURYING}
      start={300}
      surface={SURFACE}
      className="gn-buried"
      label="Mason setting a slab marked 410 on the seabed beside his finished gate and heaping sand over it"
      back={<Gate />}
      front={
        <g className="gn-heap" style={{ transformOrigin: `${SPOT}px ${GROUND + 4}px` }}>
          {/* The heap, in the 45° cut, wide enough to cover the slab. */}
          <polygon points={`${SPOT - 92},${GROUND + 4} ${SPOT - 44},${top} ${SPOT + 44},${top} ${SPOT + 92},${GROUND + 4}`} fill="#163A5F" stroke={C.navy} strokeWidth={1.5} />
          {[-28, 0, 28].map((dx, n) => (
            <rect key={n} className="gn-mark" x={SPOT + dx - 4} y={top - 14 - (n % 2) * 6} width={8} height={8} fill={C.mint} transform={`rotate(45 ${SPOT + dx} ${top - 10 - (n % 2) * 6})`} style={{ '--n': n } as CSSProperties} />
          ))}
        </g>
      }
    />
  );
}

// ── C · Moved on ───────────────────────────────────────────────────────────
// Mason builds his gate side by side from a pile on the right, while the old
// 410 slab lies tilted on the seabed at the left with weed grown over it.

/** One gate side as a shape centred on its middle, plus where that middle is. */
function sidePiece(k: number): { at: V; shape: React.ReactNode } {
  const o = octagon(...GATE, RING.outer);
  const n = octagon(...GATE, RING.inner);
  const j = (k + 1) % 8;
  const quad: V[] = [o[k], o[j], n[j], n[k]];
  const at: V = [quad.reduce((s, p) => s + p[0], 0) / 4, quad.reduce((s, p) => s + p[1], 0) / 4];
  const points = quad.map(([x, y]) => `${(x - at[0]).toFixed(1)},${(y - at[1]).toFixed(1)}`).join(' ');
  return { at, shape: <polygon points={points} fill={k % 2 ? C.teal : C.ivory} stroke={C.navy} strokeWidth={1.5} /> };
}

// Bottom first, then up both sides, then the top, like a real build.
const BUILD_ORDER = [4, 5, 3, 6, 2, 7, 1, 0];
const BUILD_ITEMS: SimItem[] = BUILD_ORDER.map((k, i) => {
  const { at, shape } = sidePiece(k);
  return { home: [1150 - (i % 4) * 24, GROUND - 18 - Math.floor(i / 4) * 10] as V, slot: at, rot: 0, shape };
});

function Overgrown() {
  // The old slab, fallen against a rock, with weed grown up over it. It sits
  // high enough to clear the footer card, which covers the seabed itself.
  const x = 250;
  const y = GROUND - 58;
  return (
    <g>
      <Box x={x - 6} y={y + 6} w={84} h={GROUND - y - 2} c={[14, 18, 0, 0]} fill="#0C3550" stroke={C.navy} strokeWidth={1.5} />
      <g transform={`translate(${x} ${y}) rotate(-22)`}>{slab410('#C9C3B2')}</g>
      {[-34, -12, 10, 30].map((dx, n) => (
        <g key={n} className="gn-weed" style={{ '--n': n, transformOrigin: `${x + dx}px ${y + 40}px` } as CSSProperties}>
          {[0, 1, 2, 3].map((s) => (
            <Box key={s} x={x + dx - 4 + (s % 2) * 3} y={y + 26 - s * 13 - (n % 2) * 8} w={8} h={14} c={[3, 3, 3, 3]} fill={s === 3 ? C.mint : C.deep} />
          ))}
        </g>
      ))}
    </g>
  );
}

export function MovedOnScene() {
  return (
    <ReefSim
      items={BUILD_ITEMS}
      jobs={buildJobs(BUILD_ITEMS, { restEvery: 4 })}
      start={620}
      surface={SURFACE}
      className="gn-moved"
      label="An old slab marked 410 lying overgrown on the seabed while Mason builds a new gate piece by piece"
      back={<Overgrown />}
    />
  );
}
