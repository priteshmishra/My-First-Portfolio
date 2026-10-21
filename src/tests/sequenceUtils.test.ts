import { describe, it, expect } from 'vitest';
import {
  validateSequence,
  calculateNucleotideCounts,
  calculateGCPercentage,
  calculateATPercentage,
  calculateComplement,
  calculateReverseComplement,
  searchMotif,
} from '../science/sequence/sequenceUtils';

describe('DNA Sequence Utilities', () => {
  it('validates and normalizes clean sequence', () => {
    const res = validateSequence('atgc');
    expect(res.isValid).toBe(true);
    expect(res.normalized).toBe('ATGC');
  });

  it('strips FASTA header lines and ignores whitespace', () => {
    const raw = '>sample_seq_1 Homo sapiens\nATG G CC \r\nT';
    const res = validateSequence(raw);
    expect(res.isValid).toBe(true);
    expect(res.normalized).toBe('ATGGCCT');
    expect(res.cleanFastaHeader).toBe('sample_seq_1 Homo sapiens');
  });

  it('detects invalid non-nucleotide characters and returns helpful errors', () => {
    const res = validateSequence('ATGZX9!');
    expect(res.isValid).toBe(false);
    expect(res.invalidCharacters).toContain('Z');
    expect(res.invalidCharacters).toContain('X');
    expect(res.invalidCharacters).toContain('!');
  });

  it('rejects empty input without throwing', () => {
    const res = validateSequence('');
    expect(res.isValid).toBe(false);
    expect(res.error).toBeDefined();
  });

  it('accurately counts nucleotide frequencies', () => {
    const counts = calculateNucleotideCounts('AATTGGCC');
    expect(counts.A).toBe(2);
    expect(counts.T).toBe(2);
    expect(counts.G).toBe(2);
    expect(counts.C).toBe(2);
    expect(counts.total).toBe(8);
  });

  it('calculates correct GC and AT percentages', () => {
    const counts = calculateNucleotideCounts('GGCC'); // 100% GC
    expect(calculateGCPercentage(counts)).toBe(100.0);
    expect(calculateATPercentage(counts)).toBe(0.0);

    const balanced = calculateNucleotideCounts('AGCT'); // 50% GC, 50% AT
    expect(calculateGCPercentage(balanced)).toBe(50.0);
    expect(calculateATPercentage(balanced)).toBe(50.0);
  });

  it('computes 5\'->3\' Watson-Crick complement', () => {
    expect(calculateComplement('ATGC')).toBe('TACG');
  });

  it('computes reverse complement with biological directionality', () => {
    // 5'-GAATTC-3' (EcoRI site is palindromic)
    expect(calculateReverseComplement('GAATTC')).toBe('GAATTC');
    // 5'-ATGCC-3' -> complement TACGG -> reverse GGCAT
    expect(calculateReverseComplement('ATGCC')).toBe('GGCAT');
  });

  it('searches for motif occurrences accurately', () => {
    const seq = 'GAATTCGCGGAATTC';
    const res = searchMotif(seq, 'GAATTC');
    expect(res.matches.length).toBe(2);
    expect(res.matches[0].position).toBe(1);
    expect(res.matches[1].position).toBe(10);
  });
});
