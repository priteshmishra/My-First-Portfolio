export interface ValidationResult {
  isValid: boolean;
  normalized: string;
  cleanFastaHeader?: string;
  error?: string;
  invalidCharacters: string[];
}

export interface NucleotideCounts {
  A: number;
  T: number;
  G: number;
  C: number;
  other: number;
  total: number;
}

export interface SequenceAnalysis {
  length: number;
  counts: NucleotideCounts;
  gcPercentage: number;
  atPercentage: number;
  complement: string;
  reverseComplement: string;
  rnaSequence: string;
  molecularWeightGPerMol: number;
}

export interface MotifMatch {
  index: number; // 0-based
  position: number; // 1-based human display
  length: number;
  match: string;
}

const VALID_DNA_CHARS = new Set(['A', 'T', 'G', 'C', 'N', 'R', 'Y', 'S', 'W', 'K', 'M', 'B', 'D', 'H', 'V']);

/**
 * Normalizes input sequence: handles FASTA headers, strips whitespaces, converts to uppercase.
 */
export function validateSequence(rawInput: string): ValidationResult {
  if (!rawInput || rawInput.trim().length === 0) {
    return {
      isValid: false,
      normalized: '',
      error: 'Sequence input is empty. Please enter or paste nucleotide bases.',
      invalidCharacters: [],
    };
  }

  const lines = rawInput.trim().split(/\r?\n/);
  let header: string | undefined;
  let bodyLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('>')) {
      if (!header) header = trimmed.substring(1).trim();
    } else {
      bodyLines.push(trimmed);
    }
  }

  const normalized = bodyLines.join('').toUpperCase().replace(/[\s\t\r\n0-9-]/g, '');

  if (normalized.length === 0) {
    return {
      isValid: false,
      normalized: '',
      cleanFastaHeader: header,
      error: 'No nucleotide characters found after removing FASTA headers.',
      invalidCharacters: [],
    };
  }

  const invalidChars: string[] = [];
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    if (!VALID_DNA_CHARS.has(char)) {
      if (!invalidChars.includes(char)) {
        invalidChars.push(char);
      }
    }
  }

  if (invalidChars.length > 0) {
    return {
      isValid: false,
      normalized,
      cleanFastaHeader: header,
      error: `Invalid nucleotide character(s) detected: ${invalidChars.join(', ')}. Supported DNA bases are A, T, G, C (and IUPAC ambiguity codes).`,
      invalidCharacters: invalidChars,
    };
  }

  return {
    isValid: true,
    normalized,
    cleanFastaHeader: header,
    invalidCharacters: [],
  };
}

/**
 * Counts nucleotide frequencies.
 */
export function calculateNucleotideCounts(seq: string): NucleotideCounts {
  let A = 0, T = 0, G = 0, C = 0, other = 0;

  for (let i = 0; i < seq.length; i++) {
    const base = seq[i];
    if (base === 'A') A++;
    else if (base === 'T') T++;
    else if (base === 'G') G++;
    else if (base === 'C') C++;
    else other++;
  }

  return {
    A,
    T,
    G,
    C,
    other,
    total: seq.length,
  };
}

/**
 * Calculates GC% rounded to 2 decimal places.
 */
export function calculateGCPercentage(counts: NucleotideCounts): number {
  if (counts.total === 0) return 0;
  return Number((((counts.G + counts.C) / counts.total) * 100).toFixed(2));
}

/**
 * Calculates AT% rounded to 2 decimal places.
 */
export function calculateATPercentage(counts: NucleotideCounts): number {
  if (counts.total === 0) return 0;
  return Number((((counts.A + counts.T) / counts.total) * 100).toFixed(2));
}

const COMPLEMENT_MAP: Record<string, string> = {
  A: 'T',
  T: 'A',
  G: 'C',
  C: 'G',
  N: 'N',
  R: 'Y',
  Y: 'R',
  S: 'S',
  W: 'W',
  K: 'M',
  M: 'K',
  B: 'V',
  D: 'H',
  H: 'D',
  V: 'B',
};

/**
 * Computes complementary DNA strand (5' -> 3').
 */
export function calculateComplement(seq: string): string {
  let result = '';
  for (let i = 0; i < seq.length; i++) {
    const b = seq[i];
    result += COMPLEMENT_MAP[b] || 'N';
  }
  return result;
}

/**
 * Computes reverse complement DNA strand (3' -> 5' reversed).
 */
export function calculateReverseComplement(seq: string): string {
  const comp = calculateComplement(seq);
  return comp.split('').reverse().join('');
}

/**
 * Transcribes DNA to mRNA (T -> U).
 */
export function transcribeToRna(seq: string): string {
  return seq.replace(/T/g, 'U');
}

/**
 * Estimates single-stranded DNA molecular weight in g/mol (approximate anhydrous monophosphate).
 */
export function calculateMolecularWeight(counts: NucleotideCounts): number {
  const mwA = 313.21;
  const mwT = 304.2;
  const mwG = 329.21;
  const mwC = 289.18;
  const mwAvg = 308.95;

  const total = counts.A * mwA + counts.T * mwT + counts.G * mwG + counts.C * mwC + counts.other * mwAvg;
  return Math.round(total * 100) / 100;
}

/**
 * Comprehensive analysis runner.
 */
export function analyzeSequence(seq: string): SequenceAnalysis {
  const counts = calculateNucleotideCounts(seq);
  const gcPercentage = calculateGCPercentage(counts);
  const atPercentage = calculateATPercentage(counts);
  const complement = calculateComplement(seq);
  const reverseComplement = calculateReverseComplement(seq);
  const rnaSequence = transcribeToRna(seq);
  const molecularWeightGPerMol = calculateMolecularWeight(counts);

  return {
    length: seq.length,
    counts,
    gcPercentage,
    atPercentage,
    complement,
    reverseComplement,
    rnaSequence,
    molecularWeightGPerMol,
  };
}

/**
 * Searches for motif pattern (supports case-insensitive exact matching and basic regex).
 */
export function searchMotif(seq: string, rawPattern: string): { matches: MotifMatch[]; error?: string } {
  const pattern = rawPattern.trim();
  if (!pattern) return { matches: [] };

  try {
    const regex = new RegExp(pattern, 'gi');
    const matches: MotifMatch[] = [];
    let m: RegExpExecArray | null;

    // Guard against zero-length infinite match loops
    while ((m = regex.exec(seq)) !== null) {
      matches.push({
        index: m.index,
        position: m.index + 1,
        length: m[0].length,
        match: m[0],
      });
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
    }

    return { matches };
  } catch {
    return {
      matches: [],
      error: `Invalid regular expression pattern: "${rawPattern}".`,
    };
  }
}
