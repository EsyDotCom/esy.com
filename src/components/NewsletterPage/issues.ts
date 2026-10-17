/* Sample issues of The Marketing Engineer for the /newsletter prototypes
   (2026-10-09). Shaped like an issue will be once Compose writes them and Esy
   stores them (one artifact per issue): a number, a send date, a title, a
   one-line dek, and a body made of a few kinds of section. The newsletter
   teaches AI marketing and points to the courses and to Esy (os.esy.com); it
   hands people skills and prompts, never code.

   Each issue covers one system, then the week's AI marketing news, linked to
   the real AI Marketing News posts. The facts are real (clip.art's 30,000+
   pages and #1 for "AI clipart", SEOPage, Compose, the news posts); the issues
   themselves, their dates and their wording are samples.

   No. 5 (agency-issue.ts) is the first issue with every v2 part, and has led
   the live list since 2026-10-15 so the live page shows L5 whole. Its numbers
   are os.esy.com's sample campaign, said at the top of the issue (`sample`). */

import { AGENCY_ISSUE } from './agency-issue';

/** One step of the week's system. `where` says who runs it (You, a tool such
    as Clay, or Esy); `result` is what the step did on our own run. Both are
    optional: issues written before 2026-10-14 have neither. */
export type IssueStep = {
  name: string;
  does: string;
  where?: string;
  result?: { n?: string; of?: string; note: string };
};

/* The parts of an issue, matching Esy's "Newsletter issue" template v2
   (api.esy.com esy-issue, 2026-10-15; order in docs/news/README.md). The
   three parts for agencies (results, clients, scoreboard) are optional, so an
   issue without them reads as it did before. */
export type IssueSection =
  | { kind: 'lead'; text: string[] }
  | { kind: 'system'; title: string; steps: IssueStep[] }
  // "What it did for us": the same system on our own pipeline. `per` names the
  // funnel rows to divide the spend by ("Per reply" over "Replied").
  | {
      kind: 'results';
      title: string;
      funnel: { label: string; n: number }[];
      spend: { label: string; usd: number }[];
      per?: { label: string; funnel: string }[];
      lesson: string;
    }
  // "Sell it to your clients": the offer, what's in it, example prices, the math, the objection.
  | {
      kind: 'clients';
      title: string;
      offer: string;
      includes: string[];
      price: { label: string; value: string }[];
      math: string[];
      objection: { q: string; a: string };
    }
  // How a tool plugs into Esy, and what each side keeps (No. 5: Clay).
  | {
      kind: 'connect';
      title: string;
      lines: { label: string; text: string }[];
      keeps: { clay: string[]; esy: string[] };
      note: string;
    }
  // The weekly skill: its name, what it returns, the button, and (issues from
  // Compose) the skill itself, which the button copies.
  | { kind: 'take'; title: string; what: string; label: string; skill?: string }
  | { kind: 'reads'; items: { title: string; why: string; href: string }[] }
  // Our scoreboard: this week's numbers with the running total.
  | { kind: 'scoreboard'; week: string; rows: { label: string; week: number; total: number }[] }
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
  /** The issue's cover (16:9), also its share image: vinyl Mason acting out the
      title (the standard since 2026-10-12), made by scripts/newsletter-mason-cover.mjs
      from one sentence of what he's doing. The desk covers before it stay in
      /images/newsletter/covers/<n>.webp. */
  cover?: string;
  /** What the cover shows, for screen readers. */
  coverAlt?: string;
  /** One line under the cover saying what Mason is doing and why, in plain words. */
  coverCaption?: string;
  /** Said at the top of the issue when its numbers are a sample, not ours. */
  sample?: string;
  /** A real issue, written in Compose and published through Esy
      (src/lib/published-issues.ts). The issues in this file are samples, so
      the live site labels them "Sample issue"; a real one shows its date. */
  real?: boolean;
  /** "noindex" keeps a real issue out of search and the sitemap while it stays
      live (api.esy.com #589; src/lib/search-indexing.ts). */
  searchIndexing?: 'index' | 'noindex';
  body: IssueSection[];
}

