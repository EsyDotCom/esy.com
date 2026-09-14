import type { AgenticVideo } from "@/data/agentic-videos";

// Display helpers shared by every list of articles (the homepage and the topic
// hubs), so a date or a thumbnail never renders two different ways.

/** An explicit still if the article has one, otherwise the first Mux frame. */
export function thumbnailFor(article: Pick<AgenticVideo, "thumbnailUrl" | "muxPlaybackId">): string | null {
  if (article.thumbnailUrl) return article.thumbnailUrl;
  return article.muxPlaybackId
    ? `https://image.mux.com/${article.muxPlaybackId}/thumbnail.jpg?time=0`
    : null;
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
