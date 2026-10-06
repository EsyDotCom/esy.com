'use client';

// B · Tangram — one kit of fourteen chamfered pieces rearranges itself:
// elephant → whale → owl → tortoise → the e → elephant. Every piece keeps its
// identity, so you can watch the ear become a wave and the body become a shell.

import { useEffect, useState } from 'react';
import { Board, type TakeCopy } from './Board';
import { FIGURES } from './pieces';
import { Stage } from './Stage';

// The e holds longer: it's the punchline of every cycle.
const holdFor = (i: number) => (FIGURES[i].slug === 'e' ? 3600 : 2600);

/** Cycles through the figures on its own; `start` offsets small copies so a row never moves in step. */
function useCycle(start = 0, playing = true) {
  const [i, setI] = useState(start);
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % FIGURES.length), holdFor(i));
    return () => window.clearTimeout(t);
  }, [i, playing]);
  return [i, setI] as const;
}

function TangramFigure({ index, small = false }: { index: number; small?: boolean }) {
  const fig = FIGURES[index];
  return (
    <Stage
      pieces={fig.pieces}
      className={`bs-tangram${small ? ' bs-tangram--small' : ''}`}
      label={`Fourteen chamfered pieces arranged as: ${fig.name}`}
    />
  );
}

function TangramMark({ start = 0 }: { start?: number }) {
  const [i] = useCycle(start);
  return <TangramFigure index={i} small />;
}

export const TANGRAM_COPY: TakeCopy = {
  key: 'B',
  name: 'Tangram',
  headline: 'The same fourteen pieces make everything.',
  lede: 'One kit of chamfered pieces rearranges into an elephant, a whale, an owl and a tortoise, then folds back into our e. Watch a piece: the ear becomes a wave, the body becomes a shell.',
  says: 'Many different artifacts, one way of making them. The e is where every shape comes from and returns to.',
};

export default function Tangram() {
  const [playing, setPlaying] = useState(true);
  const [i, setI] = useCycle(0, playing);
  return (
    <Board
      copy={TANGRAM_COPY}
      hero={
        <div className="bs-frame">
          <TangramFigure index={i} />
          {/* Picking a figure pauses the cycle; Play resumes it. */}
          <div className="bs-chips" role="group" aria-label="Arrange the pieces as">
            {FIGURES.map((f, n) => (
              <button
                key={f.slug}
                type="button"
                className={n === i ? 'is-on' : ''}
                onClick={() => {
                  setI(n);
                  setPlaying(false);
                }}
              >
                {f.name}
              </button>
            ))}
            <button type="button" className="bs-chip-play" onClick={() => setPlaying((p) => !p)}>
              {playing ? 'Pause' : 'Play'}
            </button>
          </div>
          <p className="bs-caption">14 pieces · {FIGURES[i].name.toLowerCase()}</p>
        </div>
      }
      mark={() => <TangramMark />}
      divider={
        <div className="bs-rule-tangram" aria-hidden="true">
          {FIGURES.map((f, n) => (
            <div key={f.slug}>
              <TangramMark start={n} />
            </div>
          ))}
        </div>
      }
    />
  );
}
