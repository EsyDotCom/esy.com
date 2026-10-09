'use client';

/* esy.com/tools, "AI Marketing Tools": three takes (2026-10-09). The decision:
   how should the page make AI marketing tools easy to find, and win the
   "ai marketing tools" searches (5,400/mo, plus "best ai marketing tools",
   "ai tools for marketing" and a long tail split by job)?

   K1 · Directory   Search and filter: every tool as a card, filtered by the
                    job it does, with "has a tutorial" and "we use it" toggles.
   K2 · My stack    Opinionated: for each job, the tool I run (with my take and
                    the tutorial), then the others worth knowing.
   K3 · Guide       The "best AI marketing tools" article the searches want:
                    a comparison table, then a section per job, then FAQs.

   Every tool links only to things that exist (our articles, the course, AI
   Marketing News); the rest say "review coming". Tools show their company's
   own icon (tools.ts), or a lettered tile where there isn't one. */

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { JOBS, type Tool, type ToolJob, TOOLS, toolsFor } from './tools';

const TITLE = 'AI Marketing Tools';
const SUB = 'The AI tools that do marketing work, sorted by the job they do, with tutorials and honest takes from someone who runs them.';

/** A wordmark standing in for the tool's name, bare (no tile); white on dark. */
export function Wordmark({ tool, dark = false, className = '' }: { tool: Tool; dark?: boolean; className?: string }) {
  if (!tool.wordmark) return null;
  const src = dark ? tool.wordmark.replace(/\.svg$/, '-white.svg') : tool.wordmark;
  // eslint-disable-next-line @next/next/no-img-element -- a static SVG wordmark
  return <img className={`tl-wordmark ${className}`} src={src} alt={tool.name} />;
}

/** A tool's mark: the company's own icon, else its first letter in the brand
    stencil. A wordmark tool has no tile: its wordmark stands in. */
export function Tile({ tool, size = 'md' }: { tool: Tool; size?: 'md' | 'lg' }) {
  if (tool.wordmark) return <Wordmark tool={tool} />;
  if (tool.logo) {
    return (
      <span className={`tl-tile tl-tile--${size} tl-tile--logo${tool.logo.inset ? ' tl-tile--inset' : ''}`} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- small static icons, no optimisation needed */}
        <img src={tool.logo.src} alt="" />
      </span>
    );
  }
  return <span className={`tl-tile tl-tile--${size}`} aria-hidden="true">{tool.name[0]}</span>;
}

/** Where to learn more: tutorial, review, course or news, or "review coming". */
export function Links({ tool }: { tool: Tool }) {
  if (!tool.links.length) return <p className="tl-coming">Review coming</p>;
  return (
    <ul className="tl-links">
      {tool.links.map((l) => (
        <li key={l.href + l.kind}>
          <Link href={l.href}><span className={`tl-kind tl-kind--${l.kind.toLowerCase()}`}>{l.kind}</span> {l.label}</Link>
        </li>
      ))}
    </ul>
  );
}

export function Badges({ tool }: { tool: Tool }) {
  return (
    <span className="tl-badges">
      {tool.usedByEsy && <span className="tl-badge tl-badge--use">We use it</span>}
      {tool.free && <span className="tl-badge">{tool.free}</span>}
    </span>
  );
}

/** The line every take carries: not affiliated, trademarks are their owners',
    no sponsorships, Esy is ours. */
export function Disclosure() {
  return (
    <p className="tl-disclosure">
      Not affiliated with any company listed. Product names are their owners’ trademarks. No sponsorships or affiliate links: picks are what I actually use. Esy is ours, and marked so.
    </p>
  );
}

export function Head({ children }: { children?: React.ReactNode }) {
  return (
    <header className="tl-head">
      <p className="tl-kicker">{TOOLS.length} tools · {JOBS.length} jobs · updated Oct 2026</p>
      <h1 className="tl-title">{TITLE}</h1>
      <p className="tl-sub">{SUB}</p>
      {children}
    </header>
  );
}

/* K1 · Directory */
export function TakeDirectory() {
  const [q, setQ] = useState('');
  const [job, setJob] = useState<ToolJob | 'All'>('All');
  const [learn, setLearn] = useState(false);
  const [ours, setOurs] = useState(false);
  const shown = useMemo(() => TOOLS.filter((t) =>
    (job === 'All' || t.job === job)
    && (!learn || t.links.length > 0)
    && (!ours || t.usedByEsy)
    && (!q || `${t.name} ${t.maker} ${t.does} ${t.job}`.toLowerCase().includes(q.toLowerCase()))), [q, job, learn, ours]);
  return (
    <main className="tl">
      <Head>
        <label className="tl-search">
          <Search size={18} aria-hidden="true" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tools: email, images, Claude…" aria-label="Search AI marketing tools" />
        </label>
      </Head>
      <div className="tl-wrap">
        <div className="tl-chips" role="tablist" aria-label="Filter by job">
          {(['All', ...JOBS] as const).map((j) => (
            <button key={j} type="button" role="tab" aria-selected={job === j} className={`tl-chip${job === j ? ' is-on' : ''}`} onClick={() => setJob(j)}>
              {j}{j !== 'All' && <span className="tl-chip-n">{toolsFor(j).length}</span>}
            </button>
          ))}
        </div>
        <div className="tl-toggles">
          <label><input type="checkbox" checked={learn} onChange={(e) => setLearn(e.target.checked)} /> Has a tutorial or review</label>
          <label><input type="checkbox" checked={ours} onChange={(e) => setOurs(e.target.checked)} /> We use it</label>
          <span className="tl-count">{shown.length} of {TOOLS.length}</span>
        </div>
        <div className="tl-grid">
          {shown.map((t) => (
            <article key={t.slug} className="tl-card">
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
          ))}
          {!shown.length && <p className="tl-empty">No tools match. Try another job or clear the search.</p>}
        </div>
      </div>
      <div className="tl-wrap"><Disclosure /></div>
    </main>
  );
}

