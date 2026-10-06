import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';
import TheWordEssayClient from './TheWordEssayClient';

const ESSAY_META = {
  title: 'Essay — A History of Attempting to Think',
  subtitle: 'How a French Word Meaning "To Try" Became the Form That Thinks Out Loud',
  category: 'Etymology',
  readTime: '20 min',
  sourceCount: 14,
  sourceTier: 'Tier-1',
  sectionCount: 6,
  visualizationCount: 5,
  designSystem: 'Subject-derived',
  published: 'December 2025',
  model: 'Claude',
  template: 'Visual Essay',
  backLink: '/essays',
  backLabel: 'Essays',
  palette: [
    { name: 'Garamond Ink', color: '#1A1A2E' },
    { name: 'Parchment Cream', color: '#F5F0E1' },
    { name: 'Montaigne Gold', color: '#C9A84C' },
    { name: 'Bacon Brown', color: '#5C4033' },
    { name: 'Modern Slate', color: '#4A5568' },
  ],
  visualizations: [
    { name: 'Era-Evolving Typefaces', type: 'Typography Morphing' },
    { name: 'Essayist Timeline', type: 'Interactive Timeline' },
    { name: 'Word Etymology Chain', type: 'Animated Sequence' },
    { name: 'Chapter Transitions', type: 'Scroll Animation' },
    { name: 'Key Figures Gallery', type: 'Portrait Cards' },
  ],
  keySources: [
    'Michel de Montaigne, Essais (1580)',
    'Francis Bacon, Essayes (1597)',
    'Virginia Woolf, The Common Reader',
    'Phillip Lopate, The Art of the Personal Essay',
    'Oxford English Dictionary',
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/etymology/the-word-essay/#article",
      "headline": "Essay — A History of Attempting to Think",
      "alternativeHeadline": "How a French Word Meaning 'To Try' Became the Form That Thinks Out Loud",
      "description": "From Latin 'exigere' (to weigh) through Michel de Montaigne's 1580 'Essais' to modern blogs and video essays—trace the 450-year journey of the word that means 'to try.' A typography-forward visual essay featuring era-evolving typefaces from Garamond to Gill Sans.",
      "url": "https://esy.com/essays/etymology/the-word-essay/",
      "datePublished": "2025-12-14",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-word-essay.png",
      "articleSection": "Etymology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Etymology", "item": "https://esy.com/essays/etymology/" },
        { "@type": "ListItem", "position": 3, "name": "The Word Essay", "item": "https://esy.com/essays/etymology/the-word-essay/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented the essay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Michel de Montaigne invented the essay form in 1580 when he published his 'Essais' in France. The title meant 'attempts' or 'tries'—Montaigne saw his writings as experiments in thinking rather than definitive statements. He wrote on everything from cannibals to thumbs."
          }
        },
        {
          "@type": "Question",
          "name": "What does 'essay' mean etymologically?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Essay comes from the French 'essayer' meaning 'to try' or 'to attempt,' which derives from Late Latin 'exagium' (a weighing, weight) and ultimately from 'exigere' (to examine, weigh). An essay is literally an 'attempt' at exploring a subject—thinking in progress."
          }
        },
        {
          "@type": "Question",
          "name": "How did Francis Bacon change the essay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Francis Bacon brought the essay to England in 1597 with his 'Essayes,' but transformed the form. Where Montaigne was personal and meandering, Bacon was concise and aphoristic—more like advice than exploration. This created two essay traditions: the personal and the formal."
          }
        },
        {
          "@type": "Question",
          "name": "What is the personal essay tradition?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The personal essay tradition descends from Montaigne through writers like Charles Lamb, Virginia Woolf, James Baldwin, and Joan Didion. It uses the self as lens to explore universal themes, prizes voice and observation, and finds meaning in the mundane. It's thinking as an intimate act."
          }
        },
        {
          "@type": "Question",
          "name": "What are video essays?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Video essays emerged on YouTube in the 2010s, combining documentary, criticism, and personal reflection with visuals. Creators like Every Frame a Painting, Contrapoints, and Hbomberguy brought essay thinking to new audiences. The form Montaigne invented keeps adapting to new media."
          }
        },
        {
          "@type": "Question",
          "name": "Who are famous essayists?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Major essayists include: Montaigne (inventor of the form), Francis Bacon (English adapter), Samuel Johnson, Charles Lamb, Ralph Waldo Emerson, Virginia Woolf, George Orwell, James Baldwin, Joan Didion, and Susan Sontag. Each expanded what the essay could do and be."
          }
        }
      ]
    }
  ]
};

export const metadata = createVisualEssayMetadata({
  slug: 'the-word-essay',
  basePath: 'essays/etymology',
  title: 'Essay — A History of Attempting to Think | Esy Visual Essay',
  description: 'From Latin "exigere" (to weigh) through Michel de Montaigne\'s 1580 "Essais" to modern blogs and video essays—trace the 450-year journey of the word that means "to try." A typography-forward visual essay featuring era-evolving typefaces from Garamond to Gill Sans.',
  ogTitle: 'Essay — A History of Attempting to Think',
  ogDescription: 'How a humble French word meaning "to try" became the form that thinks out loud. 450 years of etymology, from Montaigne to Didion.',
  keywords: [
    'essay etymology',
    'origin of the word essay',
    'Michel de Montaigne',
    'Essais',
    'Francis Bacon',
    'Virginia Woolf',
    'James Baldwin',
    'Joan Didion',
    'literary history',
    'typography history',
    'Garamond',
    'essay form',
    'word origin',
    'visual essay',
  ],
  publishedTime: '2025-12-14T00:00:00.000Z',
});

export default function TheWordEssayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <TheWordEssayClient />
      </ArtifactDetailWrapper>
    </>
  );
}
