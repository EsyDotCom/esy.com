'use client';

// AQ · Guide — many lights, one direction. A night sea full of drifting
// points of light. Every few seconds the octopus gathers them into three
// currents that all run toward one small light on the far horizon, holds
// them there, then lets them drift again.

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { BeaconDefs, LAMP_Y, Tower } from './beacon';
import { Board, type TakeCopy } from './Board';
import { C, Diamond, SceneSvg, Wide } from './draw';
import { KEPT, MARK_OR_KEEPER, NeutralOcto, OctoV, ROUND_EIGHT_NOTE, VariantHero, type OctoVariant } from './octo3';
import { noise, octagon, pts } from './symbols';

const HORIZON = 150;
const FAR: [number, number] = [1090, HORIZON];
const N = 64;
const PHASE_MS = 6500;

// Each point's resting place, scattered over the water.
const HOMES = Array.from({ length: N }, (_, i) => [470 + Math.abs(noise(i + 5)) * 700, 190 + Math.abs(noise(i + 45)) * 190] as [number, number]);

/** Where point i sits on its current at progress u (0 at the octopus, 1 at the far light). */
function onCurrent(i: number, u: number): [number, number] {
  const c = i % 3;
  const p0: [number, number] = [470, 250 + c * 50];
  const p1: [number, number] = [800, 340 - c * 40];
  const p2: [number, number] = [FAR[0], FAR[1] + LAMP_Y * 0.16 + 4];
  const a = (1 - u) ** 2;
  const b = 2 * (1 - u) * u;
  const d = u * u;
  return [a * p0[0] + b * p1[0] + d * p2[0], a * p0[1] + b * p1[1] + d * p2[1]];
}

export function GuideScene({ view, variant = 'mark' }: { view?: string; variant?: OctoVariant }) {
  const dots = useRef<(SVGGElement | null)[]>([]);
  const [streaming, setStreaming] = useState(false);

  // Each frame: ease every point toward its target (its drift spot, or its place on the current).
  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pos = HOMES.map(([x, y]) => [x, y]);
    const start = performance.now();
    let last = start;
    let raf = 0;
    let shown = false;
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const k = still ? 1 : 1 - Math.exp(-((now - last) / 1000) * 2.4);
      last = now;
      const flowing = still || Math.floor((now - start) / PHASE_MS) % 2 === 1;
      if (flowing !== shown) setStreaming((shown = flowing));
      pos.forEach((q, i) => {
        const [tx, ty] = flowing
          ? onCurrent(i, (t * 0.09 + i / N) % 1)
          : [HOMES[i][0] + Math.sin(t * 0.7 + i) * 14, HOMES[i][1] + Math.cos(t * 0.5 + i * 2) * 10];
        q[0] += (tx - q[0]) * k;
        q[1] += (ty - q[1]) * k;
        // Points shrink as they near the horizon, so the currents read as running far away.
        const s = flowing ? 1 - Math.max(0, (q[0] - 470) / 700) * 0.6 : 1;
        dots.current[i]?.setAttribute('transform', `translate(${q[0].toFixed(1)} ${q[1].toFixed(1)}) scale(${s.toFixed(2)})`);
      });
      if (!still) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <SceneSvg view={view} className={`bs-guide${streaming ? ' is-flowing' : ''}`} label="An octopus gathering drifting points of light into currents toward a far light">
      <BeaconDefs />
      <Wide y={0} h={HORIZON} fill="url(#bs-beacon-sky)" />
      {Array.from({ length: 22 }, (_, n) => (
        <Diamond key={n} className="bs-sky-twinkle" x={Math.abs(noise(n + 8)) * 1200} y={Math.abs(noise(n + 80)) * 120} s={1.6} fill={C.ivory} style={{ '--n': n } as CSSProperties} />
      ))}
      {/* The far light: small, distant, brighter while the currents run to it. */}
      <polygon points={`${FAR[0] - 22},${HORIZON} ${FAR[0] - 12},${HORIZON - 6} ${FAR[0] + 12},${HORIZON - 6} ${FAR[0] + 22},${HORIZON}`} fill="#0A2540" />
      <Tower x={FAR[0]} y={HORIZON - 6} s={0.16} />
      <polygon className="bs-guide-far" points={pts(octagon(FAR[0], HORIZON - 6 + LAMP_Y * 0.16, 26))} fill={C.mint} style={{ transformOrigin: `${FAR[0]}px ${HORIZON - 6 + LAMP_Y * 0.16}px` }} />
      <Wide y={HORIZON} h={560 - HORIZON} fill="url(#bs-beacon-sea)" />
      <Wide y={HORIZON} h={3} fill={C.mint} className="bs-reef-surface" />
      <Wide y={392} h={168} fill={C.navy} />
      {HOMES.map((_, i) => (
        <g key={i} ref={(el) => void (dots.current[i] = el)} transform={`translate(${HOMES[i][0].toFixed(1)} ${HOMES[i][1].toFixed(1)})`}>
          <Diamond x={0} y={0} s={3 + (i % 3)} fill={i % 4 ? C.mint : C.ivory} className="bs-guide-dot" style={{ '--n': i } as CSSProperties} />
        </g>
      ))}
      <OctoV x={170} y={150} w={320} variant={variant} items={{ 0: KEPT.lantern }} sync={streaming} />
    </SceneSvg>
  );
}

export const GUIDE_COPY: TakeCopy = {
  key: 'AQ',
  name: 'Guide',
  headline: 'Many lights, one direction.',
  lede: 'A night sea full of drifting points of light. Every few seconds the octopus gathers them into three currents that all run toward one small light on the far horizon, then lets them drift again.',
  says: 'Guidance: Esy doesn’t do every task itself. It points everything the same way and keeps it pointed there.',
};

export default function OctoGuide() {
  return (
    <Board
      tone="night"
      copy={GUIDE_COPY}
      note={ROUND_EIGHT_NOTE}
      hero={<VariantHero initial="mark" options={MARK_OR_KEEPER} scene={(v) => <GuideScene view="150 40 960 420" variant={v} />} />}
      mark={() => <NeutralOcto variant="mark" items={{ 0: KEPT.lantern }} />}
      divider={
        <div className="bs-rule-stars" aria-hidden="true">
          {Array.from({ length: 28 }, (_, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
