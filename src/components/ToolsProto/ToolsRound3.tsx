'use client';

/* esy.com/tools, round 3 (2026-10-09): three visually different directories,
   each with a real hero and motion as you scroll (Zev: "a more attractive
   hero area, then transition"). Same tools and honesty rules (tools.ts);
   the art is generated through api.esy.com in the newsletter's series style
   (scripts/generate-newsletter-covers.mjs, COVERS_SET=tools).

   K7 · Night      Immersive navy: a full-bleed art hero with the title,
                   search and job pills in it; dark cards fade up and glow.
   K8 · Orbit      A light hero with every tool's tile drifting in slow rows
                   behind the title; a featured pick, then job boxes that
                   open in place to show their tools.
   K9 · Magazine   "The 2026 AI Marketing Toolkit": an editorial cover hero
                   with art, a sticky job menu that follows your scroll, and
                   each job as a swipeable row with its own cover. */

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { JOBS, type Tool, type ToolJob, TOOLS, toolsFor } from './tools';
import { Badges, Disclosure, Links, Tile, Wordmark } from './ToolsTakes';

const ART = '/images/tools/art';
const jobSlug = (j: ToolJob) => j.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');
const jobArt = (j: ToolJob) => `${ART}/${jobSlug(j)}.webp`;
const USED = TOOLS.filter((t) => t.usedByEsy).length;
const match = (t: Tool, q: string) => !q || `${t.name} ${t.maker} ${t.does} ${t.job}`.toLowerCase().includes(q.toLowerCase());

/** Fades its children up the first time they scroll into view; still for reduced motion. */
function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`t3-reveal${inView ? ' is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

/** A tool card; `tone` dark for K7, light elsewhere. */
function Card({ t, tone = 'light' }: { t: Tool; tone?: 'light' | 'dark' }) {
  return (
    <article className={`t3-card t3-card--${tone}`}>
      <div className="tl-card-top">
        {/* A wordmark replaces both the tile and the name. */}
        {!t.wordmark && <Tile tool={t} />}
        <div>
          <h3 className="t3-name">{t.wordmark ? <Wordmark tool={t} dark={tone === 'dark'} className="tl-wordmark--name" /> : t.name}</h3>
          <p className="t3-maker">{t.maker} · {t.job}</p>
        </div>
      </div>
      <p className="t3-does">{t.does}</p>
      <Badges tool={t} />
      <Links tool={t} />
    </article>
  );
}

/* K7 · Night */
export function TakeNight() {
  const [q, setQ] = useState('');
  const [job, setJob] = useState<ToolJob | 'All'>('All');
  const shown = useMemo(() => TOOLS.filter((t) => (job === 'All' || t.job === job) && match(t, q)), [q, job]);
  return (
    <main className="t3-night">
      <section className="t3n-hero" style={{ backgroundImage: `linear-gradient(90deg, #0A1626 0%, rgba(10,22,38,0.88) 38%, rgba(10,22,38,0.25) 75%, rgba(10,22,38,0.55) 100%), url(${ART}/hero.webp)` }}>
        <div className="t3n-hero-in">
          <p className="t3-kicker">{TOOLS.length} tools · {JOBS.length} jobs · {USED} we run · updated Oct 2026</p>
          <h1 className="t3n-title">AI Marketing <em>Tools</em></h1>
          <p className="t3n-sub">The AI tools that do marketing work, sorted by the job they do, with tutorials and honest takes from someone who runs them.</p>
          <label className="t3n-search">
            <Search size={18} aria-hidden="true" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tools: email, images, Claude…" aria-label="Search AI marketing tools" />
          </label>
          <div className="t3n-pills" role="tablist" aria-label="Filter by job">
            {(['All', ...JOBS] as const).map((j) => (
              <button key={j} type="button" role="tab" aria-selected={job === j} className={`t3n-pill${job === j ? ' is-on' : ''}`} onClick={() => setJob(j)}>{j}</button>
            ))}
          </div>
        </div>
      </section>
      <section className="t3n-body">
        <div className="tl-wrap">
          <p className="t3n-count">{shown.length} {shown.length === 1 ? 'tool' : 'tools'}{job !== 'All' ? ` for ${job.toLowerCase()}` : ''}</p>
          {/* Re-keyed on every filter, so the new set fades in rather than snapping. */}
          <div className="t3n-grid" key={`${job}|${q}`}>
            {shown.map((t, i) => <Reveal key={t.slug} delay={Math.min(i, 8) * 60}><Card t={t} tone="dark" /></Reveal>)}
            {!shown.length && <p className="t3n-empty">Nothing matches. Try another job or search.</p>}
          </div>
          <div className="t3n-disclosure"><Disclosure /></div>
        </div>
      </section>
    </main>
  );
}

