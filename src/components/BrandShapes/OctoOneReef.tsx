// AU · One Reef — different hands, one living thing. Four octopuses tend the
// four branches of one coral, taking turns: each adds a node where it is,
// and the core at the centre pulses with every step, because it's one
// organism growing from one heart, not four separate builds.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { Box, C, SceneSvg, Wide } from './draw';
import { OctopusFigure } from './Octopus';
import { OctoIn, ReefBackdrop, ROUND_NINE_NOTE } from './reefkit';
import { octagon, pts } from './symbols';

const CORE: [number, number] = [600, 300];
// The four branches, each a run of nodes stepping out at 45°.
const BRANCHES: [number, number][][] = [
  [[540, 250], [470, 250], [420, 200], [350, 200]],
  [[660, 250], [730, 250], [780, 200], [850, 200]],
  [[580, 226], [540, 186], [540, 126], [500, 86]],
  [[620, 226], [660, 186], [660, 126], [700, 86]],
];
const STEP = 0.8; // seconds between growth steps, round-robin across branches
const NODE_TONES = [C.mint, C.teal, C.bright, C.ivory];

export function OneReefScene({ view }: { view?: string }) {
  return (
    <SceneSvg view={view} className="bs-onereef" label="Four octopuses each growing a branch of one coral from a single glowing core">
      <ReefBackdrop />
      <Wide y={392} h={168} fill={C.navy} />
      <Box x={540} y={320} w={120} h={72} c={[30, 30, 0, 0]} fill="#163A5F" />
      {/* The branches: each segment and node appears on its turn. */}
      {BRANCHES.map((b, bi) =>
        b.map((p, k) => {
          const prev = k ? b[k - 1] : CORE;
          const step = k * 4 + bi;
          return (
            <g key={`${bi}-${k}`} style={{ '--t': `${(step * STEP).toFixed(1)}s` } as CSSProperties}>
              <polyline className="bs-or-seg" pathLength={1} points={pts([prev, p])} fill="none" stroke={C.teal} strokeWidth={8 - k * 1.2} strokeLinecap="round" />
              <polygon className="bs-or-node" points={pts(octagon(...p, 28 - k * 3))} fill={NODE_TONES[(k + bi) % NODE_TONES.length]} style={{ transformOrigin: `${p[0]}px ${p[1]}px` }} />
            </g>
          );
        }),
      )}
      {/* The one heart, pulsing with every step of growth. */}
      <polygon className="bs-or-pulse" points={pts(octagon(...CORE, 60))} fill="none" stroke={C.mint} strokeWidth={3} style={{ transformOrigin: `${CORE[0]}px ${CORE[1]}px` }} />
      <polygon points={pts(octagon(...CORE, 60))} fill={C.teal} />
      <polygon className="bs-or-heart" points={pts(octagon(...CORE, 26))} fill={C.mint} style={{ transformOrigin: `${CORE[0]}px ${CORE[1]}px` }} />
      {/* One octopus at each branch. */}
      <OctoIn x={110} y={150} w={230} />
      <OctoIn x={870} y={150} w={230} flip />
      <OctoIn x={300} y={-6} w={180} />
      <OctoIn x={720} y={-6} w={180} flip />
    </SceneSvg>
  );
}

export const ONE_REEF_COPY: TakeCopy = {
  key: 'AU',
  name: 'One Reef',
  headline: 'Different hands, one living thing.',
  lede: 'Four octopuses tend the four branches of one coral, taking turns, each adding where it is. The core at the centre pulses with every step, because it’s one organism growing from one heart.',
  says: 'Many people working from every side on the same thing, and it grows as one because it shares one core.',
};

export default function OctoOneReef() {
  return (
    <Board
      tone="night"
      header
      copy={ONE_REEF_COPY}
      note={ROUND_NINE_NOTE}
      hero={
        <div className="bs-frame bs-frame--night bs-frame--flush">
          <OneReefScene view="100 -10 1000 440" />
        </div>
      }
      mark={() => (
        <svg className="bs-svg" viewBox="0 0 480 360" role="img" aria-label="The octopus">
          <OctopusFigure items={{}} />
        </svg>
      )}
      divider={
        <div className="bs-rule-lights" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="bs-octagon" style={{ '--d': `${Math.abs(i - 4) * 0.4}s` } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
