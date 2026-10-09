import type { Metadata } from 'next';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import { LiveNewsletterIndex } from '@/components/NewsletterPage/Live';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsletterPage/newsletter-page.css';

// esy.com/newsletter (2026-10-09): The Marketing Engineer's home. Picked from
// /prototypes/newsletter/: D's top (the name, the latest issue's big cover)
// with I's wide feed (Latest / Top, the signup inline after the second issue).
// Issues are samples until Compose writes real ones, and say so.

const TITLE = 'AI Marketing Newsletter — The Marketing Engineer';
const DESCRIPTION =
  'One AI marketing system a week: how I built it, what it did, and the skills to run it yourself. Plus the week’s AI marketing news. Free.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: 'https://esy.com/newsletter/', siteName: 'Esy', locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, site: '@EsyDotCom' },
  alternates: { canonical: '/newsletter/' },
};

export default function NewsletterPage() {
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader />
      <LiveNewsletterIndex />
    </div>
  );
}
