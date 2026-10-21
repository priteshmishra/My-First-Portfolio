import React from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { Card } from '../components/ui/Card';
import { portfolioData } from '../data/portfolioData';
import { Dna, Cpu, Binary, Microscope, GraduationCap, MapPin, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <SectionWrapper
      id="about"
      title="About Me"
      subtitle="Biotechnology undergraduate dedicated to bridging biological discovery with algorithmic computation."
      badgeText="Academic Profile"
      badgeColor="cyan"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Summary Card */}
        <div className="lg:col-span-5">
          <Card glowColor="cyan" className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-bio-cyan/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-bio-cyan/30 to-bio-violet/30 border border-bio-cyan/40 flex items-center justify-center text-bio-cyan shadow-[0_0_20px_rgba(0,240,255,0.25)]">
                <Dna className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{portfolioData.owner.name}</h3>
                <p className="text-xs text-bio-cyan font-mono">{portfolioData.owner.academicProgram}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{portfolioData.owner.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 border-t border-white/10 pt-4">
              <div className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-bio-violet shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">University:</strong> {portfolioData.owner.institution}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Microscope className="w-4 h-4 text-bio-cyan shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Career Direction:</strong> {portfolioData.owner.careerFocus}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Binary className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Academic Purpose:</strong> {portfolioData.owner.courseCode}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Open To Collaborations
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {portfolioData.owner.availableFor.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800/80 border border-white/10 text-slate-300 font-mono"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="cyan"
                size="sm"
                icon={<Mail className="w-4 h-4" />}
                onClick={onContactClick}
                className="w-full"
              >
                Get in Touch
              </Button>
            </div>
          </Card>
        </div>

        {/* Narrative & Focus Pillars */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-xl p-6 border-white/10 space-y-4 text-sm text-slate-300 leading-relaxed">
            {portfolioData.owner.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Three Conceptual Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card glowColor="cyan" className="p-4 text-center sm:text-left">
              <div className="w-10 h-10 rounded-lg bg-bio-cyan/15 text-bio-cyan flex items-center justify-center mb-3 mx-auto sm:mx-0">
                <Binary className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Algorithmic Genomics</h4>
              <p className="text-xs text-slate-400 mt-1">
                Sequence alignment, motif identification, GC skew analysis, and biological string algorithms.
              </p>
            </Card>

            <Card glowColor="violet" className="p-4 text-center sm:text-left">
              <div className="w-10 h-10 rounded-lg bg-bio-violet/15 text-bio-violet flex items-center justify-center mb-3 mx-auto sm:mx-0">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">3D Biomolecular Modeling</h4>
              <p className="text-xs text-slate-400 mt-1">
                PDB coordinate parsing, secondary structure splines, and interactive WebGL macromolecular scenes.
              </p>
            </Card>

            <Card glowColor="none" className="p-4 text-center sm:text-left">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3 mx-auto sm:mx-0">
                <Microscope className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Transcriptomic Data</h4>
              <p className="text-xs text-slate-400 mt-1">
                Log2 fold-change normalization, z-scores, and interactive stress-response expression heatmaps.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
