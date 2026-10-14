import type { Metadata } from 'next';
import OctoMasonPage, { OCTOMASON } from '@/components/BrandKit/OctoMasonPage';
import { nlSerif } from '@/components/NewsletterHome/serif';

/* esy.com/mason (2026-10-14): OctoMason™, Mason for short, Esy's mascot.
   octomason.com 301s here. Header and footer are the site's defaults
   (ConditionalNavigation), as on /brand. */

const TITLE = `${OCTOMASON} (Mason for short), Esy’s octopus`;
const DESCRIPTION = 'Meet OctoMason™, Mason for short: Esy’s octopus. One mind, eight arms that each work on their own. Why an octopus, how he looks, where you’ll see him, and how to use him.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: 'https://esy.com/mason/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [{ url: '/brand/kit/mason-studio.webp', width: 1536, height: 1024, alt: 'Mason, Esy’s octopus, as a vinyl toy' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, site: '@EsyDotCom' },
  alternates: { canonical: '/mason/' },
};

export default function MasonRoute() {
  return (
    <div className={nlSerif.variable}>
      <OctoMasonPage />
    </div>
  );
}
