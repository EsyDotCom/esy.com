import { notFound } from 'next/navigation';
import BrandPage, { type BrandTake } from '@/components/BrandKit/BrandPage';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';

// esy.com/brand, three ways (2026-10-11): the Esy brand kit in the vinyl direction.

const prototype = findPrototype('brand')!;
const TAKES: BrandTake[] = ['sheet', 'showroom', 'guide'];

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Brand kit ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false } };
}

export default async function BrandProtoPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const take = TAKES.find((t) => t === variant);
  if (!take) notFound();
  return (
    <div className={nlSerif.variable}>
      <LightHeader />
      <BrandPage take={take} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
