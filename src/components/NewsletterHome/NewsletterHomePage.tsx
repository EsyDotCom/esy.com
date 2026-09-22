/* The front page of The Marketing Engineer, at /engineer. It was the
 * homepage from 2026-09-13 to 09-18; the homepage now sells Esy OS.
 *
 * esy.com is a publication first: tutorials, guides, and news at the
 * intersection of AI, marketing, and engineering, published most days, with
 * the best of each week sent as one email. The one action is subscribing to
 * that email. Everything below the fold is evidence for the promise: the
 * latest articles, the real properties the work runs on (with the clip.art
 * case study), and the person writing it.
 *
 * Vocabulary: articles are the pages (esy.com/engineer/<slug>/); issues are the weekly
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
import NewsletterHero from './NewsletterHero';
import WeeklyEmailBand from './WeeklyEmailBand';
import { nlSerif } from './serif';
import ClipArtWordmark from './ClipArtWordmark';
import SeoPageWordmark from './SeoPageWordmark';
import SeoPageReplay from './SeoPageReplay';
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
  wordmark: 'clipart' | 'seopage';
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
    body: 'The SEO systems from these articles, run every week for sites that want the results without the upkeep.',
  },
];

// SEOPage's case study: the 19 steps of one production page build, in order,
// as a live generate-seo-landing-page-v3 run on api.esy.com recorded them
// (2026-09-22). Names are the run's own, shortened; repeats are counted.
const SEOPAGE_STEPS: [string, number][] = [
  ['SEO research', 1], ['Live Google results', 1], ['Competitor pages', 2],
  ["The business's own site", 1], ['Market evidence', 1], ['Design research', 1],
  ['Design critique', 1], ['Imagery direction', 1], ['Photography', 3],
  ['Clip art pack', 4], ['Build the page', 1], ['Slop audit', 1], ['Slop fix', 1],
];
const SEOPAGE_STEP_COUNT = SEOPAGE_STEPS.reduce((n, [, times]) => n + times, 0);

// The clip.art case study, restored from the Intelligence Circuitry homepage
// (src/archive/homepage-intelligence-circuitry): the same style vocabulary,
// with the grid filled from our Clay Office pack on clip.art
// (clip.art/packs/25-boutique-consulting-clipart-pngs-clay-office) — the
// office scenes fit a publication about marketing work better than the old
// seasonal mix. Scenes, poses and props only; the pack's seamless patterns,
// borders and frames read as wallpaper in a tile, so they're left out.
const CLIPART_STYLES = [
  'Flat', 'Minimal', 'Line Art', 'Black & White', 'Cartoon',
  'Mascot', 'Sticker', 'Emoji', 'Vintage', 'Watercolor',
  'Storybook', 'Isometric', 'Clay', 'Chibi', 'Pixel',
  'Kawaii', '3D', 'Doodle',
];

const CLAY_OFFICE = 'https://images.clip.art/packs/business/25-boutique-consulting-clipart-pngs-clay-office';

const CLIPART_SHOWCASE = [
  { url: `${CLAY_OFFICE}/consultant-pitch-deck-presentation-scene-hbs2mr.webp`, alt: 'Clay consultant presenting a pitch deck' },
  { url: `${CLAY_OFFICE}/clay-laptop-open-muted-teal-screen-prop-24ahuy.webp`, alt: 'Clay laptop with a muted teal screen' },
  { url: `${CLAY_OFFICE}/strategy-workshop-in-action-sticky-note-wall-scene-mscrxi.webp`, alt: 'Clay strategy workshop at a sticky-note wall' },
  { url: `${CLAY_OFFICE}/ceramic-coffee-mug-break-time-prop-e4f8x6.webp`, alt: 'Clay ceramic coffee mug' },
  { url: `${CLAY_OFFICE}/consultant-presenting-insights-standing-pitch-pose-gzg4x8.webp`, alt: 'Clay consultant standing and presenting insights' },
  { url: `${CLAY_OFFICE}/analytics-dashboard-review-scene-b0300v.webp`, alt: 'Clay analytics dashboard review' },
  { url: `${CLAY_OFFICE}/focused-laptop-work-solo-consultant-deep-work-pose-opxz8r.webp`, alt: 'Clay consultant in focused laptop work' },
  { url: `${CLAY_OFFICE}/hybrid-video-meeting-room-scene-su3c6h.webp`, alt: 'Clay hybrid video meeting room' },
  { url: `${CLAY_OFFICE}/team-strategy-workshop-whiteboard-huddle-pose-onbdtz.webp`, alt: 'Clay team huddled at a whiteboard' },
  { url: `${CLAY_OFFICE}/coffee-break-lounge-corner-scene-o9uuji.webp`, alt: 'Clay coffee-break lounge corner' },
  { url: `${CLAY_OFFICE}/colleagues-reviewing-analytics-duo-desk-pose-ilf5g0.webp`, alt: 'Clay colleagues reviewing analytics at a desk' },
  { url: `${CLAY_OFFICE}/client-discovery-call-laptop-and-notepad-desk-scene-9mszcr.webp`, alt: 'Clay client discovery call at a desk with laptop and notepad' },
];

// Newest first, by publish date — the same merged publication list the article
// pages resolve against, so the homepage and the articles can never disagree.
async function latestArticles(): Promise<AgenticVideo[]> {
  const all = await getAllAgenticArticles();
  return [...all]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, LATEST_COUNT);
}

export default async function NewsletterHomePage({
  hero,
}: {
  /** What sits above the sections. /engineer uses the masthead; the homepage
   *  swaps in the Esy OS hero and keeps everything below. */
  hero?: React.ReactNode;
} = {}) {
  const articles = await latestArticles();
  const [featured, ...more] = articles;
  const featuredThumb = featured ? thumbnailFor(featured) : null;

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
                {more.map((article) => (
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
        </section>
      )}

      {/* ══ Where the experiments run ══
          Editorial, not a card grid: the claim on the left, the two
          businesses as a ledger on the right. White ground, so it reads as
          its own beat between the grey Latest section and the navy case
          study below. */}
      <section className="nl-section nl-where" aria-labelledby="nl-where-title">
        <div className="nl-container nl-where-grid">
          <div>
            <p className="nl-eyebrow">Where the experiments run</p>
            <h2 className="nl-title" id="nl-where-title">Real properties, real traffic.</h2>
            <p className="nl-lede">
              Nothing here is a sandbox demo. Each system gets built on a business
              that runs every day, so the results in each article are the results
              it actually got.
            </p>
          </div>
          <ul className="nl-ledger">
            {PROPERTIES.map(({ name, wordmark, href, domain, role, body }) => (
              <li key={name} className="nl-ledger-row">
                <span className="nl-ledger-name">
                  {wordmark === 'clipart' ? (
                    <ClipArtWordmark className="nl-ledger-wordmark" />
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
      <section className="nl-lab" aria-label="Case studies: clip.art and SEOPage run on Esy OS">
        <div className="nl-container">
          {/* ══ Case study: clip.art runs on Esy OS ══
              The two-column case study from the Intelligence Circuitry
              homepage, restored as the proof under "real properties": story on
              the left (the clip.art wordmark, what it is, the styles it ships),
              a 4×3 grid of live catalog assets on the right. */}
          <div className="nl-case">
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
                <Link href="/workflows/generate-clip-art-asset/" className="nl-case-cta">
                  See the workflow <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <ul className="nl-case-grid" aria-label="Sample assets from clip.art's Clay Office pack">
              {CLIPART_SHOWCASE.map(({ url, alt }) => (
                <li key={url} className="nl-case-tile">
                  <img src={url} alt={alt} loading="lazy" width={228} height={228} />
                </li>
              ))}
            </ul>
          </div>

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
                  <SeoPageWordmark />
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
