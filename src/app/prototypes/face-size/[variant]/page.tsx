import { notFound } from 'next/navigation';
import NewsletterHomePage from '@/components/NewsletterHome/NewsletterHomePage';
import { EduStudio, latestLesson, resolveDesks } from '@/components/EducationHero';
import FaceSizeRoot, { FACE_SIZES } from '@/components/FaceShape/FaceSizeRoot';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { getAllAgenticArticles } from '@/lib/published-articles';

// The real homepage with the hero portrait at 440px (today), 360px or 280px
// on desktop. Props match src/app/page.js, so the only difference is the size.

const prototype = findPrototype('face-size')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Portrait size ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function FaceSizeVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const size = FACE_SIZES[variant];
  if (!size) notFound();
  const articles = await getAllAgenticArticles();

  return (
    <>
      <FaceSizeRoot size={size}>
        <NewsletterHomePage
          compose={{ mark: 'stencil', band: 'replay' }}
          appsLayout="tour"
          newsColumn
          hero={<EduStudio desks={resolveDesks(articles)} latest={latestLesson(articles)} phone="profile" composeMark="stencil" />}
        />
      </FaceSizeRoot>
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
