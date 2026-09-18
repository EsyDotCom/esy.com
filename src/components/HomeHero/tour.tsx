'use client';

/* The Tour's flow, shared by every hero that plays it (C · Tour, D · Split
 * Tour, E · Stage Tour): four plain questions, each pointing at the part of
 * the Books that answers it, advancing on a timer until the visitor takes
 * over. */

import { useEffect, useState } from 'react';
import type { BooksPart } from '@/components/OfficePreview/OfficePreview';

export const TOUR_STEPS: { part: BooksPart; label: string; q: string; a: string }[] = [
  { part: 'stats', label: 'The week', q: 'What did we make this week?', a: 'Pieces, pages and scenes, counted as they’re filed, plus what’s waiting for your approval.' },
  { part: 'spend', label: 'Spend by client', q: 'Where did the money go?', a: 'Every model call, rolled up to the client it was for, day by day.' },
  { part: 'budgets', label: 'Budgets', q: 'Are we on budget?', a: 'A monthly budget per client, with a tick for where spend should be today.' },
  { part: 'workers', label: 'Workers', q: 'Who’s doing the work?', a: 'Each AI worker’s output, and what one piece costs.' },
];
export const TOUR_STEP_MS = 5000;

/** The current step, advancing every TOUR_STEP_MS until `stop()` or `go()`. */
export function useAutoTour(count = TOUR_STEPS.length, ms = TOUR_STEP_MS) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % count), ms);
    return () => clearTimeout(t);
  }, [step, playing, count, ms]);

  return {
    step,
    playing,
    /** Jump to a step and hand control to the visitor. */
    go: (i: number) => {
      setStep(i);
      setPlaying(false);
    },
    stop: () => setPlaying(false),
    /** Start again from the current step. */
    play: () => setPlaying(true),
  };
}

/** The Tour's question list: the active question lifts, with a progress rule. */
export function TourSteps({ tour }: { tour: ReturnType<typeof useAutoTour> }) {
  return (
    <ol className="hl-steps">
      {TOUR_STEPS.map((s, i) => (
        <li key={s.part}>
          <button type="button" className="hl-step" aria-current={tour.step === i} onClick={() => tour.go(i)}>
            {/* Re-keyed per step so the progress bar restarts each time. */}
            <span key={`${tour.step}-${tour.playing}`} className={`bar ${tour.playing ? 'is-running' : ''}`} aria-hidden="true" />
            <span className="q">{s.q}</span>
            <span className="a">{s.a}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}
