import { notFound } from 'next/navigation';
import { ScoutLanding } from '@/components/Scout/ScoutLanding';
import type { HeroTake } from '@/components/Scout/ScoutHeroes';
import { cormorant } from '@/components/SkillsHub/folio/font';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import '@/components/SkillsHub/folio/folio.css';
import '@/components/Scout/scout.css';

// esy.com/scout's hero, three ways (2026-11-07). Zev: say who and what (how top creators turn social
// traffic into digital product businesses) and make creators proud to be on the list. Each take is the
// S11 page (the Scout shell with lanes) with only the hero's headline block swapped (ScoutHeroes.tsx):
//   H1 · The list         an honour roll: a wall of faces and the list's numbers
//   H2 · Post to product  the promise, then a real path cycling through creators
//   H3 · Cover            a magazine cover with one creator in the spotlight

const TAKES: Record<string, HeroTake> = { list: 'list', pipeline: 'pipeline', cover: 'cover' };

const prototype = findPrototype('scout-hero')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Scout hero ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false } };
}

export default async function ScoutHeroVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const take = TAKES[variant];
  if (!take) notFound();
  return (
    <div className={`folio ${cormorant.variable}`}>
      <ScoutLanding creators="search" funnel="lanes" heroTake={take} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
