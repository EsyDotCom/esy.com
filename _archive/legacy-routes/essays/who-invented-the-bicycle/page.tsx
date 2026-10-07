import type { Metadata } from "next";
import BicycleHistoryClient from "./BicycleHistoryClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/who-invented-the-bicycle/#article",
      "headline": "Who Invented the Bicycle? The 200-Year Story of Two Wheels",
      "alternativeHeadline": "From Karl von Drais's 1817 Running Machine to Modern Carbon Fiber Racers",
      "description": "From Karl von Drais's 1817 running machine to modern carbon fiber racers, discover the fascinating 200-year history of the bicycle. An immersive scrollytelling journey through the invention that changed the world.",
      "url": "https://esy.com/essays/who-invented-the-bicycle/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/who-invented-the-bicycle.png",
      "articleSection": "Technology History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Who Invented the Bicycle", "item": "https://esy.com/essays/who-invented-the-bicycle/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented the first bicycle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Karl von Drais, a German inventor, created the first two-wheeled human-powered vehicle in 1817. Called the 'Laufmaschine' (running machine) or 'draisine,' riders straddled the wooden frame and pushed along the ground with their feet. It had no pedals."
          }
        },
        {
          "@type": "Question",
          "name": "What was the penny-farthing bicycle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The penny-farthing (1870s-1880s) featured a huge front wheel up to 5 feet tall and a tiny rear wheel. The large front wheel allowed for greater speed with each pedal rotation. However, it was dangerous—riders sat high up and could be thrown forward over the handlebars in 'headers.'"
          }
        },
        {
          "@type": "Question",
          "name": "When was the safety bicycle invented?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "John Kemp Starley invented the modern 'safety bicycle' in 1885 with his Rover. It featured two equal-sized wheels, a chain-driven rear wheel, and a diamond frame—the basic design still used today. It made cycling accessible to everyone, including women."
          }
        },
        {
          "@type": "Question",
          "name": "How did bicycles help women's liberation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The bicycle gave women unprecedented mobility and independence in the 1890s. Susan B. Anthony said it 'has done more to emancipate women than anything else in the world.' Cycling challenged restrictive clothing (leading to bloomers) and Victorian ideas about female fragility."
          }
        },
        {
          "@type": "Question",
          "name": "When was the Tour de France first held?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The first Tour de France was held in 1903, organized by newspaper L'Auto to boost circulation. Only 21 of 60 starters finished the 2,428km race. Maurice Garin won. Today it's the world's most prestigious cycling race, covering about 3,500km over three weeks."
          }
        },
        {
          "@type": "Question",
          "name": "What was the velocipede?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The velocipede (1860s), also called the 'boneshaker,' was the first pedal-powered bicycle. French inventors Pierre Michaux and Pierre Lallement added cranks and pedals directly to the front wheel. Its iron tires on cobblestones earned it the 'boneshaker' nickname."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Who Invented the Bicycle? The 200-Year Story of Two Wheels | Esy",
  description:
    "From Karl von Drais's 1817 running machine to modern carbon fiber racers, discover the fascinating 200-year history of the bicycle. An immersive scrollytelling journey through the invention that changed the world.",
  keywords: [
    "bicycle history",
    "who invented the bicycle",
    "Karl von Drais",
    "velocipede",
    "penny-farthing",
    "safety bicycle",
    "cycling history",
    "Tour de France",
    "women's liberation bicycle",
    "scrollytelling"
  ],
  openGraph: {
    title: "Who Invented the Bicycle? The 200-Year Story of Two Wheels",
    description:
      "Discover the 200-year journey of the bicycle through an immersive scrollytelling experience.",
    type: "article",
    url: "https://esy.com/essays/who-invented-the-bicycle/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/who-invented-the-bicycle.png",
        width: 1200,
        height: 630,
        alt: "Who Invented the Bicycle - The 200-Year Story"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Who Invented the Bicycle? | Esy",
    description:
      "Discover the 200-year journey of the bicycle through an immersive scrollytelling experience.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/who-invented-the-bicycle.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/who-invented-the-bicycle/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function WhoInventedTheBicyclePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BicycleHistoryClient />
    </>
  );
}
