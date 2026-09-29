import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import LessonTheater from '@/components/LessonPage/LessonTheater';
import LessonStudio from '@/components/LessonPage/LessonStudio';
import LessonMat from '@/components/LessonPage/LessonMat';
import type { LessonPageProps, SampleVideo } from '@/components/LessonPage/shared';
import { getLesson } from '@/lib/learn/mockData';
import { toNavArticles } from '@/lib/nav-articles';
import { findAgenticArticle, getAllAgenticArticles } from '@/lib/published-articles';
import { loadTranscriptSegments } from '@/lib/transcript-loader';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/ArticleImage/ArticleImage.css';
import '@/components/ArticleVideo/ArticleVideo.css';
import '@/components/LessonPage/LessonPage.css';

// One lesson page direction, in the real site chrome and the publication's
// `.nl` scope. The lesson is the real first lesson of the Claude Code course
// (title, part, notes, neighbours). Its own video is a placeholder clip, so the
// player shows a real published Esy video with a timestamped transcript,
// labelled on the page as a sample.

const COURSE_SLUG = 'how-to-use-claude-code';
const LESSON_SLUG = 'introduction-and-setup';
// The only published video with a timestamped (SRT) transcript today.
const SAMPLE_VIDEO_SLUG = 'claude-fable-5-first-impressions';

const LAYOUTS: Record<string, React.ComponentType<LessonPageProps>> = {
  theater: LessonTheater,
  studio: LessonStudio,
  mat: LessonMat,
};

const prototype = findPrototype('lesson')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Lesson page ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function LessonVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Layout = LAYOUTS[variant];
  const found = getLesson(COURSE_SLUG, LESSON_SLUG);
  const sample = await findAgenticArticle(SAMPLE_VIDEO_SLUG);
  if (!Layout || !found || !sample?.muxPlaybackId) notFound();

  const video: SampleVideo = {
    slug: sample.slug,
    playbackId: sample.muxPlaybackId,
    title: sample.title,
    thumbnailUrl: sample.thumbnailUrl,
    durationSeconds: sample.durationSeconds,
    segments: loadTranscriptSegments(sample.slug),
  };
  const all = await getAllAgenticArticles();

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(all)} />
      <Layout course={found.course} lesson={found.lesson} chapterTitle={found.chapter} video={video} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
