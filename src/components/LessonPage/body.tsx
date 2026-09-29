/* The lesson page below the player: the notes and what comes next. Round 3
 * of /prototypes/lesson/ keeps E's stage and varies this part:
 *
 *   F · Guide    — the notes with a sticky "In this lesson" rail made from
 *                  their own headings; a full-width navy "Up next" band.
 *   G · Kit      — the notes beside a sticky "Lesson kit": up next at the top,
 *                  what the lesson covers, and its real resources.
 *   H · End card — the notes centred, opening on a "What you'll learn" list,
 *                  ending on a big next-lesson card with the cover and the
 *                  rest of the course.
 */
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Play } from 'lucide-react';
import type { Course, Lesson } from '@/lib/learn/types';
import { splitSections, type ArticleSection } from '@/components/ArticleImage/article';
import ArticleNav from '@/components/ArticleImage/ArticleNav';
import { ArticleBody } from '@/components/ArticleImage/shared';
import { COURSE_ART } from '@/components/CoursesIndex/covers';
import { courseHref, lessonHref, lessonsOf } from '@/components/CoursesIndex/shared';
import { getAdjacentLessons } from '@/lib/learn/mockData';

/**
 * The notes as sections. The notes open with a `##` that repeats the lesson
 * title, so it goes, and their `###` subsections become the sections a
 * contents rail can list. Timestamps keep their colons (remark-directive
 * reads ":45" in "0:45" as a directive).
 */
