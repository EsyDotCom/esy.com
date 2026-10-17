import 'server-only';
import { cache } from 'react';
import { cookies, draftMode } from 'next/headers';
import type { AgenticVideo } from '@/data/agentic-videos';
import { postPath, type NewsPost, type NewsStory } from '@/data/news';
import type { Issue } from '@/components/NewsletterPage/issues';
import { articlePath } from '@/lib/article-path';
import { toIssue, type PublicIssue } from '@/lib/published-issues';
import { toNewsPost, toNewsStory, type PublicNewsPost } from '@/lib/published-news';

// Preview links (api.esy.com #589): Compose makes a private, expiring link to
// a draft, and it opens here as the piece's real page before it's published.
//
//   1. /api/preview?token=… checks the token with GET /v1/public/preview/{token},
//      turns on Next's Draft Mode, keeps the token in an httpOnly cookie, and
//      sends the reader to the piece's page.
//   2. That page, seeing Draft Mode, reads the draft again (never cached) and
//      renders it instead of the published copy, under a "Preview: not
//      published" bar, with a noindex robots tag.
//
// Esy owns the draft (API-001); this file only reads and shows it.

const API_URL = process.env.ESY_API_URL ?? 'https://api.esy.com';

/** The httpOnly cookie that holds the preview token while Draft Mode is on. */
export const PREVIEW_COOKIE = 'esy_preview';

export type PreviewKind = 'article' | 'news-post' | 'issue';

/** GET /v1/public/preview/{token}: the kind's public shape, plus these. */
export type PreviewPayload = {
  kind: PreviewKind;
  slug: string;
  status: string;
  publication: string;
  path: string;
  preview: true;
} & Record<string, unknown>;

export type PreviewRead =
  | { ok: true; payload: PreviewPayload }
  /** 404: no such link. 410: expired, revoked, or the piece can't be shown any more. */
  | { ok: false; status: number };

/** Read a preview from Esy. Never cached: a draft changes between reads, and it's private. */
export async function fetchPreview(token: string): Promise<PreviewRead> {
  try {
    const res = await fetch(`${API_URL}/v1/public/preview/${encodeURIComponent(token)}`, { cache: 'no-store' });
    if (!res.ok) return { ok: false, status: res.status };
    const payload = (await res.json()) as PreviewPayload;
    if (!payload?.preview || !payload.slug || !isPreviewKind(payload.kind)) return { ok: false, status: 410 };
    return { ok: true, payload };
  } catch {
    // The API is unreachable: say the link can't be opened rather than throw.
    return { ok: false, status: 503 };
  }
}

const isPreviewKind = (k: unknown): k is PreviewKind => k === 'article' || k === 'news-post' || k === 'issue';

/** The page a piece renders on, decided by esy.com from its kind and slug. The
    link's `path` comes from the API's section path, which doesn't always match
    esy.com's routes, so it's never followed: that also means the preview route
    can only ever send someone to one of these three pages on this site. */
export function pagePathFor(kind: PreviewKind, slug: string): string {
  if (kind === 'article') return articlePath(slug);
  if (kind === 'news-post') return postPath(slug);
  return `/newsletter/${slug}/`;
}

/** Where "Exit preview" goes: the section's own list, since the piece may not be live yet. */
export function sectionPathFor(kind: PreviewKind): string {
  if (kind === 'article') return '/topics/';
  if (kind === 'news-post') return '/news/';
  return '/newsletter/';
}

// Relative paths the exit route may send someone back to: same site, one of
// the previewable sections or the homepage. Anything else goes home.
const EXIT_PATH = /^\/(?:(?:articles|news|newsletter|topics)\/(?:[a-z0-9-]+\/)?)?$/;
export const isSafeExitPath = (path: string | null): path is string => Boolean(path && EXIT_PATH.test(path));

/** The draft for this page, when Draft Mode is on and the cookie's link is for
    this kind and slug; otherwise null and the page renders as usual. One read
    per request (metadata and page share it). */
export const readPreview = cache(async (kind: PreviewKind, slug: string): Promise<PreviewPayload | null> => {
  if (!(await draftMode()).isEnabled) return null;
  const token = (await cookies()).get(PREVIEW_COOKIE)?.value;
  if (!token) return null;
  const read = await fetchPreview(token);
  if (!('payload' in read) || read.payload.kind !== kind || read.payload.slug !== slug) return null;
  return read.payload;
});

// The draft in each page's own shape, so the page renders it like any piece.

export function previewArticle(p: PreviewPayload): AgenticVideo {
  // The public article shape is the registry's shape (src/lib/published-articles.ts).
  return { ...(p as unknown as AgenticVideo), searchIndexing: 'noindex' };
}

export function previewNewsPost(p: PreviewPayload): { post: NewsPost; story: NewsStory } {
  const api = p as unknown as PublicNewsPost;
  return { post: { ...toNewsPost(api), searchIndexing: 'noindex' }, story: toNewsStory(api.story) };
}

export function previewIssue(p: PreviewPayload): Issue {
  return { ...toIssue(p as unknown as PublicIssue), searchIndexing: 'noindex' };
}
