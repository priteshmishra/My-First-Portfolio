export type SkillStatus = 'Learning' | 'In progress' | 'Planned' | 'Completed';

export interface SkillItem {
  id: string;
  name: string;
  status: SkillStatus;
  note: string;
  coreConcepts: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'biotech-foundations',
    title: '1. Biotechnology Foundations',
    description: 'Fundamental principles of biological engineering, laboratory methodologies, and biochemistry.',
    skills: [
      {
        id: 'biochem-fundamentals',
        name: 'General Biochemistry & Biomolecules',
        status: 'Learning',
        note: 'Studying amino acids, proteins, carbohydrate metabolism, and lipid membrane structures.',
        coreConcepts: ['Protein folding', 'Enzyme kinetics', 'Metabolic pathways']
      },
      {
        id: 'wetlab-intro',
        name: 'Basic Wet-Lab Techniques & Safety',
        status: 'Learning',
        note: 'Developing hands-on laboratory discipline, micropipetting accuracy, solution preparation, and aseptic protocols.',
        coreConcepts: ['Buffer preparation', 'Spectrophotometry', 'Sterilization']
      },
      {
        id: 'bioprocess-intro',
        name: 'Bioprocess Principles',
        status: 'Planned',
        note: 'Future coursework exploring microbial fermentation, bioreactor fundamentals, and downstream processing.',
        coreConcepts: ['Cell culturing', 'Bioreactors', 'Yield optimization']
      }
    ]
  },
  {
    id: 'molecular-cell-biology',
    title: '2. Molecular and Cell Biology',
    description: 'Structural and functional understanding of eukaryotic and prokaryotic cellular machinery.',
    skills: [
      {
        id: 'central-dogma',
        name: 'Central Dogma of Molecular Biology',
        status: 'Learning',
        note: 'Studying DNA replication mechanisms, transcription factors, RNA processing, and translation.',
        coreConcepts: ['DNA Polymerase', 'RNA Transcription', 'Ribosome Translation']
      },
      {
        id: 'cell-architecture',
        name: 'Organelle Function & Membrane Dynamics',
        status: 'Learning',
        note: 'Understanding compartmentalization, mitochondrial bioenergetics, and vesicular transport.',
        coreConcepts: ['Phospholipid bilayer', 'Organelle roles', 'Signal transduction']
      },
      {
        id: 'macromolecular-structures',
        name: 'Macromolecular Conformations',
        status: 'In progress',
        note: 'Exploring tertiary and quaternary protein structures and nucleic acid geometry.',
        coreConcepts: ['Alpha helices & beta sheets', 'Hydrogen bonding', 'PDB coordinate format']
      }
    ]
  },
  {
    id: 'genetics-genomics',
    title: '3. Genetics and Genomics',
    description: 'Inheritance mechanisms, molecular genetics, and genome architecture.',
    skills: [
      {
        id: 'mendelian-genetics',
        name: 'Mendelian & Molecular Genetics',
        status: 'Learning',
        note: 'Exploring genetic linkage, chromosomal inheritance, allelic interactions, and mutations.',
        coreConcepts: ['Gene mapping', 'Point mutations', 'Chromosomal variation']
      },
      {
        id: 'genomic-structures',
        name: 'Eukaryotic & Prokaryotic Genomes',
        status: 'Learning',
        note: 'Studying chromosome packaging, nucleosomes, introns/exons, and non-coding genetic elements.',
        coreConcepts: ['Histone octamers', 'Gene regulation', 'Promoters & enhancers']
      },
      {
        id: 'nextgen-sequencing-concepts',
        name: 'Sequencing Technologies Concepts',
        status: 'Planned',
        note: 'Targeted study of Sanger sequencing principles and modern Next-Generation Sequencing (NGS) workflows.',
        coreConcepts: ['Sanger sequencing', 'Illumina short reads', 'Long-read sequencing']
      }
    ]
  },
  {
    id: 'programming-computational',
    title: '4. Programming & Computational Thinking',
    description: 'Developing coding logic, algorithms, and practical software skills for science.',
    skills: [
      {
        id: 'python-foundations',
        name: 'Python for Scientific Computing',
        status: 'Learning',
        note: 'Writing clean Python scripts, data structures, file I/O for sequence files, and algorithmic thinking.',
        coreConcepts: ['Data structures', 'FASTA parsing', 'NumPy basics']
      },
      {
        id: 'web-technologies',
        name: 'Frontend Development & Scientific UI',
        status: 'In progress',
        note: 'Building clean interactive digital portfolios and data visualizations using TypeScript and React.',
        coreConcepts: ['TypeScript', 'Component architecture', 'Web accessibility']
      },
      {
        id: 'version-control',
        name: 'Git & Version Control Workflows',
        status: 'Learning',
        note: 'Managing code repositories, branching, documentation, and open-source collaboration on GitHub.',
        coreConcepts: ['Git commit hygiene', 'GitHub workflows', 'Open source ethics']
      }
    ]
  },
  {
    id: 'bioinformatics-tools',
    title: '5. Bioinformatics Tools & Data Analysis',
    description: 'Computational approaches to analyzing sequences, biological databases, and statistics.',
    skills: [
      {
        id: 'ncbi-databases',
        name: 'Biological Database Navigation',
        status: 'Learning',
        note: 'Querying primary biological repositories: NCBI GenBank, UniProt, and Protein Data Bank (RCSB PDB).',
        coreConcepts: ['GenBank Accessions', 'UniProt annotations', 'PDB structure records']
      },
      {
        id: 'sequence-analysis-algos',
        name: 'Sequence Alignment Concepts',
        status: 'Learning',
        note: 'Understanding pairwise alignment, Needleman-Wunsch global alignment, and BLAST search fundamentals.',
        coreConcepts: ['Scoring matrices (BLOSUM/PAM)', 'Dot matrix plots', 'Heuristic search']
      },
      {
        id: 'biopython-libraries',
        name: 'BioPython & Biological Data Packages',
        status: 'Planned',
        note: 'Planned deep dive into BioPython for programmatic sequence manipulation and phylogenetic trees.',
        coreConcepts: ['SeqIO parsing', 'Motif search', 'Alignment trees']
      }
    ]
  },
  {
    id: 'scientific-communication',
    title: '6. Scientific Communication & Research Literacy',
    description: 'Reading primary literature, scientific writing, and transparent documentation.',
    skills: [
      {
        id: 'literature-reading',
        name: 'Primary Literature Analysis',
        status: 'Learning',
        note: 'Practicing reading peer-reviewed research papers, understanding experimental controls, and extracting findings.',
        coreConcepts: ['PubMed searching', 'Critical evaluation', 'Hypothesis testing']
      },
      {
        id: 'scientific-documentation',
        name: 'Scientific Writing & Documentation',
        status: 'In progress',
        note: 'Documenting project objectives, limitations, and reproducible research notes in plain English and Markdown.',
        coreConcepts: ['Clarity and conciseness', 'Proper attribution', 'Reproducibility']
      },
      {
        id: 'scientific-presentation',
        name: 'Data Visualization & Presentation',
        status: 'Learning',
        note: 'Creating uncluttered charts and interactive models that communicate biological data without distorting facts.',
        coreConcepts: ['Chart ethics', 'Color contrast', 'Visual hierarchy']
      }
    ]
  }
];
