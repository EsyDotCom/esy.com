import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import CoursesMastheadShowing from '@/components/CoursesIndex/CoursesMastheadShowing';
import { HeroPill, HeroScreening, HeroSplit } from '@/components/CoursesIndex/CoursesHeroes';
import { courses } from '@/lib/learn/mockData';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import type { Course } from '@/lib/learn/types';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/CoursesIndex/CoursesIndex.css';
import '@/components/CoursesIndex/IntroVideo.css';

// One /courses hero with an intro video, over the live page's own sections
// (G's poster spotlight and the rest), so each hero is seen in place.

const HEROES: Record<string, React.ComponentType<{ courses: Course[] }>> = {
  split: HeroSplit,
  screening: HeroScreening,
  pill: HeroPill,
};

const prototype = findPrototype('courses-hero')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Courses hero ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function CoursesHeroVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Hero = HEROES[variant];
  if (!Hero) notFound();
  const articles = await getAllAgenticArticles();

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      <CoursesMastheadShowing courses={courses} upcoming={[]} hero={<Hero courses={courses} />} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
