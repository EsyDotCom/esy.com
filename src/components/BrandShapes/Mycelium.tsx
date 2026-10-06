// U · Mycelium — one network, many mushrooms. Below the ground a network
// grows out from one knot along 45° runs; where it surfaces, a mushroom
// sprouts, one per vertical. Then food keeps pulsing out along every run.

import type { CSSProperties } from 'react';
import { Board } from './Board';
import { Box, C, ROUND_FOUR_NOTE, VERTICALS } from './draw';
import { octagon, pts, type TakeCopy } from './symbols';

const KNOT: [number, number] = [240, 306];
const GROUND = 220;
// The mushrooms: where each surfaces, how big, and its cap colour.
const SHROOMS = [
  { x: 64, cap: 58, h: 30, tone: C.teal },
  { x: 152, cap: 72, h: 46, tone: C.navy },
  { x: 240, cap: 50, h: 24, tone: C.bright },
  { x: 328, cap: 66, h: 40, tone: C.deep },
  { x: 416, cap: 56, h: 34, tone: C.teal },
];

/** A run from the knot to a mushroom: across, a 45° climb, then straight up. */
function run(x: number): [number, number][] {
  if (x === KNOT[0]) return [KNOT, [x, GROUND]];
  const d = Math.sign(x - KNOT[0]);
  const climb = KNOT[1] - 266;
  return [KNOT, [x - d * climb, KNOT[1]], [x, 266], [x, GROUND]];
}
// Short side shoots for texture, also on the diagonal.
const SHOOTS: [number, number][][] = [
  [[120, 306], [100, 326], [70, 326]],
  [[360, 306], [380, 326], [420, 326]],
  [[200, 306], [184, 290]],
  [[290, 306], [310, 330]],
];

export function Network({ labels = false }: { labels?: boolean }) {
  return (
    <svg className="bs-svg bs-myc" viewBox="0 0 480 360" role="img" aria-label="A network under the ground feeding five mushrooms above it">
      <Box x={0} y={GROUND} w={480} h={140} fill={C.navy} />
      <Box x={0} y={GROUND - 3} w={480} h={4} fill={C.teal} />
      {[[30, 250], [96, 340], [196, 252], [300, 344], [446, 270], [380, 248]].map(([x, y], n) => (
        <Box key={n} x={x} y={y} w={12} h={8} c={3} fill="#163A5F" />
      ))}
      {SHOOTS.map((p, n) => (
        <polyline key={`s${n}`} className="bs-myc-run" pathLength={1} points={pts(p)} style={{ '--d': `${1 + n * 0.2}s` } as CSSProperties} />
      ))}
      {SHROOMS.map((m, n) => (
        <g key={n}>
          <polyline className="bs-myc-run" pathLength={1} points={pts(run(m.x))} style={{ '--d': `${n * 0.25}s` } as CSSProperties} />
          <polyline className="bs-myc-food" pathLength={1} points={pts(run(m.x))} style={{ '--d': `${n * 0.35}s` } as CSSProperties} />
          <g className="bs-myc-shroom" style={{ transformOrigin: `${m.x}px ${GROUND}px`, '--d': `${0.9 + n * 0.25}s`, '--n': n } as CSSProperties}>
            <Box x={m.x - 7} y={GROUND - m.h} w={14} h={m.h} fill={C.ivory} stroke={C.navy} strokeWidth={2} />
            <Box x={m.x - m.cap / 2} y={GROUND - m.h - 28} w={m.cap} h={30} c={[m.cap * 0.38, m.cap * 0.38, 3, 3]} fill={m.tone} />
            <Box x={m.x - m.cap / 4} y={GROUND - m.h - 18} w={7} h={7} c={2} fill={C.ivory} opacity={0.8} />
          </g>
          {labels && (
            <text className="bs-myc-label" x={m.x} y={GROUND - m.h - 40} textAnchor="middle" style={{ '--d': `${1.3 + n * 0.25}s` } as CSSProperties}>
              {VERTICALS[n]}
            </text>
          )}
        </g>
      ))}
      <polygon className="bs-myc-knot" points={pts(octagon(...KNOT, 26))} fill={C.mint} style={{ transformOrigin: `${KNOT[0]}px ${KNOT[1]}px` }} />
    </svg>
  );
}

export const MYCELIUM_COPY: TakeCopy = {
  key: 'U',
  name: 'Mycelium',
  headline: 'One network, every mushroom.',
  lede: 'A mushroom is only the part you see. Underneath, one network grows out from a single knot and feeds every one of them. Here it runs at 45°, and a mushroom comes up wherever it surfaces.',
  says: 'The products are what people see; Esy is the network underneath that feeds them all. A new vertical is a new mushroom on the same network.',
};

export default function Mycelium() {
  return (
    <Board
      copy={MYCELIUM_COPY}
      note={ROUND_FOUR_NOTE}
      hero={
        <div className="bs-frame">
          <Network labels />
        </div>
      }
      mark={() => <Network />}
      divider={
        <div className="bs-rule-myc" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties} />
          ))}
          <i />
        </div>
      }
    />
  );
}
