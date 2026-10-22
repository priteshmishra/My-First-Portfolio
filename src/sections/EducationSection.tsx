import React from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GraduationCap, MapPin, Calendar, BookMarked, Clock } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="Academic Progression"
        title="Formal Education & Academic Standing"
        description="Current enrollment, degree program, and verified educational milestones at Lovely Professional University."
      />

      <div className="max-w-4xl mx-auto space-y-8">
        <Reveal>
          {/* Primary Editorial Degree Card */}
          <div className="glass-apple p-6 sm:p-8 relative overflow-hidden">
            {/* Top decorative cyan-to-violet gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-bio-cyan to-bio-violet" />

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-200/60">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-apple-pill text-cyan-900 text-xs font-mono mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-bio-cyan animate-pulse" />
                  <span>Current Academic Status: First Year</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-bio-text">
                  Bachelor of Technology (B.Tech) in Biotechnology
                </h3>
                <p className="text-sm sm:text-base text-bio-cyan-dark font-medium mt-1">
                  Lovely Professional University (LPU)
                </p>
              </div>

              <div className="flex flex-col sm:items-end text-xs font-mono text-bio-muted space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Punjab, India</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>Undergraduate Degree</span>
                </div>
              </div>
            </div>

            {/* Coursework & Focus Areas */}
            <div className="mt-6 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-wider text-bio-muted font-bold flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-bio-cyan-dark" />
                <span>Foundational First-Year Curriculum Themes</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  {
                    title: 'Biochemistry & Molecular Foundations',
                    desc: 'Chemical principles of amino acids, carbohydrates, nucleic acids, and cellular thermodynamics.',
                  },
                  {
                    title: 'Cellular & Microbiology Principles',
                    desc: 'Prokaryotic and eukaryotic cellular organization, organelle function, and aseptic wet-lab procedures.',
                  },
                  {
                    title: 'Calculus & Biostatistics',
                    desc: 'Mathematical methods for biological rate equations, continuous distributions, and experimental variance.',
                  },
                  {
                    title: 'Algorithmic Problem Solving & Python',
                    desc: 'Programming fundamentals, logic structures, and introductory data processing scripts.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl glass-apple-secondary text-bio-text space-y-1"
                  >
                    <span className="font-semibold text-slate-900 block">{item.title}</span>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Record Extensibility Note */}
            <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-mono text-bio-muted">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                As academic semesters conclude and examinations are graded, verified grade metrics, honors, and specific course credits will be added here.
              </span>
            </div>
          </div>
        </Reveal>

        {/* Four-Year Degree Progression Roadmap */}
        <Reveal delayMs={100}>
          <div className="glass-apple p-6 text-xs space-y-4">
            <h4 className="font-mono uppercase tracking-wider text-[11px] text-bio-muted font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-bio-violet" />
              <span>Degree Progression Roadmap</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center font-mono">
              <div className="p-3.5 rounded-xl glass-apple-pill border-bio-cyan/50 shadow-sm">
                <span className="text-[10px] uppercase text-bio-cyan-dark font-bold block">Year 1</span>
                <span className="text-xs font-bold text-slate-900 block mt-1">Foundational Studies</span>
                <span className="text-[10px] text-emerald-700 font-semibold block mt-1">● Current Standing</span>
              </div>

              <div className="p-3.5 rounded-xl glass-apple-secondary">
                <span className="text-[10px] uppercase text-bio-muted block">Year 2</span>
                <span className="text-xs font-medium text-slate-700 block mt-1">Genomics & Sequences</span>
                <span className="text-[10px] text-slate-400 block mt-1">Upcoming</span>
              </div>

              <div className="p-3.5 rounded-xl glass-apple-secondary">
                <span className="text-[10px] uppercase text-bio-muted block">Year 3</span>
                <span className="text-xs font-medium text-slate-700 block mt-1">Computational Models</span>
                <span className="text-[10px] text-slate-400 block mt-1">Upcoming</span>
              </div>

              <div className="p-3.5 rounded-xl glass-apple-secondary">
                <span className="text-[10px] uppercase text-bio-muted block">Year 4</span>
                <span className="text-xs font-medium text-slate-700 block mt-1">Capstone & Research</span>
                <span className="text-[10px] text-slate-400 block mt-1">Upcoming</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
