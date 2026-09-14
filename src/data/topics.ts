import type { AgenticVideo } from "@/data/agentic-videos";

// The Marketing Engineer's topic hubs: a fixed list of subjects, each a page at
// /topics/<slug>/ that gathers every article on it. Topics are the archive and
// the SEO spine: an article can sit in several, and moving it between topics
// never changes its URL (that lives at /engineer/<slug>/).
//
// Membership is declared, not inferred: an article joins a topic when its
// category or one of its tags matches, or when its slug is listed. `slugs`
// covers articles published before they carried a matching category (the two
// Compose articles filed under "latest"); prefer categories and tags going
// forward.

export interface Topic {
  slug: string;
  name: string;
  /** One paragraph: what the subject is and why a marketer should care. */
  description: string;
  categories: string[];
  tags: string[];
  slugs: string[];
  /** Pinned "Start here" articles, in order. Falls back to the newest. */
  startHere?: string[];
  /** Related topic slugs, shown at the foot of the page. */
  related: string[];
}

export const TOPICS: Topic[] = [
  {
    slug: "agentic-workflows",
    name: "Agentic Workflows",
    description:
      "Workflows where AI agents do the production work (generating, checking, and publishing marketing assets on a schedule) while a person approves what ships. How they're built, what breaks, and what they cost to run.",
    categories: ["workflows"],
    tags: ["agentic-workflows", "multi-agent", "workflow-template"],
    slugs: ["create-clipart-theme-pack-demo", "i-built-an-ai-worker"],
    related: ["ai-coding-tools", "ai-image-generation"],
  },
  {
    slug: "ai-models",
    name: "AI Models",
    description:
      "New frontier model releases, read closely on launch day and then put to work: what changed, what it costs, and where each model fits in a real production workflow.",
    categories: ["models"],
    tags: ["frontier-models", "model-research"],
    slugs: [],
    related: ["ai-image-generation", "agentic-workflows"],
  },
  {
    slug: "ai-image-generation",
    name: "AI Image Generation",
    description:
      "Making marketing and catalog images with AI at volume: which model to use for what, how to keep quality consistent across a set, and the post-processing that makes the output shippable.",
    categories: [],
    tags: ["image-generation", "clip-art", "clipart"],
    slugs: [],
    related: ["ai-models", "agentic-workflows"],
  },
  {
    slug: "ai-coding-tools",
    name: "AI Coding Tools",
    description:
      "Claude Code, Cursor, and the other tools used to build marketing systems: the setups, the prompts, and the patterns that hold up once they're running in production.",
    categories: ["ai-tools"],
    tags: ["claude-code", "cursor", "ai-coding"],
    slugs: [],
    related: ["agentic-workflows", "ai-models"],
  },
];

/** Canonical path for a topic hub. */
export function topicHref(slug: string): string {
  return `/topics/${slug}/`;
}

export function findTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

type ArticleLike = Pick<AgenticVideo, "slug" | "category" | "tags">;

function matchesCategory(article: ArticleLike, topic: Topic): boolean {
  return topic.categories.includes(article.category);
}

// Tags from Compose are free-form, so compare case-insensitively.
function matchesTagOrSlug(article: ArticleLike, topic: Topic): boolean {
  const tags = (article.tags ?? []).map((t) => t.toLowerCase());
  return (
    topic.slugs.includes(article.slug) ||
    topic.tags.some((t) => tags.includes(t.toLowerCase()))
  );
}

export function articleInTopic(article: ArticleLike, topic: Topic): boolean {
  return matchesCategory(article, topic) || matchesTagOrSlug(article, topic);
}

/** Every article in a topic, newest first. */
export function articlesForTopic<T extends ArticleLike & { publishedAt: string }>(
  articles: T[],
  topic: Topic,
): T[] {
  return articles
    .filter((a) => articleInTopic(a, topic))
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

/**
 * The topics an article belongs to, primary first: a category match outranks
 * a tag or slug match, so the breadcrumb names the subject the article was
 * filed under rather than one it merely mentions.
 */
export function topicsForArticle(article: ArticleLike): Topic[] {
  const byCategory = TOPICS.filter((t) => matchesCategory(article, t));
  const byOther = TOPICS.filter(
    (t) => !byCategory.includes(t) && matchesTagOrSlug(article, t),
  );
  return [...byCategory, ...byOther];
}
