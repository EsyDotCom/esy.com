'use client';

/* Hero C · Tour — four plain questions on the left; each one scrolls the
 * Books window to its answer and sets the rest back. It plays through on its
 * own until the visitor clicks a question or anything in the window. */

import { useEffect, useState } from 'react';
import OfficePreview, { type BooksPart } from '@/components/OfficePreview/OfficePreview';
import { HeroActions, HeroProof, PreviewCaption } from './shared';

const STEPS: { part: BooksPart; q: string; a: string }[] = [
  { part: 'stats', q: 'What did we make this week?', a: 'Pieces, pages and scenes, counted as they’re filed, plus what’s waiting for your approval.' },
  { part: 'spend', q: 'Where did the money go?', a: 'Every model call, rolled up to the client it was for, day by day.' },
  { part: 'budgets', q: 'Are we on budget?', a: 'A monthly budget per client, with a tick for where spend should be today.' },
  { part: 'workers', q: 'Who’s doing the work?', a: 'Each AI worker’s output, and what one piece costs.' },
];
const STEP_MS = 5000;

export default function HeroTour({ src = 'hero-tour' }: { src?: string }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  // Advance through the questions until the visitor takes over.
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEP_MS);
    return () => clearTimeout(t);
  }, [step, playing]);

  return (
    <section className="hl hl-hero">
      <div className="hl-wrap hl-tour" style={{ ['--hl-step-ms' as string]: `${STEP_MS}ms` }}>
        <div>
          <span className="hl-eyebrow">
            <span className="dot" aria-hidden="true" />
            Esy OS
          </span>
          <h1 className="hl-h1">
            Every piece, every dollar, <em>every sign-off</em>.
          </h1>
          <p className="hl-sub">
            Esy runs AI workers that make your marketing, then answers the questions you&apos;d otherwise ask in a
            spreadsheet.
          </p>
          <ol className="hl-steps">
            {STEPS.map((s, i) => (
              <li key={s.part}>
                <button
                  type="button"
                  className="hl-step"
                  aria-current={step === i}
                  onClick={() => {
                    setStep(i);
                    setPlaying(false);
                  }}
                >
                  {/* Re-keyed per step so the progress bar restarts each time. */}
                  <span key={`${step}-${playing}`} className={`bar ${playing ? 'is-running' : ''}`} aria-hidden="true" />
                  <span className="q">{s.q}</span>
                  <span className="a">{s.a}</span>
                </button>
              </li>
            ))}
          </ol>
          <HeroActions src={src} docs={false} />
          <HeroProof />
        </div>
        <div className="hl-shot">
          <OfficePreview focus={STEPS[step].part} screenHeight={720} onInteract={() => setPlaying(false)} />
          <PreviewCaption />
        </div>
      </div>
    </section>
  );
}
