'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { HEADLINE, JOBS, SAMPLE_NOTE, SKILLS, jobLabel, liveCount, skill, type Job } from './skills';
import { CopyCommand, EmailCourse, HowItWorks, SkillCard, WorksWith } from './shared';

// /skills · B · Shelf. Find first: search and job filters over a shelf of
// skill cards. Opening one shows its label (the description the agent reads),
// its files and what it made, with install beside it. Teaching is a short
// band, not a course; the course is the email at the foot.

export default function SkillsShelf() {
  const [q, setQ] = useState('');
  const [job, setJob] = useState<Job | 'all'>('all');
  const [sel, setSel] = useState<string | null>(null);
  const shown = useMemo(() => SKILLS.filter((s) => (job === 'all' || s.job === job) && (!q || `${s.name} ${s.makes} ${s.command}`.toLowerCase().includes(q.toLowerCase()))), [q, job]);
  const s = sel ? skill(sel) : null;

  return (
    <main className="sk sk-shelf">
      <header className="sk-hero sk-hero--center">
        <p className="nl-kicker">{HEADLINE.kicker}</p>
        <h1 className="sk-masthead">{HEADLINE.title}</h1>
        <p className="nl-lede nl-lede--center">{HEADLINE.promise}</p>
        <label className="sk-search">
          <Search size={18} aria-hidden="true" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search skills: pages, outreach, thumbnails…" aria-label="Search skills" />
        </label>
        <nav className="sk-jobs" aria-label="Filter by job">
          <button type="button" className={job === 'all' ? 'is-on' : ''} onClick={() => setJob('all')}>All <span>{SKILLS.length}</span></button>
          {JOBS.map((j) => <button key={j.key} type="button" className={job === j.key ? 'is-on' : ''} onClick={() => setJob(j.key)} title={j.line}>{j.label} <span>{SKILLS.filter((x) => x.job === j.key).length}</span></button>)}
        </nav>
      </header>

      <section className="sk-shelf-grid" aria-label="Skills">
        {shown.length ? shown.map((x) => <SkillCard key={x.slug} s={x} on={sel === x.slug} onOpen={() => setSel(x.slug)} />)
          : <p className="sk-empty">No skill for that yet. Tell us what you need in the course’s first reply.</p>}
      </section>
      <WorksWith count={SKILLS.length} />

      <section className="sk-band">
        <div>
          <p className="sk-label">How a skill works</p>
          <h2 className="nl-title">A folder your agent opens only when the job fits</h2>
          <p className="nl-lede">That’s why you can install dozens. {liveCount} is live today; the rest are on the way.</p>
        </div>
        <HowItWorks />
      </section>

      <section className="sk-shelf-course"><EmailCourse src="proto-skills-b" /></section>
      <p className="sk-sample">{SAMPLE_NOTE}</p>

      {s && (
        <div className="sk-drawer-scrim" onClick={() => setSel(null)}>
          <aside className="sk-drawer" role="dialog" aria-label={s.name} onClick={(e) => e.stopPropagation()}>
            <header>
              <span className={`sk-status is-${s.status}`}>{s.status === 'live' ? 'Live' : 'Sample'}</span>
              <span className="sk-job">{jobLabel(s.job)}</span>
              <button type="button" onClick={() => setSel(null)} aria-label="Close"><X size={18} /></button>
            </header>
            <code className="sk-command sk-command--big">{s.command}</code>
            <p className="sk-makes">{s.makes}</p>
            <p className="sk-label">What your agent reads</p>
            <blockquote className="sk-desc">{s.description}</blockquote>
            <p className="sk-label">Ask for it like this</p>
            <p className="sk-ask">“{s.ask}”</p>
            <p className="sk-label">What it made</p>
            <p>{s.result}</p>
            <p className="sk-label">Files</p>
            <ul className="sk-filelist">{s.files.map((f) => <li key={f.path}><code>{f.path}</code><span>{f.what}</span><small>{f.lines} lines</small></li>)}</ul>
            <CopyCommand command={`cp -r ${s.slug} ~/.claude/skills/`} note={s.status === 'live' ? `Updated ${s.updated}` : 'Sample skill: not published yet'} />
          </aside>
        </div>
      )}
    </main>
  );
}
