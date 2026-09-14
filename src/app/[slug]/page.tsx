import { notFound, permanentRedirect } from "next/navigation";
import { findAgenticArticle } from "@/lib/published-articles";
import { articlePath, isArticleSlugShape } from "@/lib/article-path";

// Articles sat at the site root (esy.com/<slug>/) for a day after #126
// (2026-09-14) before moving back under /engineer/. Links shared and pages
// indexed in that window keep working: a root path that names a real article
// 308s to its /engineer/ URL, and anything else is a normal 404.
//
// Only single-segment paths no static route claims reach this (/about,
// /workflows, … always win), and junk-shaped paths skip the lookup entirely.

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;
export const revalidate = 3600;

export default async function LegacyRootArticle({ params }: Props) {
  const { slug } = await params;
  if (!isArticleSlugShape(slug)) notFound();

  const article = await findAgenticArticle(slug);
  if (!article) notFound();

  permanentRedirect(articlePath(article.slug));
}
