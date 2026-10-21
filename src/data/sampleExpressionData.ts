export interface GeneExpressionEntry {
  gene: string;
  name: string;
  functionCategory: string;
  baselineFPKM: number;
  conditions: {
    [conditionId: string]: number; // Log2 fold change relative to control
  };
}

export interface ConditionInfo {
  id: string;
  label: string;
  category: 'Control' | 'Stress' | 'Metabolic' | 'Pharmacological';
  description: string;
}

export const expressionConditions: ConditionInfo[] = [
  { id: 'ctrl', label: 'Control (0h)', category: 'Control', description: 'Standard untreated cell culture conditions at 37°C, 5% CO2.' },
  { id: 'heat', label: 'Heat Shock (42°C)', category: 'Stress', description: 'Thermal stress for 60 min triggering heat shock chaperone response.' },
  { id: 'ox_stress', label: 'H2O2 Oxidative Stress', category: 'Stress', description: '200 uM hydrogen peroxide exposure inducing ROS defenses.' },
  { id: 'starv', label: 'Serum Starvation', category: 'Metabolic', description: 'Nutrient deprivation (0.1% FBS) for 16h activating autophagy pathways.' },
  { id: 'hypoxia', label: 'Hypoxia (1% O2)', category: 'Stress', description: 'Low oxygen microenvironment triggering angiogenic and glycolytic shifts.' },
  { id: 'drug_a', label: 'Kinase Inhibitor A', category: 'Pharmacological', description: 'Experimental small-molecule tyrosine kinase inhibitor (10 uM).' },
  { id: 'drug_b', label: 'DNA Intercalator B', category: 'Pharmacological', description: 'Chemotherapeutic DNA damage inducing agent (50 nM).' },
  { id: 'recov', label: 'Recovery (24h)', category: 'Control', description: 'Post-treatment wash and 24h recovery in complete medium.' }
];

export const sampleExpressionData: GeneExpressionEntry[] = [
  {
    gene: 'TP53',
    name: 'Tumor Protein P53',
    functionCategory: 'Cell Cycle & DNA Damage',
    baselineFPKM: 42.5,
    conditions: {
      ctrl: 0.00,
      heat: 0.85,
      ox_stress: 2.30,
      starv: 0.40,
      hypoxia: 1.10,
      drug_a: -0.20,
      drug_b: 3.45,
      recov: 0.60
    }
  },
  {
    gene: 'HSP90AA1',
    name: 'Heat Shock Protein 90 Alpha',
    functionCategory: 'Chaperone & Protein Folding',
    baselineFPKM: 185.0,
    conditions: {
      ctrl: 0.00,
      heat: 4.20,
      ox_stress: 1.80,
      starv: -0.65,
      hypoxia: 0.90,
      drug_a: -1.40,
      drug_b: 0.70,
      recov: 1.10
    }
  },
  {
    gene: 'HIF1A',
    name: 'Hypoxia Inducible Factor 1 Alpha',
    functionCategory: 'Hypoxia Adaptation',
    baselineFPKM: 31.2,
    conditions: {
      ctrl: 0.00,
      heat: 0.20,
      ox_stress: 0.60,
      starv: 0.15,
      hypoxia: 3.85,
      drug_a: -0.80,
      drug_b: 0.40,
      recov: 0.10
    }
  },
  {
    gene: 'VEGFA',
    name: 'Vascular Endothelial Growth Factor A',
    functionCategory: 'Angiogenesis',
    baselineFPKM: 64.0,
    conditions: {
      ctrl: 0.00,
      heat: 0.30,
      ox_stress: 0.45,
      starv: -0.80,
      hypoxia: 3.10,
      drug_a: -1.95,
      drug_b: -0.30,
      recov: 0.25
    }
  },
  {
    gene: 'MTOR',
    name: 'Mechanistic Target of Rapamycin',
    functionCategory: 'Metabolic Signaling',
    baselineFPKM: 52.8,
    conditions: {
      ctrl: 0.00,
      heat: -0.50,
      ox_stress: -1.10,
      starv: -3.20,
      hypoxia: -1.40,
      drug_a: -2.80,
      drug_b: -0.90,
      recov: -0.15
    }
  },
  {
    gene: 'SOD2',
    name: 'Superoxide Dismutase 2 (Mitochondrial)',
    functionCategory: 'Antioxidant Defense',
    baselineFPKM: 78.4,
    conditions: {
      ctrl: 0.00,
      heat: 1.10,
      ox_stress: 3.60,
      starv: 0.35,
      hypoxia: 0.80,
      drug_a: 0.10,
      drug_b: 1.40,
      recov: 0.75
    }
  },
  {
    gene: 'MYC',
    name: 'MYC Proto-Oncogene',
    functionCategory: 'Cell Proliferation',
    baselineFPKM: 110.2,
    conditions: {
      ctrl: 0.00,
      heat: -1.20,
      ox_stress: -1.80,
      starv: -2.90,
      hypoxia: -0.70,
      drug_a: -3.10,
      drug_b: -2.40,
      recov: 0.40
    }
  },
  {
    gene: 'CDKN1A',
    name: 'Cyclin Dependent Kinase Inhibitor 1A (p21)',
    functionCategory: 'Cell Cycle Arrest',
    baselineFPKM: 28.6,
    conditions: {
      ctrl: 0.00,
      heat: 0.60,
      ox_stress: 2.10,
      starv: 1.80,
      hypoxia: 1.40,
      drug_a: 0.50,
      drug_b: 4.10,
      recov: 0.80
    }
  },
  {
    gene: 'ACTB',
    name: 'Beta-Actin (Housekeeping Reference)',
    functionCategory: 'Cytoskeleton / Reference',
    baselineFPKM: 420.0,
    conditions: {
      ctrl: 0.00,
      heat: -0.05,
      ox_stress: 0.08,
      starv: -0.12,
      hypoxia: 0.02,
      drug_a: -0.04,
      drug_b: -0.09,
      recov: 0.01
    }
  },
  {
    gene: 'GAPDH',
    name: 'Glyceraldehyde-3-Phosphate Dehydrogenase',
    functionCategory: 'Glycolysis / Reference',
    baselineFPKM: 380.5,
    conditions: {
      ctrl: 0.00,
      heat: 0.10,
      ox_stress: -0.05,
      starv: -0.18,
      hypoxia: 0.22,
      drug_a: -0.06,
      drug_b: -0.04,
      recov: 0.03
    }
  }
];
