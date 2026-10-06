// T · Bee Hive — one hive, many fields. A stencil skep in the middle; six
// flowers around it, one per vertical. Bees leave the door in turn, work a
// flower (it pulses), and come home carrying teal.

import type { CSSProperties } from 'react';
import { BeeBody } from './Bee';
import { Board } from './Board';
import { Box, C, ROUND_FOUR_NOTE, VERTICALS } from './draw';
import { octagon, pts, type TakeCopy } from './symbols';

const DOOR: [number, number] = [240, 236];
const FLOWERS: [number, number][] = [[64, 96], [150, 46], [330, 46], [416, 96], [70, 250], [410, 250]];

/** A flower: an octagon heart, four diamond petals, a stem. */
function Flower({ x, y, n, label }: { x: number; y: number; n: number; label?: string }) {
  return (
    <g>
      <Box x={x - 2} y={y + 14} w={4} h={36} fill={C.deep} />
      <g className="bs-flower" style={{ transformOrigin: `${x}px ${y}px`, '--n': n } as CSSProperties}>
        {[0, 90, 180, 270].map((d) => (
          <polygon key={d} points={`${x},${y - 30} ${x + 11},${y - 15} ${x},${y} ${x - 11},${y - 15}`} fill={n % 2 ? C.ivory : C.mint} stroke={C.teal} strokeWidth={1.5} transform={`rotate(${d} ${x} ${y})`} />
        ))}
        <polygon points={pts(octagon(x, y, 18))} fill={C.navy} />
      </g>
      {label && (
        <text className="bs-flower-label" x={x} y={y + 66} textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  );
}

/** The skep: stacked stencil bands narrowing to a domed top. */
function Skep() {
  const bands = [
    { y: 246, w: 132 }, { y: 222, w: 124 }, { y: 198, w: 110 }, { y: 174, w: 90 }, { y: 150, w: 62 },
  ];
  return (
    <g>
      <Box x={168} y={268} w={144} h={10} c={[0, 0, 5, 5]} fill={C.deep} />
      {bands.map((b, n) => (
        <Box key={n} x={240 - b.w / 2} y={b.y} w={b.w} h={21} c={n === 4 ? [22, 22, 0, 0] : [8, 8, 0, 0]} fill={n === 2 ? C.teal : C.navy} />
      ))}
      <Box x={228} y={250} w={24} h={18} c={[9, 9, 0, 0]} fill={C.ink} />
    </g>
  );
}

export function HiveScene({ labels = false }: { labels?: boolean }) {
  return (
    <svg className="bs-svg bs-hivescene" viewBox="0 0 480 360" role="img" aria-label="Bees leaving a hive for six flowers and coming home">
      {FLOWERS.map(([x, y], n) => (
        <Flower key={n} x={x} y={y} n={n} label={labels ? VERTICALS[n] : undefined} />
      ))}
      <Skep />
      {FLOWERS.map(([fx, fy], n) => (
        <g
          key={n}
          className="bs-trip"
          style={{ '--hx': `${DOOR[0]}px`, '--hy': `${DOOR[1]}px`, '--fx': `${fx}px`, '--fy': `${fy - 26}px`, '--dir': fx < DOOR[0] ? -1 : 1, '--n': n } as CSSProperties}
        >
          <g className="bs-bee-bob">
            <g transform="scale(1.3)">
              <BeeBody />
              <Box className="bs-trip-pollen" x={-8} y={8} w={10} h={8} c={3} fill={C.teal} />
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}

export const HIVE_COPY: TakeCopy = {
  key: 'T',
  name: 'Bee Hive',
  headline: 'One hive, every field.',
  lede: 'Six flowers, one for each line of work. The bees leave the hive in turn, work their flower and come home carrying what they found. The hive is the one place it all comes back to.',
  says: 'Many agents out in many verticals, one home for what they bring back.',
};

export default function BeeHive() {
  return (
    <Board
      tone="mint"
      copy={HIVE_COPY}
      note={ROUND_FOUR_NOTE}
      hero={
        <div className="bs-frame">
          <HiveScene labels />
        </div>
      }
      mark={() => <HiveScene />}
      divider={
        <div className="bs-rule-trip" aria-hidden="true">
          <span className="bs-octagon" />
          <i />
          <svg viewBox="-30 -30 60 50">
            <BeeBody />
          </svg>
          <span className="bs-octagon" />
        </div>
      }
    />
  );
}

