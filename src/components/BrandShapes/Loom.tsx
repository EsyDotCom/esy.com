'use client';

// I · Loom — synthesis. Warp threads are strung; weft fills in row by row,
// back and forth like a real shuttle, and a woven label comes off the loom
// with the e in it. Then it unravels in the same order and starts again.

import { useMemo, type CSSProperties } from 'react';
import { Board } from './Board';
import { eAt, E_ASPECT, toneAt } from './pieces';
import { ROUND_TWO_NOTE, type TakeCopy } from './symbols';

// The label's area inside the 480 × 360 stage.
const X0 = 48;
const Y0 = 36;
const LW = 384;
const LH = 288;
const WEAVE_S = 3.2; // seconds to weave the whole label

/** `tight` crops the label to the e plus one thread of border, so small marks stay readable. */
function Label({ cell, tight = false }: { cell: number; tight?: boolean }) {
  const { cells, cols, rows, x0, y0 } = useMemo(() => {
    const eh = tight ? 220 : LH * 0.62;
    const cols = tight ? Math.ceil((eh * E_ASPECT) / cell) + 2 : Math.round(LW / cell);
    const rows = tight ? Math.ceil(eh / cell) + 2 : Math.round(LH / cell);
    const x0 = tight ? 240 - (cols * cell) / 2 : X0;
    const y0 = tight ? 180 - (rows * cell) / 2 : Y0;
    const e = eAt(240 - (eh * E_ASPECT) / 2, 180 - eh / 2, eh);
    const cells = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const x = x0 + c * cell;
        const y = y0 + r * cell;
        // Boustrophedon order: the shuttle runs left on one row, right on the next.
        const order = r * cols + (r % 2 ? cols - 1 - c : c);
        cells.push({ x, y, inE: !!toneAt(e, x + cell / 2, y + cell / 2), weftOver: (c + r) % 2 === 0, order });
      }
    return { cells, cols, rows, x0, y0 };
  }, [cell, tight]);
  const per = WEAVE_S / (cols * rows);
  const thin = cell * (tight ? 0.1 : 0.18);

  return (
    <svg className="bs-svg bs-loom" viewBox="0 0 480 360" role="img" aria-label="A woven label with the e in it, woven row by row">
      {/* The warp: strung threads waiting for the weft. */}
      {Array.from({ length: cols }, (_, c) => (
        <line key={c} className="bs-loom-warp" x1={x0 + c * cell + cell / 2} x2={x0 + c * cell + cell / 2} y1={y0 - 14} y2={y0 + rows * cell + 14} strokeWidth={cell * 0.5} />
      ))}
      {/* The weft: over-cells run wide, under-cells run tall, so the cloth reads woven. */}
      {cells.map((k, i) => (
        <rect
          key={i}
          className={`bs-loom-cell${k.inE ? ' is-e' : ''}${k.weftOver ? '' : ' is-under'}`}
          x={k.weftOver ? k.x : k.x + thin}
          y={k.weftOver ? k.y + thin : k.y}
          width={k.weftOver ? cell : cell - thin * 2}
          height={k.weftOver ? cell - thin * 2 : cell}
          style={{ '--d': `${(k.order * per).toFixed(3)}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

export const LOOM_COPY: TakeCopy = {
  key: 'I',
  name: 'Loom',
  headline: 'Many threads, one fabric.',
  lede: 'Synthesis is weaving. The threads are strung, then filled in row by row, back and forth, until a woven label comes off the loom with the e in it, like the tag sewn into something made well.',
  says: 'Synthesis. Esy weaves sources, steps and checks into one finished thing, and puts its label on it.',
};

export default function Loom() {
  return (
    <Board
      copy={LOOM_COPY}
      note={ROUND_TWO_NOTE}
      hero={
        <div className="bs-frame">
          <Label cell={12} />
        </div>
      }
      mark={(w) => <Label tight cell={w < 80 ? 22 : 18} />}
      divider={
        <div className="bs-rule-weave" aria-hidden="true">
          {Array.from({ length: 2 * 72 }, (_, i) => (
            <span key={i} className={(i + Math.floor(i / 72)) % 2 ? 'is-under' : ''} style={{ '--i': i % 72, '--r': Math.floor(i / 72), '--c': (i % 72) % 12 < 2 ? '#00A896' : '#0A2540' } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
