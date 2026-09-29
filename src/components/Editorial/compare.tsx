/* The "side by side" section, four ways (C's table, and round 2's three):
 *
 *   table    — C: a clean table, examples in the last row.
 *   versus   — D: News left, Articles right, the row labels down a spine.
 *   spectrum — E: each row a scale from News to Article, examples under it.
 *   tiles    — F: one card per attribute, split News / Article.
 */
import type { AgenticVideo } from '@/data/agentic-videos';
import { ARTICLE_EXAMPLES, COMPARISON, COMPARISON_SHORT, KINDS, KindLink, NEWS_EXAMPLES } from './content';
import { Examples } from './parts';

export type CompareStyle = 'table' | 'versus' | 'spectrum' | 'tiles';

function Table({ articles }: { articles: AgenticVideo[] }) {
  return (
    <div className="ed-table-wrap">
      <table className="ed-table">
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col">{KINDS.news.name}<KindLink kind="news" className="ed-th-url" /></th>
            <th scope="col">{KINDS.article.name}<KindLink kind="article" className="ed-th-url" /></th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map(([label, news, article]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>{news}</td>
              <td>{article}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">For example</th>
            <td><Examples slugs={NEWS_EXAMPLES} articles={articles} className="ed-examples--table" /></td>
            <td><Examples slugs={ARTICLE_EXAMPLES} articles={articles} className="ed-examples--table" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* D · Versus: two sides and a spine; each row reads across the spine. */
function Versus({ articles }: { articles: AgenticVideo[] }) {
  return (
    <div className="ed-vs">
      <div className="ed-vs-head ed-vs-head--news">
        <span className="ed-vs-name">{KINDS.news.name}</span>
        <KindLink kind="news" className="ed-vs-url" />
      </div>
      <span className="ed-vs-v" aria-hidden="true"><span>vs</span></span>
      <div className="ed-vs-head ed-vs-head--article">
        <span className="ed-vs-name">{KINDS.article.name}</span>
        <KindLink kind="article" className="ed-vs-url" />
      </div>
      {COMPARISON.map(([label, news, article]) => (
        <div key={label} className="ed-vs-row">
          <p className="ed-vs-cell ed-vs-cell--news">{news}</p>
          <p className="ed-vs-label">{label}</p>
          <p className="ed-vs-cell ed-vs-cell--article">{article}</p>
        </div>
      ))}
      <div className="ed-vs-row ed-vs-row--ex">
        <div className="ed-vs-cell ed-vs-cell--news"><Examples slugs={NEWS_EXAMPLES} articles={articles} className="ed-examples--table" /></div>
        <p className="ed-vs-label">For example</p>
        <div className="ed-vs-cell ed-vs-cell--article"><Examples slugs={ARTICLE_EXAMPLES} articles={articles} className="ed-examples--table" /></div>
      </div>
    </div>
  );
}

/* E · Spectrum: each attribute as a scale, News at one end, Article at the other. */
function Spectrum({ articles }: { articles: AgenticVideo[] }) {
  return (
    <div className="ed-spec">
      <div className="ed-spec-ends" aria-hidden="true">
        <span className="ed-spec-end ed-spec-end--news">{KINDS.news.name}</span>
        <span className="ed-spec-end ed-spec-end--article">{KINDS.article.name}</span>
      </div>
      <ul className="ed-spec-rows">
        {COMPARISON_SHORT.map(([label, news, article]) => (
          <li key={label} className="ed-spec-row">
            <span className="ed-spec-news">{news}</span>
            <span className="ed-spec-track" aria-hidden="true">
              <span className="ed-spec-dot ed-spec-dot--news" />
              <span className="ed-spec-label">{label}</span>
              <span className="ed-spec-dot ed-spec-dot--article" />
            </span>
            <span className="ed-spec-article">{article}</span>
          </li>
        ))}
      </ul>
      <div className="ed-spec-ex">
        <div>
          <p className="ed-mini">News, for example · <KindLink kind="news" /></p>
          <Examples slugs={NEWS_EXAMPLES} articles={articles} />
        </div>
        <div>
          <p className="ed-mini">Articles, for example · <KindLink kind="article" /></p>
          <Examples slugs={ARTICLE_EXAMPLES} articles={articles} />
        </div>
      </div>
    </div>
  );
}

/* F · Tiles: one card per attribute, News on top, Article below. */
function Tiles({ articles }: { articles: AgenticVideo[] }) {
  return (
    <>
      <div className="ed-tiles">
        {COMPARISON.map(([label, news, article]) => (
          <div key={label} className="ed-tile">
            <p className="ed-tile-label">{label}</p>
            <p className="ed-tile-half ed-tile-half--news"><b>{KINDS.news.name}</b>{news}</p>
            <p className="ed-tile-half ed-tile-half--article"><b>{KINDS.article.name}</b>{article}</p>
          </div>
        ))}
      </div>
      <div className="ed-spec-ex ed-tiles-ex">
        <div>
          <p className="ed-mini">News, for example · <KindLink kind="news" /></p>
          <Examples slugs={NEWS_EXAMPLES} articles={articles} />
        </div>
        <div>
          <p className="ed-mini">Articles, for example · <KindLink kind="article" /></p>
          <Examples slugs={ARTICLE_EXAMPLES} articles={articles} />
        </div>
      </div>
    </>
  );
}

export function Compare({ style, articles }: { style: CompareStyle; articles: AgenticVideo[] }) {
  if (style === 'versus') return <Versus articles={articles} />;
  if (style === 'spectrum') return <Spectrum articles={articles} />;
  if (style === 'tiles') return <Tiles articles={articles} />;
  return <Table articles={articles} />;
}
