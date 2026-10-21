/* The brand kit's content (2026-10-11), one module for both prototypes:
   /prototypes/brand/ (what becomes esy.com/brand) and /prototypes/brand-mason/
   (esy.com/brand/mason). Everything here restates the canon in
   org-docs/brand/ESY_DEFINITION.md and org-docs/brand/VISUAL_LANGUAGE.md; the
   pictures are the ones made for the vinyl direction, listed with their runs. */

// The kit's own pictures, kept under /brand/kit so the live page never loads from /prototypes.
const K = '/brand/kit';

/** The name, as the definition gives it, and the toy theme the pictures rest on. */
export const NAME = {
  word: 'Esy',
  say: 'Eh-see',
  root: 'From essay, and the French essai: an attempt, a trial, a way of thinking something through.',
  play: 'The systems are serious; the world we show them in is a toy world, where complex machines look as simple to pick up as a playset.',
  line: 'Esy builds the AI systems that run marketing, and keeps how every piece of work was made.',
};

export const LOGO = {
  flat: { light: '/brand/logo/esy-wordmark.svg', dark: '/brand/logo/esy-wordmark-white.svg' },
  // Sunburst renders from the exact flat wordmark (runs 31fb1045, bce07196). Close, not exact: the y's tail came out short,
  // so the SVG stays the master and these are pictures of the logo, never the logo itself.
  vinyl: { light: `${K}/logo-vinyl-light.webp`, dark: `${K}/logo-vinyl-dark.webp` },
  rules: [
    'The wordmark is set in Black Ops One: a teal e, then sy in navy (or white on navy). Nothing else is set in Black Ops One.',
    'Use the SVG files. Don’t retype, redraw, stretch, outline or recolour it.',
    'Give it room: at least the height of the e on every side.',
    'On busy pictures, put it on a calm patch of navy or ivory, never over the art.',
    'The vinyl wordmark renders are pictures of the logo, for scenes and covers; the SVG is the logo.',
    // Zev's call, 2026-10-21: the e is the company's symbol, Mason the mascot.
    'The e is Esy’s symbol: icons, app tiles, profile pictures, and anywhere a square mark goes. Mason is the mascot, not the symbol.',
    'The vinyl e on navy wherever the mark shows at 32px or more. Below that, and for print or one colour, the flat e: its SVG is the master.',
    'The full wordmark stays in headers and footers, and wherever the name has to be read.',
  ],
};

export interface Swatch { name: string; hex: string; job: string; dark?: boolean }
export const COLOURS: Swatch[] = [
  { name: 'Navy', hex: '#0A2540', job: 'The ground: pages, scenes, the sy of the wordmark.', dark: true },
  { name: 'Ink', hex: '#061527', job: 'The deepest night, under navy.', dark: true },
  { name: 'Teal', hex: '#00A896', job: 'The e, links, Mason’s stripe.', dark: true },
  { name: 'Jade', hex: '#00D4AA', job: 'Light: finished work, the one word that matters.' },
  { name: 'Mint', hex: '#2BD8BB', job: 'Glow and highlights in lit vinyl.' },
  { name: 'Ivory', hex: '#F4F1EA', job: 'Paper, Mason’s eyes, light grounds.' },
];

