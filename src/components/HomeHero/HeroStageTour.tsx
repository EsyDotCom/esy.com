'use client';

/* Hero E · Stage Tour — B's top, C's side by side underneath.
 *
 * B's centred headline and single button lead. Under the button, C's layout
 * takes over: the four questions on the left play through on their own, each
 * lighting its answer in the Books window on the right. A click on a question
 * or anything in the window hands control to the visitor. */

import OfficePreview from '@/components/OfficePreview/OfficePreview';
import { HeroActions, PreviewCaption } from './shared';
import { TOUR_STEPS, TOUR_STEP_MS, TourSteps, useAutoTour } from './tour';

export default function HeroStageTour({ src = 'hero-stage-tour' }: { src?: string }) {
  const tour = useAutoTour();

  return (
    <section className="hl hl-hero">
      <div className="hl-wrap" style={{ ['--hl-step-ms' as string]: `${TOUR_STEP_MS}ms` }}>
        {/* ── B: the promise and one action, centred ───────────────────── */}
        <div className="hl-stage">
          <h1 className="hl-h1">
            Your AI Marketing team&apos;s work and spend, <em>on one page</em>.
          </h1>
          <p className="hl-sub">
            See what your AI workers made this week, what it cost for each client, and what&apos;s waiting on you. Esy
            runs the work and keeps the books, so you never have to piece it together.
          </p>
          <HeroActions src={src} docs={false} />
        </div>

        {/* ── C: questions beside the window they drive ──────────────────── */}
        <div className="hl-tour hl-stage-tour-body">
          <TourSteps tour={tour} />
          <div className="hl-shot">
            <OfficePreview focus={TOUR_STEPS[tour.step].part} screenHeight={680} onInteract={tour.stop} />
            <PreviewCaption />
          </div>
        </div>
      </div>
    </section>
  );
}
