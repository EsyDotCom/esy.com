import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import CoursesShelf from '@/components/CoursesIndex/CoursesShelf';
import CoursesSyllabus from '@/components/CoursesIndex/CoursesSyllabus';
import CoursesFeatured from '@/components/CoursesIndex/CoursesFeatured';
import CoursesMasthead from '@/components/CoursesIndex/CoursesMasthead';
import CoursesNumbered from '@/components/CoursesIndex/CoursesNumbered';
import CoursesNowShowing from '@/components/CoursesIndex/CoursesNowShowing';
import CoursesMastheadShowing from '@/components/CoursesIndex/CoursesMastheadShowing';
import CoursesMastheadSections from '@/components/CoursesIndex/CoursesMastheadSections';
import { courses } from '@/lib/learn/mockData';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import type { CoursesIndexProps } from '@/components/CoursesIndex/shared';
import { SAMPLE_UPCOMING } from '@/components/CoursesIndex/sample-upcoming';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/CoursesIndex/CoursesIndex.css';

// One /courses index direction, in the real site chrome and the publication's
// `.nl` scope. It renders the real course list, the same one /courses reads,
// so every title, lesson and duration matches the course pages it links to.
// Only one course is live, so two labelled SAMPLE "coming soon" entries show
// how each layout grows (sample-upcoming.ts).

const LAYOUTS: Record<string, React.ComponentType<CoursesIndexProps>> = {
  shelf: CoursesShelf,
  syllabus: CoursesSyllabus,
  featured: CoursesFeatured,
  // Round 2: built from the homepage's and /engineer's own patterns.
  masthead: CoursesMasthead,
  numbered: CoursesNumbered,
  'now-showing': CoursesNowShowing,
  // Round 3: D's masthead over F's spotlight.
  'masthead-showing': CoursesMastheadShowing,
  // G with E's numbered sections after the spotlight.
  'masthead-sections': CoursesMastheadSections,
};

const prototype = findPrototype('courses')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Courses ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function CoursesVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Layout = LAYOUTS[variant];
  if (!Layout) notFound();
  const all = await getAllAgenticArticles();

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(all)} />
      <Layout courses={courses} upcoming={SAMPLE_UPCOMING} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
