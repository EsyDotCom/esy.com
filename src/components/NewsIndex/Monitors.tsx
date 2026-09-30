'use client';
/* Round 4 of /news: things to monitor, under E · Trend desk's hero
 * (2026-09-30). All six follow the round-4 rules in news-examples.ts: a story
 * needs two posts for a row or lane, three rows at most, one-post stories go
 * to "Also in the news", charts cover 30 days.
 *
 *   J · Board + charts — H's tiles, each with a 30-day dot strip and its
 *                        newest headline; a story without an image uses its
 *                        chart as the tile.
 *   K · Lanes + cards  — I's lanes, then G's cards for each story.
 *   L · Rollout        — Google's ranking updates this year, with the
 *                        running one's progress.
 *   M · Change board   — platforms by area: the newest change in each cell
 *                        and what to check.
 *   N · Cost index     — what making marketing with AI costs, from Esy's own
 *                        recorded runs.
 *   O · Coverage lines — a small weekly line per story and whether it's
 *                        rising or cooling.
 */
import { useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Minus } from 'lucide-react';
import { Art, type DesksProps } from './NewsFronts';
import { Meta } from './NewsIndex';
import {
  NEWS_POSTS, NOW, WINDOW_DAYS, dayKey, dayLabel, oneOffPosts, postsFor, storyTrends, windowDays,
  type NewsLabel, type NewsPost, type NewsTrend,
} from './news-examples';
import {
  AREAS, COSTS_SNAPSHOT, ESY_COSTS, GOOGLE_UPDATES, GOOGLE_UPDATES_SOURCE, PLATFORMS, cell, costMove, daysBetween, usd,
} from './monitor-data';

const posts = NEWS_POSTS;
const LABELS: NewsLabel[] = ['Breaking', 'Tested', 'Follow-up', 'How-to', 'Explainer', 'Take'];
const DAYS = windowDays();
const TODAY = DAYS[DAYS.length - 1];
/** "Sep 29" for a YYYY-MM-DD key (midday UTC, so New York keeps the day). */
const keyLabel = (key: string) => dayLabel(`${key}T16:00:00Z`);


/* ── Shared pieces ── */

function Head({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="nt-head">
      <h2 className="nt-title">{title}</h2>
      <p className="nt-sub">{sub}</p>
    </div>
  );
}

/** A story's 30 days as a strip: one dot per post, on its day. */
function DotStrip({ trend, onDark = false }: { trend: string; onDark?: boolean }) {
  const list = postsFor(trend, posts);
  return (
    <span className={`nm-strip ${onDark ? 'nm-strip--onDark' : ''}`} aria-label={`${list.length} posts in ${WINDOW_DAYS} days`}>
      {DAYS.map((d) => {
        const hits = list.filter((p) => dayKey(p.publishedAt) === d);
        return (
          <span key={d} className="nm-strip-day">
            {hits.map((p) => <i key={p.slug} className={`nt-dot nt-dot--${p.label.toLowerCase()}`} title={`${p.label}: ${p.headline}`} />)}
          </span>
        );
      })}
    </span>
  );
}

/** G's card: image (or a navy topic card), label, date, headline. */
function Card({ post }: { post: NewsPost }) {
  return (
    <article className="nt-card">
      {post.image ? <Art post={post} className="nt-card-art" /> : <span className="nt-card-art nt-card-art--blank">{post.topic}</span>}
      <Meta post={post} />
      <h4>{post.headline}</h4>
    </article>
  );
}

/** A story's newest three cards, and a link to the rest. */
function StoryCards({ trend }: { trend: string }) {
  const list = postsFor(trend, posts);
  return (
    <div className="nt-row-cards">
      {list.slice(0, 3).map((p) => <Card key={p.slug} post={p} />)}
      {list.length > 3 && (
        <p className="nm-more">All {list.length} posts on {trend} <ArrowRight size={14} aria-hidden="true" /></p>
      )}
    </div>
  );
}

