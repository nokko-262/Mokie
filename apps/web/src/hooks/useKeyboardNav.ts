import { useEffect } from 'react';
import { useFeedStore } from '../store/feedStore';

export function useKeyboardNav(): void {
  const { posts, activeIndex, setActiveIndex } = useFeedStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'j') {
        setActiveIndex(Math.min(activeIndex + 1, posts.length - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        setActiveIndex(Math.max(activeIndex - 1, 0));
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeIndex, posts.length, setActiveIndex]);
}
