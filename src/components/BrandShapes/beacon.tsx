// The lighthouse kit for round seven (2026-10-06): a stepped stencil tower,
// its beam, a sailboat, a night sky and a sea, shared by the five
// lighthouse-and-octopus worlds so they read as one family.

import type { CSSProperties } from 'react';
import { Box, C, Diamond, Wide } from './draw';
import { noise, octagon, pts } from './symbols';

/** The tower's pieces, bottom to top, relative to its base centre. Builder uses them one by one. */
export const TOWER = [
  { id: 'base', x: -60, y: -40, w: 120, h: 40, fill: C.ivory },
  { id: 'band', x: -54, y: -80, w: 108, h: 38, fill: C.teal },
  { id: 'upper', x: -48, y: -120, w: 96, h: 38, fill: C.ivory },
  { id: 'gallery', x: -60, y: -134, w: 120, h: 12, fill: C.ivory, c: [0, 0, 5, 5] as [number, number, number, number] },
  { id: 'lantern', x: -22, y: -184, w: 44, h: 50, fill: C.mint },
  { id: 'roof', x: -28, y: -208, w: 56, h: 24, fill: C.ivory, c: [22, 22, 0, 0] as [number, number, number, number] },
];
export const LAMP_Y = -159;

/** A whole lighthouse with its base centre at (x, y), scaled by s. */
export function Tower({ x, y, s = 1, className }: { x: number; y: number; s?: number; className?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className={className}>
      {TOWER.map((p) => (
        <Box key={p.id} className={p.id === 'lantern' ? 'bs-lh-lamp' : undefined} x={p.x} y={p.y} w={p.w} h={p.h} c={p.c} fill={p.fill} />
      ))}
      <Box x={-10} y={-34} w={20} h={34} c={[10, 10, 0, 0]} fill={C.navy} />
      <Box x={-10} y={-184} w={4} h={50} fill="#061527" opacity={0.35} />
      <Box x={6} y={-184} w={4} h={50} fill="#061527" opacity={0.35} />
      <Box x={-3} y={-220} w={6} h={12} c={[3, 3, 0, 0]} fill={C.ivory} />
    </g>
  );
}

/** A sweeping beam from (x, y), reaching `len` to the right; it turns by flipping through edge-on. */
export function Beam({ x, y, len = 600, spread = 46, className = 'bs-lh-beam', style }: { x: number; y: number; len?: number; spread?: number; className?: string; style?: CSSProperties }) {
  return (
    <polygon
      className={className}
      points={`${x},${y - 6} ${x + len},${y - spread} ${x + len},${y + spread} ${x},${y + 6}`}
      fill="url(#bs-beacon-beam)"
      style={{ transformOrigin: `${x}px ${y}px`, ...style }}
    />
  );
}

/** Gradients every scene in the family uses. Render once inside the scene's svg. */
export function BeaconDefs() {
  return (
    <defs>
      <linearGradient id="bs-beacon-beam" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor={C.mint} stopOpacity="0.7" />
        <stop offset="1" stopColor={C.mint} stopOpacity="0" />
      </linearGradient>
      <linearGradient id="bs-beacon-sky" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#061527" />
        <stop offset="1" stopColor="#0E3354" />
      </linearGradient>
      <linearGradient id="bs-beacon-sea" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#0E4A5C" />
        <stop offset="1" stopColor="#061527" />
      </linearGradient>
    </defs>
  );
}

/** A small sailboat facing right, its keel at (0, 0). */
export function SailBoat({ tone = C.teal }: { tone?: string }) {
  return (
    <g className="bs-lh-bob">
      <polygon points="0,-34 0,-6 22,-6" fill={tone} />
      <Box x={-3} y={-36} w={3} h={32} fill={C.ivory} />
      <Box x={-18} y={-6} w={46} h={12} c={[0, 0, 8, 8]} fill={C.ivory} />
    </g>
  );
}

/** The night above `to`: gradient, stars, a moon. */
export function NightSky({ to, moon = [1060, 70], stars = 40, seed = 0 }: { to: number; moon?: [number, number] | null; stars?: number; seed?: number }) {
  return (
    <g>
      <Wide y={0} h={to} fill="url(#bs-beacon-sky)" />
      {Array.from({ length: stars }, (_, n) => (
        <Diamond
          key={n}
          className="bs-sky-twinkle"
          x={Math.abs(noise(n + seed)) * 1200}
          y={Math.abs(noise(n + seed + 40)) * (to - 50)}
          s={1.5 + Math.abs(noise(n + seed + 7)) * 2}
          fill={C.ivory}
          style={{ '--n': n } as CSSProperties}
        />
      ))}
      {moon && <polygon points={pts(octagon(moon[0], moon[1], 56))} fill={C.ivory} />}
    </g>
  );
}

/** The sea from `from` down: gradient, a bright surface line and two drifting swells. */
export function Sea({ from }: { from: number }) {
  return (
    <g>
      <Wide y={from} h={560 - from} fill="url(#bs-beacon-sea)" />
      <Wide y={from} h={4} fill={C.mint} className="bs-reef-surface" />
      {[0, 1].map((n) => (
        <g key={n} className="bs-lh-swell" style={{ '--n': n } as CSSProperties}>
          {Array.from({ length: 9 }, (_, k) => (
            <Box key={k} x={k * 160 - 80 + n * 60} y={from - 6 + n * 12} w={70} h={3} c={1.5} fill={n ? C.deep : C.teal} />
          ))}
        </g>
      ))}
    </g>
  );
}
