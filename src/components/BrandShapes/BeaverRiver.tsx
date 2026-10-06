// X · Beaver River — the builder others live around. Beavers are a keystone
// species: one dam turns a stream into a pond that a whole community lives
// in. A valley under drifting clouds: the pond held high behind the dam, the
// lodge in it, one beaver at work on the dam and one swimming a branch home.

import type { CSSProperties } from 'react';
import { BeaverFigure, DamScene, Log } from './Beaver';
import { Board, type TakeCopy } from './Board';
import { Box, C, ROUND_FIVE_NOTE, SceneSvg, Wide } from './draw';
import { octagon, pts } from './symbols';

/** A conifer: three stacked tiers, cut at 45°. */
function Pine({ x, y, s = 1, tone = C.deep }: { x: number; y: number; s?: number; tone?: string }) {
  return (
    <g className="bs-river-pine" style={{ transformOrigin: `${x}px ${y}px` }}>
      <Box x={x - 4 * s} y={y - 14 * s} w={8 * s} h={14 * s} fill={C.navy} />
      {[0, 1, 2].map((k) => (
        <polygon key={k} points={`${x - (30 - k * 7) * s},${y - (14 + k * 22) * s} ${x + (30 - k * 7) * s},${y - (14 + k * 22) * s} ${x},${y - (48 + k * 22) * s}`} fill={tone} />
      ))}
    </g>
  );
}

export function RiverScene({ view }: { view?: string }) {
  return (
    <SceneSvg view={view} className="bs-river bs-bvr" label="A river valley: a beaver's dam holding a pond, its lodge, and beavers at work">
      <defs>
        <linearGradient id="bs-river-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#D8F0EA" />
          <stop offset="1" stopColor="#F7FBFA" />
        </linearGradient>
      </defs>
      <Wide y={0} h={560} fill="url(#bs-river-sky)" />
      <polygon className="bs-river-sun" points={pts(octagon(1030, 86, 70))} fill={C.bright} opacity={0.45} style={{ transformOrigin: '1030px 86px' }} />
      {[0, 1, 2].map((n) => (
        <Box key={n} className="bs-river-cloud" x={120 + n * 380} y={50 + (n % 2) * 40} w={150 - n * 20} h={18} c={[9, 0, 9, 0]} fill="#C6E6DF" style={{ '--n': n } as CSSProperties} />
      ))}
      {/* Hills, far then near, in stepped 45° runs. */}
      <polygon points="-2400,260 -40,260 60,190 180,190 280,250 520,250 600,200 760,200 860,250 1060,250 1150,180 1260,180 3600,260 3600,330 -2400,330" fill="#BFE3DA" />
      <polygon points="-2400,300 100,300 200,240 330,240 420,300 780,300 880,250 990,250 1080,300 3600,300 3600,340 -2400,340" fill="#9FD5C9" />
      {[80, 150, 230, 900, 970, 1120].map((x, n) => (
        <Pine key={n} x={x} y={n < 3 ? 296 : 300} s={0.7 + (n % 3) * 0.15} tone={n % 2 ? C.deep : C.teal} />
      ))}
      {/* The pond held high behind the dam; the stream below it runs low. */}
      <polygon points="-2400,296 650,296 650,392 -2400,392" fill="#8FD3C6" />
      <polygon points="700,334 3600,334 3600,392 700,392" fill="#A9DDD3" />
      {[0, 1, 2, 3].map((n) => (
        <Box key={n} className="bs-river-ripple" x={60 + n * 140} y={312 + (n % 2) * 26} w={44} h={4} c={2} fill="#E9F7F4" style={{ '--n': n } as CSSProperties} />
      ))}
      {[0, 1, 2, 3].map((n) => (
        <Box key={`d${n}`} className="bs-river-flow" x={740 + n * 110} y={350 + (n % 2) * 18} w={48} h={4} c={2} fill="#E9F7F4" style={{ '--n': n } as CSSProperties} />
      ))}
      {/* Lily pads bobbing. */}
      {[[180, 340], [250, 360], [520, 330]].map(([x, y], n) => (
        <g key={n} className="bs-river-pad" style={{ '--n': n } as CSSProperties}>
          <polygon points={pts(octagon(x, y, 24))} fill={C.teal} />
          <polygon points={`${x},${y} ${x + 12},${y - 5} ${x + 12},${y + 5}`} fill="#8FD3C6" />
        </g>
      ))}
      {/* The lodge: a mound of logs in the pond. */}
      <g>
        <polygon points="330,300 360,262 420,248 480,262 510,300" fill="#163A5F" />
        <Log x={350} y={278} w={70} />
        <Log x={404} y={262} w={56} />
        <Log x={430} y={284} w={64} />
      </g>
      {/* The dam: logs stacked into a wall, water spilling over it. */}
      {[[640, 374, 92], [646, 352, 84], [652, 330, 74], [658, 308, 62]].map(([x, y, w], n) => (
        <Log key={n} x={x} y={y} w={w} />
      ))}
      {[0, 1, 2].map((n) => (
        <Box key={n} className="bs-river-spill" x={724 + n * 9} y={318} w={3} h={60} fill="#E9F7F4" style={{ '--n': n } as CSSProperties} />
      ))}
      {/* A beaver on the dam, scaled down from the take's figure. */}
      <g transform="translate(495 122) scale(0.62)">
        <BeaverFigure />
      </g>
      {/* A second beaver swims a branch home to the lodge, a wake behind it. */}
      <g className="bs-river-swim">
        <polygon points="0,0 -40,-8 -40,-4" fill="#E9F7F4" />
        <polygon points="0,6 -40,14 -40,10" fill="#E9F7F4" />
        <Box x={-4} y={-12} w={30} h={20} c={[8, 10, 4, 4]} fill={C.navy} />
        <Box x={18} y={-8} w={4} h={4} fill={C.ivory} />
        <Box x={22} y={-16} w={46} h={5} r={-10} fill={C.deep} />
        <polygon points="58,-26 70,-30 66,-20" fill={C.bright} />
      </g>
      <Wide y={392} h={168} fill={C.navy} />
    </SceneSvg>
  );
}

export const RIVER_COPY: TakeCopy = {
  key: 'X',
  name: 'Beaver River',
  headline: 'The builder others live around.',
  lede: 'Beavers are a keystone species: one dam turns a stream into a pond that a whole community lives in. Here the pond sits high behind the dam, one beaver works the top of it, and another swims a branch home.',
  says: 'Esy builds the thing other work stands on: steady, practical, and meant to last long after the first log.',
};

export default function BeaverRiver() {
  return (
    <Board
      tone="mint"
      copy={RIVER_COPY}
      note={ROUND_FIVE_NOTE}
      hero={
        <div className="bs-frame bs-frame--flush">
          <RiverScene view="250 80 560 420" />
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
