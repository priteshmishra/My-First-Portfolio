import { useState, useRef, useEffect, useCallback } from 'react';

interface SpringConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export function usePointerSpring(config: SpringConfig = {}) {
  const { stiffness = 0.1, damping = 0.8 } = config;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  const update = useCallback(() => {
    const forceX = (targetRef.current.x - currentRef.current.x) * stiffness;
    const forceY = (targetRef.current.y - currentRef.current.y) * stiffness;

    velocityRef.current.x = (velocityRef.current.x + forceX) * damping;
    velocityRef.current.y = (velocityRef.current.y + forceY) * damping;

    currentRef.current.x += velocityRef.current.x;
    currentRef.current.y += velocityRef.current.y;

    setPosition({ x: currentRef.current.x, y: currentRef.current.y });

    const dist = Math.hypot(targetRef.current.x - currentRef.current.x, targetRef.current.y - currentRef.current.y);
    const speed = Math.hypot(velocityRef.current.x, velocityRef.current.y);

    if (dist > 0.1 || speed > 0.05) {
      animFrameRef.current = requestAnimationFrame(update);
    } else {
      animFrameRef.current = null;
    }
  }, [stiffness, damping]);

  const setTarget = useCallback(
    (x: number, y: number) => {
      targetRef.current = { x, y };
      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(update);
      }
    },
    [update]
  );

  const reset = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(update);
    }
  }, [update]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return { position, setTarget, reset };
}
