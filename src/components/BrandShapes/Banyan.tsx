// Z · Banyan — one tree, many trunks. A banyan drops roots from its branches;
// each one that reaches the ground thickens into a new trunk, so one tree can
// spread across a field and live for centuries. The roots drop and take hold,
// the canopy stirs, leaves fall, lanterns sway and birds cross.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { Box, C, Diamond, ROUND_FIVE_NOTE, SceneSvg, Wide } from './draw';
import { octagon, pts } from './symbols';

const GROUND = 370;
// Where the roots come down from the branches, left to right.
const ROOTS = [262, 330, 412, 788, 870, 940];
// Canopy masses: chamfered blobs at different heights, dark at the back and
// light on top, so the crown reads lumpy and alive rather than flat.
const CANOPY = [
  { x: 150, y: 132, w: 190, h: 84, tone: C.deep },
  { x: 880, y: 128, w: 190, h: 84, tone: C.deep },
  { x: 240, y: 100, w: 230, h: 96, tone: '#0F6B63' },
  { x: 720, y: 96, w: 240, h: 100, tone: '#0F6B63' },
  { x: 420, y: 56, w: 360, h: 120, tone: '#0F6B63' },
  { x: 290, y: 84, w: 160, h: 70, tone: C.teal },
  { x: 500, y: 34, w: 210, h: 80, tone: C.teal },
  { x: 760, y: 80, w: 170, h: 70, tone: C.teal },
  { x: 640, y: 64, w: 120, h: 52, tone: C.teal },
  { x: 180, y: 140, w: 100, h: 44, tone: C.teal },
  { x: 930, y: 136, w: 100, h: 44, tone: C.teal },
  { x: 540, y: 28, w: 110, h: 42, tone: C.bright },
  { x: 330, y: 84, w: 76, h: 30, tone: C.bright },
  { x: 790, y: 82, w: 84, h: 30, tone: C.bright },
  { x: 430, y: 120, w: 90, h: 34, tone: C.mint },
];

export function Tree({ cycle = false }: { cycle?: boolean }) {
  return (
    <g className={cycle ? 'bs-banyan--cycle' : undefined}>
      {/* Branches out to where the roots drop. */}
      <Box x={250} y={198} w={330} h={12} c={[6, 0, 0, 6]} fill={C.navy} />
      <Box x={620} y={198} w={340} h={12} c={[0, 6, 6, 0]} fill={C.navy} />
      <Box x={566} y={150} w={68} h={GROUND - 150} fill={C.navy} />
      <Box x={520} y={170} w={70} h={10} r={-30} fill={C.navy} />
      <Box x={610} y={168} w={74} h={10} r={28} fill={C.navy} />
      <polygon points={`536,${GROUND} 566,${GROUND - 34} 634,${GROUND - 34} 664,${GROUND}`} fill={C.navy} />
      {/* Each root drops; the ones that reach the ground thicken into trunks, the rest hang thin. */}
      {ROOTS.map((x, n) => {
        const trunk = n % 2 === 0;
        const w = 12 + (n % 3) * 3;
        return (
          <g key={n} style={{ '--n': n } as CSSProperties}>
            <Box className="bs-banyan-root" x={x - 1.5} y={208} w={3} h={trunk ? GROUND - 208 : 90 + n * 14} fill={C.navy} style={{ transformOrigin: `${x}px 208px` }} />
            {trunk && <Box className="bs-banyan-trunk" x={x - w / 2} y={208} w={w} h={GROUND - 208} c={[0, 0, 4, 4]} fill={C.navy} style={{ transformOrigin: `${x}px ${GROUND}px` }} />}
          </g>
        );
      })}
      {CANOPY.map((b, n) => (
        <Box key={n} className="bs-banyan-leaf" x={b.x} y={b.y} w={b.w} h={b.h} c={[b.h * 0.45, b.h * 0.45, b.h * 0.3, b.h * 0.3]} fill={b.tone} style={{ '--n': n } as CSSProperties} />
      ))}
    </g>
  );
}

export function BanyanScene({ view }: { view?: string }) {
  return (
    <SceneSvg view={view} className="bs-banyan" label="A banyan tree dropping roots that become new trunks across a meadow">
      <defs>
        <linearGradient id="bs-banyan-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#E3F4F0" />
          <stop offset="1" stopColor="#FAFDFC" />
        </linearGradient>
      </defs>
      <Wide y={0} h={560} fill="url(#bs-banyan-sky)" />
      <polygon className="bs-river-sun" points={pts(octagon(150, 70, 60))} fill={C.bright} opacity={0.4} style={{ transformOrigin: '150px 70px' }} />
      {/* Birds: chevrons crossing in a loose V. */}
      <g className="bs-banyan-birds">
        {[[0, 0], [-26, -12], [-26, 12], [-52, -22]].map(([x, y], n) => (
          <polyline key={n} className="bs-banyan-bird" points={`${x - 8},${y - 5} ${x},${y} ${x + 8},${y - 5}`} fill="none" stroke={C.navy} strokeWidth={2.5} style={{ '--n': n } as CSSProperties} />
        ))}
      </g>
      <polygon points="-2400,330 40,330 120,290 260,290 300,330 900,330 960,300 1100,300 1140,330 3600,330 3600,380 -2400,380" fill="#CFE7E0" />
      <Wide y={GROUND} h={200} fill="#BFE0D7" />
      {[90, 180, 1010, 1100, 470, 720].map((x, n) => (
        <polygon key={n} points={`${x},${GROUND + 6} ${x + 6},${GROUND - 8} ${x + 12},${GROUND + 6}`} fill={C.deep} />
      ))}
      <Tree />
      {/* Lanterns hanging from the branches, swaying. */}
      {[300, 470, 730, 900].map((x, n) => (
        <g key={n} className="bs-banyan-lantern" style={{ transformOrigin: `${x}px 212px`, '--n': n } as CSSProperties}>
          <Box x={x - 1} y={212} w={2} h={30} fill={C.navy} />
          <polygon points={pts(octagon(x, 252, 18))} fill={C.mint} />
        </g>
      ))}
      {/* Falling leaves. */}
      {[340, 520, 690, 880].map((x, n) => (
        <Diamond key={n} className="bs-banyan-fall" x={x} y={200} s={5} fill={C.bright} style={{ '--n': n } as CSSProperties} />
      ))}
      <Wide y={392} h={168} fill={C.navy} />
    </SceneSvg>
  );
}

export const BANYAN_COPY: TakeCopy = {
  key: 'Z',
  name: 'Banyan',
  headline: 'One tree, many trunks.',
  lede: 'A banyan drops roots from its branches. Each root that reaches the ground thickens into a new trunk, so one tree can spread across a field and live for centuries.',
  says: 'One organism, many verticals: add a line of work and the same tree grows a trunk for it, without starting over.',
};

export default function Banyan() {
  return (
    <Board
      tone="mint"
      copy={BANYAN_COPY}
      note={ROUND_FIVE_NOTE}
      hero={
        <div className="bs-frame bs-frame--flush">
          <BanyanScene view="180 10 840 420" />
        </div>
      }
      mark={() => (
        <svg className="bs-svg" viewBox="190 20 820 380" role="img" aria-label="A banyan tree growing new trunks">
          <Tree cycle />
        </svg>
      )}
      divider={
        <div className="bs-rule-roots" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
