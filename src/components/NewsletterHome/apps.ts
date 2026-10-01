/* The apps that run on Esy OS, as the homepage's merged apps band shows them
 * (2026-09-30, /prototypes/home-trim/). One record per app: the same words the
 * separate case-study bands use, so either layout tells the same story. */

export type AppId = 'clipart' | 'seopage' | 'compose';

// clip.art's style vocabulary (the case study's pills), from the Intelligence
// Circuitry homepage (src/archive/homepage-intelligence-circuitry).
export const CLIPART_STYLES = [
  'Flat', 'Minimal', 'Line Art', 'Black & White', 'Cartoon',
  'Mascot', 'Sticker', 'Emoji', 'Vintage', 'Watercolor',
  'Storybook', 'Isometric', 'Clay', 'Chibi', 'Pixel',
  'Kawaii', '3D', 'Doodle',
];

// SEOPage's case study: the 19 steps of one production page build, in order,
// as a live generate-seo-landing-page-v3 run on api.esy.com recorded them
// (2026-09-22). Names are the run's own, shortened; repeats are counted.
export const SEOPAGE_STEPS: [string, number][] = [
  ['SEO research', 1], ['Live Google results', 1], ['Competitor pages', 2],
  ["The business's own site", 1], ['Market evidence', 1], ['Design research', 1],
  ['Design critique', 1], ['Imagery direction', 1], ['Photography', 3],
  ['Clip art pack', 4], ['Build the page', 1], ['Slop audit', 1], ['Slop fix', 1],
];
export const SEOPAGE_STEP_COUNT = SEOPAGE_STEPS.reduce((n, [, times]) => n + times, 0);

export interface AppStory {
  id: AppId;
  name: string;
  /** Its job in the portfolio, as the 01 Apps ledger labels it. */
  role: string;
  /** One line, for tabs and the rail's closed rows. */
  line: string;
  desc: string;
  pillsLabel: string;
  pills: string[];
  href: string;
  cta: string;
}

export const APP_STORIES: AppStory[] = [
  {
    id: 'clipart',
    name: 'clip.art',
    role: 'The testbed',
    line: 'A live clip art library, generated and stored on Esy.',
    desc: 'Consumer marketplace for clip art, coloring pages, and illustrations. Esy workflows generate, post-process, and store every asset — each run recorded on prompt, model, processing, storage, and cost.',
    pillsLabel: `${CLIPART_STYLES.length} styles supported`,
    pills: CLIPART_STYLES,
    href: 'https://clip.art',
    cta: 'See clip.art',
  },
  {
    id: 'seopage',
    name: 'SEOPage',
    role: 'The service',
    line: 'Local SEO pages that get cited by AI and rank on Google.',
    desc: 'A business types four details; Esy workflows research the market, write, design, illustrate, and judge the page. Claude Opus 5 builds it, Claude Fable 5 audits it, and the illustrations come from clip.art’s own workflows. Every run recorded on sources, model, and cost.',
    pillsLabel: `${SEOPAGE_STEP_COUNT} steps in a page build`,
    pills: SEOPAGE_STEPS.map(([step, times]) => (times > 1 ? `${step} ×${times}` : step)),
    href: 'https://seopage.com',
    cta: 'See seopage.com',
  },
  {
    id: 'compose',
    name: 'Compose',
    role: 'The newsroom',
    line: 'A team of agents that writes AI News, with you at the end.',
    desc: 'A newsroom of agents for your publications. For each piece a Researcher finds the primary source, a Writer drafts in the publication’s voice, and a Fact-checker reads every claim against that source. Then it waits for you. AI News at esy.com/news is written this way.',
    pillsLabel: '4 on every team',
    pills: ['Researcher', 'Writer', 'Fact-checker', 'You'],
    href: 'https://compose.esy.com',
    cta: 'See Compose',
  },
];
