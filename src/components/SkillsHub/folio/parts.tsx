'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, Check, Copy, Search } from 'lucide-react';
import { useNewsletterSubscribe } from '@/hooks/useNewsletterSubscribe';
import { COURSE, JOBS, SAMPLE_NOTE, SKILLS, jobLabel, skill, type Job } from '../skills';

// ───────────────────────────────────────────────────────────────────────────
// Round 2 of /skills (D–F), in Folio: the pieces all three share, so only the
// stage changes between them. The bar and hero are docs.esy.com's (navy bar
// that turns to paper past the hero, headline left, a jade-italic second line);
// the replay engine is the docs' chapters-and-device, generalised so each take
// tells its own story; under the fold, the shelf and the course are the same.
// ───────────────────────────────────────────────────────────────────────────

/** The bar: navy over the hero, Folio's raised paper bar past it (docs' sd-bar).
    `onFind` is still accepted so takes that passed it keep compiling; the bar
    no longer shows search. */
export function Bar({ onFind: _onFind }: { onFind?: (q: string) => void }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    // Paper once the navy hero (headline and replay) has scrolled up under the bar.
    const onScroll = () => setSolid(window.scrollY > ((document.querySelector('.sd-hero') as HTMLElement | null)?.offsetHeight ?? 600) - 64);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`sd-bar ${solid ? 'is-solid' : ''}`}>
      <div className="sd-bar-in">
        <Link href="/" className={`fo-lockup sf-lockup ${solid ? '' : 'is-light'}`} aria-label="Esy, The Marketing Engineer">
          <span className="fo-wordmark">esy</span>
          <span className="fo-lockup-sep" aria-hidden="true" />
          <span className="fo-lockup-name">The Marketing Engineer</span>
        </Link>
        {/* The lockup and one action, nothing else (2026-10-06): no section
            links and no bar search; the page's own search and shelf cover it. */}
        <div className="sd-bar-end">
          <a className={`fo-btn ${solid ? 'fo-btn--primary' : 'fo-btn--light'}`} href="#course">Start the course</a>
        </div>
      </div>
    </header>
  );
}

/** The navy hero: headline left, the take's own column right, then the stage. */
export function Hero({ right, stage, lede, byline, tall = false }: { right: ReactNode; stage: ReactNode; lede: string; byline?: ReactNode; tall?: boolean }) {
  return (
    <section className={`rp-hero sd-hero ${tall ? 'sf-hero--tall' : ''}`}>
      <div className="rp-glow" aria-hidden="true" />
      <div className="rp-hero-in">
        <div className="rp-hero-copy">
          <p className="fo-eyebrow rp-eyebrow">Skills · The Marketing Engineer</p>
          <h1 className="fo-h1 rp-h1">AI marketing skills,<br /><em>your agent can run.</em></h1>
          <p className="fo-hero-lede">{lede}</p>
          {byline}
        </div>
        <div className="rp-hero-find">{right}</div>
      </div>
      {stage}
    </section>
  );
}

/** Zev, small: a jade-ringed headshot and a line. Three sizes, never the homepage's portrait. */
export function Zev({ size = 44, line, quote }: { size?: number; line: string; quote?: string }) {
  return (
    <figure className={`sf-zev ${quote ? 'has-quote' : ''}`}>
      <span className="sf-zev-photo" style={{ width: size, height: size }}>
        <Image src="/images/zev-uhuru.png" alt="Zev Uhuru" width={size * 2} height={size * 2} />
      </span>
      <figcaption>
        {quote && <q>{quote}</q>}
        <b>Zev Uhuru</b>
        <span>{line}</span>
      </figcaption>
    </figure>
  );
}

/** The hero's search, docs-style: a big field and "Try" chips. It filters the shelf below. */
export function Find({ onFind }: { onFind: (q: string) => void }) {
  return (
    <>
      <p className="rp-find-label">Looking for a skill?</p>
      <button type="button" className="rp-search" onClick={() => onFind('')}>
        <Search size={18} aria-hidden="true" />
        <span>Search {SKILLS.length} skills by the job they do</span>
        <kbd>⌘K</kbd>
      </button>
      <p className="rp-try">
        <span>Try</span>
        {['pages', 'outreach', 'thumbnails', 'research', '/prototyping'].map((s) => <button key={s} type="button" onClick={() => onFind(s)}>{s}</button>)}
      </p>
    </>
  );
}

// ── The replay engine: numbered chapters over a device ─────────────────────

export type Chapter = { label: string; beat: string; ms: number };

