import { NEWSLETTER_CARD_VARIANTS, renderNewsletterCard } from "@/lib/og/newsletterCards";

// One share-card direction as the real 1200×630 PNG, rendered by the same code
// the homepage's opengraph-image would use once a direction ships. Built at
// build time, like the live card.
export const dynamic = "force-static";

export function generateStaticParams() {
  return NEWSLETTER_CARD_VARIANTS.map((variant) => ({ variant }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const known = NEWSLETTER_CARD_VARIANTS.find((v) => v === variant);
  if (!known) return new Response("Not found", { status: 404 });
  return renderNewsletterCard(known);
}
