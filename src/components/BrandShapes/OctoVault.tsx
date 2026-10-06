'use client';

// AL · The Vault — kept safe, lit for all. Above the water the lighthouse
// guides the boats. Below, in its rock, is an octagon vault: the door swings
// open, the octopus files a new record on the lit shelves, the door closes,
// the wheel turns and the eight bolts lock, one after another.

import type { CSSProperties } from 'react';
import { Beam, BeaconDefs, LAMP_Y, NightSky, SailBoat, Sea, Tower } from './beacon';
import { Board, type TakeCopy } from './Board';
import { Box, C, SceneSvg, Wide } from './draw';
import { KEPT, NeutralOcto, OctoV, ROUND_SEVEN_NOTE, VariantHero, type OctoVariant } from './octo3';
import { octagon, pts } from './symbols';

const WATER = 222;
const LIGHT: [number, number] = [380, 214];
const VAULT: [number, number] = [560, 312];
const R = 62;

export function VaultScene({ view, variant = 'mark' }: { view?: string; variant?: OctoVariant }) {
  const bolts = octagon(VAULT[0], VAULT[1], R * 2 + 26);
  return (
    <SceneSvg view={view} className="bs-vault" label="A lighthouse above the water and, in its rock below, an octagon vault the octopus fills and locks">
      <BeaconDefs />
      <NightSky to={WATER} seed={21} moon={[1080, 60]} />
      <Beam x={LIGHT[0]} y={LIGHT[1] + LAMP_Y * 0.8} len={760} />
      {[0, 1].map((n) => (
        <g key={n} className={`bs-keep-boat bs-keep-boat--${n} bs-vault-boat`}>
          <SailBoat tone={n ? C.mint : C.teal} />
        </g>
      ))}
      <Sea from={WATER} />
      <Wide y={400} h={160} fill={C.navy} />
      {/* The rock: above the water it carries the tower, below it holds the vault. */}
      <polygon points="230,400 250,230 290,206 470,206 520,240 700,240 740,280 760,400" fill="#163A5F" />
      {[[260, 250], [330, 250], [260, 282], [690, 300], [690, 340], [260, 350]].map(([x, y], n) => (
        <Box key={n} x={x} y={y} w={60} h={24} c={[6, 0, 6, 0]} fill="#1E4A72" />
      ))}
      <Tower x={LIGHT[0]} y={LIGHT[1]} s={0.8} />
      {/* Inside the vault: lit shelves of records, a new one slid in each time. */}
      <polygon points={pts(octagon(...VAULT, R * 2))} fill="#E7F2EF" />
      {[-26, 4, 34].map((dy) => (
        <g key={dy}>
          <Box x={VAULT[0] - 46} y={VAULT[1] + dy} w={92} h={4} fill={C.navy} opacity={0.4} />
          {[0, 1, 2, 3, 4].map((k) => (
            <Box key={k} x={VAULT[0] - 42 + k * 17} y={VAULT[1] + dy - 20} w={13} h={20} c={[0, 4, 0, 0]} fill={k % 2 ? C.teal : C.ivory} stroke={C.navy} strokeWidth={1} />
          ))}
        </g>
      ))}
      <g className="bs-vault-file">
        <Box x={VAULT[0] + 26} y={VAULT[1] - 16} w={13} h={20} c={[0, 4, 0, 0]} fill={C.mint} stroke={C.navy} strokeWidth={1} />
      </g>
      {/* The door: it swings on its left hinge; the wheel turns once it's shut. */}
      <g className="bs-vault-door" style={{ transformOrigin: `${VAULT[0] - R}px ${VAULT[1]}px` }}>
        <polygon points={pts(octagon(...VAULT, R * 2))} fill="#1E4A72" stroke={C.ivory} strokeWidth={3} />
        <polygon points={pts(octagon(...VAULT, R * 1.4))} fill="none" stroke={C.navy} strokeWidth={4} />
        <g className="bs-vault-wheel" style={{ transformOrigin: `${VAULT[0]}px ${VAULT[1]}px` }}>
          {[0, 45].map((d) => (
            <rect key={d} x={VAULT[0] - 22} y={VAULT[1] - 22} width={44} height={44} fill="none" stroke={C.ivory} strokeWidth={5} transform={`rotate(${d} ${VAULT[0]} ${VAULT[1]})`} />
          ))}
          <polygon points={pts(octagon(...VAULT, 16))} fill={C.ivory} />
        </g>
      </g>
      {/* Eight bolts around the frame, locking in turn. */}
      {bolts.map(([x, y], n) => (
        <polygon key={n} className="bs-vault-bolt" points={pts(octagon(x, y, 12))} fill="#2D5677" style={{ '--n': n } as CSSProperties} />
      ))}
      {/* The keeper of the vault, with its key. */}
      <OctoV x={640} y={196} w={200} variant={variant} items={{ 0: KEPT.key, 7: KEPT.logbook }} />
    </SceneSvg>
  );
}

export const VAULT_COPY: TakeCopy = {
  key: 'AL',
  name: 'The Vault',
  headline: 'Kept safe, lit for all.',
  lede: 'Above the water the lighthouse guides the boats. Below, in its rock, the octopus files each new record in an octagon vault, swings the door shut, turns the wheel, and the eight bolts lock one by one.',
  says: 'Secure and a guide at once: your work kept safe underneath, the light for everyone above.',
};

export default function OctoVault() {
  return (
    <Board
      tone="night"
      copy={VAULT_COPY}
      note={ROUND_SEVEN_NOTE}
      hero={<VariantHero initial="mark" scene={(v) => <VaultScene view="220 20 620 440" variant={v} />} />}
      mark={() => <NeutralOcto variant="mark" items={{ 0: KEPT.key }} />}
      divider={
        <div className="bs-rule-bolts" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className="bs-octagon" style={{ '--n': i } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
