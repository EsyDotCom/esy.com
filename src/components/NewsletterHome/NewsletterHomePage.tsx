/* The homepage as the front page of The Marketing Engineer.
 *
 * esy.com is a publication first: tutorials, guides, and news at the
 * intersection of AI, marketing, and engineering, published most days, with
 * the best of each week sent as one email. The one action is subscribing to
 * that email. Everything below the fold is evidence for the promise: the
 * latest articles, what a tutorial contains, the real properties the work
 * runs on, and the person writing it.
 *
 * Vocabulary: articles are the pages (esy.com/<slug>/); issues are the weekly
 * emails. The previous product-story homepage lives in
 * src/archive/homepage-autopilot-story (see src/archive/README.md to revert).
 */

import Link from 'next/link';
import Image from 'next/image';
import { Cormorant_Garamond } from 'next/font/google';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';

import { getAllAgenticArticles } from '@/lib/published-articles';
import type { AgenticVideo } from '@/data/agentic-videos';
import LightHeader from '@/components/LightHeader/LightHeader';
import { AUTHOR_SOCIALS } from '@/components/Agentic/authorSocials';
import { articlePath } from '@/lib/article-path';
import NewsletterSignup from './NewsletterSignup';
import CountUp from './CountUp';
import './NewsletterHome.css';

// Same scoped Cormorant cuts the story homepage loaded: the global sheet only
// ships weight 400, so real 600/700 cuts keep the headlines from faux-bolding.
const cormorant = Cormorant_Garamond({
  weight: ['600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--nl-serif',
});

const YOUTUBE_URL = 'https://www.youtube.com/@EsyDotCom';

// How many articles the Latest section shows: one featured plus a list. At a
// daily cadence a full list stops being useful within weeks, so the homepage
// shows the front of the stack; topic and archive pages will carry the rest.
const LATEST_COUNT = 12;

// What every tutorial carries. Three parts because the promise has three
// verbs: build it, explain it, show what it did.
const TUTORIAL_PARTS = [
  {
    step: '01',
    title: 'The system',
    body: 'A working build: the prompts, the code, and the data it reads, from analytics and search to the site itself.',
  },
  {
    step: '02',
    title: 'The walkthrough',
    body: 'Step by step, often on video. You see how it works, not just a screenshot of the output.',
  },
  {
    step: '03',
    title: 'The result',
    body: 'What changed after it ran on a live property, and what didn’t. The misses are published too.',
  },
];

// The properties the work runs on. Each one is real and in production; the
// articles document the work, these are where the work happens.
const PROPERTIES = [
  {
    name: 'clip.art',
    href: 'https://clip.art',
    role: 'The testbed',
    body: 'A live clip art library. Its search traffic is where most experiments start.',
  },
  {
    name: 'SEOPage',
    href: 'https://seopage.com',
    role: 'The service',
    body: 'The SEO systems from these articles, run every week for sites that want the results without the upkeep.',
  },
  {
    name: 'Esy',
    // Docs live on their own site now (docs.esy.com); link there directly
    // rather than through an esy.com redirect.
    href: 'https://docs.esy.com',
    role: 'The engine',
    body: 'The workflow platform underneath. Every run is recorded with what it cost and who approved it.',
  },
];

// Real output, straight from the live clip.art catalog CDN — finished work,
// not UI. The proof under "Real properties, real traffic".
const CATALOG = [
  { url: 'https://images.clip.art/christmas/decorated-christmas-tree-gifts-fxjmtg.webp', alt: 'Decorated Christmas tree clip art' },
  { url: 'https://images.clip.art/halloween/grinning-jack-o-lantern-candle-r2avcr.webp', alt: "Jack-o'-lantern clip art" },
  { url: 'https://images.clip.art/school/chemistry-set-bubbling-beakers-rd9f4o.webp', alt: 'Chemistry set clip art' },
  { url: 'https://images.clip.art/flower/watercolor-lavender-flowers-bqkae5.webp', alt: 'Watercolor lavender clip art' },
  { url: 'https://images.clip.art/cat/cozy-black-cat-on-pumpkin-1c6qun.webp', alt: 'Black cat on pumpkin clip art' },
  { url: 'https://images.clip.art/school/friendly-yellow-school-bus-hjo5n2.webp', alt: 'School bus clip art' },
];

// Newest first, by publish date — the same merged publication list the article
// pages resolve against, so the homepage and the articles can never disagree.
async function latestArticles(): Promise<AgenticVideo[]> {
  const all = await getAllAgenticArticles();
  return [...all]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, LATEST_COUNT);
}

// An explicit still if the article has one, otherwise the first Mux frame —
// the same fallback the article cards use.
function thumbnailFor(article: AgenticVideo): string | null {
  if (article.thumbnailUrl) return article.thumbnailUrl;
  return article.muxPlaybackId
    ? `https://image.mux.com/${article.muxPlaybackId}/thumbnail.jpg?time=0`
    : null;
}

