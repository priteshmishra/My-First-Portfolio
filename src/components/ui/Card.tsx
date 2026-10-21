import React, { useRef, useState } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'violet' | 'none';
  tilt?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  tilt = true,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`);
  };

  const handleMouseLeave = () => {
    if (!tilt) return;
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
  };

  const glowStyles = {
    cyan: 'hover:border-bio-cyan/40 hover:shadow-[0_0_25px_rgba(0,240,255,0.12)]',
    violet: 'hover:border-bio-violet/40 hover:shadow-[0_0_25px_rgba(139,92,246,0.12)]',
    none: 'hover:border-white/20',
  }[glowColor];

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 0.15s ease-out, border-color 0.25s, box-shadow 0.25s',
      }}
      className={`glass-panel rounded-xl p-6 transition-colors duration-200 ${glowStyles} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
