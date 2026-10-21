export interface Project {
  id: string;
  title: string;
  summary: string;
  category: 'Bioinformatics' | 'Scientific Visualization' | 'Genomics' | 'Simulation';
  status: 'Completed' | 'In Progress' | 'Planned';
  problemStatement: string;
  objective: string;
  tools: string[];
  methodology: string[];
  results?: string[];
  limitations: string[];
  futureWork: string[];
  demoType?: 'sequence' | 'molecular' | 'expression' | 'terminal' | 'physics';
  githubUrl?: string;
}

export const projectsData: Project[] = [
  {
    id: 'dna-sequence-lab',
    title: 'Interactive DNA Sequence Analysis Toolkit',
    summary: 'A client-side algorithmic sequence processing lab computing nucleotide composition, GC/AT skew, reverse complement, and regular-expression motif detection.',
    category: 'Bioinformatics',
    status: 'Completed',
    problemStatement: 'Introductory bioinformatics researchers frequently require rapid, client-side sequence verification without uploading sensitive genetic constructs to third-party servers.',
    objective: 'Build an accessible, zero-dependency in-browser sequence lab with real-time GC/AT calculations, complement transformations, and color-coded motif pattern searching.',
    tools: ['TypeScript', 'React', 'Regex Matching', 'Vitest'],
    methodology: [
      'Implemented pure functional sequence transformations with nucleotide validation (A, T, G, C, and IUPAC ambiguous bases).',
      'Engineered a reverse-complement pipeline handling 5\' to 3\' orientation reversing and Watson-Crick base pairing.',
      'Constructed regular expression engine with global match indexing for restriction site and transcription factor motif highlights.',
      'Developed automated Vitest unit test suite validating edge cases (empty strings, case-insensitivity, IUPAC degeneracies).'
    ],
    results: [
      'Sub-millisecond processing of sequences up to 50,000 base pairs locally in the browser.',
      'Accurate GC content, AT ratio, and base distribution charts with zero external API calls.',
      'Fully responsive UI with accessible copy-to-clipboard and formatted sequence views.'
    ],
    limitations: [
      'Optimized for single-gene and oligonucleotide scales (under 100kbp); not intended for whole chromosome FASTQ files.',
      'Client-side computation is bounded by the user device browser memory limits.'
    ],
    futureWork: [
      'Incorporate translation to amino acid protein sequences across all 6 reading frames.',
      'Add restriction enzyme database (e.g. REBASE) for automated digestion mapping.'
    ],
    demoType: 'sequence'
  },
  {
    id: 'molecular-viewer-3d',
    title: '3D Macromolecular Structure Explorer',
    summary: 'A real-time WebGL structural viewer parsing experimental Protein Data Bank (PDB) atomic coordinates into Ball-and-Stick, Space-filling (VDW), and Ribbon backbone models.',
    category: 'Scientific Visualization',
    status: 'Completed',
    problemStatement: 'Understanding biomolecular architecture requires interactive spatial manipulation, but desktop tools like PyMOL or Chimera have steep learning curves for biotechnology undergraduates.',
    objective: 'Create an intuitive, responsive 3D molecular viewer with real PDB coordinate parsing, element CPK color rendering, residue inspection, and representation toggling.',
    tools: ['Three.js', 'React Three Fiber', 'PDB Coordinate Parser', 'WebGL'],
    methodology: [
      'Developed a custom robust PDB file parser extracting ATOM and HETATM coordinate records, element symbols, residue numbers, and chain IDs.',
      'Implemented CPK standard color palette (Carbon gray, Hydrogen white, Oxygen red, Nitrogen blue, Phosphorus orange, Sulfur yellow).',
      'Engineered three switchable visual representations: Ball-and-Stick (atomic spheres with connecting covalent bond cylinders), Space-filling (van der Waals radius scaling), and Ribbon/Backbone spline curves.',
      'Included offline bundled reference structures (1BNA B-DNA, 1CRN Crambin, 1INS Insulin, Caffeine) with full DOI and PDB citations, plus RCSB live fetching.'
    ],
    results: [
      'Real-time 60 FPS interactive rotation, zoom, and atom picking for macromolecules.',
      'Residue inspection modal detailing residue name, atom sequence number, and 3D coordinate values.',
      'Clear educational separation between artistic procedural scenes and experimentally measured crystallographic coordinates.'
    ],
    limitations: [
      'Does not perform ab initio molecular dynamics or energy minimization calculations.',
      'Very large complexes (>50,000 atoms) require instanced LOD simplification on mobile devices.'
    ],
    futureWork: [
      'Add electrostatic surface potential coloring using Poisson-Boltzmann approximations.',
      'Implement ligand binding pocket highlight tools.'
    ],
    demoType: 'molecular'
  },
  {
    id: 'gene-expression-heatmap',
    title: 'Transcriptomic Expression Heatmap Explorer',
    summary: 'An interactive scientific data visualization matrix demonstrating differential gene expression across experimental stress and drug treatments.',
    category: 'Genomics',
    status: 'Completed',
    problemStatement: 'Microarray and RNA-Seq data generates high-dimensional expression matrices that can overwhelm students without intuitive, interactive filtering tools.',
    objective: 'Provide an educational gene expression heatmap with real-time log2 fold-change normalization, z-score sorting, hover tooltips, and search filtering.',
    tools: ['TypeScript', 'SVG / Canvas Matrix', 'Statistical Normalization', 'Tailwind CSS'],
    methodology: [
      'Designed a multi-condition expression dataset covering 10 key genes across 8 biological perturbations (Heat Shock, Oxidative Stress, Hypoxia, Starvation, Drug treatments).',
      'Calculated mean baselines, log2 fold changes (log2(Treatment / Control)), and standard deviation z-score scaling.',
      'Implemented dual-gradient color mapping (Cyan down-regulation -> Charcoal baseline -> Violet up-regulation).',
      'Constructed accessible tooltip inspection displaying gene identity, condition, raw expression value, and relative fold change.'
    ],
    results: [
      'Interactive matrix rendering with responsive row/column hover highlights.',
      'Search input for immediate gene filtering and condition isolation.',
      'Transparently labeled as educational sample data to preserve scientific integrity.'
    ],
    limitations: [
      'Demonstration dataset uses 10 curated biological genes rather than raw genome-wide sequencing count files.',
      'Does not perform statistical p-value / FDR multiple testing corrections.'
    ],
    futureWork: [
      'Support user CSV/TSV expression matrix upload with automated hierarchical clustering (Euclidean distance & Ward linkage).',
      'Integrate volcano plot mode for differential expression visualization.'
    ],
    demoType: 'expression'
  },
  {
    id: 'bioinformatics-cli-terminal',
    title: 'Bioinformatics Interactive Terminal',
    summary: 'A simulated command-line environment executing client-side genomic analysis commands with command history and scientific assistance.',
    category: 'Bioinformatics',
    status: 'Completed',
    problemStatement: 'Bioinformatics fundamentally relies on command-line pipelines; providing an in-browser sandbox helps learners bridge GUI tools and terminal workflows.',
    objective: 'Build an interactive terminal supporting local sequence inspection, GC calculations, reverse complements, motif detection, and system information.',
    tools: ['TypeScript', 'Command Dispatcher Architecture', 'Regex Engine'],
    methodology: [
      'Designed an extensible command registry mapping terminal input to pure functional executors.',
      'Implemented command history navigation (Up/Down arrow keys) and formatted monospace terminal output.',
      'Integrated strict input validation and helpful syntax hints for unknown or malformed arguments.'
    ],
    results: [
      'Fully functional commands: `help`, `sequence`, `gc-content`, `reverse-complement`, `count-bases`, `motif`, `clear`, `about`, `skills`, `projects`, `date`.',
      'Local execution with zero server vulnerabilities (no eval or arbitrary code execution).'
    ],
    limitations: [
      'Emulates a bioinformatics command toolset; does not provide a native Linux bash kernel.',
      'Commands run synchronously in browser main thread.'
    ],
    futureWork: [
      'Add simulated SAM/BAM file header inspection commands.',
      'Add simulated PDB file ATOM record grep commands.'
    ],
    demoType: 'terminal'
  },
  {
    id: 'rna-seq-nextflow-pipeline',
    title: 'High-Throughput RNA-Seq Pipeline with Nextflow',
    summary: 'A containerized workflow for automated quality control, splice-aware read alignment, and transcript quantification from raw FASTQ datasets.',
    category: 'Genomics',
    status: 'Planned',
    problemStatement: 'Modern transcriptomics requires reproducible, scalable workflows that can execute identically across local workstations and high-performance computing clusters.',
    objective: 'Design a modular Nextflow DSL2 pipeline chaining FastQC, Trimmomatic, STAR aligner, and featureCounts with Docker/Singularity containerization.',
    tools: ['Nextflow', 'Docker', 'FastQC', 'STAR Aligner', 'featureCounts', 'MultiQC'],
    methodology: [
      'Modular DSL2 process definitions for each analysis step.',
      'Automated MultiQC aggregate reporting across quality metrics.',
      'Validation against standard synthetic paired-end RNA-Seq benchmark datasets.'
    ],
    limitations: [
      'Pipeline design is currently in planning phase; requires HPC or cloud compute allocation for full benchmarking.'
    ],
    futureWork: [
      'Integrate DESeq2 automated differential expression R script into pipeline output.',
      'Publish open-source workflow on GitHub with automated CI testing.'
    ]
  },
  {
    id: 'protein-docking-simulation',
    title: 'Molecular Docking & Ligand Binding Pocket Analysis',
    summary: 'Computational screening of small-molecule inhibitors targeting active site pockets of metabolic enzymes.',
    category: 'Simulation',
    status: 'Planned',
    problemStatement: 'Targeted drug discovery requires computational estimation of binding affinities before experimental wet-lab assays.',
    objective: 'Perform virtual screening and binding pose prediction using AutoDock Vina, analyzing hydrogen bond networks and hydrophobic interactions.',
    tools: ['AutoDock Vina', 'Open Babel', 'PyMOL', 'BioPython'],
    methodology: [
      'Receptor preparation: hydrogen addition, Gasteiger charge assignment, grid box definition.',
      'Ligand energy minimization and conformational flexibility search.',
      'Binding affinity scoring (kcal/mol) and interaction fingerprint mapping.'
    ],
    limitations: [
      'Project is currently in the literature review and protocol preparation phase.'
    ],
    futureWork: [
      'Validate computational docking scores against published experimental IC50 values.',
      'Generate 3D interaction diagrams showing amino acid contact residues.'
    ]
  }
];
