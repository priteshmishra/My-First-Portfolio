import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-12 sm:mb-16 ${
        isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'
      } ${className}`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bio-secondary border border-bio-border text-[11px] font-mono uppercase tracking-wider text-bio-cyan-dark mb-3`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-bio-cyan" />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-bio-text leading-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-3 text-sm sm:text-base text-bio-muted leading-relaxed font-normal">
          {description}
        </p>
      )}

      {/* Restrained scientific divider */}
      <div
        className={`mt-4 flex items-center gap-1.5 ${
          isCenter ? 'justify-center' : 'justify-start'
        }`}
      >
        <span className="w-8 h-0.5 bg-bio-cyan/40 rounded-full" />
        <span className="w-1.5 h-1.5 rounded-full bg-bio-cyan" />
        <span className="w-8 h-0.5 bg-bio-violet/30 rounded-full" />
      </div>
    </div>
  );
};
