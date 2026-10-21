import React from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, BookOpen, Milestone, Award, CheckCircle2, Clock, CircleDot, ShieldCheck } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const edu = portfolioData.education[0];

  return (
    <SectionWrapper
      id="education"
      title="Education & Roadmap"
      subtitle="Academic coursework at Lovely Professional University and a progressive computational biology learning roadmap."
      badgeText="Academic Journey"
      badgeColor="violet"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Academic Program Card */}
        <div className="lg:col-span-5 space-y-6">
          <Card glowColor="cyan">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-bio-cyan/15 text-bio-cyan border border-bio-cyan/30 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <Badge variant={edu.status === 'In Progress' ? 'In Progress' : 'Completed'}>
                  {edu.status}
                </Badge>
                <h3 className="text-lg font-bold text-white mt-1">{edu.degree}</h3>
              </div>
            </div>

            <p className="text-sm font-medium text-slate-300">
              {edu.institution}
            </p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {edu.location} &bull; {edu.timeline}
            </p>

            <p className="text-xs text-slate-300 mt-4 leading-relaxed border-t border-white/10 pt-4">
              {edu.description}
            </p>

            {/* Relevant Coursework */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-bio-cyan">
                <BookOpen className="w-4 h-4" />
                <span>Relevant Academic Coursework</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {edu.coursework.map((course, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-bio-cyan/70 shrink-0" />
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Academic Integrity & Verified Credentials Empty State */}
          <Card glowColor="none" className="border-dashed border-white/20">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{portfolioData.certificationPlaceholder.title}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {portfolioData.certificationPlaceholder.notice}
            </p>
            <div className="mt-3 p-3 rounded-lg bg-slate-900/60 border border-white/5 text-[11px] text-slate-500 font-mono">
              {portfolioData.certificationPlaceholder.instructions}
            </div>
          </Card>
        </div>

        {/* Learning Roadmap Milestones */}
        <div className="lg:col-span-7">
          <Card glowColor="violet">
            <div className="flex items-center gap-2 mb-6 text-xs font-mono uppercase tracking-wider text-bio-violet border-b border-white/10 pb-3">
              <Milestone className="w-4 h-4" />
              <span>Bioinformatics Competency Roadmap</span>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-bio-cyan before:via-bio-violet before:to-slate-700">
              {portfolioData.roadmap.map((m) => {
                const icon = {
                  Completed: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
                  'In Progress': <CircleDot className="w-5 h-5 text-bio-cyan animate-pulse" />,
                  Planned: <Clock className="w-5 h-5 text-slate-500" />,
                }[m.status];

                return (
                  <div key={m.step} className="relative group">
                    {/* Milestone Pin Icon */}
                    <div className="absolute -left-[30px] sm:-left-[38px] top-0 bg-space-950 p-0.5 rounded-full border border-white/10">
                      {icon}
                    </div>

                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 hover:border-white/15 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono text-slate-400">
                          Milestone 0{m.step}
                        </span>
                        <Badge variant={m.status}>{m.status}</Badge>
                      </div>

                      <h4 className="text-sm font-bold text-white mt-1">
                        {m.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {m.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {m.competencies.map((comp, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono border border-white/5"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  );
};
