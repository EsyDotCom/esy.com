/* Course covers with Mason (2026-10-06, /prototypes/course-cover/): five ways
 * to draw the Claude Code course's cover in the site's own look, in place of
 * the generated isometric room with a white robot. Each is drawn in code from
 * Mason's real figure (OctopusFigure, via OctoIn) and the stencil kit, in two
 * formats: the 2:3 poster ("Now showing" on /courses and the course page) and
 * the 16:9 wide cover (the lesson end card). Mason is alone and calm, and
 * what he works on is abstract: bars, tiles, slabs, light.
 *
 *   A · Terminal — he types; the lines write themselves into a stencil terminal.
 *   B · Lessons  — each lesson is a tile in one of his arms, lighting in order.
 *   C · Prompt   — he builds the prompt ">_" from slabs and holds the cursor out to you.
 *   D · Night    — a film poster: Mason rising through the beam of one giant cursor.
 *   E · Reef     — his footer reef, with a stone desk and a glowing slab screen.
 *
 * The poster keeps the band's own overlay (the gold "presents" line, the
 * title and the billing), so the art keeps its subject between about 15% and
 * 65% of the height. */

import type { CSSProperties, ReactNode } from 'react';
import { Box, C } from '@/components/BrandShapes/draw';
import { Fish, Kelp, OctoIn, ReefBackdrop } from '@/components/BrandShapes/reefkit';
import { noise, octagon, pts } from '@/components/BrandShapes/symbols';
import { FlatLayCover, FloatingCover, StudioCover, StudioTwoCover, TwoScreensCover, WindowCover } from './covers2';
import '@/components/BrandShapes/reef.css';
import './course-covers.css';

export type CoverFormat = 'poster' | 'wide';
export type CoverKey = 'terminal' | 'lessons' | 'prompt' | 'night' | 'reef' | 'studio' | 'window' | 'floating' | 'flatlay' | 'screens' | 'studio-two';

const VIEW: Record<CoverFormat, string> = { poster: '0 0 600 900', wide: '0 0 1280 720' };
const STENCIL = "var(--font-black-ops-one), 'Black Ops One', sans-serif";

