'use client';

// AI · The Builder — built to last, piece by piece. The octopus, half out of
// the water beside its rock, lifts each course of the lighthouse into place:
// base, band, upper, gallery, lantern, roof. When the roof is on, the lamp
// lights, the beam starts to turn and boats come by. It builds once, when the
// scene comes into view, and then it stands.

import type { CSSProperties } from 'react';
import { Beam, BeaconDefs, NightSky, SailBoat, Sea, TOWER, LAMP_Y } from './beacon';
import { Board, type TakeCopy } from './Board';
import { Box, C, SceneSvg, Wide } from './draw';
import { KEPT, NeutralOcto, OctoV, ROUND_SEVEN_NOTE, VariantHero, type OctoVariant } from './octo3';

const BASE: [number, number] = [600, 266];
const S = 1.05;
const FROM: [number, number] = [830, 250]; // where the octopus hands each piece up from
const STEP = 1.1; // seconds between pieces
const LIT = TOWER.length * STEP + 0.6;

export function BuilderScene({ view, variant = 'keeper' }: { view?: string; variant?: OctoVariant }) {
  return (
    <SceneSvg view={view} className="bs-build" label="An octopus building a lighthouse course by course until the light comes on">
      <BeaconDefs />
      <NightSky to={300} seed={5} />
      {/* The light, once the roof is on. */}
      <g className="bs-build-after" style={{ '--d': `${LIT}s` } as CSSProperties}>
        <Beam x={BASE[0]} y={BASE[1] + LAMP_Y * S} len={640} />
      </g>
      <Sea from={300} />
      {/* Boats come by once it's lit. */}
      <g className="bs-build-after" style={{ '--d': `${LIT + 1}s` } as CSSProperties}>
        {[0, 1].map((n) => (
          <g key={n} className={`bs-keep-boat bs-keep-boat--${n} bs-build-boat`}>
            <SailBoat tone={n ? C.mint : C.teal} />
          </g>
        ))}
      </g>
      <Wide y={392} h={168} fill={C.navy} />
      <polygon points="470,392 490,300 520,266 680,266 710,300 730,392" fill="#163A5F" />
      {[0, 1, 2].map((k) => (
        <Box key={k} x={500 + k * 66} y={318 + (k % 2) * 30} w={58} h={22} c={[6, 0, 6, 0]} fill="#1E4A72" />
      ))}
      {/* The lighthouse, one course at a time. */}
      {TOWER.map((p, n) => {
        const cx = BASE[0] + (p.x + p.w / 2) * S;
        const cy = BASE[1] + (p.y + p.h / 2) * S;
        return (
          <g
            key={p.id}
            className="bs-build-piece"
            style={{ '--sx': `${(FROM[0] - cx).toFixed(1)}px`, '--sy': `${(FROM[1] - cy).toFixed(1)}px`, '--d': `${0.6 + n * STEP}s`, transformOrigin: `${cx}px ${cy}px` } as CSSProperties}
          >
            <Box
              className={p.id === 'lantern' ? 'bs-build-lamp' : undefined}
              x={BASE[0] + p.x * S}
              y={BASE[1] + p.y * S}
              w={p.w * S}
              h={p.h * S}
              c={p.c?.map((v) => v * S) as typeof p.c}
              fill={p.fill}
              style={p.id === 'lantern' ? ({ '--d': `${LIT}s` } as CSSProperties) : undefined}
            />
            {p.id === 'base' && <Box x={BASE[0] - 10 * S} y={BASE[1] - 34 * S} w={20 * S} h={34 * S} c={[10, 10, 0, 0]} fill={C.navy} />}
          </g>
        );
      })}
      {/* The builder, half out of the water, the next stone in hand. */}
      <OctoV x={700} y={136} w={250} variant={variant} items={{ 7: KEPT.stone, 0: KEPT.lantern }} />
    </SceneSvg>
  );
}

export const BUILDER_COPY: TakeCopy = {
  key: 'AI',
  name: 'The Builder',
  headline: 'Built to last, piece by piece.',
  lede: 'Half out of the water beside its rock, the octopus lifts each course of the lighthouse into place: base, band, gallery, lantern, roof. When the roof is on, the light comes on and the boats come by.',
  says: 'One mind, many hands, building something people can steer by. Reliability is how it was built, one checked piece at a time.',
};

export default function OctoBuilder() {
  return (
    <Board
      tone="night"
      copy={BUILDER_COPY}
      note={ROUND_SEVEN_NOTE}
      hero={<VariantHero initial="keeper" scene={(v) => <BuilderScene view="350 0 600 440" variant={v} />} />}
      mark={() => <NeutralOcto variant="keeper" items={{ 7: KEPT.stone, 0: KEPT.lantern }} />}
      divider={
        <div className="bs-rule-course bs-rule-build" aria-hidden="true">
          {Array.from({ length: 11 }, (_, i) => (
            <span key={i} className={i === 5 ? 'bs-course-key' : ''} />
          ))}
        </div>
      }
    />
  );
}
