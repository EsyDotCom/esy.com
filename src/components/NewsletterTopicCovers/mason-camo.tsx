/* Round 5 (2026-10-11): Camouflage. A real octopus changes its skin to match
   where it is; Mason takes on the look of the issue's product, and carries
   its logo on a luggage tag hanging from one arm.
     dots  navy skin, the five Dots' colours as spots on his mantle and arm tips
     muse  Meta's blue, speckled with Jolly's cream
     clay  each arm a different modelling-clay colour, a Claude-orange mantle
           pressed with thumbprints
   The same figure is drawn three ways: M is this code (it moves), N and O are
   api.esy.com edits that make it a vinyl toy and a felt toy on the live
   covers' desk, from a flat placement of this figure (see the /newsletter-topic-mason
   capture route and scripts/newsletter-topic-covers.py). The logo is always the
   company's own file, laid on the tag, never redrawn. */

import type { CSSProperties, ReactNode } from 'react';
import { Box, C, pivot } from '@/components/BrandShapes/draw';
import { DeskTop, Lamp, Shelf, W } from '@/components/CourseCovers/covers2';
import type { TopicId } from './topics';
import '@/components/BrandShapes/reef.css';

const SEGS = [
  { l: 30, w: 24 },
  { l: 28, w: 20 },
  { l: 26, w: 16 },
  { l: 24, w: 12 },
];
const GAP = 4;
/** The arm that carries the tag: the outermost on the right, held out level so the tag hangs beside him, clear of his face. */
const TAG_ARM = 7;
const ARMS = Array.from({ length: 8 }, (_, i) => ({ i, x: 182 + i * 16.6, y: 204, angle: i === TAG_ARM ? -95 : (3.5 - i) * 17, front: i % 2 === 0 }));

const DOT = ['#7CB33A', '#F2C230', '#8EC3E6', '#F08FA8', '#F28A2E'];
const CLAY = ['#3A6EC4', '#4CA848', '#F0BE32', '#E26E82', '#3A6EC4', '#4CA848', '#F0BE32', '#E26E82'];
const CLAY_BACK = ['#2C559A', '#3A8537', '#C99A22', '#B75568', '#2C559A', '#3A8537', '#C99A22', '#B75568'];

/** Each topic's skin: arm segments by (arm, segment), the mantle, its accent stripe, and the pattern on it. */
interface Skin {
  seg: (i: number, k: number, front: boolean) => string;
  mantle: string;
  stripe: string;
  pattern: (id: string) => ReactNode;
}

const SKINS: Record<TopicId, Skin> = {
  dots: {
    seg: (i, k, front) => (k === 3 ? DOT[i % 5] : front ? C.navy : C.wing),
    mantle: C.navy,
    stripe: C.wing,
    // the five Dots as diamond spots, the shape of the Dots' own eyes; they shimmer in turn
    pattern: () =>
      [
        [214, 52, 0],
        [262, 46, 1],
        [236, 84, 2],
        [282, 82, 3],
        [198, 96, 4],
      ].map(([x, y, k]) => (
        <Box key={k} className="tc-camo-spot" x={x} y={y} w={18} h={18} c={9} fill={DOT[k]} style={{ '--k': k } as CSSProperties} />
      )),
  },
  muse: {
    seg: (_i, k, front) => (k === 3 ? '#EEE2C8' : front ? '#0064E0' : '#0050B8'),
    mantle: '#0064E0',
    stripe: '#0082FB',
    pattern: () =>
      [
        [212, 48],
        [250, 40],
        [278, 62],
        [228, 80],
        [266, 92],
        [200, 104],
        [288, 106],
      ].map(([x, y], k) => <Box key={k} className="tc-camo-spot" x={x} y={y} w={9} h={9} c={4} fill="#EEE2C8" opacity={0.85} style={{ '--k': k } as CSSProperties} />),
  },
  clay: {
    seg: (i, k, front) => (k === 3 ? C.ivory : front ? CLAY[i] : CLAY_BACK[i]),
    mantle: '#D97757',
    stripe: '#E89A80',
    // thumbprints pressed into the clay
    pattern: () => (
      <g fill="none" stroke="#B85F42" strokeWidth={3} strokeLinecap="round" opacity={0.7}>
        <path d="M222 58 q14 -12 28 0" />
        <path d="M218 66 q18 -16 36 0" />
        <path d="M262 94 q12 -10 24 0" />
        <path d="M258 102 q16 -14 32 0" />
      </g>
    ),
  },
};

