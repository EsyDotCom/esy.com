'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Copy } from 'lucide-react';
import { AGENTS, COURSE, HOW, INSTALL, jobLabel, type Skill } from './skills';

// Pieces every /skills take shares, so a merge round is a new layout, not a
// copy: the install command with a copy button, the email course, the
// works-with line, a skill card, and the three-step "how a skill works".

/** A shell command with a copy button. Copies for real; installs nothing by itself. */
export function CopyCommand({ command, note }: { command: string; note?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(command); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* clipboard blocked: the text is still selectable */ }
  };
  return (
    <div className="sk-cmd">
      <code><span aria-hidden="true">$</span> {command}</code>
      <button type="button" onClick={copy} aria-label={copied ? 'Copied' : `Copy: ${command}`}>{copied ? <Check size={15} /> : <Copy size={15} />}</button>
      {note && <small>{note}</small>}
    </div>
  );
}

/** Both install paths, labelled honestly. */
export function Install({ slug = 'prototyping' }: { slug?: string }) {
  return (
    <div className="sk-install">
      <p className="sk-label">{INSTALL.claude.label}</p>
      <CopyCommand command={INSTALL.claude.command.replace('prototyping', slug)} note={INSTALL.claude.note} />
      <p className="sk-label">{INSTALL.any.label}</p>
      <CopyCommand command={INSTALL.any.command} note={INSTALL.any.note} />
    </div>
  );
}

/** The email course. The lesson is the email; answering it brings the next one sooner.
    Prototype: the form never posts; it says what would happen. */
export function EmailCourse({ src, compact = false }: { src: string; compact?: boolean }) {
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setDone(true); };
  return (
    <section className={`sk-course ${compact ? 'is-compact' : ''}`} aria-label={COURSE.name}>
      <p className="sk-label">Free email course</p>
      <h3>{COURSE.name}</h3>
      {!compact && <ol>{COURSE.lessons.map((l, i) => <li key={l}><span>{i + 1}</span>{l}</li>)}</ol>}
      <p className="sk-course-how">{COURSE.how}</p>
      {done
        ? <p className="sk-course-done" role="status"><Check size={16} /> Prototype: nothing was sent. Lesson 1 would arrive now, tagged {src}.</p>
        : (
          <form onSubmit={submit} className="sk-course-form">
            <input type="text" placeholder="First name" aria-label="First name" autoComplete="given-name" />
            <input type="email" placeholder="you@company.com" aria-label="Email address" autoComplete="email" />
            <button type="submit">Start the course <ArrowRight size={15} /></button>
          </form>
        )}
      <small className="sk-course-fine">{COURSE.fine}</small>
    </section>
  );
}

export function WorksWith({ count }: { count: number }) {
  return <p className="sk-works"><b>Works with any agent</b><span>{AGENTS.join(' · ')} · {count} skills · open format</span></p>;
}

/** A skill as a card: status, command, what it makes, its job. */
export function SkillCard({ s, onOpen, on }: { s: Skill; onOpen?: () => void; on?: boolean }) {
  const body = (
    <>
      <span className="sk-card-top"><span className={`sk-status is-${s.status}`}>{s.status === 'live' ? 'Live' : 'Sample'}</span><span className="sk-job">{jobLabel(s.job)}</span></span>
      <code className="sk-command">{s.command}</code>
      <span className="sk-makes">{s.makes}</span>
    </>
  );
  return onOpen
    ? <button type="button" className={`sk-card ${on ? 'is-on' : ''}`} onClick={onOpen} aria-pressed={on}>{body}</button>
    : <div className="sk-card">{body}</div>;
}

export function HowItWorks() {
  return (
    <ol className="sk-how">
      {HOW.map((h) => <li key={h.step}><span>{h.step}</span><b>{h.title}</b><p>{h.text}</p></li>)}
    </ol>
  );
}
