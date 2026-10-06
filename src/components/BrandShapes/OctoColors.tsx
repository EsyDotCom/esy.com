'use client';

// Q · Octopus Colors — one mind, every surface. A real octopus changes its
// skin to match where it is. Ours takes on the look of each vertical in turn
// (clip art, SEO pages, films, news) and stays the same animal throughout.

import { useEffect, useState, type CSSProperties } from 'react';
import { Board } from './Board';
import { Box, C, Chain, ROUND_FOUR_NOTE, taper } from './draw';
import type { TakeCopy } from './symbols';

// Each look: skin colours, the pattern on the mantle, and the backdrop.
const LOOKS = [
  { name: 'Clip art', skin: C.teal, back: C.deep, tip: C.ivory, spot: C.ivory, bg: '#E6F7F4', pattern: 'dots' },
  { name: 'SEO pages', skin: C.navy, back: '#1B3F63', tip: C.mint, spot: C.mint, bg: '#EEF3F7', pattern: 'lines' },
  { name: 'Films', skin: C.ink, back: '#16283F', tip: C.bright, spot: C.ivory, bg: '#E9ECEF', pattern: 'frames' },
  { name: 'News', skin: C.ivory, back: '#D9D3C4', tip: C.teal, spot: C.navy, bg: '#F7F5EF', pattern: 'columns' },
] as const;

const MANTLE = { x: 176, y: 28, w: 128, h: 152, c: [54, 54, 20, 20] as [number, number, number, number] };
const ARMS = Array.from({ length: 8 }, (_, i) => ({ i, x: 182 + i * 16.6, angle: (3.5 - i) * 17, front: i % 2 === 0 }));
const SEGS = taper(4, 30, 24, 12);

/** The octopus in a given look; every fill is a CSS variable so looks cross-fade. */
function Chameleon({ look }: { look: (typeof LOOKS)[number] }) {
  const vars = { '--o-skin': look.skin, '--o-back': look.back, '--o-tip': look.tip, '--o-spot': look.spot } as CSSProperties;
  const arm = (a: (typeof ARMS)[number]) => (
    <g key={a.i} transform={`translate(${a.x} 204) rotate(${a.angle})`}>
      <Chain segs={SEGS} className="bs-oct-seg" vars={{ '--a': a.i, '--amp': `${7 + Math.abs(3.5 - a.i) * 2}deg` }} fill={(k) => (k === 3 ? 'var(--o-tip)' : a.front ? 'var(--o-skin)' : 'var(--o-back)')} />
    </g>
  );
  return (
    <svg className="bs-svg bs-chroma" viewBox="0 0 480 360" role="img" aria-label={`An octopus whose skin has changed to match ${look.name}`} style={vars}>
      <defs>
        <clipPath id="bs-chroma-mantle">
          <Box {...MANTLE} />
        </clipPath>
      </defs>
      <g className="bs-oct-body">
        {ARMS.filter((a) => !a.front).map(arm)}
        <Box {...MANTLE} style={{ fill: 'var(--o-skin)' }} />
        {/* Mantle patterns, one per look, cross-faded. */}
        <g clipPath="url(#bs-chroma-mantle)">
          <g className={`bs-chroma-pat${look.pattern === 'dots' ? ' is-on' : ''}`}>
            {[0, 1, 2, 3, 4, 5, 6].map((n) => (
              <Box key={n} x={190 + (n % 4) * 28 + (n > 3 ? 14 : 0)} y={44 + Math.floor(n / 4) * 30} w={12} h={12} c={4} style={{ fill: 'var(--o-spot)' }} />
            ))}
          </g>
          <g className={`bs-chroma-pat${look.pattern === 'lines' ? ' is-on' : ''}`}>
            {[0, 1, 2, 3].map((n) => (
              <Box key={n} x={192} y={40 + n * 16} w={96 - n * 18} h={5} c={2} style={{ fill: 'var(--o-spot)' }} />
            ))}
          </g>
          <g className={`bs-chroma-pat${look.pattern === 'frames' ? ' is-on' : ''}`}>
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <Box key={n} x={186 + n * 20} y={36} w={10} h={8} c={2} style={{ fill: 'var(--o-spot)' }} />
            ))}
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <Box key={`b${n}`} x={186 + n * 20} y={164} w={10} h={8} c={2} style={{ fill: 'var(--o-spot)' }} />
            ))}
          </g>
          <g className={`bs-chroma-pat${look.pattern === 'columns' ? ' is-on' : ''}`}>
            {[0, 1, 2].map((n) => (
              <Box key={n} x={194 + n * 32} y={36} w={24} h={64} style={{ fill: 'var(--o-spot)', opacity: 0.18 }} />
            ))}
            <Box x={194} y={36} w={88} h={8} style={{ fill: 'var(--o-spot)' }} />
          </g>
        </g>
        <Box x={168} y={184} w={144} h={24} c={[0, 0, 12, 12]} style={{ fill: 'var(--o-skin)' }} />
        {ARMS.filter((a) => a.front).map(arm)}
        <g className="bs-oct-eyes" style={{ transformOrigin: '240px 132px' }}>
          <Box x={206} y={116} w={28} h={32} c={9} fill={C.ivory} stroke={C.navy} strokeWidth={look.skin === C.ivory ? 3 : 0} />
          <Box x={246} y={116} w={28} h={32} c={9} fill={C.ivory} stroke={C.navy} strokeWidth={look.skin === C.ivory ? 3 : 0} />
          <Box x={216} y={124} w={12} h={16} c={4} fill={C.ink} />
          <Box x={256} y={124} w={12} h={16} c={4} fill={C.ink} />
        </g>
      </g>
    </svg>
  );
}

/** Steps through the looks on a timer; picking one stops the timer. */
function useLooks(start = 0, every = 2600) {
  const [i, setI] = useState(start);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % LOOKS.length), every);
    return () => window.clearInterval(t);
  }, [auto, every]);
  const pick = (n: number) => {
    setI(n);
    setAuto(false);
  };
  return { i, pick };
}

export function ColorsMark() {
  const { i } = useLooks(1, 2200);
  return <Chameleon look={LOOKS[i]} />;
}

export const COLORS_COPY: TakeCopy = {
  key: 'Q',
  name: 'Octopus Colors',
  headline: 'One mind, every surface.',
  lede: 'A real octopus changes its skin to match where it is. Ours takes on the look of each vertical in turn, clip art, SEO pages, films, news, and stays the same animal underneath.',
  says: 'Each vertical gets its own look and voice; the brain behind all of them is the same.',
};

export default function OctoColors() {
  const { i, pick } = useLooks();
  const look = LOOKS[i];
  return (
    <Board
      copy={COLORS_COPY}
      note={ROUND_FOUR_NOTE}
      hero={
        <div className="bs-frame bs-chroma-frame" style={{ background: look.bg }}>
          <Chameleon look={look} />
          <div className="bs-chips" role="group" aria-label="Change its colors to">
            {LOOKS.map((l, n) => (
              <button key={l.name} type="button" className={n === i ? 'is-on' : ''} onClick={() => pick(n)}>
                {l.name}
              </button>
            ))}
          </div>
        </div>
      }
      mark={() => <ColorsMark />}
      divider={
        <div className="bs-rule-swatches" aria-hidden="true">
          {LOOKS.flatMap((l) => [l.skin, l.back, l.tip, l.spot]).map((c, n) => (
            <span key={n} style={{ '--c': c, '--i': n } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
