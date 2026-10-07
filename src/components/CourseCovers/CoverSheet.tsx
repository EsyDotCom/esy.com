/* The sheet under each cover take: the 16:9 cover in the real lesson end
 * card (LessonPage's markup and styles, with the course's real next lesson),
 * today's two covers to compare, and a switch between the course page and
 * the courses index, the two places the poster shows. */

import Link from 'next/link';
import { Play } from 'lucide-react';
import type { Course } from '@/lib/learn/types';
import { lessonsOf } from '@/components/CoursesIndex/shared';
import { COURSE_ART } from '@/components/CoursesIndex/covers';
import { CourseCoverArt } from './covers';
import type { CoverTake } from './takes';

export default function CoverSheet({ take, course, slug, on }: { take: CoverTake; course: Course; slug: string; on: 'course' | 'index' }) {
  const lessons = lessonsOf(course);
  const next = lessons[1] ?? lessons[0];
  const today = COURSE_ART[course.slug];
  return (
    <section className="cc-sheet" id="cover" aria-labelledby="cc-sheet-title">
      <div className="nl-container">
        <div className="cc-sheet-head">
          <div>
            <p className="nl-eyebrow">Prototype · the course cover</p>
            <h2 className="nl-title" id="cc-sheet-title">{take.key} · {take.name}</h2>
            <p className="nl-lede">{take.idea}</p>
          </div>
          {/* The poster shows in two places; see it in either. */}
          <nav className="cc-toggle" aria-label="Where the poster shows">
            <Link href={`/prototypes/course-cover/${slug}/`} aria-current={on === 'course' ? 'page' : undefined}>The course page</Link>
            <Link href={`/prototypes/course-cover/${slug}/?on=index`} aria-current={on === 'index' ? 'page' : undefined}>/courses</Link>
          </nav>
        </div>

        <div className="cc-sheet-grid">
          <div>
            <p className="cc-label">The wide cover, on a lesson’s end card</p>
            {next && (
              <div className="lp-endcard-wrap">
                <div className="lp-endcard">
                  <Link href={`/courses/${course.slug}/`} className="lp-endcard-next">
                    <span className="cc-frame">
                      <CourseCoverArt cover={take.cover} format="wide" lessons={lessons.length} />
                    </span>
                    <span className="lp-endcard-body">
                      <span className="lp-endcard-label">Up next · Lesson 2</span>
                      <span className="lp-endcard-title">{next.title}</span>
                      <span className="lp-endcard-desc">{next.description}</span>
                      <span className="lp-endcard-go">
                        <Play size={14} fill="currentColor" aria-hidden="true" /> Watch next · {next.durationLabel}
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div>
            <p className="cc-label">Today’s covers</p>
            {today && (
              // eslint-disable-next-line @next/next/no-img-element -- today's generated cover, for comparison
              <img src={today.wide} alt={today.alt} width={640} height={360} style={{ width: '100%', height: 'auto', borderRadius: 12, display: 'block' }} />
            )}
          </div>
        </div>

        <p className="cc-note">
          Prototype. Mason is the real figure from the footer, and the course, its lessons and the band are the live
          ones. Only the cover art changes; nothing here is live yet.
        </p>
      </div>
    </section>
  );
}
