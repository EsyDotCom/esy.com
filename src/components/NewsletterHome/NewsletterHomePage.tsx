/* The front page of The Marketing Engineer, at /engineer. It was the
 * homepage from 2026-09-13 to 09-18; the homepage now sells Esy OS.
 *
 * esy.com is a publication first: tutorials, guides, and news at the
 * intersection of AI, marketing, and engineering, published most days, with
 * the best of each week sent as one email. The one action is subscribing to
 * that email. Everything below the fold is evidence for the promise: the
 * latest articles, then the work grouped by kind (01 Apps: the real
 * properties with their case studies; 02 Films: the films, with the newest
 * one's poster), and the person writing it.
 *
 * Vocabulary: articles are the pages (esy.com/articles/<slug>/); issues are the weekly
 * emails. The previous product-story homepage lives in
 * src/archive/homepage-autopilot-story (see src/archive/README.md to revert).
 */

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';

import { getAllAgenticArticles } from '@/lib/published-articles';
import type { AgenticVideo } from '@/data/agentic-videos';
import LightHeader from '@/components/LightHeader/LightHeader';
import { toNavArticles } from '@/lib/nav-articles';
import { AUTHOR_SOCIALS } from '@/components/Agentic/authorSocials';
import { articlePath } from '@/lib/article-path';
import { formatDate, formatMinutes, thumbnailFor } from '@/lib/article-format';
import { TOPICS, topicHref } from '@/data/topics';
import { FILMS, filmHref } from '@/data/films';
import { CREATIVES } from '@/data/creatives';
import CreativePlayer from './CreativePlayer';
import FilmPosterBand from './FilmPosterBand';
import FilmStrip from './FilmStrip';
import ClipArtVisuals, { type ClipArtVisual } from './ClipArtVisuals';
import NewsletterHero from './NewsletterHero';
import WeeklyEmailBand from './WeeklyEmailBand';
import { nlSerif } from './serif';
import ClipArtWordmark from './ClipArtWordmark';
import SeoPageWordmark from './SeoPageWordmark';
import SeoPageReplay from './SeoPageReplay';
import { CLIPART_STYLES, SEOPAGE_STEPS, SEOPAGE_STEP_COUNT } from './apps';
import ComposeWordmark, { type ComposeMarkStyle } from './ComposeWordmark';
import ComposeBand, { type ComposeBandStyle } from './ComposeBand';
import AppsShowcase, { type AppsLayout } from './AppsShowcase';
import NewsColumn from './NewsColumn';
import { APP_STORIES } from './apps';
import './NewsletterHome.css';

const YOUTUBE_URL = 'https://www.youtube.com/@EsyDotCom';

// How many articles the Latest section shows: one featured plus a list. At a
// daily cadence a full list stops being useful within weeks, so the homepage
// shows the front of the stack; topic and archive pages will carry the rest.
const LATEST_COUNT = 12;

// The two businesses the work runs on, both real and in production. The
// articles document the work; these are where it happens. clip.art is set in
// its own wordmark, and SEOPage in its own (seopage¹).
const PROPERTIES: {
  name: string;
  wordmark: 'clipart' | 'seopage' | 'compose';
  href: string;
  domain: string;
  role: string;
  body: string;
}[] = [
  {
    name: 'clip.art',
    wordmark: 'clipart',
    href: 'https://clip.art',
    domain: 'clip.art',
    role: 'The testbed',
    body: 'A live clip art library. Its search traffic is where most experiments start.',
  },
  {
    name: 'seo.page',
    wordmark: 'seopage',
    href: 'https://seo.page',
    domain: 'seo.page',
    role: 'The service',
    body: 'A self-serve builder for local SEO landing pages that get cited by AI and rank on Google. Each page is researched from live search data, then written, designed, and scored on Esy OS.',
  },
];

// The third app, shown when the page passes `compose` (the homepage does):
// Compose, the agent newsroom that writes AI Marketing News at esy.com/news.
const COMPOSE_PROPERTY: (typeof PROPERTIES)[number] = {
  name: 'Esy Compose',
  wordmark: 'compose',
  href: 'https://compose.esy.com',
  domain: 'compose.esy.com',
  role: 'The newsroom',
  body: 'A team of agents for each publication: a Researcher, a Writer and a Fact-checker, with you at the end. It writes AI Marketing News on this site, every post dated and sourced, and nothing goes live until it\u2019s approved.',
};

// SEOPage's steps and clip.art's styles live in ./apps, shared with the merged apps band.

