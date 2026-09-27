import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import {
  ArticleCover,
  ArticleCoverBar,
  ArticleCoverGuide,
  ArticleEditorial,
  ArticleGuide,
  type ImageArticle,
  type LeadImage,
} from '@/components/ArticleImage';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { buildImageArticle } from '@/components/ArticleImage/build';
import { toNavArticles } from '@/lib/nav-articles';
import { findAgenticArticle, getAllAgenticArticles } from '@/lib/published-articles';

// One image-led article direction, in the real site chrome. The article is a
// real published one (its title, summary and text come from the article
// list); only the lead image is new: generated through api.esy.com by
// scripts/generate-article-images.mjs, standing in for the video. Rendered in
// the publication's `.nl` scope, not `.proto`, which restyles every heading.

const ARTICLE_SLUG = 'building-multi-agent-workflows-claude-code';

// Each direction gets the image that suits its layout: B puts the title over
// the picture, so it uses `lanes`, whose left half is empty.
const IMAGES: Record<string, LeadImage> = {
  workshop: {
    src: '/prototypes/article/workshop.webp',
    alt: 'Isometric illustration: small robot agents at their own workstations pass glowing task cards down a line to a station that assembles the finished report.',
    caption: 'Each agent owns one step. Illustration generated with Esy.',
  },
  lanes: {
    src: '/prototypes/article/lanes.webp',
    alt: 'Isometric illustration: four lanes of task cards, each tended by a small robot agent, merge into one finished document.',
    caption: 'Four specialised lanes, one finished artifact. Illustration generated with Esy.',
  },
};

const LAYOUTS: Record<string, { Component: React.ComponentType<ImageArticle>; image: LeadImage }> = {
  editorial: { Component: ArticleEditorial, image: IMAGES.workshop },
  cover: { Component: ArticleCover, image: IMAGES.lanes },
  guide: { Component: ArticleGuide, image: IMAGES.workshop },
  // D is B's cover, so it takes B's image.
  'cover-guide': { Component: ArticleCoverGuide, image: IMAGES.lanes },
  'cover-bar': { Component: ArticleCoverBar, image: IMAGES.lanes },
};

const prototype = findPrototype('article')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Article ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function ArticleVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const layout = LAYOUTS[variant];
  const article = await findAgenticArticle(ARTICLE_SLUG);
  if (!layout || !article) notFound();

  // The same builder the real article route uses, so the prototype shows
  // exactly what an image-led article renders.
  const all = await getAllAgenticArticles();
  const props = buildImageArticle(article, all, layout.image);
  const { Component } = layout;

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(all)} />
      <Component {...props} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
