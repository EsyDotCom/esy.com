'use client';

// Copied from os.esy.com (src/components/folio/agency/builder2.tsx and
// builderproto.tsx on the proto/page-builder branch, PR #319, 2026-10-04) so
// esy.com/prototypes shows the real builder. Same markup and class names.

import { useState } from 'react';
import { ALTS, CURRENT, type Hero } from './sample';
import { FrameBar, HistoryTree, SectionRail, VersionCards, VzFrame } from './parts';
import { FloatTools, SectionBar, secName, type BarKind } from './bars';
import { Shell, type ShellKind } from './headers';

/** R12, the picked builder. `bar` swaps the bar above the page (R18–R20);
 *  `shell` gives the builder its own header (R21–R23). */
export function PageBuilder({ demark = '', bar, shell }: { demark?: string; bar?: BarKind; shell?: ShellKind } = {}) {
  const [sel, setSel] = useState('hero');
  const [tab, setTab] = useState<'versions' | 'edit' | 'checks' | 'history'>('versions');
  const [swapping, setSwapping] = useState(true);
  const [preview, setPreview] = useState('h1');
  const [hist, setHist] = useState('v2');
  const fromTree = (id: string): Hero => (id === 'v1' ? CURRENT : id === 'v3' ? ALTS[1] : id === 'v4' ? ALTS[2] : ALTS[0]);
  // Leaving the hero (R18–R20) ends its preview: the page shows what's kept.
  const other = !!bar && sel !== 'hero';
  const hero = other ? CURRENT : tab === 'history' ? fromTree(hist) : swapping ? [CURRENT, ...ALTS].find((h) => h.id === preview) ?? CURRENT : CURRENT;
  const previewing = other ? false : tab === 'history' ? hist !== 'v2' : swapping;
  // Each tab: its name, and what's in it underneath.
  const tabs = [
    ['versions', 'Versions', swapping && !other ? '3 new' : 'none yet'],
    ['edit', 'Edit', 'words'],
    ['checks', 'Checks', '3 of 4'],
    ['history', 'History', '6 kept'],
  ] as const;
  const onTry = () => { setSwapping(true); setTab('versions'); };
  // The picked section drives the bar, the canvas and the rail together.
  const pick = (id: string) => {
    setSel(id);
    // Scroll only the builder (scrollIntoView would also scroll the page
    // around the prototype's window): the canvas when it scrolls on its own
    // (R21–R23), otherwise this window, clear of the stuck bars.
    const el = document.querySelector<HTMLElement>(`.rb-canvas [data-sid="${id}"]`);
    if (!el) return;
    const box = el.closest<HTMLElement>('.rb-canvas');
    if (box && box.scrollHeight > box.clientHeight) {
      box.scrollTo({ top: box.scrollTop + el.getBoundingClientRect().top - box.getBoundingClientRect().top - 16, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 190, behavior: 'smooth' });
    }
  };
  return (
    <Shell kind={shell}>
      <div className={`rb-work is-swapping rb-navysel ${demark}`}>
        <VzFrame
          hero={hero}
          swapping={previewing}
          bar={bar ? <SectionBar kind={bar} sel={sel} setSel={pick} onTry={onTry} device={shell !== 'navy'} /> : <FrameBar onVary={onTry} />}
          {...(bar ? { sel, setSel: pick } : {})}
          toolsFor={bar === 'float' ? (id) => (id === sel ? <FloatTools sel={sel} onTry={onTry} /> : null) : undefined}
        />
        <aside className="rb-rail2 rr--cards vz-rail" aria-label={secName(bar ? sel : 'hero')}>
          <div className="vz-tabs" role="tablist">
            {tabs.map(([k, l, n]) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'is-on' : ''} onClick={() => setTab(k)}><span>{l}</span><small>{n}</small></button>)}
          </div>
          {tab === 'versions' && other && <p className="vz-empty">Try 3 more on {secName(sel)} to see three versions of it here.</p>}
          {tab === 'versions' && !other && (swapping ? <VersionCards preview={preview} setPreview={setPreview} onClose={() => setSwapping(false)} /> : <p className="vz-empty">Use Try 3 more above the page to see three versions here.</p>)}
          {tab === 'edit' && <div className="vz-editwrap"><SectionRail tone="rr--cards" onTry={() => { setSwapping(true); setTab('versions'); }} /></div>}
          {tab === 'checks' && <div className="rr-group"><h3>Hero checks <em>3 of 4</em></h3><div className="rr-issue"><b>“roof leak repair” isn’t in the headline</b><span>It’s the search this page is built to win.</span><button className="rr-link">Suggest a fix</button></div><ul className="rr-passes"><li>One clear headline</li><li>City up front</li><li>A number to tap</li></ul></div>}
          {tab === 'history' && <HistoryTree pick={hist} setPick={setHist} />}
        </aside>
      </div>
    </Shell>
  );
}
