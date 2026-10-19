/* AI Marketing News (esy.com/news), shipped 2026-09-30 from /prototypes/news/ and
 * /prototypes/news-post/:
 *
 *   NewsIndexPage — P · Trend desk · Rows · Wire: the lead story, the other
 *                   stories with two or more posts as rows, then every post.
 *   NewsPostPage  — I · D · Spec sheet: the story line (each chapter links
 *                   to its post), key facts, why it matters, the post, what to
 *                   check, questions, source.
 *   NewsStoryPage — a story's page: every post in it, the page that can rank
 *                   for the story's name.
 *
 * Data and rules: src/data/news/index.ts. Each page gets the posts and stories
 * from its route (getNews() in src/lib/published-news.ts: the registry plus
 * posts published from Compose), so nothing here reads the registry directly.
 * No labels ("Breaking" etc.): the dates say when things happened.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight, ArrowUpRight, CalendarDays, Download, Info, MapPin, Plug, ShieldCheck, Sparkles, Store, Tag, Users,
  type LucideIcon,
} from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { ZevTake } from './Take';
import { ShareBar, ShareRail } from './Share';
import { FactCard, StoryCard } from './FactCard';
import {
  eventLabel, findStoryIn, liveStoriesOf, longDate, postPath, postsInStoryOf,
  type NewsData, type NewsPost, type NewsStory,
} from '@/data/news';

const SITE = 'https://esy.com';
const MIN_POSTS = 2; // a story needs two posts for a row on /news
const MAX_ROWS = 3;
const SIGNUP_NOTE = 'The week’s AI news in The Marketing Engineer';

/* ── Shared pieces ── */

/** "News from Sep 29 · via Meta Newsroom" — when it happened, and where it's from. */
function PostMeta({ post, story, source = true }: { post: NewsPost; story: NewsStory | undefined; source?: boolean }) {
  return (
    <p className="nw-meta">
      <span className="nw-topic">{story?.name}</span>
      <span>{eventLabel(post.eventDate)}</span>
      {source && <span>via {post.sources[0]?.publisher}</span>}
    </p>
  );
}

/** A post as a card: its fact card (unless the row already shows one), date, headline. */
function PostCard({ post, story, cover = true }: { post: NewsPost; story: NewsStory | undefined; cover?: boolean }) {
  return (
    <Link href={postPath(post.slug)} className={`nt-card nx-card ${cover ? '' : 'nx-card--text'}`}>
      {cover && <span className="nx-card-cover"><FactCard post={post} story={story} size="sm" /></span>}
      <PostMeta post={post} story={story} source={false} />
      <h4>{post.headline}</h4>
    </Link>
  );
}

function Signup({ title }: { title: string }) {
  return (
    <div className="np-inline-signup">
      <p className="np-rail-title">{title}</p>
      <NewsletterSignup form="news-inline" note={SIGNUP_NOTE} />
    </div>
  );
}

