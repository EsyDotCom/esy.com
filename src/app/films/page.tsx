import FilmsIndex from "@/components/Films/FilmsIndex";

// The films index: every film Esy makes, of every kind. Picked from six
// directions (/prototypes/films/ keeps the two built in the repo); this is
// direction 6, "Title Sequence".
const DESCRIPTION = "Films of every kind, made start to finish with Esy. Now showing: The Letter With No Address, an animated short.";

export const metadata = {
  title: "Esy Films",
  description: DESCRIPTION,
  alternates: { canonical: "https://esy.com/films/" },
  openGraph: {
    title: "Esy Films",
    description: DESCRIPTION,
    url: "https://esy.com/films/",
    type: "website",
    siteName: "Esy",
    images: [{ url: "https://esy.com/films/the-letter-with-no-address/look-world.webp", width: 1600, height: 900 }],
  },
  twitter: { card: "summary_large_image", title: "Esy Films", description: DESCRIPTION, site: "@EsyDotCom" },
};

export default function Page() {
  return <FilmsIndex />;
}
