import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import EdFrontPage from '@/components/Editorial/EdFrontPage';
import EdCredits from '@/components/Editorial/EdCredits';
import EdDecide from '@/components/Editorial/EdDecide';
import type { EditorialProps } from '@/components/Editorial/parts';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/Editorial/Editorial.css';

// One editorial standards direction, in the real site chrome and the
// publication's `.nl` scope. All three render the same words
// (Editorial/content.tsx) and the same real example pieces.

const LAYOUTS: Record<string, React.ComponentType<EditorialProps>> = {
  'front-page': EdFrontPage,
  credits: EdCredits,
  decide: EdDecide,
  // Round 2: C's top, with new side-by-side and rules treatments.
  'versus-accordion': (props) => <EdDecide {...props} compare="versus" rules="accordion" />,
  'spectrum-stages': (props) => <EdDecide {...props} compare="spectrum" rules="stages" />,
  'tiles-index': (props) => <EdDecide {...props} compare="tiles" rules="index" />,
  // Round 3: Zev's pick, live at /editorial-standards/.
  final: (props) => <EdDecide {...props} compare="spectrum-vs" rules="accordion" />,
};

const prototype = findPrototype('editorial')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Editorial ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function EditorialVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Layout = LAYOUTS[variant];
  if (!Layout) notFound();
  const articles = await getAllAgenticArticles();

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      <Layout articles={articles} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
