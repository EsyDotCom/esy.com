/* Three heroes for /courses with a short intro video (2026-09-29, at
 * /prototypes/courses-hero/). Each replaces G's masthead and keeps the
 * poster spotlight under it:
 *
 *   A · Split     — the promise and signup on the left, the intro framed on
 *                   the right.
 *   B · Screening — the centred masthead, then the intro playing large in the
 *                   lesson page's dark room.
 *   C · Pill      — the centred masthead unchanged, with a small "Watch the
 *                   intro" thumbnail that opens a lightbox.
 */
import type { Course } from '@/lib/learn/types';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';
import { StatsLine } from './shared';
import { IntroPill, IntroPlayer, IntroSampleNote } from './IntroVideo';
import { INTRO_VIDEO } from './intro';

const SIGNUP_NOTE = 'New courses go out in the weekly email first';

/** The promise, as the masthead says it. */
function CoursesPromise() {
  return (
    <p className="nl-promise">
      Learn to build the AI systems that run marketing, <span className="nl-promise-accent">one lesson at a time</span>.
    </p>
  );
}

/* ── A · Split ── */
export function HeroSplit({ courses }: { courses: Course[] }) {
  return (
    <section className="civ-split">
      <div className="nl-container civ-split-grid">
        <div className="civ-split-copy">
          <p className="nl-kicker">The Marketing Engineer</p>
          <h1 className="nl-masthead civ-split-title">Courses</h1>
          <CoursesPromise />
          <NewsletterSignup note={SIGNUP_NOTE} />
          <StatsLine courses={courses} className="civ-stats" />
        </div>
        <figure className="civ-split-video">
          <IntroPlayer className="civ-player--framed" />
          <figcaption>
            <b>What the courses are</b>, in {INTRO_VIDEO.duration}.
          </figcaption>
          <IntroSampleNote />
        </figure>
      </div>
    </section>
  );
}

/* ── B · Screening ── */
export function HeroScreening({ courses }: { courses: Course[] }) {
  return (
    <>
      <section className="nl-hero civ-screening-top">
        <div className="nl-container nl-hero-inner">
          <p className="nl-kicker">The Marketing Engineer</p>
          <h1 className="nl-masthead">Courses</h1>
          <CoursesPromise />
          <NewsletterSignup note={SIGNUP_NOTE} />
          <StatsLine courses={courses} className="ci-stats--center" />
        </div>
      </section>
      <section className="civ-room" aria-label="The courses intro">
        <div className="civ-room-inner">
          <p className="civ-room-label">Watch the {INTRO_VIDEO.duration} intro</p>
          <IntroPlayer className="civ-player--ring" />
          <IntroSampleNote onDark />
        </div>
      </section>
    </>
  );
}

/* ── C · Pill ── */
export function HeroPill({ courses }: { courses: Course[] }) {
  return (
    <section className="nl-hero">
      <div className="nl-container nl-hero-inner">
        <p className="nl-kicker">The Marketing Engineer</p>
        <h1 className="nl-masthead">Courses</h1>
        <CoursesPromise />
        <IntroPill />
        <NewsletterSignup note={SIGNUP_NOTE} />
        <StatsLine courses={courses} className="ci-stats--center" />
      </div>
    </section>
  );
}
