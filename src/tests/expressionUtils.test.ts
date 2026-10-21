import { describe, it, expect } from 'vitest';
import { computeExpressionStatistics, getExpressionColor } from '../science/expression/expressionUtils';
import { sampleExpressionData } from '../data/sampleExpressionData';

describe('Gene Expression Utilities', () => {
  it('computes valid expression statistics from dataset', () => {
    const stats = computeExpressionStatistics(sampleExpressionData);
    expect(stats.totalDataPoints).toBeGreaterThan(0);
    expect(stats.maxFoldChange).toBeGreaterThan(0);
    expect(stats.minFoldChange).toBeLessThan(0);
    expect(stats.maxAbsFoldChange).toBeGreaterThan(0);
  });

  it('generates appropriate color tints based on regulation direction', () => {
    const upColor = getExpressionColor(2.5, 4.0);
    const downColor = getExpressionColor(-2.5, 4.0);
    const neutralColor = getExpressionColor(0, 4.0);

    expect(upColor).toContain('168, 85, 247'); // Violet for up-regulation
    expect(downColor).toContain('0, 240, 255'); // Cyan for down-regulation
    expect(neutralColor).toContain('30, 41, 59'); // Slate for neutral
  });
});
