/* A sample weekly issue (template v3) for /prototypes/newsletter-issue/weekly/
   (2026-11-14). It is never in ISSUES, so it never shows on /newsletter or the
   homepage: it exists so the weekly sections can be seen before a real issue
   carries them. Its parts are shaped exactly as api.esy.com's public issue
   returns them (public_issues.py `_clean_part`): label, line and the tagged
   href already resolved on the sponsor, optional keys left out when empty.

   The words are Compose's N12 sample (compose.esy.com body-sample.ts), with
   The System written as Markdown, the way Esy stores it. What's real: the
   newsletter, Zev, SEOPage (his own product, $149 a month per site), Scout,
   and the news posts it links. The scoreboard, the numbers and the other
   sponsor are samples. */

import type { Issue, IssueSection, IssueSponsor } from './issues';

/** The System, written out in Markdown (Esy stores Markdown, never HTML). */
const SYSTEM_BODY = `Every week I read how creators turn attention into a list, and every week I lost the notes. A screenshot here, a link in a doc there. So I built Scout: one page per creator, where every claim says how we know it.

## What it does

Scout keeps one page per creator. It shows where they post, where each post sends people, what they sell and what it costs. Every line carries one of three marks: **seen** (with the day we saw it), **their claim**, or **not checked**.

> A funnel map that guesses is worse than no map, because you'll copy the guess.

## How it runs

1. **Capture the accounts.** Open each account and read the bio links, the pinned posts and the last thirty posts.
2. **Follow every link once.** Write down where it lands and what it asks for. We never sign up or enter an email; if a step needs that, it's marked *not checked*.
3. **Group it.** Ways in (a YouTube video, a LinkedIn post, a search result) and where they lead.
4. **Price the offer as the page shows it.** Exact prices, the day we saw them, nothing estimated.

## The tools

Claude Code does the reading and the first draft of each page, from the captured pages, never from memory. A small script does every count, so a number on the page is one we counted. The skill below is the first step, and [how Scout works](https://esy.com/scout/how-we-work/) has the rest.

## Run it for a client

- Pick the three competitors your client keeps losing to.
- Map each one the same way: ways in, where they lead, the offer.
- Hand over one page per competitor with the sources attached.`;

/** Appended with ?markdown=check: raw HTML and unsafe links must read as text. */
export const MARKDOWN_CHECK = `

## Safety check (prototype only)

This line holds raw HTML: <script>alert('x')</script> and <b>bold tags</b> show as text. An \`inline code\` span, a [javascript link](javascript:alert(1)), an [http link](http://example.com) and an [https link](https://esy.com) — only the last is a link.

<div onclick="alert(1)">A block of HTML on its own line.</div>`;

const SKILL = `You are mapping one creator's funnel from the links below.
1. Where they get attention: each platform and how often they post.
2. For each, where the bio or description link sends people, and what that page asks for.
3. The offer and its price, exactly as the page shows it, with today's date.
4. Mark every line: seen (with the date), their claim, or not checked.
Never sign up or enter an email. If a step needs that, mark it not checked.

Links:
{paste the creator's links}`;

/** The sponsors the prototype can switch between (?sponsor=…), as Esy returns them. */
export const SAMPLE_SPONSORS: Record<'own' | 'system' | 'tutorial', IssueSponsor> = {
  // SEOPage, Zev's own product, as an ad in the slot.
  own: {
    kind: 'sponsor', own: true, name: 'SEOPage.com', href: 'https://seopage.com?src=tme-sponsor', logoUrl: '',
    format: 'ad', placement: 'slot', label: 'Sponsor',
    headline: 'Next month’s pages for every client, picked from their own Search Console',
    text: 'SEOPage reads each client’s Search Console, lists the pages worth writing next, writes them for you to approve, and reports what each page did. Built for agencies doing AI search for local businesses. $149 a month per site.',
    steps: [], tool: '', cta: 'See how SEOPage works',
    line: 'This week’s sponsor is SEOPage.com, my own product.', tag: 'tme-sponsor',
  },
  // SEOPage's words close The System; the slot points back.
  system: {
    kind: 'sponsor', own: true, name: 'SEOPage.com', href: 'https://seopage.com?src=tme-sponsor', logoUrl: '',
    format: 'ad', placement: 'system', label: 'Sponsor',
    headline: 'Monthly pages for every client',
    text: 'Doing this every month for every client? SEOPage does the search side for each site: it reads their Search Console, lists next month’s pages and reports what each page did.',
    steps: [], tool: '', cta: 'See SEOPage',
    line: 'This week’s sponsor is SEOPage.com, my own product.', tag: 'tme-sponsor',
  },
  // Someone who pays for the slot, as a tutorial (a sample sponsor).
  tutorial: {
    kind: 'sponsor', own: false, name: 'Acme Analytics', href: 'https://example.com/acme?src=tme-sponsor', logoUrl: '',
    format: 'tutorial', placement: 'slot', label: 'Sponsored tutorial',
    headline: 'Find the posts that bring in signups, in ten minutes',
    text: 'The same report Acme builds, by hand, for one account.',
    steps: [
      'Export the last 90 days of posts with their link clicks.',
      'Sort by clicks and keep the ten that sent the most people.',
      'Note what those ten have in common: the topic, the hook, the ask.',
    ],
    tool: 'Doing this for every client? Acme runs the report for each account every week.',
    cta: 'Try Acme free', line: 'This issue is sponsored by Acme Analytics.', tag: 'tme-sponsor',
  },
};

