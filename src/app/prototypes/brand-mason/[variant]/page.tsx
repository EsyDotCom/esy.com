import { notFound } from 'next/navigation';
import MasonPage, { type MasonTake } from '@/components/BrandKit/MasonPage';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';

// esy.com/brand/mason, three ways (2026-10-11): Mason's kit in vinyl.

const prototype = findPrototype('brand-mason')!;
const TAKES: MasonTake[] = ['sheet', 'story', 'toybox'];

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Mason’s kit ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false } };
}

export default async function BrandMasonProtoPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const take = TAKES.find((t) => t === variant);
  if (!take) notFound();
  return (
    <div className={nlSerif.variable}>
      <LightHeader />
      <MasonPage take={take} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
