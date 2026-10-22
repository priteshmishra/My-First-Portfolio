import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CursorGlow: React.FC = () => {
  const { reducedMotion } = useReducedMotion();
  const [enabled, setEnabled] = useState<boolean>(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const currentPos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (no touch devices) and when reduced motion is disabled
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer || reducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const handlePointerMove = (e: PointerEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerLeave = () => {
      targetPos.current = { x: -200, y: -200 };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    // Smooth rAF loop
    const updateGlow = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.12;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentPos.current.x - 120}px, ${
          currentPos.current.y - 120
        }px, 0)`;
      }

      rafId.current = requestAnimationFrame(updateGlow);
    };

    rafId.current = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [reducedMotion]);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-[240px] h-[240px] rounded-full pointer-events-none z-30 transition-opacity duration-300 opacity-60"
      style={{
        background: 'radial-gradient(circle, rgba(0, 188, 212, 0.08) 0%, rgba(121, 102, 216, 0.03) 40%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  );
};