// Newest first, by publish date — the same merged publication list the article
// pages resolve against, so the homepage and the articles can never disagree.
async function latestArticles(): Promise<AgenticVideo[]> {
  const all = await getAllAgenticArticles();
  return [...all]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, LATEST_COUNT);
}

// The groups' index: jump between the kinds of work, each with its count.
function WorkIndex({ current, apps = PROPERTIES.length }: { current: 'apps' | 'creatives' | 'films'; apps?: number }) {
  const groups = [
    { key: 'apps', n: '01', label: 'Apps', count: apps },
    { key: 'creatives', n: '02', label: 'Creatives', count: CREATIVES.length },
    { key: 'films', n: '03', label: 'Films', count: FILMS.length },
  ] as const;
  return (
    <nav className="nl-work-index" aria-label="The work">
      {groups.map((g) => (
        <a key={g.key} href={`#work-${g.key}`} className="nl-work-chip" aria-current={g.key === current ? 'true' : undefined}>
          {g.n} {g.label}<b>{g.count}</b>
        </a>
      ))}
    </nav>
  );
}

// The newest creative, playing: the video beside its logline and credits, in
// the film band's shape but the house navy and jade. Older ones stay in the
// ledger above it.
function CreativeShowcase() {
  const c = CREATIVES[0];
  if (!c) return null;
  return (
    <section className="nl-lab nl-lab--film nl-lab--creative" aria-label={`${c.title}: now playing`}>
      <div className="nl-container nl-creative">
        <CreativePlayer youtubeId={c.youtubeId} title={c.title} />
        <div className="nl-film-side">
          <p className="nl-film-kicker">Now playing · {c.kind} · for {c.client}</p>
          <p className="nl-film-log">“{c.logline}”</p>
          <dl className="nl-film-credits">
            {c.credits.map(([role, name]) => (
              <div key={role}><dt>{role}</dt><dd>{name}</dd></div>
            ))}
          </dl>
          <div className="nl-film-ctas">
            <Link href={articlePath(c.articleSlug)} className="nl-film-cta">
              How we made it <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function NewsletterHomePage({
  hero,
  filmBand = 'strip',
  clipartVisual = 'control',
  compose,
  appsLayout = 'bands',
  newsColumn = false,
}: {
  /** 01 Apps as a ledger plus one case-study band per app ('bands', live), or
   *  merged into one band that shows one app at a time (/prototypes/home-trim/).
   *  The merged layouts always include Compose. */
  appsLayout?: 'bands' | AppsLayout;
  /** AI Marketing News's newest headlines in a slim column beside Latest (/prototypes/home-trim/). */
  newsColumn?: boolean;
  /** Compose as the third app: its mark in the 01 Apps ledger and its own case
   *  study band after SEOPage's. The homepage passes the stencil mark and the
   *  replay band (2026-09-30); /engineer leaves it off. The other marks and
   *  bands stay at /prototypes/home-compose/. */
  compose?: { mark: ComposeMarkStyle; band: ComposeBandStyle };
  /** What sits beside the clip.art case study: D · Control room since 2026-09-29 (/prototypes/home-clipart/). */
  clipartVisual?: ClipArtVisual;
  /** How 03 Films presents the films: the running strip since 2026-09-29, or the poster band (/prototypes/home-films/). */
  filmBand?: 'poster' | 'strip';
  /** What sits above the sections. /engineer uses the masthead; the homepage
   *  swaps in the Esy OS hero and keeps everything below. */
  hero?: React.ReactNode;
} = {}) {
  const articles = await latestArticles();
  const [featured, ...more] = articles;
  const featuredThumb = featured ? thumbnailFor(featured) : null;
  const properties = compose ? [...PROPERTIES, COMPOSE_PROPERTY] : PROPERTIES;

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />

      {/* ══ Masthead: name, promise, one action (or the page's own hero) ══ */}
      {hero ?? <NewsletterHero />}

      {/* ══ Latest ══
          The newest article earns the width; the rest of the latest dozen are
          a quiet list. `#latest` is where the header link and the old
          /engineer index redirect land. Nothing renders if the list is empty,
          rather than an empty shelf. */}
      {featured && (
        <section className="nl-section nl-section--alt" id="latest" aria-labelledby="nl-latest-title">
          <div className="nl-container">
            <div className="nl-section-head">
              <h2 className="nl-title" id="nl-latest-title">Latest</h2>
              {/* Browse by subject: the topic hubs hold the full archive the
                  Latest list scrolls past. */}
              <nav className="nl-topic-chips" aria-label="Browse by topic">
                {TOPICS.map((t) => (
                  <Link key={t.slug} href={topicHref(t.slug)} className="nl-topic-chip">
                    {t.name}
                  </Link>
                ))}
                <Link href="/topics/" className="nl-topic-chip nl-topic-chip--all">
                  All topics
                </Link>
              </nav>
            </div>

            {/* With the AI Marketing News column, articles keep the wide column and the
                list shortens to six, so the section doesn't grow. */}
            <div className={newsColumn ? 'nl-latest-grid' : undefined}>
            <div>
            <Link href={articlePath(featured.slug)} className="nl-featured">
              {featuredThumb && (
                <span className="nl-featured-media">
                  <img src={featuredThumb} alt="" width={960} height={540} loading="lazy" />
                  {featured.muxPlaybackId && (
                    <span className="nl-play" aria-hidden="true">
                      <Play size={18} fill="currentColor" />
                    </span>
                  )}
                </span>
              )}
              <span className="nl-featured-body">
                <span className="nl-meta">
                  {[featured.categoryLabel, formatDate(featured.publishedAt), formatMinutes(featured.durationSeconds)]
                    .filter(Boolean)
                    .join(' · ')}
                </span>
                <span className="nl-featured-title">{featured.title}</span>
                {featured.description && (
                  <span className="nl-featured-desc">{featured.description}</span>
                )}
                <span className="nl-read">
                  Read the article <ArrowRight size={15} aria-hidden="true" />
                </span>
              </span>
            </Link>

            {more.length > 0 && (
              <ul className="nl-list">
                {more.slice(0, newsColumn ? 6 : more.length).map((article) => (
                  <li key={article.slug}>
                    <Link href={articlePath(article.slug)} className="nl-row">
                      <span className="nl-row-date">{formatDate(article.publishedAt)}</span>
                      <span className="nl-row-title">{article.title}</span>
                      <span className="nl-row-cat">{article.categoryLabel}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            </div>
            {newsColumn && <NewsColumn />}
            </div>
          </div>
        </section>
      )}

      {/* ══ The work, 01 · Apps, merged ══
          One band for every app instead of a ledger plus a band each: the
          head on white like 02 and 03, then the chosen app's story and replay. */}
      {appsLayout !== 'bands' ? (
        <AppsShowcase
          layout={appsLayout}
          head={
            <>
              <div className="nl-work-head">
                <span className="nl-work-n" aria-hidden="true">01</span>
                <p className="nl-eyebrow">Apps that run on Esy OS</p>
                <h2 className="nl-title nl-work-title" id="nl-where-title">Real properties, real traffic.</h2>
              </div>
              <div>
                <p className="nl-lede">
                  Three apps built on Esy and run every day. Nothing here is a sandbox demo, so the results in each article are the results they actually got.
                </p>
                <WorkIndex current="apps" apps={APP_STORIES.length} />
              </div>
            </>
          }
        />
      ) : (
        <>
      {/* ══ The work, 01 · Apps ══
          The work is grouped by kind, each group opening with a numbered head
          on the left and a ledger on the right: 01 Apps (the businesses that
          run on Esy OS, then their case-study bands), 02 Films (then the
          newest film's poster). A new kind of work becomes 03 the same way. */}
      <section className="nl-section nl-where" id="work-apps" aria-labelledby="nl-where-title">
        <div className="nl-container nl-where-grid">
          <div className="nl-work-head">
            <span className="nl-work-n" aria-hidden="true">01</span>
            <p className="nl-eyebrow">Apps that run on Esy OS</p>
            <h2 className="nl-title nl-work-title" id="nl-where-title">Real properties, real traffic.</h2>
            <p className="nl-lede">
              {compose ? 'Three apps' : 'Two businesses'} built on Esy and run every day. Nothing here is a
              sandbox demo, so the results in each article are the results
              they actually got.
            </p>
            <WorkIndex current="apps" apps={properties.length} />
          </div>
          <ul className="nl-ledger">
            {properties.map(({ name, wordmark, href, domain, role, body }) => (
              <li key={name} className="nl-ledger-row">
                <span className="nl-ledger-name">
                  {wordmark === 'clipart' ? (
                    <ClipArtWordmark className="nl-ledger-wordmark" />
                  ) : wordmark === 'compose' ? (
                    <ComposeWordmark mark={compose?.mark} className="nl-ledger-compose" />
                  ) : (
                    <SeoPageWordmark className="nl-ledger-seopage" />
                  )}
                </span>
                <div className="nl-ledger-body">
                  <span className="nl-ledger-role">{role}</span>
                  <p>{body}</p>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="nl-inline-link">
                    {domain} <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ The proof, on navy ══
          The case study has the band to itself now, so it lands as the
          evidence for the ledger above rather than a fourth card. */}
      <section className="nl-lab" aria-label="Case study: clip.art runs on Esy OS">
        <div className="nl-container">
          {/* ══ Case study: clip.art runs on Esy OS ══
              The two-column case study from the Intelligence Circuitry
              homepage, restored as the proof under "real properties": story on
              the left (the clip.art wordmark, what it is, the styles it ships),
              and on the right what ClipArtVisuals shows: the live pack grid, a
              replayed run, or one subject in six styles. */}
          <div className={`nl-case ${clipartVisual === 'line' ? 'nl-case--stack' : ''}`}>
            <div className="nl-case-story">
              <div className="nl-case-meta">
                <span className="nl-case-tag">Case Study</span>
                <span className="nl-case-live">
                  <span className="nl-case-live-dot" aria-hidden="true" />
                  Live · In Production
                </span>
              </div>

              <h3 className="nl-case-title">
                <span className="nl-case-title-mark">
                  <ClipArtWordmark className="nl-case-wordmark" />
                </span>
                <span className="nl-case-title-tail">runs on Esy OS</span>
              </h3>

              <p className="nl-case-desc">
                Consumer marketplace for clip art, coloring pages, and
                illustrations. Esy workflows generate, post-process, and store
                every asset — each run recorded on prompt, model, processing,
                storage, and cost.
              </p>

              <div className="nl-case-styles">
                <span className="nl-case-styles-label">
                  {CLIPART_STYLES.length} styles supported
                </span>
                <div className="nl-case-pills">
                  {CLIPART_STYLES.map((style) => (
                    <span key={style} className="nl-case-pill">{style}</span>
                  ))}
                </div>
              </div>

              <div>
                <a href="https://clip.art" target="_blank" rel="noopener noreferrer" className="nl-case-cta">
                  See clip.art <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>

            <ClipArtVisuals visual={clipartVisual} />
          </div>

        </div>
      </section>

      {/* ══ SEOPage's proof, in its own ink band ══
          A second band, not a second block in clip.art's: each property's
          case study sits on its own ground and in its own accent. */}
      <section className="nl-lab nl-lab--seopage" aria-label="Case study: SEOPage runs on Esy OS">
        <div className="nl-container">
          {/* ══ Case study: SEOPage runs on Esy OS ══
              clip.art's layout mirrored: the product on the left (a replay of
              the real builder at create.seopage.com), the story on the right.
              The pills are the steps one production page build ran. */}
          <div className="nl-case nl-case--flip">
            <div className="nl-case-replay">
              <SeoPageReplay />
            </div>

            <div className="nl-case-story">
              <div className="nl-case-meta">
                <span className="nl-case-tag">Case Study</span>
                <span className="nl-case-live">
                  <span className="nl-case-live-dot" aria-hidden="true" />
                  Live · In Production
                </span>
              </div>

              <h3 className="nl-case-title">
                <span className="nl-case-title-mark nl-case-title-mark--seopage">
                  <SeoPageWordmark weight="light" />
                </span>
                <span className="nl-case-title-tail">runs on Esy OS</span>
              </h3>

              <p className="nl-case-desc">
                SEO landing pages that get cited by AI and rank on Google. A
                business types four details; Esy workflows research the market,
                write, design, illustrate, and judge the page. Claude Opus 5
                builds it, Claude Fable 5 audits it, and the illustrations come
                from clip.art&apos;s own workflows. Every run recorded on sources,
                model, and cost.
              </p>

              <div className="nl-case-styles">
                <span className="nl-case-styles-label">
                  {SEOPAGE_STEP_COUNT} steps in a page build
                </span>
                <div className="nl-case-pills">
                  {SEOPAGE_STEPS.map(([step, times]) => (
                    <span key={step} className="nl-case-pill">
                      {times > 1 ? `${step} ×${times}` : step}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <a href="https://seopage.com" target="_blank" rel="noopener noreferrer" className="nl-case-cta">
                  See seopage.com <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Compose's proof, on its own ground ══ */}
      {compose && <ComposeBand band={compose.band} mark={compose.mark} />}
        </>
      )}

      {/* ══ The work, 02 · Creatives ══
          Ads and explainers: marketing work that runs in feeds, as opposed to
          films, which are stories. The same head and ledger as 01; the newest
          creative plays in the band under it. */}
      <section className="nl-section nl-where" id="work-creatives" aria-labelledby="nl-creatives-title">
        <div className="nl-container nl-where-grid">
          <div className="nl-work-head">
            <span className="nl-work-n" aria-hidden="true">02</span>
            <p className="nl-eyebrow">Creatives we made</p>
            <h2 className="nl-title nl-work-title" id="nl-creatives-title">Real creatives, shipped.</h2>
            <p className="nl-lede">
              The ads and explainers behind our own businesses, built in code
              and cut for every feed. Each one comes with how it was made and
              what broke on the way.
            </p>
            <WorkIndex current="creatives" apps={properties.length} />
          </div>
          <ul className="nl-ledger">
            {CREATIVES.map((c) => (
              <li key={c.slug} className="nl-ledger-row nl-ledger-row--film">
                <span className="nl-film-mark">
                  <span className="nl-film-mark-title">{c.title}</span>
                  <span className="nl-film-mark-frames" aria-hidden="true">
                    {c.frames.map((src) => <span key={src} style={{ backgroundImage: `url(${src})` }} />)}
                  </span>
                </span>
                <div className="nl-ledger-body">
                  <span className="nl-ledger-role">{c === CREATIVES[0] ? 'Now playing' : c.client} · {c.kind}</span>
                  <p>{c.summary}</p>
                  <Link href={articlePath(c.articleSlug)} className="nl-inline-link">
                    How we made it <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ The newest creative, playing, with its credits ══ */}
      <CreativeShowcase />

      {/* ══ The work, 03 · Films ══
          The same head and ledger as 01 and 02, on the same white. The film's
          own night and gold start with the poster band below it, the way
          clip.art's and SEOPage's colours start with their case studies. */}
      <section className="nl-section nl-where" id="work-films" aria-labelledby="nl-films-title">
        <div className="nl-container nl-where-grid">
          <div className="nl-work-head">
            <span className="nl-work-n" aria-hidden="true">03</span>
            <p className="nl-eyebrow">Films made with Esy</p>
            <h2 className="nl-title nl-work-title" id="nl-films-title">Real films, start to finish.</h2>
            <p className="nl-lede">
              Stories made on Esy workflows, from the first draft of the script
              to the final sound mix. Every stage is recorded, so each film
              shows how it was made.
            </p>
            <WorkIndex current="films" apps={properties.length} />
          </div>
          <div>
            <ul className="nl-ledger">
              {FILMS.map((f) => (
                <li key={f.slug} className="nl-ledger-row nl-ledger-row--film">
                  <span className="nl-film-mark">
                    <span className="nl-film-mark-title">{f.title}</span>
                    <span className="nl-film-mark-frames" aria-hidden="true">
                      {f.frames.map((src) => <span key={src} style={{ backgroundImage: `url(${src})` }} />)}
                    </span>
                  </span>
                  <div className="nl-ledger-body">
                    <span className="nl-ledger-role">{f === FILMS[0] ? 'Now showing' : f.status} · {f.kind}</span>
                    <p>{f.summary}</p>
                    <Link href={filmHref(f)} className="nl-inline-link">
                      Watch the film <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <p className="nl-films-all">
              <Link href="/films/" className="nl-inline-link">
                All films on esy.com/films <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ══ The newest film, as a poster with its credits ══ */}
      {filmBand === 'strip' ? <FilmStrip /> : <FilmPosterBand />}

      {/* ══ The author ══ */}
      <section className="nl-section" aria-labelledby="nl-author-title">
        <div className="nl-container nl-author">
          <div className="nl-author-photo">
            <Image src="/images/zev-uhuru.png" alt="Zev Uhuru" width={144} height={144} />
          </div>
          <div>
            <p className="nl-eyebrow">Who writes it</p>
            <h2 className="nl-title" id="nl-author-title">Zev Uhuru</h2>
            <p className="nl-lede">
              I spent a decade shipping production web products, from
              fuboTV&apos;s streaming apps to Vroom&apos;s online car storefront.
              Now I build Esy and the businesses that run on it. Everything here
              comes out of that work: what I built, how it works, and what it
              did.
            </p>
            <div className="nl-author-links">
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="nl-inline-link">
                Watch on YouTube <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <div className="nl-socials" role="group" aria-label="Zev Uhuru social links">
                {AUTHOR_SOCIALS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="nl-social"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ The ask, once more ══ */}
      <WeeklyEmailBand />
    </div>
  );
}
