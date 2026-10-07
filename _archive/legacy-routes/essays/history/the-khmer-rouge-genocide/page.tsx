import type { Metadata } from 'next';
import { KhmerRougeGenocideClient } from './KhmerRougeGenocideClient';

export const metadata: Metadata = {
  title: 'Year Zero, Visualized: Cambodia\'s Civil War and the Khmer Rouge Genocide | Esy',
  description: 'An immersive visual essay exploring the Khmer Rouge genocide (1975-1979) that killed approximately 1.7-2 million Cambodians. From Cold War context through justice and memory.',
  keywords: [
    'Khmer Rouge',
    'Cambodia genocide',
    'Pol Pot',
    'Democratic Kampuchea',
    'Year Zero',
    'Tuol Sleng',
    'S-21',
    'Choeung Ek',
    'Killing Fields',
    'ECCC',
    'Khmer Rouge Tribunal',
    'visual essay',
    'history'
  ],
  openGraph: {
    title: 'Year Zero, Visualized: Cambodia\'s Civil War and the Khmer Rouge Genocide',
    description: 'An immersive visual essay exploring the Khmer Rouge genocide that killed 1.7-2 million people in just 3 years, 8 months, and 20 days.',
    type: 'article',
    url: 'https://esy.com/essays/history/the-khmer-rouge-genocide',
    siteName: 'Esy',
    images: [
      {
        url: 'https://esy.com/og/angkor-wat-at-sunrise.jpg',
        width: 4032,
        height: 3024,
        alt: 'Angkor Wat at sunrise over the reflecting pools - Year Zero, Visualized'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Year Zero, Visualized: Cambodia\'s Khmer Rouge Genocide',
    description: 'An immersive visual essay on the Khmer Rouge genocide (1975-1979).',
    images: ['https://esy.com/og/angkor-wat-at-sunrise.jpg']
  }
};

export default function KhmerRougeGenocidePage() {
  return <KhmerRougeGenocideClient />;
}
