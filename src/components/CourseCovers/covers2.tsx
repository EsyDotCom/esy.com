/* Course covers, round 2 (2026-10-06, /prototypes/course-cover/): a real place
 * to work, drawn in the stencil cut and the site's palette with one warm lamp,
 * and Mason, the main character, doing the work in it: no people. Round one put
 * him big in an abstract void; these put him in the workspace, at a size where
 * the work still reads, each doing a different relevant job. He holds still
 * except when typing; the work moves (the terminal types, keys light, files
 * fall). The esy brand sits at the top centre of every cover.
 *
 *   F · Studio      — from behind at his desk at night, tentacles pressing the keys.
 *   G · Window      — from behind at a window ledge, typing on a laptop facing him.
 *   H · Floating    — the original poster's idea: on the terminal's title bar he lets
 *                     files drop in, and the finished ones fall to the desk.
 *   I · Flat-lay    — the desk from above: the top of his head, tentacles on the keys.
 *   J · Two screens — from behind at an editor and a terminal, typing between them.
 *
 * When he types we never see his face: he faces the screen, so it's his back
 * (MasonBack) or the top of his head (MasonTop), from mason-poses.tsx, and each
 * front tentacle ends on a key that lights as it presses. His tips are bare,
 * as in the footer: nothing in his arms.
 */

import type { CSSProperties, ReactNode } from 'react';
import { Box, C } from '@/components/BrandShapes/draw';
import { OctoIn } from '@/components/BrandShapes/reefkit';
import { octagon, pts } from '@/components/BrandShapes/symbols';
import type { CoverFormat } from './covers';
import { keyCenter, MasonBack, MasonTop } from './mason-poses';
import '@/components/BrandShapes/reef.css';
import './course-covers.css';

// One warm light in the room, the band's gold, and the desk it falls on.
const W = { gold: '#E3B660', glow: '#F6DDA3', wood: '#C9AE84', woodEdge: '#9C8159', wall: '#0E2B45', wall2: '#0B2238', floor: '#081A2C' };

/** Every round-2 cover: the scene, then the esy brand, centred at the very top,
 *  where the band's "presents" line used to run (it drops when a drawn cover is
 *  in the poster). Scenes keep this strip clear. */
function Frame({ format, label, children }: { format: CoverFormat; label: string; children: ReactNode }) {
  const p = format === 'poster';
  return (
    <svg className={`cc-art cc-art--${format} cc-still`} viewBox={p ? '0 0 600 900' : '0 0 1280 720'} preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      {children}
      <EsyMark x={p ? 300 : 640} y={p ? 66 : 70} size={p ? 40 : 42} opacity={1} />
    </svg>
  );
}

/** A screen showing a terminal (prompt, lines typing) or an editor (file list, code). */
function Screen({ x, y, w, h, kind = 'terminal', id }: { x: number; y: number; w: number; h: number; kind?: 'terminal' | 'editor'; id: string }) {
  const pad = Math.max(10, w * 0.07);
  const lh = h * 0.13;
  const bar = Math.max(4, lh * 0.42);
  return (
    <g>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={C.mint} stopOpacity="0.28" />
          <stop offset="1" stopColor={C.mint} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* The screen's light on the room. */}
      <ellipse cx={x + w / 2} cy={y + h / 2} rx={w * 0.95} ry={h * 1.1} fill={`url(#${id})`} />
      <Box x={x} y={y} w={w} h={h} c={Math.min(10, w * 0.04)} fill="#0C2A47" stroke={C.teal} strokeWidth={2} />
      {kind === 'terminal' ? (
        <g>
          <polygon
            points={`${x + pad},${y + pad} ${x + pad + bar * 1.6},${y + pad + bar * 1.1} ${x + pad},${y + pad + bar * 2.2} ${x + pad + bar * 0.7},${y + pad + bar * 2.2} ${x + pad + bar * 2.3},${y + pad + bar * 1.1} ${x + pad + bar * 0.7},${y + pad}`}
            fill={C.bright}
          />
          {[0.55, 0.4, 0.7, 0.32, 0.5].map((f, k) => (
            <Box key={k} className="cc-type" x={x + pad + bar * 3.4} y={y + pad + k * lh + bar * 0.4} w={(w - pad * 2 - bar * 3.4) * f} h={bar} c={bar * 0.3} fill={k === 2 ? C.bright : C.mint} opacity={k === 2 ? 1 : 0.7} style={{ '--k': k } as CSSProperties} />
          ))}
          <Box className="cc-cursor" x={x + pad + bar * 3.4} y={y + pad + 5 * lh} w={bar * 1.3} h={bar * 2} c={1} fill={C.ivory} />
        </g>
      ) : (
        <g>
          <Box x={x + 4} y={y + 4} w={w * 0.24} h={h - 8} c={[6, 0, 0, 6]} fill="#0A2238" />
          {[0.7, 0.5, 0.6, 0.45, 0.65, 0.4].map((f, k) => (
            <Box key={k} x={x + pad * 0.8} y={y + pad + k * lh} w={w * 0.16 * f} h={bar} c={bar * 0.3} fill={k === 1 ? C.mint : '#2C557A'} />
          ))}
          {[[0, 0.5], [1, 0.62], [1, 0.4], [2, 0.3], [1, 0.55], [0, 0.35]].map(([ind, f], k) => (
            <Box key={k} x={x + w * 0.3 + ind * bar * 2.4} y={y + pad + k * lh} w={w * 0.62 * f} h={bar} c={bar * 0.3} fill={k % 3 === 1 ? W.gold : k % 2 ? C.mint : C.ivory} opacity={0.75} />
          ))}
        </g>
      )}
    </g>
  );
}

