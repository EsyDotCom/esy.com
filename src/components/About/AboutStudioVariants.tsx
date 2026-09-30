/* Round 2 of /about: three takes on B · Studio.
 *
 *   D · Story   — the signup in the hero, then "The path", a timeline from
 *                 fuboTV to The Marketing Engineer, between the numbers and
 *                 the work.
 *   E · Live    — the proof moves: numbers count up, and the work plays (the
 *                 homepage's clip.art control room, the explainer, the film
 *                 strip).
 *   F · Compact — about two screens: numbers and signup in the hero, the work
 *                 as a slim row, the story and contact side by side.
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import ReplayControlRoom from '@/components/NewsletterHome/ReplayControlRoom';
import CreativePlayer from '@/components/NewsletterHome/CreativePlayer';
import FilmStrip from '@/components/NewsletterHome/FilmStrip';
import { articlePath } from '@/lib/article-path';
import { FactsStrip, STRONG_FACTS, StoryContact, StudioHero, WorkCards } from './AboutStudio';
import CountUp from './CountUp';
import { CREATIVE, WORK } from './content';
import '@/components/NewsletterHome/RunReplays.css';

/* The path: where the work came from. No dates, only the order. */
const PATH = [
  { at: 'fuboTV', what: 'Streaming apps', line: 'Shipping production web products: the streaming apps.' },
  { at: 'Vroom', what: 'Online car storefront', line: 'Shipping the storefront where people bought cars online.' },
  { at: 'Esy', what: 'The platform', line: 'Workflows that make marketing work, with every run recorded.' },
  { at: 'clip.art & SEOPage', what: 'Two businesses on Esy', line: 'Real properties with real traffic, run by the systems.' },
  { at: 'The Marketing Engineer', what: 'Teaching it', line: 'One email a week on building the AI systems that run marketing.' },
];

/* ── D · Story ── */
export function AboutStory() {
  return (
    <>
      <StudioHero signup />
      <FactsStrip />
      <section className="nl-section" aria-labelledby="ab-path">
        <div className="nl-container">
          <p className="nl-eyebrow">The path</p>
          <h2 className="nl-title" id="ab-path">How I got here.</h2>
          <ol className="ab-path">
            {PATH.map((p, i) => (
              <li key={p.at} className={i === PATH.length - 1 ? 'is-now' : ''}>
                <span className="ab-path-dot" aria-hidden="true" />
                <p className="ab-path-what">{i === PATH.length - 1 ? 'Now · ' : ''}{p.what}</p>
                <p className="ab-path-at">{p.at}</p>
                <p className="ab-path-line">{p.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <div className="nl-section--alt"><WorkCards /></div>
      <StoryContact />
      <WeeklyEmailBand />
    </>
  );
}

/* ── E · Live ── */
export function AboutLive() {
  return (
    <>
      <StudioHero />
      <section className="ab-facts" aria-label="By the numbers">
        <div className="nl-container ab-facts-row">
          {STRONG_FACTS.map((f) => (
            <p key={f.label}>
              <b><CountUp value={f.value} /></b>
              {f.label}
            </p>
          ))}
        </div>
      </section>

      {/* Apps: the real run, replayed. */}
      <section className="nl-lab ab-live" aria-labelledby="ab-live-apps">
        <div className="nl-container ab-live-grid">
          <div>
            <p className="nl-eyebrow nl-eyebrow--onDark">Apps · clip.art and SEOPage</p>
            <h2 className="ab-live-title" id="ab-live-apps">Every run, recorded.</h2>
            <p className="ab-live-text">{WORK.clipart.line} This is one of its runs, replayed from Esy&apos;s records: the steps, the checks and the cost.</p>
            <a href="https://clip.art" target="_blank" rel="noopener noreferrer" className="ab-live-link">See clip.art <ArrowRight size={14} aria-hidden="true" /></a>
          </div>
          <ReplayControlRoom />
        </div>
      </section>

      {/* Creatives: the explainer, playable. */}
      {CREATIVE && (
        <section className="nl-section" aria-labelledby="ab-live-cr">
          <div className="nl-container ab-live-grid ab-live-grid--flip">
            <div className="ab-live-video">
              <CreativePlayer youtubeId={CREATIVE.youtubeId} title={CREATIVE.title} />
            </div>
            <div>
              <p className="nl-eyebrow">Creatives</p>
              <h2 className="nl-title" id="ab-live-cr">{CREATIVE.title}</h2>
              <p className="nl-lede">{CREATIVE.summary}</p>
              <Link href={articlePath(CREATIVE.articleSlug)} className="nl-inline-link">How I made it <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
      )}

      {/* Films: the strip. */}
      <FilmStrip />
      <StoryContact />
      <WeeklyEmailBand />
    </>
  );
}

/* ── F · Compact ── */
export function AboutCompact() {
  return (
    <>
      <StudioHero signup facts />
      <WorkCards slim />
      <StoryContact />
    </>
  );
}
