import React, { useState } from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { projectsData, Project } from '../data/projectsData';
import { FolderKanban, Play, AlertCircle, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { soundSynth } from '../audio/soundSynth';

interface ProjectsSectionProps {
  onLaunchDemo?: (demoType: 'sequence' | 'molecular' | 'expression' | 'terminal' | 'physics') => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onLaunchDemo }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ['All', 'Bioinformatics', 'Scientific Visualization', 'Genomics', 'Simulation'];
  const statuses = ['All', 'Completed', 'In Progress', 'Planned'];

  const filteredProjects = projectsData.filter((p) => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchCat && matchStatus;
  });

  const handleOpenProject = (project: Project) => {
    soundSynth.playClick();
    setActiveProject(project);
  };

  const handleLaunchProject = (project: Project) => {
    if (project.demoType && onLaunchDemo) {
      soundSynth.playSuccess();
      setActiveProject(null);
      onLaunchDemo(project.demoType);
    }
  };

  return (
    <SectionWrapper
      id="projects"
      title="Project Laboratory"
      subtitle="Hands-on computational biology platforms, algorithmic tools, and planned bioinformatic pipelines with transparent methodologies and limitations."
      badgeText="Academic Portfolio"
      badgeColor="violet"
    >
      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundSynth.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-bio-violet/20 text-bio-violet border border-bio-violet shadow-[0_0_12px_rgba(139,92,246,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-lg border border-white/10">
          <span className="text-[11px] font-mono text-slate-500 px-2">Status:</span>
          {statuses.map((stat) => (
            <button
              key={stat}
              onClick={() => {
                soundSynth.playClick();
                setSelectedStatus(stat);
              }}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                selectedStatus === stat
                  ? 'bg-bio-cyan/20 text-bio-cyan font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {stat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            glowColor={project.status === 'Completed' ? 'cyan' : 'violet'}
            onClick={() => handleOpenProject(project)}
            className="group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  {project.category}
                </span>
                <Badge variant={project.status}>{project.status}</Badge>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-bio-cyan transition-colors">
                {project.title}
              </h3>

              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tools.slice(0, 3).map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono border border-white/5"
                  >
                    {tool}
                  </span>
                ))}
                {project.tools.length > 3 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                    +{project.tools.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-bio-cyan">
                <span>View Details & Specs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed Project Modal */}
      <Modal
        isOpen={activeProject !== null}
        onClose={() => setActiveProject(null)}
        title={activeProject?.title || ''}
        subtitle={`${activeProject?.category} — Academic Status: ${activeProject?.status}`}
        maxWidth="4xl"
      >
        {activeProject && (
          <div className="space-y-6">
            {/* Action Bar inside modal */}
            {activeProject.demoType && (
              <div className="p-4 rounded-xl bg-bio-cyan/10 border border-bio-cyan/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-bio-cyan" />
                    <span>Interactive Workstation Available</span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    This tool runs live in the browser without any server dependency.
                  </p>
                </div>
                <Button
                  variant="cyan"
                  size="sm"
                  icon={<Play className="w-4 h-4 fill-current" />}
                  onClick={() => handleLaunchProject(activeProject)}
                >
                  Launch Workstation
                </Button>
              </div>
            )}

            {/* Problem & Objective */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-bio-cyan mb-1.5">
                  Problem Statement
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeProject.problemStatement}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-bio-violet mb-1.5">
                  Research Objective
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeProject.objective}
                </p>
              </div>
            </div>

            {/* Tools Used */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Technologies & Methodologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeProject.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 font-mono border border-white/10"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Methodology */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Implementation Methodology
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeProject.methodology.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-bio-cyan shrink-0 mt-1.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Results (Only when actual) */}
            {activeProject.results && activeProject.results.length > 0 && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                  Verified Academic Results
                </h4>
                <ul className="space-y-1 text-xs text-slate-300">
                  {activeProject.results.map((res, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">&check;</span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Limitations & Future Work */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/10 pt-4">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Technical Limitations</span>
                </h4>
                <ul className="space-y-1 text-xs text-slate-400">
                  {activeProject.limitations.map((lim, idx) => (
                    <li key={idx}>&bull; {lim}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-bio-cyan mb-1.5">
                  Future Roadmap
                </h4>
                <ul className="space-y-1 text-xs text-slate-400">
                  {activeProject.futureWork.map((fw, idx) => (
                    <li key={idx}>&bull; {fw}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </SectionWrapper>
  );
};
