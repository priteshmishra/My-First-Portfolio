import React from 'react';

interface SectionWrapperProps {
  id: string;
  title: string;
  subtitle?: string;
  badgeText?: string;
  badgeColor?: 'cyan' | 'violet' | 'emerald';
  children: React.ReactNode;
  className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  title,
  subtitle,
  badgeText,
  badgeColor = 'cyan',
  children,
  className = '',
}) => {
  const badgeColors = {
    cyan: 'bg-bio-cyan/15 text-bio-cyan border-bio-cyan/30',
    violet: 'bg-bio-violet/15 text-bio-violet border-bio-violet/30',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  }[badgeColor];

  return (
    <section id={id} className={`relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none ${className}`}>
      {/* Section Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto pointer-events-auto">
        {badgeText && (
          <div className="inline-flex items-center gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-mono border tracking-wider uppercase ${badgeColors}`}>
              {badgeText}
            </span>
          </div>
        )}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="mt-4 flex items-center justify-center gap-1">
          <div className="w-12 h-0.5 bg-bio-cyan/50" />
          <div className="w-2 h-2 rounded-full bg-bio-cyan" />
          <div className="w-12 h-0.5 bg-bio-violet/50" />
        </div>
      </div>

      {/* Section Content */}
      <div className="relative z-10 pointer-events-auto">{children}</div>
    </section>
  );
};
