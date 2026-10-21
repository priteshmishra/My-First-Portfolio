import React, { useState } from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { researchData, ResearchEntry } from '../data/researchData';
import { BookOpen, Calendar, ArrowRight, ExternalLink, CheckCircle } from 'lucide-react';
import { soundSynth } from '../audio/soundSynth';

export const ResearchSection: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [activeEntry, setActiveEntry] = useState<ResearchEntry | null>(null);

  const topics = ['All', 'Molecular Biology', 'Sequence Algorithms', 'Structural Biology'];

  const filteredEntries = researchData.filter(
    (e) => selectedTopic === 'All' || e.category === selectedTopic
  );

  return (
    <SectionWrapper
      id="research"
      title="Research Notebook"
      subtitle="Curated educational study notes, biological mechanisms, and algorithmic foundations with authentic scientific literature citations."
      badgeText="Academic Exploration"
      badgeColor="cyan"
    >
      {/* Topics Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => {
              soundSynth.playClick();
              setSelectedTopic(topic);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedTopic === topic
                ? 'bg-bio-cyan/20 text-bio-cyan border border-bio-cyan shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Research Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEntries.map((entry) => (
          <Card
            key={entry.id}
            glowColor="cyan"
            onClick={() => {
              soundSynth.playClick();
              setActiveEntry(entry);
            }}
            className="group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-3">
                <span className="text-bio-cyan uppercase tracking-wider">{entry.category}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {entry.date}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-bio-cyan transition-colors">
                {entry.title}
              </h3>

              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                {entry.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">
                {entry.references.length} Cited Reference{entry.references.length > 1 ? 's' : ''}
              </span>
              <div className="flex items-center gap-1 text-xs font-mono text-bio-cyan">
                <span>Read Note</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Note Detail Modal */}
      <Modal
        isOpen={activeEntry !== null}
        onClose={() => setActiveEntry(null)}
        title={activeEntry?.title || ''}
        subtitle={`${activeEntry?.category} — Study Notes (${activeEntry?.date})`}
        maxWidth="4xl"
      >
        {activeEntry && (
          <div className="space-y-6">
            <div className="space-y-4 text-sm text-slate-200 leading-relaxed">
              {activeEntry.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Key Takeaways */}
            <div className="p-4 rounded-xl bg-bio-cyan/10 border border-bio-cyan/20">
              <h4 className="text-xs font-mono uppercase tracking-wider text-bio-cyan mb-2">
                Core Conceptual Takeaways
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeEntry.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-bio-cyan shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scientific Literature References */}
            <div className="border-t border-white/10 pt-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Scientific Literature Citations
              </h4>
              <div className="space-y-2">
                {activeEntry.references.map((ref, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-900/60 border border-white/5 flex items-start justify-between gap-3 text-xs"
                  >
                    <span className="text-slate-300 font-mono leading-normal">
                      [{idx + 1}] {ref.citation}
                    </span>
                    {ref.doiOrUrl && (
                      <a
                        href={ref.doiOrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bio-cyan hover:underline shrink-0 flex items-center gap-1 font-mono text-[11px]"
                      >
                        <span>DOI</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </SectionWrapper>
  );
};
