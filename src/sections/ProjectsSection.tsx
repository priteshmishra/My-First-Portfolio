import React, { useState } from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { projectsData } from '../data/projects';
import { ProjectCard } from '../components/ui/ProjectCard';
import { Reveal } from '../components/ui/Reveal';
import { Info } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(projectsData.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="Academic Inquiry & Implementation Plans"
        title="Projects & Research Concepts"
        description="Thoughtful learning projects structured with clear scientific questions, proposed computational methods, and verifiable learning goals."
      />

      {/* Integrity Banner in Apple Frosted Glass */}
      <div className="max-w-4xl mx-auto mb-10 p-4 rounded-2xl glass-apple flex items-start sm:items-center gap-3 text-xs text-slate-700">
        <Info className="w-4 h-4 text-bio-cyan-dark shrink-0 mt-0.5 sm:mt-0" />
        <p className="leading-relaxed">
          <strong className="text-bio-text font-semibold">Integrity Commitment:</strong> In accordance with first-year academic standards, all projects below are strictly categorized as <strong>Planned Inquiries</strong>. No fabricated experimental results, fake repository links, or false claims of completion are presented.
        </p>
      </div>

      {/* Category Filter Chips with Apple Frosted Glass Pill */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors border ${
              selectedCategory === cat
                ? 'bg-bio-cyan/20 text-bio-cyan-dark border-bio-cyan/50 font-semibold shadow-sm'
                : 'glass-apple-pill text-slate-700 hover:text-bio-text'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, idx) => (
          <Reveal key={project.id} delayMs={idx * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};
