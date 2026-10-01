'use client';
/**
 * ComposeBand — Compose's case study, the homepage's third app band
 * (2026-09-30, /prototypes/home-compose/). Three directions, one piece:
 * the AI News post on Google's September 2026 spam update, walked from its
 * team to live.
 *
 *   replay — night, Compose's own landing colour. The story beside a replay of
 *            the editor: the team, the draft, the check, your review, live.
 *            The same shape as clip.art's and SEOPage's bands.
 *   team   — paper. The team as the picture: a path of agents across the
 *            band, each station saying what it did on this piece, ending at
 *            you. Real AI News posts under it.
 *   page   — paper. The page as the picture: the piece as it reads in the
 *            editor, every checked claim underlined; tap one to see the
 *            Fact-checker's note and the source.
 *
 * The posts and the piece are real; the agents' notes are samples, labelled.
 */
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Pause, Play } from 'lucide-react';
import ComposeWordmark, { type ComposeMarkStyle } from './ComposeWordmark';
import { COMPOSE_URL, DOC, POSTS, TEAM, docUrl, splitClaims } from './composeShowcase';
import './ComposeBand.css';

export type ComposeBandStyle = 'replay' | 'team' | 'page';

const DESC =
  'A newsroom of agents for your publications. For each piece a Researcher finds the primary source, a Writer drafts in the publication’s voice, and a Fact-checker reads every claim against that source. Then it waits for you. AI News at esy.com/news is written this way, every post dated and sourced.';

const PROMISES: [string, string][] = [
  ['Nothing goes live without you.', 'Every piece ends in your review.'],
  ['Every claim has a source.', 'Checked against the primary page, not a summary of it.'],
  ['Every run is on the record.', 'Who did what, with which model, for what cost.'],
];

/** Meta row, title and CTA: the parts every case study shares. */
function Meta({ live = 'Live · In Production' }: { live?: string }) {
  return (
    <div className="nl-case-meta">
      <span className="nl-case-tag">Case Study</span>
      <span className="nl-case-live"><span className="nl-case-live-dot" aria-hidden="true" />{live}</span>
    </div>
  );
}

function Title({ mark }: { mark: ComposeMarkStyle }) {
  return (
    <h3 className="nl-case-title cb-title">
      <span className="cb-title-mark"><ComposeWordmark mark={mark} /></span>
      <span className="nl-case-title-tail">runs on Esy OS</span>
    </h3>
  );
}

function Cta() {
  return (
    <a href={COMPOSE_URL} target="_blank" rel="noopener noreferrer" className="nl-case-cta cb-cta">
      See Compose <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}

/* ═══ D · Replay ═══════════════════════════════════════════════════════ */

const BEATS = [
  { id: 'team', name: 'The team', secs: 4 },
  { id: 'draft', name: 'Draft', secs: 6 },
  { id: 'check', name: 'Check', secs: 6 },
  { id: 'review', name: 'You', secs: 5 },
  { id: 'live', name: 'Live', secs: 5 },
] as const;
type BeatId = (typeof BEATS)[number]['id'];

const RW = 900;
const RH = 630;

/** Plays the beats a tick at a time, only while on screen; reduced motion starts paused. */
function useReplay(box: React.RefObject<HTMLDivElement | null>) {
  const [pos, setPos] = useState({ i: 0, tick: 0 });
  const [playing, setPlaying] = useState(true);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false); // read once on mount
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [box]);
  useEffect(() => {
    if (!playing || !seen) return;
    const t = setInterval(() => setPos(({ i, tick }) => (tick + 1 < BEATS[i].secs ? { i, tick: tick + 1 } : { i: (i + 1) % BEATS.length, tick: 0 })), 900);
    return () => clearInterval(t);
  }, [playing, seen]);
  const beat = BEATS[pos.i];
  return { i: pos.i, beat: beat.id as BeatId, frac: (pos.tick + 1) / beat.secs, playing, setPlaying, seek: (i: number) => setPos({ i, tick: 0 }) };
}

