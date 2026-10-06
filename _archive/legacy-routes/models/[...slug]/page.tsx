import { Metadata } from "next";
import { notFound } from "next/navigation";
import ModelPageClient from "@/components/models/ModelPageClient";
import { getModelPageBySlug } from "@/lib/models/data";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  // Generate static params for all model pages
  const slugs = [
    'claude-opus',
    'gpt',
    'gpt/5-2',
  ];
  
  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugString = slug.join('/');
  const modelPage = getModelPageBySlug(slugString);

  if (!modelPage) {
    return {
      title: "Model Not Found | Esy",
    };
  }

  const getTitle = () => {
    if (modelPage.type === 'version') {
      return `${modelPage.family.name} ${modelPage.version?.version}`;
    }
    if (modelPage.type === 'subfamily') {
      return `${modelPage.family.name} · ${modelPage.subFamily?.name}`;
    }
    return modelPage.family.name;
  };

  const title = `${getTitle()} - Model Reference | Esy`;
  const description = modelPage.description;

  return {
    title,
    description,
    keywords: `${modelPage.family.name}, LLM models, AI models, Esy workflows`,
    openGraph: {
      title,
      description,
      url: `https://esy.com/models/${slugString}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://esy.com/models/${slugString}`,
    },
  };
}

export default async function ModelPage({ params }: Props) {
  const { slug } = await params;
  const slugString = slug.join('/');
  const modelPage = getModelPageBySlug(slugString);

  if (!modelPage) {
    notFound();
  }

  return <ModelPageClient modelPage={modelPage} />;
}
