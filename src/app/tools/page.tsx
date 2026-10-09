import type { Metadata } from 'next';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { TakeOrbit } from '@/components/ToolsProto/ToolsRound3';
import { TOOLS } from '@/components/ToolsProto/tools';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/ToolsProto/tools-proto.css';

// esy.com/tools (2026-10-09): AI Marketing Tools, for the "ai marketing tools"
// searches. Picked from /prototypes/tools/: K8 · Orbit (every tool drifting
// behind a light hero, a featured pick, job boxes that open in place).

const TITLE = 'AI Marketing Tools';
const DESCRIPTION =
  'The AI marketing tools worth knowing, sorted by the job they do: writing, images, SEO, email, ads, automation, prospecting and building. With tutorials, reviews and what I actually run.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: 'https://esy.com/tools/', siteName: 'Esy', locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, site: '@EsyDotCom' },
  alternates: { canonical: '/tools/' },
};

// The list as structured data, so search engines read it as a list of software.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: TITLE,
  itemListElement: TOOLS.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: { '@type': 'SoftwareApplication', name: t.name, applicationCategory: t.job, description: t.does, author: { '@type': 'Organization', name: t.maker.replace(' (ours)', '') } },
  })),
};

export default function ToolsPage() {
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LightHeader />
      <TakeOrbit />
      <WeeklyEmailBand />
    </div>
  );
}
