import { notFound } from 'next/navigation';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { nlSerif } from '@/components/NewsletterHome/serif';
import TakeProduct from '@/components/prototypes/product-home/TakeProduct';
import TakePaper from '@/components/prototypes/product-home/TakePaper';
import TakeDoors from '@/components/prototypes/product-home/TakeDoors';
import '@/components/prototypes/product-home/product-home.css';

// The homepage as os.esy.com's front door (2026-10-18), as if the publication
// moved to /newsletter. Three takes:
//   P1 · The product up front   the real Search screen under the promise
//   P2 · The morning paper      the picked sign-in's front page, as a homepage
//   P3 · Two doors              agencies and brands, each with its own rows

const TAKES: Record<string, () => React.ReactElement> = {
  product: TakeProduct,
  paper: TakePaper,
  doors: TakeDoors,
};

const prototype = findPrototype('product-home')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Product homepage ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false } };
}

export default async function ProductHomeVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Take = TAKES[variant];
  if (!Take) notFound();
  return (
    <div className={nlSerif.variable}>
      <Take />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
