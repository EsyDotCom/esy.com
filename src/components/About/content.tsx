/* What the /about directions say (2026-09-29, /prototypes/about/). Every
 * fact comes from somewhere already on the site: the bio from the homepage's
 * "Who writes it", clip.art's daily output from the old /about, the run count
 * from api.esy.com, the film and the explainer from their data files. One
 * content file, three designs.
 */
import { Github, Linkedin, Youtube } from 'lucide-react';
import { XSocialIcon } from '@/components/Agentic/authorSocials';
import { CLIPART_RUN } from '@/components/NewsletterHome/clipartRun';
import { CREATIVES } from '@/data/creatives';
import { FILMS } from '@/data/films';
import { courses } from '@/lib/learn/mockData';

export const NAME = 'Zev Uhuru';
export const ROLE = 'Marketing engineer';
export const PLACE = 'NYC & Miami';
export const EMAIL = 'zev@esy.com';

/** The one-line promise, as the homepage puts it. */
export const PROMISE = 'I build the AI systems that run marketing, and show you how.';

/** The bios. Short is the homepage's; long adds the rest of the story. */
export const BIO_SHORT =
  'Zev Uhuru is a marketing engineer. He spent a decade shipping production web products, from fuboTV’s streaming apps to Vroom’s online car storefront, and now builds Esy and the businesses that run on it. He writes The Marketing Engineer, a weekly email on building the AI systems that run marketing.';

export const BIO_LONG = [
  'Zev Uhuru is a marketing engineer based in New York and Miami. He spent a decade shipping production web products, from fuboTV’s streaming apps to Vroom’s online car storefront.',
  'Now he builds Esy, a workflow platform that makes marketing work (images, pages, video) and records how every piece was made. Three apps run on it: clip.art, which produces 250 to 1,000 clip art assets, coloring pages and worksheets a day; SEOPage, which builds landing pages that get cited by AI and rank on Google; and Compose, a team of agents that researches, writes and fact-checks AI Marketing News on esy.com, with every post approved by hand.',
  'He writes The Marketing Engineer, a weekly email and a set of courses on building the AI systems that run marketing, and makes the films and creatives to prove the systems work.',
];

/** The long bio, in Zev's own voice, for the pages he speaks on. */
export const STORY = [
  'I spent a decade shipping production web products, from fuboTV’s streaming apps to Vroom’s online car storefront. That’s where I learned how software gets built, tested and shipped at scale.',
  'Now I build Esy, a workflow platform that makes marketing work (images, pages, video) and records how every piece was made. Three apps run on it: clip.art, which makes 250 to 1,000 clip art assets, coloring pages and worksheets a day; SEOPage, which builds landing pages that get cited by AI and rank on Google; and Compose, a team of agents that researches, writes and fact-checks AI Marketing News on esy.com, with every post approved by me.',
  'I write The Marketing Engineer to teach what those systems taught me, and make the films and creatives to prove they work.',
];

/** The career, in order, from Zev's résumé (2026-09-29). */
export interface Chapter {
  id: string;
  years: string;
  start: string;
  at: string;
  role: string;
  place: string;
  /** One line for the compact path. */
  line: string;
  /** Two proof points for the full chapter. */
  proof: string[];
  stat: { value: string; label: string };
  /** The crypto years get their own band. */
  tone?: 'gold' | 'jade';
}

export const CAREER: Chapter[] = [
  {
    id: 'vroom',
    years: '2016–2018',
    start: '2016',
    at: 'Vroom',
    role: 'Software engineer',
    place: 'New York City',
    line: 'Built the vroom.com storefront and led SellUsYourCar.com.',
    proof: [
      'Built and maintained the main vroom.com storefront in React and Next.js.',
      'Lead developer on SellUsYourCar.com: a standalone app that walked people through quoting and selling their car to Vroom.',
    ],
    stat: { value: 'Lead dev', label: 'SellUsYourCar.com' },
  },
  {
    id: 'fubo',
    years: '2019–2021',
    start: '2019',
    at: 'fuboTV',
    role: 'Software engineer',
    place: 'New York City',
    line: 'Built the landing-page system behind 100+ tested sign-up pages.',
    proof: [
      'Built a reusable component system that made landing pages repeatable, then launched 100+ of them, each tested for subscriber sign-ups.',
      'Launched fubosportsnetwork.com and fubo.tv/news, and led the launch of ir.fubo.tv.',
    ],
    stat: { value: '100+', label: 'landing pages, each tested for sign-ups' },
  },
  {
    id: 'digital-assets',
    years: '2021–2024',
    start: '2021',
    at: 'Digital assets',
    role: 'Research & trading, self-employed',
    place: 'NYC & Miami',
    line: 'Researched and traded digital assets full time, to a seven-figure exit.',
    proof: [
      'Systematic market research and on-chain data analysis, turned into thesis-driven capital allocation.',
      'Ended in a seven-figure exit, and a habit of deciding from data, not from narrative.',
    ],
    stat: { value: '7 figures', label: 'exit, from on-chain research' },
    tone: 'gold',
  },
  {
    id: 'esy',
    years: '2024–now',
    start: '2024',
    at: 'Esy',
    role: 'Founder & marketing engineer',
    place: 'NYC & Miami',
    line: 'Built the engine; grew clip.art to #1 on Google for “AI clipart”.',
    proof: [
      'Built a workflow engine with a public API: every run versioned, checked, reviewable, and costed.',
      'Grew clip.art with programmatic SEO: 20,000+ pages published, 6,000+ ranking, #1 on Google for “AI clipart”, 800+ users and paid sales within 5 months.',
    ],
    stat: { value: '#1', label: 'on Google for “AI clipart”' },
    tone: 'jade',
  },
  {
    id: 'now',
    years: 'Now',
    start: 'Now',
    at: 'The Marketing Engineer',
    role: 'Writer & teacher',
    place: 'NYC & Miami',
    line: 'Teaching how to build the AI systems that run marketing.',
    proof: [
      'One email a week on building the AI systems that run marketing, and courses that take one tool from setup to a result.',
      'Every piece starts from something I built or tested.',
    ],
    stat: { value: 'Weekly', label: 'The Marketing Engineer' },
  },
];

