import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import MasonIconPage from '@/components/MasonIcon/MasonIconPage';
import { ICON_TAKES } from '@/components/MasonIcon/icons';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';

// Mason as an icon (2026-10-13): three head-only marks for the favicon and
// app icon, each beside today's e. The live favicon doesn't change.

const prototype = findPrototype('mason-icon')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Mason as an icon ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false } };
}

export default async function MasonIconProtoPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (!(variant in ICON_TAKES)) notFound();
  return (
    <>
      <LightHeader />
      <MasonIconPage variant={variant} />
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
