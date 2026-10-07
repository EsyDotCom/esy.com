import type { Metadata } from 'next';
import { TheBluesHistoryClient } from './TheBluesHistoryClient';

export const metadata: Metadata = {
  title: "The Blues: America's Haunted Foundation | Esy",
  description:
    'A documentary visual history of the blues—from its emergence in the post-emancipation South through its transformation into the foundation of virtually all American popular music.',
  keywords: [
    'blues history',
    'delta blues',
    'chicago blues',
    'african american music',
    'visual essay',
    'robert johnson',
    'muddy waters',
    'bessie smith',
    'american music history',
  ],
  openGraph: {
    title: "The Blues: America's Haunted Foundation",
    description:
      'A documentary visual history of the music that built America—from Delta cotton fields to Chicago clubs.',
    type: 'article',
    url: 'https://esy.com/essays/history/the-blues-history',
    siteName: 'Esy',
    images: [
      {
        url: 'https://esy.com/og/the-blues-history.png',
        width: 1200,
        height: 630,
        alt: "The Blues: America's Haunted Foundation - A documentary visual history",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Blues: America's Haunted Foundation",
    description:
      'A documentary visual history of the music that built America.',
    images: ['https://esy.com/og/the-blues-history.png'],
  },
  authors: [{ name: 'Esy' }],
  category: 'History',
};

export default function TheBluesHistoryPage() {
  return <TheBluesHistoryClient />;
}
