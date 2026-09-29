'use client';

/* The clock behind every clip.art run replay. Playback moves through phases
 * (the order, then each step, then done); within a phase, `p` runs 0 → 1.
 * `runSeconds` and `usd` are the real run's clock and running cost at that
 * moment, so the counters on screen always read true: the 31.6-second render
 * plays in about three seconds, and the clock fast-forwards to match.
 *
 * Hover pauses (pass the handlers to the root). People who ask for reduced
 * motion get the finished frame, still.
 */
import { useEffect, useRef, useState } from 'react';
import { CLIPART_RUN } from './clipartRun';

export type Phase = 'order' | 'render' | 'cutout' | 'refine' | 'audit' | 'name' | 'gate' | 'done';

// How long each phase plays, in ms. The render is the long step in the run,
// and the one worth watching, so it keeps the most screen time.
const PHASES: { phase: Phase; ms: number }[] = [
  { phase: 'order', ms: 1800 },
  { phase: 'render', ms: 3200 },
  { phase: 'cutout', ms: 1900 },
  { phase: 'refine', ms: 700 },
  { phase: 'audit', ms: 1700 },
  { phase: 'name', ms: 2100 },
  { phase: 'gate', ms: 1700 },
  { phase: 'done', ms: 4200 },
];

export const PHASE_ORDER = PHASES.map((p) => p.phase);
const T = CLIPART_RUN.timeline;

/** The real run's clock (seconds) and cost at a phase and progress. */
function realAt(index: number, p: number) {
  if (index === 0) return { runSeconds: 0, usd: 0 };
  if (index >= PHASES.length - 1) return { runSeconds: CLIPART_RUN.seconds, usd: CLIPART_RUN.totalUsd };
  const step = T[index - 1];
  const done = T.slice(0, index - 1).reduce((a, s) => a + s.usd, 0);
  return { runSeconds: step.start + (step.end - step.start) * p, usd: done + step.usd * (p >= 1 ? 1 : p > 0.85 ? 1 : 0) };
}

export function useRunReplay() {
  const [state, setState] = useState({ index: 0, p: 0 });
  const paused = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState({ index: PHASES.length - 1, p: 1 });
      return;
    }
    let raf = 0;
    let index = 0;
    let elapsed = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      if (!paused.current) {
        elapsed += dt;
        if (elapsed >= PHASES[index].ms) {
          elapsed = 0;
          index = (index + 1) % PHASES.length;
        }
        setState({ index, p: Math.min(1, elapsed / PHASES[index].ms) });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const phase = PHASES[state.index].phase;
  const real = realAt(state.index, state.p);
  return {
    phase,
    index: state.index,
    p: state.p,
    /** True once a phase has finished (or is the current one, when `orNow`). */
    past: (ph: Phase, orNow = false) => {
      const i = PHASE_ORDER.indexOf(ph);
      return i < state.index || (orNow && i === state.index);
    },
    runSeconds: real.runSeconds,
    usd: real.usd,
    hover: {
      onMouseEnter: () => (paused.current = true),
      onMouseLeave: () => (paused.current = false),
    },
  };
}

/** "00:31.7" */
export const clock = (s: number) => `00:${s.toFixed(1).padStart(4, '0')}`;
/** "$0.053" */
export const money = (usd: number) => `$${usd.toFixed(3)}`;
