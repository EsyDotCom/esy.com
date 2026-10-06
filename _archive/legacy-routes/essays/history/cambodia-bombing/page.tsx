import type { Metadata } from 'next';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';
import { CambodiaBombingClient } from './CambodiaBombingClient';

const ESSAY_META = {
  title: 'Cambodia Bombed (1965–1973)',
  subtitle: 'The Air War You Weren\'t Meant to See',
  category: 'History',
  readTime: '35 min',
  sourceCount: 26,
  sourceTier: 'Tier-1',
  sectionCount: 10,
  visualizationCount: 6,
  designSystem: 'Subject-derived',
  published: 'February 2026',
  model: 'Claude',
  template: 'Visual Essay',
  backLink: '/essays',
  backLabel: 'Essays',
  palette: [
    { name: 'Laterite Earth', color: '#8B4513' },
    { name: 'Monsoon Slate', color: '#2F4F4F' },
    { name: 'Palm-Leaf Green', color: '#228B22' },
    { name: 'Document Cream', color: '#F5F5DC' },
    { name: 'Redaction Black', color: '#1A1A1A' },
    { name: 'Blood Rust', color: '#8B0000' },
    { name: 'Archive Yellow', color: '#DAA520' },
  ],
  visualizations: [
    { name: 'Declassification Reveals', type: 'Scroll Animation' },
    { name: 'Bomb Tonnage Counters', type: 'Animated Numerics' },
    { name: 'Sortie Data Visualization', type: 'Data Visualization' },
    { name: 'Archival Photography', type: 'Documentary Treatment' },
    { name: 'Chapter Timeline', type: 'Interactive Timeline' },
    { name: 'Scroll-Lock Sequences', type: 'Immersive Narrative' },
  ],
  keySources: [
    'Foreign Relations of the United States, 1969-1976, Vol. VI',
    'National Security Archive, Kissinger Telcons Collection',
    'Ben Kiernan & Taylor Owen, "Bombs Over Cambodia" (2006)',
    'William Shawcross, Sideshow: Kissinger, Nixon, and the Destruction of Cambodia',
    'Yale Genocide Studies Program, CGEO Database',
    'Senate Armed Services Committee, "Bombing in Cambodia" Hearings (1973)',
  ],
};

export const metadata: Metadata = {
  title: 'Cambodia Bombed (1965–1973): The Air War You Weren\'t Meant to See | Esy',
  description: 'A visual essay exploring the secret U.S. bombing campaign in Cambodia—500,000 tons dropped on a neutral nation, hidden from Congress, leaked to the press, and still reverberating today as unexploded ordnance.',
  keywords: [
    'Cambodia bombing',
    'Operation Menu',
    'Operation Freedom Deal',
    'secret bombing',
    'Nixon Cambodia',
    'Kissinger Cambodia',
    'B-52 bombing',
    'Vietnam War',
    'Cambodia neutrality',
    'Khmer Rouge',
    'unexploded ordnance',
    'UXO Cambodia',
    'War Powers Resolution',
    'congressional oversight',
    'declassified documents',
    'visual essay',
    'history'
  ],
  openGraph: {
    title: 'Cambodia Bombed (1965–1973): The Air War You Weren\'t Meant to See',
    description: 'Approximately 500,000 tons of bombs. A neutral nation. A campaign hidden from Congress. An essay that traces secrecy to revelation.',
    type: 'article',
    url: 'https://esy.com/essays/history/cambodia-bombing',
    siteName: 'Esy',
    images: [
      {
        url: 'https://esy.com/og/B-52D-dropping-bombs-over-vietnam.jpg',
        width: 1798,
        height: 1605,
        alt: 'B-52D Stratofortress dropping bombs over Vietnam — Cambodia Bombed visual essay'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cambodia Bombed (1965–1973): The Secret Air War',
    description: '500,000 tons of bombs dropped on a neutral nation. The story of secrecy, revelation, and ongoing consequences.',
    images: ['https://esy.com/og/B-52D-dropping-bombs-over-vietnam.jpg']
  }
};

export default function CambodiaBombingPage() {
  return (
    <ArtifactDetailWrapper meta={ESSAY_META}>
      <CambodiaBombingClient />
    </ArtifactDetailWrapper>
  );
}
