'use client';

import { useState } from 'react';
import { FileText, Folder } from 'lucide-react';
import { HEADLINE, SAMPLE_NOTE, SKILLS, SKILL_MD, skill } from './skills';
import { EmailCourse, Install, SkillCard, WorksWith } from './shared';

// /skills · C · Workbench. Show first: one real skill opened up. Its files,
// its SKILL.md with every important line explained, the moment it triggers,
// and what it built. Seeing one skill whole teaches the format faster than a
// page about it; the shelf and the course follow underneath.

type Tab = 'file' | 'trigger' | 'made';

export default function SkillsWorkbench() {
  const s = skill('prototyping');
  const [tab, setTab] = useState<Tab>('file');
  const [file, setFile] = useState(s.files[0].path);
  const notes = SKILL_MD.map((l, i) => ({ ...l, i })).filter((l) => l.note);
  const [line, setLine] = useState(notes[2].i);
  const active = SKILL_MD[line]?.note ?? notes[0].note!;
  const f = s.files.find((x) => x.path === file)!;

  return (
    <main className="sk sk-bench">
      <header className="sk-hero sk-bench-hero">
        <div>
          <p className="nl-kicker">{HEADLINE.kicker}</p>
          <h1 className="sk-masthead">{HEADLINE.title}</h1>
          <p className="nl-lede">{HEADLINE.promise} Here’s one opened up, so you can see exactly what you’d be installing.</p>
        </div>
        <Install />
      </header>

      <section className="sk-bench-frame" aria-label={`${s.command}, opened`}>
        <div className="sk-bench-bar">
          <code className="sk-command">{s.command}</code>
          <span className="sk-status is-live">Live</span>
          <nav className="sk-bench-tabs" aria-label="View">
            <button type="button" className={tab === 'file' ? 'is-on' : ''} onClick={() => setTab('file')}>The files</button>
            <button type="button" className={tab === 'trigger' ? 'is-on' : ''} onClick={() => setTab('trigger')}>When it starts</button>
            <button type="button" className={tab === 'made' ? 'is-on' : ''} onClick={() => setTab('made')}>What it made</button>
          </nav>
        </div>

        {tab === 'file' && (
          <div className="sk-bench-body">
            <ul className="sk-tree" aria-label="Files">
              <li className="sk-tree-dir"><Folder size={15} /> prototyping/</li>
              {s.files.map((x) => (
                <li key={x.path}><button type="button" className={file === x.path ? 'is-on' : ''} onClick={() => setFile(x.path)}><FileText size={14} /> {x.path}<small>{x.lines}</small></button></li>
              ))}
            </ul>
            <div className="sk-code">
              {file === 'SKILL.md'
                ? SKILL_MD.map((l, i) => (
                  <button key={i} type="button" className={`sk-line ${l.note ? 'has-note' : ''} ${line === i ? 'is-on' : ''}`} onClick={() => l.note && setLine(i)} disabled={!l.note}>
                    <span className="sk-ln">{i + 1}</span><span className="sk-lt">{l.text}</span>
                  </button>
                ))
                : <p className="sk-code-note"><b>{f.path}</b> · {f.lines} lines. {f.what} Your agent opens this file only when SKILL.md sends it here.</p>}
            </div>
            <aside className="sk-note" aria-live="polite">
              {file === 'SKILL.md' ? <><p className="sk-label">Line {line + 1}</p><h3>{active.title}</h3><p>{active.text}</p><p className="sk-note-hint">Click any highlighted line.</p></>
                : <><p className="sk-label">Why it’s a separate file</p><h3>Progressive disclosure</h3><p>Details live one link away from SKILL.md. The agent carries the short file everywhere and opens this one only for the job that needs it.</p></>}
            </aside>
          </div>
        )}

        {tab === 'trigger' && (
          <ol className="sk-transcript">
            <li className="is-you"><b>You</b>{s.ask}</li>
            <li><b>Agent</b>Your request matches /prototyping’s description (“a few versions of a page”). Opening its SKILL.md.</li>
            <li><b>Agent</b>Found this repo’s convention: /_agency/&lt;area&gt;/[variant] with the picker. Planning three takes: Desk, Prospects, Campaign.</li>
            <li><b>Agent</b>Sample data in one file. Building each take on the real components. Opening every take in the browser to check it.</li>
            <li><b>Agent</b>Here are three links, what each tries, and what’s real versus sample. Which one, or which parts should I merge?</li>
          </ol>
        )}

        {tab === 'made' && (
          <ul className="sk-made">
            <li><b>Outreach in Esy OS</b><span>Six takes at os.esy.com/_agency/outreach (private), in the app’s own look, with a picker.</span></li>
            <li><b>This page</b><span>Three takes of esy.com/skills, A to C, switched with the bar at the foot.</span></li>
          </ul>
        )}
      </section>

      <section className="sk-bench-more">
        <p className="sk-label">More skills</p>
        <div className="sk-shelf-grid">{SKILLS.filter((x) => x.slug !== s.slug).map((x) => <SkillCard key={x.slug} s={x} />)}</div>
        <WorksWith count={SKILLS.length} />
      </section>
      <section className="sk-shelf-course"><EmailCourse src="proto-skills-c" /></section>
      <p className="sk-sample">{SAMPLE_NOTE}</p>
    </main>
  );
}
