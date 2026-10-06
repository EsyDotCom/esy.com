'use client';

// Copied from os.esy.com (src/components/folio/agency/builder2.tsx and
// builderproto.tsx on the proto/page-builder branch, PR #319, 2026-10-04) so
// esy.com/prototypes shows the real builder. Same markup and class names.

import { useState, type CSSProperties, type ReactNode } from 'react';
import { ALTS, CURRENT, SECTIONS, TREE, type Hero } from './sample';
import { Frame, HeroBlock, Rank, Rest, Site } from './site';
import { Lockup } from './lockup';

const NAV = ['Home', 'Brief', 'Inbox', 'Clients', 'Work', 'Agents', 'Data'];

export function ShellBar() {
  return (
    <header className="fo-bar">
      <div className="fo-bar-in">
        <Lockup />
        <nav className="fo-nav" aria-label="Esy OS">
          {NAV.map((n) => <a key={n} href="#" className={n === 'Work' ? 'is-on' : ''} aria-current={n === 'Work' ? 'page' : undefined}>{n}{n === 'Inbox' ? <span className="gl-badge">3</span> : null}</a>)}
        </nav>
        <div className="fo-bar-end">
          <a className="fo-btn fo-btn--primary nj-newbtn" href="#">+ New job</a>
          <a className="fo-bar-link" href="#">Runway</a>
          <a className="fo-bar-link" href="#">Classic</a>
          <a className="fo-bar-link" href="#">Settings</a>
        </div>
      </div>
    </header>
  );
}

export function Mast() {
  return (
    <header className="rv-mast rb-mast">
      <div>
        <p className="rv-kicker"><a className="cx-back" href="#">Work</a> · <a className="cx-back" href="#">Pieces</a> · Northside Roofing</p>
        <h1 className="rv-title">Roof leak repair, Denver</h1>
        <p className="cx-facts"><span>Page</span><span>Draft, v4</span><span>9 of 10 checks</span><span>Dan approves</span></p>
      </div>
      <div className="cx-mast-act"><button className="fo-btn">Preview</button><button className="fo-btn fo-btn--primary">Send to Dan for approval</button></div>
    </header>
  );
}

export function Device() {
  return <div className="rb-seg" role="tablist" aria-label="Device"><button role="tab" aria-selected className="is-on">Desktop</button><button role="tab" aria-selected={false}>Phone</button></div>;
}

export function Tabs() {
  const [on, setOn] = useState('hero');
  return (
    <div className="rb-tabs" role="tablist" aria-label="Sections">
      {SECTIONS.map((s) => <button key={s.id} role="tab" aria-selected={on === s.id} className={on === s.id ? 'is-on' : ''} onClick={() => setOn(s.id)}>{s.name}{s.lock ? <small> · locked</small> : null}</button>)}
      <button className="rb-tab-add">+ Section</button>
    </div>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="rb-app">
      <ShellBar />
      <div className="rb-body"><Mast />{children}</div>
    </div>
  );
}

export function SectionRail({ onTry, tone = '' }: { onTry: () => void; tone?: string }) {
  const [h1, setH1] = useState(CURRENT.h1);
  return (
    <aside className={`rb-rail2 ${tone}`} aria-label="Editing the hero">
      <header className="rr-head">
        <p className="rr-kicker">Editing section</p>
        <div className="rr-titlerow"><h2>Hero</h2><span className="rr-ver">v1</span><button className="rr-ghost">Lock</button></div>
        <p className="rr-meta">Made by Esy · kept by Zev, Oct 2</p>
      </header>

      <section className="rr-group">
        <h3>Words</h3>
        <label className="rr-field">
          <span className="rr-label">Headline <em>{h1.length} / 60</em></span>
          <input value={h1} onChange={(e) => setH1(e.target.value)} />
        </label>
        <label className="rr-field">
          <span className="rr-label">Subline</span>
          <textarea rows={3} defaultValue={CURRENT.sub} />
        </label>
      </section>

      <section className="rr-group">
        <h3>Checks <em>3 of 4</em></h3>
        <div className="rr-issue">
          <b>“roof leak repair” isn’t in the headline</b>
          <span>It’s the search this page is built to win.</span>
          <button className="rr-link">Suggest a fix</button>
        </div>
        <ul className="rr-passes"><li>One clear headline</li><li>City up front</li><li>A number to tap</li></ul>
      </section>

      <section className="rr-group rr-try">
        <h3>Try other versions</h3>
        <div className="rr-chips" role="group" aria-label="Quick nudges">
          {['More urgent', 'Lead with reviews', 'Shorter'].map((c) => <button key={c}>{c}</button>)}
        </div>
        <label className="rr-field">
          <span className="rr-label">Or say it your way</span>
          <input placeholder="e.g. mention the free roof check" />
        </label>
        <button className="rr-primary" onClick={onTry}>Try 3 more</button>
        <p className="rr-hint">Three different bets, ranked, each held to the hero’s checks.</p>
      </section>

      <section className="rr-group">
        <h3>History</h3>
        <ol className="rr-hist"><li><b>v1</b> kept by Zev <span>Oct 2</span></li><li className="is-old"><b>Draft</b> made by Esy <span>Oct 1</span></li></ol>
      </section>
    </aside>
  );
}

