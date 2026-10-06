import type { Metadata } from 'next';
import LanguageDeathClient from './LanguageDeathClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/language-death/#article",
      "headline": "Language Death: The Silence of Extinction",
      "alternativeHeadline": "7,168 Languages Today—Half Will Disappear by 2100",
      "description": "An immersive scrollytelling experience exploring language endangerment. 7,168 languages exist today—half will disappear by 2100. Every 14 days, a language dies forever.",
      "url": "https://esy.com/essays/language-death/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/language-death.png",
      "articleSection": "Linguistics",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Language Death", "item": "https://esy.com/essays/language-death/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many languages are dying?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Of the world's approximately 7,168 languages, about half are endangered and may disappear by 2100. A language dies approximately every 14 days. UNESCO classifies languages from 'vulnerable' to 'extinct' based on intergenerational transmission—whether children are learning them."
          }
        },
        {
          "@type": "Question",
          "name": "Why do languages die?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Languages die when speakers shift to dominant languages for economic opportunity, education, or social mobility. Colonization, globalization, urbanization, and government suppression of minority languages accelerate death. When parents stop teaching their language to children, extinction is nearly inevitable."
          }
        },
        {
          "@type": "Question",
          "name": "What is lost when a language dies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Each language contains unique ways of categorizing the world, traditional ecological knowledge, oral histories, and cultural practices. Languages encode knowledge about medicinal plants, animal behavior, and sustainable practices accumulated over millennia. When a language dies, this irreplaceable knowledge often dies with it."
          }
        },
        {
          "@type": "Question",
          "name": "Can dead languages be revived?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Hebrew is the most successful example—revived from a liturgical language to a modern spoken language with millions of native speakers. Welsh, Maori, and Hawaiian have also seen significant revitalization. Success requires community commitment, government support, media, and education in the language."
          }
        },
        {
          "@type": "Question",
          "name": "What are the most endangered languages?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Many critically endangered languages have fewer than 100 speakers. Languages in Papua New Guinea, Australia, the Amazon, and Siberia are among the most threatened. Some languages have only one or two remaining speakers—when they die, the language dies with them forever."
          }
        },
        {
          "@type": "Question",
          "name": "How can endangered languages be saved?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Language preservation requires documentation (recording speakers), education (language nests for children), media (radio, TV, internet content), legal recognition, and economic incentives. Most importantly, communities must value and actively use their language. Technology can help through apps, AI transcription, and online resources."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'Language Death: The Silence of Extinction | Esy',
  description: 'An immersive scrollytelling experience exploring language endangerment. 7,168 languages exist today—half will disappear by 2100. Every 14 days, a language dies forever.',
  keywords: [
    'language death',
    'endangered languages',
    'linguistic diversity',
    'language extinction',
    'language preservation',
    'UNESCO endangered languages',
    'dying languages',
    'language revitalization',
    'linguistic heritage',
    'scrollytelling'
  ],
  openGraph: {
    title: 'Language Death: The Silence of Extinction | Esy',
    description: 'An immersive scrollytelling experience exploring language endangerment. 7,168 languages exist today—half will disappear by 2100.',
    type: 'article',
    url: 'https://esy.com/essays/language-death/',
    locale: 'en_US',
    siteName: 'Esy',
    images: [
      {
        url: 'https://esy.com/og/language-death.png',
        width: 1200,
        height: 630,
        alt: 'Language Death - The Silence of Extinction'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Language Death: The Silence of Extinction',
    description: 'An immersive scrollytelling experience. Every 14 days, a language dies forever.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/language-death.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/language-death/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function LanguageDeathPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LanguageDeathClient />
    </>
  );
}