/* ── /news ── */
export function NewsIndexPage({ news }: { news: NewsData }) {
  const { posts } = news;
  const stories = liveStoriesOf(posts, news.stories);
  const postsInStory = (slug: string) => postsInStoryOf(posts, slug);
  const storyOf = (slug: string) => findStoryIn(news.stories, slug);
  // The lead: the newest story with two or more posts.
  const multi = stories.filter((s) => postsInStory(s.slug).length >= MIN_POSTS);
  const lead = multi[0];
  const [leadPost, ...leadMore] = lead ? postsInStory(lead.slug) : [];
  const rows = multi.slice(1, 1 + MAX_ROWS);

  return (
    <>
      <section className="nw-front">
        <div className="nl-container">
          <div className="nw-masthead">
            <h1 className="nw-masthead-name">AI Marketing News</h1>
            <p className="nw-masthead-sub">For people who build <em>marketing systems</em></p>
            <p className="nw-masthead-line">
              <span>Updated {longDate(posts[0].publishedAt)}</span>
              <span>{posts.length} posts</span>
            </p>
          </div>

          {lead && leadPost && (
            <section className="nw-desk-top" aria-labelledby="nx-lead">
              <p className="nw-desk-kicker">The story to follow</p>
              <h2 className="nw-desk-name" id="nx-lead"><Link href={`/news/${lead.slug}/`}>{lead.name}</Link></h2>
              <p className="nw-desk-line">{lead.line}</p>
              <div className="nw-front-grid nw-front-grid--flat">
                <article className="nw-lead">
                  <Link href={postPath(leadPost.slug)} className="nx-lead-link">
                    <span className="nx-lead-cover"><FactCard post={leadPost} story={lead} /></span>
                    <PostMeta post={leadPost} story={lead} />
                    <h3 className="nw-lead-headline">{leadPost.headline}</h3>
                  </Link>
                  <p className="nw-lead-dek">{leadPost.dek}</p>
                  <p className="nw-why"><b>Why it matters</b> {leadPost.why}</p>
                </article>
                <div className="nw-second">
                  <p className="nw-desk-sub">More on {lead.name}</p>
                  {leadMore.map((p) => (
                    <article key={p.slug} className="nw-second-item">
                      <PostMeta post={p} story={lead} source={false} />
                      <h4 className="nw-second-headline"><Link href={postPath(p.slug)}>{p.headline}</Link></h4>
                      <p className="nw-wire-dek">{p.dek}</p>
                    </article>
                  ))}
                  <div className="nw-front-signup">
                    <p className="nw-rail-title">Get the week’s AI news by email</p>
                    <NewsletterSignup form="news-front" note={SIGNUP_NOTE} />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* The other stories with two or more posts, each pointing at its page. */}
          {rows.length > 0 && (
            <section className="nt-section" aria-label="More stories">
              <div className="nt-head">
                <h2 className="nt-title">More stories</h2>
                <p className="nt-sub">Stories with two or more posts, newest first.</p>
              </div>
              <ol className="nt-rows">
                {rows.map((s) => {
                  const list = postsInStory(s.slug);
                  return (
                    <li key={s.slug} className="nt-row">
                      <div className="nt-row-head">
                        <Link href={postPath(list[0].slug)} className="nx-row-cover" tabIndex={-1} aria-hidden="true">
                          <FactCard post={list[0]} story={s} size="sm" />
                        </Link>
                        <h3><Link href={`/news/${s.slug}/`}>{s.name}</Link></h3>
                        <p>{s.line}</p>
                        <span className="nt-row-stats">{list.length} posts · latest news {eventLabel(list[0].eventDate)}</span>
                      </div>
                      <div className="nt-row-cards">
                        {list.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} story={s} cover={false} />)}
                        <Link href={`/news/${s.slug}/`} className="nm-more">Every post on {s.name} <ArrowRight size={14} aria-hidden="true" /></Link>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          )}

          {/* Every post, as plain links, so each one is linked from /news. */}
          <section className="nt-section" aria-labelledby="nx-all">
            <div className="nt-head">
              <h2 className="nt-title" id="nx-all">Every post</h2>
              <p className="nt-sub">Newest news first.</p>
            </div>
            <ol className="nw-wire-list nx-wire">
              {posts.map((p) => (
                <li key={p.slug} className="nw-wire-item">
                  <time className="nw-wire-time" dateTime={p.eventDate}>{eventLabel(p.eventDate)}</time>
                  <div>
                    <p className="nw-topic">{storyOf(p.story)?.name}</p>
                    <h3 className="nw-wire-headline"><Link href={postPath(p.slug)}>{p.headline}</Link></h3>
                    <p className="nw-wire-dek">{p.dek}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>
      <WeeklyEmailBand />
    </>
  );
}

/* ── /news/<post>/ ── */

/** An icon for a key fact, by its label. */
const FACT_ICON: Record<string, LucideIcon> = {
  What: Sparkles, For: Store, Where: MapPin, Price: Tag, Pricing: Tag, Connects: Plug, Includes: Plug,
  Control: ShieldCheck, Announced: CalendarDays, Launched: CalendarDays, Released: CalendarDays,
  Started: CalendarDays, When: CalendarDays, Reported: CalendarDays, Rollout: CalendarDays,
  'Get it': Download, 'Led by': Users, Apps: Download,
};

/** The story line: each chapter links to its post; this one is marked. */
function StoryLine({ post, story, posts }: { post: NewsPost; story: NewsStory; posts: NewsPost[] }) {
  const chapters = [...postsInStoryOf(posts, story.slug)].reverse(); // oldest news first
  return (
    <nav className="npg-story-wrap" aria-label={`The ${story.name} story`}>
      <div className="npg-story">
        <p className="npg-story-name">
          <span>The story</span> <Link href={`/news/${story.slug}/`}>{story.name}</Link>
          <small>{chapters.length} {chapters.length === 1 ? 'post' : 'posts'}</small>
        </p>
        {chapters.length > 1 && (
          <ol>
            {chapters.map((p, i) => {
              const here = p.slug === post.slug;
              const inner = (
                <>
                  <b>{i + 1}</b>
                  <span className="npg-ch-name">{p.chapter}</span>
                  <span className="npg-ch-date">{here ? 'This post' : eventLabel(p.eventDate)}</span>
                </>
              );
              return (
                <li key={p.slug}>
                  {here ? (
                    <span className="nx-chapter is-here is-on" aria-current="page">{inner}</span>
                  ) : (
                    <Link href={postPath(p.slug)} className="nx-chapter">{inner}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </nav>
  );
}

export function NewsPostPage({ post, news, sample = false, slots }: {
  post: NewsPost;
  news: NewsData;
  /** Prototype only: marks the take as sample text. */
  sample?: boolean;
  /** Prototype only (/prototypes/news-share): replaces the share bar and rail with a take's own rows. The live page passes none. */
  slots?: { underByline?: ReactNode; afterArticle?: ReactNode; beside?: ReactNode };
}) {
  // Every post's story exists (getNews() builds one for Compose posts), but a
  // missing one only drops the story line, never the page.
  const story = findStoryIn(news.stories, post.story);
  const storyOf = (slug: string) => findStoryIn(news.stories, slug);
  const more = news.posts.filter((p) => p.story !== post.story).slice(0, 4);
  // Share (SH4, 2026-10-19): the bar after the article and, from 1200px, the
  // rail beside the column. A prototype passing its own slots draws its own.
  const share = { url: `https://esy.com${postPath(post.slug)}`, title: post.headline };
  const beside = slots ? slots.beside : <ShareRail {...share} />;
  const afterArticle = slots ? slots.afterArticle : <ShareBar {...share} />;
  return (
    <>
      <article className="np np--spec">
        {beside}
        <div className="nl-container"><div className="npi-col nx-col">
          {story && <StoryLine post={post} story={story} posts={news.posts} />}
          <h1 className="np-title">{post.headline}</h1>
          <p className="np-dek">{post.dek}</p>
          <div className="np-byline">
            <span className="np-byline-text">
              By <Link href="/about/">Zev Uhuru</Link> · Posted <time dateTime={post.publishedAt}>{longDate(post.publishedAt)}</time> · News from {eventLabel(post.eventDate)} · {post.readMinutes} min read
            </span>
          </div>
          {slots?.underByline}

          <section className="np-why" aria-labelledby="np-why">
            <h2 id="np-why">Why it matters</h2>
            <p>{post.why}</p>
          </section>

          {/* Zev's take: signed opinion, right under the one-line fact. */}
          <ZevTake post={post} sample={sample} />

          {post.facts.length > 0 && (
            <section className="npi-facts" aria-labelledby="np-facts">
              <h2 id="np-facts">At a glance</h2>
              <dl>
                {post.facts.map(([k, v]) => {
                  const Icon = FACT_ICON[k] ?? Info;
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
          )}


          <figure className="nx-figure"><FactCard post={post} story={story} /></figure>

          <div className="np-body">{post.body.map((para) => <p key={para.slice(0, 40)}>{para}</p>)}</div>

          {post.check.length > 0 && (
            <section className="np-check" aria-labelledby="np-check">
              <h2 id="np-check">What to check</h2>
              <ul>{post.check.map((c) => <li key={c}>{c}</li>)}</ul>
            </section>
          )}

          {post.faq.length > 0 && (
            <section className="np-faq" aria-labelledby="np-faq">
              <h2 id="np-faq">Questions</h2>
              {post.faq.map(([q, a]) => (
                <details key={q} open>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </section>
          )}

          {afterArticle}

          {/* Sources: every fact's origin, the company's own page first. */}
          <section className="nx-sources" aria-labelledby="np-sources">
            <h2 id="np-sources">Sources</h2>
            <ol>
              {post.sources.map((src) => (
                <li key={src.url}>
                  <p className="nx-source-head">
                    <b>{src.publisher}</b>
                    {src.secondary && <span className="nx-source-tag">Reporting</span>}
                    <span>{src.date}</span>
                  </p>
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="nx-source-title">
                    {src.title} <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                  <p className="nx-source-supports">Backs up: {src.supports}</p>
                  {src.note && <p className="nx-source-note">{src.note}</p>}
                </li>
              ))}
            </ol>
            <p className="nx-sources-foot">
              {post.writtenBy === 'zev'
                ? 'Written by Zev in his own words from these sources, every fact checked against them.'
                : 'Researched and drafted by AI agents, in our own words from these sources; every fact was checked against them, and Zev approved the post before it went up.'}{' '}
              AI Marketing News is independent: the companies we cover don’t sponsor, review or endorse it. Spotted a mistake? See our <Link href="/editorial-standards/">editorial standards</Link> or email <a href="mailto:zev@esy.com">zev@esy.com</a>.
            </p>
          </section>
          <Signup title={story ? `Follow ${story.name} by email` : 'Get the week’s AI news by email'} />
        </div></div>
      </article>

      {more.length > 0 && (
        <section className="nl-section nl-section--alt" aria-labelledby="np-more">
          <div className="nl-container">
            <h2 className="nt-title" id="np-more">More AI Marketing News</h2>
            <div className="nx-more">{more.map((p) => <PostCard key={p.slug} post={p} story={storyOf(p.story)} />)}</div>
          </div>
        </section>
      )}
      <WeeklyEmailBand />
    </>
  );
}

/* ── /news/<story>/ ── */
export function NewsStoryPage({ story, news }: { story: NewsStory; news: NewsData }) {
  const list = postsInStoryOf(news.posts, story.slug);
  return (
    <>
      <section className="np nx-story">
        <div className="nl-container"><div className="npi-col nx-col">
          <p className="np-crumbs"><Link href="/news/">AI Marketing News</Link> <span aria-hidden="true">›</span> <span>The story</span></p>
          <h1 className="np-title">{story.name}</h1>
          <p className="np-dek">{story.line}</p>
          <p className="nx-story-count">{list.length} {list.length === 1 ? 'post' : 'posts'} · latest news {eventLabel(list[0].eventDate)}</p>
          <figure className="nx-figure"><StoryCard story={story} count={list.length} latest={eventLabel(list[0].eventDate)} /></figure>
          <ol className="nx-story-list">
            {list.map((p) => (
              <li key={p.slug}>
                <time dateTime={p.eventDate}>{eventLabel(p.eventDate)}</time>
                <div>
                  <h2><Link href={postPath(p.slug)}>{p.headline}</Link></h2>
                  <p>{p.dek}</p>
                </div>
              </li>
            ))}
          </ol>
          <Signup title={`Follow ${story.name} by email`} />
        </div></div>
      </section>
      <WeeklyEmailBand />
    </>
  );
}

/* ── Structured data ── */

export function postJsonLd(post: NewsPost, story: NewsStory | undefined) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: post.headline,
      description: post.dek,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      // The fact card, as the share image (app/news/[slug]/opengraph-image.tsx).
      image: [`${SITE}${postPath(post.slug)}opengraph-image/`],
      author: [{ '@type': 'Person', name: 'Zev Uhuru', url: `${SITE}/about/` }],
      publisher: { '@type': 'Organization', name: 'Esy', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/brand/logo/esy-wordmark.png`, width: 600, height: 220 } },
      mainEntityOfPage: `${SITE}${postPath(post.slug)}`,
      isBasedOn: post.sources.map((src) => src.url),
      citation: post.sources.map((src) => ({ '@type': 'CreativeWork', name: src.title, url: src.url, publisher: src.publisher })),
      about: story?.name,
      articleSection: 'AI Marketing News',
    },
    post.faq.length > 0 && {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ].filter(Boolean);
}
