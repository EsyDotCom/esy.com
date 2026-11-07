import { notFound } from 'next/navigation';
import { HomeHeroAtWork, resolveDesks } from '@/components/EducationHero';
import NewsletterHomePage from '@/components/NewsletterHome/NewsletterHomePage';
import type { OsAppsTake } from '@/components/NewsletterHome/OsAppsShowcase';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { getAllAgenticArticles } from '@/lib/published-articles';

// The homepage's apps section as Esy OS's own apps (2026-11-07). Zev: the section that shows
// clip.art, seopage.com and compose.esy.com should showcase os.esy.com's products only. Every take is
// the live homepage (src/app/page.js) with only 01 swapped for OsAppsShowcase:
//   O1 · Tour        today's tour, with agency, compose and scout (echo shown as coming)
//   O2 · Launcher    os.esy.com's launcher as the section, the picked app in a window beside it
//   O3 · One window  one os.esy.com window across the band, the apps as columns under it
// Round 2, a section per app (osAppFeatures.ts, OsAppSections.tsx):
//   O4 · Chapters    grounds that blend; the screen stays while the features scroll
//   O5 · Plates      each app a sheet sliding over the last
//   O6 · Index       on paper, a rail that fills as you read
// Round 3, O5's plates with realistic screens (OsScreens.tsx) in a container (OsContainers.tsx):
//   O7 · Display     a slim studio display on a stand
//   O8 · Float       the screen in space, settling flat
//   O9 · Mat         a gallery mount with a museum label

const TAKES: Record<string, OsAppsTake> = { tour: 'tour', launcher: 'launcher', window: 'window', chapters: 'chapters', plates: 'plates', index: 'index', display: 'plates-display', float: 'plates-float', mat: 'plates-mat' };

const prototype = findPrototype('home-os-apps')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Homepage, Esy OS apps ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false } };
}

export default async function HomeOsAppsVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const take = TAKES[variant];
  if (!take) notFound();
  const articles = await getAllAgenticArticles();
  return (
    <>
      <NewsletterHomePage
        compose={{ mark: 'stencil', band: 'replay' }}
        appsLayout="tour"
        osApps={take}
        newsColumn
        trim
        lead="newsletter"
        hero={<HomeHeroAtWork desks={resolveDesks(articles)} />}
      />
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
