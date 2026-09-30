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
  'Now he builds Esy, a workflow platform that makes marketing work (images, pages, video) and records how every piece was made. Two businesses run on it: clip.art, which produces 250 to 1,000 clip art assets, coloring pages and worksheets a day, and SEOPage, which builds landing pages that get cited by AI and rank on Google.',
  'He writes The Marketing Engineer, a weekly email and a set of courses on building the AI systems that run marketing, and makes the films and creatives to prove the systems work.',
];

/** The long bio, in Zev's own voice, for the pages he speaks on. */
export const STORY = [
  'I spent a decade shipping production web products, from fuboTV’s streaming apps to Vroom’s online car storefront. That’s where I learned how software gets built, tested and shipped at scale.',
  'Now I build Esy, a workflow platform that makes marketing work (images, pages, video) and records how every piece was made. Two businesses run on it: clip.art, which makes 250 to 1,000 clip art assets, coloring pages and worksheets a day, and SEOPage, which builds landing pages that get cited by AI and rank on Google.',
  'I write The Marketing Engineer to teach what those systems taught me, and make the films and creatives to prove they work.',
];

/** Real numbers only. */
export const FACTS = [
  { value: CLIPART_RUN.totalRuns.toLocaleString('en-US'), label: 'workflow runs recorded' },
  { value: '250–1,000', label: 'clip.art assets made a day' },
  { value: '2', label: 'businesses running on Esy' },
  { value: String(courses.length), label: courses.length === 1 ? 'course' : 'courses' },
  { value: String(FILMS.length), label: FILMS.length === 1 ? 'film' : 'films' },
];

/** What he runs and makes, with where to see it. */
export const WORK = {
  clipart: { name: 'clip.art', href: 'https://clip.art', line: 'AI clip art, coloring pages and worksheets, 250 to 1,000 a day. My daughter uses it every day.' },
  seopage: { name: 'SEOPage', href: 'https://seopage.com', line: 'Landing pages that get cited by AI and rank on Google, researched and built on Esy.' },
  os: { name: 'Esy OS', href: 'https://os.esy.com', line: 'The platform both run on: every run recorded on prompt, model, checks and cost.' },
};

export const CREATIVE = CREATIVES[0];
export const FILM = FILMS[0];

/** What he's on right now (C's "Now"). Dated so it can go stale honestly. */
export const NOW_DATE = 'September 2026';
export const NOW = [
  'Writing The Marketing Engineer every week, with news posts starting at esy.com/news.',
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

/** Where the name comes from (kept from the old /about). */
export const ETYMOLOGY = {
  text: 'Esy comes from Synthesis Essay, reversed into the acronym ESY. It’s pronounced “Eh-see.”',
  href: '/essays/etymology/the-word-essay/',
};

export const PORTRAIT = '/images/zev-uhuru.png';
