import type { Metadata } from 'next';
import ScrollytellingShowcase from './ScrollytellingShowcase';

export const metadata: Metadata = {
  title: 'Scrollytelling | Interactive Visual Stories | Esy',
  description: 'Experience scrollytelling - immersive, scroll-driven visual stories that bring ideas to life. Explore our collection of interactive essays on science, history, technology, and culture.',
  keywords: [
    'scrollytelling',
    'scrollytelling examples',
    'interactive stories',
    'visual essays',
    'scroll-based storytelling',
    'immersive web experiences',
    'digital storytelling',
    'interactive journalism',
  ],
  openGraph: {
    title: 'Scrollytelling | Interactive Visual Stories | Esy',
    description: 'Immersive, scroll-driven visual stories that bring ideas to life through animation and storytelling.',
    type: 'website',
    url: 'https://esy.com/scrollytelling',
  },
};

export default function ScrollytellingPage() {
  return <ScrollytellingShowcase />;
}
