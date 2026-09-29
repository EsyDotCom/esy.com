/* C · Mat — light and bookish: the title block beside the video in the mat
 * frame (a light mat with a white inner border, like a framed print), the
 * transcript under it, then the lesson notes read like an article with the
 * course's lessons in a sticky rail, and a light up-next band before the email.
 */
import Link from 'next/link';
import FramedVideo from '@/components/ArticleVideo/FramedVideo';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { courseHref } from '@/components/CoursesIndex/shared';
import { LessonList, LessonNotes, SampleVideoNote, UpNext, lessonPosition, type LessonPageProps } from './shared';

export default function LessonMat({ course, lesson, chapterTitle, video }: LessonPageProps) {
  return (
    <article className="ai av av-mat lp lp-mat">
      <FramedVideo
        frame="mat"
        playbackId={video.playbackId}
        title={video.title}
        thumbnailUrl={video.thumbnailUrl}
        durationSeconds={video.durationSeconds}
        segments={video.segments}
        side={
          <header className="av-mat-side lp-mat-side">
            <p className="lp-kicker">
              <Link href={courseHref(course)}>{course.tags[0] ?? 'Course'}</Link> · {lessonPosition(course, lesson)}
            </p>
            <h1 className="ai-title lp-mat-title">{lesson.title}</h1>
            <p className="ai-dek">{lesson.description}</p>
            <p className="lp-part">{chapterTitle} · {lesson.durationLabel}</p>
            <SampleVideoNote video={video} />
          </header>
        }
      />

      <div className="ai-guide-grid av-grid lp-grid">
        <aside className="lp-rail">
          <LessonList course={course} current={lesson} />
        </aside>
        <div className="ai-guide-main">
          <LessonNotes lesson={lesson} />
        </div>
      </div>

      {/* Up next, on the quiet grey, as the page's last word before the navy email band. */}
      <section className="lp-next-band">
        <div className="ai-col">
          <UpNext course={course} lesson={lesson} />
        </div>
      </section>

      <WeeklyEmailBand />
    </article>
  );
}