/** The frame every cover draws in: a full-bleed SVG that fills its parent. */
function Art({ format, label, children }: { format: CoverFormat; label: string; children: ReactNode }) {
  return (
    <svg className={`cc-art cc-art--${format}`} viewBox={VIEW[format]} preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/** The reef's water (the footer's own colours), lighter at the top, so Mason's
 *  navy body reads against it: the ground of A, B and C. */
function Night({ id, w, h }: { id: string; w: number; h: number }) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#13586C" />
          <stop offset="0.45" stopColor="#0E4A5C" />
          <stop offset="1" stopColor="#0A2E48" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${id})`} />
    </>
  );
}

/** A soft pool of light behind Mason, so his silhouette separates from the water. */
function Halo({ id, cx, cy, r }: { id: string; cx: number; cy: number; r: number }) {
  return (
    <>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={C.mint} stopOpacity="0.32" />
          <stop offset="1" stopColor={C.mint} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} />
    </>
  );
}

/** A few octagon bubbles drifting up from (x, y) (reef.css's bs-reef-bubble). */
function Bubbles({ x, y, spread = 120, n = 5 }: { x: number; y: number; spread?: number; n?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, k) => (
        <polygon
          key={k}
          className="bs-reef-bubble"
          points={pts(octagon(+(x + noise(k + 3) * spread).toFixed(1), y, 6 + (k % 3) * 3))}
          fill="none"
          stroke={C.mint}
          strokeWidth={1.5}
          style={{ '--n': k } as CSSProperties}
        />
      ))}
    </>
  );
}

/* ── A · Terminal ────────────────────────────────────────────────────────
   Mason in front of a stencil terminal. His tips glow like keys, and the
   lines type themselves out, one after another, then start again. */

function Terminal({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const lines = [0.62, 0.45, 0.72, 0.38, 0.55];
  const pad = w * 0.09;
  const step = (h - 90) / (lines.length + 1);
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} c={[26, 26, 26, 26]} fill="#0C2A47" stroke={C.teal} strokeWidth={2} />
      <Box x={x} y={y} w={w} h={36} c={[26, 26, 0, 0]} fill="#103558" />
      {[C.teal, C.mint, C.ivory].map((f, k) => (
        <Box key={k} x={x + 30 + k * 26} y={y + 14} w={14} h={8} c={2} fill={f} opacity={0.8} />
      ))}
      {/* The prompt: a stencil chevron, then the lines it writes. */}
      <polygon points={`${x + pad},${y + 62} ${x + pad + 20},${y + 76} ${x + pad},${y + 90} ${x + pad + 9},${y + 90} ${x + pad + 29},${y + 76} ${x + pad + 9},${y + 62}`} fill={C.bright} />
      {lines.map((f, k) => (
        <Box
          key={k}
          className="cc-type"
          x={x + pad + 44}
          y={y + 66 + k * step}
          w={(w - pad * 2 - 44) * f}
          h={12}
          c={3}
          fill={k === 2 ? C.bright : C.mint}
          opacity={k === 2 ? 1 : 0.7}
          style={{ '--k': k } as CSSProperties}
        />
      ))}
      <Box className="cc-cursor" x={x + pad + 44} y={y + 66 + lines.length * step - 4} w={16} h={22} c={2} fill={C.ivory} />
    </g>
  );
}

const KEY_TIPS: Record<number, ReactNode> = Object.fromEntries(
  [1, 3, 4, 6].map((i, k) => [i, <Box key={i} className="cc-key" x={-10} y={2} w={20} h={14} c={4} fill={C.mint} style={{ '--k': k } as CSSProperties} />]),
);

export function TerminalCover({ format }: { format: CoverFormat }) {
  const poster = format === 'poster';
  return (
    <Art format={format} label="Mason the octopus typing, and the lines writing themselves into a stencil terminal">
      <Night id={`cc-a-${format}`} w={poster ? 600 : 1280} h={poster ? 900 : 720} />
      {poster ? (
        <>
          <Terminal x={92} y={140} w={416} h={270} />
          <Halo id="cc-a-halo-poster" cx={300} cy={520} r={200} />
          <OctoIn x={110} y={370} w={380} items={KEY_TIPS} />
          <Bubbles x={470} y={600} spread={60} n={4} />
        </>
      ) : (
        <>
          <Terminal x={600} y={120} w={560} h={420} />
          <Halo id="cc-a-halo-wide" cx={340} cy={420} r={280} />
          <OctoIn x={90} y={210} w={520} items={KEY_TIPS} />
          <Bubbles x={300} y={560} spread={160} />
        </>
      )}
    </Art>
  );
}

/* ── B · Lessons ─────────────────────────────────────────────────────────
   Each lesson is a numbered tile in one of Mason's arms; they light in
   order, the way you'd work through the course. An octagon ring behind him. */

/** Which arms hold the n lesson tiles: spread across the eight. */
const armsFor = (n: number) => Array.from({ length: Math.min(n, 8) }, (_, k) => Math.round(((k + 0.5) * 8) / Math.min(n, 8) - 0.5));

function lessonTiles(n: number): Record<number, ReactNode> {
  return Object.fromEntries(
    armsFor(n).map((arm, k) => [
      arm,
      <g key={arm} className={`cc-tile cc-tile--${k}`}>
        <Box className="cc-tile-face" x={-19} y={4} w={38} h={38} c={9} fill={C.ivory} />
        <text x={0} y={32} textAnchor="middle" fontSize={22} fill={C.navy} style={{ fontFamily: STENCIL }}>
          {k + 1}
        </text>
      </g>,
    ]),
  );
}

function Ring({ cx, cy, size }: { cx: number; cy: number; size: number }) {
  const outer = octagon(cx, cy, size);
  return (
    <g>
      <polygon points={pts(octagon(cx, cy, size + 18))} fill="none" stroke={C.mint} strokeWidth={1.5} strokeDasharray="6 9" opacity={0.3} />
      {/* Eight sides that light one by one, the octagon of the e. */}
      {outer.map((a, k) => {
        const b = outer[(k + 1) % 8];
        return <line key={k} className={`cc-side cc-side--${k}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={C.bright} strokeWidth={6} strokeLinecap="square" />;
      })}
    </g>
  );
}

export function LessonsCover({ format, lessons = 3 }: { format: CoverFormat; lessons?: number }) {
  const poster = format === 'poster';
  const tiles = lessonTiles(lessons);
  return (
    <Art format={format} label={`Mason the octopus holding the course's ${lessons} lessons as numbered tiles, lighting in order`}>
      <Night id={`cc-b-${format}`} w={poster ? 600 : 1280} h={poster ? 900 : 720} />
      {poster ? (
        <>
          <Halo id="cc-b-halo-poster" cx={300} cy={380} r={240} />
          <Ring cx={300} cy={360} size={420} />
          <OctoIn x={50} y={190} w={500} items={tiles} />
        </>
      ) : (
        <>
          <Halo id="cc-b-halo-wide" cx={640} cy={350} r={320} />
          <Ring cx={640} cy={340} size={520} />
          <OctoIn x={330} y={110} w={620} items={tiles} />
        </>
      )}
    </Art>
  );
}

