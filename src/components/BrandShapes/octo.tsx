'use client';

// The octopus, round six (2026-10-06): friendlier, not baby-cute. A rounder
// head, bigger eyes with a catchlight, a small smile and teal cheeks, on the
// same stencil arms and navy as the original (K). Trust comes from the calm
// motion and the palette; the face is what invites people in.
//
// Every round-six take draws the friendly one, and its hero has a toggle to
// compare it with the original on the spot.

import { useState, type ReactNode } from 'react';
import { Box, C, Chain, taper } from './draw';
import { OctopusFigure } from './Octopus';
import { octagon, pts } from './symbols';

export type OctoLook = 'friendly' | 'classic';

export const ROUND_SIX_NOTE =
  'Prototype. The friendly octopus is new this round; the toggle shows the original. Every world is drawn in the 45° stencil cut of our e, and the footer on this page is the theme’s own.';

const SEGS = taper(4, 26, 24, 13);
const ARMS = Array.from({ length: 8 }, (_, i) => ({ i, x: 186 + i * 15.4, angle: (3.5 - i) * 16, front: i % 2 === 0 }));

/**
 * The friendly octopus, facing out, in a 480 × 360 box. `items` puts things
 * in particular arms' tips; `sync` curls every arm together (the conductor).
 */
export function FriendlyOcto({ items = {}, sync = false }: { items?: Record<number, ReactNode>; sync?: boolean }) {
  const arm = (a: (typeof ARMS)[number]) => (
    <g key={a.i} transform={`translate(${a.x} 196) rotate(${a.angle})`}>
      <Chain
        segs={SEGS}
        className={sync ? 'bs-octo2-sync' : 'bs-oct-seg'}
        vars={{ '--a': a.i, '--amp': `${6 + Math.abs(3.5 - a.i) * 2}deg` }}
        fill={(k) => (k === SEGS.length - 1 ? C.bright : a.front ? C.navy : C.deep)}
        tip={items[a.i]}
      />
    </g>
  );
  return (
    <svg className="bs-svg bs-oct bs-octo2" viewBox="0 0 480 360" role="img" aria-label="A friendly teal and navy stencil octopus">
      <g className="bs-oct-body">
        {ARMS.filter((a) => !a.front).map(arm)}
        <Box x={166} y={34} w={148} h={150} c={[62, 62, 34, 34]} fill={C.navy} />
        <Box x={190} y={60} w={14} h={34} c={7} fill={C.mint} opacity={0.8} />
        <Box x={212} y={54} w={8} h={8} c={2} fill={C.mint} opacity={0.6} />
        <Box x={172} y={176} w={136} h={24} c={[0, 0, 12, 12]} fill={C.navy} />
        {ARMS.filter((a) => a.front).map(arm)}
        <g className="bs-oct-eyes" style={{ transformOrigin: '240px 124px' }}>
          <Box x={194} y={102} w={38} h={42} c={12} fill={C.ivory} />
          <Box x={248} y={102} w={38} h={42} c={12} fill={C.ivory} />
          <Box x={206} y={113} w={17} h={21} c={6} fill={C.ink} />
          <Box x={260} y={113} w={17} h={21} c={6} fill={C.ink} />
          <Box x={215} y={115} w={6} h={6} c={2} fill={C.ivory} />
          <Box x={269} y={115} w={6} h={6} c={2} fill={C.ivory} />
        </g>
        <polygon points={pts(octagon(200, 156, 13))} fill={C.mint} opacity={0.7} />
        <polygon points={pts(octagon(280, 156, 13))} fill={C.mint} opacity={0.7} />
        <polyline points="229,152 235,158 245,158 251,152" fill="none" stroke={C.ivory} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Either octopus: the friendly one by default, the original for comparison. */
export function Octo({ look = 'friendly', items, sync }: { look?: OctoLook; items?: Record<number, ReactNode>; sync?: boolean }) {
  return look === 'classic' ? <OctopusFigure /> : <FriendlyOcto items={items} sync={sync} />;
}

/** The octopus placed inside a larger scene at (x, y), `w` wide. */
export function OctoAt({ x, y, w, look, items, sync }: { x: number; y: number; w: number; look?: OctoLook; items?: Record<number, ReactNode>; sync?: boolean }) {
  return (
    <svg x={x} y={y} width={w} height={(w * 360) / 480} viewBox="0 0 480 360">
      <Octo look={look} items={items} sync={sync} />
    </svg>
  );
}

/** A hero that draws its scene with either octopus, with the toggle beneath. */
export function LookHero({ scene, night = false }: { scene: (look: OctoLook) => ReactNode; night?: boolean }) {
  const [look, setLook] = useState<OctoLook>('friendly');
  return (
    <div className={`bs-frame bs-frame--flush${night ? ' bs-frame--night' : ''}`}>
      {scene(look)}
      <div className="bs-chips bs-look" role="group" aria-label="Which octopus">
        {(['friendly', 'classic'] as const).map((l) => (
          <button key={l} type="button" className={look === l ? 'is-on' : ''} onClick={() => setLook(l)}>
            {l === 'friendly' ? 'Friendly (new)' : 'Original'}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Small held things, shared across takes. */
export const HELD = {
  magnifier: (
    <g>
      <Box x={-3} y={0} w={6} h={16} fill={C.ivory} />
      <polygon points={pts(octagon(0, 28, 26))} fill="none" stroke={C.ivory} strokeWidth={5} />
      <polygon points={pts(octagon(0, 28, 16))} fill={C.mint} opacity={0.35} />
    </g>
  ),
  clipboard: (
    <g>
      <Box x={-12} y={2} w={24} h={30} c={[0, 0, 4, 4]} fill={C.ivory} />
      <Box x={-6} y={0} w={12} h={5} fill={C.teal} />
      <polyline points="-6,17 -2,21 6,12" fill="none" stroke={C.teal} strokeWidth={3} />
    </g>
  ),
  baton: <Box x={-2} y={0} w={4} h={34} c={[0, 0, 2, 2]} fill={C.ivory} />,
  coral: (
    <g>
      <Box x={-3} y={2} w={6} h={22} fill={C.bright} />
      <Box x={-12} y={8} w={6} h={14} r={-30} fill={C.mint} />
      <Box x={6} y={6} w={6} h={14} r={30} fill={C.mint} />
    </g>
  ),
  tag: (
    <g>
      <Box x={-10} y={2} w={20} h={14} c={[0, 5, 0, 0]} fill={C.ivory} />
      <Box x={-6} y={8} w={12} h={3} fill={C.teal} />
    </g>
  ),
  lantern: (
    <g>
      <Box x={-1} y={0} w={2} h={10} fill={C.ivory} />
      <polygon points={pts(octagon(0, 20, 18))} fill={C.mint} />
    </g>
  ),
  logbook: (
    <g>
      <Box x={-13} y={2} w={26} h={20} c={[0, 0, 4, 4]} fill={C.ivory} />
      <Box x={-1} y={2} w={2} h={20} fill={C.teal} />
    </g>
  ),
  map: (
    <g>
      <Box x={-14} y={2} w={28} h={22} fill={C.ivory} />
      <polyline points="-10,18 -4,10 2,14 10,6" fill="none" stroke={C.teal} strokeWidth={2} />
    </g>
  ),
} satisfies Record<string, ReactNode>;

