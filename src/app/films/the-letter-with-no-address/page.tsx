import { FilmDetailA } from "@/components/Films/FilmsA";

// The first Esy film's page: direction A ("The Final Reel"), picked from two
// (both kept at /prototypes/films/).
const TITLE = "The Letter With No Address";
const DESCRIPTION =
  "A four-minute animated short made with Esy from the Lullo the Moon Bear clip.art pack: the animatic, the story, the cast, how it was made and every file behind it.";

export const metadata = {
  title: `${TITLE} · Esy Films`,
  description: DESCRIPTION,
  alternates: { canonical: "https://esy.com/films/the-letter-with-no-address/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://esy.com/films/the-letter-with-no-address/",
    type: "video.movie",
    siteName: "Esy",
    images: [{ url: "https://esy.com/films/the-letter-with-no-address/dawn-home.webp", width: 1600, height: 900 }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, site: "@EsyDotCom" },
};

export default function Page() {
  return <FilmDetailA />;
}
