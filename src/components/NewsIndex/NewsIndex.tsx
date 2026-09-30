'use client';
/* The /news index, three directions (2026-09-30, /prototypes/news/):
 *
 *   A · Wire       — a dated newswire: posts grouped by day with the time,
 *                    topic and a one-line "why it matters", beside a sticky
 *                    rail with the weekly email and the topics.
 *   B · Front page — a newspaper front: masthead with today's date, one lead
 *                    story large, two below it, then the rest as briefs.
 *   C · Briefing   — the week as a numbered briefing, each post split into
 *                    what happened and why it matters, with topic filters.
 *
 * All three read the same SAMPLE posts (sample-news.ts) and say so on the
 * page. Posts don't link yet: /news has no post pages.
 */
import { useState } from 'react';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { NEWS_TOPICS, SAMPLE_NEWS, byDay, dayLabel, timeLabel, type NewsPost, type NewsTopic } from './sample-news';

const posts = SAMPLE_NEWS;

/** Said plainly on every direction: these aren't real posts. */
export function SampleNote({ onDark = false }: { onDark?: boolean }) {
  return (
    <p className={`nw-sample ${onDark ? 'nw-sample--onDark' : ''}`}>
      Sample posts: /news hasn&apos;t published yet, so these show how the page reads when it&apos;s full.
    </p>
  );
}

export function Meta({ post, time = false }: { post: NewsPost; time?: boolean }) {
  return (
    <p className="nw-meta">
      <span className="nw-topic">{post.topic}</span>
      <span>{time ? timeLabel(post.publishedAt) : dayLabel(post.publishedAt)}</span>
      <span>{post.readMinutes} min read</span>
    </p>
  );
}

