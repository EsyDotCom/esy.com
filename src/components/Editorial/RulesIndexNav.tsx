'use client';

/* F's sticky rule index: the rule you're reading lights up, found by which
 * rule's heading last passed the top third of the screen. */
import { useEffect, useState } from 'react';

export default function RulesIndexNav({ items }: { items: { id: string; n: string; title: string }[] }) {
  const [current, setCurrent] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const onScroll = () => {
      let id = items[0]?.id ?? '';
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 3) id = item.id;
      }
      setCurrent(id);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  return (
    <nav className="ed-index-nav" aria-label="The rules">
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={item.id === current ? 'is-current' : ''} aria-current={item.id === current ? 'true' : undefined}>
              <span>{item.n}</span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
