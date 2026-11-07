'use client';
/**
 * The visual for each Esy OS feature on the homepage (round 2, 2026-11-07). Each one proves its
 * feature with the product's own content where it exists:
 *   real    compose-team (ComposeReplay), compose-checks and compose-posts (composeShowcase.ts),
 *           scout-map, scout-basis and scout-directory (esy.com/scout's data)
 *   sample  agency-today, agency-approve, agency-search: drawn with illustrative figures, and each says so
 * Every visual fills its container's width; `tone` picks the light or night finish.
 */
import { useState } from 'react';
import { Check, CornerDownRight, RefreshCw } from 'lucide-react';
import { ComposeReplay } from './ComposeBand';
import { DOC, POSTS, docUrl, splitClaims } from './composeShowcase';
import { FunnelMap } from '@/components/Scout/FunnelMap';
import { BASIS, FUNNELS, type Basis } from '@/components/Scout/funnels';
import snapshot from '@/data/scout/snapshot.json';
import type { FeatureVisual } from './osAppFeatures';

export type Tone = 'night' | 'paper';

const Sample = ({ children = 'Sample figures, to show the screen.' }: { children?: string }) => <p className="ofv-sample">{children}</p>;

/** A quiet window: three dots and the real address. */
export function Frame({ url, tone, children, flush }: { url: string; tone: Tone; children: React.ReactNode; flush?: boolean }) {
  return (
    <figure className={`ofv-frame is-${tone} ${flush ? 'is-flush' : ''}`}>
      <div className="ofv-frame-bar" aria-hidden="true"><i /><i /><i /><span>{url}</span></div>
      <div className="ofv-frame-body">{children}</div>
    </figure>
  );
}

// ── agency (samples) ─────────────────────────────────────────────────────────────────────

function AgencyToday({ tone }: { tone: Tone }) {
  const tiles = [
    { v: '$1,240', label: 'earned today', since: '3 Stripe payments', tone: 'jade' },
    { v: '$18.40', label: 'spent today', since: '$412 this month' },
    { v: '27', label: 'made today', since: 'filed since midnight' },
    { v: '2', label: 'waiting on you', since: 'of 4 agents working', tone: 'gold' },
  ];
  return (
    <Frame url="os.esy.com/agency" tone={tone}>
      <div className="ofv-pad">
        <p className="ofv-kicker">Today · Thursday</p>
        <div className="ofv-tiles">
          {tiles.map((t) => <div key={t.label} className={`ofv-tile ${t.tone ? `is-${t.tone}` : ''}`}><b>{t.v}</b><span>{t.label}</span><small>{t.since}</small></div>)}
        </div>
        <Sample />
      </div>
    </Frame>
  );
}

