import React, { useState, useMemo } from 'react';
import {
  sampleExpressionData,
  expressionConditions,
  GeneExpressionEntry,
  ConditionInfo,
} from '../../data/sampleExpressionData';
import {
  computeExpressionStatistics,
  getExpressionColor,
} from './expressionUtils';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  Activity,
  Search,
  RotateCcw,
  Info,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
} from 'lucide-react';
import { soundSynth } from '../../audio/soundSynth';

export const ExpressionExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredCell, setHoveredCell] = useState<{
    gene: GeneExpressionEntry;
    condition: ConditionInfo;
    value: number;
  } | null>(null);
  const [selectedGene, setSelectedGene] = useState<string | null>(null);

  const stats = useMemo(() => computeExpressionStatistics(sampleExpressionData), []);

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return sampleExpressionData;
    return sampleExpressionData.filter(
      (entry) =>
        entry.gene.toLowerCase().includes(q) ||
        entry.name.toLowerCase().includes(q) ||
        entry.functionCategory.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl bg-space-900/90 border border-white/10">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-bio-cyan" />
            <span>Transcriptomic Expression Heatmap Explorer</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Differential log2 fold-change matrix across biological stress, hypoxia, starvation, and drug responses.
          </p>
        </div>

        {/* Search & Reset */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gene or function..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-space-950 font-mono text-xs text-white border border-white/10 focus:border-bio-cyan focus:outline-none"
            />
          </div>

          <button
            onClick={() => {
              soundSynth.playClick();
              setSearchQuery('');
              setSelectedGene(null);
              setHoveredCell(null);
            }}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-white/5"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-bio-violet/15 text-bio-violet flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Up-Regulated</span>
            <span className="text-sm sm:text-base font-bold text-white font-mono">
              {stats.upRegulatedCount} <span className="text-xs text-slate-500">cells (&gt;0.5)</span>
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-bio-cyan/15 text-bio-cyan flex items-center justify-center shrink-0">
            <TrendingDown className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Down-Regulated</span>
            <span className="text-sm sm:text-base font-bold text-white font-mono">
              {stats.downRegulatedCount} <span className="text-xs text-slate-500">cells (&lt;-0.5)</span>
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center shrink-0">
            <Minus className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Baseline Neutral</span>
            <span className="text-sm sm:text-base font-bold text-white font-mono">
              {stats.neutralCount} <span className="text-xs text-slate-500">cells (&plusmn;0.5)</span>
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-bio-cyan/15 text-bio-cyan flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Dynamic Range</span>
            <span className="text-xs sm:text-sm font-bold text-white font-mono">
              [{stats.minFoldChange.toFixed(1)}, +{stats.maxFoldChange.toFixed(1)}] Log2
            </span>
          </div>
        </div>
      </div>

      {/* Main Heatmap Matrix */}
      <Card glowColor="cyan" className="p-4 sm:p-6 overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Header Row: Condition Labels */}
          <div className="grid grid-cols-12 gap-1 mb-2 items-end">
            <div className="col-span-4 text-xs font-mono uppercase tracking-wider text-slate-400 pb-2">
              Gene Symbol & Baseline FPKM
            </div>
            {expressionConditions.map((cond) => (
              <div
                key={cond.id}
                className="col-span-1 text-center font-mono text-[10px] text-slate-400 pb-2 truncate"
                title={`${cond.label}: ${cond.description}`}
              >
                {cond.label.split(' ')[0]}
              </div>
            ))}
          </div>

          {/* Gene Rows */}
          <div className="space-y-1.5">
            {filteredData.map((row) => (
              <div
                key={row.gene}
                onClick={() => {
                  soundSynth.playClick();
                  setSelectedGene(selectedGene === row.gene ? null : row.gene);
                }}
                className={`grid grid-cols-12 gap-1 items-center p-1.5 rounded-lg cursor-pointer transition-colors ${
                  selectedGene === row.gene
                    ? 'bg-white/10 ring-1 ring-bio-cyan'
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Gene Info Column */}
                <div className="col-span-4 flex items-center justify-between pr-2">
                  <div>
                    <span className="text-xs font-bold text-white font-mono">{row.gene}</span>
                    <span className="text-[10px] text-slate-400 block truncate max-w-[180px]">
                      {row.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {row.baselineFPKM.toFixed(0)} FPKM
                  </span>
                </div>

                {/* Condition Value Cells */}
                {expressionConditions.map((cond) => {
                  const val = row.conditions[cond.id] ?? 0;
                  const bg = getExpressionColor(val, stats.maxAbsFoldChange);

                  return (
                    <div
                      key={cond.id}
                      onMouseEnter={() => {
                        soundSynth.playClick();
                        setHoveredCell({ gene: row, condition: cond, value: val });
                      }}
                      onMouseLeave={() => setHoveredCell(null)}
                      style={{ backgroundColor: bg }}
                      className="col-span-1 h-8 rounded flex items-center justify-center font-mono text-[11px] font-medium text-white transition-transform hover:scale-110 hover:z-10 relative shadow-sm border border-black/20"
                    >
                      {val > 0 ? `+${val.toFixed(1)}` : val.toFixed(1)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap Legend */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-bio-cyan">-4.0 (Down-Regulated)</span>
            <div className="w-32 h-3 rounded-full bg-gradient-to-r from-bio-cyan via-slate-800 to-bio-violet" />
            <span className="text-bio-violet">+4.0 (Up-Regulated)</span>
          </div>

          <div className="text-slate-500 text-[11px]">
            Values represent log2(Treatment / Control).
          </div>
        </div>
      </Card>

      {/* Tooltip Inspector */}
      {hoveredCell && (
        <div className="p-4 rounded-xl bg-space-900 border border-bio-cyan/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div>
            <span className="text-bio-cyan font-bold text-sm">{hoveredCell.gene.gene}</span> &bull; {hoveredCell.gene.name} ({hoveredCell.gene.functionCategory})
            <p className="text-slate-300 text-xs mt-0.5">
              Condition: <strong className="text-white">{hoveredCell.condition.label}</strong> — {hoveredCell.condition.description}
            </p>
          </div>
          <div className="shrink-0 p-2 rounded bg-space-950 border border-white/10 text-right">
            <span className="text-slate-400 block text-[10px]">Log2 Fold Change:</span>
            <span className={`text-base font-bold ${hoveredCell.value > 0 ? 'text-bio-violet' : hoveredCell.value < 0 ? 'text-bio-cyan' : 'text-slate-300'}`}>
              {hoveredCell.value > 0 ? `+${hoveredCell.value.toFixed(2)}` : hoveredCell.value.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Educational Sample Data Disclaimer */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-400 flex items-start gap-2 leading-relaxed">
        <Info className="w-4 h-4 text-bio-cyan shrink-0 mt-0.5" />
        <span>
          <strong>Scientific Integrity Disclosure:</strong> This expression matrix consists of curated biological benchmark genes demonstrating typical mammalian transcriptional responses (e.g. heat shock chaperones, hypoxia-inducible factors, oxidative defenses) for educational exploration. It is not derived from clinical patient diagnostic assays.
        </span>
      </div>
    </div>
  );
};
