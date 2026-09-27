import { renderShareCard, OG_SIZE } from "@/lib/og/shareCard";

// Social share card for the homepage, a Marketing Engineering publication
// since 2026-09-25 (it sold Esy OS from 09-18). The Marketing Engineer's card
// lives with its front page at /engineer.

export const alt = "Esy — Marketing Engineering for the AI era";
export const size = OG_SIZE;
export const contentType = "image/png";

// The hero's promise, then the desks that carry it.
export default function Image() {
  return renderShareCard({
    label: "MARKETING ENGINEERING",
    headline: "Learn to build the AI systems that run marketing.",
    topics: ["Build", "Grow", "Operate", "Learn"],
    url: "esy.com",
  });
}
