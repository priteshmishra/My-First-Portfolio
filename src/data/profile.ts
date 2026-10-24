export interface ProfileData {
  name: string;
  brand: string;
  degree: string;
  institution: string;
  institutionFull: string;
  academicLevel: string;
  location: string;
  careerDirection: string;
  github: string;
  linkedin: string;
  headline: string;
  supportingStatement: string;
  aboutTitle: string;
  biography: string[];
  academicDetails: {
    label: string;
    value: string;
  }[];
  learningGoals: string[];
  photoSrc: string;
  photoPlaceholder: {
    initials: string;
    label: string;
    note: string;
    instructions: string;
  };
}

export const profileData: ProfileData = {
  name: 'Pritesh Kumar Mishra',
  brand: 'BIOVERSE',
  degree: 'B.Tech Biotechnology',
  institution: 'Lovely Professional University (LPU)',
  institutionFull: 'Lovely Professional University, Punjab, India',
  academicLevel: 'First year',
  location: 'India',
  careerDirection: 'Bioinformatics / Computational Biology',
  github: 'https://github.com/priteshmishra',
  linkedin: 'https://in.linkedin.com/in/pritesh-mishra-4b109a373',
  headline: 'Exploring Life Through Science and Computation.',
  supportingStatement:
    'I am a biotechnology student interested in bioinformatics and computational biology. I want to explore how biological knowledge and computational tools can help us understand complex biological systems. I am currently building my foundational knowledge and practical skills.',
  aboutTitle: 'Curious About the Complexity of Life.',
  biography: [
    'I am a first-year undergraduate student in Biotechnology at Lovely Professional University, India, with a growing passion for bioinformatics and computational biology.',
    'I am fascinated by how biological data—from nucleic acid sequences to 3D macromolecular structures—can be analyzed, modeled, and visualized using computational techniques.',
    'Rather than claiming advanced expertise, I am currently dedicated to building strong foundations in cellular and molecular biology, genetic principles, and programming for scientific problem solving.'
  ],
  academicDetails: [
    { label: 'Degree', value: 'B.Tech Biotechnology' },
    { label: 'Institution', value: 'Lovely Professional University (LPU)' },
    { label: 'Current Level', value: 'First Year Undergraduate' },
    { label: 'Location', value: 'Punjab, India' },
    { label: 'Focus Area', value: 'Bioinformatics & Computational Biology' },
  ],
  learningGoals: [
    'Establish deep conceptual mastery of molecular genetics and biochemical pathways.',
    'Develop structured computational thinking and fluency in scientific Python for biological data.',
    'Explore fundamental bioinformatics algorithms for sequence alignment, motif discovery, and phylogenetic analysis.',
    'Learn principles of biomolecular structural visualization and open-source scientific software design.'
  ],
  photoSrc: '/Priteh-profile.png',
  photoPlaceholder: {
    initials: 'PM',
    label: 'Student Profile',
    note: 'Tasteful designed placeholder active. No synthetic/AI photograph generated.',
    instructions: 'To replace with a real photograph, place your image at /public/profile.jpg or update the photoSrc in src/data/profile.ts.'
  }
};
