import { notFound } from "next/navigation";

import FilmHeader from "@/components/Films/FilmHeader";
import { FilmDetailA, FilmsIndexA } from "@/components/Films/FilmsA";
import { FilmDetailB, FilmsIndexB } from "@/components/Films/FilmsB";
import PrototypeBar from "@/components/prototypes/PrototypeBar";
import { findPrototype } from "@/components/prototypes/registry";

// The film pages' two directions, index and film page each. A's film page
// shipped as /films/the-letter-with-no-address; the index shipped as a third
// design (the title sequence) at /films. The pages bring their own headers;
// A's index gets the film header because the site nav stands down here.
const VARIANTS: Record<string, () => React.ReactElement> = {
  "a-index": () => (<><FilmHeader tone="a" /><FilmsIndexA /></>),
  "a-film": () => <FilmDetailA />,
  "b-index": () => <FilmsIndexB />,
  "b-film": () => <FilmDetailB />,
};

const prototype = findPrototype("films")!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Films ${v.key} · ${v.name} — Esy prototypes` : "Esy prototypes" };
}

export default async function FilmsVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const View = VARIANTS[variant];
  if (!View) notFound();
  return (
    <>
      <View />
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
