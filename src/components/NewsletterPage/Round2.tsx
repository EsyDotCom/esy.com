'use client';

/* esy.com/newsletter, round 2 (2026-10-09): closer to a Substack publication
   home. Zev picked L3 · Cover for the issue pages, so every issue's "image"
   here is that cover (navy, the issue number big) until issues get real art.

   D · Publication  A Substack front page: the publication's name, a big
                    cover card for the latest issue with "Read the
                    latest", a "Most popular" row, then a dark signup band.
   E · Welcome      The signup leads inside the big card, beside the latest
                    issue's cover; under it a Latest / Top feed with covers on
                    the right of each row, like a Substack archive.
   F · Magazine     A lead cover two-thirds wide with the next issues stacked
                    beside it, the week's AI marketing news across the page,
                    then the signup band.

   Issues open in the L3 cover page; no signup sends. */

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { findPost, postPath } from '@/data/news';
import { type Issue, ISSUES, ISSUE_COUNT, LATEST } from './issues';
import { PageSignup, SampleNote, useDateLabel, useIssueHref } from './shared';
import { PROMISE } from './Takes';


/** An issue's cover art, with its number in the corner. Without art it falls
    back to the L3 cover: navy with the number big. */
export function IssueArt({ issue, size = 'sm' }: { issue: Issue; size?: 'sm' | 'md' | 'lg' }) {
  const n = String(issue.n).padStart(2, '0');
  return (
    <span
      className={`nlp-art nlp-art--${size}${issue.cover ? ' has-cover' : ''}`}
      style={issue.cover ? { backgroundImage: `url(${issue.cover})` } : undefined}
      aria-hidden="true"
    >
      <span className="nlp-art-n">{n}</span>
    </span>
  );
}

/** The publication's own masthead: just its name (the subtitle and tabs went, Zev 2026-10-09). */
export function Masthead() {
  return (
    <div className="nlp-pub">
      <p className="nlp-pub-name">The Marketing Engineer</p>
    </div>
  );
}

/** The latest issue as a big cover card with "Read the latest", like Substack's lead post. */
export function LeadCard({ issue }: { issue: Issue }) {
  const href = useIssueHref();
  const dateLabel = useDateLabel();
  return (
    <Link
      href={href(issue)}
      className={`nlp-lead${issue.cover ? ' has-cover' : ''}`}
      style={issue.cover ? { backgroundImage: `linear-gradient(90deg, rgba(10,22,38,0.92) 0%, rgba(10,22,38,0.7) 30%, rgba(10,22,38,0.15) 55%, rgba(10,22,38,0) 70%), url(${issue.cover})` } : undefined}
    >
      <span className="nlp-lead-text">
        <span className="nlp-lead-kicker">No. {issue.n} · {dateLabel(issue)}</span>
        <span className="nlp-lead-title">{issue.title}</span>
        <span className="nlp-lead-dek">{issue.dek}</span>
        <span className="nlp-lead-cta"><span className="nlp-lead-circle"><ArrowRight size={20} aria-hidden="true" /></span> Read the latest</span>
      </span>
      <span className="nlp-lead-n" aria-hidden="true">{String(issue.n).padStart(2, '0')}</span>
    </Link>
  );
}

/** A compact item: title and meta on the left, the cover thumbnail on the right. */
function MiniItem({ issue }: { issue: Issue }) {
  const href = useIssueHref();
  const dateLabel = useDateLabel();
  return (
    <Link href={href(issue)} className="nlp-mini">
      <span className="nlp-mini-text">
        <span className="nlp-mini-title">{issue.title}</span>
        <span className="nlp-mini-meta">{dateLabel(issue).toUpperCase()} · ZEV UHURU</span>
      </span>
      <IssueArt issue={issue} />
    </Link>
  );
}

/** A feed row: title, dek, meta, cover on the right. */
export function FeedRow({ issue }: { issue: Issue }) {
  const href = useIssueHref();
  const dateLabel = useDateLabel();
  return (
    <Link href={href(issue)} className="nlp-feed-row">
      <span className="nlp-feed-text">
        <span className="nlp-feed-title">{issue.title}</span>
        <span className="nlp-feed-dek">{issue.dek}</span>
        <span className="nlp-mini-meta">{dateLabel(issue).toUpperCase()} · {issue.minutes} MIN READ</span>
      </span>
      <IssueArt issue={issue} size="md" />
    </Link>
  );
}

