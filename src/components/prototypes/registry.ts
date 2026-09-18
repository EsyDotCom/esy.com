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
  image: string; // card screenshot under /public
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
        title: 'Your AI team’s work and spend, on one page.',
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
        title: 'Your AI team’s work and spend, on one page.',
        blurb: 'B’s centred headline and button, with C’s questions and the window side by side underneath.',
        image: '/prototypes/hero/stage-tour.webp',
        live: true,
        liveHref: '/',
      },
    ],
  },
];

export const findPrototype = (slug: string) => PROTOTYPES.find((p) => p.slug === slug);
