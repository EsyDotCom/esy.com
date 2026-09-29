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
  {
    slug: 'article-video',
    name: 'The framed video article page',
    date: '2026-09-27',
    headline: 'Three ways to frame the video on an article page.',
    intro:
      'Video articles open on a black strip across the page today. These three set the video in a frame with room around it: a real article, its real video and transcript. Press play, click a line of the transcript, and scroll.',
    summary:
      'Three openings for video articles, each framing the real Mux player (Claude Fable 5 first impressions) differently, above the image-led article’s reading layout.',
    rounds: [
      {
        n: 1,
        title: 'Three frames',
        summary: 'A sets the video in a navy panel on a light page, B centres it in a dark room with a jade ring, C hangs it in a light mat beside the title. B shipped as the page for every video article.',
      },
    ],
    variants: [
      {
        slug: 'studio',
        key: 'A',
        name: 'Studio',
        round: 1,
        title: 'A screen on a stage.',
        blurb: 'Title and byline in the reading column, then the video in a wide navy panel with generous padding, rounded corners and a soft jade glow.',
        poster: ['#ffffff', '#0a2540'],
      },
      {
        slug: 'theater',
        key: 'B',
        name: 'Theater',
        round: 1,
        title: 'A screen in a dark room.',
        blurb: 'A navy opening with the title in white, the video centred beneath in a spotlight with a thin jade ring and dark space all round.',
        poster: ['#0a1626', '#00a896'],
        // The page for every article with a video (src/app/engineer/[slug]).
        live: true,
      },
      {
        slug: 'mat',
        key: 'C',
        name: 'Mat',
        round: 1,
        title: 'A framed print.',
        blurb: 'The title on the left; the video on the right in a white mat with a hairline shadow, on a quiet light ground.',
        poster: ['#f8f9fa', '#cfd7df'],
      },
    ],
  },
  {
    slug: 'films',
    name: 'The films pages',
    date: '2026-09-28',
    headline: 'Two ways to show a film, and the index we picked.',
    intro:
      'Two directions for the first Esy film’s page and for the films index, built around the real film: its stills, its animatic and every file behind it. Open a film page and scroll to the end credits.',
    summary:
      'Two directions for esy.com/films, index and film page each, for The Letter With No Address. A’s film page shipped; the index shipped as a third design, the title sequence.',
    rounds: [
      {
        n: 1,
        title: 'Two directions',
        summary: 'A is a premiere: dark and gold, the page as the film’s last reel. B is a storybook: a light index and a starlit film page that ends on a last letter. A’s film page shipped as /films/the-letter-with-no-address.',
      },
      {
        n: 2,
        title: 'Six indexes',
        summary: 'The index had to hold films of every kind, not just children’s. Six directions followed (Premiere, Programme, Screens, Picture House, The Reel, Title Sequence); the title sequence shipped as /films.',
      },
    ],
    variants: [
      {
        slug: 'a-index',
        key: 'A',
        name: 'Premiere index',
        round: 1,
        title: 'The Letter With No Address.',
        blurb: 'A full-screen featured film over a slate of posters and the ten stages.',
        poster: ['#07091a', '#e3b660'],
      },
      {
        slug: 'a-film',
        key: 'A',
        name: 'Final Reel film page',
        round: 1,
        title: 'The page is the film’s last reel.',
        blurb: 'Curtain-up opening, the animatic, a film strip of the story, cast posters, the cuts as leader frames, the files as film cans, and rolling end credits.',
        poster: ['#07091a', '#f6dda3'],
        live: true,
        liveHref: '/films/the-letter-with-no-address/',
      },
      {
        slug: 'b-index',
        key: 'B',
        name: 'Storybook index',
        round: 1,
        title: 'Films made from clip art.',
        blurb: 'A light index in the publication’s style, with the film as a storybook card.',
        poster: ['#fbf7ef', '#0b1030'],
      },
      {
        slug: 'b-film',
        key: 'B',
        name: 'Starlight film page',
        round: 1,
        title: 'A starlit film page that ends on a letter.',
        blurb: 'The Moon path opening, the chapters, and a last letter in place of a footer.',
        poster: ['#0b1030', '#ffe7b0'],
      },
    ],
  },
  {
    slug: 'courses',
    name: 'The courses index',
    date: '2026-09-29',
    headline: 'Eight ways into the courses.',
    intro:
      'The /courses page, redone in The Marketing Engineer\u2019s look. Each version shows the same real courses and links to the real lessons. Open one and click through.',
    summary:
      'Three directions for the /courses index, built on the publication\u2019s serif, navy and jade. Every title, lesson and running time comes from the real course list.',
    rounds: [
      {
        n: 1,
        title: 'Shelf, syllabus, or stage',
        summary:
          'A lists each course as a book on a shelf with its chapters, B lays every lesson out as one syllabus with the signup in a sticky rail, and C puts the newest course on a navy stage above a grid.',
      },
      {
        n: 2,
        title: 'Built from the homepage',
        summary:
          'Zev asked for no grids and nothing like the old style, taking from esy.com and /engineer instead. D is /engineer\u2019s masthead over the Latest list, E is the homepage\u2019s numbered sections, and F announces the course like the homepage\u2019s film.',
      },
      {
        n: 3,
        title: 'The masthead, then the spotlight',
        summary:
          'D kept the signup on the first screen and F\u2019s poster made the course enticing, so G puts F\u2019s spotlight straight under D\u2019s masthead. H then adds E\u2019s numbered sections for every other course.',
      },
    ],
    variants: [
      {
        slug: 'shelf',
        key: 'A',
        name: 'Shelf',
        round: 1,
        title: 'Courses',
        blurb:
          'A plain serif hero, then one row per course: a typographic cover, what it teaches, its chapters, and a \u201cstart with lesson 1\u201d link.',
        poster: ['#FFFFFF', '#0A2540'],
      },
      {
        slug: 'syllabus',
        key: 'B',
        name: 'Syllabus',
        round: 1,
        title: 'Courses',
        blurb:
          'Every course with every lesson listed and linked, so you can jump in anywhere. The pitch and the email signup ride along in a sticky rail.',
        poster: ['#F8F9FA', '#00A896'],
      },
      {
        slug: 'featured',
        key: 'C',
        name: 'Featured',
        round: 1,
        title: 'Courses',
        blurb:
          'A navy stage for the newest course, with its big cover, its lessons and a Start button, then every course as a card below.',
        poster: ['#0A2540', '#061527'],
      },
      {
        slug: 'masthead',
        key: 'D',
        name: 'Masthead',
        round: 2,
        title: 'Courses',
        blurb:
          '/engineer\u2019s centred serif masthead with the signup, then the homepage\u2019s Latest block: the course as the lead story with a generated cover, and every lesson as a dated row.',
        image: '/prototypes/courses/claude-code.webp',
      },
      {
        slug: 'numbered',
        key: 'E',
        name: 'Numbered',
        round: 2,
        title: 'Courses',
        blurb:
          'The homepage\u2019s 01 / 02 sections: a big jade number and the course on the left, a ruled ledger of its lessons on the right, and chips to jump between courses.',
        poster: ['#FFFFFF', '#00A896'],
      },
      {
        slug: 'now-showing',
        key: 'F',
        name: 'Now showing',
        round: 2,
        title: 'Courses',
        blurb:
          'The course announced like the homepage\u2019s film: a tilted poster beside a logline and credits (taught by, each lesson, running time), in navy and jade.',
        image: '/prototypes/courses/claude-code-poster.webp',
      },
      {
        slug: 'masthead-showing',
        key: 'G',
        name: 'Masthead + Now showing',
        round: 3,
        mergeOf: ['D', 'F'],
        title: 'Courses',
        blurb:
          'D\u2019s centred masthead with the signup, then F\u2019s poster, logline and credits spotlighting the newest course, then what\u2019s coming.',
        image: '/prototypes/courses/claude-code-poster.webp',
      },
      {
        slug: 'masthead-sections',
        key: 'H',
        name: 'G + Numbered',
        round: 3,
        mergeOf: ['G', 'E'],
        title: 'Courses',
        blurb:
          'G\u2019s masthead and poster spotlight as course 01, then every other course as E\u2019s numbered section (02, 03\u2026) with its lessons as a ledger, and chips to jump between them.',
        image: '/prototypes/courses/claude-code-poster.webp',
      },
    ],
  },
  {
    slug: 'course',
    name: 'The course page',
    date: '2026-09-29',
    headline: 'Three course pages.',
    intro:
      'The page for one course, in The Marketing Engineer\u2019s look. Each version shows the real Claude Code course and links to its real lessons. Open one and click through.',
    summary:
      'Three directions for /courses/<course>/, built from parts already on esy.com: the index\u2019s poster band, /engineer\u2019s masthead, and a watch-first player.',
    rounds: [
      {
        n: 1,
        title: 'Poster, masthead, or theater',
        summary:
          'A opens on the index\u2019s poster and credits, B on /engineer\u2019s centred masthead with a sticky course card, and C on a framed screen with the lessons as a playlist.',
      },
    ],
    variants: [
      {
        slug: 'poster',
        key: 'A',
        name: 'Poster',
        round: 1,
        title: 'How to Use Claude Code for the AI Solopreneur',
        blurb:
          'The index\u2019s Now showing band as the hero, then what you\u2019ll learn beside the lessons as the homepage\u2019s ledger, the teacher, and the resources.',
        image: '/prototypes/courses/claude-code-poster.webp',
      },
      {
        slug: 'masthead',
        key: 'B',
        name: 'Masthead',
        round: 1,
        title: 'How to Use Claude Code for the AI Solopreneur',
        blurb:
          '/engineer\u2019s centred serif masthead with a Start button, then a sticky course card with the cover and the facts beside the lessons as dated rows.',
        image: '/prototypes/courses/claude-code.webp',
      },
      {
        slug: 'theater',
        key: 'C',
        name: 'Theater',
        round: 1,
        title: 'How to Use Claude Code for the AI Solopreneur',
        blurb:
          'Watch first: the cover in a framed screen with a big play button, and every lesson as a playlist beside it, then what you\u2019ll learn and the teacher.',
        image: '/prototypes/courses/claude-code.webp',
      },
    ],
  },
  {
    slug: 'lesson',
    name: 'The lesson page',
    date: '2026-09-29',
    headline: 'Three lesson pages.',
    intro:
      'The page where a lesson plays, in The Marketing Engineer\u2019s look. Each version shows the real first lesson of the Claude Code course. Its own video isn\u2019t recorded yet, so a real published video with its transcript stands in, labelled on the page.',
    summary:
      'Three directions for /courses/<course>/<lesson>/, built on the video article\u2019s framed player and click-to-seek transcript.',
    rounds: [
      {
        n: 1,
        title: 'Theater, studio, or mat',
        summary:
          'A puts the lesson in the video article\u2019s dark room with the course in a rail, B is a course player with the playlist beside the video, and C frames the video like a print with the notes read as an article.',
      },
    ],
    variants: [
      {
        slug: 'theater',
        key: 'A',
        name: 'Theater',
        round: 1,
        title: 'Introduction & Setup',
        blurb:
          'The video article\u2019s dark room: the lesson title in white, the video in a spotlight, the transcript under it, then the course\u2019s lessons in a sticky rail beside the notes and up next.',
        poster: ['#0A1626', '#0A2540'],
      },
      {
        slug: 'studio',
        key: 'B',
        name: 'Studio',
        round: 1,
        title: 'Introduction & Setup',
        blurb:
          'A course player: the video in the studio frame with the course\u2019s playlist beside it on navy, the transcript underneath, then up next and the notes.',
        poster: ['#F8F9FA', '#0A2540'],
      },
      {
        slug: 'mat',
        key: 'C',
        name: 'Mat',
        round: 1,
        title: 'Introduction & Setup',
        blurb:
          'Light and bookish: the title beside the video in a white mat, the notes read like an article with the lessons in a rail, and a navy up-next band.',
        poster: ['#FFFFFF', '#F8F9FA'],
      },
    ],
  },
  {
    slug: 'footer',
    name: 'The footer',
    date: '2026-09-29',
    headline: 'Where films go in the footer.',
    intro:
      'Films need a place of their own in the footer, with creatives to follow. Each version is the live footer with a different structure, shown in its real place at the bottom of the page.',
    summary:
      'Three footer structures for films (and creatives next): Zev\u2019s Films column, columns by kind, and shelves.',
    rounds: [
      {
        n: 1,
        title: 'A column, columns by kind, or shelves',
        summary:
          'A is Zev\u2019s: today\u2019s footer plus a Films column. B sorts every column by what it holds and drops the From Esy row. C keeps the columns compact and turns the bottom band into shelves of posters and wordmarks.',
      },
    ],
    variants: [
      {
        slug: 'yours',
        key: 'A',
        name: 'Films column',
        round: 1,
        title: 'Today\u2019s footer, plus a Films column.',
        blurb:
          'Zev\u2019s idea: a Films column beside Product, Learn and Company, listing every film by title with All films under them. The From Esy row keeps the apps. Creatives become their own column later.',
        poster: ['#F8FAFC', '#0A2540'],
      },
      {
        slug: 'by-kind',
        key: 'B',
        name: 'By kind',
        round: 1,
        title: 'Every column holds one kind of thing.',
        blurb:
          'Learn, Films, Built on Esy (Esy OS, clip.art, SEOPage, each with a one-line note) and Company. The From Esy row goes, and the brand line becomes the publication\u2019s.',
        poster: ['#F8FAFC', '#00A896'],
      },
      {
        slug: 'shelves',
        key: 'C',
        name: 'Shelves',
        round: 1,
        title: 'The work on shelves under the columns.',
        blurb:
          'The columns stay compact, and the bottom band becomes shelves: Films as small posters with title and runtime, and Apps as their wordmarks. Creatives become a third shelf.',
        poster: ['#F8FAFC', '#061527'],
      },
    ],
  },
];

export const findPrototype = (slug: string) => PROTOTYPES.find((p) => p.slug === slug);