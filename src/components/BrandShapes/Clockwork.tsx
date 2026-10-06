// AA · Clockwork — one mainspring, every hand. An open movement: a great
// wheel turns the train, each gear at its own speed set by its teeth, a
// pendulum swings, dials keep their own count. Teeth are cut at 45°.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { Box, C, ROUND_FIVE_NOTE, SceneSvg, Wide } from './draw';
import { octagon, pts } from './symbols';

/** A gear outline: `n` teeth with flat tops and 45° flanks around radius r. */
function gearPoints(cx: number, cy: number, n: number, r: number): string {
  const depth = Math.min(14, r * 0.16);
  const out: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const p = (Math.PI * 2) / n;
    // Root, flank up, flat top, flank down: four points per tooth.
    [[r - depth, a - p * 0.3], [r, a - p * 0.15], [r, a + p * 0.15], [r - depth, a + p * 0.3]].forEach(([rr, aa]) =>
      out.push([cx + Math.cos(aa) * rr, cy + Math.sin(aa) * rr]),
    );
  }
  return pts(out);
}

/** A gear: toothed rim, a paper-coloured window, spokes and a jewelled hub. Turns at `period` seconds a turn. */
export function Gear({ x, y, n, r, tone, period, dir = 1, paper = '#F7F5EF' }: { x: number; y: number; n: number; r: number; tone: string; period: number; dir?: 1 | -1; paper?: string }) {
  return (
    <g className="bs-gear" style={{ transformOrigin: `${x}px ${y}px`, '--period': `${period}s`, '--dir': dir } as CSSProperties}>
      <polygon points={gearPoints(x, y, n, r)} fill={tone} />
      <polygon points={pts(octagon(x, y, r * 1.35))} fill={paper} />
      {[0, 45, 90, 135].map((d) => (
        <Box key={d} x={x - r * 0.68} y={y - r * 0.06} w={r * 1.36} h={r * 0.12} fill={tone} transform={`rotate(${d} ${x} ${y})`} />
      ))}
      <polygon points={pts(octagon(x, y, r * 0.42))} fill={tone} />
      <polygon points={pts(octagon(x, y, r * 0.2))} fill={C.mint} />
    </g>
  );
}

/** A small dial with its own hand. */
function Dial({ x, y, s, period }: { x: number; y: number; s: number; period: number }) {
  return (
    <g>
      <polygon points={pts(octagon(x, y, s))} fill={C.ivory} stroke={C.navy} strokeWidth={3} />
      {Array.from({ length: 8 }, (_, k) => (
        <Box key={k} x={x - 1.5} y={y - s / 2 + 6} w={3} h={8} fill={C.navy} transform={`rotate(${k * 45} ${x} ${y})`} />
      ))}
      <g className="bs-gear" style={{ transformOrigin: `${x}px ${y}px`, '--period': `${period}s`, '--dir': 1 } as CSSProperties}>
        <Box x={x - 2} y={y - s * 0.38} w={4} h={s * 0.38} fill={C.teal} />
      </g>
      <polygon points={pts(octagon(x, y, 10))} fill={C.navy} />
    </g>
  );
}

// The train: each gear meshes with the last, so its period scales with its teeth.
const BASE = 24;
const TRAIN = [
  { x: 600, y: 220, n: 32, r: 118, tone: C.navy, dir: 1 as const },
  { x: 772, y: 160, n: 16, r: 62, tone: C.teal, dir: -1 as const },
  { x: 418, y: 156, n: 20, r: 76, tone: C.deep, dir: -1 as const },
  { x: 819, y: 248, n: 10, r: 40, tone: C.bright, dir: 1 as const },
  { x: 357, y: 259, n: 12, r: 46, tone: C.navy, dir: 1 as const },
];

export function ClockScene({ view }: { view?: string }) {
  return (
    <SceneSvg view={view} className="bs-clock" label="An open clock movement: meshing gears, a pendulum and dials, all turning">
      <Wide y={0} h={560} fill="#F7F5EF" />
      <Wide y={0} h={560} fill="url(#bs-clock-grid)" />
      <defs>
        <pattern id="bs-clock-grid" width={24} height={24} patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="rgba(10,37,64,0.06)" strokeWidth={1} />
        </pattern>
      </defs>
      {/* The plate the movement is built on. */}
      <Box x={150} y={26} w={900} h={360} c={[40, 40, 40, 40]} fill="#EDE8DC" stroke="#D9D3C4" strokeWidth={3} />
      {[[190, 60], [1010, 60], [190, 352], [1010, 352]].map(([x, y], n) => (
        <polygon key={n} points={pts(octagon(x, y, 16))} fill="#D9D3C4" />
      ))}
      {TRAIN.map((g, n) => (
        <Gear key={n} {...g} period={(BASE * g.n) / TRAIN[0].n} />
      ))}
      <Dial x={230} y={150} s={84} period={60} />
      <Dial x={970} y={150} s={84} period={8} />
      {/* The pendulum and the anchor that ticks with it. */}
      <g className="bs-clock-pendulum" style={{ transformOrigin: '1110px 20px' }}>
        <Box x={1108} y={20} w={4} h={250} fill={C.navy} />
        <polygon points={pts(octagon(1110, 284, 40))} fill={C.teal} />
        <polygon points={pts(octagon(1110, 284, 16))} fill={C.mint} />
      </g>
      <g className="bs-clock-anchor" style={{ transformOrigin: '600px 70px' }}>
        <polygon points="560,92 600,64 640,92 630,98 600,78 570,98" fill={C.ink} />
      </g>
      <Box x={596} y={40} w={8} h={30} fill={C.ink} />
      <Wide y={392} h={168} fill={C.navy} />
    </SceneSvg>
  );
}

export const CLOCK_COPY: TakeCopy = {
  key: 'AA',
  name: 'Clockwork',
  headline: 'One mainspring, every hand.',
  lede: 'An open movement: the great wheel turns the train, every gear at the speed its teeth allow, a pendulum keeping time and each dial its own count. Nothing turns that isn’t connected to the spring.',
  says: 'Engineer-first precision: many moving parts driven from one place, every tick counted, nothing turning on its own.',
};

export default function Clockwork() {
  return (
    <Board
      copy={CLOCK_COPY}
      note={ROUND_FIVE_NOTE}
      hero={
        <div className="bs-frame bs-frame--flush">
          <ClockScene view="270 20 660 400" />
        </div>
      }
      mark={() => (
        <svg className="bs-svg" viewBox="0 0 480 360" role="img" aria-label="Two meshing gears">
          <Gear x={190} y={180} n={24} r={110} tone={C.navy} period={16} paper="#FFFFFF" />
          <Gear x={190 + 166} y={180} n={12} r={56} tone={C.teal} period={8} dir={-1} paper="#FFFFFF" />
        </svg>
      )}
      divider={
        <div className="bs-rule-gears" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <svg key={i} viewBox="-30 -30 60 60">
              <Gear x={0} y={0} n={10} r={26} tone={i % 2 ? C.teal : C.navy} period={6} dir={i % 2 ? -1 : 1} paper="#FFFFFF" />
            </svg>
          ))}
        </div>
      }
    />
  );
}