/** The editor at true size: Compose's bar, the page, the team in a navy rail. */
function EditorPicture({ beat, frac }: { beat: BeatId; frac: number }) {
  const at = BEATS.findIndex((b) => b.id === beat);
  const drafted = at > 1 ? 1 : at === 1 ? frac : 0;
  const checked = at > 2 ? DOC.checks.length : at === 2 ? Math.ceil(frac * DOC.checks.length) : 0;
  const live = beat === 'live';
  // Who holds the piece in each beat: the team's stations light in turn.
  const holder = ['Researcher', 'Writer', 'Fact-checker', 'You', 'You'][at];
  const text = [DOC.headline, DOC.dek, ...DOC.body];
  const total = text.reduce((n, t) => n + t.length, 0);
  let budget = Math.round(drafted * total);
  const shown = text.map((t) => { const s = t.slice(0, Math.max(0, budget)); budget -= t.length; return s; });

  return (
    <div className="cbr-app">
      <header className="cbr-bar">
        <span className="cbr-back">← Library</span>
        <ComposeWordmark mark="lockup" className="cbr-mark" />
        <span className="cbr-where">{DOC.publication} · {DOC.story}</span>
        <span className={`cbr-state ${live ? 'is-live' : ''}`}>{live ? 'Live' : 'Draft'}</span>
        <span className="cbr-saved">{at === 0 ? 'Waiting for the Writer' : `${Math.round(drafted * DOC.words)} words · saved`}</span>
        <span className={`cbr-publish ${beat === 'review' ? 'is-ready' : ''} ${live ? 'is-done' : ''}`}>{live ? 'Published' : 'Publish'}</span>
      </header>
      <div className="cbr-body">
        <article className="cbr-page">
          <p className="cbr-kicker">{DOC.publication} · {DOC.story}</p>
          <h1>{shown[0] || <span className="cbr-ghost" />}</h1>
          <p className="cbr-dek">{shown[1]}</p>
          {DOC.body.map((_, p) => (
            <p key={p} className="cbr-para">
              {drafted < 1
                ? shown[2 + p]
                : splitClaims(p).map((s, k) => (s.check !== undefined && s.check < checked
                  ? <mark key={k} className="cbr-claim">{s.text}<Check size={13} aria-hidden="true" /></mark>
                  : <span key={k}>{s.text}</span>))}
            </p>
          ))}
          {at >= 2 && (
            <div className="cbr-source">
              <b>Source</b> {DOC.source.publisher} · {DOC.source.title} <i>{DOC.source.read}</i>
            </div>
          )}
          {live && <div className="cbr-toast"><Check size={16} aria-hidden="true" /> Live at esy.com/news/{DOC.slug}</div>}
        </article>
        <aside className={`cbr-rail ${at >= 3 ? "has-notes" : ""}`}>
          <p className="cbr-rail-h">AI News team</p>
          <ol className="cbr-path">
            {TEAM.map((m, k) => {
              const state = live || k < at ? 'done' : m.role === holder ? 'on' : 'next';
              return (
                <li key={m.role} className={`is-${state}`}>
                  <span className="cbr-dot">{state === 'done' ? <Check size={14} aria-hidden="true" /> : k + 1}</span>
                  <div><b>{m.role}</b><small>{state === 'on' ? (m.role === 'You' ? 'In your review' : 'Working…') : m.job}</small></div>
                </li>
              );
            })}
          </ol>
          {at >= 3 && (
            <div className="cbr-notes">
              <p className="cbr-rail-h">Notes to you</p>
              {DOC.notes.map((n) => <p key={n.role} className="cbr-note"><b>{n.role}</b>{n.text}</p>)}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Replay() {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const r = useReplay(box);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / RW));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className="cbr">
      <div className="cbr-frame">
        <div className="cbr-chrome" aria-hidden="true"><i /><i /><i /><span>compose.esy.com/write</span></div>
        <div className="cbr-screen" ref={box} style={{ height: RH * scale }} role="img" aria-label={`A replay of Compose: ${r.beat}`}>
          <div className="cbr-screen-in" style={{ width: RW, height: RH, transform: `scale(${scale})` }} inert>
            <EditorPicture beat={r.beat} frac={r.frac} />
          </div>
        </div>
      </div>
      <div className="cbr-controls">
        <button type="button" className="cbr-play" onClick={() => r.setPlaying(!r.playing)} aria-label={r.playing ? 'Pause the replay' : 'Play the replay'}>
          {r.playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
        </button>
        {BEATS.map((b, k) => (
          <button key={b.id} type="button" className={`cbr-step ${k === r.i ? 'is-on' : ''} ${k < r.i ? 'is-past' : ''}`} onClick={() => r.seek(k)}>
            <span className="cbr-step-bar"><span style={{ width: k === r.i ? `${r.frac * 100}%` : k < r.i ? '100%' : 0 }} /></span>
            {b.name}
          </button>
        ))}
      </div>
      <p className="cb-sample">A replay of a real AI News post. The agents’ notes are samples.</p>
    </div>
  );
}

function BandReplay({ mark }: { mark: ComposeMarkStyle }) {
  return (
    <section className="nl-lab cb cb--night" aria-label="Case study: Compose runs on Esy OS">
      <div className="nl-container">
        <div className="nl-case">
          <div className="nl-case-story">
            <Meta />
            <Title mark={mark} />
            <p className="nl-case-desc">{DESC}</p>
            <div className="nl-case-styles">
              <span className="nl-case-styles-label">{TEAM.length} on every team</span>
              <div className="nl-case-pills">{TEAM.map((m) => <span key={m.role} className="nl-case-pill">{m.role}</span>)}</div>
            </div>
            <div><Cta /></div>
          </div>
          <Replay />
        </div>
      </div>
    </section>
  );
}

/* ═══ E · Team ═════════════════════════════════════════════════════════ */

function BandTeam({ mark }: { mark: ComposeMarkStyle }) {
  const [on, setOn] = useState(0);
  const [held, setHeld] = useState(false);
  // The piece walks the path on its own until someone picks a station.
  useEffect(() => {
    if (held) return;
    const t = setInterval(() => setOn((k) => (k + 1) % (TEAM.length + 1)), 2600);
    return () => clearInterval(t);
  }, [held]);
  const pick = (k: number) => { setHeld(true); setOn(k); };

  return (
    <section className="cb cb--paper cb-team" aria-label="Case study: Compose runs on Esy OS">
      <div className="nl-container">
        <div className="cb-team-head">
          <Meta />
          <Title mark={mark} />
          <p className="nl-case-desc">{DESC}</p>
        </div>

        <div className="cb-path" role="tablist" aria-label="One piece, station by station">
          {TEAM.map((m, k) => (
            <button key={m.role} type="button" role="tab" aria-selected={on === k}
              className={`cb-station ${on === k ? 'is-on' : ''} ${on > k ? 'is-done' : ''} ${m.role === 'You' ? 'is-you' : ''}`} onClick={() => pick(k)}>
              <span className="cb-station-n">{on > k ? <Check size={14} aria-hidden="true" /> : String(k + 1).padStart(2, '0')}</span>
              <b>{m.role}</b>
              <small>{m.job}</small>
              <span className="cb-station-did">{m.did}</span>
            </button>
          ))}
          <button type="button" role="tab" aria-selected={on === TEAM.length} className={`cb-station cb-station--live ${on === TEAM.length ? 'is-on' : ''}`} onClick={() => pick(TEAM.length)}>
            <span className="cb-station-n"><span className="nl-case-live-dot" aria-hidden="true" /></span>
            <b>Live</b>
            <small>Dated and sourced</small>
            <span className="cb-station-did">Published to esy.com/news on September 30.</span>
          </button>
        </div>
        <p className="cb-path-piece">
          On this piece: <a href={docUrl} target="_blank" rel="noopener noreferrer">{DOC.headline} <ArrowUpRight size={13} aria-hidden="true" /></a>
          <span className="cb-sample"> The agents’ notes are samples.</span>
        </p>

        <div className="cb-team-foot">
          <div>
            <span className="nl-case-styles-label">Live on AI News</span>
            <ul className="cb-posts">
              {POSTS.map((p) => (
                <li key={p.slug}><a href={`https://esy.com/news/${p.slug}/`} target="_blank" rel="noopener noreferrer"><span>{p.story}</span>{p.title}</a></li>
              ))}
            </ul>
          </div>
          <div className="cb-team-cta"><Cta /><a href="https://esy.com/news/" className="cb-link">Read AI News</a></div>
        </div>
      </div>
    </section>
  );
}

/* ═══ F · Page ═════════════════════════════════════════════════════════ */

function BandPage({ mark }: { mark: ComposeMarkStyle }) {
  const [open, setOpen] = useState<number | null>(1);
  const check = open === null ? null : DOC.checks[open];
  const toggle = (k: number) => setOpen(open === k ? null : k);

  return (
    <section className="cb cb--paper cb-pagecase" aria-label="Case study: Compose runs on Esy OS">
      <div className="nl-container">
        <div className="nl-case">
          <div className="nl-case-story">
            <Meta />
            <Title mark={mark} />
            <p className="nl-case-desc">{DESC}</p>
            <ol className="cb-promises">
              {PROMISES.map(([a, b], k) => <li key={a}><span>{String(k + 1).padStart(2, '0')}</span><div><b>{a}</b>{b}</div></li>)}
            </ol>
            <div><Cta /></div>
          </div>

          <div className="cb-sheet-wrap">
            <article className="cb-sheet" aria-label="The piece in Compose's editor">
              <div className="cb-sheet-top">
                <span>{DOC.publication} · {DOC.story}</span>
                <span className="cb-sheet-state">Live</span>
              </div>
              <h4>{DOC.headline}</h4>
              <p className="cb-sheet-dek">{DOC.dek}</p>
              {DOC.body.map((_, p) => (
                <p key={p}>
                  {splitClaims(p).map((s, k) => (s.check !== undefined ? (
                    // An inline span, not a <button>: buttons can't wrap mid-claim, which breaks the paragraph's lines.
                    <span key={k} role="button" tabIndex={0} className={`cb-claim ${open === s.check ? 'is-open' : ''}`} aria-expanded={open === s.check}
                      onClick={() => toggle(s.check!)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(s.check!); } }}>
                      {s.text}
                    </span>
                  ) : <span key={k}>{s.text}</span>))}
                </p>
              ))}
              <div className={`cb-bubble ${check ? 'is-on' : ''}`} aria-live="polite">
                {check ? (
                  <>
                    <span className="cb-bubble-who"><Check size={13} aria-hidden="true" /> Fact-checker</span>
                    <p>“{check.claim}”: {check.note}</p>
                    <span className="cb-bubble-src">{DOC.source.publisher} · {DOC.source.read}</span>
                  </>
                ) : <p className="cb-bubble-hint">Tap an underlined claim to see how it was checked.</p>}
              </div>
              <div className="cb-sheet-foot">
                <span>{DOC.checks.length} claims checked · 1 source · {DOC.words} words</span>
                <a href={docUrl} target="_blank" rel="noopener noreferrer">Read it live <ArrowUpRight size={13} aria-hidden="true" /></a>
              </div>
            </article>
            <p className="cb-sample">A real AI News post. The Fact-checker’s notes are samples.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ComposeBand({ band, mark }: { band: ComposeBandStyle; mark: ComposeMarkStyle }) {
  if (band === 'team') return <BandTeam mark={mark} />;
  if (band === 'page') return <BandPage mark={mark} />;
  return <BandReplay mark={mark} />;
}
