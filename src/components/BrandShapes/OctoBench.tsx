// R · Octopus Workbench — one head, six jobs at once. The octopus sits over a
// bench, each arm reaching a different station: typing, drawing, filming,
// stamping a check, sending, charting. Every station runs its own loop.

import type { CSSProperties } from 'react';
import { Board } from './Board';
import { Box, C, ROUND_FOUR_NOTE } from './draw';
import type { TakeCopy } from './symbols';

const JOBS = ['Writing', 'Clip art', 'Films', 'Checks', 'Email', 'Reports'];
const STATION_X = [46, 124, 202, 278, 356, 434];
// Where each arm's tip lands on its station.
const TIPS: [number, number][] = [[46, 250], [124, 236], [202, 222], [278, 206], [356, 236], [434, 246]];

/** An arm reaching from (bx, by) to its tip: segments laid along a drooping curve, each turned to the curve. */
function Reach({ i, bx, by, tx, ty }: { i: number; bx: number; by: number; tx: number; ty: number }) {
  const cx = bx + (tx - bx) * 0.3;
  const cy = Math.max(by, ty) + 34;
  const n = 7;
  const at = (t: number) => [(1 - t) ** 2 * bx + 2 * (1 - t) * t * cx + t * t * tx, (1 - t) ** 2 * by + 2 * (1 - t) * t * cy + t * t * ty];
  return (
    <g className="bs-bench-arm" style={{ transformOrigin: `${bx}px ${by}px`, '--a': i } as CSSProperties}>
      {Array.from({ length: n }, (_, k) => {
        const [x0, y0] = at(k / n);
        const [x1, y1] = at((k + 1) / n);
        const len = Math.hypot(x1 - x0, y1 - y0) - 3;
        const w = 17 - k * 1.2;
        const deg = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
        return <Box key={k} x={(x0 + x1) / 2 - len / 2} y={(y0 + y1) / 2 - w / 2} w={len} h={w} c={[0, w * 0.35, w * 0.35, 0]} r={deg} fill={k === n - 1 ? C.bright : i % 2 ? C.deep : C.navy} />;
      })}
    </g>
  );
}

