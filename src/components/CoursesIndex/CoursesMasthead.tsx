/* D · Masthead — /engineer's front page, for courses: the centred serif
 * masthead with the signup, then the homepage's "Latest" block. The newest
 * course is the lead story with its cover; every lesson is a dated row under
 * it, like the article list. What's coming closes the list.
 */
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { COURSE_ART } from './covers';
import {
  CourseCover,
  SampleTag,
  StatsLine,
  courseHref,
  formatDate,
  lessonHref,
  lessonsOf,
  minutesOf,
  newestFirst,
  type CoursesIndexProps,
} from './shared';

export default function CoursesMasthead({ courses, upcoming }: CoursesIndexProps) {
  const [lead] = newestFirst(courses);
  const art = lead ? COURSE_ART[lead.slug] : undefined;
  const first = lead ? lessonsOf(lead)[0] : undefined;

  return (
    <>
      {/* ══ Masthead: the name, the promise, the one action ══ */}
      <section className="nl-hero">
        <div className="nl-container nl-hero-inner">
          <p className="nl-kicker">The Marketing Engineer</p>
          <h1 className="nl-masthead">Courses</h1>
          <p className="nl-promise">
            Learn to build the AI systems that run marketing, <span className="nl-promise-accent">one lesson at a time</span>.
          </p>
          <NewsletterSignup note="New courses go out in the weekly email first" />
          <StatsLine courses={courses} className="ci-stats--center" />
        </div>
      </section>

      {/* ══ The newest course as the lead story, every lesson as a row ══ */}
      {lead && (
        <section className="nl-section nl-section--alt" aria-labelledby="ci-lead-title">
          <div className="nl-container">
            <div className="nl-section-head">
              <h2 className="nl-title" id="ci-lead-title">Newest course</h2>
            </div>

            <Link href={first ? lessonHref(lead, first) : courseHref(lead)} className="nl-featured">
              <span className="nl-featured-media">
                {art ? (
                  // eslint-disable-next-line @next/next/no-img-element -- matches the homepage's featured media
                  <img src={art.wide} alt="" width={960} height={540} loading="lazy" />
                ) : (
                  <CourseCover course={lead} n={1} />
                )}
                <span className="nl-play" aria-hidden="true">
                  <Play size={18} fill="currentColor" />
                </span>
              </span>
              <span className="nl-featured-body">
                <span className="nl-meta">
                  Course 01 · {lessonsOf(lead).length} lessons · {minutesOf(lead)} min
                </span>
                <span className="nl-featured-title">{lead.title}</span>
                <span className="nl-featured-desc">{lead.description}</span>
                <span className="nl-read">
                  Start the course <ArrowRight size={15} aria-hidden="true" />
                </span>
              </span>
            </Link>

            {/* Every lesson, dated like the article list; the chapter sits where the topic does. */}
            <ul className="nl-list">
              {lead.chapters.flatMap((ch) =>
                ch.lessons.map((lesson) => (
                  <li key={lesson.slug}>
                    <Link href={lessonHref(lead, lesson)} className="nl-row">
                      <span className="nl-row-date">{formatDate(lesson.publishedAt)}</span>
                      <span className="nl-row-title">
                        {lesson.title} <span className="ci-row-time">{lesson.durationLabel}</span>
                      </span>
                      <span className="nl-row-cat">{ch.title}</span>
                    </Link>
                  </li>
                )),
              )}
              {/* What's coming: the same rows, unlinked and dimmed. */}
              {upcoming.map((u) => (
                <li key={u.title}>
                  <div className="nl-row ci-row--soon">
                    <span className="nl-row-date">Coming soon</span>
                    <span className="nl-row-title">
                      {u.title} <SampleTag />
                    </span>
                    <span className="nl-row-cat">{u.plannedLessons} lessons planned</span>
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
