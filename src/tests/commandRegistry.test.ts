import { describe, it, expect } from 'vitest';
import { executeCommand } from '../science/terminal/commandRegistry';

describe('Bioinformatics Terminal Command Registry', () => {
  it('executes "help" command and lists command categories', () => {
    const res = executeCommand('help');
    expect(res.type).toBe('info');
    expect(res.lines.some((l) => l.includes('GENOMIC ANALYSIS'))).toBe(true);
  });

  it('executes "about" command with accurate student credentials', () => {
    const res = executeCommand('about');
    expect(res.type).toBe('success');
    expect(res.lines.some((l) => l.includes('Pritesh Mishra'))).toBe(true);
    expect(res.lines.some((l) => l.includes('Lovely Professional University'))).toBe(true);
  });

  it('executes "gc-content" on valid DNA sequence', () => {
    const res = executeCommand('gc-content GCGC');
    expect(res.type).toBe('success');
    expect(res.lines.some((l) => l.includes('100%'))).toBe(true);
  });

  it('executes "reverse-complement" on valid DNA sequence', () => {
    const res = executeCommand('reverse-complement ATGCC');
    expect(res.type).toBe('success');
    expect(res.lines.some((l) => l.includes('GGCAT'))).toBe(true);
  });

  it('handles invalid sequence error cleanly', () => {
    const res = executeCommand('gc-content ATGCZZ');
    expect(res.type).toBe('error');
    expect(res.lines[0]).toContain('Invalid');
  });

  it('handles unknown command gracefully without throwing', () => {
    const res = executeCommand('foobar_nonexistent');
    expect(res.type).toBe('error');
    expect(res.lines[0]).toContain('Command not recognized');
  });
});
