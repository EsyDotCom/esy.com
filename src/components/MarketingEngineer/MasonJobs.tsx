'use client';
/* Mason with a job in every arm (2026-11-07, /prototypes/marketing-engineer/). The live stencil
 * octopus (BrandShapes/octopus-figure.tsx, the footer's Mason) holds one small mark per job at
 * each arm's tip, left to right in JOBS order; the lit job glows. `labels` adds a chip per arm,
 * placed past its tip on a staggered fan so neighbours don't collide. Picking a chip lights it. */
import type { CSSProperties, ReactNode } from 'react';
import { OctopusFigure } from '@/components/BrandShapes/octopus-figure';
import { Box, C } from '@/components/BrandShapes/draw';
import { JOBS, type JobId } from './content';
import '@/components/BrandShapes/reef.css';

// One mark per job, drawn hanging from the arm's tip (the arm points down in its own frame).
const MARK: Record<JobId, ReactNode> = {
  research: (
    <g>
      <Box x={-11} y={2} w={18} h={18} c={6} fill="none" stroke={C.ivory} strokeWidth={4} />
      <Box x={4} y={18} w={6} h={12} c={2} r={-40} fill={C.ivory} />
    </g>
  ),
  write: (
    <g>
      <Box x={-12} y={2} w={24} h={30} c={[0, 9, 0, 0]} fill={C.ivory} />
      <Box x={-7} y={12} w={14} h={3} fill={C.teal} />
      <Box x={-7} y={19} w={10} h={3} fill={C.teal} />
    </g>
  ),
  check: (
    <g>
      <Box x={-12} y={2} w={24} h={24} c={7} fill={C.mint} />
      <polyline points="-6,14 -1,19 7,9" fill="none" stroke={C.ink} strokeWidth={3.5} strokeLinecap="square" />
    </g>
  ),
  publish: (
    <g>
      <Box x={-13} y={2} w={26} h={28} c={4} fill={C.ivory} />
      <Box x={-13} y={2} w={26} h={7} c={[4, 4, 0, 0]} fill={C.bright} />
      <Box x={-8} y={14} w={16} h={10} fill={C.pale} />
    </g>
  ),
  newsletter: (
    <g>
      <Box x={-13} y={4} w={26} h={20} c={3} fill={C.ivory} />
      <polyline points="-12,6 0,16 12,6" fill="none" stroke={C.teal} strokeWidth={3} />
    </g>
  ),
  social: (
    <g>
      <Box x={-13} y={2} w={26} h={20} c={6} fill={C.bright} />
      <polygon points="-6,21 -6,29 2,21" fill={C.bright} />
      <Box x={-7} y={9} w={14} h={3} fill={C.ink} />
    </g>
  ),
  search: (
    <g>
      <Box x={-4} y={4} w={6} h={22} fill={C.teal} />
      <Box x={4} y={12} w={6} h={14} fill={C.bright} />
      <Box x={-12} y={14} w={6} h={12} fill={C.mint} />
    </g>
  ),
  outreach: <polygon points="-13,6 13,14 -13,24 -7,14" fill={C.ivory} />,
};

// Chips sit on an even elliptical arc around and under him, left to right in arm order, so each
// one reads beside its arm without chasing the curling tips. Rounded so server and client agree.
const chipAt = (i: number) => {
  const t = ((168 - i * (156 / 7)) * Math.PI) / 180;
  const round = (n: number) => Math.round(n * 100) / 100;
  return { x: round(((240 + 236 * Math.cos(t)) / 480) * 100), y: round(((206 + 168 * Math.sin(t)) / 360) * 100) };
};

export function MasonJobs({ lit, onPick, labels = true }: { lit?: JobId; onPick?: (id: JobId) => void; labels?: boolean }) {
  const items: Record<number, ReactNode> = {};
  JOBS.forEach((j, i) => {
    items[i] = <g className={`mj-mark ${lit === j.id ? 'is-lit' : ''}`}>{MARK[j.id]}</g>;
  });
  return (
    <div className={`mj ${labels ? 'has-labels' : ''}`}>
      <div className="mj-figure"><OctopusFigure items={items} /></div>
      {labels && JOBS.map((j, i) => {
        const p = chipAt(i);
        return (
          <button
            key={j.id}
            type="button"
            className={`mj-chip ${lit === j.id ? 'is-lit' : ''}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` } as CSSProperties}
            onClick={() => onPick?.(j.id)}
            onMouseEnter={() => onPick?.(j.id)}
            aria-pressed={lit === j.id}
          >
            <span>{String(i + 1).padStart(2, '0')}</span>{j.name}
          </button>
        );
      })}
    </div>
  );
}
