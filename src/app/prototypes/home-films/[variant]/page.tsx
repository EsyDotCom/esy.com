import { notFound } from 'next/navigation';
import NewsletterHomePage from '@/components/NewsletterHome/NewsletterHomePage';
import { EduStudio, latestLesson, resolveDesks } from '@/components/EducationHero';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { getAllAgenticArticles } from '@/lib/published-articles';

// The real homepage, hero and all, with 03 Films presented one way or the
// other. Scroll to 03 (or jump with #work-films) to compare.

const BANDS: Record<string, 'poster' | 'strip'> = { poster: 'poster', strip: 'strip' };

const prototype = findPrototype('home-films')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Homepage films ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function HomeFilmsVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const band = BANDS[variant];
  if (!band) notFound();
  const articles = await getAllAgenticArticles();

  return (
    <>
      <NewsletterHomePage
        filmBand={band}
        hero={<EduStudio desks={resolveDesks(articles)} latest={latestLesson(articles)} phone="profile" />}
      />
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