/** A desk lamp leaning in from (x, y), its warm cone falling to `floor`. */
function Lamp({ x, y, floor, flip = false, id }: { x: number; y: number; floor: number; flip?: boolean; id: string }) {
  const s = flip ? -1 : 1;
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={W.glow} stopOpacity="0.5" />
          <stop offset="1" stopColor={W.glow} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`${x + s * 62},${y - 66} ${x + s * 92},${y - 66} ${x + s * 170},${floor} ${x + s * 0},${floor}`} fill={`url(#${id})`} />
      <Box x={x - 18} y={y - 8} w={36} h={8} c={[3, 3, 0, 0]} fill={C.navy} />
      <Box x={x - 3} y={y - 70} w={6} h={64} fill={C.navy} transform={`rotate(${s * 14} ${x} ${y - 8})`} />
      <Box x={x + s * 40 - 22} y={y - 92} w={44} h={26} c={[10, 10, 0, 0]} fill={C.deep} transform={`rotate(${s * 24} ${x + s * 40} ${y - 79})`} />
    </g>
  );
}

function Plant({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const leaf = (dx: number, dy: number, r: number, f: string, k: number) => (
    <polygon key={k} points={`0,0 ${10 * s},${-14 * s} 0,${-34 * s} ${-10 * s},${-14 * s}`} transform={`translate(${x + dx * s} ${y + dy * s}) rotate(${r})`} fill={f} />
  );
  return (
    <g>
      {leaf(0, -26, 0, C.teal, 0)}
      {leaf(-6, -22, -32, C.deep, 1)}
      {leaf(6, -22, 32, C.deep, 2)}
      {leaf(-4, -16, -60, C.teal, 3)}
      {leaf(4, -16, 60, C.teal, 4)}
      <Box x={x - 16 * s} y={y - 24 * s} w={32 * s} h={24 * s} c={[0, 0, 6 * s, 6 * s]} fill={C.ivory} />
    </g>
  );
}

/** A bookshelf: shelves and spines in the palette. */
function Shelf({ x, y, w, rows }: { x: number; y: number; w: number; rows: number }) {
  const tones = [C.navy, C.deep, C.ivory, '#163A5F', C.teal];
  return (
    <g>
      <Box x={x} y={y} w={w} h={rows * 74 + 10} fill="#0A2034" stroke="#163A5F" strokeWidth={2} />
      {Array.from({ length: rows }, (_, r) => (
        <g key={r}>
          {Array.from({ length: Math.floor((w - 16) / 15) }, (_, k) => {
            const h = 44 + ((k * 7 + r * 5) % 4) * 6;
            return <Box key={k} x={x + 8 + k * 15} y={y + r * 74 + 70 - h} w={12} h={h} c={[2, 2, 0, 0]} fill={tones[(k + r * 2) % tones.length]} opacity={0.9} />;
          })}
          <Box x={x} y={y + r * 74 + 70} w={w} h={6} fill="#163A5F" />
        </g>
      ))}
    </g>
  );
}

/** A window onto the night city: sky, an octagon moon, stars, a stencil skyline with lit windows. */
function CityWindow({ x, y, w, h, id }: { x: number; y: number; w: number; h: number; id: string }) {
  const blocks = Array.from({ length: Math.ceil(w / 46) }, (_, k) => ({ bx: x + k * 46, bh: h * (0.22 + ((k * 37) % 5) * 0.07) }));
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0A1C33" />
          <stop offset="1" stopColor="#13405A" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <rect x={x} y={y} width={w} height={h} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <rect x={x} y={y} width={w} height={h} fill={`url(#${id})`} />
        <polygon points={pts(octagon(x + w * 0.74, y + h * 0.22, Math.min(w, h) * 0.12))} fill={W.glow} opacity={0.9} />
        {[0.1, 0.3, 0.5, 0.62, 0.88].map((f, k) => (
          <Box key={k} x={x + w * f} y={y + h * (0.1 + (k % 3) * 0.08)} w={3} h={3} fill={C.ivory} opacity={0.7} />
        ))}
        {blocks.map(({ bx, bh }, k) => (
          <g key={k}>
            <Box x={bx} y={y + h - bh} w={42} h={bh} c={[k % 2 ? 8 : 0, k % 3 ? 0 : 8, 0, 0]} fill={k % 2 ? '#0B2238' : '#0E2B45'} />
            {Array.from({ length: Math.floor(bh / 26) }, (_, r) => (
              <Box key={r} x={bx + 10 + ((r + k) % 2) * 14} y={y + h - bh + 12 + r * 26} w={6} h={8} fill={(r + k) % 3 ? W.gold : C.mint} opacity={(r * k) % 4 ? 0.85 : 0.25} />
            ))}
          </g>
        ))}
      </g>
      {/* The frame and its cross. */}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="#163A5F" strokeWidth={10} />
      <rect x={x + w / 2 - 4} y={y} width={8} height={h} fill="#163A5F" />
      <rect x={x} y={y + h * 0.55 - 4} width={w} height={8} fill="#163A5F" />
    </g>
  );
}

