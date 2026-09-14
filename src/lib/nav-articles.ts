import type { AgenticVideo } from "@/data/agentic-videos";

// Rows for the header's Articles dropdown: the newest few articles, trimmed to
// what a nav panel shows. Pure, so server pages can pass real published lists
// in and the client header can fall back to the static registry.

export interface NavArticle {
  slug: string;
  title: string;
  categoryLabel: string;
  /** Rounded runtime, or null when the article has no video length. */
  minutes: number | null;
  /** An explicit still, else a small Mux poster frame, else "". */
  thumb: string;
}

type Source = Pick<
  AgenticVideo,
  "slug" | "title" | "categoryLabel" | "publishedAt" | "durationSeconds" | "thumbnailUrl" | "muxPlaybackId"
>;

export function toNavArticles(articles: Source[], count = 3): NavArticle[] {
  return [...articles]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, count)
    .map((a) => ({
      slug: a.slug,
      title: a.title,
      categoryLabel: a.categoryLabel,
      minutes: a.durationSeconds > 0 ? Math.max(1, Math.round(a.durationSeconds / 60)) : null,
      thumb:
        a.thumbnailUrl ||
        (a.muxPlaybackId
          ? `https://image.mux.com/${a.muxPlaybackId}/thumbnail.jpg?time=0&width=320`
          : ""),
    }));
}
