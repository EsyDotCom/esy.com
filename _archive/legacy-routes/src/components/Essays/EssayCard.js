import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, FileText, Eye, Clock, Bookmark 
} from 'lucide-react';
import { elevatedDarkTheme } from '@/lib/theme';

const EssayCard = ({ essay, index, hoveredCard, setHoveredCard }) => {
  // Ensure authors is an array and handle missing properties
  const authors = Array.isArray(essay.authors) ? essay.authors : [essay.authors || 'Unknown Author'];
  const metrics = essay.metrics || { citations: 0, views: 0 };
  const tags = essay.tags || [];
  
  return (
    <article
      onMouseEnter={() => setHoveredCard(essay.id)}
      onMouseLeave={() => setHoveredCard(null)}
      style={{ 
        padding: '2.5rem 0',
        borderTop: index === 0 ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'start' }}>
        <div>
          <Link href={`/essays/${essay.id}/`} style={{ textDecoration: 'none' }}>
            <h3 style={{ 
              fontSize: '1.5rem',
              fontWeight: 400,
              lineHeight: 1.3,
              marginBottom: '0.75rem',
              letterSpacing: '-0.01em',
              color: hoveredCard === essay.id ? elevatedDarkTheme.accent : 'white',
              transition: 'color 0.2s',
              cursor: 'pointer'
            }}>
              {essay.title}
            </h3>
          </Link>

          <div style={{ 
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span>{authors.join(', ')}</span>
            <span>·</span>
            <span>{essay.institution || 'Unknown Institution'}</span>
            <span>·</span>
            <span>{essay.publishDate || 'Unknown Date'}</span>
          </div>

          <p style={{ 
            fontSize: '0.938rem',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.6,
            marginBottom: '1rem',
            maxWidth: '48rem'
          }}>
            {essay.abstract}
          </p>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '1.5rem',
            fontSize: '0.813rem',
            color: 'rgba(255, 255, 255, 0.4)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <FileText size={14} />
              {metrics.citations || 0} citations
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Eye size={14} />
              {((metrics.views || 0) / 1000).toFixed(1)}k views
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Clock size={14} />
              {essay.readTime || 0} min read
            </span>
            
            {tags.map(tag => (
              <span key={tag} style={{ 
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.75rem'
              }}>
                #{tag.toLowerCase().replace(' ', '-')}
              </span>
            ))}
          </div>
        </div>

        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '1rem'
        }}>
          {essay.trending && (
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontSize: '0.75rem',
              color: '#f59e0b',
              fontWeight: 500
            }}>
              <TrendingUp size={14} />
              Trending
            </span>
          )}
          {essay.editorsChoice && (
            <span style={{
              fontSize: '0.75rem',
              color: '#10b981',
              fontWeight: 500
            }}>
              Editor&apos;s Choice
            </span>
          )}
          {essay.new && (
            <span style={{
              fontSize: '0.75rem',
              color: elevatedDarkTheme.accent,
              fontWeight: 500
            }}>
              New
            </span>
          )}
          
          <button style={{
            padding: '0.375rem',
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.4)',
            cursor: 'pointer',
            marginTop: 'auto'
          }}>
            <Bookmark size={18} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default EssayCard; 