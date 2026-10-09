import { redirect } from 'next/navigation';

// The bare /prototypes/newsletter-issue opens the first take.
export default function NewsletterIssueProtoIndex() {
  redirect('/prototypes/newsletter-issue/letter/');
}
