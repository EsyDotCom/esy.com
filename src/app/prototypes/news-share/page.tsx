import { redirect } from 'next/navigation';

// The bare /prototypes/news-share opens the first take.
export default function NewsShareIndex() {
  redirect('/prototypes/news-share/footer/');
}
