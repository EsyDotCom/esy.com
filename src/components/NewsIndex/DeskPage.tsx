'use client';
/* Round 5 of /news (2026-09-30): the pick. E · Trend desk's lead, then G's
 * story rows, then A's wire. Built for the section's two jobs:
 *
 *   - jump on trends for SEO: the hottest story leads, and every story with
 *     two or more posts gets a row that points at its own page
 *     (/news/<story>), the page that can rank for the story's name;
 *   - daily updates to the domain: the wire lists every post by day and
 *     time, newest first, as plain links, so each one is linked from /news.
 *
 * No charts: they don't rank and they don't make posting daily any easier.
 */
import { type DesksProps } from './NewsFronts';
import { StoryRows } from './Monitors';
import { NEWS_POSTS, byDay, timeLabel } from './news-examples';

/** A's wire, full width: every post, grouped by day. */
function Wire() {
  return (
    <section className="nt-section" aria-labelledby="nw-latest">
      <div className="nt-head">
        <h2 className="nt-title" id="nw-latest">Every post</h2>
        <p className="nt-sub">Newest first, by day. {NEWS_POSTS.length} posts this month.</p>
      </div>
      <div className="nw-wire nw-wire--full">
        {byDay(NEWS_POSTS).map(({ day, posts }) => (
          <section key={day} className="nw-day" aria-label={day}>
            <h3 className="nw-day-label">{day}</h3>
            <ol className="nw-wire-list">
              {posts.map((p) => (
                <li key={p.slug} className="nw-wire-item">
                  <time className="nw-wire-time" dateTime={p.publishedAt}>{timeLabel(p.publishedAt)}</time>
                  <div>
                    <p className="nw-meta">
                      <span className={`nw-label nw-label--${p.label.toLowerCase()}`}>{p.label}</span>
                      <span className="nw-topic">{p.trend}</span>
                      <a className="nw-source" href={p.source.url} target="_blank" rel="noopener noreferrer">via {p.source.name}</a>
                    </p>
                    <h4 className="nw-wire-headline">{p.headline}</h4>
                    <p className="nw-wire-dek">{p.dek}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </section>
  );
}

/** What goes under E's lead: the story rows, then the wire. */
export function DeskRowsWire({ trends }: DesksProps) {
  return (
    <>
      <StoryRows trends={trends} title="More stories" strip={false} />
      <Wire />
    </>
  );
}
