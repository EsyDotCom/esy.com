// W · Octopus Reef — the keeper of the garden. Real octopuses collect shells
// and stones and arrange them around their dens. Ours sits on its rock in a
// reef: light rays, swaying kelp, coral, two fish schools, rising bubbles, and
// a chest of glowing finished work that opens every few seconds.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { Box, C, Chain, ROUND_FIVE_NOTE, SceneSvg, taper, Wide } from './draw';
import { OctopusFigure } from './octopus-figure';
import { Fish, Kelp, SCHOOL } from './reefkit';
import { noise, octagon, pts } from './symbols';

export function ReefScene({ view }: { view?: string }) {
  return (
    <SceneSvg view={view} className="bs-reef" label="An octopus keeping its garden in a reef, with kelp, coral, fish and a chest of glowing work">
      <defs>
        <linearGradient id="bs-reef-water" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0E4A5C" />
          <stop offset="0.6" stopColor="#0A2E48" />
          <stop offset="1" stopColor="#061527" />
        </linearGradient>
      </defs>
      <Wide y={0} h={560} fill="url(#bs-reef-water)" />
      {/* Light from the surface, breathing. */}
      {[120, 360, 640, 880, 1100].map((x, n) => (
        <polygon key={n} className="bs-reef-ray" points={`${x},0 ${x + 90},0 ${x + 70},400 ${x + 30},400`} fill={C.mint} style={{ '--n': n } as CSSProperties} />
      ))}
      <Wide y={0} h={6} fill={C.mint} className="bs-reef-surface" />
      {/* Far reef, then the sand. */}
      <polygon points="-2400,330 120,330 170,290 300,290 340,320 760,320 800,280 980,280 1020,320 3600,320 3600,400 -2400,400" fill="#0C3550" />
      <Wide y={380} h={180} fill={C.navy} />
      {[60, 210, 330, 760, 1000, 1150].map((x, n) => (
        <Box key={n} x={x} y={392 + (n % 2) * 6} w={34} h={4} c={2} fill="#163A5F" />
      ))}
      {/* Kelp at both edges. */}
      <Kelp x={60} y={392} n={0} len={11} />
      <Kelp x={110} y={392} n={1} len={8} />
      <Kelp x={1090} y={392} n={2} len={10} />
      <Kelp x={1140} y={392} n={3} len={12} />
      {/* Coral: branching, a fan, brain coral, tubes. */}
      <g className="bs-reef-sway" style={{ transformOrigin: '220px 390px' }}>
        <Box x={214} y={300} w={12} h={90} fill={C.bright} />
        <Box x={196} y={318} w={10} h={46} r={-30} fill={C.bright} />
        <Box x={236} y={326} w={10} h={40} r={32} fill={C.bright} />
        <Box x={182} y={300} w={9} h={28} r={-12} fill={C.mint} />
        <Box x={250} y={306} w={9} h={26} r={14} fill={C.mint} />
      </g>
      <polygon points={pts(octagon(318, 368, 52))} fill={C.teal} />
      <polygon points={pts(octagon(318, 368, 30))} fill="none" stroke="#0F6B63" strokeWidth={4} />
      <g className="bs-reef-sway bs-reef-sway--slow" style={{ transformOrigin: '900px 390px' }}>
        {[-60, -40, -20, 0, 20, 40, 60].map((d) => (
          <Box key={d} x={897} y={300} w={6} h={90} fill={C.mint} opacity={0.75} transform={`rotate(${d} 900 390)`} />
        ))}
      </g>
      {[0, 1, 2, 3].map((n) => (
        <g key={n}>
          <Box x={800 + n * 18} y={330 + (n % 2) * 20} w={14} h={60 - (n % 2) * 20} fill={C.ivory} />
          <Box x={800 + n * 18} y={330 + (n % 2) * 20} w={14} h={6} fill={C.bright} />
        </g>
      ))}
      <polygon points={pts(octagon(1010, 372, 40))} fill={C.deep} />
      {/* The chest of finished work: the lid lifts, the glow rises. */}
      <g transform="translate(372 334)">
        <polygon className="bs-reef-glow" points="8,0 64,0 92,-90 -20,-90" fill={C.mint} />
        <Box x={14} y={-14} w={14} h={18} c={[0, 5, 0, 0]} fill={C.ivory} className="bs-reef-card" style={{ '--n': 0 } as CSSProperties} />
        <Box x={32} y={-18} w={14} h={18} c={[0, 5, 0, 0]} fill={C.ivory} className="bs-reef-card" style={{ '--n': 1 } as CSSProperties} />
        <Box x={50} y={-12} w={14} h={18} c={[0, 5, 0, 0]} fill={C.ivory} className="bs-reef-card" style={{ '--n': 2 } as CSSProperties} />
        <Box x={0} y={0} w={78} h={46} c={[0, 0, 8, 8]} fill="#163A5F" />
        <Box x={0} y={14} w={78} h={5} fill={C.teal} />
        <Box x={34} y={10} w={10} h={14} c={3} fill={C.bright} />
        <g className="bs-reef-lid" style={{ transformOrigin: '0px 0px' }}>
          <Box x={0} y={-16} w={78} h={16} c={[10, 10, 0, 0]} fill="#1E4A72" />
        </g>
      </g>
      {/* The den rock, the octopus on it, and the garden it keeps in front. */}
      <Box x={470} y={292} w={270} h={98} c={[44, 44, 0, 0]} fill="#163A5F" />
      <svg x={470} y={96} width={270} height={203} viewBox="0 0 480 360">
        <OctopusFigure />
      </svg>
      {[500, 540, 584, 628, 670, 708].map((x, n) => (
        <polygon key={n} points={pts(octagon(x, 384, n % 2 ? 14 : 18))} fill={n % 3 === 0 ? C.ivory : n % 3 === 1 ? C.mint : C.bright} />
      ))}
      {/* Two schools crossing, one each way. */}
      <g className="bs-reef-school bs-reef-school--a">
        {SCHOOL.map(([x, y], n) => (
          <g key={n} transform={`translate(${x} ${y})`}>
            <g className="bs-reef-fish" style={{ '--n': n } as CSSProperties}>
              <Fish />
            </g>
          </g>
        ))}
      </g>
      <g className="bs-reef-school bs-reef-school--b">
        {SCHOOL.slice(0, 5).map(([x, y], n) => (
          <g key={n} transform={`translate(${x * 1.3} ${y * 1.3}) scale(1.3)`}>
            <g className="bs-reef-fish" style={{ '--n': n } as CSSProperties}>
              <Fish tone={C.bright} fin={C.ivory} />
            </g>
          </g>
        ))}
      </g>
      {/* Bubbles from the den and a vent. */}
      {Array.from({ length: 9 }, (_, n) => (
        <polygon
          key={n}
          className="bs-reef-bubble"
          points={pts(octagon(n < 5 ? 640 + noise(n) * 30 : 1010 + noise(n) * 10, 300, 8 + (n % 3) * 3))}
          fill="none"
          stroke={C.mint}
          strokeWidth={1.5}
          style={{ '--n': n } as CSSProperties}
        />
      ))}
    </SceneSvg>
  );
}

export const REEF_COPY: TakeCopy = {
  key: 'W',
  name: 'Octopus Reef',
  headline: 'The keeper of the garden.',
  lede: 'Real octopuses collect shells and stones and arrange them around their dens. Ours sits on its rock in the reef, arms busy, with a chest of finished work that glows each time it opens.',
  says: 'One head running many things, and a keeper: Esy holds on to what it makes, arranged so you can find it.',
};

export default function OctoReef() {
  return (
    <Board
      tone="night"
      copy={REEF_COPY}
      note={ROUND_FIVE_NOTE}
      hero={
        <div className="bs-frame bs-frame--night bs-frame--flush">
          <ReefScene view="300 40 560 420" />
        </div>
      }
      mark={() => (
        <svg className="bs-svg" viewBox="0 0 480 360" role="img" aria-label="The octopus">
          <OctopusFigure />
        </svg>
      )}
      divider={
        <div className="bs-rule-kelp" aria-hidden="true">
          {Array.from({ length: 36 }, (_, i) => (
            <span key={i} style={{ '--i': i, height: `${14 + (i % 5) * 5}px` } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
