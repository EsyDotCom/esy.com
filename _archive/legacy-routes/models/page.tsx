import { Metadata } from "next";
import ModelsIndexClient from "@/components/models/ModelsIndexClient";

export const metadata: Metadata = {
  title: "Model Reference - LLM Models Used in Esy Workflows | Esy",
  description: "A reference guide to the language models used as reasoning engines in Esy workflows. Understand how models are used, where they are trusted, and which templates depend on them.",
  keywords: "LLM models, Claude, GPT, AI models, model reference, Esy workflows",
  openGraph: {
    title: "Model Reference - LLM Models | Esy",
    description: "Reference guide to language models used in Esy workflows.",
    url: "https://esy.com/models",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Model Reference | Esy",
    description: "Reference guide to language models used in Esy workflows.",
  },
  alternates: {
    canonical: "https://esy.com/models",
  },
};

export default function ModelsIndexPage() {
  return <ModelsIndexClient />;
}
