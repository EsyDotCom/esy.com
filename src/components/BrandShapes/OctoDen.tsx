'use client';

// AW · Den — a day in its life. The octopus clears a patch of sand, gathers
// stones from both ends of the reef, lays a footing, raises two walls and
// lifts a flat roof on top. Then it moves in, settles down and sleeps a
// while, comes back out, looks around, and starts the day again.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { Box, C } from './draw';
import { OctopusFigure } from './Octopus';
import { besideSlot, GROUND, ReefSim, ROUND_TEN_NOTE, type Job, type SimItem } from './sim';
import { octagon, pts } from './symbols';

const DEN = 820;
const stone = (w: number, h: number, fill: string) => <Box x={-w / 2} y={-h / 2} w={w} h={h} c={[6, 6, 4, 4]} fill={fill} stroke={C.navy} strokeWidth={1.5} />;

// The stones, in building order: footing, left wall, right wall, roof.
const ITEMS: SimItem[] = [
  { home: [430, 376], slot: [DEN - 50, 376], shape: stone(46, 22, '#E2DCCB') },
  { home: [1060, 376], slot: [DEN, 376], shape: stone(46, 22, C.ivory) },
  { home: [480, 376], slot: [DEN + 50, 376], shape: stone(46, 22, '#E2DCCB') },
  { home: [380, 378], slot: [DEN - 62, 350], front: true, shape: stone(34, 26, C.teal) },
  { home: [1120, 378], slot: [DEN + 62, 350], front: true, shape: stone(34, 26, C.teal) },
  { home: [330, 378], slot: [DEN - 62, 323], front: true, shape: stone(34, 26, C.deep) },
  { home: [1000, 378], slot: [DEN + 62, 323], front: true, marks: 'has-walls', shape: stone(34, 26, C.deep) },
  { home: [600, 380], slot: [DEN, 298], front: true, marks: 'has-roof', shape: <Box x={-92} y={-12} w={184} h={24} c={[12, 12, 0, 0]} fill={C.ivory} stroke={C.navy} strokeWidth={1.5} /> },
];

// The day: clear the ground, build, move in, sleep, come out, look around, start over.
const JOBS: Job[] = [
  { kind: 'walk', x: DEN },
  { kind: 'dig', dur: 2.4 },
  ...ITEMS.flatMap((it, i): Job[] => [
    { kind: 'walk', x: it.home[0] },
    { kind: 'pick', item: i },
    { kind: 'walk', x: besideSlot(it) },
    { kind: 'place', item: i },
    ...(i === 2 ? [{ kind: 'rest', dur: 1.6 } as Job] : []),
    ...(i === 5 ? [{ kind: 'look', dur: 2 } as Job] : []),
  ]),
  { kind: 'flag', cls: 'is-done', on: true },
  { kind: 'walk', x: DEN },
  { kind: 'flag', cls: 'is-home', on: true },
  { kind: 'rest', dur: 6 },
  { kind: 'flag', cls: 'is-home', on: false },
  { kind: 'walk', x: 620 },
  { kind: 'look', dur: 2.4 },
  { kind: 'rest', dur: 1.5 },
  { kind: 'flag', cls: 'is-done', on: false },
  { kind: 'reset', dur: 1.8 },
];

export function DenScene({ view }: { view?: string }) {
  return (
    <ReefSim
      items={ITEMS}
      jobs={JOBS}
      start={560}
      view={view}
      className="bs-den"
      label="An octopus building a den from stones, moving in and sleeping"
      back={
        <g>
          {/* The cleared patch, sand thrown up while it digs, the dark inside once the walls are up. */}
          <Box x={DEN - 110} y={GROUND - 2} w={220} h={6} c={3} fill="#1E4A72" />
          <g className="bs-den-dig">
            {[-60, -30, 0, 30, 60].map((dx, k) => (
              <rect key={k} x={DEN + dx - 3} y={GROUND - 8} width={6} height={6} fill="#E3F4F0" transform={`rotate(45 ${DEN + dx} ${GROUND - 5})`} style={{ '--k': k } as CSSProperties} />
            ))}
          </g>
          <Box className="bs-den-inside" x={DEN - 46} y={GROUND - 92} w={92} h={80} c={[16, 16, 0, 0]} fill="#061527" />
        </g>
      }
      front={
        <g className="bs-den-zzz">
          {[0, 1, 2].map((n) => (
            <polygon key={n} points={pts(octagon(DEN + 30 + n * 14, GROUND - 120 - n * 18, 10 + n * 4))} fill="none" stroke={C.ivory} strokeWidth={2} style={{ '--n': n } as CSSProperties} />
          ))}
        </g>
      }
    />
  );
}

export const DEN_COPY: TakeCopy = {
  key: 'AW',
  name: 'Den',
  headline: 'A day in its life.',
  lede: 'The octopus clears a patch of sand, gathers stones from both ends of the reef, lays a footing, raises two walls and lifts a roof on top. Then it moves in and sleeps a while, comes back out, looks around, and starts the day again.',
  says: 'Steady, unhurried work that turns into somewhere to live. Easy, because it’s done the same careful way every day.',
};

export default function OctoDen() {
  return (
    <Board
      tone="night"
      header
      copy={DEN_COPY}
      note={ROUND_TEN_NOTE}
      hero={
        <div className="bs-frame bs-frame--night bs-frame--flush">
          <DenScene view="40 40 1100 440" />
        </div>
      }
      mark={() => (
        <svg className="bs-svg" viewBox="0 0 480 360" role="img" aria-label="The octopus">
          <OctopusFigure items={{}} />
        </svg>
      )}
      divider={
        <div className="bs-rule-lights" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="bs-octagon" style={{ '--d': `${i * 0.3}s` } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
