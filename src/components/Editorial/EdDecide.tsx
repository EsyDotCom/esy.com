/* C · Decision tool — the standards as something you use: a light masthead,
 * then the "News or article?" checker on navy (three questions, a verdict,
 * where it goes and how to build it), then the side-by-side and the rules.
 *
 * Round 2 keeps the top and varies the two sections below it: `compare` and
 * `rules` pick their treatment (compare.tsx, rules.tsx). C itself is the
 * table and the cards.
 */
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { INTRO, updatedLabel } from './content';
import { Compare, type CompareStyle } from './compare';
import NewsOrArticle from './NewsOrArticle';
import type { EditorialProps } from './parts';
import { Rules, type RulesStyle } from './rules';

export default function EdDecide({
  articles,
  compare = 'table',
  rules = 'cards',
}: EditorialProps & { compare?: CompareStyle; rules?: RulesStyle }) {
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

      {/* ══ Side by side ══ */}
      <section className="nl-section" aria-labelledby="ed-cmp">
        <div className="nl-container">
          <h2 className="nl-title" id="ed-cmp">Side by side</h2>
          <Compare style={compare} articles={articles} />
        </div>
      </section>

      {/* ══ The rules ══ */}
      <section className={`nl-section ${rules === 'index' ? '' : 'nl-section--alt'}`} aria-labelledby="ed-rules-c">
        <div className="nl-container">
          <h2 className="nl-title" id="ed-rules-c">The rules</h2>
          <Rules style={rules} />
        </div>
      </section>

      <WeeklyEmailBand />
    </>
  );
}
