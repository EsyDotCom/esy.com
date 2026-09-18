import { redirect } from 'next/navigation';

// The hero prototype's variants are listed on the prototypes index.
export default function HeroPrototype() {
  redirect('/prototypes/');
}
