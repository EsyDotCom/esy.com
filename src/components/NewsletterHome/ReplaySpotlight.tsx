'use client';

/* F · Spotlight: the finished piece is the star. The finished piece stands large
 * under a spotlight; as each step completes, a callout pops in around it on a
 * thin leader line with that step's real result, like a product launch
 * annotating its hero shot. It ends with the receipt sliding in, stamped.
 */
import { CLIPART_RUN as RUN } from './clipartRun';
import { clock, money, useRunReplay, type Phase } from './useRunReplay';

// Each callout: the step it belongs to, where it sits, what it says.
// What each step recorded, read from the run (never typed in here).
const res = (short: string) => RUN.timeline.find((t) => t.short === short);
const RENDER = res('Render');
const CALLOUTS: { phase: Phase; pos: string; label: string; value: string }[] = [
  { phase: 'render', pos: 'tl', label: 'Rendered', value: RENDER ? `${(RENDER.end - RENDER.start).toFixed(1)}s · $${RENDER.usd.toFixed(3)}` : '' },
  { phase: 'cutout', pos: 'tr', label: 'Cut out', value: res('Cutout')?.result ?? '' },
  { phase: 'audit', pos: 'ml', label: 'Audited', value: res('Audit')?.result ?? '' },
  { phase: 'name', pos: 'mr', label: 'Named', value: RUN.title },
  { phase: 'gate', pos: 'bl', label: 'Gated', value: res('Gate')?.result ?? '' },
];

export default function ReplaySpotlight() {
  const r = useRunReplay();
  const { phase, p } = r;
  const cut = r.past('render');
  const done = phase === 'done';

  return (
    <div className="rs" aria-label={`A real clip.art run: ${RUN.subject}, $${RUN.totalUsd} in ${RUN.seconds}s`}>
      <p className="rs-order">
        <small>One prompt</small>&ldquo;{RUN.subject}&rdquo;
      </p>

      <div className="rs-stage">
        <span className="rs-light" aria-hidden="true" />
        <span className="rs-floor" aria-hidden="true" />
        {phase !== 'order' && (
          <div className={`rs-hero ${cut ? 'is-cut' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- the run's own output */}
            <img
              src={cut ? RUN.cutout : RUN.render}
              alt=""
              className={phase === 'audit' ? 'is-traced' : ''}
              style={phase === 'render' ? { filter: `blur(${Math.round(20 * (1 - p))}px)`, transform: `scale(${0.92 + 0.08 * p})` } : undefined}
            />
          </div>
        )}
        {phase === 'order' && <span className="rs-wait">Queued…</span>}

        {/* The callouts, one per finished step. */}
        {CALLOUTS.map((c) => {
          const on = r.past(c.phase) || (phase === c.phase && p > 0.55);
          return (
            <div key={c.phase} className={`rs-call rs-call--${c.pos} ${on ? 'is-on' : ''}`}>
              <span className="rs-call-line" />
              <span className="rs-call-box">
                <small>{c.label}</small>
                {c.value}
              </span>
            </div>
          );
        })}

        {/* The receipt, stamped. */}
        <div className={`rs-receipt ${done ? 'is-on' : ''}`}>
          <p>
            <small>Receipt · {RUN.id}</small>
            <b>{money(RUN.totalUsd)}</b> · {RUN.seconds}s · 6 steps
          </p>
          <span className="rs-stamp">Live on clip.art</span>
        </div>
      </div>

      <p className="rs-foot">
        <span>{clock(r.runSeconds)}</span>
        <span className="rs-foot-bar"><i style={{ width: `${(r.runSeconds / RUN.seconds) * 100}%` }} /></span>
        <span>{money(r.usd)}</span>
      </p>
    </div>
  );
}