/* ── C · Prompt ──────────────────────────────────────────────────────────
   The prompt, ">_", built from stencil slabs like the gate in the footer.
   The chevron drops into place; Mason holds the last piece, the cursor,
   out toward you; then it sets and blinks. The course is the last piece. */

function Prompt({ x, y, s }: { x: number; y: number; s: number }) {
  const L = 150 * s;
  const T = 44 * s;
  const A = 38; // each half's angle
  // The lower half starts this far below the upper one, so their far ends
  // meet in the chevron's point: twice the drop of one slab at its angle.
  const drop = 2 * L * Math.sin((A * Math.PI) / 180);
  const base = drop + T; // the chevron's height, where the cursor sits
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* The two halves of the chevron, each a slab turned 38°. */}
      <g className="cc-drop cc-drop--0">
        <Box x={0} y={0} w={L} h={T} c={10 * s} fill={C.ivory} stroke={C.navy} strokeWidth={1.5} transform={`rotate(${A} 0 ${T / 2})`} />
      </g>
      <g className="cc-drop cc-drop--1">
        <Box x={0} y={drop} w={L} h={T} c={10 * s} fill={C.teal} stroke={C.navy} strokeWidth={1.5} transform={`rotate(${-A} 0 ${drop + T / 2})`} />
      </g>
      {/* The cursor's slot on the baseline, waiting, then the cursor once it's set. */}
      <Box x={L * 1.05} y={base - T} w={L * 0.95} h={T} c={10 * s} fill="none" stroke={C.mint} strokeWidth={2} strokeDasharray="8 8" opacity={0.6} />
      <Box className="cc-set" x={L * 1.05} y={base - T} w={L * 0.95} h={T} c={10 * s} fill={C.bright} />
    </g>
  );
}

const HELD: Record<number, ReactNode> = {
  6: <Box className="cc-held" x={-34} y={2} w={68} h={20} c={5} fill={C.bright} />,
};

export function PromptCover({ format }: { format: CoverFormat }) {
  const poster = format === 'poster';
  return (
    <Art format={format} label="Mason the octopus building the prompt sign from stencil slabs and holding out the cursor">
      <Night id={`cc-c-${format}`} w={poster ? 600 : 1280} h={poster ? 900 : 720} />
      {poster ? (
        <>
          <Prompt x={96} y={140} s={1.05} />
          <Halo id="cc-c-halo-poster" cx={330} cy={540} r={200} />
          <OctoIn x={140} y={380} w={380} items={HELD} />
        </>
      ) : (
        <>
          <Prompt x={640} y={140} s={1.45} />
          <Halo id="cc-c-halo-wide" cx={340} cy={420} r={280} />
          <OctoIn x={90} y={210} w={520} items={HELD} />
        </>
      )}
    </Art>
  );
}

/* ── D · Night ───────────────────────────────────────────────────────────
   A film poster. One giant cursor at the top, blinking, throws a beam down
   through deep water; Mason rises through it, small. Mostly dark, so the
   band's gold title reads like a premiere. */

