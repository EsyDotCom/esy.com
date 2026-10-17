import 'server-only';
import { cache } from 'react';
import { ISSUES, type Issue, type IssueSection } from '@/components/NewsletterPage/issues';
import { getNews } from '@/lib/published-news';
import { fetchPublicListSafe } from '@/lib/published-articles';

// The Marketing Engineer's issues = the registry in git
// (src/components/NewsletterPage/issues.ts) + issues published from Compose
// through api.esy.com, read the way articles and AI Marketing News are
// (src/lib/published-articles.ts): same timeout, retry and build/dev
// fallback, and in production a failed read throws so ISR keeps the last
// good page.
//
// The registry wins a slug clash while the issues move to Compose (the news
// precedent): an issue imported into Esy shows the registry's copy until its
// registry entry is removed.
//
// Freshness is event-driven: publishing an issue in Compose fires the signed
// revalidate webhook (src/app/api/revalidate/route.ts), which purges the
// `published-issues` tag and the /newsletter pages within about a second.

/** The publication the newsletter's issues are filed in on api.esy.com. */
export const NEWSLETTER_PUBLICATION = 'engineer';

/** One published issue as GET /v1/publications/public/engineer/issues returns it. */
export interface PublicIssue {
  number: number;
  slug: string;
  /** YYYY-MM-DD, the send date. */
  date: string;
  title: string;
  dek: string;
  topic: string;
  minutes: number;
  cover: string | null;
  coverAlt: string;
  coverCaption: string;
  sample: string | null;
  /** esy.com's own IssueSection objects, with the drafting blanks dropped. */
  parts: IssueSection[];
  /** ISO 8601 with offset. */
  publishedAt: string;
  updatedAt: string;
  /** "noindex": live, but out of search and the sitemap (api.esy.com #589). */
  searchIndexing?: 'index' | 'noindex';
}

/** A news post an issue links, for the "This week in AI marketing" part. */
export interface IssueNewsLink {
  headline: string;
  topic: string;
}

// The API's issue onto the registry's Issue, so every page renders both the
// same way. Optional keys only when they say something, as the registry writes them.
// Exported for the preview route (src/lib/preview.ts).
export function toIssue(p: PublicIssue): Issue {
  return {
    n: p.number,
    slug: p.slug,
    date: p.date,
    title: p.title,
    dek: p.dek,
    topic: p.topic,
    minutes: p.minutes,
    ...(p.cover ? { cover: p.cover } : {}),
    ...(p.coverAlt ? { coverAlt: p.coverAlt } : {}),
    ...(p.coverCaption ? { coverCaption: p.coverCaption } : {}),
    ...(p.sample ? { sample: p.sample } : {}),
    body: p.parts ?? [],
    // Written in Compose and published through Esy: a real issue, so its page
    // shows its date, and it's in search unless Esy says noindex
    // (issueInSearch in src/lib/search-indexing.ts).
    real: true,
    ...(p.searchIndexing === 'noindex' ? { searchIndexing: 'noindex' as const } : {}),
  };
}

/**
 * Every issue the site shows, newest number first: the registry's, then those
 * published from Compose. Cached per request, so a page, its metadata and the
 * static params share one read.
 */
export const getIssues = cache(async (): Promise<Issue[]> => {
  const api = await fetchPublicListSafe<PublicIssue>({
    path: `/v1/publications/public/${NEWSLETTER_PUBLICATION}/issues`,
    tags: ['published-issues', `published-issues:${NEWSLETTER_PUBLICATION}`],
    source: 'published-issues',
    name: NEWSLETTER_PUBLICATION,
  });

  // An issue needs a slug and a number to have a page and a place in the list.
  const usable = api.filter((p) => {
    if (p?.slug && Number.isInteger(p.number) && p.number > 0) return true;
    console.warn('[published-issues] skipping an issue with no slug or number.', p?.slug);
    return false;
  });

  // Registry wins a slug clash during the migration; a number the registry
  // already uses is skipped too, so "No. 5" never means two issues.
  const slugs = new Set(ISSUES.map((i) => i.slug));
  const numbers = new Set(ISSUES.map((i) => i.n));
  const fromApi: Issue[] = [];
  for (const p of usable) {
    if (slugs.has(p.slug)) continue;
    if (numbers.has(p.number)) {
      console.warn(`[published-issues] skipping "${p.slug}": No. ${p.number} is already a registry issue.`);
      continue;
    }
    slugs.add(p.slug);
    numbers.add(p.number);
    fromApi.push(toIssue(p));
  }
  return [...ISSUES, ...fromApi].sort((a, b) => b.n - a.n);
});

export async function findIssueBySlug(slug: string): Promise<Issue | undefined> {
  return (await getIssues()).find((i) => i.slug === slug);
}

/**
 * The headline and topic of every news post the issues link, from the merged
 * news (registry + Compose), so an issue written in Compose can link a post
 * that was itself published from Compose. Keyed by post slug.
 */
export const getIssueNews = cache(async (issues: Issue[]): Promise<Record<string, IssueNewsLink>> => {
  const wanted = new Set(issues.flatMap((i) => i.body.flatMap((s) => (s.kind === 'news' ? s.slugs : []))));
  if (!wanted.size) return {};
  const { posts } = await getNews();
  const out: Record<string, IssueNewsLink> = {};
  for (const p of posts) if (wanted.has(p.slug)) out[p.slug] = { headline: p.headline, topic: p.topic };
  return out;
});
