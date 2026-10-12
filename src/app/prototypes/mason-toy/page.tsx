import { redirect } from 'next/navigation';

// The bare /prototypes/mason-toy opens the first take.
export default function MasonToyIndex() {
  redirect('/prototypes/mason-toy/felt-reef/');
}
