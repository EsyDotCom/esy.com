/* The upgraded issue, round 2 of /prototypes/newsletter-issue (2026-10-14).

   Written for Morgan, the primary ICP since 2026-10-14 (Compose plan §12): the
   owner of a small agency that already has clients. The weekly tutorial stays
   the issue; three short parts join it:
     results    "What it did for us": the same system on our own pipeline.
     clients    "Sell it to your clients": how an agency delivers and prices it.
     scoreboard This week's numbers, three lines, every week.

   The system is outbound with Clay, run through os.esy.com/agency/outreach. The
   Clay connection is HYPOTHETICAL: os.esy.com shows Clay as a data source
   ("People come in from Clay", "Clay waterfall" in its samples) but nothing is
   wired yet. Every number is os.esy.com's sample campaign (outreach-data.ts and
   outreach-find-data.ts in os.esy.com: Roofers in Texas, 1,240 → 120 approved
   → 84 emailed → 11 replied → 1 meeting → 1 client, $52.92 spent), so the issue
   and the app agree. Prices in "Sell it" are examples, said so on the page.

   Kept apart from ISSUES on purpose: ISSUES feeds the live /newsletter pages,
   and this sample must never show there. */

import type { Issue, IssueSection } from './issues';

/** How Clay plugs into Esy: only this sample has it, because the connection is
    hypothetical and the live issues never show one. */
export type ConnectSection = {
  kind: 'connect';
  title: string;
  lines: { label: string; text: string }[];
  keeps: { clay: string[]; esy: string[] };
  note: string;
};

export type AgencySection = IssueSection | ConnectSection;
export type AgencyIssue = Omit<Issue, 'body'> & { body: AgencySection[] };

const FUNNEL = [
  { label: 'Found on Google Maps', n: 1240 },
  { label: 'Fit the rules', n: 412 },
  { label: 'Had a reason to write now', n: 214 },
  { label: 'Owner found', n: 168 },
  { label: 'Reachable, address checked', n: 141 },
  { label: 'You approved', n: 120 },
  { label: 'Emailed', n: 84 },
  { label: 'Replied', n: 11 },
  { label: 'Booked a call', n: 1 },
  { label: 'Became a client', n: 1 },
];

const SPEND = [
  { label: 'Clay data', usd: 38.4 },
  { label: 'Address checks', usd: 1.9 },
  { label: 'Scout’s drafting', usd: 0.62 },
  { label: 'Mailboxes, share of the month', usd: 12 },
];

export const spendTotal = SPEND.reduce((n, s) => n + s.usd, 0);
export const usd = (n: number) => `$${n.toFixed(2)}`;

