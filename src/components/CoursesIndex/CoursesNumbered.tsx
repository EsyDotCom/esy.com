/* E · Numbered — the homepage's "01 Apps / 02 Films" sections, for courses.
 * Each course opens with a big jade number, a label and a serif heading on
 * the left, and a ruled ledger of its lessons on the right. Chips under every
 * head jump between courses. Courses still to come get their number too.
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import {
  SampleTag,
  StatsLine,
  courseHref,
  lessonHref,
  lessonsOf,
  minutesOf,
  type CoursesIndexProps,
} from './shared';

const nn = (i: number) => String(i + 1).padStart(2, '0');

/** The chips under every head: every course, the current one filled, like the homepage's work index. */
function CourseChips({ labels, current }: { labels: { key: string; label: string; count: string }[]; current: number }) {
  return (
    <nav className="nl-work-index" aria-label="Courses">
      {labels.map((l, i) => (
        <a key={l.key} href={`#course-${i + 1}`} className="nl-work-chip" aria-current={i === current ? 'true' : undefined}>
          {nn(i)} {l.label}
          <b>{l.count}</b>
        </a>
      ))}
    </nav>
  );
}

export default function CoursesNumbered({ courses, upcoming }: CoursesIndexProps) {
  // One chip per course, live and upcoming, numbered in one sequence.
  const labels = [
    ...courses.map((c) => ({ key: c.slug, label: c.tags[0] ?? c.title, count: String(lessonsOf(c).length) })),
    ...upcoming.map((u) => ({ key: u.title, label: u.tags[0] ?? u.title, count: 'soon' })),
  ];

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

      {/* ══ One numbered section per live course ══ */}
      {courses.map((course, i) => (
        <section key={course.slug} className="nl-section nl-where ci-where" id={`course-${i + 1}`} aria-labelledby={`ci-c${i}`}>
          <div className="nl-container nl-where-grid">
            <div className="nl-work-head">
              <span className="nl-work-n" aria-hidden="true">{nn(i)}</span>
              <p className="nl-eyebrow">
                Course · {lessonsOf(course).length} lessons · {minutesOf(course)} min
              </p>
              <h2 className="nl-title nl-work-title" id={`ci-c${i}`}>
                <Link href={courseHref(course)} className="ci-plain">{course.title}</Link>
              </h2>
              <p className="nl-lede">{course.description}</p>
              <CourseChips labels={labels} current={i} />
            </div>
            {/* The ledger: every lesson, with its part, length and a link to watch. */}
            <ul className="nl-ledger">
              {course.chapters.flatMap((ch, c) =>
                ch.lessons.map((lesson) => (
                  <li key={lesson.slug} className="nl-ledger-row ci-ledger-row">
                    <span className="ci-ledger-name">
                      <span className="ci-ledger-n">{lesson.order}</span>
                      {lesson.title}
                    </span>
                    <div className="nl-ledger-body">
                      <span className="nl-ledger-role">
                        Part {c + 1} · {ch.title} · {lesson.durationLabel}
                      </span>
                      <p>{lesson.description}</p>
                      <Link href={lessonHref(course, lesson)} className="nl-inline-link">
                        Watch the lesson <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </li>
                )),
              )}
            </ul>
          </div>
        </section>
      ))}

      {/* ══ Courses still to come: numbered on, one ledger row each ══ */}
      {upcoming.map((u, j) => {
        const i = courses.length + j;
        return (
          <section key={u.title} className="nl-section nl-where ci-where ci-where--soon" id={`course-${i + 1}`} aria-labelledby={`ci-c${i}`}>
            <div className="nl-container nl-where-grid">
              <div className="nl-work-head">
                <span className="nl-work-n" aria-hidden="true">{nn(i)}</span>
                <p className="nl-eyebrow">Coming soon · {u.plannedLessons} lessons planned</p>
                <h2 className="nl-title nl-work-title" id={`ci-c${i}`}>
                  {u.title} <SampleTag />
                </h2>
                <p className="nl-lede">{u.description}</p>
                <CourseChips labels={labels} current={i} />
              </div>
              <ul className="nl-ledger">
                <li className="nl-ledger-row ci-ledger-row">
                  <span className="ci-ledger-name ci-ledger-name--soon">In production</span>
                  <div className="nl-ledger-body">
                    <span className="nl-ledger-role">{u.tags.join(' · ')}</span>
                    <p>The first lesson goes out in the weekly email before it lands here.</p>
                    <a href="#subscribe" className="nl-inline-link">
                      Get it by email <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        );
      })}

      <div id="subscribe">
        <WeeklyEmailBand />
      </div>
    </>
  );
}
