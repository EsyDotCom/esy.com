'use client';

// S · Bee Swarm — a swarm with one mind. Thirty-six bees roam as a cloud,
// pull into an octagon, then split into three teams around three tasks, and
// let go again. No bee is told where to fly; each one follows its target.

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { BeeBody } from './Bee';
import { Board } from './Board';
import { Box, C, ROUND_FOUR_NOTE } from './draw';
import { noise, octagon, type TakeCopy } from './symbols';

const TASKS = [
  { name: 'Research', x: 110 },
  { name: 'Drafts', x: 240 },
  { name: 'Checks', x: 370 },
];
const PHASES = ['roam', 'ring', 'tasks'] as const;
type Phase = (typeof PHASES)[number];
const PHASE_MS = 3400;

/** Points evenly spaced around the octagon's outline. */
function ringPoints(n: number, cx: number, cy: number, size: number) {
  const corners = octagon(cx, cy, size);
  const sides = corners.map((a, i) => {
    const b = corners[(i + 1) % 8];
    return { a, b, len: Math.hypot(b[0] - a[0], b[1] - a[1]) };
  });
  const total = sides.reduce((s, x) => s + x.len, 0);
  return Array.from({ length: n }, (_, k) => {
    let d = (k / n) * total;
    const side = sides.find((s) => (d -= s.len) < 0) ?? sides[7];
    const t = 1 + d / side.len;
    return [side.a[0] + (side.b[0] - side.a[0]) * t, side.a[1] + (side.b[1] - side.a[1]) * t];
  });
}

/** Where bee i wants to be, for a phase and a moment in time. */
function target(phase: Phase, i: number, n: number, t: number, small: boolean): [number, number] {
  if (phase === 'ring') {
    const [x, y] = ringPoints(n, 240, 170, small ? 230 : 250)[i];
    return [x, y];
  }
  if (phase === 'tasks' && !small) {
    const team = i % 3;
    const slot = Math.floor(i / 3);
    return [TASKS[team].x - 45 + (slot % 4) * 30, 140 + Math.floor(slot / 4) * 28];
  }
  // Roam: each bee loops its own ellipse around the middle.
  const a = t * (0.6 + Math.abs(noise(i)) * 0.6) + i;
  return [240 + Math.cos(a) * (60 + Math.abs(noise(i + 7)) * 150), 170 + Math.sin(a * 1.3) * (40 + Math.abs(noise(i + 3)) * 90)];
}

export function Swarm({ count = 36, small = false }: { count?: number; small?: boolean }) {
  const bees = useRef<(SVGGElement | null)[]>([]);
  const [phase, setPhase] = useState<Phase>('roam');

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pos = Array.from({ length: count }, (_, i) => target('roam', i, count, 0, small));
    const face = Array(count).fill(1);
    const phases: Phase[] = small ? ['roam', 'ring'] : [...PHASES];
    let raf = 0;
    let shown: Phase = 'roam';
    const start = performance.now();
    let last = start;
    // Each frame: ease every bee toward its target by elapsed time (so it lands on
    // schedule even when frames are throttled), add a little buzz, face the way it's going.
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const k = still ? 1 : 1 - Math.exp(-((now - last) / 1000) * 3.2);
      last = now;
      const p = still ? phases[phases.length - 1] : phases[Math.floor((now - start) / PHASE_MS) % phases.length];
      if (p !== shown) setPhase((shown = p));
      pos.forEach((q, i) => {
        const [tx, ty] = target(p, i, count, t, small);
        const dx = (tx - q[0]) * k;
        q[0] += dx;
        q[1] += (ty - q[1]) * k;
        if (Math.abs(dx) > 0.15) face[i] = dx > 0 ? 1 : -1;
        // Buzz is drawn, not accumulated, so it never drifts a bee off its target.
        const bx = still ? 0 : Math.sin(t * 9 + i) * 2.5;
        const by = still ? 0 : Math.cos(t * 7 + i) * 2.5;
        bees.current[i]?.setAttribute('transform', `translate(${(q[0] + bx).toFixed(1)} ${(q[1] + by).toFixed(1)}) scale(${face[i] * (small ? 1.6 : 1)} ${small ? 1.6 : 1})`);
      });
      if (!still) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, small]);

  return (
    <svg className="bs-svg bs-swarm" viewBox="0 0 480 360" role="img" aria-label={`A swarm of ${count} stencil bees forming shapes and splitting into teams`}>
      {!small &&
        TASKS.map((tk) => (
          <g key={tk.name} className={`bs-swarm-task${phase === 'tasks' ? ' is-on' : ''}`}>
            <Box x={tk.x - 50} y={224} w={100} h={56} c={[10, 0, 10, 0]} fill={C.ivory} stroke={C.navy} strokeWidth={2} />
            <Box x={tk.x - 36} y={244} w={72} h={5} fill={C.teal} />
            <Box x={tk.x - 36} y={256} w={50} h={5} fill={C.teal} />
            <text x={tk.x} y={304} textAnchor="middle">
              {tk.name}
            </text>
          </g>
        ))}
      {Array.from({ length: count }, (_, i) => (
        <g key={i} ref={(el) => void (bees.current[i] = el)}>
          <g className="bs-bee-bob" style={{ animationDelay: `${(i % 7) * -0.11}s` } as CSSProperties}>
            <BeeBody />
          </g>
        </g>
      ))}
      {!small && (
        <text className="bs-swarm-caption" x={240} y={344} textAnchor="middle">
          {count} bees · {phase === 'roam' ? 'roaming' : phase === 'ring' ? 'in formation' : 'three teams, three tasks'}
        </text>
      )}
    </svg>
  );
}

export const SWARM_COPY: TakeCopy = {
  key: 'S',
  name: 'Bee Swarm',
  headline: 'A swarm with one mind.',
  lede: 'Thirty-six bees roam as a cloud, pull into an octagon, then split into three teams around three tasks. No one steers each bee; every one of them knows where the work is.',
  says: 'Agent swarms, coordinated. Esy sends many agents at once and keeps them pointed at the same goal.',
};

export default function BeeSwarm() {
  return (
    <Board
      tone="mint"
      copy={SWARM_COPY}
      note={ROUND_FOUR_NOTE}
      hero={
        <div className="bs-frame">
          <Swarm />
        </div>
      }
      mark={() => <Swarm count={10} small />}
      divider={
        <div className="bs-rule-comb" aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} className="bs-octagon" style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
