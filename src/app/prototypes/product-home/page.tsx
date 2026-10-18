import { redirect } from 'next/navigation';

// The bare /prototypes/product-home opens the first take.
export default function ProductHomeIndex() {
  redirect('/prototypes/product-home/product/');
}
