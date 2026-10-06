'use client';

// AH · Lighthouse Keeper — always on, built all the way down. A split world:
// above the waterline the octopus keeps the light, lantern in one arm and the
// log in another, the beam sweeping over passing boats; below it, the rock
// and its stone foundation run to the seabed, with the old logs kept dry in a
// niche, fish and kelp around them.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { Box, C, Diamond, SceneSvg, Wide } from './draw';
import { FriendlyOcto, HELD, LookHero, OctoAt, ROUND_SIX_NOTE, type OctoLook } from './octo';
import { noise, octagon, pts } from './symbols';

const WATER = 240;
const LAMP: [number, number] = [600, 40];
const STARS = Array.from({ length: 36 }, (_, n) => ({ x: +(Math.abs(noise(n + 11)) * 1200).toFixed(1), y: +(Math.abs(noise(n + 33)) * 190).toFixed(1), s: +(1.5 + Math.abs(noise(n)) * 2).toFixed(1) }));

function Boat({ n }: { n: number }) {
  return (
    <g className={`bs-keep-boat bs-keep-boat--${n}`}>
      <g className="bs-lh-bob">
        <polygon points="0,-34 0,-6 22,-6" fill={n === 1 ? C.mint : C.teal} />
        <Box x={-3} y={-36} w={3} h={32} fill={C.ivory} />
        <Box x={-18} y={-6} w={46} h={12} c={[0, 0, 8, 8]} fill={C.ivory} />
      </g>
    </g>
  );
}

