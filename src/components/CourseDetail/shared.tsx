/* Shared pieces for the course detail directions (/prototypes/course/,
 * 2026-09-29): what you'll learn, the lesson ledger, the teacher, and the
 * resources. Everything reads the real course (src/lib/learn/mockData.ts).
 */
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import type { Course, LessonResource } from '@/lib/learn/types';
import { courses as allCourses } from '@/lib/learn/mockData';
import { lessonHref, lessonsOf } from '@/components/CoursesIndex/shared';

/** The course's number in the catalog: "01" for the first course. */
export function courseNumber(course: Course): string {
  return String(Math.max(0, allCourses.findIndex((c) => c.slug === course.slug)) + 1).padStart(2, '0');
}

/** Resources across the course's lessons, real links only: '#' placeholders never render. */
export function realResources(course: Course): LessonResource[] {
  const seen = new Set<string>();
  return lessonsOf(course)
    .flatMap((l) => l.commentary?.resources ?? [])
    .filter((r) => r.url && r.url !== '#' && !seen.has(r.url) && seen.add(r.url));
}

/** "What you'll learn": one point per lesson, from its description. */
export function LearnList({ course, onDark = false }: { course: Course; onDark?: boolean }) {
  return (
    <ul className={`cd-learn ${onDark ? 'cd-learn--onDark' : ''}`}>
      {lessonsOf(course).map((l) => (
        <li key={l.slug}>
          <span className="cd-learn-tick" aria-hidden="true">
            <Check size={13} strokeWidth={3} />
          </span>
          {l.description}
        </li>
      ))}
    </ul>
  );
}

/** Every lesson as the homepage's ledger: number and title, then part, length, what it covers, a watch link. */
export function LessonLedger({ course }: { course: Course }) {
  return (
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
  );
}

/**
 * The teacher, as the homepage's "Who writes it" block. The bio is the
 * homepage's own (NewsletterHomePage), so the two never disagree.
 */
export function TeacherBlock({ course }: { course: Course }) {
  return (
    <div className="nl-author">
      <div className="nl-author-photo">
        <Image src="/images/zev-uhuru.png" alt={course.author.name} width={144} height={144} />
      </div>
      <div>
        <p className="nl-eyebrow">Who teaches it</p>
        <h2 className="nl-title">{course.author.name}</h2>
        <p className="nl-lede">
          I spent a decade shipping production web products, from fuboTV&apos;s streaming apps to Vroom&apos;s online
          car storefront. Now I build Esy and the businesses that run on it. Every course comes out of that work.
        </p>
        <a href="https://www.youtube.com/@EsyDotCom" target="_blank" rel="noopener noreferrer" className="nl-inline-link">
          Watch on YouTube <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

/** Resources with real links, as quiet rows. Nothing renders without any. */
export function ResourceList({ course }: { course: Course }) {
  const resources = realResources(course);
  if (resources.length === 0) return null;
  return (
    <ul className="cd-resources">
      {resources.map((r) => (
        <li key={r.url}>
          <a href={r.url} target="_blank" rel="noopener noreferrer" className="cd-resource">
            <span className="cd-resource-title">{r.title}</span>
            <span className="cd-resource-desc">{r.description}</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
