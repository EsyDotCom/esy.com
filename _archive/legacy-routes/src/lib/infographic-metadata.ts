/**
 * Infographic Metadata Helper
 * ============================
 *
 * Standardized metadata generation for infographic pages,
 * ensuring consistency across all infographics for SEO and social sharing.
 *
 * Parallel to visual-essay-metadata.ts but adapted for infographic artifacts:
 * - OG image IS the infographic itself (no separate /og/ asset)
 * - basePath defaults to 'infographics'
 * - Keywords auto-include cluster name
 *
 * @see /docs/artifact-patterns-guide/INFOGRAPHIC_PIPELINE_GUIDE.md
 */

import { Metadata } from 'next';

export interface InfographicMetadataConfig {
  slug: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  keywords?: string[];
  publishedTime?: string;
  cluster?: string;
}

const SITE_URL = 'https://esy.com';
const TWITTER_SITE = '@EsyResearch';

export function createInfographicMetadata(config: InfographicMetadataConfig): Metadata {
  const ogTitle = config.ogTitle || config.title.split(' | ')[0];
  const ogDescription = config.ogDescription || config.description;
  const canonicalUrl = `${SITE_URL}/infographics/${config.slug}/`;

  const keywords = [
    ...(config.keywords || []),
    ...(config.cluster ? [config.cluster, `${config.cluster} infographic`] : []),
    'infographic',
    'research infographic',
    'data visualization',
  ];

  const metadata: Metadata = {
    title: config.title,
    description: config.description,
    keywords,

    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: 'Esy',
      type: 'article',
      locale: 'en_US',
      images: [
        {
          url: config.ogImage.startsWith('http') ? config.ogImage : `${SITE_URL}${config.ogImage}`,
          width: config.imageWidth || 1200,
          height: config.imageHeight || 630,
          alt: config.imageAlt,
        },
      ],
      ...(config.publishedTime && { publishedTime: config.publishedTime }),
    },

    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      site: TWITTER_SITE,
      images: [config.ogImage.startsWith('http') ? config.ogImage : `${SITE_URL}${config.ogImage}`],
    },

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: true,
      follow: true,
    },
  };

  return metadata;
}
