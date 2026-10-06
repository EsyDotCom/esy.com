/**
 * SLANG — The Word That Named the Unnameable
 * Visual Essay on the Etymology of "Slang"
 *
 * Created: January 21, 2026
 * @see /docs/VISUAL_ESSAY_METADATA_PATTERN.md
 */
import { createVisualEssayMetadata } from "@/lib/visual-essay-metadata";
import ArtifactDetailWrapper from "@/components/ArtifactDetail";
import TheWordSlangClient from "./TheWordSlangClient";

const ESSAY_META = {
  title: "SLANG — The Word That Named the Unnameable",
  subtitle: "A 270-Year Journey from London's Criminal Underworld to TikTok",
  category: "Etymology",
  readTime: "22 min",
  sourceCount: 16,
  sourceTier: "Tier-1",
  sectionCount: 7,
  visualizationCount: 5,
  designSystem: "Subject-derived",
  published: "January 2026",
  model: "Claude",
  template: "Visual Essay",
  backLink: "/essays",
  backLabel: "Essays",
  palette: [
    { name: "Underworld Black", color: "#1A1A1A" },
    { name: "Cant Red", color: "#8B2500" },
    { name: "Grose Cream", color: "#F0E6D3" },
    { name: "Ink Blue", color: "#2C3E50" },
    { name: "TikTok Neon", color: "#00F2EA" },
  ],
  visualizations: [
    { name: "Era Typography Shifts", type: "Visual Morphing" },
    { name: "Word Origin Map", type: "Animated Sequence" },
    { name: "Slang Timeline", type: "Interactive Timeline" },
    { name: "Dictionary Evolution", type: "Scroll Animation" },
    { name: "Key Figures Gallery", type: "Portrait Cards" },
  ],
  keySources: [
    "Francis Grose, A Classical Dictionary of the Vulgar Tongue (1785)",
    "Eric Partridge, Slang To-Day and Yesterday (1933)",
    "Jonathon Green, Green's Dictionary of Slang",
    "H.L. Mencken, The American Language",
    "Gretchen McCulloch, Because Internet (2019)",
    "Oxford English Dictionary",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/etymology/the-word-slang/#article",
      "headline": "SLANG — The Word That Named the Unnameable",
      "alternativeHeadline": "A 270-Year Journey from London's Criminal Underworld to TikTok",
      "description": "A visual etymology tracing 'slang' from London's criminal underworld in 1756 to the digital present. The word began as insider vocabulary for thieves and beggars—itself a piece of slang—and gradually migrated toward respectability.",
      "url": "https://esy.com/essays/etymology/the-word-slang/",
      "datePublished": "2026-01-21",
      "dateModified": "2026-01-21",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-word-slang.png",
      "articleSection": "Etymology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays" },
        { "@type": "ListItem", "position": 3, "name": "Etymology", "item": "https://esy.com/essays/etymology/" },
        { "@type": "ListItem", "position": 4, "name": "The Word Slang", "item": "https://esy.com/essays/etymology/the-word-slang/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the origin of the word 'slang'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The etymology of 'slang' remains genuinely uncertain after 250 years of scholarly attention. The leading hypothesis connects it to Norwegian dialect words like 'slengja' (to sling) or 'slengjenamn' (nickname), but the OED still lists the origin as 'unknown'. The word first appeared in print in 1756, originally referring to the secret vocabulary of London's criminal underworld."
          }
        },
        {
          "@type": "Question",
          "name": "When was 'slang' first used in writing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The first confirmed written use of 'slang' as a noun appears in William Toldervy's novel 'The History of Two Orphans' (1756), with the phrase 'knew the slang well.' However, the word appeared as a verb in 1741 in an account of the pickpocket Mary Young's execution at Tyburn."
          }
        },
        {
          "@type": "Question",
          "name": "Who wrote the first slang dictionary?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Captain Francis Grose published 'A Classical Dictionary of the Vulgar Tongue' in 1785, the first major dictionary dedicated to slang and informal vocabulary. He deliberately parodied Samuel Johnson's prestigious Dictionary by applying the same scholarly methods to disreputable words."
          }
        },
        {
          "@type": "Question",
          "name": "Why do people use slang?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Slang serves several social functions: creating in-group identity ('we speak this way; they don't'), maintaining secrecy (from criminal cant to teen texting), expressing rebellion against 'proper' language, and providing fresh, economical ways to express ideas. As Eric Partridge put it, 'Slang is language at play.'"
          }
        },
        {
          "@type": "Question",
          "name": "How has the internet changed slang?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The internet has dramatically accelerated slang evolution. Words that once took decades to spread from subcultures to mainstream usage now go viral in weeks via platforms like TikTok. As linguist Gretchen McCulloch notes, 'The internet didn't create new types of informal language... it made informal writing normal.'"
          }
        }
      ]
    }
  ]
};

export const metadata = createVisualEssayMetadata({
  slug: "the-word-slang",
  basePath: "essays/etymology",
  title: "[DRAFT] SLANG — The Word That Named the Unnameable | Esy Visual Essay",
  description:
    "A visual etymology tracing 'slang' from London's criminal underworld in 1756 to the digital present. The word began as insider vocabulary for thieves and beggars—itself a piece of slang—and gradually migrated toward respectability.",
  ogTitle: "SLANG — The Word That Named the Unnameable",
  ogDescription:
    "From 18th-century thieves' cant to TikTok—trace the 270-year journey of a word that names the ungovernable edge of language.",
  twitterDescription:
    "The word 'slang' emerged from London's criminal underworld in 1756—and its etymology is still unknown. A visual essay on language's rebellious edge.",
  keywords: [
    "slang etymology",
    "slang origin",
    "slang history",
    "word history",
    "etymology",
    "Francis Grose",
    "vulgar tongue",
    "cant",
    "thieves cant",
    "H.L. Mencken",
    "Eric Partridge",
    "Jonathon Green",
    "lexicography",
    "sociolinguistics",
    "informal language",
    "visual essay",
    "scrollytelling",
  ],
  ogImage: "https://esy.com/og/the-word-slang.png",
  imageAlt:
    "SLANG — The Word That Named the Unnameable: A visual essay exploring the 270-year journey of the word slang from criminal underworld to mainstream usage",
});

export default function TheWordSlangPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <TheWordSlangClient />
      </ArtifactDetailWrapper>
    </>
  );
}
