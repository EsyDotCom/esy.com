'use client';

import { JOBS, SKILLS, SKILL_MD, skill, type Job } from '../skills';
import { Bar, Close, Cmd, Course, Find, Hero, Shelf, Stage, Term, Zev, useShelf, type Chapter } from './parts';
import { SimChat, SimCompare, SimPanels } from './sims';
import './sims.css';

// ───────────────────────────────────────────────────────────────────────────
// /skills round 2 (2026-10-06): three takes in Folio with docs.esy.com's top —
// a navy hero, the headline's second line in jade italic, and a replay in a
// device under it. Zev appears small, never the homepage's big portrait.
//
//   D · Replay   — docs' own shape: search right, then one skill (/prototyping)
//                  replayed from the ask to the finished work.
//   E · Tour     — the email course right (the capture up top), and the replay
//                  tours four jobs: ask, the skill it picks, what comes back.
//   F · Anatomy  — Zev narrates; the replay walks a real SKILL.md, part by
//                  part, with what each part does beside it.
//
// Under the fold all three share the shelf and the course band. /prototyping
// is real; the other skills are labelled samples (../skills.ts).
// ───────────────────────────────────────────────────────────────────────────

export type FolioVariant = 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j';

function Frame({ hero, src, barSearch = false }: { hero: (find: (q: string) => void) => React.ReactNode; src: string; barSearch?: boolean }) {
  const { q, setQ, ref, find } = useShelf();
  return (
    <div className="folio sf-app">
      <Bar onFind={barSearch ? find : undefined} />
      {hero(find)}
      <Shelf q={q} setQ={setQ} shelfRef={ref} />
      <Close src={src} />
    </div>
  );
}

// ── D · Replay: one skill, from the ask to the work ────────────────────────

const D_CHAPTERS: Chapter[] = [
  { label: 'You ask', beat: 'You ask in plain words. No command, no setup.', ms: 3200 },
  { label: 'It picks the skill', beat: 'Your agent reads every skill’s label and opens the one that fits.', ms: 3800 },
  { label: 'It does the work', beat: 'It follows the skill’s steps, and checks its own work before it reports.', ms: 7000 },
  { label: 'You pick a version', beat: 'Three working versions, a picker to flip between them, and one question for you.', ms: 6000 },
];
const D_TERM = [
  { k: 'you' as const, t: 'Give me a few versions of the outreach page in /agency.' },
  { k: 'agent' as const, t: 'That matches /prototyping (“a few versions”). Reading its SKILL.md.' },
  { k: 'tool' as const, t: 'Found the convention: /_agency/<area>/[variant] with the picker.' },
  { k: 'tool' as const, t: 'Plan: O1 Desk · O2 Prospects · O3 Campaign.' },
  { k: 'tool' as const, t: 'Sample data in outreach-data.ts; every count computed from it.' },
  { k: 'tool' as const, t: 'Built three takes on the real components.' },
  { k: 'tool' as const, t: 'Typecheck ✓  lint ✓  opened every take in the browser ✓' },
  { k: 'agent' as const, t: 'Three links below. Which one, or which parts should I merge?' },
];
const D_STEPS = ['Find the repo’s convention', 'Plan three takes', 'Write the sample data', 'Build each take', 'Add the picker', 'Check it in a browser', 'Report back'];
const TAKES_MADE = [
  { key: 'O1', name: 'Desk', line: 'Outreach as its own section: a sign-off queue.' },
  { key: 'O2', name: 'Prospects', line: 'Inside Clients: a board by stage, two lanes.' },
  { key: 'O3', name: 'Campaign', line: 'A Service in Work: steps, health, spend.' },
];

function DScreen({ ch, f }: { ch: number; f: number }) {
  const shown = ch === 0 ? (f > 0.2 ? 1 : 0) : ch === 1 ? 2 : ch === 2 ? 2 + Math.ceil(f * 5) : D_TERM.length;
  const done = ch < 2 ? 0 : ch === 2 ? Math.floor(f * D_STEPS.length) : D_STEPS.length;
  const p = skill('prototyping');
  return (
    <>
      <Term title="claude · ~/os.esy.com" lines={D_TERM} shown={shown} />
      <div className="rp-run sf-panel">
        {ch < 2 && <>
          <div className="rp-run-head"><span className="fo-label">Your skills · {SKILLS.length} labels</span></div>
          <ul className="sf-labels">
            {SKILLS.slice(0, 6).map((s) => (
              <li key={s.slug} className={ch === 1 && s.slug === 'prototyping' ? 'is-on' : ch === 1 ? 'is-dim' : ''}>
                <code>{s.command}</code>
                <small>{s.slug === 'prototyping' && ch === 1 ? <>…several working takes… <mark>“a few versions”</mark> of a page…</> : s.makes}</small>
              </li>
            ))}
          </ul>
        </>}
        {ch === 2 && <>
          <div className="rp-run-head"><div><span className="fo-label">{p.command}</span><p className="rp-run-id">SKILL.md · {p.files[0].lines} lines</p></div><span className="rp-pill is-running">running</span></div>
          <ol className="rp-steps">
            {D_STEPS.map((s, i) => (
              <li key={s} className={i < done ? 'is-done' : i === done ? 'is-live' : 'is-wait'}>
                <span className="rp-step-dot" /><span className="rp-step-main"><b>{s}</b></span><span className="rp-step-num">{i < done ? '✓' : ''}</span><span />
              </li>
            ))}
          </ol>
        </>}
        {ch === 3 && <>
          <div className="rp-run-head"><div><span className="fo-label">What it made</span><p className="rp-run-id">/_agency/outreach</p></div><span className="rp-pill is-completed">done</span></div>
          <ul className="sf-made">
            {TAKES_MADE.map((t, i) => <li key={t.key} style={{ opacity: Math.min(1, f * 4 - i * 0.6 + 0.2) }}><b>{t.key} · {t.name}</b><span>{t.line}</span></li>)}
          </ul>
          <p className="sf-pill-demo"><span>Outreach</span><i className="is-on">O1 · Desk</i><i>O2 · Prospects</i><i>O3 · Campaign</i><i>+</i></p>
        </>}
      </div>
    </>
  );
}

