/* Newsletter covers by topic (2026-10-11, /prototypes/newsletter-topic-cover/).
 * The covers stop showing Zev and carry the issue's topic instead, in Esy's
 * look: navy, teal and jade, the stencil cut, Mason. Three ways, each drawn for
 * the two next issues (Meta's Muse, OpenAI's Dots):
 *
 *   A · Mason at work  The course cover's room (covers2.tsx), with Mason doing
 *                      the topic's work. Dots: small round agents leave his
 *                      screen for jobs around the room. Muse: he works on his
 *                      own screen while the agent works through a long task on
 *                      the other, then asks for his OK.
 *   B · Type           The topic's name is the art. Dots: the full stop is the
 *                      first dot, and it splits into a team. Muse: the night
 *                      passes over the word while its steps fill in.
 *   C · The room       The desk photo from the live covers, edited with
 *                      gpt-image-2.5 Sunburst: no screen, one object tells it.
 *
 * A and B are drawn in code, so they animate for free (CSS only, still under
 * reduced motion). Every animated part's resting place is its finished state,
 * so a still frame (email, social) shows the idea, not the start of a loop.
 * Products appear by name only, never as a drawn logo (docs/news/README.md). */

import type { CSSProperties, ReactNode } from 'react';
import { Box, C } from '@/components/BrandShapes/draw';
import { octagon, pts } from '@/components/BrandShapes/symbols';
import { CityWindow, DeskTop, EsyMark, Keys, Lamp, Monitor, Plant, Shelf, W, keysAt, type K4 } from '@/components/CourseCovers/covers2';
import { MasonBack } from '@/components/CourseCovers/mason-poses';
import type { TopicId } from './topics';
import './topic-covers.css';

export type TakeId = 'mason' | 'type' | 'room';

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/** Every cover: 1280×720, anchored right (the issue title sits over the left),
 *  with the esy brand at the top centre. `still` stops the motion. */
function Art({ label, still, children }: { label: string; still?: boolean; children: ReactNode }) {
  return (
    <svg className={`tc-art${still ? ' tc-still' : ''}`} viewBox="0 0 1280 720" preserveAspectRatio="xMaxYMid slice" role="img" aria-label={label}>
      {children}
      <EsyMark x={640} y={70} size={40} opacity={1} />
    </svg>
  );
}

/* ── A · Mason at work ── the course cover's room, pushed right ── */

const KB = { x: 770, y: 452, w: 260, cols: 15, rows: 3, ns: [16, 18, 26, 28] as K4 };

function Room({ id, children }: { id: string; children: ReactNode }) {
  return (
    <>
      <rect width={1280} height={720} fill={W.wall} />
      <rect y={610} width={1280} height={110} fill={W.floor} />
      <CityWindow x={1030} y={96} w={210} h={200} id={`${id}-win`} />
      <Shelf x={560} y={150} w={150} rows={3} />
      <DeskTop x0={640} x1={1200} far={430} near={530} spread={40} legs={160} />
      {children}
      <Lamp x={690} y={452} floor={530} id={`${id}-lamp`} />
      <Plant x={1170} y={452} s={1.25} />
      <Keys x={KB.x} y={KB.y} w={KB.w} cols={KB.cols} rows={KB.rows} lit={KB.ns} />
      <MasonBack cx={900} cy={566} s={0.74} keys={keysAt(KB.x, KB.y, KB.w, KB.cols, KB.ns)} />
    </>
  );
}

/** A monitor frame on a stand around custom screen content. */
function Frame({ x, y, w, h, id, children }: { x: number; y: number; w: number; h: number; id: string; children: ReactNode }) {
  return (
    <g>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={C.mint} stopOpacity="0.26" />
          <stop offset="1" stopColor={C.mint} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={x + w / 2} cy={y + h / 2} rx={w * 0.95} ry={h * 1.1} fill={`url(#${id})`} />
      <Box x={x + w / 2 - 8} y={y + h + 6} w={16} h={22} fill="#0A1E31" />
      <Box x={x + w / 2 - 40} y={y + h + 24} w={80} h={8} c={[3, 3, 0, 0]} fill="#0A1E31" />
      <Box x={x - 6} y={y - 6} w={w + 12} h={h + 12} c={12} fill="#0A1E31" />
      <Box x={x} y={y} w={w} h={h} c={Math.min(10, w * 0.04)} fill="#0C2A47" stroke={C.teal} strokeWidth={2} />
      {children}
    </g>
  );
}

/** One of OpenAI's dots, drawn as what it is: a round, bubbly agent (no face,
 *  no logo), the one round thing in a room cut at 45°. */
function Dot({ x, y, r, glow = true }: { x: number; y: number; r: number; glow?: boolean }) {
  return (
    <g>
      {glow && <circle cx={x} cy={y} r={r * 2.6} fill="url(#tc-dot-glow)" />}
      <circle cx={x} cy={y} r={r} fill={C.bright} />
      <circle cx={x - r * 0.32} cy={y - r * 0.34} r={r * 0.3} fill="#FFFFFF" opacity={0.75} />
    </g>
  );
}

