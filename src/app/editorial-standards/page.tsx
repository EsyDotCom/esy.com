import LightHeader from "@/components/LightHeader/LightHeader";
import { nlSerif } from "@/components/NewsletterHome/serif";
import EdDecide from "@/components/Editorial/EdDecide";
import { toNavArticles } from "@/lib/nav-articles";
import { getAllAgenticArticles } from "@/lib/published-articles";
import "@/components/NewsletterHome/NewsletterHome.css";
import "@/components/Editorial/Editorial.css";

// Editorial standards (2026-09-29): editorial prototype G from
// /prototypes/editorial/. C's masthead and News-or-article checker, the
// comparison as E's spectrum under D's two-sided header, and the rules as D's
// accordion. The words live in components/Editorial/content.tsx.

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
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      <EdDecide articles={articles} compare="spectrum-vs" rules="accordion" />
    </div>
  );
}
