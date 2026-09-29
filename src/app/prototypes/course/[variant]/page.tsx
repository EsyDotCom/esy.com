import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import CoursePoster from '@/components/CourseDetail/CoursePoster';
import CourseMasthead from '@/components/CourseDetail/CourseMasthead';
import CourseTheater from '@/components/CourseDetail/CourseTheater';
import { getCourse } from '@/lib/learn/mockData';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import type { Course } from '@/lib/learn/types';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/CoursesIndex/CoursesIndex.css';
import '@/components/CourseDetail/CourseDetail.css';

// One course detail direction, in the real site chrome and the publication's
// `.nl` scope. It renders the one live course, the same data
// /courses/how-to-use-claude-code/ reads, so every lesson link is real.

const COURSE_SLUG = 'how-to-use-claude-code';

const LAYOUTS: Record<string, React.ComponentType<{ course: Course }>> = {
  poster: CoursePoster,
  masthead: CourseMasthead,
  theater: CourseTheater,
};

const prototype = findPrototype('course')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Course page ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function CourseVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Layout = LAYOUTS[variant];
  const course = getCourse(COURSE_SLUG);
  if (!Layout || !course) notFound();
  const all = await getAllAgenticArticles();

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(all)} />
      <Layout course={course} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
