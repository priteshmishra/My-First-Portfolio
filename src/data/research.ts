export interface ResearchInterest {
  id: string;
  title: string;
  category: string;
  shortSummary: string;
  explanationForNonSpecialists: string;
  whatIWantToExplore: string[];
  keyQuestions: string;
}

export const researchInterests: ResearchInterest[] = [
  {
    id: 'bioinformatics',
    title: 'Bioinformatics',
    category: 'Computational Science',
    shortSummary: 'Applying computational techniques and algorithmic tools to store, organize, and analyze massive volumes of biological data.',
    explanationForNonSpecialists:
      'Modern biology generates petabytes of information (like the genetic codes of humans, plants, and viruses). Bioinformatics is the computational toolkit—using algorithms and databases—that allows researchers to search, compare, and make sense of this raw genetic data.',
    whatIWantToExplore: [
      'Pairwise and multiple sequence alignment algorithms (Needleman-Wunsch, Smith-Waterman).',
      'High-throughput biological database querying and programmatic API access.',
      'Automated pipeline construction for genomic variant calling.'
    ],
    keyQuestions: 'How can algorithmic efficiency be preserved when analyzing millions of sequences concurrently?'
  },
  {
    id: 'computational-biology',
    title: 'Computational Biology',
    category: 'Quantitative Modeling',
    shortSummary: 'Developing theoretical models and mathematical simulations to understand complex biological dynamics and living systems.',
    explanationForNonSpecialists:
      'While bioinformatics focuses on managing biological data, computational biology focuses on simulating how living things actually work—like simulating how a protein moves in water or how chemicals react inside a cell.',
    whatIWantToExplore: [
      'Mathematical modeling of cellular metabolic networks and enzyme reactions.',
      'Molecular dynamics simulation principles for biomolecules.',
      'Dynamic systems approaches to gene regulatory circuits.'
    ],
    keyQuestions: 'How can computational simulations predict cellular responses before running expensive wet-lab tests?'
  },
  {
    id: 'genomics-sequence-analysis',
    title: 'Genomics & Biological Sequence Analysis',
    category: 'Genetics & Genomics',
    shortSummary: 'Decoding nucleic acid sequences to understand genome structure, gene regulation, and genetic diversity across organisms.',
    explanationForNonSpecialists:
      'DNA is written in a four-letter chemical alphabet (A, C, G, T). Genomics studies the entire set of these letters in an organism to locate genes, find spelling errors that might cause disease, and discover how different species are related.',
    whatIWantToExplore: [
      'Comparative genomics to discover conserved evolutionary sequences across species.',
      'Identification of promoter regions, transcription factor binding sites, and CpG islands.',
      'RNA-Seq transcriptomic data analysis to study gene expression patterns.'
    ],
    keyQuestions: 'What subtle sequence signals distinguish functional regulatory DNA from non-functional regions?'
  },
  {
    id: 'molecular-biology',
    title: 'Molecular Biology',
    category: 'Biological Mechanisms',
    shortSummary: 'Investigating the cellular mechanisms and interactions between DNA, RNA, proteins, and lipids that sustain life.',
    explanationForNonSpecialists:
      'Molecular biology is the study of the microscopic machinery that keeps cells alive—how instructions in DNA are copied into temporary messages (RNA), and then manufactured into active physical machines (proteins).',
    whatIWantToExplore: [
      'Mechanisms of DNA repair, replication fidelity, and epigenetic modifications.',
      'Structural biology of protein-nucleic acid complexes.',
      'Post-translational modifications and intracellular signaling cascades.'
    ],
    keyQuestions: 'How do structural conformations and chemical interactions dictate molecular function at atomic scales?'
  },
  {
    id: 'disease-research-approaches',
    title: 'Computational Approaches to Disease Research',
    category: 'Biomedical Applications',
    shortSummary: 'Leveraging data-driven models to identify disease biomarkers, understand pathogenic mechanisms, and aid drug discovery.',
    explanationForNonSpecialists:
      'Diseases often involve intricate cascades of faulty cellular signals. Computational tools allow scientists to track thousands of genes at once to spot which ones malfunction during an illness, speeding up the discovery of targeted therapies.',
    whatIWantToExplore: [
      'Network biology approaches to map disease pathways and protein-protein interactions.',
      'In silico molecular docking simulations for prospective therapeutic ligands.',
      'Public cancer genomics repositories (e.g. TCGA) for biomarker discovery concepts.'
    ],
    keyQuestions: 'How can multi-omics data integration reveal earlier and more accurate diagnostic indicators for complex diseases?'
  },
  {
    id: 'scientific-visualization',
    title: 'Scientific Data Visualization',
    category: 'Communication & Graphics',
    shortSummary: 'Translating multidimensional biological coordinates, structures, and networks into intuitive, accurate visual representations.',
    explanationForNonSpecialists:
      'Biological processes happen in 3D and involve thousands of moving parts. Clear, truthful visualizations help scientists and students intuitively grasp intricate structures—like the helical twist of DNA or the folding of an enzyme—without sacrificing scientific rigor.',
    whatIWantToExplore: [
      'Web-based 3D graphics rendering (Three.js/WebGL) for interactive macromolecular models.',
      'Ethical visual representation of experimental variance and statistical distributions.',
      'Interactive visual interfaces for exploring phylogenetic and biochemical pathways.'
    ],
    keyQuestions: 'How can interactive visualization make complex biophysical concepts accessible while maintaining strict scientific fidelity?'
  }
];
