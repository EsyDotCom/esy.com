'use client';

/* Pieces the three "drop your URL" heroes share.
 *
 * The bet in this prototype: the fastest way to explain Esy is to let the
 * visitor watch it work on *their* site. The input is the call to action, the
 * cards are the output, and the cost line underneath is the part only we can
 * say. Copy rule is the homepage's: plain words, no engine vocabulary. */

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Facebook, Instagram, Linkedin, Sparkles } from 'lucide-react';
import { sampleSetFor, type Channel, type Creative, type SampleSet } from './sample-feed';
import './DropUrlHero.css';

export const waitlistHref = (src: string) => `/waitlist/?src=${src}`;

/* ── The URL field ───────────────────────────────────────────────────────── */

export interface GenerateState {
  /** null before the first generate; the set once it has run. */
  set: SampleSet | null;
  /** True while the fake work "runs", so the page can show progress. */
  working: boolean;
}

/**
 * Runs a sample set for whatever was typed. The delay is deliberate: an
 * instant answer reads as canned, and the pause is where the progress copy
 * gets to say what Esy is actually doing (reading the site, then writing).
 */
export function useGenerate(count = 12) {
  const [state, setState] = useState<GenerateState>({ set: null, working: false });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const run = (input: string) => {
    if (timer.current) clearTimeout(timer.current);
    setState({ set: null, working: true });
    timer.current = setTimeout(() => setState({ set: sampleSetFor(input, count), working: false }), 1400);
  };

  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    setState({ set: null, working: false });
  };

  return { ...state, run, reset };
}

export function UrlForm({
  onGenerate,
  working,
  tone = 'dark',
  label = 'Generate',
  placeholder = 'yourcompany.com',
}: {
  onGenerate: (value: string) => void;
  working: boolean;
  tone?: 'dark' | 'light';
  label?: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState('');

  return (
    <form
      className={`du-form du-form--${tone}`}
      onSubmit={(e) => {
        e.preventDefault();
        // An empty field still generates: a visitor who just hits the button
        // should see the product work, not an error.
        onGenerate(value || placeholder);
      }}
    >
      <input
        type="text"
        inputMode="url"
        autoComplete="off"
        spellCheck={false}
        aria-label="Your website address"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="du-generate" disabled={working}>
        {working ? 'Working…' : label}
        {!working && <ArrowRight size={17} aria-hidden="true" />}
      </button>
    </form>
  );
}

/** What Esy is doing while the set builds. Cycles until the set lands. */
const STEPS = ['Reading your site…', 'Learning how you sound…', 'Writing a month of posts…', 'Pricing the run…'];

export function WorkingLine({ working }: { working: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!working) { setI(0); return; }
    const id = setInterval(() => setI((n) => (n + 1) % STEPS.length), 420);
    return () => clearInterval(id);
  }, [working]);
  if (!working) return null;
  return (
    <p className="du-working" aria-live="polite">
      <Sparkles size={14} aria-hidden="true" /> {STEPS[i]}
    </p>
  );
}

/* ── The rotating vertical in the headline ───────────────────────────────── */

const VERTICALS = ['online shops', 'restaurants', 'software teams', 'studios', 'campsites'];

/** Types a word out, holds it, deletes it. Pauses for reduced-motion users. */
export function RotatingVertical({ words = VERTICALS }: { words?: string[] }) {
  const [text, setText] = useState(words[0]);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'hold' | 'out' | 'in'>('hold');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const word = words[index % words.length];
    const next = words[(index + 1) % words.length];
    let id: ReturnType<typeof setTimeout>;

    if (phase === 'hold') id = setTimeout(() => setPhase('out'), 2200);
    else if (phase === 'out') {
      id = setTimeout(() => {
        if (text.length > 0) setText(text.slice(0, -1));
        else { setIndex(index + 1); setPhase('in'); }
      }, 34);
    } else {
      id = setTimeout(() => {
        if (text.length < next.length) setText(next.slice(0, text.length + 1));
        else setPhase('hold');
      }, 58);
    }
    return () => clearTimeout(id);
  }, [text, phase, index, words]);

  return (
    <span className="du-rotate">
      {text}
      <span className="du-caret" aria-hidden="true" />
    </span>
  );
}

/* ── Sample creatives ────────────────────────────────────────────────────── */

const CHANNEL_ICON: Record<Channel, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
};

/** One post as it would sit in a feed: caption, picture, the row of actions. */
export function CreativeCard({ creative, brand, cost = true }: { creative: Creative; brand: string; cost?: boolean }) {
  const Icon = CHANNEL_ICON[creative.channel];
  return (
    <article className="du-card">
      <header className="du-card-head">
        <Icon size={16} aria-hidden="true" className={`du-ch du-ch--${creative.channel}`} />
        <span className="du-brand">{brand}</span>
        {creative.review && <span className="du-flag">Needs you</span>}
      </header>
      <p className="du-caption">{creative.caption}</p>
      {/* The picture is a real render from api.esy.com; the wash under the type
          is what keeps the headline legible over whatever came back. */}
      <div className="du-art" style={{ background: `linear-gradient(150deg, ${creative.wash[0]}, ${creative.wash[1]})` }}>
        <Image src={creative.image} alt="" width={540} height={720} className="du-art-img" sizes="270px" />
        <span className="du-art-scrim" aria-hidden="true" />
        <span className="du-art-type">{creative.art}</span>
        <span className="du-art-sub">{creative.sub}</span>
        {creative.cta && <span className="du-art-cta">{creative.cta}</span>}
      </div>
      <footer className="du-card-foot">
        <span>Like</span>
        <span>Comment</span>
        <span>Share</span>
        {cost && <span className="du-cost">${creative.cost.toFixed(2)}</span>}
      </footer>
    </article>
  );
}

/**
 * The slow horizontal drift of sample posts. Two copies of the row scroll as
 * one track, so the loop has no seam; hovering parks it so a card can be read.
 */
export function CreativeMarquee({
  creatives,
  brand,
  speed = 70,
  cost = true,
}: {
  creatives: Creative[];
  brand: string;
  /** Seconds for one full pass. Slower than it feels it should be. */
  speed?: number;
  cost?: boolean;
}) {
  const row = useMemo(() => [...creatives, ...creatives], [creatives]);
  return (
    <div className="du-marquee" aria-label={`Sample posts for ${brand}`}>
      <div className="du-marquee-track" style={{ animationDuration: `${speed}s` }}>
        {row.map((c, i) => (
          <CreativeCard key={`${c.id}-${i}`} creative={c} brand={brand} cost={cost} />
        ))}
      </div>
    </div>
  );
}

/* ── The line only we get to say ─────────────────────────────────────────── */

/** The set's receipt: how much, how many, and what's held for a human. */
export function ResultSummary({ set, src }: { set: SampleSet; src: string }) {
  return (
    <div className="du-summary">
      <div className="du-summary-figs">
        <span className="du-fig">
          <b>{set.total}</b> pieces for <b>{set.brand}</b>
        </span>
        <span className="du-fig">
          <b>${set.cost.toFixed(2)}</b> to make all of them
        </span>
        <span className="du-fig">
          <b>{set.needsReview}</b> waiting on your sign-off
        </span>
      </div>
      <Link href={waitlistHref(src)} className="du-btn du-btn--primary">
        Get the rest <ArrowRight size={16} aria-hidden="true" />
      </Link>
      <p className="du-disclaimer">
        Sample output and sample prices, generated in your browser from the address you typed. Nothing was published.
      </p>
    </div>
  );
}

