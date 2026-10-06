'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CHAPTERS, HEADLINE, SAMPLE_NOTE, SKILLS, liveCount, skill } from './skills';
import { CopyCommand, EmailCourse, HowItWorks, Install, WorksWith } from './shared';

// /skills · A · Field guide. Learn first: a numbered path down the left, one
// marketing job per chapter. Each chapter teaches one idea and hands you the
// skills for it, so reading the guide *is* browsing the shelf. Install and the
// email course sit beside the promise, where the decision to try one happens.

export default function SkillsFieldGuide() {
  const [open, setOpen] = useState<string | null>('prototyping');
  return (
    <main className="sk sk-guide">
      <aside className="sk-guide-rail" aria-label="The path">
        <p className="sk-label">The path</p>
        <ol>
          {CHAPTERS.map((c) => <li key={c.n}><a href={`#ch-${c.n}`}><span>{c.n}</span>{c.title}</a></li>)}
        </ol>
        <p className="sk-label">All skills</p>
        <ul className="sk-guide-all">
          {SKILLS.map((s) => <li key={s.slug}><a href={`#sk-${s.slug}`} onClick={() => setOpen(s.slug)}>{s.command}</a>{s.status === 'live' && <i>live</i>}</li>)}
        </ul>
        <p className="sk-label">What’s new</p>
        <p className="sk-guide-new"><b>Oct 6</b> /prototyping: three versions of any page, with a picker.</p>
      </aside>

      <div className="sk-guide-main">
        <header className="sk-hero">
          <p className="nl-kicker">{HEADLINE.kicker}</p>
          <h1 className="sk-masthead">{HEADLINE.title}</h1>
          <p className="nl-lede">{HEADLINE.promise}</p>
          <p className="sk-stat"><b>{SKILLS.length}</b> skills on the path · <b>{liveCount}</b> live today · <b>{CHAPTERS.length}</b> chapters</p>
        </header>

        {CHAPTERS.map((c) => (
          <section key={c.n} id={`ch-${c.n}`} className="sk-chapter">
            <p className="sk-chapter-n">Chapter {c.n}</p>
            <h2 className="nl-title">{c.title}</h2>
            <p className="sk-chapter-idea">{c.idea}</p>
            {c.n === 1 && <HowItWorks />}
            {c.skills.map((slug) => {
              const s = skill(slug);
              const isOpen = open === slug;
              return (
                <article key={slug} id={`sk-${slug}`} className={`sk-row ${isOpen ? 'is-open' : ''}`}>
                  <button type="button" className="sk-row-head" onClick={() => setOpen(isOpen ? null : slug)} aria-expanded={isOpen}>
                    <code className="sk-command">{s.command}</code>
                    <span className="sk-makes">{s.makes}</span>
                    <span className={`sk-status is-${s.status}`}>{s.status === 'live' ? 'Live' : 'Sample'}</span>
                    <ChevronDown size={16} aria-hidden="true" />
                  </button>
                  {isOpen && (
                    <div className="sk-row-body">
                      <p><b>Ask for it like this:</b> “{s.ask}”</p>
                      <p><b>What it made:</b> {s.result}</p>
                      <p className="sk-files">{s.files.map((f) => <span key={f.path}><code>{f.path}</code> {f.lines} lines</span>)}</p>
                      <CopyCommand command={`cp -r ${s.slug} ~/.claude/skills/`} note={s.status === 'live' ? 'Your skills folder works in every project' : 'Sample skill: not published yet'} />
                    </div>
                  )}
                </article>
              );
            })}
            {c.n === 7 && <p className="sk-chapter-idea">The course’s last lesson walks through writing one, using /prototyping as the example.</p>}
          </section>
        ))}
        <p className="sk-sample">{SAMPLE_NOTE}</p>
      </div>

      <aside className="sk-guide-side" aria-label="Install and course">
        <section className="sk-panel">
          <p className="sk-label">Install the skills</p>
          <p className="sk-panel-lede">Copy a folder into your skills folder, or install the set. They’re plain files you can edit.</p>
          <Install />
        </section>
        <EmailCourse src="proto-skills-a" />
        <WorksWith count={SKILLS.length} />
      </aside>
    </main>
  );
}
