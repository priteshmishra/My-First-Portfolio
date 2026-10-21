export interface SampleSequence {
  id: string;
  name: string;
  organism: string;
  description: string;
  sequence: string;
  motifsOfInterest: {
    pattern: string;
    description: string;
  }[];
}

export const sampleSequences: SampleSequence[] = [
  {
    id: 'human-insulin',
    name: 'Human Insulin (INS) Exon 2 Snippet',
    organism: 'Homo sapiens',
    description: 'Coding segment of human insulin gene encoding the B-chain and C-peptide precursor.',
    sequence: 'ATGGCCCTGTGGATGCGCCTCCTGCCCCTGCTGGCGCTGCTGGCCCTCTGGGGACCTGACCCAGCCGCAGCCTTTGTGAACCAACACCTGTGCGGCTCACACCTGGTGGAAGCTCTCTACCTAGTGTGCGGGGAACGAGGCTTCTTCTACACACCCAAGACCCGCCGGGAGGCAGAGGACCTGCAG',
    motifsOfInterest: [
      { pattern: 'ATG', description: 'Canonical Start Codon (Methionine)' },
      { pattern: 'TGCGG', description: 'Conserved B-chain Cysteine region' },
      { pattern: 'CCTG', description: 'Proline-rich structural motif' }
    ]
  },
  {
    id: 'gfp-fluorophore',
    name: 'Green Fluorescent Protein (GFP) Core Triad',
    organism: 'Aequorea victoria',
    description: 'Central chromophore-forming segment (Ser65-Tyr66-Gly67) responsible for bioluminescence upon cyclization.',
    sequence: 'ATGAGTAAAGGAGAAGAACTTTTCACTGGAGTTGTCCCAATTCTTGTTGAATTAGATGGTGATGTTAATGGGCACAAATTTTCTGTCAGTGGAGAGGGTGAAGGTGATGCAACATACGGAAAACTTACCCTTAAATTTATTTGCACTACTGGAAAACTACCTGTTCCATGGCCAACACTTGTCACTACTTTCGGTTATGGTGTTCAATGCTTTGCG',
    motifsOfInterest: [
      { pattern: 'ATG', description: 'Start Codon' },
      { pattern: 'TACTTTCGG', description: 'Chromophore region (SYG triad)' },
      { pattern: 'GGAAAA', description: 'Flexible turn loop' }
    ]
  },
  {
    id: 'restriction-test',
    name: 'Synthetic Cloning Vector Oligo (Multiple Restriction Sites)',
    organism: 'Synthetic Construct',
    description: 'Laboratory multiple cloning site containing standard restriction endonuclease palindromes (EcoRI, BamHI, HindIII).',
    sequence: 'GAATTCGCGGCCGCGGATCCTCTAGAGTCGACCTGCAGGCATGCAAGCTT',
    motifsOfInterest: [
      { pattern: 'GAATTC', description: 'EcoRI Recognition Site (G^AATTC)' },
      { pattern: 'GGATCC', description: 'BamHI Recognition Site (G^GATCC)' },
      { pattern: 'AAGCTT', description: 'HindIII Recognition Site (A^AGCTT)' }
    ]
  },
  {
    id: 'sars-cov-2-rbd',
    name: 'SARS-CoV-2 Spike Receptor Binding Motif',
    organism: 'Severe acute respiratory syndrome coronavirus 2',
    description: 'Partial coding sequence of the Spike glycoprotein receptor binding motif interacting with human ACE2.',
    sequence: 'AATTACAACTACAAATACAAGTACCGTTACCGCAAACACTTTCGTTTGCGCCCAAACGAACGTTTGTTTCAAAATTTTCAAGATTACAACTTCACCGTTCCAAACAAATTTACTAAC',
    motifsOfInterest: [
      { pattern: 'TACAA', description: 'Tyrosine rich loop' },
      { pattern: 'CGT', description: 'Arginine codon motif' }
    ]
  }
];
