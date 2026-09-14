"use client";

import React, { useEffect, useRef, useState } from "react";

/* Cloudflare Turnstile widget.

   Renders nothing until NEXT_PUBLIC_TURNSTILE_SITE_KEY is set, so every form
   carrying this component behaves exactly as it does today until the widget is
   configured — the server half fails open to match.

   Explicit rendering (turnstile.render) rather than the implicit class scan:
   these forms mount and unmount with client-side navigation, and the implicit
   scanner only sweeps on first script load, so it misses later mounts. */

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

// One shared loader promise: several forms can share a page, and the script
// must not be injected more than once.
let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Turnstile script failed to load"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

interface TurnstileWidgetProps {
  // Called with a fresh token on success, and with "" when it expires.
  onToken: (token: string) => void;
}

/* Until Cloudflare asks for a click, the container takes no space: out of
   flow (so it never becomes a flex item and adds a row gap to the form) and
   clipped to nothing. Same off-screen technique as the honeypot field. */
const COLLAPSED_STYLE: React.CSSProperties = {
  position: "absolute",
  width: 0,
  height: 0,
  overflow: "hidden",
};

/* flexBasis 100% makes the widget claim its own line inside the wrapping
   flex rows these signup forms use, instead of squeezing in beside the input.
   In a plain block parent it is just a normal div. */
const INTERACTIVE_STYLE: React.CSSProperties = {
  margin: "0.75rem 0",
  flexBasis: "100%",
  maxWidth: 320,
};

export function TurnstileWidget({ onToken }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // True only while Cloudflare needs the visitor to interact (a suspicious
  // session). Everyone else never sees the widget: the check runs invisibly.
  const [needsInteraction, setNeedsInteraction] = useState(false);

  // Kept in a ref so re-renders of the parent never re-run the effect and
  // re-render the widget underneath the user.
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;
    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action: "turnstile-spin-v1",
          // Invisible by default: the Cloudflare box (and its "Success!" card
          // with their logo) only renders when a click is actually required.
          // Verification is unchanged; the token still arrives via callback.
          appearance: "interaction-only",
          "before-interactive-callback": () => setNeedsInteraction(true),
          "after-interactive-callback": () => setNeedsInteraction(false),
          callback: (token: string) => onTokenRef.current(token),
          // Both clear the token so a stale one is never submitted; the user
          // sees the widget re-challenge rather than a silent failure.
          "expired-callback": () => onTokenRef.current(""),
          "error-callback": () => onTokenRef.current(""),
        });
      })
      .catch((err) => {
        // Script blocked or offline. The server fails open on an unreachable
        // siteverify, so a real user is not stranded here.
        console.warn("[turnstile] widget unavailable:", err);
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  if (!siteKey) return null;

  return (
    <div
      ref={containerRef}
      style={needsInteraction ? INTERACTIVE_STYLE : COLLAPSED_STYLE}
    />
  );
}
