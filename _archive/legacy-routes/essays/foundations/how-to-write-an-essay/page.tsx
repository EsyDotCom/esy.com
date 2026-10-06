import { Metadata } from "next";
import EssayWritingClient from "./EssayWritingClient";

export const metadata: Metadata = {
  title: "How to Write an Essay | Esy.com",
  description:
    "Master essay writing with this visual, step-by-step guide. Learn to craft compelling introductions, build strong arguments, and revise like a pro.",
  keywords: [
    "how to write an essay",
    "essay writing guide",
    "essay structure",
    "writing tips",
    "academic writing",
    "essay introduction",
    "thesis statement",
    "body paragraphs",
    "essay conclusion",
    "writing process",
  ],
  openGraph: {
    title: "How to Write an Essay | Esy.com",
    description:
      "Master essay writing with this visual, step-by-step guide. Learn to craft compelling introductions, build strong arguments, and revise like a pro.",
    type: "article",
    images: [
      {
        url: "/og/how-to-write-an-essay.jpg",
        width: 1200,
        height: 630,
        alt: "How to Write an Essay - Visual Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write an Essay | Esy.com",
    description:
      "Master essay writing with this visual, step-by-step guide.",
  },
};

export default function HowToWriteAnEssayPage() {
  return <EssayWritingClient />;
}

