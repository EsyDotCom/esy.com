// AT · The Relay — handed on, nothing lost. Five octopuses on their rocks
// pass one piece arm to arm across the reef. It's refined a little at each
// handoff (rough, outlined, filled, given a heart, finished), and a mint
// thread trails it the whole way, so where it's been never comes loose.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { Box, C, SceneSvg, Wide } from './draw';
import { OctopusFigure } from './Octopus';
import { OctoIn, ReefBackdrop, ROUND_NINE_NOTE, Shell } from './reefkit';
import { octagon, pts } from './symbols';

// The five octopuses: left edge, top, and which way they face.
const CREW = [
  { x: 40, y: 196, flip: false },
  { x: 268, y: 160, flip: true },
  { x: 496, y: 204, flip: false },
  { x: 724, y: 164, flip: true },
  { x: 952, y: 200, flip: false },
];
const W = 200;
// Where each one holds the piece up, and where it ends.
const HANDS: [number, number][] = CREW.map((c) => [c.x + W / 2 + 4, c.y + 18]);
const END: [number, number] = [1120, 352];
/** The whole route: each handoff with an arc over the gap between octopuses. */
const ROUTE: [number, number][] = HANDS.flatMap((h, i): [number, number][] => {
  const next = HANDS[i + 1] ?? END;
  return [h, [(h[0] + next[0]) / 2, Math.min(h[1], next[1]) - 46]];
}).concat([END]);

export function RelayScene({ view }: { view?: string }) {
  const r = (n: number) => `${n.toFixed(1)}px`;
  // The piece's waypoints as CSS variables, read by the relay keyframes.
  const vars = Object.fromEntries(ROUTE.flatMap(([x, y], i) => [[`--x${i}`, r(x)], [`--y${i}`, r(y)]]));
  return (
    <SceneSvg view={view} className="bs-relay" label="Five octopuses passing one piece arm to arm, refining it, a thread trailing behind">
      <ReefBackdrop kelp={false} />
      <Wide y={392} h={168} fill={C.navy} />
      {/* Rocks for each of them, and the finished row at the end. */}
      {CREW.map((c, n) => (
        <Box key={n} x={c.x + 40} y={c.y + 140} w={W - 80} h={392 - (c.y + 140)} c={[24, 24, 0, 0]} fill="#163A5F" />
      ))}
      <Box x={1080} y={372} w={110} h={8} fill="#1E4A72" />
      {[1100, 1132].map((x) => (
        <Shell key={x} x={x} y={352} s={30} tone={C.ivory} heart={C.mint} />
      ))}
      {/* The thread: every place the piece has been, drawn as it goes. */}
      <polyline className="bs-relay-thread" pathLength={1} points={pts(ROUTE)} fill="none" stroke={C.mint} strokeWidth={2} strokeDasharray="1" />
      {CREW.map((c, n) => (
        <OctoIn key={n} x={c.x} y={c.y} w={W} flip={c.flip} />
      ))}
      {/* The piece, refined at each handoff. */}
      <g className="bs-relay-piece" style={vars as CSSProperties}>
        <polygon className="bs-relay-l0" points="-14,-10 -4,-17 12,-12 16,2 6,15 -10,13 -17,2" fill="#9FB3C2" />
        <polygon className="bs-relay-l1" points={pts(octagon(0, 0, 32))} fill="none" stroke={C.teal} strokeWidth={4} />
        <polygon className="bs-relay-l2" points={pts(octagon(0, 0, 32))} fill={C.teal} />
        <polygon className="bs-relay-l3" points={pts(octagon(0, 0, 14))} fill={C.mint} />
        <polygon className="bs-relay-l4" points={pts(octagon(0, 0, 32))} fill="none" stroke={C.ivory} strokeWidth={3} />
      </g>
    </SceneSvg>
  );
}

export const RELAY_COPY: TakeCopy = {
  key: 'AT',
  name: 'The Relay',
  headline: 'Handed on, nothing lost.',
  lede: 'Five octopuses pass one piece arm to arm across the reef. It’s refined a little at each handoff, and a mint thread trails it the whole way, so where it has been never comes loose.',
  says: 'Work changes hands between people and tools; Esy keeps its context with it at every handoff.',
};

export default function OctoRelay() {
  return (
    <Board
      tone="night"
      header
      copy={RELAY_COPY}
      note={ROUND_NINE_NOTE}
      hero={
        <div className="bs-frame bs-frame--night bs-frame--flush">
          <RelayScene view="20 60 1180 400" />
        </div>
      }
      mark={() => (
        <svg className="bs-svg" viewBox="0 0 480 360" role="img" aria-label="The octopus">
          <OctopusFigure items={{}} />
        </svg>
      )}
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
