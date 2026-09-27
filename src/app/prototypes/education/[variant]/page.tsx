import { notFound } from 'next/navigation';
import NewsletterHomePage from '@/components/NewsletterHome/NewsletterHomePage';
import {
  EduFaceSplit,
  EduFrontPage,
  EduIssue,
  EduScene,
  EduStudio,
  EduStudioAfter,
  EduStudioAvatar,
  EduStudioProfile,
  EduSyllabus,
  latestLesson,
  resolveDesks,
  type Lesson,
  type ResolvedDesk,
} from '@/components/EducationHero';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { getAllAgenticArticles } from '@/lib/published-articles';

// One education hero, on top of the homepage exactly as it would ship: the
// same Latest, properties, case studies, author, and closing email band
// underneath. Unlike the other prototypes this one isn't wrapped in `.proto`,
// because that scope restyles every h1/h2 and the heroes use the publication's type.
// Signups post the page path as their source, so prototype clicks are
// separable from homepage ones.
const HEROES: Record<string, React.ComponentType<{ desks: ResolvedDesk[]; latest?: Lesson | null }>> = {
  'front-page': EduFrontPage,
  syllabus: EduSyllabus,
  issue: EduIssue,
  // Round 2: with Zev's face.
  'face-split': EduFaceSplit,
  scene: EduScene,
  studio: EduStudio,
  // Round 3: F's phone layouts (desktop is F either way).
  'studio-avatar': EduStudioAvatar,
  'studio-profile': EduStudioProfile,
  'studio-after': EduStudioAfter,
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
  const articles = await getAllAgenticArticles();
  const desks = resolveDesks(articles);
  // The newest real article, for the heroes that show "latest" beside the signup.
  const latest = latestLesson(articles);

  return (
    <>
      <NewsletterHomePage hero={<Hero desks={desks} latest={latest} />} />
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
