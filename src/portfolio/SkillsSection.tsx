import React, { useState } from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { skillsData, SkillNode, SkillCategory } from '../data/skillsData';
import { Network, List, Layers, ArrowUpRight, Sparkles } from 'lucide-react';
import { soundSynth } from '../audio/soundSynth';

interface SkillsSectionProps {
  onOpenProject?: (projectId: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onOpenProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'constellation'>('cards');

  const categories: (SkillCategory | 'All')[] = [
    'All',
    'Biotechnology',
    'Programming',
    'Bioinformatics',
    'Visualization',
  ];

  const filteredSkills = skillsData.filter((skill) =>
    selectedCategory === 'All' ? true : skill.category === selectedCategory
  );

  return (
    <SectionWrapper
      id="skills"
      title="Career Skill Constellation"
      subtitle="Interactive network of biological fundamentals, computational tools, and analytical methodologies with honest academic statuses."
      badgeText="Technical Competencies"
      badgeColor="cyan"
    >
      {/* Controls Bar: Category Filters & View Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundSynth.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-bio-cyan/20 text-bio-cyan border border-bio-cyan shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-white/10 shrink-0">
          <button
            onClick={() => {
              soundSynth.playClick();
              setViewMode('cards');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
              viewMode === 'cards'
                ? 'bg-bio-cyan/20 text-bio-cyan font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List / Cards</span>
          </button>
          <button
            onClick={() => {
              soundSynth.playClick();
              setViewMode('constellation');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
              viewMode === 'constellation'
                ? 'bg-bio-violet/20 text-bio-violet font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>3D Constellation</span>
          </button>
        </div>
      </div>

      {/* Main Skills Content */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSkills.map((skill) => (
            <Card
              key={skill.id}
              glowColor={skill.category === 'Bioinformatics' ? 'cyan' : 'violet'}
              onClick={() => {
                soundSynth.playClick();
                setSelectedSkill(skill);
              }}
              className="group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    {skill.category}
                  </span>
                  <Badge variant={skill.status}>{skill.status}</Badge>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-bio-cyan transition-colors flex items-center justify-between">
                  <span>{skill.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-bio-cyan" />
                </h3>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-3">
                  {skill.description}
                </p>
              </div>

              {skill.evidenceOrProject && (
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-bio-cyan/80 font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-bio-cyan shrink-0" />
                  <span className="truncate">{skill.evidenceOrProject}</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        /* Constellation 2D SVG Projection with interactive nodes */
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border-bio-violet/30">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
              <Network className="w-5 h-5 text-bio-violet" />
              <span>Bio-Computational Interconnection Graph</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl mx-auto">
              Visualizing the interconnected relationships between biological science, mathematical algorithms, and computational modeling. Click any node to inspect.
            </p>
          </div>

          <div className="relative w-full h-[450px] bg-space-950/70 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center">
            <svg className="w-full h-full pointer-events-none" viewBox="0 0 800 450">
              {/* Edges */}
              {skillsData.map((node) =>
                node.connections.map((targetId) => {
                  const target = skillsData.find((s) => s.id === targetId);
                  if (!target) return null;
                  const x1 = 400 + node.position3D[0] * 70;
                  const y1 = 225 + node.position3D[1] * -50;
                  const x2 = 400 + target.position3D[0] * 70;
                  const y2 = 225 + target.position3D[1] * -50;

                  return (
                    <line
                      key={`${node.id}-${targetId}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(0, 240, 255, 0.15)"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />
                  );
                })
              )}
            </svg>

            {/* Interactive Nodes */}
            <div className="absolute inset-0">
              {skillsData.map((node) => {
                const left = 50 + (node.position3D[0] / 5) * 40;
                const top = 50 - (node.position3D[1] / 5) * 40;

                const isBio = node.category === 'Biotechnology' || node.category === 'Bioinformatics';

                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      soundSynth.playClick();
                      setSelectedSkill(node);
                    }}
                    style={{ left: `${left}%`, top: `${top}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 ${
                      isBio ? 'focus-visible:ring-bio-cyan' : 'focus-visible:ring-bio-violet'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-125 ${
                        isBio
                          ? 'bg-bio-cyan/20 border-bio-cyan text-bio-cyan group-hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]'
                          : 'bg-bio-violet/20 border-bio-violet text-bio-violet group-hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className="mt-1 text-[10px] sm:text-xs font-mono font-medium text-slate-300 group-hover:text-white bg-space-950/80 px-1.5 py-0.5 rounded border border-white/5 whitespace-nowrap">
                      {node.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Skill Detail Modal */}
      <Modal
        isOpen={selectedSkill !== null}
        onClose={() => setSelectedSkill(null)}
        title={selectedSkill?.name || ''}
        subtitle={`${selectedSkill?.category} — Learning Status: ${selectedSkill?.status}`}
      >
        {selectedSkill && (
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-mono text-bio-cyan uppercase tracking-wider mb-1">
                Detailed Academic Description
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedSkill.description}
              </p>
            </div>

            {selectedSkill.evidenceOrProject && (
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10">
                <span className="text-xs font-mono text-emerald-400 block mb-1">
                  Demonstrated Implementation / Course Evidence:
                </span>
                <p className="text-xs text-slate-300">{selectedSkill.evidenceOrProject}</p>
              </div>
            )}

            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Connected Conceptual Nodes
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedSkill.connections.map((cId) => {
                  const cNode = skillsData.find((s) => s.id === cId);
                  return (
                    <span
                      key={cId}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-mono border border-white/5"
                    >
                      {cNode ? cNode.name : cId}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </SectionWrapper>
  );
};