/* K8 · Orbit */
export function TakeOrbit() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<ToolJob | null>(null);
  const featured = TOOLS.find((t) => t.slug === 'claude-code')!;
  const rows = [TOOLS.slice(0, 6), TOOLS.slice(6, 11), TOOLS.slice(11)];
  const results = q ? TOOLS.filter((t) => match(t, q)) : [];
  return (
    <main className="t3-orbit">
      <section className="t3o-hero">
        {/* Every tool's tile, drifting in three slow rows behind the title. */}
        <div className="t3o-drift" aria-hidden="true">
          {rows.map((row, i) => (
            <div key={i} className={`t3o-row t3o-row--${i}`}>
              {[...row, ...row, ...row, ...row].map((t, k) => (
                <span key={`${t.slug}-${k}`} className={`t3o-chip${t.wordmark ? ' t3o-chip--mark' : ''}`}><Tile tool={t} />{!t.wordmark && ` ${t.name}`}</span>
              ))}
            </div>
          ))}
        </div>
        <div className="t3o-hero-in">
          <p className="t3-kicker t3-kicker--jade">{TOOLS.length} tools · {JOBS.length} jobs · updated Oct 2026</p>
          <h1 className="t3o-title">AI Marketing Tools</h1>
          <p className="t3o-sub">Find the right AI tool for the job, then learn it: tutorials, reviews and what I actually run.</p>
          <label className="tl-search t3o-search">
            <Search size={18} aria-hidden="true" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tools: email, images, Claude…" aria-label="Search AI marketing tools" />
          </label>
        </div>
      </section>

      <div className="tl-wrap">
        {q ? (
          <section className="t3o-results">
            <p className="tl-label">{results.length} {results.length === 1 ? 'match' : 'matches'} for “{q}”</p>
            <div className="tl-grid">{results.map((t, i) => <Reveal key={t.slug} delay={i * 50}><Card t={t} /></Reveal>)}</div>
          </section>
        ) : (
          <div className="t3o-bento">
            <Reveal className="t3o-feature-wrap">
              <article className="t3o-feature" style={{ backgroundImage: `linear-gradient(90deg, rgba(10,22,38,0.95) 0%, rgba(10,22,38,0.75) 45%, rgba(10,22,38,0.15) 100%), url(${jobArt(featured.job)})` }}>
                <p className="t3-kicker">Pick of the month</p>
                <h2 className="t3o-feature-name">{featured.name}</h2>
                <p className="t3o-feature-take">“{featured.take}”</p>
                <div className="t3o-feature-links"><Links tool={featured} /></div>
              </article>
            </Reveal>
            {JOBS.map((j, i) => {
              const tools = toolsFor(j);
              const isOpen = open === j;
              return (
                <Reveal key={j} delay={i * 60} className={`t3o-box-wrap${isOpen ? ' is-open' : ''}`}>
                  <article className={`t3o-box${isOpen ? ' is-open' : ''}`}>
                    <button type="button" className="t3o-box-head" onClick={() => setOpen(isOpen ? null : j)} aria-expanded={isOpen}>
                      <span className="t3o-box-art" style={{ backgroundImage: `url(${jobArt(j)})` }} />
                      <span className="t3o-box-name">{j}</span>
                      <span className="t3o-box-tiles">{tools.map((t) => <Tile key={t.slug} tool={t} />)}</span>
                      <span className="t3o-box-n">{tools.length} {tools.length === 1 ? 'tool' : 'tools'} · {isOpen ? 'Close' : 'Open'}</span>
                    </button>
                    {/* Opens in place: the box spans the row and its tools slide down. */}
                    <div className="t3o-box-body" aria-hidden={!isOpen}>
                      <div className="t3o-box-grid">{tools.map((t) => <Card key={t.slug} t={t} />)}</div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
        <div className="t3-disclosure"><Disclosure /></div>
      </div>
    </main>
  );
}

/* K9 · Magazine */
export function TakeMagazine() {
  const [active, setActive] = useState<ToolJob>(JOBS[0]);
  // The sticky job menu follows the section in view.
  useEffect(() => {
    const els = JOBS.map((j) => document.getElementById(`m-${jobSlug(j)}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (hit) setActive(JOBS.find((j) => `m-${jobSlug(j)}` === hit.target.id) ?? JOBS[0]);
    }, { rootMargin: '-35% 0px -55% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <main className="t3-mag">
      <section className="t3m-hero">
        <div className="t3m-hero-text">
          <p className="t3-kicker t3-kicker--jade">AI Marketing Tools</p>
          <h1 className="t3m-title">The 2026 AI Marketing <em>Toolkit</em></h1>
          <p className="t3m-sub">The tools that do marketing work, one job at a time, with tutorials, reviews and the ones I actually run.</p>
          <dl className="t3m-stats">
            <div><dt>{TOOLS.length}</dt><dd>tools</dd></div>
            <div><dt>{JOBS.length}</dt><dd>jobs</dd></div>
            <div><dt>{USED}</dt><dd>we run</dd></div>
          </dl>
          <a href={`#m-${jobSlug(JOBS[0])}`} className="t3m-cta">Start with the jobs <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
        <div className="t3m-hero-art" style={{ backgroundImage: `url(${ART}/hero.webp)` }} aria-hidden="true" />
      </section>

      <nav className="t3m-nav" aria-label="Jobs">
        <div className="t3m-nav-in">
          {JOBS.map((j) => (
            <a key={j} href={`#m-${jobSlug(j)}`} className={`t3m-nav-link${active === j ? ' is-on' : ''}`}>{j}</a>
          ))}
        </div>
      </nav>

      <div className="tl-wrap">
        {JOBS.map((j) => <MagRow key={j} job={j} />)}
        <div className="t3-disclosure"><Disclosure /></div>
      </div>
    </main>
  );
}

/** One job in K9: its cover banner, then its tools as a swipeable row. */
function MagRow({ job }: { job: ToolJob }) {
  const rail = useRef<HTMLDivElement>(null);
  const tools = toolsFor(job);
  const scroll = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });
  return (
    <section className="t3m-sec" id={`m-${jobSlug(job)}`}>
      <Reveal>
        <div className="t3m-banner" style={{ backgroundImage: `linear-gradient(90deg, rgba(10,22,38,0.92) 0%, rgba(10,22,38,0.55) 50%, rgba(10,22,38,0.1) 100%), url(${jobArt(job)})` }}>
          <h2 className="t3m-banner-title">Best AI tools for {job.toLowerCase()}</h2>
          <span className="t3m-banner-n">{tools.length} {tools.length === 1 ? 'tool' : 'tools'}</span>
        </div>
      </Reveal>
      <div className="t3m-rail-wrap">
        <div className="t3m-rail" ref={rail}>
          {tools.map((t, i) => <Reveal key={t.slug} delay={i * 80} className="t3m-slide"><Card t={t} /></Reveal>)}
        </div>
        {tools.length > 2 && (
          <div className="t3m-arrows">
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous"><ArrowLeft size={16} /></button>
            <button type="button" onClick={() => scroll(1)} aria-label="Next"><ArrowRight size={16} /></button>
          </div>
        )}
      </div>
    </section>
  );
}

