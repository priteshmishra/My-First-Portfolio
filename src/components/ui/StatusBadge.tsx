import React from 'react';
import { BookOpen, Clock, PlayCircle, CheckCircle } from 'lucide-react';

export type BadgeStatus = 'Learning' | 'Planned' | 'In progress' | 'Completed';

interface StatusBadgeProps {
  status: BadgeStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const configs: Record<
    BadgeStatus,
    { label: string; icon: React.ReactNode; bg: string; text: string; border: string }
  > = {
    Learning: {
      label: 'Learning',
      icon: <BookOpen className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} aria-hidden="true" />,
      bg: 'bg-cyan-50',
      text: 'text-cyan-800',
      border: 'border-cyan-300',
    },
    Planned: {
      label: 'Planned',
      icon: <Clock className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} aria-hidden="true" />,
      bg: 'bg-violet-50',
      text: 'text-violet-800',
      border: 'border-violet-300',
    },
    'In progress': {
      label: 'In Progress',
      icon: <PlayCircle className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} aria-hidden="true" />,
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-300',
    },
    Completed: {
      label: 'Completed',
      icon: <CheckCircle className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} aria-hidden="true" />,
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-300',
    },
  };

  const config = configs[status] || configs.Planned;

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-[10px] gap-1'
      : 'px-2.5 py-1 text-xs gap-1.5';

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
      role="status"
    >
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};
