"use client";

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Brain, 
  GitBranch, 
  Zap, 
  Target, 
  Users, 
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Workflow,
  Bot,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Monitor,
  Database,
  Network
} from 'lucide-react';

const AgenticWorkflowsGuide = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['introduction', 'fundamentals', 'components', 'implementation', 'examples', 'benefits', 'challenges', 'future', 'sources'];
      let current = 'introduction';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= 150) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction', icon: BookOpen },
    { id: 'fundamentals', title: 'Fundamentals', icon: Brain },
    { id: 'components', title: 'Core Components', icon: Settings },
    { id: 'implementation', title: 'Implementation', icon: GitBranch },
    { id: 'examples', title: 'Real-World Examples', icon: Target },
    { id: 'benefits', title: 'Benefits & Impact', icon: TrendingUp },
    { id: 'challenges', title: 'Challenges & Solutions', icon: AlertCircle },
    { id: 'future', title: 'Future Outlook', icon: Zap },
    { id: 'sources', title: 'Sources & Citations', icon: BookOpen }
  ];

  const workflowExamples = [
    {
      id: 'banking',
      title: 'Banking Credit Risk Assessment',
      description: 'AI agents transform credit memo creation at a major retail bank',
      source: 'McKinsey Case Study',
      url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/seizing-the-agentic-ai-advantage',
      impact: '20-60% productivity increase, 30% faster credit turnaround',
      challenge: 'Relationship managers spent weeks manually writing credit-risk memos using data from 10+ sources to help make credit decisions and fulfill regulatory requirements',
      solution: 'AI agents extract data, draft memo sections, generate confidence scores to prioritize review, and suggest relevant follow-up questions. The analyst role shifts from manual drafting to strategic oversight.',
      agents: ['Data Extraction Agent', 'Memo Drafting Agent', 'Validation Agent', 'Follow-up Agent'],
      steps: [
        'Data Extraction Agent pulls information from 10+ financial databases and systems',
        'Memo Drafting Agent creates initial memo sections with confidence scoring',
        'Validation Agent cross-references data and flags inconsistencies for review',
        'Follow-up Agent suggests strategic questions and next steps',
        'Human analyst reviews, refines, and approves final recommendations'
      ],
      details: 'In close collaboration with credit-risk experts and relationship managers, agents assist by extracting data from multiple sources, drafting memo sections with confidence scoring, and providing strategic insights for human review.'
    },
    {
      id: 'customer-service',
      title: 'Customer Service Transformation',
      description: 'Autonomous incident resolution and proactive customer support',
      source: 'McKinsey Research',
      url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/seizing-the-agentic-ai-advantage',
      impact: '80% autonomous resolution, 60-90% reduction in resolution time',
      challenge: 'Traditional customer service requires human intervention for complex issues, leading to delays and high operational costs',
      solution: 'AI agents proactively detect issues, initiate resolution steps automatically, and communicate directly with customers. Human agents handle only escalations and quality oversight.',
      agents: ['Detection Agent', 'Resolution Agent', 'Communication Agent', 'Escalation Agent'],
      steps: [
        'Detection Agent monitors customer patterns and identifies potential issues',
        'Resolution Agent automatically initiates appropriate resolution procedures',
        'Communication Agent sends personalized updates and explanations to customers',
        'Escalation Agent determines when human intervention is required',
        'Human agents handle complex cases and provide quality oversight'
      ],
      details: 'Agents monitor patterns across channels, anticipate customer needs, automatically issue refunds or updates, and communicate directly via chat or email without human intervention.'
    },
    {
      id: 'security',
      title: 'Cybersecurity Threat Response',
      description: 'Real-world implementation of autonomous security operations',
      source: 'Multiple Industry Examples',
      url: 'https://research.aimultiple.com/agentic-ai/',
      impact: 'Real-time threat detection and autonomous response',
      challenge: 'Security teams struggle to respond quickly enough to sophisticated cyber threats and analyze vast amounts of security data',
      solution: 'AI agents autonomously detect anomalies, correlate threat intelligence, execute containment procedures, and adapt responses in real-time based on evolving threat patterns.',
      agents: ['Detection Agent', 'Analysis Agent', 'Response Agent', 'Intelligence Agent'],
      steps: [
        'Detection Agent continuously monitors network traffic and system logs for anomalies',
        'Analysis Agent correlates threat data and assesses risk severity',
        'Intelligence Agent enriches findings with external threat intelligence',
        'Response Agent executes automated containment and mitigation procedures',
        'Human security analysts review complex threats and strategic decisions'
      ],
      details: 'Examples include Google\'s SOC Manager agent for malware detection, Microsoft\'s Security Copilot, and Darktrace\'s Antigena system for autonomous threat response.'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0f',
      color: '#ffffff',
      fontFamily: 'var(--font-inter)'
    }}>
      {/* Hero Section */}
      <section style={{
        paddingTop: '8rem',
        paddingBottom: '4rem',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '8rem 2rem 4rem'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '100px',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#8b5cf6',
            marginBottom: '2rem'
          }}>
            <Workflow size={16} />
            Comprehensive Guide
          </div>
          
          <h1 style={{
            fontSize: '4.5rem',
            fontFamily: 'var(--font-literata)',
            fontWeight: 300,
            lineHeight: 1.3,
            letterSpacing: '0.01em',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Agentic Workflows
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            lineHeight: '1.7',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '680px',
            margin: '0 auto 3rem'
          }}>
            Understanding autonomous AI systems that coordinate multiple agents to accomplish complex tasks with minimal human intervention.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={() => scrollToSection('fundamentals')}
              style={{
                backgroundColor: '#8b5cf6',
                color: '#ffffff',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7c3aed';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#8b5cf6';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start Learning
              <ArrowRight size={16} />
            </button>
            
            <button 
              onClick={() => scrollToSection('examples')}
              style={{
                backgroundColor: 'transparent',
                color: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              View Examples
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginTop: '4rem'
        }}>
          {[
            { label: 'Research Adoption', value: '50%', icon: TrendingUp, source: 'Businesses by 2027' },
            { label: 'Work Activities', value: '45%', icon: Bot, source: 'Automation Potential' },
            { label: 'Issue Resolution', value: '80%', icon: CheckCircle, source: 'Autonomous Handling' },
            { label: 'Time Reduction', value: '60-90%', icon: Zap, source: 'Resolution Speed' }
          ].map((stat, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '2rem',
              backgroundColor: '#16161f',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <stat.icon size={24} style={{ color: '#8b5cf6', marginBottom: '1rem' }} />
              <div style={{
                fontSize: '2rem',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '0.5rem'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '0.25rem'
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.4)'
              }}>
                {stat.source}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '4rem', padding: '0 2rem' }}>
        {/* Table of Contents */}
        <aside style={{
          width: '280px',
          position: 'sticky',
          top: '120px',
          height: 'fit-content'
        }}>
          <div style={{
            backgroundColor: '#16161f',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#ffffff'
            }}>
              Table of Contents
            </h3>
            <nav>
              {tableOfContents.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    backgroundColor: activeSection === item.id ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                    color: activeSection === item.id ? '#8b5cf6' : 'rgba(255, 255, 255, 0.7)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.25rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== item.id) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== item.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                    }
                  }}
                >
                  <item.icon size={16} />
                  {item.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Introduction Section */}
          <section id="introduction" style={{ marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '3rem',
              fontFamily: 'var(--font-literata)',
              fontWeight: 600,
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              color: '#ffffff'
            }}>
              What Are Agentic Workflows?
            </h2>
            
            <p style={{
              fontSize: '1.125rem',
              lineHeight: '1.8',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '2rem'
            }}>
              Agentic workflows are AI-driven processes where autonomous AI agents make decisions, take actions and coordinate tasks with minimal human intervention. Unlike traditional automated workflows, agentic workflows are dynamic, enabling them to account for multiple unexpected variables and achieve more complex tasks that often exceed the boundaries of what an algorithmic script can do.
            </p>

            <div style={{
              backgroundColor: 'rgba(139, 92, 246, 0.05)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <Brain size={20} style={{ color: '#8b5cf6' }} />
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#8b5cf6',
                  margin: 0
                }}>
                  Research Insight
                </h3>
              </div>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.7',
                margin: 0,
                fontSize: '1rem'
              }}>
                <a href="https://www.ai21.com/knowledge/agentic-ai-workflow/" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>Research suggests</a> that 50% of businesses will use agentic AI pilots by 2027. <a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/seizing-the-agentic-ai-advantage" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>McKinsey studies</a> demonstrate that agentic workflows can enable up to 80% autonomous resolution of common incidents with 60-90% reduction in resolution time.
              </p>
            </div>

            <p style={{
              fontSize: '1rem',
              lineHeight: '1.8',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '2rem'
            }}>
              These workflows leverage core components of intelligent agents such as reasoning, planning and tool use to execute complex tasks efficiently. <a href="https://weaviate.io/blog/what-are-agentic-workflows" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>AI agents are systems</a> that combine LLMs for reasoning and decision-making with tools for real-world interaction, enabling them to complete complex tasks with limited human involvement.
            </p>
          </section>



          {/* Fundamentals Section */}
          <section id="fundamentals" style={{ marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '3rem',
              fontFamily: 'var(--font-literata)',
              fontWeight: '600',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              color: '#ffffff'
            }}>
              Fundamental Principles
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {[
                {
                  icon: Bot,
                  title: 'Agent Autonomy',
                  description: (
                    <>
                      AI agents refer to systems that are capable of autonomously performing tasks on behalf of a user by designing their workflow and utilizing available tools (
                      <a href="https://www.ibm.com/think/topics/agentic-workflows" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>
                        IBM
                      </a>
                      ).
                    </>
                  )
                },
                {
                  icon: Network,
                  title: 'Collaborative Intelligence',
                  description: (
                    <>
                      Multiple agents often work together in a system, each handling different parts of a process while sharing information and coordinating with one another (
                      <a href="https://www.ai21.com/knowledge/agentic-ai-workflow/" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>
                        AI21
                      </a>
                      ).
                    </>
                  )
                },
                {
                  icon: Target,
                  title: 'Goal-Oriented Behavior',
                  description: (
                    <>
                      AI agents can navigate through various stages to reach a goal, including data collection, pattern recognition, decision-making, and executing appropriate actions (
                      <a href="https://www.ai21.com/knowledge/agentic-ai-workflow/" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>
                        AI21
                      </a>
                      ).
                    </>
                  )
                },
                {
                  icon: RotateCcw,
                  title: 'Adaptive Learning',
                  description: (
                    <>
                      AI agents learn from their actions through feedback and continuous monitoring, allowing them to adapt and improve their performance over time (
                      <a href="https://www.miquido.com/ai-glossary/ai-agentic-workflows/" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>
                        Miquido
                      </a>
                      ).
                    </>
                  )
                }
              ].map((principle, index) => (
                <div key={index} style={{
                  backgroundColor: '#16161f',
                  borderRadius: '12px',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <principle.icon size={24} style={{ color: '#8b5cf6', marginBottom: '1rem' }} />
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#ffffff'
                  }}>
                    {principle.title}
                  </h3>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Components Section */}
          <section id="components" style={{ marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '3rem',
              fontFamily: 'var(--font-literata)',
              fontWeight: '600',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              color: '#ffffff'
            }}>
              Core Components
            </h2>

            <div style={{ marginBottom: '3rem' }}>
              {[
                {
                  title: 'Orchestration Engine',
                  description: 'The orchestration layer coordinates and connects all components involved in the agentic workflow. This is the main execution unit that dynamically routes workflow tasks, calls functions, and fetches additional information.',
                  features: ['Task scheduling and coordination', 'Dynamic workflow routing', 'Component integration', 'Execution monitoring']
                },
                {
                  title: 'AI Agents',
                  description: 'AI agents are systems that combine LLMs for reasoning and decision-making with tools for real-world interaction. They are equipped with memory, planning, reasoning, and tool-use capabilities.',
                  features: ['Natural language processing', 'Decision-making algorithms', 'Tool integration', 'Memory management']
                },
                {
                  title: 'Communication Protocol',
                  description: 'Agents exchange necessary data in a structured manner that mirrors logical workflow progression. This enables coordination between multiple agents working on different parts of a process.',
                  features: ['Inter-agent messaging', 'Data exchange protocols', 'Coordination mechanisms', 'Information sharing']
                },
                {
                  title: 'Feedback Mechanisms',
                  description: 'AI agents learn from their actions through continuous monitoring and feedback. This learning mechanism enables workflows to evolve, becoming more efficient and accurate over time.',
                  features: ['Performance monitoring', 'Continuous learning', 'Error detection', 'Process optimization']
                }
              ].map((component, index) => (
                <div key={index} style={{
                  backgroundColor: '#16161f',
                  borderRadius: '12px',
                  padding: '2.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#ffffff'
                  }}>
                    {component.title}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginBottom: '1.5rem'
                  }}>
                    {component.description}
                  </p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem'
                  }}>
                    {component.features.map((feature, featureIndex) => (
                      <div key={featureIndex} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '8px'
                      }}>
                        <CheckCircle size={16} style={{ color: '#8b5cf6', flexShrink: 0 }} />
                        <span style={{
                          fontSize: '0.875rem',
                          color: 'rgba(255, 255, 255, 0.8)'
                        }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Implementation Section */}
          <section id="implementation" style={{ marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '3rem',
              fontFamily: 'var(--font-literata)',
              fontWeight: '600',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              color: '#ffffff'
            }}>
              Implementation Strategy
            </h2>

            <div style={{
              backgroundColor: '#16161f',
              borderRadius: '12px',
              padding: '2.5rem',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              marginBottom: '3rem'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '2rem',
                color: '#ffffff'
              }}>
                Phased Approach to Agentic Workflow Development
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                  {
                    phase: 'Phase 1',
                    title: 'Foundation & Planning',
                    duration: '2-4 weeks',
                    tasks: [
                      'Define workflow objectives and success metrics',
                      'Identify required agent specializations',
                      'Design communication protocols and data flow',
                      'Establish testing and validation frameworks'
                    ]
                  },
                  {
                    phase: 'Phase 2',
                    title: 'Agent Development',
                    duration: '4-8 weeks',
                    tasks: [
                      'Build and train specialized agents',
                      'Implement decision-making frameworks',
                      'Create knowledge bases and training data',
                      'Develop agent-to-agent communication'
                    ]
                  },
                  {
                    phase: 'Phase 3',
                    title: 'Integration & Testing',
                    duration: '3-6 weeks',
                    tasks: [
                      'Integrate agents into unified workflow',
                      'Conduct comprehensive testing scenarios',
                      'Optimize performance and error handling',
                      'Validate against success metrics'
                    ]
                  },
                  {
                    phase: 'Phase 4',
                    title: 'Deployment & Monitoring',
                    duration: 'Ongoing',
                    tasks: [
                      'Deploy to production environment',
                      'Monitor performance and reliability',
                      'Gather feedback and usage analytics',
                      'Continuous improvement and optimization'
                    ]
                  }
                ].map((phase, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    gap: '2rem',
                    padding: '1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '8px',
                    borderLeft: '4px solid #8b5cf6'
                  }}>
                    <div style={{ minWidth: '120px' }}>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#8b5cf6',
                        marginBottom: '0.25rem'
                      }}>
                        {phase.phase}
                      </div>
                      <div style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#ffffff',
                        marginBottom: '0.5rem'
                      }}>
                        {phase.title}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <Clock size={12} />
                        {phase.duration}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '0.75rem'
                      }}>
                        {phase.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.5rem'
                          }}>
                            <CheckCircle size={14} style={{ 
                              color: '#8b5cf6', 
                              flexShrink: 0, 
                              marginTop: '0.125rem' 
                            }} />
                            <span style={{
                              fontSize: '0.875rem',
                              color: 'rgba(255, 255, 255, 0.8)',
                              lineHeight: '1.4'
                            }}>
                              {task}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Examples Section */}
          <section id="examples" style={{ marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '3rem',
              fontFamily: 'var(--font-literata)',
              fontWeight: '600',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              color: '#ffffff'
            }}>
              Real-World Examples
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {workflowExamples.map((workflow, index) => (
                <div key={workflow.id} style={{
                  backgroundColor: '#16161f',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                }}>
                  <div 
                    style={{
                      padding: '2rem',
                      cursor: 'pointer'
                    }}
                    onClick={() => setExpandedWorkflow(
                      expandedWorkflow === workflow.id ? null : workflow.id
                    )}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          marginBottom: '0.5rem',
                          color: '#ffffff'
                        }}>
                          {workflow.title}
                        </h3>
                        <p style={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          lineHeight: '1.6',
                          marginBottom: '0.75rem'
                        }}>
                          {workflow.description}
                        </p>
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontStyle: 'italic',
                          marginBottom: '1rem'
                        }}>
                          Source: <a href={workflow.url} target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>
                            {workflow.source}
                          </a>
                        </p>
                      </div>
                      <ChevronRight 
                        size={20} 
                        style={{ 
                          color: 'rgba(255, 255, 255, 0.5)',
                          transform: expandedWorkflow === workflow.id ? 'rotate(90deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease'
                        }} 
                      />
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '2rem',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          color: 'rgba(255, 255, 255, 0.5)'
                        }}>
                          IMPACT
                        </span>
                        <span style={{
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: '#10b981'
                        }}>
                          {workflow.impact}
                        </span>
                      </div>
                    </div>
                  </div>

                  {expandedWorkflow === workflow.id && (
                    <div style={{
                      padding: '0 2rem 2rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '2rem',
                        marginTop: '2rem'
                      }}>
                        <div>
                          <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            color: '#ffffff'
                          }}>
                            Participating Agents
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {workflow.agents.map((agent, agentIndex) => (
                              <div key={agentIndex} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem',
                                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                                borderRadius: '6px'
                              }}>
                                <Bot size={14} style={{ color: '#8b5cf6' }} />
                                <span style={{
                                  fontSize: '0.875rem',
                                  color: 'rgba(255, 255, 255, 0.8)'
                                }}>
                                  {agent}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            color: '#ffffff'
                          }}>
                            Workflow Steps
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {workflow.steps.map((step, stepIndex) => (
                              <div key={stepIndex} style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.75rem'
                              }}>
                                <div style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  backgroundColor: '#8b5cf6',
                                  color: '#ffffff',
                                  fontSize: '0.75rem',
                                  fontWeight: '600',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  marginTop: '0.125rem'
                                }}>
                                  {stepIndex + 1}
                                </div>
                                <span style={{
                                  fontSize: '0.875rem',
                                  color: 'rgba(255, 255, 255, 0.8)',
                                  lineHeight: '1.4'
                                }}>
                                  {step}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section id="benefits" style={{ marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '3rem',
              fontFamily: 'var(--font-literata)',
              fontWeight: '600',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              color: '#ffffff'
            }}>
              Benefits & Impact
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {[
                {
                  icon: TrendingUp,
                  title: 'Measurable Productivity Gains',
                  description: 'Research shows organizations adopting agentic workflows experience significant improvements in task completion and operational efficiency.',
                  metrics: [
                    (
                      <span key="productivity">
                        <a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/seizing-the-agentic-ai-advantage" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>
                          20-60% productivity increase
                        </a> in banking
                      </span>
                    ),
                    (
                      <span key="automation">
                        <a href="https://psico-smart.com/en/blogs/blog-leveraging-ai-and-automation-for-enhanced-productivity-management-166480" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>
                          Up to 45% of work activities
                        </a> automatable
                      </span>
                    ),
                    (
                      <span key="pilots">
                        <a href="https://www.ai21.com/knowledge/agentic-ai-workflow/" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>
                          50% of businesses
                        </a> planning pilots by 2027
                      </span>
                    )
                  ]
                },
                {
                  icon: CheckCircle,
                  title: 'Enhanced Quality & Consistency',
                  description: 'Multi-agent validation and specialized expertise combine to deliver consistently high-quality results with built-in error detection.',
                  metrics: [
                    (
                      <span key="resolution">
                        <a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/seizing-the-agentic-ai-advantage" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>
                          Autonomous resolution of 80% of incidents
                        </a>
                      </span>
                    ),
                    (
                      <span key="reduction">
                        <a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/seizing-the-agentic-ai-advantage" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>
                          60-90% reduction in resolution time
                        </a>
                      </span>
                    ),
                    'Continuous quality improvement'
                  ]
                },
                {
                  icon: Users,
                  title: 'Scalable Operations',
                  description: 'Scale from simple tasks to complex projects by adding specialized agents without requiring proportional resource increases.',
                  metrics: ['Dynamic resource allocation', 'Unlimited agent coordination', 'Cost-effective growth']
                },
                {
                  icon: Brain,
                  title: 'Cognitive Augmentation',
                  description: 'Augment human capabilities by handling routine tasks and providing intelligent insights for strategic decision-making.',
                  metrics: ['Enhanced strategic focus', 'Reduced cognitive overhead', 'Data-driven insights']
                }
              ].map((benefit, index) => (
                <div key={index} style={{
                  backgroundColor: '#16161f',
                  borderRadius: '12px',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <benefit.icon size={24} style={{ color: '#8b5cf6', marginBottom: '1rem' }} />
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#ffffff'
                  }}>
                    {benefit.title}
                  </h3>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem'
                  }}>
                    {benefit.description}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {benefit.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <CheckCircle size={14} style={{ color: '#8b5cf6' }} />
                        <span style={{
                          fontSize: '0.875rem',
                          color: 'rgba(255, 255, 255, 0.8)'
                        }}>
                          {metric}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Challenges Section */}
          <section id="challenges" style={{ marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '3rem',
              fontFamily: 'var(--font-literata)',
              fontWeight: '600',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              color: '#ffffff'
            }}>
              Challenges & Solutions
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                {
                  challenge: 'Coordination Complexity',
                  description: 'Managing communication and dependencies between multiple autonomous agents becomes exponentially complex as workflow scale increases.',
                  solution: 'Implement hierarchical orchestration patterns with clear communication protocols and centralized coordination engines that can handle complex dependencies.'
                },
                {
                  challenge: 'Quality Assurance',
                  description: 'Ensuring consistent quality and reliability across autonomous agents operating with minimal human oversight requires sophisticated validation mechanisms.',
                  solution: 'Deploy multi-tier validation systems with cross-agent verification, continuous monitoring, and adaptive quality control mechanisms that learn from feedback.'
                },
                {
                  challenge: 'Resource Management',
                  description: 'Optimizing computational resources and preventing conflicts when multiple agents compete for limited system resources or API access.',
                  solution: 'Implement intelligent resource allocation systems with priority queuing, load balancing, and dynamic scaling based on workflow demands and agent priorities.'
                },
                {
                  challenge: 'Error Propagation',
                  description: 'Failures in one agent can cascade through the entire workflow, potentially compromising the final output or causing system-wide issues.',
                  solution: 'Build resilient architectures with isolated agent environments, checkpoint mechanisms, rollback capabilities, and graceful degradation strategies.'
                }
              ].map((item, index) => (
                <div key={index} style={{
                  backgroundColor: '#16161f',
                  borderRadius: '12px',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2rem'
                  }}>
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem'
                      }}>
                        <AlertCircle size={20} style={{ color: '#f59e0b' }} />
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          color: '#ffffff',
                          margin: 0
                        }}>
                          {item.challenge}
                        </h3>
                      </div>
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        lineHeight: '1.6',
                        margin: 0
                      }}>
                        {item.description}
                      </p>
                    </div>
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem'
                      }}>
                        <CheckCircle size={20} style={{ color: '#10b981' }} />
                        <h4 style={{
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          color: '#ffffff',
                          margin: 0
                        }}>
                          Solution Approach
                        </h4>
                      </div>
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        lineHeight: '1.6',
                        margin: 0
                      }}>
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Future Section */}
          <section id="future" style={{ marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '3rem',
              fontFamily: 'var(--font-literata)',
              fontWeight: '600',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              color: '#ffffff'
            }}>
              Future Outlook
            </h2>

            <div style={{
              backgroundColor: 'rgba(139, 92, 246, 0.05)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '12px',
              padding: '2.5rem',
              marginBottom: '3rem'
            }}>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: '1.8',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '2rem'
              }}>
                According to research by <a href="https://www.vellum.ai/blog/agentic-workflows-emerging-architectures-and-design-patterns" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>Vellum and industry experts</a>, the future of agentic workflows points toward increasingly sophisticated systems that can handle complex, multi-domain challenges. <a href="https://www.moveworks.com/us/en/resources/blog/what-is-agentic-workflows-in-ai" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>Gartner has named agentic AI</a> one of the top technology trends for 2025, predicting that by 2028, 33% of enterprise software will use agentic AI, and at least 15% of day-to-day work decisions will be made autonomously.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem'
              }}>
                {[
                  {
                    title: 'Self-Improving Systems',
                    description: (
                      <>
                        Advanced memory engines that handle long-term memory for agents, blending graphs, LLMs and vector retrieval for more reliable production-grade systems (
                        <a href="https://www.vellum.ai/blog/agentic-workflows-emerging-architectures-and-design-patterns" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>
                          Vellum
                        </a>
                        ).
                      </>
                    )
                  },
                  {
                    title: 'Deterministic Outputs',
                    description: (
                      <>
                        Knowledge graphs generated by LLMs that greatly improve retrieval-augmented generation and create more predictable AI behavior (
                        <a href="https://www.vellum.ai/blog/agentic-workflows-emerging-architectures-and-design-patterns" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>
                          Microsoft GraphRAG
                        </a>
                        ).
                      </>
                    )
                  },
                  {
                    title: 'Human-AI Collaboration',
                    description: 'Hybrid systems where humans remain in the loop for critical decisions while AI handles routine operations and provides intelligent recommendations.'
                  },
                  {
                    title: 'Enterprise Integration',
                    description: (
                      <>
                        By 2028, 33% of enterprise software will incorporate agentic AI capabilities, fundamentally changing how businesses operate (
                        <a href="https://www.moveworks.com/us/en/resources/blog/what-is-agentic-workflows-in-ai" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6', textDecoration: 'underline' }}>
                          Gartner
                        </a>
                        ).
                      </>
                    )
                  }
                ].map((trend, index) => (
                  <div key={index} style={{
                    padding: '1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '8px'
                  }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      color: '#8b5cf6'
                    }}>
                      {trend.title}
                    </h3>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: '1.6',
                      margin: 0,
                      fontSize: '0.875rem'
                    }}>
                      {trend.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '3rem 0'
            }}>
              <h3 style={{
                fontSize: '2rem',
                fontFamily: 'var(--font-literata)',
                fontWeight: '600',
                marginBottom: '1rem',
                color: '#ffffff'
              }}>
                Ready to Get Started?
              </h3>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '2rem',
                maxWidth: '600px',
                margin: '0 auto 2rem'
              }}>
                Join thousands of researchers and professionals who are already leveraging agentic workflows to transform their work processes.
              </p>
              <button style={{
                backgroundColor: '#8b5cf6',
                color: '#ffffff',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7c3aed';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#8b5cf6';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                Start Building with Esy
                <ArrowRight size={16} />
              </button>
            </div>
          </section>

          {/* Sources & Citations Section */}
          <section id="sources" style={{ marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '3rem',
              fontFamily: 'var(--font-literata)',
              fontWeight: '600',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              color: '#ffffff'
            }}>
              Sources & Citations
            </h2>

            <p style={{
              fontSize: '1rem',
              lineHeight: '1.8',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '3rem'
            }}>
              This comprehensive guide is built upon research from leading technology companies, academic institutions, and industry analysts. All claims and statistics are sourced from the following authoritative publications and studies.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2rem'
            }}>
              {[
                {
                  category: 'Primary Research & Industry Reports',
                  sources: [
                    {
                      title: 'Seizing the Agentic AI Advantage',
                      author: 'McKinsey & Company',
                      url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/seizing-the-agentic-ai-advantage',
                      description: 'Comprehensive analysis of agentic AI implementation with real-world case studies showing 20-60% productivity increases and 80% autonomous incident resolution rates.'
                    },
                    {
                      title: 'What are Agentic Workflows? Components, Benefits & Use Cases',
                      author: 'AI21 Labs',
                      url: 'https://www.ai21.com/knowledge/agentic-ai-workflow/',
                      description: 'Foundational research on agentic workflow adoption, predicting 50% of businesses will implement agentic AI pilots by 2027.'
                    },
                    {
                      title: 'What are Agentic Workflows?',
                      author: 'IBM Research',
                      url: 'https://www.ibm.com/think/topics/agentic-workflows',
                      description: 'Technical definition and core components of agentic workflows, including orchestration engines and agent autonomy principles.'
                    }
                  ]
                },
                {
                  category: 'Technical Research & Development',
                  sources: [
                    {
                      title: 'What Are Agentic Workflows? Patterns, Use Cases, Examples',
                      author: 'Weaviate',
                      url: 'https://weaviate.io/blog/what-are-agentic-workflows',
                      description: 'Detailed analysis of agentic workflow patterns including planning, tool use, and reflection mechanisms in AI systems.'
                    },
                    {
                      title: 'Agentic Workflows in 2025: Emerging Architectures and Design Patterns',
                      author: 'Vellum AI',
                      url: 'https://www.vellum.ai/blog/agentic-workflows-emerging-architectures-and-design-patterns',
                      description: 'Advanced research on memory engines, graph-based architectures, and deterministic outputs in production-grade agentic systems.'
                    },
                    {
                      title: 'What Is Agentic Workflow in AI?',
                      author: 'Miquido',
                      url: 'https://www.miquido.com/ai-glossary/ai-agentic-workflows/',
                      description: 'Technical exploration of adaptive learning mechanisms and feedback loops in autonomous AI agent systems.'
                    }
                  ]
                },
                {
                  category: 'Industry Analysis & Future Predictions',
                  sources: [
                    {
                      title: 'What Are Agentic Workflows? A Guide For Business Process Automation',
                      author: 'Moveworks (citing Gartner)',
                      url: 'https://www.moveworks.com/us/en/resources/blog/what-is-agentic-workflows-in-ai',
                      description: 'Industry predictions including Gartner\'s forecast that 33% of enterprise software will use agentic AI by 2028.'
                    },
                    {
                      title: 'Leveraging AI and Automation for Enhanced Productivity Management',
                      author: 'Psico-Smart (citing McKinsey)',
                      url: 'https://psico-smart.com/en/blogs/blog-leveraging-ai-and-automation-for-enhanced-productivity-management-166480',
                      description: 'Productivity statistics showing up to 45% of work activities could be automated with current technology.'
                    }
                  ]
                },
                {
                  category: 'Academic Research',
                  sources: [
                    {
                      title: 'Agentic Workflows for Economic Research: Design and Implementation',
                      author: 'arXiv Research Paper',
                      url: 'https://arxiv.org/html/2504.09736v1',
                      description: 'Academic implementation framework for agentic workflows in economic research, demonstrating structured inter-agent communication protocols.'
                    }
                  ]
                }
              ].map((category, categoryIndex) => (
                <div key={categoryIndex} style={{
                  backgroundColor: '#16161f',
                  borderRadius: '12px',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1.5rem',
                    color: '#8b5cf6'
                  }}>
                    {category.category}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {category.sources.map((source, sourceIndex) => (
                      <div key={sourceIndex} style={{
                        paddingBottom: '1.5rem',
                        borderBottom: sourceIndex < category.sources.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
                      }}>
                        <h4 style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          marginBottom: '0.5rem',
                          color: '#ffffff'
                        }}>
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{
                              color: '#8b5cf6',
                              textDecoration: 'underline'
                            }}
                          >
                            {source.title}
                          </a>
                        </h4>
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'rgba(255, 255, 255, 0.6)',
                          marginBottom: '0.75rem',
                          fontStyle: 'italic'
                        }}>
                          {source.author}
                        </p>
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'rgba(255, 255, 255, 0.8)',
                          lineHeight: '1.6',
                          margin: 0
                        }}>
                          {source.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              backgroundColor: 'rgba(139, 92, 246, 0.05)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '12px',
              padding: '2rem',
              marginTop: '3rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <BookOpen size={20} style={{ color: '#8b5cf6' }} />
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#8b5cf6',
                  margin: 0
                }}>
                  Research Methodology
                </h3>
              </div>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.7',
                margin: 0,
                fontSize: '1rem'
              }}>
                This guide synthesizes findings from peer-reviewed research, industry reports, and technical documentation from leading AI companies. All statistics and claims are directly sourced and linked to their original publications. We prioritize recent research (2024-2025) to ensure accuracy and relevance in this rapidly evolving field.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AgenticWorkflowsGuide;