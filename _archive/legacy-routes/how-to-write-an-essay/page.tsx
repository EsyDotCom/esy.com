"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Users, Star, CheckCircle, AlertCircle, HelpCircle, BookOpen, Sparkles, ChevronDown, ChevronUp, Calendar, FileText, Pen, Shield, TrendingUp, Award, Zap, X, Copy, Check, Info, Lightbulb, Hash, Building, CreditCard, Home, Heart, ArrowUp, Menu, BookMarked, Eye, Download, Mail, BarChart3, Target, Feather, Brain, Edit3, Type, AlignLeft, List, Search, Quote, Link2, Coffee, Layers, PenTool } from 'lucide-react';

const EssayWritingCompleteGuide = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedEssayType, setSelectedEssayType] = useState('argumentative');
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('structure');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Refs for section scrolling
  const sectionRefs = {
    overview: useRef<HTMLDivElement>(null),
    quickStart: useRef<HTMLDivElement>(null),
    essayTypes: useRef<HTMLDivElement>(null),
    structure: useRef<HTMLDivElement>(null),
    thesis: useRef<HTMLDivElement>(null),
    body: useRef<HTMLDivElement>(null),
    examples: useRef<HTMLDivElement>(null),
    mistakes: useRef<HTMLDivElement>(null),
    advanced: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
    tools: useRef<HTMLDivElement>(null)
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
      setShowBackToTop(scrollY > 500);
      
      // Calculate reading progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollProgress = (scrollY / documentHeight) * 100;
      setReadingProgress(scrollProgress);

      // Update active section
      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRefs]);

  const scrollToSection = (sectionId: string) => {
    sectionRefs[sectionId as keyof typeof sectionRefs]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleStep = (stepId: string) => {
    setExpandedSteps(prev => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const markStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Essay types data
  const essayTypes = {
    argumentative: {
      title: 'Argumentative Essay',
      description: 'Present a claim and support it with evidence',
      structure: ['Hook', 'Thesis with position', 'Evidence paragraphs', 'Counter-argument', 'Conclusion'],
      example: 'Should college education be free for all students?'
    },
    expository: {
      title: 'Expository Essay',
      description: 'Explain or inform about a topic objectively',
      structure: ['Topic introduction', 'Thesis statement', 'Explanatory paragraphs', 'Examples/evidence', 'Summary'],
      example: 'How does photosynthesis work in plants?'
    },
    narrative: {
      title: 'Narrative Essay',
      description: 'Tell a story with personal experience',
      structure: ['Setting/context', 'Characters/conflict', 'Rising action', 'Climax', 'Resolution/lesson'],
      example: 'A moment that changed my perspective on life'
    },
    descriptive: {
      title: 'Descriptive Essay',
      description: 'Paint a picture with words using sensory details',
      structure: ['Subject introduction', 'Sensory details', 'Spatial organization', 'Emotional connection', 'Lasting impression'],
      example: 'The atmosphere of a bustling city market'
    },
    analytical: {
      title: 'Analytical Essay',
      description: 'Break down and examine a topic in detail',
      structure: ['Introduction to subject', 'Thesis with analysis angle', 'Evidence analysis', 'Interpretation', 'Synthesis'],
      example: 'Symbolism in "The Great Gatsby"'
    }
  };

  // Table of contents
  const tableOfContents = [
    { id: 'overview', title: 'Overview', icon: Eye, time: '3 min' },
    { id: 'quickStart', title: 'Quick Start Guide', icon: Zap, time: '5 min' },
    { id: 'essayTypes', title: 'Essay Types', icon: Layers, time: '7 min' },
    { id: 'structure', title: 'Essay Structure', icon: Building, time: '10 min' },
    { id: 'thesis', title: 'Thesis Statements', icon: Target, time: '8 min' },
    { id: 'body', title: 'Body Paragraphs', icon: AlignLeft, time: '12 min' },
    { id: 'examples', title: 'Real Examples', icon: FileText, time: '10 min' },
    { id: 'mistakes', title: 'Common Mistakes', icon: AlertCircle, time: '5 min' },
    { id: 'advanced', title: 'Advanced Techniques', icon: Brain, time: '10 min' },
    { id: 'faq', title: 'FAQ', icon: HelpCircle, time: '5 min' },
    { id: 'tools', title: 'Writing Tools', icon: PenTool, time: '3 min' }
  ];

  // Transition words by category
  const transitionWords = {
    addition: ['Furthermore', 'Moreover', 'Additionally', 'In addition', 'Also', 'Besides'],
    contrast: ['However', 'Nevertheless', 'On the other hand', 'Conversely', 'In contrast', 'Despite'],
    cause: ['Therefore', 'Thus', 'Consequently', 'As a result', 'Hence', 'Accordingly'],
    example: ['For instance', 'For example', 'Specifically', 'To illustrate', 'Namely', 'Such as'],
    conclusion: ['In conclusion', 'To summarize', 'Ultimately', 'In summary', 'Overall', 'To conclude']
  };

  // FAQ data
  const faqs = [
    {
      question: "How long should my essay be?",
      answer: "Essay length depends on the assignment. High school essays typically range from 300-1000 words, college essays from 1500-5000 words. Always follow your instructor's guidelines. Quality matters more than quantity—every paragraph should serve a purpose."
    },
    {
      question: "Can I use 'I' in an academic essay?",
      answer: "It depends on the essay type. Personal narratives and reflective essays often use first person. However, formal academic essays traditionally avoid 'I' in favor of objective language. When in doubt, check your assignment guidelines or ask your instructor."
    },
    {
      question: "How many paragraphs should an essay have?",
      answer: "The classic five-paragraph essay (intro, 3 body paragraphs, conclusion) is just a starting point. Longer essays need more paragraphs to develop ideas fully. Focus on having one main idea per paragraph rather than hitting a specific number."
    },
    {
      question: "What's the difference between a thesis statement and a topic sentence?",
      answer: "A thesis statement presents your entire essay's main argument and appears in the introduction. Topic sentences introduce the main idea of individual paragraphs and support your thesis. Think of topic sentences as mini-thesis statements for each paragraph."
    },
    {
      question: "How do I avoid plagiarism?",
      answer: "Always cite sources when using others' ideas, even if paraphrased. Use quotation marks for direct quotes. Include in-text citations and a bibliography. When in doubt, cite it. Use plagiarism checkers and maintain notes on all sources while researching."
    },
    {
      question: "Should I write the introduction first?",
      answer: "Many writers find it easier to write the introduction after completing the body paragraphs. This way, you know exactly what you're introducing. You can write a rough intro first, then refine it once your argument is fully developed."
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', position: 'relative' }}>
      {/* Reading Progress Bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(139, 92, 246, 0.2)', zIndex: 100 }}>
        <div style={{ height: '100%', background: '#8b5cf6', transition: 'width 0.3s ease', width: `${readingProgress}%` }} />
      </div>



      {/* Main Layout */}
      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', paddingTop: '120px', position: 'relative' }}>
        {/* Left Sidebar - Table of Contents */}
        <aside style={{ width: '280px', position: 'sticky', top: '100px', height: 'fit-content', paddingRight: '3rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#8b5cf6', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Table of Contents</h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {tableOfContents.map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: '0.875rem',
                      color: activeSection === item.id ? '#8b5cf6' : 'rgba(255, 255, 255, 0.6)',
                      background: activeSection === item.id ? 'rgba(139, 92, 246, 0.1)' : 'transparent'
                    }}
                    onClick={() => scrollToSection(item.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Icon size={16} />
                      <span>{item.title}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)' }}>{item.time}</span>
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main style={{ flex: 1, paddingLeft: '3rem', paddingRight: '3rem', paddingBottom: '6rem' }}>
          {/* Overview Section */}
          <section ref={sectionRefs.overview} style={{ marginBottom: '6rem', scrollMarginTop: '100px' }}>
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '9999px', fontSize: '0.75rem', color: '#8b5cf6', marginBottom: '1.5rem', fontWeight: 500, letterSpacing: '0.025em' }}>
                <Eye size={14} />
                COMPLETE GUIDE
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 200, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em', fontFamily: 'var(--font-literata)' }}>
                How to Write an Essay:<br />
                From Blank Page to A+ Paper
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.6, fontWeight: 300 }}>
                Master the art of essay writing with our comprehensive guide. Learn structures, 
                techniques, and strategies that transform your ideas into compelling academic arguments.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 200, background: 'linear-gradient(to bottom, #8b5cf6, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>5</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.5)' }}>Essay Types</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 200, background: 'linear-gradient(to bottom, #8b5cf6, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>12</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.5)' }}>Writing Steps</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 200, background: 'linear-gradient(to bottom, #8b5cf6, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>50+</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.5)' }}>Examples</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 200, background: 'linear-gradient(to bottom, #8b5cf6, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>4.8</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.5)' }}>Student Rating</div>
              </div>
            </div>
          </section>

          {/* Quick Start Section */}
          <section ref={sectionRefs.quickStart} style={{ marginBottom: '6rem', scrollMarginTop: '100px' }}>
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '9999px', fontSize: '0.75rem', color: '#8b5cf6', marginBottom: '1.5rem', fontWeight: 500, letterSpacing: '0.025em' }}>
                <Zap size={14} />
                QUICK START
              </div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 200, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em', fontFamily: 'var(--font-literata)' }}>
                Write Your Essay in 12 Steps
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.6, fontWeight: 300 }}>
                Follow this proven process to write clear, compelling essays every time.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
              {[
                { num: 1, title: 'Understand the Prompt', desc: 'Break down what\'s being asked', detail: 'Read the assignment carefully. Identify key words like "analyze," "compare," "argue." Determine the essay type and requirements. Note word count, formatting, and citation style.' },
                { num: 2, title: 'Choose Your Topic', desc: 'Select a focused, manageable subject', detail: 'Pick something specific enough to cover thoroughly but broad enough to find sources. Consider your interests and the available research. Ensure it meets assignment criteria.' },
                { num: 3, title: 'Research & Gather Evidence', desc: 'Find credible sources to support your ideas', detail: 'Use academic databases, books, and reputable websites. Take detailed notes with citations. Look for diverse perspectives and strong evidence. Keep track of all sources.' },
                { num: 4, title: 'Develop Your Thesis', desc: 'Create a clear, arguable main claim', detail: 'Your thesis should be specific, debatable, and supportable. It guides your entire essay. Include your position and main supporting points. Refine it as you write.' },
                { num: 5, title: 'Create an Outline', desc: 'Organize your thoughts and structure', detail: 'Map out introduction, body paragraphs, and conclusion. Assign evidence to each point. Ensure logical flow between ideas. This roadmap saves time later.' },
                { num: 6, title: 'Write Introduction', desc: 'Hook readers and present your thesis', detail: 'Start with an attention-grabber: question, statistic, or anecdote. Provide context and background. End with your thesis statement. Keep it concise but engaging.' },
                { num: 7, title: 'Develop Body Paragraphs', desc: 'Present evidence and analysis', detail: 'Start each with a topic sentence. Present evidence, then analyze its significance. Use transitions between paragraphs. Follow PEEL: Point, Evidence, Explanation, Link.' },
                { num: 8, title: 'Address Counter-arguments', desc: 'Acknowledge and refute opposing views', detail: 'Show you understand other perspectives. Present counter-arguments fairly. Explain why your position is stronger. This strengthens your credibility.' },
                { num: 9, title: 'Write Conclusion', desc: 'Synthesize ideas and leave impact', detail: 'Restate thesis in new words. Summarize main points without repetition. End with broader implications or call to action. Leave readers thinking.' },
                { num: 10, title: 'Revise for Content', desc: 'Improve arguments and flow', detail: 'Check thesis clarity and support. Ensure each paragraph serves a purpose. Verify logical progression. Strengthen weak arguments. Cut irrelevant content.' },
                { num: 11, title: 'Edit for Style', desc: 'Polish language and clarity', detail: 'Vary sentence structure. Replace weak verbs and clichés. Check tone consistency. Improve word choice. Ensure academic voice throughout.' },
                { num: 12, title: 'Proofread Finally', desc: 'Catch errors and perfect formatting', detail: 'Read aloud to catch awkward phrasing. Check grammar, spelling, punctuation. Verify citations and formatting. Have someone else review if possible.' }
              ].map((step, index) => (
                <div 
                  key={step.num}
                  style={{
                    padding: '2rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${completedSteps.includes(index) ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: completedSteps.includes(index) ? 'rgba(34, 197, 94, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                      color: completedSteps.includes(index) ? '#22c55e' : '#8b5cf6',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '1.125rem'
                    }}>
                      {completedSteps.includes(index) ? <Check size={20} /> : step.num}
                    </div>
                  </div>
                  
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.75rem', fontFamily: 'var(--font-literata)' }}>{step.title}</h3>
                  <p style={{ fontSize: '0.9375rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, marginBottom: '1rem' }}>{step.desc}</p>
                  
                  <button
                    style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '0.5rem 1rem', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s ease' }}
                    onClick={() => toggleStep(step.num.toString())}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                      e.currentTarget.style.color = '#8b5cf6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                    }}
                  >
                    {expandedSteps[step.num.toString()] ? 'Show Less' : 'Learn More'}
                    {expandedSteps[step.num.toString()] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  
                  {expandedSteps[step.num.toString()] && (
                    <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1rem' }}>
                        {step.detail}
                      </p>
                      <button
                        onClick={() => markStepComplete(index)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: completedSteps.includes(index) ? 'rgba(34, 197, 94, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                          border: `1px solid ${completedSteps.includes(index) ? 'rgba(34, 197, 94, 0.3)' : 'rgba(139, 92, 246, 0.3)'}`,
                          borderRadius: '6px',
                          color: completedSteps.includes(index) ? '#22c55e' : '#8b5cf6',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <CheckCircle size={16} />
                        {completedSteps.includes(index) ? 'Completed' : 'Mark as Complete'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Essay Types Section */}
          <section ref={sectionRefs.essayTypes} style={{ marginBottom: '6rem', scrollMarginTop: '100px' }}>
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '9999px', fontSize: '0.75rem', color: '#8b5cf6', marginBottom: '1.5rem', fontWeight: 500, letterSpacing: '0.025em' }}>
                <Layers size={14} />
                ESSAY TYPES
              </div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 200, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em', fontFamily: 'var(--font-literata)' }}>
                Master Every Essay Type
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.6, fontWeight: 300 }}>
                Different essays require different approaches. Learn the unique structure and style of each type.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
              {Object.keys(essayTypes).map(type => (
                <button
                  key={type}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: selectedEssayType === type ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                    border: `1px solid ${selectedEssayType === type ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '8px',
                    color: selectedEssayType === type ? '#8b5cf6' : 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setSelectedEssayType(type)}
                >
                  {essayTypes[type as keyof typeof essayTypes].title}
                </button>
              ))}
            </div>

            <div style={{ padding: '2.5rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-literata)' }}>
                {essayTypes[selectedEssayType as keyof typeof essayTypes].title}
              </h3>
              <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem' }}>
                {essayTypes[selectedEssayType as keyof typeof essayTypes].description}
              </p>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Building size={20} style={{ color: '#8b5cf6' }} />
                  Structure
                </h4>
                <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
                  {essayTypes[selectedEssayType as keyof typeof essayTypes].structure.map((part, idx) => (
                    <div 
                      key={idx} 
                      style={{ padding: '1.5rem', background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.1)', borderRadius: '8px', position: 'relative', transition: 'all 0.2s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(8px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                    >
                      <span style={{ fontWeight: 600, color: '#8b5cf6' }}>Part {idx + 1}:</span> {part}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '1.5rem', background: 'rgba(139, 92, 246, 0.05)', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.1)' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Lightbulb size={18} style={{ color: '#8b5cf6' }} />
                  Example Topic
                </h4>
                <p style={{ fontSize: '0.9375rem', fontStyle: 'italic' }}>
                  &ldquo;{essayTypes[selectedEssayType as keyof typeof essayTypes].example}&rdquo;
                </p>
              </div>
            </div>
          </section>

          {/* Back to Top Button */}
          <button
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: '48px',
              height: '48px',
              background: '#8b5cf6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: showBackToTop ? 1 : 0,
              transform: showBackToTop ? 'translateY(0)' : 'translateY(20px)',
              pointerEvents: showBackToTop ? 'auto' : 'none',
              border: 'none'
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ArrowUp size={20} />
          </button>
        </main>

        {/* Right Sidebar - AI Essay Assistant */}
        <aside style={{ width: '280px', position: 'sticky', top: '100px', height: 'fit-content', paddingLeft: '3rem' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
            <Brain size={32} style={{ color: '#8b5cf6', marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>AI Essay Assistant</h4>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1rem' }}>
              Get instant feedback, suggestions, and help with your essay.
            </p>
            <button style={{ padding: '0.75rem 2rem', background: '#8b5cf6', border: 'none', borderRadius: '8px', color: 'white', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s ease', width: '100%', justifyContent: 'center' }}>
              Try Esy Free
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EssayWritingCompleteGuide; 