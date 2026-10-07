import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import CoursePoster from '@/components/CourseDetail/CoursePoster';
import CoursesMastheadShowing from '@/components/CoursesIndex/CoursesMastheadShowing';
import { HeroSplit } from '@/components/CoursesIndex/CoursesHeroes';
import { lessonsOf } from '@/components/CoursesIndex/shared';
import { CourseCoverArt } from '@/components/CourseCovers/covers';
import CoverSheet from '@/components/CourseCovers/CoverSheet';
import { COVER_TAKES } from '@/components/CourseCovers/takes';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { courses, getCourse } from '@/lib/learn/mockData';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/CoursesIndex/CoursesIndex.css';
import '@/components/CoursesIndex/IntroVideo.css';
import '@/components/CourseDetail/CourseDetail.css';
import '@/components/LessonPage/LessonPage.css';

// The Claude Code course's cover, five ways, with Mason (2026-10-06). Each take
// renders the real course page (or, with ?on=index, the real /courses) with
// its drawing in the poster, then a sheet with the wide cover on a lesson's end
// card beside today's generated covers.

const prototype = findPrototype('course-cover')!;
const COURSE_SLUG = 'how-to-use-claude-code';

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Course cover ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function CourseCoverVariantPage({
  params,
  searchParams,
}: {
  params: Promise<{ variant: string }>;
  searchParams: Promise<{ on?: string }>;
}) {
  const { variant } = await params;
  const { on } = await searchParams;
  const take = COVER_TAKES[variant];
  const course = getCourse(COURSE_SLUG);
  if (!take || !course) notFound();
  const where = on === 'index' ? 'index' : 'course';
  const articles = await getAllAgenticArticles();
  const poster = <CourseCoverArt cover={take.cover} format="poster" lessons={lessonsOf(course).length} />;

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      {where === 'course' ? (
        <CoursePoster course={course} posterArt={poster} />
      ) : (
        <CoursesMastheadShowing courses={courses} upcoming={[]} hero={<HeroSplit courses={courses} />} posterArt={poster} />
      )}
      <CoverSheet take={take} course={course} slug={variant} on={where} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
