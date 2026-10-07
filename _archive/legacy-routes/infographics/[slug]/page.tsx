import { notFound } from 'next/navigation';
import {
  getInfographicBySlug,
  getInfographicSlugs,
} from '@/data/infographics';
import { createInfographicMetadata } from '@/lib/infographic-metadata';
import InfographicDetailClient from './InfographicDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getInfographicSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const infographic = getInfographicBySlug(slug);
  if (!infographic) return {};

  return createInfographicMetadata({
    slug: infographic.id,
    title: `${infographic.title} | Esy Infographic`,
    description: infographic.description,
    ogTitle: infographic.title,
    ogImage: infographic.imageSrc,
    imageAlt: infographic.imageAlt,
    imageWidth: infographic.width,
    imageHeight: infographic.height,
    keywords: infographic.keywords,
    publishedTime: `${infographic.publishedDate}T00:00:00.000Z`,
    cluster: infographic.cluster,
  });
}

export default async function InfographicPage({ params }: PageProps) {
  const { slug } = await params;
  const infographic = getInfographicBySlug(slug);

  if (!infographic) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: infographic.title,
    description: infographic.description,
    contentUrl: infographic.imageSrc.startsWith('http')
      ? infographic.imageSrc
      : `https://esy.com${infographic.imageSrc}`,
    url: `https://esy.com/infographics/${infographic.id}/`,
    width: { '@type': 'QuantitativeValue', value: infographic.width },
    height: { '@type': 'QuantitativeValue', value: infographic.height },
    creator: {
      '@type': 'Organization',
      name: 'Esy',
      url: 'https://esy.com',
    },
    datePublished: infographic.publishedDate,
    keywords: infographic.keywords?.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InfographicDetailClient infographic={infographic} />
    </>
  );
}
