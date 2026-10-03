"use client";

/* The finished film, streamed: an HLS ladder (1080p / 720p / 480p) with English captions,
 * hosted in esy.com's R2 bucket and played in Mux Player (which plays any HLS URL, so no
 * Mux hosting is involved). `media` is a key in the bucket; like the animatic, it loads
 * straight from images.esy.com on esy.com, the one site the bucket allows cross-site reads
 * from, and through the /cdn-proxy rewrite everywhere else (preview deploys, localhost). */

import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useState } from "react";

// Absolute, because Mux Player reads the stream type from new URL(src) and rejects a bare path.
const mediaRoot = (media: string) =>
  new URL(/^(https?:)?\//.test(media) ? media : `${window.location.hostname === "esy.com" ? "https://images.esy.com" : "/cdn-proxy"}/${media}`, window.location.href).href;

export default function FilmPlayer({ media, title, poster }: { media: string; title: string; poster: string }) {
  const [root, setRoot] = useState<string | null>(null);
  useEffect(() => setRoot(mediaRoot(media)), [media]);
  return (
    <div className="fp fp-film">
      {root ? (
        <MuxPlayer
          src={`${root}/hls/master.m3u8`}
          streamType="on-demand"
          poster={poster}
          title={title}
          metadata={{ video_title: title }}
          accentColor="#e3b660"
          primaryColor="#fff4e2"
          secondaryColor="#05060f"
          defaultHiddenCaptions={false}
          crossOrigin="anonymous"
          style={{ aspectRatio: "16 / 9", width: "100%", display: "block" }}
        >
          <track kind="captions" srcLang="en" label="English" src={`${root}/the-letter-with-no-address.en.vtt`} default />
        </MuxPlayer>
      ) : (
        <img src={poster} alt="" style={{ aspectRatio: "16 / 9", width: "100%", objectFit: "cover", display: "block" }} />
      )}
    </div>
  );
}