// Date-only strings format in UTC so they don't render a day early for
// readers behind UTC.
function formatDate(iso: string): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function formatMinutes(seconds: number): string | null {
  return seconds > 0 ? `${Math.max(1, Math.round(seconds / 60))} min` : null;
}

export default async function NewsletterHomePage() {
  const articles = await latestArticles();
  const [featured, ...more] = articles;
  const featuredThumb = featured ? thumbnailFor(featured) : null;

  return (
    <div className={`nl ${cormorant.variable}`}>
      <LightHeader />

      {/* ══ Masthead: name, promise, one action ══ */}
      <section className="nl-hero" id="subscribe">
        <div className="nl-container nl-hero-inner">
          <p className="nl-kicker">By Esy</p>
          <h1 className="nl-masthead">The Marketing Engineer</h1>
          <p className="nl-promise">
            I build systems that turn marketing data into actions, explain how
            they work, and <span className="nl-promise-accent">show you the results</span>.
          </p>
          <p className="nl-sub">
            Tutorials, guides, and news at the intersection of AI, marketing,
            and engineering, built on sites that are live in production. New
            articles most days, and the best of them in one email a week.
          </p>
          <NewsletterSignup />
        </div>
      </section>

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

      {/* ══ What a tutorial contains ══ */}
      <section className="nl-section" aria-labelledby="nl-tutorial-title">
        <div className="nl-container">
          <p className="nl-eyebrow">Every tutorial</p>
          <h2 className="nl-title" id="nl-tutorial-title">Built, explained, and measured.</h2>
          <ol className="nl-parts">
            {TUTORIAL_PARTS.map(({ step, title, body }) => (
              <li key={step}>
                <span className="nl-part-step">{step}</span>
                <h3 className="nl-part-title">{title}</h3>
                <p className="nl-part-body">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ══ Where the work happens ══
          Navy band: the one place the page talks about the businesses, framed
          as the lab the articles report from, not as a pitch. */}
      <section className="nl-lab" aria-labelledby="nl-lab-title">
        <div className="nl-container">
          <p className="nl-eyebrow nl-eyebrow--onDark">Where the experiments run</p>
          <h2 className="nl-title nl-title--onDark" id="nl-lab-title">
            Real properties, real traffic.
          </h2>
          <p className="nl-lede nl-lede--onDark">
            Nothing here is a sandbox demo. Each system gets built on a business
            that runs every day, so the results in each article are the results
            it actually got.
          </p>
          <ul className="nl-props">
            {PROPERTIES.map(({ name, href, role, body }) => {
              const external = href.startsWith('http');
              return (
                <li key={name}>
                  <a
                    href={href}
                    className="nl-prop"
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className="nl-prop-role">{role}</span>
                    <span className="nl-prop-name">
                      {name}
                      {external && <ArrowUpRight size={16} aria-hidden="true" />}
                    </span>
                    <span className="nl-prop-body">{body}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ══ The receipts: clip.art in production ══
              Carried over from the product-era homepage, and it fits better
              here: the claim above is "real properties", and this is one of
              them, with its own numbers and its own goods. Stats are
              point-in-time figures from the live system. */}
          <div className="nl-receipts">
            <p className="nl-eyebrow nl-eyebrow--onDark nl-live">
              <span className="nl-live-dot" aria-hidden="true" /> Live · In production
            </p>
            <h3 className="nl-receipts-title">This isn&apos;t a demo. clip.art runs on it.</h3>
            <p className="nl-lede nl-lede--onDark">
              A consumer marketplace, fed entirely by Esy workflows: every asset
              generated, processed, stored, and billed with a full record. Six of
              them, straight from the live catalog.
            </p>
            <dl className="nl-stats">
              <div>
                <dt><CountUp value={14889} /></dt>
                <dd>Artifacts filed, each with provenance</dd>
              </div>
              <div>
                <dt><CountUp value={227} /></dt>
                <dd>Waiting on a human right now</dd>
              </div>
              <div>
                <dt><CountUp value={0.064} prefix="$" /></dt>
                <dd>A worker&apos;s cost per item, at most</dd>
              </div>
            </dl>
            <ul className="nl-catalog" aria-label="Assets produced by these workflows, live on clip.art">
              {CATALOG.map(({ url, alt }) => (
                <li key={url}>
                  <img src={url} alt={alt} loading="lazy" width={280} height={280} />
                </li>
              ))}
            </ul>
            <Link href="/workflows/generate-clip-art-asset/" className="nl-inline-link nl-inline-link--onDark">
              See the workflow behind it <ArrowRight size={15} aria-hidden="true" />
            </Link>
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
      <section className="nl-final" aria-labelledby="nl-final-title">
        <div className="nl-container nl-final-inner">
          <h2 className="nl-final-title" id="nl-final-title">Get the weekly email.</h2>
          <p className="nl-lede nl-lede--onDark nl-lede--center">
            The week&apos;s best tutorials, guides, and news in one email.
            Unsubscribe whenever you like.
          </p>
          <NewsletterSignup tone="dark" note="Free · one email a week" />
        </div>
      </section>
    </div>
  );
}
