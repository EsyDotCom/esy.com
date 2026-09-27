import { OG_SIZE } from "@/lib/og/shareCard";
import { renderNewsletterCard } from "@/lib/og/newsletterCards";

// Social share card for the homepage: B · The Offer (picked 2026-09-27 from the
// three at /prototypes/og/). Navy, the promise and a Subscribe button on the
// left, what every issue gives you on the right: the card sells the free
// weekly email, like the homepage hero. Drawn by src/lib/og/newsletterCards.tsx.
//
// Earlier cards: the Marketing Engineering text card (2026-09-25 → 09-27) and
// the Esy OS card (2026-09-18 → 09-25), both via renderShareCard.

export const alt =
  "The Marketing Engineer by Esy: one email a week on building the AI systems that run marketing. Subscribe free at esy.com.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderNewsletterCard("offer");
}
