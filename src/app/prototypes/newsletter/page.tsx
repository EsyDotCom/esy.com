import { redirect } from 'next/navigation';

// The bare /prototypes/newsletter opens the first take.
export default function NewsletterProtoIndex() {
  redirect('/prototypes/newsletter/batch/');
}
