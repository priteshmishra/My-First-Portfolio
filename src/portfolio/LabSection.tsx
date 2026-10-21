import React, { useState } from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { SequenceLab } from '../science/sequence/SequenceLab';
import { MolecularViewer } from '../science/molecular/MolecularViewer';
import { ExpressionExplorer } from '../science/expression/ExpressionExplorer';
import { BioinformaticsTerminal } from '../science/terminal/BioinformaticsTerminal';
import { CollisionPlayground } from '../physics/CollisionPlayground';
import { Dna, Atom, Activity, Terminal, Box } from 'lucide-react';
import { soundSynth } from '../audio/soundSynth';

export type LabTab = 'sequence' | 'molecular' | 'expression' | 'terminal' | 'physics';

interface LabSectionProps {
  activeTab?: LabTab;
  onTabChange?: (tab: LabTab) => void;
}

export const LabSection: React.FC<LabSectionProps> = ({
  activeTab: controlledTab,
  onTabChange,
}) => {
  const [internalTab, setInternalTab] = useState<LabTab>('sequence');
  const currentTab = controlledTab || internalTab;

  const handleTabSelect = (tab: LabTab) => {
    soundSynth.playClick();
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  const tabs = [
    { id: 'sequence' as LabTab, label: 'DNA Sequence Lab', icon: <Dna className="w-4 h-4" /> },
    { id: 'molecular' as LabTab, label: '3D Molecular Explorer', icon: <Atom className="w-4 h-4" /> },
    { id: 'expression' as LabTab, label: 'Gene Expression Heatmap', icon: <Activity className="w-4 h-4" /> },
    { id: 'terminal' as LabTab, label: 'Bioinformatics CLI', icon: <Terminal className="w-4 h-4" /> },
    { id: 'physics' as LabTab, label: 'Physics Collision Lab', icon: <Box className="w-4 h-4" /> },
  ];

  return (
    <SectionWrapper
      id="lab"
      title="Computational Biology Workstation"
      subtitle="Interactive, browser-based scientific tools operating locally without external API dependencies."
      badgeText="Live Research Suite"
      badgeColor="cyan"
    >
      {/* Workstation Tab Switcher Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 border-b border-white/10 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabSelect(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono tracking-wide transition-all ${
              currentTab === tab.id
                ? 'bg-bio-cyan/20 text-bio-cyan border border-bio-cyan shadow-[0_0_20px_rgba(0,240,255,0.25)] font-bold'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active Workstation Render */}
      <div className="relative z-10 transition-opacity duration-300">
        {currentTab === 'sequence' && <SequenceLab />}
        {currentTab === 'molecular' && <MolecularViewer />}
        {currentTab === 'expression' && <ExpressionExplorer />}
        {currentTab === 'terminal' && <BioinformaticsTerminal />}
        {currentTab === 'physics' && <CollisionPlayground />}
      </div>
    </SectionWrapper>
  );
};
