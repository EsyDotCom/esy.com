import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { TakeDirectory, TakeGuide, TakeStack } from '@/components/ToolsProto/ToolsTakes';
import { TakeJobsFirst, TakePicksDirectory, TakeSidebar } from '@/components/ToolsProto/ToolsRound2';
import { TakeMagazine, TakeNight, TakeOrbit } from '@/components/ToolsProto/ToolsRound3';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/ToolsProto/tools-proto.css';

// esy.com/tools, "AI Marketing Tools": three takes (2026-10-09) on how the page
// makes tool discovery easy and wins the "ai marketing tools" searches. The
// pick ships at /tools with the title "AI Marketing Tools".

const prototype = findPrototype('tools')!;
const TAKES = {
  directory: TakeDirectory, stack: TakeStack, guide: TakeGuide,
  sidebar: TakeSidebar, 'jobs-first': TakeJobsFirst, 'picks-directory': TakePicksDirectory,
  night: TakeNight, orbit: TakeOrbit, magazine: TakeMagazine,
} as const;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `AI Marketing Tools ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function ToolsProtoPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Take = TAKES[variant as keyof typeof TAKES];
  if (!Take) notFound();
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader />
      <Take />
      <WeeklyEmailBand />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
