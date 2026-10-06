// N · Beaver — builds what lasts. A stencil beaver on the bank lifts a log
// onto its dam; the water behind rises a little; it slaps its tail. One log
// at a time, each one placed where the next can stand on it.

import type { CSSProperties } from 'react';
import { Board } from './Board';
import { Box, C, MASCOT_NOTE, pivot } from './draw';
import type { TakeCopy } from './symbols';

/** A cut log: navy length with a teal end, both ends on the diagonal. */
export function Log({ x, y, w, className, style }: { x: number; y: number; w: number; className?: string; style?: CSSProperties }) {
  return (
    <g className={className} style={style}>
      <Box x={x} y={y} w={w} h={18} c={[9, 0, 9, 0]} fill={C.navy} />
      <Box x={x + w - 14} y={y} w={14} h={18} c={[0, 7, 7, 0]} fill={C.bright} />
    </g>
  );
}

// The dam so far, bottom course first.
const DAM = [
  { x: 100, y: 302, w: 76 }, { x: 180, y: 302, w: 76 },
  { x: 116, y: 280, w: 70 }, { x: 190, y: 280, w: 56 },
  { x: 132, y: 258, w: 96 },
];

export function BeaverFigure() {
  return (
    <g className="bs-bvr-beaver" style={pivot(370, 300)}>
      <g className="bs-bvr-tail" style={pivot(420, 290)}>
        <Box x={412} y={276} w={62} h={26} c={12} fill={C.teal} />
        <Box x={430} y={278} w={3} h={22} fill={C.deep} />
        <Box x={446} y={278} w={3} h={22} fill={C.deep} />
      </g>
      <Box x={318} y={202} w={112} h={96} c={[42, 30, 22, 30]} fill={C.navy} />
      <Box x={330} y={286} w={54} h={14} c={[6, 0, 6, 6]} fill={C.deep} />
      <g className="bs-bvr-head" style={pivot(330, 230)}>
        <Box x={284} y={176} w={66} h={58} c={[24, 20, 12, 18]} fill={C.navy} />
        <Box x={328} y={168} w={14} h={14} c={[7, 7, 0, 0]} fill={C.navy} />
        <Box x={300} y={192} w={8} h={8} c={2} fill={C.ivory} />
        <Box x={278} y={198} w={12} h={10} c={3} fill={C.ink} />
        <Box x={288} y={222} w={12} h={14} c={[0, 0, 4, 4]} fill={C.ivory} />
      </g>
      <Box x={296} y={242} w={34} h={14} c={6} fill={C.deep} />
    </g>
  );
}

export function DamScene() {
  return (
    <svg className="bs-svg bs-bvr" viewBox="0 0 480 360" role="img" aria-label="A stencil beaver lifting a log onto its dam">
      {/* Water held behind the dam, and the lower water past it. */}
      <rect className="bs-bvr-pond" x={0} y={232} width={150} height={88} fill="#BFE7E0" style={pivot(75, 320)} />
      {[0, 1, 2].map((n) => (
        <Box key={n} className="bs-bvr-ripple" x={12 + n * 40} y={254 + n * 20} w={30} h={4} c={2} fill={C.teal} style={{ '--n': n } as CSSProperties} />
      ))}
      <Box x={0} y={320} w={480} h={40} fill="#D9EFEB" />
      <Box x={262} y={298} w={218} h={22} c={[11, 0, 0, 0]} fill="#CFE3DE" />
      {DAM.map((l, i) => (
        <Log key={i} {...l} />
      ))}
      <BeaverFigure />
      {/* Drawn after the beaver so it sits in its paws, in front of its chest. */}
      <Log className="bs-bvr-log" x={142} y={236} w={84} />
      <Box className="bs-bvr-splash" x={414} y={300} w={64} h={6} c={3} fill={C.mint} style={pivot(446, 303)} />
    </svg>
  );
}

export const BEAVER_COPY: TakeCopy = {
  key: 'N',
  name: 'Beaver',
  headline: 'Builds what lasts.',
  lede: 'A beaver builds with what’s around it, one log at a time, and keeps going until the water holds. Every log goes where the next one can stand on it.',
  says: 'Engineer-first: steady, practical work that adds up to a structure. Each thing Esy keeps makes the next one easier to build.',
};

export default function Beaver() {
  return (
    <Board
      copy={BEAVER_COPY}
      note={MASCOT_NOTE}
      hero={
        <div className="bs-frame">
          <DamScene />
        </div>
      }
      mark={() => <DamScene />}
      divider={
        <div className="bs-rule-course bs-rule-logs" aria-hidden="true">
          {Array.from({ length: 11 }, (_, i) => (
            <span key={i} className={i === 5 ? 'bs-course-key' : ''} />
          ))}
        </div>
      }
    />
  );
}
