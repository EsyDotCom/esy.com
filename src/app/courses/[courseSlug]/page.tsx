import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import CoursePoster from '@/components/CourseDetail/CoursePoster';
import { getCourse, courses } from '@/lib/learn/mockData';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/CoursesIndex/CoursesIndex.css';
import '@/components/CourseDetail/CourseDetail.css';

// The course page (2026-09-29): course page A from /prototypes/course/. The
// index's poster band as the hero (title, logline, credits, Start watching),
// then what you'll learn beside the lessons as the homepage's ledger, the
// teacher, and the resources with real links. It replaces CourseDetailClient.

interface PageProps {
  params: Promise<{ courseSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) return { title: 'Course Not Found' };

  return {
    title: `${course.title} — The Marketing Engineer`,
    description: course.description,
    openGraph: {
      title: `${course.title} — The Marketing Engineer`,
      description: course.description,
      type: 'website',
      url: `https://esy.com/courses/${courseSlug}/`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${course.title} — The Marketing Engineer`,
      description: course.description,
    },
    alternates: {
      canonical: `/courses/${courseSlug}/`,
    },
  };
}

export async function generateStaticParams() {
  return courses.map((c) => ({ courseSlug: c.slug }));
}

export const revalidate = 3600;

export default async function CourseDetailPage({ params }: PageProps) {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) notFound();
  const articles = await getAllAgenticArticles();

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      <CoursePoster course={course} />
    </div>
  );
}
