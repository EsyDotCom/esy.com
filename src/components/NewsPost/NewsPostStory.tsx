/* Round 2 of the AI Marketing News post: three takes on B · In the story (2026-09-30).
 *
 *   D · Story + glance — B's story bar, C's key facts under the headline and
 *                        C's questions at the end.
 *   E · Story rail     — the story in a rail that stays beside the post as
 *                        you read, each earlier post with its summary.
 *   F · Story so far   — a recap of the whole story first, for readers who
 *                        land from search, then what's new today, the post,
 *                        and the story line at the end.
 */
import { ArrowRight } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { dayLabel } from '@/components/NewsIndex/news-examples';
import { Body, Byline, Check, Crumbs, Figure, JsonLd, MoreNews, PostLine, Source, StoryBar, Why } from './NewsPost';
import { NEW_TODAY, POST, STORY, STORY_OTHERS, STORY_SO_FAR } from './post';

const post = POST;

/** C's key facts box. */
function Facts() {
  return (
    <section className="np-facts" aria-labelledby="np-facts">
      <h2 id="np-facts">At a glance</h2>
      <dl>
        {post.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </section>
  );
}

/** C's questions and answers. */
export function Faq() {
  return (
    <section className="np-faq" aria-labelledby="np-faq">
      <h2 id="np-faq">Questions</h2>
      {post.faq.map(([q, a]) => (
        <details key={q} open>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </section>
  );
}

export function Signup({ title = `Follow ${post.trend} by email` }: { title?: string }) {
  return (
    <div className="np-inline-signup">
      <p className="np-rail-title">{title}</p>
      <NewsletterSignup note="The week’s AI news in The Marketing Engineer" />
    </div>
  );
}

/* ── D · Story + glance ── */
export function PostStoryGlance() {
  return (
    <>
      <JsonLd />
      <StoryBar />
      <article className="np np--story">
        <div className="nl-container np-narrow">
          <h1 className="np-title">{post.headline}</h1>
          <p className="np-dek">{post.dek}</p>
          <Byline />
          <Facts />
          <Why />
          <Figure />
          <Body />
          <Check />
          <Faq />
          <Source />
          <Signup />
        </div>
      </article>
      <MoreNews />
      <WeeklyEmailBand />
    </>
  );
}

/* ── E · Story rail ── */
export function PostStoryRail() {
  return (
    <>
      <JsonLd />
      <article className="np np--rail">
        <div className="nl-container np-railgrid">
          {/* The story, top to bottom, newest first; it stays in view. */}
          <aside className="np-storyrail" aria-label={`The ${post.trend} story`}>
            <p className="np-storybar-kicker">The story</p>
            <p className="np-storyrail-name">{post.trend}</p>
            <p className="np-storyrail-meta">{STORY.length} posts since {dayLabel(STORY[STORY.length - 1].publishedAt)}</p>
            <ol>
              {STORY.map((p) => (
                <li key={p.slug} className={p.slug === post.slug ? 'is-on' : ''}>
                  <span className="np-storyrail-date">{dayLabel(p.publishedAt)} · {p.label}</span>
                  <span className="np-storyrail-title">{p.headline}</span>
                  {p.slug !== post.slug && <span className="np-storyrail-dek">{p.dek}</span>}
                  {p.slug === post.slug && <span className="np-storyrail-here">You’re reading this</span>}
                </li>
              ))}
            </ol>
            <p className="np-rail-link">The {post.trend} story <ArrowRight size={14} aria-hidden="true" /></p>
          </aside>
          <div className="np-main">
            <Crumbs />
            <h1 className="np-title">{post.headline}</h1>
            <p className="np-dek">{post.dek}</p>
            <Byline />
            <Figure />
            <Why />
            <Body />
            <Check />
            <Source />
            <Signup />
          </div>
        </div>
      </article>
      <MoreNews />
      <WeeklyEmailBand />
    </>
  );
}

/* ── F · Story so far ── */
export function PostStorySoFar() {
  const oldestFirst = [...STORY].reverse();
  return (
    <>
      <JsonLd />
      <article className="np np--sofar">
        <div className="nl-container np-narrow">
          <Crumbs />
          <h1 className="np-title">{post.headline}</h1>
          <Byline />
          {/* The recap: the whole story in three lines, then what this post adds. */}
          <section className="np-sofar" aria-labelledby="np-sofar">
            <h2 id="np-sofar">The story so far</h2>
            <ol>
              {STORY_SO_FAR.map((s) => (
                <li key={s.date} className={s === STORY_SO_FAR[STORY_SO_FAR.length - 1] ? 'is-on' : ''}>
                  <b>{s.date}</b>
                  <span>{s.text}</span>
                </li>
              ))}
            </ol>
            <p className="np-new"><b>New today</b> {NEW_TODAY}</p>
          </section>
          <Figure />
          <Why />
          <Body />
          <Check />
          <Source />
          <Signup />
        </div>
      </article>

      {/* The story line at the end: where to go next. */}
      <section className="nl-section nl-section--alt" aria-labelledby="np-line">
        <div className="nl-container np-narrow">
          <h2 className="nt-title" id="np-line">Follow the story</h2>
          <ol className="np-rail-list">
            {oldestFirst.filter((p) => p.slug !== post.slug).map((p) => <PostLine key={p.slug} p={p} />)}
          </ol>
          <p className="np-rail-link">Every post on {post.trend} <ArrowRight size={14} aria-hidden="true" /> <span className="nm-more-path">/news/meta-muse · next to build</span></p>
        </div>
      </section>
      <MoreNews />
    </>
  );
}
