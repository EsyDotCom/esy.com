/* Sample issues of The Marketing Engineer for the /newsletter prototypes
   (2026-10-09). Shaped like an issue will be once Compose writes them and Esy
   stores them (one artifact per issue): a number, a send date, a title, a
   one-line dek, and a body made of a few kinds of section. The newsletter
   teaches AI marketing and points to the courses and to Esy (os.esy.com); it
   hands people skills and prompts, never code.

   Each issue covers one system, then the week's AI marketing news, linked to
   the real AI Marketing News posts. The facts are real (clip.art's 30,000+
   pages and #1 for "AI clipart", SEOPage, Compose, the news posts); the issues
   themselves, their dates and their wording are samples. */

export type IssueSection =
  | { kind: 'lead'; text: string[] }
  | { kind: 'system'; title: string; steps: { name: string; does: string }[] }
  | { kind: 'take'; title: string; what: string; label: string } // a skill or prompt to copy
  | { kind: 'reads'; items: { title: string; why: string; href: string }[] }
  | { kind: 'next'; text: string; cta: string; href: string } // the course or os.esy.com
  // The week's AI marketing news: real AI Marketing News posts, by slug, so an
  // issue never restates news in its own words (src/data/news, docs/news).
  | { kind: 'news'; slugs: string[] };

export interface Issue {
  n: number;
  slug: string;
  date: string; // YYYY-MM-DD, the send date
  title: string;
  dek: string;
  topic: string;
  minutes: number;
  /** The issue's cover art (16:9), generated through api.esy.com
      (scripts/generate-newsletter-covers.mjs). */
  cover?: string;
  body: IssueSection[];
}

export const ISSUES: Issue[] = [
  {
    n: 3,
    cover: '/prototypes/newsletter/covers/3.webp',
    slug: 'landing-pages-ai-will-cite',
    date: '2026-10-08',
    title: 'Landing pages that AI answers quote',
    dek: 'Why SEOPage writes every page as answers first, and the skill that does the research.',
    topic: 'AI search',
    minutes: 6,
    body: [
      {
        kind: 'lead',
        text: [
          'More of your buyers now ask an AI before they ever see a search result. The pages that get quoted in those answers have something in common: they answer one question plainly, near the top, with the facts a machine can lift.',
          'SEOPage builds every page that way. This week: the system behind it, and the skill you can use to research your own.',
        ],
      },
      {
        kind: 'system',
        title: 'How a page gets made',
        steps: [
          { name: 'Research', does: 'Live search data: what people ask, what the top answers say, what they leave out.' },
          { name: 'Outline', does: 'One question per section, answered in its first two sentences.' },
          { name: 'Write and check', does: 'Every claim traced to a source before it ships.' },
          { name: 'Score', does: 'Readable by a person, quotable by a model, or it goes back.' },
        ],
      },
      { kind: 'take', title: 'The page-research skill', what: 'Give it a service and a city; it returns the questions buyers ask and the gaps in today’s answers.', label: 'Copy the skill' },
      { kind: 'news', slugs: ['chatgpt-ads-costs-vary', 'google-ai-max-three-features', 'search-console-multimodal-report'] },
      { kind: 'next', text: 'Want it already set up? SEOPage runs this system for you.', cta: 'See it in Esy', href: 'https://os.esy.com' },
    ],
  },
  {
    n: 2,
    cover: '/prototypes/newsletter/covers/2.webp',
    slug: 'the-agent-newsroom',
    date: '2026-10-01',
    title: 'The agent newsroom behind AI Marketing News',
    dek: 'A Researcher, a Writer and a Fact-checker, and the one step that stays human.',
    topic: 'AI agents',
    minutes: 5,
    body: [
      {
        kind: 'lead',
        text: [
          'Every post on AI Marketing News is written by Compose: a small team of agents with one job each. Nothing publishes until I approve it.',
          'The interesting part isn’t the writing. It’s the checking.',
        ],
      },
      {
        kind: 'system',
        title: 'Who does what',
        steps: [
          { name: 'Researcher', does: 'Reads the company’s own announcement first, then everything else.' },
          { name: 'Writer', does: 'Writes what changed and why it matters for marketers, in plain words.' },
          { name: 'Fact-checker', does: 'Checks every claim against the source; anything unsupported goes back.' },
          { name: 'Me', does: 'Approve or send back. One click, every post.' },
        ],
      },
      { kind: 'take', title: 'The fact-check prompt', what: 'The exact prompt the Fact-checker runs, ready to paste into your AI.', label: 'Copy the prompt' },
      { kind: 'news', slugs: ['meta-muse-for-small-business', 'meta-enterprise-platform', 'claude-sonnet-5-5', 'elevenlabs-v4-launch'] },
      {
        kind: 'reads',
        items: [
          { title: 'AI Marketing News', why: 'See the newsroom’s output, every post linked to its source.', href: '/news/' },
          { title: 'Editorial standards', why: 'The rules the agents follow.', href: '/editorial-standards/' },
        ],
      },
    ],
  },
  {
    n: 1,
    cover: '/prototypes/newsletter/covers/1.webp',
    slug: 'how-clip-art-got-to-number-one',
    date: '2026-09-24',
    title: 'How clip.art got to #1 for “AI clipart”',
    dek: '30,000+ pages, one person, and the system that decides what to make next.',
    topic: 'SEO',
    minutes: 7,
    body: [
      {
        kind: 'lead',
        text: [
          'clip.art is #1 on Google for “AI clipart”, with 30,000+ pages published. No team wrote them. A system did, and I review what it makes.',
          'Here’s the system, step by step, and the skill that starts it.',
        ],
      },
      {
        kind: 'system',
        title: 'From a search to a published page',
        steps: [
          { name: 'Find the demand', does: 'Search data says what people want and how much competition there is.' },
          { name: 'Make it', does: 'Each piece is generated in a fixed style, then checked for quality.' },
          { name: 'Review', does: 'Anything below the bar goes back; the rest waits for a human yes.' },
          { name: 'Publish', does: 'A page per subject, written to answer the search that found it.' },
        ],
      },
      { kind: 'take', title: 'The demand-finder skill', what: 'Turns one topic into a ranked list of pages worth making, with the search behind each.', label: 'Copy the skill' },
      { kind: 'news', slugs: ['google-september-2026-spam-update', 'hubspot-marketing-studio-agents', 'google-ai-max-auto-upgrade'] },
      { kind: 'next', text: 'The full build is a course: from one topic to a site that ranks.', cta: 'See the courses', href: '/courses/' },
    ],
  },
];

// Newest first, and the figures every take shows.
export const LATEST = ISSUES[0];
export const ISSUE_COUNT = ISSUES.length;
export const findIssue = (n: number) => ISSUES.find((i) => i.n === n);
/** The issues either side of one, for "previous / next" (older is a lower number). */
export const neighbours = (n: number) => ({ older: findIssue(n - 1), newer: findIssue(n + 1) });

/** "Oct 8, 2026" from a YYYY-MM-DD date, without timezone drift. */
export function issueDate(date: string): string {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
