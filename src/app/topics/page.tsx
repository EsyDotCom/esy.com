import TopicsIndex from "@/components/Topics/TopicsIndex";
import { getAllAgenticArticles } from "@/lib/published-articles";

const DESCRIPTION =
  "Every subject The Marketing Engineer covers: agentic workflows, AI models, AI image generation, and AI coding tools, each with every article written on it.";

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
  const articles = await getAllAgenticArticles();
  return <TopicsIndex articles={articles} />;
}
