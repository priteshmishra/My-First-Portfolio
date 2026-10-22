import React, { useState } from 'react';
import { ProjectItem } from '../../data/projects';
import { StatusBadge } from './StatusBadge';
import { CardTilt } from '../effects/CardTilt';
import { ChevronRight, FileCode2, HelpCircle, Target, BookOpen, X } from 'lucide-react';
import { Button } from './Button';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  return (
    <>
      <CardTilt className="h-full">
        <div className="h-full glass-apple-interactive p-6 flex flex-col justify-between group">
          <div>
            {/* Top row: Category and Status Badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-mono text-bio-cyan-dark uppercase tracking-wider font-semibold">
                {project.category}
              </span>
              <StatusBadge status={project.status} size="sm" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-bio-text group-hover:text-bio-cyan-dark transition-colors">
              {project.title}
            </h3>

            {/* Summary */}
            <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.summary}
            </p>

            {/* Quick Scientific Question Highlight */}
            <div className="mt-4 p-3.5 rounded-xl glass-apple-secondary text-xs text-bio-text space-y-1">
              <div className="flex items-center gap-1.5 text-bio-cyan-dark font-mono font-medium text-[11px]">
                <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Scientific Question:</span>
              </div>
              <p className="text-slate-600 line-clamp-2 italic">
                "{project.scientificQuestion}"
              </p>
            </div>

            {/* Tools planned chips */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.toolsPlanned.map((tool, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md glass-apple-pill text-slate-700"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row: Detailed Research Specification & Links */}
          <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
            <button
              onClick={() => setIsDetailOpen(true)}
              className="text-xs font-semibold text-bio-cyan-dark hover:text-cyan-800 flex items-center gap-1 focus-visible:outline-none focus-visible:underline cursor-pointer"
            >
              <span>View Research Plan</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <span className="text-[11px] font-mono text-bio-muted italic">
              {project.repositoryUrl ? 'Active Repo' : 'Implementation Pending'}
            </span>
          </div>
        </div>
      </CardTilt>

      {/* Accessible Research Plan Deep Dive Modal with Apple Frosted Glass */}
      {isDetailOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${project.id}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in"
        >
          <div className="glass-apple max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative bg-white/90 dark:bg-[#101722]/95">
            {/* Close Button */}
            <button
              onClick={() => setIsDetailOpen(false)}
              aria-label="Close project modal"
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-500 hover:text-bio-text hover:bg-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-cyan"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="pr-10">
              <div className="flex items-center gap-2 mb-2">
                <StatusBadge status={project.status} size="sm" />
                <span className="text-xs font-mono text-bio-muted">{project.category}</span>
              </div>
              <h3 id={`modal-title-${project.id}`} className="text-xl sm:text-2xl font-bold text-bio-text">
                {project.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">{project.summary}</p>
            </div>

            {/* Scientific Breakdown */}
            <div className="mt-6 space-y-5 text-xs sm:text-sm">
              {/* Objective */}
              <div className="p-4 rounded-xl glass-apple-secondary space-y-1.5">
                <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-bio-cyan-dark font-bold">
                  <Target className="w-4 h-4" />
                  <span>Objective</span>
                </div>
                <p className="text-bio-text leading-relaxed">{project.objective}</p>
              </div>

              {/* Scientific Question */}
              <div className="p-4 rounded-xl glass-apple-secondary space-y-1.5">
                <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-bio-violet font-bold">
                  <HelpCircle className="w-4 h-4" />
                  <span>Scientific Question</span>
                </div>
                <p className="text-bio-text leading-relaxed italic">"{project.scientificQuestion}"</p>
              </div>

              {/* Proposed Methods */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-bio-muted font-bold mb-2 flex items-center gap-1.5">
                  <FileCode2 className="w-4 h-4 text-slate-700" />
                  <span>Proposed Methods</span>
                </h4>
                <ul className="list-disc list-inside space-y-1.5 text-slate-700 pl-1 leading-relaxed">
                  {project.proposedMethods.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>

              {/* Expected Learning Outcomes */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-bio-muted font-bold mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-slate-700" />
                  <span>Expected Learning Outcomes</span>
                </h4>
                <ul className="list-disc list-inside space-y-1.5 text-slate-700 pl-1 leading-relaxed">
                  {project.expectedLearningOutcomes.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </div>

              {/* Integrity Notice */}
              <div className="p-3.5 rounded-xl glass-apple-pill text-xs text-slate-700 font-mono">
                <strong className="text-slate-900 block mb-1">Portfolio Integrity Notice:</strong>
                This project is currently documented as a planned academic inquiry. Live repository and demonstration URLs will be linked here once the implementation has been verified.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-slate-200/60 flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setIsDetailOpen(false)}>
                Close Plan
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
