import { redirect } from 'next/navigation';

// The 410 prototypes open on the first take.
export default function GonePrototypesIndex() {
  redirect('/prototypes/gone/archive/');
}
