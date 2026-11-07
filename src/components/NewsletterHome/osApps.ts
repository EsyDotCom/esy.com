/* The apps of Esy OS, as the homepage shows them (2026-11-07, /prototypes/home-os-apps/).
 * Zev: the homepage's apps section shows Esy OS's own apps only, not clip.art or SEOPage.
 * The list and each app's one line follow os.esy.com's launcher
 * (src/components/folio/app/launcher.tsx): agency, compose and scout are open; echo is locked
 * until it's integrated, so it shows as coming, never as live. */

export type OsAppId = 'agency' | 'compose' | 'scout' | 'echo';

export interface OsApp {
  id: OsAppId;
  /** As its wordmark: lowercase, the first letter teal (os.esy.com's Mark). */
  name: string;
  /** Its job, in two or three words, for tabs and rows. */
  role: string;
  /** One line: the launcher's own. */
  does: string;
  /** The case-study paragraph. */
  desc: string;
  pillsLabel: string;
  pills: string[];
  /** Where it opens on the web today, and the address its window shows. */
  href: string;
  url: string;
  cta: string;
  open: boolean;
}

export const OS_APPS: OsApp[] = [
  {
    id: 'agency',
    name: 'agency',
    role: 'Run the business',
    does: 'Clients, jobs, agents, the brief and your money.',
    desc: 'Where ESY LLC is run every day: its clients and brands, the work agents are doing and what waits on a person, outreach, search data from Search Console, GA4 and Bing, the inbox and the money. Agents do the work; nothing goes out until someone approves it.',
    pillsLabel: 'In one place',
    pills: ['Clients', 'Work', 'Outreach', 'Search', 'Inbox', 'Data'],
    href: '/waitlist/',
    url: 'os.esy.com/agency',
    cta: 'Join the waitlist',
    open: true,
  },
  {
    id: 'compose',
    name: 'compose',
    role: 'The newsroom',
    does: 'Write essays, pages and newsletters with your sources at hand.',
    desc: 'A newsroom of agents for your publications. For each piece a Researcher finds the primary source, a Writer drafts in the publication’s voice, and a Fact-checker reads every claim against that source. Then it waits for you. AI Marketing News at esy.com/news is written this way.',
    pillsLabel: '4 on every team',
    pills: ['Researcher', 'Writer', 'Fact-checker', 'You'],
    href: 'https://compose.esy.com',
    url: 'compose.esy.com/write',
    cta: 'See Compose',
    open: true,
  },
  {
    id: 'scout',
    name: 'scout',
    role: 'Study who’s ahead',
    does: 'Study the creators you admire: their funnels, their best videos and what they sell.',
    desc: 'Scout studies the creators and AI companies marketing engineers learn from: where people find them, where they land, what they pay for, and the one move that makes it work. Every line says how we know it: counted, seen on a public page, or our reading. The funnel maps are free at esy.com/scout.',
    pillsLabel: 'Every map, three places and a move',
    pills: ['Found', 'Land', 'Pay', 'The move'],
    href: '/scout/',
    url: 'os.esy.com/scout',
    cta: 'See the funnel maps',
    open: true,
  },
  {
    id: 'echo',
    name: 'echo',
    role: 'Coming next',
    does: 'Schedule and share your creative work, and see what it earned.',
    desc: 'Echo schedules and shares what you make, then shows what each piece earned. It’s being built into Esy OS now.',
    pillsLabel: 'Coming',
    pills: ['Schedule', 'Share', 'Earnings'],
    href: '/waitlist/',
    url: 'os.esy.com/echo',
    cta: 'Join the waitlist',
    open: false,
  },
];

export const OPEN_APPS = OS_APPS.filter((a) => a.open);
