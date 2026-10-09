import { redirect } from 'next/navigation';

// The bare /prototypes/topics opens the first take.
export default function TopicsProtoIndex() {
  redirect('/prototypes/topics/covers/');
}
