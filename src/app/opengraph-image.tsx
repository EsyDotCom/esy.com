import { renderShareCard, OG_SIZE } from "@/lib/og/shareCard";

// Social share card for the homepage, which is now the front page of The
// Marketing Engineer. A publication gets the section-card layout (label,
// headline, topics); the product-era brand poster is still available in
// @/lib/og/homeBrandPoster if the archived homepage is ever restored.

export const alt = "The Marketing Engineer — a newsletter by Esy";
export const size = OG_SIZE;
export const contentType = "image/png";

// Headline complements og:title rather than repeating it: the promise, then
// the three verbs every issue delivers on.
export default function Image() {
  return renderShareCard({
    label: "THE MARKETING ENGINEER",
    headline: "Marketing data, turned into action.",
    topics: ["Build it", "Explain it", "Show the results"],
    url: "esy.com",
  });
}
