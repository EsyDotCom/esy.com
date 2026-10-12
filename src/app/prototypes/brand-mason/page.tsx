import { redirect } from 'next/navigation';

// The bare /prototypes/brand-mason opens the first take.
export default function BrandMasonIndex() {
  redirect('/prototypes/brand-mason/sheet/');
}