function D() {
  return (
    <Frame src="proto-skills-d" hero={(find) => (
      <Hero
        lede="The skills our agency runs on, written down so your agent can use them too. Install one, then just ask for the work."
        byline={<Zev size={40} line="Writes The Marketing Engineer · uses every skill here on client work" />}
        right={<Find onFind={find} />}
        stage={<Stage chapters={D_CHAPTERS} url={(c) => (c === 3 ? 'os.esy.com/_agency/outreach/o1' : 'claude code · /prototyping')} screen={(c, f) => <DScreen ch={c} f={f} />} caption={<>A replay of a real run of <code>/prototyping</code>, sped up: the ask, the skill it picked, its steps, and the three takes it built.</>} />}
      />
    )} />
  );
}

// ── E · Tour: four jobs, one skill each ────────────────────────────────────

const TOUR: { job: Job; slug: string }[] = [
  { job: 'research', slug: 'researching-markets' },
  { job: 'pages', slug: 'writing-service-pages' },
  { job: 'outreach', slug: 'finding-decision-makers' },
  { job: 'build', slug: 'prototyping' },
];
const E_CHAPTERS: Chapter[] = TOUR.map(({ job, slug }) => ({ label: JOBS.find((j) => j.key === job)!.label, beat: `${JOBS.find((j) => j.key === job)!.line} Ask, and ${skill(slug).command} does it.`, ms: 5200 }));

function EScreen({ ch, f }: { ch: number; f: number }) {
  const s = skill(TOUR[ch].slug);
  const lines = [
    { k: 'you' as const, t: s.ask },
    { k: 'agent' as const, t: `That matches ${s.command}. Opening it.` },
    { k: 'tool' as const, t: s.files.map((x) => x.path).join(' · ') },
    { k: 'agent' as const, t: s.result },
  ];
  return (
    <>
      <Term title={`claude · ${s.command}`} lines={lines} shown={Math.min(lines.length, 1 + Math.floor(f * 4))} />
      <div className="rp-run sf-panel">
        <div className="rp-run-head"><div><span className="fo-label">{JOBS.find((j) => j.key === s.job)!.label}</span><p className="rp-run-id">{s.command}</p></div><span className={`rp-pill ${s.status === 'live' ? 'is-completed' : 'is-pending'}`}>{s.status === 'live' ? 'live' : 'sample'}</span></div>
        <p className="rp-run-intake">“{s.ask}”</p>
        <p className="sf-panel-makes">{s.makes}</p>
        <div className="sf-panel-result" style={{ opacity: f > 0.6 ? 1 : 0.25 }}>
          <span className="fo-label">What came back</span>
          <p>{s.result}</p>
        </div>
      </div>
    </>
  );
}

function E() {
  return (
    <Frame src="proto-skills-e" hero={() => (
      <Hero
        lede="The skills our agency runs on, written down so your agent can use them too. Start with the free course: one skill a lesson."
        byline={<Zev size={40} line="Writes The Marketing Engineer · uses every skill here on client work" />}
        tall
        right={<Course src="proto-skills-e" tone="glass" />}
        stage={<Stage chapters={E_CHAPTERS} url={(c) => `claude code · ${skill(TOUR[c].slug).command}`} screen={(c, f) => <EScreen ch={c} f={f} />} caption={<>Four jobs, one skill each. <code>/prototyping</code> is real; the other three are samples of what’s coming.</>} />}
      />
    )} />
  );
}

// ── F · Anatomy: a real SKILL.md, part by part ─────────────────────────────

