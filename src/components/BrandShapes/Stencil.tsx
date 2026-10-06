'use client';

// A · Stencil — the elephant arrives as loose stencil pieces and locks
// together with the loader's expo settle, a teal pulse runs through it, then
// it idles: ear flaps, trunk sways, tail swings, body breathes.

import { useState, type CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { ELEPHANT, H, W } from './pieces';
import { Stage } from './Stage';

// Each piece starts pushed out from the figure's centre, so the parts
// converge from every side rather than all sliding the same way.
const scattered = ELEPHANT.pieces.map((p) => {
  const dx = (p.x + p.w / 2 - W / 2) * 0.32;
  const dy = (p.y + p.h / 2 - H / 2) * 0.32;
  return { ...p, dx, dy };
});

function StencilElephant({ loop = false }: { loop?: boolean }) {
  return (
    <Stage
      pieces={ELEPHANT.pieces}
      className={`bs-stencil${loop ? ' bs-stencil--loop' : ''}`}
      label="A teal and navy stencil elephant assembling"
      style={{ containerType: 'inline-size' }}
    >
      {/* Per-piece scatter offsets, read by the assemble keyframes. */}
      <style>{scattered
        .map((p, i) => `.bs-stencil > .bs-p:nth-child(${i + 1}){--dx:calc(${p.dx.toFixed(1)} * 100cqw / ${W});--dy:calc(${p.dy.toFixed(1)} * 100cqw / ${W})}`)
        .join('')}</style>
    </Stage>
  );
}

export const STENCIL_COPY: TakeCopy = {
  key: 'A',
  name: 'Stencil',
  headline: 'Every piece locks into place.',
  lede: 'The elephant is cut the way our e is cut: flat pieces, 45° corners, a stencil gap between each. It arrives in parts and locks together with the same motion as our loader, then stays alive in small ways.',
  says: 'Separate parts become one dependable thing. It’s the loader’s story, told by a character.',
};

export default function Stencil() {
  const [run, setRun] = useState(0);
  return (
    <Board
      copy={STENCIL_COPY}
      hero={
        <div className="bs-frame">
          <StencilElephant key={run} />
          <button type="button" className="bs-replay" onClick={() => setRun((n) => n + 1)}>
            Assemble again
          </button>
        </div>
      }
      mark={() => <StencilElephant loop />}
      divider={<StencilRule />}
    />
  );
}

/** A rule of stencil segments with the loader's verify-pulse travelling along it. */
function StencilRule() {
  return (
    <div className="bs-rule-stencil" aria-hidden="true">
      {Array.from({ length: 28 }, (_, i) => (
        <span key={i} style={{ '--i': i } as CSSProperties} />
      ))}
    </div>
  );
}
