export type ProjectStatus = 'Planned' | 'In progress' | 'Learning' | 'Completed';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  status: ProjectStatus;
  summary: string;
  objective: string;
  scientificQuestion: string;
  proposedMethods: string[];
  expectedLearningOutcomes: string[];
  toolsPlanned: string[];
  repositoryUrl?: string; // Future field when code is pushed
  liveDemoUrl?: string;   // Future field when deployed
}

export const projectsData: ProjectItem[] = [
  {
    id: 'dna-sequence-explorer',
    title: 'DNA Sequence Explorer',
    category: 'Bioinformatics & Sequence Analysis',
    status: 'Planned',
    summary:
      'A learning project to visualize DNA sequences, nucleotide composition, and simple sequence statistics in a browser interface.',
    objective:
      'Design a lightweight, client-side utility to input DNA/RNA FASTA sequences and calculate basic sequence properties including GC/AT percentage, sequence length, and reverse complement generation.',
    scientificQuestion:
      'How does nucleotide composition (such as GC-skew and GC-content) vary across different functional genomic regions, and how can real-time calculation aid early sequence analysis?',
    proposedMethods: [
      'Implement string parsing algorithms for standard FASTA formats and IUPAC nucleotide symbols.',
      'Compute base frequencies, GC percentage, and molecular weight approximations client-side.',
      'Generate complementary and reverse-complement strands adhering to 5\' to 3\' orientation conventions.',
      'Create an uncluttered interactive sequence viewer with highlighted motifs and base-color indicators.'
    ],
    expectedLearningOutcomes: [
      'Master fundamental nucleic acid sequence representations and string manipulation algorithms.',
      'Understand the biological relevance of GC-content in thermodynamic stability and PCR primer design.',
      'Gain practical experience developing responsive, accessible scientific user interfaces.'
    ],
    toolsPlanned: ['TypeScript', 'React', 'Tailwind CSS', 'Vitest'],
    repositoryUrl: undefined,
    liveDemoUrl: undefined
  },
  {
    id: 'protein-structure-explorer',
    title: 'Protein Structure Explorer',
    category: 'Structural Biology & 3D Visualization',
    status: 'Planned',
    summary:
      'A learning project to inspect a molecular structure and explain its biological components in 3D.',
    objective:
      'Develop an interactive 3D macromolecular viewer using WebGL/Three.js to parse Protein Data Bank (PDB) atomic coordinates and visualize primary, secondary, and tertiary protein structural motifs.',
    scientificQuestion:
      'How do specific spatial arrangements of secondary structural elements (such as alpha helices and beta sheets) stabilize the 3D conformation of functional proteins?',
    proposedMethods: [
      'Parse standard PDB file records (ATOM, HETATM, CONECT) to extract 3D Cartesian coordinates and atom types.',
      'Render 3D spatial representations including stick, sphere (van der Waals), and simplified backbone ribbons.',
      'Implement color-coding schemes by standard CPK chemical elements, residue polarity, and secondary structure.',
      'Provide interactive camera controls (orbital rotation, pan, zoom) with reset and residue inspection callouts.'
    ],
    expectedLearningOutcomes: [
      'Understand 3D coordinate geometry, bond angles, and macromolecular file specifications (PDB/mmCIF).',
      'Learn modern WebGL rendering pipelines, scene graphs, and performance optimization techniques.',
      'Deepen conceptual grasp of protein folding and non-covalent interactions (hydrogen bonds, hydrophobic effects).'
    ],
    toolsPlanned: ['Three.js', 'React Three Fiber', 'PDB Coordinate Parser', 'TypeScript'],
    repositoryUrl: undefined,
    liveDemoUrl: undefined
  },
  {
    id: 'biological-data-visualization',
    title: 'Biological Data Visualization',
    category: 'Computational Biology & Data Science',
    status: 'Planned',
    summary:
      'A learning project to transform a small, publicly available biological dataset into an understandable chart.',
    objective:
      'Analyze an open-source biological dataset (such as microbial growth curves, enzyme kinetics data, or gene expression matrices) and construct clear, honest, and accessible scientific charts.',
    scientificQuestion:
      'How can statistical visualization techniques accurately represent experimental variability and non-linear biological kinetics without introducing visual distortion?',
    proposedMethods: [
      'Clean and normalize raw tabular data using Python/Pandas and convert to structured JSON format.',
      'Generate responsive scatter plots, curve-fits (e.g. Michaelis-Menten enzyme kinetics), and heatmaps.',
      'Incorporate accessible data tables, high-contrast color palettes, and interactive tooltips for data inspection.',
      'Document all data sources, processing steps, and statistical assumptions transparently.'
    ],
    expectedLearningOutcomes: [
      'Build hands-on competency in scientific data cleaning, statistical summarization, and distribution analysis.',
      'Understand best practices in scientific data communication and ethical data representation.',
      'Bridge the gap between tabular experimental measurements and intuitive graphical explanations.'
    ],
    toolsPlanned: ['Python', 'Pandas', 'SVG / Chart.js', 'TypeScript', 'Tailwind CSS'],
    repositoryUrl: undefined,
    liveDemoUrl: undefined
  },
  {
    id: 'disease-research-literature-map',
    title: 'Disease Research Literature Map',
    category: 'Research Literacy & Systems Biology',
    status: 'Planned',
    summary:
      'A learning project to organize published research on a disease-related biological mechanism.',
    objective:
      'Construct a structured bibliographic and conceptual map summarizing current peer-reviewed research on a specific disease pathway (e.g., insulin resistance signaling or neurodegenerative protein aggregation).',
    scientificQuestion:
      'What are the key upstream genetic triggers, cellular signaling cascades, and therapeutic targets identified in contemporary literature for a defined pathology?',
    proposedMethods: [
      'Conduct systematic literature queries across NCBI PubMed and Google Scholar using targeted MeSH terms.',
      'Extract and catalog key findings, experimental models (in vitro, in vivo, clinical), and conflicting hypotheses.',
      'Build an interactive node-and-link network diagram mapping relationships between genes, proteins, and disease phenotypes.',
      'Provide concise, plain-language summaries alongside full DOI citations for undergraduate peer review.'
    ],
    expectedLearningOutcomes: [
      'Develop systematic literature review, citation management, and critical reading literacy.',
      'Gain systems-level understanding of complex disease etiology and biochemical signaling networks.',
      'Learn how to synthesize disparate research papers into an organized conceptual schema.'
    ],
    toolsPlanned: ['PubMed API', 'Markdown', 'Cytoscape / Graph Visualization', 'React'],
    repositoryUrl: undefined,
    liveDemoUrl: undefined
  }
];
