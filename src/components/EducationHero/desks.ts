/* The four desks of esy.com as an education site (2026-09-25): Build, Grow,
 * Operate, Learn. Every education hero reads from this one module, so the
 * three directions differ in layout and copy, never in what they promise.
 *
 * Membership is declared, not inferred: a published article joins a desk
 * when its slug is listed here. Everything under `upcoming` is a planned piece
 * from the editorial agenda, not a published one, and every hero labels it
 * "Coming up". SEOPage shows up only where the piece really is about finding
 * or building pages. The rule is not to force it into every piece. */

import type { AgenticVideo } from '@/data/agentic-videos';
import { articlePath } from '@/lib/article-path';
import { formatDate, formatMinutes } from '@/lib/article-format';

export type DeskKey = 'build' | 'grow' | 'operate' | 'learn';

export interface Desk {
  key: DeskKey;
  name: string;
  /** What the desk teaches, in one plain sentence. */
  line: string;
  /** The subjects it covers, shown as chips. */
  subjects: string[];
  /** Published articles on this desk, by slug, newest first once resolved. */
  articleSlugs: string[];
  /** Planned pieces, in the order they're likely to ship. */
  upcoming: string[];
}

export const DESKS: Desk[] = [
  {
    key: 'build',
    name: 'Build',
    line: 'Agents, AI coding tools, and the integrations that connect them.',
    subjects: ['Claude Code', 'Cursor', 'Clay', 'n8n', 'Marketing agents'],
    articleSlugs: ['building-multi-agent-workflows-claude-code', 'cursor-workflow-patterns-production'],
    upcoming: ['Connect Claude to Clay for enrichment', 'Build a marketing agent that drafts from your CRM'],
  },
  {
    key: 'grow',
    name: 'Grow',
    line: 'SEO, content, and acquisition systems that compound.',
    subjects: ['SEO', 'AI search', 'Landing pages', 'Content systems'],
    articleSlugs: [],
    upcoming: [
      'Find the pages worth building from Search Console data',
      'How AI search decides which pages to cite',
      'Programmatic SEO without thin pages',
    ],
  },
  {
    key: 'operate',
    name: 'Operate',
    line: 'Running AI work every day: workflows, evals, analytics, cost.',
    subjects: ['Workflows', 'Evals', 'Analytics', 'Cost tracking'],
    articleSlugs: ['i-built-an-ai-worker', 'generate-clip-art-asset-walkthrough'],
    upcoming: ['Evals for marketing output: catch the slop before it ships'],
  },
  {
    key: 'learn',
    name: 'Learn',
    line: 'New models and tools, read closely and tried on real work.',
    subjects: ['Model releases', 'Tool reviews', 'Case studies', 'Experiments'],
    articleSlugs: ['claude-fable-5-first-impressions', 'chatgpt-images-2-vs-nano-banana-2'],
    upcoming: ['What each new model changes for marketing work'],
  },
];

/** One line in a desk's list: a published article, or a planned piece. */
export interface Lesson {
  title: string;
  published: boolean;
  href?: string;
  /** "Jun 9, 2026 · 15 min", for published articles. */
  meta?: string;
  video?: boolean;
}

export interface ResolvedDesk extends Desk {
  lessons: Lesson[];
  publishedCount: number;
}

/** Attach the live articles to their desks. Published pieces lead, newest first;
 *  planned ones follow. A listed slug the API no longer returns is dropped, so
 *  a hero never links to a missing article. */
export function resolveDesks(articles: AgenticVideo[]): ResolvedDesk[] {
  const bySlug = new Map(articles.map((a) => [a.slug, a]));
  return DESKS.map((desk) => {
    const published: Lesson[] = desk.articleSlugs
      .map((slug) => bySlug.get(slug))
      .filter((a): a is AgenticVideo => Boolean(a))
      .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
      .map((a) => ({
        title: a.title,
        published: true,
        href: articlePath(a.slug),
        meta: [formatDate(a.publishedAt), formatMinutes(a.durationSeconds)].filter(Boolean).join(' · '),
        video: Boolean(a.muxPlaybackId),
      }));
    const planned: Lesson[] = desk.upcoming.map((title) => ({ title, published: false }));
    return { ...desk, lessons: [...published, ...planned], publishedCount: published.length };
  });
}
