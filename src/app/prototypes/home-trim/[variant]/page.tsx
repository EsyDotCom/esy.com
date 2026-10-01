import { notFound } from 'next/navigation';
import NewsletterHomePage from '@/components/NewsletterHome/NewsletterHomePage';
import type { AppsLayout } from '@/components/NewsletterHome/AppsShowcase';
import { EduStudio, latestLesson, resolveDesks } from '@/components/EducationHero';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { getAllAgenticArticles } from '@/lib/published-articles';

// The real homepage, shortened: 01 Apps merged into one band (tabs, rail or
// tour) and AI News's headlines beside Latest. Compose is in, with the
// stencil mark, as on the homepage in PR #167.

const LAYOUTS: Record<string, AppsLayout> = { tabs: 'tabs', rail: 'rail', tour: 'tour' };

const prototype = findPrototype('home-trim')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Homepage trim ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function HomeTrimVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const layout = LAYOUTS[variant];
  if (!layout) notFound();
  const articles = await getAllAgenticArticles();

  return (
    <>
      <NewsletterHomePage
        compose={{ mark: 'stencil', band: 'replay' }}
        appsLayout={layout}
        newsColumn
        hero={<EduStudio desks={resolveDesks(articles)} latest={latestLesson(articles)} phone="profile" composeMark="stencil" />}
      />
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
