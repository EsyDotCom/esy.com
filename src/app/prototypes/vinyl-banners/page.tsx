import { redirect } from 'next/navigation';

// The bare /prototypes/vinyl-banners opens the first take.
export default function VinylBannersIndex() {
  redirect('/prototypes/vinyl-banners/network/');
}