const F_PARTS: { label: string; beat: string; lines: number[]; note: number }[] = [
  { label: 'The label', beat: 'Your agent reads only this until a job fits. The description does all the work.', lines: [0, 1, 2, 3], note: 2 },
  { label: 'The point of view', beat: 'One sentence on how you like to work. The agent already knows how to code.', lines: [4, 5], note: 5 },
  { label: 'The steps', beat: 'A checklist it copies and ticks off, so long jobs don’t skip a step.', lines: [6, 7, 8], note: 7 },
  { label: 'The checks', beat: 'It looks at its own work before reporting. The biggest lift in quality.', lines: [8, 15], note: 8 },
  { label: 'The extra files', beat: 'Details live one link away, opened only when the job needs them.', lines: [11, 12, 13], note: 11 },
];
const F_CHAPTERS: Chapter[] = F_PARTS.map((p) => ({ label: p.label, beat: p.beat, ms: 4600 }));

function FScreen({ ch }: { ch: number }) {
  const part = F_PARTS[ch];
  const note = SKILL_MD[part.note].note!;
  return (
    <>
      <div className="rp-term is-night">
        <div className="rp-term-bar"><b>~/.claude/skills/prototyping/SKILL.md</b></div>
        <div className="sf-md">
          {SKILL_MD.map((l, i) => <p key={i} className={part.lines.includes(i) ? 'is-on' : ''}><span>{i + 1}</span>{l.text}</p>)}
        </div>
      </div>
      <div className="rp-run sf-panel">
        <div className="rp-run-head"><span className="fo-label">Part {ch + 1} of {F_PARTS.length}</span></div>
        <h3 className="sf-note-h">{note.title}</h3>
        <p className="sf-panel-makes">{note.text}</p>
        <div className="sf-panel-result">
          <span className="fo-label">In your own skill</span>
          <p>{['Say what it does and the words people use when they need it.', 'One line on how you work. Skip what the agent already knows.', 'Number the steps. Make the long ones a checklist.', 'End with a check the agent can run on itself.', 'Move details to a second file and link it once.'][ch]}</p>
        </div>
      </div>
    </>
  );
}

function F() {
  return (
    <Frame src="proto-skills-f" hero={(find) => (
      <Hero
        lede="Every skill here is a short file your agent opens when the job fits. Install one, then just ask for the work."
        right={<div className="sf-narrator">
          <Zev size={72} quote="Every skill is one short file. Here’s mine, line by line." line="The Marketing Engineer" />
          <p className="rp-find-label">Install it</p>
          <Cmd command="cp -r prototyping ~/.claude/skills/" note="Your skills folder works in every project" dark />
          <button type="button" className="fo-textbtn fo-textbtn--light sf-browse" onClick={() => find('')}>Browse all {SKILLS.length} skills ↓</button>
        </div>}
        tall
        stage={<Stage chapters={F_CHAPTERS} url={() => 'prototyping / SKILL.md'} screen={(c) => <FScreen ch={c} />} caption={<>The real <code>SKILL.md</code> behind <code>/prototyping</code>, shortened. It built this page.</>} />}
      />
    )} />
  );
}

// ── G · Course + Replay (round 3): E's top over D's replay ─────────────────
// The capture sits beside the headline (E), the proof under it is the one real
// skill doing real work end to end (D), and search joins the bar once the hero
// scrolls away. Swap the replay for E's tour once real marketing skills ship.

function G() {
  return (
    <Frame src="proto-skills-g" barSearch hero={() => (
      <Hero
        tall
        lede="The skills our agency runs on, written down so your agent can use them too. Start with the free course: three lessons, one real skill."
        byline={<Zev size={40} line="Writes The Marketing Engineer · uses every skill here on client work" />}
        right={<Course src="proto-skills-g" tone="glass" />}
        stage={<Stage chapters={D_CHAPTERS} url={(c) => (c === 3 ? 'os.esy.com/_agency/outreach/o1' : 'claude code · /prototyping')} screen={(c, f) => <DScreen ch={c} f={f} />} caption={<>A replay of a real run of <code>/prototyping</code>, sped up: the ask, the skill it picked, its steps, and the three takes it built.</>} />}
      />
    )} />
  );
}

// ── Round 4: E's page with three new simulators (./sims.tsx) ────────────────

function ETop({ src, stage }: { src: string; stage: React.ReactNode }) {
  return (
    <Frame src={src} barSearch hero={() => (
      <Hero
        tall
        lede="The skills our agency runs on, written down so your agent can use them too. Start with the free course: three lessons, one real skill."
        byline={<Zev size={40} line="Writes The Marketing Engineer · uses every skill here on client work" />}
        right={<Course src={src} tone="glass" />}
        stage={stage}
      />
    )} />
  );
}

export function FolioTake({ variant }: { variant: FolioVariant }) {
  if (variant === 'h') return <ETop src="proto-skills-h" stage={<SimChat />} />;
  if (variant === 'i') return <ETop src="proto-skills-i" stage={<SimCompare />} />;
  if (variant === 'j') return <ETop src="proto-skills-j" stage={<SimPanels />} />;
  return variant === 'd' ? <D /> : variant === 'e' ? <E /> : variant === 'f' ? <F /> : <G />;
}
