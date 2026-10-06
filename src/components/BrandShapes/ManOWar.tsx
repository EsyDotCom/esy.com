// V · Man o' War — one body, many specialists. A Portuguese man o' war looks
// like one jellyfish but is a colony: some members float, some catch, some
// feed. A teal float rides the swell; under it, different kinds of tentacle,
// each built differently for its job, trail and sway.

import type { CSSProperties, ReactNode } from 'react';
import { Board } from './Board';
import { Box, C, Chain, ROUND_FOUR_NOTE, taper } from './draw';
import type { TakeCopy } from './symbols';

// The specialists: where each hangs from, how it's built, and what it carries.
const MEMBERS: { x: number; segs: ReturnType<typeof taper>; fill: (k: number) => string; tip?: ReactNode }[] = [
  { x: 186, segs: taper(9, 16, 6, 4), fill: () => C.ivory },
  { x: 204, segs: taper(5, 18, 14, 9), fill: (k) => (k % 2 ? C.mint : C.teal), tip: <Box x={-8} y={2} w={16} h={16} c={5} fill={C.bright} /> },
  { x: 222, segs: taper(8, 18, 8, 5), fill: (k) => (k % 3 === 2 ? C.mint : C.deep) },
  { x: 240, segs: taper(3, 16, 18, 14), fill: () => C.teal, tip: <Box x={-10} y={2} w={20} h={24} c={[0, 7, 0, 0]} fill={C.ivory} /> },
  { x: 258, segs: taper(10, 15, 5, 3), fill: () => C.ivory },
  { x: 276, segs: taper(6, 17, 12, 7), fill: (k) => (k % 2 ? C.bright : C.deep), tip: <Box x={-9} y={2} w={18} h={14} c={4} fill={C.mint} /> },
  { x: 294, segs: taper(8, 16, 7, 4), fill: (k) => (k % 2 ? C.ivory : C.teal) },
];

export function Colony({ small = false }: { small?: boolean }) {
  return (
    <svg className="bs-svg bs-mow" viewBox="0 0 480 360" role="img" aria-label="A man o' war: a teal float with many different tentacles trailing beneath">
      <rect width={480} height={360} fill="#061527" />
      <Box x={0} y={0} w={480} h={96} fill="#0A2540" />
      {[0, 1, 2].map((n) => (
        <Box key={n} className="bs-mow-swell" x={n * 200 - 60} y={94} w={150} h={5} c={2} fill={C.deep} style={{ '--n': n } as CSSProperties} />
      ))}
      {!small &&
        [0, 1, 2, 3].map((n) => (
          <Box key={`b${n}`} className="bs-oct-bubble" x={120 + n * 74} y={330} w={8 + (n % 2) * 4} h={8 + (n % 2) * 4} c={3} fill="none" stroke={C.mint} strokeWidth={1.5} style={{ '--n': n } as CSSProperties} />
        ))}
      <g className="bs-mow-body">
        {MEMBERS.map((m, n) => (
          <g key={n} transform={`translate(${m.x} 120)`}>
            <Chain segs={m.segs} gap={3} className="bs-mow-seg" vars={{ '--a': n, '--amp': `${5 + (n % 3) * 2}deg` }} fill={m.fill} tip={m.tip} />
          </g>
        ))}
        {/* The float: a sail-crested bladder riding the surface. */}
        <g className="bs-mow-float" style={{ transformOrigin: '240px 122px' }}>
          <Box x={164} y={74} w={152} h={52} c={[40, 30, 10, 14]} fill={C.teal} opacity={0.92} />
          <polygon points="196,78 214,48 232,70 250,42 268,66 284,52 296,78" fill={C.mint} />
          <Box x={182} y={102} w={116} h={6} c={3} fill={C.bright} opacity={0.7} />
          <Box x={276} y={86} w={10} h={10} c={3} fill={C.ivory} />
        </g>
      </g>
    </svg>
  );
}

export const MOW_COPY: TakeCopy = {
  key: 'V',
  name: 'Man o’ War',
  headline: 'One body, many specialists.',
  lede: 'A Portuguese man o’ war looks like one jellyfish but is a colony: some members keep it afloat, some catch, some feed, each built for its job. Under the teal float, every tentacle is a different kind.',
  says: 'Specialist agents working as one organism. Each does one job well; together they move as one thing.',
};

export default function ManOWar() {
  return (
    <Board
      tone="night"
      copy={MOW_COPY}
      note={ROUND_FOUR_NOTE}
      hero={
        <div className="bs-frame bs-frame--night bs-frame--flush">
          <Colony />
        </div>
      }
      mark={() => <Colony small />}
      divider={
        <div className="bs-rule-sea" aria-hidden="true">
          <span className="bs-rule-sea-beam" />
        </div>
      }
    />
  );
}