function AgencyApprove({ tone }: { tone: Tone }) {
  const [done, setDone] = useState(false);
  const made = [
    ['Sources', '3 pages, read Nov 6'],
    ['Model', 'Claude Opus 5.5'],
    ['Checks', 'Facts matched · voice passed'],
    ['Cost', '$0.42'],
  ];
  return (
    <Frame url="os.esy.com/agency/work" tone={tone}>
      <div className="ofv-pad">
        <p className="ofv-kicker">Waiting on you · Review</p>
        <div className="ofv-review">
          <div>
            <b>What to automate first in a one-person agency</b>
            <small>Article · 1,180 words · drafted by the Writer, checked by the Fact-checker</small>
          </div>
          <button type="button" className={`ofv-approve ${done ? 'is-done' : ''}`} onClick={() => setDone(!done)} aria-pressed={done}>
            {done ? <><Check size={14} aria-hidden="true" />Approved</> : 'Approve'}
          </button>
        </div>
        <dl className="ofv-made">
          {made.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
        <Sample>A sample piece, to show the review.</Sample>
      </div>
    </Frame>
  );
}

function AgencySearch({ tone }: { tone: Tone }) {
  const rows = [
    { q: 'ai marketing agency tools', where: 'Search Console', delta: '−38% clicks', act: 'Update the page' },
    { q: 'claude code for marketers', where: 'GA4 · Bing', delta: 'rising, no page', act: 'Write a new page' },
    { q: 'n8n vs make', where: 'Search Console', delta: 'position 11 → 7', act: 'Add a comparison' },
  ];
  return (
    <Frame url="os.esy.com/agency/search" tone={tone}>
      <div className="ofv-pad">
        <p className="ofv-kicker">What to make next</p>
        <ul className="ofv-search">
          {rows.map((r) => (
            <li key={r.q}>
              <span className="ofv-q">{r.q}<small>{r.where} · {r.delta}</small></span>
              <span className="ofv-act"><CornerDownRight size={13} aria-hidden="true" />{r.act}</span>
            </li>
          ))}
        </ul>
        <Sample>Sample searches, to show the screen.</Sample>
      </div>
    </Frame>
  );
}

// ── compose (real) ───────────────────────────────────────────────────────────────────────

/** The real piece, with each checked claim marked and the Fact-checker's note for the picked one. */
function ComposeChecks({ tone }: { tone: Tone }) {
  const [on, setOn] = useState(0);
  const check = DOC.checks[on];
  return (
    <Frame url="compose.esy.com/write" tone={tone}>
      <div className="ofv-pad ofv-doc">
        <p className="ofv-kicker">{DOC.publication} · {DOC.story}</p>
        <h4>{DOC.headline}</h4>
        {DOC.body.map((_, p) => (
          <p key={p}>
            {splitClaims(p).map((part, i) => part.check == null ? <span key={i}>{part.text}</span> : (
              <button key={i} type="button" className={`ofv-claim ${part.check === on ? 'is-on' : ''}`} onClick={() => setOn(part.check!)}>{part.text}</button>
            ))}
          </p>
        ))}
        <div className="ofv-check" aria-live="polite">
          {check.note.includes('Re-check') ? <RefreshCw size={14} aria-hidden="true" /> : <Check size={14} aria-hidden="true" />}
          <span><b>Fact-checker:</b> {check.note}<small>{DOC.source.publisher} · {DOC.source.read}</small></span>
        </div>
        <p className="ofv-sample">The piece and its source are real; the Fact-checker’s notes are samples. <a href={docUrl}>Read the post</a>.</p>
      </div>
    </Frame>
  );
}

function ComposePosts({ tone }: { tone: Tone }) {
  return (
    <Frame url="esy.com/news" tone={tone}>
      <ol className="ofv-posts">
        {POSTS.map((p) => (
          <li key={p.slug}>
            <a href={`/news/${p.slug}/`}><small>{p.story}</small><b>{p.title}</b></a>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

// ── scout (real) ─────────────────────────────────────────────────────────────────────────

function ScoutMap({ tone }: { tone: Tone }) {
  const [pick, setPick] = useState<string | null>(null);
  const f = FUNNELS.find((x) => x.id === 'gamma')!;
  return (
    <Frame url="esy.com/scout" tone={tone} flush>
      <div className="folio ofv-map">
        <p className="ofv-map-h">{f.title}</p>
        <FunnelMap f={f} skin="plate" pick={pick} setPick={setPick} />
      </div>
    </Frame>
  );
}

function ScoutBasis({ tone }: { tone: Tone }) {
  const order: Basis[] = ['counted', 'seen', 'reading', 'open'];
  const total = order.reduce((n, b) => n + snapshot.lines[b], 0);
  return (
    <Frame url="esy.com/scout#how" tone={tone}>
      <div className="ofv-pad">
        <p className="ofv-kicker">{total} lines across the roster</p>
        <div className="ofv-stack" role="img" aria-label={order.map((b) => `${BASIS[b].name} ${snapshot.lines[b]}`).join(', ')}>
          {order.filter((b) => snapshot.lines[b]).map((b) => <span key={b} className={`is-${b}`} style={{ flexGrow: snapshot.lines[b] }} />)}
        </div>
        <ul className="ofv-basis">
          {order.map((b) => (
            <li key={b}><span className={`ofv-chip is-${b}`}>{BASIS[b].name}</span><b>{snapshot.lines[b]}</b><small>{BASIS[b].says}</small></li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

function ScoutDirectory({ tone }: { tone: Tone }) {
  const people = snapshot.creators.slice(0, 21);
  return (
    <Frame url="esy.com/scout#directory" tone={tone}>
      <div className="ofv-pad">
        <p className="ofv-kicker">{snapshot.creators.length} creators · n8n, Gamma, Clay and more</p>
        <ul className="ofv-faces">
          {people.map((p) => (
            <li key={p.id} title={p.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {p.avatar ? <img src={p.avatar} alt="" width={36} height={36} loading="lazy" referrerPolicy="no-referrer" /> : <span>{p.name[0]}</span>}
            </li>
          ))}
        </ul>
        <p className="ofv-sample">Independent analysis of public pages; not affiliated with anyone shown.</p>
      </div>
    </Frame>
  );
}

export function FeatureVisual({ id, tone }: { id: FeatureVisual; tone: Tone }) {
  switch (id) {
    case 'agency-today': return <AgencyToday tone={tone} />;
    case 'agency-approve': return <AgencyApprove tone={tone} />;
    case 'agency-search': return <AgencySearch tone={tone} />;
    case 'compose-team': return <ComposeReplay />;
    case 'compose-checks': return <ComposeChecks tone={tone} />;
    case 'compose-posts': return <ComposePosts tone={tone} />;
    case 'scout-map': return <ScoutMap tone={tone} />;
    case 'scout-basis': return <ScoutBasis tone={tone} />;
    case 'scout-directory': return <ScoutDirectory tone={tone} />;
  }
}
