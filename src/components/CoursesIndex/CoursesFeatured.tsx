/* C · Featured — a navy stage for the newest course (big cover, its lessons,
 * "start watching"), then every course as a card with its cover; courses
 * still to come join the grid as dimmed cards. The weekly email closes the page.
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Course } from '@/lib/learn/types';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import {
  CourseCover,
  SampleTag,
  StartLink,
  StatsLine,
  UpcomingCover,
  courseHref,
  lessonsOf,
  minutesOf,
  newestFirst,
  type CoursesIndexProps,
} from './shared';

export default function CoursesFeatured({ courses, upcoming }: CoursesIndexProps) {
  const [featured] = newestFirst(courses);
  // Course numbers follow the catalog order, so a course keeps its number on every layout.
  const numberOf = (c: Course) => courses.indexOf(c) + 1;

  return (
    <>
      {/* The stage: the page title, then the newest course front and centre. */}
      <section className="ci-stage">
        <div className="nl-container">
          <div className="ci-stage-top">
            <div>
              <p className="nl-eyebrow nl-eyebrow--onDark">The Marketing Engineer</p>
              <h1 className="ci-title ci-title--onDark">Courses</h1>
            </div>
            <StatsLine courses={courses} className="ci-stats--onDark" />
          </div>

          {featured && (
            <div className="ci-feature">
              <Link href={courseHref(featured)} className="ci-feature-cover" tabIndex={-1} aria-hidden="true">
                <CourseCover course={featured} n={numberOf(featured)} size="lg" />
              </Link>
              <div className="ci-feature-body">
                <p className="ci-kicker ci-kicker--onDark">Newest course</p>
                <h2 className="ci-feature-title">
                  <Link href={courseHref(featured)}>{featured.title}</Link>
                </h2>
                <p className="ci-feature-desc">{featured.description}</p>
                <ol className="ci-feature-lessons">
                  {lessonsOf(featured).map((l, i) => (
                    <li key={l.slug}>
                      <span>{i + 1}</span>
                      {l.title}
                      <em>{l.durationLabel}</em>
                    </li>
                  ))}
                </ol>
                <StartLink course={featured} className="ci-start--solid" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Every course as a card, then what's coming. */}
      <section className="nl-section" aria-labelledby="ci-all">
        <div className="nl-container">
          <h2 className="nl-title" id="ci-all">All courses</h2>
          <ul className="ci-cards">
            {courses.map((course) => (
              <li key={course.slug}>
                <Link href={courseHref(course)} className="ci-card">
                  <CourseCover course={course} n={numberOf(course)} size="sm" />
                  <span className="ci-card-body">
                    <span className="ci-card-title">{course.title}</span>
                    <span className="ci-card-desc">{course.description}</span>
                    <span className="ci-card-foot">
                      {lessonsOf(course).length} lessons · {minutesOf(course)} min
                      <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            {upcoming.map((u) => (
              <li key={u.title}>
                <div className="ci-card ci-card--soon">
                  <UpcomingCover course={u} size="sm" />
                  <span className="ci-card-body">
                    <span className="ci-card-title">
                      {u.title} <SampleTag />
                    </span>
                    <span className="ci-card-desc">{u.description}</span>
                    <span className="ci-card-foot ci-card-foot--soon">Coming soon</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WeeklyEmailBand />
    </>
  );
}
