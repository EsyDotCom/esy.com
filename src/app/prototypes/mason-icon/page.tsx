import { redirect } from 'next/navigation';

// The bare /prototypes/mason-icon opens the first take.
export default function MasonIconIndex() {
  redirect('/prototypes/mason-icon/head/');
}
