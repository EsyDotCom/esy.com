import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import HowToWriteAHookClient from './HowToWriteAHookClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/foundations/how-to-write-a-hook/#article",
      "headline": "How to Write a Hook — The Cognitive Architecture of Openings",
      "alternativeHeadline": "Understanding hooks as cognitive thresholds, not tips",
      "description": "A visual essay exploring the cognitive science of essay hooks. Discover how hooks function as doorways between the reader's world and the essay's world through Loewenstein's information gap theory, Radvansky's doorway effect, and classical rhetoric.",
      "url": "https://esy.com/essays/foundations/how-to-write-a-hook/",
      "datePublished": "2025-12-19",
      "dateModified": "2025-12-19",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/how-to-write-a-hook.png",
      "articleSection": "Writing Guides",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Foundations", "item": "https://esy.com/essays/foundations/" },
        { "@type": "ListItem", "position": 4, "name": "How to Write a Hook", "item": "https://esy.com/essays/foundations/how-to-write-a-hook/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a hook in essay writing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A hook is not merely a clever first sentence—it's a cognitive threshold. It functions as a doorway between the reader's world and the essay's world. Research by Gabriel Radvansky shows that crossing thresholds creates 'event boundaries' in the brain, causing mental resets. A hook leverages this mechanism to transform readers from outsiders to insiders."
          }
        },
        {
          "@type": "Question",
          "name": "Why do hooks work according to cognitive science?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hooks work through multiple cognitive mechanisms: 1) Information Gap Theory (Loewenstein): Curiosity arises when attention focuses on a gap in knowledge, creating cognitive 'hunger.' 2) Attention allocation (Kahneman): Novelty and surprise trigger System 2 engagement. 3) Schema activation (Bartlett): First sentences activate mental frameworks that shape all subsequent interpretation."
          }
        },
        {
          "@type": "Question",
          "name": "What are the different types of essay hooks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Different essay intents require different hook strategies: Informative essays use context + significance hooks; Argumentative essays use claim-tension hooks; Analytical essays use question hooks; Narrative essays use scene hooks (in medias res). Cicero distinguished between principium (direct opening) and insinuatio (subtle approach) depending on audience receptivity."
          }
        },
        {
          "@type": "Question",
          "name": "Why do hooks fail?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hooks fail for several reasons identified by both classical rhetoricians and cognitive science: 1) Gap too large (confuses rather than intrigues), 2) Gap too small (reveals everything, no motivation), 3) Schema mismatch (activates wrong mental framework), 4) Visible artifice (Quintilian warned against obvious technique), 5) 'Engfish' (Macrorie's term for formulaic writing that sounds fake)."
          }
        },
        {
          "@type": "Question",
          "name": "What is the doorway effect in cognitive science?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The doorway effect, discovered by Gabriel Radvansky and David Copeland (2006), shows that passing through doorways impairs short-term memory because doorways serve as 'event boundaries' in the mind. The brain compartmentalizes what came before and prepares for what comes after. Essay hooks function similarly—they create cognitive event boundaries that signal a new mental episode is beginning."
          }
        },
        {
          "@type": "Question",
          "name": "How do I write a good hook?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use the four-question framework: 1) Who is the reader? 2) What context do they lack? 3) What expectation must be set? 4) What gap should exist after the first sentence? Remember Murray's insight: good hooks are often discovered through revision, not pre-planned. Write the body first, then find your hook—it emerges as you understand your argument."
          }
        }
      ]
    }
  ]
};

export const metadata = createVisualEssayMetadata({
  slug: 'foundations/how-to-write-a-hook',
  title: 'How to Write a Hook — The Cognitive Architecture of Openings | Esy Visual Essay',
  description: 'A visual essay exploring the cognitive science of essay hooks. Discover how hooks function as cognitive thresholds through Loewenstein\'s information gap theory, Radvansky\'s doorway effect, and classical rhetoric from Aristotle to Quintilian. Typography-forward design with no photography.',
  ogTitle: 'How to Write a Hook — The Cognitive Architecture of Openings',
  ogDescription: 'Hooks are cognitive thresholds, not tips. Discover the mechanism that transforms readers from outsiders to insiders.',
  keywords: [
    'how to write a hook',
    'essay hooks',
    'essay writing',
    'cognitive science of writing',
    'information gap theory',
    'Loewenstein curiosity',
    'doorway effect',
    'Radvansky',
    'classical rhetoric',
    'Aristotle rhetoric',
    'Cicero exordium',
    'Quintilian',
    'writing pedagogy',
    'visual essay',
    'Montaigne',
    'essay introduction',
  ],
  publishedTime: '2025-12-19T00:00:00.000Z',
});

export default function HowToWriteAHookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HowToWriteAHookClient />
    </>
  );
}
