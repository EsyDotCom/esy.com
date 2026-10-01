'use client';

/* D · Control room: the run as a dark, cinematic console on the navy band.
 * The render develops from blur to sharp under a scan line; the green screen
 * wipes away to a checkerboard; the audit traces a jade outline round the
 * silhouette; the name types itself in. A real clock and cost ticker run
 * along the top, and a timeline drawn to the run's real proportions along the
 * bottom (the render really is most of it).
 */
import { Pause, Play } from 'lucide-react';
import { CLIPART_RUN as RUN } from './clipartRun';
import { clock, money, useRunReplay, type Phase } from './useRunReplay';

const STAGES: { phase: Phase; label: string }[] = [
  { phase: 'render', label: 'Render' },
  { phase: 'cutout', label: 'Cutout' },
  { phase: 'audit', label: 'Audit' },
  { phase: 'name', label: 'Name' },
  { phase: 'gate', label: 'Gate' },
];

// The render is 31.6 of the run's 37.9 seconds; the bar shows that truthfully.
const WIDTH: Partial<Record<Phase, number>> = { render: 76, cutout: 6, audit: 5, name: 7, gate: 6 };

export default function ReplayControlRoom() {
  const r = useRunReplay();
  const { phase, p } = r;
  const rendering = phase === 'render';
  const cut = r.past('render') && !rendering;
  const typed = phase === 'name' ? RUN.title.slice(0, Math.round(RUN.title.length * p)) : r.past('name') ? RUN.title : '';

  return (
    <div className="rc" aria-label={`A real clip.art run replayed: ${RUN.subject}, $${RUN.totalUsd} in ${RUN.seconds}s`}>
      <header className="rc-top">
        <span className="rc-live"><i /> {phase === 'done' ? 'Complete' : phase === 'order' ? 'Queued' : 'Running'}</span>
        <span className="rc-id">{RUN.id}</span>
        <span className="rc-counter"><small>Run time</small>{clock(r.runSeconds)}</span>
        <span className="rc-counter"><small>Cost</small>{money(r.usd)}</span>
        {/* Play/pause, like the SEOPage and Compose replays. */}
        <button type="button" className="rc-play" onClick={r.toggle} aria-label={r.playing ? 'Pause the replay' : 'Play the replay'}>
          {r.playing ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
        </button>
      </header>

      <p className={`rc-prompt ${phase === 'order' ? 'is-typing' : ''}`}>
        <span>›</span> {phase === 'order' ? RUN.subject.slice(0, Math.round(RUN.subject.length * Math.min(1, p * 1.4))) : RUN.subject}
        <b>{RUN.style} · {RUN.aspect}</b>
      </p>

      {/* The canvas: green screen, then the cutout on a checkerboard. */}
      <div className={`rc-canvas ${cut ? 'is-cut' : ''} rc-canvas--${phase}`}>
        {phase !== 'order' && (
          <>
            {/* The cutout sits underneath; the green render lies on top and
                wipes away during the cutout step, left to right. */}
            {/* eslint-disable-next-line @next/next/no-img-element -- the run's own output */}
            <img src={RUN.cutout} alt="" className={`rc-cutout ${r.past('audit', true) ? 'is-traced' : ''}`} />
            {/* eslint-disable-next-line @next/next/no-img-element -- the run's own output */}
            <img
              src={RUN.render}
              alt=""
              className="rc-render"
              style={
                rendering
                  ? { filter: `blur(${Math.round(24 * (1 - p))}px) saturate(${0.4 + 0.6 * p})` }
                  : phase === 'cutout'
                    ? { clipPath: `inset(0 0 0 ${Math.min(100, p * 115)}%)` }
                    : undefined
              }
            />
          </>
        )}
        {rendering && <span className="rc-scan" style={{ top: `${(p * 100) % 100}%` }} />}
        {phase === 'cutout' && p < 0.9 && <span className="rc-scan rc-scan--wipe" style={{ left: `${6 + Math.min(100, p * 115) * 0.88}%` }} />}
        {phase === 'gate' && <span className="rc-scan rc-scan--gate" style={{ left: `${p * 100}%` }} />}
        {phase === 'order' && <span className="rc-wait">Queued · waiting for a worker</span>}
        <span className="rc-step-tag">{phase === 'done' ? 'Live on clip.art' : RUN.timeline[Math.max(0, r.index - 1)]?.name}</span>
      </div>

      <div className="rc-meta">
        <p className="rc-title">{typed}<span className={phase === 'name' ? 'rc-caret' : ''} /></p>
        <p className="rc-tags">
          {r.past('name') && RUN.tags.map((t, i) => <span key={t} style={{ animationDelay: `${i * 60}ms` }}>#{t.replace(/ /g, '-')}</span>)}
        </p>
      </div>

      {/* The timeline, drawn to the run's real proportions. */}
      <ol className="rc-line">
        {STAGES.map((s) => {
          const state = r.past(s.phase) ? 'done' : phase === s.phase ? 'live' : 'wait';
          return (
            <li key={s.phase} className={`is-${state}`} style={{ flexGrow: WIDTH[s.phase] }}>
              <span className="rc-line-fill" style={{ width: state === 'done' ? '100%' : state === 'live' ? `${p * 100}%` : 0 }} />
              <b>{s.label}</b>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
