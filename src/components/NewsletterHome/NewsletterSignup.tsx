"use client";

import React, { useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { EsyLoader } from "@/components/EsyLoader";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import { TurnstileWidget } from "@/components/Turnstile/TurnstileWidget";

/* The homepage's one action: subscribe to The Marketing Engineer. Posts to the
   same Beehiiv-backed endpoint as every other signup on the site, so the list
   stays single; the hook sends the page path, which the API records as the
   referring site ("/" for the homepage). `tone` only swaps the palette — the
   hero sits on white, the closing band on navy. */
export default function NewsletterSignup({
  tone = "light",
  // The original /engineer hero copy, kept verbatim on both homepage forms:
  // the demo-first promise above the box, the cadence under it.
  pitch = "Agentic workflows that ship real products — the demo first, then the system design and the business behind it.",
  note = "One issue per week · video + full transcript",
}: {
  tone?: "light" | "dark";
  pitch?: string;
  note?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { subscribe, status, errorMessage, reset, honeypotProps, setTurnstileToken } =
    useNewsletterSubscribe();

  const isLoading = status === "loading";
  const hasError = status === "error" && !!errorMessage;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribe(inputRef.current?.value || "");
  };

  // Success replaces the form outright — a live form after "you're in" invites
  // a second, duplicate submit.
  if (status === "success") {
    return (
      <div className={`nl-signup nl-signup--${tone}`}>
        <p className="nl-signup-done" role="status">
          <CheckCircle2 size={18} aria-hidden="true" />
          You&apos;re in. Check your inbox to confirm.
        </p>
      </div>
    );
  }

  return (
    <div className={`nl-signup nl-signup--${tone}`}>
      <p className="nl-signup-pitch">{pitch}</p>
      <form className="nl-signup-form" onSubmit={handleSubmit} noValidate>
        {/* Bot trap: off-screen, never focusable, never filled by a human. */}
        <input {...honeypotProps} />
        <TurnstileWidget onToken={setTurnstileToken} />
        <input
          ref={inputRef}
          className="nl-signup-input"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-label="Email address"
          aria-invalid={hasError || undefined}
          disabled={isLoading}
          onChange={() => {
            if (status === "error") reset();
          }}
        />
        <button type="submit" className="nl-signup-btn" disabled={isLoading}>
          {isLoading ? (
            <EsyLoader size={16} label="" />
          ) : (
            <>
              Subscribe <ArrowRight size={16} aria-hidden="true" />
            </>
          )}
        </button>
      </form>
      {/* One line under the form: the error when there is one, otherwise the
          promise about cadence. aria-live so a screen reader hears the error. */}
      <p className={`nl-signup-note${hasError ? " nl-signup-note--error" : ""}`} aria-live="polite">
        {hasError ? errorMessage : note}
      </p>
    </div>
  );
}
