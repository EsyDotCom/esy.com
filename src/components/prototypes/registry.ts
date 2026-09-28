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
  imageFit?: 'cover' | 'contain'; // 'contain' for images that aren't 16:10, e.g. 1200×630 share cards
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
        // Was the homepage 2026-09-18 → 09-25, until the education hero (A · Front Page) replaced it.
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
  {
    slug: 'education',
    name: 'The Marketing Engineering hero',
    date: '2026-09-25',
    headline: 'esy.com, rebuilt as a place to learn Marketing Engineering.',
    intro:
      'Three versions of a homepage that sells an education instead of software: how to build the AI systems that run marketing, one email a week. Open each one, click through the desks, and read a sample issue.',
    summary:
      'Three homepage heroes that put the weekly email first. Each one maps the teaching to four desks (Build, Grow, Operate, Learn), links the articles already published, and marks what’s coming.',
    rounds: [
      {
        n: 1,
        title: 'Three ways to sell the email',
        summary:
          'Same promise and the same signup in all three. A sells a publication with a beat, B sells a curriculum, C shows the email itself.',
      },
      {
        n: 2,
        title: 'Put a face on it',
        summary:
          'A newsletter is a person writing to you, so round 2 shows the person. D sets the portrait beside the signup, E puts the promise over a generated scene with a face byline, F makes Zev’s headshot the cover of a dark, first-person page. F shipped.',
      },
      {
        n: 3,
        title: 'F on a phone',
        summary:
          'F’s big portrait pushes the signup below the first screen on a phone. Same desktop in all three; on phones G shrinks the face to an avatar, H makes it a profile row, and I moves the portrait under the form. Compare them side by side at /prototypes/education/phones/. H shipped.',
      },
    ],
    variants: [
      {
        slug: 'front-page',
        key: 'A',
        name: 'Front Page',
        round: 1,
        title: 'Learn to build the AI systems that run marketing.',
        blurb:
          'A centred masthead and signup over a newspaper-style index of the four desks, each with its latest pieces.',
        poster: ['#ffffff', '#cfe3df'],
        // Was the homepage 2026-09-25 → 09-27, until F · Studio replaced it.
      },
      {
        slug: 'syllabus',
        key: 'B',
        name: 'Syllabus',
        round: 1,
        title: 'Marketing Engineering for the AI era.',
        blurb:
          'Copy, signup, and the teacher on the left; a curriculum card on the right that plays through the four desks, taught and coming up.',
        poster: ['#f8f9fa', '#00a896'],
      },
      {
        slug: 'issue',
        key: 'C',
        name: 'The Issue',
        round: 1,
        title: 'One email a week on how AI actually runs marketing.',
        blurb:
          'The product is the email, so the hero shows one: three sample issues as they land in an inbox, beside the signup.',
        poster: ['#0a2540', '#00d4aa'],
      },
      {
        slug: 'face-split',
        key: 'D',
        name: 'Face Split',
        round: 2,
        title: 'Learn to build the AI systems that run marketing.',
        blurb:
          'Copy and signup on the left; Zev’s portrait on the right in a jade ring, with cards for who he is and the latest issue.',
        poster: ['#ffffff', '#00a896'],
      },
      {
        slug: 'scene',
        key: 'E',
        name: 'Scene',
        round: 2,
        title: 'Learn to build the AI systems that run marketing.',
        blurb:
          'White type over a background generated through api.esy.com, with a small face byline under the signup: written by Zev.',
        poster: ['#061527', '#12564f'],
      },
      {
        slug: 'studio',
        key: 'F',
        name: 'Studio',
        round: 2,
        title: 'I build the AI systems that run marketing, and show you how.',
        blurb:
          'A magazine cover in the first person: navy, Zev’s headshot large in a jade ring beside “Hi, I’m Zev”, with clip.art and SEOPage as proof.',
        poster: ['#0a1626', '#0a2540'],
        // The live desktop; on phones the homepage uses H's profile row.
      },
      {
        slug: 'studio-avatar',
        key: 'G',
        name: 'Studio · Avatar',
        round: 3,
        title: 'I build the AI systems that run marketing, and show you how.',
        blurb: 'F on desktop. On a phone, a 64px photo sits beside “Hi, I’m Zev.” and the signup comes up on the first screen.',
        poster: ['#0a1626', '#00a896'],
      },
      {
        slug: 'studio-profile',
        key: 'H',
        name: 'Studio · Profile',
        round: 3,
        title: 'I build the AI systems that run marketing, and show you how.',
        blurb: 'F on desktop. On a phone, a profile row: a 112px photo with name and role, then the headline and signup.',
        poster: ['#0a1626', '#00d4aa'],
        live: true,
        liveHref: '/',
      },
      {
        slug: 'studio-after',
        key: 'I',
        name: 'Studio · Photo after',
        round: 3,
        title: 'I build the AI systems that run marketing, and show you how.',
        blurb: 'F on desktop. On a phone, the copy and signup come first and the big portrait sits under the form.',
        poster: ['#0a2540', '#0a1626'],
      },
    ],
  },
  {
    slug: 'og',
    name: 'The homepage share card',
    date: '2026-09-27',
    headline: 'Three share cards that sell the newsletter.',
    intro:
      'When someone shares esy.com, this picture is what their feed shows. Each version sells the free weekly email and what you get from it. Open one to see it full size, in a feed, and at the size a chat app shows it.',
    summary:
      'Three 1200×630 share cards for the Marketing Engineering homepage, each built by the same code that will draw the live card. The images here are those real cards.',
    rounds: [
      {
        n: 1,
        title: 'Three ways to sell the email',
        summary:
          'A carries the homepage hero onto the card, B lists what every issue gives you, and C leads with the person who writes it.',
      },
    ],
    // Each card image is the real generated PNG (src/lib/og/newsletterCards.tsx).
    variants: [
      {
        slug: 'masthead',
        key: 'A',
        name: 'Masthead',
        round: 1,
        title: 'Learn to build the AI systems that run marketing.',
        blurb:
          'The hero as a card: light paper, the same serif promise, "Free weekly email", and the four desks under a heavy rule with "Subscribe free".',
        image: '/prototypes/og/masthead/card/',
        imageFit: 'contain',
      },
      {
        slug: 'offer',
        key: 'B',
        name: 'The Offer',
        round: 1,
        title: 'One email a week on building the AI systems that run marketing.',
        blurb:
          'Navy, with the promise and a Subscribe button on the left, and a card on the right of what every issue gives you.',
        image: '/prototypes/og/offer/card/',
        imageFit: 'contain',
        live: true,
        liveHref: '/',
      },
      {
        slug: 'author',
        key: 'C',
        name: 'The Author',
        round: 1,
        title: 'I build AI marketing systems in production, and show you how.',
        blurb:
          'People first: Zev’s portrait, a promise in his own voice, the title of the newest real article, and the ask.',
        image: '/prototypes/og/author/card/',
        imageFit: 'contain',
      },
    ],
  },
  {
    slug: 'article',
    name: 'The image-led article page',
    date: '2026-09-27',
    headline: 'Three article pages for posts with a picture instead of a video.',
    intro:
      'Every article on esy.com opens with a video today. These three open with an image: a real published article, with a lead illustration generated through Esy. Open each one and read it the way a subscriber would.',
    summary:
      'Three layouts for articles without a video, each rendering a real published article (Building Multi-Agent Workflows with Claude Code) with a lead image generated through api.esy.com.',
    rounds: [
      {
        n: 1,
        title: 'Three ways to lead with an image',
        summary:
          'A reads like a magazine with the signup mid-article, B makes the image the cover with the title on it, C is a guide with a sticky table of contents and a reading-progress bar.',
      },
      {
        n: 2,
        title: 'One merge',
        summary: 'D keeps B’s cover and puts C’s contents rail, with the email signup on top, beside the article under it.',
      },
      {
        n: 3,
        title: 'Where the email goes',
        summary: 'Same page, two places for the first ask: D keeps it at the top of the rail, E puts the video articles’ email bar right under the cover. E shipped as the default for articles without a video.',
      },
    ],
    variants: [
      {
        slug: 'editorial',
        key: 'A',
        name: 'Editorial',
        round: 1,
        title: 'A magazine read.',
        blurb: 'Title, summary and byline in a reading column, a wide captioned image, and the signup card after the second section.',
        image: '/prototypes/article/workshop.webp',
      },
      {
        slug: 'cover',
        key: 'B',
        name: 'Cover',
        round: 1,
        title: 'The picture is the cover.',
        blurb: 'The image fills the first screen with the title and byline on it in white; a centred body, then a navy “get the next one” band.',
        image: '/prototypes/article/lanes.webp',
      },
      {
        slug: 'guide',
        key: 'C',
        name: 'Guide',
        round: 1,
        title: 'Built for tutorials people skim.',
        blurb: 'Title and signup beside the image, then a sticky table of contents that follows your place, and a reading-progress bar.',
        image: '/prototypes/article/workshop.webp',
      },
      {
        slug: 'cover-guide',
        key: 'D',
        name: 'Cover Guide',
        round: 2,
        mergeOf: ['B', 'C'],
        title: 'The cover, then a guide.',
        blurb: 'B’s full-screen cover with the title on the image; under it, a sticky left rail with the email signup and the contents, the article on the right, and B’s navy signup band at the end.',
        image: '/prototypes/article/lanes.webp',
      },
      {
        slug: 'cover-bar',
        key: 'E',
        name: 'Cover Bar',
        round: 3,
        title: 'The cover, the email bar, then a guide.',
        blurb: 'D with the email ask moved: the same full-width bar that sits under the video on video articles, right under the cover; the rail keeps only the contents.',
        image: '/prototypes/article/lanes.webp',
        // The default for every article without a video (src/app/engineer/[slug]).
        live: true,
      },
    ],
  },
];

export const findPrototype = (slug: string) => PROTOTYPES.find((p) => p.slug === slug);