/** The dark signup band at the foot, like Substack's. */
export function Band() {
  return (
    <section className="nlp-band">
      <div className="nlp-band-in">
        <div>
          <p className="nlp-band-title">Get the next issue in your inbox.</p>
          <p className="nlp-band-sub">{PROMISE}</p>
        </div>
        <PageSignup tone="dark" />
      </div>
    </section>
  );
}

/* D · Publication */
export function TakePublication() {
  const href = useIssueHref();
  return (
    <main className="nlp nlp--pub">
      <Masthead />
      <div className="nlp-wrap nlp-wrap--wide">
        <LeadCard issue={LATEST} />
        <div className="nlp-section-head">
          <p className="nlp-section-title">Most popular</p>
          <Link href="/prototypes/newsletter/batch/" className="nlp-section-all">VIEW ALL</Link>
        </div>
        <div className="nlp-minis">
          {ISSUES.map((i) => <MiniItem key={i.n} issue={i} />)}
        </div>
      </div>
      <Band />
      <div className="nlp-wrap nlp-wrap--wide"><SampleNote /></div>
    </main>
  );
}

/* E · Welcome */
export function TakeWelcome() {
  const href = useIssueHref();
  const [feed, setFeed] = useState<'Latest' | 'Top'>('Latest');
  // "Top" is a sample order: the clip.art issue first, as the most read.
  const rows = feed === 'Latest' ? ISSUES : [...ISSUES].sort((a, b) => a.n - b.n);
  return (
    <main className="nlp nlp--pub">
      <Masthead />
      <div className="nlp-wrap nlp-wrap--wide">
        <section className="nlp-welcome">
          <div className="nlp-welcome-text">
            <p className="nlp-lead-kicker">Free, every week · {ISSUE_COUNT} issues</p>
            <p className="nlp-welcome-title">AI marketing, <em>built</em> in public.</p>
            <p className="nlp-welcome-sub">{PROMISE}</p>
            <PageSignup tone="dark" />
          </div>
          <Link href={href(LATEST)} className="nlp-welcome-latest">
            <IssueArt issue={LATEST} size="lg" />
            <span className="nlp-welcome-latest-label">Latest: {LATEST.title} <ArrowRight size={14} aria-hidden="true" /></span>
          </Link>
        </section>

        <div className="nlp-feed-tabs" role="tablist">
          {(['Latest', 'Top'] as const).map((f) => (
            <button key={f} type="button" role="tab" aria-selected={feed === f} className={`nlp-tab${feed === f ? ' is-on' : ''}`} onClick={() => setFeed(f)}>{f}</button>
          ))}
        </div>
        <div className="nlp-feed">
          {rows.map((i) => <FeedRow key={i.n} issue={i} />)}
        </div>
        <SampleNote />
      </div>
    </main>
  );
}

/* F · Magazine */
export function TakeMagazine() {
  const href = useIssueHref();
  const dateLabel = useDateLabel();
  const [lead, ...rest] = ISSUES;
  // The week's AI marketing news across every issue, newest issue first, without repeats.
  const news = [...new Set(ISSUES.flatMap((i) => i.body.flatMap((s) => (s.kind === 'news' ? s.slugs : []))))]
    .map((slug) => findPost(slug))
    .filter((p) => p !== undefined)
    .slice(0, 4);
  return (
    <main className="nlp nlp--pub">
      <Masthead />
      <div className="nlp-wrap nlp-wrap--wide">
        <div className="nlp-mag">
          <LeadCard issue={lead} />
          <div className="nlp-mag-side">
            {rest.map((i) => (
              <Link key={i.n} href={href(i)} className="nlp-mag-item">
                <IssueArt issue={i} size="md" />
                <span className="nlp-mini-title">{i.title}</span>
                <span className="nlp-mini-meta">{dateLabel(i).toUpperCase()}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="nlp-section-head">
          <p className="nlp-section-title">This week in AI marketing</p>
          <Link href="/news/" className="nlp-section-all">ALL NEWS</Link>
        </div>
        <div className="nlp-newsrow">
          {news.map((p) => (
            <Link key={p.slug} href={postPath(p.slug)} className="nlp-newsrow-item">
              <span className="nlp-news-topic">{p.topic}</span>
              <span className="nlp-news-head">{p.headline}</span>
            </Link>
          ))}
        </div>
      </div>
      <Band />
      <div className="nlp-wrap nlp-wrap--wide"><SampleNote /></div>
    </main>
  );
}
