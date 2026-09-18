'use client';

/* Hero D · Split Tour — A's promise, C's flow.
 *
 * A's headline ("Know what your AI made, and what it cost.") leads the left
 * column; under it, C's four questions play through on their own, each one
 * lighting its answer in a Books window that runs off the right edge, as in A. */

import OfficePreview from '@/components/OfficePreview/OfficePreview';
import { HeroActions, HeroProof, PreviewCaption } from './shared';
import { TOUR_STEPS, TOUR_STEP_MS, TourSteps, useAutoTour } from './tour';

export default function HeroSplitTour({ src = 'hero-split-tour' }: { src?: string }) {
  const tour = useAutoTour();

  return (
    <section className="hl hl-hero">
      <div className="hl-wrap hl-split-tour" style={{ ['--hl-step-ms' as string]: `${TOUR_STEP_MS}ms` }}>
        <div>
          <span className="hl-eyebrow">
            <span className="dot" aria-hidden="true" />
            Esy OS
          </span>
          <h1 className="hl-h1">
            Know what your AI made, and <em>what it cost</em>.
          </h1>
          <p className="hl-sub">Esy runs your AI workers and keeps the books. Four questions it answers for you:</p>
          <TourSteps tour={tour} />
          <HeroActions src={src} docs={false} />
          <HeroProof />
        </div>
        <div className="hl-shot">
          <OfficePreview focus={TOUR_STEPS[tour.step].part} screenHeight={740} onInteract={tour.stop} />
          <PreviewCaption />
        </div>
      </div>
    </section>
  );
}
