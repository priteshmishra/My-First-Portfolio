export type SkillStatus = 'Exploring' | 'Learning' | 'Practiced' | 'Demonstrated';
export type SkillCategory = 'Biotechnology' | 'Programming' | 'Bioinformatics' | 'Visualization';

export interface SkillNode {
  id: string;
  name: string;
  category: SkillCategory;
  status: SkillStatus;
  description: string;
  position3D: [number, number, number];
  connections: string[];
  evidenceOrProject?: string;
}

export const skillsData: SkillNode[] = [
  // Biotechnology
  {
    id: 'mol-bio',
    name: 'Molecular Biology',
    category: 'Biotechnology',
    status: 'Practiced',
    description: 'Understanding of nucleic acids, central dogma, replication fork dynamics, PCR principles, and recombinant DNA techniques.',
    position3D: [-3, 2, 0],
    connections: ['genetics', 'seq-analysis', 'biochem'],
    evidenceOrProject: 'Academic laboratory coursework and research notes.'
  },
  {
    id: 'genetics',
    name: 'Genetics & Genomics',
    category: 'Biotechnology',
    status: 'Practiced',
    description: 'Mendelian inheritance, chromosomal mapping, gene regulatory elements, operons, and single nucleotide polymorphisms (SNPs).',
    position3D: [-4, 0.5, 1.5],
    connections: ['mol-bio', 'seq-analysis', 'expr-analysis'],
    evidenceOrProject: 'Genomic coursework and DNA Sequence Lab analysis.'
  },
  {
    id: 'biochem',
    name: 'Biochemistry & Enzymology',
    category: 'Biotechnology',
    status: 'Practiced',
    description: 'Protein structural hierarchy, peptide bonds, Michaelis-Menten enzyme kinetics, allosteric regulation, and metabolic pathways.',
    position3D: [-2.5, -2, -1],
    connections: ['mol-bio', 'protein-struct'],
    evidenceOrProject: 'Enzyme kinetics calculations and academic coursework.'
  },

  // Programming & Computation
  {
    id: 'python',
    name: 'Python for Science',
    category: 'Programming',
    status: 'Demonstrated',
    description: 'Object-oriented programming, NumPy vectorization, Pandas DataFrames, BioPython sequence parsing, and regular expressions.',
    position3D: [0, 3, 2],
    connections: ['seq-analysis', 'data-viz', 'algorithms'],
    evidenceOrProject: 'Custom scripts in DNA Sequence Lab & Bioinformatics Terminal.'
  },
  {
    id: 'algorithms',
    name: 'Algorithms & Data Structures',
    category: 'Programming',
    status: 'Learning',
    description: 'Graph algorithms, dynamic programming, string matching (KMP, regex), hash maps, and computational complexity (Big O).',
    position3D: [1.5, 2, -2],
    connections: ['python', 'seq-analysis'],
    evidenceOrProject: 'Implementation of Needleman-Wunsch & motif searching.'
  },
  {
    id: 'linux-bash',
    name: 'Linux & Command Line',
    category: 'Programming',
    status: 'Practiced',
    description: 'Shell scripting, AWK/sed text filtering, Conda environment management, and remote compute access via SSH.',
    position3D: [-1, 3.5, -1],
    connections: ['python'],
    evidenceOrProject: 'Bioinformatics Terminal and shell automation workflows.'
  },

  // Bioinformatics
  {
    id: 'seq-analysis',
    name: 'Sequence Analysis',
    category: 'Bioinformatics',
    status: 'Demonstrated',
    description: 'Nucleotide frequency analysis, GC/AT skew, reverse complement, open reading frame (ORF) discovery, and motif identification.',
    position3D: [2, 0.5, 1],
    connections: ['mol-bio', 'genetics', 'python', 'expr-analysis'],
    evidenceOrProject: 'Integrated DNA Sequence Lab application.'
  },
  {
    id: 'protein-struct',
    name: 'Structural Bioinformatics',
    category: 'Bioinformatics',
    status: 'Practiced',
    description: 'PDB atomic coordinate parsing, secondary structure prediction, Ramachandran plot interpretation, and coordinate transformations.',
    position3D: [0, -2.5, 2],
    connections: ['biochem', 'webgl-3d'],
    evidenceOrProject: '3D Molecular Explorer workstation.'
  },
  {
    id: 'expr-analysis',
    name: 'Gene Expression & Heatmaps',
    category: 'Bioinformatics',
    status: 'Practiced',
    description: 'Log2 fold change, z-score matrix normalization, differential expression interpretation, and hierarchical heatmap visualization.',
    position3D: [3.5, -1, -1.5],
    connections: ['genetics', 'seq-analysis', 'data-viz'],
    evidenceOrProject: 'Interactive Gene Expression Explorer tool.'
  },
  {
    id: 'ngs-pipelines',
    name: 'NGS & Workflows (Nextflow)',
    category: 'Bioinformatics',
    status: 'Exploring',
    description: 'Understanding FASTQ quality trimming (FastQC, Trimmomatic), read alignment (BWA), and reproducible workflow pipelines.',
    position3D: [4, 1.5, -0.5],
    connections: ['linux-bash', 'seq-analysis'],
    evidenceOrProject: 'Planned future RNA-Seq pipeline project.'
  },

  // Visualization & Web
  {
    id: 'data-viz',
    name: 'Scientific Data Visualization',
    category: 'Visualization',
    status: 'Practiced',
    description: 'Heatmaps, volcano plots, genomic distribution charts, interactive matrices, and color scale theory for scientific publications.',
    position3D: [2, -3, 0],
    connections: ['python', 'expr-analysis', 'webgl-3d'],
    evidenceOrProject: 'Gene Expression Heatmap matrix component.'
  },
  {
    id: 'webgl-3d',
    name: '3D Scientific Graphics (Three.js)',
    category: 'Visualization',
    status: 'Demonstrated',
    description: 'React Three Fiber, custom shader materials, instanced particle buffers, procedural DNA geometry, and PDB molecular rendering.',
    position3D: [-0.5, -1, 3],
    connections: ['protein-struct', 'data-viz'],
    evidenceOrProject: 'BIOVERSE 3D Cell-to-Genome Experience.'
  }
];
