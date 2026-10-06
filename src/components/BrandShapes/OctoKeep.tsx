'use client';

// AP · Keep — kept, and traced back. In the rock beside its den is a wall of
// octagon cells. The octopus sets a glowing piece into one cell after
// another; each cell closes, and a thread links it to the one before, so
// the chain of where everything came from grows as the wall fills.

import type { CSSProperties } from 'react';
import { BeaconDefs } from './beacon';
import { Board, type TakeCopy } from './Board';
import { C, SceneSvg, Wide } from './draw';
import { KEPT, MARK_OR_KEEPER, NeutralOcto, OctoV, ROUND_EIGHT_NOTE, VariantHero, type OctoVariant } from './octo3';
import { octagon, pts } from './symbols';

const PITCH = 80;
const COLS = 5;
const ROWS = 4;
const X0 = 720;
const Y0 = 64;
const FROM: [number, number] = [520, 290];

const CELLS = Array.from({ length: COLS * ROWS }, (_, n) => [X0 + (n % COLS) * PITCH, Y0 + Math.floor(n / COLS) * PITCH] as [number, number]);
// The order this round fills in, and the cells already kept from before.
const ORDER = [6, 2, 8, 12, 16, 13];
const KEPT_BEFORE = [0, 1, 4, 5, 9, 10, 14, 15, 17, 18];

export function KeepScene({ view, variant = 'mark' }: { view?: string; variant?: OctoVariant }) {
  return (
    <SceneSvg view={view} className="bs-kp" label="An octopus setting glowing pieces into a wall of octagon cells, each linked to the one before">
      <BeaconDefs />
      <Wide y={0} h={560} fill="url(#bs-beacon-sea)" />
      {[160, 480].map((x, n) => (
        <polygon key={n} className="bs-reef-ray" points={`${x},0 ${x + 90},0 ${x + 70},380 ${x + 30},380`} fill={C.mint} style={{ '--n': n } as CSSProperties} />
      ))}
      {/* The rock and its wall of cells, with diamonds where the corners meet. */}
      <polygon points="650,20 690,0 3600,0 3600,400 640,400 620,360" fill="#163A5F" />
      {CELLS.map(([x, y], n) =>
        n % COLS < COLS - 1 && Math.floor(n / COLS) < ROWS - 1 ? (
          <polygon key={`d${n}`} points={`${x + PITCH / 2},${y + PITCH / 2 - 9} ${x + PITCH / 2 + 9},${y + PITCH / 2} ${x + PITCH / 2},${y + PITCH / 2 + 9} ${x + PITCH / 2 - 9},${y + PITCH / 2}`} fill="#1E4A72" />
        ) : null,
      )}
      {CELLS.map(([x, y], n) => (
        <g key={n}>
          <polygon points={pts(octagon(x, y, 64))} fill="#0A2540" />
          {KEPT_BEFORE.includes(n) && (
            <>
              <polygon points={pts(octagon(x, y, 30))} fill={C.teal} opacity={0.45} />
              <polygon points={pts(octagon(x, y, 64))} fill="none" stroke={C.ivory} strokeWidth={2} opacity={0.35} />
            </>
          )}
        </g>
      ))}
      {/* This round: thread, glow, lid, in the order the pieces arrive. */}
      {ORDER.map((n, k) => {
        const [x, y] = CELLS[n];
        const prev = k ? CELLS[ORDER[k - 1]] : null;
        return (
          <g key={n} style={{ '--k': k } as CSSProperties}>
            {prev && <polyline className="bs-kp-thread" pathLength={1} points={pts([prev, [x, prev[1]], [x, y]])} fill="none" stroke={C.mint} strokeWidth={2} />}
            <polygon className="bs-kp-glow" points={pts(octagon(x, y, 34))} fill={C.mint} />
            <polygon className="bs-kp-lid" points={pts(octagon(x, y, 64))} fill="none" stroke={C.ivory} strokeWidth={3} style={{ transformOrigin: `${x}px ${y}px` }} />
            <g className="bs-kp-shard" style={{ '--fx': `${(FROM[0] - x).toFixed(1)}px`, '--fy': `${(FROM[1] - y).toFixed(1)}px` } as CSSProperties}>
              <polygon points={pts(octagon(x, y, 24))} fill={C.mint} />
            </g>
          </g>
        );
      })}
      <Wide y={392} h={168} fill={C.navy} />
      <OctoV x={230} y={150} w={320} variant={variant} items={{ 7: KEPT.gem }} />
    </SceneSvg>
  );
}

export const KEEP_COPY: TakeCopy = {
  key: 'AP',
  name: 'Keep',
  headline: 'Kept, and traced back.',
  lede: 'Beside its den is a wall of octagon cells. The octopus sets a glowing piece into one cell after another; each cell closes, and a thread links it to the one before, so the chain of where things came from grows as the wall fills.',
  says: 'Memory with provenance: everything kept in its own place, and every piece linked to what came before it.',
};

export default function OctoKeep() {
  return (
    <Board
      tone="night"
      copy={KEEP_COPY}
      note={ROUND_EIGHT_NOTE}
      hero={<VariantHero initial="mark" options={MARK_OR_KEEPER} scene={(v) => <KeepScene view="220 20 840 440" variant={v} />} />}
      mark={() => <NeutralOcto variant="mark" items={{ 7: KEPT.gem }} />}
      divider={
        <div className="bs-rule-lights" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="bs-octagon" style={{ '--d': `${i * 0.35}s` } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
