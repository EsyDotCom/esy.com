import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import TheBitterHistoryOfChocolateClient from './TheBitterHistoryOfChocolateClient';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';

/**
 * THE BITTER HISTORY OF CHOCOLATE
 * ================================
 * From the Blood of Gods to the Sweat of Children
 *
 * A 3,500-year visual history of cacao — from Olmec sacred drink
 * to $130 billion global industry. 5-movement cinematic structure,
 * 6 interactive visualizations, 12 verified academic sources.
 *
 * Research Package: ./research/
 * Design Research: ./DESIGN-RESEARCH.md
 * Intake: ./G1-INTAKE.md
 */

const ESSAY_META = {
  title: 'The Bitter History of Chocolate',
  subtitle: 'From the Blood of Gods to the Sweat of Children',
  category: 'History',
  subcategory: 'Food & Empire',
  readTime: '18 min',
  sourceCount: 12,
  sourceTier: 'Tier-1',
  sectionCount: 16,
  visualizationCount: 6,
  designSystem: 'Subject-derived',
  published: 'February 9, 2026',
  model: 'Claude Opus 4.6',
  template: 'Visual Essay',
  backLink: '/essays',
  backLabel: 'Essays',
  palette: [
    { name: 'Cacao Pod', color: '#8B4513' },
    { name: 'Cocoa Butter', color: '#F5DEB3' },
    { name: 'Nib Dark', color: '#2C1810' },
    { name: 'Maya Jade', color: '#4A8B6F' },
    { name: 'Colonial Gold', color: '#C8A951' },
    { name: 'Blood Red', color: '#8B1A1A' },
  ],
  visualizations: [
    { name: 'IngredientOracle', type: '7-Stage Cacao Transformation' },
    { name: 'MigrationTrail', type: 'Geographic Journey of Cacao' },
    { name: 'FlavorWheel', type: 'Chocolate Tasting Vocabulary' },
    { name: 'TimefoldSlider', type: '3,500-Year Timeline' },
    { name: 'Price Split', type: 'Chocolate Bar Cost Breakdown' },
    { name: 'Pod Crack', type: 'Hero Scroll-Lock' },
  ],
  keySources: [
    'Coe & Coe — The True History of Chocolate (2013)',
    'NORC at University of Chicago — Child Labor in Cocoa (2020)',
    'Cocoa Barometer 2022 — VOICE Network',
    'Cortes — Letters from Mexico (Yale, 2001)',
  ],
  citationFirst: false,
};

export const metadata = createVisualEssayMetadata({
  slug: 'the-bitter-history-of-chocolate',
  basePath: 'essays',
  title: 'The Bitter History of Chocolate | Esy Visual Essay',
  description:
    'An interactive visual essay tracing chocolate\'s 3,500-year journey from sacred Mesoamerican substance to $130 billion global industry. Featuring IngredientOracle, MigrationTrail, FlavorWheel, and TimefoldSlider interactions with 12 verified academic sources.',
  ogTitle: 'The Bitter History of Chocolate',
  ogDescription:
    'From the blood of gods to the sweat of children. A 3,500-year visual history of chocolate with interactive explorations.',
  keywords: [
    'history of chocolate',
    'chocolate history',
    'cacao history',
    'Theobroma cacao',
    'Aztec chocolate',
    'Maya cacao',
    'cocoa child labor',
    'chocolate industry',
    'visual essay',
    'interactive history',
    'food history',
    'Mesoamerican cacao',
    'bean to bar',
    'cocoa farming',
    'chocolate production',
  ],
  publishedTime: '2026-02-09T00:00:00.000Z',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-bitter-history-of-chocolate/#article",
      "headline": "The Bitter History of Chocolate",
      "alternativeHeadline": "From the Blood of Gods to the Sweat of Children",
      "description":
        "An interactive visual essay tracing chocolate's 3,500-year journey from sacred Mesoamerican substance to the $130 billion global industry built on child labor. Featuring IngredientOracle, MigrationTrail, FlavorWheel, and TimefoldSlider interactions.",
      "url": "https://esy.com/essays/the-bitter-history-of-chocolate/",
      "datePublished": "2026-02-09",
      "dateModified": "2026-02-09",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" },
      },
      "image": "https://esy.com/og/the-bitter-history-of-chocolate.png",
      "articleSection": "History",
      "wordCount": 4000,
      "isAccessibleForFree": true,
      "inLanguage": "en-US",
      "mentions": [
        { "@type": "Person", "name": "Montezuma II" },
        { "@type": "Person", "name": "Hernan Cortes" },
        { "@type": "Person", "name": "Conrad van Houten" },
        { "@type": "Person", "name": "Joseph Fry" },
        { "@type": "Person", "name": "Rudolf Lindt" },
        { "@type": "Person", "name": "Milton Hershey" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "The Bitter History of Chocolate",
          "item": "https://esy.com/essays/the-bitter-history-of-chocolate/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where did chocolate originate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Chocolate originated with the Olmec civilization in lowland Mexico around 1500 BCE. The Maya and Aztec civilizations later developed elaborate cacao rituals. The Aztecs used cacao beans as currency and drank chocolate as a bitter, sacred ceremonial drink.",
          },
        },
        {
          "@type": "Question",
          "name": "How did chocolate come to Europe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hernan Cortes encountered cacao at Montezuma's court in 1519 and shipped it to Spain in 1528. Spanish colonists added sugar to the bitter drink, transforming it into a sweet luxury. Chocolate spread through European courts and chocolate houses became political salons.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the child labor problem in cocoa production?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "According to the NORC 2020 study commissioned by the U.S. Department of Labor, 1.56 million children are engaged in hazardous labor in cocoa production in Cote d'Ivoire and Ghana. Despite the Harkin-Engel Protocol of 2001, the industry has missed every child labor elimination deadline it set.",
          },
        },
        {
          "@type": "Question",
          "name": "What is Theobroma cacao?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Theobroma cacao is the scientific name for the cacao tree, given by Carl Linnaeus in 1753. It literally means 'food of the gods' in Greek — preserving the divine associations that Mesoamerican civilizations held for thousands of years.",
          },
        },
      ],
    },
  ],
};

export default function TheBitterHistoryOfChocolatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <TheBitterHistoryOfChocolateClient />
      </ArtifactDetailWrapper>
    </>
  );
}
