// L · Raven — memory that comes back. Odin's ravens, Thought and Memory, fly
// out each morning and return to report what they saw. Ours sits on its post,
// flies off, returns with a piece, drops it on the pile it keeps, and lands.

import type { CSSProperties } from 'react';
import { Board } from './Board';
import { Box, C, MASCOT_NOTE, pivot } from './draw';
import type { TakeCopy } from './symbols';

/** The raven, facing left, drawn with its feet at (0, 0). */
function Bird({ flying = 'cycle' }: { flying?: 'cycle' | 'always' | 'never' }) {
  return (
    <g className={`bs-rav-bird bs-rav-bird--${flying}`}>
      <Box x={30} y={-44} w={48} h={14} c={[0, 7, 7, 0]} r={16} fill={C.navy} />
      <Box x={-8} y={-12} w={4} h={13} fill={C.ink} />
      <Box x={4} y={-12} w={4} h={13} fill={C.ink} />
      <Box x={-36} y={-56} w={78} h={46} c={[20, 10, 24, 10]} r={-10} fill={C.navy} />
      {/* Folded wing at rest; the raised wing flaps in flight. */}
      <Box className="bs-rav-fold" x={-18} y={-52} w={64} h={24} c={[12, 0, 14, 6]} r={-14} fill={C.wing} />
      <g className="bs-rav-flap" style={pivot(4, -46)}>
        <Box x={-14} y={-104} w={34} h={58} c={[16, 16, 0, 0]} fill={C.wing} />
      </g>
      <g className="bs-rav-head" style={pivot(-40, -56)}>
        <Box x={-64} y={-82} w={42} h={36} c={[16, 10, 6, 10]} fill={C.navy} />
        <polygon points="-64,-72 -90,-62 -64,-54" fill={C.ink} />
        <Box x={-52} y={-74} w={8} h={8} c={2} fill={C.bright} />
        <Box className="bs-rav-carry" x={-104} y={-70} w={22} h={16} c={[5, 0, 5, 0]} fill={C.teal} />
      </g>
    </g>
  );
}

// The pile it keeps: earlier pieces, a little uneven, cut on the diagonal.
const PILE = [
  { x: 96, y: 296, w: 112, fill: C.navy },
  { x: 104, y: 270, w: 98, fill: C.teal },
  { x: 100, y: 244, w: 104, fill: C.ivory },
  { x: 110, y: 218, w: 90, fill: C.navy },
];

function RavenScene({ small = false }: { small?: boolean }) {
  return (
    <svg className={`bs-svg bs-rav${small ? ' bs-rav--small' : ''}`} viewBox="0 0 480 360" role="img" aria-label="A stencil raven that flies off and returns with a piece for the pile it keeps">
      <Box x={40} y={320} w={400} h={6} c={3} fill={C.pale} />
      {PILE.map((b, i) => (
        <Box key={i} x={b.x} y={b.y} w={b.w} h={22} c={[10, 0, 10, 0]} fill={b.fill} stroke={b.fill === C.ivory ? C.teal : 'none'} strokeWidth={2} />
      ))}
      {!small && <Box className="bs-rav-drop" x={112} y={192} w={86} h={22} c={[10, 0, 10, 0]} fill={C.teal} />}
      {/* The post it perches on. */}
      <Box x={346} y={204} w={16} h={116} fill={C.navy} />
      <Box x={316} y={196} w={78} h={10} c={[0, 0, 5, 5]} fill={C.navy} />
      <g transform="translate(350 196)">
        <g className="bs-rav-path">
          <Bird flying={small ? 'never' : 'cycle'} />
        </g>
      </g>
    </svg>
  );
}

export const RAVEN_COPY: TakeCopy = {
  key: 'L',
  name: 'Raven',
  headline: 'Memory that comes back.',
  lede: 'In Norse myth two ravens, Thought and Memory, fly out every morning and come back by night to tell what they saw. Ours flies off, returns with a piece, and adds it to the pile it keeps.',
  says: 'Esy is the memory that comes back with the receipts: what was found, where it came from, and where it’s kept.',
};

export default function Raven() {
  return (
    <Board
      copy={RAVEN_COPY}
      note={MASCOT_NOTE}
      hero={
        <div className="bs-frame">
          <RavenScene />
        </div>
      }
      mark={() => <RavenScene small />}
      divider={
        <div className="bs-rule-flight" aria-hidden="true">
          <svg className="bs-rule-flight-bird" viewBox="-110 -110 200 120">
            <Bird flying="always" />
          </svg>
          <span />
        </div>
      }
    />
  );
}
