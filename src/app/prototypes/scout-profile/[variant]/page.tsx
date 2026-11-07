import { redirect } from 'next/navigation';

// A take without a creator opens on Nick Saraev; every creator works (/<take>/<name>/).
export default async function ScoutProfileTake({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  redirect(`/prototypes/scout-profile/${variant}/nick-saraev/`);
}
