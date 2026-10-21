import { GeneExpressionEntry, expressionConditions } from '../../data/sampleExpressionData';

export interface ExpressionStatistics {
  minFoldChange: number;
  maxFoldChange: number;
  maxAbsFoldChange: number;
  upRegulatedCount: number;
  downRegulatedCount: number;
  neutralCount: number;
  totalDataPoints: number;
}

export function computeExpressionStatistics(data: GeneExpressionEntry[]): ExpressionStatistics {
  let min = Infinity;
  let max = -Infinity;
  let up = 0;
  let down = 0;
  let neutral = 0;
  let total = 0;

  for (const row of data) {
    for (const cond of expressionConditions) {
      const val = row.conditions[cond.id];
      if (val !== undefined) {
        total++;
        if (val < min) min = val;
        if (val > max) max = val;

        if (val > 0.5) up++;
        else if (val < -0.5) down++;
        else neutral++;
      }
    }
  }

  const maxAbs = Math.max(Math.abs(min === Infinity ? 0 : min), Math.abs(max === -Infinity ? 0 : max), 1);

  return {
    minFoldChange: min === Infinity ? 0 : min,
    maxFoldChange: max === -Infinity ? 0 : max,
    maxAbsFoldChange: maxAbs,
    upRegulatedCount: up,
    downRegulatedCount: down,
    neutralCount: neutral,
    totalDataPoints: total,
  };
}

/**
 * Returns an RGB / RGBA color string for a given log2 fold change value.
 * Negative: Cyan spectrum (#00f0ff)
 * Zero / neutral: Dark slate (#1e293b)
 * Positive: Violet spectrum (#a855f7 / #c084fc)
 */
export function getExpressionColor(value: number, maxAbs: number): string {
  if (value === 0) return 'rgba(30, 41, 59, 0.7)';

  const normalized = Math.min(Math.abs(value) / maxAbs, 1);
  const opacity = 0.25 + normalized * 0.75;

  if (value > 0) {
    // Violet / Ultraviolet up-regulation: rgb(168, 85, 247)
    return `rgba(168, 85, 247, ${opacity.toFixed(2)})`;
  } else {
    // Cyan down-regulation: rgb(0, 240, 255)
    return `rgba(0, 240, 255, ${opacity.toFixed(2)})`;
  }
}
