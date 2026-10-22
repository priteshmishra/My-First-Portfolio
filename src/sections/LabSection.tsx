import React, { useState } from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { InteractiveLab } from '../components/three/InteractiveLab';
import { validateSequence, analyzeSequence, SequenceAnalysis } from '../science/sequence/sequenceUtils';
import { Dna, Calculator, Copy, Check } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';

export const LabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'3d-lab' | 'sequence-lab'>('3d-lab');

  // Sequence Workbench State
  const sampleSequence =
    'ATGCGATCGATCGATCGATCGATCGATCGAATTCGCGCGCATATCGATCGATCGATCGATCGA';
  const [rawInput, setRawInput] = useState<string>(sampleSequence);
  const [analysis, setAnalysis] = useState<SequenceAnalysis | null>(() => {
    const val = validateSequence(sampleSequence);
    return val.isValid ? analyzeSequence(val.normalized) : null;
  });
  const [copied, setCopied] = useState<boolean>(false);

  const handleAnalyze = () => {
    const val = validateSequence(rawInput);
    if (val.isValid) {
      setAnalysis(analyzeSequence(val.normalized));
    }
  };

  const handleCopyReverseComplement = () => {
    if (analysis) {
      navigator.clipboard.writeText(analysis.reverseComplement);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="lab" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="Interactive Science Lab"
        title="Digital Laboratory Workbench"
        description="Functional computational biology tools featuring real-time 3D macromolecular visualization and algorithmic nucleotide sequence analysis."
      />

      {/* Lab Workstation Mode Switcher in Apple Frosted Glass */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-2xl glass-apple shadow-soft">
          <button
            onClick={() => setActiveTab('3d-lab')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTab === '3d-lab'
                ? 'bg-bio-cyan/20 text-bio-cyan-dark shadow-sm border border-bio-cyan/40 font-semibold'
                : 'text-slate-600 hover:text-bio-text'
            }`}
          >
            <Dna className="w-4 h-4 text-bio-cyan-dark" />
            <span>3D Macromolecular Visualizer</span>
          </button>

          <button
            onClick={() => setActiveTab('sequence-lab')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTab === 'sequence-lab'
                ? 'bg-bio-cyan/20 text-bio-cyan-dark shadow-sm border border-bio-cyan/40 font-semibold'
                : 'text-slate-600 hover:text-bio-text'
            }`}
          >
            <Calculator className="w-4 h-4 text-bio-violet" />
            <span>Sequence Analysis Tool</span>
          </button>
        </div>
      </div>

      {/* Tab 1: 3D Macromolecular Visualizer */}
      {activeTab === '3d-lab' && (
        <Reveal>
          <InteractiveLab />
        </Reveal>
      )}

      {/* Tab 2: Algorithmic Sequence Analysis Tool */}
      {activeTab === 'sequence-lab' && (
        <Reveal>
          <div className="glass-apple p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/60">
              <div>
                <h3 className="text-base font-bold text-bio-text font-mono flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-bio-violet" />
                  <span>Client-Side Nucleic Acid Sequence Analyzer</span>
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Local in-browser computation of nucleotide composition, GC/AT ratios, and reverse complementation.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => {
                    setRawInput(sampleSequence);
                    const val = validateSequence(sampleSequence);
                    if (val.isValid) setAnalysis(analyzeSequence(val.normalized));
                  }}
                  className="glass-apple-interactive"
                >
                  Load Sample FASTA
                </Button>
                <Button variant="primary" size="sm" onClick={handleAnalyze}>
                  Analyze Sequence
                </Button>
              </div>
            </div>

            {/* Input sequence textarea */}
            <div>
              <label htmlFor="fasta-input" className="block text-xs font-mono uppercase text-bio-muted font-bold mb-2">
                Input FASTA / DNA Sequence (5' to 3')
              </label>
              <textarea
                id="fasta-input"
                rows={3}
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-white/80 font-mono text-xs sm:text-sm text-bio-text glass-apple-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-cyan resize-y"
                placeholder="Paste DNA sequence here (e.g. ATGCGATCGATC...)"
              />
            </div>

            {/* Analysis Metrics Grid with Apple Frosted Glass */}
            {analysis && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl glass-apple-secondary text-center">
                    <span className="text-[10px] font-mono text-bio-muted uppercase block">Total Length</span>
                    <span className="text-lg font-bold font-mono text-bio-text">{analysis.length} bp</span>
                  </div>

                  <div className="p-3.5 rounded-xl glass-apple-secondary text-center">
                    <span className="text-[10px] font-mono text-bio-muted uppercase block">GC Content</span>
                    <span className="text-lg font-bold font-mono text-bio-cyan-dark">
                      {analysis.gcPercentage.toFixed(1)}%
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl glass-apple-secondary text-center">
                    <span className="text-[10px] font-mono text-bio-muted uppercase block">AT Content</span>
                    <span className="text-lg font-bold font-mono text-bio-violet">
                      {analysis.atPercentage.toFixed(1)}%
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl glass-apple-secondary text-center">
                    <span className="text-[10px] font-mono text-bio-muted uppercase block">Est. Mol. Weight</span>
                    <span className="text-lg font-bold font-mono text-slate-800">
                      {(analysis.molecularWeightGPerMol / 1000).toFixed(1)} kDa
                    </span>
                  </div>
                </div>

                {/* Nucleotide Breakdown */}
                <div className="p-4 rounded-xl glass-apple-secondary">
                  <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-3">
                    Nucleotide Distribution
                  </h4>
                  <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs">
                    <div className="p-2.5 rounded-xl bg-cyan-100/70 border border-cyan-200/80">
                      <span className="text-cyan-900 font-bold block">Adenine (A)</span>
                      <span className="text-sm font-extrabold text-cyan-950 mt-1 block">
                        {analysis.counts.A}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-100/70 border border-amber-200/80">
                      <span className="text-amber-900 font-bold block">Thymine (T)</span>
                      <span className="text-sm font-extrabold text-amber-950 mt-1 block">
                        {analysis.counts.T}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-purple-100/70 border border-purple-200/80">
                      <span className="text-purple-900 font-bold block">Guanine (G)</span>
                      <span className="text-sm font-extrabold text-purple-950 mt-1 block">
                        {analysis.counts.G}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-100/70 border border-emerald-200/80">
                      <span className="text-emerald-900 font-bold block">Cytosine (C)</span>
                      <span className="text-sm font-extrabold text-emerald-950 mt-1 block">
                        {analysis.counts.C}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reverse Complement Output */}
                <div className="p-4 rounded-xl glass-apple-secondary space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-700 uppercase">
                      Reverse Complement Strand (3' to 5' converted to 5' to 3')
                    </span>
                    <button
                      onClick={handleCopyReverseComplement}
                      className="text-xs font-mono text-bio-cyan-dark hover:text-cyan-800 flex items-center gap-1 focus-visible:underline cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 dark:bg-white/5 border border-white dark:border-white/10 font-mono text-xs text-bio-text break-all select-all shadow-inner">
                    {analysis.reverseComplement}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      )}
    </section>
  );
};
