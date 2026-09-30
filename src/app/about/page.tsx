import type { Metadata } from 'next';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import { AboutChapters } from '@/components/About/AboutCareer';
import { WorkLedger } from '@/components/About/AboutWork';
import { BIO_SHORT, NAME } from '@/components/About/content';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/About/About.css';

// /about (2026-09-30): H · Chapters from /prototypes/about/ (the career as
// five chapters under the homepage's portrait hero), with N · Magazine as its
// "What I make" section. Every fact lives in src/components/About/content.tsx.
// The old "Agentic Engineer" page is archived at
// src/archive/about-agentic-engineer/.

const TITLE = `About ${NAME} — The Marketing Engineer`;

export const metadata: Metadata = {
  title: TITLE,
  description: BIO_SHORT,
  openGraph: {
    title: TITLE,
    description: BIO_SHORT,
    type: 'profile',
    url: 'https://esy.com/about/',
    siteName: 'Esy',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: BIO_SHORT,
    site: '@EsyDotCom',
  },
  alternates: {
    canonical: '/about/',
  },
};

export const revalidate = 3600;

export default async function AboutPage() {
  const articles = await getAllAgenticArticles();
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      <AboutChapters work={<WorkLedger look="magazine" />} />
    </div>
  );
}
