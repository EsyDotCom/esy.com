import { notFound, redirect } from 'next/navigation';

// The prototypes briefly lived at /skills/a…j (2026-10-06) before moving to
// /prototypes/skills/. Old links redirect; anything else under /skills/ is
// reserved for real skill pages and 404s until they exist.
export default async function OldSkillsTake({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (/^[a-j]$/.test(variant)) redirect(`/prototypes/skills/${variant}/`);
  notFound();
}
