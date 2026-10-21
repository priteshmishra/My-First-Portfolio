import React from 'react';
import { Dna, Sparkles } from 'lucide-react';

export const FallbackScene: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-space-950 flex items-center justify-center">
      {/* Ambient Radial Glows */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-bio-cyan/5 blur-3xl -top-20 -left-20 animate-pulse-slow" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-bio-violet/5 blur-3xl -bottom-20 -right-20 animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* 2D Vector Biological Cell Representation */}
      <svg className="w-96 h-96 opacity-40 animate-spin" style={{ animationDuration: '60s' }} viewBox="0 0 200 200">
        {/* Outer Phospholipid Membrane */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="6 3" />
        <circle cx="100" cy="100" r="85" fill="none" stroke="#00f0ff" strokeWidth="0.5" opacity="0.5" />

        {/* Inner Cytoplasm & Nucleus */}
        <circle cx="100" cy="100" r="45" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="100" cy="100" r="30" fill="rgba(139, 92, 246, 0.15)" stroke="#a855f7" strokeWidth="1" />

        {/* Organelle Glyphs */}
        <ellipse cx="140" cy="80" rx="12" ry="6" fill="rgba(236, 72, 153, 0.4)" stroke="#ec4899" strokeWidth="1" transform="rotate(25 140 80)" />
        <ellipse cx="65" cy="130" rx="14" ry="7" fill="rgba(20, 184, 166, 0.4)" stroke="#14b8a6" strokeWidth="1" transform="rotate(-30 65 130)" />
      </svg>
    </div>
  );
};