/** The desk: a warm top lit by the lamp, a darker front edge, two legs. */
function Desk({ x, y, w, legs = 160 }: { x: number; y: number; w: number; legs?: number }) {
  return (
    <g>
      <Box x={x + 24} y={y + 20} w={16} h={legs} fill="#0A1E31" />
      <Box x={x + w - 40} y={y + 20} w={16} h={legs} fill="#0A1E31" />
      <Box x={x} y={y} w={w} h={14} c={[4, 4, 0, 0]} fill={W.wood} />
      <Box x={x} y={y + 14} w={w} h={8} fill={W.woodEdge} />
    </g>
  );
}

/** The esy wordmark as a brand mark on a surface: teal "e", then "sy", in Black Ops One. */
function EsyMark({ x, y, size, tone = 'light', rotate = 0, opacity = 0.9, anchor = 'middle' }: { x: number; y: number; size: number; tone?: 'light' | 'dark'; rotate?: number; opacity?: number; anchor?: 'start' | 'middle' }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      textAnchor={anchor}
      opacity={opacity}
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      style={{ fontFamily: "var(--font-black-ops-one), 'Black Ops One', sans-serif", letterSpacing: '0.03em' }}
      aria-hidden="true"
    >
      {/* On dark covers the e takes the bright teal, as the hero's marks do on navy. */}
      <tspan fill={tone === 'light' ? C.bright : C.teal}>e</tspan>
      <tspan fill={tone === 'light' ? '#FFFFFF' : C.navy}>sy</tspan>
    </text>
  );
}

/** A monitor on a stand, its screen a Screen; with `logo`, the esy mark on its chin. */
function Monitor({ x, y, w, h, kind, id, logo = false }: { x: number; y: number; w: number; h: number; kind?: 'terminal' | 'editor'; id: string; logo?: boolean }) {
  const chin = logo ? 22 : 6;
  return (
    <g>
      <Box x={x + w / 2 - 8} y={y + h + chin} w={16} h={22} fill="#0A1E31" />
      <Box x={x + w / 2 - 40} y={y + h + chin + 18} w={80} h={8} c={[3, 3, 0, 0]} fill="#0A1E31" />
      <Box x={x - 6} y={y - 6} w={w + 12} h={h + 6 + chin} c={12} fill="#0A1E31" />
      <Screen x={x} y={y} w={w} h={h} kind={kind} id={id} />
      {logo && <EsyMark x={x + w / 2} y={y + h + 16} size={13} />}
    </g>
  );
}

/** Mason at (x, y), the top-left of his box; `w` is his drawing's width (his body is about a quarter of it).
 *  Still by default; `typing` sets his arms tapping, each a beat apart. */
const Mason = ({ x, y, w, items, typing = false }: { x: number; y: number; w: number; items?: Record<number, ReactNode>; typing?: boolean }) => (
  <OctoIn x={x} y={y} w={w} items={items ?? {}} className={typing ? 'cc-mason cc-typing' : 'cc-mason'} />
);

