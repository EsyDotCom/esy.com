'use client';

/* esy.com/newsletter, round 3 (2026-10-09): D's top as it stands (the name,
   then the latest issue's big cover), and three takes on everything below the
   first screen, after Dan Koe's Substack: a feed of issues with the cover on
   the right of each row, and a rail beside it.

   G · Feed + rail     Latest / Top feed; the rail is the publication card with
                       the signup, then "Also from Esy" (our real properties,
                       in place of Substack's recommendations).
   H · Feed + news     The same feed; the rail carries the signup and the
                       week's AI marketing news (real AI Marketing News posts).
   I · Wide feed       No rail: a wider feed with bigger covers and the signup
                       inline after the second issue. Picked for /newsletter.

   Issues open in the L3 cover page; no signup sends. */

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { postPath, publishedPosts } from '@/data/news';
import { type Issue, ISSUES, LATEST } from './issues';
import { FeedRow, LeadCard, Masthead } from './Round2';
import { PageSignup, SampleNote } from './shared';
import { PROMISE } from './Takes';

type Feed = 'Latest' | 'Top' | 'News';

// "Top" is a sample order (the clip.art issue first, as the most read).
const ordered = (feed: Feed): Issue[] => (feed === 'Top' ? [...ISSUES].sort((a, b) => a.n - b.n) : ISSUES);

/** Latest / Top (and News, for I) as a segmented control, with a search button that answers with a note. */
function FeedTabs({ feed, onFeed, tabs }: { feed: Feed; onFeed: (f: Feed) => void; tabs: Feed[] }) {
  const [note, setNote] = useState(false);
  return (
    <div className="nlp-ftabs">
      <div className="nlp-seg" role="tablist">
        {tabs.map((t) => (
          <button key={t} type="button" role="tab" aria-selected={feed === t} className={`nlp-seg-btn${feed === t ? ' is-on' : ''}`} onClick={() => onFeed(t)}>{t}</button>
        ))}
      </div>
      <button type="button" className="nlp-search" aria-label="Search issues" onClick={() => setNote((n) => !n)}>
        <Search size={20} />
      </button>
      {note && <p className="nlp-search-note">Prototype: search would look through every issue.</p>}
    </div>
  );
}

/** The publication card at the top of a rail: mark, name, line, signup. */
function PubCard() {
  return (
    <div className="nlp-pubcard">
      <span className="nlp-mark" aria-hidden="true"><span>e</span></span>
      <p className="nlp-pubcard-name">The Marketing Engineer</p>
      <p className="nlp-pubcard-line">AI marketing, built in public.</p>
      <PageSignup />
    </div>
  );
}

/** Our real properties, in place of Substack's recommendations: name in the stencil, teal first letter. */
const ALSO = [
  { name: 'AI Marketing News', mark: 'n', line: 'What changed, checked at the source', href: '/news/' },
  { name: 'Courses', mark: 'c', line: 'Short video courses, one tool each', href: '/courses/' },
  { name: 'AI Marketing Skills', mark: 's', line: 'Skills your agent can run', href: '/skills/' },
  { name: 'clip.art', mark: 'c', line: 'Where issue No. 1’s system runs', href: 'https://clip.art' },
  { name: 'SEOPage', mark: 's', line: 'Pages AI answers quote', href: 'https://seopage.com' },
  { name: 'Esy', mark: 'e', line: 'The software behind every issue', href: 'https://os.esy.com' },
];

function AlsoFromEsy() {
  return (
    <div className="nlp-rail-block">
      <div className="nlp-rail-head">
        <p className="nlp-rail-title">Also from Esy</p>
      </div>
      <ul className="nlp-recs">
        {ALSO.map((a) => (
          <li key={a.name}>
            <a href={a.href} className="nlp-rec">
              <span className="nlp-mark nlp-mark--sm" aria-hidden="true"><span>{a.mark}</span></span>
              <span className="nlp-rec-text">
                <span className="nlp-rec-name">{a.name}</span>
                <span className="nlp-rec-line">{a.line}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The week's AI marketing news in the rail: the newest real posts. */
function RailNews() {
  const posts = publishedPosts().slice(0, 5);
  return (
    <div className="nlp-rail-block">
      <div className="nlp-rail-head">
        <p className="nlp-rail-title">This week in AI marketing</p>
        <Link href="/news/" className="nlp-section-all">ALL</Link>
      </div>
      <ul className="nlp-railnews">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={postPath(p.slug)}>
              <span className="nlp-news-topic">{p.topic}</span>
              <span className="nlp-news-head">{p.headline}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** D's top, unchanged: the name, then the latest issue's cover. */
function Top() {
  return (
    <>
      <Masthead />
      <div className="nlp-wrap nlp-wrap--wide"><LeadCard issue={LATEST} /></div>
    </>
  );
}

/* G · Feed + rail */
export function TakeFeedRail() {
  const [feed, setFeed] = useState<Feed>('Latest');
  return (
    <main className="nlp nlp--pub">
      <Top />
      <div className="nlp-wrap nlp-wrap--wide nlp-below">
        <section className="nlp-feedcol">
          <FeedTabs feed={feed} onFeed={setFeed} tabs={['Latest', 'Top']} />
          <div className="nlp-feed">{ordered(feed).map((i) => <FeedRow key={i.n} issue={i} />)}</div>
        </section>
        <aside className="nlp-rail">
          <PubCard />
          <AlsoFromEsy />
        </aside>
      </div>
      <div className="nlp-wrap nlp-wrap--wide"><SampleNote /></div>
    </main>
  );
}

/* H · Feed + news */
export function TakeFeedNews() {
  const [feed, setFeed] = useState<Feed>('Latest');
  return (
    <main className="nlp nlp--pub">
      <Top />
      <div className="nlp-wrap nlp-wrap--wide nlp-below">
        <section className="nlp-feedcol">
          <FeedTabs feed={feed} onFeed={setFeed} tabs={['Latest', 'Top']} />
          <div className="nlp-feed">{ordered(feed).map((i) => <FeedRow key={i.n} issue={i} />)}</div>
        </section>
        <aside className="nlp-rail">
          <PubCard />
          <RailNews />
        </aside>
      </div>
      <div className="nlp-wrap nlp-wrap--wide"><SampleNote /></div>
    </main>
  );
}

/* I · Wide feed. Picked for /newsletter (2026-10-09), without its News tab:
   the issues already carry the week's news, and the issue pages promote a
   course. The feed lists every issue, so there's no "Every issue" link. */
export function TakeWideFeed() {
  const [feed, setFeed] = useState<Feed>('Latest');
  const issues = ordered(feed);
  return (
    <main className="nlp nlp--pub">
      <Top />
      <div className="nlp-wrap nlp-wrap--wide">
        <section className="nlp-widefeed">
          <FeedTabs feed={feed} onFeed={setFeed} tabs={['Latest', 'Top']} />
          <div className="nlp-feed nlp-feed--wide">
            {issues.map((i, idx) => (
              <div key={i.n}>
                <FeedRow issue={i} />
                {/* The signup inline, after the second issue: by then they've seen what they'd get. */}
                {idx === 1 && (
                  <div className="nlp-inline-sub">
                    <div>
                      <p className="nlp-band-title">Get the next issue in your inbox.</p>
                      <p className="nlp-band-sub">{PROMISE}</p>
                    </div>
                    <PageSignup tone="dark" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="nlp-wrap nlp-wrap--wide"><SampleNote /></div>
    </main>
  );
}
