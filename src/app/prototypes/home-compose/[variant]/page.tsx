import { notFound } from 'next/navigation';
import NewsletterHomePage from '@/components/NewsletterHome/NewsletterHomePage';
import type { ComposeMarkStyle } from '@/components/NewsletterHome/ComposeWordmark';
import type { ComposeBandStyle } from '@/components/NewsletterHome/ComposeBand';
import { EduStudio, latestLesson, resolveDesks } from '@/components/EducationHero';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { getAllAgenticArticles } from '@/lib/published-articles';

// The real homepage with Compose added as the third app: its mark in the
// hero's "The systems run" row, in the 01 Apps ledger (#work-apps), and its own case study band after SEOPage's.
// Round 1 varies the mark (each shown in the replay band so it's seen large
// too); round 2 varies the band, all with the lockup mark.

const VARIANTS: Record<string, { mark: ComposeMarkStyle; band: ComposeBandStyle }> = {
  lockup: { mark: 'lockup', band: 'replay' },
  stencil: { mark: 'stencil', band: 'replay' },
  pen: { mark: 'pen', band: 'replay' },
  replay: { mark: 'lockup', band: 'replay' },
  team: { mark: 'lockup', band: 'team' },
  page: { mark: 'lockup', band: 'page' },
};

const prototype = findPrototype('home-compose')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Homepage Compose ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function HomeComposeVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const compose = VARIANTS[variant];
  if (!compose) notFound();
  const articles = await getAllAgenticArticles();

  return (
    <>
      <NewsletterHomePage
        compose={compose}
        hero={<EduStudio desks={resolveDesks(articles)} latest={latestLesson(articles)} phone="profile" composeMark={compose.mark} />}
      />
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
