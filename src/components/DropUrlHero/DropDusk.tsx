'use client';

/* A · Dusk — the Native shape, in our palette.
 *
 * Centred serif promise over a night backdrop, the URL field as the only call
 * to action, and a slow drift of sample posts across the bottom edge. The
 * rotating vertical does the segmenting so one hero serves every audience.
 * What we add to the shape: the cost line. Anyone can promise fifty posts;
 * the receipt is the part only Esy shows. */

import { DuskBackdrop } from './Backdrops';
import { CreativeMarquee, ResultSummary, RotatingVertical, UrlForm, WorkingLine, useGenerate } from './shared';
import { sampleSetFor } from './sample-feed';

// Before anyone types, the drift shows a set for a made-up shop, so the hero
// is never empty and the cards say what the button will do.
const IDLE = sampleSetFor('northlight.co', 10);

export default function DropDusk({ src = 'drop-dusk' }: { src?: string }) {
  const { set, working, run } = useGenerate(12);
  const shown = set ?? IDLE;

  return (
    <section className="du du--dusk">
      <DuskBackdrop />
      <div className="du-wrap">
        <h1 className="du-h1">
          Marketing
          <em>
            for <RotatingVertical />
          </em>
        </h1>
        <p className="du-tagline">A month of posts, made overnight — and the bill, itemised.</p>

        <UrlForm onGenerate={run} working={working} />
        <p className="du-hint">Drop your URL and we&apos;ll write your next 50 posts. No signup.</p>
        <WorkingLine working={working} />

        {set && <ResultSummary set={set} src={src} />}
      </div>

      {/* ── The drift: what came back, or what could ───────────────────── */}
      <div className="du-shelf">
        <CreativeMarquee creatives={shown.creatives} brand={shown.brand} />
      </div>
    </section>
  );
}
