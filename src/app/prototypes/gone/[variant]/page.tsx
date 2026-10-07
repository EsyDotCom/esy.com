import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { GonePage, type GoneTake } from '@/components/NotFound/Gone';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';

// One 410 take, laid out exactly as the 404 is (src/app/not-found.tsx): the
// light header, the message, and the reef in the footer world's place.
const TAKES: Record<string, GoneTake> = { archive: 'archive', buried: 'buried', 'moved-on': 'moved-on' };

const prototype = findPrototype('gone')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `410 ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function GoneVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const take = TAKES[variant];
  if (!take) notFound();

  return (
    <>
      <LightHeader />
      <GonePage take={take} />
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
