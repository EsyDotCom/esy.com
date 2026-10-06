'use client';

// AO · Inspect — nothing passes unchecked. Shapes drift in on a current and
// stop in a gauge beside the octopus. A scan passes over each; one that comes
// in crooked is turned square; each gets its mark and settles into an
// ordered row. Nothing is thrown away, and nothing passes unmarked.

import type { CSSProperties, ReactNode } from 'react';
import { BeaconDefs } from './beacon';
import { Board, type TakeCopy } from './Board';
import { Box, C, SceneSvg, Wide } from './draw';
import { KEPT, MARK_OR_KEEPER, NeutralOcto, OctoV, ROUND_EIGHT_NOTE, VariantHero, type OctoVariant } from './octo3';
import { octagon, pts } from './symbols';

const GAUGE: [number, number] = [640, 222];

// The pieces: abstract shapes, some arriving crooked.
const PIECES: { shape: ReactNode; rot: number }[] = [
  { shape: <polygon points={pts(octagon(0, 0, 44))} fill={C.mint} />, rot: 0 },
  { shape: <Box x={-20} y={-20} w={40} h={40} c={[10, 0, 10, 0]} fill={C.ivory} />, rot: 30 },
  { shape: <polygon points="0,-24 24,0 0,24 -24,0" fill={C.teal} />, rot: 0 },
  { shape: <Box x={-22} y={-16} w={44} h={32} c={[0, 12, 0, 12]} fill={C.bright} />, rot: -40 },
  { shape: <polygon points={pts(octagon(0, 0, 40))} fill={C.ivory} />, rot: 22 },
];

export function InspectScene({ view, variant = 'mark' }: { view?: string; variant?: OctoVariant }) {
  return (
    <SceneSvg view={view} className="bs-insp" label="An octopus inspecting shapes as they pass through a gauge, straightening and marking each">
      <BeaconDefs />
      <Wide y={0} h={560} fill="url(#bs-beacon-sea)" />
      {[120, 420, 720, 1000].map((x, n) => (
        <polygon key={n} className="bs-reef-ray" points={`${x},0 ${x + 90},0 ${x + 70},380 ${x + 30},380`} fill={C.mint} style={{ '--n': n } as CSSProperties} />
      ))}
      {/* The current the pieces ride in on. */}
      {[0, 1, 2].map((n) => (
        <g key={n} className="bs-insp-flow" style={{ '--n': n } as CSSProperties}>
          {Array.from({ length: 8 }, (_, k) => (
            <Box key={k} x={k * 170 - 160 + n * 50} y={196 + n * 26} w={60} h={2} fill={C.mint} opacity={0.25} />
          ))}
        </g>
      ))}
      <Wide y={392} h={168} fill={C.navy} />
      {/* The ledge where checked pieces settle, in order. */}
      <Box x={850} y={352} w={330} h={10} c={[0, 0, 5, 5]} fill="#1E4A72" />
      {/* The gauge: an octagon frame on a stand, a scan running through it. */}
      <Box x={GAUGE[0] - 3} y={GAUGE[1] + 60} w={6} h={110} fill="#1E4A72" />
      <polygon points={pts(octagon(...GAUGE, 118))} fill="none" stroke={C.ivory} strokeWidth={4} />
      <polygon points={pts(octagon(...GAUGE, 96))} fill="none" stroke={C.mint} strokeWidth={1.5} strokeDasharray="6 5" />
      <Box className="bs-insp-scan" x={GAUGE[0] - 44} y={GAUGE[1] - 40} w={88} h={3} fill={C.mint} />
      {/* The pieces, one every three seconds. */}
      {PIECES.map((p, i) => (
        <g key={i} className="bs-insp-piece" style={{ '--i': i, '--rot': `${p.rot}deg`, '--tx': `${880 + i * 62}px`, '--gx': `${GAUGE[0]}px`, '--gy': `${GAUGE[1]}px` } as CSSProperties}>
          {p.shape}
          <polygon className="bs-insp-mark" points={pts(octagon(16, -16, 14))} fill={C.teal} stroke={C.ivory} strokeWidth={2} />
        </g>
      ))}
      <OctoV x={300} y={170} w={300} variant={variant} items={{ 7: KEPT.gem }} />
    </SceneSvg>
  );
}

export const INSPECT_COPY: TakeCopy = {
  key: 'AO',
  name: 'Inspect',
  headline: 'Nothing passes unchecked.',
  lede: 'Shapes drift in on a current and stop in the gauge beside the octopus. A scan passes over each; one that arrives crooked is turned square; each gets its mark and settles into an ordered row.',
  says: 'Quality without drama: everything goes through the same check, what’s off is set right rather than thrown out, and the mark stays with it.',
};

export default function OctoInspect() {
  return (
    <Board
      tone="night"
      copy={INSPECT_COPY}
      note={ROUND_EIGHT_NOTE}
      hero={<VariantHero initial="mark" options={MARK_OR_KEEPER} scene={(v) => <InspectScene view="280 60 700 420" variant={v} />} />}
      mark={() => <NeutralOcto variant="mark" items={{ 7: KEPT.gem }} />}
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
