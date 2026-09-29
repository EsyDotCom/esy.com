/* G · Masthead + Now showing (D × F) — D's /engineer masthead keeps the
 * signup on the first screen; F's poster-and-credits band spotlights the
 * newest course right under it; F's ledger lists what's coming. One course
 * gets the spotlight; once there are more, the rest follow as rows.
 */
import Link from 'next/link';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { CoursesMastheadHero } from './CoursesMasthead';
import { ComingSoonLedger, NowShowingBand } from './CoursesNowShowing';
import { courseHref, lessonsOf, minutesOf, newestFirst, type CoursesIndexProps } from './shared';

export default function CoursesMastheadShowing({ courses, upcoming }: CoursesIndexProps) {
  const [lead, ...rest] = newestFirst(courses);

  return (
    <>
      <CoursesMastheadHero courses={courses} />
      {lead && <NowShowingBand course={lead} n={courses.indexOf(lead) + 1} />}

      {/* Older courses, once there are any: the homepage's quiet list under the spotlight. */}
      {rest.length > 0 && (
        <section className="nl-section" aria-labelledby="ci-more-title">
          <div className="nl-container">
            <h2 className="nl-title" id="ci-more-title">More courses</h2>
            <ul className="nl-list">
              {rest.map((c) => (
                <li key={c.slug}>
                  <Link href={courseHref(c)} className="nl-row">
                    <span className="nl-row-date">{lessonsOf(c).length} lessons</span>
                    <span className="nl-row-title">{c.title}</span>
                    <span className="nl-row-cat">{minutesOf(c)} min</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ComingSoonLedger upcoming={upcoming} />
      <WeeklyEmailBand />
    </>
  );
}
