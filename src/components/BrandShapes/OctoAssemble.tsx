'use client';

// AN · Assemble — one whole from many parts. The octopus hands up eight
// pieces, one after another, and each fits into a side of a large octagon.
// When the last side locks the octagon fills with light, and far off on the
// horizon a small light answers. Then it starts again.

import type { CSSProperties } from 'react';
import { BeaconDefs, LAMP_Y, Tower } from './beacon';
import { Board, type TakeCopy } from './Board';
import { C, Diamond, SceneSvg, Wide } from './draw';
import { KEPT, MARK_OR_KEEPER, NeutralOcto, OctoV, ROUND_EIGHT_NOTE, VariantHero, type OctoVariant } from './octo3';
import { noise, octagon, pts } from './symbols';

const HORIZON = 150;
const RING: [number, number] = [770, 262];
const OUTER = octagon(...RING, 270);
const INNER = octagon(...RING, 214);
const FROM: [number, number] = [452, 300]; // where the pieces leave the octopus's arms
const FAR: [number, number] = [1090, HORIZON];

/** Side k of the octagon as a trapezoid, pulled back at both ends for a stencil gap. */
function side(k: number): [number, number][] {
  const pull = (a: [number, number], b: [number, number], t: number): [number, number] => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const j = (k + 1) % 8;
  return [pull(OUTER[k], OUTER[j], 0.06), pull(OUTER[j], OUTER[k], 0.06), pull(INNER[j], INNER[k], 0.06), pull(INNER[k], INNER[j], 0.06)];
}
const centre = (p: [number, number][]) => [p.reduce((s, q) => s + q[0], 0) / p.length, p.reduce((s, q) => s + q[1], 0) / p.length];

export function AssembleScene({ view, variant = 'mark' }: { view?: string; variant?: OctoVariant }) {
  return (
    <SceneSvg view={view} className="bs-asm" label="An octopus fitting eight pieces into an octagon that lights when it is whole">
      <BeaconDefs />
      <defs>
        <linearGradient id="bs-asm-dusk" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#061527" />
          <stop offset="1" stopColor="#1E4A72" />
        </linearGradient>
      </defs>
      {/* Far away: the dusk, the horizon, and a small light that answers when the work is done. */}
      <Wide y={0} h={HORIZON} fill="url(#bs-asm-dusk)" />
      {Array.from({ length: 18 }, (_, n) => (
        <Diamond key={n} className="bs-sky-twinkle" x={Math.abs(noise(n + 2)) * 1200} y={Math.abs(noise(n + 30)) * 110} s={1.5} fill={C.ivory} style={{ '--n': n } as CSSProperties} />
      ))}
      <polygon points={`${FAR[0] - 22},${HORIZON} ${FAR[0] - 12},${HORIZON - 6} ${FAR[0] + 12},${HORIZON - 6} ${FAR[0] + 22},${HORIZON}`} fill="#0A2540" />
      <Tower x={FAR[0]} y={HORIZON - 6} s={0.16} />
      <g className="bs-asm-far">
        <polygon points={`${FAR[0]},${HORIZON - 6 + LAMP_Y * 0.16 - 1} ${FAR[0] - 110},${HORIZON - 40} ${FAR[0] - 110},${HORIZON - 10} ${FAR[0]},${HORIZON - 6 + LAMP_Y * 0.16 + 1}`} fill="url(#bs-beacon-beam)" />
        <polygon points={pts(octagon(FAR[0], HORIZON - 6 + LAMP_Y * 0.16, 10))} fill={C.mint} />
      </g>
      {/* Near: the water and the work. */}
      <Wide y={HORIZON} h={560 - HORIZON} fill="url(#bs-beacon-sea)" />
      <Wide y={HORIZON} h={3} fill={C.mint} className="bs-reef-surface" />
      <Wide y={392} h={168} fill={C.navy} />
      {/* The octagon's outline, waiting for its pieces. */}
      <polygon points={pts(OUTER)} fill="none" stroke={C.mint} strokeWidth={1.5} strokeDasharray="6 8" opacity={0.35} />
      <polygon className="bs-asm-fill" points={pts(INNER)} fill={C.mint} />
      <polygon className="bs-asm-ripple" points={pts(OUTER)} fill="none" stroke={C.mint} strokeWidth={3} style={{ transformOrigin: `${RING[0]}px ${RING[1]}px` }} />
      {Array.from({ length: 8 }, (_, k) => {
        const p = side(k);
        const [cx, cy] = centre(p);
        return (
          <polygon
            key={k}
            className="bs-asm-side"
            points={pts(p)}
            fill={k % 2 ? C.teal : C.ivory}
            style={{ '--k': k, '--sx': `${(FROM[0] - cx).toFixed(1)}px`, '--sy': `${(FROM[1] - cy).toFixed(1)}px`, transformOrigin: `${cx.toFixed(1)}px ${cy.toFixed(1)}px` } as CSSProperties}
          />
        );
      })}
      <OctoV x={140} y={136} w={330} variant={variant} items={{ 7: KEPT.stone }} />
      {[0, 1, 2, 3].map((n) => (
        <polygon key={n} className="bs-reef-bubble" points={pts(octagon(320 + n * 18, 260, 8 + (n % 2) * 4))} fill="none" stroke={C.mint} strokeWidth={1.5} style={{ '--n': n } as CSSProperties} />
      ))}
    </SceneSvg>
  );
}

export const ASSEMBLE_COPY: TakeCopy = {
  key: 'AN',
  name: 'Assemble',
  headline: 'One whole from many parts.',
  lede: 'The octopus hands up eight pieces, one per arm, and each fits a side of a large octagon. When the last side locks, the octagon fills with light, and far off on the horizon a small light answers.',
  says: 'One mind, many hands, one finished thing. And the work matters beyond the room it was made in.',
};

export default function OctoAssemble() {
  return (
    <Board
      tone="night"
      copy={ASSEMBLE_COPY}
      note={ROUND_EIGHT_NOTE}
      hero={<VariantHero initial="mark" options={MARK_OR_KEEPER} scene={(v) => <AssembleScene view="120 60 820 420" variant={v} />} />}
      mark={() => <NeutralOcto variant="mark" items={{ 7: KEPT.stone }} />}
      divider={
        <div className="bs-rule-bolts" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className="bs-octagon" style={{ '--n': i } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