/** Plays chapters on a clock (pause, replay, jump); the take draws the screen for (chapter, progress). */
export function Stage({ chapters, url, screen, caption }: { chapters: Chapter[]; url: (ch: number) => string; screen: (ch: number, f: number) => ReactNode; caption: ReactNode }) {
  const total = chapters.reduce((n, c) => n + c.ms, 0);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setT(total); setPlaying(false); }
  }, [total]);
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => { const dt = now - prev; prev = now; setT((x) => Math.min(total, x + dt)); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, total]);
  useEffect(() => { if (t >= total) setPlaying(false); }, [t, total]);

  let acc = 0; let ch = chapters.length - 1; let f = 1;
  for (let i = 0; i < chapters.length; i++) {
    if (t < acc + chapters[i].ms) { ch = i; f = Math.max(0, (t - acc) / chapters[i].ms); break; }
    acc += chapters[i].ms;
  }
  const ended = t >= total;
  const jump = (i: number) => { setT(chapters.slice(0, i).reduce((n, c) => n + c.ms, 0)); setPlaying(true); };

  return (
    <div className="rp-stage">
      <div className="rp-stage-top">
        <div className="fo-chapters rp-chapters" role="tablist" aria-label="Step by step">
          {chapters.map((c, i) => (
            <button key={c.label} role="tab" aria-selected={i === ch} className={i === ch ? 'is-on' : i < ch ? 'is-done' : ''} onClick={() => jump(i)} style={{ ['--fill' as string]: i < ch ? 1 : i === ch ? f : 0 }}>
              <small>{i + 1}</small>{c.label}
            </button>
          ))}
        </div>
        <button type="button" className="rp-play" onClick={() => (ended ? jump(0) : setPlaying(!playing))}>{ended ? '↺ Play again' : playing ? 'Pause' : 'Play'}</button>
      </div>
      <p className="fo-beat-line rp-beat" aria-live="polite">{chapters[ch].beat}</p>
      <div className="fo-device rp-device">
        <div className="fo-device-bar">
          <span className="rp-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="fo-device-url">{url(ch)}</span>
          <span className="fo-device-tag"><span className={`fo-live ${playing ? '' : 'is-idle'}`} />Replay</span>
        </div>
        <div className="fo-device-screen rp-screen">{screen(ch, f)}</div>
      </div>
      <p className="rp-caption">{caption}</p>
    </div>
  );
}

/** A terminal pane: lines appear as `shown` grows. */
export function Term({ title, lines, shown }: { title: string; lines: { k: 'you' | 'agent' | 'tool'; t: string }[]; shown: number }) {
  return (
    <div className="rp-term is-night">
      <div className="rp-term-bar"><b>{title}</b></div>
      <div className="sf-term-lines">
        {lines.slice(0, shown).map((l, i) => <p key={i} className={`is-${l.k}`}><span>{l.k === 'you' ? '>' : l.k === 'tool' ? '·' : '✻'}</span>{l.t}</p>)}
        {shown < lines.length && <p className="is-wait"><span className="fo-live" />working…</p>}
      </div>
    </div>
  );
}

// ── Under the fold: the shelf and the course ───────────────────────────────

export function useShelf() {
  const [q, setQ] = useState('');
  const ref = useRef<HTMLElement>(null);
  const find = (s: string) => { setQ(s); ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setTimeout(() => ref.current?.querySelector('input')?.focus(), 400); };
  return { q, setQ, ref, find };
}

export function Shelf({ q, setQ, shelfRef }: { q: string; setQ: (s: string) => void; shelfRef: React.RefObject<HTMLElement | null> }) {
  const [job, setJob] = useState<Job | 'all'>('all');
  const [open, setOpen] = useState<string | null>(null);
  const shown = useMemo(() => SKILLS.filter((s) => (job === 'all' || s.job === job) && (!q || `${s.name} ${s.makes} ${s.command} ${jobLabel(s.job)}`.toLowerCase().includes(q.toLowerCase()))), [q, job]);
  const s = open ? skill(open) : null;
  return (
    <section className="sf-band" id="shelf" ref={shelfRef}>
      <div className="sd-frame">
        <div className="sf-band-head">
          <div>
            <p className="fo-eyebrow">The shelf</p>
            <h2 className="fo-h2">Every skill, by the job it does</h2>
          </div>
          <input className="fo-input sf-shelf-find" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter skills" aria-label="Filter skills" />
        </div>
        <nav className="fo-tabs" aria-label="Jobs">
          <button type="button" className={job === 'all' ? 'is-on' : ''} onClick={() => setJob('all')}>All<span>{SKILLS.length}</span></button>
          {JOBS.map((j) => <button key={j.key} type="button" className={job === j.key ? 'is-on' : ''} onClick={() => setJob(j.key)}>{j.label}<span>{SKILLS.filter((x) => x.job === j.key).length}</span></button>)}
        </nav>
        <ul className="sf-lines">
          {shown.map((x) => (
            <li key={x.slug}>
              <span className={`fo-kind ${x.status === 'live' ? 'is-you' : ''}`}>{x.status === 'live' ? 'Live' : 'Sample'}</span>
              <span className="sf-line-main"><code className="fo-code sf-cmd">{x.command}</code><span>{x.makes}</span></span>
              <span className="fo-stage">{jobLabel(x.job)}</span>
              <button type="button" className="fo-btn" onClick={() => setOpen(x.slug)}>Open</button>
            </li>
          ))}
          {!shown.length && <li className="fo-empty">Nothing for “{q}” yet. Reply to the course’s first lesson and tell us what you need.</li>}
        </ul>
      </div>
      {s && <>
        <div className="fo-scrim" onClick={() => setOpen(null)} />
        <aside className="fo-drawer sf-drawer" role="dialog" aria-label={s.name}>
          <div className="fo-drawer-bar"><span className={`fo-kind ${s.status === 'live' ? 'is-you' : ''}`}>{s.status === 'live' ? 'Live' : 'Sample'} · {jobLabel(s.job)}</span><button type="button" className="fo-iconbtn" onClick={() => setOpen(null)} aria-label="Close">×</button></div>
          <div className="sf-drawer-in">
            <code className="sf-cmd sf-cmd--big">{s.command}</code>
            <p className="fo-lede">{s.makes}</p>
            <p className="fo-section">What your agent reads</p>
            <p className="fo-callout sf-desc">{s.description}</p>
            <p className="fo-section">Ask for it like this</p>
            <p className="sf-ask">“{s.ask}”</p>
            <p className="fo-section">What it made</p>
            <p className="sf-p">{s.result}</p>
            <p className="fo-section">Files</p>
            <dl className="fo-dl">{s.files.map((f) => <div key={f.path}><dt className="fo-code">{f.path}</dt><dd>{f.what} · {f.lines} lines</dd></div>)}</dl>
            <Cmd command={`cp -r ${s.slug} ~/.claude/skills/`} note={s.status === 'live' ? 'Your skills folder works in every project' : 'Sample skill: not published yet'} />
          </div>
        </aside>
      </>}
    </section>
  );
}

