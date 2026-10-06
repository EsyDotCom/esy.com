"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowRight, Clock, Search, Grid, List, ChevronDown, X, SlidersHorizontal } from "lucide-react";
import './scrollytelling-index.css';

/*
 * Scrollytelling Discovery Platform
 * 
 * Design Philosophy:
 * - Premium editorial aesthetic preserved
 * - Discovery-first: Search, Filter, Sort
 * - Scalable for 1000+ stories
 * - Mobile-first with grid/list toggle
 * - URL-addressable filtered views
 * 
 * Architecture:
 * - Layer 1: Editorial Hero (preserved, featured story)
 * - Layer 2: Discovery Bar (search + filters, sticky)
 * - Layer 3: Content Grid/List (with Load More pagination)
 */

// ==================== TYPES ====================

type StoryFormat = 'narrative' | 'howto';

type StoryCategory = 
  | 'Science'
  | 'History' 
  | 'Technology'
  | 'Culture'
  | 'Space'
  | 'Education & Writing'
  | 'Children\'s Fiction';

interface Story {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  category: StoryCategory;
  format: StoryFormat;
  readTime: string;
  href: string;
  isNew?: boolean;
  isFeatured?: boolean;
  draft?: boolean;
  tags?: string[];
}

// ==================== CATEGORY CONFIG ====================

const CATEGORY_CONFIG: Record<StoryCategory, { color: string; label: string }> = {
  'Science': { color: '#10B981', label: 'Science' },
  'History': { color: '#F59E0B', label: 'History' },
  'Technology': { color: '#3B82F6', label: 'Technology' },
  'Culture': { color: '#EC4899', label: 'Culture' },
  'Space': { color: '#8B5CF6', label: 'Space' },
  'Education & Writing': { color: '#06B6D4', label: 'Education & Writing' },
  'Children\'s Fiction': { color: '#FFD700', label: 'Children\'s Fiction' },
};

const FORMAT_CONFIG: Record<StoryFormat, { label: string; badge?: string }> = {
  'narrative': { label: 'Narratives' },
  'howto': { label: 'How To Guides', badge: 'GUIDE' },
};

const ALL_CATEGORIES: StoryCategory[] = ['Science', 'History', 'Technology', 'Culture', 'Space', 'Education & Writing', 'Children\'s Fiction'];

// ==================== STORIES DATA ====================