export function noteSections(lesson: Lesson): ArticleSection[] {
  const md = (lesson.commentary?.markdown ?? '')
    .trim()
    .replace(/^## .*\n+/, '')
    .replace(/^### /gm, '## ')
    .replace(/(\d):(\d)/g, '$1\\:$2');
  return md ? splitSections(md) : [];
}

/** What the lesson covers: the labelled moments in its notes. */
function coveredPoints(lesson: Lesson): string[] {
  return (lesson.commentary?.timestampRefs ?? []).map((r) => r.label);
}

/** The lesson's resources with real links; '#' placeholders never render. */
function realLinks(lesson: Lesson) {
  return (lesson.commentary?.resources ?? []).filter((r) => r.url && r.url !== '#');
}

/** "Lesson 2 of 3" for any lesson. */
function position(course: Course, lesson: Lesson) {
  const all = lessonsOf(course);
  return `Lesson ${all.findIndex((l) => l.slug === lesson.slug) + 1} of ${all.length}`;
}

/* ── F · Guide ─────────────────────────────────────────────────────────── */

export function BodyGuide({ course, lesson }: { course: Course; lesson: Lesson }) {
  const sections = noteSections(lesson);
  const { prev, next } = getAdjacentLessons(course, lesson.slug);
  return (
    <div className="lp-body lp-body-guide">
      <div className="ai-guide-grid lp-body-grid">
        <ArticleNav sections={sections} bodySelector=".lp-body-guide .ai-body" label="In this lesson" />
        <div className="ai-guide-main">
          <p className="ai-dek lp-body-dek">{lesson.description}</p>
          <ArticleBody sections={sections} />
        </div>
      </div>

      {/* Up next, as the page's closing band. */}
      <section className="lp-nextband">
        <div className="lp-nextband-inner">
          {next ? (
            <Link href={lessonHref(course, next)} className="lp-nextband-main">
              <span className="lp-nextband-label">Up next · {position(course, next)} · {next.durationLabel}</span>
              <span className="lp-nextband-title">{next.title}</span>
              <span className="lp-nextband-desc">{next.description}</span>
              <span className="lp-nextband-go">
                <Play size={14} fill="currentColor" aria-hidden="true" /> Watch next
              </span>
            </Link>
          ) : (
            <Link href={courseHref(course)} className="lp-nextband-main">
              <span className="lp-nextband-label">You finished the course</span>
              <span className="lp-nextband-title">Back to {course.title}</span>
            </Link>
          )}
          <div className="lp-nextband-side">
            {prev && (
              <Link href={lessonHref(course, prev)} className="lp-nextband-link">
                <ArrowLeft size={14} aria-hidden="true" /> {prev.title}
              </Link>
            )}
            <Link href={courseHref(course)} className="lp-nextband-link">
              All lessons <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── G · Kit ───────────────────────────────────────────────────────────── */

export function BodyKit({ course, lesson }: { course: Course; lesson: Lesson }) {
  const sections = noteSections(lesson);
  const { prev, next } = getAdjacentLessons(course, lesson.slug);
  const points = coveredPoints(lesson);
  const links = realLinks(lesson);
  return (
    <div className="lp-body lp-body-kit">
      <div className="lp-kit-grid">
        <div className="lp-kit-main">
          <p className="ai-dek lp-body-dek">{lesson.description}</p>
          <ArticleBody sections={sections} />
        </div>

        {/* The kit: the next click first, then what this lesson covered and where to go deeper. */}
        <aside className="lp-kit">
          {next && (
            <Link href={lessonHref(course, next)} className="lp-kit-next">
              <span className="lp-kit-label">Up next · {next.durationLabel}</span>
              <span className="lp-kit-next-title">{next.title}</span>
              <span className="lp-kit-go">
                <Play size={12} fill="currentColor" aria-hidden="true" /> Watch next
              </span>
            </Link>
          )}
          {points.length > 0 && (
            <div className="lp-kit-block">
              <p className="lp-kit-label lp-kit-label--ink">In this lesson</p>
              <ul className="lp-kit-points">
                {points.map((p) => (
                  <li key={p}>
                    <Check size={13} strokeWidth={3} aria-hidden="true" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {links.length > 0 && (
            <div className="lp-kit-block">
              <p className="lp-kit-label lp-kit-label--ink">Resources</p>
              {links.map((r) => (
                <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" className="lp-kit-res">
                  {r.title} <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </aside>
      </div>

      {/* A slim bar to close: back, the course, next. */}
      <nav className="lp-slimbar" aria-label="Lesson navigation">
        {prev ? (
          <Link href={lessonHref(course, prev)} className="lp-slimbar-link">
            <ArrowLeft size={14} aria-hidden="true" /> {prev.title}
          </Link>
        ) : (
          <Link href={courseHref(course)} className="lp-slimbar-link">
            <ArrowLeft size={14} aria-hidden="true" /> The course
          </Link>
        )}
        <span className="lp-slimbar-pos">{position(course, lesson)}</span>
        {next ? (
          <Link href={lessonHref(course, next)} className="lp-slimbar-link lp-slimbar-next">
            Next: {next.title} <ArrowRight size={14} aria-hidden="true" />
          </Link>
        ) : (
          <Link href={courseHref(course)} className="lp-slimbar-link lp-slimbar-next">
            Finish <ArrowRight size={14} aria-hidden="true" />
          </Link>
        )}
      </nav>
    </div>
  );
}

/* ── H · End card ──────────────────────────────────────────────────────── */

export function BodyEndCard({ course, lesson }: { course: Course; lesson: Lesson }) {
  const sections = noteSections(lesson);
  const { next } = getAdjacentLessons(course, lesson.slug);
  const points = coveredPoints(lesson);
  const all = lessonsOf(course);
  const here = all.findIndex((l) => l.slug === lesson.slug);
  const rest = all.slice(here + 2); // after the next one, which gets the card
  const art = COURSE_ART[course.slug];
  return (
    <div className="lp-body lp-body-end">
      <div className="ai-col">
        {/* What you'll learn, before the notes. */}
        {points.length > 0 && (
          <div className="lp-learn">
            <p className="lp-learn-title">What you&apos;ll learn</p>
            <ul>
              {points.map((p) => (
                <li key={p}>
                  <span aria-hidden="true"><Check size={13} strokeWidth={3} /></span> {p}
                </li>
              ))}
            </ul>
          </div>
        )}
        {sections.length > 0 ? (
          <ArticleBody sections={sections} />
        ) : (
          // A placeholder, not a gap, while a lesson's notes are still being written.
          <p className="lp-placeholder">Notes for this lesson are on the way.</p>
        )}
      </div>

      {/* The end card: the next lesson big, then the rest of the course. */}
      <section className="lp-endcard-wrap">
        <div className="lp-endcard">
          {next ? (
            <Link href={lessonHref(course, next)} className="lp-endcard-next">
              {art && (
                // eslint-disable-next-line @next/next/no-img-element -- the generated cover, fixed size
                <img src={art.wide} alt="" width={640} height={360} className="lp-endcard-img" />
              )}
              <span className="lp-endcard-body">
                <span className="lp-endcard-label">Up next · {position(course, next)}</span>
                <span className="lp-endcard-title">{next.title}</span>
                <span className="lp-endcard-desc">{next.description}</span>
                <span className="lp-endcard-go">
                  <Play size={14} fill="currentColor" aria-hidden="true" /> Watch next · {next.durationLabel}
                </span>
              </span>
            </Link>
          ) : (
            // The last lesson: a finish, not a dead end.
            <Link href="/courses/" className="lp-endcard-next lp-endcard-next--done">
              <span className="lp-endcard-body">
                <span className="lp-endcard-label">You finished the course</span>
                <span className="lp-endcard-title">{course.title}</span>
                <span className="lp-endcard-desc">
                  That&apos;s every lesson. The next course goes out in the weekly email first.
                </span>
                <span className="lp-endcard-go">
                  All courses <ArrowRight size={15} aria-hidden="true" />
                </span>
              </span>
            </Link>
          )}

          {rest.length > 0 && (
            <div className="lp-endcard-rest">
              <p className="lp-endcard-rest-title">Continue the course</p>
              <ol>
                {rest.map((l) => (
                  <li key={l.slug}>
                    <Link href={lessonHref(course, l)}>
                      <span className="lp-endcard-n">{l.order}</span>
                      <span>{l.title}</span>
                      <em>{l.durationLabel}</em>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {next && (
            <Link href={courseHref(course)} className="lp-endcard-back">
              <ArrowLeft size={14} aria-hidden="true" /> {course.title}
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
