/* The homepage as the front page of The Marketing Engineer.
 *
 * esy.com is a publication first: the newsletter is the product on this page,
 * and the one action is subscribing. The promise is concrete — build and
 * explain systems that turn marketing data into actions, then show what they
 * did — and everything below the fold is evidence for it: the latest issues,
 * what an issue contains, the real properties the experiments run on, and the
 * person writing it.
 *
 * The previous product-story homepage lives in
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
import NewsletterSignup from './NewsletterSignup';
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

// What every issue carries. Three parts because the promise has three verbs:
// build it, explain it, show what it did.
const ISSUE_PARTS = [
  {
    step: '01',
    title: 'The system',
    body: 'One working build per issue: the prompts, the code, and the data it reads, from analytics and search to the site itself.',
  },
  {
    step: '02',
    title: 'The walkthrough',
    body: 'A video and a written walkthrough, step by step. You see how it works, not just a screenshot of the output.',
  },
  {
    step: '03',
    title: 'The result',
    body: 'What changed after it ran on a live property, and what didn’t. The misses are published too.',
  },
];

// The properties the experiments run on. Each one is real and in production;
// the newsletter documents the work, these are where the work happens.
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
    body: 'The SEO systems from these issues, run every week for sites that want the results without the upkeep.',
  },
  {
    name: 'Esy',
    href: '/docs/',
    role: 'The engine',
    body: 'The workflow platform underneath. Every run is recorded with what it cost and who approved it.',
  },
];

// Newest first, by publish date — the same merged publication list /engineer
// reads, so the homepage and the issue index can never disagree.
async function latestIssues(): Promise<AgenticVideo[]> {
  const all = await getAllAgenticArticles();
  return [...all].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

// An explicit still if the issue has one, otherwise the first Mux frame —
// the same fallback the /engineer cards use.
function thumbnailFor(issue: AgenticVideo): string | null {
  if (issue.thumbnailUrl) return issue.thumbnailUrl;
  return issue.muxPlaybackId
    ? `https://image.mux.com/${issue.muxPlaybackId}/thumbnail.jpg?time=0`
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
  const issues = await latestIssues();
  const [featured, ...rest] = issues;
  const more = rest.slice(0, 4);

  return (
    <div className={`nl ${cormorant.variable}`}>
      <LightHeader />

      {/* ══ Masthead: name, promise, one action ══ */}
      <section className="nl-hero" id="subscribe">
        <div className="nl-container nl-hero-inner">
          <p className="nl-kicker">A newsletter by Esy</p>
          <h1 className="nl-masthead">The Marketing Engineer</h1>
          <p className="nl-promise">
            I build systems that turn marketing data into actions, explain how
            they work, and <span className="nl-promise-accent">show you the results</span>.
          </p>
          <p className="nl-sub">
            Claude Code, analytics, and search data, wired into real marketing
            work on sites that are live in production. One system per issue,
            start to finish.
          </p>
          <NewsletterSignup />
        </div>
      </section>

      {/* ══ Latest issues ══
          The featured issue earns the width; the next four are a quiet list.
          Nothing renders if the registry is empty, rather than an empty shelf. */}
      {featured && (
        <section className="nl-section nl-section--alt" aria-labelledby="nl-latest-title">
          <div className="nl-container">
            <div className="nl-section-head">
              <h2 className="nl-title" id="nl-latest-title">Latest issues</h2>
              <Link href="/engineer/" className="nl-inline-link">
                All issues <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>

            <Link href={`/engineer/${featured.slug}/`} className="nl-featured">
              {thumbnailFor(featured) && (
                <span className="nl-featured-media">
                  <img
                    src={thumbnailFor(featured)!}
                    alt=""
                    width={960}
                    height={540}
                    loading="lazy"
                  />
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
                  Read the issue <ArrowRight size={15} aria-hidden="true" />
                </span>
              </span>
            </Link>

            {more.length > 0 && (
              <ul className="nl-list">
                {more.map((issue) => (
                  <li key={issue.slug}>
                    <Link href={`/engineer/${issue.slug}/`} className="nl-row">
                      <span className="nl-row-date">{formatDate(issue.publishedAt)}</span>
                      <span className="nl-row-title">{issue.title}</span>
                      <span className="nl-row-cat">{issue.categoryLabel}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* ══ What's in an issue ══ */}
      <section className="nl-section" aria-labelledby="nl-issue-title">
        <div className="nl-container">
          <p className="nl-eyebrow">Every issue</p>
          <h2 className="nl-title" id="nl-issue-title">Built, explained, and measured.</h2>
          <ol className="nl-parts">
            {ISSUE_PARTS.map(({ step, title, body }) => (
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
          as the lab the newsletter reports from, not as a pitch. */}
      <section className="nl-lab" aria-labelledby="nl-lab-title">
        <div className="nl-container">
          <p className="nl-eyebrow nl-eyebrow--onDark">Where the experiments run</p>
          <h2 className="nl-title nl-title--onDark" id="nl-lab-title">
            Real properties, real traffic.
          </h2>
          <p className="nl-lede nl-lede--onDark">
            Nothing here is a sandbox demo. Each system gets built on a business
            that runs every day, so the results in each issue are the results it
            actually got.
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
              Now I build Esy and the businesses that run on it. Every issue comes
              out of that work: what I built that week, how it works, and what it
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
          <h2 className="nl-final-title" id="nl-final-title">Get the next issue.</h2>
          <p className="nl-lede nl-lede--onDark nl-lede--center">
            One system, one walkthrough, one result, delivered to your inbox.
            Unsubscribe whenever you like.
          </p>
          <NewsletterSignup tone="dark" note="Free · one issue a week" />
        </div>
      </section>
    </div>
  );
}
