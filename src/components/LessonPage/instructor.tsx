/* Round 4 (2026-10-11): the instructor on the lesson page. Zev's photo is the
 * hero byline's SocialAvatar, so it pops and opens his profile card wherever
 * it sits.
 *   I · Byline — under the lesson title, like an article byline
 *   J · Rail   — a card at the top of the rail, above the playlist
 *   K · End    — the course page's "Who teaches it" after the notes (TeacherBlock)
 */
import SocialAvatar from '@/components/EducationHero/SocialAvatar';
import type { Course } from '@/lib/learn/types';

/** I · a byline under the title: the photo, "Taught by", the name and role. */
export function InstructorByline({ course }: { course: Course }) {
  return (
    <div className="lp-ins-byline">
      <SocialAvatar frameClassName="lp-ins-photo lp-ins-photo--byline" size={44} />
      <p>
        <span>Taught by</span>
        <b>{course.author.name}</b>
        <span className="lp-ins-role">Marketing engineer</span>
      </p>
    </div>
  );
}

/** J · a card at the top of the rail: who's teaching, before what's in the course. */
export function InstructorRailCard({ course }: { course: Course }) {
  return (
    <div className="lp-ins-card">
      <SocialAvatar frameClassName="lp-ins-photo lp-ins-photo--rail" size={56} />
      <p>
        <span className="lp-ins-label">Your instructor</span>
        <b>{course.author.name}</b>
        <span className="lp-ins-role">Marketing engineer</span>
      </p>
    </div>
  );
}
