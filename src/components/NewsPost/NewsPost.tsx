/* The AI Marketing News post page, three directions (2026-09-30, /prototypes/news-post/):
 *
 *   A · Brief        — a classic news post: what happened, why it matters,
 *                      what to check, with the story and the signup in a rail.
 *   B · In the story — the post inside its story: a bar with the story's
 *                      posts on a line, this one lit, and "Earlier in this
 *                      story" after it. Built for the story page to rank.
 *   C · At a glance  — key facts in a box under the headline, then the post,
 *                      then short questions and answers: the shape search and
 *                      AI answers quote.
 *
 * All three render the same real post (post.ts) and carry NewsArticle data.
 * Story and post links point at pages that aren't built yet, so they're
 * shown, not linked.
 */
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { dayLabel, timeLabel, type NewsPost } from '@/components/NewsIndex/news-examples';
import { MORE, POST, STORY, STORY_OTHERS, articleJsonLd } from './post';

const post = POST;

/* eslint-disable @next/next/no-img-element -- the company's own share image */

/* ── Shared pieces ── */

export function JsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }} />;
}

/** "AI Marketing News › Meta Muse", the way back up. */
export function Crumbs() {
  return (
    <p className="np-crumbs">
      <span>AI Marketing News</span> <span aria-hidden="true">›</span> <span>{post.trend}</span>
    </p>
  );
}

/** Label, story, date and time, source. */
export function Byline({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className={`np-byline ${onDark ? 'np-byline--onDark' : ''}`}>
      <span className={`nw-label nw-label--${post.label.toLowerCase()}`}>{post.label}</span>
      <span className="np-byline-text">
        By Zev Uhuru · <time dateTime={post.publishedAt}>{dayLabel(post.publishedAt)}, 2026 at {timeLabel(post.publishedAt)} ET</time> · {post.readMinutes} min read
      </span>
    </div>
  );
}

export function Source() {
  return (
    <p className="np-source">
      Source: <a href={post.source.url} target="_blank" rel="noopener noreferrer">{post.source.name} <ArrowUpRight size={13} aria-hidden="true" /></a>
    </p>
  );
}

export function Figure({ className = '' }: { className?: string }) {
  if (!post.image) return null;
  return (
    <figure className={`np-figure ${className}`}>
      <img src={post.image} alt="" />
      {post.imageCredit && <figcaption>Image: {post.imageCredit}</figcaption>}
    </figure>
  );
}

export function Why() {
  return (
    <section className="np-why" aria-labelledby="np-why">
      <h2 id="np-why">Why it matters</h2>
      <p>{post.why}</p>
    </section>
  );
}

export function Check() {
  return (
    <section className="np-check" aria-labelledby="np-check">
      <h2 id="np-check">What to check</h2>
      <ul>{post.check.map((c) => <li key={c}>{c}</li>)}</ul>
    </section>
  );
}

export function Body() {
  return <div className="np-body">{post.body.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}</div>;
}

/** A small post link: label, date, headline. Shown, not linked, until post pages exist. */
export function PostLine({ p }: { p: NewsPost }) {
  return (
    <li className="np-postline">
      <p className="nw-meta">
        <span className={`nw-label nw-label--${p.label.toLowerCase()}`}>{p.label}</span>
        <span>{dayLabel(p.publishedAt)}</span>
      </p>
      <p className="np-postline-title">{p.headline}</p>
    </li>
  );
}

export function MoreNews() {
  return (
    <section className="nl-section nl-section--alt" aria-labelledby="np-more">
      <div className="nl-container">
        <h2 className="nt-title" id="np-more">More AI Marketing News</h2>
        <ol className="np-more">
          {MORE.map((p) => <PostLine key={p.slug} p={p} />)}
        </ol>
      </div>
    </section>
  );
}

