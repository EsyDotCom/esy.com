import { notFound } from 'next/navigation';
import { CREATOR_LIST, bySlug, slugOf } from '@/components/Scout/creatorData';
import { ProfilePage, type ProfileTake } from '@/components/Scout/ScoutProfiles';
import { cormorant } from '@/components/SkillsHub/folio/font';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import '@/components/SkillsHub/folio/folio.css';
import '@/components/Scout/scout.css';

// A creator's own Scout page, three ways (2026-11-07), for a future esy.com/scout/<name>. Zev: editorial
// profiles like Forbes's; no newsletter signup on or around the profile, only the header's button.
//   P1 · Dossier  a magazine profile   P2 · Funnel  the funnel is the page   P3 · Card  a shareable card first
//   P4 · Dossier + card  P1's page with P3's card as the fact box (round 2)

const TAKES: Record<string, ProfileTake> = { dossier: 'dossier', funnel: 'funnel', card: 'card', merge: 'merge' };
const prototype = findPrototype('scout-profile')!;

export function generateStaticParams() {
  return prototype.variants.flatMap((v) => CREATOR_LIST.map((c) => ({ variant: v.slug, creator: slugOf(c) })));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string; creator: string }> }) {
  const { variant, creator } = await params;
  const c = bySlug(creator); const v = prototype.variants.find((x) => x.slug === variant);
  return { title: c && v ? `${c.name}’s funnel and game plan, ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false } };
}

export default async function ScoutProfileVariant({ params }: { params: Promise<{ variant: string; creator: string }> }) {
  const { variant, creator } = await params;
  const take = TAKES[variant]; const c = bySlug(creator);
  if (!take || !c) notFound();
  return (
    <div className={`folio ${cormorant.variable}`}>
      <ProfilePage take={take} c={c} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
