import type { Metadata } from 'next';
import LightHeader from '@/components/LightHeader/LightHeader';
import { MarketingEngineerPage } from '@/components/MarketingEngineer/MeTakes';
import { nlSerif } from '@/components/NewsletterHome/serif';

/* esy.com/marketing-engineer (2026-11-07): the page that answers "what is a marketing engineer?"
   and feeds The Marketing Engineer newsletter, while /newsletter stays the newsletter. F · Sentence
   from /prototypes/marketing-engineer/ (D · One Day II with the jobs said in one sentence). The FAQ
   is marked up as FAQPage inside the page; outside sources are nofollow (lib/outbound). */

const TITLE = 'What Is a Marketing Engineer? Definition, Skills and How to Become One';
const DESCRIPTION =
  'A marketing engineer builds the systems that do marketing work: research, writing, checking, publishing and measuring run on their own, and a person signs off. What they do, where the term comes from, pay, skills, and how to become one.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['marketing engineer', 'what is a marketing engineer', 'marketing engineering', 'GTM engineer', 'technical marketing engineer', 'content engineer', 'AI marketing'],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    url: 'https://esy.com/marketing-engineer/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [{ url: '/brand/kit/mason-at-rest.webp', width: 1536, height: 864, alt: 'Mason, Esy’s octopus, at a desk at night' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, site: '@EsyDotCom' },
  alternates: { canonical: '/marketing-engineer/' },
};

export default function MarketingEngineerRoute() {
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader />
      <MarketingEngineerPage />
    </div>
  );
}
