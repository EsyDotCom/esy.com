/* A · Shelf — the catalog as a shelf of books: a plain serif hero, then one
 * row per course with its cover, what it teaches, its chapters, and a
 * "start with lesson 1" link. Courses still to come sit on a lower shelf,
 * dimmed. The weekly email closes the page.
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import {
  CourseCover,
  SampleTag,
  StartLink,
  StatsLine,
  UpcomingCover,
  courseHref,
  type CoursesIndexProps,
} from './shared';

export default function CoursesShelf({ courses, upcoming }: CoursesIndexProps) {
  return (
    <>
      <section className="ci-hero">
        <div className="nl-container">
          <p className="nl-eyebrow">The Marketing Engineer</p>
          <h1 className="ci-title">Courses</h1>
          <p className="ci-desc">
            Short video courses on the AI tools behind modern marketing. Each one takes a single tool from setup to a
            finished result, one lesson at a time.
          </p>
          <StatsLine courses={courses} />
        </div>
      </section>

      <section className="nl-section nl-section--alt" aria-label="All courses">
        <div className="nl-container">
          <ol className="ci-shelf">
            {courses.map((course, i) => (
              <li key={course.slug} className="ci-shelf-row">
                <Link href={courseHref(course)} className="ci-shelf-cover" tabIndex={-1} aria-hidden="true">
                  <CourseCover course={course} n={i + 1} />
                </Link>
                <div className="ci-shelf-body">
                  <p className="ci-kicker">{course.tags.slice(0, 2).join(' · ')}</p>
                  <h2 className="ci-shelf-title">
                    <Link href={courseHref(course)}>{course.title}</Link>
                  </h2>
                  <p className="ci-shelf-desc">{course.description}</p>
                  {/* The chapters, so you can see the shape of the course before opening it. */}
                  <ul className="ci-chapters">
                    {course.chapters.map((ch, c) => (
                      <li key={ch.title}>
                        <span className="ci-chapter-n">Part {c + 1}</span>
                        <span className="ci-chapter-name">{ch.title}</span>
                        <span className="ci-chapter-count">
                          {ch.lessons.length} {ch.lessons.length === 1 ? 'lesson' : 'lessons'}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="ci-shelf-actions">
                    <StartLink course={course} />
                    <Link href={courseHref(course)} className="ci-more">
                      See the course <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* The lower shelf: what's coming, dimmed and unlinked. */}
          {upcoming.length > 0 && (
            <div className="ci-next">
              <h2 className="ci-next-title">Coming next</h2>
              <ul className="ci-next-row">
                {upcoming.map((u) => (
                  <li key={u.title} className="ci-next-item">
                    <UpcomingCover course={u} size="sm" />
                    <div>
                      <p className="ci-next-name">
                        {u.title} <SampleTag />
                      </p>
                      <p className="ci-next-desc">{u.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="ci-next-note">New courses go out in the weekly email first.</p>
            </div>
          )}
        </div>
      </section>

      <WeeklyEmailBand />
    </>
  );
}
