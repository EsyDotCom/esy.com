import type { Metadata } from "next";
import TwoVisionsClient from "./TwoVisionsClient";

export const metadata: Metadata = {
  title: "Two Visions of Tomorrow: 1984 vs Brave New World | Esy.com",
  description:
    "An immersive visual essay exploring the competing dystopian visions of George Orwell and Aldous Huxley — and how we ended up living in both. Which future did we get: surveillance or pleasure?",
  keywords: [
    "1984",
    "Brave New World",
    "George Orwell",
    "Aldous Huxley",
    "dystopia",
    "surveillance",
    "totalitarianism",
    "visual essay",
    "scrollytelling",
    "literary analysis",
    "Orwell vs Huxley",
    "control mechanisms",
    "Neil Postman",
    "Amusing Ourselves to Death",
  ],
  openGraph: {
    title: "Two Visions of Tomorrow: 1984 vs Brave New World",
    description:
      "Which dystopia did we get? An immersive exploration of Orwell's fear and Huxley's pleasure — and how the smartphone fulfills both prophecies.",
    type: "article",
    authors: ["Esy.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Two Visions of Tomorrow: 1984 vs Brave New World",
    description:
      "Which dystopia did we get? An immersive exploration of Orwell's fear and Huxley's pleasure.",
  },
};

export default function TwoVisionsOfTomorrowPage() {
  return <TwoVisionsClient />;
}














