// Y · North Star — a fixed goal, and the dots joined up. An eight-point star
// (two squares, one turned 45°: our cut) holds still and pulses while
// constellations draw themselves around it, a shooting star crosses, and a
// sailboat on the sea below steers by its reflection.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { Box, C, Diamond, ROUND_FIVE_NOTE, SceneSvg, Wide } from './draw';
import { noise, octagon, pts } from './symbols';

/** The eight-point star: two squares, one turned 45°, with an octagon heart. */
export function Octagram({ x, y, s, rays = true }: { x: number; y: number; s: number; rays?: boolean }) {
  const sq = (deg: number) => <rect x={x - s / 2} y={y - s / 2} width={s} height={s} fill={C.ivory} transform={`rotate(${deg} ${x} ${y})`} />;
  return (
    <g>
      {rays && (
        <g className="bs-star-rays" style={{ transformOrigin: `${x}px ${y}px` }}>
          {Array.from({ length: 8 }, (_, k) => (
            <Box key={k} x={x - 1.5} y={y - s * 2.2} w={3} h={s * 1.3} fill={C.mint} opacity={0.5} transform={`rotate(${k * 45 + 22.5} ${x} ${y})`} />
          ))}
        </g>
      )}
      {[0, 1].map((n) => (
        <polygon key={n} className="bs-star-ring" points={pts(octagon(x, y, s * 1.3))} fill="none" stroke={C.mint} strokeWidth={2} style={{ transformOrigin: `${x}px ${y}px`, '--n': n } as CSSProperties} />
      ))}
      <g className="bs-star-core" style={{ transformOrigin: `${x}px ${y}px` }}>
        {sq(0)}
        {sq(45)}
        <polygon points={pts(octagon(x, y, s * 0.5))} fill={C.mint} />
      </g>
    </g>
  );
}

// Constellations: a few stars each, joined in order.
const CONSTELLATIONS: [number, number][][] = [
  [[140, 120], [200, 90], [260, 120], [240, 180], [170, 190]],
  [[320, 230], [370, 200], [420, 240], [470, 220]],
  [[850, 90], [910, 130], [970, 100], [1010, 150], [960, 190]],
  [[1040, 250], [1090, 220], [1130, 260]],
];

const STARS = Array.from({ length: 64 }, (_, n) => ({ x: Math.abs(noise(n)) * 1200, y: Math.abs(noise(n + 50)) * 300, s: 1.5 + Math.abs(noise(n + 9)) * 2.5 }));

export function StarScene({ view }: { view?: string }) {
  return (
    <SceneSvg view={view} className="bs-sky" label="A night sea under an eight-point star, constellations drawing themselves and a sailboat steering by the star">
      <defs>
        <linearGradient id="bs-sky-night" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#061527" />
          <stop offset="0.7" stopColor="#0A2540" />
          <stop offset="1" stopColor="#0E3354" />
        </linearGradient>
      </defs>
      <Wide y={0} h={560} fill="url(#bs-sky-night)" />
      <polygon points="-200,300 300,-40 420,-40 -80,300" fill={C.mint} opacity={0.04} />
      {STARS.map((s, n) => (
        <Diamond key={n} className="bs-sky-twinkle" x={s.x} y={s.y} s={s.s} fill={C.ivory} style={{ '--n': n } as CSSProperties} />
      ))}
      {CONSTELLATIONS.map((c, n) => (
        <g key={n} className="bs-sky-const" style={{ '--n': n } as CSSProperties}>
          <polyline points={pts(c)} pathLength={1} fill="none" stroke={C.mint} strokeWidth={1.5} />
          {c.map(([x, y], k) => (
            <Diamond key={k} x={x} y={y} s={4} fill={C.ivory} />
          ))}
        </g>
      ))}
      <g className="bs-sky-shoot">
        <Box x={0} y={0} w={90} h={3} c={[0, 1.5, 1.5, 0]} fill={C.ivory} opacity={0.9} />
      </g>
      <Octagram x={600} y={140} s={56} />
      {/* The sea and the hills at either side. */}
      <Wide y={340} h={220} fill="#0A2540" />
      <polygon points="-2400,340 120,340 200,270 300,270 380,340" fill="#0E3354" />
      <polygon points="860,340 940,280 1060,280 1120,340 3600,340" fill="#0E3354" />
      {/* The star's reflection, broken by the swell. */}
      {[0, 1, 2, 3, 4].map((n) => (
        <Box key={n} className="bs-sky-glint" x={600 - 30 + (n % 2) * 14} y={352 + n * 10} w={60 - n * 8} h={3} c={1.5} fill={C.mint} style={{ '--n': n } as CSSProperties} />
      ))}
      {[0, 1, 2].map((n) => (
        <g key={n} className="bs-lh-swell" style={{ '--n': n } as CSSProperties}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => (
            <Box key={k} x={k * 160 - 80 + n * 60} y={350 + n * 14} w={70 - n * 10} h={3} c={1.5} fill={C.deep} />
          ))}
        </g>
      ))}
      {/* A sailboat steering for the reflection. */}
      <g className="bs-sky-boat">
        <g className="bs-lh-bob">
          <polygon points="0,-44 0,-8 28,-8" fill={C.teal} />
          <polygon points="-3,-38 -3,-8 -20,-8" fill={C.mint} />
          <Box x={-3} y={-46} w={3} h={40} fill={C.ivory} />
          <Box x={-26} y={-8} w={60} h={13} c={[0, 0, 9, 9]} fill={C.ivory} />
        </g>
      </g>
    </SceneSvg>
  );
}

export const STAR_COPY: TakeCopy = {
  key: 'Y',
  name: 'North Star',
  headline: 'A fixed goal, and the dots joined up.',
  lede: 'Our star is two squares, one turned 45°, the cut in our e. It holds still while constellations draw themselves around it, turning scattered points into shapes you can steer by.',
  says: 'Esy keeps the goal fixed and joins scattered work into something you can read and navigate.',
};

export default function NorthStar() {
  return (
    <Board
      tone="night"
      copy={STAR_COPY}
      note={ROUND_FIVE_NOTE}
      hero={
        <div className="bs-frame bs-frame--night bs-frame--flush">
          <StarScene view="320 40 560 420" />
        </div>
      }
      mark={() => (
        <svg className="bs-svg" viewBox="0 0 480 360" role="img" aria-label="An eight-point star">
          <rect width={480} height={360} fill="#0A2540" />
          <Octagram x={240} y={180} s={100} />
        </svg>
      )}
      divider={
        <div className="bs-rule-stars" aria-hidden="true">
          {Array.from({ length: 28 }, (_, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
