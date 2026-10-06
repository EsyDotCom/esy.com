'use client';

// AJ · Harbor Master — one keeper, every channel. The octopus sits on the
// lighthouse gallery; under the water its arms run out to four buoys, one per
// berth. Boats come in one after another, each buoy lights as its boat is
// guided home, and the beam keeps turning over all of it.

import type { CSSProperties } from 'react';
import { Beam, BeaconDefs, LAMP_Y, NightSky, SailBoat, Sea, Tower } from './beacon';
import { Board, type TakeCopy } from './Board';
import { Box, C, SceneSvg, VERTICALS, Wide } from './draw';
import { KEPT, NeutralOcto, OctoV, ROUND_SEVEN_NOTE, VariantHero, type OctoVariant } from './octo3';
import { octagon, pts } from './symbols';

const WATER = 262;
const LIGHT: [number, number] = [260, 266];
const BERTHS = [700, 820, 940, 1060];

/** An arm under the water from the rock to berth k: across at its own depth, a 45° rise, up to the buoy. */
function channel(k: number): [number, number][] {
  const depth = 300 + 20 * (k + 1);
  const x = BERTHS[k];
  return [[330, depth], [x - (depth - 276), depth], [x, 276]];
}

export function HarborScene({ view, variant = 'cap' }: { view?: string; variant?: OctoVariant }) {
  return (
    <SceneSvg view={view} className="bs-harbor" label="An octopus on a lighthouse guiding boats into four berths with its arms as channel markers">
      <BeaconDefs />
      <NightSky to={WATER} seed={12} />
      <Beam x={LIGHT[0]} y={LIGHT[1] + LAMP_Y * 0.95} len={700} />
      <Sea from={WATER} />
      <Wide y={392} h={168} fill={C.navy} />
      {/* The arms, under the water, out to the buoys. */}
      {BERTHS.map((_, k) => (
        <polyline key={k} className="bs-harbor-arm" points={pts(channel(k))} fill="none" stroke={k % 2 ? C.deep : '#1E4A72'} strokeWidth={10 - k} strokeDasharray="18 4" strokeLinejoin="round" style={{ '--k': k } as CSSProperties} />
      ))}
      {/* The jetty, the lighthouse, the keeper on its gallery. */}
      <polygon points="150,392 170,300 200,268 330,268 350,300 370,392" fill="#163A5F" />
      <Tower x={LIGHT[0]} y={LIGHT[1]} s={0.95} />
      <OctoV x={262} y={72} w={150} variant={variant} items={{ 7: KEPT.logbook }} />
      {/* The pier and its berths, a sign over each. */}
      <Box x={620} y={WATER - 10} w={600} h={12} fill="#1E4A72" />
      {[640, 760, 880, 1000, 1120].map((x) => (
        <Box key={x} x={x - 4} y={WATER} w={8} h={70} fill="#1E4A72" />
      ))}
      {BERTHS.map((x, k) => (
        <g key={k}>
          <Box x={x - 34} y={WATER - 46} w={68} h={22} c={[0, 6, 0, 6]} fill={C.ivory} />
          <text className="bs-harbor-sign" x={x} y={WATER - 31} textAnchor="middle">
            {VERTICALS[k]}
          </text>
          <polygon className="bs-harbor-buoy" points={pts(octagon(x, 270, 16))} fill={C.bright} style={{ transformOrigin: `${x}px 270px`, '--k': k } as CSSProperties} />
        </g>
      ))}
      {/* Boats, one per berth, guided in turn. */}
      {BERTHS.map((x, k) => (
        <g key={k} className="bs-harbor-boat" style={{ '--bx': `${x - 2}px`, '--k': k } as CSSProperties}>
          <SailBoat tone={k % 2 ? C.mint : C.teal} />
        </g>
      ))}
    </SceneSvg>
  );
}

export const HARBOR_COPY: TakeCopy = {
  key: 'AJ',
  name: 'Harbor Master',
  headline: 'One keeper, every channel.',
  lede: 'The octopus sits on the lighthouse gallery. Under the water its arms run out to four buoys, one for each berth, and every boat is guided to its own while the beam keeps turning over all of them.',
  says: 'One mind managing many ends: each line of work gets its own channel, and the same keeper guides them all home.',
};

export default function OctoHarbor() {
  return (
    <Board
      tone="night"
      copy={HARBOR_COPY}
      note={ROUND_SEVEN_NOTE}
      hero={<VariantHero initial="cap" scene={(v) => <HarborScene view="130 20 620 460" variant={v} />} />}
      mark={() => <NeutralOcto variant="cap" items={{ 7: KEPT.logbook }} />}
      divider={
        <div className="bs-rule-buoys" aria-hidden="true">
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i} style={{ '--k': i } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
