// Every prototype on /prototypes, as data. Add a new one here and it shows on
// the index; give it `variants` and each variant gets its own page and a slot
// in the floating switcher. `rounds` tell the story on the index (first
// directions, then merges, then what shipped). The pattern is written up in
// docs/prototypes/README.md.

export interface PrototypeVariant {
  slug: string;
  key: string; // A, B, C… for talking about them
  name: string;
  title: string; // the variant's headline, shown on its card
  blurb: string; // what's different about it, in one or two plain sentences
  round: number; // which round of the prototype it came from
  mergeOf?: string[]; // keys of the variants it combines, e.g. ['A', 'C']
  image?: string; // card screenshot under /public; without one the index draws a poster
  poster?: [string, string]; // the poster's two colours, when there's no screenshot
  live?: boolean; // shipped on the real site
  liveHref?: string; // where it's live
}

export interface PrototypeRound {
  n: number;
  title: string;
  summary: string;
}

export interface Prototype {
  slug: string;
  name: string;
  date: string; // YYYY-MM-DD, when it was built
  headline: string; // the index opens with the newest prototype's headline
  intro: string; // …and this, which says what to click
  summary: string;
  rounds: PrototypeRound[];
  variants: PrototypeVariant[];
}

// Order matters: the index renders these top to bottom, newest work last, so a
// link to a prototype keeps its place on the page after the next one is built.
export const PROTOTYPES: Prototype[] = [
  {
    slug: 'hero',
    name: 'The Esy OS homepage hero',
    date: '2026-09-18',
    headline: 'We built five versions of our homepage. Try them all.',
    intro:
      'Each one has a working copy of our product inside, so you can use it instead of looking at a mockup. Open any version, hover the chart, switch to dark mode, or let the questions play.',
    summary:
      'Five working versions of the esy.com homepage hero. Each one has a live copy of our product inside, the Books page from os.esy.com, filled with sample numbers.',
    rounds: [
      {
        n: 1,
        title: 'Three directions',
        summary: 'Three different ways to show the product: beside the copy, under it, or driven by questions.',
      },
      {
        n: 2,
        title: 'Two merges',
        summary: 'We kept the parts we liked. D is A’s headline with C’s questions; E is B’s headline with C’s questions. E shipped.',
      },
    ],
    variants: [
      {
        slug: 'split',
        key: 'A',
        name: 'Split',
        round: 1,
        title: 'Know what your AI made, and what it cost.',
        blurb: 'Copy on the left, the product window running off the right edge.',
        image: '/prototypes/hero/split.webp',
      },
      {
        slug: 'stage',
        key: 'B',
        name: 'Stage',
        round: 1,
        title: 'Your AI Marketing team’s work and spend, on one page.',
        blurb: 'A centred headline over a full-width window. Numbered chips point at each part.',
        image: '/prototypes/hero/stage.webp',
      },
      {
        slug: 'tour',
        key: 'C',
        name: 'Tour',
        round: 1,
        title: 'Every piece, every dollar, every sign-off.',
        blurb: 'Four plain questions that play through on their own, each lighting its answer.',
        image: '/prototypes/hero/tour.webp',
      },
      {
        slug: 'split-tour',
        key: 'D',
        name: 'Split Tour',
        round: 2,
        mergeOf: ['A', 'C'],
        title: 'Know what your AI made, and what it cost.',
        blurb: 'A’s headline, with C’s questions playing through beside the window.',
        image: '/prototypes/hero/split-tour.webp',
      },
      {
        slug: 'stage-tour',
        key: 'E',
        name: 'Stage Tour',
        round: 2,
        mergeOf: ['B', 'C'],
        title: 'Your AI Marketing team’s work and spend, on one page.',
        blurb: 'B’s centred headline and button, with C’s questions and the window side by side underneath.',
        image: '/prototypes/hero/stage-tour.webp',
        live: true,
        liveHref: '/',
      },
    ],
  },
  {
    slug: 'drop-url',
    name: 'The drop-your-URL hero',
    date: '2026-09-19',
    headline: 'Type your website. Watch a month of marketing appear.',
    intro:
      'Three versions of a homepage that starts working before you sign up: drop a URL in the field and Esy writes a month of posts for that business, prices every piece, and holds back the ones a human should read first. Try your own address — it all happens in your browser.',
    summary:
      'Three versions of an esy.com hero built around a single input: your website address. Each one generates sample posts from whatever you type and shows what the month cost.',
    rounds: [
      {
        n: 1,
        title: 'Three moods, one input',
        summary:
          'Same promise and the same field in all three. What changes is the weather, where the output sits, and whether the headline sells the work or the receipt.',
      },
    ],
    variants: [
      {
        slug: 'dusk',
        key: 'A',
        name: 'Dusk',
        round: 1,
        title: 'Marketing for online shops / restaurants / software teams.',
        blurb:
          'A night sky with an aurora over the ridge line, a centred serif promise with the audience typing itself, and the sample posts drifting across the bottom.',
        poster: ['#061527', '#0f4a52'],
      },
      {
        slug: 'daybreak',
        key: 'B',
        name: 'Daybreak',
        round: 1,
        title: 'Your next month of marketing, made tonight.',
        blurb:
          'The light one: warm paper and a low sun, copy and field on the left, two columns of posts drifting upward beside them.',
        poster: ['#fbf1e2', '#dcc39c'],
      },
      {
        slug: 'ledger',
        key: 'C',
        name: 'Ledger',
        round: 1,
        title: 'A month of marketing for the price of lunch.',
        blurb:
          'The receipt is the hero: every piece itemised with what it cost, the total counting up, and the flagged ones marked as held for you.',
        poster: ['#06202f', '#12564f'],
      },
    ],
  },
];

export const findPrototype = (slug: string) => PROTOTYPES.find((p) => p.slug === slug);