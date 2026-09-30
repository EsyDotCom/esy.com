/* B · Studio — the homepage's navy portrait hero, for /about: "Hi, I'm Zev",
 * the promise, the socials, the portrait in its jade ring. Then a strip of
 * real numbers, the three kinds of work as cards with real visuals (the
 * clip.art run, the explainer, the film's poster), the longer story, and the
 * ways to get in touch.
 *
 * The sections are exported as parts, so round 2 (D · Story, E · Live,
 * F · Compact in AboutStudioVariants.tsx) can recombine them.
 */
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import ClipArtWordmark from '@/components/NewsletterHome/ClipArtWordmark';
import SeoPageWordmark from '@/components/NewsletterHome/SeoPageWordmark';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { BookACallButton } from '@/components/BookACallButton';
import { CLIPART_RUN } from '@/components/NewsletterHome/clipartRun';
import { articlePath } from '@/lib/article-path';
import { filmHref } from '@/data/films';
import { CREATIVE, EMAIL, FACTS, FILM, NAME, PLACE, PORTRAIT, PROMISE, ROLE, SOCIALS, STORY } from './content';

/** The three numbers that carry weight; single-digit counts read thin. */
export const STRONG_FACTS = FACTS.slice(0, 3);

/** The hero. `signup` adds the weekly email under the promise; `facts` sets the numbers inside it. */
export function StudioHero({ signup = false, facts = false }: { signup?: boolean; facts?: boolean }) {
  return (
    <section className="ab-studio">
      <div className="nl-container ab-studio-grid">
        <div>
          <p className="ab-studio-hi">Hi, I&apos;m Zev.</p>
          <h1 className="ab-studio-title">{PROMISE}</h1>
          <p className="ab-studio-role">{ROLE} · {PLACE} · writes <b>The Marketing Engineer</b></p>
          {signup && (
            <div className="ab-studio-signup">
              <NewsletterSignup tone="dark" note="One email a week · unsubscribe anytime" />
            </div>
          )}
          {facts && (
            <dl className="ab-studio-facts">
              {STRONG_FACTS.map((f) => (
                <div key={f.label}><dt>{f.value}</dt><dd>{f.label}</dd></div>
              ))}
            </dl>
          )}
          <ul className="ab-studio-socials">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon size={17} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="ab-portrait ab-portrait--xl ab-portrait--ring">
          <Image src={PORTRAIT} alt={NAME} fill sizes="340px" style={{ objectFit: 'cover' }} priority />
        </div>
      </div>
    </section>
  );
}

/** The numbers, as a strip under the hero. */
export function FactsStrip() {
  return (
    <section className="ab-facts" aria-label="By the numbers">
      <div className="nl-container ab-facts-row">
        {STRONG_FACTS.map((f) => (
          <p key={f.label}>
            <b>{f.value}</b>
            {f.label}
          </p>
        ))}
      </div>
    </section>
  );
}

/** Apps, creatives and films as cards with real visuals. `slim` is F's compact row. */
export function WorkCards({ slim = false }: { slim?: boolean }) {
  return (
    <section className={`nl-section ${slim ? 'ab-work--slim' : ''}`} aria-labelledby="ab-work">
      <div className="nl-container">
        <p className="nl-eyebrow">What I make</p>
        <h2 className="nl-title" id="ab-work">Apps, creatives and films, all on Esy.</h2>
        <div className="ab-cards">
          <a href="https://clip.art" target="_blank" rel="noopener noreferrer" className="ab-card">
            <span className="ab-card-art ab-card-art--check">
              {/* eslint-disable-next-line @next/next/no-img-element -- a real run's output */}
              <img src={CLIPART_RUN.cutout} alt="" />
            </span>
            <span className="ab-card-kind">Apps</span>
            <span className="ab-card-marks">
              <ClipArtWordmark className="ab-card-clipart" />
              <SeoPageWordmark weight="light" className="ab-card-seopage" />
            </span>
            <span className="ab-card-line">
              {CLIPART_RUN.totalRuns.toLocaleString('en-US')} runs, each recorded on prompt, model, checks and cost.
            </span>
            <span className="ab-card-go">See clip.art <ArrowUpRight size={14} aria-hidden="true" /></span>
          </a>
          {CREATIVE && (
            <Link href={articlePath(CREATIVE.articleSlug)} className="ab-card">
              <span className="ab-card-art">
                {/* eslint-disable-next-line @next/next/no-img-element -- YouTube's own thumbnail */}
                <img src={`https://i.ytimg.com/vi/${CREATIVE.youtubeId}/maxresdefault.jpg`} alt="" className="ab-cover" />
              </span>
              <span className="ab-card-kind">Creatives</span>
              <span className="ab-card-title">{CREATIVE.title}</span>
              <span className="ab-card-line">{CREATIVE.kind}, built in code in one working session.</span>
              <span className="ab-card-go">How I made it <ArrowRight size={14} aria-hidden="true" /></span>
            </Link>
          )}
          {FILM && (
            <Link href={filmHref(FILM)} className="ab-card">
              <span className="ab-card-art">
                {/* eslint-disable-next-line @next/next/no-img-element -- the film's poster */}
                <img src={FILM.poster} alt="" className="ab-cover ab-cover--top" />
              </span>
              <span className="ab-card-kind">Films</span>
              <span className="ab-card-title">{FILM.title}</span>
              <span className="ab-card-line">{FILM.meta}</span>
              <span className="ab-card-go">Watch the film <ArrowRight size={14} aria-hidden="true" /></span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/** The longer story beside the ways to get in touch. */
export function StoryContact() {
  return (
    <section className="nl-section nl-section--alt" aria-labelledby="ab-story">
      <div className="nl-container ab-story">
        <div>
          <p className="nl-eyebrow">The longer story</p>
          <h2 className="nl-title" id="ab-story">From streaming apps to marketing systems.</h2>
          {STORY.map((p) => (
            <p key={p.slice(0, 24)} className="nl-lede">{p}</p>
          ))}
        </div>
        <aside className="ab-contact">
          <p className="ab-contact-title">Get in touch</p>
          <a href={`mailto:${EMAIL}`} className="ab-contact-mail">{EMAIL}</a>
          <BookACallButton />
          <p className="ab-contact-note">
            How I publish: <Link href="/editorial-standards/">editorial standards</Link>
          </p>
        </aside>
      </div>
    </section>
  );
}

export default function AboutStudio() {
  return (
    <>
      <StudioHero />
      <FactsStrip />
      <WorkCards />
      <StoryContact />
      <WeeklyEmailBand />
    </>
  );
}
