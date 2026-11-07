'use client';
/* "Eight jobs, one system", three ways (2026-11-07, round 3 of /prototypes/marketing-engineer/).
 * Zev: D's section was everywhere (Mason, chips, a readout, skills and a proof strip at once). Each
 * take says one thing, with Mason doing the showing: every arm does one job, and you keep the decision.
 * Skills and the AI Marketing News strip leave the section (skills are in the FAQ now).
 *   spotlight  E · Spotlight  Mason alone in the centre; the arms light one at a time on their own, and
 *                             one line under him says what that arm does and what you decide. A quiet
 *                             row of the eight names lets you pick; picking stops the tour.
 *   sentence   F · Sentence   One serif sentence carries the whole idea: "Mason researches, writes,
 *                             checks… You decide." Each verb lights its arm as you rest on it.
 *   roll       G · Roll call  Mason holds still while eight short rows scroll past, each lighting its
 *                             arm in turn, and a ninth row, you, closes it. */
import { useEffect, useRef, useState } from 'react';
import { MasonJobs } from './MasonJobs';
import { JOBS, type JobId } from './content';

export type JobsTake = 'spotlight' | 'sentence' | 'roll';

function Head({ center = false }: { center?: boolean }) {
  return (
    <div className={`mj3-head ${center ? 'is-center' : ''}`}>
      <p className="me-kicker">What a marketing engineer does</p>
      <h2 className="me-h2">Eight jobs, <em>one system.</em></h2>
    </div>
  );
}

// ── E · Spotlight ───────────────────────────────────────────────────────────────────────

function Spotlight() {
  const [i, setI] = useState(0);
  const [touring, setTouring] = useState(true);
  // The tour: one arm every 2.6s, until the reader picks one (or asks for less motion).
  useEffect(() => {
    if (!touring || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % JOBS.length), 2600);
    return () => clearInterval(t);
  }, [touring]);
  const job = JOBS[i];
  const pick = (id: JobId) => { setTouring(false); setI(JOBS.findIndex((j) => j.id === id)); };
  return (
    <div className="mj3 mj3--spotlight">
      <Head center />
      <div className="mj3-spot-stage"><MasonJobs lit={job.id} labels={false} /></div>
      <p className="mj3-spot-line" aria-live="polite" key={job.id}>
        <b>{job.name}.</b> {job.system} <span>You {job.you.charAt(0).toLowerCase() + job.you.slice(1)}.</span>
      </p>
      <div className="mj3-spot-names" role="tablist" aria-label="The eight jobs">
        {JOBS.map((j, n) => (
          <button key={j.id} type="button" role="tab" aria-selected={n === i} className={n === i ? 'is-on' : ''} onClick={() => pick(j.id)}>
            {j.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── F · Sentence ────────────────────────────────────────────────────────────────────────

function Sentence() {
  const [lit, setLit] = useState<JobId | undefined>(undefined);
  return (
    <div className="mj3 mj3--sentence">
      <div className="mj3-sent-text">
        <Head />
        <p className="mj3-sent">
          Mason{' '}
          {JOBS.map((j, n) => (
            <span key={j.id}>
              <button
                type="button"
                className={lit === j.id ? 'is-on' : ''}
                onMouseEnter={() => setLit(j.id)}
                onFocus={() => setLit(j.id)}
                onClick={() => setLit(j.id)}
              >
                {j.verb}
              </button>
              {n < JOBS.length - 2 ? ', ' : n === JOBS.length - 2 ? ' and ' : '. '}
            </span>
          ))}
          <em>You decide what goes out.</em>
        </p>
        <p className="mj3-sent-sub" aria-live="polite">
          {lit ? <><b>{JOBS.find((j) => j.id === lit)!.name}:</b> {JOBS.find((j) => j.id === lit)!.system}</> : 'Rest on a job to see what that arm does.'}
        </p>
      </div>
      <div className="mj3-sent-stage" onMouseLeave={() => setLit(undefined)}>
        <MasonJobs lit={lit} labels={false} />
      </div>
    </div>
  );
}

// ── G · Roll call ───────────────────────────────────────────────────────────────────────

function Roll() {
  const [at, setAt] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  // The row crossing the middle of the screen lights its arm; the ninth row (you) lights none.
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setAt(Number((e.target as HTMLElement).dataset.i)); }),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  const lit = at < JOBS.length ? JOBS[at].id : undefined;
  return (
    <div className="mj3 mj3--roll">
      <div className="mj3-roll-stage">
        <Head />
        <MasonJobs lit={lit} labels={false} />
      </div>
      <ol className="mj3-roll">
        {JOBS.map((j, n) => (
          <li key={j.id} ref={(el) => { rows.current[n] = el; }} data-i={n} className={n === at ? 'is-on' : ''}>
            <span className="mj3-roll-n">{n + 1}</span>
            <div><b>{j.name}</b><p>{j.system}</p></div>
          </li>
        ))}
        <li ref={(el) => { rows.current[JOBS.length] = el; }} data-i={JOBS.length} className={`is-you ${at === JOBS.length ? 'is-on' : ''}`}>
          <span className="mj3-roll-n">+1</span>
          <div><b>You</b><p>Pick the story, read the flags, press send. Nothing goes out without you.</p></div>
        </li>
      </ol>
    </div>
  );
}

export function JobsSection({ take }: { take: JobsTake }) {
  return (
    <section className={`mc-jobs mc-jobs--${take}`}>
      <div className="me-wrap">
        {take === 'spotlight' ? <Spotlight /> : take === 'sentence' ? <Sentence /> : <Roll />}
      </div>
    </section>
  );
}
