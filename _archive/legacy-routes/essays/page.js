import { Suspense } from "react";
import VisualEssaysClient from "./VisualEssaysClient";

export const metadata = {
  title: "Visual Essays - Interactive Essay Examples | Esy",
  description:
    "Explore visual essays that bring ideas to life through interactive storytelling. History, science, culture, and technology—essays reimagined with animation and narrative design.",
  keywords: [
    "visual essays",
    "interactive essays",
    "visual essay examples",
    "multimedia essays",
    "illustrated essays",
    "essay examples",
    "interactive storytelling",
    "educational essays",
  ],
  openGraph: {
    title: "Visual Essays - Interactive Essay Examples | Esy",
    description:
      "Essays that come alive as you explore. Discover history, science, and culture through beautifully crafted interactive narratives.",
    url: "https://esy.com/essays/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visual Essays - Interactive Essay Examples | Esy",
    description:
      "Essays that come alive as you explore. Beautifully crafted interactive narratives.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://esy.com/essays/",
  },
};

export default function EssaysHub() {
  return (
    <Suspense fallback={<div className="visual-essays-loading" />}>
      <VisualEssaysClient basePath="/essays" />
    </Suspense>
  );
}
