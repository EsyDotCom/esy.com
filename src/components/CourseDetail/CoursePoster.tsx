/* A · Poster — the course page opens on the index's "Now showing" band:
 * the tilted poster, the logline, the credits and Start watching. Below it,
 * what you'll learn beside the lessons as the homepage's ledger, then the
 * teacher, the resources, and the weekly email.
 */
import type { Course } from '@/lib/learn/types';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { NowShowingBand } from '@/components/CoursesIndex/CoursesNowShowing';
import { LearnList, LessonLedger, ResourceList, TeacherBlock, courseNumber, realResources } from './shared';

export default function CoursePoster({ course }: { course: Course }) {
  return (
    <>
      <NowShowingBand course={course} n={Number(courseNumber(course))} as="h1" onCoursePage />

      {/* What you'll learn on the left, every lesson on the right. */}
      <section className="nl-section" aria-labelledby="cd-learn-title">
        <div className="nl-container nl-where-grid">
          <div className="nl-work-head">
            <p className="nl-eyebrow">The course</p>
            <h2 className="nl-title" id="cd-learn-title">What you&apos;ll learn</h2>
            <LearnList course={course} />
          </div>
          <LessonLedger course={course} />
        </div>
      </section>

      <section className="nl-section nl-section--alt" aria-label="Who teaches it">
        <div className="nl-container">
          <TeacherBlock course={course} />
        </div>
      </section>

      {realResources(course).length > 0 && (
        <section className="nl-section" aria-labelledby="cd-res-title">
          <div className="nl-container">
            <h2 className="nl-title" id="cd-res-title">Resources</h2>
            <ResourceList course={course} />
          </div>
        </section>
      )}

      <WeeklyEmailBand />
    </>
  );
}
