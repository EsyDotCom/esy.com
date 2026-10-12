import { redirect } from 'next/navigation';

// The bare /prototypes/home-focus opens the first take.
export default function HomeFocusIndex() {
  redirect('/prototypes/home-focus/live/');
}
