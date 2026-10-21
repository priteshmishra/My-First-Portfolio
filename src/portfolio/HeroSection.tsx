import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Button } from '../components/ui/Button';
import { ChevronDown, Compass, FlaskConical, FolderKanban, Sparkles } from 'lucide-react';
import { soundSynth } from '../audio/soundSynth';

interface HeroSectionProps {
  onExploreJourney: () => void;
  onViewPortfolio: () => void;
  onEnterLab: () => void;
  onTriggerSignature?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreJourney,
  onViewPortfolio,
  onEnterLab,
  onTriggerSignature,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 pointer-events-none"
    >
      {/* Central Content (Pointer events enabled on buttons & text) */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pointer-events-none select-none">
        {/* Academic Program Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bio-cyan/10 border border-bio-cyan/30 text-bio-cyan text-xs font-mono mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.2)] pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-bio-cyan animate-ping" />
          <span>{portfolioData.owner.academicProgram} &bull; {portfolioData.owner.institution}</span>
        </div>

        {/* Master Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none">
          BIO<span className="text-bio-cyan text-glow-cyan">VERSE</span>
        </h1>

        <p className="mt-3 text-lg sm:text-2xl font-light text-slate-300 italic tracking-wide">
          Exploring Life Through Data.
        </p>

        {/* Name and Career Focus */}
        <div className="mt-4 flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            {portfolioData.owner.name}
          </span>
          <p className="text-xs sm:text-sm text-bio-violet font-mono font-medium mt-1 uppercase tracking-widest">
            Career Focus: {portfolioData.owner.careerFocus}
          </p>
        </div>

        <p className="mt-6 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          {portfolioData.owner.tagline}
        </p>

        {/* Primary CTA Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 pointer-events-auto">
          <Button
            variant="cyan"
            size="lg"
            icon={<Compass className="w-5 h-5" />}
            onClick={() => {
              soundSynth.playImpulse(1.2);
              onExploreJourney();
            }}
          >
            Explore My Universe
          </Button>

          <Button
            variant="glass"
            size="lg"
            icon={<FolderKanban className="w-5 h-5 text-bio-violet" />}
            onClick={() => {
              soundSynth.playClick();
              onViewPortfolio();
            }}
          >
            View My Portfolio
          </Button>

          <Button
            variant="violet"
            size="lg"
            icon={<FlaskConical className="w-5 h-5" />}
            onClick={() => {
              soundSynth.playSuccess();
              onEnterLab();
            }}
          >
            Enter Research Lab
          </Button>
        </div>

        {/* Easter Egg: Particle Signature trigger */}
        {onTriggerSignature && (
          <button
            onClick={() => {
              soundSynth.playQuantumBurst();
              onTriggerSignature();
            }}
            className="mt-6 text-xs text-slate-500 hover:text-bio-cyan transition-colors flex items-center gap-1 font-mono cursor-pointer pointer-events-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Assemble Particle Signature</span>
          </button>
        )}
      </div>

      {/* Accessible Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-bio-cyan transition-colors pointer-events-auto">
        <button
          onClick={onViewPortfolio}
          aria-label="Scroll to portfolio content"
          className="flex flex-col items-center gap-1 text-xs font-mono uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-cyan rounded p-1"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
