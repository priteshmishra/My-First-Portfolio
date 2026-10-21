import React from 'react';
import { JourneyStage } from './MasterCanvas';
import { Button } from '../components/ui/Button';
import { ChevronLeft, ChevronRight, Compass, Sparkles, X } from 'lucide-react';
import { soundSynth } from '../audio/soundSynth';

interface JourneyControllerProps {
  currentStage: JourneyStage;
  onChangeStage: (stage: JourneyStage) => void;
  onExitToLab: () => void;
  onCloseJourney: () => void;
}

export const JourneyController: React.FC<JourneyControllerProps> = ({
  currentStage,
  onChangeStage,
  onExitToLab,
  onCloseJourney,
}) => {
  const stages: { id: JourneyStage; label: string; desc: string }[] = [
    { id: 'cellular', label: 'Cellular Environment', desc: 'Stage A: Translucent cell floating in biological space with membrane & organelles.' },
    { id: 'membrane', label: 'Membrane Penetration', desc: 'Stage B: Approaching the amphipathic phospholipid bilayer.' },
    { id: 'nucleus', label: 'The Nucleus', desc: 'Stage C: Entering the nuclear envelope housing chromosomal chromatin.' },
    { id: 'dna', label: 'DNA Double Helix', desc: 'Stage D: Procedural antiparallel strands with A-T & G-C complementary base pairing.' },
    { id: 'ambient', label: 'Computational Lab', desc: 'Stage E/F: Transition into algorithmic sequence analysis & research workstations.' },
  ];

  const currentIdx = stages.findIndex((s) => s.id === currentStage);

  const handleNext = () => {
    soundSynth.playClick();
    if (currentIdx < stages.length - 1) {
      onChangeStage(stages[currentIdx + 1].id);
    } else {
      onExitToLab();
    }
  };

  const handlePrev = () => {
    soundSynth.playClick();
    if (currentIdx > 0) {
      onChangeStage(stages[currentIdx - 1].id);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl bg-space-950/90 border border-bio-cyan/40 p-4 rounded-2xl shadow-[0_0_40px_rgba(0,240,255,0.2)] backdrop-blur-xl animate-fade-in">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-bio-cyan animate-ping" />
          <span className="text-xs font-mono font-bold text-bio-cyan uppercase tracking-wider">
            Cell-to-Genome Biological Journey
          </span>
        </div>

        <button
          onClick={onCloseJourney}
          aria-label="Close journey mode"
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Step Indicator Bubbles */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {stages.map((st, idx) => (
            <button
              key={st.id}
              onClick={() => {
                soundSynth.playClick();
                onChangeStage(st.id);
              }}
              title={st.label}
              className={`h-2 rounded-full transition-all ${
                currentIdx === idx
                  ? 'w-8 bg-bio-cyan shadow-[0_0_10px_rgba(0,240,255,0.6)]'
                  : currentIdx > idx
                  ? 'w-3 bg-bio-violet/60'
                  : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Stage Name & Summary */}
        <div className="flex-1 text-center hidden sm:block">
          <h4 className="text-xs font-bold text-white font-mono">{stages[currentIdx]?.label}</h4>
          <p className="text-[11px] text-slate-400 truncate max-w-xs mx-auto">
            {stages[currentIdx]?.desc}
          </p>
        </div>

        {/* Prev / Next Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="glass"
            size="sm"
            onClick={handlePrev}
            disabled={currentIdx === 0}
            icon={<ChevronLeft className="w-4 h-4" />}
          >
            Prev
          </Button>

          <Button
            variant="cyan"
            size="sm"
            onClick={handleNext}
            icon={<ChevronRight className="w-4 h-4" />}
          >
            {currentIdx === stages.length - 1 ? 'Enter Lab' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};
