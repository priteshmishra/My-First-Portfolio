export interface MolecularCatalogItem {
  id: string;
  name: string;
  pdbId?: string;
  classification: 'Protein' | 'Nucleic Acid' | 'Small Molecule' | 'Hormone';
  organism?: string;
  resolution?: string;
  description: string;
  citation: string;
  doi?: string;
  defaultRepresentation: 'ballAndStick' | 'spacefill' | 'ribbon';
  bundledPdb?: string;
}

// Minimal representative B-DNA dodecamer coordinates (Dickerson-Drew sequence CGCGAATTCGCG)
const B_DNA_SAMPLE_PDB = `HEADER    DNA                                     15-MAR-81   1BNA
TITLE     CRYSTAL STRUCTURE OF AN ALTERNATING B-DNA DODECAMER
AUTHOR    H.R.DREW,R.E.DICKERSON
ATOM      1  O5'  DC A   1       2.141  13.434  27.050  1.00 35.00           O
ATOM      2  C5'  DC A   1       2.585  12.062  26.963  1.00 35.00           C
ATOM      3  C4'  DC A   1       1.503  11.082  27.359  1.00 35.00           C
ATOM      4  O4'  DC A   1       0.270  11.470  26.711  1.00 35.00           O
ATOM      5  C3'  DC A   1       1.802   9.638  26.963  1.00 35.00           C
ATOM      6  O3'  DC A   1       1.942   9.570  25.539  1.00 35.00           O
ATOM      7  C2'  DC A   1       0.490   9.026  27.469  1.00 35.00           C
ATOM      8  C1'  DC A   1      -0.457  10.230  27.371  1.00 35.00           C
ATOM      9  N1   DC A   1      -1.745  10.024  28.096  1.00 35.00           N
ATOM     10  C2   DC A   1      -2.787   9.336  27.472  1.00 35.00           C
ATOM     11  O2   DC A   1      -2.610   8.887  26.337  1.00 35.00           O
ATOM     12  N3   DC A   1      -3.978   9.183  28.109  1.00 35.00           N
ATOM     13  C4   DC A   1      -4.148   9.680  29.338  1.00 35.00           C
ATOM     14  N4   DC A   1      -5.342   9.504  29.923  1.00 35.00           N
ATOM     15  C5   DC A   1      -3.088  10.379  30.003  1.00 35.00           C
ATOM     16  C6   DC A   1      -1.905  10.518  29.349  1.00 35.00           C
ATOM     17  P    DG A   2       2.378   8.225  24.783  1.00 35.00           P
ATOM     18  OP1  DG A   2       2.659   8.618  23.376  1.00 35.00           O
ATOM     19  OP2  DG A   2       3.473   7.531  25.518  1.00 35.00           O
ATOM     20  O5'  DG A   2       1.082   7.291  24.819  1.00 35.00           O
ATOM     21  C5'  DG A   2       0.892   6.257  23.863  1.00 35.00           C
ATOM     22  C4'  DG A   2      -0.457   5.589  24.086  1.00 35.00           C
ATOM     23  O4'  DG A   2      -1.464   6.576  24.380  1.00 35.00           O
ATOM     24  C3'  DG A   2      -0.540   4.568  25.213  1.00 35.00           C
ATOM     25  O3'  DG A   2      -1.045   3.337  24.708  1.00 35.00           O
ATOM     26  C2'  DG A   2      -1.503   5.281  26.166  1.00 35.00           C
ATOM     27  C1'  DG A   2      -2.368   6.160  25.267  1.00 35.00           C
ATOM     28  N9   DG A   2      -3.029   7.256  25.975  1.00 35.00           N
ATOM     29  C8   DG A   2      -2.580   8.544  26.155  1.00 35.00           C
ATOM     30  N7   DG A   2      -3.414   9.324  26.804  1.00 35.00           N
ATOM     31  C5   DG A   2      -4.484   8.502  27.065  1.00 35.00           C
ATOM     32  C6   DG A   2      -5.698   8.810  27.765  1.00 35.00           C
ATOM     33  O6   DG A   2      -6.136   9.897  28.188  1.00 35.00           O
ATOM     34  N1   DG A   2      -6.425   7.659  27.993  1.00 35.00           N
ATOM     35  C2   DG A   2      -6.035   6.377  27.604  1.00 35.00           C
ATOM     36  N2   DG A   2      -6.899   5.385  27.904  1.00 35.00           N
ATOM     37  N3   DG A   2      -4.908   6.069  26.963  1.00 35.00           N
ATOM     38  C4   DG A   2      -4.185   7.182  26.732  1.00 35.00           C
END`;

