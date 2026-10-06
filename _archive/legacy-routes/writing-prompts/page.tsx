import WritingPromptsClient from './client';

export const metadata = {
  title: 'Writing Prompts - Creative & Essay Prompts | Esy',
  description: 'Discover hundreds of writing prompts for essays, creative writing, and academic papers. Get inspired with prompts for all genres and skill levels.',
  keywords: 'writing prompts, essay prompts, creative writing ideas, story prompts, academic writing prompts',
  openGraph: {
    title: 'Writing Prompts - Spark Your Creativity | Esy',
    description: 'Find the perfect writing prompt to overcome writer\'s block and start your next masterpiece.',
    type: 'website',
  },
}

export default function Page() {
  return <WritingPromptsClient />;
}