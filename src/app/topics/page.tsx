import LightHeader from "@/components/LightHeader/LightHeader";
import { nlSerif } from "@/components/NewsletterHome/serif";
import WeeklyEmailBand from "@/components/NewsletterHome/WeeklyEmailBand";
import { topicCards } from "@/components/Topics/topicCards";
import { TakeExplorer } from "@/components/TopicsProto/TopicsTakes";
import { getAllAgenticArticles } from "@/lib/published-articles";
import "@/components/NewsletterHome/NewsletterHome.css";
import "@/components/TopicsProto/topics-proto.css";

// esy.com/topics (2026-10-09): T3 · Explorer from /prototypes/topics/. Where
// every article is browsed now that articles live at /articles/<slug>/: the
// topics as cut-corner tiles on navy, and the picked topic's cover, story and
// newest articles in the panel beside them.

const DESCRIPTION =
  "Every article on AI marketing, by subject: agentic workflows, AI models, AI image generation and AI coding tools, newest first in each.";

export const metadata = {
  title: "Topics — The Marketing Engineer",
  description: DESCRIPTION,
  alternates: { canonical: "https://esy.com/topics/" },
  openGraph: {
    title: "Topics — The Marketing Engineer",
    description: DESCRIPTION,
    url: "https://esy.com/topics/",
    siteName: "Esy",
    type: "website",
  },
};

// Article counts come from the published list. The publish webhook purges the
// published-articles tags (and /topics); this hourly revalidate is a backstop.
export const revalidate = 3600;

export default async function Page() {
  const { topics, total } = topicCards(await getAllAgenticArticles());
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader />
      <TakeExplorer topics={topics} total={total} />
      <WeeklyEmailBand />
    </div>
  );
}
