import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';
import TurkanaBoyV2Client from './TurkanaBoyV2Client';
import { ESSAY_META } from './meta';
import './turkana-boy-v2.css';

export const metadata = createVisualEssayMetadata({
  ...ESSAY_META,
  slug: 'turkana-boy',
  description:
    'KNM-WT 15000 is the most complete early Homo skeleton and the clearest window into when our body plan truly emerged. From a mandibular abscess to Out-of-Africa migration, this essay traces the first draft of the modern human body through 108 bones, 14 visualizations, and 1.53 million years of evidence.',
});

export default function TurkanaBoySpecR2Page() {
  return (
    <ArtifactDetailWrapper meta={ESSAY_META}>
      <TurkanaBoyV2Client />
    </ArtifactDetailWrapper>
  );
}
