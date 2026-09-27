import { notFound } from 'next/navigation';
import NewsletterHomePage from '@/components/NewsletterHome/NewsletterHomePage';
import { EduFrontPage, EduIssue, EduSyllabus, resolveDesks, type ResolvedDesk } from '@/components/EducationHero';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { getAllAgenticArticles } from '@/lib/published-articles';

// One education hero, on top of the homepage exactly as it would ship: the
// same Latest, properties, case studies, author, and closing email band
// underneath. Unlike the other prototypes this one isn't wrapped in `.proto`,
// because that scope restyles every h1/h2 and the heroes use the publication's type.
// Signups post the page path as their source, so prototype clicks are
// separable from homepage ones.
const HEROES: Record<string, React.ComponentType<{ desks: ResolvedDesk[] }>> = {
  'front-page': EduFrontPage,
  syllabus: EduSyllabus,
  issue: EduIssue,
};

const prototype = findPrototype('education')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Education ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function EducationVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Hero = HEROES[variant];
  if (!Hero) notFound();

  // The desks link real articles, so they resolve against the same list the
  // Latest section reads.
  const desks = resolveDesks(await getAllAgenticArticles());

  return (
    <>
      <NewsletterHomePage hero={<Hero desks={desks} />} />
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
