import AgenticWorkflowsClient from './client';

export const metadata = {
  title: 'Agentic Workflows: AI Automation Guide | Esy',
  description: 'Discover how agentic workflows revolutionize AI automation with autonomous agents. Complete guide with real-world examples, implementation strategies, and future outlook.',
  keywords: 'agentic workflows, AI automation, autonomous agents, AI systems, workflow automation, intelligent agents',
  openGraph: {
    title: 'Agentic Workflows: AI Automation Guide | Esy',
    description: 'Master the future of AI automation with our comprehensive guide to agentic workflows and autonomous systems.',
    type: 'article',
  },
}

export default function Page() {
  return <AgenticWorkflowsClient />;
}