/** Where his arm tips land, in his box's own units (0–480 wide): arm i hangs from
 *  (182 + 16.6i, 204), turned (3.5 − i) × 17°, and is 124 long. */
const tipOf = (i: number, x: number, y: number, w: number): [number, number] => {
  const a = ((3.5 - i) * 17 * Math.PI) / 180;
  const s = w / 480;
  return [x + (182 + i * 16.6 - 124 * Math.sin(a)) * s, y + (204 + 124 * Math.cos(a)) * s];
};

/** A small keyboard slab whose keys under Mason's tips light in turn. */
function Keys({ x, y, w, cols, rows, lit }: { x: number; y: number; w: number; cols: number; rows: number; lit: number[] }) {
  const k = w / cols;
  return (
    <g>
      <Box x={x - 6} y={y - 6} w={w + 8} h={rows * k + 8} c={4} fill="#0A1E31" />
      {Array.from({ length: cols * rows }, (_, n) => {
        const press = lit.indexOf(n);
        return (
          <Box
            key={n}
            className={press >= 0 ? 'cc-press' : undefined}
            x={x + (n % cols) * k}
            y={y + Math.floor(n / cols) * k}
            w={k - 3}
            h={k - 3}
            c={1.5}
            fill="#163A5F"
            style={press >= 0 ? ({ '--k': press } as CSSProperties) : undefined}
          />
        );
      })}
    </g>
  );
}

/* ── The desk, seen a little from above ──
   Its top is a band from the far edge (where the monitor stands) to the near
   one (where Mason sits), so a keyboard can lie on it between them. */
function DeskTop({ x0, x1, far, near, spread = 30, legs = 200 }: { x0: number; x1: number; far: number; near: number; spread?: number; legs?: number }) {
  return (
    <g>
      {legs > 0 && (
        <>
          <Box x={x0 - spread + 20} y={near + 12} w={16} h={legs} fill="#0A1E31" />
          <Box x={x1 + spread - 36} y={near + 12} w={16} h={legs} fill="#0A1E31" />
        </>
      )}
      <polygon points={`${x0},${far} ${x1},${far} ${x1 + spread},${near} ${x0 - spread},${near}`} fill={W.wood} />
      <Box x={x0 - spread} y={near} w={x1 - x0 + spread * 2} h={12} fill={W.woodEdge} />
    </g>
  );
}

type K4 = [number, number, number, number];
/** The four keys his tips rest on, as points, for a Keys grid. */
const keysAt = (x: number, y: number, w: number, cols: number, ns: K4) =>
  ns.map((n) => keyCenter(x, y, w, cols, n)) as [[number, number], [number, number], [number, number], [number, number]];

/* ── F · Studio ──
   Mason at his desk at night, from behind: we see the back of his mantle, the
   monitor beyond him, and his four front arms reaching past him to the
   keyboard, each tip pressing a key as the terminal types. */
export function StudioCover({ format }: { format: CoverFormat }) {
  const p = format === 'poster';
  const kb = p ? { x: 180, y: 494, w: 240, cols: 15, rows: 3, ns: [17, 19, 25, 27] as K4 } : { x: 500, y: 440, w: 280, cols: 16, rows: 3, ns: [18, 20, 27, 29] as K4 };
  return (
    <Frame format={format} label="Mason the octopus at his desk at night, seen from behind, his tentacles pressing the keys as the terminal on his monitor types">
      <rect width={p ? 600 : 1280} height={p ? 900 : 720} fill={W.wall} />
      <rect y={p ? 640 : 600} width={p ? 600 : 1280} height={400} fill={W.floor} />
      {p ? (
        <>
          <CityWindow x={360} y={150} w={190} h={180} id="cc-f-win-p" />
          <Shelf x={30} y={170} w={140} rows={4} />
          <DeskTop x0={60} x1={540} far={470} near={560} />
          <Monitor x={170} y={300} w={260} h={150} id="cc-f-scr-p" />
          <Lamp x={95} y={490} floor={560} id="cc-f-lamp-p" />
          <Plant x={520} y={490} />
          <Keys x={kb.x} y={kb.y} w={kb.w} cols={kb.cols} rows={kb.rows} lit={kb.ns} />
          <MasonBack cx={300} cy={592} s={0.62} keys={keysAt(kb.x, kb.y, kb.w, kb.cols, kb.ns)} />
        </>
      ) : (
        <>
          <CityWindow x={930} y={90} w={270} h={250} id="cc-f-win-w" />
          <Shelf x={70} y={110} w={200} rows={4} />
          <DeskTop x0={220} x1={1060} far={420} near={520} spread={40} legs={160} />
          <Monitor x={470} y={200} w={340} h={190} id="cc-f-scr-w" />
          <Lamp x={270} y={440} floor={520} id="cc-f-lamp-w" />
          <Plant x={1010} y={440} s={1.3} />
          <Keys x={kb.x} y={kb.y} w={kb.w} cols={kb.cols} rows={kb.rows} lit={kb.ns} />
          <MasonBack cx={640} cy={556} s={0.78} keys={keysAt(kb.x, kb.y, kb.w, kb.cols, kb.ns)} />
        </>
      )}
    </Frame>
  );
}

