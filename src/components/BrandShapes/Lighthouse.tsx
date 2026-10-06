// O · Lighthouse — the fixed point everything steers by. A stepped stencil
// tower on its rock, the lantern pulsing, a beam sweeping the dark, boats
// crossing on the swell and stars blinking. The one take that's an object.

import type { CSSProperties } from 'react';
import { Board } from './Board';
import { Box, C, MASCOT_NOTE, pivot } from './draw';
import { noise, type TakeCopy } from './symbols';

const LAMP: [number, number] = [230, 134];

const STARS = Array.from({ length: 14 }, (_, n) => ({
  x: +(20 + Math.abs(noise(n)) * 440).toFixed(1),
  y: +(14 + Math.abs(noise(n + 9)) * 120).toFixed(1),
  s: +(3 + Math.abs(noise(n + 3)) * 3).toFixed(1),
}));

/** A small boat: a diagonal-cut hull and one sail. Each one is a tool out on the water. */
function Boat({ n }: { n: number }) {
  return (
    <g className={`bs-lh-boat bs-lh-boat--${n}`}>
      <g className="bs-lh-bob">
        <polygon points="0,-34 0,-6 22,-6" fill={n === 1 ? C.mint : C.teal} />
        <Box x={-3} y={-36} w={3} h={32} fill={C.ivory} />
        <Box x={-18} y={-6} w={46} h={12} c={[0, 0, 8, 8]} fill={C.ivory} />
      </g>
    </g>
  );
}

function Scene({ small = false }: { small?: boolean }) {
  return (
    <svg className={`bs-svg bs-lh${small ? ' bs-lh--small' : ''}`} viewBox="0 0 480 360" role="img" aria-label="A stencil lighthouse sweeping its beam over boats at night">
      <rect width={480} height={360} fill="#061527" />
      <defs>
        <linearGradient id="bs-lh-beam" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={C.mint} stopOpacity="0.75" />
          <stop offset="1" stopColor={C.mint} stopOpacity="0" />
        </linearGradient>
      </defs>
      {STARS.map((s, i) => (
        <rect key={i} className="bs-lh-star" x={s.x} y={s.y} width={s.s} height={s.s} fill={C.ivory} transform={`rotate(45 ${s.x + s.s / 2} ${s.y + s.s / 2})`} style={{ '--n': i } as CSSProperties} />
      ))}
      {/* The beam sweeps by flipping through edge-on, so it reads as turning. */}
      <polygon className="bs-lh-beam" points={`${LAMP[0]},${LAMP[1] - 6} 480,${LAMP[1] - 46} 480,${LAMP[1] + 40} ${LAMP[0]},${LAMP[1] + 6}`} fill="url(#bs-lh-beam)" style={pivot(...LAMP)} />
      {/* Tower: stepped bands, narrower as they rise. */}
      <Box x={150} y={308} w={160} h={22} c={[11, 11, 0, 0]} fill={C.deep} />
      <Box x={190} y={262} w={80} h={42} fill={C.ivory} />
      <Box x={196} y={220} w={68} h={38} fill={C.teal} />
      <Box x={202} y={178} w={56} h={38} fill={C.ivory} />
      <Box x={222} y={274} w={16} h={22} c={[8, 8, 0, 0]} fill={C.navy} />
      <Box x={192} y={162} w={76} h={12} c={[0, 0, 4, 4]} fill={C.ivory} />
      <Box className="bs-lh-lamp" x={210} y={120} w={40} h={38} fill={C.mint} />
      <Box x={222} y={120} w={4} h={38} fill="#061527" opacity={0.35} />
      <Box x={234} y={120} w={4} h={38} fill="#061527" opacity={0.35} />
      <Box x={204} y={96} w={52} h={24} c={[22, 22, 0, 0]} fill={C.ivory} />
      <Box x={227} y={84} w={6} h={12} c={[3, 3, 0, 0]} fill={C.ivory} />
      {/* Sea: swell lines drifting under the boats. */}
      {[0, 1, 2].map((n) => (
        <g key={n} className="bs-lh-swell" style={{ '--n': n } as CSSProperties}>
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <Box key={k} x={k * 160 - 80 + n * 50} y={318 + n * 13} w={90 - n * 14} h={4} c={2} fill={n === 0 ? C.teal : C.deep} />
          ))}
        </g>
      ))}
      {!small && [0, 1, 2].map((n) => <Boat key={n} n={n} />)}
    </svg>
  );
}

export const LIGHTHOUSE_COPY: TakeCopy = {
  key: 'O',
  name: 'Lighthouse',
  headline: 'The fixed point everything steers by.',
  lede: 'A lighthouse doesn’t move. It stands on its rock and keeps the light on, so every boat can find its way, whatever it’s carrying and wherever it’s headed.',
  says: 'Esy is the source of truth your tools steer by. It holds still and keeps the record so everything else can move.',
};

export default function Lighthouse() {
  return (
    <Board
      tone="night"
      copy={LIGHTHOUSE_COPY}
      note={MASCOT_NOTE}
      hero={
        <div className="bs-frame bs-frame--night bs-frame--flush">
          <Scene />
        </div>
      }
      mark={() => <Scene small />}
      divider={
        <div className="bs-rule-sea" aria-hidden="true">
          <span className="bs-rule-sea-beam" />
        </div>
      }
    />
  );
}
