import { notFound } from "next/navigation";
import { getPublishedAgenticVideos } from "@/data/agentic-videos";
import { findAgenticArticle, getAllAgenticArticles } from "@/lib/published-articles";
import { loadTranscriptSegments } from "@/lib/transcript-loader";
import { transcriptToPlainText, toIsoDuration } from "@/lib/transcripts";
import { isArticleSlugShape, articlePath } from "@/lib/article-path";
import { coverFor, searchTitleFor } from "@/lib/article-format";
import { inSearch } from "@/lib/search-indexing";
import { previewArticle, readPreview, sectionPathFor } from "@/lib/preview";
import PreviewBar from "@/components/PreviewBar/PreviewBar";
import ImageArticlePage from "@/components/ArticleImage/ImageArticlePage";
import VideoArticlePage from "@/components/ArticleVideo/VideoArticlePage";
import type { Metadata } from "next";

// One article, at esy.com/articles/<slug>/ (it was /engineer/<slug>/ until 2026-10-09). The
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
// skip the article lookup entirely. A preview link (Draft Mode) shows the
// draft instead of the published copy (src/lib/preview.ts).
async function resolveArticle(slug: string) {
  if (!isArticleSlugShape(slug)) return undefined;
  const preview = await readPreview("article", slug);
  if (preview) return previewArticle(preview);
  return findAgenticArticle(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = await resolveArticle(slug);

  if (!video) return {};

  const url = `${BASE_URL}${articlePath(video.slug)}`;
  // Search results and link previews use the writer's search title (the
  // on-page <h1> keeps the article title).
  const shareTitle = searchTitleFor(video);
  // The article's own cover wins when Compose set one. Otherwise a video
  // article shares its first frame and an image-led one its thumbnail.
  const ogImage =
    coverFor(video)?.src ??
    (video.muxPlaybackId
      ? `https://image.mux.com/${video.muxPlaybackId}/thumbnail.jpg?time=0`
      : video.thumbnailUrl || undefined);

  return {
    title: `${shareTitle} — The Marketing Engineer`,
    description: video.description.slice(0, 160),
    alternates: {
      canonical: url,
    },
    // Live but kept out of search when Esy says noindex; a preview always is.
    ...(inSearch(video) ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title: shareTitle,
      description: video.description.slice(0, 160),
      type: video.muxPlaybackId ? "video.other" : "article",
      url,
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: shareTitle,
      description: video.description.slice(0, 160),
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function AgenticVideoPage({ params }: Props) {
  const { slug } = await params;
  const video = await resolveArticle(slug);

  if (!video) notFound();

  // Related articles resolve against the merged list so API and registry
  // articles can cross-reference each other. A previewed draft joins it.
  const published = await getAllAgenticArticles();
  const isPreview = Boolean(await readPreview("article", slug));
  const all = isPreview ? [video, ...published.filter((v) => v.slug !== video.slug)] : published;
  const bar = isPreview ? <PreviewBar exitTo={sectionPathFor("article")} /> : null;

  // No video: the image-led article page (E · Cover Bar), described to search
  // engines as an Article rather than a VideoObject.
  if (!video.muxPlaybackId) {
    const articleLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: video.title,
      description: video.description,
      // Same image the page leads with: the cover, else the thumbnail.
      image: coverFor(video)?.src ?? (video.thumbnailUrl || undefined),
      datePublished: video.publishedAt,
      mainEntityOfPage: `${BASE_URL}${articlePath(video.slug)}`,
      author: { "@type": "Person", name: "Zev Uhuru", url: BASE_URL },
      publisher: { "@type": "Organization", name: "Esy", url: BASE_URL },
      keywords: video.tags.join(", "),
    };
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
        <ImageArticlePage article={video} all={all} />
        {bar}
      </>
    );
  }

  // A video: the framed video page (B · Theater).
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
      <VideoArticlePage article={video} all={all} segments={transcriptSegments} />
      {bar}
    </>
  );
}
