/* B · Syllabus — the whole catalog as one syllabus. A sticky rail holds the
 * pitch and the signup; the page lists every course with every lesson, each
 * lesson linking straight to its video, so you can jump in anywhere. Courses
 * still to come close the list as greyed-out entries.
 */
import Link from 'next/link';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';
import {
  SampleTag,
  StatsLine,
  courseHref,
  lessonHref,
  lessonsOf,
  minutesOf,
  type CoursesIndexProps,
} from './shared';

export default function CoursesSyllabus({ courses, upcoming }: CoursesIndexProps) {
  return (
    <section className="ci-syl">
      <div className="nl-container ci-syl-grid">
        {/* The rail: what these are, the totals, and the one ask. */}
        <aside className="ci-syl-rail">
          <p className="nl-eyebrow">The Marketing Engineer</p>
          <h1 className="ci-title ci-title--rail">Courses</h1>
          <p className="ci-desc">
            Short video courses on the AI tools behind modern marketing, from setup to a finished result.
          </p>
          <StatsLine courses={courses} className="ci-stats--stack" />
          <div className="ci-syl-signup">
            <p className="ci-syl-signup-title">Get new courses by email</p>
            <NewsletterSignup note="One email a week · unsubscribe anytime" />
          </div>
        </aside>

        {/* The syllabus: every course, every lesson. */}
        <ol className="ci-syl-list">
          {courses.map((course, i) => (
            <li key={course.slug} className="ci-syl-course">
              <header className="ci-syl-head">
                <span className="ci-syl-num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="ci-syl-title">
                    <Link href={courseHref(course)}>{course.title}</Link>
                  </h2>
                  <p className="ci-syl-meta">
                    {lessonsOf(course).length} lessons · {minutesOf(course)} min · {course.tags.slice(0, 2).join(', ')}
                  </p>
                  <p className="ci-syl-desc">{course.description}</p>
                </div>
              </header>
              {course.chapters.map((ch) => (
                <div key={ch.title} className="ci-syl-chapter">
                  <p className="ci-syl-chapter-name">{ch.title}</p>
                  <ol className="ci-syl-lessons">
                    {ch.lessons.map((lesson) => (
                      <li key={lesson.slug}>
                        <Link href={lessonHref(course, lesson)} className="ci-syl-lesson">
                          <span className="ci-syl-play" aria-hidden="true">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>
                          </span>
                          <span className="ci-syl-lesson-title">{lesson.title}</span>
                          <span className="ci-syl-lesson-time">{lesson.durationLabel}</span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </li>
          ))}

          {/* What's coming: numbered on from the live courses, greyed, unlinked. */}
          {upcoming.map((u, i) => (
            <li key={u.title} className="ci-syl-course ci-syl-course--soon">
              <header className="ci-syl-head">
                <span className="ci-syl-num">{String(courses.length + i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="ci-kicker">Coming soon</p>
                  <h2 className="ci-syl-title">
                    {u.title} <SampleTag />
                  </h2>
                  <p className="ci-syl-meta">
                    {u.plannedLessons} lessons planned · {u.tags.join(', ')}
                  </p>
                  <p className="ci-syl-desc">{u.description}</p>
                </div>
              </header>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
