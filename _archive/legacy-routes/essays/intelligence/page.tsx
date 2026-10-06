import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Brain, Sparkles } from "lucide-react";
import { isNewEssay } from "@/data/visualEssays";

export const metadata: Metadata = {
  title: "Intelligence Essays - How the Mind Works | Esy",
  description:
    "Visual essays exploring intelligence, cognition, and how the mind works. From predictive processing to consciousness — complex ideas made clear through diagrams.",
  keywords: [
    "intelligence essays",
    "cognitive science",
    "neuroscience explained",
    "how the brain works",
    "mind essays",
    "visual explanations",
    "conceptual essays",
  ],
  openGraph: {
    title: "Intelligence Essays - How the Mind Works | Esy",
    description:
      "Visual essays exploring intelligence, cognition, and how the mind works. Complex ideas made clear through diagrams.",
    url: "https://esy.com/essays/intelligence/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intelligence Essays | Esy",
    description:
      "Visual essays exploring intelligence, cognition, and how the mind works.",
  },
  alternates: {
    canonical: "https://esy.com/essays/intelligence/",
  },
};

const essays = [
  {
    slug: "brain-as-prediction-machine",
    title: "The Brain as a Prediction Machine",
    description:
      "Your brain doesn't react to the world — it predicts it. Understand predictive processing through clear diagrams.",
    readTime: "12 min",
    publishedDate: "2026-02-01",
    tags: ["Neuroscience", "Perception", "Learning"],
  },
  // Future essays will be added here
];

export default function IntelligenceEssaysPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%)",
        color: "#e8e6e3",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "1.5rem 2rem",
          borderBottom: "1px solid rgba(99, 179, 237, 0.1)",
        }}
      >
        <Link
          href="/essays"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#718096",
            textDecoration: "none",
            fontSize: "0.875rem",
            transition: "color 0.2s",
          }}
        >
          <ArrowLeft size={16} />
          <span>All Essays</span>
        </Link>
      </header>

      {/* Hero */}
      <section
        style={{
          padding: "4rem 2rem",
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(99, 179, 237, 0.1)",
            padding: "0.5rem 1rem",
            borderRadius: "100px",
            marginBottom: "1.5rem",
          }}
        >
          <Brain size={18} style={{ color: "#63b3ed" }} />
          <span
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#63b3ed",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Intelligence
          </span>
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            marginBottom: "1rem",
            lineHeight: 1.2,
          }}
        >
          How the Mind Works
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "#a0aec0",
            lineHeight: 1.6,
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Visual essays exploring cognition, perception, and the science of
          intelligence. Complex ideas made clear through diagrams.
        </p>
      </section>

      {/* Essays Grid */}
      <section
        style={{
          padding: "0 2rem 4rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
          }}
        >
          {essays.map((essay) => (
            <Link
              key={essay.slug}
              href={`/essays/intelligence/${essay.slug}`}
              style={{
                display: "block",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(99, 179, 237, 0.15)",
                borderRadius: "12px",
                padding: "2rem",
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "#e8e6e3",
                    margin: 0,
                  }}
                >
                  {essay.title}
                </h2>
                {isNewEssay(essay as any) && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      background: "rgba(72, 187, 120, 0.15)",
                      color: "#48bb78",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      padding: "0.25rem 0.75rem",
                      borderRadius: "100px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    <Sparkles size={12} />
                    New
                  </span>
                )}
              </div>
              <p
                style={{
                  color: "#a0aec0",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                }}
              >
                {essay.description}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "#718096",
                  }}
                >
                  {essay.readTime} read
                </span>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  {essay.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "0.75rem",
                        color: "#63b3ed",
                        background: "rgba(99, 179, 237, 0.1)",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section
        style={{
          padding: "3rem 2rem",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          borderTop: "1px solid rgba(99, 179, 237, 0.1)",
        }}
      >
        <p
          style={{
            color: "#718096",
            fontSize: "0.875rem",
          }}
        >
          More intelligence essays coming soon — consciousness, memory, decision-making, and more.
        </p>
      </section>
    </main>
  );
}
