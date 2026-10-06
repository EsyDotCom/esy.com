'use client';

// AK · Sentinel — steady in any weather. A storm: rain, lightning, waves
// breaking on the rock. The lighthouse holds and its beam keeps turning; the
// octopus holds on at the foot of the tower, calm. A boat rides the swell
// toward the breakwater, where another already rests in still water.

import type { CSSProperties } from 'react';
import { Beam, BeaconDefs, LAMP_Y, SailBoat, Tower } from './beacon';
import { Board, type TakeCopy } from './Board';
import { Box, C, SceneSvg, Wide } from './draw';
import { KEPT, NeutralOcto, OctoV, ROUND_SEVEN_NOTE, VariantHero, type OctoVariant } from './octo3';
import { noise } from './symbols';

const WATER = 292;
const LIGHT: [number, number] = [470, 286];

export function SentinelScene({ view, variant = 'beacon' }: { view?: string; variant?: OctoVariant }) {
  return (
    <SceneSvg view={view} className="bs-storm" label="A lighthouse holding steady in a storm, an octopus holding on at its foot, a boat reaching calm water">
      <BeaconDefs />
      <defs>
        <linearGradient id="bs-storm-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#030A14" />
          <stop offset="1" stopColor="#12304A" />
        </linearGradient>
      </defs>
      <Wide y={0} h={WATER} fill="url(#bs-storm-sky)" />
      <Wide y={0} h={WATER} fill={C.ivory} className="bs-storm-flash" />
      {/* Heavy cloud, drifting. */}
      {[0, 1, 2, 3].map((n) => (
        <Box key={n} className="bs-storm-cloud" x={n * 340 - 120} y={20 + (n % 2) * 30} w={320} h={44} c={[22, 22, 22, 22]} fill="#0B2036" style={{ '--n': n } as CSSProperties} />
      ))}
      <polyline className="bs-storm-bolt" points="880,40 860,96 884,96 856,170" fill="none" stroke={C.ivory} strokeWidth={4} strokeLinejoin="round" />
      <Beam x={LIGHT[0]} y={LIGHT[1] + LAMP_Y} len={720} />
      {/* The sea: dark, with crests running at the rock. */}
      <Wide y={WATER} h={560 - WATER} fill="url(#bs-beacon-sea)" />
      {[0, 1, 2].map((n) => (
        <g key={n} className="bs-storm-waves" style={{ '--n': n } as CSSProperties}>
          {Array.from({ length: 10 }, (_, k) => (
            <polygon key={k} points={`${k * 150 - 100 + n * 50},${WATER + 10 + n * 22} ${k * 150 - 60 + n * 50},${WATER - 14 + n * 22} ${k * 150 - 30 + n * 50},${WATER - 14 + n * 22} ${k * 150 + 10 + n * 50},${WATER + 10 + n * 22}`} fill={n ? C.deep : C.teal} opacity={0.9 - n * 0.2} />
          ))}
        </g>
      ))}
      {/* Calm water behind the breakwater, and the boat already safe there. */}
      <Box x={900} y={WATER} w={300} h={100} fill="#0E4A5C" />
      <Box x={900} y={WATER} w={300} h={3} fill={C.mint} opacity={0.6} />
      <g transform={`translate(1040 ${WATER})`}>
        <SailBoat tone={C.mint} />
      </g>
      {[0, 1, 2, 3, 4].map((k) => (
        <Box key={k} x={866 + (k % 2) * 6} y={WATER - 40 + k * 26} w={40} h={24} c={[6, 6, 0, 0]} fill="#1E4A72" />
      ))}
      {/* A boat riding the swell toward the breakwater. */}
      <g className="bs-storm-boat">
        <g className="bs-storm-rock">
          <SailBoat />
        </g>
      </g>
      <Wide y={392} h={168} fill={C.navy} />
      {/* The rock, the tower, the octopus holding on at its foot. */}
      <polygon points="350,392 370,320 400,288 540,288 570,320 590,392" fill="#163A5F" />
      <Tower x={LIGHT[0]} y={LIGHT[1]} />
      <OctoV x={470} y={176} w={170} variant={variant} items={{ 0: KEPT.lantern }} />
      {/* Spray off the rock. */}
      {[0, 1, 2, 3, 4].map((n) => (
        <Box key={n} className="bs-storm-spray" x={360 + n * 10} y={300} w={6} h={6} c={2} fill={C.ivory} style={{ '--n': n, '--sx': `${(noise(n) * 50).toFixed(1)}px` } as CSSProperties} />
      ))}
      {/* Rain over everything. */}
      <g className="bs-storm-rain">
        {Array.from({ length: 90 }, (_, n) => (
          <Box key={n} x={+(Math.abs(noise(n + 3)) * 1400 - 100).toFixed(1)} y={+(Math.abs(noise(n + 60)) * 560 - 560).toFixed(1)} w={2} h={22} r={14} fill={C.mint} opacity={0.35} />
        ))}
        {Array.from({ length: 90 }, (_, n) => (
          <Box key={`b${n}`} x={+(Math.abs(noise(n + 3)) * 1400 - 100).toFixed(1)} y={+(Math.abs(noise(n + 60)) * 560).toFixed(1)} w={2} h={22} r={14} fill={C.mint} opacity={0.35} />
        ))}
      </g>
    </SceneSvg>
  );
}

export const SENTINEL_COPY: TakeCopy = {
  key: 'AK',
  name: 'Sentinel',
  headline: 'Steady in any weather.',
  lede: 'Rain, lightning, waves breaking on the rock. The lighthouse holds and the beam keeps turning; the octopus holds on at its foot, calm. A boat rides the swell toward the breakwater, where another already rests in still water.',
  says: 'Secure and reliable: when things get rough, the light stays on and what you’ve built stays put.',
};

export default function OctoSentinel() {
  return (
    <Board
      tone="night"
      copy={SENTINEL_COPY}
      note={ROUND_SEVEN_NOTE}
      hero={<VariantHero initial="beacon" scene={(v) => <SentinelScene view="240 10 640 460" variant={v} />} />}
      mark={() => <NeutralOcto variant="beacon" items={{ 0: KEPT.lantern }} />}
      divider={
        <div className="bs-rule-sea bs-rule-storm" aria-hidden="true">
          <span className="bs-rule-sea-beam" />
        </div>
      }
    />
  );
}
