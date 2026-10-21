import React from 'react';

export type BadgeVariant =
  | 'Completed'
  | 'In Progress'
  | 'Planned'
  | 'Demonstrated'
  | 'Practiced'
  | 'Learning'
  | 'Exploring'
  | 'cyan'
  | 'violet'
  | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'sm',
  className = '',
}) => {
  const styles: Record<BadgeVariant, string> = {
    Completed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    'In Progress': 'bg-bio-cyan/15 text-bio-cyan border-bio-cyan/30',
    Planned: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    Demonstrated: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
    Practiced: 'bg-bio-violet/15 text-bio-violet border-bio-violet/30',
    Learning: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    Exploring: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    cyan: 'bg-bio-cyan/15 text-bio-cyan border-bio-cyan/30',
    violet: 'bg-bio-violet/15 text-bio-violet border-bio-violet/30',
    neutral: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-medium',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono tracking-tight shrink-0 ${styles[variant]} ${sizeStyles} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80 shrink-0" />
      <span>{children}</span>
    </span>
  );
};