/** B's story bar: every post on this story on one line, this one lit. */
export function StoryBar() {
  const oldestFirst = [...STORY].reverse();
  return (
    <section className="np-storybar" aria-label={`The ${post.trend} story`}>
      <div className="nl-container">
        <p className="np-storybar-head">
          <span className="np-storybar-kicker">The story</span>
          <b>{post.trend}</b>
          <span>{STORY.length} posts · {dayLabel(oldestFirst[0].publishedAt)} to {dayLabel(STORY[0].publishedAt)}</span>
        </p>
        <ol className="np-storyline">
          {oldestFirst.map((p) => (
            <li key={p.slug} className={p.slug === post.slug ? 'is-on' : ''}>
              <span className="np-storyline-dot" aria-hidden="true" />
              <span className="np-storyline-date">{dayLabel(p.publishedAt)}</span>
              <span className="np-storyline-title">{p.headline}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── A · Brief ── */
export function PostBrief() {
  return (
    <>
      <JsonLd />
      <article className="np np--brief">
        <div className="nl-container np-grid">
          <div className="np-main">
            <Crumbs />
            <h1 className="np-title">{post.headline}</h1>
            <p className="np-dek">{post.dek}</p>
            <Byline />
            <Figure />
            <section className="np-happened" aria-labelledby="np-happened">
              <h2 id="np-happened">What happened</h2>
              <ul>{post.happened.map((h) => <li key={h}>{h}</li>)}</ul>
            </section>
            <Why />
            <Body />
            <Check />
            <Source />
          </div>
          {/* The rail: the rest of this story, then the email. */}
          <aside className="np-rail">
            <div className="np-rail-card">
              <p className="np-rail-title">More on {post.trend}</p>
              <ol className="np-rail-list">{STORY_OTHERS.map((p) => <PostLine key={p.slug} p={p} />)}</ol>
              <p className="np-rail-link">The {post.trend} story <ArrowRight size={14} aria-hidden="true" /></p>
            </div>
            <div className="np-rail-card">
              <p className="np-rail-title">AI Marketing News, in your inbox</p>
              <NewsletterSignup form="news-post-rail" note="The week’s AI news in The Marketing Engineer" />
            </div>
          </aside>
        </div>
      </article>
      <MoreNews />
      <WeeklyEmailBand />
    </>
  );
}

/* ── B · In the story ── */
export function PostInStory() {
  return (
    <>
      <JsonLd />
      <StoryBar />

      <article className="np np--story">
        <div className="nl-container np-narrow">
          <h1 className="np-title np-title--center">{post.headline}</h1>
          <p className="np-dek np-dek--center">{post.dek}</p>
          <Byline />
          <Figure className="np-figure--wide" />
          <Body />
          <Why />
          <Check />
          <Source />
          <div className="np-inline-signup">
            <p className="np-rail-title">Follow {post.trend} by email</p>
            <NewsletterSignup form="news-post-story" note="The week’s AI news in The Marketing Engineer" />
          </div>
        </div>
      </article>

      {/* Earlier in this story: the way to the story page. */}
      <section className="nl-section nl-section--alt" aria-labelledby="np-earlier">
        <div className="nl-container">
          <h2 className="nt-title" id="np-earlier">Earlier in this story</h2>
          <div className="np-earlier">
            {STORY_OTHERS.map((p) => (
              <article key={p.slug} className="nt-card">
                {p.image ? (
                  <span className="nt-card-art"><img src={p.image} alt="" className="np-card-img" /></span>
                ) : (
                  <span className="nt-card-art nt-card-art--blank">{p.topic}</span>
                )}
                <p className="nw-meta">
                  <span className={`nw-label nw-label--${p.label.toLowerCase()}`}>{p.label}</span>
                  <span>{dayLabel(p.publishedAt)}</span>
                </p>
                <h4>{p.headline}</h4>
              </article>
            ))}
          </div>
          <p className="np-rail-link">Every post on {post.trend} <ArrowRight size={14} aria-hidden="true" /> <span className="nm-more-path">/news/meta-muse · next to build</span></p>
        </div>
      </section>
      <MoreNews />
    </>
  );
}

/* ── C · At a glance ── */
export function PostAtAGlance() {
  return (
    <>
      <JsonLd />
      <article className="np np--glance">
        <div className="nl-container np-narrow">
          <Crumbs />
          <h1 className="np-title">{post.headline}</h1>
          <Byline />
          {/* Key facts first: the answer before the story. */}
          <section className="np-facts" aria-labelledby="np-facts">
            <h2 id="np-facts">At a glance</h2>
            <dl>
              {post.facts.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </section>
          <Why />
          <Figure />
          <Body />
          <Check />
          {/* Short questions people search, each answered plainly. */}
          <section className="np-faq" aria-labelledby="np-faq">
            <h2 id="np-faq">Questions</h2>
            {post.faq.map(([q, a]) => (
              <details key={q} open>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </section>
          <Source />
          <div className="np-inline-signup">
            <p className="np-rail-title">Get the week’s AI news by email</p>
            <NewsletterSignup form="news-post-end" note="The week’s AI news in The Marketing Engineer" />
          </div>
          <section className="np-storybox" aria-label={`More on ${post.trend}`}>
            <p className="np-rail-title">More on {post.trend}</p>
            <ol className="np-rail-list">{STORY_OTHERS.map((p) => <PostLine key={p.slug} p={p} />)}</ol>
          </section>
        </div>
      </article>
      <MoreNews />
      <WeeklyEmailBand />
    </>
  );
}
