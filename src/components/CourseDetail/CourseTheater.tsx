/* C · Theater — watch first. A navy stage with the title, then the cover in a
 * framed 16:9 "screen" with a big play button that starts lesson 1, and the
 * lessons as a playlist beside it, like a course player. What it covers, the
 * teacher, the resources and the weekly email follow on white.
 */
import Link from 'next/link';
import { ArrowLeft, Play } from 'lucide-react';
import type { Course } from '@/lib/learn/types';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { COURSE_ART } from '@/components/CoursesIndex/covers';
import { CourseCover, lessonHref, lessonsOf, minutesOf } from '@/components/CoursesIndex/shared';
import { LearnList, ResourceList, TeacherBlock, courseNumber, realResources } from './shared';

export default function CourseTheater({ course }: { course: Course }) {
  const art = COURSE_ART[course.slug];
  const lessons = lessonsOf(course);
  const first = lessons[0];
  const n = courseNumber(course);

  return (
    <>
      {/* ══ The stage: title, then the screen and the playlist ══ */}
      <section className="cd-stage">
        <div className="nl-container">
          <Link href="/courses/" className="cd-crumb cd-crumb--onDark">
            <ArrowLeft size={14} aria-hidden="true" /> Courses
          </Link>
          <p className="nl-eyebrow nl-eyebrow--onDark">
            Course {n} · {lessons.length} lessons · {minutesOf(course)} min
          </p>
          <h1 className="cd-stage-title">{course.title}</h1>

          <div className="cd-theater">
            {/* The screen: the cover, framed, with a play button that starts lesson 1. */}
            {first && (
              <Link href={lessonHref(course, first)} className="cd-screen" aria-label={`Start lesson 1: ${first.title}`}>
                {art ? (
                  // eslint-disable-next-line @next/next/no-img-element -- the generated cover, fixed size
                  <img src={art.wide} alt="" width={1280} height={720} />
                ) : (
                  <CourseCover course={course} n={Number(n)} size="lg" />
                )}
                <span className="cd-screen-play" aria-hidden="true">
                  <Play size={28} fill="currentColor" />
                </span>
                <span className="cd-screen-caption">
                  Lesson 1 · {first.title} · {first.durationLabel}
                </span>
              </Link>
            )}

            {/* The playlist: every lesson, grouped by part, lesson 1 marked as the start. */}
            <nav className="cd-playlist" aria-label="Lessons">
              <p className="cd-playlist-head">Playlist · {minutesOf(course)} min</p>
              {course.chapters.map((ch, c) => (
                <div key={ch.title}>
                  <p className="cd-playlist-part">Part {c + 1} · {ch.title}</p>
                  <ol className="cd-playlist-list">
                    {ch.lessons.map((l) => (
                      <li key={l.slug}>
                        <Link href={lessonHref(course, l)} className={`cd-playlist-item ${l === first ? 'is-first' : ''}`}>
                          <span className="cd-playlist-n">{l.order}</span>
                          <span className="cd-playlist-title">
                            {l.title}
                            {l === first && <em>Start here</em>}
                          </span>
                          <span className="cd-playlist-time">{l.durationLabel}</span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ══ What it's about ══ */}
      <section className="nl-section" aria-labelledby="cd-about-title">
        <div className="nl-container nl-where-grid">
          <div className="nl-work-head">
            <p className="nl-eyebrow">About the course</p>
            <h2 className="nl-title" id="cd-about-title">What you&apos;ll learn</h2>
            <p className="nl-lede">{course.description}</p>
          </div>
          <div>
            <LearnList course={course} />
            {realResources(course).length > 0 && (
              <>
                <p className="cd-chapter-name cd-gap-sm">Resources</p>
                <ResourceList course={course} />
              </>
            )}
          </div>
        </div>
      </section>

      <section className="nl-section nl-section--alt" aria-label="Who teaches it">
        <div className="nl-container">
          <TeacherBlock course={course} />
        </div>
      </section>

      <WeeklyEmailBand />
    </>
  );
}