/* ── K · Studio, two screens (round 3: F's room with J's screens) ──
   Mason from behind at his desk at night, in F's room (shelf, lamp, city
   window, plant), at J's two screens, an editor and the terminal, his
   tentacles pressing the keys of the keyboard between them. */
export function StudioTwoCover({ format }: { format: CoverFormat }) {
  const p = format === 'poster';
  const kb = p ? { x: 180, y: 494, w: 240, cols: 15, rows: 3, ns: [17, 19, 25, 27] as K4 } : { x: 500, y: 440, w: 280, cols: 16, rows: 3, ns: [18, 20, 27, 29] as K4 };
  return (
    <Frame format={format} label="Mason the octopus at his desk at night, seen from behind between two screens, an editor and a terminal, his tentacles pressing the keys">
      <rect width={p ? 600 : 1280} height={p ? 900 : 720} fill={W.wall} />
      <rect y={p ? 640 : 600} width={p ? 600 : 1280} height={400} fill={W.floor} />
      {p ? (
        <>
          {/* The room made a little narrower so both screens fit on the desk. */}
          <CityWindow x={390} y={110} w={160} h={140} id="cc-k-win-p" />
          <Shelf x={20} y={170} w={110} rows={4} />
          <DeskTop x0={60} x1={540} far={470} near={560} />
          <Monitor x={145} y={300} w={180} h={140} kind="editor" id="cc-k-ed-p" />
          <Monitor x={340} y={300} w={180} h={140} id="cc-k-scr-p" />
          <Lamp x={95} y={490} floor={560} id="cc-k-lamp-p" />
          <Plant x={530} y={490} />
          <Keys x={kb.x} y={kb.y} w={kb.w} cols={kb.cols} rows={kb.rows} lit={kb.ns} />
          <MasonBack cx={300} cy={592} s={0.62} keys={keysAt(kb.x, kb.y, kb.w, kb.cols, kb.ns)} />
        </>
      ) : (
        <>
          <CityWindow x={1000} y={80} w={220} h={220} id="cc-k-win-w" />
          <Shelf x={70} y={110} w={200} rows={4} />
          <DeskTop x0={220} x1={1060} far={420} near={520} spread={40} legs={160} />
          <Monitor x={300} y={190} w={320} h={200} kind="editor" id="cc-k-ed-w" />
          <Monitor x={660} y={190} w={320} h={200} id="cc-k-scr-w" />
          <Lamp x={270} y={440} floor={520} id="cc-k-lamp-w" />
          <Plant x={1025} y={440} s={1.3} />
          <Keys x={kb.x} y={kb.y} w={kb.w} cols={kb.cols} rows={kb.rows} lit={kb.ns} />
          <MasonBack cx={640} cy={556} s={0.78} keys={keysAt(kb.x, kb.y, kb.w, kb.cols, kb.ns)} />
        </>
      )}
    </Frame>
  );
}

/* ── G · Window ──
   A laptop on a window ledge over the night city, its screen facing the room.
   We're behind Mason: he sits at the ledge, and his tentacles press the
   laptop's keys as its terminal types. */
