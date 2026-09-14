import { renderShareCard, OG_SIZE } from "@/lib/og/shareCard";

// Social share card for the homepage, the front page of The Marketing
// Engineer. This is the card /engineer used (that index is now archived and
// redirects here), carried over so shared links keep the look people already
// know — only the display URL moves to the root. The product-era brand poster
// is still available in @/lib/og/homeBrandPoster if the archived homepage is
// ever restored.

export const alt = "The Marketing Engineer — engineering AI systems for modern marketing";
export const size = OG_SIZE;
export const contentType = "image/png";

// Output first, then the system design and the business behind it.
export default function Image() {
  return renderShareCard({
    label: "THE MARKETING ENGINEER",
    headline: "Engineering AI systems for modern marketing.",
    topics: ["Demo first", "System design", "The business"],
    url: "esy.com",
  });
}
