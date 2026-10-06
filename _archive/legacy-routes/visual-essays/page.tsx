import GalleryHomePage from "@/components/Home/GalleryHomePage";

/**
 * Visual Essays Landing Page
 * 
 * The "Essays That Unfold" gallery-style homepage showcasing visual essays.
 * This page leads with visual essays to create awe, authority, and trust.
 * 
 * @see /src/components/Home/GalleryHomePage.tsx
 */

export const metadata = {
  title: "Essays That Unfold | Esy",
  description: "Cinematic, research-driven essays exploring history, language, power, and ideas. Ideas explored, not just explained.",
  keywords: [
    "visual essays",
    "cinematic essays",
    "research-driven essays",
    "essays that unfold",
    "visual storytelling",
    "interactive essays",
    "essay gallery"
  ],
  openGraph: {
    title: "Essays That Unfold | Esy",
    description: "Cinematic, research-driven essays exploring history, language, power, and ideas. Ideas explored, not just explained.",
    type: "website",
    url: "https://esy.com/visual-essays",
    siteName: "Esy",
    locale: "en_US",
    images: [{
      url: "https://esy.com/og/homepage.png",
      width: 1200,
      height: 630,
      alt: "Essays That Unfold"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Essays That Unfold | Esy",
    description: "Cinematic, research-driven essays exploring history, language, power, and ideas.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/homepage.png"],
  },
  alternates: {
    canonical: "https://esy.com/visual-essays",
  },
};

export default function VisualEssaysPage() {
  return <GalleryHomePage />;
}