export function WindowCover({ format }: { format: CoverFormat }) {
  const p = format === 'poster';
  const kb = p ? { x: 190, y: 508, w: 220, cols: 14, rows: 2, ns: [1, 3, 10, 12] as K4 } : { x: 510, y: 462, w: 260, cols: 16, rows: 2, ns: [2, 4, 11, 13] as K4 };
  return (
    <Frame format={format} label="Mason the octopus seen from behind at a window ledge over the night city, his tentacles typing on a laptop whose terminal faces him">
      <rect width={p ? 600 : 1280} height={p ? 900 : 720} fill={W.wall2} />
      {p ? (
        <>
          <CityWindow x={40} y={100} w={520} h={410} id="cc-g-win-p" />
          <DeskTop x0={40} x1={560} far={500} near={548} spread={20} legs={0} />
          {/* The laptop: its screen standing at the back of the ledge, its keys in front. */}
          <Box x={196} y={364} w={208} h={136} c={8} fill="#0A1E31" />
          <Screen x={204} y={372} w={192} h={120} id="cc-g-scr-p" />
          <Plant x={520} y={505} s={1.1} />
          <Keys x={kb.x} y={kb.y} w={kb.w} cols={kb.cols} rows={kb.rows} lit={kb.ns} />
          <MasonBack cx={300} cy={612} s={0.6} keys={keysAt(kb.x, kb.y, kb.w, kb.cols, kb.ns)} />
        </>
      ) : (
        <>
          <CityWindow x={120} y={60} w={1040} h={400} id="cc-g-win-w" />
          <DeskTop x0={100} x1={1180} far={452} near={500} spread={20} legs={0} />
          <Box x={514} y={296} w={252} h={154} c={8} fill="#0A1E31" />
          <Screen x={522} y={304} w={236} h={138} id="cc-g-scr-w" />
          <Plant x={1060} y={458} s={1.3} />
          <Keys x={kb.x} y={kb.y} w={kb.w} cols={kb.cols} rows={kb.rows} lit={kb.ns} />
          <MasonBack cx={640} cy={570} s={0.75} keys={keysAt(kb.x, kb.y, kb.w, kb.cols, kb.ns)} />
        </>
      )}
    </Frame>
  );
}

/* ── H · Floating ──
   The original poster's idea in our cut: a terminal glowing over night hills.
   Mason sits on its title bar against the moon, letting files drop into it,
   and the finished ones fall out of the bottom to the desk. */
function Hills({ w, y, h }: { w: number; y: number; h: number }) {
  return (
    <g>
      <polygon points={`0,${y + h * 0.4} ${w * 0.18},${y + h * 0.1} ${w * 0.32},${y + h * 0.3} ${w * 0.5},${y} ${w * 0.7},${y + h * 0.28} ${w * 0.86},${y + h * 0.08} ${w},${y + h * 0.3} ${w},${y + h} 0,${y + h}`} fill="#0F3150" />
      <polygon points={`0,${y + h * 0.7} ${w * 0.25},${y + h * 0.45} ${w * 0.45},${y + h * 0.62} ${w * 0.65},${y + h * 0.42} ${w},${y + h * 0.66} ${w},${y + h} 0,${y + h}`} fill="#0B2740" />
      {Array.from({ length: 14 }, (_, k) => (
        <Box key={k} x={w * (0.55 + (k % 7) * 0.06)} y={y + h * (0.74 + Math.floor(k / 7) * 0.08)} w={4} h={4} fill={W.gold} opacity={0.8} />
      ))}
    </g>
  );
}

