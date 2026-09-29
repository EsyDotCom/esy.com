import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import LessonStudio from '@/components/LessonPage/LessonStudio';
import { lessonVideo } from '@/components/LessonPage/video';
import { getLesson, courses } from '@/lib/learn/mockData';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/ArticleImage/ArticleImage.css';
import '@/components/ArticleVideo/ArticleVideo.css';
import '@/components/LessonPage/LessonPage.css';

// The lesson page (2026-09-29): lesson page H from /prototypes/lesson/. The
// video and the course's playlist sit side by side in A's dark room, with the
// email signup under the playlist (E). Below: what you'll learn, the notes,
// and a big card for the next lesson with the rest of the course (H). It
// replaces the dark/light player page (LessonClient, retired).
//
// A lesson without its own Mux recording plays a stand-in video and says so
// on the page (LessonPage/video.ts); missing notes show a placeholder.

interface PageProps {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseSlug, lessonSlug } = await params;
  const result = getLesson(courseSlug, lessonSlug);
  if (!result) return { title: 'Lesson Not Found' };

  const { course, lesson } = result;
  return {
    title: `${lesson.title} | ${course.title} | Esy AI Courses`,
    description: lesson.description,
    openGraph: {
      title: `${lesson.title} | ${course.title} | Esy AI Courses`,
      description: lesson.description,
      type: 'video.other',
      url: `https://esy.com/courses/${courseSlug}/${lessonSlug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${lesson.title} | ${course.title} | Esy AI Courses`,
      description: lesson.description,
    },
  };
}

export async function generateStaticParams() {
  const params: { courseSlug: string; lessonSlug: string }[] = [];
  for (const course of courses) {
    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        params.push({ courseSlug: course.slug, lessonSlug: lesson.slug });
      }
    }
  }
  return params;
}

export default async function LessonPage({ params }: PageProps) {
  const { courseSlug, lessonSlug } = await params;
  const result = getLesson(courseSlug, lessonSlug);
  if (!result) notFound();

  const { course, lesson, chapter } = result;
  const [video, all] = await Promise.all([lessonVideo(lesson), getAllAgenticArticles()]);
  if (!video) notFound();

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(all)} />
      <LessonStudio course={course} lesson={lesson} chapterTitle={chapter} video={video} night signup body="endcard" />
    </div>
  );
}