export const ISSUES: Issue[] = [
  // No. 5 is the full v2 issue (every part), so the live page shows L5 whole.
  AGENCY_ISSUE,
  {
    n: 4,
    cover: '/images/newsletter/covers/vinyl-mason/4.webp',
    coverAlt: 'Mason the octopus at a microscope over a tray of small figurines dressed as different characters, while a screen beside him shows the one he found, magnified and glowing.',
    coverCaption: 'Mason studies a crowd of possible customers under the microscope, and the screen shows the one he’s looking for.',
    slug: 'find-what-to-build',
    date: '2026-10-08',
    title: 'Find what to build: the ICP discovery system',
    dek: 'Your ideal customer is a guess until you’ve talked to them. The system that turns the guess into real people, their own words, and booked calls.',
    topic: 'AI marketing',
    minutes: 6,
    body: [
      {
        kind: 'lead',
        text: [
          'This week I wrote about the trap most builders fall into: building for a fantasy customer, then wondering why nobody pays.',
          'This issue is the fix. It’s the system for finding out who actually has the problem, what they call it, and whether they’ll pay to make it go away.',
          'AI makes every step faster. It can’t do the step that matters most: talking to people. Skip that and AI just takes you further down the wrong road, faster.',
        ],
      },
      {
        kind: 'system',
        title: 'How you find your ICP',
        steps: [
          { name: 'Write down the guess', does: 'One paragraph: who it’s for, the pain, what they’d pay. You write it down so you can prove it wrong.' },
          { name: 'Collect their words', does: 'Have AI read where they already complain and pull out each problem in their own words, with a link to where they said it.' },
          { name: 'Talk to ten', does: 'Ten short calls. Ask about the last time the problem happened and what they did, never “would you buy this?”' },
          { name: 'Build the avatar', does: 'One named person: the trigger, their pains, their objections, the exact words they use, and the quote behind each.' },
          { name: 'Test the pull, then book', does: 'One piece of content and one small ad aimed at that pain. Count replies and booked calls, not likes. Every sales call is another interview.' },
        ],
      },
      { kind: 'take', title: 'The call-notes skill', what: 'Paste a call transcript. It returns their pains in their own words, the trigger, what they’ve tried, their objections, any sign they’d pay, and where you led the witness.', label: 'Copy the skill' },
      { kind: 'news', slugs: ['meta-muse-launch', 'hubspot-marketing-studio-agents', 'chatgpt-ads-costs-vary'] },
      {
        kind: 'reads',
        items: [
          { title: 'Why builders get stuck', why: 'The essay on zev.esy.com this issue answers.', href: 'https://zev.esy.com' },
          { title: 'The Mom Test, Rob Fitzpatrick', why: 'How to ask questions people can’t lie to you about.', href: 'https://www.momtestbook.com' },
        ],
      },
      { kind: 'next', text: 'Bring your ICP guess to the AI Marketing community and we’ll pull it apart together.', cta: 'Join the community', href: 'https://www.skool.com/ai-marketing' },
    ],
  },
  {
    n: 3,
    cover: '/images/newsletter/covers/vinyl-mason/3.webp',
    coverAlt: 'Mason the octopus setting a block into a page that an AI chat window is quoting.',
    coverCaption: 'Mason sets a block into a page that an AI answer is quoting.',
    slug: 'landing-pages-ai-will-cite',
    date: '2026-10-01',
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
    cover: '/images/newsletter/covers/vinyl-mason/2.webp',
    coverAlt: 'Robot agents researching, writing and checking while Mason the octopus stamps the finished paper.',
    coverCaption: 'The agents research, write and check; Mason stamps the paper only when it’s right.',
    slug: 'the-agent-newsroom',
    date: '2026-09-24',
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
      { kind: 'take', title: 'The fact-check skill', what: 'The exact check the Fact-checker runs, as a skill your AI can use: give it a draft and it returns each claim with its source, or a flag.', label: 'Copy the skill' },
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
    cover: '/images/newsletter/covers/vinyl-mason/1.webp',
    coverAlt: 'Mason the octopus on the top step of a winners’ podium, holding up a glowing trophy.',
    coverCaption: 'Mason on the top step: clip.art at #1 for “AI clipart”.',
    slug: 'how-clip-art-got-to-number-one',
    date: '2026-09-17',
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