const LOGOS: Record<TopicId, { files: string[]; name: string }> = {
  dots: { files: ['openai.svg'], name: 'Dots' },
  muse: { files: ['meta.png'], name: 'Muse' },
  clay: { files: ['clay.png', 'claude.png'], name: 'Clay × Claude Code' },
};

/** The luggage tag: string, ivory card, the product's own logo file(s) and name. `blank` leaves it empty (for the toy renders, which get the logo laid on after). */
function Tag({ topic, blank }: { topic: TopicId; blank?: boolean }) {
  const { files, name } = LOGOS[topic];
  const wide = files.length > 1;
  const w = wide ? 104 : 72;
  return (
    <g transform="scale(1.3)">
      <line x1={0} y1={-4} x2={0} y2={20} stroke={C.ivory} strokeWidth={1.6} opacity={0.8} />
      <Box x={-w / 2} y={18} w={w} h={wide ? 76 : 88} c={[12, 12, 3, 3]} fill={C.ivory} />
      <circle cx={0} cy={28} r={3.5} fill={W.woodEdge} />
      {!blank && (
        <>
          {files.map((f, n) => (
            <image key={f} href={`/images/tools/logos/${f}`} x={wide ? -44 + n * 48 : -22} y={38} width={wide ? 40 : 44} height={wide ? 40 : 44} />
          ))}
          <text x={0} y={wide ? 90 : 98} textAnchor="middle" fontFamily="Helvetica Neue, Arial, sans-serif" fontWeight={700} fontSize={wide ? 10.5 : 14} fill={C.navy}>
            {name}
          </text>
        </>
      )}
    </g>
  );
}

/** One arm, pointing down from its base and rotated into place; segments nest so curls compound (as in octopus-figure.tsx). */
function Arm({ i, x, y, angle, front, skin, tip }: { i: number; x: number; y: number; angle: number; front: boolean; skin: Skin; tip?: ReactNode }) {
  const amp = 7 + Math.abs(3.5 - i) * 2.2;
  let top = 0;
  const offsets = SEGS.map((s) => {
    const t = top;
    top += s.l + GAP;
    return t;
  });
  // the tag hangs straight down whatever the arm's angle
  let inner: ReactNode = tip ? <g transform={`translate(0 ${offsets[3] + SEGS[3].l}) rotate(${-angle})`}>{tip}</g> : null;
  for (let k = SEGS.length - 1; k >= 0; k--) {
    const s = SEGS[k];
    inner = (
      // the tag's arm holds still (curls compound down an arm, and would swing the tag sideways)
      <g className={tip ? undefined : 'bs-oct-seg'} style={{ ...pivot(0, offsets[k]), '--a': i, '--k': k, '--amp': `${amp}deg` } as CSSProperties}>
        <Box x={-s.w / 2} y={offsets[k]} w={s.w} h={s.l} c={[0, 0, s.w * 0.36, s.w * 0.36]} fill={skin.seg(i, k, front)} />
        {inner}
      </g>
    );
  }
  return <g transform={`translate(${x} ${y}) rotate(${angle})`}>{inner}</g>;
}

