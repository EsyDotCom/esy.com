'use client';

/* esy.com/topics, reimagined in Esy's brand: three takes (2026-10-09). The
   decision: how should the topics page invite someone into the articles?
   It's where articles are browsed now that they live at /articles/<slug>/.

   T1 · Covers     Every topic as a big cover (art generated through
                   api.esy.com in the newsletter's series style), with its
                   count and newest article: the topics as a shelf of covers.
   T2 · Contents   A magazine's table of contents: numbered topics in jade
                   serif, what each covers, and its newest articles listed
                   right beside it, so you can jump straight to one.
   T3 · Explorer   A navy room: the topics as cut-corner tiles on the left;
                   pick one and its cover, story and articles fill the right.

   All read the real topics and the real published articles; only the
   layouts are new. The topic covers are generated art. */

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface TopicArticle { title: string; href: string; date: string; minutes: string }
export interface TopicCard {
  slug: string;
  name: string;
  description: string;
  href: string;
  count: number;
  cover: string;
  articles: TopicArticle[];
}

const plural = (n: number) => `${n} ${n === 1 ? 'article' : 'articles'}`;
const n2 = (i: number) => String(i + 1).padStart(2, '0');

/** The page's opening: the name, one line, the total. Shared by every take. */
function Head({ topics, total, dark = false }: { topics: TopicCard[]; total: number; dark?: boolean }) {
  return (
    <header className={`tx-head${dark ? ' tx-head--dark' : ''}`}>
      <p className="tx-kicker">Articles</p>
      <h1 className="tx-title">Topics</h1>
      <p className="tx-sub">
        Every article on AI marketing, by subject: {topics.length} topics, {total} articles, newest first in each.
      </p>
    </header>
  );
}

/* T1 · Covers */
export function TakeCovers({ topics, total }: { topics: TopicCard[]; total: number }) {
  return (
    <main className="tx">
      <Head topics={topics} total={total} />
      <div className="tx-wrap tx-covers">
        {topics.map((t) => (
          <div key={t.slug} className="tx-cover-item">
            <Link
              href={t.href}
              className="tx-cover"
              style={{ backgroundImage: `linear-gradient(90deg, rgba(10,22,38,0.94) 0%, rgba(10,22,38,0.72) 38%, rgba(10,22,38,0.1) 72%), url(${t.cover})` }}
            >
              <span className="tx-cover-count">{plural(t.count)}</span>
              <span className="tx-cover-name">{t.name}</span>
              <span className="tx-cover-desc">{t.description}</span>
              <span className="tx-cover-cta">Explore <ArrowRight size={15} aria-hidden="true" /></span>
            </Link>
            {t.articles[0] && (
              <Link href={t.articles[0].href} className="tx-cover-latest">
                <span className="tx-label">Newest</span> {t.articles[0].title}
              </Link>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

/* T2 · Contents */
export function TakeContents({ topics, total }: { topics: TopicCard[]; total: number }) {
  return (
    <main className="tx">
      <Head topics={topics} total={total} />
      <div className="tx-wrap">
        <ol className="tx-toc">
          {topics.map((t, i) => (
            <li key={t.slug} className="tx-toc-row">
              <span className="tx-toc-n" aria-hidden="true">{n2(i)}</span>
              <div className="tx-toc-main">
                <Link href={t.href} className="tx-toc-name">{t.name}</Link>
                <p className="tx-toc-desc">{t.description}</p>
                <Link href={t.href} className="tx-more">All {plural(t.count)} <ArrowRight size={14} aria-hidden="true" /></Link>
              </div>
              <ul className="tx-toc-list">
                {t.articles.slice(0, 3).map((a) => (
                  <li key={a.href}>
                    <Link href={a.href}>
                      <span className="tx-toc-art">{a.title}</span>
                      <span className="tx-meta">{[a.date, a.minutes].filter(Boolean).join(' · ')}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={t.href} className="tx-toc-thumb" style={{ backgroundImage: `url(${t.cover})` }} aria-label={t.name} />
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}

/* T3 · Explorer */
export function TakeExplorer({ topics, total }: { topics: TopicCard[]; total: number }) {
  const [sel, setSel] = useState(topics[0]?.slug);
  const t = topics.find((x) => x.slug === sel) ?? topics[0];
  return (
    <main className="tx tx--dark">
      <Head topics={topics} total={total} dark />
      <div className="tx-wrap tx-explorer">
        <div className="tx-tiles" role="tablist" aria-label="Topics">
          {topics.map((x, i) => (
            <button
              key={x.slug}
              type="button"
              role="tab"
              aria-selected={x.slug === t.slug}
              className={`tx-tile${x.slug === t.slug ? ' is-on' : ''}`}
              onClick={() => setSel(x.slug)}
            >
              <span className="tx-tile-n">{n2(i)}</span>
              <span className="tx-tile-name">{x.name}</span>
              <span className="tx-tile-count">{plural(x.count)}</span>
            </button>
          ))}
        </div>
        {t && (
          <section className="tx-panel" role="tabpanel" aria-label={t.name}>
            <div className="tx-panel-art" style={{ backgroundImage: `url(${t.cover})` }} />
            <div className="tx-panel-body">
              <h2 className="tx-panel-name">{t.name}</h2>
              <p className="tx-panel-desc">{t.description}</p>
              <ul className="tx-panel-list">
                {t.articles.slice(0, 4).map((a) => (
                  <li key={a.href}>
                    <Link href={a.href}>
                      <span className="tx-toc-art">{a.title}</span>
                      <span className="tx-meta">{[a.date, a.minutes].filter(Boolean).join(' · ')}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={t.href} className="tx-panel-cta">Open {t.name} <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
