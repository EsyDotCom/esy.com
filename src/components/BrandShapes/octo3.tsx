'use client';

// The octopus, round seven (2026-10-06): four neutral designs. No smile, no
// cheeks; calm eyes that look steady and attentive. Same stencil arms, same
// 480 × 360 box as the earlier octopuses, so they drop into any scene.
//
//   keeper — rounded head, half-lidded attentive eyes
//   beacon — lighthouse bands on the head and a small light on top
//   cap    — a keeper's cap with a teal band
//   mark   — a pure octagon head with tall stencil eyes; the most logo-like

import { useState, type ReactNode } from 'react';
import { Box, C, Chain, taper } from './draw';
import { octagon, pts } from './symbols';

export type OctoVariant = 'keeper' | 'beacon' | 'cap' | 'mark';
export const VARIANTS: { id: OctoVariant; name: string }[] = [
  { id: 'keeper', name: 'Keeper' },
  { id: 'beacon', name: 'Beacon' },
  { id: 'cap', name: 'Cap' },
  { id: 'mark', name: 'Mark' },
];

export const ROUND_SEVEN_NOTE =
  'Prototype. Four neutral octopus designs; the buttons under the picture switch between them. Every world is drawn in the 45° stencil cut of our e, and the footer on this page is the theme’s own.';

const SEGS = taper(4, 26, 24, 13);
const ARMS = Array.from({ length: 8 }, (_, i) => ({ i, x: 186 + i * 15.4, angle: (3.5 - i) * 16, front: i % 2 === 0 }));

/** Calm eyes: whites, low pupils, and a lid across the top so the look is attentive, not surprised. */
function CalmEyes({ lid }: { lid: string }) {
  return (
    <g className="bs-oct-eyes" style={{ transformOrigin: '240px 124px' }}>
      {[194, 248].map((x) => (
        <g key={x}>
          <Box x={x} y={102} w={38} h={40} c={12} fill={C.ivory} />
          <Box x={x + 12} y={118} w={15} h={18} c={5} fill={C.ink} />
          <Box x={x + 19} y={120} w={4} h={4} c={1} fill={C.ivory} />
          <Box x={x - 1} y={100} w={40} h={10} c={[12, 12, 0, 0]} fill={lid} />
        </g>
      ))}
    </g>
  );
}

/** One of the four neutral octopuses. `items` sit in arm tips; `sync` curls every arm together. */
export function NeutralOcto({ variant = 'keeper', items = {}, sync = false }: { variant?: OctoVariant; items?: Record<number, ReactNode>; sync?: boolean }) {
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
  const isMark = variant === 'mark';
  return (
    <svg className="bs-svg bs-oct bs-octo3" viewBox="0 0 480 360" role="img" aria-label={`A neutral teal and navy stencil octopus (${variant})`}>
      <g className="bs-oct-body">
        {ARMS.filter((a) => !a.front).map(arm)}
        {/* A thin mint rim, like moonlight on its edge, so it reads on night water too. */}
        {isMark ? (
          <polygon points={pts(octagon(240, 112, 156))} fill={C.navy} stroke={C.mint} strokeWidth={3} strokeOpacity={0.8} />
        ) : (
          <Box x={166} y={34} w={148} h={150} c={[62, 62, 34, 34]} fill={C.navy} stroke={C.mint} strokeWidth={3} strokeOpacity={0.8} />
        )}
        {variant === 'keeper' && <Box x={190} y={60} w={12} h={30} c={6} fill={C.mint} opacity={0.7} />}
        {variant === 'beacon' && (
          <g>
            <Box x={186} y={62} w={108} h={14} fill={C.teal} />
            <Box x={180} y={80} w={120} h={6} fill={C.ivory} opacity={0.9} />
            <Box x={232} y={16} w={16} h={20} fill={C.ivory} />
            <polygon className="bs-octo3-lamp" points={pts(octagon(240, 12, 22))} fill={C.mint} style={{ transformOrigin: '240px 12px' }} />
          </g>
        )}
        {variant === 'cap' && (
          <g>
            <Box x={176} y={22} w={128} h={38} c={[24, 24, 0, 0]} fill={C.ink} />
            <Box x={176} y={48} w={128} h={9} fill={C.teal} />
            <Box x={190} y={57} w={100} h={8} c={[0, 0, 5, 5]} fill={C.ink} />
            <polygon points={pts(octagon(240, 36, 14))} fill={C.ivory} />
          </g>
        )}
        {isMark ? (
          <Box x={176} y={176} w={128} h={24} c={[0, 0, 12, 12]} fill={C.navy} />
        ) : (
          <Box x={172} y={176} w={136} h={24} c={[0, 0, 12, 12]} fill={C.navy} />
        )}
        {ARMS.filter((a) => a.front).map(arm)}
        {isMark ? (
          <g className="bs-oct-eyes" style={{ transformOrigin: '240px 118px' }}>
            {[206, 252].map((x) => (
              <g key={x}>
                <Box x={x} y={96} w={22} h={40} c={7} fill={C.ivory} />
                <Box x={x + 6} y={114} w={10} h={18} c={3} fill={C.ink} />
              </g>
            ))}
          </g>
        ) : (
          <CalmEyes lid={C.navy} />
        )}
      </g>
    </svg>
  );
}

/** The octopus placed in a larger scene at (x, y), `w` wide. */
export function OctoV({ x, y, w, variant, items, sync }: { x: number; y: number; w: number; variant?: OctoVariant; items?: Record<number, ReactNode>; sync?: boolean }) {
  return (
    <svg x={x} y={y} width={w} height={(w * 360) / 480} viewBox="0 0 480 360">
      <NeutralOcto variant={variant} items={items} sync={sync} />
    </svg>
  );
}

/** A hero that draws its scene with any of the four octopuses, picked underneath. */
export function VariantHero({ scene, initial = 'keeper', night = true, options }: { scene: (v: OctoVariant) => ReactNode; initial?: OctoVariant; night?: boolean; options?: OctoVariant[] }) {
  const [v, setV] = useState<OctoVariant>(initial);
  return (
    <div className={`bs-frame bs-frame--flush is-in${night ? ' bs-frame--night' : ''}`}>
      {scene(v)}
      <div className="bs-chips bs-look" role="group" aria-label="Which octopus">
        {VARIANTS.filter((x) => !options || options.includes(x.id)).map((x) => (
          <button key={x.id} type="button" className={v === x.id ? 'is-on' : ''} onClick={() => setV(x.id)}>
            {x.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Small held things for the keeper. */
export const KEPT = {
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
  key: (
    <g>
      <polygon points={pts(octagon(0, 10, 16))} fill="none" stroke={C.ivory} strokeWidth={4} />
      <Box x={-2} y={17} w={4} h={20} fill={C.ivory} />
      <Box x={2} y={28} w={7} h={4} fill={C.ivory} />
    </g>
  ),
  stone: <Box x={-14} y={2} w={28} h={14} c={[4, 4, 0, 0]} fill={C.ivory} />,
  gem: <polygon points={pts(octagon(0, 14, 22))} fill={C.mint} />,
} satisfies Record<string, ReactNode>;

// Round eight (2026-10-06): the octopus alone, doing one job per world,
// everything it works with abstract. The lighthouse appears only as a small,
// far light that answers to the work.
export const ROUND_EIGHT_NOTE =
  'Prototype. The octopus alone: Mark by default, Keeper to compare. Everything it builds, checks, keeps or connects is abstract, and the footer on this page is the theme’s own.';
export const MARK_OR_KEEPER: OctoVariant[] = ['mark', 'keeper'];
