import type { Metadata } from 'next';
import SoldClient from './SoldClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/pornography-etymology/#article",
      "headline": "SOLD: The Etymology of Pornography",
      "alternativeHeadline": "From Ancient Greek Slave Markets to Modern Search Bars",
      "description": "From ancient Greek slave markets to modern search bars—trace the 2,500-year journey of a word born in commerce, shaped by scandal, and transformed by technology. A scholarly visual essay on etymology.",
      "url": "https://esy.com/essays/pornography-etymology/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/pornography-etymology.png",
      "articleSection": "Etymology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Pornography Etymology", "item": "https://esy.com/essays/pornography-etymology/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why is this essay called 'SOLD'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The title references the word's origin: 'porne' (πόρνη) derives from the Greek verb 'pernemi' meaning 'to sell.' The original pornai were enslaved women sold in ancient Greek markets, making commerce—not sex—the word's true root."
          }
        },
        {
          "@type": "Question",
          "name": "How did Victorian scholars shape the word's meaning?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "When archaeologists unearthed erotic art at Pompeii in the 1850s, they needed clinical terminology to discuss it. 'Pornography' was repurposed from ancient Greek to describe these artifacts, giving the word academic legitimacy while confining the objects to 'secret museums.'"
          }
        },
        {
          "@type": "Question",
          "name": "What Supreme Court cases shaped pornography law?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Key cases include Roth v. United States (1957), which established the 'prurient interest' test, and Miller v. California (1973), which created the three-part obscenity test still used today. Justice Potter Stewart famously said 'I know it when I see it.'"
          }
        },
        {
          "@type": "Question",
          "name": "How did the internet transform the word's usage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The digital age made 'porn' one of the most searched terms globally while simultaneously making it taboo to discuss openly. This paradox—ubiquitous yet unspeakable—represents the word's latest semantic evolution."
          }
        },
        {
          "@type": "Question",
          "name": "What is the connection between pornography and slavery?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Greek root 'porne' specifically referred to enslaved women sold for sexual purposes. The word carries within it 2,500 years of commodification, from ancient slave markets to modern digital platforms—a linguistic thread connecting exploitation across millennia."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'SOLD: The Etymology of Pornography | Esy',
  description: 'From ancient Greek slave markets to modern search bars—trace the 2,500-year journey of a word born in commerce, shaped by scandal, and transformed by technology. A scholarly visual essay on etymology.',
  keywords: [
    'etymology',
    'pornography etymology',
    'Greek language',
    'linguistic history',
    'word origin',
    'cultural history',
    'visual essay',
    'Victorian era',
    'Supreme Court obscenity',
  ],
  openGraph: {
    title: 'SOLD: The Etymology of Pornography',
    description: 'From ancient Greek πόρνη to modern search bar—the 2,500-year journey of a word society couldn\'t stop using or openly discuss.',
    type: 'article',
    url: 'https://esy.com/essays/pornography-etymology/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/pornography-etymology.png',
        width: 1200,
        height: 630,
        alt: 'SOLD: The Etymology of Pornography - A Visual Essay',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLD: The Etymology of Pornography',
    description: 'From ancient Greek πόρνη to modern search bar—the 2,500-year journey of a forbidden word.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/pornography-etymology.png'],
  },
  alternates: {
    canonical: 'https://esy.com/essays/pornography-etymology/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function SoldPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SoldClient />
    </>
  );
}