/** One-post stories: a plain list, no row, no chart. */
export function AlsoInTheNews() {
  const list = oneOffPosts(posts);
  if (!list.length) return null;
  return (
    <section className="nt-section" aria-labelledby="nm-also">
      <div className="nt-head">
        <h2 className="nt-title" id="nm-also">Also in the news</h2>
        <p className="nt-sub">Stories with one post so far. A second post gives a story its own row.</p>
      </div>
      <ol className="nm-also">
        {list.map((p) => (
          <li key={p.slug}>
            <Meta post={p} />
            <h3>{p.headline}</h3>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Story rows (G, with the round-4 rules): the other stories and their cards. */
function StoryRows({ trends, title = 'Stories to follow' }: { trends: NewsTrend[]; title?: string }) {
  const rows = storyTrends(trends, posts);
  if (!rows.length) return null;
  return (
    <section className="nt-section" aria-label={title}>
      <Head title={title} sub="Stories with two or more posts, newest activity first." />
      <ol className="nt-rows">
        {rows.map((t) => (
          <li key={t.name} className="nt-row">
            <div className="nt-row-head">
              <h3>{t.name}</h3>
              <p>{t.line}</p>
              <span className="nt-row-stats">{postsFor(t.name, posts).length} posts · latest {dayLabel(postsFor(t.name, posts)[0].publishedAt)}</span>
              <DotStrip trend={t.name} />
            </div>
            <StoryCards trend={t.name} />
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ── J · Board + charts ── */
export function MonitorBoard({ trends }: DesksProps) {
  const tiles = storyTrends(trends, posts);
  const [open, setOpen] = useState(tiles[0]?.name);
  return (
    <>
      <section className="nt-section" aria-label="Stories to follow">
        <Head title="Stories to follow" sub={`Each tile is a story with two or more posts; the dots are its last ${WINDOW_DAYS} days.`} />
        <div className={`nm-board nm-board--${tiles.length}`}>
          {tiles.map((t, i) => {
            const list = postsFor(t.name, posts);
            const cover = list.find((p) => p.image);
            const on = t.name === open;
            return (
              <button key={t.name} className={`nm-tile ${i === 0 ? 'nm-tile--big' : ''} ${cover ? '' : 'nm-tile--chart'} ${on ? 'is-on' : ''}`} aria-pressed={on} onClick={() => setOpen(t.name)}>
                {cover ? <Art post={cover} className="nt-tile-art" /> : <BigDots trend={t.name} />}
                <span className="nt-tile-shade" aria-hidden="true" />
                <span className="nt-tile-body">
                  <span className="nt-tile-name">{t.name}</span>
                  <span className="nm-tile-latest">
                    <b>{list[0].label} · {dayLabel(list[0].publishedAt)}</b> {list[0].headline}
                  </span>
                  <DotStrip trend={t.name} onDark />
                  <span className="nt-tile-count">{list.length} posts in {WINDOW_DAYS} days</span>
                </span>
              </button>
            );
          })}
        </div>
        {open && (
          <div className="nt-board-open" aria-live="polite">
            <p className="nt-board-open-label">{open}</p>
            <StoryCards trend={open} />
          </div>
        )}
      </section>
      <AlsoInTheNews />
    </>
  );
}

/** A tile without an image: its posts as big dots on the month, as the art. */
function BigDots({ trend }: { trend: string }) {
  const list = postsFor(trend, posts);
  return (
    <span className="nm-bigdots" aria-hidden="true">
      {list.map((p) => {
        const x = (DAYS.indexOf(dayKey(p.publishedAt)) / (DAYS.length - 1)) * 100;
        return <i key={p.slug} className={`nt-dot nt-dot--${p.label.toLowerCase()}`} style={{ left: `${x}%` }} />;
      })}
      <span className="nm-bigdots-axis"><span>{keyLabel(DAYS[0])}</span><span>{keyLabel(TODAY)}</span></span>
    </span>
  );
}

/* ── K · Lanes + cards ── */
export function MonitorLanes({ trends }: DesksProps) {
  // Lanes for every story with two or more posts, the lead included.
  const lanes = storyTrends([...trends, ...allTrendsNotIn(trends)], posts, 4);
  const [hover, setHover] = useState<NewsPost | null>(null);
  return (
    <>
      <section className="nt-section" aria-label="The month by story">
        <Head title={`The last ${WINDOW_DAYS} days, by story`} sub="A lane per story with two or more posts. Point at a dot to see the post." />
        <div className="nt-lanes nm-lanes" style={{ ['--days' as string]: DAYS.length }}>
          <div className="nt-lanes-row nt-lanes-days" aria-hidden="true">
            <span />
            {DAYS.map((d, i) => <span key={d}>{i % 5 === 0 || d === TODAY ? keyLabel(d) : ''}</span>)}
          </div>
          {lanes.map((t) => (
            <div key={t.name} className="nt-lanes-row">
              <span className="nt-lane-name">{t.name}</span>
              {DAYS.map((d) => (
                <span key={d} className={`nt-lane-cell ${d === TODAY ? 'is-today' : ''}`}>
                  {postsFor(t.name, posts).filter((p) => dayKey(p.publishedAt) === d).map((p) => (
                    <span key={p.slug} className={`nt-dot nt-dot--${p.label.toLowerCase()}`} tabIndex={0} aria-label={`${p.label}: ${p.headline}`}
                      onMouseEnter={() => setHover(p)} onFocus={() => setHover(p)} onMouseLeave={() => setHover(null)} onBlur={() => setHover(null)} />
                  ))}
                </span>
              ))}
            </div>
          ))}
          <ul className="nt-lanes-key" aria-label="Key">
            {LABELS.map((l) => <li key={l}><span className={`nt-dot nt-dot--${l.toLowerCase()}`} aria-hidden="true" />{l}</li>)}
          </ul>
          <p className="nt-lanes-peek">{hover ? <><b>{hover.label}</b> · {hover.headline}</> : 'Point at a dot to see the post.'}</p>
        </div>
      </section>
      <StoryRows trends={trends} />
      <AlsoInTheNews />
    </>
  );
}

/* The trends E's hero already used, so K's chart can include the lead. */
function allTrendsNotIn(trends: NewsTrend[]): NewsTrend[] {
  const names = new Set(trends.map((t) => t.name));
  const lead = posts.map((p) => p.trend).find((n) => !names.has(n));
  return lead ? [{ name: lead, line: '', heat: 100 }] : [];
}

/* ── L · Rollout tracker ── */
export function MonitorRollout({ trends }: DesksProps) {
  const year = { start: '2026-01-01', end: '2026-12-31' };
  const span = daysBetween(year.start, year.end);
  const live = GOOGLE_UPDATES.find((u) => !u.end);
  const liveDay = live ? daysBetween(live.start, TODAY) + 1 : 0;
  const liveMax = live?.upTo ? daysBetween(live.start, live.upTo) : 14;
  // How long the finished updates of the same kind took, for comparison.
  const sameKind = GOOGLE_UPDATES.filter((u) => u.end && u.kind === live?.kind).map((u) => daysBetween(u.start, u.end!) + 1);
  const otherMin = Math.min(...sameKind);
  const otherMax = Math.max(...sameKind);
  return (
    <>
      <section className="nt-section" aria-label="Google updates">
        <Head title="Google updates, 2026" sub="Every confirmed ranking update this year. Check here before you blame your own changes." />
        {live && (
          <div className="nm-live">
            <p className="nm-live-kicker"><i aria-hidden="true" /> Rolling out now</p>
            <h3>{live.name}</h3>
            <div className="nm-progress" role="progressbar" aria-valuemin={0} aria-valuemax={liveMax} aria-valuenow={liveDay}>
              <span style={{ width: `${Math.min(100, (liveDay / liveMax) * 100)}%` }} />
            </div>
            <p className="nm-live-meta">
              Day {liveDay} of up to {liveMax} · started {keyLabel(live.start)} · done by {keyLabel(live.upTo!)} at the latest
            </p>
            <p className="nm-live-note">
              This year&apos;s other {live.kind.toLowerCase()} updates took {otherMin} to {otherMax} days{liveDay > otherMax ? '; this one is already the longest.' : '.'}
            </p>
          </div>
        )}
        {/* The year as a line, each update a bar from start to end. */}
        <div className="nm-year">
          <div className="nm-year-months" aria-hidden="true">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => <span key={m}>{m}</span>)}
          </div>
          {GOOGLE_UPDATES.map((u) => {
            const end = u.end ?? TODAY;
            const left = (daysBetween(year.start, u.start) / span) * 100;
            const width = Math.max(0.6, ((daysBetween(u.start, end) + 1) / span) * 100);
            return (
              <div key={u.name} className="nm-year-row">
                <span className="nm-year-name">{u.name}</span>
                <span className="nm-year-track">
                  <span className={`nm-year-bar nm-year-bar--${u.kind.toLowerCase()} ${u.end ? '' : 'is-live'}`} style={{ left: `${left}%`, width: `${width}%` }} />
                  <span className="nm-year-today" style={{ left: `${(daysBetween(year.start, TODAY) / span) * 100}%` }} aria-hidden="true" />
                </span>
                <span className="nm-year-days">{u.end ? `${daysBetween(u.start, u.end) + 1} days` : `day ${liveDay}`}</span>
              </div>
            );
          })}
          <p className="nm-source">Source: <a href={GOOGLE_UPDATES_SOURCE.url} target="_blank" rel="noopener noreferrer">{GOOGLE_UPDATES_SOURCE.name}</a></p>
        </div>
      </section>
      <StoryRows trends={trends} />
      <AlsoInTheNews />
    </>
  );
}

/* ── M · Change board ── */
export function MonitorChanges({ trends }: DesksProps) {
  const [pick, setPick] = useState<string | null>(null);
  const fresh = (date: string) => daysBetween(date, TODAY) <= 7;
  const picked = pick ? pick.split('|') : null;
  const chosen = picked ? cell(picked[0] as (typeof PLATFORMS)[number], picked[1] as (typeof AREAS)[number]) : null;
  return (
    <>
      <section className="nt-section" aria-label="What changed">
        <Head title="What changed in your stack" sub="The newest change on each platform, by area. Green means this week. Pick a cell for what to check." />
        <div className="nm-grid" role="table">
          <div className="nm-grid-row nm-grid-head" role="row">
            <span role="columnheader" />
            {AREAS.map((a) => <span key={a} role="columnheader">{a}</span>)}
          </div>
          {PLATFORMS.map((p) => (
            <div key={p} className="nm-grid-row" role="row">
              <span className="nm-grid-platform" role="rowheader">{p}</span>
              {AREAS.map((a) => {
                const c = cell(p, a);
                const id = `${p}|${a}`;
                if (!c) return <span key={a} className="nm-cell nm-cell--none" role="cell">No change</span>;
                return (
                  <button key={a} role="cell" className={`nm-cell ${fresh(c.date) ? 'is-fresh' : ''} ${pick === id ? 'is-on' : ''}`} onClick={() => setPick(pick === id ? null : id)}>
                    <b>{keyLabel(c.date)}</b>
                    <span>{c.what}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="nm-check" aria-live="polite">
          {chosen ? (
            <>
              <p className="nm-check-label">{picked![0]} · {picked![1]} · what to check</p>
              <p className="nm-check-text">{chosen.check}</p>
              <p className="nm-check-post">From: {posts.find((x) => x.slug === chosen.post)?.headline}</p>
            </>
          ) : (
            <p className="nm-check-hint">Pick a changed cell to see what to check in your own account.</p>
          )}
        </div>
      </section>
      <StoryRows trends={trends} />
      <AlsoInTheNews />
    </>
  );
}

/* ── N · Cost index ── */
export function MonitorCosts({ trends }: DesksProps) {
  const max = Math.max(...ESY_COSTS.map((r) => r.median));
  const moved = ESY_COSTS.map((r) => ({ r, m: costMove(r) })).filter((x) => x.m && Math.abs(x.m.pct) >= 10);
  return (
    <>
      <section className="nt-section" aria-label="What AI marketing costs">
        <Head
          title="What it costs to make it with AI"
          sub={`Median cost per finished piece, from ${COSTS_SNAPSHOT.runs.toLocaleString('en-US')} runs recorded by Esy, ${COSTS_SNAPSHOT.from}–${COSTS_SNAPSHOT.to}. Models, checks and storage included.`}
        />
        <div className="nm-costs">
          <ol className="nm-cost-list">
            {ESY_COSTS.map((r) => (
              <li key={r.id}>
                <span className="nm-cost-name">{r.name}<small>{r.kind} · {r.runs.toLocaleString('en-US')} runs</small></span>
                {/* Log scale, so a tenth of a cent and four dollars share one axis. */}
                <span className="nm-cost-track">
                  <span className={`nm-cost-bar nm-cost-bar--${r.kind.toLowerCase()}`} style={{ width: `${Math.max(3, (Math.log10(r.median / 0.001) / Math.log10(max / 0.001)) * 100)}%` }} />
                </span>
                <span className="nm-cost-usd">{usd(r.median)}</span>
              </li>
            ))}
          </ol>
          <aside className="nm-cost-moves">
            <p className="nm-rail-title">Moved this month</p>
            {moved.map(({ r, m }) => (
              <div key={r.id} className="nm-move">
                <span className={`nm-move-pct ${m!.pct < 0 ? 'is-down' : 'is-up'}`}>
                  {m!.pct < 0 ? <ArrowDownRight size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}{Math.abs(m!.pct)}%
                </span>
                <span><b>{r.name}</b> {usd(m!.from)} → {usd(m!.to)}, week of {COSTS_SNAPSHOT.weeks[m!.fromWeek]} to {COSTS_SNAPSHOT.weeks[m!.toWeek]}</span>
              </div>
            ))}
            <p className="nm-source">Weeks with fewer than five runs are left out of the comparison.</p>
          </aside>
        </div>
      </section>
      <StoryRows trends={trends} />
      <AlsoInTheNews />
    </>
  );
}

/* ── O · Coverage lines ── */
export function MonitorCoverage({ trends }: DesksProps) {
  const all = [...allTrendsNotIn(trends), ...trends].filter((t) => postsFor(t.name, posts).length > 0);
  // Weeks back from today: four weeks of post counts per story.
  const weekCounts = (name: string) =>
    [3, 2, 1, 0].map((w) => postsFor(name, posts).filter((p) => {
      const ago = daysBetween(dayKey(p.publishedAt), TODAY);
      return ago >= w * 7 && ago < (w + 1) * 7;
    }).length);
  return (
    <>
      <section className="nt-section" aria-label="Coverage">
        <Head title="What's moving" sub="Posts per week on each story, the last four weeks. The arrow compares this week with last." />
        <ol className="nm-lines">
          {all.map((t) => {
            const c = weekCounts(t.name);
            const now = c[3];
            const before = c[2];
            const Trend = now > before ? ArrowUpRight : now < before ? ArrowDownRight : Minus;
            const word = now > before ? 'Rising' : now < before ? 'Cooling' : now ? 'Steady' : 'Quiet';
            const peak = Math.max(1, ...c);
            const pts = c.map((v, i) => `${(i / 3) * 100},${36 - (v / peak) * 30}`).join(' ');
            return (
              <li key={t.name} className={`nm-line nm-line--${word.toLowerCase()}`}>
                <span className="nm-line-name">{t.name}<small>{postsFor(t.name, posts).length} posts · latest {dayLabel(postsFor(t.name, posts)[0].publishedAt)}</small></span>
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="nm-spark" aria-hidden="true">
                  <polyline points={`0,40 ${pts} 100,40`} className="nm-spark-fill" />
                  <polyline points={pts} className="nm-spark-line" />
                </svg>
                <span className="nm-line-counts">{c.join(' · ')}</span>
                <span className="nm-line-trend"><Trend size={16} aria-hidden="true" /> {word}</span>
              </li>
            );
          })}
        </ol>
        <p className="nm-source">Counts are our own posts on each story, not the whole web.</p>
      </section>
      <StoryRows trends={trends} />
      <AlsoInTheNews />
    </>
  );
}
