import { notFound } from "next/navigation";
import type { Metadata } from "next";

import TopicPage from "@/components/Topics/TopicPage";
import { TOPICS, articlesForTopic, findTopic, topicHref } from "@/data/topics";
import { getAllAgenticArticles } from "@/lib/published-articles";

type Props = {
  params: Promise<{ topic: string }>;
};

// The topic list is fixed in src/data/topics.ts, so every hub prerenders and
// anything else is a 404 without a lookup.
export const dynamicParams = false;

// Article lists come from the published list. The publish webhook purges the
// published-articles tags (and /topics); this hourly revalidate is a backstop.
export const revalidate = 3600;

export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = findTopic((await params).topic);
  if (!topic) return {};
  const url = `https://esy.com${topicHref(topic.slug)}`;
  return {
    title: `${topic.name} — The Marketing Engineer`,
    description: topic.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${topic.name} — The Marketing Engineer`,
      description: topic.description,
      url,
      siteName: "Esy",
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const topic = findTopic((await params).topic);
  if (!topic) notFound();

  const articles = articlesForTopic(await getAllAgenticArticles(), topic);
  return <TopicPage topic={topic} articles={articles} />;
}
