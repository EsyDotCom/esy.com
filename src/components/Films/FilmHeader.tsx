"use client";

/* The film pages' own header: the Esy logo floating over the film, no bar and no
 * Subscribe. Once the reader scrolls past the opening, a soft night-coloured
 * backdrop fades in so the logo stays readable over the rest of the page. The
 * global navy bar stands down for these pages (ConditionalNavigation). */

import Link from "next/link";
import { useEffect, useState } from "react";

import Logo from "@/components/Logo";

export default function FilmHeader({ tone }: { tone: "a" | "b" }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`film-hd film-hd--${tone}${solid ? " is-solid" : ""}`}>
      <Link href="/" className="film-hd-logo" aria-label="Esy home">
        <Logo suffix="" href="" wordmarkOnly animatedE wordmarkFont="blackops" theme="dark" size={60} priority />
      </Link>
    </header>
  );
}