// Authentic Crambin protein snippet (PDB 1CRN - 1.5 A resolution)
const CRAMBIN_SAMPLE_PDB = `HEADER    PLANT SEED PROTEIN                      30-APR-81   1CRN
TITLE     WATER STRUCTURE OF A HYDROPHOBIC PROTEIN AT ATOMIC RESOLUTION
AUTHOR    M.M.TEETER
ATOM      1  N   THR A   1      17.047  14.099   3.625  1.00 13.79           N
ATOM      2  CA  THR A   1      16.967  12.784   4.338  1.00 10.80           C
ATOM      3  C   THR A   1      15.685  12.755   5.133  1.00  9.19           C
ATOM      4  O   THR A   1      15.268  13.782   5.654  1.00 13.16           O
ATOM      5  CB  THR A   1      18.170  12.703   5.337  1.00 13.02           C
ATOM      6  OG1 THR A   1      19.334  12.829   4.463  1.00 15.06           O
ATOM      7  CG2 THR A   1      18.156  11.332   6.152  1.00 13.51           C
ATOM      8  N   THR A   2      15.115  11.555   5.265  1.00  7.67           N
ATOM      9  CA  THR A   2      13.856  11.469   6.066  1.00  7.04           C
ATOM     10  C   THR A   2      14.164  10.785   7.379  1.00  5.11           C
ATOM     11  O   THR A   2      14.993   9.882   7.446  1.00  6.43           O
ATOM     12  CB  THR A   2      12.732  10.711   5.261  1.00  8.61           C
ATOM     13  OG1 THR A   2      12.443  11.488   4.100  1.00  9.03           O
ATOM     14  CG2 THR A   2      11.442  10.598   6.143  1.00 11.89           C
ATOM     15  N   CYS A   3      13.488  11.241   8.417  1.00  6.47           N
ATOM     16  CA  CYS A   3      13.660  10.707   9.756  1.00  6.62           C
ATOM     17  C   CYS A   3      12.355   9.988  10.150  1.00  6.87           C
ATOM     18  O   CYS A   3      11.378  10.605  10.574  1.00  8.87           O
ATOM     19  CB  CYS A   3      14.007  11.841  10.742  1.00  8.11           C
ATOM     20  SG  CYS A   3      15.626  12.607  10.457  1.00  8.79           S
ATOM     21  N   PRO A   4      12.366   8.653  10.015  1.00  5.68           N
ATOM     22  CA  PRO A   4      11.196   7.874  10.418  1.00  5.96           C
ATOM     23  C   PRO A   4      10.893   7.935  11.916  1.00  6.38           C
ATOM     24  O   PRO A   4      11.758   7.653  12.748  1.00  7.33           O
ATOM     25  CB  PRO A   4      11.590   6.467   9.970  1.00  7.87           C
ATOM     26  CG  PRO A   4      12.712   6.666   9.014  1.00  8.66           C
ATOM     27  CD  PRO A   4      13.407   7.859   9.638  1.00  6.79           C
ATOM     28  N   SER A   5       9.664   8.297  12.247  1.00  6.60           N
ATOM     29  CA  SER A   5       9.231   8.418  13.640  1.00  6.65           C
ATOM     30  C   SER A   5       8.324   7.251  14.020  1.00  6.86           C
ATOM     31  O   SER A   5       7.319   6.994  13.344  1.00  9.42           O
ATOM     32  CB  SER A   5       8.530   9.756  13.882  1.00  7.24           C
ATOM     33  OG  SER A   5       9.444  10.824  13.649  1.00  8.25           O
END`;

