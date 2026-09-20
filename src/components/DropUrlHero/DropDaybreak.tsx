'use client';

/* B · Daybreak — the light, calm version.
 *
 * Same input, different mood and different geometry: copy and field on the
 * left, and the sample posts stacked in two columns that drift *upward* on
 * the right, so the output is beside the promise rather than under it. Warm
 * paper backdrop, because the dark hero is a crowded look in this category
 * and the office itself is a light product. */

import { DaybreakBackdrop } from './Backdrops';
import { CreativeCard, ResultSummary, UrlForm, WorkingLine, useGenerate } from './shared';
import { sampleSetFor } from './sample-feed';

const IDLE = sampleSetFor('kilen-camping.no', 12);

export default function DropDaybreak({ src = 'drop-daybreak' }: { src?: string }) {
  const { set, working, run } = useGenerate(12);
  const shown = set ?? IDLE;
  // Two columns drifting at different speeds reads as a feed; one column reads
  // as a list. Split the set in half rather than repeating it.
  const half = Math.ceil(shown.creatives.length / 2);
  const columns = [shown.creatives.slice(0, half), shown.creatives.slice(half)];

  return (
    <section className="du du--daybreak">
      <DaybreakBackdrop />
      <div className="du-wrap du-split">
        <div className="du-split-copy">
          <h1 className="du-h1">
            Your next month of marketing, <em>made tonight</em>.
          </h1>
          <p className="du-sub">
            Give Esy your website. It reads what you sell, writes a month of posts in your voice, and hands you the
            bill and the ones that need a human. You approve; it publishes.
          </p>

          <UrlForm onGenerate={run} working={working} tone="light" label="Make my month" />
          <p className="du-hint is-light">50 posts across Instagram, Facebook and LinkedIn. Free to try, no signup.</p>
          <WorkingLine working={working} />

          {set && <ResultSummary set={set} src={src} />}
        </div>

        {/* ── Two drifting columns of what it makes ─────────────────────── */}
        <div className="du-columns" aria-label={`Sample posts for ${shown.brand}`}>
          {columns.map((col, i) => (
            <div key={i} className="du-column" style={{ animationDuration: `${52 + i * 14}s`, animationDelay: `${i * -8}s` }}>
              {[...col, ...col].map((c, j) => (
                <CreativeCard key={`${c.id}-${j}`} creative={c} brand={shown.brand} />
              ))}
            </div>
          ))}
          <div className="du-columns-fade" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
