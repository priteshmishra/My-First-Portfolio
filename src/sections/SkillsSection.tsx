import React, { useState } from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { skillCategories, SkillStatus } from '../data/skills';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Reveal } from '../components/ui/Reveal';
import { BookOpen, Filter, Info, Code2, Dna, Database, FileText, FlaskConical } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<SkillStatus | 'All'>('All');

  const categoryIcons: Record<string, React.ReactNode> = {
    'biotech-foundations': <FlaskConical className="w-4 h-4 text-bio-cyan-dark" />,
    'molecular-cell-biology': <Dna className="w-4 h-4 text-bio-cyan-dark" />,
    'genetics-genomics': <BookOpen className="w-4 h-4 text-bio-violet" />,
    'programming-computational': <Code2 className="w-4 h-4 text-bio-violet" />,
    'bioinformatics-tools': <Database className="w-4 h-4 text-bio-cyan-dark" />,
    'scientific-communication': <FileText className="w-4 h-4 text-emerald-600" />,
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="Competencies & Roadmap"
        title="Skills and Learning Roadmap"
        description="An honest explorer tracking current foundational coursework, practical computational competencies, and prospective research tools."
      />

      {/* Filter and Academic Disclaimer Bar */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Status Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-bio-muted flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-bio-cyan-dark" /> Filter:
          </span>
          {(['All', 'Learning', 'In progress', 'Planned'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors border ${
                filterStatus === status
                  ? 'bg-bio-cyan/20 text-bio-cyan-dark border-bio-cyan/50 font-semibold shadow-sm'
                  : 'glass-apple-pill text-slate-700 hover:text-bio-text'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Disclaimer Notice against fake ratings */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 glass-apple-pill px-3.5 py-1.5 rounded-full">
          <Info className="w-3.5 h-3.5 text-bio-cyan-dark shrink-0" />
          <span>Honest Personal Learning Tracker &bull; Zero fabricated % proficiency ratings</span>
        </div>
      </div>

      {/* 6 Skill Categories Grid with Apple Frosted Glass */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, catIdx) => {
          const visibleSkills = category.skills.filter(
            (skill) => filterStatus === 'All' || skill.status === filterStatus
          );

          if (visibleSkills.length === 0) return null;

          return (
            <Reveal key={category.id} delayMs={catIdx * 60}>
              <div className="glass-apple-interactive p-6 h-full flex flex-col justify-between">
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-2.5 mb-2 pb-3 border-b border-slate-200/60">
                    <div className="p-2 rounded-xl glass-apple-secondary">
                      {categoryIcons[category.id] || <Dna className="w-4 h-4 text-bio-cyan-dark" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-bio-text font-mono">
                        {category.title}
                      </h3>
                      <p className="text-[11px] text-bio-muted line-clamp-1">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills List in Category */}
                  <div className="space-y-3 mt-4">
                    {visibleSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="p-3.5 rounded-xl glass-apple-secondary hover:bg-white/80 dark:hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-xs text-bio-text leading-snug">
                            {skill.name}
                          </span>
                          <StatusBadge status={skill.status} size="sm" />
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                          {skill.note}
                        </p>

                        {/* Core concepts tags */}
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {skill.coreConcepts.map((concept, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md glass-apple-pill text-slate-700"
                            >
                              {concept}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Local data update documentation hint */}
                <div className="mt-5 pt-3 border-t border-slate-200/60 text-[10px] font-mono text-bio-muted text-right">
                  data file: <code className="text-bio-cyan-dark">src/data/skills.ts</code>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};
