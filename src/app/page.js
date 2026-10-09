import NewsletterHomePage from "../components/NewsletterHome/NewsletterHomePage";
import { HomeHeroHighFloor, resolveDesks } from "../components/EducationHero";
import { getAllAgenticArticles } from "../lib/published-articles";

// The homepage is a Marketing Engineering publication, fronted by Zev. Hero
// (2026-10-09): HomeHeroHighFloor, B32 from /prototypes/hero-backdrop/: a slow
// shot of a high-floor office at dusk behind the same words, Zev's photo small
// and signed under the button with his LinkedIn and GitHub on hover. The hero
// before it is HomeHeroPortrait (src/components/EducationHero/HomeHeroes.tsx).
//
// Hero 2026-10-06 → 10-09: C · Engineering from /prototypes/home-promise/. The blunt claim
// "AI marketing is an engineering job now." leads, with no greeting before it;
// the subtitle says what the free email course gives you; one button, "Start
// the free email course", opens the email box (no form on first sight), and the
// first name is asked after signing up. Zev's photo is 360px (picked at
// /prototypes/face-size/), captioned with his name, and the systems row reads
// clip.art, SEOPage and OS. Phones keep the profile row, under the headline.
// B · SEO isn't dead is the same page at /seo (src/app/seo/page.tsx).
//
// Earlier homepages:
// - F · Studio with "Hi, I'm Zev." and "I build the AI systems that run
//   marketing" (2026-09-27 → 10-06): EduStudio with its defaults, still at
//   /prototypes/education/studio-profile/, with A · Builder (that headline on
//   the new hero) at /prototypes/home-promise/builder/.
// - Education hero A · Front Page (2026-09-25 → 09-27): the promise over the
//   four desks. EduFrontPage, still at /prototypes/education/front-page/.
// - The Esy OS hero, E · Stage Tour (2026-09-18 → 09-25), is HeroStageTour in
//   src/components/HomeHero, still clickable at /prototypes/hero/stage-tour/.
// - The Marketing Engineer front page (2026-09-13 → 09-18) lives at
//   /engineer (src/app/engineer/page.js, NewsletterHomePage).
// - The marketing-production story (retired 2026-09-13) is archived with its
//   metadata at src/archive/homepage-autopilot-story/route-page.js.

// The meta title leads with "AI marketing", the umbrella term the homepage
// targets (2026-10-09); the hero keeps its own hook ("AI marketing is an
// engineering job now."). "AI in marketing" is a different search (people
// asking how it's used), so it sits in the description, not the title.
const HOME_TITLE = "AI Marketing: Learn to Build the Systems That Run It | Esy";
const HOME_META_DESCRIPTION =
  "How to use AI in marketing from a founder who runs it: systems that research, write, check and publish on their own. A free email course, skills included.";

export const metadata = {
  title: HOME_TITLE,
  description: HOME_META_DESCRIPTION,
  keywords: [
    "AI marketing",
    "AI in marketing",
    "AI for marketing",
    "AI marketing agents",
    "Marketing Engineering",
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
  // Compose stays the third app below the hero (2026-09-30): its stencil mark
  // in the 01 Apps ledger and its replay band after SEOPage's (B · Stencil +
  // D · Replay at /prototypes/home-compose/). 01 Apps is one band that tours
  // clip.art, SEOPage and Compose (C · Tour), and AI Marketing News's newest
  // headlines sit beside Latest (2026-09-30, /prototypes/home-trim/).
  return (
    <NewsletterHomePage
      compose={COMPOSE}
      appsLayout="tour"
      newsColumn
      // To go back to the portrait hero (2026-10-06 → 10-09), render
      // <HomeHeroPortrait desks={...} /> here instead (same import).
      hero={<HomeHeroHighFloor desks={resolveDesks(articles)} />}
    />
  );
}
