/* Mason as an icon (2026-10-13): three head-only marks, plus today's e for
   comparison. Every mark is an SVG string in a 512 box, so the page can show
   it exactly as a browser would: as an <img> at 16/32/48, as an apple-touch
   tile, and as this tab's own favicon.

   Takes:
   A · The head      Mason's octagon head as the toy is: navy, the teal gem
                      stripe, two ivory eyes. Drawn on a 16 × 16 pixel grid
                      (32 units a pixel) so every edge lands on a pixel at
                      16 and 32: eyes 3 × 4 px, pupils 1 × 2 px.
   B · Head + E       Today's e, untouched, with Mason's eyes set either side
                      of its centre gap, so the gap reads as the bridge
                      between his eyes. Still the e; now it looks back.
   C · Teal tile      The inverse: the head's octagon as a solid teal tile
                      with only his marks on it (navy stripe, eyes). Reads on
                      light and dark tab bars without a rim.

   Head geometry follows the vinyl studio shot (run-80a49586), the canon since
   2026-10-11 (org-docs/brand/VISUAL_LANGUAGE.md). */

export type IconId = 'current' | 'head' | 'head-e' | 'tile';
export type Mode = 'light' | 'dark';

export const PAL = {
  navy: '#0A2540',
  ink: '#061527',
  teal: '#00A896',
  mint: '#2BD8BB',
  ivory: '#F4F1EA',
  pale: '#E3F4F0',
};

/** A rectangle with 45° cuts, per corner [top-left, top-right, bottom-right, bottom-left]. */
function cut(x: number, y: number, w: number, h: number, [tl, tr, br, bl]: number[]) {
  const pts = [
    [x + tl, y], [x + w - tr, y], [x + w, y + tr], [x + w, y + h - br],
    [x + w - br, y + h], [x + bl, y + h], [x, y + h - bl], [x, y + tl],
  ];
  return pts.map(([a, b]) => `${a},${b}`).join(' ');
}

/** The teal gem stripe on his upper left: a tall hexagon, pointed top and bottom. */
function gem(x: number, y: number, w: number, h: number) {
  const d = w * 0.55;
  return [[x + w / 2, y], [x + w, y + d], [x + w, y + h - d], [x + w / 2, y + h], [x, y + h - d], [x, y + d]]
    .map(([a, b]) => `${a},${b}`)
    .join(' ');
}

// The head on the 16-px grid (×32): 12 × 14 px, 3-px cuts on top and 2-px
// cuts below like the toy.
const HEAD = { x: 64, y: 32, w: 384, h: 448, cuts: [96, 96, 64, 64] };

/** Mason's face marks over a head drawn at HEAD: stripe (col 4, rows 3–6), eyes (cols 4–6 and 9–11, rows 8–11), pupils. */
function face(stripe: string, eye: string, pupil: string) {
  return [
    `<polygon points="${gem(128, 96, 32, 128)}" fill="${stripe}"/>`,
    `<rect x="128" y="256" width="96" height="128" rx="10" fill="${eye}"/>`,
    `<rect x="288" y="256" width="96" height="128" rx="10" fill="${eye}"/>`,
    `<rect x="160" y="288" width="32" height="64" fill="${pupil}"/>`,
    `<rect x="320" y="288" width="32" height="64" fill="${pupil}"/>`,
  ].join('');
}

// Today's e: the real Black Ops One glyph, exactly as public/brand/icons/e-navy.svg draws it (the tab icon until 2026-10-18).
const E_PATH = 'M360 0 95 265V797L360 1062H537V0ZM607 426V611H840V797H607V1062H982L1247 797V426ZM607 0V248H1201V133L1069 0Z';
const E_GROUP = (fill: string) =>
  `<g transform="translate(9 28) scale(0.43) translate(-95 1062) scale(1 -1)"><path d="${E_PATH}" fill="${fill}"/></g>`;

/** The marks themselves, filling the 512 box (the tab favicon). */
function mark(id: IconId, mode: Mode): string {
  const dark = mode === 'dark';
  switch (id) {
    case 'current':
      return E_GROUP(dark ? PAL.mint : PAL.teal);
    case 'head':
      // Navy disappears on a dark tab bar, so dark mode gets a 1-px teal rim:
      // the head in mint, with the navy head inset one pixel inside it.
      return (
        (dark ? `<polygon points="${cut(HEAD.x, HEAD.y, HEAD.w, HEAD.h, HEAD.cuts)}" fill="${PAL.mint}"/>` : '') +
        `<polygon points="${dark ? cut(HEAD.x + 32, HEAD.y + 32, HEAD.w - 64, HEAD.h - 64, [83, 83, 51, 51]) : cut(HEAD.x, HEAD.y, HEAD.w, HEAD.h, HEAD.cuts)}" fill="${PAL.navy}"/>` +
        face(PAL.mint, PAL.ivory, PAL.ink)
      );
    case 'head-e':
      // Eyes sit on the solid band under the e's notch (y 222–301): the left
      // eye on the left stroke, the right eye on the right block, either side
      // of the gap (x 199–229). 2 px wide on the 16 grid; both pupils look
      // the same way so he doesn't go cross-eyed at 16 px.
      return (
        E_GROUP(dark ? PAL.mint : PAL.teal) +
        `<rect x="128" y="224" width="64" height="76" rx="8" fill="${PAL.ivory}"/>` +
        `<rect x="256" y="224" width="64" height="76" rx="8" fill="${PAL.ivory}"/>` +
        `<rect x="160" y="246" width="32" height="44" fill="${PAL.ink}"/>` +
        `<rect x="288" y="246" width="32" height="44" fill="${PAL.ink}"/>`
      );
    case 'tile':
      return (
        `<polygon points="${cut(HEAD.x, HEAD.y, HEAD.w, HEAD.h, HEAD.cuts)}" fill="${dark ? PAL.mint : PAL.teal}"/>` +
        face(PAL.navy, PAL.ivory, PAL.navy)
      );
  }
}

