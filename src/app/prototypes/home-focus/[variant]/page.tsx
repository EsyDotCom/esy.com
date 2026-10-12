import { notFound } from 'next/navigation';
import { HomeHeroAtWork, resolveDesks } from '@/components/EducationHero';
import NewsletterHomePage from '@/components/NewsletterHome/NewsletterHomePage';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { getAllAgenticArticles } from '@/lib/published-articles';

// The homepage, focused (2026-10-12). Every take is the real homepage component
// with the live hero and settings (src/app/page.js); they differ only in what's
// cut and in what order:
//   A · Live         the homepage as it is today, for comparison
//   B · Trimmed      no 02 Creatives or 03 Films (SEOPage's explainer moves into
//                    its story), no work chips, Latest cut to four, the course
//                    offered again at the end
//   C · Proof first  B with the apps tour above Latest, straight after the hero

const TAKES: Record<string, { trim: boolean; appsFirst: boolean }> = {
  live: { trim: false, appsFirst: false },
  trimmed: { trim: true, appsFirst: false },
  'proof-first': { trim: true, appsFirst: true },
};

const prototype = findPrototype('home-focus')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Homepage focus ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false } };
}

export default async function HomeFocusVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const take = TAKES[variant];
  if (!take) notFound();
  const articles = await getAllAgenticArticles();
  return (
    <>
      <NewsletterHomePage
        compose={{ mark: 'stencil', band: 'replay' }}
        appsLayout="tour"
        newsColumn
        trim={take.trim}
        appsFirst={take.appsFirst}
        hero={<HomeHeroAtWork desks={resolveDesks(articles)} />}
      />
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
