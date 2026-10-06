/**
 * ESY VISUAL ESSAY TEMPLATE V2.0 — CINEMATIC SCROLL HOOKS
 * ========================================================
 * 
 * Custom hooks for immersive scroll-driven interactions.
 * Optimized for 60fps performance with passive listeners.
 * 
 * Hooks:
 * - useCinematicScroll: Main scroll tracking with progress
 * - useIntersectionReveal: Element visibility on scroll
 * - useParallax: GPU-accelerated parallax effect
 * - useScrollDirection: Track scroll direction
 * - useSectionProgress: Track progress within a section
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// ===========================================
// TYPES
// ===========================================

interface ScrollState {
  progress: number;      // 0-1 overall progress
  scrollY: number;       // Current scroll position
  velocity: number;      // Scroll speed (pixels/frame)
  direction: 'up' | 'down' | null;
  isScrolling: boolean;
}

interface IntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface ParallaxOptions {
  speed?: number;        // 0-1, where 0 = no movement, 1 = full scroll speed
  direction?: 'vertical' | 'horizontal';
  clamp?: boolean;       // Prevent movement beyond element bounds
}

interface SectionProgressOptions {
  offset?: number;       // Offset in vh from top to start tracking (default: 0)
  endOffset?: number;    // Offset in vh from bottom to end tracking (default: 0)
}

// ===========================================
// useCinematicScroll
// ===========================================

/**
 * Main scroll tracking hook with progress, velocity, and direction.
 * Uses passive listeners for 60fps performance.
 */
export function useCinematicScroll(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    scrollY: 0,
    velocity: 0,
    direction: null,
    isScrolling: false,
  });
  
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const rafId = useRef<number | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) return; // Throttle via RAF
      
      rafId.current = requestAnimationFrame(() => {
        const now = Date.now();
        const scrollY = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollY / scrollHeight)) : 0;
        
        // Calculate velocity
        const deltaY = scrollY - lastScrollY.current;
        const deltaTime = now - lastTime.current;
        const velocity = deltaTime > 0 ? Math.abs(deltaY / deltaTime) * 16 : 0; // Normalize to per-frame
        
        // Determine direction
        const direction = deltaY > 0 ? 'down' : deltaY < 0 ? 'up' : state.direction;
        
        setState({
          progress,
          scrollY,
          velocity,
          direction,
          isScrolling: true,
        });
        
        lastScrollY.current = scrollY;
        lastTime.current = now;
        rafId.current = null;
        
        // Clear previous timeout
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        
        // Set scrolling to false after 150ms of no scroll
        scrollTimeout.current = setTimeout(() => {
          setState(prev => ({ ...prev, isScrolling: false, velocity: 0 }));
        }, 150);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [state.direction]);
  
  return state;
}

// ===========================================
// useIntersectionReveal
// ===========================================

/**
 * Track element visibility for scroll-triggered reveals.
 * Returns visibility state and a ref to attach to the element.
 */
