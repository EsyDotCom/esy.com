import Image from "next/image";

import { img } from "@/data/films/the-letter-with-no-address";

/* A film still that fills its box. The box sets the shape (aspect ratio or
   explicit height) through `className`; the image covers it. */
export default function FilmFrame({
  name,
  alt,
  sizes,
  className,
  priority,
  position,
}: {
  name: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  position?: string;
}) {
  return (
    <span className={`film-frame ${className ?? ""}`}>
      <Image
        src={img(name)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover", objectPosition: position ?? "50% 50%" }}
      />
    </span>
  );
}
