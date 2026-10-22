import { useState, useEffect, RefObject } from 'react';

export function useIntersectionVisibility<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T | null>,
  threshold: number = 0.1
): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold]);

  return isVisible;
}
