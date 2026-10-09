'use client';

/* esy.com/tools, round 2 (2026-10-09): three more versions of K1 · Directory,
   each a different way to browse the same tools.

   K4 · Sidebar          The classic directory: filters in a sticky left rail
                         (jobs with counts, "we use it", "has a tutorial",
                         "free plan"), wide rows on the right.
   K5 · Jobs first       Start from the job ("I need help with email"): big job
                         tiles, then that job's tools, with a bar to switch.
   K6 · Picks + directory  "What I run" picks across the top, then K1's
                         searchable, filterable grid underneath.

   Same data and honesty rules as round 1 (tools.ts). */

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { JOBS, type Tool, type ToolJob, TOOLS, toolsFor } from './tools';
import { Badges, Disclosure, Head, Links, Tile } from './ToolsTakes';

type Filters = { q: string; job: ToolJob | 'All'; ours: boolean; learn: boolean; free: boolean };
const NONE: Filters = { q: '', job: 'All', ours: false, learn: false, free: false };

/** Every filter applied to the tool list. */
function useFiltered(f: Filters) {
  return useMemo(() => TOOLS.filter((t) =>
    (f.job === 'All' || t.job === f.job)
    && (!f.ours || t.usedByEsy)
    && (!f.learn || t.links.length > 0)
    && (!f.free || !!t.free)
    && (!f.q || `${t.name} ${t.maker} ${t.does} ${t.job}`.toLowerCase().includes(f.q.toLowerCase()))), [f]);
}

function SearchBox({ q, onQ }: { q: string; onQ: (q: string) => void }) {
  return (
    <label className="tl-search">
      <Search size={18} aria-hidden="true" />
      <input value={q} onChange={(e) => onQ(e.target.value)} placeholder="Search tools: email, images, Claude…" aria-label="Search AI marketing tools" />
    </label>
  );
}

/** A wide row: tile, name and job, what it does, badges, links. */
function Row({ t }: { t: Tool }) {
  return (
    <article className="tl-row">
      <Tile tool={t} />
      <div className="tl-row-main">
        <h2 className="tl-name">{t.name} <span className="tl-maker">· {t.maker} · {t.job}</span></h2>
        <p className="tl-does">{t.does}</p>
        <Badges tool={t} />
      </div>
      <div className="tl-row-links"><Links tool={t} /></div>
    </article>
  );
}

/** The card K1 uses, for K5 and K6's grids. */
function Card({ t }: { t: Tool }) {
  return (
    <article className="tl-card">
      <div className="tl-card-top">
        <Tile tool={t} />
        <div>
          <h2 className="tl-name">{t.name}</h2>
          <p className="tl-maker">{t.maker} · {t.job}</p>
        </div>
      </div>
      <p className="tl-does">{t.does}</p>
      <Badges tool={t} />
      <Links tool={t} />
    </article>
  );
}

