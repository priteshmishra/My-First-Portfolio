export interface ResearchEntry {
  id: string;
  title: string;
  category: 'Molecular Biology' | 'Genomics' | 'Sequence Algorithms' | 'Structural Biology';
  date: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  references: {
    citation: string;
    doiOrUrl?: string;
  }[];
  relatedSkills: string[];
}

export const researchData: ResearchEntry[] = [
  {
    id: 'central-dogma-mechanics',
    title: 'The Central Dogma & Directional Information Flow',
    category: 'Molecular Biology',
    date: 'February 2025',
    summary: 'A study of information transfer from nucleic acid sequence to polypeptide structure, detailing transcriptional fidelity and codon degeneracy.',
    content: [
      'The central dogma of molecular biology, first formulated by Francis Crick in 1958, describes the detailed residue-by-residue transfer of sequential genetic information.',
      'Information is encoded in the antiparallel double-stranded DNA deoxyribose phosphate polymer, where 5\' to 3\' orientation governs replication by DNA polymerases and asymmetric transcription by RNA polymerase.',
      'During translation, mRNA triplets (codons) are deciphered by aminoacyl-tRNA molecules according to the universal genetic code. The degeneracy of the code provides mutational buffering, particularly at the third nucleotide "wobble" position.',
      'In computational biology, this directional flow forms the foundation of sequence search, open reading frame (ORF) discovery, and codon optimization algorithms.'
    ],
    keyTakeaways: [
      'Nucleic acid directionality (5\' to 3\') dictates computational sequence processing order.',
      'Codon degeneracy (64 codons for 20 amino acids + 3 stops) creates synonymous variation without protein sequence alterations.',
      'Reverse-complement transformations must invert both nucleotide pairing (A-T, G-C) and linear string indexing.'
    ],
    references: [
      {
        citation: 'Crick, F. (1970). Central dogma of molecular biology. Nature, 227(5258), 561-563.',
        doiOrUrl: 'https://doi.org/10.1038/227561a0'
      },
      {
        citation: 'Watson, J. D., & Crick, F. H. (1953). Molecular structure of nucleic acids: a structure for deoxyribose nucleic acid. Nature, 171(4356), 737-738.',
        doiOrUrl: 'https://doi.org/10.1038/171737a0'
      }
    ],
    relatedSkills: ['Molecular Biology', 'Sequence Analysis', 'Python for Science']
  },
  {
    id: 'sequence-alignment-algorithms',
    title: 'Dynamic Programming in Sequence Alignment: Needleman-Wunsch & Smith-Waterman',
    category: 'Sequence Algorithms',
    date: 'March 2025',
    summary: 'Comparative analysis of global vs. local sequence alignment algorithms, matrix scoring systems (BLOSUM62/PAM250), and affine gap penalties.',
    content: [
      'Sequence alignment is the bedrock of comparative genomics. Determining evolutionary homology or functional conservation requires aligning biological sequences while accounting for insertions, deletions, and substitutions.',
      'The Needleman-Wunsch algorithm (1970) solves global alignment by constructing an (N+1) x (M+1) score matrix via dynamic programming. It guarantees finding the optimal alignment across the entire length of both sequences.',
      'The Smith-Waterman algorithm (1981) adapts this framework for local alignment by introducing a reset condition (max(0, ...)), allowing identification of highly conserved domains or motifs within divergent flanking regions.',
      'Gap scoring models significantly impact alignment quality: affine gap penalties (higher penalty for gap opening, lower penalty for gap extension) better reflect the biological reality that a single mutational event can introduce a multi-nucleotide insertion or deletion.'
    ],
    keyTakeaways: [
      'Global alignment (Needleman-Wunsch) is suitable for homologous genes of similar length.',
      'Local alignment (Smith-Waterman) identifies conserved structural motifs within disparate genetic backgrounds.',
      'Affine gap scoring [Gap Cost = Open + (Length - 1) * Extend] prevents over-fragmentation of alignments.'
    ],
    references: [
      {
        citation: 'Needleman, S. B., & Wunsch, C. D. (1970). A general method applicable to the search for similarities in the amino acid sequence of two proteins. Journal of Molecular Biology, 48(3), 443-453.',
        doiOrUrl: 'https://doi.org/10.1016/0022-2836(70)90057-4'
      },
      {
        citation: 'Smith, T. F., & Waterman, M. S. (1981). Identification of common molecular subsequences. Journal of Molecular Biology, 147(1), 195-197.',
        doiOrUrl: 'https://doi.org/10.1016/0022-2836(81)90087-5'
      }
    ],
    relatedSkills: ['Algorithms & Data Structures', 'Sequence Analysis', 'Python for Science']
  },
  {
    id: 'blast-heuristics',
    title: 'Heuristic Database Searching: The Architecture of BLAST',
    category: 'Sequence Algorithms',
    date: 'April 2025',
    summary: 'How the Basic Local Alignment Search Tool achieves 50x speedups over rigorous dynamic programming through k-mer seeding and high-scoring pair extension.',
    content: [
      'While dynamic programming guarantees mathematical optimality, its O(N x M) time complexity becomes computationally intractable when searching queries against millions of sequences in GenBank or UniProt.',
      'Altschul et al. (1990) introduced BLAST (Basic Local Alignment Search Tool), which uses an ingenious heuristic approach: breaking sequences into fixed-length "words" (k-mers, typically k=3 for protein, k=11 for nucleotide) and pre-indexing them.',
      'When an exact or neighborhood word match is detected between the query and target database, BLAST triggers an ungapped two-directional extension to generate High-Scoring Segment Pairs (HSPs).',
      'The statistical significance of alignments is rigorously assessed using Karlin-Altschul statistics to compute the Expectation value (E-value) — the number of hits expected by chance alone given database size.'
    ],
    keyTakeaways: [
      'BLAST sacrifices mathematical optimality guarantee to achieve massive speed improvements suitable for gigabase databases.',
      'The E-value represents statistical significance: E-values close to zero (e.g. 1e-50) indicate non-random evolutionary homology.',
      'Two-hit thresholding in BLAST+ further prunes spurious seed extensions.'
    ],
    references: [
      {
        citation: 'Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410.',
        doiOrUrl: 'https://doi.org/10.1016/S0022-2836(05)80360-2'
      }
    ],
    relatedSkills: ['Sequence Analysis', 'Bioinformatics', 'Algorithms & Data Structures']
  },
  {
    id: 'protein-pdb-coordinates',
    title: '3D Macromolecular Coordinates: Parsing and Visualizing the PDB Format',
    category: 'Structural Biology',
    date: 'May 2025',
    summary: 'Coordinate systems, orthogonal angstrom measurements, ATOM vs HETATM records, and structural representations in structural biology.',
    content: [
      'The Protein Data Bank (PDB), founded in 1971 at Brookhaven National Laboratory and managed today by the Worldwide PDB (wwPDB), is the global repository of experimentally determined 3D structures (X-ray crystallography, cryo-EM, and NMR).',
      'The standard legacy PDB flat-file format organizes atomic coordinates in rigid 80-character column records: columns 31-38 (X), 39-46 (Y), and 47-54 (Z) represent orthogonal Cartesian coordinates in Angstroms (1 A = 0.1 nm).',
      'ATOM records define standard polypeptide or nucleic acid atoms, while HETATM (heteroatom) records define non-polymer entities such as crystallized water molecules, metal ions (e.g. Zn2+, Mg2+), and organic ligands.',
      'Interactive 3D visualization requires parsing these Cartesian coordinates into WebGL buffer attributes, calculating covalent bond graphs via proximity distance matrices (typically 1.2 A to 1.8 A), and generating secondary structure ribbon splines through alpha-carbon (CA) coordinates.'
    ],
    keyTakeaways: [
      'PDB coordinates are specified in Angstroms relative to an arbitrary crystallographic origin.',
      'CPK color standardization provides immediate intuitive recognition of chemical elements across visualizations.',
      'Ribbon diagrams provide clarity by abstracting thousands of individual atoms into smooth secondary structure paths.'
    ],
    references: [
      {
        citation: 'Berman, H. M., et al. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242.',
        doiOrUrl: 'https://doi.org/10.1093/nar/28.1.235'
      }
    ],
    relatedSkills: ['Structural Bioinformatics', '3D Scientific Graphics (Three.js)', 'Biochemistry & Enzymology']
  }
];
