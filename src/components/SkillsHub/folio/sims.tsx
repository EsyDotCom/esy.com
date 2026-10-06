'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import { SKILLS, skill, type Job } from '../skills';

// ───────────────────────────────────────────────────────────────────────────
// Round 4 of /skills (2026-10-06): E's page with three better simulators. The
// round-2 replay confused people: a terminal and a card said the same thing,
// the payoff was a sentence about the result instead of the result, and the
// chapters moved faster than anyone reads. Every simulator here follows the
// same rules: no terminal, plain words, the actual work on screen, and one idea
// at a time. They tour the same four jobs.
//
//   H · Chat         — a chat window: you ask, a "Using /skill" chip appears,
//                      and the work builds beside the chat.
//   I · Without/with — the same ask answered twice: generic on the left, with
//                      the skill on the right. No process to follow.
//   J · Three panels — You ask → It picks a skill → You get the work, all on
//                      screen at once; a highlight walks across.
//
// /prototyping is real; the other three skills are samples, and say so.
// ───────────────────────────────────────────────────────────────────────────

type Sim = {
  job: Job; label: string; slug: string; ask: string;
  /** The words in the skill's description that matched the ask. */
  match: string;
  reply: string;
  without: { text: string; flags: string[] };
  checks: string[];
};

export const SIMS: Sim[] = [
  {
    job: 'research', label: 'Research', slug: 'researching-markets',
    ask: 'What do roofers in Texas search for after a hailstorm?',
    match: 'market … what the market looks like',
    reply: 'Here’s the brief: three search patterns, every claim sourced.',
    without: { text: 'Homeowners typically search for “roof repair near me” and “hail damage.” Studies show 87% of homeowners call the first roofer they find online.', flags: ['“87%” has no source', 'True of any city, any year'] },
    checks: ['Every claim links to its source', 'Vendor numbers labelled as vendor numbers', 'Texas, after storms, not “homeowners”'],
  },
  {
    job: 'pages', label: 'Pages & SEO', slug: 'writing-service-pages',
    ask: 'Make Bluebonnet Roofing a page for Georgetown.',
    match: 'pages for a local business … town-by-town',
    reply: 'Here’s the Georgetown page, built from their reviews.',
    without: { text: 'Welcome to Bluebonnet Roofing, Georgetown’s #1 trusted roofing company! With years of experience, we provide top-quality roofing services at affordable prices.', flags: ['“#1” is made up', 'Could be any roofer'] },
    checks: ['Quotes four real Georgetown reviews', 'Lists the services those reviews mention', 'Nothing invented: no “#1”, no fake years'],
  },
  {
    job: 'outreach', label: 'Outreach', slug: 'finding-decision-makers',
    ask: 'Who should I write to at Trinity Peak Roofing?',
    match: 'people who decide … a lawful way to reach each',
    reply: 'Two people, with where each fact came from.',
    without: { text: 'Try info@trinitypeak.com or guess the owner’s email: firstname@trinitypeak.com is a common pattern.', flags: ['A shared inbox, not a person', 'A guessed address can break CAN-SPAM'] },
    checks: ['The owner and office manager, from their team page', 'Email checked before anything is sent', 'Why now: a new Weatherford yard on Sep 20'],
  },
  {
    job: 'build', label: 'Build', slug: 'prototyping',
    ask: 'Give me a few versions of the outreach page.',
    match: 'prototypes … “a few versions” of a page',
    reply: 'Three working versions, with a picker to flip between them.',
    without: { text: 'Here are three layout ideas: 1. A dashboard with cards. 2. A table view. 3. A kanban board. Let me know which you prefer!', flags: ['Ideas, not working pages', 'Nothing you can click'] },
    checks: ['Three working pages in your app’s own look', 'Sample data in one file, labelled', 'Checked in a browser before it reported'],
  },
];

/** A clock for a list of equal-length steps: auto-advance and loop. It never
    stops on hover (Zev, 2026-10-06); only picking a job holds it, and
    "Play the tour" starts it again. */