/* K4 · Sidebar */
export function TakeSidebar() {
  const [f, setF] = useState<Filters>(NONE);
  const shown = useFiltered(f);
  const set = (p: Partial<Filters>) => setF((x) => ({ ...x, ...p }));
  return (
    <main className="tl">
      <Head><SearchBox q={f.q} onQ={(q) => set({ q })} /></Head>
      <div className="tl-wrap tl-side">
        <aside className="tl-rail" aria-label="Filters">
          <p className="tl-label">Job</p>
          <ul className="tl-rail-jobs">
            {(['All', ...JOBS] as const).map((j) => (
              <li key={j}>
                <button type="button" className={`tl-rail-job${f.job === j ? ' is-on' : ''}`} onClick={() => set({ job: j })}>
                  <span>{j}</span><span className="tl-chip-n">{j === 'All' ? TOOLS.length : toolsFor(j).length}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="tl-label">Show only</p>
          <div className="tl-rail-checks">
            <label><input type="checkbox" checked={f.ours} onChange={(e) => set({ ours: e.target.checked })} /> We use it</label>
            <label><input type="checkbox" checked={f.learn} onChange={(e) => set({ learn: e.target.checked })} /> Has a tutorial or review</label>
            <label><input type="checkbox" checked={f.free} onChange={(e) => set({ free: e.target.checked })} /> Free plan</label>
          </div>
          {JSON.stringify(f) !== JSON.stringify(NONE) && (
            <button type="button" className="tl-clear" onClick={() => setF(NONE)}><X size={14} aria-hidden="true" /> Clear filters</button>
          )}
        </aside>
        <section>
          <p className="tl-count tl-count--top">{shown.length} of {TOOLS.length} tools</p>
          <div className="tl-rows">
            {shown.map((t) => <Row key={t.slug} t={t} />)}
            {!shown.length && <p className="tl-empty">No tools match. Clear a filter or try another search.</p>}
          </div>
        </section>
      </div>
      <div className="tl-wrap"><Disclosure /></div>
    </main>
  );
}

/* K5 · Jobs first */
export function TakeJobsFirst() {
  const [job, setJob] = useState<ToolJob | null>(null);
  return (
    <main className="tl">
      <Head />
      <div className="tl-wrap">
        {!job ? (
          <>
            <p className="tl-ask">What do you need help with?</p>
            <div className="tl-jobs">
              {JOBS.map((j) => {
                const tools = toolsFor(j);
                return (
                  <button key={j} type="button" className="tl-jobtile" onClick={() => setJob(j)}>
                    <span className="tl-jobtile-name">{j}</span>
                    <span className="tl-jobtile-tools">{tools.map((t) => t.name).join(' · ')}</span>
                    <span className="tl-jobtile-n">{tools.length} {tools.length === 1 ? 'tool' : 'tools'}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="tl-jobbar">
              <button type="button" className="tl-back" onClick={() => setJob(null)}>← All jobs</button>
              <div className="tl-chips">
                {JOBS.map((j) => (
                  <button key={j} type="button" className={`tl-chip${job === j ? ' is-on' : ''}`} onClick={() => setJob(j)}>{j}</button>
                ))}
              </div>
            </div>
            <h2 className="tl-h2">Best AI tools for {job.toLowerCase()}</h2>
            <div className="tl-grid">{toolsFor(job).map((t) => <Card key={t.slug} t={t} />)}</div>
          </>
        )}
      </div>
      <div className="tl-wrap"><Disclosure /></div>
    </main>
  );
}

/* K6 · Picks + directory */
export function TakePicksDirectory() {
  const [f, setF] = useState<Filters>(NONE);
  const shown = useFiltered(f);
  const set = (p: Partial<Filters>) => setF((x) => ({ ...x, ...p }));
  // The picks: one tool Esy runs for each job that has one.
  const picks = JOBS.map((j) => toolsFor(j).find((t) => t.usedByEsy)).filter((t): t is Tool => !!t);
  return (
    <main className="tl">
      <Head><SearchBox q={f.q} onQ={(q) => set({ q })} /></Head>
      <div className="tl-wrap">
        <p className="tl-label">What I run</p>
        <div className="tl-picks">
          {picks.map((t) => (
            <article key={t.slug} className="tl-pickcard">
              <div className="tl-card-top">
                <Tile tool={t} />
                <div>
                  <h2 className="tl-name">{t.name}</h2>
                  <p className="tl-maker">{t.job}</p>
                </div>
              </div>
              {t.take && <p className="tl-pick-take">“{t.take}”</p>}
              <Links tool={t} />
            </article>
          ))}
        </div>

        <p className="tl-label tl-label--gap">Every tool</p>
        <div className="tl-chips" role="tablist" aria-label="Filter by job">
          {(['All', ...JOBS] as const).map((j) => (
            <button key={j} type="button" role="tab" aria-selected={f.job === j} className={`tl-chip${f.job === j ? ' is-on' : ''}`} onClick={() => set({ job: j })}>
              {j}{j !== 'All' && <span className="tl-chip-n">{toolsFor(j).length}</span>}
            </button>
          ))}
        </div>
        <div className="tl-toggles">
          <label><input type="checkbox" checked={f.learn} onChange={(e) => set({ learn: e.target.checked })} /> Has a tutorial or review</label>
          <label><input type="checkbox" checked={f.free} onChange={(e) => set({ free: e.target.checked })} /> Free plan</label>
          <span className="tl-count">{shown.length} of {TOOLS.length}</span>
        </div>
        <div className="tl-grid">
          {shown.map((t) => <Card key={t.slug} t={t} />)}
          {!shown.length && <p className="tl-empty">No tools match. Try another job or clear the search.</p>}
        </div>
      </div>
      <div className="tl-wrap"><Disclosure /></div>
    </main>
  );
}
