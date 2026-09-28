import { FilmsIndexA } from "@/components/Films/FilmsA";

// A version of the Films pages under review: kept out of search and the
// sitemap (the sitemap skips /v/ routes) until one direction is chosen and
// moves to /films.
export const metadata = {
  title: "Films (version A)",
  description:
    "Animated shorts made from clip.art packs with Esy, starting with the Milo Moonbear series.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Films (version A)",
    description:
      "Animated shorts made from clip.art packs with Esy, starting with the Milo Moonbear series.",
    url: "https://esy.com/films/v/a/",
    type: "website",
    images: [{ url: "https://esy.com/films/the-letter-with-no-address/look-world.webp", width: 1600, height: 900 }],
  },
};

export default function Page() {
  return <FilmsIndexA />;
}
