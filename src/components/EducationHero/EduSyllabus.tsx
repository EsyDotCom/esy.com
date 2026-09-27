'use client';

/* Education hero B · Syllabus: esy.com as a course you take one email at a time.
 *
 * The promise, the signup, and the teacher sit on the left. On the right, the
 * curriculum card: four desks as tabs, each listing what's been taught and
 * what's coming. The tabs play through on their own so the whole range shows
 * without a click, and any click hands control to the visitor. */

import { useEffect, useState } from 'react';
import type { ResolvedDesk } from './desks';
import { Byline, ChannelLine, EduSignup, LessonRow } from './shared';

const STEP_MS = 5200;

export default function EduSyllabus({ desks }: { desks: ResolvedDesk[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  // Autoplay through the desks until the visitor takes over. Reduced motion
  // starts on the first desk and stays there.
  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % desks.length), STEP_MS);
    return () => window.clearTimeout(t);
  }, [active, auto, desks.length]);

  const desk = desks[active];
  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <section className="eh eh-syllabus" id="subscribe">
      <div className="nl-container eh-split">
        {/* ── Left: the category, the promise, the ask, the teacher ────── */}
        <div className="eh-split-copy">
          <p className="eh-kicker">Marketing Engineering, taught in public</p>
          <h1 className="eh-h1 eh-h1--left">
            Marketing Engineering for <em>the AI era</em>.
          </h1>
          <p className="eh-sub eh-sub--left">
            AI is changing how marketing gets done. Learn to build the systems behind that change: agents, SEO
            pipelines, AI coding tools, and the integrations between them.
          </p>
          <EduSignup />
          <Byline />
        </div>

        {/* ── Right: the curriculum, one desk at a time ─────────────────── */}
        <div className="eh-card" onPointerDown={() => setAuto(false)}>
          <div className="eh-card-head">
            <span className="eh-card-label">The curriculum</span>
            <div className="eh-tabs" role="tablist" aria-label="Desks">
              {desks.map((d, i) => (
                <button
                  key={d.key}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className="eh-tab"
                  onClick={() => pick(i)}
                >
                  {d.name}
                  {/* The running bar shows the autoplay's clock on the live tab. */}
                  {auto && i === active && (
                    <span className="eh-tab-clock" style={{ animationDuration: `${STEP_MS}ms` }} aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="eh-card-body" role="tabpanel" key={desk.key}>
            <p className="eh-card-line">{desk.line}</p>
            <div className="eh-chips">
              {desk.subjects.map((s) => (
                <span key={s} className="eh-chip">
                  {s}
                </span>
              ))}
            </div>
            <ul className="eh-lessons eh-lessons--card">
              {desk.lessons.map((lesson) => (
                <LessonRow key={lesson.title} lesson={lesson} />
              ))}
            </ul>
          </div>

          <div className="eh-card-foot">
            <span>
              {desk.publishedCount > 0
                ? `${desk.publishedCount} published on ${desk.name} · more every week`
                : `${desk.name} opens with the next issues`}
            </span>
            <ChannelLine />
          </div>
        </div>
      </div>
    </section>
  );
}
