// J · Keystone — durability. Two piers rise, stencil stones stack up both
// sides of an arch on a temporary frame, the e drops in as the keystone and
// locks with a pulse, the frame falls away, and the arch stands on its own.

import type { CSSProperties } from 'react';
import { Board } from './Board';
import { eAt, E_ASPECT } from './pieces';
import { Polys } from './Stage';
import { pts, ROUND_TWO_NOTE, type TakeCopy } from './symbols';

const CX = 240;
const CY = 282; // springing line
const R_IN = 92;
const R_OUT = 152;
const GAP = 2.2; // degrees of stencil gap on each side of a stone
const at = (r: number, deg: number): [number, number] => [CX + r * Math.cos((deg * Math.PI) / 180), CY - r * Math.sin((deg * Math.PI) / 180)];

/** One voussoir between two angles; facets, not curves, so the arch stays in our cut. */
const stone = (a: number, b: number, out = R_OUT) => [at(R_IN, a - GAP), at(R_IN, b + GAP), at(out, b + GAP), at(out, a - GAP)];

// Build order: left, right, left, right, then the keystone.
const STONES = [
  { pts: stone(180, 144), d: 0.6 },
  { pts: stone(36, 0), d: 0.9 },
  { pts: stone(144, 108), d: 1.2 },
  { pts: stone(72, 36), d: 1.5 },
];
const KEY = stone(108, 72, R_OUT + 14);
const KEY_E_H = 46;
const KEY_MID = at((R_IN + R_OUT + 14) / 2, 90);

// The temporary frame: a faceted arc just inside the stones, on two posts.
const FRAME = [0, 1, 2, 3, 4, 5, 6].map((n) => at(R_IN - 6, 180 - n * 30));

function Arch() {
  return (
    <svg className="bs-svg bs-arch" viewBox="0 0 480 360" role="img" aria-label="An arch of stencil stones with the e as its keystone">
      <line className="bs-arch-ground" x1={40} x2={440} y1={334} y2={334} />
      <g className="bs-arch-frame">
        <polyline points={pts(FRAME)} />
        <line x1={FRAME[0][0] + 10} x2={FRAME[0][0] + 10} y1={CY} y2={334} />
        <line x1={FRAME[6][0] - 10} x2={FRAME[6][0] - 10} y1={CY} y2={334} />
      </g>
      {/* Piers: the e's own spine cut, standing on the ground. */}
      <polygon className="bs-arch-stone bs-arch-pier" points={pts([[CX - R_OUT, CY + 4], [CX - R_IN, CY + 4], [CX - R_IN, 334], [CX - R_OUT + 14, 334], [CX - R_OUT, 320]])} style={{ '--d': '0s' } as CSSProperties} />
      <polygon className="bs-arch-stone bs-arch-pier" points={pts([[CX + R_IN, CY + 4], [CX + R_OUT, CY + 4], [CX + R_OUT, 320], [CX + R_OUT - 14, 334], [CX + R_IN, 334]])} style={{ '--d': '0.2s' } as CSSProperties} />
      {STONES.map((s, i) => (
        <polygon key={i} className="bs-arch-stone" points={pts(s.pts)} style={{ '--d': `${s.d}s` } as CSSProperties} />
      ))}
      <g className="bs-arch-key" style={{ '--d': '2.3s' } as CSSProperties}>
        <polygon className="bs-arch-keystone" points={pts(KEY)} />
        <Polys pieces={eAt(KEY_MID[0] - (KEY_E_H * E_ASPECT) / 2, KEY_MID[1] - KEY_E_H / 2, KEY_E_H, 'navy')} />
      </g>
    </svg>
  );
}

export const KEYSTONE_COPY: TakeCopy = {
  key: 'J',
  name: 'Keystone',
  headline: 'The piece that makes it stand.',
  lede: 'Stencil stones rise into an arch on a temporary frame. The e drops in as the keystone and locks, the frame falls away, and the arch holds on its own.',
  says: 'Durability. Checking is what turns a stack of attempts into something that stands without scaffolding.',
};

export default function Keystone() {
  return (
    <Board
      copy={KEYSTONE_COPY}
      note={ROUND_TWO_NOTE}
      hero={
        <div className="bs-frame">
          <Arch />
        </div>
      }
      mark={() => <Arch />}
      divider={
        <div className="bs-rule-course" aria-hidden="true">
          {Array.from({ length: 15 }, (_, i) =>
            i === 7 ? (
              <span key={i} className="bs-course-key">
                <svg viewBox="0 0 260 240">
                  <Polys pieces={eAt(0, 0, 240, 'navy')} />
                </svg>
              </span>
            ) : (
              <span key={i} />
            ),
          )}
        </div>
      }
    />
  );
}
