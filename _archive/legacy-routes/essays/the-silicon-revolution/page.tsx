import { Metadata } from "next";
import SiliconRevolutionClient from "./SiliconRevolutionClient";
import { ogImage } from "./images";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-silicon-revolution/#article",
      "headline": "The Silicon Revolution: How a Tiny Switch Changed Everything",
      "alternativeHeadline": "From Bell Labs to Billion-Transistor Chips",
      "description": "A visual essay tracing the semiconductor industry from the 1947 transistor invention at Bell Labs to today's geopolitical chip wars. Explore the science, the visionaries, and why these tiny switches now shape the fate of nations.",
      "url": "https://esy.com/essays/the-silicon-revolution/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-silicon-revolution.png",
      "articleSection": "Technology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Silicon Revolution", "item": "https://esy.com/essays/the-silicon-revolution/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented the transistor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The transistor was invented in 1947 at Bell Labs by John Bardeen, Walter Brattain, and William Shockley. They received the Nobel Prize in Physics in 1956 for this world-changing invention."
          }
        },
        {
          "@type": "Question",
          "name": "What is Moore's Law?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Moore's Law is the observation by Intel co-founder Gordon Moore in 1965 that the number of transistors on a chip doubles approximately every two years. This has held remarkably true for over 50 years, driving exponential growth in computing power."
          }
        },
        {
          "@type": "Question",
          "name": "Why is TSMC so important to the semiconductor industry?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "TSMC (Taiwan Semiconductor Manufacturing Company) manufactures over 90% of the world's most advanced chips. Founded by Morris Chang in 1987, it pioneered the foundry model and now produces chips for Apple, AMD, Nvidia, and most major tech companies."
          }
        },
        {
          "@type": "Question",
          "name": "What is EUV lithography?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "EUV (Extreme Ultraviolet) lithography uses 13.5nm wavelength light to print incredibly small circuit patterns on silicon wafers. ASML is the only company that makes these machines, which cost over $150 million each and are essential for chips below 7nm."
          }
        },
        {
          "@type": "Question",
          "name": "What is the CHIPS Act?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The CHIPS and Science Act is a 2022 U.S. law providing $52 billion in subsidies to boost domestic semiconductor manufacturing. It aims to reduce dependence on Asian chip production and address national security concerns about supply chain vulnerabilities."
          }
        },
        {
          "@type": "Question",
          "name": "How many transistors are in modern chips?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Modern processors contain tens of billions of transistors. Apple's M2 Ultra chip has 134 billion transistors, while Nvidia's H100 GPU contains 80 billion. In 1971, Intel's first commercial processor had just 2,300 transistors."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The Silicon Revolution: How a Tiny Switch Changed Everything | Esy",
  description:
    "A visual essay tracing the semiconductor industry from the 1947 transistor invention at Bell Labs to today's geopolitical chip wars. Explore the science, the visionaries, and why these tiny switches now shape the fate of nations.",
  keywords: [
    "semiconductor",
    "transistor",
    "silicon",
    "Moore's Law",
    "Intel",
    "TSMC",
    "chip manufacturing",
    "integrated circuit",
    "Bell Labs",
    "Gordon Moore",
    "Morris Chang",
    "CHIPS Act",
    "visual essay",
    "technology history",
    "microprocessor",
    "EUV lithography",
  ],
  openGraph: {
    title: "The Silicon Revolution: How a Tiny Switch Changed Everything",
    description:
      "From Bell Labs to billion-transistor chips—the visual story of the invention that powers everything.",
    url: "https://esy.com/essays/the-silicon-revolution/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: ogImage.src,
        width: 1200,
        height: 630,
        alt: ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Silicon Revolution",
    description:
      "How a laboratory curiosity became the foundation of modern civilization. A visual essay on semiconductors, science, and geopolitics.",
    site: "@EsyResearch",
    images: [ogImage.src],
  },
  alternates: {
    canonical: "https://esy.com/essays/the-silicon-revolution/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function TheSiliconRevolutionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiliconRevolutionClient />
    </>
  );
}
