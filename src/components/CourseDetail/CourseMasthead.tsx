/* B · Masthead — /engineer's centred serif masthead for the course (number,
 * title, promise, Start), then a sticky course card with the cover and the
 * facts beside the lessons as the homepage's dated list, what you'll learn and
 * the resources. The teacher and the weekly email close the page.
 */
import Link from 'next/link';
import { ArrowLeft, Play } from 'lucide-react';
import type { Course } from '@/lib/learn/types';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { COURSE_ART } from '@/components/CoursesIndex/covers';
import { CourseCover, firstSentence, formatDate, lessonHref, lessonsOf, minutesOf } from '@/components/CoursesIndex/shared';
import { LearnList, ResourceList, TeacherBlock, courseNumber, realResources } from './shared';

export default function CourseMasthead({ course }: { course: Course }) {
  const art = COURSE_ART[course.slug];
  const lessons = lessonsOf(course);
  const first = lessons[0];
  const n = courseNumber(course);

  return (
    <>
      {/* ══ Masthead: which course, what it is, where to start ══ */}
      <section className="nl-hero cd-hero">
        <div className="nl-container nl-hero-inner">
          <Link href="/courses/" className="cd-crumb">
            <ArrowLeft size={14} aria-hidden="true" /> Courses
          </Link>
          <p className="nl-kicker">Course {n} · The Marketing Engineer</p>
          <h1 className="nl-masthead cd-masthead">{course.title}</h1>
          <p className="nl-promise">{firstSentence(course.description)}</p>
          {first && (
            <Link href={lessonHref(course, first)} className="cd-start">
              <Play size={14} fill="currentColor" aria-hidden="true" /> Start the course
            </Link>
          )}
          <p className="ci-stats ci-stats--center">
            <span><b>{lessons.length}</b> lessons</span>
            <span aria-hidden="true">·</span>
            <span><b>{minutesOf(course)}</b> minutes</span>
            <span aria-hidden="true">·</span>
            <span>Taught by <b>{course.author.name}</b></span>
          </p>
        </div>
      </section>

      {/* ══ The course card beside the lessons ══ */}
      <section className="nl-section nl-section--alt">
        <div className="nl-container cd-split">
          <aside className="cd-card">
            {art ? (
              // eslint-disable-next-line @next/next/no-img-element -- the generated cover, fixed size
              <img src={art.wide} alt={art.alt} width={640} height={360} className="cd-card-img" />
            ) : (
              <CourseCover course={course} n={Number(n)} />
            )}
            <dl className="cd-facts">
              <div><dt>Lessons</dt><dd>{lessons.length}</dd></div>
              <div><dt>Running time</dt><dd>{minutesOf(course)} min</dd></div>
              <div><dt>Taught by</dt><dd>{course.author.name}</dd></div>
              <div><dt>Published</dt><dd>{formatDate(course.publishedAt)}</dd></div>
            </dl>
            {first && (
              <Link href={lessonHref(course, first)} className="cd-start cd-start--block">
                <Play size={14} fill="currentColor" aria-hidden="true" /> Start with lesson 1
              </Link>
            )}
          </aside>

          <div className="cd-main">
            <h2 className="nl-title">The lessons</h2>
            {/* Chapters as small caps, lessons as the homepage's dated rows. */}
            {course.chapters.map((ch, c) => (
              <div key={ch.title} className="cd-chapter">
                <p className="cd-chapter-name">Part {c + 1} · {ch.title}</p>
                <ul className="nl-list cd-list">
                  {ch.lessons.map((l) => (
                    <li key={l.slug}>
                      <Link href={lessonHref(course, l)} className="nl-row">
                        <span className="nl-row-date">{formatDate(l.publishedAt)}</span>
                        <span className="nl-row-title">{l.title}</span>
                        <span className="nl-row-cat">{l.durationLabel}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <h2 className="nl-title cd-gap">What you&apos;ll learn</h2>
            <LearnList course={course} />

            {realResources(course).length > 0 && (
              <>
                <h2 className="nl-title cd-gap">Resources</h2>
                <ResourceList course={course} />
              </>
            )}
          </div>
        </div>
      </section>

      <section className="nl-section" aria-label="Who teaches it">
        <div className="nl-container">
          <TeacherBlock course={course} />
        </div>
      </section>

      <WeeklyEmailBand />
    </>
  );
}
