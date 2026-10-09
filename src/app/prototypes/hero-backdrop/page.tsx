import { redirect } from 'next/navigation';

// The bare /prototypes/hero-backdrop opens the first take.
export default function HeroBackdropIndex() {
  redirect('/prototypes/hero-backdrop/desk/');
}
