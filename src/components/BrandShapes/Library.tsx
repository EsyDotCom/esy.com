// AC · Library — kept, and findable. A reading room at night: an octagon
// window onto the stars, two tall cases, books dropping into their gaps, a
// rolling ladder that travels the right-hand case, and a card catalog whose
// drawers open to show where each piece came from.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { Box, C, Diamond, ROUND_FIVE_NOTE, SceneSvg, Wide } from './draw';
import { noise, octagon, pts } from './symbols';

const SPINES = [C.navy, C.teal, C.deep, C.ivory, C.bright, '#1E4A72', C.mint];
const SHELF_YS = [96, 178, 260, 342];

/** One case of shelves, filled with books; `gaps` are where returning books drop in. */
function Case({ x, w, seed, gaps = [] }: { x: number; w: number; seed: number; gaps?: [number, number][] }) {
  return (
    <g>
      <Box x={x} y={28} w={w} h={330} c={[18, 18, 0, 0]} fill="#163A5F" />
      {SHELF_YS.map((sy, row) => {
        // Lay books left to right with deterministic widths and heights.
        const books = [];
        let bx = x + 14;
        let k = 0;
        while (bx < x + w - 26) {
          const bw = 12 + Math.abs(noise(seed + row * 31 + k)) * 12;
          const bh = 46 + Math.abs(noise(seed + row * 17 + k * 3)) * 22;
          const gap = gaps.find(([r, i]) => r === row && i === k);
          books.push(
            <Box
              key={k}
              className={gap ? 'bs-lib-return' : undefined}
              x={+bx.toFixed(1)}
              y={+(sy - bh).toFixed(1)}
              w={+bw.toFixed(1)}
              h={+bh.toFixed(1)}
              c={[0, 3, 0, 0]}
              fill={SPINES[(k + row * 2 + seed) % SPINES.length]}
              style={gap ? ({ '--n': gaps.indexOf(gap) } as CSSProperties) : undefined}
            />,
          );
          bx += bw + 2;
          k++;
        }
        return (
          <g key={row}>
            <Box x={x + 8} y={sy - 72} w={w - 16} h={72} fill="#0F2C49" />
            {books}
            <Box x={x + 4} y={sy} w={w - 8} h={8} fill={C.navy} />
          </g>
        );
      })}
    </g>
  );
}

export function LibraryScene({ view }: { view?: string }) {
  return (
    <SceneSvg view={view} className="bs-lib" label="A reading room: an octagon window, shelves of books filling themselves, a ladder and a card catalog">
      <Wide y={0} h={560} fill="#F4F1EA" />
      {/* The window: an octagon onto the night, moon and stars. */}
      <polygon points={pts(octagon(600, 120, 196))} fill={C.navy} />
      <polygon points={pts(octagon(600, 120, 176))} fill="#061527" />
      {Array.from({ length: 12 }, (_, n) => (
        <Diamond key={n} className="bs-sky-twinkle" x={530 + Math.abs(noise(n)) * 140} y={50 + Math.abs(noise(n + 20)) * 140} s={2.5} fill={C.ivory} style={{ '--n': n } as CSSProperties} />
      ))}
      <polygon points={pts(octagon(640, 86, 34))} fill={C.ivory} />
      <Box x={597} y={34} w={6} h={172} fill={C.navy} />
      <Box x={514} y={117} w={172} h={6} fill={C.navy} />
      <Case x={70} w={400} seed={3} gaps={[[0, 4], [2, 9], [3, 2]]} />
      <Case x={730} w={400} seed={11} gaps={[[1, 6], [3, 11]]} />
      {/* The rolling ladder on the right-hand case. */}
      <Box x={730} y={22} w={400} h={5} fill={C.ink} />
      <g className="bs-lib-ladder">
        <Box x={780} y={24} w={6} h={348} r={-6} fill={C.teal} />
        <Box x={830} y={24} w={6} h={348} r={-6} fill={C.teal} />
        {Array.from({ length: 9 }, (_, k) => (
          // Rungs follow the rails' 6° lean.
          <Box key={k} x={+(771.5 + k * 3.8).toFixed(1)} y={60 + k * 36} w={50} h={5} fill={C.bright} />
        ))}
      </g>
      {/* The card catalog: drawers that open to show their card. */}
      <Box x={508} y={236} w={184} h={150} c={[10, 10, 0, 0]} fill={C.navy} />
      {Array.from({ length: 12 }, (_, n) => {
        const dx = 520 + (n % 4) * 42;
        const dy = 248 + Math.floor(n / 4) * 44;
        return (
          <g key={n} className={n === 5 || n === 10 ? 'bs-lib-drawer' : undefined} style={{ '--n': n === 5 ? 0 : 1 } as CSSProperties}>
            <Box className="bs-lib-card" x={dx + 6} y={dy - 4} w={26} h={20} c={[0, 5, 0, 0]} fill={C.ivory} />
            <Box x={dx} y={dy} w={38} h={36} c={2} fill="#1E4A72" />
            <Box x={dx + 11} y={dy + 9} w={16} h={7} fill={C.ivory} />
            <Box x={dx + 15} y={dy + 22} w={8} h={4} fill={C.mint} />
          </g>
        );
      })}
      {/* A reading lamp on the catalog, its light breathing, motes drifting in it. */}
      {/* Kept low and to the left so it clears the window's cut corner. */}
      <polygon className="bs-lib-light" points="508,214 552,214 600,236 470,236" fill={C.mint} />
      <Box x={527} y={212} w={6} h={24} fill={C.navy} />
      <polygon points="506,214 554,214 546,196 514,196" fill={C.teal} />
      {[0, 1, 2, 3].map((n) => (
        <Diamond key={n} className="bs-lib-mote" x={500 + n * 22} y={226} s={2} fill={C.ivory} style={{ '--n': n } as CSSProperties} />
      ))}
      <Wide y={386} h={174} fill={C.navy} />
    </SceneSvg>
  );
}

export const LIBRARY_COPY: TakeCopy = {
  key: 'AC',
  name: 'Library',
  headline: 'Kept, and findable.',
  lede: 'A reading room at night. Books drop into their places, a ladder travels the shelves, and the card catalog opens to show where each one is and where it came from.',
  says: 'Durable memory you can search: everything Esy makes is kept, and its card says where it came from.',
};

export default function Library() {
  return (
    <Board
      copy={LIBRARY_COPY}
      note={ROUND_FIVE_NOTE}
      hero={
        <div className="bs-frame bs-frame--flush">
          <LibraryScene view="320 10 560 420" />
        </div>
      }
      mark={() => (
        <svg className="bs-svg bs-lib" viewBox="60 20 420 330" role="img" aria-label="A shelf of books, one dropping into place">
          <Case x={70} w={400} seed={3} gaps={[[0, 4], [2, 9], [3, 2]]} />
        </svg>
      )}
      divider={
        <div className="bs-rule-books" aria-hidden="true">
          {Array.from({ length: 40 }, (_, i) => (
            <span key={i} className={i === 17 || i === 31 ? 'is-return' : undefined} style={{ '--c': SPINES[i % SPINES.length], height: `${22 + (i * 7) % 14}px`, '--n': i === 31 ? 1 : 0 } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
