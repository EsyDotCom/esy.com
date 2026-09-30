import { Metadata } from 'next';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import CoursesMastheadShowing from '@/components/CoursesIndex/CoursesMastheadShowing';
import { HeroSplit } from '@/components/CoursesIndex/CoursesHeroes';
import { courses } from '@/lib/learn/mockData';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/CoursesIndex/CoursesIndex.css';
import '@/components/CoursesIndex/IntroVideo.css';

// The courses index (2026-09-29): prototype G from /prototypes/courses/, with
// hero A from /prototypes/courses-hero/ (the promise and signup beside a
// short intro video). Then the newest course announced like
// the homepage's film (poster, logline, credits, Start watching). Older
// courses follow as a list once there are any, and "Next in the studio" shows
// once there are real upcoming courses (the prototypes' two are samples, so
// none are passed here). It replaces CoursesListClient.

const DESCRIPTION =
  'Short video courses from The Marketing Engineer on the AI tools behind modern marketing. Each one takes a single tool from setup to a finished result, one lesson at a time.';

export const metadata: Metadata = {
  title: 'Courses — The Marketing Engineer',
  description: DESCRIPTION,
  openGraph: {
    title: 'Courses — The Marketing Engineer',
    description: DESCRIPTION,
    type: 'website',
    url: 'https://esy.com/courses/',
    siteName: 'Esy',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Courses — The Marketing Engineer',
    description: DESCRIPTION,
  },
  alternates: {
    canonical: '/courses/',
  },
};

export const revalidate = 3600;

export default async function CoursesPage() {
  const articles = await getAllAgenticArticles();
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      <CoursesMastheadShowing courses={courses} upcoming={[]} hero={<HeroSplit courses={courses} />} />
    </div>
  );
}
