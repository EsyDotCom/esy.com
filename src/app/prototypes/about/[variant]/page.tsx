import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import AboutLetter from '@/components/About/AboutLetter';
import AboutStudio from '@/components/About/AboutStudio';
import AboutPressKit from '@/components/About/AboutPressKit';
import { AboutCompact, AboutLive, AboutStory } from '@/components/About/AboutStudioVariants';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/About/About.css';

// One /about direction, in the real site chrome and the publication's `.nl`
// scope. All three say the same true things (About/content.tsx).

const LAYOUTS: Record<string, React.ComponentType> = {
  letter: AboutLetter,
  studio: AboutStudio,
  'press-kit': AboutPressKit,
  // Round 2: three takes on B.
  story: AboutStory,
  live: AboutLive,
  compact: AboutCompact,
};

const prototype = findPrototype('about')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `About ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function AboutVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Layout = LAYOUTS[variant];
  if (!Layout) notFound();
  const articles = await getAllAgenticArticles();

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      <Layout />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
