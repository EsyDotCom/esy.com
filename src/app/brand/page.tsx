import type { Metadata } from 'next';
import BrandPage from '@/components/BrandKit/BrandPage';
import { nlSerif } from '@/components/NewsletterHome/serif';

/* esy.com/brand: the Esy brand kit (A · Sheet, picked 2026-10-12 from
   /prototypes/brand/). Name, the wordmark and its files, colour, type, the
   vinyl world, Mason and voice, from src/components/BrandKit/kit.ts, which
   restates org-docs/brand/ESY_DEFINITION.md and VISUAL_LANGUAGE.md. Its header
   is the site's default light header (ConditionalNavigation). */

const TITLE = 'Esy brand kit: logo, colours, type and Mason';
const DESCRIPTION = 'The Esy wordmark and its files, our colours and type, the vinyl toy world we picture everything in, and Mason, our octopus.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: 'https://esy.com/brand/', siteName: 'Esy', locale: 'en_US', images: [{ url: '/brand/kit/logo-vinyl-dark.webp', width: 1920, height: 1080 }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, site: '@EsyDotCom' },
  alternates: { canonical: '/brand/' },
};

export default function BrandRoute() {
  return (
    <div className={nlSerif.variable}>
      <BrandPage take="sheet" live />
    </div>
  );
}