export function KeeperScene({ view, look = 'friendly' }: { view?: string; look?: OctoLook }) {
  return (
    <SceneSvg view={view} className="bs-keep" label="An octopus keeping a lighthouse lit above the water, its foundation running down to the seabed below">
      <defs>
        <linearGradient id="bs-keep-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#061527" />
          <stop offset="1" stopColor="#0E3354" />
        </linearGradient>
        <linearGradient id="bs-keep-sea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0E4A5C" />
          <stop offset="1" stopColor="#061527" />
        </linearGradient>
        <linearGradient id="bs-keep-beam" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={C.mint} stopOpacity="0.7" />
          <stop offset="1" stopColor={C.mint} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Above: the night, the beam, the boats. */}
      <Wide y={0} h={WATER} fill="url(#bs-keep-sky)" />
      {STARS.map((s, n) => (
        <Diamond key={n} className="bs-sky-twinkle" x={s.x} y={s.y} s={s.s} fill={C.ivory} style={{ '--n': n } as CSSProperties} />
      ))}
      <polygon points={pts(octagon(1060, 70, 56))} fill={C.ivory} />
      <polygon className="bs-lh-beam" points={`${LAMP[0]},${LAMP[1] - 6} 1200,${LAMP[1] - 50} 1200,${LAMP[1] + 50} ${LAMP[0]},${LAMP[1] + 6}`} fill="url(#bs-keep-beam)" style={{ transformOrigin: `${LAMP[0]}px ${LAMP[1]}px` }} />
      {/* Below: the sea, down to the bed. */}
      <Wide y={WATER} h={560 - WATER} fill="url(#bs-keep-sea)" />
      <Wide y={WATER} h={4} fill={C.mint} className="bs-reef-surface" />
      {[0, 1].map((n) => (
        <g key={n} className="bs-lh-swell" style={{ '--n': n } as CSSProperties}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => (
            <Box key={k} x={k * 160 - 80 + n * 60} y={WATER - 6 + n * 12} w={70} h={3} c={1.5} fill={n ? C.deep : C.teal} />
          ))}
        </g>
      ))}
      <Wide y={392} h={168} fill={C.navy} />
      {/* Boats pass behind the rock. */}
      {[0, 1, 2].map((n) => (
        <Boat key={n} n={n} />
      ))}
      {/* The rock, above and below the water, and the foundation courses inside it. */}
      <polygon points="470,392 470,250 500,206 700,206 730,250 730,392" fill="#163A5F" />
      {[262, 296, 330, 364].map((y, n) => (
        <g key={y}>
          {[0, 1, 2].map((k) => (
            <Box key={k} x={492 + k * 74 + (n % 2) * 30} y={y} w={66} h={26} c={[6, 0, 6, 0]} fill="#1E4A72" />
          ))}
        </g>
      ))}
      {/* The old logs, kept dry in a niche. */}
      <Box x={492} y={300} w={64} h={58} c={[10, 10, 0, 0]} fill="#0A2540" />
      {[0, 1, 2].map((k) => (
        <Box key={k} className="bs-keep-log" x={500 + k * 18} y={318} w={14} h={36} c={[0, 4, 0, 0]} fill={k === 1 ? C.teal : C.ivory} style={{ '--n': k } as CSSProperties} />
      ))}
      {/* The tower: stepped bands, gallery, lantern, roof. */}
      <Box x={540} y={168} w={120} h={40} fill={C.ivory} />
      <Box x={546} y={128} w={108} h={38} fill={C.teal} />
      <Box x={552} y={88} w={96} h={38} fill={C.ivory} />
      <Box x={588} y={176} w={24} h={30} c={[12, 12, 0, 0]} fill={C.navy} />
      <Box x={540} y={74} w={120} h={12} c={[0, 0, 5, 5]} fill={C.ivory} />
      <Box className="bs-lh-lamp" x={578} y={24} w={44} h={50} fill={C.mint} />
      <Box x={590} y={24} w={4} h={50} fill="#061527" opacity={0.35} />
      <Box x={606} y={24} w={4} h={50} fill="#061527" opacity={0.35} />
      <Box x={572} y={2} w={56} h={24} c={[22, 22, 0, 0]} fill={C.ivory} />
      {/* The keeper, on the gallery. */}
      <OctoAt x={630} y={-6} w={130} look={look} items={{ 0: HELD.lantern, 7: HELD.logbook }} />
      {/* Life below: kelp, a school, bubbles off the rock. */}
      {[180, 240, 960, 1030].map((x, n) => (
        <g key={n}>
          {[0, 1, 2, 3, 4].map((k) => (
            <Box key={k} className="bs-con-kelp" x={x - 7 + (k % 2) * 4} y={364 - k * 30} w={14 - k} h={26} c={[6, 6, 0, 0]} fill={k % 2 ? C.deep : '#0F6B63'} style={{ transformOrigin: `${x}px 392px`, '--n': n } as CSSProperties} />
          ))}
        </g>
      ))}
      <g className="bs-keep-school">
        {[[0, 0], [-30, -14], [-30, 14], [-60, -24], [-60, 4], [-60, 30]].map(([x, y], n) => (
          <g key={n} transform={`translate(${x} ${y})`}>
            <g className="bs-reef-fish" style={{ '--n': n } as CSSProperties}>
              <polygon points="-11,0 -19,-6 -19,6" fill={C.teal} />
              <Box x={-12} y={-5} w={23} h={10} c={[3, 5, 5, 3]} fill={C.ivory} />
            </g>
          </g>
        ))}
      </g>
      {[0, 1, 2, 3].map((n) => (
        <polygon key={n} className="bs-reef-bubble" points={pts(octagon(720 + n * 8, 380, 8 + (n % 2) * 4))} fill="none" stroke={C.mint} strokeWidth={1.5} style={{ '--n': n } as CSSProperties} />
      ))}
    </SceneSvg>
  );
}

export const KEEPER_COPY: TakeCopy = {
  key: 'AH',
  name: 'Lighthouse Keeper',
  headline: 'Always on, built all the way down.',
  lede: 'Above the water, the octopus keeps the light, lantern in one arm and the log in another, while boats pass in the beam. Below it, the rock’s stone courses run to the seabed, with the old logs kept dry in a niche.',
  says: 'Reliability: the light stays on, the log stays written, and what holds it up goes all the way down.',
};

export default function OctoKeeper() {
  return (
    <Board
      tone="night"
      copy={KEEPER_COPY}
      note={ROUND_SIX_NOTE}
      hero={<LookHero night scene={(look) => <KeeperScene view="320 0 560 420" look={look} />} />}
      mark={() => <FriendlyOcto items={{ 0: HELD.lantern, 7: HELD.logbook }} />}
      divider={
        <div className="bs-rule-sea" aria-hidden="true">
          <span className="bs-rule-sea-beam" />
        </div>
      }
    />
  );
}
