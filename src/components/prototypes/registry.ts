// Every prototype on /prototypes, as data. Add a new one here and it shows on
// the index; give it `variants` and each variant gets its own page and a slot
// in the floating switcher. The pattern is written up in
// docs/prototypes/README.md.

export interface PrototypeVariant {
  slug: string;
  key: string; // A, B, C… for talking about them
  name: string;
  title: string; // the variant's headline, shown on its card
  blurb: string;
  live?: boolean; // shipped on the real site
}

export interface Prototype {
  slug: string;
  name: string;
  date: string; // YYYY-MM-DD, when it was built
  summary: string;
  variants: PrototypeVariant[];
}

export const PROTOTYPES: Prototype[] = [
  {
    slug: 'hero',
    name: 'Homepage hero for Esy OS',
    date: '2026-09-18',
    summary:
      'Ways to put Esy OS on the front of esy.com (three directions, then two merges), each built around a working copy of the office’s Books page (os.esy.com/office/books) fed sample numbers.',
    variants: [
      {
        slug: 'split',
        key: 'A',
        name: 'Split',
        title: 'Know what your AI made, and what it cost.',
        blurb: 'Copy on the left, the Books window running off the right edge. The familiar SaaS layout, done calmly.',
      },
      {
        slug: 'stage',
        key: 'B',
        name: 'Stage',
        title: 'Your AI team’s work and spend, on one page.',
        blurb: 'Centred headline over a full-width window. Numbered chips light each part of the page and say what it tells you.',
      },
      {
        slug: 'tour',
        key: 'C',
        name: 'Tour',
        title: 'Every piece, every dollar, every sign-off.',
        blurb: 'Four plain questions on the left. Each one scrolls the window to its answer; it plays itself until you click.',
      },
      {
        slug: 'split-tour',
        key: 'D',
        name: 'Split Tour',
        title: 'Know what your AI made, and what it cost.',
        blurb: 'A + C. A’s headline leads the left column; C’s questions play through beneath it, lighting a window that runs off the right edge.',
      },
      {
        slug: 'stage-tour',
        key: 'E',
        name: 'Stage Tour',
        title: 'Your AI team’s work and spend, on one page.',
        blurb: 'B + C. B’s centred headline and button on top; under them, C’s questions sit beside the window and play through on their own.',
        live: true,
      },
    ],
  },
];

export const findPrototype = (slug: string) => PROTOTYPES.find((p) => p.slug === slug);
