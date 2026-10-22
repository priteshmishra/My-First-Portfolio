import React, { useState, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

interface ClickRippleProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const ClickRipple: React.FC<ClickRippleProps> = ({
  children,
  className = '',
  onClick,
}) => {
  const { reducedMotion } = useReducedMotion();
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, size, id }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none animate-ping bg-bio-cyan/25"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
            transform: 'scale(0)',
            animation: 'ripple 600ms cubic-bezier(0, 0, 0.2, 1) forwards',
          }}
        />
      ))}
      {children}
    </div>
  );
};
