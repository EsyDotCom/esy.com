// P · Octopus Hub — one head, many verticals. Seen from above: an octagon
// head with an arm out of each of its eight sides. A signal runs out one arm
// at a time and lights the vertical at its tip, clockwise, every second.
// Without the labels it's an icon: the octagon and its eight arms.

import type { CSSProperties } from 'react';
import { Board } from './Board';
import { Box, C, Chain, ROUND_FOUR_NOTE, taper, VERTICALS } from './draw';
import { octagon, pts, type TakeCopy } from './symbols';

const CX = 240;
const CY = 180;
const HEAD = 92;
const SEGS = taper(4, 22, 20, 11);

export function Hub({ labels = false }: { labels?: boolean }) {
  return (
    <svg className={`bs-svg bs-hub${labels ? '' : ' bs-hub--icon'}`} viewBox="0 0 480 360" role="img" aria-label="An octopus seen from above, an arm out of each side of its octagon head, each reaching a different vertical">
      {Array.from({ length: 8 }, (_, a) => {
        // Arms leave from the middle of each side; Chain draws downward, so turn it by angle − 90°.
        const deg = a * 45 - 90;
        const rad = (deg * Math.PI) / 180;
        const bx = +(CX + Math.cos(rad) * (HEAD / 2 - 6)).toFixed(2);
        const by = +(CY + Math.sin(rad) * (HEAD / 2 - 6)).toFixed(2);
        return (
          <g key={a} transform={`translate(${bx} ${by}) rotate(${deg - 90})`}>
            {/* --on (0–1, animated in CSS) mixes each segment toward mint as the signal passes. */}
            <Chain segs={SEGS} className="bs-hub-seg" vars={{ '--a': a }} fill={(k) => `color-mix(in srgb, ${k === SEGS.length - 1 ? C.bright : a % 2 ? C.deep : C.navy}, ${C.mint} calc(var(--on) * 100%))`} />
          </g>
        );
      })}
      <polygon points={pts(octagon(CX, CY, HEAD))} fill={C.navy} />
      <polygon points={pts(octagon(CX, CY, HEAD - 22))} fill="none" stroke={C.teal} strokeWidth={3} />
      <g className="bs-hub-eyes">
        <Box x={CX - 22} y={CY - 12} w={16} h={20} c={5} fill={C.ivory} />
        <Box x={CX + 6} y={CY - 12} w={16} h={20} c={5} fill={C.ivory} />
        <Box x={CX - 17} y={CY - 6} w={7} h={10} c={2} fill={C.ink} />
        <Box x={CX + 11} y={CY - 6} w={7} h={10} c={2} fill={C.ink} />
      </g>
      {labels &&
        VERTICALS.map((v, a) => {
          const rad = ((a * 45 - 90) * Math.PI) / 180;
          const lx = +(CX + Math.cos(rad) * 150 * (a % 4 === 2 ? 1.25 : 1)).toFixed(2);
          const ly = +(CY + Math.sin(rad) * 150).toFixed(2);
          const w = v.length * 7 + 18;
          return (
            <g key={v} className="bs-hub-card" style={{ '--a': a } as CSSProperties}>
              <Box x={lx - w / 2} y={ly - 12} w={w} h={24} c={[6, 0, 6, 0]} />
              <text x={lx} y={ly + 4} textAnchor="middle">
                {v}
              </text>
            </g>
          );
        })}
    </svg>
  );
}

export const HUB_COPY: TakeCopy = {
  key: 'P',
  name: 'Octopus Hub',
  headline: 'One head, every vertical.',
  lede: 'Seen from above, the octopus is our octagon with an arm out of each side. Each arm runs a different line of work, and a signal goes out to each one in turn. Take the labels away and it’s an icon.',
  says: 'One mind running many verticals at once: clip art, pages, news, films. Add a vertical, it gets an arm.',
};

export default function OctoHub() {
  return (
    <Board
      copy={HUB_COPY}
      note={ROUND_FOUR_NOTE}
      hero={
        <div className="bs-frame">
          <Hub labels />
        </div>
      }
      mark={() => <Hub />}
      divider={
        <ol className="bs-rule-verticals" aria-label="Verticals">
          {VERTICALS.map((v, a) => (
            <li key={v} style={{ '--a': a } as CSSProperties}>
              {v}
            </li>
          ))}
        </ol>
      }
    />
  );
}
