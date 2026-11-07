import { notFound } from 'next/navigation';
import { HomeHeroAtWork, resolveDesks } from '@/components/EducationHero';
import NewsletterHomePage from '@/components/NewsletterHome/NewsletterHomePage';
import type { OsHeadTake } from '@/components/NewsletterHome/OsSuiteHead';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { getAllAgenticArticles } from '@/lib/published-articles';

// The head over the homepage's Esy OS apps (2026-11-07). Zev: drop the "01" and make it clear these
// are AI marketing tools, the suite a marketing engineer runs and grows a business on. Every take is
// the live homepage (src/app/page.js, O8 · Float plates) with only the head swapped (OsSuiteHead.tsx):
//   H1 · Statement  the category and the reader as the headline; the apps as marks that jump down
//   H2 · Suite      navy, a launch-style lineup of the four apps that runs into the first plate
//   H3 · Proof      the headline beside a ledger of what each tool has already made

const TAKES: Record<string, OsHeadTake> = { statement: 'statement', suite: 'suite', proof: 'proof' };

const prototype = findPrototype('home-os-head')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Homepage, AI marketing tools head ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false } };
}

export default async function HomeOsHeadVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const head = TAKES[variant];
  if (!head) notFound();
  const articles = await getAllAgenticArticles();
  return (
    <>
      <NewsletterHomePage
        compose={{ mark: 'stencil', band: 'replay' }}
        osApps="plates-float"
        osHead={head}
        newsColumn
        trim
        lead="newsletter"
        hero={<HomeHeroAtWork desks={resolveDesks(articles)} />}
      />
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
