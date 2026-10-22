import React from 'react';
import { Dna } from 'lucide-react';

interface WebGLFallbackProps {
  className?: string;
  title?: string;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({
  className = '',
  title = 'Schematic B-DNA Double Helix',
}) => {
  return (
    <div
      role="img"
      aria-label="Schematic diagram of DNA double helix showing antiparallel strands and complementary base pairing"
      className={`relative w-full h-full min-h-[320px] flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#101722] to-[#0A0F17] rounded-2xl border border-bio-border/30 text-white overflow-hidden ${className}`}
    >
      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #00BCD4 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* High-Fidelity Vector DNA Double Helix Illustration */}
      <svg
        viewBox="0 0 320 480"
        className="w-full max-w-[280px] h-auto drop-shadow-[0_8px_24px_rgba(0,188,212,0.15)] relative z-10"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="strand1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00BCD4" />
            <stop offset="100%" stopColor="#008FA3" />
          </linearGradient>
          <linearGradient id="strand2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7966D8" />
            <stop offset="100%" stopColor="#5E4EB2" />
          </linearGradient>
        </defs>

        {/* Base-pair Rungs */}
        {[
          { y: 60, x1: 100, x2: 220, b1: 'A', b2: 'T', col1: '#00BCD4', col2: '#F59E0B' },
          { y: 100, x1: 130, x2: 190, b1: 'G', b2: 'C', col1: '#7966D8', col2: '#10B981' },
          { y: 140, x1: 160, x2: 160, b1: 'C', b2: 'G', col1: '#10B981', col2: '#7966D8' },
          { y: 180, x1: 190, x2: 130, b1: 'T', b2: 'A', col1: '#F59E0B', col2: '#00BCD4' },
          { y: 220, x1: 220, x2: 100, b1: 'A', b2: 'T', col1: '#00BCD4', col2: '#F59E0B' },
          { y: 260, x1: 190, x2: 130, b1: 'G', b2: 'C', col1: '#7966D8', col2: '#10B981' },
          { y: 300, x1: 160, x2: 160, b1: 'T', b2: 'A', col1: '#F59E0B', col2: '#00BCD4' },
          { y: 340, x1: 130, x2: 190, b1: 'C', b2: 'G', col1: '#10B981', col2: '#7966D8' },
          { y: 380, x1: 100, x2: 220, b1: 'A', b2: 'T', col1: '#00BCD4', col2: '#F59E0B' },
          { y: 420, x1: 130, x2: 190, b1: 'G', b2: 'C', col1: '#7966D8', col2: '#10B981' },
        ].map((rung, i) => (
          <g key={i}>
            <line
              x1={rung.x1}
              y1={rung.y}
              x2={160}
              y2={rung.y}
              stroke={rung.col1}
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.85"
            />
            <circle cx={rung.x1} cy={rung.y} r="5" fill={rung.col1} />
            <line
              x1={160}
              y1={rung.y}
              x2={rung.x2}
              y2={rung.y}
              stroke={rung.col2}
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.85"
            />
            <circle cx={rung.x2} cy={rung.y} r="5" fill={rung.col2} />
            {/* Hydrogen bond indicator dots at center */}
            <circle cx={157} cy={rung.y} r="1.5" fill="#FFFFFF" opacity="0.7" />
            <circle cx={163} cy={rung.y} r="1.5" fill="#FFFFFF" opacity="0.7" />
          </g>
        ))}

        {/* Antiparallel Helical Backbone Strands */}
        <path
          d="M 100,40 Q 160,140 220,240 T 100,440"
          fill="none"
          stroke="url(#strand1Grad)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 220,40 Q 160,140 100,240 T 220,440"
          fill="none"
          stroke="url(#strand2Grad)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Polarity Annotations */}
        <text x="75" y="45" fill="#00BCD4" fontSize="11" fontFamily="monospace" fontWeight="bold">5'</text>
        <text x="235" y="45" fill="#7966D8" fontSize="11" fontFamily="monospace" fontWeight="bold">3'</text>
        <text x="75" y="445" fill="#00BCD4" fontSize="11" fontFamily="monospace" fontWeight="bold">3'</text>
        <text x="235" y="445" fill="#7966D8" fontSize="11" fontFamily="monospace" fontWeight="bold">5'</text>
      </svg>

      <div className="relative z-10 mt-3 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
          <Dna className="w-3.5 h-3.5 text-bio-cyan" />
          <span>{title}</span>
        </div>
        <p className="text-[11px] text-slate-400 font-mono mt-1">
          Antiparallel Sugar-Phosphate Backbones &bull; Watson-Crick Base Pairs
        </p>
      </div>
    </div>
  );
};
