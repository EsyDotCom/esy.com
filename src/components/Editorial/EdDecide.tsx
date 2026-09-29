/* C · Decision tool — the standards as something you use: a light masthead,
 * then the "News or article?" checker on navy (three questions, a verdict,
 * where it goes and how to build it), then the comparison as a clean table
 * with examples, and the rules as a grid of cards.
 */
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import {
  ARTICLE_EXAMPLES,
  COMPARISON,
  INTRO,
  KINDS,
  NEWS_EXAMPLES,
  PRINCIPLES,
  updatedLabel,
  KindLink,
} from './content';
import NewsOrArticle from './NewsOrArticle';
import { Examples, type EditorialProps } from './parts';

export default function EdDecide({ articles }: EditorialProps) {
  return (
    <>
      <section className="ed-hero">
        <div className="nl-container">
          <p className="nl-eyebrow">The Marketing Engineer</p>
          <h1 className="ed-hero-title">Editorial standards</h1>
          <p className="ed-hero-intro">{INTRO}</p>
          <p className="ed-updated ed-updated--left">Last updated {updatedLabel()}</p>
        </div>
      </section>

      {/* ══ The checker ══ */}
      <section className="ed-tool" aria-labelledby="ed-tool-title">
        <div className="nl-container">
          <p className="nl-eyebrow nl-eyebrow--onDark">Before you write</p>
          <h2 className="ed-tool-title" id="ed-tool-title">News or article?</h2>
          <NewsOrArticle />
        </div>
      </section>

      {/* ══ The comparison, with examples ══ */}
      <section className="nl-section" aria-labelledby="ed-cmp">
        <div className="nl-container">
          <h2 className="nl-title" id="ed-cmp">Side by side</h2>
          <div className="ed-table-wrap">
            <table className="ed-table">
              <thead>
                <tr>
                  <th scope="col" />
                  <th scope="col">
                    {KINDS.news.name}
                    <KindLink kind="news" className="ed-th-url" />
                  </th>
                  <th scope="col">
                    {KINDS.article.name}
                    <KindLink kind="article" className="ed-th-url" />
                  </th>
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
        </div>
      </section>

      {/* ══ The rules, as cards ══ */}
      <section className="nl-section nl-section--alt" aria-labelledby="ed-rules-c">
        <div className="nl-container">
          <h2 className="nl-title" id="ed-rules-c">The rules</h2>
          <div className="ed-cards">
            {PRINCIPLES.map((p) => (
              <section key={p.id} id={p.id} className="ed-card">
                <h3 className="ed-card-title">{p.title}</h3>
                <div className="ed-prose">{p.body}</div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <WeeklyEmailBand />
    </>
  );
}
