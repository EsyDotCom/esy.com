import { FilmDetailB } from "@/components/Films/FilmsB";

// A version of the Films pages under review: kept out of search and the
// sitemap (the sitemap skips /v/ routes) until one direction is chosen and
// moves to /films.
export const metadata = {
  title: "The Letter With No Address (version B)",
  description:
    "A four-minute bedtime film made from the Milo Moonbear clip.art pack with Esy: the animatic, the cast, how it was made and every file behind it.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "The Letter With No Address (version B)",
    description:
      "A four-minute bedtime film made from the Milo Moonbear clip.art pack with Esy: the animatic, the cast, how it was made and every file behind it.",
    url: "https://esy.com/films/v/b/the-letter-with-no-address/",
    type: "website",
    images: [{ url: "https://esy.com/films/the-letter-with-no-address/envelope-desk.webp", width: 1600, height: 900 }],
  },
};

export default function Page() {
  return <FilmDetailB />;
}