export function FloatingCover({ format }: { format: CoverFormat }) {
  const p = format === 'poster';
  const Wd = p ? 600 : 1280;
  const Ht = p ? 900 : 720;
  const win = p ? { x: 130, y: 210, w: 340, h: 210 } : { x: 470, y: 200, w: 420, h: 250 };
  const bar = 28;
  // At the title bar's left end, clear of the brand at the top centre.
  const m = p ? { x: 72, y: 64, w: 170 } : { x: 400, y: 31, w: 200 };
  const s = m.w / 480;
  const head: [number, number] = [m.x + 240 * s, m.y + 110 * s];
  const feed = tipOf(5, m.x, m.y, m.w);
  const cards = p ? [[300, 455], [282, 500], [306, 545], [286, 588]] : [[680, 480], [662, 520], [690, 560], [668, 600]];
  return (
    <Frame format={format} label="A glowing terminal window floating over night hills, with Mason the octopus on its title bar letting files drop into it while finished files fall to a desk">
      <defs>
        <linearGradient id={`cc-h-sky-${format}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0A1C33" />
          <stop offset="1" stopColor="#13405A" />
        </linearGradient>
      </defs>
      <rect width={Wd} height={Ht} fill={`url(#cc-h-sky-${format})`} />
      {[0.08, 0.2, 0.36, 0.52, 0.7, 0.84, 0.93].map((f, k) => (
        <Box key={k} x={Wd * f} y={Ht * (0.12 + (k % 4) * 0.05)} w={3} h={3} fill={C.ivory} opacity={0.75} />
      ))}
      {/* octagon() takes the width across, so this is about twice his head. */}
      <polygon points={pts(octagon(head[0], head[1], m.w * 0.5))} fill={W.glow} opacity={0.92} />
      <Hills w={Wd} y={300} h={p ? 260 : 220} />
      <Box x={win.x} y={win.y - bar} w={win.w} h={bar + 10} c={[10, 10, 0, 0]} fill="#103558" stroke={C.teal} strokeWidth={2} />
      {[C.teal, C.mint, C.ivory].map((f, k) => (
        <Box key={k} x={win.x + win.w - 70 + k * 20} y={win.y - 17} w={12} h={7} c={2} fill={f} opacity={0.8} />
      ))}
      <Screen x={win.x} y={win.y} w={win.w} h={win.h} id={`cc-h-scr-${format}`} />
      {/* A file dropping from beside his tip into the window. */}
      <g className="cc-feed" transform={`translate(${feed[0]} ${feed[1] + 6})`}>
        <Box x={-12} y={0} w={24} h={17} c={[0, 5, 0, 0]} fill={C.ivory} />
      </g>
      {cards.map(([cx, cy], k) => (
        <g key={k} className="cc-fall" style={{ '--k': k } as CSSProperties}>
          <Box x={cx - 22} y={cy - 15} w={44} h={30} c={[0, 8, 0, 0]} fill={k % 2 ? C.mint : C.ivory} opacity={0.9} />
        </g>
      ))}
      <Desk x={p ? 120 : 430} y={p ? 610 : 630} w={p ? 360 : 500} legs={p ? 200 : 90} />
      <Box x={p ? 262 : 640} y={p ? 578 : 598} w={80} h={32} c={[0, 0, 4, 4]} fill="#163A5F" />
      <Mason x={m.x} y={m.y} w={m.w} />
    </Frame>
  );
}

/* ── I · Flat-lay ──
   The desk from above, with Mason at the laptop: we see the top of his
   mantle, not his face, and his four front arms on the keys, each pressing in
   turn as the terminal types. */
function Keyboard({ x, y, cols, rows, k, pressed }: { x: number; y: number; cols: number; rows: number; k: number; pressed: number[] }) {
  return (
    <g>
      {Array.from({ length: cols * rows }, (_, n) => {
        const press = pressed.indexOf(n);
        return (
          <Box
            key={n}
            className={press >= 0 ? 'cc-press' : undefined}
            x={x + (n % cols) * k}
            y={y + Math.floor(n / cols) * k}
            w={k - 4}
            h={k - 4}
            c={2}
            fill="#163A5F"
            style={press >= 0 ? ({ '--k': press } as CSSProperties) : undefined}
          />
        );
      })}
    </g>
  );
}

/** The centre of key n on a Keyboard grid. */
const flatKey = (x: number, y: number, cols: number, k: number, n: number): [number, number] => [x + (n % cols) * k + (k - 4) / 2, y + Math.floor(n / cols) * k + (k - 4) / 2];

function Notebook({ x, y, w, h, r }: { x: number; y: number; w: number; h: number; r: number }) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g transform={`rotate(${r} ${cx} ${cy})`}>
      <Box x={x} y={y} w={w} h={h} c={8} fill={C.ivory} />
      <Box x={x} y={y} w={14} h={h} c={[8, 0, 0, 8]} fill="#C9C1AE" />
      {[0, 1, 2, 3].map((k) => <Box key={k} x={x + 26} y={y + 30 + k * 26} w={w - 44} h={4} fill="#C9C1AE" />)}
    </g>
  );
}

