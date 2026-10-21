export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  timeline: string;
  status: 'In Progress' | 'Completed';
  coursework: string[];
  description: string;
}

export interface RoadmapMilestone {
  step: number;
  title: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  description: string;
  competencies: string[];
}

export interface PortfolioData {
  owner: {
    name: string;
    title: string;
    tagline: string;
    academicProgram: string;
    institution: string;
    courseCode: string;
    careerFocus: string;
    bio: string[];
    location: string;
    email: string;
    github: string;
    linkedin: string;
    availableFor: string[];
  };
  education: EducationEntry[];
  roadmap: RoadmapMilestone[];
  certificationPlaceholder: {
    title: string;
    notice: string;
    instructions: string;
  };
}

export const portfolioData: PortfolioData = {
  owner: {
    name: 'Pritesh Mishra',
    title: 'Biotechnology Undergraduate & Computational Biology Enthusiast',
    tagline: 'Exploring the intersection of cellular mechanics, genomics, and computational algorithms.',
    academicProgram: 'BTech Biotechnology',
    institution: 'Lovely Professional University (LPU)',
    courseCode: 'BTY100M — Professional Portfolio Development',
    careerFocus: 'Bioinformatics / Computational Biology',
    bio: [
      'I am an undergraduate student in Biotechnology at Lovely Professional University with a strong academic interest in bioinformatics, algorithmic genomics, and molecular modeling.',
      'My focus is on transforming complex biological datasets into computational understanding — bridging wet-lab biotechnology concepts with algorithmic sequence analysis, statistical computing, and interactive 3D scientific visualization.',
      'Through BIOVERSE, I explore cellular architecture, procedural macromolecular structures, real experimental PDB coordinates, and open-source genomic analysis tools built for modern web platforms.'
    ],
    location: 'Punjab, India',
    email: 'pritesh.mishra@lpu.in',
    github: 'https://github.com/priteshmishra',
    linkedin: 'https://linkedin.com/in/priteshmishra-bio',
    availableFor: [
      'Bioinformatics Research Internships',
      'Computational Biology Collaborations',
      'Undergraduate Academic Projects',
      'Open Source Scientific Software'
    ]
  },
  education: [
    {
      degree: 'Bachelor of Technology (BTech) in Biotechnology',
      institution: 'Lovely Professional University',
      location: 'Phagwara, Punjab, India',
      timeline: '2023 — Present',
      status: 'In Progress',
      coursework: [
        'Molecular Biology & Genetic Engineering',
        'Biochemistry & Enzymology',
        'Cell Biology & Microbial Genetics',
        'Bioinformatics & Computational Sequence Analysis',
        'Biostatistics & Research Methodology',
        'Data Structures & Python Programming',
        'Database Management Systems for Biology'
      ],
      description: 'Undergraduate academic curriculum focused on modern biotechnology fundamentals, genetic mechanisms, molecular laboratory techniques, and computational data processing.'
    }
  ],
  roadmap: [
    {
      step: 1,
      title: 'Biotechnology & Molecular Foundations',
      status: 'Completed',
      description: 'Mastering cellular architecture, DNA replication, transcription, translation, and fundamental enzymatic kinetics.',
      competencies: ['Cell Biology', 'Central Dogma', 'Biochemical Pathways', 'Enzyme Kinetics']
    },
    {
      step: 2,
      title: 'Python for Scientific Computing',
      status: 'Completed',
      description: 'Developing algorithmic scripts for data parsing, FASTA file processing, matrix calculations, and scientific graphing.',
      competencies: ['Python 3', 'NumPy', 'Pandas', 'Matplotlib', 'Biopython Basics']
    },
    {
      step: 3,
      title: 'Biological Sequence Analysis',
      status: 'In Progress',
      description: 'Implementing pairwise alignment concepts (Needleman-Wunsch, Smith-Waterman), GC content analysis, and motif finding.',
      competencies: ['Dynamic Programming', 'BLAST Heuristics', 'Motif Detection', 'FASTA Parsing']
    },
    {
      step: 4,
      title: 'Macromolecular Structure & PDB Data',
      status: 'In Progress',
      description: 'Parsing Protein Data Bank (PDB) atomic coordinates, secondary structure representations, and Ramachandran principles.',
      competencies: ['PDB Format', 'Ball-and-Stick', 'Ribbon Diagrams', 'Van der Waals Surfaces']
    },
    {
      step: 5,
      title: 'Transcriptomics & Heatmap Visualization',
      status: 'In Progress',
      description: 'Analyzing gene expression differential metrics (Log2 Fold Change, Z-scores) and building exploratory interactive heatmaps.',
      competencies: ['Log2 Fold Change', 'Z-Score Normalization', 'Matrix Heatmaps', 'Gene Clustering']
    },
    {
      step: 6,
      title: 'High-Throughput Workflows & Linux',
      status: 'Planned',
      description: 'Learning command-line pipelines for NGS processing (QC with FastQC, alignment with BWA/Bowtie2, variant calling).',
      competencies: ['Linux Bash', 'Conda Environments', 'FastQC', 'Alignment Workflows']
    },
    {
      step: 7,
      title: 'Nextflow / Snakemake Workflow Pipelines',
      status: 'Planned',
      description: 'Building reproducible, containerized computational workflows for scalable bioinformatics data pipelines.',
      competencies: ['Nextflow', 'Docker Containers', 'Reproducible Science', 'HPC Clusters']
    },
    {
      step: 8,
      title: 'Research Exposure & Internship Preparation',
      status: 'Planned',
      description: 'Applying computational techniques to real research questions in structural bioinformatics and comparative genomics.',
      competencies: ['Academic Publishing', 'Bench-to-Bit Translation', 'Research Collaboration']
    }
  ],
  certificationPlaceholder: {
    title: 'Verified Credentials & Certifications',
    notice: 'No unverified certificates or fabricated credentials are displayed. In accordance with academic integrity guidelines, credentials will be published here upon official course completion with verifiable institution links.',
    instructions: 'Upcoming verified credentials in Bioinformatics Specializations, Python for Genomic Data Science, and LPU Departmental Honours will be linked with unique credential IDs and public verification URLs.'
  }
};
