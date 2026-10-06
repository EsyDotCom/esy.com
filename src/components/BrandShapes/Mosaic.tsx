'use client';

// E · Mosaic — the elephant sampled into a grid of chamfered tiles. Tiles
// settle in a diagonal wave, a teal scan sweeps across every few seconds, and
// tiles near the cursor lift and brighten. Precise, countable, alive.

import { useMemo, useRef, type CSSProperties, type PointerEvent } from 'react';
import { Board, type TakeCopy } from './Board';
import { ELEPHANT, H, TONES, W, toneAt, type Tone } from './pieces';

interface Tile {
  c: number;
  r: number;
  tone: Tone;
}

/** Sample the figure at each cell's centre; empty cells are skipped. */
function sample(cols: number): { tiles: Tile[]; cols: number; rows: number } {
  const size = W / cols;
  const rows = Math.round(H / size);
  const tiles: Tile[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const tone = toneAt(ELEPHANT.pieces, (c + 0.5) * size, (r + 0.5) * size);
      if (tone) tiles.push({ c, r, tone });
    }
  return { tiles, cols, rows };
}

function MosaicElephant({ cols, interactive = false }: { cols: number; interactive?: boolean }) {
  const { tiles, rows } = useMemo(() => sample(cols), [cols]);
  const ref = useRef<HTMLDivElement>(null);

  // Track the cursor in cell units; the tiles compute their own distance in CSS.
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    el.style.setProperty('--mx', String(((e.clientX - box.left) / box.width) * cols));
    el.style.setProperty('--my', String(((e.clientY - box.top) / box.height) * rows));
  };
  const leave = () => {
    ref.current?.style.setProperty('--mx', '-99');
    ref.current?.style.setProperty('--my', '-99');
  };

  return (
    <div
      ref={ref}
      className={`bs-mosaic${interactive ? ' bs-mosaic--live' : ''}`}
      role="img"
      aria-label={`A teal and navy elephant made of ${tiles.length} tiles`}
      style={{ '--cols': cols, '--rows': rows, '--mx': -99, '--my': -99 } as CSSProperties}
      onPointerMove={interactive ? move : undefined}
      onPointerLeave={interactive ? leave : undefined}
    >
      {tiles.map((t) => (
        <span
          key={`${t.c}-${t.r}`}
          style={
            {
              left: `${(t.c / cols) * 100}%`,
              top: `${(t.r / rows) * 100}%`,
              '--x': t.c,
              '--y': t.r,
              '--c': TONES[t.tone],
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export const MOSAIC_COPY: TakeCopy = {
  key: 'E',
  name: 'Mosaic',
  headline: 'Built from small, exact tiles.',
  lede: 'The elephant is sampled into a grid of chamfered tiles. They settle in a diagonal wave, a teal scan checks them every few seconds, and the ones under your cursor lift. Move over it.',
  says: 'Engineer-first: every part counted and checked. Big results from many small, verified pieces.',
};

export default function Mosaic() {
  return (
    <Board
      copy={MOSAIC_COPY}
      hero={
        <div className="bs-frame">
          <MosaicElephant cols={48} interactive />
          <p className="bs-caption">{sample(48).tiles.length} tiles · move your cursor over the elephant</p>
        </div>
      }
      mark={(w) => <MosaicElephant cols={w < 80 ? 16 : 24} />}
      divider={
        <div className="bs-rule-mosaic" aria-hidden="true">
          {Array.from({ length: 64 }, (_, i) => (
            <span key={i} style={{ '--x': i, '--c': i % 9 === 4 ? TONES.teal : TONES.navy } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
