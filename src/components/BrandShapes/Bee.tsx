// M · Bee — many workers, one hive. Our comb is the truncated-square tiling:
// octagons with diamonds between, exactly the e's 45° cut. Bees fly their
// rounds and the cells fill with teal one by one, then get capped.

import type { CSSProperties } from 'react';
import { Board } from './Board';
import { Box, C, MASCOT_NOTE } from './draw';
import { noise, octagon, pts, type TakeCopy } from './symbols';

const S = 46; // cell pitch
const COLS = 7;
const ROWS = 5;
const X0 = 240 - ((COLS - 1) * S) / 2;
const Y0 = 194 - ((ROWS - 1) * S) / 2;

// Fill order is shuffled but fixed, so the comb fills unevenly like real work.
const CELLS = Array.from({ length: COLS * ROWS }, (_, n) => ({
  x: X0 + (n % COLS) * S,
  y: Y0 + Math.floor(n / COLS) * S,
  rank: noise(n * 3.1),
}))
  .map((c, _, all) => ({ ...c, order: all.filter((o) => o.rank < c.rank).length }));

// Diamonds sit where four octagons' cut corners meet.
const DIAMONDS = Array.from({ length: (COLS - 1) * (ROWS - 1) }, (_, n) => ({
  x: X0 + (n % (COLS - 1)) * S + S / 2,
  y: Y0 + Math.floor(n / (COLS - 1)) * S + S / 2,
}));

/** One bee, facing right, centred on (0, 0). */
export function BeeBody() {
  return (
    <g>
      <g className="bs-bee-wings">
        <Box x={-6} y={-22} w={14} h={16} c={[7, 7, 0, 0]} fill={C.ivory} opacity={0.85} />
        <Box x={4} y={-20} w={12} h={14} c={[6, 6, 0, 0]} fill={C.ivory} opacity={0.7} />
      </g>
      <Box x={-16} y={-8} w={26} h={16} c={[4, 6, 6, 4]} fill={C.bright} />
      <Box x={-10} y={-8} w={4} h={16} fill={C.navy} />
      <Box x={-2} y={-8} w={4} h={16} fill={C.navy} />
      <polygon points="-16,-3 -22,0 -16,3" fill={C.navy} />
      <Box x={10} y={-6} w={10} h={12} c={[2, 5, 5, 2]} fill={C.navy} />
    </g>
  );
}

function Hive({ small = false }: { small?: boolean }) {
  const bees = small ? [0] : [0, 1, 2];
  return (
    <svg className={`bs-svg bs-hive${small ? ' bs-hive--small' : ''}`} viewBox="0 0 480 360" role="img" aria-label="Stencil bees filling an octagon comb with teal, cell by cell">
      {DIAMONDS.map((d, i) => (
        <polygon key={`d${i}`} points={`${d.x},${d.y - 8} ${d.x + 8},${d.y} ${d.x},${d.y + 8} ${d.x - 8},${d.y}`} fill={C.deep} />
      ))}
      {CELLS.map((c, i) => (
        <g key={i}>
          <polygon points={pts(octagon(c.x, c.y, S - 6))} fill={C.navy} />
          <polygon className="bs-hive-honey" points={pts(octagon(c.x, c.y, S - 16))} fill={C.teal} style={{ '--d': `${c.order * 0.17}s`, transformOrigin: `${c.x}px ${c.y}px` } as CSSProperties} />
          <polygon className="bs-hive-cap" points={pts(octagon(c.x, c.y, S - 16))} fill={C.ivory} style={{ '--d': `${c.order * 0.03}s`, transformOrigin: `${c.x}px ${c.y}px` } as CSSProperties} />
        </g>
      ))}
      {bees.map((b) => (
        <g key={b} className={`bs-bee bs-bee--${b}`}>
          <g className="bs-bee-bob">
            <g transform="scale(1.5)">
              <BeeBody />
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}

export const BEE_COPY: TakeCopy = {
  key: 'M',
  name: 'Bee',
  headline: 'Many workers, one hive.',
  lede: 'Bees visit thousands of flowers and turn what they gather into one thing, stored in comb that keeps for years. Our comb is cut at 45°, octagons and diamonds, and it fills cell by cell as they work.',
  says: 'Many agents gather; Esy turns it into one finished thing and stores it where it keeps.',
};

export default function Bee() {
  return (
    <Board
      tone="mint"
      copy={BEE_COPY}
      note={MASCOT_NOTE}
      hero={
        <div className="bs-frame">
          <Hive />
        </div>
      }
      mark={() => <Hive small />}
      divider={
        <div className="bs-rule-comb" aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} className="bs-octagon" style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
