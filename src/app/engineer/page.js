import NewsletterHomePage from "../../components/NewsletterHome/NewsletterHomePage";

// The Marketing Engineer's front page: masthead, latest articles, the weekly
// email. It was the homepage until 2026-09-18, when the homepage hero moved to
// Esy OS; articles stay at /engineer/<slug>/ beneath it.

const TITLE = "The Marketing Engineer — a newsletter by Esy";
const DESCRIPTION =
  "Turn your marketing data into action with AI systems you can build yourself. Tutorials, guides, and news at the intersection of AI, marketing, and engineering.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://esy.com/engineer",
    siteName: "Esy",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    site: "@EsyDotCom",
  },
  alternates: {
    canonical: "https://esy.com/engineer",
  },
};

// Same posture as the homepage: webhook purges for instant updates, hourly backstop.
export const revalidate = 3600;

export default NewsletterHomePage;
