import { renderShareCard, OG_SIZE } from "@/lib/og/shareCard";

// Social share card for the homepage, which sells Esy OS (2026-09-18). The
// Marketing Engineer's card moved with its front page to /engineer.

export const alt = "Esy OS — your AI team's work and spend, on one page";
export const size = OG_SIZE;
export const contentType = "image/png";

// The hero's promise, then the three things the Books answers.
export default function Image() {
  return renderShareCard({
    label: "ESY OS",
    headline: "Your AI team's work and spend, on one page.",
    topics: ["What was made", "What it cost", "What's waiting on you"],
    url: "esy.com",
  });
}
