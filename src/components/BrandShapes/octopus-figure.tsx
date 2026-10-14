// Mason, Esy's mascot: the stencil octopus (2026-10-06). A navy mantle over
// eight arms, four navy in front and four deep teal behind. Each arm is a
// chain of segments that curls in a travelling wave (the bs-oct-* rules in
// reef.css). Drawn in a 480 × 360 box so any scene can place him.
//
// Kept apart from the K · Octopus prototype page so the live footer can use
// him without pulling in the prototype board and its stylesheet.

import type { CSSProperties, ReactNode } from 'react';
import { Box, C, pivot } from './draw';

const SEGS = [
  { l: 30, w: 24 },
  { l: 28, w: 20 },
  { l: 26, w: 16 },
  { l: 24, w: 12 },
];
const GAP = 4;

// What three of the arms are holding: a page, a gem, a small chart.
const ITEMS: Record<number, ReactNode> = {
  0: (
    <g>
      <Box x={-12} y={2} w={24} h={30} c={[0, 9, 0, 0]} fill={C.ivory} />
      <Box x={-7} y={12} w={14} h={3} fill={C.teal} />
      <Box x={-7} y={19} w={10} h={3} fill={C.teal} />
    </g>
  ),
  5: <Box x={-12} y={2} w={24} h={24} c={7} fill={C.mint} />,
  7: (
    <g>
      <Box x={-4} y={4} w={6} h={22} fill={C.teal} />
      <Box x={4} y={12} w={6} h={14} fill={C.bright} />
      <Box x={-12} y={14} w={6} h={12} fill={C.mint} />
    </g>
  ),
};

/** One arm, drawn pointing down from its base and rotated into place; each segment nests in the last so curls compound. */
function Arm({ i, x, y, angle, front, items = ITEMS }: { i: number; x: number; y: number; angle: number; front: boolean; items?: Record<number, ReactNode> }) {
  const amp = 7 + Math.abs(3.5 - i) * 2.2;
  let top = 0;
  const offsets = SEGS.map((s) => {
    const t = top;
    top += s.l + GAP;
    return t;
  });
  // Build innermost first, wrapping outward.
  let inner: ReactNode = items[i] ? <g transform={`translate(0 ${offsets[3] + SEGS[3].l})`}>{items[i]}</g> : null;
  for (let k = SEGS.length - 1; k >= 0; k--) {
    const s = SEGS[k];
    const tip = k === SEGS.length - 1;
    inner = (
      <g className="bs-oct-seg" style={{ ...pivot(0, offsets[k]), '--a': i, '--k': k, '--amp': `${amp}deg` } as CSSProperties}>
        <Box x={-s.w / 2} y={offsets[k]} w={s.w} h={s.l} c={[0, 0, s.w * 0.36, s.w * 0.36]} fill={tip ? C.bright : front ? C.navy : C.deep} />
        {inner}
      </g>
    );
  }
  return <g transform={`translate(${x} ${y}) rotate(${angle})`}>{inner}</g>;
}

const ARMS = Array.from({ length: 8 }, (_, i) => ({ i, x: 182 + i * 16.6, y: 204, angle: (3.5 - i) * 17, front: i % 2 === 0 }));

/* ── At rest (Zev, 2026-10-14) ──────────────────────────────────────
   Seven arms fanned forward and the eighth curled up behind him on the
   right like a tail: four blocky segments and a teal tip, rising from behind
   the collar and curling up and in. Never all eight forward. Still: no curl,
   bob or blink, since he isn't working. */

// At rest the arms are chunkier and sit closer together, like the toy's.
const REST_SEGS = [
  { l: 28, w: 26 },
  { l: 26, w: 22 },
  { l: 24, w: 18 },
  { l: 22, w: 14 },
];
const REST_GAP = 2;

// Seven arms fanned forward across the collar; each curls a little outward
// toward its tip, the outer ones most, like arms resting on a surface.
const REST_ARMS = Array.from({ length: 7 }, (_, i) => ({ i, x: 186 + i * 18, y: 204, angle: (3 - i) * 19, front: i % 2 === 0, bend: (3 - i) * 3 }));

