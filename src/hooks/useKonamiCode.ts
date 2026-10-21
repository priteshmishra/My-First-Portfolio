import { useEffect, useState } from 'react';

const KONAMI_SEQUENCE = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
];

export function useKonamiCode(onSuccess: () => void) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events when the user is typing into input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === KONAMI_SEQUENCE[index]) {
        const nextIndex = index + 1;
        if (nextIndex === KONAMI_SEQUENCE.length) {
          onSuccess();
          setIndex(0);
        } else {
          setIndex(nextIndex);
        }
      } else {
        setIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, onSuccess]);
}