const stories: Story[] = [
  {
    id: "mammary-gland-evolution",
    number: "01",
    title: "Mammary Gland Evolution",
    subtitle: "Anatomical Journey",
    description: "Detailed anatomical SVGs showing human breast cross-sections, alveoli, and comparative animal mammary systems—platypus to whale to human.",
    category: "Science",
    format: "narrative",
    readTime: "14 min",
    href: "/scrollytelling/mammary-gland-evolution",
    tags: ["biology", "anatomy", "evolution"],
  },
  {
    id: "evolution-of-mammary-glands",
    number: "02",
    title: "Evolution of Mammary Glands",
    subtitle: "310 Million Years of Milk",
    description: "How a simple skin secretion became the defining feature of mammals. SVG cross-sections, evolutionary trees, and milk composition comparisons.",
    category: "Science",
    format: "narrative",
    readTime: "12 min",
    href: "/scrollytelling/evolution-of-mammary-glands",
    tags: ["biology", "evolution"],
  },
  {
    id: "eternal-honey",
    number: "03",
    title: "Eternal Honey",
    subtitle: "Into the Pyramid",
    description: "Descend through multi-layer parallax into Giza's depths. Pyramid cross-sections reveal, tombs unlock, and 3,000-year-old honey glows in the darkness.",
    category: "History",
    format: "narrative",
    readTime: "12 min",
    href: "/scrollytelling/eternal-honey",
    isNew: true,
    tags: ["archaeology", "ancient", "food"],
  },
  {
    id: "honey-never-spoils",
    number: "04",
    title: "Honey Never Spoils",
    subtitle: "The Eternal Elixir",
    description: "3,000-year-old honey from Egyptian tombs is still edible. Honeycomb cells fill, time counters tick, and golden drips reveal why honey defies time itself.",
    category: "Science",
    format: "narrative",
    readTime: "11 min",
    href: "/scrollytelling/honey-never-spoils",
    tags: ["food", "chemistry"],
  },
  {
    id: "the-dna-helix",
    number: "05",
    title: "DNA & The Double Helix",
    subtitle: "The Code of Life",
    description: "The helix twists as you scroll—base pairs connect (A-T, G-C), Photo 51 reveals, genetic sequences type out. From Miescher's nuclein to CRISPR.",
    category: "Science",
    format: "narrative",
    readTime: "13 min",
    href: "/scrollytelling/the-dna-helix",
    tags: ["biology", "genetics"],
  },
  {
    id: "the-skyscraper",
    number: "06",
    title: "The Skyscraper",
    subtitle: "Reaching for the Sky",
    description: "An elevator rises floor-by-floor as you scroll—steel frames draw themselves, cranes lift beams, and buildings grow from 10 stories to 163 floors.",
    category: "Technology",
    format: "narrative",
    readTime: "14 min",
    href: "/scrollytelling/the-skyscraper",
    tags: ["architecture", "engineering"],
  },
  {
    id: "the-firearm",
    number: "07",
    title: "The Firearm",
    subtitle: "From Fire Lance to Precision",
    description: "A revolver cylinder rotates as you scroll—muzzle flashes, ammunition counters, and bullet trajectories trace 800 years of controlled explosions.",
    category: "Technology",
    format: "narrative",
    readTime: "13 min",
    href: "/scrollytelling/the-firearm",
    tags: ["military", "invention"],
  },
  {
    id: "the-gunpowder",
    number: "08",
    title: "Gunpowder",
    subtitle: "The Discovery That Changed Everything",
    description: "A burning fuse tracks your progress through 1,200 years of explosive history—from Tang Dynasty alchemy to the 75:15:10 formula that reshaped warfare.",
    category: "Technology",
    format: "narrative",
    readTime: "14 min",
    href: "/scrollytelling/the-gunpowder",
    tags: ["military", "chemistry", "invention"],
  },
  {
    id: "the-train",
    number: "09",
    title: "The Train",
    subtitle: "Iron Horse of Industry",
    description: "Locomotive wheels rotate as you scroll through 220 years of rail history—steam puffs, mile markers, and the race from 30 mph to 375 mph maglev.",
    category: "Technology",
    format: "narrative",
    readTime: "13 min",
    href: "/scrollytelling/the-train",
    tags: ["transportation", "invention"],
  },
  {
    id: "the-invention-of-the-car",
    number: "10",
    title: "The Automobile",
    subtitle: "A Sketch-Style Journey",
    description: "Hand-drawn SVGs animate as you scroll through 138 years of automotive history—from Benz's patent to the electric future.",
    category: "Technology",
    format: "narrative",
    readTime: "11 min",
    href: "/scrollytelling/the-invention-of-the-car",
    tags: ["transportation", "invention"],
  },
  {
    id: "the-invention-of-wine",
    number: "11",
    title: "The Invention of Wine",
    subtitle: "8,000 Years in a Glass",
    description: "From Neolithic Georgia to billion-dollar Bordeaux—the story of humanity's most civilized beverage.",
    category: "Culture",
    format: "narrative",
    readTime: "11 min",
    href: "/scrollytelling/the-invention-of-wine",
    tags: ["food", "ancient"],
  },
  {
    id: "the-pale-blue-dot",
    number: "12",
    title: "The Pale Blue Dot",
    subtitle: "A Cosmic Perspective",
    description: "Scroll to zoom out 6 billion kilometers. Carl Sagan's reflection on the most humbling photograph ever taken.",
    category: "Space",
    format: "narrative",
    readTime: "10 min",
    href: "/scrollytelling/the-pale-blue-dot",
    tags: ["astronomy", "philosophy"],
  },
  {
    id: "the-deep-ocean",
    number: "13",
    title: "The Deep Ocean",
    subtitle: "Earth's Final Frontier",
    description: "Descend 10,935 meters into the abyss. From sunlit waters to Challenger Deep—71% of Earth, less than 0.001% explored.",
    category: "Science",
    format: "narrative",
    readTime: "12 min",
    href: "/scrollytelling/the-deep-ocean",
    tags: ["nature", "exploration"],
  },
  {
    id: "language-death",
    number: "14",
    title: "Language Death",
    subtitle: "The Silence of Extinction",
    description: "7,168 languages exist today. Half will disappear by 2100. An exploration of what we lose when a language dies.",
    category: "Culture",
    format: "narrative",
    readTime: "9 min",
    href: "/scrollytelling/language-death",
    tags: ["linguistics", "anthropology"],
  },
  {
    id: "who-invented-the-mirror",
    number: "15",
    title: "The Mirror",
    subtitle: "8,000 Years of Reflection",
    description: "From polished obsidian to smart mirrors—humanity's eternal quest to see itself.",
    category: "History",
    format: "narrative",
    readTime: "10 min",
    href: "/scrollytelling/who-invented-the-mirror",
    tags: ["invention", "material"],
  },
  {
    id: "who-invented-soda",
    number: "16",
    title: "The Fizz",
    subtitle: "From Pharmacy to Phenomenon",
    description: "How carbonated water became humanity's favorite way to celebrate, refresh, and rebel—one bubble at a time.",
    category: "Culture",
    format: "narrative",
    readTime: "10 min",
    href: "/scrollytelling/who-invented-soda",
    tags: ["food", "invention"],
  },
  {
    id: "who-invented-the-sneaker",
    number: "17",
    title: "The Sneaker Story",
    subtitle: "From Plimsolls to $75 Billion",
    description: "How a rubber-soled shoe designed for silence became a global cultural force—from Charles Goodyear to Michael Jordan.",
    category: "Culture",
    format: "narrative",
    readTime: "12 min",
    href: "/scrollytelling/who-invented-the-sneaker",
    tags: ["fashion", "sports"],
  },
  {
    id: "who-invented-high-heels",
    number: "18",
    title: "The High Heels Story",
    subtitle: "500 Years of Elevation",
    description: "From Persian cavalrymen to Parisian runways, the extraordinary journey of fashion's most provocative invention.",
    category: "Culture",
    format: "narrative",
    readTime: "14 min",
    href: "/scrollytelling/who-invented-high-heels",
    tags: ["fashion"],
  },
  {
    id: "who-invented-the-bicycle",
    number: "19",
    title: "The Bicycle Story",
    subtitle: "200 Years of Two Wheels",
    description: "The invention that changed transportation, liberated women, and became humanity's most efficient machine.",
    category: "Technology",
    format: "narrative",
    readTime: "10 min",
    href: "/scrollytelling/who-invented-the-bicycle",
    tags: ["transportation", "invention"],
  },
  {
    id: "who-invented-the-spoon",
    number: "20",
    title: "The Spoon Story",
    subtitle: "30,000 Years of Essential Tools",
    description: "From prehistoric bone carvings to silver apostle spoons—humanity's oldest eating utensil.",
    category: "History",
    format: "narrative",
    readTime: "10 min",
    href: "/scrollytelling/who-invented-the-spoon",
    tags: ["material", "ancient"],
  },
  {
    id: "who-invented-basketball",
    number: "21",
    title: "The Basketball Story",
    subtitle: "From Peach Baskets to Global Culture",
    description: "Dr. Naismith's 1891 invention becomes billion-dollar arenas and worldwide phenomenon.",
    category: "Culture",
    format: "narrative",
    readTime: "10 min",
    href: "/scrollytelling/who-invented-basketball",
    tags: ["sports"],
  },
  {
    id: "who-invented-the-fork",
    number: "22",
    title: "The Fork Story",
    subtitle: "4,000 Years of Revolution",
    description: "From ancient Mesopotamia through Byzantine courts to your dinner table.",
    category: "History",
    format: "narrative",
    readTime: "12 min",
    href: "/scrollytelling/who-invented-the-fork",
    tags: ["material", "ancient"],
  },
  {
    id: "the-discovery-of-antibiotics",
    number: "23",
    title: "The Discovery of Antibiotics",
    subtitle: "The Petri Dish That Saved 200 Million Lives",
    description: "How Alexander Fleming's contaminated experiment in 1928 led to one of humanity's greatest medical breakthroughs—transforming a world where scratches could kill.",
    category: "Science",
    format: "narrative",
    readTime: "10 min",
    href: "/scrollytelling/the-discovery-of-antibiotics",
    tags: ["medical", "invention"],
  },
  {
    id: "how-to-write-an-essay",
    number: "24",
    title: "How to Write an Essay",
    subtitle: "A Visual Step-by-Step Guide",
    description: "Master essay writing with this interactive guide. From brainstorming to proofreading—a typewriter fills with text, sticky notes organize, and your grade improves as you learn.",
    category: "Education & Writing",
    format: "howto",
    readTime: "8 min",
    href: "/scrollytelling/how-to-write-an-essay",
    tags: ["writing", "education"],
  },
  {
    id: "the-night-the-stars-fell",
    number: "25",
    title: "The Night the Stars Fell",
    subtitle: "A Children's Bedtime Story",
    description: "An interactive bedtime story about a brave little girl who helps a fallen star find its way home. Tap stars, follow the golden trail, and climb to the top of the world.",
    category: "Children's Fiction",
    format: "narrative",
    readTime: "5 min",
    href: "/scrollytelling/the-night-the-stars-fell",
    draft: true,
    tags: ["children", "bedtime", "fiction", "stars", "friendship"],
  },
  {
    id: "the-monster-under-my-bed",
    number: "26",
    title: "The Monster Under My Bed",
    subtitle: "A Tale of Unlikely Friendship",
    description: "Maya discovers the monster under her bed is actually afraid of the dark. A heartwarming interactive story with lovable characters, expressive animations, and tap-to-reveal moments.",
    category: "Children's Fiction",
    format: "narrative",
    readTime: "5 min",
    href: "/scrollytelling/the-monster-under-my-bed",
    draft: true,
    tags: ["children", "bedtime", "fiction", "monster", "friendship", "fear"],
  },
  {
    id: "mia-mouse-mystery-m",
    number: "27",
    title: "Mia Mouse and the Mystery M",
    subtitle: "A Curious Adventure",
    description: "Follow curious Mia Mouse as she discovers mysterious M-shaped crumbs leading to a wonderful surprise! An interactive scrollytelling story with counting, tapping, and a heartwarming friendship ending.",
    category: "Children's Fiction",
    format: "narrative",
    readTime: "6 min",
    href: "/scrollytelling/mia-mouse-mystery-m",
    isNew: true,
    draft: true,
    tags: ["children", "alphabet", "letter M", "mouse", "friendship", "counting", "ages 3-6"],
  },
  {
    id: "alphabet-adventure-train",
    number: "28",
    title: "The Alphabet Adventure Train",
    subtitle: "Learn Your ABCs!",
    description: "All aboard the magical Alphabet Adventure Train! Join us for a scroll-through-the-alphabet journey where each train cart reveals a new letter, a fun object, and a phonics sound. Perfect for ages 3-5.",
    category: "Children's Fiction",
    format: "narrative",
    readTime: "15 min",
    href: "/scrollytelling/alphabet-adventure-train",
    isNew: true,
    tags: ["children", "alphabet", "ABC", "phonics", "letters", "learning", "train", "ages 3-5", "educational"],
  },
  {
    id: "sammy-snail-super-speed",
    number: "29",
    title: "Sammy Snail's Super Speed Day",
    subtitle: "Zoom! A Magical Adventure",
    description: "Join Sammy Snail as he discovers a magical dew drop that gives him super speed! Race through the forest, loop around trees, and learn that slow can be special too.",
    category: "Children's Fiction",
    format: "narrative",
    readTime: "8 min",
    href: "/scrollytelling/sammy-snail-super-speed",
    isNew: true,
    draft: true,
    tags: ["children", "adventure", "snail", "speed", "friendship", "forest", "ages 4-5", "fun"],
  },
  {
    id: "flavors-of-the-east",
    number: "30",
    title: "Flavors of the East",
    subtitle: "A Culinary Journey Through Asia",
    description: "From ancient Chinese soy fermentation to Myanmar's fermented tea salads — explore how ingredients, geography, and tradition shaped the cuisines of three nations across millennia.",
    category: "Culture",
    format: "narrative",
    readTime: "18 min",
    href: "/scrollytelling/flavors-of-the-east",
    isNew: true,
    isFeatured: true,
    tags: ["food", "cuisine", "Asia", "China", "Thailand", "Myanmar", "history", "culture", "cooking", "fermentation"],
  },
];

