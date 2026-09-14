import { notFound } from "next/navigation";
import { getPublishedAgenticVideos } from "@/data/agentic-videos";
import {
  findAgenticArticle,
  getAllAgenticArticles,
  relatedFrom,
} from "@/lib/published-articles";
import { loadTranscriptSegments } from "@/lib/transcript-loader";
import { transcriptToPlainText, toIsoDuration } from "@/lib/transcripts";
import { isArticleSlugShape, articlePath } from "@/lib/article-path";
import { shadowedArticleSlugs } from "@/lib/article-slugs";
import AgenticVideoPageClient from "./client";
import type { Metadata } from "next";

// One article of The Marketing Engineer, at the site root: esy.com/<slug>/.
// (Moved from /engineer/<slug>/ on 2026-09-13; those URLs 301 here.)
//
// This route only catches single-segment paths that no static route claims —
// Next.js always tries /about, /docs, /workflows… first — so it also sees every
// mistyped top-level URL. Those resolve to a 404 via one cached list lookup.

type Props = {
  params: Promise<{ slug: string }>;
};

const BASE_URL = "https://esy.com";

// Registry slugs prerender at build; Compose-published slugs render on demand
// (dynamicParams). Freshness is driven by the publish/unpublish webhook (tag +
// path revalidation); this 1-hour revalidate is only a backstop.
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = getPublishedAgenticVideos().map((v) => v.slug);

  // Build-time guard: an article whose slug matches a top-level route can
  // never be reached (the static route wins), so say so loudly rather than let
  // it vanish. Checked against the merged list so API-published articles count.
  const allSlugs = (await getAllAgenticArticles()).map((v) => v.slug);
  const shadowed = shadowedArticleSlugs(allSlugs);
  if (shadowed.length > 0) {
    console.warn(
      `[articles] ${shadowed.length} article slug(s) collide with a top-level route and are unreachable: ${shadowed.join(", ")}. Rename the slug in Compose.`,
    );
  }

  return slugs.filter((slug) => !shadowed.includes(slug)).map((slug) => ({ slug }));
}

// Junk-shaped paths (file probes, uppercase, dots) can't be articles, so they
// skip the article lookup entirely.
async function resolveArticle(slug: string) {
  if (!isArticleSlugShape(slug)) return undefined;
  return findAgenticArticle(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = await resolveArticle(slug);

  if (!video) return {};

  const url = `${BASE_URL}${articlePath(video.slug)}`;
  const ogImage = video.muxPlaybackId
    ? `https://image.mux.com/${video.muxPlaybackId}/thumbnail.jpg?time=0`
    : undefined;

  return {
    title: `${video.title} — The Marketing Engineer`,
    description: video.description.slice(0, 160),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: video.title,
      description: video.description.slice(0, 160),
      type: "video.other",
      url,
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: video.title,
      description: video.description.slice(0, 160),
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function AgenticVideoPage({ params }: Props) {
  const { slug } = await params;
  const video = await resolveArticle(slug);

  if (!video) notFound();

  // Related resolves against the merged list so API and registry articles
  // can cross-reference each other.
  const related = relatedFrom(await getAllAgenticArticles(), video.slug, video.relatedSlugs);
  // Build-time SRT load — segments ship in the static HTML for SEO and power
  // the click-to-seek transcript UI. Null when no SRT exists for the slug.
  const transcriptSegments = loadTranscriptSegments(video.slug);

  // VideoObject structured data — makes the page eligible for video rich
  // results and attaches the full transcript text to the video entity.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: video.muxPlaybackId
      ? `https://image.mux.com/${video.muxPlaybackId}/thumbnail.jpg?time=0`
      : undefined,
    uploadDate: video.publishedAt,
    duration: toIsoDuration(video.durationSeconds),
    contentUrl: video.muxPlaybackId
      ? `https://stream.mux.com/${video.muxPlaybackId}.m3u8`
      : undefined,
    embedUrl: `${BASE_URL}${articlePath(video.slug)}`,
    transcript: transcriptSegments
      ? transcriptToPlainText(transcriptSegments)
      : undefined,
    author: {
      "@type": "Person",
      name: "Zev Uhuru",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Esy",
      url: BASE_URL,
    },
    keywords: video.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AgenticVideoPageClient
        video={video}
        related={related}
        transcriptSegments={transcriptSegments}
      />
    </>
  );
}
