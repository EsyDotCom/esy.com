/* Sample output for the "drop your URL" hero.
 *
 * The prototype's whole promise is that typing a domain gets you something
 * back in three seconds, so the set has to be *about* the domain you typed —
 * a fixed demo reel reads as a video, not a product. Everything here is
 * derived deterministically from the domain string: same URL in, same set
 * out, no network, no model. Nothing here is real customer work, and every
 * surface that shows it says so.
 */

export type Channel = 'instagram' | 'facebook' | 'linkedin';

export interface Creative {
  id: string;
  channel: Channel;
  /** The caption above the picture, as it would sit in the feed. */
  caption: string;
  /** Big type inside the picture. */
  art: string;
  /** Smaller line under the big type. */
  sub: string;
  /** Call-to-action chip on the picture, when the piece has one. */
  cta?: string;
  /** Two colours for the picture's wash, picked from the brand's palette slot. */
  wash: [string, string];
  /** The generated picture for this beat, under /public. */
  image: string;
  /** What this piece cost Esy to make, in dollars. Sample figures. */
  cost: number;
  /** Needs a human before it goes out. */
  review?: boolean;
}

/** Palette slots for the sample pictures — our jades, inks and warm sands. */
const WASHES: [string, string][] = [
  ['#0a2540', '#12507a'],
  ['#00a896', '#0a5c63'],
  ['#e8b04b', '#b4651a'],
  ['#2d3f66', '#7a4fa0'],
  ['#0f766e', '#134e4a'],
  ['#b45309', '#7c2d12'],
];

/** One vertical's worth of copy, so the set reads like it read the site. */
interface Vertical {
  key: string;
  label: string;
  beats: { caption: string; art: string; sub: string; cta?: string }[];
}

const VERTICALS: Vertical[] = [
  {
    key: 'shop',
    label: 'online shops',
    beats: [
      { caption: 'New drop, and the sizes that always go first are back.', art: 'BACK IN STOCK', sub: 'The three that sold out in March', cta: 'Shop the restock' },
      { caption: 'The question we get most, answered in one picture.', art: 'WHICH ONE\nFITS?', sub: 'A two-minute size guide' },
      { caption: 'Free shipping over $60 — through Sunday.', art: 'SHIP FREE\nOVER $60', sub: 'Ends Sunday at midnight', cta: 'Start a cart' },
      { caption: 'Behind the bench where every order gets packed.', art: 'PACKED BY\nHAND', sub: 'Every order, since 2019' },
    ],
  },
  {
    key: 'saas',
    label: 'software teams',
    beats: [
      { caption: 'Shipped this week: the thing three of you asked for.', art: 'NOW IN\nBETA', sub: 'Scheduled exports, every morning', cta: 'Turn it on' },
      { caption: 'A customer cut a four-hour job down to twenty minutes.', art: '4 HRS →\n20 MIN', sub: 'How one team rebuilt their close' },
      { caption: 'The short version of how it works.', art: 'ONE SCREEN,\nEVERY RUN', sub: 'Ninety seconds, no signup' },
      { caption: 'Hiring: two engineers who like small teams.', art: "WE'RE\nHIRING", sub: 'Two roles, remote-friendly', cta: 'See the roles' },
    ],
  },
  {
    key: 'local',
    label: 'local businesses',
    beats: [
      { caption: 'Tuesday just found its reason.', art: 'HAPPY HOUR\nEVERY TUESDAY', sub: 'From 4pm, on the terrace', cta: 'Book a table' },
      { caption: 'The weather says yes to sitting outside this week.', art: '72°F BY\nTHE WATER', sub: 'All week, no reservation needed' },
      { caption: 'Cold outside, warm where it matters.', art: 'SAUNA\nSEASON', sub: 'End-of-season prices', cta: 'Book your stay' },
      { caption: 'Meet the person who opens at five in the morning.', art: 'THE 5AM\nSHIFT', sub: 'Twelve years of the same alarm' },
    ],
  },
  {
    key: 'studio',
    label: 'studios and agencies',
    beats: [
      { caption: 'A small before-and-after from last week.', art: 'BEFORE /\nAFTER', sub: 'Same room, six decisions' },
      { caption: 'What a first week with us actually looks like.', art: 'WEEK ONE', sub: 'Five meetings, one plan', cta: 'See the plan' },
      { caption: 'Our favourite detail on the latest build.', art: 'THE\nDETAIL', sub: 'The part nobody photographs' },
      { caption: 'Two slots open for spring projects.', art: '2 SLOTS,\nSPRING', sub: 'Enquiries close Friday', cta: 'Enquire' },
    ],
  },
];

