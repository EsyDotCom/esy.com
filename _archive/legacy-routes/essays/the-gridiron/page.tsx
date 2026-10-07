import { Metadata } from "next";
import GridironClient from "./GridironClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-gridiron/#article",
      "headline": "The Gridiron: How American Football Conquered America",
      "alternativeHeadline": "From Deadly College Brawls to 113 Million Super Bowl Viewers",
      "description": "From deadly college brawls to 113 million Super Bowl viewers—the extraordinary story of how a chaotic rugby variant became America's most watched sport. Explore Walter Camp's revolution, the 1905 death crisis, and football's rise to cultural dominance.",
      "url": "https://esy.com/essays/the-gridiron/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-gridiron.png",
      "articleSection": "Sports",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Gridiron", "item": "https://esy.com/essays/the-gridiron/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented American football?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Walter Camp, known as the 'Father of American Football,' transformed rugby-style games into modern football at Yale in the 1880s. He introduced the line of scrimmage, downs system, snap from center, and the gridiron field—the sport's defining features."
          }
        },
        {
          "@type": "Question",
          "name": "Why was football almost banned in 1905?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In 1905, at least 18 college players died from football injuries. The brutal 'flying wedge' and mass momentum plays caused horrific casualties. President Theodore Roosevelt intervened, threatening to ban the sport unless rules were reformed to reduce violence."
          }
        },
        {
          "@type": "Question",
          "name": "When was the forward pass invented?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The forward pass was legalized in 1906 as part of safety reforms after the 1905 death crisis. Notre Dame's 1913 upset of Army, using innovative passing plays, demonstrated its strategic potential and transformed football into an open, dynamic game."
          }
        },
        {
          "@type": "Question",
          "name": "When was the NFL founded?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The NFL was founded on August 20, 1920, in Canton, Ohio, originally as the American Professional Football Association. Legendary athlete Jim Thorpe was its first president. It was renamed the National Football League in 1922."
          }
        },
        {
          "@type": "Question",
          "name": "What was the first Super Bowl?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Super Bowl I was played on January 15, 1967, at the Los Angeles Memorial Coliseum. The NFL's Green Bay Packers defeated the AFL's Kansas City Chiefs 35-10. Tickets cost $12, and the game wasn't even sold out."
          }
        },
        {
          "@type": "Question",
          "name": "Why is American football called 'football'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "American football evolved from rugby football, which itself developed from various kicking games. Though the modern game emphasizes carrying and throwing, its origins in foot-based games explain the name. The word 'gridiron' comes from the field's lined pattern."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The Gridiron: How American Football Conquered America | Esy",
  description:
    "From deadly college brawls to 113 million Super Bowl viewers—the extraordinary story of how a chaotic rugby variant became America's most watched sport. Explore Walter Camp's revolution, the 1905 death crisis, and football's rise to cultural dominance.",
  keywords: [
    "american football history",
    "NFL history",
    "Walter Camp",
    "Super Bowl",
    "football origins",
    "gridiron",
    "college football",
    "football evolution",
    "sports history",
    "visual essay",
  ],
  openGraph: {
    title: "The Gridiron: How American Football Conquered America",
    description:
      "From deadly college brawls to 113 million Super Bowl viewers. The extraordinary story of American football.",
    url: "https://esy.com/essays/the-gridiron/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-gridiron.png",
        width: 1200,
        height: 630,
        alt: "The Gridiron: How American Football Conquered America"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The Gridiron: How American Football Conquered America",
    description:
      "From deadly college brawls to 113 million Super Bowl viewers. The extraordinary story of American football.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-gridiron.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/the-gridiron/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function TheGridironPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GridironClient />
    </>
  );
}
