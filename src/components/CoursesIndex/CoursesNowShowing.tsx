/* F · Now showing — the homepage's film announcement, for a course: a tilted
 * 2:3 poster beside a logline and a credits list (taught by, each lesson,
 * running time), on navy with jade where the film has night and gold. What's
 * coming follows as "coming soon" ledger rows, then the weekly email.
 *
 * The band and the ledger are exported on their own: G (CoursesMastheadShowing)
 * puts them under D's masthead.
 */
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import type { Course } from '@/lib/learn/types';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { CourseCoverArt } from '@/components/CourseCovers/covers';
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
  type UpcomingCourse,
} from './shared';

/** The course announced like a film: poster, logline, credits, Start watching. */
export function NowShowingBand({
  course,
  n = 1,
  as: Heading = 'h2',
  onCoursePage = false,
  posterArt,
}: {
  course: Course;
  n?: number;
  /** 'h1' when the band is the page's own hero (the course detail page). */
  as?: 'h1' | 'h2';
  /** On the course's own page the poster starts lesson 1 and the course-page link drops. */
  onCoursePage?: boolean;
  /** Drawn art in place of the poster image (the Mason covers at /prototypes/course-cover/). */
  posterArt?: React.ReactNode;
}) {
  const art = COURSE_ART[course.slug];
  const lessons = lessonsOf(course);
  const posterHref = onCoursePage && lessons[0] ? lessonHref(course, lessons[0]) : courseHref(course);
  // A course with a drawn cover shows it here, unless a prototype passes its own.
  const drawn = posterArt ?? (art?.drawn ? <CourseCoverArt cover={art.drawn} format="poster" lessons={lessons.length} /> : null);
  return (
    <section className="nl-lab ci-show" aria-label={`${course.title}: now showing`}>
      <div className="nl-container nl-film">
        <Link href={posterHref} className="nl-film-poster ci-show-poster">
          {drawn ? (
            drawn
          ) : art ? (
            // eslint-disable-next-line @next/next/no-img-element -- a fixed 2:3 poster
            <img src={art.poster} alt={art.alt} width={600} height={900} />
          ) : (
            <CourseCover course={course} n={n} size="lg" />
          )}
          {/* A drawn cover carries the esy brand at its top centre instead (/prototypes/course-cover/). */}
          {!drawn && <span className="nl-film-poster-top">The Marketing Engineer presents</span>}
          <span className="nl-film-poster-foot">
            <span className="nl-film-poster-title">{course.tags[0] ?? course.title}</span>
            <span className="nl-film-poster-billing">{lessons.map((l) => l.title).join(' · ')}</span>
          </span>
        </Link>
        <div className="nl-film-side">
          <p className="nl-film-kicker">
            Now showing · Course {String(n).padStart(2, '0')} · {minutesOf(course)} min
          </p>
          <Heading className="ci-show-title">{course.title}</Heading>
          <p className="nl-film-log">“{firstSentence(course.description)}”</p>
          {/* The credits: who teaches it, then every lesson with its running time. */}
          <dl className="nl-film-credits">
            <div><dt>Taught by</dt><dd>{course.author.name}</dd></div>
            {lessons.map((l, i) => (
              <div key={l.slug}>
                <dt>Lesson {i + 1}</dt>
                <dd>
                  <Link href={lessonHref(course, l)} className="ci-credit-link">{l.title}</Link>
                  <span className="ci-credit-time">{l.durationLabel}</span>
                </dd>
              </div>
            ))}
            <div><dt>Running time</dt><dd>{minutesOf(course)} minutes</dd></div>
          </dl>
          <div className="nl-film-ctas">
            {lessons[0] && (
              <Link href={lessonHref(course, lessons[0])} className="nl-film-cta ci-show-cta">
                <Play size={14} aria-hidden="true" /> Start watching
              </Link>
            )}
            {onCoursePage ? (
              <Link href="/courses/" className="nl-inline-link ci-show-link">
                All courses <ArrowRight size={15} aria-hidden="true" />
              </Link>
            ) : (
              <Link href={courseHref(course)} className="nl-inline-link ci-show-link">
                The course page <ArrowRight size={15} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Courses in the works, as the homepage's ledger. Nothing renders without any. */
export function ComingSoonLedger({ upcoming }: { upcoming: UpcomingCourse[] }) {
  if (upcoming.length === 0) return null;
  return (
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
  );
}

export default function CoursesNowShowing({ courses, upcoming }: CoursesIndexProps) {
  const [lead] = newestFirst(courses);

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

      {lead && <NowShowingBand course={lead} n={courses.indexOf(lead) + 1} />}
      <ComingSoonLedger upcoming={upcoming} />
      <WeeklyEmailBand />
    </>
  );
}
