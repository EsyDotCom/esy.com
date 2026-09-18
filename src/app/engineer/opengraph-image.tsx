import { renderShareCard, OG_SIZE } from "@/lib/og/shareCard";

// Social share card for The Marketing Engineer's front page. It was the
// homepage card until 2026-09-18, when the homepage moved to Esy OS and the
// publication's front page moved here; articles under /engineer/<slug>/ that
// don't set their own card inherit this one, as they did at the root.

export const alt = "The Marketing Engineer — engineering AI systems for modern marketing";
export const size = OG_SIZE;
export const contentType = "image/png";

// Output first, then the system design and the business behind it.
export default function Image() {
  return renderShareCard({
    label: "THE MARKETING ENGINEER",
    headline: "Engineering AI systems for modern marketing.",
    topics: ["Demo first", "System design", "The business"],
    url: "esy.com/engineer",
  });
}
