import { notFound } from 'next/navigation';
import NewsletterHomePage from '@/components/NewsletterHome/NewsletterHomePage';
import type { ClipArtVisual } from '@/components/NewsletterHome/ClipArtVisuals';
import { EduStudio, latestLesson, resolveDesks } from '@/components/EducationHero';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { getAllAgenticArticles } from '@/lib/published-articles';

// The real homepage with the clip.art case study's visual swapped. Jump to it
// with #work-apps and scroll to the navy clip.art band.

const VISUALS: Record<string, ClipArtVisual> = { grid: 'grid', replay: 'replay', styles: 'styles' };

const prototype = findPrototype('home-clipart')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Homepage clip.art ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function HomeClipArtVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const visual = VISUALS[variant];
  if (!visual) notFound();
  const articles = await getAllAgenticArticles();

  return (
    <>
      <NewsletterHomePage
        clipartVisual={visual}
        hero={<EduStudio desks={resolveDesks(articles)} latest={latestLesson(articles)} phone="profile" />}
      />
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
