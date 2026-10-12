import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import MasonToyPage from '@/components/MasonToy/MasonToyPage';
import { TOY_VARIANTS } from '@/components/MasonToy/takes';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';

// Mason as a toy (2026-10-11): felt or vinyl, each in two footer worlds. The
// page shows the material's concept pieces; ConditionalFooter puts the take's
// world in the footer's slot.

const prototype = findPrototype('mason-toy')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Mason as a toy ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false } };
}

export default async function MasonToyProtoPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (!(variant in TOY_VARIANTS)) notFound();
  return (
    <div className={nlSerif.variable}>
      <LightHeader />
      <MasonToyPage variant={variant} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
