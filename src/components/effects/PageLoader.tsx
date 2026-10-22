import React, { useState, useEffect } from 'react';
import { Dna, Sparkles } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const PageLoader: React.FC = () => {
  const { reducedMotion } = useReducedMotion();
  const [progress, setProgress] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(true);

  useEffect(() => {
    if (reducedMotion) {
      setIsMounted(false);
      return;
    }

    // Animate progress smoothly from 0 to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random incremental step to feel organic like scientific synthesis
        const step = Math.floor(Math.random() * 18) + 12;
        return Math.min(100, prev + step);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    if (progress === 100) {
      // Small pause at 100%, then initiate smooth Apple-style dissolve
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 250);

      const unmountTimer = setTimeout(() => {
        setIsMounted(false);
      }, 850);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, [progress]);

  if (!isMounted) return null;

  return (
    <div
      role="status"
      aria-label="Loading BIOVERSE portfolio experience"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      } bg-[#F7F9FC]/90 dark:bg-[#0A0F17]/95 backdrop-blur-2xl`}
    >
      {/* Subtle radial ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-60"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 188, 212, 0.15) 0%, rgba(121, 102, 216, 0.1) 40%, transparent 70%)',
        }}
      />

      {/* Floating Apple Frosted Glass Preloader Card */}
      <div className="relative glass-apple p-8 sm:p-10 max-w-sm w-full mx-auto flex flex-col items-center text-center shadow-2xl border border-white/80 dark:border-white/15">
        {/* Animated DNA Icon with Cyan/Violet Glow */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-bio-cyan/25 to-bio-violet/25 border border-bio-cyan/40 flex items-center justify-center text-bio-cyan-dark dark:text-bio-cyan shadow-lg shadow-bio-cyan/15 animate-bounce">
            <Dna className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          {/* Subtle orbiting pulse particle */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-bio-cyan animate-ping opacity-75" />
        </div>

        {/* Brand Name */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="font-extrabold text-xl sm:text-2xl tracking-wider text-bio-text">
            BIO<span className="text-bio-cyan-dark dark:text-bio-cyan">VERSE</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="text-xs font-mono text-bio-muted mb-6 tracking-wide">
          Synthesizing 3D Molecular Space &bull; {progress}%
        </p>

        {/* Liquid Progress Bar Container */}
        <div className="w-full h-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800/80 overflow-hidden relative shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-bio-cyan via-cyan-400 to-bio-violet transition-all duration-200 ease-out shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Academic Profile Footnote */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
          <Sparkles className="w-3 h-3 text-bio-cyan-dark dark:text-bio-cyan" />
          <span>Pritesh Kumar Mishra &bull; LPU Biotechnology</span>
        </div>
      </div>
    </div>
  );
};
