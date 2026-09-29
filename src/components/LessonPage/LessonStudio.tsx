/* B · Studio — a course player. A navy stage with the video in the studio
 * frame and the course's playlist beside it, the way a course platform plays
 * lessons; the transcript runs under the video. Up next and the lesson notes
 * follow on white, then the email.
 */
import Link from 'next/link';
import FramedVideo from '@/components/ArticleVideo/FramedVideo';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { courseHref } from '@/components/CoursesIndex/shared';
import { LessonList, LessonNotes, SampleVideoNote, UpNext, lessonPosition, type LessonPageProps } from './shared';

export default function LessonStudio({ course, lesson, chapterTitle, video }: LessonPageProps) {
  return (
    <article className="ai av av-studio lp lp-studio">
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
            <aside className="lp-player-list">
              <LessonList course={course} current={lesson} onDark />
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
