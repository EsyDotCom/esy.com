import { notFound } from 'next/navigation';
import { BuilderFrame } from '@/components/PageBuilder/BuilderFrame';
import { DIRECTIONS } from '@/components/PageBuilder/directions';
import { PageBuilder } from '@/components/PageBuilder/PageBuilder';

// The builder alone, full screen, nothing around it: what the variant page's
// window shows in its iframe, and what "Open full screen" opens.

export function generateStaticParams() {
  return Object.keys(DIRECTIONS).map((variant) => ({ variant }));
}

export default async function RawPageBuilder({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const direction = DIRECTIONS[variant];
  if (!direction) notFound();
  return (
    <BuilderFrame>
      <PageBuilder {...direction} />
    </BuilderFrame>
  );
}
