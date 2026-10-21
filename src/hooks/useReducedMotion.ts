import { useState, useEffect } from 'react';

export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [overrideReduced, setOverrideReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const reducedMotion = overrideReduced !== null ? overrideReduced : prefersReduced;

  return {
    reducedMotion,
    toggleReducedMotion: () => setOverrideReduced((prev) => (prev === null ? !prefersReduced : !prev)),
  };
}
