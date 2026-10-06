// AS · Octopolis — one shared reef, many hands. Off Australia, gloomy
// octopuses were found living together on a shared den city built up on a
// pile of shells. Here four of them share one mound: two bring pieces, one
// sets the top, the core glows each time something is added, and one piece
// is taken out, used, and put back. Nobody owns it; everybody builds it.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { C, SceneSvg, Wide } from './draw';
import { OctopusFigure } from './Octopus';
import { OctoIn, ReefBackdrop, ROUND_NINE_NOTE, Shell } from './reefkit';
import { octagon, pts } from './symbols';

const CORE: [number, number] = [600, 326];
// The mound, row by row from the bottom: centre x of each shell.
const ROWS: { y: number; xs: number[] }[] = [
  { y: 372, xs: [470, 502, 534, 566, 598, 630, 662, 694, 726] },
  { y: 344, xs: [486, 518, 550, 582, 614, 646, 678, 710] },
  { y: 316, xs: [502, 534, 566, 598, 630, 662, 698] },
  { y: 288, xs: [534, 566, 598, 630, 666] },
  { y: 262, xs: [566, 598, 634] },
];
const DENS: [number, number][] = [[518, 344], [662, 316]];
const LEFT_ARM: [number, number] = [372, 292];
const RIGHT_ARM: [number, number] = [848, 292];
// Pieces added this cycle: where they land, who brings them, and when (s).
const ADDS = [
  { at: [440, 372] as [number, number], from: LEFT_ARM, t: 1 },
  { at: [758, 372] as [number, number], from: RIGHT_ARM, t: 5 },
  { at: [600, 236] as [number, number], from: [600, 160] as [number, number], t: 9 },
  { at: [470, 344] as [number, number], from: LEFT_ARM, t: 13 },
];
const BORROW: [number, number] = [698, 316];
const TONES = [C.ivory, C.teal, C.mint, '#E2DCCB'];

export function PolisScene({ view }: { view?: string }) {
  return (
    <SceneSvg view={view} className="bs-opo" label="Four octopuses sharing one den city: adding pieces, taking one, putting it back">
      <ReefBackdrop />
      {/* The shared core, glowing through the mound. */}
      <polygon className="bs-opo-core" points={pts(octagon(...CORE, 150))} fill={C.mint} style={{ transformOrigin: `${CORE[0]}px ${CORE[1]}px` }} />
      {ROWS.flatMap((r, ri) =>
        r.xs.map((x, k) => {
          const den = DENS.some(([dx, dy]) => dx === x && dy === r.y);
          const borrowed = BORROW[0] === x && BORROW[1] === r.y;
          if (borrowed) return null;
          return den ? (
            <g key={`${ri}-${k}`}>
              <polygon points={pts(octagon(x, r.y, 30))} fill="#061527" />
              <g className="bs-opo-peek" style={{ transformOrigin: `${x}px ${r.y}px`, '--n': ri } as CSSProperties}>
                <polygon points={pts(octagon(x - 5, r.y, 6))} fill={C.ivory} />
                <polygon points={pts(octagon(x + 5, r.y, 6))} fill={C.ivory} />
              </g>
            </g>
          ) : (
            <Shell key={`${ri}-${k}`} x={x} y={r.y} s={28} tone={TONES[(k + ri) % TONES.length]} heart={(k + ri) % 3 ? C.deep : C.mint} />
          );
        }),
      )}
      {/* One shell taken out, used by a neighbour, and put back. */}
      <g className="bs-opo-borrow" style={{ '--bx': `${RIGHT_ARM[0] - BORROW[0]}px`, '--by': `${RIGHT_ARM[1] - BORROW[1]}px` } as CSSProperties}>
        <Shell x={BORROW[0]} y={BORROW[1]} s={28} tone={C.bright} heart={C.ivory} />
      </g>
      {/* This cycle's additions, each brought by a different octopus; the core answers each one. */}
      {ADDS.map((a, n) => (
        <g key={n} style={{ '--t': `${a.t}s` } as CSSProperties}>
          <polygon className="bs-opo-ring" points={pts(octagon(...CORE, 150))} fill="none" stroke={C.mint} strokeWidth={3} style={{ transformOrigin: `${CORE[0]}px ${CORE[1]}px` }} />
          <g className="bs-opo-add" style={{ '--fx': `${a.from[0] - a.at[0]}px`, '--fy': `${a.from[1] - a.at[1]}px` } as CSSProperties}>
            <Shell x={a.at[0]} y={a.at[1]} s={28} tone={n % 2 ? C.mint : C.ivory} heart={C.teal} />
          </g>
        </g>
      ))}
      <Wide y={392} h={168} fill={C.navy} />
      {/* The neighbours: two carriers, one setting the top. */}
      <OctoIn x={110} y={168} w={270} />
      <OctoIn x={840} y={168} w={270} flip />
      <OctoIn x={510} y={34} w={180} />
    </SceneSvg>
  );
}

export const POLIS_COPY: TakeCopy = {
  key: 'AS',
  name: 'Octopolis',
  headline: 'One shared reef, many hands.',
  lede: 'Off Australia, divers found octopuses living together on a shared den city built up on a pile of shells. Here four of them share one mound: two bring pieces, one sets the top, and one takes a piece out, uses it, and puts it back.',
  says: 'Many people, one shared memory: everyone adds to it, everyone can draw from it, and the core lights up each time it grows.',
};

export default function OctoPolis() {
  return (
    <Board
      tone="night"
      header
      copy={POLIS_COPY}
      note={ROUND_NINE_NOTE}
      hero={
        <div className="bs-frame bs-frame--night bs-frame--flush">
          <PolisScene view="110 20 980 440" />
        </div>
      }
      mark={() => (
        <svg className="bs-svg" viewBox="0 0 480 360" role="img" aria-label="The octopus">
          <OctopusFigure items={{}} />
        </svg>
      )}
      divider={
        <div className="bs-rule-comb" aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} className="bs-octagon" style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