function DotDefs() {
  return (
    <defs>
      <radialGradient id="tc-dot-glow">
        <stop offset="0" stopColor={C.bright} stopOpacity="0.55" />
        <stop offset="1" stopColor={C.bright} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/* Dots: five dots leave his screen, each for a job somewhere in the room (an
   empty octagon slot that lights when its dot arrives), then come home. They
   rest at their jobs, so the still shows the team out at work. */
const SCREEN_A = { x: 790, y: 236, w: 230, h: 150 };
const HOME: [number, number] = [SCREEN_A.x + SCREEN_A.w / 2, SCREEN_A.y + SCREEN_A.h / 2 + 8];
const JOBS: [number, number][] = [
  [635, 132], // the top of the shelf
  [1090, 196], // the window
  [735, 338], // over the lamp
  [1186, 372], // the plant
  [960, 150], // high over the screen
];

export function MasonDots({ still }: { still?: boolean }) {
  return (
    <Art label="Mason the octopus at his desk at night, seen from behind, typing; small round glowing dots leave his screen and go to jobs around the room, each lighting an empty octagon slot" still={still}>
      <DotDefs />
      <Room id="tc-ad">
        <Frame {...SCREEN_A} id="tc-ad-scr">
          {/* The dots' home on his screen: a ring they leave from and come back to. */}
          <circle cx={HOME[0]} cy={HOME[1]} r={34} fill="none" stroke={C.teal} strokeWidth={2} strokeDasharray="4 6" opacity={0.7} />
          <Dot x={HOME[0]} y={HOME[1]} r={12} glow={false} />
        </Frame>
      </Room>
      {JOBS.map(([x, y], k) => (
        <g key={k}>
          <polygon className="tc-slot" style={v({ '--k': k })} points={pts(octagon(x, y, 44))} fill={C.bright} fillOpacity={0.18} stroke={C.bright} strokeWidth={2} />
          <g className="tc-go" style={v({ '--k': k, '--fx': `${HOME[0] - x}px`, '--fy': `${HOME[1] - y}px` })}>
            <g className="tc-bob" style={v({ '--k': k })}>
              <Dot x={x} y={y} r={11} />
            </g>
          </g>
        </g>
      ))}
    </Art>
  );
}

/* Muse: Mason types on his own screen (the editor) while the agent works on
   the other, through a long task one step at a time, then a card comes up
   asking for his OK. The still shows every step done and the card waiting. */
export function MasonMuse({ still }: { still?: boolean }) {
  const s = { x: 960, y: 222, w: 200, h: 150 };
  const steps = [0, 1, 2, 3, 4].map((k) => [s.x + 30 + k * 35, s.y + 52] as [number, number]);
  return (
    <Art label="Mason the octopus at his desk at night, seen from behind, typing on his own screen while the second screen works through a task step by step and then shows a card waiting for his approval" still={still}>
      <Room id="tc-am">
        <Monitor x={700} y={222} w={220} h={150} kind="editor" id="tc-am-ed" />
        <Frame {...s} id="tc-am-scr">
          {/* The long task: a line of steps, each lighting in turn. */}
          <line x1={steps[0][0]} y1={steps[0][1]} x2={steps[4][0]} y2={steps[4][1]} stroke="#2C557A" strokeWidth={3} />
          {steps.map(([x, y], k) => (
            <polygon key={k} className={`tc-step-${k}`} points={pts(octagon(x, y, 18))} fill={C.bright} stroke={C.bright} strokeWidth={2} />
          ))}
          {/* Then it comes back for his OK: a card with one button. */}
          <g className="tc-ask">
            <Box x={s.x + 26} y={s.y + 80} w={s.w - 52} h={52} c={8} fill={C.ivory} />
            <Box x={s.x + 40} y={s.y + 92} w={70} h={7} c={2} fill="#2C557A" />
            <Box x={s.x + 40} y={s.y + 106} w={50} h={6} c={2} fill="#9DB3C6" />
            <Box className="tc-ok" x={s.x + s.w - 86} y={s.y + 94} w={46} h={24} c={6} fill={C.teal} />
          </g>
        </Frame>
      </Room>
    </Art>
  );
}

/* ── B · Type ── the topic's name, set huge on the right in the brand's stencil ── */

function Field() {
  return (
    <>
      <defs>
        <radialGradient id="tc-field" cx="0.78" cy="0.5" r="0.7">
          <stop offset="0" stopColor="#123A5C" />
          <stop offset="1" stopColor="#0A1626" />
        </radialGradient>
      </defs>
      <rect width={1280} height={720} fill="url(#tc-field)" />
    </>
  );
}

const WORD: CSSProperties = { fontFamily: "var(--font-black-ops-one), 'Black Ops One', sans-serif", letterSpacing: '0.01em' };

/* Dots: "dots." The full stop is the primary dot; it splits into a team of
   five that fan out above the word and link up, then fold back into the stop.
   The still shows the linked team. */
export function TypeDots({ still }: { still?: boolean }) {
  const stop: [number, number] = [1176, 456];
  const team: [number, number][] = [
    [760, 196],
    [870, 142],
    [985, 186],
    [1095, 128],
    [1190, 214],
  ];
  return (
    <Art label="The word dots, huge, its full stop a glowing dot that splits into a linked team of five dots above the word" still={still}>
      <Field />
      <DotDefs />
      <text x={1140} y={480} textAnchor="end" fontSize={220} fill="#FFFFFF" style={WORD} aria-hidden="true">dots</text>
      {/* The links between team members, drawn once they're in place. */}
      {team.slice(1).map(([x, y], k) => (
        <line key={k} className={`tc-link-${k}`} x1={team[k][0]} y1={team[k][1]} x2={x} y2={y} stroke={C.bright} strokeWidth={2.5} strokeOpacity={0.6} />
      ))}
      {team.map(([x, y], k) => (
        <g key={k} className="tc-split" style={v({ '--k': k, '--fx': `${stop[0] - x}px`, '--fy': `${stop[1] - y}px` })}>
          <g className="tc-bob" style={v({ '--k': k })}>
            <Dot x={x} y={y} r={k === 2 ? 20 : 15} />
          </g>
        </g>
      ))}
      {/* The full stop itself: the primary dot, always home. */}
      <Dot x={stop[0]} y={stop[1]} r={26} />
    </Art>
  );
}

/* Muse: "muse", with the night passing over it (an octagon moon crossing the
   sky: it works while you're away) and its steps filling in along the
   baseline, ending at a ring that waits for your OK. The still shows the
   steps done and the ring lit. */
export function TypeMuse({ still }: { still?: boolean }) {
  const tiles = Array.from({ length: 7 }, (_, k) => 640 + k * 66);
  return (
    <Art label="The word muse, huge, with an octagon moon crossing the night sky above it and a row of steps filling in under it, ending at a ring waiting for approval" still={still}>
      <Field />
      {Array.from({ length: 14 }, (_, k) => (
        <Box key={k} x={600 + ((k * 97) % 660)} y={110 + ((k * 53) % 150)} w={3} h={3} fill={C.ivory} opacity={0.55} />
      ))}
      <g className="tc-moon">
        <polygon points={pts(octagon(1010, 150, 52))} fill={W.glow} opacity={0.9} />
      </g>
      <text x={1200} y={470} textAnchor="end" fontSize={200} fill="#FFFFFF" style={WORD} aria-hidden="true">muse</text>
      {tiles.map((x, k) => (
        <Box key={k} className={`tc-tile-${k}`} x={x} y={512} w={52} h={18} c={[0, 6, 0, 6]} fill={C.bright} />
      ))}
      <g className="tc-ring">
        <circle cx={1170} cy={521} r={22} fill="none" stroke={C.bright} strokeWidth={4} />
        <polyline points="1160,521 1168,529 1182,512" fill="none" stroke={C.bright} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Art>
  );
}

/* ── C · The room ── the live covers' desk photo, edited with Sunburst ── */

/** Sunburst edits of the desk plate (run-478aa4ef), cooled and pushed right
 *  like scripts/newsletter-cover.py does: dots run-a3d1a60c, muse run-a8e299e3. */
export const ROOM_COVERS: Record<TopicId, { src: string; alt: string }> = {
  dots: { src: '/prototypes/newsletter-topic-cover/room-dots.webp', alt: 'The dark desk at night with the monitor off and five small glowing jade spheres travelling across the wood' },
  muse: { src: '/prototypes/newsletter-topic-cover/room-muse.webp', alt: 'The dark desk at night with the monitor off and a phone lying on the desk, lit by a card with one jade button' },
};

export function RoomCover({ topic }: { topic: TopicId }) {
  const { src, alt } = ROOM_COVERS[topic];
  return (
    <svg className="tc-art" viewBox="0 0 1280 720" preserveAspectRatio="xMaxYMid slice" role="img" aria-label={alt}>
      <image href={src} width={1280} height={720} preserveAspectRatio="xMidYMid slice" />
      <EsyMark x={640} y={70} size={40} opacity={1} />
    </svg>
  );
}

/** The cover for a take and topic. */
export function CoverArt({ take, topic, still }: { take: TakeId; topic: TopicId; still?: boolean }) {
  if (take === 'room') return <RoomCover topic={topic} />;
  if (take === 'type') return topic === 'dots' ? <TypeDots still={still} /> : <TypeMuse still={still} />;
  return topic === 'dots' ? <MasonDots still={still} /> : <MasonMuse still={still} />;
}
