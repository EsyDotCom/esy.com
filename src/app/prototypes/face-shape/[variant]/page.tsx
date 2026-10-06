import { notFound } from 'next/navigation';
import NewsletterHomePage from '@/components/NewsletterHome/NewsletterHomePage';
import { EduStudio, latestLesson, resolveDesks } from '@/components/EducationHero';
import FaceShapeRoot from '@/components/FaceShape/FaceShapeRoot';
import FaceSheet from '@/components/FaceShape/FaceSheet';
import { FACE_SHAPES } from '@/components/FaceShape/shapes';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { getAllAgenticArticles } from '@/lib/published-articles';

// The real homepage with Zev's photo in each take's shape instead of a circle,
// and under the hero a sheet of every size and frame the photo appears in.
// Props match src/app/page.js, so the only difference is the shape.

const prototype = findPrototype('face-shape')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Face shape ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function FaceShapeVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const take = FACE_SHAPES[variant];
  if (!take) notFound();
  const articles = await getAllAgenticArticles();

  return (
    <>
      <FaceShapeRoot shape={take.shape}>
        <NewsletterHomePage
          compose={{ mark: 'stencil', band: 'replay' }}
          appsLayout="tour"
          newsColumn
          hero={
            <>
              <EduStudio desks={resolveDesks(articles)} latest={latestLesson(articles)} phone="profile" composeMark="stencil" />
              <FaceSheet take={take} articles={articles} />
            </>
          }
        />
      </FaceShapeRoot>
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
