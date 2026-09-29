/* H · G + E's sections — G's masthead (signup on the first screen) and F's
 * poster spotlight for the newest course, which counts as 01. Every other
 * course, live or coming, follows as E's numbered section (02, 03…) with its
 * lessons as a ledger, so the page grows one section per course. The chip row
 * under each head includes 01 and jumps back up to the spotlight.
 */
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { CoursesMastheadHero } from './CoursesMasthead';
import { NowShowingBand } from './CoursesNowShowing';
import { CourseSection, UpcomingSection, chipLabels } from './CoursesNumbered';
import { newestFirst, type CoursesIndexProps } from './shared';

export default function CoursesMastheadSections({ courses, upcoming }: CoursesIndexProps) {
  // The newest course leads as 01; the rest keep catalog order after it.
  const [lead] = newestFirst(courses);
  const ordered = lead ? [lead, ...courses.filter((c) => c !== lead)] : courses;
  const labels = chipLabels(ordered, upcoming);

  return (
    <>
      <CoursesMastheadHero courses={courses} />

      {/* 01: the spotlight, anchored so the chips can jump back to it. */}
      {lead && (
        <div id="course-1" className="ci-where">
          <NowShowingBand course={lead} n={1} />
        </div>
      )}

      {/* 02 onward: E's numbered sections. */}
      {ordered.slice(1).map((course, j) => (
        <CourseSection key={course.slug} course={course} i={j + 1} labels={labels} />
      ))}
      {upcoming.map((u, j) => (
        <UpcomingSection key={u.title} course={u} i={ordered.length + j} labels={labels} />
      ))}

      <div id="subscribe">
        <WeeklyEmailBand />
      </div>
    </>
  );
}
