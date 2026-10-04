'use client';

// Copied from os.esy.com (src/components/folio/agency/builder2.tsx and
// builderproto.tsx on the proto/page-builder branch, PR #319, 2026-10-04) so
// esy.com/prototypes shows the real builder. Same markup and class names.

import type { ReactNode } from 'react';
import { PHONE, type Hero } from './sample';

export function HeroBlock({ h }: { h: Hero }) {
  return (
    <div className="np-hero">
      <p className="np-eyebrow">Northside Roofing · Denver</p>
      <h1>{h.h1}</h1>
      <p className="np-sub">{h.sub}</p>
      <p className="np-ctas"><span className="np-btn">Call {PHONE}</span><span className="np-btn np-btn--ghost">Get a free roof check</span></p>
    </div>
  );
}

export function Frame({ id, label, selected, locked, onPick, children, tools }: { id: string; label: string; selected?: boolean; locked?: boolean; onPick?: (id: string) => void; children: ReactNode; tools?: ReactNode }) {
  return (
    <section className={`np-sec ${selected ? 'is-sel' : ''} ${locked ? 'is-lock' : ''}`} data-sid={id} onClick={() => onPick?.(id)}>
      <span className="np-tag">{label}{locked ? ' · locked' : ''}</span>
      {tools}
      {children}
    </section>
  );
}

export function Rest({ sel, onPick, faded, toolsFor }: { sel?: string; onPick?: (id: string) => void; faded?: boolean; toolsFor?: (id: string) => ReactNode }) {
  return (
    <div className={faded ? 'np-faded' : ''}>
      <Frame id="proof" tools={toolsFor?.('proof')} label="Proof · v2" locked selected={sel === 'proof'} onPick={onPick}>
        <div className="np-proof"><span><b>4.9 ★</b> 212 Google reviews</span><span><b>Licensed</b> &amp; insured in Colorado</span><span><b>10-year</b> workmanship warranty</span></div>
      </Frame>
      <Frame id="services" tools={toolsFor?.('services')} label="Services · v1" locked selected={sel === 'services'} onPick={onPick}>
        <div className="np-services">
          <h2>What we fix</h2>
          <ul>{['Leak repair', 'Storm and hail damage', 'Shingle replacement', 'Emergency tarping'].map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </Frame>
      <Frame id="faq" tools={toolsFor?.('faq')} label="Questions · v3" selected={sel === 'faq'} onPick={onPick}>
        <div className="np-faq">
          <h2>Roof leak questions</h2>
          {['How much does a roof leak repair cost in Denver?', 'Can you come out today?', 'Will insurance cover it?'].map((q) => <p key={q}><b>{q}</b></p>)}
        </div>
      </Frame>
      <Frame id="cta" tools={toolsFor?.('cta')} label="Call to action · v1" selected={sel === 'cta'} onPick={onPick}>
        <div className="np-cta"><h2>Leak today? Call now.</h2><span className="np-btn">Call {PHONE}</span></div>
      </Frame>
    </div>
  );
}

export function Site({ children }: { children: ReactNode }) {
  return (
    <div className="np-site">
      <div className="np-nav"><b>Northside Roofing</b><span>Services · Reviews · Contact</span><span className="np-btn np-btn--sm">{PHONE}</span></div>
      {children}
    </div>
  );
}

export function Rank({ n }: { n: number }) {
  return <span className={`bd-rank is-${n}`}>{n === 1 ? '1st' : n === 2 ? '2nd' : '3rd'}</span>;
}

