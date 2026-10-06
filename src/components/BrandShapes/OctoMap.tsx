'use client';

// AF · Cartographer — knows the whole map. The octopus peeks out of a little
// submarine's porthole while sonar sweeps the seabed below; the ground it
// finds is traced in mint, pins drop on the places that matter, and the chart
// on the right draws itself to match.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { Box, C, SceneSvg, Wide } from './draw';
import { FriendlyOcto, HELD, LookHero, OctoAt, ROUND_SIX_NOTE, type OctoLook } from './octo';
import { Octagram } from './NorthStar';
import { octagon, pts } from './symbols';

// The seabed, in 45° steps.
const TERRAIN: [number, number][] = [[-40, 372], [60, 372], [100, 332], [170, 332], [210, 372], [300, 372], [340, 340], [410, 340], [450, 300], [500, 300], [540, 340], [620, 340], [660, 372], [780, 372]];
const PINS = [3, 7, 9];

// The chart, seen from above: contour rings around two rises, cut at 45°.
const CONTOURS = [
  { x: 930, y: 170, sizes: [150, 104, 58] },
  { x: 1064, y: 262, sizes: [96, 62, 28] },
];
const CHART_PINS: [number, number][] = [[930, 170], [1064, 262], [880, 280]];

export function MapScene({ view, look = 'friendly' }: { view?: string; look?: OctoLook }) {
  return (
    <SceneSvg view={view} className="bs-map" label="An octopus in a small submarine charting the seabed with sonar while a map draws itself">
      <defs>
        <linearGradient id="bs-map-water" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0E4A5C" />
          <stop offset="1" stopColor="#061527" />
        </linearGradient>
        <clipPath id="bs-map-port">
          <polygon points={pts(octagon(382, 206, 52))} />
        </clipPath>
        <pattern id="bs-map-grid" width={20} height={20} patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgba(43,216,187,0.14)" strokeWidth={1} />
        </pattern>
      </defs>
      <Wide y={0} h={560} fill="url(#bs-map-water)" />
      {/* The seabed: dark until the sonar finds it, then traced and pinned. */}
      <polygon points={`${pts(TERRAIN)} 780,560 -2400,560 -2400,372`} fill={C.navy} />
      <Wide y={372} h={188} fill={C.navy} />
      <polyline className="bs-map-trace" pathLength={1} points={pts(TERRAIN)} fill="none" stroke={C.mint} strokeWidth={3} />
      {PINS.map((i, n) => (
        <g key={n} className="bs-map-pin" style={{ '--n': n } as CSSProperties}>
          <Box x={TERRAIN[i][0] - 1.5} y={TERRAIN[i][1] - 26} w={3} h={26} fill={C.ivory} />
          <polygon points={pts(octagon(TERRAIN[i][0], TERRAIN[i][1] - 30, 14))} fill={C.teal} />
        </g>
      ))}
      {/* The submarine, drifting along its survey line. */}
      <g className="bs-map-sub">
        <polygon className="bs-map-sweep" points="330,250 250,372 410,372" fill={C.mint} style={{ transformOrigin: '330px 250px' }} />
        {[0, 1, 2].map((n) => (
          <polygon key={n} className="bs-map-ping" points={pts(octagon(330, 260, 40))} fill="none" stroke={C.mint} strokeWidth={2} style={{ transformOrigin: '330px 260px', '--n': n } as CSSProperties} />
        ))}
        <Box className="bs-map-prop" x={192} y={186} w={14} h={36} c={4} fill={C.teal} style={{ transformOrigin: '199px 204px' }} />
        <Box x={206} y={198} w={10} h={12} fill={C.navy} />
        <Box x={214} y={160} w={240} h={92} c={[46, 46, 46, 46]} fill={C.ivory} />
        <Box x={214} y={226} w={240} h={10} fill={C.teal} />
        <Box x={296} y={128} w={64} h={36} c={[14, 14, 0, 0]} fill={C.ivory} />
        <Box x={322} y={104} w={6} h={26} fill={C.navy} />
        <Box x={322} y={104} w={20} h={6} fill={C.navy} />
        <polygon points={pts(octagon(282, 200, 26))} fill={C.navy} />
        <polygon points={pts(octagon(282, 200, 18))} fill={C.mint} opacity={0.6} />
        <polygon points={pts(octagon(382, 206, 64))} fill={C.navy} />
        <polygon points={pts(octagon(382, 206, 52))} fill="#0E4A5C" />
        <g clipPath="url(#bs-map-port)">
          <OctoAt x={297} y={164} w={170} look={look} />
        </g>
      </g>
      {/* The chart, drawing itself to match. */}
      <Box x={800} y={40} w={340} h={300} c={[0, 24, 0, 24]} fill="#0A2540" stroke="rgba(43,216,187,0.35)" strokeWidth={2} />
      <Box x={800} y={40} w={340} h={300} c={[0, 24, 0, 24]} fill="url(#bs-map-grid)" />
      {CONTOURS.flatMap((hill, h) =>
        hill.sizes.map((size, k) => (
          <Box
            key={`${h}-${k}`}
            className="bs-map-contour"
            pathLength={1}
            x={hill.x - size / 2 - k * 6}
            y={hill.y - size * 0.36}
            w={size + k * 4}
            h={size * 0.72}
            c={[size * 0.3, size * 0.18, size * 0.3, size * 0.18]}
            fill="none"
            stroke={k === 2 ? C.mint : C.teal}
            strokeWidth={k === 2 ? 3 : 2}
            style={{ '--n': h * 3 + k } as CSSProperties}
          />
        )),
      )}
      {CHART_PINS.map(([x, y], n) => (
        <polygon key={n} className="bs-map-pin" points={pts(octagon(x, y, 12))} fill={C.ivory} style={{ '--n': n } as CSSProperties} />
      ))}
      <g transform="translate(1090 82) scale(0.4) translate(-600 -140)">
        <Octagram x={600} y={140} s={56} rays={false} />
      </g>
    </SceneSvg>
  );
}

export const MAP_COPY: TakeCopy = {
  key: 'AF',
  name: 'Cartographer',
  headline: 'Knows the whole map.',
  lede: 'The octopus peeks out of a little submarine while sonar sweeps the seabed. The ground it finds is traced in mint, pins drop on the places that matter, and the chart beside it draws itself to match.',
  says: 'Shared context: everything you know, charted in one place, so any agent can find its way without guessing.',
};

export default function OctoMap() {
  return (
    <Board
      tone="night"
      copy={MAP_COPY}
      note={ROUND_SIX_NOTE}
      hero={<LookHero night scene={(look) => <MapScene view="150 40 620 460" look={look} />} />}
      mark={() => <FriendlyOcto items={{ 0: HELD.map, 7: HELD.magnifier }} />}
      divider={
        <div className="bs-rule-sonar" aria-hidden="true">
          <i />
          {[0, 1, 2].map((n) => (
            <span key={n} style={{ '--n': n } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
