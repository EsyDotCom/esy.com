import { NotFoundPiece } from '@/components/NotFound/NotFound';

export const metadata = {
  title: 'Page not found',
  robots: { index: false },
};

/**
 * esy.com's 404 (2026-10-06): B · Missing piece, the same as docs.esy.com's
 * (picked on docs.esy.com/prototypes/not-found). Mason tries a piece marked
 * 404 in his gate and it doesn't fit; his reef takes the footer world's place.
 * Replaces the old pathways 404 (workflow templates, school), which pointed at
 * sections the site no longer leads with.
 */
export default function NotFound() {
  return <NotFoundPiece />;
}
