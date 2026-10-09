import type { AgenticVideo } from "@/data/agentic-videos";

// Display helpers shared by every list of articles (the homepage and the topic
// hubs), so a date or a thumbnail never renders two different ways.

/** An explicit still if the article has one, then its Compose cover, otherwise
    the first Mux frame. The cover keeps a cover-only article from showing no
    image in lists. */
export function thumbnailFor(
  article: Pick<AgenticVideo, "thumbnailUrl" | "muxPlaybackId" | "coverImageUrl">,
): string | null {
  if (article.thumbnailUrl) return article.thumbnailUrl;
  if (article.coverImageUrl) return article.coverImageUrl;
  return article.muxPlaybackId
    ? `https://image.mux.com/${article.muxPlaybackId}/thumbnail.jpg?time=0`
    : null;
}

// The Compose fields (dek, cover, search title) are optional: registry entries
// and pre-#566 API responses lack them, and Compose sends "" for an empty dek.
// Each helper falls back to what the pages showed before those fields existed.

/** The subtitle under the title: the dek when the writer set one, else the summary. */
export function dekFor(article: Pick<AgenticVideo, "dek" | "description">): string {
  return article.dek?.trim() || article.description;
}

/** The title search results and link previews show: the search title, else the title. */
export function searchTitleFor(article: Pick<AgenticVideo, "searchTitle" | "title">): string {
  return article.searchTitle?.trim() || article.title;
}

/** The article's own cover, or null when it has none (callers keep their old image). */
export function coverFor(
  article: Pick<AgenticVideo, "coverImageUrl" | "coverImageAlt">,
): { src: string; alt: string } | null {
  if (!article.coverImageUrl) return null;
  return { src: article.coverImageUrl, alt: article.coverImageAlt ?? "" };
}

/** Date-only strings format in UTC so they don't render a day early behind UTC. */
export function formatDate(iso: string): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatMinutes(seconds: number): string | null {
  return seconds > 0 ? `${Math.max(1, Math.round(seconds / 60))} min` : null;
}
