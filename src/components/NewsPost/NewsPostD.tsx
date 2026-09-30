/* Round 3 of the AI News post: three takes on D · Story + glance
 * (2026-09-30). Same page as D (story, headline, key facts, why it matters,
 * the post, what to check, questions); each gives the story header and the
 * key facts a more considered design. All three add FAQ data for the
 * questions, which search and AI answers read as Q&A.
 *
 *   G · Editorial   — the story as one line of numbered chapters between
 *                     hairlines; key facts as a small-caps list, no box.
 *   H · Chapters    — the story as segments ("Part 3 of 3"); key facts as
 *                     tiles, the price and availability larger.
 *   I · Spec sheet  — the story as a small timeline beside the headline;
 *                     key facts as a two-column spec sheet with icons.
 */
import {
  CalendarDays, Download, MapPin, Plug, ShieldCheck, Sparkles, Store, Tag, type LucideIcon,
} from 'lucide-react';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { dayLabel } from '@/components/NewsIndex/news-examples';
import { Body, Byline, Check, Figure, JsonLd, MoreNews, Source, Why } from './NewsPost';
import { Faq, Signup } from './NewsPostStory';
import { POST, STORY, faqJsonLd } from './post';

const post = POST;
const CHAPTERS = [...STORY].reverse(); // oldest first
const HERE = CHAPTERS.findIndex((p) => p.slug === post.slug);

function FaqJsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(post)) }} />;
}

/** The part of D every take keeps, after the key facts. */
function Rest() {
  return (
    <>
      <Why />
      <Figure />
      <Body />
      <Check />
      <Faq />
      <Source />
      <Signup />
    </>
  );
}

/* ── G · Editorial ── */
export function PostEditorial() {
  return (
    <>
      <JsonLd />
      <FaqJsonLd />
      <article className="np np--editorial">
        <div className="nl-container np-narrow">
          {/* The story: one line of numbered chapters, this one set in ink. */}
          <nav className="npg-story" aria-label={`The ${post.trend} story`}>
            <p className="npg-story-name"><span>The story</span> {post.trend}</p>
            <ol>
              {CHAPTERS.map((p, i) => (
                <li key={p.slug} className={i === HERE ? 'is-on' : ''} title={p.headline}>
                  <b>{i + 1}</b> {dayLabel(p.publishedAt)}{i === HERE && <em> · this post</em>}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="np-title">{post.headline}</h1>
          <p className="np-dek">{post.dek}</p>
          <Byline />
          {/* Key facts: a quiet list, labels in small caps, a jade edge. */}
          <section className="npg-facts" aria-labelledby="npg-facts">
            <h2 id="npg-facts">At a glance</h2>
            <dl>
              {post.facts.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </section>
          <Rest />
        </div>
      </article>
      <MoreNews />
      <WeeklyEmailBand />
    </>
  );
}

/* ── H · Chapters ── */
export function PostChapters() {
  // The facts readers decide on get the big tiles.
  const big = new Set(['Price', 'Where']);
  return (
    <>
      <JsonLd />
      <FaqJsonLd />
      <article className="np np--chapters">
        <div className="nl-container np-narrow">
          {/* The story as segments, like a story you tap through. */}
          <section className="nph-story" aria-label={`The ${post.trend} story`}>
            <p className="nph-story-head">
              <span className="nph-story-name">{post.trend}</span>
              <span>Part {HERE + 1} of {CHAPTERS.length}</span>
            </p>
            <ol className="nph-segments">
              {CHAPTERS.map((p, i) => (
                <li key={p.slug} className={i < HERE ? 'is-read' : i === HERE ? 'is-on' : ''}>
                  <span className="nph-bar" aria-hidden="true" />
                  <span className="nph-date">{dayLabel(p.publishedAt)}</span>
                  <span className="nph-title">{p.headline}</span>
                </li>
              ))}
            </ol>
          </section>
          <h1 className="np-title">{post.headline}</h1>
          <p className="np-dek">{post.dek}</p>
          <Byline />
          <section className="nph-facts" aria-labelledby="nph-facts">
            <h2 id="nph-facts">At a glance</h2>
            <dl>
              {post.facts.map(([k, v]) => (
                <div key={k} className={big.has(k) ? 'is-big' : ''}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </section>
          <Rest />
        </div>
      </article>
      <MoreNews />
      <WeeklyEmailBand />
    </>
  );
}

/* ── I · Spec sheet ── */
const ICONS: LucideIcon[] = [Sparkles, Store, MapPin, Tag, Plug, ShieldCheck, CalendarDays, Download];

export function PostSpecSheet() {
  return (
    <>
      <JsonLd />
      <FaqJsonLd />
      <article className="np np--spec">
        <div className="nl-container npi-head">
          <div>
            <p className="np-crumbs"><span>AI News</span> <span aria-hidden="true">›</span> <span>{post.trend}</span></p>
            <h1 className="np-title">{post.headline}</h1>
            <p className="np-dek">{post.dek}</p>
            <Byline />
          </div>
          {/* The story, small and dated, beside the headline. */}
          <aside className="npi-story" aria-label={`The ${post.trend} story`}>
            <p className="npi-story-name">The {post.trend} story</p>
            <ol>
              {CHAPTERS.map((p, i) => (
                <li key={p.slug} className={i === HERE ? 'is-on' : ''}>
                  <span className="npi-date">{dayLabel(p.publishedAt)}</span>
                  <span className="npi-title">{p.headline}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
        {/* Same columns as the head, so the body lines up under the headline. */}
        <div className="nl-container npi-head npi-body">
          <div>
          <section className="npi-facts" aria-labelledby="npi-facts">
            <h2 id="npi-facts">At a glance</h2>
            <dl>
              {post.facts.map(([k, v], i) => {
                const Icon = ICONS[i] ?? Sparkles;
                return (
                  <div key={k}>
                    <Icon size={18} aria-hidden="true" />
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                );
              })}
            </dl>
          </section>
          <Rest />
          </div>
        </div>
      </article>
      <MoreNews />
      <WeeklyEmailBand />
    </>
  );
}