export function Cmd({ command, note, dark = false }: { command: string; note?: string; dark?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(command); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* text stays selectable */ } };
  return (
    <div className={`sf-cmdbox ${dark ? 'is-dark' : ''}`}>
      <code><span aria-hidden="true">$</span> {command}</code>
      <button type="button" onClick={copy} aria-label={copied ? 'Copied' : `Copy: ${command}`}>{copied ? <Check size={14} /> : <Copy size={14} />}</button>
      {note && <small>{note}</small>}
    </div>
  );
}

/** The email course's signup. Live (2026-10-06): it posts to the same
    Beehiiv-backed endpoint as every signup on the site, so the list stays one.
    The hook sends the page path; the API turns any /skills path into
    referring_site esy.com/skills plus utm_campaign "skills" and utm_content
    (the take or skill), plus the custom field Signup Source = "skills", so
    these signups are marked as from skills. The first name is optional and is
    saved to Beehiiv's "Name" field, so lessons can greet people by name. */
export function Course({ tone = 'navy', withLessons = true }: { src?: string; tone?: 'navy' | 'glass'; withLessons?: boolean }) {
  const email = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const { subscribe, status, errorMessage, reset, honeypotProps } = useNewsletterSubscribe();
  const submit = (e: FormEvent) => { e.preventDefault(); subscribe(email.current?.value || '', { name: name.current?.value || '' }); };
  const loading = status === 'loading';
  const error = status === 'error' && !!errorMessage;
  return (
    <div className={`sf-course is-${tone}`}>
      <p className="rp-find-label">Free email course</p>
      <h3>{COURSE.name}</h3>
      {withLessons && <ol>{COURSE.lessons.map((l, i) => <li key={l}><span>{i + 1}</span>{l}</li>)}</ol>}
      <p className="sf-course-how">{COURSE.how}</p>
      {status === 'success'
        // Success replaces the form, so nobody submits twice.
        ? <p className="sf-course-done" role="status"><Check size={15} /> You’re in. Check your inbox to confirm.</p>
        : <form className="sf-course-form" onSubmit={submit} noValidate>
            {/* Bot trap: off-screen, never focusable, never filled by a person. */}
            <input {...honeypotProps} />
            <input ref={name} className="fo-input sf-course-name" type="text" placeholder="First name" aria-label="First name (optional)" autoComplete="given-name" maxLength={80} disabled={loading} />
            <input ref={email} className="fo-input sf-course-email" type="email" placeholder="you@company.com" aria-label="Email address" autoComplete="email" aria-invalid={error || undefined} disabled={loading} onChange={() => { if (status === 'error') reset(); }} />
            <button type="submit" className="fo-btn fo-btn--light fo-btn--big" disabled={loading}>{loading ? 'Joining…' : <>Get the course <ArrowRight size={16} /></>}</button>
          </form>}
      <small className={`sf-course-fine ${error ? 'is-error' : ''}`} aria-live="polite">{error ? errorMessage : COURSE.fine}</small>
    </div>
  );
}

/** The close: Folio's navy band with the course in it. */
export function Close({ src }: { src: string }) {
  return (
    <section className="fo-close sf-close" id="course">
      <div className="sd-frame sf-close-in">
        <div>
          <h2 className="rp-close-h">Learn one skill a lesson,<br /><em>then write your own.</em></h2>
          <p>Three lessons: install a real skill, use it on your own page, then write your own. Each ends with one thing to try. After the last one, The Marketing Engineer arrives every week.</p>
          <Zev size={56} line="Writes The Marketing Engineer and runs an agency on these skills" />
        </div>
        <Course src={src} tone="glass" withLessons={false} />
      </div>
      <p className="sf-sample">{SAMPLE_NOTE}</p>
    </section>
  );
}