export function HeroThumb({ h, on, onPick }: { h: Hero; on?: boolean; onPick?: () => void }) {
  return (
    <button className={`vz-thumb ${on ? 'is-on' : ''}`} onClick={onPick} aria-pressed={on} aria-label={`Preview ${h.v}`}>
      <span className="vz-thumb-in"><Site><HeroBlock h={h} /></Site></span>
    </button>
  );
}

export function VaryBar({ onVary, sel = 'Hero' }: { onVary: () => void; sel?: string }) {
  return (
    <div className="rb-row rb-row--ctx vz-vary">
      <span className="rb-ctx-what"><b>{sel}</b></span>
      <button className="rb-act rb-act--try" onClick={onVary}>Try 3 more</button>
      <span className="rb-div" />
      <button className="rb-act">Lock</button>
      <button className="rb-act">Undo</button>
      <span className="rb-ctx-sp" />
      <span className="rb-ctx-warn">! Search not in headline</span>
    </div>
  );
}

export function VersionCards({ preview, setPreview, onClose, dense = false }: { preview: string; setPreview: (id: string) => void; onClose?: () => void; dense?: boolean }) {
  return (
    <div className={`vz-list ${dense ? 'is-dense' : ''}`}>
      {onClose && <div className="vz-list-head"><p className="rb-k">Hero · 3 versions</p><button className="fo-textbtn" onClick={onClose}>Close</button></div>}
      {ALTS.map((a) => (
        <div key={a.id} className={`vz-card ${preview === a.id ? 'is-on' : ''}`} onMouseEnter={() => setPreview(a.id)}>
          <HeroThumb h={a} on={preview === a.id} onPick={() => setPreview(a.id)} />
          <p className="vz-card-top"><Rank n={a.rank!} /><b>{a.v} · {a.bet}</b></p>
          {!dense && <p className="vz-why">{a.why}</p>}
          {a.fails ? <p className="rb-fail">{a.fails}</p> : <p className="rb-pass">Passes every hero check</p>}
          <div className="vz-acts"><button className="vz-keep">Keep {a.v}</button><button className="rb-act">Edit</button></div>
        </div>
      ))}
    </div>
  );
}

export function VzFrame({ hero, swapping, bar, foot, sel: selProp, setSel: setSelProp, toolsFor }: { hero: Hero; swapping: boolean; bar: ReactNode; foot?: ReactNode; sel?: string; setSel?: (id: string) => void; toolsFor?: (id: string) => ReactNode }) {
  const [selOwn, setSelOwn] = useState('hero');
  const sel = selProp ?? selOwn;
  const setSel = setSelProp ?? setSelOwn;
  return (
    <div className="rb-frame vz-frame">
      <div className="rb-framebar">{bar}</div>
      <div className="rb-canvas"><Site>
        <Frame id="hero" label={`Hero · ${hero.v}${swapping ? ' · previewing' : ''}`} selected={sel === 'hero'} onPick={setSel} tools={toolsFor?.('hero')}><HeroBlock h={hero} /></Frame>
        <Rest sel={sel} onPick={setSel} faded={swapping} toolsFor={toolsFor} />
      </Site></div>
      {foot}
    </div>
  );
}

export const FrameBar = ({ onVary }: { onVary: () => void }) => (
  <>
    <div className="rb-row"><Tabs /><span className="rb-ctx-sp" /><Device /><span className="rb-score"><b>9</b>/10 checks</span></div>
    <VaryBar onVary={onVary} />
  </>
);

export function HistoryTree({ pick, setPick }: { pick: string; setPick: (id: string) => void }) {
  return (
    <>
      <div className="rr-group vz-histhead"><h3>Every version is kept <em>6</em></h3><p className="rr-hint">Branch from any of them. Each is an artifact on the page’s record: what it was made from, its checks, its cost, who kept it.</p></div>
      <ol className="vz-tree">
        {TREE.map((t) => (
          <li key={t.id} className={`is-${t.state} ${pick === t.id ? 'is-on' : ''}`} style={{ paddingLeft: 28 + t.depth * 18, ['--d' as string]: t.depth } as CSSProperties}>
            <button onClick={() => setPick(t.id)}><b>{t.label}</b><span>{t.who}</span></button>
            {pick === t.id && (
              <div className="vz-acts">
                {t.state === 'live' ? <span className="vz-livetag">On the page</span> : <button className="vz-keep">Restore {t.id}</button>}
                <button className="rb-act">Try 3 more from here</button><button className="rb-act">Compare with live</button>
              </div>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}