/** Mason in the topic's camouflage, in his own 480 × 360 box. */
export function CamoMason({ topic, id, tag = 'logo' }: { topic: TopicId; id: string; tag?: 'logo' | 'blank' }) {
  const skin = SKINS[topic];
  const clip = `tc-camo-${id}`;
  const arm = (a: (typeof ARMS)[number]) => <Arm key={a.i} {...a} skin={skin} tip={a.i === TAG_ARM ? <Tag topic={topic} blank={tag === 'blank'} /> : undefined} />;
  return (
    <g className="bs-oct">
      <defs>
        <clipPath id={clip}>
          <Box x={176} y={28} w={128} h={152} c={[54, 54, 20, 20]} />
        </clipPath>
      </defs>
      <g className="bs-oct-body">
        {ARMS.filter((a) => !a.front).map(arm)}
        <Box x={176} y={28} w={128} h={152} c={[54, 54, 20, 20]} fill={skin.mantle} />
        <Box x={194} y={54} w={16} h={48} c={8} fill={skin.stripe} />
        <g clipPath={`url(#${clip})`}>{skin.pattern(clip)}</g>
        <Box x={168} y={184} w={144} h={24} c={[0, 0, 12, 12]} fill={skin.mantle} />
        {ARMS.filter((a) => a.front).map(arm)}
        <g className="bs-oct-eyes" style={pivot(240, 132)}>
          <Box x={206} y={116} w={28} h={32} c={9} fill={C.ivory} />
          <Box x={246} y={116} w={28} h={32} c={9} fill={C.ivory} />
          <Box x={216} y={124} w={12} h={16} c={4} fill={C.ink} />
          <Box x={256} y={124} w={12} h={16} c={4} fill={C.ink} />
        </g>
      </g>
    </g>
  );
}

export const CAMO_ALT: Record<TopicId, string> = {
  dots: 'Mason the octopus on a desk at night, his skin changed to the Dots’ look: five coloured diamond spots on his navy mantle and arm tips in the five Dots’ colours, a tag with OpenAI’s logo and “Dots” hanging from one arm',
  muse: 'Mason the octopus on a desk at night, his skin changed to Meta’s blue speckled with Jolly’s cream, a tag with Meta’s logo and “Muse” hanging from one arm',
  clay: 'Mason the octopus on a desk at night, made over in modelling clay, each arm a different clay colour and his mantle Claude orange with thumbprints, a tag with the Clay and Claude logos hanging from one arm',
};

/** M · Drawn: the course covers' night room, Mason on the desk facing us, in camouflage. */
export function CamoDrawnCover({ topic, still }: { topic: TopicId; still?: boolean }) {
  const id = `${topic}${still ? '-s' : ''}`;
  return (
    <svg className={`tc-art${still ? ' tc-still' : ''}`} viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" role="img" aria-label={CAMO_ALT[topic]}>
      <defs>
        <radialGradient id={`tc-camo-glow-${id}`}>
          <stop offset="0" stopColor={C.teal} stopOpacity="0.28" />
          <stop offset="1" stopColor={C.teal} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={1280} height={720} fill={W.wall} />
      <rect y={620} width={1280} height={100} fill={W.floor} />
      <Shelf x={110} y={96} w={220} rows={4} />
      <Lamp x={1120} y={520} floor={540} flip id={`tc-camo-lamp-${id}`} />
      <DeskTop x0={430} x1={1180} far={440} near={510} spread={30} legs={180} />
      {/* a soft light behind him, so a navy skin still reads on the navy room */}
      <ellipse cx={780} cy={380} rx={300} ry={230} fill={`url(#tc-camo-glow-${id})`} />
      <g transform="translate(480 202) scale(1.25)">
        <CamoMason topic={topic} id={id} />
      </g>
    </svg>
  );
}

/** N · Toy and O · Felt: the api.esy.com renders, as images (scripts/newsletter-topic-covers.py camo-toy camo-felt). */
export function CamoPhotoCover({ kind, topic }: { kind: 'camo-toy' | 'camo-felt'; topic: TopicId }) {
  const made = kind === 'camo-toy' ? ' A photo: Mason as a vinyl toy on the live covers’ desk.' : ' A photo: Mason as a felt toy on the live covers’ desk.';
  return (
    <svg className="tc-art" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" role="img" aria-label={CAMO_ALT[topic] + '.' + made}>
      <image href={`/prototypes/newsletter-topic-cover/${kind}-${topic}.webp`} width={1280} height={720} preserveAspectRatio="xMidYMid slice" />
    </svg>
  );
}
