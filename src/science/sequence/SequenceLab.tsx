import React, { useState, useMemo } from 'react';
import {
  validateSequence,
  analyzeSequence,
  searchMotif,
  SequenceAnalysis,
} from './sequenceUtils';
import { sampleSequences } from '../../data/sampleSequences';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  Dna,
  Search,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  AlertCircle,
} from 'lucide-react';
import { soundSynth } from '../../audio/soundSynth';

export const SequenceLab: React.FC = () => {
  const [rawInput, setRawInput] = useState<string>(sampleSequences[0].sequence);
  const [motifQuery, setMotifQuery] = useState<string>('ATG');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Real-time validation and analysis
  const validation = useMemo(() => validateSequence(rawInput), [rawInput]);
  const analysis = useMemo<SequenceAnalysis | null>(() => {
    if (!validation.isValid) return null;
    return analyzeSequence(validation.normalized);
  }, [validation]);

  const motifResults = useMemo(() => {
    if (!validation.isValid || !motifQuery.trim()) return null;
    return searchMotif(validation.normalized, motifQuery.trim());
  }, [validation, motifQuery]);

  const handleCopy = (text: string, type: string) => {
    soundSynth.playClick();
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    });
  };

  const handleLoadSample = (seqStr: string, defaultMotif: string = 'ATG') => {
    soundSynth.playClick();
    setRawInput(seqStr);
    setMotifQuery(defaultMotif);
  };

  return (
    <div className="space-y-6">
      {/* Workstation Header & Sample Presets */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl bg-space-900/90 border border-white/10">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Dna className="w-5 h-5 text-bio-cyan" />
            <span>Interactive DNA Sequence Analysis Lab</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time algorithmic nucleotide stats, GC/AT skew, reverse complement, and motif pattern matching.
          </p>
        </div>

        {/* Preset Selectors */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-500">Load Preset:</span>
          {sampleSequences.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleLoadSample(sample.sequence, sample.motifsOfInterest[0]?.pattern || 'ATG')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                rawInput === sample.sequence
                  ? 'bg-bio-cyan/20 text-bio-cyan border border-bio-cyan/40'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-white/5'
              }`}
            >
              {sample.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field & Motif Search */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sequence Input Panel */}
        <div className="lg:col-span-7 space-y-4">
          <Card glowColor="cyan" className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="seq-input" className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <span>DNA Sequence (Raw or FASTA Format)</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundSynth.playClick();
                    setRawInput('');
                  }}
                  className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 font-mono"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            <textarea
              id="seq-input"
              rows={5}
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="Enter nucleotide sequence (A, T, G, C) or paste FASTA formatted text..."
              className="w-full p-3 rounded-lg bg-space-950 font-mono text-xs sm:text-sm text-slate-200 border border-white/10 focus:border-bio-cyan focus:outline-none focus:ring-1 focus:ring-bio-cyan resize-none transition-colors"
            />

            {/* Validation Message */}
            {!validation.isValid ? (
              <div className="mt-2.5 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{validation.error}</span>
              </div>
            ) : (
              <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Valid DNA strand: {validation.normalized.length} base pairs</span>
                {validation.cleanFastaHeader && (
                  <span className="text-bio-cyan truncate max-w-xs">&gt; {validation.cleanFastaHeader}</span>
                )}
              </div>
            )}

            {/* Motif Search Tool */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="motif-query" className="text-xs font-mono uppercase tracking-wider text-bio-cyan flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" />
                  <span>Motif / Restriction Pattern Search</span>
                </label>
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                  <span>Presets:</span>
                  {['ATG', 'GAATTC', 'GGATCC', 'TATA'].map((pat) => (
                    <button
                      key={pat}
                      onClick={() => {
                        soundSynth.playClick();
                        setMotifQuery(pat);
                      }}
                      className="px-1.5 py-0.5 rounded bg-slate-800 hover:text-white"
                    >
                      {pat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <input
                  id="motif-query"
                  type="text"
                  value={motifQuery}
                  onChange={(e) => setMotifQuery(e.target.value)}
                  placeholder="Enter pattern (e.g. EcoRI site: GAATTC, Start: ATG, or Regex)..."
                  className="w-full pl-3 pr-24 py-2 rounded-lg bg-space-950 font-mono text-xs text-white border border-white/10 focus:border-bio-cyan focus:outline-none focus:ring-1 focus:ring-bio-cyan"
                />
                {motifResults && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono text-bio-cyan">
                    {motifResults.matches.length} Match{motifResults.matches.length === 1 ? '' : 'es'}
                  </span>
                )}
              </div>

              {motifResults?.matches && motifResults.matches.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {motifResults.matches.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-bio-cyan/15 border border-bio-cyan/30 text-bio-cyan text-[11px] font-mono"
                    >
                      Pos {m.position} [{m.match}]
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Statistical Summary Panel */}
        <div className="lg:col-span-5 space-y-4">
          <Card glowColor="violet" className="p-4 sm:p-5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-bio-violet mb-3">
              Genomic Metrics & Statistics
            </h4>

            {analysis ? (
              <div className="space-y-4">
                {/* Length & GC/AT Ratios */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-white/5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Sequence Length</span>
                    <p className="text-xl font-bold text-white font-mono">{analysis.length} bp</p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/80 border border-white/5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Est. Molecular Wt</span>
                    <p className="text-xl font-bold text-bio-cyan font-mono">
                      {(analysis.molecularWeightGPerMol / 1000).toFixed(2)} kDa
                    </p>
                  </div>
                </div>

                {/* GC vs AT Progress Bar */}
                <div className="p-3 rounded-lg bg-slate-900/80 border border-white/5">
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-bio-cyan">GC: {analysis.gcPercentage}%</span>
                    <span className="text-amber-400">AT: {analysis.atPercentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
                    <div
                      style={{ width: `${analysis.gcPercentage}%` }}
                      className="h-full bg-bio-cyan transition-all duration-300"
                    />
                    <div
                      style={{ width: `${analysis.atPercentage}%` }}
                      className="h-full bg-amber-400 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Individual Base Frequencies */}
                <div className="grid grid-cols-4 gap-2 text-center font-mono">
                  <div className="p-2 rounded bg-slate-800/80 border border-emerald-500/20">
                    <span className="text-xs text-emerald-400 font-bold">A</span>
                    <p className="text-sm text-white">{analysis.counts.A}</p>
                  </div>
                  <div className="p-2 rounded bg-slate-800/80 border border-rose-500/20">
                    <span className="text-xs text-rose-400 font-bold">T</span>
                    <p className="text-sm text-white">{analysis.counts.T}</p>
                  </div>
                  <div className="p-2 rounded bg-slate-800/80 border border-amber-500/20">
                    <span className="text-xs text-amber-400 font-bold">G</span>
                    <p className="text-sm text-white">{analysis.counts.G}</p>
                  </div>
                  <div className="p-2 rounded bg-slate-800/80 border border-bio-cyan/20">
                    <span className="text-xs text-bio-cyan font-bold">C</span>
                    <p className="text-sm text-white">{analysis.counts.C}</p>
                  </div>
                </div>

                {/* Reverse Complement with Copy Action */}
                <div className="p-3 rounded-lg bg-slate-900/80 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-bio-violet uppercase">
                      5' &rarr; 3' Reverse Complement
                    </span>
                    <button
                      onClick={() => handleCopy(analysis.reverseComplement, 'revcomp')}
                      className="text-xs text-bio-cyan hover:underline flex items-center gap-1 font-mono"
                    >
                      {copiedType === 'revcomp' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedType === 'revcomp' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs font-mono text-slate-300 break-all select-all bg-space-950 p-2 rounded border border-white/5 max-h-20 overflow-y-auto">
                    {analysis.reverseComplement}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-slate-500 font-mono">
                Awaiting valid nucleotide sequence input.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
