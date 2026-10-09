"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, MailCheck } from "lucide-react";
import { EsyLoader } from "@/components/EsyLoader";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";

/* The homepage's one action: subscribe to The Marketing Engineer. Posts to the
   same Beehiiv-backed endpoint as every other signup on the site, so the list
   stays single; the hook sends the page path, which the API records as the
   referring site ("/" for the homepage). `tone` only swaps the palette — the
   hero sits on white, the closing band on navy.

   Two options for the homepage course (2026-10-06, /prototypes/home-promise/):
   - `reveal`: a button first, so the page doesn't open on a form; clicking it
     turns the button into the email box, in place, focused.
   - `askName`: after signing up, "what should I call you?" saves a first name
     to the new subscriber. Asked once they've said yes, so it costs no signups. */
export default function NewsletterSignup({
  tone = "light",
  // The original /engineer cadence line, verbatim, under the box.
  note = "One issue per week · video + full transcript",
  // The button's words. With `reveal`, `cta` opens the form and `submit` sends it.
  cta = "Subscribe",
  submit,
  reveal = false,
  askName = false,
  // Fields sent with the address beyond the page path, e.g. /invite's `video`
  // (which video the signup came from). Most forms send none.
  extra,
  // Which signup box this is ('hero', 'email-band', 'article-end', ...),
  // recorded on the subscriber beside the page (2026-10-09).
  form,
}: {
  tone?: "light" | "dark";
  note?: string;
  cta?: string;
  submit?: string;
  reveal?: boolean;
  askName?: boolean;
  extra?: Record<string, string>;
  form?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { subscribe, status, errorMessage, reset, honeypotProps, canSaveName, saveName, alreadySubscribed } =
    useNewsletterSubscribe({ form });
  const [open, setOpen] = useState(!reveal);

  const isLoading = status === "loading";
  const hasError = status === "error" && !!errorMessage;

  // Opening the form puts the cursor in the email box, so the click that
  // asked for the form is followed straight by typing.
  useEffect(() => {
    if (reveal && open) inputRef.current?.focus();
  }, [reveal, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribe(inputRef.current?.value || "", extra);
  };

  // Success replaces the form outright — a live form after "you're in" invites
  // a second, duplicate submit. Every signup now needs its confirmation link
  // clicked (double opt-in), so the message says so.
  if (status === "success") {
    return (
      <div className={`nl-signup nl-signup--${tone}`}>
        <p className="nl-signup-done" role="status">
          <MailCheck size={18} aria-hidden="true" />
          {/* Already confirmed: no email is coming, so don't send them looking for one. */}
          {alreadySubscribed
            ? "You’re already subscribed. The next issue is on its way."
            : "Almost there. Check your inbox and click the link to confirm."}
        </p>
        {askName && canSaveName && <NameStep saveName={saveName} />}
      </div>
    );
  }

  // `reveal`: just the button until it's clicked.
  if (!open) {
    return (
      <div className={`nl-signup nl-signup--${tone}`}>
        <button type="button" className="nl-signup-btn nl-signup-btn--open" onClick={() => setOpen(true)}>
          {cta} <ArrowRight size={16} aria-hidden="true" />
        </button>
        <p className="nl-signup-note">{note}</p>
      </div>
    );
  }

  return (
    <div className={`nl-signup nl-signup--${tone}`}>
      <form className="nl-signup-form" onSubmit={handleSubmit} noValidate>
        {/* Bot trap: off-screen, never focusable, never filled by a human. */}
        <input {...honeypotProps} />
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
              {submit ?? cta} <ArrowRight size={16} aria-hidden="true" />
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

/** The second step: an optional first name, saved to the subscriber just made. */
function NameStep({ saveName }: { saveName: (name: string) => Promise<string | null> }) {
  const id = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value.trim() || "";
    setState("saving");
    setError(null);
    const problem = await saveName(name);
    if (problem) {
      setState("idle");
      setError(problem);
      return;
    }
    setSaved(name);
    setState("saved");
  };

  if (state === "saved") {
    return <p className="nl-signup-note" role="status">Thanks, {saved}. See you in your inbox.</p>;
  }

  return (
    <form className="nl-signup-form nl-signup-form--name" onSubmit={handleSave} noValidate>
      <label htmlFor={id} className="nl-signup-ask">While you’re here, what should I call you?</label>
      <input
        id={id}
        ref={nameRef}
        className="nl-signup-input"
        type="text"
        autoComplete="given-name"
        placeholder="First name"
        maxLength={80}
        disabled={state === "saving"}
      />
      <button type="submit" className="nl-signup-btn" disabled={state === "saving"}>
        {state === "saving" ? <EsyLoader size={16} label="" /> : "Save"}
      </button>
      {error && <p className="nl-signup-note nl-signup-note--error" aria-live="polite">{error}</p>}
    </form>
  );
}