// ==================== HELPERS ====================

const publishedStories = stories.filter(s => !s.draft);

const STORIES_PER_PAGE = 12;

// ==================== COMPONENTS ====================

// Discovery Bar Component
interface DiscoveryBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: StoryCategory | 'all';
  setSelectedCategory: (c: StoryCategory | 'all') => void;
  selectedFormat: StoryFormat | 'all';
  setSelectedFormat: (f: StoryFormat | 'all') => void;
  viewMode: 'grid' | 'list';
  setViewMode: (m: 'grid' | 'list') => void;
  resultCount: number;
  isSticky: boolean;
}

const DiscoveryBar: React.FC<DiscoveryBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedFormat,
  setSelectedFormat,
  viewMode,
  setViewMode,
  resultCount,
  isSticky,
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [formatOpen, setFormatOpen] = useState(false);

  const hasActiveFilters = selectedCategory !== 'all' || selectedFormat !== 'all' || searchQuery.length > 0;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedFormat('all');
  };

  return (
    <>
      <div className={`discovery-bar ${isSticky ? 'sticky' : ''}`}>
        <div className="discovery-bar-inner">
          {/* Search */}
          <div className="discovery-search">
            <Search size={18} className="discovery-search-icon" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="discovery-search-input"
            />
            {searchQuery && (
              <button 
                className="discovery-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Desktop Filters */}
          <div className="discovery-filters desktop-only">
            {/* Format Dropdown */}
            <div className="discovery-dropdown">
              <button 
                className={`discovery-dropdown-trigger ${selectedFormat !== 'all' ? 'active' : ''}`}
                onClick={() => { setFormatOpen(!formatOpen); setCategoryOpen(false); }}
              >
                <span>{selectedFormat === 'all' ? 'All Formats' : FORMAT_CONFIG[selectedFormat].label}</span>
                <ChevronDown size={14} />
              </button>
              {formatOpen && (
                <div className="discovery-dropdown-menu">
                  <button 
                    className={selectedFormat === 'all' ? 'active' : ''}
                    onClick={() => { setSelectedFormat('all'); setFormatOpen(false); }}
                  >
                    All Formats
                  </button>
                  {Object.entries(FORMAT_CONFIG).map(([key, config]) => (
                    <button 
                      key={key}
                      className={selectedFormat === key ? 'active' : ''}
                      onClick={() => { setSelectedFormat(key as StoryFormat); setFormatOpen(false); }}
                    >
                      {config.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="discovery-dropdown">
              <button 
                className={`discovery-dropdown-trigger ${selectedCategory !== 'all' ? 'active' : ''}`}
                onClick={() => { setCategoryOpen(!categoryOpen); setFormatOpen(false); }}
              >
                <span>{selectedCategory === 'all' ? 'All Categories' : selectedCategory}</span>
                <ChevronDown size={14} />
              </button>
              {categoryOpen && (
                <div className="discovery-dropdown-menu">
                  <button 
                    className={selectedCategory === 'all' ? 'active' : ''}
                    onClick={() => { setSelectedCategory('all'); setCategoryOpen(false); }}
                  >
                    All Categories
                  </button>
                  {ALL_CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      className={selectedCategory === cat ? 'active' : ''}
                      onClick={() => { setSelectedCategory(cat); setCategoryOpen(false); }}
                    >
                      <span 
                        className="category-dot" 
                        style={{ backgroundColor: CATEGORY_CONFIG[cat].color }}
                      />
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button className="discovery-clear" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </div>

          {/* View Toggle */}
          <div className="discovery-view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <Grid size={16} />
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <List size={16} />
            </button>
          </div>

          {/* Mobile Filter Button */}
          <button 
            className="discovery-mobile-filter-btn mobile-only"
            onClick={() => setShowMobileFilters(true)}
          >
            <SlidersHorizontal size={18} />
            {hasActiveFilters && <span className="filter-badge" />}
          </button>
        </div>

        {/* Results Count */}
        <div className="discovery-results">
          <span>{resultCount} {resultCount === 1 ? 'story' : 'stories'}</span>
          {hasActiveFilters && (
            <button className="discovery-clear-mobile" onClick={clearFilters}>
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      {showMobileFilters && (
        <div className="mobile-filter-overlay" onClick={() => setShowMobileFilters(false)}>
          <div className="mobile-filter-sheet" onClick={e => e.stopPropagation()}>
            <div className="mobile-filter-header">
              <h3>Filters</h3>
              <button onClick={() => setShowMobileFilters(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="mobile-filter-section">
              <h4>Format</h4>
              <div className="mobile-filter-options">
                <button 
                  className={selectedFormat === 'all' ? 'active' : ''}
                  onClick={() => setSelectedFormat('all')}
                >
                  All
                </button>
                {Object.entries(FORMAT_CONFIG).map(([key, config]) => (
                  <button 
                    key={key}
                    className={selectedFormat === key ? 'active' : ''}
                    onClick={() => setSelectedFormat(key as StoryFormat)}
                  >
                    {config.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mobile-filter-section">
              <h4>Category</h4>
              <div className="mobile-filter-options">
                <button 
                  className={selectedCategory === 'all' ? 'active' : ''}
                  onClick={() => setSelectedCategory('all')}
                >
                  All
                </button>
                {ALL_CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    className={selectedCategory === cat ? 'active' : ''}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span 
                      className="category-dot" 
                      style={{ backgroundColor: CATEGORY_CONFIG[cat].color }}
                    />
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mobile-filter-actions">
              <button className="mobile-filter-clear" onClick={clearFilters}>
                Clear All
              </button>
              <button className="mobile-filter-apply" onClick={() => setShowMobileFilters(false)}>
                Show {resultCount} Stories
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Editorial Hero
const EditorialHero: React.FC = () => {
  const featured = publishedStories.find(s => s.isFeatured);
  const totalStories = publishedStories.length;
  const totalTime = publishedStories.reduce((acc, s) => acc + parseInt(s.readTime), 0);

  return (
    <section className="editorial-hero">
      <div className="hero-left">
        <span className="hero-label">Scrollytelling</span>
        <h1 className="hero-title">
          <span className="hero-title-line">Stories</span>
          <span className="hero-title-line">That</span>
          <span className="hero-title-line hero-title-italic">Unfold</span>
        </h1>
        <p className="hero-description">
          Immersive narratives that combine research, design, and interaction. 
          History experienced, not just read.
        </p>
      </div>
      
      <div className="hero-right">
        {featured && (
          <Link href={featured.href} className="hero-featured">
            <div className="hero-featured-badges">
              <span className="hero-featured-category" style={{ color: CATEGORY_CONFIG[featured.category].color }}>
                {featured.category}
              </span>
              {featured.format === 'howto' && (
                <span className="hero-featured-format-badge">GUIDE</span>
              )}
            </div>
            <h2 className="hero-featured-title">{featured.title}</h2>
            <p className="hero-featured-subtitle">{featured.subtitle}</p>
            <div className="hero-featured-meta">
              <Clock size={14} />
              <span>{featured.readTime} read</span>
              {featured.isNew && <span className="new-badge">New</span>}
            </div>
            <span className="hero-featured-cta">
              Begin Story <ArrowRight size={14} />
            </span>
          </Link>
        )}
        
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">{totalStories}</div>
            <div className="hero-stat-label">Stories</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">{totalTime}</div>
            <div className="hero-stat-label">Minutes</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">∞</div>
            <div className="hero-stat-label">Years</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Story Card (Grid View)
const StoryCard: React.FC<{ story: Story }> = ({ story }) => (
  <Link href={story.href} className="story-card">
    <div className="story-card-header">
      <span 
        className="story-card-category"
        style={{ color: CATEGORY_CONFIG[story.category].color }}
      >
        {story.category}
      </span>
      {story.format === 'howto' && (
        <span className="story-card-format-badge">GUIDE</span>
      )}
      {story.isNew && <span className="story-card-new">New</span>}
    </div>
    <h3 className="story-card-title">{story.title}</h3>
    <p className="story-card-subtitle">{story.subtitle}</p>
    <p className="story-card-description">{story.description}</p>
    <div className="story-card-meta">
      <Clock size={12} />
      <span>{story.readTime}</span>
    </div>
  </Link>
);

// Story Row (List View)
const StoryRow: React.FC<{ story: Story }> = ({ story }) => (
  <Link href={story.href} className="story-row">
    <span className="story-number">{story.number}</span>
    
    <div className="story-main">
      <div className="story-info">
        <div className="story-row-badges">
          <span 
            className="story-category"
            style={{ color: CATEGORY_CONFIG[story.category].color }}
          >
            {story.category}
          </span>
          {story.format === 'howto' && (
            <span className="story-row-format-badge">GUIDE</span>
          )}
          {story.isNew && <span className="story-row-new">New</span>}
        </div>
        <h3 className="story-title">{story.title}</h3>
        <p className="story-subtitle">{story.subtitle}</p>
        <p className="story-description">{story.description}</p>
      </div>

      <div className="story-meta">
        <Clock size={14} />
        <span>{story.readTime}</span>
      </div>
    </div>

    <div className="story-arrow">
      <ArrowRight size={18} />
    </div>
  </Link>
);

// Stories Section with Grid/List toggle and Load More
interface StoriesSectionProps {
  stories: Story[];
  viewMode: 'grid' | 'list';
  visibleCount: number;
  onLoadMore: () => void;
  hasMore: boolean;
}

const StoriesSection: React.FC<StoriesSectionProps> = ({ 
  stories, 
  viewMode, 
  visibleCount,
  onLoadMore,
  hasMore,
}) => {
  const visibleStories = stories.slice(0, visibleCount);

  return (
    <section className="stories-section">
      {viewMode === 'grid' ? (
        <div className="stories-grid">
          {visibleStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="stories-list">
          {visibleStories.map(story => (
            <StoryRow key={story.id} story={story} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={onLoadMore}>
            Load More Stories
            <span className="load-more-count">
              ({stories.length - visibleCount} remaining)
            </span>
          </button>
        </div>
      )}
    </section>
  );
};

// Coming Soon
const ComingSoon: React.FC = () => (
  <section className="coming-soon">
    <p className="coming-soon-text">
      More stories in development. Each narrative takes weeks of research 
      and design to ensure an unforgettable experience.
    </p>
  </section>
);

// ==================== MAIN ====================

const ScrollytellingClient: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const discoveryBarRef = useRef<HTMLDivElement>(null);

  // State from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | 'all'>(
    (searchParams.get('category') as StoryCategory) || 'all'
  );
  const [selectedFormat, setSelectedFormat] = useState<StoryFormat | 'all'>(
    (searchParams.get('format') as StoryFormat) || 'all'
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(
    (searchParams.get('view') as 'grid' | 'list') || 'grid'
  );
  const [visibleCount, setVisibleCount] = useState(STORIES_PER_PAGE);
  const [isSticky, setIsSticky] = useState(false);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedFormat !== 'all') params.set('format', selectedFormat);
    if (viewMode !== 'grid') params.set('view', viewMode);

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : '/scrollytelling';
    
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, selectedCategory, selectedFormat, viewMode, router]);

  // Sticky detection
  useEffect(() => {
    const handleScroll = () => {
      if (discoveryBarRef.current) {
        const rect = discoveryBarRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter stories
  const filteredStories = useMemo(() => {
    return publishedStories.filter(story => {
      // Exclude featured from list
      if (story.isFeatured) return false;

      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          story.title.toLowerCase().includes(query) ||
          story.subtitle.toLowerCase().includes(query) ||
          story.description.toLowerCase().includes(query) ||
          story.category.toLowerCase().includes(query) ||
          (story.tags?.some(tag => tag.toLowerCase().includes(query)));
        if (!matchesSearch) return false;
      }

      // Category
      if (selectedCategory !== 'all' && story.category !== selectedCategory) {
        return false;
      }

      // Format
      if (selectedFormat !== 'all' && story.format !== selectedFormat) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedFormat]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(STORIES_PER_PAGE);
  }, [searchQuery, selectedCategory, selectedFormat]);

  const handleLoadMore = useCallback(() => {
    setVisibleCount(prev => prev + STORIES_PER_PAGE);
  }, []);

  const hasMore = visibleCount < filteredStories.length;

  return (
    <div className="scrollytelling-index">
      <EditorialHero />
      
      <div ref={discoveryBarRef}>
        <DiscoveryBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
          viewMode={viewMode}
          setViewMode={setViewMode}
          resultCount={filteredStories.length}
          isSticky={isSticky}
        />
      </div>

      <StoriesSection
        stories={filteredStories}
        viewMode={viewMode}
        visibleCount={visibleCount}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
      />

      <ComingSoon />
    </div>
  );
};

export default ScrollytellingClient;
