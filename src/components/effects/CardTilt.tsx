import React, { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CardTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTiltDeg?: number;
}

export const CardTilt: React.FC<CardTiltProps> = ({
  children,
  className = '',
  maxTiltDeg = 4,
}) => {
  const { reducedMotion } = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [canTilt, setCanTilt] = useState<boolean>(false);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    setCanTilt(hasFinePointer && !reducedMotion);
  }, [reducedMotion]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTiltDeg;
    const rotateY = ((x - centerX) / centerX) * maxTiltDeg;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(2px)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handlePointerLeave = () => {
    if (!canTilt) return;
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      transition: 'transform 0.4s ease-out',
    });
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={style}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};
