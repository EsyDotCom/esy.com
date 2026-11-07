import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { PrivacyPage, type PrivacyTake } from '@/components/Privacy/PrivacyTakes';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';

// One design of the rewritten privacy policy, in the real site chrome (light header, footer below).
// The text is a draft for Zev's review (src/components/Privacy/policy.ts); the pick replaces /privacy.
const prototype = findPrototype('privacy')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Privacy ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function PrivacyTakePage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (!prototype.variants.some((v) => v.slug === variant)) notFound();
  return (
    <div className="proto">
      <LightHeader />
      <PrivacyPage take={variant as PrivacyTake} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
