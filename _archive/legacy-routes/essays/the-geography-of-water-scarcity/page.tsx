import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import GeographyOfWaterScarcityClient from './GeographyOfWaterScarcityClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-geography-of-water-scarcity/#article",
      "headline": "The Geography of Water Scarcity",
      "alternativeHeadline": "Water Scarcity Is Not a Natural Disaster — It Is a Design Problem",
      "description": "An interactive visual essay exploring why water scarcity is not a natural disaster but a design problem shaped by human decisions. Featuring interactive choropleth maps, animated flow diagrams, country comparisons, and scroll-driven data visualizations.",
      "url": "https://esy.com/essays/the-geography-of-water-scarcity/",
      "datePublished": "2026-02-08",
      "dateModified": "2026-02-08",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-geography-of-water-scarcity.png",
      "articleSection": "Science",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Geography of Water Scarcity", "item": "https://esy.com/essays/the-geography-of-water-scarcity/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is water scarcity?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Water scarcity occurs when the demand for freshwater exceeds the available supply in a given region. It is measured by the water stress index — the ratio of total withdrawals to available renewable supply. Over 2.3 billion people live in water-stressed countries."
          }
        },
        {
          "@type": "Question",
          "name": "Why does agriculture use so much water?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Agriculture accounts for approximately 70% of all global freshwater withdrawals. Irrigation alone uses 85% of agricultural water. A single kilogram of beef requires approximately 15,400 liters of water to produce."
          }
        },
        {
          "@type": "Question",
          "name": "Is water scarcity caused by climate change?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Climate change accelerates water scarcity by shifting precipitation patterns and increasing evaporation, but it is not the primary cause. The larger drivers are population growth and agricultural demand. Each degree of warming can reduce renewable water by 20% in already-stressed areas."
          }
        },
        {
          "@type": "Question",
          "name": "Can water scarcity be solved?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Water scarcity is a design problem, not an inevitable fate. Countries like Israel (85% wastewater recycling) and Singapore (Four National Taps strategy) demonstrate that policy, infrastructure investment, and governance can produce dramatically different water outcomes from similar natural conditions."
          }
        }
      ]
    }
  ]
};

export const metadata = createVisualEssayMetadata({
  slug: 'the-geography-of-water-scarcity',
  basePath: 'essays',
  title: 'The Geography of Water Scarcity | Esy Visual Essay',
  description: 'An interactive visual essay exploring why water scarcity is not a natural disaster but a design problem shaped by human decisions. Featuring interactive maps, animated flow diagrams, and scroll-driven data visualizations with 1,500+ words of editorial prose.',
  ogTitle: 'The Geography of Water Scarcity',
  ogDescription: 'Water scarcity is not a natural disaster — it is a design problem. An interactive data journalism essay with 5 custom visualizations.',
  keywords: [
    'water scarcity',
    'water stress',
    'water crisis',
    'data visualization',
    'interactive essay',
    'water policy',
    'agriculture water use',
    'freshwater',
    'choropleth map',
    'visual essay',
    'data journalism',
  ],
  publishedTime: '2026-02-08T00:00:00.000Z',
});

export default function TheGeographyOfWaterScarcityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GeographyOfWaterScarcityClient />
    </>
  );
}
