// H · Graph — shared context. Loose points (notes, sources, decisions, drafts)
// drift in, settle on the corners of the e, link up along its edges, and the e
// fills in. Then signals run along the links until it all lets go again.

import type { CSSProperties } from 'react';
import { Board } from './Board';
import { E, points } from './pieces';
import { Polys } from './Stage';
import { noise, octagon, pts, ROUND_TWO_NOTE, type TakeCopy } from './symbols';

const PIECES = E.pieces.filter((p) => p.tone !== 'none');

// Nodes: every corner of every piece, merged where pieces meet.
const NODES: [number, number][] = [];
const nodeAt = ([x, y]: [number, number]) => {
  let i = NODES.findIndex(([nx, ny]) => Math.hypot(nx - x, ny - y) < 3);
  if (i < 0) i = NODES.push([x, y]) - 1;
  return i;
};
// Edges: each piece's outline, between merged nodes, without repeats.
const EDGES: [number, number][] = [];
for (const p of PIECES) {
  const ring = points(p).map(nodeAt).filter((n, i, a) => n !== a[(i + a.length - 1) % a.length]);
  ring.forEach((a, i) => {
    const b = ring[(i + 1) % ring.length];
    if (a !== b && !EDGES.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) EDGES.push([a, b]);
  });
}

// Where each node starts: pushed out from the e's centre, with some noise.
const SCATTER = NODES.map(([x, y], i) => {
  const a = Math.atan2(y - 180, x - 240) + noise(i) * 0.9;
  const r = 70 + Math.abs(noise(i + 40)) * 80;
  return [Math.cos(a) * r, Math.sin(a) * r];
});
const KINDS = ['navy', 'teal', 'ivory'] as const;

function Network({ small = false }: { small?: boolean }) {
  const size = small ? 30 : 15;
  return (
    <svg className={`bs-svg bs-graph${small ? ' bs-graph--small' : ''}`} viewBox="0 0 480 360" role="img" aria-label="Scattered points connecting into the e">
      <g className="bs-graph-fill">
        <Polys pieces={PIECES} />
      </g>
      {EDGES.map(([a, b], i) => (
        <line key={`e${i}`} className="bs-graph-edge" pathLength={1} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} style={{ '--d': `${i * 0.03}s` } as CSSProperties} />
      ))}
      {!small &&
        EDGES.map(([a, b], i) => (
          <line key={`s${i}`} className="bs-graph-signal" pathLength={1} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} style={{ '--d': `${(i % 5) * 0.24}s` } as CSSProperties} />
        ))}
      {NODES.map(([x, y], i) => (
        <polygon
          key={`n${i}`}
          className={`bs-graph-node bs-graph-node--${KINDS[i % 3]}`}
          points={pts(octagon(x, y, size))}
          style={{ '--sx': `${SCATTER[i][0].toFixed(1)}px`, '--sy': `${SCATTER[i][1].toFixed(1)}px`, '--d': `${(i % 7) * 0.05}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

export const GRAPH_COPY: TakeCopy = {
  key: 'H',
  name: 'Graph',
  headline: 'Scattered context, one shape.',
  lede: 'Notes, sources, decisions and drafts start as loose points. They drift together, settle on the corners of the e, link up along its edges, and signals start moving through it.',
  says: 'Esy is the shared memory every tool reads from. It connects what each one knows into one thing.',
};

export default function Graph() {
  return (
    <Board
      tone="night"
      copy={GRAPH_COPY}
      note={ROUND_TWO_NOTE}
      hero={
        <div className="bs-frame bs-frame--night">
          <Network />
          <p className="bs-caption">
            {NODES.length} points · {EDGES.length} links · one e
          </p>
        </div>
      }
      mark={() => <Network small />}
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
