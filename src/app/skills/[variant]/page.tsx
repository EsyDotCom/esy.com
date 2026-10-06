import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import SkillsFieldGuide from '@/components/SkillsHub/SkillsFieldGuide';
import SkillsShelf from '@/components/SkillsHub/SkillsShelf';
import SkillsWorkbench from '@/components/SkillsHub/SkillsWorkbench';
import { FolioTake, type FolioVariant } from '@/components/SkillsHub/folio/FolioTakes';
import { cormorant } from '@/components/SkillsHub/folio/font';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/SkillsHub/SkillsHub.css';
import '@/components/SkillsHub/folio/folio.css';
import '@/components/SkillsHub/folio/replay.css';
import '@/components/SkillsHub/folio/merges.css';
import '@/components/SkillsHub/folio/skills-folio.css';

// esy.com/skills, built in place (2026-10-06) so the pick becomes the section.
// Round 1 (A–C) in the publication's `.nl` look under LightHeader; round 2
// (D–F) in Folio with docs.esy.com's top, bringing its own bar. noindex until
// a take ships.

const ROUND1: Record<string, React.ComponentType> = { a: SkillsFieldGuide, b: SkillsShelf, c: SkillsWorkbench };
const ROUND2 = new Set(['d', 'e', 'f', 'g', 'h', 'i', 'j']); // the Folio takes: rounds 2–4
const prototype = findPrototype('skills')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Skills ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false, follow: false } };
}

export default async function SkillsVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (ROUND2.has(variant)) {
    return (
      <div className={cormorant.variable}>
        <FolioTake variant={variant as FolioVariant} />
        <PrototypeBar prototype={prototype} current={variant} />
      </div>
    );
  }
  const Take = ROUND1[variant];
  if (!Take) notFound();
  const all = await getAllAgenticArticles();
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(all)} />
      <Take />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
