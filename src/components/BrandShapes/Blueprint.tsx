'use client';

// C · Blueprint — the elephant is drafted on a grid: each piece is outlined,
// measured and then filled, in build order, while a ledger beside it records
// what landed and when. Redraws itself every eleven seconds.

import { useEffect, useState, type CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { ELEPHANT, type Piece } from './pieces';
import { SvgStage } from './Stage';

// Build order: the big masses first, then the details, like a drafter would.
const ORDER = ['body', 'head', 'ear', 'near-back-leg', 'near-front-leg', 'far-back-leg', 'far-front-leg', 'trunk', 'trunk-low', 'trunk-tip', 'tail', 'tuft', 'tusk', 'eye'];
const STEP = 0.42; // seconds between pieces
const step = (p: Piece) => ORDER.indexOf(p.id);
const BUILD = ORDER.length * STEP + 1;
const CYCLE = 11000;

// Leader-line callouts for four pieces: anchor on the piece, end, label.
const CALLOUTS: { id: string; from: [number, number]; to: [number, number]; text: string; anchor?: 'start' | 'end' }[] = [
  { id: 'body', from: [150, 92], to: [150, 44], text: 'body · 238 × 150' },
  { id: 'ear', from: [334, 80], to: [334, 26], text: 'ear · teal', anchor: 'start' },
  { id: 'trunk', from: [422, 244], to: [466, 350], text: 'trunk · 3 pieces', anchor: 'end' },
  { id: 'tail', from: [60, 200], to: [26, 262], text: 'tail', anchor: 'start' },
];

const toneName: Record<string, string> = { navy: 'navy', teal: 'teal', deep: 'deep teal', ivory: 'ivory' };

function Drafting({ labels = false, loop = false }: { labels?: boolean; loop?: boolean }) {
  return (
    <SvgStage
      pieces={ELEPHANT.pieces}
      className={`bs-bp${loop ? ' bs-bp--loop' : ''}`}
      label="A teal and navy elephant being drafted piece by piece"
      polygonProps={(p) => ({
        pathLength: 1,
        className: 'bs-bp-piece',
        style: { '--d': `${step(p) * (loop ? 0.12 : STEP)}s` } as CSSProperties,
      })}
    >
      {labels &&
        CALLOUTS.map((c) => {
          const p = ELEPHANT.pieces.find((x) => x.id === c.id)!;
          return (
            <g key={c.id} className="bs-bp-callout" style={{ '--d': `${step(p) * STEP + 0.5}s` } as CSSProperties}>
              <line x1={c.from[0]} y1={c.from[1]} x2={c.to[0]} y2={c.to[1]} />
              <circle cx={c.from[0]} cy={c.from[1]} r={2.5} />
              <text x={c.to[0] + (c.anchor === 'end' ? 0 : c.anchor === 'start' ? -4 : 0)} y={c.to[1] - 6} textAnchor={c.anchor ?? 'middle'}>
                {c.text}
              </text>
            </g>
          );
        })}
    </SvgStage>
  );
}

export const BLUEPRINT_COPY: TakeCopy = {
  key: 'C',
  name: 'Blueprint',
  headline: 'You can see how it was made.',
  lede: 'The elephant is drafted on a grid, one piece at a time: outlined, measured, then filled. The ledger beside it records each piece as it lands, so the drawing carries its own history.',
  says: 'Provenance as a picture. Esy keeps how a thing was made, not just the thing.',
};

export default function Blueprint() {
  // Remount the drawing on a timer so it redraws from a blank sheet.
  const [run, setRun] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setRun((n) => n + 1), CYCLE);
    return () => window.clearInterval(t);
  }, []);
  const ledger = [...ELEPHANT.pieces].sort((a, b) => step(a) - step(b));
  return (
    <Board
      tone="grid"
      copy={BLUEPRINT_COPY}
      hero={
        <div className="bs-frame bs-frame--sheet" key={run}>
          <Drafting labels />
          <ol className="bs-ledger" aria-label="Build ledger">
            {ledger.map((p, n) => (
              <li key={p.id} style={{ '--d': `${n * STEP + 0.45}s` } as CSSProperties}>
                <time>{(n * STEP).toFixed(1)}s</time>
                <span>{p.id.replace(/-/g, ' ')}</span>
                <em>{toneName[p.tone]}</em>
              </li>
            ))}
          </ol>
          <p className="bs-caption bs-bp-total" style={{ '--d': `${BUILD}s` } as CSSProperties}>
            14 pieces · 1 elephant · every step kept
          </p>
        </div>
      }
      mark={() => <Drafting loop />}
      divider={
        <div className="bs-rule-ruler" aria-hidden="true">
          <span className="bs-ruler-marker" />
          {[0, 120, 240, 360, 480].map((n) => (
            <b key={n}>{n}</b>
          ))}
        </div>
      }
    />
  );
}
