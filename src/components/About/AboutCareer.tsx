/* Round 3 of /about: three takes on D · Story, with the whole career from
 * Zev's résumé, crypto years included (About/content.tsx, CAREER).
 *
 *   G · Dated path  — D's timeline with years and one proof per stop; the
 *                     numbers strip becomes the résumé's strongest numbers.
 *   H · Chapters    — each era a full chapter: years large, role and place,
 *                     two proof points, a stat. The digital-assets years get
 *                     their own dark gold band.
 *   I · Proof first — six big numbers, each tied to its chapter, then a
 *                     compact dated path.
 */
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { StoryContact, StudioHero, WorkCards, FactsStrip } from './AboutStudio';
import { CAREER, PROOF, STORY_FULL } from './content';

// G's strip: four of the résumé's numbers that read at a glance.
const HEADLINE = [
  { value: '#1', label: 'on Google for “AI clipart”' },
  { value: '20,000+', label: 'pages published by Esy' },
  { value: '7 figures', label: 'exit from digital-assets research' },
  { value: '100+', label: 'tested landing pages at fuboTV' },
];

/** The compact dated path (G and I). */
function DatedPath({ title = 'How I got here.' }: { title?: string }) {
  return (
    <section className="nl-section" aria-labelledby="ab-path">
      <div className="nl-container">
        <p className="nl-eyebrow">The path</p>
        <h2 className="nl-title" id="ab-path">{title}</h2>
        <ol className="ab-path ab-path--dated">
          {CAREER.map((c) => (
            <li key={c.id} className={`${c.id === 'now' ? 'is-now' : ''} ${c.tone === 'gold' ? 'is-gold' : ''}`}>
              <span className="ab-path-dot" aria-hidden="true" />
              <p className="ab-path-year">{c.years}</p>
              <p className="ab-path-at">{c.at}</p>
              <p className="ab-path-what">{c.role}</p>
              <p className="ab-path-line">{c.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── G · Dated path ── */
export function AboutDated() {
  return (
    <>
      <StudioHero signup />
      <FactsStrip facts={HEADLINE} />
      <DatedPath />
      <div className="nl-section--alt"><WorkCards /></div>
      <StoryContact story={STORY_FULL} />
      <WeeklyEmailBand />
    </>
  );
}

/* ── H · Chapters ── `work` swaps the "What I make" section (round 4, AboutWork.tsx). */
export function AboutChapters({ work = <WorkCards /> }: { work?: React.ReactNode }) {
  return (
    <>
      <StudioHero signup />
      <section className="nl-section ab-chapters-head" aria-labelledby="ab-chapters">
        <div className="nl-container">
          <p className="nl-eyebrow">The path</p>
          <h2 className="nl-title" id="ab-chapters">Five chapters, one thread: turning data into results.</h2>
        </div>
      </section>
      {CAREER.map((c, i) => (
        <section key={c.id} className={`ab-chapter ${c.tone ? `ab-chapter--${c.tone}` : ''} ${i % 2 ? 'ab-chapter--alt' : ''}`} aria-labelledby={`ab-ch-${c.id}`}>
          <div className="nl-container ab-chapter-grid">
            <div className="ab-chapter-when">
              <p className="ab-chapter-years">{c.years}</p>
              <p className="ab-chapter-place">{c.place}</p>
            </div>
            <div>
              <p className="ab-chapter-role">{c.role}</p>
              <h3 className="ab-chapter-at" id={`ab-ch-${c.id}`}>{c.at}</h3>
              <ul className="ab-chapter-proof">
                {c.proof.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
            <p className="ab-chapter-stat">
              <b>{c.stat.value}</b>
              {c.stat.label}
            </p>
          </div>
        </section>
      ))}
      {work}
      <StoryContact story={STORY_FULL} />
      <WeeklyEmailBand />
    </>
  );
}

/* ── I · Proof first ── */
export function AboutProof() {
  return (
    <>
      <StudioHero signup />
      <section className="nl-section" aria-labelledby="ab-proof">
        <div className="nl-container">
          <p className="nl-eyebrow">The proof</p>
          <h2 className="nl-title" id="ab-proof">What the work has done.</h2>
          <ul className="ab-proof">
            {PROOF.map((p) => (
              <li key={p.label} className={p.chapter === 'Digital assets' ? 'is-gold' : ''}>
                <b>{p.value}</b>
                <span>{p.label}</span>
                <small>{p.chapter}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="nl-section--alt"><DatedPath title="Where it came from." /></div>
      <WorkCards />
      <StoryContact story={STORY_FULL} />
      <WeeklyEmailBand />
    </>
  );
}