/* ── A · Wire ── */
export function NewsWire() {
  return (
    <>
      <section className="nw-hero">
        <div className="nl-container">
          <p className="nl-eyebrow">The Marketing Engineer</p>
          <h1 className="nw-title">News</h1>
          <p className="nw-desc">What changed this week in the AI tools behind marketing, and what it means for the systems you run.</p>
          <SampleNote />
        </div>
      </section>
      <section className="nl-section nw-section--tight">
        <div className="nl-container nw-wire">
          <div>
            {byDay(posts).map(({ day, posts: dayPosts }) => (
              <section key={day} className="nw-day" aria-label={day}>
                <h2 className="nw-day-label">{day}</h2>
                <ol className="nw-wire-list">
                  {dayPosts.map((p) => (
                    <li key={p.slug} className="nw-wire-item">
                      <time className="nw-wire-time" dateTime={p.publishedAt}>{timeLabel(p.publishedAt)}</time>
                      <div>
                        <p className="nw-topic">{p.topic}</p>
                        <h3 className="nw-wire-headline">{p.headline}</h3>
                        <p className="nw-wire-dek">{p.dek}</p>
                        <p className="nw-why"><b>Why it matters</b> {p.why}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
          {/* The rail: the email first, then the topics the wire covers. */}
          <aside className="nw-rail">
            <div className="nw-rail-card">
              <p className="nw-rail-title">The week&apos;s news, in one email</p>
              <NewsletterSignup note="One email a week · unsubscribe anytime" />
            </div>
            <div className="nw-rail-card">
              <p className="nw-rail-title">Topics</p>
              <ul className="nw-rail-topics">
                {NEWS_TOPICS.map((t) => (
                  <li key={t}>
                    <span>{t}</span>
                    <span>{posts.filter((p) => p.topic === t).length}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <WeeklyEmailBand />
    </>
  );
}

/** B's masthead: the name between two rules, the date and count under it. */
export function Masthead({ middle = 'AI tools for marketing, as they change' }: { middle?: React.ReactNode }) {
  const today = new Date(posts[0].publishedAt).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York',
  });
  return (
    <div className="nw-masthead">
      <p className="nw-masthead-over">The Marketing Engineer</p>
      <h1 className="nw-masthead-name">News</h1>
      <p className="nw-masthead-line">
        <span>{today}</span>
        <span>{middle}</span>
        <span>{posts.length} stories this week</span>
      </p>
    </div>
  );
}

/* ── B · Front page ── */
export function NewsFrontPage() {
  const [lead, ...rest] = posts;
  const second = rest.slice(0, 2);
  const briefs = rest.slice(2);
  return (
    <>
      <section className="nw-front">
        <div className="nl-container">
          <Masthead />
          <SampleNote />

          <div className="nw-front-grid">
            <article className="nw-lead">
              {lead.image && (
                <span className="nw-lead-art is-cutout">
                  {/* eslint-disable-next-line @next/next/no-img-element -- a generated sample, fixed size */}
                  <img src={lead.image} alt="" />
                </span>
              )}
              <Meta post={lead} />
              <h2 className="nw-lead-headline">{lead.headline}</h2>
              <p className="nw-lead-dek">{lead.dek}</p>
              <p className="nw-why"><b>Why it matters</b> {lead.why}</p>
            </article>
            <div className="nw-second">
              {second.map((p) => (
                <article key={p.slug} className="nw-second-item">
                  <Meta post={p} />
                  <h3 className="nw-second-headline">{p.headline}</h3>
                  <p className="nw-wire-dek">{p.dek}</p>
                </article>
              ))}
              <div className="nw-front-signup">
                <p className="nw-rail-title">Get the week&apos;s news by email</p>
                <NewsletterSignup note="One email · unsubscribe anytime" />
              </div>
            </div>
          </div>

          {/* The briefs: everything else, three columns of headline and dek. */}
          <h2 className="nw-briefs-label">In brief</h2>
          <ol className="nw-briefs">
            {briefs.map((p) => (
              <li key={p.slug}>
                <Meta post={p} />
                <h3 className="nw-brief-headline">{p.headline}</h3>
                <p className="nw-wire-dek">{p.dek}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <WeeklyEmailBand />
    </>
  );
}

/* ── C · Briefing ── */
export function NewsBriefing() {
  const [topic, setTopic] = useState<NewsTopic | 'All'>('All');
  const shown = topic === 'All' ? posts : posts.filter((p) => p.topic === topic);
  const first = dayLabel(posts[posts.length - 1].publishedAt);
  const last = dayLabel(posts[0].publishedAt);
  return (
    <>
      <section className="nw-brief-hero">
        <div className="nl-container">
          <p className="nl-eyebrow nl-eyebrow--onDark">The Marketing Engineer · News</p>
          <h1 className="nw-title nw-title--onDark">This week, briefly.</h1>
          <p className="nw-desc nw-desc--onDark">
            {first} – {last}: {posts.length} changes in the AI tools behind marketing. Each one is what happened, then why
            it matters for the systems you run.
          </p>
          <div className="nw-brief-signup"><NewsletterSignup tone="dark" note="The briefing, once a week" /></div>
          <SampleNote onDark />
        </div>
      </section>
      <section className="nl-section nw-section--tight">
        <div className="nl-container">
          {/* Topic filters: a small real control, no page reload. */}
          <div className="nw-filters" role="group" aria-label="Filter by topic">
            {(['All', ...NEWS_TOPICS] as const).map((t) => (
              <button key={t} className={topic === t ? 'is-on' : ''} aria-pressed={topic === t} onClick={() => setTopic(t)}>
                {t}
                <span>{t === 'All' ? posts.length : posts.filter((p) => p.topic === t).length}</span>
              </button>
            ))}
          </div>
          <ol className="nw-briefing">
            {shown.map((p) => (
              <li key={p.slug} className="nw-briefing-item">
                <span className="nw-briefing-n">{String(posts.indexOf(p) + 1).padStart(2, '0')}</span>
                <div>
                  <Meta post={p} />
                  <h2 className="nw-briefing-headline">{p.headline}</h2>
                  <div className="nw-briefing-split">
                    <div>
                      <p className="nw-split-label">What happened</p>
                      <p>{p.dek}</p>
                    </div>
                    <div>
                      <p className="nw-split-label">Why it matters</p>
                      <p>{p.why}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <WeeklyEmailBand />
    </>
  );
}
