/* A · Front page — /engineer's centred serif masthead, then the six-month
 * test as one huge statement on navy with its two answers, then News and
 * Articles as two cards facing off (every row of the comparison inside each,
 * with real examples), then the rules as numbered cards with big jade
 * numerals, like the homepage's 01 / 02 sections.
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import {
  ARTICLE_EXAMPLES,
  COMPARISON,
  KINDS,
  NEWS_EXAMPLES,
  PRINCIPLES,
  SIX_MONTH_TEST,
  updatedLabel,
} from './content';
import { Examples, type EditorialProps } from './parts';

export default function EdFrontPage({ articles }: EditorialProps) {
  return (
    <>
      <section className="nl-hero">
        <div className="nl-container nl-hero-inner">
          <p className="nl-kicker">The Marketing Engineer</p>
          <h1 className="nl-masthead">Editorial standards</h1>
          <p className="nl-promise">
            How we decide what to publish, where it goes, and <span className="nl-promise-accent">how we keep it right</span>.
          </p>
          <p className="ed-updated">Last updated {updatedLabel()}</p>
        </div>
      </section>

      {/* ══ The one rule, big ══ */}
      <section className="ed-test">
        <div className="nl-container">
          <p className="nl-eyebrow nl-eyebrow--onDark">The six-month test</p>
          <p className="ed-test-q">{SIX_MONTH_TEST.question}</p>
          <div className="ed-test-answers">
            <Link href={KINDS.news.href} className="ed-answer">
              <span className="ed-answer-key">No</span>
              <span className="ed-answer-verdict">{SIX_MONTH_TEST.no}</span>
              <span className="ed-answer-url">{KINDS.news.url} <ArrowRight size={14} aria-hidden="true" /></span>
            </Link>
            <Link href={KINDS.article.href} className="ed-answer ed-answer--yes">
              <span className="ed-answer-key">Yes</span>
              <span className="ed-answer-verdict">{SIX_MONTH_TEST.yes}</span>
              <span className="ed-answer-url">{KINDS.article.url} <ArrowRight size={14} aria-hidden="true" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ The two kinds, facing off ══ */}
      <section className="nl-section nl-section--alt" aria-labelledby="ed-kinds">
        <div className="nl-container">
          <h2 className="nl-title" id="ed-kinds">Two kinds of pieces</h2>
          <div className="ed-faceoff">
            {(['news', 'article'] as const).map((k, col) => (
              <article key={k} className={`ed-kind ed-kind--${k}`}>
                <p className="ed-kind-name">{KINDS[k].name}</p>
                <p className="ed-kind-blurb">{KINDS[k].blurb}</p>
                <Link href={KINDS[k].href} className="ed-kind-url">
                  {KINDS[k].url} <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <dl className="ed-kind-rows">
                  {COMPARISON.map((row) => (
                    <div key={row[0]}>
                      <dt>{row[0]}</dt>
                      <dd>{row[col + 1]}</dd>
                    </div>
                  ))}
                </dl>
                <p className="ed-kind-ex">For example</p>
                <Examples slugs={k === 'news' ? NEWS_EXAMPLES : ARTICLE_EXAMPLES} articles={articles} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ The rules, numbered ══ */}
      <section className="nl-section" aria-labelledby="ed-rules">
        <div className="nl-container">
          <h2 className="nl-title" id="ed-rules">The rules</h2>
          <ol className="ed-rules">
            {PRINCIPLES.map((p, i) => (
              <li key={p.id} id={p.id} className="ed-rule">
                <span className="ed-rule-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="ed-rule-title">{p.title}</h3>
                <div className="ed-prose">{p.body}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <WeeklyEmailBand />
    </>
  );
}