export function NightCover({ format }: { format: CoverFormat }) {
  const poster = format === 'poster';
  const W = poster ? 600 : 1280;
  const H = poster ? 900 : 720;
  const cx = poster ? 300 : 820;
  return (
    <Art format={format} label="Mason the octopus rising through the beam of one giant blinking cursor in deep water">
      <defs>
        <linearGradient id={`cc-d-${format}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0A2E48" />
          <stop offset="0.5" stopColor="#061527" />
          <stop offset="1" stopColor="#030B16" />
        </linearGradient>
        <linearGradient id={`cc-d-beam-${format}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={C.bright} stopOpacity="0.5" />
          <stop offset="1" stopColor={C.bright} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#cc-d-${format})`} />
      {/* A huge faint chevron, the prompt, behind everything. */}
      <polygon
        points={poster ? '40,250 250,420 40,590 110,590 320,420 110,250' : '120,120 380,330 120,540 200,540 460,330 200,120'}
        fill="none"
        stroke={C.mint}
        strokeWidth={2}
        opacity={0.12}
      />
      <polygon className="cc-beam" points={`${cx - 22},${poster ? 150 : 110} ${cx + 22},${poster ? 150 : 110} ${cx + (poster ? 150 : 210)},${H} ${cx - (poster ? 150 : 210)},${H}`} fill={`url(#cc-d-beam-${format})`} />
      <Box className="cc-cursor" x={cx - 22} y={poster ? 70 : 40} w={44} h={80} c={6} fill={C.bright} />
      <g className="cc-rise">
        <OctoIn x={cx - (poster ? 140 : 170)} y={poster ? 330 : 280} w={poster ? 280 : 340} />
      </g>
      <Bubbles x={cx} y={poster ? 560 : 520} spread={poster ? 70 : 120} n={6} />
    </Art>
  );
}

/* ── E · Reef ────────────────────────────────────────────────────────────
   Mason at home: the footer's reef (water, rays, kelp, a passing school),
   a stone desk in front of him and a slab screen on it, typing to itself.
   The same world as the bottom of every page. */

function ReefDesk({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* The screen: a slab standing at the desk's right end, beside Mason, lit from inside. */}
      <Box x={262} y={-104} w={150} h={100} c={12} fill="#0C2A47" stroke={C.bright} strokeWidth={2} />
      {[0.7, 0.5, 0.8].map((f, k) => (
        <Box key={k} className="cc-type" x={280} y={-86 + k * 24} w={114 * f} h={9} c={2} fill={C.mint} style={{ '--k': k } as CSSProperties} />
      ))}
      <Box x={324} y={-6} w={26} h={8} fill="#163A5F" />
      {/* The desk: a chamfered stone slab he sits behind. */}
      <Box x={0} y={0} w={440} h={44} c={[14, 14, 6, 6]} fill="#163A5F" stroke={C.navy} strokeWidth={1.5} />
      <Box x={30} y={44} w={36} h={60} c={[0, 0, 6, 6]} fill="#0F2E4D" />
      <Box x={374} y={44} w={36} h={60} c={[0, 0, 6, 6]} fill="#0F2E4D" />
    </g>
  );
}

export function ReefCover({ format }: { format: CoverFormat }) {
  const poster = format === 'poster';
  // The reef is drawn 1200 × 560; the poster crops its middle and the floor runs on below.
  return (
    <svg
      className={`cc-art cc-art--${format}`}
      viewBox={poster ? '300 -170 600 900' : '0 -110 1200 675'}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Mason the octopus at a stone desk in his reef, a slab screen typing beside him"
    >
      <rect x={-200} y={-400} width={1600} height={1400} fill={C.navy} />
      <rect x={-200} y={-400} width={1600} height={400} fill="#0E4A5C" />
      <ReefBackdrop />
      <OctoIn x={poster ? 360 : 330} y={poster ? 110 : 100} w={340} />
      <ReefDesk x={poster ? 380 : 350} y={poster ? 300 : 290} />
      {poster && (
        <>
          <Kelp x={330} y={392} n={4} len={12} />
          <Kelp x={872} y={392} n={5} len={9} />
        </>
      )}
      <g transform={`translate(${poster ? 820 : 960} ${poster ? 120 : 110})`}>
        <g className="bs-reef-fish" style={{ '--n': 2 } as CSSProperties}>
          <Fish tone={C.bright} fin={C.ivory} />
        </g>
      </g>
    </svg>
  );
}

/** A cover by key and format, for the prototype route. */
export function CourseCoverArt({ cover, format, lessons }: { cover: CoverKey; format: CoverFormat; lessons?: number }) {
  switch (cover) {
    case 'terminal':
      return <TerminalCover format={format} />;
    case 'lessons':
      return <LessonsCover format={format} lessons={lessons} />;
    case 'prompt':
      return <PromptCover format={format} />;
    case 'night':
      return <NightCover format={format} />;
    case 'reef':
      return <ReefCover format={format} />;
    // Round 2: the scene leads, Mason accents it (covers2.tsx).
    case 'studio':
      return <StudioCover format={format} />;
    case 'window':
      return <WindowCover format={format} />;
    case 'floating':
      return <FloatingCover format={format} />;
    case 'flatlay':
      return <FlatLayCover format={format} />;
    case 'screens':
      return <TwoScreensCover format={format} />;
    // Round 3: F's room with J's two screens.
    case 'studio-two':
      return <StudioTwoCover format={format} />;
  }
}