export function useIntersectionReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionOptions = {}
): [React.RefObject<T>, boolean, number] {
  const {
    threshold = 0.2,
    rootMargin = '0px',
    triggerOnce = false,
  } = options;
  
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  const hasTriggered = useRef(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // Skip if already triggered and triggerOnce is true
    if (triggerOnce && hasTriggered.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        setIntersectionRatio(entry.intersectionRatio);
        
        if (visible && triggerOnce) {
          hasTriggered.current = true;
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);
  
  return [ref, isVisible, intersectionRatio];
}

// ===========================================
// useParallax
// ===========================================

/**
 * GPU-accelerated parallax effect using transform.
 * Returns transform value and ref to attach.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
): [React.RefObject<T>, { transform: string }] {
  const {
    speed = 0.5,
    direction = 'vertical',
    clamp = true,
  } = options;
  
  const ref = useRef<T>(null);
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    let rafId: number | null = null;
    
    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate element's position relative to viewport center
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const offset = elementCenter - viewportCenter;
        
        // Apply speed multiplier (inverted for natural parallax feel)
        let movement = offset * (1 - speed) * -0.5;
        
        // Clamp movement to element bounds if enabled
        if (clamp) {
          const maxMovement = rect.height * 0.3;
          movement = Math.max(-maxMovement, Math.min(maxMovement, movement));
        }
        
        const transformValue = direction === 'vertical'
          ? `translate3d(0, ${movement}px, 0)`
          : `translate3d(${movement}px, 0, 0)`;
        
        setTransform(transformValue);
        rafId = null;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed, direction, clamp]);
  
  return [ref, { transform }];
}

// ===========================================
// useScrollDirection
// ===========================================

/**
 * Lightweight hook for just tracking scroll direction.
 */
export function useScrollDirection(): 'up' | 'down' | null {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollY = useRef(0);
  
  useEffect(() => {
    let rafId: number | null = null;
    
    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const delta = scrollY - lastScrollY.current;
        
        if (Math.abs(delta) > 5) { // Threshold to avoid micro-movements
          setDirection(delta > 0 ? 'down' : 'up');
        }
        
        lastScrollY.current = scrollY;
        rafId = null;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
  
  return direction;
}

// ===========================================
// useSectionProgress
// ===========================================

/**
 * Track scroll progress within a specific section.
 * Returns 0 when section top enters viewport, 1 when bottom exits.
 */
export function useSectionProgress<T extends HTMLElement = HTMLDivElement>(
  options: SectionProgressOptions = {}
): [React.RefObject<T>, number] {
  const { offset = 0, endOffset = 0 } = options;
  
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    let rafId: number | null = null;
    
    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const offsetPx = (offset / 100) * windowHeight;
        const endOffsetPx = (endOffset / 100) * windowHeight;
        
        // Start tracking when element top reaches (viewport bottom - offset)
        // End when element bottom reaches (viewport top + endOffset)
        const start = windowHeight - offsetPx;
        const end = endOffsetPx;
        
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const totalDistance = elementBottom - elementTop + start - end;
        const currentPosition = start - elementTop;
        
        const rawProgress = currentPosition / totalDistance;
        const clampedProgress = Math.max(0, Math.min(1, rawProgress));
        
        setProgress(clampedProgress);
        rafId = null;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [offset, endOffset]);
  
  return [ref, progress];
}

// ===========================================
// useMovementProgress
// ===========================================

/**
 * Track which movement (1-5) the user is currently viewing.
 * Returns current movement number and progress within that movement.
 */
export function useMovementProgress(movementIds: string[]): {
  currentMovement: number;
  movementProgress: number;
  movements: Map<string, { isVisible: boolean; progress: number }>;
} {
  const [currentMovement, setCurrentMovement] = useState(1);
  const [movementProgress, setMovementProgress] = useState(0);
  const [movements, setMovements] = useState<Map<string, { isVisible: boolean; progress: number }>>(
    new Map()
  );
  
  useEffect(() => {
    const elements = movementIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    
    if (elements.length === 0) return;
    
    let rafId: number | null = null;
    
    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const viewportCenter = windowHeight / 2;
        const newMovements = new Map<string, { isVisible: boolean; progress: number }>();
        
        let closestMovement = 1;
        let closestDistance = Infinity;
        
        elements.forEach((element, index) => {
          const rect = element.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);
          
          // Calculate progress within this section
          const sectionProgress = Math.max(0, Math.min(1, 
            (windowHeight - rect.top) / (windowHeight + rect.height)
          ));
          
          newMovements.set(movementIds[index], {
            isVisible: rect.top < windowHeight && rect.bottom > 0,
            progress: sectionProgress,
          });
          
          if (distance < closestDistance && rect.top < windowHeight && rect.bottom > 0) {
            closestDistance = distance;
            closestMovement = index + 1;
          }
        });
        
        setMovements(newMovements);
        setCurrentMovement(closestMovement);
        
        // Set progress for current movement
        const currentId = movementIds[closestMovement - 1];
        const currentData = newMovements.get(currentId);
        if (currentData) {
          setMovementProgress(currentData.progress);
        }
        
        rafId = null;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [movementIds]);
  
  return { currentMovement, movementProgress, movements };
}

// ===========================================
// useSmoothScrollTo
// ===========================================

/**
 * Smooth scroll to a specific element or position.
 */
export function useSmoothScrollTo(): (target: string | number, offset?: number) => void {
  return useCallback((target: string | number, offset = 0) => {
    let targetPosition: number;
    
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (!element) return;
      targetPosition = element.getBoundingClientRect().top + window.scrollY + offset;
    } else {
      targetPosition = target + offset;
    }
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }, []);
}

// ===========================================
// useReducedMotion
// ===========================================

/**
 * Detect if user prefers reduced motion.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReduced;
}

// ===========================================
// DEFAULT EXPORT
// ===========================================

export default {
  useCinematicScroll,
  useIntersectionReveal,
  useParallax,
  useScrollDirection,
  useSectionProgress,
  useMovementProgress,
  useSmoothScrollTo,
  useReducedMotion,
};




































