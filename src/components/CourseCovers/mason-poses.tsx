/* Mason from behind and from above (2026-10-07, /prototypes/course-cover/), for
 * covers where he's typing: he faces the screen, so we see the back of his
 * mantle, never his face, and his front arms reach past it to the keyboard,
 * each tip resting on a key. Drawn in the same stencil parts as OctopusFigure
 * (navy mantle and front arms, deep-teal back arms, bright tips) and placed in
 * the scene's own units, so an arm can end exactly on a key.
 *
 * Pressing: arm k and the key under it share a beat (`--k`), so the tip dips
 * as the key lights (cc-poke / cc-press in course-covers.css). */

import type { CSSProperties } from 'react';
import { Box, C } from '@/components/BrandShapes/draw';

type P = [number, number];

const lerp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
/** A point on the quadratic curve a → b bent through c. */
const bez = (a: P, c: P, b: P, t: number): P => lerp(lerp(a, c, t), lerp(c, b, t), t);

/** One tentacle from `base` to `tip`, bowed outward by `bow`, as four tapering
 *  chamfered segments with a bright last one, the way Mason's arms are drawn. */
function Tentacle({ base, tip, s, bow, fill, k, pressing }: { base: P; tip: P; s: number; bow: number; fill: string; k?: number; pressing?: boolean }) {
  const mid = lerp(base, tip, 0.5);
  const dx = tip[0] - base[0];
  const dy = tip[1] - base[1];
  const len = Math.hypot(dx, dy) || 1;
  // Bend sideways, away from his centre line.
  const ctrl: P = [mid[0] + (-dy / len) * bow, mid[1] + (dx / len) * bow];
  const widths = [24, 20, 16, 12].map((w) => w * s);
  const segs = widths.map((w, i) => {
    const a = bez(base, ctrl, tip, i / 4);
    const b = bez(base, ctrl, tip, (i + 1) / 4 - 0.02);
    const c = lerp(a, b, 0.5);
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
    return (
      <g key={i} transform={`translate(${c[0].toFixed(1)} ${c[1].toFixed(1)}) rotate(${ang.toFixed(1)})`}>
        <Box x={-l / 2} y={-w / 2} w={l} h={w} c={[0, w * 0.36, w * 0.36, 0]} fill={i === 3 ? C.bright : fill} />
      </g>
    );
  });
  return (
    <g className={pressing ? 'cc-poke' : undefined} style={pressing && k !== undefined ? ({ '--k': k } as CSSProperties) : undefined}>
      {segs}
    </g>
  );
}

/** Mason from behind, sitting: collar top at (cx, cy), scale `s` (1 = his footer
 *  size). His four front arms end on `keys` (absolute points, left to right). */
export function MasonBack({ cx, cy, s, keys }: { cx: number; cy: number; s: number; keys: [P, P, P, P] }) {
  const frontBases: P[] = [-44, -16, 16, 44].map((d) => [cx + d * s, cy + 6 * s]);
  const backTips: P[] = [
    [cx - 118 * s, cy + 92 * s],
    [cx - 62 * s, cy + 118 * s],
    [cx + 62 * s, cy + 118 * s],
    [cx + 118 * s, cy + 92 * s],
  ];
  return (
    <g aria-hidden="true">
      {/* Front arms first: they reach away from us, past his mantle, onto the keys. */}
      {keys.map((t, i) => (
        <Tentacle key={i} base={frontBases[i]} tip={t} s={s} bow={(i < 2 ? -1 : 1) * 18 * s} fill={C.navy} k={i} pressing />
      ))}
      {/* The mantle from behind: no face. The screen in front of him rims his
          outline in teal, so his navy body reads against the dark room. */}
      <Box x={cx - 64 * s} y={cy - 156 * s} w={128 * s} h={152 * s} c={[54 * s, 54 * s, 20 * s, 20 * s]} fill={C.navy} stroke={C.teal} strokeWidth={2.5} strokeOpacity={0.7} />
      <Box x={cx + 40 * s} y={cy - 118 * s} w={10 * s} h={70 * s} c={5 * s} fill={C.teal} opacity={0.55} />
      <Box x={cx - 72 * s} y={cy} w={144 * s} h={24 * s} c={[0, 0, 12 * s, 12 * s]} fill={C.navy} stroke={C.teal} strokeWidth={2} strokeOpacity={0.5} />
      {/* Back arms, resting on the stool and the floor at his sides. */}
      {backTips.map((t, i) => (
        <Tentacle key={i} base={[cx + (i < 2 ? -40 : 40) * s, cy + 18 * s]} tip={t} s={s * 0.9} bow={(i < 2 ? 1 : -1) * 14 * s} fill={C.deep} />
      ))}
    </g>
  );
}

/** Mason from above, at a keyboard above him: the top of his mantle (no face),
 *  four front arms up onto `keys`, four back arms spread behind him. */
export function MasonTop({ cx, cy, s, keys }: { cx: number; cy: number; s: number; keys: [P, P, P, P] }) {
  const back: P[] = [
    [cx - 130 * s, cy + 40 * s],
    [cx - 70 * s, cy + 110 * s],
    [cx + 70 * s, cy + 110 * s],
    [cx + 130 * s, cy + 40 * s],
  ];
  return (
    <g aria-hidden="true">
      {back.map((t, i) => (
        <Tentacle key={i} base={[cx, cy]} tip={t} s={s} bow={(i < 2 ? 1 : -1) * 16 * s} fill={C.deep} />
      ))}
      {keys.map((t, i) => (
        <Tentacle key={i} base={[cx + (i - 1.5) * 18 * s, cy - 20 * s]} tip={t} s={s} bow={(i < 2 ? -1 : 1) * 14 * s} fill={C.navy} k={i} pressing />
      ))}
      {/* The top of his mantle: the stencil octagon from above, lit along one edge. */}
      <Box x={cx - 62 * s} y={cy - 70 * s} w={124 * s} h={118 * s} c={38 * s} fill={C.navy} stroke={C.teal} strokeWidth={2.5} strokeOpacity={0.7} />
      <Box x={cx - 40 * s} y={cy - 56 * s} w={46 * s} h={10 * s} c={5 * s} fill={C.teal} opacity={0.5} />
    </g>
  );
}

/** The centre of key n on a Keys grid (x, y, w, cols), where his tip should land. */
export function keyCenter(x: number, y: number, w: number, cols: number, n: number): P {
  const k = w / cols;
  return [x + (n % cols) * k + (k - 3) / 2, y + Math.floor(n / cols) * k + (k - 3) / 2];
}
