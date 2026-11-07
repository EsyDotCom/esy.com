import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { MarketingEngineerTake, type MeTake } from '@/components/MarketingEngineer/MeTakes';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';

// esy.com/marketing-engineer, three takes (2026-11-07). Zev: own "marketing engineer" in search with
// its own page, feeding The Marketing Engineer newsletter, while /newsletter stays the newsletter.
// Each take is the whole page under the site's light header (MeTakes.tsx):
//   A · Eight Arms  navy; Mason holds a job in every arm, pick one to see who does what
//   B · The Entry   white; a dictionary entry with Mason as Fig. 1 and an anatomy plate
//   C · One Day     night; Mason at his desk, then a sample day past a sticky clock
// Round 2:
//   D · One Day II  C with the question as headline, the jobs section, night to the end, a researched FAQ
// Round 3, D with "Eight jobs, one system" told three simpler ways:
//   E · Spotlight   Mason alone, the arms lighting one at a time, one line under him
//   F · Sentence    one serif sentence of verbs, each lighting its arm
//   G · Roll call   Mason holds still while eight rows and a ninth (you) scroll past

const TAKES: Record<string, MeTake> = { arms: 'arms', entry: 'entry', day: 'day', 'day-2': 'day2', 'jobs-spotlight': 'day2-spotlight', 'jobs-sentence': 'day2-sentence', 'jobs-roll': 'day2-roll' };

const prototype = findPrototype('marketing-engineer')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `What is a marketing engineer? ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false } };
}

export default async function MarketingEngineerVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const take = TAKES[variant];
  if (!take) notFound();
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader />
      <MarketingEngineerTake take={take} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