/* K2 · My stack */
export function TakeStack() {
  return (
    <main className="tl">
      <Head />
      <div className="tl-wrap">
        {JOBS.map((job) => {
          const tools = toolsFor(job);
          // The pick: the tool Esy runs on for this job, else the first listed.
          const pick = tools.find((t) => t.usedByEsy) ?? tools[0];
          const others = tools.filter((t) => t !== pick);
          if (!pick) return null;
          return (
            <section key={job} className="tl-job" id={job}>
              <h2 className="tl-job-title">{job}</h2>
              <div className="tl-job-row">
                <article className="tl-pick">
                  <p className="tl-label">{pick.usedByEsy ? 'What I run' : 'Worth starting with'}</p>
                  <div className="tl-card-top">
                    <Tile tool={pick} size="lg" />
                    <div>
                      <h3 className="tl-name tl-name--lg">{pick.name}</h3>
                      <p className="tl-maker">{pick.maker}</p>
                    </div>
                  </div>
                  <p className="tl-does">{pick.does}</p>
                  {pick.take && <p className="tl-take">“{pick.take}”</p>}
                  <Badges tool={pick} />
                  <Links tool={pick} />
                </article>
                <div className="tl-others">
                  {others.length > 0 && <p className="tl-label">Also worth knowing</p>}
                  {others.map((t) => (
                    <div key={t.slug} className="tl-other">
                      <Tile tool={t} />
                      <div>
                        <p className="tl-other-name">{t.name} <span className="tl-maker">· {t.maker}</span></p>
                        <p className="tl-other-does">{t.does}</p>
                        {t.links[0] ? <Link href={t.links[0].href} className="tl-other-link">{t.links[0].kind}: {t.links[0].label} <ArrowRight size={12} aria-hidden="true" /></Link> : <span className="tl-coming">Review coming</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
      <div className="tl-wrap"><Disclosure /></div>
    </main>
  );
}

/* K3 · Guide */
export function TakeGuide() {
  return (
    <main className="tl">
      <Head />
      <div className="tl-wrap tl-guide">
        <nav className="tl-jump" aria-label="Jump to a job">
          {JOBS.map((j) => <a key={j} href={`#g-${j}`}>{j}</a>)}
        </nav>

        <h2 className="tl-h2">The tools at a glance</h2>
        <div className="tl-table-wrap">
          <table className="tl-table">
            <thead><tr><th>Tool</th><th>Best for</th><th>Free plan</th><th>Learn it</th></tr></thead>
            <tbody>
              {TOOLS.map((t) => (
                <tr key={t.slug}>
                  <td><span className="tl-td-tool"><Tile tool={t} /> <span><b>{t.name}</b><br /><span className="tl-maker">{t.maker}</span></span></span></td>
                  <td>{t.job}</td>
                  <td>{t.free ?? '—'}</td>
                  <td>{t.links[0] ? <Link href={t.links[0].href}>{t.links[0].kind}</Link> : <span className="tl-coming">Coming</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {JOBS.map((job) => (
          <section key={job} className="tl-gsec" id={`g-${job}`}>
            <h2 className="tl-h2">Best AI tools for {job.toLowerCase()}</h2>
            {toolsFor(job).map((t) => (
              <div key={t.slug} className="tl-gtool">
                <h3 className="tl-gname"><Tile tool={t} /> {t.name}</h3>
                <p className="tl-does">{t.does}{t.take ? ` ${t.take}` : ''}</p>
                <Badges tool={t} />
                <Links tool={t} />
              </div>
            ))}
          </section>
        ))}

        <section className="tl-faq">
          <h2 className="tl-h2">Questions</h2>
          <details open>
            <summary>What are the best AI tools for marketing?</summary>
            <p>It depends on the job. For writing, Claude; for images, ChatGPT Images or Nano Banana; for SEO, Ahrefs and Search Console; for email from your own systems, Resend. Each section above names what I run and why.</p>
          </details>
          <details>
            <summary>Are there free AI marketing tools?</summary>
            <p>Some: Search Console is free, and the email tools here have free tiers (Resend to 1,000 contacts, Beehiiv to 2,500 subscribers, Kit to 10,000).</p>
          </details>
          <details>
            <summary>How do I learn to use them?</summary>
            <p>Every tool links to a tutorial, review or course where one exists, and the weekly email walks through one system at a time.</p>
          </details>
        </section>
      </div>
      <div className="tl-wrap"><Disclosure /></div>
    </main>
  );
}
