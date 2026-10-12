import { redirect } from 'next/navigation';

// The bare /prototypes/brand opens the first take.
export default function BrandIndex() {
  redirect('/prototypes/brand/sheet/');
}
