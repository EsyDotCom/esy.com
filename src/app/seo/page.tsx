import type { Metadata } from 'next';
import NewsletterHomePage from '@/components/NewsletterHome/NewsletterHomePage';
import { PROMISES, PromiseStudio, resolveDesks } from '@/components/EducationHero';
import { getAllAgenticArticles } from '@/lib/published-articles';

// esy.com/seo (shipped 2026-10-06): the homepage with B · SEO isn't dead from
// /prototypes/home-promise/ as its hero, for people who come for SEO. "SEO
// isn't dead. It runs on AI now." leads; the course button, the portrait and
// everything under the hero are the homepage's own (src/app/page.js renders C).
// Signups here are recorded with the referring site esy.com/seo.

// The exact title Zev asked for, without the layout's "| Esy" suffix.
const TITLE = 'AI Agents for SEO and Marketing';
// Built around the title: what the agents do, then what the page offers.
const DESCRIPTION =
  'Build AI agents for SEO and marketing that research, write, check and publish pages. A free email course from an engineer who runs real businesses on them.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ['AI SEO', 'AI agents for SEO', 'AI agents for marketing', 'SEO automation', 'AI content workflows', 'Marketing Engineering'],
  // og:image comes from src/app/opengraph-image.tsx, as on the homepage.
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: 'https://esy.com/seo/', siteName: 'Esy', locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, site: '@EsyDotCom' },
  alternates: { canonical: '/seo/' },
};

// Same posture as the homepage: hourly backstop for the article lists.
export const revalidate = 3600;

export default async function SeoPage() {
  const articles = await getAllAgenticArticles();
  return (
    <NewsletterHomePage
      compose={{ mark: 'stencil', band: 'replay' }}
      appsLayout="tour"
      newsColumn
      hero={<PromiseStudio promise={PROMISES.seo} desks={resolveDesks(articles)} />}
    />
  );
}
