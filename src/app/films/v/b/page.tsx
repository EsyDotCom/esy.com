import { FilmsIndexB } from "@/components/Films/FilmsB";

// A version of the Films pages under review: kept out of search and the
// sitemap (the sitemap skips /v/ routes) until one direction is chosen and
// moves to /films.
export const metadata = {
  title: "Films (version B)",
  description:
    "Animated shorts made from clip.art packs with Esy, starting with the Lullo the Moon Bear series.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Films (version B)",
    description:
      "Animated shorts made from clip.art packs with Esy, starting with the Lullo the Moon Bear series.",
    url: "https://esy.com/films/v/b/",
    type: "website",
    images: [{ url: "https://esy.com/films/the-letter-with-no-address/moon-rise.webp", width: 1600, height: 900 }],
  },
};

export default function Page() {
  return <FilmsIndexB />;
}
