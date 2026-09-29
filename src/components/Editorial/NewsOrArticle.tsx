'use client';

/* The "News or article?" checker (C · Decision tool). Three yes/no questions
 * from the standards; the six-month test decides, and the other two flag the
 * grey area when they disagree with it. The verdict says where the piece
 * goes and how to build it.
 */
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { KINDS, NEWS_PARTS } from './content';

type Answer = 'yes' | 'no' | null;

const QUESTIONS = [
  { id: 'six', text: 'Would it still be worth reading, unchanged, in six months?' },
  { id: 'version', text: 'Does the headline need a version number or a date to make sense?' },
  { id: 'built', text: 'Did it start from something we built or tested ourselves?' },
] as const;

export default function NewsOrArticle() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({ six: null, version: null, built: null });
  const set = (id: string, a: Answer) => setAnswers((prev) => ({ ...prev, [id]: a }));

  // The six-month test decides; the other two only flag a grey area.
  const verdict = answers.six === null ? null : answers.six === 'yes' ? 'article' : 'news';
  const grey =
    verdict === 'article'
      ? answers.version === 'yes'
      : verdict === 'news'
        ? answers.built === 'yes' && answers.version === 'no'
        : false;

  return (
    <div className="ed-check">
      <div className="ed-check-qs">
        {QUESTIONS.map((q, i) => (
          <fieldset key={q.id} className="ed-q">
            <legend>
              <span className="ed-q-n">{i + 1}</span>
              {q.text}
            </legend>
            <div className="ed-q-opts">
              {(['yes', 'no'] as const).map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`ed-opt ${answers[q.id] === a ? 'is-on' : ''}`}
                  aria-pressed={answers[q.id] === a}
                  onClick={() => set(q.id, answers[q.id] === a ? null : a)}
                >
                  {a === 'yes' ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      {/* The verdict: where it goes and how to build it. */}
      <div className={`ed-verdict ${verdict ? `ed-verdict--${verdict}` : ''}`} aria-live="polite">
        {!verdict ? (
          <p className="ed-verdict-wait">Answer the first question to get a verdict.</p>
        ) : (
          <>
            <p className="ed-verdict-label">Verdict</p>
            <p className="ed-verdict-kind">{verdict === 'news' ? 'News' : 'An article'}</p>
            <Link href={KINDS[verdict].href} className="ed-verdict-home">
              Goes on {KINDS[verdict].url} <ArrowRight size={14} aria-hidden="true" />
            </Link>
            {verdict === 'news' ? (
              <ol className="ed-verdict-steps">
                {NEWS_PARTS.map(([t]) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            ) : (
              <ol className="ed-verdict-steps">
                <li>Start from what you built or tested</li>
                <li>Show the work, and what broke</li>
                <li>Keep it current: update in place</li>
              </ol>
            )}
            {grey && (
              <p className="ed-verdict-grey">
                <b>Grey area.</b>{' '}
                {verdict === 'article'
                  ? 'The headline needs a version, so publish the quick take as news now and write the article once it proves lasting.'
                  : 'You built or tested it, so it could grow into an article. Publish the news post now and link the deep dive later.'}
              </p>
            )}
            <button type="button" className="ed-reset" onClick={() => setAnswers({ six: null, version: null, built: null })}>
              <RotateCcw size={13} aria-hidden="true" /> Start over
            </button>
          </>
        )}
      </div>
    </div>
  );
}
