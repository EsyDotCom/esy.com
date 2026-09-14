import NewsletterSignup from "./NewsletterSignup";

// The closing ask on every publication page (the homepage and the topic hubs):
// a navy band with the weekly email signup. One component so the offer reads
// the same everywhere.
export default function WeeklyEmailBand() {
  return (
    <section className="nl-final" aria-labelledby="nl-final-title">
      <div className="nl-container nl-final-inner">
        <h2 className="nl-final-title" id="nl-final-title">Get the weekly email.</h2>
        <p className="nl-lede nl-lede--onDark nl-lede--center">
          The week&apos;s best tutorials, guides, and news in one email.
          Unsubscribe whenever you like.
        </p>
        <NewsletterSignup tone="dark" />
      </div>
    </section>
  );
}
