/* Shared pieces for the /courses index directions (2026-09-29): the course
 * figures every layout shows, and a typographic cover, since courses have no
 * cover art. Everything reads the real course list (src/lib/learn/mockData.ts),
 * so the numbers match the course pages.
 */
import Link from 'next/link';
import type { Course, Lesson } from '@/lib/learn/types';
import type { UpcomingCourse } from './sample-upcoming';

export type { UpcomingCourse };

/** Every layout's props: the live courses, and the ones still to come. */
export interface CoursesIndexProps {
  courses: Course[];
  upcoming: UpcomingCourse[];
}

/** Every lesson of a course, in order. */
export function lessonsOf(course: Course): Lesson[] {
  return course.chapters.flatMap((ch) => ch.lessons);
}

/** A course's running time in whole minutes, from its lessons' real durations. */
export function minutesOf(course: Course): number {
  return Math.max(1, Math.round(lessonsOf(course).reduce((sum, l) => sum + l.durationMs, 0) / 60000));
}

export const courseHref = (course: Course) => `/courses/${course.slug}/`;
export const lessonHref = (course: Course, lesson: Lesson) => `/courses/${course.slug}/${lesson.slug}/`;

/** Totals for the hero line: courses, lessons, minutes. */
export function catalogStats(courses: Course[]) {
  const lessons = courses.reduce((n, c) => n + lessonsOf(c).length, 0);
  const minutes = courses.reduce((n, c) => n + minutesOf(c), 0);
  return { courses: courses.length, lessons, minutes };
}

const plural = (n: number, word: string) => `${word}${n === 1 ? '' : 's'}`;

/** "1 course · 3 lessons · 7 minutes of video" */
export function StatsLine({ courses, className = '' }: { courses: Course[]; className?: string }) {
  const s = catalogStats(courses);
  return (
    <p className={`ci-stats ${className}`}>
      <span><b>{s.courses}</b> {plural(s.courses, 'course')}</span>
      <span aria-hidden="true">·</span>
      <span><b>{s.lessons}</b> {plural(s.lessons, 'lesson')}</span>
      <span aria-hidden="true">·</span>
      <span><b>{s.minutes}</b> {plural(s.minutes, 'minute')} of video</span>
    </p>
  );
}

/** "Dec 15, 2025", as the publication's lists print dates. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** The first sentence of a description, for a one-line logline. */
export function firstSentence(text: string): string {
  const m = text.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : text).trim();
}

/** Newest first, by the course's publish date. */
export function newestFirst(courses: Course[]): Course[] {
  return [...courses].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

/**
 * A typographic cover: the course number, its title in the publication serif,
 * and its length, on navy. Stands in for cover art and keeps every course in
 * one visual family.
 */
export function CourseCover({
  course,
  n,
  size = 'md',
}: {
  course: Course;
  n: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <div className={`ci-cover ci-cover--${size}`} aria-hidden="true">
      <span className="ci-cover-num">Course {String(n).padStart(2, '0')}</span>
      <span className="ci-cover-title">{course.title}</span>
      <span className="ci-cover-foot">
        {lessonsOf(course).length} lessons · {minutesOf(course)} min
      </span>
    </div>
  );
}

/** A course that isn't out yet: the same cover family, dimmed, marked "Coming soon". */
export function UpcomingCover({ course, size = 'md' }: { course: UpcomingCourse; size?: 'sm' | 'md' }) {
  return (
    <div className={`ci-cover ci-cover--${size} ci-cover--soon`} aria-hidden="true">
      <span className="ci-cover-num">Coming soon</span>
      <span className="ci-cover-title">{course.title}</span>
      <span className="ci-cover-foot">{course.plannedLessons} lessons planned</span>
    </div>
  );
}

/** The label every sample entry carries, so nobody mistakes it for a real plan. */
export function SampleTag() {
  return <span className="ci-sample">Sample</span>;
}

/** The course's first lesson, as the "start here" link every layout offers. */
export function StartLink({ course, className = '' }: { course: Course; className?: string }) {
  const first = lessonsOf(course)[0];
  if (!first) return null;
  return (
    <Link href={lessonHref(course, first)} className={`ci-start ${className}`}>
      <span className="ci-start-play" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>
      </span>
      Start with “{first.title}” · {first.durationLabel}
    </Link>
  );
}