const CAFFEINE_PDB = `HEADER    SMALL MOLECULE                          15-JAN-90   CAFF
TITLE     CAFFEINE (1,3,7-TRIMETHYLXANTHINE) C8H10N4O2
AUTHOR    BIOVERSE CHEMICAL CATALOG
ATOM      1  N1  CAF A   1      -1.077   0.771   0.000  1.00 20.00           N
ATOM      2  C2  CAF A   1      -0.008   1.624   0.000  1.00 20.00           C
ATOM      3  O2  CAF A   1       0.038   2.842   0.000  1.00 20.00           O
ATOM      4  N3  CAF A   1       1.196   0.933   0.000  1.00 20.00           N
ATOM      5  C4  CAF A   1       1.353  -0.428   0.000  1.00 20.00           C
ATOM      6  C5  CAF A   1       0.264  -1.321   0.000  1.00 20.00           C
ATOM      7  C6  CAF A   1      -1.066  -0.655   0.000  1.00 20.00           C
ATOM      8  O6  CAF A   1      -2.128  -1.258   0.000  1.00 20.00           O
ATOM      9  N7  CAF A   1       0.737  -2.610   0.000  1.00 20.00           N
ATOM      10 C8  CAF A   1       2.059  -2.484   0.000  1.00 20.00           C
ATOM      11 N9  CAF A   1       2.489  -1.189   0.000  1.00 20.00           N
ATOM      12 C10 CAF A   1      -2.413   1.358   0.000  1.00 20.00           C
ATOM      13 C11 CAF A   1       2.404   1.745   0.000  1.00 20.00           C
ATOM      14 C12 CAF A   1      -0.229  -3.693   0.000  1.00 20.00           C
CONECT    1    2    6   12
CONECT    2    1    3    4
CONECT    3    2
CONECT    4    2    5   13
CONECT    5    4    6   11
CONECT    6    5    7    9
CONECT    7    1    6    8
CONECT    8    7
CONECT    9    6   10   14
CONECT   10    9   11
CONECT   11    5   10
CONECT   12    1
CONECT   13    4
CONECT   14    9
END`;

export const molecularCatalog: MolecularCatalogItem[] = [
  {
    id: '1bna',
    name: 'B-DNA Dodecamer (Dickerson Helix)',
    pdbId: '1BNA',
    classification: 'Nucleic Acid',
    organism: 'Synthetic Oligonucleotide',
    resolution: '1.90 Å (X-Ray Diffraction)',
    description: 'The canonical crystal structure of a complete double-helical turn of right-handed B-DNA (Drew & Dickerson, 1981). Shows major and minor grooves with sequence CGCGAATTCGCG.',
    citation: 'Drew, H. R., & Dickerson, R. E. (1981). Structure of a B-DNA dodecamer: conformation and dynamics. PNAS, 78(4), 2179-2183.',
    doi: 'https://doi.org/10.1073/pnas.78.4.2179',
    defaultRepresentation: 'ballAndStick',
    bundledPdb: B_DNA_SAMPLE_PDB
  },
  {
    id: '1crn',
    name: 'Crambin Seed Protein',
    pdbId: '1CRN',
    classification: 'Protein',
    organism: 'Crambe abyssinica (Abyssinian mustard)',
    resolution: '1.50 Å (X-Ray Diffraction)',
    description: 'A small hydrophobic plant seed storage protein renowned for its exceptionally ordered crystal lattice and high-resolution water network.',
    citation: 'Teeter, M. M. (1984). Water structure of a hydrophobic protein at atomic resolution: Pentagonal rings of water molecules in crystals of crambin. PNAS, 81(19), 6014-6018.',
    doi: 'https://doi.org/10.1073/pnas.81.19.6014',
    defaultRepresentation: 'ribbon',
    bundledPdb: CRAMBIN_SAMPLE_PDB
  },
  {
    id: 'caffeine',
    name: 'Caffeine (1,3,7-Trimethylxanthine)',
    classification: 'Small Molecule',
    description: 'Purine alkaloid and adenosine receptor antagonist acting as a central nervous system stimulant. Standard planar conjugated purine ring system.',
    citation: 'The Merck Index, 15th Edition (2013). Royal Society of Chemistry.',
    defaultRepresentation: 'ballAndStick',
    bundledPdb: CAFFEINE_PDB
  }
];