/** A still arm (no animation classes); `bend` turns each joint after the first, so it curls. */
function StillArm({ x, y, angle, front, bend = 0 }: { x: number; y: number; angle: number; front: boolean; bend?: number }) {
  let top = 0;
  const offsets = REST_SEGS.map((s) => {
    const t = top;
    top += s.l + REST_GAP;
    return t;
  });
  let inner: ReactNode = null;
  for (let k = REST_SEGS.length - 1; k >= 0; k--) {
    const s = REST_SEGS[k];
    const tip = k === REST_SEGS.length - 1;
    inner = (
      <g transform={k > 0 ? `rotate(${bend} 0 ${offsets[k]})` : undefined}>
        <Box x={-s.w / 2} y={offsets[k]} w={s.w} h={s.l} c={[0, 0, s.w * 0.36, s.w * 0.36]} fill={tip ? C.bright : front ? C.navy : C.deep} />
        {inner}
      </g>
    );
  }
  return <g transform={`translate(${x} ${y}) rotate(${angle})`}>{inner}</g>;
}

/** The tail: from behind the collar's right end, out to the right, then up, the tip turning in. */
const Tail = () => <StillArm x={284} y={184} angle={-108} front bend={-30} />;

/** Mason at rest, the flat stencil: seven arms forward, the tail up behind him on the right. */
function RestingFigure() {
  return (
    <svg className="bs-svg bs-oct is-rest" viewBox="0 0 480 360" role="img" aria-label="Mason, the Esy octopus, at rest">
      <g>
        {/* The tail and back arms behind the mantle, front arms over it. */}
        <Tail />
        {REST_ARMS.filter((a) => !a.front).map((a) => <StillArm key={a.i} {...a} />)}
        <Box x={176} y={28} w={128} h={152} c={[54, 54, 20, 20]} fill={C.navy} />
        <Box x={194} y={54} w={16} h={48} c={8} fill={C.teal} />
        <Box x={168} y={184} w={144} h={24} c={[0, 0, 12, 12]} fill={C.navy} />
        {REST_ARMS.filter((a) => a.front).map((a) => <StillArm key={a.i} {...a} />)}
        <Box x={206} y={116} w={28} h={32} c={9} fill={C.ivory} />
        <Box x={246} y={116} w={28} h={32} c={9} fill={C.ivory} />
        <Box x={216} y={124} w={12} h={16} c={4} fill={C.ink} />
        <Box x={256} y={124} w={12} h={16} c={4} fill={C.ink} />
      </g>
    </svg>
  );
}

/**
 * Mason. `items` replaces what his arms hold (by default a page, a gem and a
 * chart). `pose="rest"` draws him at rest (seven arms forward, the tail up
 * behind), still; the default is the working figure every scene uses.
 */
export function OctopusFigure({ bubbles = false, items = ITEMS, pose = 'work' }: { bubbles?: boolean; items?: Record<number, ReactNode>; pose?: 'work' | 'rest' }) {
  if (pose === 'rest') return <RestingFigure />;
  return (
    <svg className="bs-svg bs-oct" viewBox="0 0 480 360" role="img" aria-label="Mason, the Esy octopus">
      {bubbles &&
        [0, 1, 2].map((n) => (
          <Box key={n} className="bs-oct-bubble" x={330 + n * 22} y={150} w={12 - n * 2} h={12 - n * 2} c={3} fill="none" stroke={C.teal} strokeWidth={2} style={{ '--n': n } as CSSProperties} />
        ))}
      <g className="bs-oct-body">
        {/* Back arms first, then the mantle, then front arms over it. */}
        {ARMS.filter((a) => !a.front).map((a) => <Arm key={a.i} {...a} items={items} />)}
        <Box x={176} y={28} w={128} h={152} c={[54, 54, 20, 20]} fill={C.navy} />
        <Box x={194} y={54} w={16} h={48} c={8} fill={C.teal} />
        <Box x={168} y={184} w={144} h={24} c={[0, 0, 12, 12]} fill={C.navy} />
        {ARMS.filter((a) => a.front).map((a) => <Arm key={a.i} {...a} items={items} />)}
        <g className="bs-oct-eyes" style={pivot(240, 132)}>
          <Box x={206} y={116} w={28} h={32} c={9} fill={C.ivory} />
          <Box x={246} y={116} w={28} h={32} c={9} fill={C.ivory} />
          <Box x={216} y={124} w={12} h={16} c={4} fill={C.ink} />
          <Box x={256} y={124} w={12} h={16} c={4} fill={C.ink} />
        </g>
      </g>
    </svg>
  );
}