// The square app-icon tile behind each mark (iOS rounds the corners itself).
const TILE_BG: Record<IconId, string> = { current: PAL.navy, head: PAL.pale, 'head-e': PAL.navy, tile: PAL.navy };

type IconOpts = { mode?: Mode; tile?: boolean; bg?: string; round?: boolean; scale?: number };

/**
 * One icon as SVG markup: the bare mark for a tab, or a tile for a home
 * screen. A tile is full-bleed square by default (iOS and Android mask it
 * themselves); `round` gives it its own rounded corners for use as a tab
 * favicon, `bg` overrides the tile's ground (round 2: black or navy), and
 * `scale` sizes the mark on the tile (0.78 by default; at 0.6 the head's
 * farthest corner reaches 30% from the centre, inside Android's 33%).
 */
export function iconSvg(id: IconId, { mode = 'light', tile = false, bg, round = false, scale = 0.78125 }: IconOpts = {}): string {
  const ground = round ? `<rect width="512" height="512" rx="96" fill="${bg ?? TILE_BG[id]}"/>` : `<rect width="512" height="512" fill="${bg ?? TILE_BG[id]}"/>`;
  const at = 256 - 256 * scale;
  const body = tile ? `${ground}<g transform="translate(${at} ${at}) scale(${scale})">${mark(id, 'light')}</g>` : mark(id, mode);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">${body}</svg>`;
}

export const iconUri = (id: IconId, opts?: IconOpts) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(iconSvg(id, opts))}`;

/** Round 2 (D): the tile grounds compared. The live apple-touch icon is already navy (#0A2540); black is the darker ground Zev sees beside it. */
export const GROUNDS = [
  { key: 'e-black', mark: 'current' as IconId, bg: '#000000', name: 'Today’s e on black' },
  { key: 'e-navy', mark: 'current' as IconId, bg: PAL.navy, name: 'The e on navy' },
  { key: 'c-navy', mark: 'tile' as IconId, bg: PAL.navy, name: 'C · Mason on navy' },
];

/**
 * Round 2 (E): the vinyl head as a real app icon. Full-bleed 1024 squares.
 * Two renders were asked for with the head at 40% of the frame (icon-teal
 * run-3be4bb9b, icon-navy run-2b0257d8, $0.055 each) and came back near 57%,
 * reaching the edge of Android's safe zone, so each is reframed at 85% on its
 * own background with feathered edges (app-*.webp). `reach` is how far the
 * head reaches from the centre as a share of the width, measured on the file
 * (the farthest head pixel), against the safe zone's 33% (a centred circle
 * 66% across).
 */
export const APP_ICONS = [
  { id: 'app-teal', src: '/images/prototypes/mason-icon/app-teal.webp', name: 'Vinyl on teal', reach: 27.5 },
  { id: 'app-navy', src: '/images/prototypes/mason-icon/app-navy.webp', name: 'Vinyl on navy', reach: 28.3 },
];

/** The vinyl renders of his head (no arms), made from the studio shot via edit-image. */
export const VINYL = [
  { id: 'head-navy', name: 'On navy', line: 'Matte-satin head, straight on, with a teal rim light.' },
  { id: 'head-teal', name: 'On teal', line: 'The same head on the brand teal: the C tile, made real.' },
  { id: 'head-tile', name: 'As a tile', line: 'The head moulded in relief on a glossy navy tile, like a physical app icon.' },
  { id: 'head-turn', name: 'Turned', line: 'Three-quarter view, so the block’s thickness and 45° cuts show.' },
];

export const vinylSrc = (id: string) => `/images/prototypes/mason-icon/${id}.webp`;

/** The takes, by URL slug. Kept here (not in the client page) so the route can check a slug on the server. */
export const ICON_TAKES: Record<string, { id: IconId; key: string; name: string; title: string; blurb: string; kind?: 'grounds' | 'app' }> = {
  head: {
    id: 'head',
    key: 'A',
    name: 'The head',
    title: 'Mason’s head, as he is.',
    blurb: 'The vinyl toy’s octagon head, navy with the teal stripe and ivory eyes, snapped to the 16-pixel grid so the eyes stay eyes. On a dark tab bar it gets a one-pixel teal rim.',
  },
  'head-e': {
    id: 'head-e',
    key: 'B',
    name: 'Head + E',
    title: 'The e, looking back.',
    blurb: 'Today’s e, untouched, with Mason’s eyes set either side of its centre gap, so the gap reads as the bridge between his eyes.',
  },
  tile: {
    id: 'tile',
    key: 'C',
    name: 'Teal tile',
    title: 'His head as a teal tile.',
    blurb: 'The inverse of A: the head’s octagon in solid teal, with only his marks on it. Bright enough for light and dark tab bars without a rim.',
  },
  grounds: {
    id: 'current',
    key: 'D',
    name: 'Black or navy',
    kind: 'grounds',
    title: 'The tab stays the e. Black tile or navy?',
    blurb: 'Zev agreed the browser tab keeps the e. This compares the tile it sits on: today’s e on black, the e on navy, and C’s Mason on navy, at every size and in the tab bar.',
  },
  app: {
    id: 'tile',
    key: 'E',
    name: 'Vinyl app icon',
    kind: 'app',
    title: 'The vinyl head as the app icon.',
    blurb: 'The vinyl head as a full-bleed 1024 icon, inside Android’s safe zone and iOS’s corner mask, at the sizes a phone really shows it, beside flat C. Small sizes fall back to the flat mark.',
  },
};

