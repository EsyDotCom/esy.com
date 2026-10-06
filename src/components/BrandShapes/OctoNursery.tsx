'use client';

// AD · Coral Nursery — grown with care, tagged at every step. Real coral
// nurseries grow fragments on frames, tag every one, and plant them back on
// the reef when they're strong. The octopus tends the frames; fragments grow
// under their tags; one at a time is carried across and planted on the reef.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { Box, C, Diamond, SceneSvg, Wide } from './draw';
import { HELD, LookHero, OctoAt, ROUND_SIX_NOTE, type OctoLook, FriendlyOcto } from './octo';
import { noise, octagon, pts } from './symbols';

/** A coral fragment standing at (x, y): a stem and two branches, cut at 45°. */
function Fragment({ x, y, tone, n, grow = true }: { x: number; y: number; tone: string; n: number; grow?: boolean }) {
  return (
    <g className={grow ? 'bs-nur-grow' : undefined} style={{ transformOrigin: `${x}px ${y}px`, '--n': n } as CSSProperties}>
      <Box x={x - 3} y={y - 26} w={6} h={26} fill={tone} />
      <Box x={x - 13} y={y - 22} w={6} h={14} r={-35} fill={tone} />
      <Box x={x + 7} y={y - 24} w={6} h={14} r={35} fill={tone} />
    </g>
  );
}

/** A tag hanging under a fragment: every one is labelled. */
function Tag({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g className="bs-nur-tag" style={{ transformOrigin: `${x}px ${y}px`, '--n': n } as CSSProperties}>
      <Box x={x - 0.5} y={y} w={1} h={8} fill={C.ivory} />
      <Box x={x - 7} y={y + 8} w={14} h={10} c={[0, 4, 0, 0]} fill={C.ivory} />
      <Box x={x - 4} y={y + 12} w={8} h={2} fill={C.teal} />
    </g>
  );
}

const TONES = [C.bright, C.mint, C.teal, C.ivory];
const RAILS = [210, 300];

export function NurseryScene({ view, look = 'friendly' }: { view?: string; look?: OctoLook }) {
  return (
    <SceneSvg view={view} className="bs-nur" label="An octopus tending a coral nursery: tagged fragments growing on frames and being planted on the reef">
      <defs>
        <linearGradient id="bs-nur-water" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#11616F" />
          <stop offset="0.55" stopColor="#0B3A52" />
          <stop offset="1" stopColor="#061527" />
        </linearGradient>
      </defs>
      <Wide y={0} h={560} fill="url(#bs-nur-water)" />
      {[80, 330, 600, 860, 1090].map((x, n) => (
        <polygon key={n} className="bs-reef-ray" points={`${x},0 ${x + 90},0 ${x + 70},380 ${x + 30},380`} fill={C.mint} style={{ '--n': n } as CSSProperties} />
      ))}
      <Wide y={380} h={180} fill={C.navy} />
      {/* The nursery: two rails on posts, a row of tagged fragments on each. */}
      <Box x={96} y={170} w={8} h={212} fill="#1E4A72" />
      <Box x={516} y={170} w={8} h={212} fill="#1E4A72" />
      {RAILS.map((ry, r) => (
        <g key={r}>
          <Box x={90} y={ry} w={440} h={7} c={3} fill="#1E4A72" />
          {Array.from({ length: 9 }, (_, k) => {
            const x = 128 + k * 46;
            const n = r * 9 + k;
            return (
              <g key={k}>
                <Fragment x={x} y={ry} tone={TONES[(k + r) % TONES.length]} n={n} />
                <Tag x={x} y={ry + 7} n={n} />
              </g>
            );
          })}
        </g>
      ))}
      <Box x={90} y={160} w={440} h={4} fill={C.mint} opacity={0.4} />
      {/* The restored reef on the right, already planted. */}
      <polygon points="800,380 840,330 1180,330 3600,330 3600,380" fill="#0C3550" />
      {[[860, 330, 0], [912, 330, 1], [964, 330, 2], [1016, 330, 3], [1068, 330, 0], [1120, 330, 1]].map(([x, y, t], n) => (
        <Fragment key={n} x={x} y={y} tone={TONES[t]} n={n} grow={false} />
      ))}
      <polygon points={pts(octagon(940, 360, 40))} fill={C.teal} />
      <polygon points={pts(octagon(1110, 362, 34))} fill={C.deep} />
      {/* One fragment carried across and planted, again and again. */}
      <g className="bs-nur-carry">
        <Fragment x={0} y={0} tone={C.bright} n={0} grow={false} />
        <Box x={-8} y={4} w={16} h={10} c={[0, 4, 0, 0]} fill={C.ivory} />
      </g>
      <polygon className="bs-nur-plant" points={pts(octagon(1170, 324, 24))} fill="none" stroke={C.mint} strokeWidth={2} style={{ transformOrigin: '1170px 324px' }} />
      {/* The keeper, hovering by the frames. */}
      <g className="bs-nur-octo">
        <OctoAt x={560} y={100} w={290} look={look} items={{ 0: HELD.coral, 7: HELD.tag }} />
      </g>
      {Array.from({ length: 8 }, (_, n) => (
        <Diamond key={n} className="bs-nur-mote" x={140 + Math.abs(noise(n)) * 900} y={60 + Math.abs(noise(n + 4)) * 240} s={2} fill={C.mint} style={{ '--n': n } as CSSProperties} />
      ))}
    </SceneSvg>
  );
}

export const NURSERY_COPY: TakeCopy = {
  key: 'AD',
  name: 'Coral Nursery',
  headline: 'Grown with care, tagged at every step.',
  lede: 'Real coral nurseries grow fragments on frames, tag every one, and plant them back on the reef when they’re strong. The octopus tends the frames, and one fragment at a time goes home to the reef.',
  says: 'Durable work with its record attached: made patiently, labelled from the start, and put where it lasts.',
};

export default function OctoNursery() {
  return (
    <Board
      tone="night"
      copy={NURSERY_COPY}
      note={ROUND_SIX_NOTE}
      hero={<LookHero night scene={(look) => <NurseryScene view="90 30 760 450" look={look} />} />}
      mark={() => <FriendlyOcto items={{ 0: HELD.coral, 7: HELD.tag }} />}
      divider={
        <div className="bs-rule-nursery" aria-hidden="true">
          {Array.from({ length: 22 }, (_, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
