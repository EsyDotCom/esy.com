'use client';

/* Hero C · Tour — four plain questions on the left; each one scrolls the
 * Books window to its answer and sets the rest back. It plays through on its
 * own until the visitor clicks a question or anything in the window. */

import OfficePreview from '@/components/OfficePreview/OfficePreview';
import { HeroActions, HeroProof, PreviewCaption } from './shared';
import { TOUR_STEPS, TOUR_STEP_MS, TourSteps, useAutoTour } from './tour';

export default function HeroTour({ src = 'hero-tour' }: { src?: string }) {
  const tour = useAutoTour();

  return (
    <section className="hl hl-hero">
      <div className="hl-wrap hl-tour" style={{ ['--hl-step-ms' as string]: `${TOUR_STEP_MS}ms` }}>
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
          <TourSteps tour={tour} />
          <HeroActions src={src} docs={false} />
          <HeroProof />
        </div>
        <div className="hl-shot">
          <OfficePreview focus={TOUR_STEPS[tour.step].part} screenHeight={720} onInteract={tour.stop} />
          <PreviewCaption />
        </div>
      </div>
    </section>
  );
}
