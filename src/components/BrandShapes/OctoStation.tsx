'use client';

// AE · Research Station — checked before it leaves. A cutaway undersea lab:
// the octopus looks over each piece with a lens while a scan passes over it,
// the checklist on the wall ticks down, and approved work rides a capsule up
// the tube toward the light. Nothing goes up that wasn't checked.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { Box, C, SceneSvg, Wide } from './draw';
import { FriendlyOcto, HELD, LookHero, OctoAt, ROUND_SIX_NOTE, type OctoLook } from './octo';
import { octagon, pts } from './symbols';

const CHECKS = ['Sources', 'Facts', 'Brand', 'Format', 'Approved'];

export function StationScene({ view, look = 'friendly' }: { view?: string; look?: OctoLook }) {
  return (
    <SceneSvg view={view} className="bs-sta" label="An octopus in an undersea lab checking each piece before it goes up to the surface">
      <defs>
        <linearGradient id="bs-sta-water" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0E4A5C" />
          <stop offset="0.5" stopColor="#082A42" />
          <stop offset="1" stopColor="#051222" />
        </linearGradient>
      </defs>
      <Wide y={0} h={560} fill="url(#bs-sta-water)" />
      <Wide y={0} h={8} fill={C.mint} className="bs-reef-surface" />
      <Wide y={380} h={180} fill={C.navy} />
      {/* Cable posts along the seabed, their lights blinking in turn. */}
      {[90, 220, 980, 1110].map((x, n) => (
        <g key={n}>
          <Box x={x - 3} y={330} w={6} h={52} fill="#1E4A72" />
          <polygon className="bs-sta-light" points={pts(octagon(x, 326, 12))} fill={C.bright} style={{ '--n': n } as CSSProperties} />
        </g>
      ))}
      <Box x={90} y={372} w={1020} h={4} fill="#1E4A72" />
      {/* The launch tube, and a capsule riding up it. */}
      <Box x={590} y={0} w={20} h={150} fill="#1E4A72" opacity={0.7} />
      <g className="bs-sta-capsule">
        <polygon points={pts(octagon(600, 140, 26))} fill={C.teal} />
        <polyline points="592,140 598,146 608,134" fill="none" stroke={C.ivory} strokeWidth={3} />
      </g>
      {/* The station, cut away: hull, lit room, bench. */}
      <Box x={372} y={130} w={456} h={252} c={[90, 90, 0, 0]} fill={C.navy} />
      <Box x={392} y={150} w={416} h={228} c={[76, 76, 0, 0]} fill="#E7F2EF" />
      {[420, 780].map((x, n) => (
        <polygon key={n} points={pts(octagon(x, 362, 16))} fill={C.navy} opacity={0.15} />
      ))}
      <Box x={430} y={168} w={60} h={6} fill={C.navy} opacity={0.2} />
      {/* Shelf of work already approved, each with its check. */}
      <Box x={404} y={250} w={66} h={5} fill={C.navy} />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <Box x={410 + k * 20} y={222} w={16} h={28} c={[0, 5, 0, 0]} fill={C.ivory} stroke={C.navy} strokeWidth={1.5} />
          <Box x={414 + k * 20} y={240} w={8} h={6} c={2} fill={C.teal} />
        </g>
      ))}
      <g className="bs-sta-octo">
        <OctoAt x={470} y={150} w={230} look={look} items={{ 0: HELD.magnifier, 7: HELD.clipboard }} />
      </g>
      <Box x={460} y={318} w={250} h={12} c={[0, 0, 4, 4]} fill={C.navy} />
      {/* The piece under inspection, a scan passing over it. */}
      <Box x={560} y={290} w={50} h={28} c={[0, 8, 0, 0]} fill={C.ivory} stroke={C.navy} strokeWidth={2} />
      <Box x={568} y={298} w={30} h={3} fill={C.teal} />
      <Box x={568} y={306} w={22} h={3} fill={C.teal} />
      <Box className="bs-sta-scan" x={556} y={286} w={58} h={3} fill={C.mint} />
      {/* The checklist, ticking down. */}
      <Box x={716} y={190} w={86} h={124} c={[0, 10, 0, 0]} fill={C.ivory} stroke={C.navy} strokeWidth={2} />
      {CHECKS.map((label, n) => (
        <g key={label}>
          <Box x={726} y={206 + n * 21} w={12} h={12} c={3} fill="none" stroke={C.navy} strokeWidth={1.5} />
          <polyline className="bs-sta-tick" pathLength={1} points={`${728},${212 + n * 21} ${731},${215 + n * 21} ${737},${208 + n * 21}`} fill="none" stroke={C.teal} strokeWidth={3} style={{ '--n': n } as CSSProperties} />
          <text className="bs-sta-label" x={744} y={216 + n * 21}>
            {label}
          </text>
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5].map((n) => (
        <polygon key={n} className="bs-reef-bubble" points={pts(octagon(380 + n * 90, 130, 8 + (n % 3) * 3))} fill="none" stroke={C.mint} strokeWidth={1.5} style={{ '--n': n } as CSSProperties} />
      ))}
    </SceneSvg>
  );
}

export const STATION_COPY: TakeCopy = {
  key: 'AE',
  name: 'Research Station',
  headline: 'Checked before it leaves.',
  lede: 'In a cutaway undersea lab, the octopus looks over each piece with a lens while a scan passes over it. The checklist on the wall ticks down, and only then does the work ride a capsule up toward the light.',
  says: 'Quality you can see: every piece is checked against a list before it goes anywhere, and the check stays with it.',
};

export default function OctoStation() {
  return (
    <Board
      tone="night"
      copy={STATION_COPY}
      note={ROUND_SIX_NOTE}
      hero={<LookHero night scene={(look) => <StationScene view="330 40 540 400" look={look} />} />}
      mark={() => <FriendlyOcto items={{ 0: HELD.magnifier, 7: HELD.clipboard }} />}
      divider={
        <ol className="bs-rule-checks" aria-label="Checks">
          {CHECKS.map((c, i) => (
            <li key={c} style={{ '--i': i } as CSSProperties}>
              <span />
              {c}
            </li>
          ))}
        </ol>
      }
    />
  );
}
