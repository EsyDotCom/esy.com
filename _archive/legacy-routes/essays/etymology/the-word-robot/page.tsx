/**
 * ROBOT — Grand Machina
 * Visual Essay on the Etymology of "Robot"
 *
 * Migrated to createVisualEssayMetadata pattern: December 13, 2025
 * @see /docs/VISUAL_ESSAY_METADATA_PATTERN.md
 */
import { createVisualEssayMetadata } from "@/lib/visual-essay-metadata";
import ArtifactDetailWrapper from "@/components/ArtifactDetail";
import TheWordRobotClient from "./TheWordRobotClient";

const ESSAY_META = {
  title: "ROBOT — Grand Machina",
  subtitle: "The Word That Built Our Future, and Now Shares Our Bed",
  category: "Etymology",
  readTime: "25 min",
  sourceCount: 16,
  sourceTier: "Tier-1",
  sectionCount: 7,
  visualizationCount: 6,
  designSystem: "Subject-derived",
  published: "December 2025",
  model: "Claude",
  template: "Visual Essay",
  backLink: "/essays",
  backLabel: "Essays",
  palette: [
    { name: "Czech Steel", color: "#4A5568" },
    { name: "Factory Orange", color: "#D97706" },
    { name: "Asimov Blue", color: "#1E40AF" },
    { name: "Terminator Red", color: "#DC2626" },
    { name: "Digital White", color: "#F8F8F8" },
  ],
  visualizations: [
    { name: "Etymology Chain", type: "Animated Sequence" },
    { name: "Robot Evolution Timeline", type: "Interactive Timeline" },
    { name: "Uncanny Valley Graph", type: "Data Visualization" },
    { name: "Era Typography Shifts", type: "Visual Morphing" },
    { name: "Key Figures Gallery", type: "Portrait Cards" },
    { name: "Cultural Milestones", type: "Interactive Cards" },
  ],
  keySources: [
    "Karel Čapek, R.U.R. (1920)",
    "Isaac Asimov, I, Robot (1950)",
    "Masahiro Mori, The Uncanny Valley (1970)",
    "Oxford English Dictionary, 'robot' entry",
    "George Devol, Unimate patent (1954)",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/etymology/the-word-robot/#article",
      "headline": "ROBOT — Grand Machina: The Word That Built Our Future",
      "alternativeHeadline": "From Karel Čapek's 1920 Czech Play to Human-Robot Intimacy",
      "description": "The Word That Built Our Future, and Now Shares Our Bed. From Karel Čapek's 1920 Czech play to human-robot intimacy—trace the 105-year journey of 'robot' through etymology, industry, fear, domestication, and coexistence.",
      "url": "https://esy.com/essays/etymology/the-word-robot/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/images/robot/robot-hero.jpg",
      "articleSection": "Etymology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Etymology", "item": "https://esy.com/essays/etymology/" },
        { "@type": "ListItem", "position": 3, "name": "The Word Robot", "item": "https://esy.com/essays/etymology/the-word-robot/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented the word robot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The word 'robot' was coined by Czech writer Karel Čapek in his 1920 play R.U.R. (Rossum's Universal Robots). His brother Josef actually suggested the word, derived from the Czech 'robota' meaning 'forced labor' or 'servitude'—fitting for artificial workers created to serve humanity."
          }
        },
        {
          "@type": "Question",
          "name": "What does 'robota' mean in Czech?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "'Robota' is a Czech word meaning 'forced labor,' 'drudgery,' or 'servitude.' It comes from the Old Church Slavonic 'rabota' (servitude) and is related to 'rab' (slave). The word carried connotations of serfdom—the unpaid labor serfs owed to their lords—making it perfect for artificial workers."
          }
        },
        {
          "@type": "Question",
          "name": "What are Isaac Asimov's Three Laws of Robotics?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Asimov's Three Laws (1942): 1) A robot may not harm a human or allow harm through inaction. 2) A robot must obey humans except where it conflicts with the First Law. 3) A robot must protect its own existence unless it conflicts with the First or Second Law. These laws shaped decades of robot ethics in fiction."
          }
        },
        {
          "@type": "Question",
          "name": "What was the first industrial robot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unimate, installed at GM's New Jersey plant in 1961, was the first industrial robot. Created by George Devol and Joseph Engelberger, it performed die-casting and spot welding. It marked the beginning of factory automation and transformed manufacturing forever."
          }
        },
        {
          "@type": "Question",
          "name": "What is the uncanny valley in robotics?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The uncanny valley, proposed by Masahiro Mori in 1970, describes how robots that look almost—but not quite—human trigger feelings of eeriness and revulsion. As robots become more humanlike, our affinity increases until they reach this valley of discomfort, only recovering when they become indistinguishable from humans."
          }
        },
        {
          "@type": "Question",
          "name": "How has the meaning of 'robot' changed over time?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Robot evolved from Čapek's rebellious artificial workers (1920s) to Asimov's ethical servants (1940s), to industrial arms (1960s), movie villains like Terminator (1980s), household helpers like Roomba (2000s), and now intimate companions (2020s). From feared usurpers to vacuum cleaners to potential partners."
          }
        }
      ]
    }
  ]
};

export const metadata = createVisualEssayMetadata({
  slug: "the-word-robot",
  basePath: "essays/etymology",
  title: "ROBOT — Grand Machina | Esy Visual Essay",
  description:
    "The Word That Built Our Future, and Now Shares Our Bed. From Karel Čapek's 1920 Czech play to human-robot intimacy—trace the 105-year journey of 'robot' through etymology, industry, fear, domestication, and coexistence.",
  ogTitle: "ROBOT — Grand Machina",
  ogDescription:
    "The Word That Built Our Future, and Now Shares Our Bed. 105 years of robot—from forced labor to intimate companion.",
  twitterDescription:
    "From 'robota' (forced labor) to living, working, and loving machines—the 105-year journey of the word that built our future.",
  keywords: [
    "robot etymology",
    "robot history",
    "Karel Čapek",
    "R.U.R.",
    "robota",
    "Isaac Asimov",
    "Three Laws of Robotics",
    "Terminator",
    "Roomba",
    "human robot relationships",
    "robot intimacy",
    "uncanny valley",
    "AI robots",
    "humanoid robots",
    "visual essay",
    "scrollytelling",
  ],
  // Uses custom image path (legacy) instead of /og/the-word-robot.png
  ogImage: "https://esy.com/images/robot/robot-hero.jpg",
  imageAlt:
    "ROBOT — Grand Machina: A visual essay exploring the 105-year journey of the word robot from Czech forced labor to intimate companion",
});

export default function TheWordRobotPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <TheWordRobotClient />
      </ArtifactDetailWrapper>
    </>
  );
}
