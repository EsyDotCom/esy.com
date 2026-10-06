'use client';

// AX · Gardener — tended, it grows. The octopus carries sprouts from a tray
// and plants them in a row; each one grows into tall kelp behind it as it
// works. Every couple of plants it fetches a stone for a small marker cairn.
// When the row is full a school comes to live in it, and the octopus rests.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { Box, C } from './draw';
import { OctopusFigure } from './Octopus';
import { Fish } from './reefkit';
import { buildJobs, GROUND, ReefSim, ROUND_TEN_NOTE, type SimItem } from './sim';

const PLOTS = [640, 730, 820, 910, 1000, 1090];
const CAIRN = 300;

const sprout = (
  <g>
    <Box x={-2} y={-14} w={4} h={18} fill={C.bright} />
    <Box x={-12} y={-14} w={10} h={6} c={[0, 3, 0, 3]} fill={C.mint} r={-20} />
    <Box x={2} y={-18} w={10} h={6} c={[3, 0, 3, 0]} fill={C.mint} r={20} />
    <Box x={-9} y={2} w={18} h={8} c={[0, 0, 4, 4]} fill="#1E4A72" />
  </g>
);
const stone = (w: number, fill: string) => <Box x={-w / 2} y={-11} w={w} h={22} c={[7, 7, 4, 4]} fill={fill} stroke={C.navy} strokeWidth={1.5} />;

// Planting order: two sprouts, a stone for the cairn, repeat.
const ITEMS: SimItem[] = [
  { home: [390, 378], slot: [PLOTS[0], 380], marks: 'grow-0', shape: sprout },
  { home: [420, 378], slot: [PLOTS[1], 380], marks: 'grow-1', shape: sprout },
  { home: [1150, 377], slot: [CAIRN, 377], shape: stone(46, '#E2DCCB') },
  { home: [450, 378], slot: [PLOTS[2], 380], marks: 'grow-2', shape: sprout },
  { home: [480, 378], slot: [PLOTS[3], 380], marks: 'grow-3', shape: sprout },
  { home: [1110, 377], slot: [CAIRN, 355], shape: stone(36, C.ivory) },
  { home: [510, 378], slot: [PLOTS[4], 380], marks: 'grow-4', shape: sprout },
  { home: [540, 378], slot: [PLOTS[5], 380], marks: 'grow-5', shape: sprout },
  { home: [1070, 377], slot: [CAIRN, 335], shape: stone(26, C.teal) },
];
const JOBS = buildJobs(ITEMS, { restEvery: 3 });

/** A kelp stalk at plot x that grows when its sprout is planted. */
function Grown({ x, n }: { x: number; n: number }) {
  const h = 150 + (n % 3) * 40;
  return (
    <g className={`bs-gard-kelp bs-gard-kelp--${n}`} style={{ transformOrigin: `${x}px ${GROUND}px` }}>
      {Array.from({ length: Math.round(h / 30) }, (_, k) => (
        <Box key={k} x={x - 8 + (k % 2) * 4} y={GROUND - 30 - k * 30} w={16 - k * 0.6} h={27} c={[7, 7, 0, 0]} fill={k % 2 ? C.deep : '#0F6B63'} />
      ))}
    </g>
  );
}

export function GardenerScene({ view }: { view?: string }) {
  return (
    <ReefSim
      items={ITEMS}
      jobs={JOBS}
      start={460}
      view={view}
      className="bs-gard"
      label="An octopus planting sprouts that grow into kelp, building a little cairn as it goes"
      back={
        <g>
          {/* The sprout tray, the plots, and the kelp that grows from each. */}
          <Box x={370} y={384} w={190} h={8} fill="#1E4A72" />
          {PLOTS.map((x, n) => (
            <g key={x}>
              <Box x={x - 16} y={GROUND - 2} w={32} h={6} c={3} fill="#163A5F" />
              <Grown x={x} n={n} />
            </g>
          ))}
        </g>
      }
      front={
        <g className="bs-gard-school">
          {[[0, 0], [-28, -12], [-28, 12], [-56, -4], [-56, 18]].map(([x, y], n) => (
            <g key={n} transform={`translate(${x} ${y})`}>
              <g className="bs-reef-fish" style={{ '--n': n } as CSSProperties}>
                <Fish />
              </g>
            </g>
          ))}
        </g>
      }
    />
  );
}

export const GARDENER_COPY: TakeCopy = {
  key: 'AX',
  name: 'Gardener',
  headline: 'Tended, it grows.',
  lede: 'The octopus carries sprouts from a tray and plants them in a row. Each one grows into tall kelp as it works, and every couple of plants it fetches a stone for a small marker cairn. When the row is full a school comes to live in it.',
  says: 'Small, steady care that compounds into something alive, with a marker left at every step.',
};

export default function OctoGardener() {
  return (
    <Board
      tone="night"
      header
      copy={GARDENER_COPY}
      note={ROUND_TEN_NOTE}
      hero={
        <div className="bs-frame bs-frame--night bs-frame--flush">
          <GardenerScene view="40 40 1100 440" />
        </div>
      }
      mark={() => (
        <svg className="bs-svg" viewBox="0 0 480 360" role="img" aria-label="The octopus">
          <OctopusFigure items={{}} />
        </svg>
      )}
      divider={
        <div className="bs-rule-kelp" aria-hidden="true">
          {Array.from({ length: 36 }, (_, i) => (
            <span key={i} style={{ '--i': i, height: `${14 + (i % 5) * 5}px` } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
