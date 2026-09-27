import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { buildImageArticle } from '@/components/ArticleImage/build';
import { VideoMat, VideoStudio, VideoTheater, type VideoArticle } from '@/components/ArticleVideo';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { toNavArticles } from '@/lib/nav-articles';
import { findAgenticArticle, getAllAgenticArticles } from '@/lib/published-articles';
import { loadTranscriptSegments } from '@/lib/transcript-loader';

// One framed-video article direction, in the real site chrome. The article is
// a real published one with its own video and the repo's timestamped
// transcript (src/data/transcripts), played through the site's own player, so
// the frame is judged around the real thing. Rendered in the publication's
// `.nl` scope, like the image-led article.

const ARTICLE_SLUG = 'claude-fable-5-first-impressions';

const LAYOUTS: Record<string, React.ComponentType<VideoArticle>> = {
  studio: VideoStudio,
  theater: VideoTheater,
  mat: VideoMat,
};

const prototype = findPrototype('article-video')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Video article ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function VideoArticleVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Layout = LAYOUTS[variant];
  const article = await findAgenticArticle(ARTICLE_SLUG);
  if (!Layout || !article) notFound();

  // The same builder the image-led route uses, plus the transcript the live
  // video page loads for this slug.
  const all = await getAllAgenticArticles();
  const props: VideoArticle = {
    ...buildImageArticle(article, all, null),
    segments: loadTranscriptSegments(article.slug),
  };

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(all)} />
      <Layout {...props} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
