import React from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { researchInterests } from '../data/research';
import { CardTilt } from '../components/effects/CardTilt';
import { Reveal } from '../components/ui/Reveal';
import {
  Binary,
  Cpu,
  Dna,
  Microscope,
  Activity,
  BarChart3,
  HelpCircle,
  Compass,
} from 'lucide-react';

export const ResearchSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    bioinformatics: <Binary className="w-5 h-5 text-bio-cyan-dark" />,
    'computational-biology': <Cpu className="w-5 h-5 text-bio-violet" />,
    'genomics-sequence-analysis': <Dna className="w-5 h-5 text-bio-cyan-dark" />,
    'molecular-biology': <Microscope className="w-5 h-5 text-emerald-600" />,
    'disease-research-approaches': <Activity className="w-5 h-5 text-rose-500" />,
    'scientific-visualization': <BarChart3 className="w-5 h-5 text-amber-500" />,
  };

  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="Fields of Intellectual Curiosity"
        title="Research Interests & Prospective Domains"
        description="Core scientific and computational domains I aspire to explore throughout my undergraduate and subsequent research studies."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {researchInterests.map((interest, idx) => (
          <Reveal key={interest.id} delayMs={idx * 60}>
            <CardTilt className="h-full">
              <div className="h-full glass-apple-interactive p-6 flex flex-col justify-between group">
                <div>
                  {/* Category & Icon */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[11px] font-mono text-bio-cyan-dark uppercase tracking-wider font-semibold">
                      {interest.category}
                    </span>
                    <div className="p-2.5 rounded-xl glass-apple-secondary group-hover:scale-105 transition-transform">
                      {iconMap[interest.id] || <Compass className="w-5 h-5 text-bio-cyan-dark" />}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-bio-text group-hover:text-bio-cyan-dark transition-colors">
                    {interest.title}
                  </h3>

                  {/* Short Summary */}
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                    {interest.shortSummary}
                  </p>

                  {/* Plain-Language Explanation for Non-Specialists in Frosted Glass */}
                  <div className="mt-4 p-3.5 rounded-xl glass-apple-secondary text-xs space-y-1">
                    <span className="text-[10px] font-mono uppercase text-bio-muted font-bold block">
                      Plain-Language Context:
                    </span>
                    <p className="text-slate-600 leading-relaxed italic">
                      "{interest.explanationForNonSpecialists}"
                    </p>
                  </div>

                  {/* What I want to explore bullets */}
                  <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-bio-muted font-bold block mb-1">
                      Key Topics to Explore:
                    </span>
                    <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] leading-relaxed">
                      {interest.whatIWantToExplore.map((topic, i) => (
                        <li key={i}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Key Research Question */}
                <div className="mt-5 pt-3 border-t border-slate-200/60">
                  <span className="text-[10px] font-mono text-bio-cyan-dark uppercase font-bold flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" /> Core Scientific Question:
                  </span>
                  <p className="text-[11px] font-mono text-slate-600 mt-0.5 leading-snug">
                    {interest.keyQuestions}
                  </p>
                </div>
              </div>
            </CardTilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
