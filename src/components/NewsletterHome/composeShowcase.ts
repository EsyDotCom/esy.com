/* What the homepage's Compose band shows (2026-09-30, /prototypes/home-compose/).
 *
 * Real: the AI Marketing News posts (live at esy.com/news, written in Compose), and the
 * piece the band walks through, Google's September 2026 spam update, with its
 * one source. Copied from compose.esy.com's sample data (EDITOR_DOC and the
 * live posts in src/components/prototypes/dashboard/sample-data.ts).
 *
 * Sample: the agents' notes and the Fact-checker's per-claim notes. Compose
 * shows the same samples in its own editor; the band says so. */

export const COMPOSE_URL = 'https://compose.esy.com';
export const NEWS_URL = 'https://esy.com/news';

/** Each publication's team: a path of agents, with you at the end. */
export const TEAM: { role: string; job: string; did: string }[] = [
  { role: 'Researcher', job: 'Finds the primary source', did: 'Found Google’s Search Status Dashboard: the start date, the status, the year’s earlier updates.' },
  { role: 'Writer', job: 'Drafts in the publication’s voice', did: '240 words from that one source, with a short “Why it matters”.' },
  { role: 'Fact-checker', job: 'Reads every claim against the source', did: 'Four claims, all matched. Flagged the status to re-check before publishing.' },
  { role: 'You', job: 'Read it and decide', did: 'Approved it. Nothing goes live without this step.' },
];

/** The piece, as it stands in the editor. */
export const DOC = {
  publication: 'AI Marketing News',
  story: 'Google Search',
  slug: 'google-september-2026-spam-update',
  headline: 'Google’s September 2026 spam update is rolling out',
  dek: 'It started on September 24 and was still listed as rolling out on Google’s status dashboard six days later. It’s the fourth spam update this year.',
  body: [
    'Google started its September 2026 spam update on September 24. It’s the fourth this year, after March, June and August.',
    'The earlier ones finished quickly: March’s in under a day, June’s and August’s in under three. On September 30 this one was still listed as rolling out, with no end date on the dashboard.',
  ],
  /** Sample: the Fact-checker on each claim, by paragraph. */
  checks: [
    { para: 0, claim: 'on September 24', note: 'Matches the dashboard’s incident history.' },
    { para: 0, claim: 'the fourth this year', note: 'March, June and August are listed; September is the fourth.' },
    { para: 1, claim: 'June’s and August’s in under three', note: 'The dashboard shows both finishing in under three days.' },
    { para: 1, claim: 'no end date on the dashboard', note: 'True when checked on Sep 30. Re-check before publishing.' },
  ],
  /** Sample: the agents' handoff notes to you. */
  notes: [
    { role: 'Writer', text: '240 words, one source. I left “Why it matters” short on purpose; the dashboard says little.' },
    { role: 'Fact-checker', text: 'Every claim matches the dashboard. The status can change any hour, so check it once more before you publish.' },
  ],
  source: { publisher: 'Google Search Status Dashboard', title: 'Ranking incident history', read: 'Read September 30, 2026' },
  words: 240,
};

export const docUrl = `${NEWS_URL}/${DOC.slug}/`;

/** Live AI Marketing News posts, newest first, each written in Compose. */
export const POSTS: { slug: string; story: string; title: string }[] = [
  { slug: 'meta-muse-for-small-business', story: 'Meta Muse', title: 'Meta’s Muse agent comes to small businesses, with Shopify, Klaviyo and Canva plugged in' },
  { slug: 'search-console-multimodal-report', story: 'Google Search', title: 'Search Console now shows traffic from Google Lens and Circle to Search' },
  { slug: 'google-september-2026-spam-update', story: 'Google Search', title: 'Google’s September 2026 spam update is rolling out' },
  { slug: 'claude-sonnet-5-5', story: 'Claude 5.5', title: 'Claude Sonnet 5.5: over 30% faster, and strongest at docs, slides and spreadsheets' },
  { slug: 'hubspot-marketing-studio-agents', story: 'HubSpot Marketing Studio', title: 'HubSpot’s Marketing Studio adds Campaign, Content and Nurture agents' },
];

/** Split a paragraph around its checked claims, for highlighting. */
export function splitClaims(para: number): { text: string; check?: number }[] {
  const text = DOC.body[para];
  const marks = DOC.checks
    .map((c, i) => ({ i, at: c.para === para ? text.indexOf(c.claim) : -1, len: c.claim.length }))
    .filter((m) => m.at >= 0)
    .sort((a, b) => a.at - b.at);
  const out: { text: string; check?: number }[] = [];
  let pos = 0;
  for (const m of marks) {
    if (m.at > pos) out.push({ text: text.slice(pos, m.at) });
    out.push({ text: text.slice(m.at, m.at + m.len), check: m.i });
    pos = m.at + m.len;
  }
  if (pos < text.length) out.push({ text: text.slice(pos) });
  return out;
}
