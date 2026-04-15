import { useEffect, type RefObject } from 'react';

interface SwipeHandlers {
  onSwipeUp?:    () => void;
  onSwipeDown?:  () => void;
  onSwipeLeft?:  () => void;
  onSwipeRight?: () => void;
}

export function useSwipe(
  ref: RefObject<HTMLElement | null>,
  handlers: SwipeHandlers,
  threshold = 50,
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;

      if (Math.abs(dy) > Math.abs(dx)) {
        if (dy < -threshold) handlers.onSwipeUp?.();
        else if (dy > threshold) handlers.onSwipeDown?.();
      } else {
        if (dx < -threshold) handlers.onSwipeLeft?.();
        else if (dx > threshold) handlers.onSwipeRight?.();
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend',   onTouchEnd,   { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend',   onTouchEnd);
    };
  }, [ref, handlers, threshold]);
}
