import type { Metadata } from 'next';
import DNAHelixClient from './DNAHelixClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-dna-helix/#article",
      "headline": "DNA & The Double Helix: The Code of Life",
      "alternativeHeadline": "From Miescher to CRISPR: The Complete Story of DNA",
      "description": "Watch the double helix twist as you scroll — base pairs connect (A-T, G-C), Photo 51 reveals, and genetic sequences type out. The complete story of DNA from Miescher to CRISPR.",
      "url": "https://esy.com/essays/the-dna-helix/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-dna-helix.png",
      "articleSection": "Science",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The DNA Helix", "item": "https://esy.com/essays/the-dna-helix/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who discovered the structure of DNA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "James Watson and Francis Crick published the double helix structure in 1953, but relied heavily on Rosalind Franklin's X-ray crystallography data (Photo 51). Franklin's crucial contribution was long underrecognized; she died in 1958 and wasn't included in the 1962 Nobel Prize."
          }
        },
        {
          "@type": "Question",
          "name": "What is Photo 51?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Photo 51 is the famous X-ray diffraction image of DNA taken by Rosalind Franklin in 1952. Its distinctive X pattern revealed DNA's helical structure and dimensions. Watson later saw this image without Franklin's permission, helping him and Crick solve the structure."
          }
        },
        {
          "@type": "Question",
          "name": "What are base pairs in DNA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Base pairs are the 'rungs' of the DNA ladder. Adenine (A) always pairs with Thymine (T), and Guanine (G) always pairs with Cytosine (C). This complementary pairing allows DNA to replicate accurately and carries the genetic code for all life."
          }
        },
        {
          "@type": "Question",
          "name": "What is CRISPR?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CRISPR-Cas9 is a gene-editing technology discovered in 2012 by Jennifer Doudna and Emmanuelle Charpentier. It allows precise cutting and modification of DNA sequences, revolutionizing medicine, agriculture, and biology. They received the 2020 Nobel Prize in Chemistry."
          }
        },
        {
          "@type": "Question",
          "name": "What was the Human Genome Project?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Human Genome Project (1990-2003) was an international effort to sequence all 3 billion base pairs of human DNA. It cost $2.7 billion and took 13 years. Today, the same sequencing costs under $1,000 and takes hours, enabling personalized medicine."
          }
        },
        {
          "@type": "Question",
          "name": "Who first discovered DNA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Friedrich Miescher first isolated DNA (which he called 'nuclein') in 1869 from white blood cells in used bandages. He didn't understand its function—that took another 75 years until Oswald Avery proved DNA carries genetic information in 1944."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'DNA & The Double Helix | The Code of Life | Esy',
  description: 'Watch the double helix twist as you scroll — base pairs connect (A-T, G-C), Photo 51 reveals, and genetic sequences type out. The complete story of DNA from Miescher to CRISPR.',
  keywords: [
    'DNA discovery',
    'double helix',
    'Watson and Crick',
    'Rosalind Franklin',
    'Photo 51',
    'genetics history',
    'CRISPR',
    'Human Genome Project',
    'base pairs',
    'scrollytelling'
  ],
  openGraph: {
    title: 'DNA & The Double Helix | The Code of Life',
    description: 'The helix twists with your scroll. The complete story of DNA discovery.',
    type: 'article',
    url: 'https://esy.com/essays/the-dna-helix/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/the-dna-helix.png',
        width: 1200,
        height: 630,
        alt: 'DNA & The Double Helix - The Code of Life'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DNA & The Double Helix | The Code of Life',
    description: 'From Miescher\'s nuclein to CRISPR gene editing — the molecule that codes life.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-dna-helix.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/the-dna-helix/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function TheDNAHelixPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DNAHelixClient />
    </>
  );
}
