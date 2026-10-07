import type { Metadata } from "next";
import ArtifactDetailWrapper from "@/components/ArtifactDetail";
import ManhattanProjectClient from "./ManhattanProjectClient";

const ESSAY_META = {
  title: "Now I Am Become Death",
  subtitle: "The Making of the Atomic Bomb",
  category: "History",
  subcategory: "Science",
  readTime: "35 min",
  sourceCount: 13,
  sourceTier: "Tier-1",
  sectionCount: 12,
  visualizationCount: 7,
  designSystem: "Subject-derived",
  published: "December 2025",
  model: "Claude",
  template: "Visual Essay",
  backLink: "/essays",
  backLabel: "Essays",
  palette: [
    { name: "Deep Black", color: "#0D0D0D" },
    { name: "Aged Gold", color: "#C9B037" },
    { name: "Dark Red", color: "#8B0000" },
    { name: "Warm White", color: "#E8E8E8" },
    { name: "Searing Flash", color: "#FFFEF0" },
    { name: "Document Cream", color: "#D4C5A9" },
  ],
  visualizations: [
    { name: "Chain Reaction Progress Bar", type: "Scroll-driven Indicator" },
    { name: "Trinity Countdown", type: "Scroll-Lock Animation" },
    { name: "Ken Burns Photo Treatment", type: "Parallax Depth" },
    { name: "Cinematic Reveals", type: "Intersection Animations" },
    { name: "Scientist Profiles", type: "Portrait Cards" },
    { name: "Before/After Slider", type: "Interactive Comparison" },
    { name: "Declassified Documents", type: "Archival Treatment" },
  ],
  keySources: [
    "Richard Rhodes, The Making of the Atomic Bomb (1986)",
    "Kai Bird & Martin Sherwin, American Prometheus (2005)",
    "John Hersey, Hiroshima (1946)",
    "Los Alamos National Laboratory Digital Archives",
    "National Archives and Records Administration",
    "Atomic Heritage Foundation",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/history/the-manhattan-project/#article",
      "headline": "Now I Am Become Death: The Making of the Atomic Bomb",
      "alternativeHeadline": "The Secret Race to Split the Atom",
      "description":
        "A photo-driven visual essay chronicling humanity's most consequential scientific endeavor—the secret race to split the atom. From Einstein's 1939 letter to the ashes of Hiroshima, experience the Manhattan Project through declassified photographs and the faces of those who changed history.",
      "url": "https://esy.com/essays/history/the-manhattan-project/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-manhattan-project.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "History", "item": "https://esy.com/essays/history/" },
        { "@type": "ListItem", "position": 4, "name": "The Manhattan Project", "item": "https://esy.com/essays/history/the-manhattan-project/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What was the Manhattan Project?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Manhattan Project was the secret U.S. government program (1942–1946) that developed the first nuclear weapons, involving over 125,000 workers at facilities across the country."
          }
        },
        {
          "@type": "Question",
          "name": "Who led the Manhattan Project?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "J. Robert Oppenheimer was the scientific director of the Los Alamos Laboratory, while General Leslie Groves oversaw the entire military-industrial operation."
          }
        },
        {
          "@type": "Question",
          "name": "What was the Trinity test?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Trinity was the code name for the first detonation of a nuclear device on July 16, 1945, in New Mexico. Its success confirmed the bomb's viability weeks before Hiroshima."
          }
        },
        {
          "@type": "Question",
          "name": "Why did Einstein write to Roosevelt?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In August 1939, Einstein signed a letter to President Roosevelt warning that Nazi Germany might develop atomic weapons, urging U.S. research—this letter helped launch the Manhattan Project."
          }
        },
        {
          "@type": "Question",
          "name": "What was the human cost of the atomic bombs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The atomic bombings of Hiroshima (August 6, 1945) and Nagasaki (August 9, 1945) killed an estimated 110,000–210,000 people immediately, with many more dying from radiation effects."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Now I Am Become Death: The Making of the Atomic Bomb | Esy",
  description:
    "A photo-driven visual essay chronicling humanity's most consequential scientific endeavor—the secret race to split the atom. From Einstein's 1939 letter to the ashes of Hiroshima, experience the Manhattan Project through declassified photographs and the faces of those who changed history.",
  keywords: [
    "Manhattan Project",
    "atomic bomb",
    "nuclear weapons",
    "Oppenheimer",
    "Trinity test",
    "Hiroshima",
    "Nagasaki",
    "Los Alamos",
    "World War II",
    "nuclear history",
    "Enrico Fermi",
    "Einstein letter",
    "visual essay",
    "historical documentary"
  ],
  openGraph: {
    title: "Now I Am Become Death: The Making of the Atomic Bomb",
    description:
      "The secret race to split the atom—told through declassified photographs and the faces of those who changed history forever.",
    type: "article",
    url: "https://esy.com/essays/history/the-manhattan-project/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-manhattan-project.png",
        width: 1200,
        height: 630,
        alt: "Now I Am Become Death: The Making of the Atomic Bomb"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Now I Am Become Death: The Making of the Atomic Bomb",
    description:
      "The Manhattan Project—told through declassified photographs. A visual essay about science, secrecy, and the bomb that ended one war and started another.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-manhattan-project.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/history/the-manhattan-project/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  },
  category: "education",
  publisher: "Esy"
};

export default function TheManhattanProjectPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <ManhattanProjectClient />
      </ArtifactDetailWrapper>
    </>
  );
}
