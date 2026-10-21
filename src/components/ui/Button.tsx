import React from 'react';
import { usePointerSpring } from '../../hooks/usePointerSpring';
import { soundSynth } from '../../audio/soundSynth';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'violet' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'cyan',
  size = 'md',
  magnetic = true,
  icon,
  children,
  onClick,
  className = '',
  disabled,
  ...rest
}) => {
  const { position, setTarget, reset } = usePointerSpring({ stiffness: 0.15, damping: 0.75 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.25;
    const offsetY = (e.clientY - centerY) * 0.25;
    setTarget(offsetX, offsetY);
  };

  const handleMouseLeave = () => {
    if (!magnetic || disabled) return;
    reset();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      soundSynth.playClick();
      onClick?.(e);
    }
  };

  const variantStyles = {
    cyan: 'bg-bio-cyan/15 hover:bg-bio-cyan/25 text-bio-cyan border border-bio-cyan/40 hover:border-bio-cyan shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:shadow-[0_0_25px_rgba(0,240,255,0.35)]',
    violet: 'bg-bio-violet/15 hover:bg-bio-violet/25 text-bio-violet border border-bio-violet/40 hover:border-bio-violet shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_25px_rgba(139,92,246,0.35)]',
    ghost: 'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border border-transparent hover:border-white/10',
    glass: 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 border border-white/10 hover:border-white/20 backdrop-blur-md',
  }[variant];

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-mono',
    md: 'px-4 py-2 text-sm font-medium',
    lg: 'px-6 py-3 text-base font-semibold',
  }[size];

  return (
    <button
      {...rest}
      disabled={disabled}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: 'background-color 0.2s, border-color 0.2s, box-shadow 0.2s',
      }}
      className={`relative inline-flex items-center justify-center gap-2 rounded-lg transition-transform duration-75 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-cyan ${variantStyles} ${sizeStyles} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
