'use client';
/* Round 2 of /news: three takes on B · Front page, built for a steady feed
 * and for jumping on trends (2026-09-30).
 *
 *   D · Live front  — a trending bar under the masthead, the lead story, and a
 *                     live timestamped feed beside it in place of B's two
 *                     fixed stories.
 *   E · Trend desk  — the front grouped by trend: the hottest trend leads with
 *                     its posts, the others follow as desks of their own.
 *   F · Developing  — the lead is a running story with timestamped updates
 *                     under it, like a live blog; the rest follow as briefs.
 *
 * Same example posts as round 1 (news-examples.ts): real stories, each with its story (trend).
 */
import { useState } from 'react';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { Masthead, Meta, SampleNote } from './NewsIndex';
import {
  DEVELOPING_TREND, NEWS_POSTS, NEWS_TRENDS, NOW, agoFrom, dayLabel, postsFor, type NewsPost, type NewsTrend,
} from './news-examples';

const posts = NEWS_POSTS;

/* eslint-disable @next/next/no-img-element -- generated samples and site stills, fixed sizes */

/** A post's image (the company's own), with its credit. */
export function Art({ post, className = 'nw-art' }: { post: NewsPost; className?: string }) {
  if (!post.image) return null;
  return (
    <span className={className}>
      <img src={post.image} alt="" />
      {post.imageCredit && <span className="nw-credit">Image: {post.imageCredit}</span>}
    </span>
  );
}

