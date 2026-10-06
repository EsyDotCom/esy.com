// Shared bits for round two (2026-10-06): symbols built from the e and its
// 45° cut rather than from animals.

import type { TakeCopy } from './Board';

export const ROUND_TWO_NOTE =
  'Prototype. The e is real: its cut comes from Black Ops One, as in our loader. Every symbol here is built from that e or its 45° corners. Step names are samples.';

/** A regular octagon (a square with 45° cuts) as polygon points. */
export function octagon(cx: number, cy: number, size: number): [number, number][] {
  const h = size / 2;
  const c = size * 0.2929; // the cut that makes all eight sides equal
  return [
    [cx - h + c, cy - h], [cx + h - c, cy - h], [cx + h, cy - h + c], [cx + h, cy + h - c],
    [cx + h - c, cy + h], [cx - h + c, cy + h], [cx - h, cy + h - c], [cx - h, cy - h + c],
  ];
}

export const pts = (ps: [number, number][]) => ps.map(([x, y]) => `${+x.toFixed(2)},${+y.toFixed(2)}`).join(' ');

/** Deterministic noise in [-1, 1], so scattered layouts render the same on server and client. */
export const noise = (n: number) => {
  const s = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return (s - Math.floor(s)) * 2 - 1;
};

export type { TakeCopy };
