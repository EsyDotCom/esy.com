'use client';

// AM · Coast of Lights — one mind, every light. A coast of five lighthouses,
// joined under the sea by one line back to the octopus at the main light. A
// pulse runs out along the line both ways and each light comes on as it
// arrives; a boat works its way along the coast from light to light.

import type { CSSProperties } from 'react';
import { Beam, BeaconDefs, LAMP_Y, NightSky, SailBoat, Sea, Tower } from './beacon';
import { Board, type TakeCopy } from './Board';
import { C, SceneSvg, Wide } from './draw';
import { KEPT, NeutralOcto, OctoV, ROUND_SEVEN_NOTE, VariantHero, type OctoVariant } from './octo3';
import { octagon, pts } from './symbols';

const WATER = 286;
const MAIN = 600;
// The lights along the coast: where, how big (far ones smaller), and when the pulse reaches them.
const LIGHTS = [
  { x: 130, y: 280, s: 0.42 },
  { x: 330, y: 270, s: 0.55 },
  { x: MAIN, y: 282, s: 0.95 },
  { x: 870, y: 270, s: 0.55 },
  { x: 1070, y: 280, s: 0.42 },
].map((l) => ({ ...l, d: Math.abs(l.x - MAIN) / 300 }));

const LINE_Y = 352;
/** The undersea line from the main light out to one side, dropping and rising at 45°. */
const half = (to: number): [number, number][] => {
  const dir = Math.sign(to - MAIN);
  return [[MAIN, 300], [MAIN + dir * 52, LINE_Y], [to - dir * 52, LINE_Y], [to, 300]];
};

export function CoastScene({ view, variant = 'keeper' }: { view?: string; variant?: OctoVariant }) {
  return (
    <SceneSvg view={view} className="bs-coast" label="A coast of lighthouses joined under the sea to one octopus, lighting in turn">
      <BeaconDefs />
      <NightSky to={WATER} seed={33} moon={[980, 64]} />
      <Beam x={MAIN} y={282 + LAMP_Y * 0.95} len={620} />
      <Sea from={WATER} />
      <Wide y={400} h={160} fill={C.navy} />
      {/* The line under the sea, and the pulse running out along it. */}
      {[LIGHTS[0].x, LIGHTS[4].x].map((to, n) => (
        <g key={n}>
          <polyline points={pts(half(to))} fill="none" stroke="#1E4A72" strokeWidth={8} strokeLinejoin="round" />
          <polyline points={pts(half(to))} fill="none" stroke={C.deep} strokeWidth={8} strokeDasharray="14 6" strokeLinejoin="round" opacity={0.6} />
          <polyline className="bs-coast-pulse" pathLength={1} points={pts(half(to))} fill="none" stroke={C.mint} strokeWidth={6} strokeLinecap="round" />
        </g>
      ))}
      {/* Headlands and their lights. */}
      {LIGHTS.map((l, n) => (
        <g key={n}>
          <polygon points={`${l.x - 90 * l.s - 30},${WATER + 30} ${l.x - 70 * l.s},${l.y} ${l.x + 70 * l.s},${l.y} ${l.x + 90 * l.s + 30},${WATER + 30}`} fill="#163A5F" />
          <Tower x={l.x} y={l.y} s={l.s} />
          <polygon className="bs-coast-glow" points={pts(octagon(l.x, l.y + LAMP_Y * l.s, 90 * l.s))} fill={C.mint} style={{ transformOrigin: `${l.x}px ${l.y + LAMP_Y * l.s}px`, '--d': `${l.d}s` } as CSSProperties} />
        </g>
      ))}
      {/* The octopus at the main light, its arms going down to the line. */}
      <OctoV x={MAIN + 50} y={205} w={160} variant={variant} items={{ 7: KEPT.lantern }} />
      {/* A boat working along the coast. */}
      <g className="bs-coast-boat">
        <SailBoat />
      </g>
    </SceneSvg>
  );
}

export const COAST_COPY: TakeCopy = {
  key: 'AM',
  name: 'Coast of Lights',
  headline: 'One mind, every light.',
  lede: 'Five lighthouses along a coast, joined under the sea by one line back to the octopus at the main light. A pulse runs out both ways and each light comes on as it arrives, while a boat works its way from one to the next.',
  says: 'One brain running many ends: every line of work is its own light, and all of them answer to the same keeper.',
};

export default function OctoCoast() {
  return (
    <Board
      tone="night"
      copy={COAST_COPY}
      note={ROUND_SEVEN_NOTE}
      hero={<VariantHero initial="keeper" scene={(v) => <CoastScene view="230 30 740 440" variant={v} />} />}
      mark={() => <NeutralOcto variant="keeper" items={{ 7: KEPT.lantern }} />}
      divider={
        <div className="bs-rule-lights" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="bs-octagon" style={{ '--d': `${Math.abs(i - 4) * 0.25}s` } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
