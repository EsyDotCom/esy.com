import { redirect } from 'next/navigation';

// The personal runway's variants are listed on the prototypes index.
export default function RunwayPersonalPrototype() {
  redirect('/prototypes/');
}
