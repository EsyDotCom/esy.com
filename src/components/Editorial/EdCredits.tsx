/* B · Credits — the homepage's film announcement, for the standards: a navy
 * room with the title and the six-month test as the logline, then News and
 * Articles each billed like a film, with a credits list (starts from,
 * answers, shelf life…) and what's showing. The rules follow on white as the
 * homepage's ruled ledger.
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import {
  ARTICLE_EXAMPLES,
  COMPARISON,
  INTRO,
  KINDS,
  NEWS_EXAMPLES,
  PRINCIPLES,
  SIX_MONTH_TEST,
  updatedLabel,
} from './content';
import { examplesFor, type EditorialProps } from './parts';
import { articlePath } from '@/lib/article-path';

export default function EdCredits({ articles }: EditorialProps) {
  return (
    <>
      <section className="ed-room">
        <div className="nl-container">
          <p className="nl-eyebrow nl-eyebrow--onDark">The Marketing Engineer · Last updated {updatedLabel()}</p>
          <h1 className="ed-room-title">Editorial standards</h1>
          <p className="ed-room-intro">{INTRO}</p>
          <p className="ed-room-log">
            “{SIX_MONTH_TEST.question}”
            <span>
              No: {SIX_MONTH_TEST.no.toLowerCase()} Yes: {SIX_MONTH_TEST.yes.toLowerCase()}
            </span>
          </p>

          {/* The two kinds, billed side by side. */}
          <div className="ed-bills">
            {(['news', 'article'] as const).map((k, col) => (
              <section key={k} className="ed-bill" aria-label={KINDS[k].name}>
                <p className="ed-bill-top">Now publishing</p>
                <h2 className="ed-bill-name">{KINDS[k].name}</h2>
                <p className="ed-bill-blurb">{KINDS[k].blurb}</p>
                <dl className="ed-credits">
                  {COMPARISON.map((row) => (
                    <div key={row[0]}>
                      <dt>{row[0]}</dt>
                      <dd>{row[col + 1]}</dd>
                    </div>
                  ))}
                  <div>
                    <dt>Showing</dt>
                    <dd>
                      {examplesFor(k === 'news' ? NEWS_EXAMPLES : ARTICLE_EXAMPLES, articles).map((a) => (
                        <Link key={a.slug} href={articlePath(a.slug)} className="ed-credit-link">
                          {a.title}
                        </Link>
                      ))}
                    </dd>
                  </div>
                </dl>
                <Link href={KINDS[k].href} className="ed-bill-cta">
                  {KINDS[k].url} <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ══ The rules, as the homepage's ledger ══ */}
      <section className="nl-section" aria-labelledby="ed-rules-b">
        <div className="nl-container nl-where-grid">
          <div className="nl-work-head">
            <p className="nl-eyebrow">How we work</p>
            <h2 className="nl-title nl-work-title ed-wrap" id="ed-rules-b">The rules behind every piece.</h2>
            <p className="nl-lede">What every news post and article follows, from the first draft to the correction note.</p>
          </div>
          <ul className="nl-ledger">
            {PRINCIPLES.map((p) => (
              <li key={p.id} id={p.id} className="nl-ledger-row ed-ledger-row">
                <span className="ed-ledger-name">{p.title}</span>
                <div className="nl-ledger-body ed-prose">{p.body}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WeeklyEmailBand />
    </>
  );
}
