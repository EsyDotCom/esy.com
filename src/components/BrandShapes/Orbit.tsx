// AB · Orbit — everything in flight, one place that knows. Over the chamfered
// horizon of an octagon planet, satellites cross on their orbits while a
// ground dish sweeps and sends rings up to them; a moon, stars, a comet.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { Box, C, Diamond, ROUND_FIVE_NOTE, SceneSvg, Wide } from './draw';
import { noise, octagon, pts } from './symbols';

const PLANET: [number, number] = [600, 1250];
const STARS = Array.from({ length: 56 }, (_, n) => ({ x: Math.abs(noise(n + 3)) * 1200, y: Math.abs(noise(n + 70)) * 330, s: 1.5 + Math.abs(noise(n + 1)) * 2 }));

/** A satellite: a body, two panels, an antenna, a blinking light. */
export function Satellite({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <Box x={-46} y={-6} w={32} h={12} c={2} fill={C.teal} />
      <Box x={14} y={-6} w={32} h={12} c={2} fill={C.teal} />
      <Box x={-46} y={-1} w={92} h={2} fill={C.navy} opacity={0.5} />
      <Box x={-12} y={-12} w={24} h={24} c={5} fill={C.ivory} />
      <Box x={-2} y={-22} w={4} h={10} fill={C.ivory} />
      <Box className="bs-orbit-blink" x={-3} y={-28} w={6} h={6} c={2} fill={C.bright} />
    </g>
  );
}

// Each orbit: its radius from the planet's centre, its period, its start.
const ORBITS = [
  { r: 1080, period: 26, delay: 0, s: 1 },
  { r: 1160, period: 34, delay: -14, s: 0.8 },
  { r: 1010, period: 22, delay: -9, s: 0.7 },
  { r: 1210, period: 40, delay: -30, s: 0.9 },
];

export function OrbitScene({ view }: { view?: string }) {
  return (
    <SceneSvg view={view} className="bs-orbit" label="Satellites crossing above an octagon planet while a ground dish keeps in touch with them">
      <defs>
        <linearGradient id="bs-orbit-space" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#040E1C" />
          <stop offset="1" stopColor="#0A2540" />
        </linearGradient>
        <clipPath id="bs-orbit-planet">
          <polygon points={pts(octagon(...PLANET, 1800))} />
        </clipPath>
      </defs>
      <Wide y={0} h={560} fill="url(#bs-orbit-space)" />
      {STARS.map((s, n) => (
        <Diamond key={n} className="bs-sky-twinkle" x={s.x} y={s.y} s={s.s} fill={C.ivory} style={{ '--n': n } as CSSProperties} />
      ))}
      {/* The moon, with its own octagon craters. */}
      <polygon points={pts(octagon(1060, 92, 74))} fill={C.ivory} />
      <polygon points={pts(octagon(1044, 80, 18))} fill="#E2DCCB" />
      <polygon points={pts(octagon(1076, 106, 12))} fill="#E2DCCB" />
      <g className="bs-orbit-comet">
        <Box x={0} y={0} w={110} h={3} c={[0, 1.5, 1.5, 0]} fill={C.mint} opacity={0.8} />
        <polygon points={pts(octagon(114, 1.5, 8))} fill={C.ivory} />
      </g>
      {/* Satellites ride arcs around the planet's centre, far below the frame. */}
      {ORBITS.map((o, n) => (
        <g key={n} className="bs-orbit-path" style={{ transformOrigin: `${PLANET[0]}px ${PLANET[1]}px`, '--period': `${o.period}s`, '--delay': `${o.delay}s` } as CSSProperties}>
          <g transform={`translate(${PLANET[0]} ${PLANET[1] - o.r})`}>
            <Satellite s={o.s} />
          </g>
        </g>
      ))}
      {/* The planet: an octagon so large its top side is the horizon. */}
      <polygon points={pts(octagon(PLANET[0], PLANET[1] - 6, 1830))} fill="none" stroke={C.mint} strokeWidth={6} opacity={0.25} />
      <polygon points={pts(octagon(...PLANET, 1800))} fill={C.deep} />
      <g clipPath="url(#bs-orbit-planet)">
        <g className="bs-orbit-land">
          {[0, 1].map((k) => (
            <g key={k} transform={`translate(${k * 1400} 0)`}>
              <polygon points="-100,350 120,350 170,380 90,420 -60,420" fill={C.teal} />
              <polygon points="300,360 520,360 560,390 400,430 300,410" fill={C.teal} />
              <polygon points="760,352 980,352 1040,400 880,440 820,410" fill={C.teal} />
              <polygon points="1120,358 1260,358 1300,390 1180,420" fill={C.teal} />
            </g>
          ))}
        </g>
      </g>
      {/* The ground station: a dish that sweeps and sends rings up. */}
      {[0, 1, 2].map((n) => (
        <polygon key={n} className="bs-orbit-ring" points={pts(octagon(600, 300, 60))} fill="none" stroke={C.mint} strokeWidth={2} style={{ transformOrigin: '600px 300px', '--n': n } as CSSProperties} />
      ))}
      <Box x={588} y={318} w={24} h={34} c={[0, 0, 0, 0]} fill={C.ivory} />
      <Box x={572} y={344} w={56} h={8} c={[4, 4, 0, 0]} fill={C.ivory} />
      <g className="bs-orbit-dish" style={{ transformOrigin: '600px 318px' }}>
        <polygon points="560,292 640,292 626,318 574,318" fill={C.ivory} />
        <Box x={598} y={272} w={4} h={22} fill={C.ivory} />
        <polygon points={pts(octagon(600, 270, 10))} fill={C.bright} />
      </g>
    </SceneSvg>
  );
}

export const ORBIT_COPY: TakeCopy = {
  key: 'AB',
  name: 'Orbit',
  headline: 'Everything in flight, one place that knows.',
  lede: 'Satellites cross over the horizon of an octagon planet, each on its own orbit, while one ground dish keeps in touch with all of them. Mission control knows where everything is and what it’s doing.',
  says: 'A control plane: many pieces of work in flight at once, one place that knows where each one is and what it costs.',
};

export default function Orbit() {
  return (
    <Board
      tone="night"
      copy={ORBIT_COPY}
      note={ROUND_FIVE_NOTE}
      hero={
        <div className="bs-frame bs-frame--night bs-frame--flush">
          <OrbitScene view="320 20 560 420" />
        </div>
      }
      mark={() => (
        <svg className="bs-svg bs-orbit" viewBox="0 0 480 360" role="img" aria-label="A satellite circling an octagon planet">
          <rect width={480} height={360} fill="#0A2540" />
          <polygon points={pts(octagon(240, 180, 150))} fill={C.deep} />
          <polygon points="180,140 250,140 270,170 220,200 180,180" fill={C.teal} />
          <polygon points={pts(octagon(240, 180, 250))} fill="none" stroke={C.mint} strokeWidth={2} strokeDasharray="8 8" opacity={0.6} />
          <g className="bs-orbit-spin" style={{ transformOrigin: '240px 180px' }}>
            <g transform="translate(240 55)">
              <Satellite s={1.1} />
            </g>
          </g>
        </svg>
      )}
      divider={
        <div className="bs-rule-orbit" aria-hidden="true">
          <svg viewBox="-50 -30 100 60">
            <Satellite s={0.7} />
          </svg>
        </div>
      }
    />
  );
}
