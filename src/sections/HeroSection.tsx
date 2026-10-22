import React from 'react';
import { Button } from '../components/ui/Button';
import { profileData } from '../data/profile';
import { ChevronDown, Compass, FlaskConical, GraduationCap, Sparkles } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';

interface HeroSectionProps {
  onExploreJourney: () => void;
  onEnterLab: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreJourney,
  onEnterLab,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Floating Apple Frosted Glass Card with Specular Shine */}
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          <Reveal>
            <div className="glass-apple p-7 sm:p-10 max-w-3xl space-y-6 shadow-card hover:shadow-card-hover transition-all duration-300">
              {/* Eyebrow Label with Apple Frosted Glass Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-apple-pill text-[11px] font-mono tracking-wider uppercase text-bio-cyan-dark shadow-sm">
                <span className="w-2 h-2 rounded-full bg-bio-cyan animate-pulse" />
                <span>BIOTECHNOLOGY STUDENT &bull; BIOINFORMATICS INTERESTS</span>
              </div>

              {/* Main Headline with Apple Refined Gradient */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-bio-text leading-[1.12]">
                Exploring Life Through{' '}
                <span className="text-bio-cyan-dark underline decoration-bio-cyan/40 decoration-wavy decoration-2">
                  Science
                </span>{' '}
                and{' '}
                <span className="text-bio-violet">Computation.</span>
              </h1>

              {/* Supporting Statement */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-normal">
                {profileData.supportingStatement}
              </p>

              {/* Two Clear Calls to Action */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<Compass className="w-4 h-4" />}
                  onClick={onExploreJourney}
                  className="shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Explore My Journey
                </Button>

                <Button
                  variant="glass"
                  size="lg"
                  icon={<FlaskConical className="w-4 h-4 text-bio-cyan-dark" />}
                  onClick={onEnterLab}
                  className="glass-apple-pill hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Enter the Interactive Lab
                </Button>
              </div>

              {/* Academic Identity Badge */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-2.5 text-xs font-mono text-bio-muted">
                <GraduationCap className="w-4 h-4 text-bio-cyan-dark shrink-0" />
                <span>
                  <strong className="text-bio-text font-semibold">{profileData.degree}</strong> &bull; {profileData.institution} &bull; {profileData.academicLevel}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Floating Interactive DNA Highlight Card */}
        <div className="lg:col-span-4 hidden lg:flex flex-col items-end">
          <Reveal delayMs={150}>
            <div className="glass-apple p-5 text-right max-w-xs space-y-2 shadow-soft hover:shadow-card transition-all">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-apple-pill text-[10px] font-mono text-bio-cyan-dark font-semibold">
                <Sparkles className="w-3 h-3 text-bio-cyan" />
                <span>Live 3D Background Canvas</span>
              </div>
              <h3 className="text-xs font-mono font-bold text-bio-text">
                Procedural Antiparallel Double Helix
              </h3>
              <p className="text-[11px] text-slate-600 leading-normal">
                Watson-Crick base pairing with real-time pointer tracking &amp; smooth scroll parallax.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="mt-14 flex justify-center">
        <button
          onClick={onExploreJourney}
          aria-label="Scroll down to about section"
          className="glass-apple-pill px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-700 hover:text-bio-cyan-dark transition-all cursor-pointer shadow-soft hover:shadow-card hover:scale-105"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
