// F · Seal — provenance. An octagon is a square with our 45° cuts. Around the
// e, eight stencil sides light up one by one as each step of the work is
// done; when the last one lands the seal presses down and reads "Verified".

import type { CSSProperties } from 'react';
import { Board } from './Board';
import { eAt } from './pieces';
import { Polys } from './Stage';
import { octagon, pts, ROUND_TWO_NOTE, type TakeCopy } from './symbols';

// Sample step names, one per side, clockwise from the top.
const STEPS = ['Brief', 'Sources', 'Draft', 'Check', 'Review', 'Revise', 'Approve', 'Publish'];
const STEP_S = 0.45; // seconds between sides

const CX = 240;
const CY = 180;
const RING = octagon(CX, CY, 268);
const E_H = 104;

/** The ring's eight sides, each pulled back from the corners to leave a stencil gap. */
const sides = RING.map((a, i) => {
  const b = RING[(i + 1) % 8];
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const t = 9 / len;
  const r = (n: number) => +n.toFixed(2);
  return {
    x1: r(a[0] + (b[0] - a[0]) * t), y1: r(a[1] + (b[1] - a[1]) * t),
    x2: r(b[0] - (b[0] - a[0]) * t), y2: r(b[1] - (b[1] - a[1]) * t),
    // Label sits outward from the side's midpoint.
    lx: r(CX + ((a[0] + b[0]) / 2 - CX) * 1.27), ly: r(CY + ((a[1] + b[1]) / 2 - CY) * 1.27),
  };
});

function SealMark({ labels = false }: { labels?: boolean }) {
  return (
    <svg className={`bs-svg bs-seal${labels ? '' : ' bs-seal--small'}`} viewBox="0 0 480 360" role="img" aria-label="The esy seal: an octagon around the e whose eight sides light up step by step">
      <g className="bs-seal-press">
        <polygon className="bs-seal-flash" points={pts(octagon(CX, CY, 268))} />
        <polygon className="bs-seal-face" points={pts(octagon(CX, CY, 222))} />
        <Polys pieces={eAt(CX - (E_H * 260) / 240 / 2, CY - E_H / 2 - 10, E_H)} />
        <text className="bs-seal-word" x={CX} y={CY + 72} textAnchor="middle">VERIFIED</text>
        {sides.map((s, i) => (
          <line key={i} className="bs-seal-side" x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} style={{ '--d': `${i * STEP_S}s` } as CSSProperties} />
        ))}
      </g>
      {labels &&
        sides.map((s, i) => (
          <text key={i} className="bs-seal-step" x={s.lx} y={s.ly + 4} textAnchor="middle" style={{ '--d': `${i * STEP_S}s` } as CSSProperties}>
            {STEPS[i]}
          </text>
        ))}
    </svg>
  );
}

export const SEAL_COPY: TakeCopy = {
  key: 'F',
  name: 'Seal',
  headline: 'Every artifact carries its seal.',
  lede: 'An octagon is a square with our 45° cuts. Around the e, its eight sides light up as each step of the work is done, then the seal presses down. On the site it marks what Esy made and checked.',
  says: 'Provenance. Esy keeps the record of how a thing was made, and the seal is that record, closed.',
};

export default function Seal() {
  return (
    <Board
      copy={SEAL_COPY}
      note={ROUND_TWO_NOTE}
      hero={
        <div className="bs-frame">
          <SealMark labels />
        </div>
      }
      mark={() => <SealMark />}
      divider={
        <ol className="bs-rule-steps" aria-label="Steps">
          {STEPS.map((s, i) => (
            <li key={s} style={{ '--d': `${i * STEP_S}s` } as CSSProperties}>
              <span />
              {s}
            </li>
          ))}
        </ol>
      }
    />
  );
}
