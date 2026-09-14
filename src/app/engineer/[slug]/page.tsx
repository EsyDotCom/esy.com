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
import { toNavArticles } from "@/lib/nav-articles";
import AgenticVideoPageClient from "./client";
import type { Metadata } from "next";

// One article of The Marketing Engineer, at esy.com/engineer/<slug>/. The
// homepage is the publication's front page; the namespace keeps articles out
// of the site root. (Root URLs from the brief 2026-09-14 move 308 here via
// src/app/[slug].)

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
  return getPublishedAgenticVideos().map((v) => ({ slug: v.slug }));
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
  const all = await getAllAgenticArticles();
  const related = relatedFrom(all, video.slug, video.relatedSlugs);
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
        latest={toNavArticles(all)}
      />
    </>
  );
}
