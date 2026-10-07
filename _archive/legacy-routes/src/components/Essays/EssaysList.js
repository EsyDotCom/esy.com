import React from 'react';
import EssayCard from './EssayCard';

const EssaysList = ({ 
  essays, 
  hoveredCard, 
  setHoveredCard, 
  selectedSort, 
  setSelectedSort 
}) => {
  return (
    <section style={{ padding: '4rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem',
            fontWeight: 400,
            letterSpacing: '-0.02em'
          }}>
            Recent Publications
          </h2>
          <select 
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.813rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="relevance" style={{ background: '#0a0a0f' }}>Most Relevant</option>
            <option value="recent" style={{ background: '#0a0a0f' }}>Most Recent</option>
            <option value="cited" style={{ background: '#0a0a0f' }}>Most Cited</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {essays.map((essay, index) => (
            <EssayCard
              key={essay.id}
              essay={essay}
              index={index}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
            />
          ))}
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '4rem',
          paddingTop: '3rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <button style={{
            padding: '0.75rem 2rem',
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}>
            Load More Essays
          </button>
        </div>
      </div>
    </section>
  );
};

export default EssaysList; 