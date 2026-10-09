"use client";

import { useState, useEffect } from "react";
import { EsyLoader } from "@/components/EsyLoader";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import { navyCalmLightTheme as theme } from "@/lib/theme";

// Capture bar under the video on article pages (and under the cover on
// image-led ones). Subscribes through useNewsletterSubscribe, like every other
// signup on the site: it sends the honeypot and fill-time signals the
// newsletter route's bot check requires. (It used to post only the email, and
// from 2026-09-08, when the route began requiring a fill time, the route took
// every signup from here for a bot and silently dropped it.)
export function AgenticNewsletterBar() {
  const [email, setEmail] = useState("");
  const { subscribe, status, errorMessage, reset, honeypotProps } = useNewsletterSubscribe({ form: 'article-bar' });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // The hook validates the address and reports errors itself.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribe(email);
  };

  return (
    <div
      style={{
        width: "100%",
        borderTop: `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`,
        backgroundColor: theme.bg,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "1rem" : "1rem 2rem",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          flexWrap: "wrap",
          alignItems: isMobile ? "stretch" : "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: theme.text,
              margin: 0,
              fontFamily: "var(--font-inter)",
            }}
          >
            The Marketing Engineer
          </h3>
          <p style={{ fontSize: "0.75rem", color: theme.muted, margin: "2px 0 0" }}>
            One email a week: the best tutorials, guides, and news on AI, marketing, and engineering
          </p>
        </div>

        <div style={{ display: "flex", alignItems: isMobile ? "stretch" : "center", gap: "0.5rem", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" }}>
          {/* Bot trap: off-screen, never focusable, never filled by a human. */}
          <input {...honeypotProps} />
          {status === "success" ? (
            <p style={{ fontSize: "0.875rem", color: theme.success, margin: 0 }}>
              You&apos;re in! Check your inbox.
            </p>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") reset();
                }}
                placeholder="you@example.com"
                disabled={status === "loading"}
                style={{
                  borderRadius: 8,
                  border: `1px solid ${status === "error" ? theme.error : theme.border}`,
                  backgroundColor: theme.surfaceElevated,
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.875rem",
                  color: theme.text,
                  outline: "none",
                  minWidth: isMobile ? 0 : 220,
                  width: isMobile ? "100%" : undefined,
                  fontFamily: "inherit",
                }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: theme.accent,
                  color: "#fff",
                  padding: "0.5rem 1.25rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: status === "loading" ? "default" : "pointer",
                  opacity: status === "loading" ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "inherit",
                  transition: "opacity 0.2s ease",
                }}
              >
                {status === "loading" ? (
                  <EsyLoader size={16} label="" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </>
          )}
        </div>
      </form>

      {status === "error" && errorMessage && (
        <p
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: isMobile ? "0 1rem 0.75rem" : "0 2rem 0.75rem",
            fontSize: "0.75rem",
            color: theme.error,
          }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