export const AGENCY_ISSUE: AgencyIssue = {
  n: 5,
  slug: 'book-calls-with-clay',
  date: '2026-10-22',
  title: 'Book calls for local clients: outbound with Clay and Esy',
  dek: 'The outbound system we run for local service businesses: Clay finds and checks them, Esy writes, waits for your sign-off and sends. What it booked, and how to sell it to your clients.',
  topic: 'AI outreach',
  minutes: 7,
  // Zev picked cover A · Finding (2026-10-15); B and C stay in the prototype's switch.
  cover: '/prototypes/newsletter-issue/covers/5-find-a.webp',
  coverAlt: 'Mason the octopus on a rooftop at night, holding a lantern out over a small vinyl town where a few roofs glow teal.',
  coverCaption: 'Mason’s lantern finds the few houses in town worth writing to.',
  body: [
    {
      kind: 'lead',
      text: [
        'Most agencies get their clients from referrals. It works until it doesn’t, and when referrals slow down, so does the agency.',
        'This week is the outbound system we run to find local service businesses that need to show up in AI search, and to book calls with them. You can rebuild it for your agency this week, then sell it to your clients as a retainer.',
        'One rule before the steps: AI does the research and the first draft. A person signs off every first email. That’s what keeps it from reading like spam, and it’s the answer when a client asks “is this AI?”',
      ],
    },
    {
      kind: 'system',
      title: 'How the system works',
      steps: [
        {
          name: 'Write the rules',
          where: 'You',
          result: { note: 'Rules v3, from 3 won and 5 lost' },
          does: 'Who fits, in plain lines you can prove wrong: roofing contractors in four Texas metros, 25+ reviews rated 4.2 or better, a site with two or fewer service pages, no franchises. Esy keeps each version of the rules, so you can see which one won clients.',
        },
        {
          name: 'Build the list',
          where: 'Clay',
          does: 'A Google Maps search by category and city fills a Clay table. Filter columns apply your rules, and anything that fails says why.',
          result: { n: '412', of: '1,240', note: 'fit the rules. 301 had no website: a different offer.' },
        },
        {
          name: 'Find a reason to write now',
          where: 'Clay',
          does: 'Clay’s research agent reads each site and the latest reviews: a storm in their area last week, a service they offer with no page, a review asking for something they don’t list.',
          result: { n: '214', of: '412', note: 'had a reason this month.' },
        },
        {
          name: 'Find who decides, and check the address',
          where: 'Clay',
          does: 'A waterfall of email finders, cheapest first, stops at the first hit. A verification check runs after it, and catch-all domains are held instead of guessed.',
          result: { n: '141', of: '214', note: 'reachable with a checked address.' },
        },
        {
          name: 'Send it to Esy',
          where: 'Clay → Esy',
          does: 'Each approved row goes to os.esy.com’s Outreach, into “To reach”. Every field keeps where it came from and what it cost.',
          result: { n: '120', of: '141', note: 'approved by us. 14 skipped, 5 on do-not-contact.' },
        },
        {
          name: 'Write, sign off, send',
          where: 'Esy',
          does: 'Scout writes the first two lines from those facts only, and notes the source of each. You sign off every first email. Esy sends from warmed mailboxes, in their morning, a few dozen a day.',
          result: { n: '84', of: '120', note: 'emailed so far. The rest wait for a mailbox slot.' },
        },
        {
          name: 'Replies and calls',
          where: 'Esy',
          does: 'Replies are sorted into interested, not now and out of office, and the sequence stops for anyone who writes back. A yes books on your calendar and lands in your CRM with the thread.',
          result: { n: '11', of: '84', note: 'replied. 1 booked a call, and signed.' },
        },
      ],
    },
    {
      kind: 'connect',
      title: 'How Clay plugs into Esy',
      lines: [
        { label: 'Clay to Esy', text: 'A column at the end of your Clay table sends each approved row to Outreach in os.esy.com. It arrives in “To reach” with its sources.' },
        { label: 'Esy to Clay', text: 'When you approve one business by hand in Esy, Esy asks your Clay table to enrich it and fills in the answer when it comes back.' },
        { label: 'Costs', text: 'The Clay credits each row used land on the campaign’s spend, beside address checks, drafting and mailboxes, under one budget cap.' },
      ],
      keeps: {
        clay: ['The table and its filters', 'The waterfall of finders', 'The research agent’s prompts'],
        esy: ['Every person, and where each field came from', 'Your sign-offs and the emails sent', 'The replies, the pipeline and the costs'],
      },
      note: 'This connection is hypothetical: Esy doesn’t talk to Clay yet. Today you’d export a CSV from Clay and import it.',
    },
    {
      kind: 'results',
      title: 'What it did for us',
      funnel: FUNNEL,
      spend: SPEND,
      per: [
        { label: 'Per reply', funnel: 'Replied' },
        { label: 'Per client', funnel: 'Became a client' },
      ],
      lesson: 'The biggest drop wasn’t the email. It was the list: 301 roofers had no website at all. They need a site before they need AI search, so they’re a different offer, and a different campaign.',
    },
    {
      kind: 'clients',
      title: 'Sell it to your clients',
      offer: 'Booked calls for local service businesses',
      includes: [
        'The rules, written with the client and kept as versions',
        'One campaign a month: the list, the research, the emails',
        'Every first email signed off by your team',
        'A weekly report: found, emailed, replied, booked',
      ],
      price: [
        { label: 'Setup', value: '$1,500 once' },
        { label: 'Monthly', value: '$1,000' },
        { label: 'Or per booked call', value: '$150' },
      ],
      math: [
        `Data and sending for one campaign: about ${usd(spendTotal)} (our numbers above).`,
        'Your team’s time: about 20 minutes a day of sign-off and replies.',
        'Price it on calls booked, not hours. The hours keep shrinking; the calls are what the client values.',
      ],
      objection: {
        q: '“Is this AI?”',
        a: 'AI does the research and the first draft. A person on your team reads and signs off every first email before it goes. That’s also why it doesn’t read like spam.',
      },
    },
    {
      kind: 'take',
      title: 'First lines from facts',
      what: 'Give it the facts Clay found: their reviews, the gap on their site, the reason to write now. It writes two opening lines that use only those facts, cites each one, and flags any line it can’t source.',
      label: 'Copy the skill',
    },
    { kind: 'news', slugs: ['google-ai-max-three-features', 'chatgpt-ads-costs-vary', 'hubspot-marketing-studio-agents'] },
    {
      kind: 'reads',
      items: [
        { title: 'Clay', why: 'The tool this issue builds on.', href: 'https://www.clay.com' },
        { title: 'Outreach in Esy', why: 'Where the sign-off queue, the pipeline and the costs live.', href: 'https://os.esy.com/agency/outreach' },
      ],
    },
    {
      kind: 'scoreboard',
      week: 'Week of Oct 19',
      rows: [
        { label: 'Businesses found', week: 96, total: 1240 },
        { label: 'Emailed', week: 31, total: 84 },
        { label: 'Replies', week: 4, total: 11 },
        { label: 'Calls booked', week: 1, total: 1 },
        { label: 'New clients', week: 1, total: 1 },
      ],
    },
    {
      kind: 'next',
      text: 'Want the setup instead of the steps? Copy the outreach system into your Esy workspace.',
      cta: 'Open Outreach in Esy',
      href: 'https://os.esy.com/agency/outreach',
    },
  ],
};
