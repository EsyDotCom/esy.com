import { notFound } from 'next/navigation';
import NewsletterHomePage from '@/components/NewsletterHome/NewsletterHomePage';
import { PROMISES, PromiseStudio, latestLesson, resolveDesks } from '@/components/EducationHero';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { getAllAgenticArticles } from '@/lib/published-articles';

// The real homepage with the three openings, through the same PromiseStudio
// that ships: C is esy.com, B is esy.com/seo, A stays here. Everything under
// the hero matches src/app/page.js.

const prototype = findPrototype('home-promise')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Homepage promise ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function HomePromiseVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const promise = PROMISES[variant];
  if (!promise) notFound();
  const articles = await getAllAgenticArticles();

  return (
    <>
      <NewsletterHomePage
        compose={{ mark: 'stencil', band: 'replay' }}
        appsLayout="tour"
        newsColumn
        hero={<PromiseStudio promise={promise} desks={resolveDesks(articles)} latest={latestLesson(articles)} />}
      />
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
