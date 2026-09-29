/* F · Now showing — the homepage's film announcement, for a course: a tilted
 * 2:3 poster beside a logline and a credits list (taught by, each lesson,
 * running time), on navy with jade where the film has night and gold. What's
 * coming follows as "coming soon" ledger rows, then the weekly email.
 */
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { COURSE_ART } from './covers';
import {
  CourseCover,
  SampleTag,
  courseHref,
  firstSentence,
  lessonHref,
  lessonsOf,
  minutesOf,
  newestFirst,
  type CoursesIndexProps,
} from './shared';

export default function CoursesNowShowing({ courses, upcoming }: CoursesIndexProps) {
  const [lead] = newestFirst(courses);
  const art = lead ? COURSE_ART[lead.slug] : undefined;
  const lessons = lead ? lessonsOf(lead) : [];

  return (
    <>
      <section className="ci-hero ci-hero--tight">
        <div className="nl-container">
          <p className="nl-eyebrow">The Marketing Engineer</p>
          <h1 className="ci-title">Courses</h1>
          <p className="ci-desc">
            Short video courses on the AI tools behind modern marketing, from setup to a finished result.
          </p>
        </div>
      </section>

      {/* ══ The newest course, announced like a film ══ */}
      {lead && (
        <section className="nl-lab ci-show" aria-label={`${lead.title}: now showing`}>
          <div className="nl-container nl-film">
            <Link href={courseHref(lead)} className="nl-film-poster ci-show-poster">
              {art ? (
                // eslint-disable-next-line @next/next/no-img-element -- a fixed 2:3 poster
                <img src={art.poster} alt={art.alt} width={600} height={900} />
              ) : (
                <CourseCover course={lead} n={1} size="lg" />
              )}
              <span className="nl-film-poster-top">The Marketing Engineer presents</span>
              <span className="nl-film-poster-foot">
                <span className="nl-film-poster-title">{lead.tags[0] ?? lead.title}</span>
                <span className="nl-film-poster-billing">{lessons.map((l) => l.title).join(' · ')}</span>
              </span>
            </Link>
            <div className="nl-film-side">
              <p className="nl-film-kicker">Now showing · Course 01 · {minutesOf(lead)} min</p>
              <h2 className="ci-show-title">{lead.title}</h2>
              <p className="nl-film-log">“{firstSentence(lead.description)}”</p>
              {/* The credits: who teaches it, then every lesson with its running time. */}
              <dl className="nl-film-credits">
                <div><dt>Taught by</dt><dd>{lead.author.name}</dd></div>
                {lessons.map((l, i) => (
                  <div key={l.slug}>
                    <dt>Lesson {i + 1}</dt>
                    <dd>
                      <Link href={lessonHref(lead, l)} className="ci-credit-link">{l.title}</Link>
                      <span className="ci-credit-time">{l.durationLabel}</span>
                    </dd>
                  </div>
                ))}
                <div><dt>Running time</dt><dd>{minutesOf(lead)} minutes</dd></div>
              </dl>
              <div className="nl-film-ctas">
                {lessons[0] && (
                  <Link href={lessonHref(lead, lessons[0])} className="nl-film-cta ci-show-cta">
                    <Play size={14} aria-hidden="true" /> Start watching
                  </Link>
                )}
                <Link href={courseHref(lead)} className="nl-inline-link ci-show-link">
                  The course page <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ Coming soon: the homepage's ledger, one row per course in the works ══ */}
      {upcoming.length > 0 && (
        <section className="nl-section" aria-labelledby="ci-soon-title">
          <div className="nl-container nl-where-grid">
            <div className="nl-work-head">
              <p className="nl-eyebrow">Coming soon</p>
              <h2 className="nl-title nl-work-title" id="ci-soon-title">Next in the studio.</h2>
              <p className="nl-lede">Each new course premieres in the weekly email before it lands here.</p>
            </div>
            <ul className="nl-ledger">
              {upcoming.map((u) => (
                <li key={u.title} className="nl-ledger-row ci-ledger-row">
                  <span className="ci-ledger-name">
                    {u.title} <SampleTag />
                  </span>
                  <div className="nl-ledger-body">
                    <span className="nl-ledger-role">
                      {u.plannedLessons} lessons planned · {u.tags.join(' · ')}
                    </span>
                    <p>{u.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <WeeklyEmailBand />
    </>
  );
}