export const TYPE = [
  { name: 'Black Ops One', use: 'The wordmark only.', sample: 'esy', family: "var(--font-black-ops-one), 'Black Ops One', system-ui" },
  { name: 'Cormorant Garamond', use: 'Names and headlines: The Marketing Engineer, page titles.', sample: 'The Marketing Engineer', family: "var(--nl-serif, 'Cormorant Garamond'), Georgia, serif" },
  { name: 'System sans', use: 'Everything you read: body, labels, buttons (SF, Segoe, Roboto, Helvetica Neue).', sample: 'Build the AI systems that run marketing.', family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" },
];

/** The material: vinyl, in three forms (VISUAL_LANGUAGE.md). */
export const MATERIAL = [
  { name: 'Matte-satin vinyl', what: 'A moulded designer-toy figure: soft sheen, crisp edges slightly softened.', use: 'Mason and the playset world around him.', img: `${K}/toy-footer-livereef.webp` },
  { name: 'Glossy vinyl', what: 'The same moulded material polished to a shine, with clear studio reflections.', use: 'Abstract art: networks, systems, pieces.', img: `${K}/glossy-network.webp` },
  { name: 'Lit vinyl', what: 'Translucent parts that glow teal and jade from inside, like lit acrylic.', use: 'Light, flow and connection.', img: `${K}/lit-line.webp` },
];

export const VOICE = [
  'Calm and precise. Plain words, short sentences, no hype.',
  'Workflows, not prompts. Artifacts, not chats.',
  'Humans think. AI assists. People approve what ships.',
  'Show how it was made: real numbers, real runs, sources.',
];

/** Pictures of the world, for the gallery sections. */
// Only the brand's own pictures: no product logos, no surfaces still under decision (thumbnails, profile banners).
export const SCENES = [
  { img: `${K}/toy-footer-livereef.webp`, name: 'The reef', note: 'Mason’s home: the reef and the octagon gate.' },
  { img: `${K}/toy-footer-gate.webp`, name: 'The Gate', note: 'Humans think. AI assists.' },
  { img: `${K}/toy-footer-assembly.webp`, name: 'The Assembly', note: 'Workflows, not prompts.' },
  { img: `${K}/toy-footer-essai.webp`, name: 'The Essai', note: 'Every attempt kept, rough to finished.' },
  { img: `${K}/glossy-network.webp`, name: 'Networks', note: 'Abstract art: glossy vinyl joined by light.' },
  { img: `${K}/lit-line.webp`, name: 'The line', note: 'Rough in, finished out, through lit vinyl.' },
];

/* ── Mason ── */
export const MASON = {
  name: 'Mason',
  who: 'Esy’s octopus. One mind, and eight arms that each work on their own: that is how Esy runs many jobs at once and keeps them in one place.',
  home: 'He lives in a reef, where he quarries slabs and builds an octagon gate, the site footer on every page.',
  studio: `${K}/mason-studio.webp`,
  turnaround: `${K}/mason-turnaround.webp`,
  reference: 'run-80a49586',
  spec: [
    { part: 'Head', is: 'A tall octagon with 45° cut corners, navy, a small teal stripe on its left side.' },
    { part: 'Eyes', is: 'Two upright rectangular ivory eyes with small dark pupils. No mouth: calm, never grinning.' },
    { part: 'Collar', is: 'A navy ring under the head.' },
    { part: 'Arms', is: 'Eight, of short blocky segments in navy and deep teal, every tip bright teal. At rest, seven fan forward and the eighth curls up behind him like a tail.' },
    { part: 'Material', is: 'Matte-satin designer vinyl, about the height of a coffee mug.' },
  ],
  rules: {
    do: [
      'Show him working: typing, building, checking, carrying the work.',
      'Start every new picture from his studio shot, so he stays himself.',
      'Make the whole scene vinyl: a playset world in navy and teal.',
      'Keep what he builds abstract: shapes, pieces, nodes, light.',
      'From behind when he types: his arms on the keys, his face away.',
    ],
    dont: [
      'Draw him from words alone (he drifts: a cube head, wrong eyes).',
      'Give him a mouth, a grin or clothes.',
      'Drop him into a real photograph.',
      'Label what he builds with products or verticals.',
      'Park another symbol right beside him.',
    ],
  },
  /** Clip art: real runs of clip.art's reference-anchored workflow, transparent. */
  poses: [
    { img: `${K}/clipart-wave.webp`, name: 'Waving', run: 'run-b4fbbb23' },
    { img: `${K}/clipart-tile.webp`, name: 'A finished tile', run: 'run-d385cc94' },
    { img: `${K}/clipart-blocks.webp`, name: 'Juggling blocks', run: 'run-a2633a9d' },
    { img: `${K}/clipart-check.webp`, name: 'A check', run: 'run-82be23c1' },
  ],
  /** His camouflage editions: the colours change, the shape never does. */
  editions: [
    { img: `${K}/use-toy-camo-dots.webp`, name: 'Dots', note: 'Five diamond spots in the Dots’ colours.' },
    { img: `${K}/use-toy-camo-muse.webp`, name: 'Muse', note: 'Meta’s blue, speckled with Jolly’s cream.' },
    { img: `${K}/use-toy-camo-clay.webp`, name: 'Clay + Claude Code', note: 'Clay-coloured arms, a Claude-orange head.' },
  ],
  small: 'Under about 100px, or anywhere he must move in code (icons, avatars, the loader, a 404), use his flat stencil drawing: the same figure, drawn.',
};
