'use client';

/* A real clip.art run, replayed (the homepage's clip.art case study, option
 * B at /prototypes/home-clipart/). Built in code like SEOPage's replay, not a
 * screen recording: the prompt, then the six workflow steps lighting up in
 * turn while the stage shows what each one did (the render on its keying
 * green, the cutout on a checkerboard, the name it was given), ending on the
 * finished asset with its receipt. It loops; hover pauses it, and people who
 * ask for reduced motion see the finished frame.
 */
import { useEffect, useRef, useState } from 'react';
import { Check, Minus } from 'lucide-react';
import { CLIPART_RUN as RUN } from './clipartRun';

// Frame 0 is the prompt, 1–6 the steps, 7 the finished asset.
const LAST = RUN.steps.length + 1;
const FRAME_MS = [2200, 2600, 2200, 1500, 1800, 2400, 1800, 4200];

export default function ClipArtRunReplay() {
  const [frame, setFrame] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFrame(LAST);
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    const tick = (f: number) => {
      t = setTimeout(() => {
        const next = paused.current ? f : f >= LAST ? 0 : f + 1;
        setFrame(next);
        tick(next);
      }, FRAME_MS[f]);
    };
    tick(0);
    return () => clearTimeout(t);
  }, []);

  const step = frame - 1; // the step lighting up, -1 before the first
  const showCutout = frame >= 2;
  const named = frame >= 5;

  return (
    <div
      className="cr"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      aria-label={`A real clip.art run, replayed: ${RUN.subject}, ${RUN.style}, six steps, $${RUN.totalUsd.toFixed(3)} in ${RUN.seconds} seconds`}
    >
      {/* The window bar: which workflow, which run. */}
      <div className="cr-bar">
        <span className="cr-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="cr-bar-title">{RUN.workflow}</span>
        <span className="cr-bar-id">{RUN.id}</span>
      </div>

      <div className="cr-body">
        {/* Left: the order and the steps. */}
        <div className="cr-side">
          <div className={`cr-prompt ${frame === 0 ? 'is-live' : ''}`}>
            <span className="cr-label">Prompt</span>
            <p>{RUN.subject}</p>
            <span className="cr-chips">
              <b>{RUN.style}</b>
              <b>{RUN.aspect}</b>
              <b>Transparent</b>
            </span>
          </div>
          <ol className="cr-steps">
            {RUN.steps.map((s, i) => {
              const state = i < step || frame === LAST ? 'done' : i === step ? 'live' : 'wait';
              return (
                <li key={s.name} className={`cr-step is-${state} ${s.status === 'skipped' ? 'is-skipped' : ''}`}>
                  <span className="cr-step-icon" aria-hidden="true">
                    {state === 'done' ? s.status === 'skipped' ? <Minus size={12} /> : <Check size={12} strokeWidth={3} /> : i + 1}
                  </span>
                  <span className="cr-step-text">
                    <b>{s.name}</b>
                    <span>{s.detail}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Right: what the step produced. */}
        <div className="cr-stage">
          <div className={`cr-canvas ${showCutout ? 'is-cut' : ''} ${frame === 0 ? 'is-empty' : ''}`}>
            {frame === 0 ? (
              <span className="cr-waiting">Queued…</span>
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element -- the run's own output, from Esy storage */}
                <img src={RUN.render} alt="" className={`cr-img cr-img--render ${showCutout ? 'is-gone' : ''}`} />
                {/* eslint-disable-next-line @next/next/no-img-element -- the run's own output, from Esy storage */}
                <img src={RUN.cutout} alt="" className={`cr-img cr-img--cut ${showCutout ? 'is-on' : ''}`} />
              </>
            )}
            {frame === 4 && <span className="cr-badge">Cutout audit · pass</span>}
            {frame === 6 && <span className="cr-badge">Text gate · pass</span>}
          </div>
          <div className={`cr-meta ${named ? 'is-on' : ''}`}>
            <p className="cr-meta-title">{RUN.title}</p>
            <p className="cr-meta-tags">{RUN.tags.map((t) => `#${t.replace(/ /g, '-')}`).join(' ')}</p>
          </div>
        </div>
      </div>

      {/* The receipt, once it's done. */}
      <div className={`cr-receipt ${frame === LAST ? 'is-on' : ''}`}>
        <span><b>${RUN.totalUsd.toFixed(3)}</b> total</span>
        <span><b>{RUN.seconds}s</b> end to end</span>
        <span><b>6</b> steps recorded</span>
        <span className="cr-receipt-live">Live on clip.art</span>
      </div>
    </div>
  );
}
