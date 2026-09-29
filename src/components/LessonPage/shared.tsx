/* Shared pieces for the lesson page directions (/prototypes/lesson/,
 * 2026-09-29): the course's lesson list, the lesson notes, up next, and the
 * sample-video notice.
 *
 * The lesson (title, part, notes, neighbours) is the real Claude Code lesson
 * from src/lib/learn/mockData.ts. Its own video is a placeholder clip, so every
 * direction plays a real published Esy video instead (with its timestamped
 * transcript), labelled on the page as a sample.
 */
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import type { Course, Lesson } from '@/lib/learn/types';
import type { TranscriptSegment } from '@/lib/transcripts';
import { splitSections } from '@/components/ArticleImage/article';
import { ArticleBody } from '@/components/ArticleImage/shared';
import { getAdjacentLessons } from '@/lib/learn/mockData';
import { courseHref, lessonHref, lessonsOf } from '@/components/CoursesIndex/shared';

/** The real published video every direction plays in place of the placeholder clip. */
export interface SampleVideo {
  slug: string;
  playbackId: string;
  title: string;
  thumbnailUrl?: string;
  durationSeconds: number;
  segments: TranscriptSegment[] | null;
}

export interface LessonPageProps {
  course: Course;
  lesson: Lesson;
  chapterTitle: string;
  video: SampleVideo;
}

/** "Lesson 1 of 3" */
export function lessonPosition(course: Course, lesson: Lesson): string {
  const all = lessonsOf(course);
  return `Lesson ${all.findIndex((l) => l.slug === lesson.slug) + 1} of ${all.length}`;
}

/** Says, on the page, that the video is a stand-in, and which video it is. */
export function SampleVideoNote({ video, onDark = false }: { video: SampleVideo; onDark?: boolean }) {
  return (
    <p className={`lp-sample ${onDark ? 'lp-sample--onDark' : ''}`}>
      <b>Sample video.</b> This lesson&apos;s own video isn&apos;t recorded yet, so the prototype plays{' '}
      <Link href={`/${video.slug}/`}>{video.title}</Link>.
    </p>
  );
}

/** Every lesson in the course, grouped by part, the current one marked. */
export function LessonList({
  course,
  current,
  onDark = false,
}: {
  course: Course;
  current: Lesson;
  onDark?: boolean;
}) {
  return (
    <nav className={`lp-lessons ${onDark ? 'lp-lessons--onDark' : ''}`} aria-label="Lessons in this course">
      <Link href={courseHref(course)} className="lp-lessons-course">
        {course.title}
      </Link>
      {course.chapters.map((ch, c) => (
        <div key={ch.title}>
          <p className="lp-lessons-part">Part {c + 1} · {ch.title}</p>
          <ol className="lp-lessons-list">
            {ch.lessons.map((l) => {
              const isCurrent = l.slug === current.slug;
              return (
                <li key={l.slug}>
                  <Link
                    href={lessonHref(course, l)}
                    className={`lp-lesson ${isCurrent ? 'is-current' : ''}`}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    <span className="lp-lesson-n">{isCurrent ? <Play size={11} fill="currentColor" /> : l.order}</span>
                    <span className="lp-lesson-title">{l.title}</span>
                    <span className="lp-lesson-time">{l.durationLabel}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </nav>
  );
}

/** The instructor's notes for the lesson, in the article body's reading style. */
export function LessonNotes({ lesson }: { lesson: Lesson }) {
  // The renderer's remark-directive reads ":45" in "0:45" as a directive and drops it,
  // so escape the colon in timestamps before rendering.
  const markdown = lesson.commentary?.markdown?.trim().replace(/(\d):(\d)/g, '$1\\:$2');
  if (!markdown) return null;
  return <ArticleBody sections={splitSections(markdown)} />;
}

/** Previous and next lessons; next is the big one. The last lesson points back to the course. */
export function UpNext({ course, lesson, onDark = false }: { course: Course; lesson: Lesson; onDark?: boolean }) {
  const { prev, next } = getAdjacentLessons(course, lesson.slug);
  return (
    <div className={`lp-next ${onDark ? 'lp-next--onDark' : ''}`}>
      {next ? (
        <Link href={lessonHref(course, next)} className="lp-next-card">
          <span className="lp-next-label">Up next · {next.durationLabel}</span>
          <span className="lp-next-title">{next.title}</span>
          <span className="lp-next-desc">{next.description}</span>
          <span className="lp-next-go">
            Watch it <ArrowRight size={15} aria-hidden="true" />
          </span>
        </Link>
      ) : (
        <Link href={courseHref(course)} className="lp-next-card">
          <span className="lp-next-label">You finished the course</span>
          <span className="lp-next-title">Back to {course.title}</span>
        </Link>
      )}
      {prev && (
        <Link href={lessonHref(course, prev)} className="lp-prev">
          <ArrowLeft size={14} aria-hidden="true" /> Previous: {prev.title}
        </Link>
      )}
    </div>
  );
}
