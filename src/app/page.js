import NewsletterHomePage from "../components/NewsletterHome/NewsletterHomePage";
import { EduStudio, latestLesson, resolveDesks } from "../components/EducationHero";
import { getAllAgenticArticles } from "../lib/published-articles";

// The homepage is a Marketing Engineering publication, fronted by Zev (2026-09-27):
// hero F · Studio. Navy, "Hi, I'm Zev" and a first-person promise beside his
// headshot in a jade ring, the weekly email signup, then the proof (clip.art and
// SEOPage, where the systems run) and the newest real article. A newsletter is a
// person writing to you, so the page leads with the person. On phones the
// portrait becomes a profile row (H · Studio · Profile) so the signup stays on
// the first screen; see /prototypes/education/phones/. The other education
// directions stay clickable at /prototypes/education/.
//
// Earlier homepages:
// - Education hero A · Front Page (2026-09-25 → 09-27): the promise over the
//   four desks. EduFrontPage, still at /prototypes/education/front-page/.
// - The Esy OS hero, E · Stage Tour (2026-09-18 → 09-25), is HeroStageTour in
//   src/components/HomeHero, still clickable at /prototypes/hero/stage-tour/.
// - The Marketing Engineer front page (2026-09-13 → 09-18) lives at
//   /engineer (src/app/engineer/page.js, NewsletterHomePage).
// - The marketing-production story (retired 2026-09-13) is archived with its
//   metadata at src/archive/homepage-autopilot-story/route-page.js.

const HOME_TITLE = "Esy — Marketing Engineering for the AI era";
const HOME_META_DESCRIPTION =
  "Learn to build the AI systems that run marketing: SEO, AI coding tools, marketing agents, and the integrations between them. Practical lessons from production, one email a week.";

export const metadata = {
  title: HOME_TITLE,
  description: HOME_META_DESCRIPTION,
  keywords: [
    "Marketing Engineering",
    "AI for marketing",
    "AI marketing agents",
    "AI SEO",
    "AI coding tools",
    "Claude Code",
    "Clay",
    "marketing automation",
  ],
  // og:image / twitter:image come from src/app/opengraph-image.tsx —
  // don't pin images here or they override the generated card.
  openGraph: {
    title: HOME_TITLE,
    description: HOME_META_DESCRIPTION,
    type: "website",
    url: "https://esy.com",
    siteName: "Esy",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_META_DESCRIPTION,
    site: "@EsyDotCom",
  },
  alternates: {
    canonical: "https://esy.com",
  },
};

// Same sections as /engineer (latest articles, the properties, the case
// studies, the author, the weekly email); only the hero differs. Same
// posture as /engineer: webhook purges for instant updates, hourly backstop.
export const revalidate = 3600;

const COMPOSE = { mark: "stencil", band: "replay" };

export default async function HomePage() {
  // The hero's "latest" line reads the same article list as the Latest section,
  // so the two can never disagree.
  const articles = await getAllAgenticArticles();
  // phone="profile": on phones the face sits in a profile row beside the
  // greeting (H), so the signup stays on the first screen; desktop is F.
  // Compose is the third app (2026-09-30): its stencil mark in the hero's
  // "The systems run" row and the 01 Apps ledger, and its replay band after
  // SEOPage's (B · Stencil + D · Replay at /prototypes/home-compose/).
  // 01 Apps is one band that tours clip.art, SEOPage and Compose (C · Tour),
  // and AI News's newest headlines sit beside Latest (2026-09-30,
  // /prototypes/home-trim/). About 8 screens instead of 10.5.
  return (
    <NewsletterHomePage
      compose={COMPOSE}
      appsLayout="tour"
      newsColumn
      hero={<EduStudio desks={resolveDesks(articles)} latest={latestLesson(articles)} phone="profile" composeMark={COMPOSE.mark} />}
    />
  );
}
