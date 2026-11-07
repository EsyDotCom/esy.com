import { redirect } from 'next/navigation';

// The bare /prototypes/home-os-apps opens the first take.
export default function HomeOsAppsIndex() {
  redirect('/prototypes/home-os-apps/tour/');
}
