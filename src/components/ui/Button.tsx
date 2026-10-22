import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost' | 'violet' | 'cyan' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  className = '',
  href,
  external,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-200 select-none rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-cyan focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-5 py-3 gap-2.5 font-semibold',
  }[size];

  const variantClasses = {
    primary:
      'bg-bio-cyan text-slate-900 hover:bg-[#00ADC4] shadow-sm hover:shadow-card font-semibold border border-transparent',
    cyan:
      'bg-bio-cyan text-slate-900 hover:bg-[#00ADC4] shadow-sm hover:shadow-card font-semibold border border-transparent',
    secondary:
      'bg-white dark:bg-white/10 text-bio-text hover:bg-bio-secondary border border-bio-border shadow-soft hover:border-slate-300 dark:hover:border-white/20',
    glass:
      'bg-white/80 dark:bg-white/10 backdrop-blur-md text-bio-text hover:bg-bio-secondary border border-bio-border shadow-soft',
    violet:
      'bg-bio-violet text-white hover:bg-[#6855C6] shadow-sm hover:shadow-card font-semibold border border-transparent',
    dark:
      'bg-[#101722] text-slate-100 hover:bg-[#1A2332] border border-white/10 hover:border-white/20',
    ghost:
      'bg-transparent text-bio-muted hover:text-bio-text hover:bg-bio-secondary/80 border border-transparent',
  }[variant];

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};
