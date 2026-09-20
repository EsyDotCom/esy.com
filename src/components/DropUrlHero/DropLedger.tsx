'use client';

/* C · Ledger — the same input, but the receipt is the hero.
 *
 * Volume is a crowded promise ("50 posts!") and invites the obvious reply:
 * fifty posts of what? This direction answers with the thing our competitors
 * can't print — every piece, what it cost, and which ones we refuse to
 * publish without a human. The posts still drift underneath; the ledger is
 * what you look at. */

import { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { LedgerBackdrop } from './Backdrops';
import { CreativeMarquee, ResultSummary, UrlForm, WorkingLine, useGenerate } from './shared';
import { sampleSetFor, type SampleSet } from './sample-feed';

const IDLE = sampleSetFor('seopage.com', 10);

/** Counts a dollar figure up when the set changes, so the total lands rather
 *  than appears. Skipped for anyone who asked for less motion. */
function useCountUp(target: number, ms = 900) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      // Ease out, so the last cents settle instead of snapping.
      setValue(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, ms]);
  return value;
}

/** The itemised half: the first rows of the run, priced. */
function LedgerPanel({ set }: { set: SampleSet }) {
  const total = useCountUp(set.cost);
  return (
    <div className="du-ledger">
      <header className="du-ledger-head">
        <span>This month for {set.brand}</span>
        <b>${total.toFixed(2)}</b>
      </header>
      <ol className="du-ledger-rows">
        {set.creatives.slice(0, 6).map((c) => (
          <li key={c.id}>
            <span className="du-ledger-what">{c.art.replace(/\n/g, ' ')}</span>
            <span className="du-ledger-ch">{c.channel}</span>
            {c.review ? <span className="du-ledger-flag">Held for you</span> : <span className="du-ledger-ok">Ready</span>}
            <span className="du-ledger-cost">${c.cost.toFixed(2)}</span>
          </li>
        ))}
        <li className="du-ledger-rest">
          <span className="du-ledger-what">+ {set.total - 6} more pieces this month</span>
          <span className="du-ledger-cost">${(set.cost - set.creatives.slice(0, 6).reduce((s, c) => s + c.cost, 0)).toFixed(2)}</span>
        </li>
      </ol>
      <footer className="du-ledger-foot">
        <ShieldCheck size={15} aria-hidden="true" />
        {set.needsReview} pieces make a claim about price, safety or results — Esy holds those until you say yes.
      </footer>
    </div>
  );
}

export default function DropLedger({ src = 'drop-ledger' }: { src?: string }) {
  const { set, working, run } = useGenerate(12);
  const shown = set ?? IDLE;

  return (
    <section className="du du--ledger">
      <LedgerBackdrop />
      <div className="du-wrap">
        <h1 className="du-h1">
          A month of marketing for <em>the price of lunch</em>.
        </h1>
        <p className="du-tagline">
          Drop your URL. Esy writes the month, prices every piece, and holds back anything that needs a human.
        </p>

        <UrlForm onGenerate={run} working={working} label="Price my month" />
        <WorkingLine working={working} />

        <div className="du-ledger-stage">
          <LedgerPanel set={shown} />
          {set ? (
            <ResultSummary set={set} src={src} />
          ) : (
            <p className="du-ledger-idle">
              That&apos;s a real month for one of our own projects, at our real per-piece cost. Type your address to see
              yours.
            </p>
          )}
        </div>
      </div>

      <div className="du-shelf">
        <CreativeMarquee creatives={shown.creatives} brand={shown.brand} speed={84} />
      </div>
    </section>
  );
}