export function Bench() {
  return (
    <svg className="bs-svg bs-bench" viewBox="0 0 480 360" role="img" aria-label="An octopus at a bench, each arm doing a different job at once">
      {/* Writing: a laptop, lines typing themselves. */}
      <Box x={20} y={212} w={52} h={40} c={[5, 5, 0, 0]} fill={C.navy} />
      {[0, 1, 2].map((n) => (
        <Box key={n} className="bs-bench-type" x={27} y={221 + n * 9} w={36 - n * 8} h={4} fill={C.mint} style={{ '--n': n, transformOrigin: '27px 0' } as CSSProperties} />
      ))}
      <Box x={14} y={252} w={64} h={8} c={[0, 0, 4, 4]} fill={C.ink} />
      {/* Clip art: a canvas, a shape drawing itself. */}
      <Box x={98} y={194} w={52} h={50} c={[6, 0, 6, 0]} fill={C.ivory} stroke={C.navy} strokeWidth={2} />
      <polygon className="bs-bench-draw" pathLength={1} points="114,206 134,206 142,214 142,228 134,236 114,236 106,228 106,214" fill="none" stroke={C.teal} strokeWidth={4} />
      <Box x={104} y={244} w={4} h={18} fill={C.navy} />
      <Box x={140} y={244} w={4} h={18} fill={C.navy} />
      {/* Films: a clapperboard that claps. */}
      <Box x={178} y={218} w={48} h={34} c={[0, 0, 6, 6]} fill={C.navy} />
      <Box x={184} y={228} w={36} h={4} fill={C.ivory} />
      <Box x={184} y={238} w={24} h={4} fill={C.ivory} />
      <g className="bs-bench-clap" style={{ transformOrigin: '178px 216px' }}>
        <Box x={178} y={206} w={48} h={10} fill={C.ivory} />
        {[0, 1, 2].map((n) => (
          <polygon key={n} points={`${186 + n * 14},206 ${194 + n * 14},206 ${188 + n * 14},216 ${180 + n * 14},216`} fill={C.navy} />
        ))}
      </g>
      {/* Checks: a stamp coming down and leaving a check. */}
      <Box x={254} y={230} w={50} h={30} fill={C.ivory} stroke={C.navy} strokeWidth={2} />
      <polyline className="bs-bench-check" pathLength={1} points="266,245 275,253 292,236" fill="none" stroke={C.teal} strokeWidth={5} />
      <g className="bs-bench-stamp">
        <Box x={270} y={190} w={16} h={18} c={[4, 4, 0, 0]} fill={C.navy} />
        <Box x={262} y={208} w={32} h={10} c={[0, 0, 3, 3]} fill={C.teal} />
      </g>
      {/* Email: envelopes leaving one after another. */}
      <g className="bs-bench-send">
        <Box x={330} y={222} w={52} h={32} fill={C.ivory} stroke={C.navy} strokeWidth={2} />
        <polyline points="330,222 356,240 382,222" fill="none" stroke={C.navy} strokeWidth={2} />
      </g>
      {/* Reports: bars growing. */}
      {[0, 1, 2].map((n) => (
        <Box key={n} className="bs-bench-bar" x={414 + n * 14} y={214 + (2 - n) * 6} w={10} h={46 - (2 - n) * 6} fill={n === 2 ? C.bright : C.teal} style={{ '--n': n, transformOrigin: `0 260px` } as CSSProperties} />
      ))}
      {/* The bench and its labels. */}
      <Box x={0} y={262} w={480} h={12} fill={C.navy} />
      {JOBS.map((j, n) => (
        <text key={j} className="bs-bench-label" x={STATION_X[n]} y={296} textAnchor="middle" style={{ '--n': n } as CSSProperties}>
          {j}
        </text>
      ))}
      {/* The octopus over it all, arms on top of the stations. */}
      <g className="bs-bench-oct">
        <Box x={190} y={14} w={100} h={112} c={[42, 42, 16, 16]} fill={C.navy} />
        <Box x={204} y={34} w={12} h={36} c={6} fill={C.teal} />
        <Box x={186} y={128} w={108} h={18} c={[0, 0, 9, 9]} fill={C.navy} />
        <g className="bs-oct-eyes" style={{ transformOrigin: '240px 92px' }}>
          <Box x={214} y={80} w={22} h={24} c={7} fill={C.ivory} />
          <Box x={244} y={80} w={22} h={24} c={7} fill={C.ivory} />
          <Box x={221} y={92} w={9} h={10} c={3} fill={C.ink} />
          <Box x={251} y={92} w={9} h={10} c={3} fill={C.ink} />
        </g>
      </g>
      {TIPS.map(([tx, ty], i) => (
        <Reach key={i} i={i} bx={202 + i * 15} by={146} tx={tx} ty={ty} />
      ))}
    </svg>
  );
}

export const BENCH_COPY: TakeCopy = {
  key: 'R',
  name: 'Octopus Workbench',
  headline: 'Six jobs, one head.',
  lede: 'The octopus sits over the bench with an arm on every station: writing, drawing, filming, checking, sending, charting, all at the same time. Each station keeps its own rhythm.',
  says: 'Esy runs many lines of work at once and keeps them all in one head, so none of them is ever out of sight.',
};

export default function OctoBench() {
  return (
    <Board
      copy={BENCH_COPY}
      note={ROUND_FOUR_NOTE}
      hero={
        <div className="bs-frame">
          <Bench />
        </div>
      }
      mark={() => <Bench />}
      divider={
        <ol className="bs-rule-verticals bs-rule-verticals--busy" aria-label="Jobs">
          {JOBS.map((j, a) => (
            <li key={j} style={{ '--a': a } as CSSProperties}>
              {j}
            </li>
          ))}
        </ol>
      }
    />
  );
}
