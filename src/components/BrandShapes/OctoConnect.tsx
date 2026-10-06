'use client';

// AR · Connect — one mind, many ends. From the octopus, signals run out to an
// inner arc of eight nodes, then to an outer arc of twelve, then across the
// arcs, until one mind has become a connected whole. Pulses keep moving
// through it, then it rests and begins again.

import type { CSSProperties } from 'react';
import { BeaconDefs } from './beacon';
import { Board, type TakeCopy } from './Board';
import { C, SceneSvg, Wide } from './draw';
import { KEPT, MARK_OR_KEEPER, NeutralOcto, OctoV, ROUND_EIGHT_NOTE, VariantHero, type OctoVariant } from './octo3';
import { octagon, pts } from './symbols';

const HUB: [number, number] = [600, 262];
const r2 = (n: number) => +n.toFixed(1);
/** Points on an upper arc around the hub. */
const arc = (n: number, rx: number, ry: number, from = -168, to = -12) =>
  Array.from({ length: n }, (_, k) => {
    const a = ((from + ((to - from) * k) / (n - 1)) * Math.PI) / 180;
    return [r2(HUB[0] + Math.cos(a) * rx), r2(HUB[1] + Math.sin(a) * ry)] as [number, number];
  });
const INNER = arc(8, 230, 140);
const OUTER = arc(12, 420, 230, -174, -6);
// Each outer node links to its nearest inner node.
const SPOKES = OUTER.map((o) => INNER.reduce((best, p) => (Math.hypot(p[0] - o[0], p[1] - o[1]) < Math.hypot(best[0] - o[0], best[1] - o[1]) ? p : best)));

export function ConnectScene({ view, variant = 'mark' }: { view?: string; variant?: OctoVariant }) {
  return (
    <SceneSvg view={view} className="bs-cn" label="Signals running from an octopus out to arcs of nodes until they form a connected whole">
      <BeaconDefs />
      <Wide y={0} h={560} fill="url(#bs-beacon-sea)" />
      {/* Hub to the inner arc. */}
      {INNER.map((p, k) => (
        <g key={`a${k}`} style={{ '--k': k } as CSSProperties}>
          <polyline className="bs-cn-e1" pathLength={1} points={pts([HUB, p])} fill="none" stroke={C.mint} strokeWidth={2.5} />
          <polyline className="bs-cn-pulse" pathLength={1} points={pts([HUB, p])} fill="none" stroke={C.ivory} strokeWidth={3} strokeLinecap="round" />
        </g>
      ))}
      {/* Inner arc to the outer arc. */}
      {OUTER.map((o, k) => (
        <g key={`b${k}`} style={{ '--k': k } as CSSProperties}>
          <polyline className="bs-cn-e2" pathLength={1} points={pts([SPOKES[k], o])} fill="none" stroke={C.teal} strokeWidth={2} />
          <polyline className="bs-cn-pulse bs-cn-pulse--late" pathLength={1} points={pts([SPOKES[k], o])} fill="none" stroke={C.ivory} strokeWidth={2.5} strokeLinecap="round" />
        </g>
      ))}
      {/* Across: neighbours on each arc link up last. */}
      {[INNER, OUTER].map((ring, r) =>
        ring.slice(1).map((p, k) => <polyline key={`c${r}${k}`} className="bs-cn-e3" pathLength={1} points={pts([ring[k], p])} fill="none" stroke={C.deep} strokeWidth={2} style={{ '--k': k } as CSSProperties} />),
      )}
      {INNER.map((p, k) => (
        <polygon key={`n${k}`} className="bs-cn-n1" points={pts(octagon(...p, 24))} style={{ '--k': k } as CSSProperties} />
      ))}
      {OUTER.map((p, k) => (
        <polygon key={`m${k}`} className="bs-cn-n2" points={pts(octagon(...p, 18))} style={{ '--k': k } as CSSProperties} />
      ))}
      <Wide y={392} h={168} fill={C.navy} />
      <OctoV x={460} y={176} w={280} variant={variant} items={{ 0: KEPT.gem, 7: KEPT.gem }} />
    </SceneSvg>
  );
}

export const CONNECT_COPY: TakeCopy = {
  key: 'AR',
  name: 'Connect',
  headline: 'One mind, many ends.',
  lede: 'From the octopus, signals run out to an inner arc of nodes, then an outer arc, then across, until one mind has become a connected whole, with pulses still moving through it.',
  says: 'Every line of work is reached from the same mind, and once they’re connected they reach each other too.',
};

export default function OctoConnect() {
  return (
    <Board
      tone="night"
      copy={CONNECT_COPY}
      note={ROUND_EIGHT_NOTE}
      hero={<VariantHero initial="mark" options={MARK_OR_KEEPER} scene={(v) => <ConnectScene view="160 0 880 440" variant={v} />} />}
      mark={() => <NeutralOcto variant="mark" items={{ 0: KEPT.gem, 7: KEPT.gem }} />}
      divider={
        <div className="bs-rule-chain" aria-hidden="true">
          <span className="bs-chain-signal" />
          {Array.from({ length: 12 }, (_, i) => (
            <b key={i} style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
