'use client';
/* Round 3 of /news: three takes on the section under E · Trend desk's hero,
 * where the other trends sit (2026-09-30). E's masthead and lead trend stay.
 *
 *   G · Rows   — each trend a full-width row: name, heat and line on the
 *                left, its posts as image cards on the right.
 *   H · Board  — the hottest trend as a big tile, the next four beside it; pick a tile and its posts
 *                open under the board.
 *   I · Lanes  — the week as a chart: a lane per trend, a column per day, a
 *                dot per post coloured by its label. Hover a dot for the
 *                headline; the list under it follows.
 */
import { useState } from 'react';
import { Art, type DesksProps } from './NewsFronts';
import { Meta } from './NewsIndex';
import { SAMPLE_NEWS, dayLabel, postsFor, type NewsLabel, type NewsPost, type NewsTrend } from './sample-news';

const LABELS: NewsLabel[] = ['Breaking', 'Tested', 'Follow-up', 'How-to', 'Explainer', 'Take'];

const posts = SAMPLE_NEWS;

/** A trend's heat as a small bar, shared by all three. */
function Heat({ trend }: { trend: NewsTrend }) {
  return <span className="nw-heat" style={{ ['--heat' as string]: `${trend.heat}%` }} aria-label={`Heat ${trend.heat} of 100`} />;
}

/** The section head all three share. */
function Head({ title = 'More trends this week' }: { title?: string }) {
  return (
    <div className="nt-head">
      <h2 className="nt-title">{title}</h2>
      <p className="nt-sub">Hottest first. Each trend collects its posts, from the first report to the tests and how-tos.</p>
    </div>
  );
}

/* ── G · Rows ── */
export function TrendRows({ trends }: DesksProps) {
  return (
    <section className="nt-section" aria-label="More trends">
      <Head />
      <ol className="nt-rows">
        {trends.map((t, i) => {
          const list = postsFor(t.name, posts);
          return (
            <li key={t.name} className="nt-row">
              <div className="nt-row-head">
                <span className="nt-rank">{String(i + 2).padStart(2, '0')}</span>
                <h3>{t.name}</h3>
                <p>{t.line}</p>
                <span className="nt-row-stats"><Heat trend={t} /> {list.length} {list.length === 1 ? 'post' : 'posts'}</span>
              </div>
              <div className="nt-row-cards">
                {list.map((p) => (
                  <article key={p.slug} className="nt-card">
                    {p.image ? <Art post={p} className="nt-card-art" /> : <span className="nt-card-art nt-card-art--blank">{p.topic}</span>}
                    <Meta post={p} />
                    <h4>{p.headline}</h4>
                  </article>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ── H · Board ── */
export function TrendBoard({ trends }: DesksProps) {
  const [open, setOpen] = useState<string>(trends[0]?.name);
  const openTrend = trends.find((t) => t.name === open);
  return (
    <section className="nt-section" aria-label="More trends">
      <Head title="The trend board" />
      <div className="nt-board">
        {trends.slice(0, 5).map((t, i) => {
          const list = postsFor(t.name, posts);
          const cover = list.find((p) => p.image);
          const on = t.name === open;
          return (
            <button
              key={t.name}
              className={`nt-tile nt-tile--${i === 0 ? 'xl' : 'm'} ${on ? 'is-on' : ''}`}
              aria-pressed={on}
              onClick={() => setOpen(t.name)}
            >
              {cover && <Art post={cover} className="nt-tile-art" />}
              <span className="nt-tile-shade" aria-hidden="true" />
              <span className="nt-tile-body">
                <span className="nt-tile-heat"><Heat trend={t} /> {t.heat}</span>
                <span className="nt-tile-name">{t.name}</span>
                <span className="nt-tile-line">{t.line}</span>
                <span className="nt-tile-count">{list.length} {list.length === 1 ? 'post' : 'posts'} · latest {dayLabel(list[0].publishedAt)}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* The open trend's posts, under the board. */}
      {openTrend && (
        <div className="nt-board-open" aria-live="polite">
          <p className="nt-board-open-label">{openTrend.name}</p>
          <ol>
            {postsFor(openTrend.name, posts).map((p) => (
              <li key={p.slug}>
                <Meta post={p} />
                <h4>{p.headline}</h4>
                <p>{p.dek}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}

/* ── I · Lanes ── */
export function TrendLanes({ trends }: DesksProps) {
  // The week, oldest to newest, from the posts themselves.
  const days = Array.from(new Set([...posts].reverse().map((p) => dayLabel(p.publishedAt))));
  const [hover, setHover] = useState<NewsPost | null>(null);
  const [lane, setLane] = useState<string | null>(null);
  const listed = lane ? postsFor(lane, posts) : trends.flatMap((t) => postsFor(t.name, posts));

  return (
    <section className="nt-section" aria-label="More trends">
      <Head title="The week, by trend" />
      <div className="nt-lanes" style={{ ['--days' as string]: days.length }}>
        <div className="nt-lanes-row nt-lanes-days" aria-hidden="true">
          <span />
          {days.map((d) => <span key={d}>{d}</span>)}
        </div>
        {trends.map((t) => {
          const list = postsFor(t.name, posts);
          return (
            <div key={t.name} className={`nt-lanes-row ${lane === t.name ? 'is-on' : ''}`}>
              <button className="nt-lane-name" onClick={() => setLane(lane === t.name ? null : t.name)} aria-pressed={lane === t.name}>
                {t.name}
                <Heat trend={t} />
              </button>
              {days.map((d) => (
                <span key={d} className="nt-lane-cell">
                  {list.filter((p) => dayLabel(p.publishedAt) === d).map((p) => (
                    <span
                      key={p.slug}
                      className={`nt-dot nt-dot--${p.label.toLowerCase()}`}
                      tabIndex={0}
                      aria-label={`${p.label}: ${p.headline}`}
                      onMouseEnter={() => setHover(p)}
                      onFocus={() => setHover(p)}
                      onMouseLeave={() => setHover(null)}
                      onBlur={() => setHover(null)}
                    />
                  ))}
                </span>
              ))}
            </div>
          );
        })}
        {/* The key: what each dot colour means. */}
        <ul className="nt-lanes-key" aria-label="Key">
          {LABELS.map((l) => (
            <li key={l}><span className={`nt-dot nt-dot--${l.toLowerCase()}`} aria-hidden="true" />{l}</li>
          ))}
        </ul>
        {/* What the hovered dot is; a hint until then. */}
        <p className="nt-lanes-peek">
          {hover ? <><b>{hover.label}</b> · {hover.headline}</> : 'Point at a dot to see the post. Pick a trend to list only its posts.'}
        </p>
      </div>

      <ol className="nt-lanes-list">
        {listed.map((p) => (
          <li key={p.slug} className={hover?.slug === p.slug ? 'is-on' : ''}>
            <Meta post={p} />
            <h4>{p.headline}</h4>
          </li>
        ))}
      </ol>
    </section>
  );
}
