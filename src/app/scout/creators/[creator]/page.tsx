import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CREATOR_LIST, bySlug, faqFor, faqText, slugOf } from '@/components/Scout/creatorData';
import { ProfilePage } from '@/components/Scout/ScoutProfiles';
import { cormorant } from '@/components/SkillsHub/folio/font';
import '@/components/SkillsHub/folio/folio.css';
import '@/components/Scout/scout.css';

/* esy.com/scout/creators/<name> (2026-11-07): a creator's own Scout page, P4 · Dossier + card from
   /prototypes/scout-profile/. Editorial: only the public snapshot (src/data/scout/creators.json), every
   line labelled with how it's known, the independence line and corrections address, outside links
   nofollow, and no newsletter signup on the profile (only the Scout header's button). */

export const dynamicParams = false;

export function generateStaticParams() {
  return CREATOR_LIST.map((c) => ({ creator: slugOf(c) }));
}

export async function generateMetadata({ params }: { params: Promise<{ creator: string }> }): Promise<Metadata> {
  const { creator } = await params;
  const c = bySlug(creator);
  if (!c) return {};
  const title = `${c.name}’s Funnel and Game Plan`;
  const top = c.platforms[0];
  const description = `How ${c.name} converts social traffic into sales${top ? `, starting on ${top.name.replace(/\s*\(.*$/, '')}` : ''}: where they post, where they send people, and the ${c.ladder.length} offers they sell, read from their own public pages.`;
  const url = `https://esy.com/scout/creators/${slugOf(c)}/`;
  return {
    title: `${title} | Scout`,
    description,
    openGraph: { title: `${title} | Scout by Esy`, description, type: 'profile', url, siteName: 'Esy', locale: 'en_US' },
    twitter: { card: 'summary', title: `${title} | Scout by Esy`, description },
    alternates: { canonical: `/scout/creators/${slugOf(c)}/` },
  };
}

export default async function ScoutCreatorPage({ params }: { params: Promise<{ creator: string }> }) {
  const { creator } = await params;
  const c = bySlug(creator);
  if (!c) notFound();
  // ProfilePage structured data: who the page is about and their own public profiles (sameAs).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateModified: c.readOn,
    mainEntity: { '@type': 'Person', name: c.name, sameAs: c.links.map((l) => l.url) },
    publisher: { '@type': 'Organization', name: 'Esy', url: 'https://esy.com' },
  };
  // The FAQ the page shows, as FAQPage structured data (plain text, no links).
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqFor(c).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: faqText(f.a) } })) };
  return (
    <div className={`folio ${cormorant.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <ProfilePage take="merge" c={c} />
    </div>
  );
}
