// G · Folio — the essay. Esy is Essay Synthesis, and an essai is an attempt.
// The e's spine is a book's spine: pale leaves riffle past, then the e's own
// pieces turn over it like pages (navy on their backs) and turn back.

import type { CSSProperties } from 'react';
import { Board } from './Board';
import { E, eAt } from './pieces';
import { Polys } from './Stage';
import { ROUND_TWO_NOTE, type TakeCopy } from './symbols';

const SPINE = E.pieces.find((p) => p.id === 'spine')!;
// The right-hand pieces, grouped into three pages: top of the bowl, the bowl's
// side and middle, then the bar.
const PAGES = [['bowl-top'], ['bowl-right', 'bowl-mid'], ['bar']].map((ids) => E.pieces.filter((p) => ids.includes(p.id)));
const LEAF = E.pieces.filter((p) => p.tone !== 'none' && p.id !== 'spine');

function Book({ small = false }: { small?: boolean }) {
  return (
    <svg className={`bs-svg bs-folio${small ? ' bs-folio--small' : ''}`} viewBox="0 0 480 360" role="img" aria-label="The e as a book: its pieces turn like pages over its spine">
      <Polys pieces={[SPINE]} />
      {/* The next page, pale under the turning ones: open, the book shows two facing pages. */}
      <g className="bs-folio-under">
        <Polys pieces={LEAF} fill="#E3F4F0" />
      </g>
      {/* Leaves riffle first: the pages of the attempts that came before. */}
      {[0, 1, 2].map((n) => (
        <g key={`leaf-${n}`} className="bs-folio-leaf" style={{ '--d': `${n * 0.16}s` } as CSSProperties}>
          <Polys pieces={LEAF} fill="#F4F1EA" />
        </g>
      ))}
      {PAGES.map((page, n) => (
        <g key={n} className="bs-folio-page" style={{ '--d': `${0.7 + n * 0.28}s` } as CSSProperties}>
          <Polys pieces={page} className="bs-folio-face" />
        </g>
      ))}
    </svg>
  );
}

export const FOLIO_COPY: TakeCopy = {
  key: 'G',
  name: 'Folio',
  headline: 'An essay is an attempt.',
  lede: 'Esy comes from Essay Synthesis, and essai is French for a try. The e’s spine becomes a book’s spine and its other pieces turn like pages: every attempt kept, bound into one record you can page back through.',
  says: 'Where Esy came from and what it makes: durable, readable work with its earlier drafts still inside.',
};

export default function Folio() {
  return (
    <Board
      copy={FOLIO_COPY}
      note={ROUND_TWO_NOTE}
      hero={
        <div className="bs-frame">
          <Book />
          <p className="bs-caption">essai (n.): an attempt, a trial</p>
        </div>
      }
      mark={() => <Book small />}
      divider={
        <div className="bs-rule-pages" aria-hidden="true">
          {Array.from({ length: 30 }, (_, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties}>
              <svg viewBox="0 0 260 240">
                <Polys pieces={eAt(0, 0, 240)} />
              </svg>
            </span>
          ))}
        </div>
      }
    />
  );
}