const CHANNELS: Channel[] = ['instagram', 'facebook', 'linkedin'];

/** Small stable string hash, so a domain always lands on the same set. */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/** "https://www.kilen-camping.no/priser" -> "kilen-camping.no" */
export function cleanDomain(input: string) {
  const trimmed = input.trim().toLowerCase().replace(/^[a-z]+:\/\//, '').replace(/^www\./, '');
  return trimmed.split(/[/?#]/)[0] || '';
}

/** "kilen-camping.no" -> "Kilen Camping" */
export function brandName(domain: string) {
  const label = cleanDomain(domain).split('.')[0] || 'Your brand';
  return label
    .split(/[-_.]/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
}

export interface SampleSet {
  domain: string;
  brand: string;
  /** Which kind of business the sample copy is written for. */
  vertical: string;
  creatives: Creative[];
  /** Pieces in the full month, of which `creatives` is the visible slice. */
  total: number;
  /** What the whole set cost to make. Sample figure. */
  cost: number;
  /** How many pieces are held back for a human. */
  needsReview: number;
}

/**
 * Build a month of sample marketing for a domain. `count` is how many cards we
 * actually render; `total` is the size of the set we claim, so the visible
 * cards stay a readable slice of a realistic month.
 */
export function sampleSetFor(input: string, count = 12, total = 50): SampleSet {
  const domain = cleanDomain(input) || 'yourcompany.com';
  const seed = hash(domain);
  const vertical = VERTICALS[seed % VERTICALS.length];
  const brand = brandName(domain);

  const creatives: Creative[] = Array.from({ length: count }, (_, i) => {
    const beatIndex = (seed + i) % vertical.beats.length;
    const beat = vertical.beats[beatIndex];
    const n = seed + i * 7;
    return {
      id: `${domain}-${i}`,
      channel: CHANNELS[n % CHANNELS.length],
      caption: beat.caption,
      art: beat.art,
      sub: beat.sub,
      cta: beat.cta,
      wash: WASHES[n % WASHES.length],
      // Generated through api.esy.com (generate-illustration) by
      // scripts/generate-drop-url-creatives.mjs, one picture per beat.
      image: `/prototypes/drop-url/creatives/${vertical.key}-${beatIndex}.webp`,
      // Per-piece cost, anchored to what these renders actually cost us:
      // the 16 pictures on this page averaged $0.044 a piece through
      // api.esy.com (image model + classifier + text gate + storage), so the
      // sample prices vary around that rather than around a made-up number.
      cost: Number((0.038 + ((n % 9) * 0.0016)).toFixed(3)),
      // Roughly one in six wants a human — claims, prices, anything legal.
      review: n % 6 === 0,
    };
  });

  // The claimed month costs what the visible slice costs, scaled to its size,
  // so the headline figure and the per-card figures never disagree.
  const visible = creatives.reduce((sum, c) => sum + c.cost, 0);
  const cost = Number(((visible / count) * total).toFixed(2));

  return {
    domain,
    brand,
    vertical: vertical.label,
    creatives,
    total,
    cost,
    needsReview: Math.max(1, Math.round(total / 6)),
  };
}
