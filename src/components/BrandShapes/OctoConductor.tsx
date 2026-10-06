'use client';

// AG · Conductor — many agents, one tempo. The octopus stands on its rock with
// batons in four arms, every arm keeping the same time, while twenty-four fish
// move together: notes on a stave, then an octagon, then a V heading out.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { Box, C, SceneSvg, Wide } from './draw';
import { FriendlyOcto, HELD, LookHero, OctoAt, ROUND_SIX_NOTE, type OctoLook } from './octo';
import { octagon, pts } from './symbols';

const N = 24;
const STAVE = [56, 80, 104, 128, 152];

// Three formations for every fish: notes on the stave, an octagon ring, a V.
const FORMATIONS = Array.from({ length: N }, (_, i) => {
  const note: [number, number] = [150 + i * 38, STAVE[(i * 3) % 5] - 13];
  const ring = (() => {
    // The ring goes around the conductor, not through it.
    const corners = octagon(600, 222, 350);
    const side = Math.floor((i / N) * 8);
    const t = (i / N) * 8 - side;
    const [ax, ay] = corners[side];
    const [bx, by] = corners[(side + 1) % 8];
    return [ax + (bx - ax) * t, ay + (by - ay) * t] as [number, number];
  })();
  const arm = i % 2 ? 1 : -1;
  const rank = Math.floor(i / 2);
  const vee: [number, number] = [960 - rank * 30, 150 + arm * rank * 12];
  return { note, ring, vee };
});

const BATONS = { 0: HELD.baton, 2: HELD.baton, 5: HELD.baton, 7: HELD.baton };

/** A small fish facing right, centred on (0, 0). */
function Fish({ tone }: { tone: string }) {
  return (
    <g>
      <polygon points="-11,0 -19,-6 -19,6" fill={C.teal} />
      <Box x={-12} y={-5} w={23} h={10} c={[3, 5, 5, 3]} fill={tone} />
      <Box x={5} y={-2.5} w={3} h={3} fill={C.navy} />
    </g>
  );
}

export function ConductorScene({ view, look = 'friendly' }: { view?: string; look?: OctoLook }) {
  const r = (n: number) => `${n.toFixed(1)}px`;
  return (
    <SceneSvg view={view} className="bs-con" label="An octopus conducting schools of fish that move together through formations">
      <defs>
        <linearGradient id="bs-con-water" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0F5468" />
          <stop offset="0.6" stopColor="#0A2E48" />
          <stop offset="1" stopColor="#061527" />
        </linearGradient>
      </defs>
      <Wide y={0} h={560} fill="url(#bs-con-water)" />
      {[140, 480, 820, 1060].map((x, n) => (
        <polygon key={n} className="bs-reef-ray" points={`${x},0 ${x + 90},0 ${x + 70},380 ${x + 30},380`} fill={C.mint} style={{ '--n': n } as CSSProperties} />
      ))}
      {/* The stave the fish start on. */}
      {STAVE.map((y) => (
        <Box key={y} x={100} y={y} w={1000} h={2} fill={C.ivory} opacity={0.12} />
      ))}
      <Wide y={380} h={180} fill={C.navy} />
      {/* The podium rock and the conductor on it. */}
      <Box x={500} y={318} w={200} h={70} c={[30, 30, 0, 0]} fill="#163A5F" />
      <OctoAt x={470} y={142} w={260} look={look} items={BATONS} sync />
      {/* The orchestra: each fish moves through the three formations together. */}
      {FORMATIONS.map((f, i) => (
        <g
          key={i}
          className="bs-con-fish"
          style={{ '--ax': r(f.note[0]), '--ay': r(f.note[1]), '--bx': r(f.ring[0]), '--by': r(f.ring[1]), '--cx': r(f.vee[0]), '--cy': r(f.vee[1]), '--i': i } as CSSProperties}
        >
          <g className="bs-reef-fish" style={{ '--n': i % 6 } as CSSProperties}>
            <Fish tone={i % 4 === 0 ? C.bright : C.ivory} />
          </g>
        </g>
      ))}
      {/* Kelp at the edges of the hall. */}
      {[60, 1140].map((x, n) => (
        <g key={n}>
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <Box key={k} className="bs-con-kelp" x={x - 8 + (k % 2) * 4} y={360 - k * 34} w={16 - k} h={30} c={[6, 6, 0, 0]} fill={k % 2 ? C.deep : '#0F6B63'} style={{ transformOrigin: `${x}px 390px`, '--n': n } as CSSProperties} />
          ))}
        </g>
      ))}
    </SceneSvg>
  );
}

export const CONDUCTOR_COPY: TakeCopy = {
  key: 'AG',
  name: 'Conductor',
  headline: 'Many agents, one tempo.',
  lede: 'The octopus stands on its rock with batons in four arms, every arm keeping the same time. Twenty-four fish move together: notes on a stave, then an octagon, then a V heading out.',
  says: 'Orchestration you can trust: many agents, each with its part, kept in time by one head so the whole thing moves as one.',
};

export default function OctoConductor() {
  return (
    <Board
      tone="night"
      copy={CONDUCTOR_COPY}
      note={ROUND_SIX_NOTE}
      hero={<LookHero night scene={(look) => <ConductorScene view="300 30 600 440" look={look} />} />}
      mark={() => <FriendlyOcto items={BATONS} sync />}
      divider={
        <div className="bs-rule-stave" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} style={{ '--i': i, '--row': (i * 3) % 5 } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
