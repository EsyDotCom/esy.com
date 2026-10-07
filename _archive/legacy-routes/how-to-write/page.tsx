import HowToWriteClient from './client';

export const metadata = {
  title: 'How to Write: Complete Writing Guide & Tips',
  description: 'Master the art of writing with our comprehensive guide. Learn essay structure, writing techniques, grammar tips, and strategies for all types of writing.',
  keywords: 'how to write, writing guide, writing tips, essay writing, writing techniques, improve writing',
  openGraph: {
    title: 'How to Write: Your Complete Writing Guide | Esy',
    description: 'From basics to advanced techniques - everything you need to become a better writer.',
    type: 'article',
  },
}

export default function Page() {
  return <HowToWriteClient />;
}