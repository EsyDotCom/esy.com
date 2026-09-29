/* A · Theater — the video article page's dark room, for a lesson: the course
 * and lesson title in white, the video centred in a spotlight with a jade
 * ring, the click-to-seek transcript under it. Below: a sticky rail with every
 * lesson in the course beside the lesson notes, then up next and the email.
 */
import Link from 'next/link';
import FramedVideo from '@/components/ArticleVideo/FramedVideo';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { courseHref } from '@/components/CoursesIndex/shared';
import { LessonList, LessonNotes, SampleVideoNote, UpNext, lessonPosition, type LessonPageProps } from './shared';

export default function LessonTheater({ course, lesson, chapterTitle, video }: LessonPageProps) {
  return (
    <article className="ai av av-theater lp lp-theater">
      <FramedVideo
        frame="theater"
        playbackId={video.playbackId}
        title={video.title}
        thumbnailUrl={video.thumbnailUrl}
        durationSeconds={video.durationSeconds}
        segments={video.segments}
        header={
          <header className="av-theater-head">
            <p className="lp-kicker lp-kicker--onDark">
              <Link href={courseHref(course)}>{course.tags[0] ?? 'Course'}</Link> · {lessonPosition(course, lesson)} · {chapterTitle}
            </p>
            <h1 className="ai-title ai-title--onDark">{lesson.title}</h1>
            <p className="ai-dek ai-dek--onDark">{lesson.description}</p>
            <SampleVideoNote video={video} onDark />
          </header>
        }
      />

      {/* The course on the left, the notes on the right. */}
      <div className="ai-guide-grid av-grid lp-grid">
        <aside className="lp-rail">
          <LessonList course={course} current={lesson} />
        </aside>
        <div className="ai-guide-main">
          <LessonNotes lesson={lesson} />
          <UpNext course={course} lesson={lesson} />
        </div>
      </div>

      <WeeklyEmailBand />
    </article>
  );
}