const PARTS: IssueSection[] = [
  { kind: 'scoreboard', week: 'Nov 1–7', rows: [
    { label: 'Readers', week: 37, total: 1292 },
    { label: 'YouTube subscribers', week: 4, total: 13 },
    { label: 'SEOPage clients', week: 1, total: 3 },
  ] },
  { kind: 'lead', text: [
    'Every week I read how creators turn views into a list, and every week I lose the notes. So I built Scout: one page per creator, every claim dated and marked as seen, their claim or not checked.',
    'This issue is how it works, and the steps you can copy to map a funnel for a client in an afternoon.',
  ] },
  { kind: 'news', slugs: ['meta-muse-launch', 'hubspot-marketing-studio-agents', 'chatgpt-ads-costs-vary'], lines: {
    'meta-muse-launch': 'Meta’s agent can now run small-business tasks end to end.',
    'hubspot-marketing-studio-agents': 'Agents now draft and schedule inside Marketing Studio.',
    'chatgpt-ads-costs-vary': 'Prices move with the question being asked, not a fixed rate card.',
  } },
  { kind: 'system', title: 'How Scout maps a funnel', steps: [], body: SYSTEM_BODY },
  { kind: 'study', creator: 'Nate Herk', scoutSlug: 'nate-herk', title: 'Nate Herk: one free template per video', link: 'See his full funnel on Scout', lines: [
    { label: 'Where he gets attention', text: 'Long YouTube tutorials that build one n8n automation from start to finish, each titled by the job it does rather than the tool.' },
    { label: 'Where it goes', text: 'Every description links the finished template, free, but you join his community’s free tier to get it.' },
    { label: 'The offer', text: 'A paid tier of the same community, with courses and live calls. Nothing is sold in the videos themselves.' },
    { label: 'What to copy', text: 'One free, useful thing per video, always through the same door. For esy.com that door is the newsletter.' },
  ] },
  { kind: 'take', title: 'Map a creator’s funnel in one prompt', label: 'Copy the skill', skill: SKILL,
    what: 'Paste this into Claude with a creator’s links. It returns the same four lines as The Study, with every line marked seen, their claim or not checked, so you check the map before a client sees it.',
    when: 'Before a client call about a competitor, or the week a creator in your niche suddenly grows and you want to know why.' },
  SAMPLE_SPONSORS.own,
  { kind: 'next', text: 'Next week, a study: how n8n gets found, through the creators who teach it.', cta: 'See the courses', href: '/courses/' },
];

export const WEEKLY_SAMPLE: Issue = {
  n: 7,
  slug: 'scout-map-a-funnel',
  date: '2026-11-13',
  title: 'Scout: map a creator’s funnel in an afternoon',
  dek: 'The system behind Esy’s public map of creator funnels, and the steps to run it for a client.',
  topic: 'AI marketing',
  minutes: 7,
  cover: '/images/newsletter/covers/vinyl-mason/5.webp',
  coverAlt: 'Mason the octopus on a rooftop at night, holding a lantern out over a small vinyl town where a few roofs glow teal.',
  coverCaption: 'Sample cover: No. 5’s, standing in for this sample issue.',
  sample: 'Sample issue: the weekly layout before a real issue carries it. The scoreboard, the numbers and Acme are samples.',
  body: PARTS,
};

/** The sample with another sponsor (or none), and optionally the Markdown check appended. */
export function weeklySample({ sponsor, check }: { sponsor?: string; check?: boolean }): Issue {
  const body = WEEKLY_SAMPLE.body
    .map((s): IssueSection => (s.kind === 'system' && check ? { ...s, body: `${s.body ?? ''}${MARKDOWN_CHECK}` } : s))
    .flatMap((s): IssueSection[] => {
      if (s.kind !== 'sponsor') return [s];
      if (sponsor === 'none') return [];
      return [SAMPLE_SPONSORS[sponsor as keyof typeof SAMPLE_SPONSORS] ?? s];
    });
  return { ...WEEKLY_SAMPLE, body };
}
