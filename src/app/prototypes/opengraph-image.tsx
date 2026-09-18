import { renderShareCard, OG_SIZE } from "@/lib/og/shareCard";

// Share card for /prototypes, the page linked from LinkedIn. It says what the
// page is and what to do there: five homepages, each one clickable.

export const alt = "We built five versions of the Esy homepage. Try them all.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderShareCard({
    label: "ESY PROTOTYPES",
    headline: "We built five versions of our homepage. Try them all.",
    topics: ["Three directions", "Two merges", "One shipped"],
    url: "esy.com/prototypes",
  });
}