/** The trending bar: every trend with its heat, the hottest first. `onPick` makes it a filter. */
function TrendBar({ active, onPick }: { active?: string | null; onPick?: (t: string | null) => void }) {
  return (
    <div className="nw-trendbar" role={onPick ? 'group' : undefined} aria-label="Trending">
      <span className="nw-trendbar-label"><i aria-hidden="true" /> Trending</span>
      <ol>
        {NEWS_TRENDS.map((t, i) => {
          const on = active === t.name;
          const body = (
            <>
              <span className="nw-trendbar-n">{i + 1}</span>
              {t.name}
              <span className="nw-trendbar-count">{postsFor(t.name, posts).length}</span>
            </>
          );
          return (
            <li key={t.name}>
              {onPick ? (
                <button className={on ? 'is-on' : ''} aria-pressed={on} onClick={() => onPick(on ? null : t.name)}>{body}</button>
              ) : (
                <span>{body}</span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ── D · Live front ── */
export function NewsLiveFront() {
  const [trend, setTrend] = useState<string | null>(null);
  // The newest story with an image leads; everything else is the feed.
  const lead = posts.find((p) => p.image) ?? posts[0];
  const rest = posts.filter((p) => p !== lead);
  // The feed follows the trending bar: pick a trend and only its posts stay.
  const feed = trend ? posts.filter((p) => p.trend === trend) : rest;
  return (
    <>
      <section className="nw-front">
        <div className="nl-container">
          <Masthead middle={`Updated ${agoFrom(NOW, NOW)}`} />
          <TrendBar active={trend} onPick={setTrend} />
          <SampleNote />

          <div className="nw-front-grid">
            <article className="nw-lead">
              <Art post={lead} className="nw-lead-art" />
              <Meta post={lead} />
              <h2 className="nw-lead-headline">{lead.headline}</h2>
              <p className="nw-lead-dek">{lead.dek}</p>
              <p className="nw-why"><b>Why it matters</b> {lead.why}</p>
            </article>

            {/* The live feed: time first, newest on top; the signup sits at its foot. */}
            <aside className="nw-live" aria-label="Latest">
              <p className="nw-live-head"><i aria-hidden="true" /> Latest{trend ? ` · ${trend}` : ''}</p>
              <ol className="nw-live-list">
                {feed.map((p) => (
                  <li key={p.slug}>
                    <time dateTime={p.publishedAt}>{agoFrom(p.publishedAt, NOW)}</time>
                    <div>
                      <p className="nw-topic">{p.trend}</p>
                      <h3 className="nw-live-headline">{p.headline}</h3>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="nw-front-signup">
                <p className="nw-rail-title">The week&apos;s news, in one email</p>
                <NewsletterSignup form="news-front" note="One email a week · unsubscribe anytime" />
              </div>
            </aside>
          </div>
        </div>
      </section>
      <WeeklyEmailBand />
    </>
  );
}

/* ── E · Trend desk ── */
/** E's own layout for the other trends: the next four, one column each. */
function TrendColumns({ trends }: DesksProps) {
  return (
    <div className="nw-desks">
      {trends.slice(0, 4).map((t) => {
        const list = postsFor(t.name, posts);
        return (
          <section key={t.name} className="nw-desk" aria-label={t.name}>
            <div className="nw-desk-head">
              <h2>{t.name}</h2>
              <span className="nw-heat" style={{ ['--heat' as string]: `${t.heat}%` }} aria-label={`Heat ${t.heat} of 100`} />
            </div>
            <p className="nw-desk-line">{t.line}</p>
            <Art post={list.find((p) => p.image) ?? list[0]} className="nw-desk-art" />
            <ol>
              {list.map((p) => (
                <li key={p.slug}>
                  <h3 className="nw-brief-headline">{p.headline}</h3>
                  <Meta post={p} />
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}

/** The trends below E's lead, as round 3 lays them out (TrendSections.tsx). */
export type DesksProps = { trends: NewsTrend[] };

export function NewsTrendDesk({ Desks = TrendColumns }: { Desks?: React.ComponentType<DesksProps> }) {
  const [top, ...others] = NEWS_TRENDS.filter((t) => postsFor(t.name, posts).length > 0);
  const [topLead, ...topMore] = postsFor(top.name, posts);
  return (
    <>
      <section className="nw-front">
        <div className="nl-container">
          <Masthead middle={`${NEWS_TRENDS.length} trends this week`} />
          <SampleNote />

          {/* The top trend: its lead post large, its follow-ups beside it. */}
          <section className="nw-desk-top" aria-labelledby="nw-top">
            <p className="nw-desk-kicker"><i aria-hidden="true" /> The trend everyone&apos;s on</p>
            <h2 className="nw-desk-name" id="nw-top">{top.name}</h2>
            <p className="nw-desk-line">{top.line}</p>
            <div className="nw-front-grid nw-front-grid--flat">
              <article className="nw-lead">
                <Art post={topLead} className="nw-lead-art" />
                <Meta post={topLead} />
                <h3 className="nw-lead-headline">{topLead.headline}</h3>
                <p className="nw-lead-dek">{topLead.dek}</p>
                <p className="nw-why"><b>Why it matters</b> {topLead.why}</p>
              </article>
              <div className="nw-second">
                <p className="nw-desk-sub">Following this trend</p>
                {topMore.map((p) => (
                  <article key={p.slug} className="nw-second-item">
                    <Meta post={p} />
                    <h4 className="nw-second-headline">{p.headline}</h4>
                    <p className="nw-wire-dek">{p.dek}</p>
                  </article>
                ))}
                <div className="nw-front-signup">
                  <p className="nw-rail-title">Get trends like this by email</p>
                  <NewsletterSignup form="news-front" note="One email a week · unsubscribe anytime" />
                </div>
              </div>
            </div>
          </section>

          <Desks trends={others} />
        </div>
      </section>
      <WeeklyEmailBand />
    </>
  );
}

/* ── F · Developing ── */
export function NewsDeveloping() {
  // The running story leads; its own posts are the updates under it.
  const story = postsFor(DEVELOPING_TREND, posts);
  const lead = story[0];
  const rest = posts.filter((p) => p.trend !== DEVELOPING_TREND);
  const second = rest.slice(0, 2);
  const briefs = rest.slice(2, 8);
  return (
    <>
      <section className="nw-front">
        <div className="nl-container">
          <Masthead />
          <TrendBar />
          <SampleNote />

          <div className="nw-front-grid">
            <article className="nw-lead">
              <p className="nw-developing"><i aria-hidden="true" /> Developing · {DEVELOPING_TREND} · updated {dayLabel(lead.publishedAt)}</p>
              <Art post={lead} className="nw-lead-art" />
              <Meta post={lead} />
              <h2 className="nw-lead-headline">{lead.headline}</h2>
              <p className="nw-lead-dek">{lead.dek}</p>
              {/* The running updates, newest first, on a timeline. */}
              <ol className="nw-updates" aria-label="Updates">
                {story.map((u) => (
                  <li key={u.slug}>
                    <time dateTime={u.publishedAt}>{dayLabel(u.publishedAt)} · {u.label}</time>
                    <p>{u.headline}</p>
                  </li>
                ))}
              </ol>
              <p className="nw-why"><b>Why it matters</b> {lead.why}</p>
            </article>
            <div className="nw-second">
              {second.map((p) => (
                <article key={p.slug} className="nw-second-item">
                  <Art post={p} className="nw-second-art" />
                  <Meta post={p} />
                  <h3 className="nw-second-headline">{p.headline}</h3>
                  <p className="nw-wire-dek">{p.dek}</p>
                </article>
              ))}
              <div className="nw-front-signup">
                <p className="nw-rail-title">Follow this story by email</p>
                <NewsletterSignup form="news-front" note="One email a week · unsubscribe anytime" />
              </div>
            </div>
          </div>

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