/** The résumé's headline numbers, each with the chapter it comes from. */
export const PROOF = [
  { value: '7+', label: 'years shipping production software', chapter: 'Vroom · fuboTV · Esy' },
  { value: '100+', label: 'tested landing pages at fuboTV', chapter: 'fuboTV' },
  { value: '7 figures', label: 'exit from digital-assets research', chapter: 'Digital assets' },
  { value: '30,000+', label: 'pages published by Esy', chapter: 'Esy · clip.art' },
  { value: '#1', label: 'on Google for “AI clipart”', chapter: 'Esy · clip.art' },
  { value: '53% → <1%', label: 'color defects, after a 470-prompt benchmark', chapter: 'Esy' },
];

/** The longer story, first person, with the crypto years in it. */
export const STORY_FULL = [
  'I’ve shipped production software for over seven years. At Vroom I built the vroom.com storefront and led SellUsYourCar.com. At fuboTV I built the component system behind 100+ landing pages, each tested for sign-ups.',
  'From 2021 to 2024 I researched and traded digital assets full time in Miami: market research, on-chain data, thesis-driven allocation. It ended in a seven-figure exit, and it taught me to decide from data.',
  'Since 2024 I’ve built Esy, an engine that runs AI workflows end to end and records every run. It grew clip.art to #1 on Google for “AI clipart”, with 30,000+ pages published and 6,000+ ranking. Three apps run on it now: clip.art, SEOPage, and Compose, a team of agents that writes AI Marketing News here, with every post approved by me. I write The Marketing Engineer to teach what those systems taught me.',
];

/** Real numbers only. */
export const FACTS = [
  { value: CLIPART_RUN.totalRuns.toLocaleString('en-US'), label: 'workflow runs recorded' },
  { value: '250–1,000', label: 'clip.art assets made a day' },
  { value: '3', label: 'apps running on Esy' },
  { value: String(courses.length), label: courses.length === 1 ? 'course' : 'courses' },
  { value: String(FILMS.length), label: FILMS.length === 1 ? 'film' : 'films' },
];

/** What he runs and makes, with where to see it. */
export const WORK = {
  clipart: { name: 'clip.art', href: 'https://clip.art', line: 'AI clip art, coloring pages and worksheets, 250 to 1,000 a day. My daughter uses it every day.' },
  seopage: { name: 'SEOPage', href: 'https://seopage.com', line: 'Landing pages that get cited by AI and rank on Google, researched and built on Esy.' },
  compose: { name: 'Compose', href: 'https://compose.esy.com', line: 'A team of agents that writes AI Marketing News: a Researcher, a Writer and a Fact-checker, with me approving every post.' },
  os: { name: 'Esy OS', href: 'https://os.esy.com', line: 'The platform all three run on: every run recorded on prompt, model, checks and cost.' },
};

export const CREATIVE = CREATIVES[0];
export const FILM = FILMS[0];

/** What he's on right now (C's "Now"). Dated so it can go stale honestly. */
export const NOW_DATE = 'September 2026';
export const NOW = [
  'Writing The Marketing Engineer every week, and publishing AI Marketing News at esy.com/news with Compose.',
  'Recording the lessons for How to Use Claude Code for the AI Solopreneur.',
  'Finishing the animation for The Letter With No Address, now an animatic.',
  'Building the next SEOPage and clip.art workflows on Esy.',
];

/** Where to find him. */
export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zevuhuru/', handle: 'in/zevuhuru', Icon: Linkedin },
  { label: 'YouTube', href: 'https://www.youtube.com/@EsyDotCom', handle: '@EsyDotCom', Icon: Youtube },
  { label: 'X', href: 'https://x.com/ESYdotcom', handle: '@ESYdotcom', Icon: XSocialIcon },
  { label: 'GitHub', href: 'https://github.com/ZevUhuru', handle: 'ZevUhuru', Icon: Github },
];

/** Where the name comes from (kept from the old /about). Its link to the
 *  essay on the word "essay" went when the old essays were archived. */
export const ETYMOLOGY = {
  text: 'Esy comes from Synthesis Essay, reversed into the acronym ESY. It’s pronounced “Eh-see.”',
};

export const PORTRAIT = '/images/zev-uhuru.png';
