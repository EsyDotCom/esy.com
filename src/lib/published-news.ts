import 'server-only';
import { cache } from 'react';
import {
  NEWS_POSTS,
  NEWS_STORIES,
  newestFirst,
  publishedPosts,
  type NewsData,
  type NewsPost,
  type NewsSource,
  type NewsStory,
  type NewsTopic,
} from '@/data/news';
import { fetchPublicListSafe, mergeBySlug } from '@/lib/published-articles';

// AI Marketing News = the static registry (src/data/news/index.ts) + posts
// published from Compose through api.esy.com, merged the way articles are
// (src/lib/published-articles.ts): same timeout, retry and build/dev fallback,
// and in production a failed read throws so ISR keeps the last good page.
//
// Freshness is event-driven: publishing or unpublishing a post in Compose
// fires the signed revalidate webhook (src/app/api/revalidate/route.ts), which
// purges the `published-news` tags and the /news pages within about a second.
// The hourly revalidate inside fetchPublicListSafe is only a backstop.

/** One published post as GET /v1/publications/public/news/posts returns it. */
export interface PublicNewsPost {
  slug: string;
  headline: string;
  dek: string;
  story: { slug: string; name: string; line: string; company: string };
  chapter: string;
  topic: NewsTopic;
  why: string;
  body: string[];
  check: string[];
  facts: [string, string][];
  faq: [string, string][];
  sources: { publisher: string; title: string; url: string; date: string; supports: string; secondary: boolean; note: string }[];
  card: { title: string; facts: string[] };
  /** YYYY-MM-DD or YYYY-MM. */
  eventDate: string;
  /** ISO 8601 with offset. */
  publishedAt: string;
  /** ISO 8601 with offset. */
  updatedAt: string;
  /** 'written' in a Compose session (Zev); 'drafted' through an API key (AI agents). */
  origin: 'written' | 'drafted';
  readMinutes: number;
  /** Zev's take: markdown subset (paragraphs, links, bold, italic). */
  take: string;
  /** Every URL linked in the take, in order, once each. */
  takeLinks: string[];
  /** Not used yet: the byline stays "By Zev Uhuru" for now. */
  author: { name: string; role: string; avatar: string } | null;
}

// Map the API's post onto the registry's NewsPost so every page renders both
// the same way. Sources match registry style: `note` only when it says
// something, `secondary` only when true.
function toNewsPost(p: PublicNewsPost): NewsPost {
  const sources: NewsSource[] = (p.sources ?? []).map(({ note, secondary, ...rest }) => ({
    ...rest,
    ...(secondary ? { secondary: true } : {}),
    ...(note ? { note } : {}),
  }));
  return {
    slug: p.slug,
    status: 'published',
    story: p.story.slug,
    chapter: p.chapter,
    topic: p.topic,
    headline: p.headline,
    dek: p.dek,
    why: p.why,
    body: p.body ?? [],
    check: p.check ?? [],
    facts: p.facts ?? [],
    faq: p.faq ?? [],
    sources,
    card: p.card,
    eventDate: p.eventDate,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    // Esy records how the post was made; the Sources note on the post says it.
    writtenBy: p.origin === 'written' ? 'zev' : 'agents',
    readMinutes: p.readMinutes,
    ...(p.take ? { take: p.take, takeLinks: p.takeLinks ?? [] } : {}),
  };
}

// A story the registry doesn't know yet, from the API post's story fields.
// No logo: logos are added by hand once a company's terms allow it.
const toNewsStory = (s: PublicNewsPost['story']): NewsStory => ({
  slug: s.slug,
  name: s.name,
  line: s.line,
  company: { name: s.company },
});

/**
 * The news the site shows: the registry's published posts plus those published
 * from Compose, newest first, and every story they belong to. Cached per
 * request, so a page, its metadata and its JSON-LD share one read.
 */
export const getNews = cache(async (): Promise<NewsData> => {
  const api = await fetchPublicListSafe<PublicNewsPost>({
    path: '/v1/publications/public/news/posts',
    tags: ['published-news', 'published-news:news'],
    source: 'published-news',
    name: 'news',
  });

  // A post without a slug or a story can't be placed on /news/<slug>/.
  const usable = api.filter((p) => {
    if (p?.slug && p.story?.slug) return true;
    console.warn('[published-news] skipping a post with no slug or story slug.', p?.slug);
    return false;
  });
  // Each post's story fields, by post slug (the first wins, as in mergeBySlug).
  const apiStoryOf = new Map<string, PublicNewsPost['story']>();
  for (const p of usable) if (!apiStoryOf.has(p.slug)) apiStoryOf.set(p.slug, p.story);

  // Registry wins a slug clash during the migration (mergeBySlug), so an API
  // post the registry shadows never contributes a story either.
  const registry = publishedPosts();
  const fromRegistry = new Set(registry);
  const merged = mergeBySlug(registry, usable.map(toNewsPost));
  const fromApi = merged.filter((p) => !fromRegistry.has(p)).sort(newestFirst);

  // Posts and stories share /news/<slug>/ (the registry's load-time clash rule).
  // An API post is skipped when its slug is a story's, or its story's slug is a
  // post's; registry drafts count, so publishing one later can't collide.
  const registryStorySlugs = new Set(NEWS_STORIES.map((s) => s.slug));
  const storySlugs = new Set([...registryStorySlugs, ...fromApi.map((p) => p.story)]);
  const postSlugs = new Set([...NEWS_POSTS.map((p) => p.slug), ...fromApi.map((p) => p.slug)]);
  const kept = fromApi.filter((p) => {
    if (storySlugs.has(p.slug)) {
      console.warn(`[published-news] skipping "${p.slug}": it's also a story's slug.`);
      return false;
    }
    if (postSlugs.has(p.story)) {
      console.warn(`[published-news] skipping "${p.slug}": its story "${p.story}" is also a post's slug.`);
      return false;
    }
    return true;
  });

  // Stories the registry doesn't have. `kept` is newest first, so the first
  // post seen for a story slug is the newest, and its story fields win.
  const apiStories = new Map<string, NewsStory>();
  for (const p of kept) {
    if (registryStorySlugs.has(p.story) || apiStories.has(p.story)) continue;
    apiStories.set(p.story, toNewsStory(apiStoryOf.get(p.slug)!));
  }

  const keptSet = new Set(kept);
  return {
    posts: merged.filter((p) => fromRegistry.has(p) || keptSet.has(p)).sort(newestFirst),
    stories: [...NEWS_STORIES, ...apiStories.values()],
  };
});
