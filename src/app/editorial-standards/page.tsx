import EditorialStandards from "@/components/Editorial/EditorialStandards";
import { getAllAgenticArticles } from "@/lib/published-articles";

const DESCRIPTION =
  "How The Marketing Engineer decides what to publish, what goes in news and what becomes an article, and how we keep every piece accurate.";

export const metadata = {
  title: "Editorial standards — The Marketing Engineer",
  description: DESCRIPTION,
  alternates: { canonical: "https://esy.com/editorial-standards/" },
  openGraph: {
    title: "Editorial standards — The Marketing Engineer",
    description: DESCRIPTION,
    url: "https://esy.com/editorial-standards/",
    siteName: "Esy",
    type: "website",
  },
};

// The examples are looked up in the published list; the publish webhook
// purges it, and this hourly revalidate is a backstop.
export const revalidate = 3600;

export default async function Page() {
  const articles = await getAllAgenticArticles();
  return <EditorialStandards articles={articles} />;
}