function useTour(n: number, ms: number) {
  const [i, setI] = useState(0);
  const [t, setT] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setT(ms); setHeld(true); }
  }, [ms]);
  useEffect(() => {
    if (held) return;
    let raf = 0; let prev = performance.now();
    const tick = (now: number) => {
      const dt = now - prev; prev = now;
      setT((x) => {
        if (x + dt < ms) return x + dt;
        setI((k) => (k + 1) % n);
        return 0;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [held, ms, n]);
  // Picking a job shows its finished state and stops the tour.
  const pick = (k: number) => { setI(k); setT(ms); setHeld(true); };
  const replay = () => { setT(0); setHeld(false); };
  return { i, f: Math.min(1, t / ms), held, pick, replay };
}

function JobTabs({ i, f, held, pick, replay }: { i: number; f: number; held: boolean; pick: (k: number) => void; replay: () => void }) {
  return (
    <div className="rp-stage-top sm-top">
      <div className="fo-chapters rp-chapters" role="tablist" aria-label="Four jobs">
        {SIMS.map((s, k) => (
          <button key={s.job} role="tab" aria-selected={k === i} className={k === i ? 'is-on' : k < i ? 'is-done' : ''} onClick={() => pick(k)} style={{ ['--fill' as string]: k < i ? 1 : k === i ? f : 0 }}>
            <small>{k + 1}</small>{s.label}
          </button>
        ))}
      </div>
      {held && <button type="button" className="rp-play" onClick={replay}>↺ Play the tour</button>}
    </div>
  );
}

function SampleChip({ slug }: { slug: string }) {
  const s = skill(slug);
  return <span className={`sm-chip ${s.status === 'live' ? 'is-live' : ''}`}>{s.status === 'live' ? 'Live skill' : 'Coming soon'}</span>;
}

// ── The work itself, one per job ───────────────────────────────────────────

/** `f` (0–1) reveals the work part by part. */
export function Work({ job, f = 1 }: { job: Job; f?: number }) {
  // Parts that reveal in order carry sm-r; .is-in once the clock reaches them.
  const on = (k: number, of: number) => (f >= k / of ? 'sm-r is-in' : 'sm-r');
  if (job === 'research') {
    return (
      <div className="sm-work sm-brief">
        <p className="fo-label">Research brief · 14 sources</p>
        <h4>What Texas homeowners search after hail</h4>
        <ol>
          <li className={on(1, 4)}><b>“Hail damage roof inspection [town]”</b> rises 6× in the week after a storm <i>[1][2]</i></li>
          <li className={on(2, 4)}><b>Insurance questions</b> come next: “does insurance cover hail roof” <i>[3]</i></li>
          <li className={on(3, 4)}><b>Town names win:</b> searches name the suburb, not the metro <i>[4][5]</i></li>
        </ol>
        <p className={`sm-flag ${on(4, 4)}`}><AlertTriangle size={13} /> Two figures are vendor numbers and are marked that way.</p>
      </div>
    );
  }
  if (job === 'pages') {
    return (
      <div className="sm-work sm-page">
        <div className="sm-page-bar"><i /><i /><i /><span>bluebonnetroof.example/georgetown</span></div>
        <div className="sm-page-hero">
          <p className="fo-label">Bluebonnet Roofing</p>
          <h4>Roof repair in Georgetown, TX</h4>
          <p>Rated 4.8 by your neighbours. Hail repair, gutters and inspections, usually within the week.</p>
        </div>
        <div className={`sm-page-reviews ${on(1, 3)}`}>
          <q>Came out the day after the April storm. Honest about what needed replacing.</q>
          <q>Fixed our gutters in Sun City and cleaned up everything.</q>
        </div>
        <ul className={`sm-page-services ${on(2, 3)}`}><li>Hail repair</li><li>Inspections</li><li>Gutters</li></ul>
        <p className={`sm-page-cta ${on(3, 3)}`}>Book a free inspection</p>
      </div>
    );
  }
  if (job === 'outreach') {
    return (
      <div className="sm-work sm-dossier">
        <p className="fo-label">Trinity Peak Roofing · Fort Worth</p>
        <div className={`sm-person ${on(1, 3)}`}><b>Cole Bennett</b><span>Owner · from their team page</span><em><Check size={12} /> cole@trinitypeak.example · checked</em></div>
        <div className={`sm-person ${on(2, 3)}`}><b>Jen Bennett</b><span>Office manager · from their team page</span><em><Check size={12} /> jen@trinitypeak.example · checked</em></div>
        <p className={`sm-why ${on(3, 3)}`}><b>Why now</b> They opened a Weatherford yard on Sep 20, and Weatherford has no page.</p>
      </div>
    );
  }
  return (
    <div className="sm-work sm-takes">
      <p className="fo-label">/_agency/outreach · three takes</p>
      <div className="sm-take-row">
        {[['O1', 'Desk', 'A sign-off queue'], ['O2', 'Prospects', 'A board by stage'], ['O3', 'Campaign', 'Steps and spend']].map(([k, n, l], idx) => (
          <div key={k} className={`sm-take ${on(idx + 1, 4)}`}>
            <span className="sm-take-thumb"><i /><i /><i /></span>
            <b>{k} · {n}</b><small>{l}</small>
          </div>
        ))}
      </div>
      <p className={`sf-pill-demo sm-pill ${on(4, 4)}`}><span>Outreach</span><i className="is-on">O1 · Desk</i><i>O2</i><i>O3</i><i>+</i></p>
    </div>
  );
}

function Frame({ url, children, className = '' }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={`fo-device rp-device ${className}`}>
      <div className="fo-device-bar">
        <span className="rp-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="fo-device-url">{url}</span>
      </div>
      <div className="fo-device-screen">{children}</div>
    </div>
  );
}

// ── H · Chat ───────────────────────────────────────────────────────────────

export function SimChat() {
  const tour = useTour(SIMS.length, 7000);
  const s = SIMS[tour.i];
  const sk = skill(s.slug);
  const typed = s.ask.slice(0, Math.ceil(s.ask.length * Math.min(1, tour.f / 0.25)));
  return (
    <div className="rp-stage sm-stage">
      <JobTabs {...tour} />
      <p className="fo-beat-line rp-beat">Ask in plain words. Your agent picks the skill, and you get the work.</p>
      <Frame url="Your agent · Claude Code, Cursor or Codex">
        <div className="sm-chat">
          <div className="sm-chat-log">
            <p className="sm-msg is-you">{typed}{tour.f < 0.25 && <span className="sm-caret" />}</p>
            {tour.f >= 0.3 && <p className="sm-using"><span className="fo-live" />Using <b>{sk.command}</b><SampleChip slug={s.slug} /></p>}
            {tour.f >= 0.45 && <p className="sm-msg">{s.reply}</p>}
          </div>
          <div className="sm-chat-work">{tour.f >= 0.45 ? <Work job={s.job} f={(tour.f - 0.45) / 0.45} /> : <p className="sm-empty">The work appears here.</p>}</div>
        </div>
      </Frame>
    </div>
  );
}

// ── I · Without vs with ────────────────────────────────────────────────────

export function SimCompare() {
  const tour = useTour(SIMS.length, 9000);
  const s = SIMS[tour.i];
  const sk = skill(s.slug);
  return (
    <div className="rp-stage sm-stage">
      <JobTabs {...tour} />
      <p className="sm-ask-bar"><span>The same ask</span>“{s.ask}”</p>
      <div className="sm-compare">
        <div className="sm-side is-without">
          <p className="fo-label">Without a skill</p>
          <p className="sm-generic">{s.without.text}</p>
          <ul>{s.without.flags.map((x) => <li key={x}><AlertTriangle size={13} />{x}</li>)}</ul>
        </div>
        <div className={`sm-side is-with ${tour.f > 0.2 ? 'is-in' : ''}`}>
          <p className="fo-label">With <b>{sk.command}</b> <SampleChip slug={s.slug} /></p>
          <Work job={s.job} f={Math.max(0, (tour.f - 0.2) / 0.5)} />
          <ul>{s.checks.map((x) => <li key={x}><Check size={13} />{x}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

// ── J · Three panels ───────────────────────────────────────────────────────

export function SimPanels() {
  const tour = useTour(SIMS.length, 8000);
  const s = SIMS[tour.i];
  const step = tour.f < 0.25 ? 0 : tour.f < 0.5 ? 1 : 2;
  return (
    <div className="rp-stage sm-stage">
      <JobTabs {...tour} />
      <ol className="sm-panels">
        <li className={step === 0 ? 'is-on' : 'is-done'}>
          <p className="sm-n"><span>1</span>You ask</p>
          <p className="sm-msg is-you">{s.ask}</p>
          <p className="sm-hint">Plain words. No command to remember.</p>
        </li>
        <li className={step === 1 ? 'is-on' : step > 1 ? 'is-done' : ''}>
          <p className="sm-n"><span>2</span>It picks a skill</p>
          <ul className="sm-pick">
            {SIMS.map((x) => {
              const k = skill(x.slug);
              const chosen = x.slug === s.slug && step >= 1;
              return <li key={x.slug} className={chosen ? 'is-chosen' : step >= 1 ? 'is-dim' : ''}><code>{k.command}</code>{chosen && <small>matched: {x.match}</small>}</li>;
            })}
          </ul>
          <p className="sm-hint">It reads each skill’s one-line label and opens the one that fits. <SampleChip slug={s.slug} /></p>
        </li>
        <li className={step === 2 ? 'is-on' : ''}>
          <p className="sm-n"><span>3</span>You get the work</p>
          {step === 2 ? <Work job={s.job} f={(tour.f - 0.5) / 0.4} /> : <p className="sm-empty">…</p>}
        </li>
      </ol>
      <p className="rp-caption">{SKILLS.filter((x) => x.status === 'live').length} skill is live today; the others in this tour are samples of what’s coming.</p>
    </div>
  );
}