export function FlatLayCover({ format }: { format: CoverFormat }) {
  const p = format === 'poster';
  const kb = p ? { x: 160, y: 362, cols: 12, rows: 4, k: 27, ns: [27, 29, 31, 33] as K4 } : { x: 426, y: 366, cols: 14, rows: 5, k: 31, ns: [45, 47, 50, 52] as K4 };
  const tips = kb.ns.map((n) => flatKey(kb.x, kb.y, kb.cols, kb.k, n)) as [[number, number], [number, number], [number, number], [number, number]];
  return (
    <Frame format={format} label="A desk from above: Mason the octopus at an open laptop, the top of his head toward us, his tentacles pressing the keys as the terminal types">
      <rect width={p ? 600 : 1280} height={p ? 900 : 720} fill="#0F2B45" />
      {Array.from({ length: p ? 9 : 8 }, (_, k) => (
        <rect key={k} x={0} y={(p ? 100 : 80) * k + 40} width={p ? 600 : 1280} height={2} fill="#13355A" />
      ))}
      {p ? (
        <>
          <Box x={140} y={130} w={360} h={210} c={12} fill="#0A1E31" />
          <Screen x={153} y={143} w={334} h={184} id="cc-i-scr-p" />
          <Box x={140} y={346} w={360} h={160} c={[0, 0, 12, 12]} fill="#0A1E31" />
          <Keyboard x={kb.x} y={kb.y} cols={kb.cols} rows={kb.rows} k={kb.k} pressed={kb.ns} />
          <Notebook x={22} y={380} w={110} h={150} r={-9} />
          <Box x={518} y={360} w={7} h={140} c={[4, 4, 0, 0]} fill={C.teal} transform="rotate(12 521 430)" />
          <Box x={30} y={150} w={56} h={56} c={4} fill={C.mint} transform="rotate(-10 58 178)" />
          <Box x={40} y={222} w={56} h={56} c={4} fill={W.glow} transform="rotate(7 68 250)" />
          <polygon points={pts(octagon(540, 210, 40))} fill={C.deep} />
          <polygon points={pts(octagon(540, 210, 27))} fill="#3B2A1C" />
          <MasonTop cx={322} cy={540} s={0.7} keys={tips} />
        </>
      ) : (
        <>
          <Box x={400} y={100} w={480} h={240} c={14} fill="#0A1E31" />
          <Screen x={416} y={116} w={448} h={208} id="cc-i-scr-w" />
          <Box x={400} y={346} w={480} h={210} c={[0, 0, 14, 14]} fill="#0A1E31" />
          <Keyboard x={kb.x} y={kb.y} cols={kb.cols} rows={kb.rows} k={kb.k} pressed={kb.ns} />
          <Notebook x={160} y={190} w={180} h={240} r={-8} />
          <Box x={350} y={210} w={8} h={190} c={[4, 4, 0, 0]} fill={C.teal} transform="rotate(18 354 305)" />
          <polygon points={pts(octagon(1030, 220, 58))} fill={C.deep} />
          <polygon points={pts(octagon(1030, 220, 40))} fill="#3B2A1C" />
          <Box x={970} y={400} w={66} h={66} c={4} fill={C.mint} transform="rotate(10 1003 433)" />
          <Box x={1050} y={420} w={66} h={66} c={4} fill={W.glow} transform="rotate(-6 1083 453)" />
          <MasonTop cx={643} cy={600} s={0.85} keys={tips} />
        </>
      )}
    </Frame>
  );
}

/* ── J · Two screens ──
   Mason at a desk with two screens, an editor and the terminal, from behind:
   his tentacles on the keyboard between them as both fill. */
export function TwoScreensCover({ format }: { format: CoverFormat }) {
  const p = format === 'poster';
  const kb = p ? { x: 180, y: 494, w: 240, cols: 15, rows: 3, ns: [17, 19, 25, 27] as K4 } : { x: 500, y: 440, w: 280, cols: 16, rows: 3, ns: [18, 20, 27, 29] as K4 };
  return (
    <Frame format={format} label="Mason the octopus seen from behind at a desk with two screens, an editor and a terminal, his tentacles pressing the keys">
      <rect width={p ? 600 : 1280} height={p ? 900 : 720} fill={W.wall} />
      <rect y={p ? 640 : 600} width={p ? 600 : 1280} height={400} fill={W.floor} />
      {p ? (
        <>
          <CityWindow x={390} y={130} w={160} h={130} id="cc-j-win-p" />
          <DeskTop x0={40} x1={560} far={470} near={560} />
          <Monitor x={50} y={300} w={240} h={150} kind="editor" id="cc-j-ed-p" />
          <Monitor x={310} y={300} w={240} h={150} id="cc-j-scr-p" />
          <Keys x={kb.x} y={kb.y} w={kb.w} cols={kb.cols} rows={kb.rows} lit={kb.ns} />
          <MasonBack cx={300} cy={592} s={0.62} keys={keysAt(kb.x, kb.y, kb.w, kb.cols, kb.ns)} />
        </>
      ) : (
        <>
          <CityWindow x={1010} y={80} w={220} h={200} id="cc-j-win-w" />
          <DeskTop x0={200} x1={1080} far={420} near={520} spread={40} legs={160} />
          <Monitor x={290} y={190} w={330} h={200} kind="editor" id="cc-j-ed-w" />
          <Monitor x={660} y={190} w={330} h={200} id="cc-j-scr-w" />
          <Lamp x={1150} y={440} floor={520} flip id="cc-j-lamp-w" />
          <Keys x={kb.x} y={kb.y} w={kb.w} cols={kb.cols} rows={kb.rows} lit={kb.ns} />
          <MasonBack cx={640} cy={556} s={0.78} keys={keysAt(kb.x, kb.y, kb.w, kb.cols, kb.ns)} />
        </>
      )}
    </Frame>
  );
}
