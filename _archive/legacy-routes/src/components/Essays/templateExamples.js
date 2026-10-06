// Example configurations for different essay page types using EssayTemplate

// 1. Academic Research Papers
export const academicResearchConfig = {
  pageTitle: "Research Papers",
  pageSubtitle: "Academic Publications",
  pageDescription: "Peer-reviewed research papers from leading academic institutions. Explore cutting-edge research across multiple disciplines.",
  searchPlaceholder: "Search research papers...",
  filters: [
    { id: 'all', label: 'All Papers', count: 2156 },
    { id: 'computer-science', label: 'Computer Science', count: 456 },
    { id: 'physics', label: 'Physics', count: 234 },
    { id: 'biology', label: 'Biology', count: 389 },
    { id: 'chemistry', label: 'Chemistry', count: 267 },
    { id: 'mathematics', label: 'Mathematics', count: 198 }
  ]
};

// 2. Student Essays
export const studentEssaysConfig = {
  pageTitle: "Student Essays",
  pageSubtitle: "Academic Writing",
  pageDescription: "A collection of exemplary student essays showcasing critical thinking and academic writing skills across various subjects.",
  searchPlaceholder: "Search student essays...",
  filters: [
    { id: 'all', label: 'All Essays', count: 892 },
    { id: 'literature', label: 'Literature', count: 156 },
    { id: 'history', label: 'History', count: 134 },
    { id: 'philosophy', label: 'Philosophy', count: 98 },
    { id: 'science', label: 'Science', count: 145 },
    { id: 'social-studies', label: 'Social Studies', count: 167 }
  ]
};

// 3. Policy Analysis
export const policyAnalysisConfig = {
  pageTitle: "Policy Analysis",
  pageSubtitle: "Public Policy Research",
  pageDescription: "In-depth analysis of public policies, their implications, and recommendations for policymakers and stakeholders.",
  searchPlaceholder: "Search policy analysis...",
  filters: [
    { id: 'all', label: 'All Analysis', count: 567 },
    { id: 'healthcare', label: 'Healthcare Policy', count: 89 },
    { id: 'education', label: 'Education Policy', count: 76 },
    { id: 'environment', label: 'Environmental Policy', count: 67 },
    { id: 'economic', label: 'Economic Policy', count: 94 },
    { id: 'social', label: 'Social Policy', count: 78 }
  ]
};

// 4. Technology Essays
export const technologyEssaysConfig = {
  pageTitle: "Technology Essays",
  pageSubtitle: "Digital Innovation",
  pageDescription: "Essays exploring the latest technological innovations, their societal impact, and future implications.",
  searchPlaceholder: "Search technology essays...",
  filters: [
    { id: 'all', label: 'All Tech', count: 734 },
    { id: 'ai-ml', label: 'AI & Machine Learning', count: 156 },
    { id: 'blockchain', label: 'Blockchain', count: 89 },
    { id: 'cybersecurity', label: 'Cybersecurity', count: 67 },
    { id: 'biotech', label: 'Biotechnology', count: 45 },
    { id: 'sustainability', label: 'Green Tech', count: 78 }
  ]
};

// 5. Philosophy Essays
export const philosophyEssaysConfig = {
  pageTitle: "Philosophy Essays",
  pageSubtitle: "Philosophical Inquiry",
  pageDescription: "Essays exploring fundamental questions about existence, knowledge, values, reason, mind, and language.",
  searchPlaceholder: "Search philosophy essays...",
  filters: [
    { id: 'all', label: 'All Philosophy', count: 423 },
    { id: 'ethics', label: 'Ethics', count: 89 },
    { id: 'metaphysics', label: 'Metaphysics', count: 67 },
    { id: 'epistemology', label: 'Epistemology', count: 56 },
    { id: 'logic', label: 'Logic', count: 34 },
    { id: 'aesthetics', label: 'Aesthetics', count: 45 }
  ]
};

// Example usage:
/*
import { EssayTemplate } from '@/components/Essays';
import { academicResearchConfig } from '@/components/Essays/templateExamples';

const AcademicResearchPage = () => {
  return (
    <EssayTemplate
      {...academicResearchConfig}
      featuredEssay={yourFeaturedEssay}
      essays={yourEssaysList}
    />
  );
};
*/ 