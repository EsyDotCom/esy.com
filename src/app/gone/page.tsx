import LightHeader from '@/components/LightHeader/LightHeader';
import { GonePage } from '@/components/NotFound/Gone';

export const metadata = {
  title: 'This page is gone',
  robots: { index: false },
};

/**
 * esy.com's 410 (2026-10-06): B · Buried, picked on /prototypes/gone. Every
 * retired address is rewritten here by src/middleware.ts with status 410, so
 * a reader sees Mason heaping sand over the slab marked 410 while search
 * engines get "gone on purpose". Laid out like the 404 (src/app/not-found.tsx).
 */
export default function Gone() {
  return (
    <>
      <LightHeader />
      <GonePage take="buried" />
    </>
  );
}
