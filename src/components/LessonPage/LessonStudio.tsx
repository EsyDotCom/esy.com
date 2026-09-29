/* B · Studio — a course player: the video in the studio frame and the
 * course's playlist beside it, the way a course platform plays lessons; the
 * transcript runs under the video. Up next and the lesson notes follow on
 * white, then the email.
 *
 * Round 2 varies the stage, not the layout:
 *   D · Night       — `night`: A's dark room (navy, jade spotlight) behind B.
 *   E · Night + ask — `night` plus `signup`: the email signup under the playlist.
 */
import Link from 'next/link';
import FramedVideo from '@/components/ArticleVideo/FramedVideo';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { courseHref, lessonsOf, minutesOf } from '@/components/CoursesIndex/shared';
import { LessonList, LessonNotes, SampleVideoNote, UpNext, lessonPosition, type LessonPageProps } from './shared';

export default function LessonStudio({
  course,
  lesson,
  chapterTitle,
  video,
  night = false,
  signup = false,
}: LessonPageProps & {
  /** A's dark room behind the stage, title in white. */
  night?: boolean;
  /** The email signup in the rail, under the playlist. */
  signup?: boolean;
}) {
  return (
    <article className={`ai av av-studio lp lp-studio ${night ? 'lp-studio--night' : ''}`}>
      <section className="lp-stage">
        <div className="lp-stage-inner">
          <p className="lp-kicker lp-kicker--onDark">
            <Link href={courseHref(course)}>{course.title}</Link> · {lessonPosition(course, lesson)} · {chapterTitle}
          </p>
          <h1 className="lp-stage-title">{lesson.title}</h1>

          {/* The player and the playlist, side by side. */}
          <div className="lp-player">
            <div className="lp-player-video">
              <FramedVideo
                frame="studio"
                playbackId={video.playbackId}
                title={video.title}
                thumbnailUrl={video.thumbnailUrl}
                durationSeconds={video.durationSeconds}
                segments={video.segments}
              />
            </div>
            <aside className="lp-player-rail">
              <div className="lp-player-list">
                {signup && (
                  <p className="lp-rail-meta">
                    {lessonsOf(course).length} lessons · {minutesOf(course)} min
                  </p>
                )}
                <LessonList course={course} current={lesson} onDark />
              </div>
              {/* The ask, right where a stranger decides whether to keep going. */}
              {signup && (
                <div className="lp-rail-signup">
                  <p className="lp-rail-signup-title">Get the next lesson by email</p>
                  <p className="lp-rail-signup-body">New lessons and courses go out in the weekly email first.</p>
                  <NewsletterSignup note="One email a week · unsubscribe anytime" />
                </div>
              )}
            </aside>
          </div>
          <SampleVideoNote video={video} onDark />
        </div>
      </section>

      {/* Up next first, since that's the next click; then what the lesson covered. */}
      <div className="ai-col lp-col">
        <UpNext course={course} lesson={lesson} />
        <p className="ai-dek lp-desc">{lesson.description}</p>
        <LessonNotes lesson={lesson} />
      </div>

      <WeeklyEmailBand />
    </article>
  );
}
