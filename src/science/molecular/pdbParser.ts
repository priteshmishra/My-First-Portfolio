export interface PdbAtom {
  serial: number;
  name: string;
  resName: string;
  chainID: string;
  resSeq: number;
  x: number;
  y: number;
  z: number;
  element: string;
  color: string;
  vdwRadius: number;
  isBackbone: boolean;
}

export interface PdbBond {
  atomIndex1: number;
  atomIndex2: number;
}

export interface ParsedPdb {
  title: string;
  atoms: PdbAtom[];
  bonds: PdbBond[];
  backboneAtoms: PdbAtom[];
  center: [number, number, number];
  boundsRadius: number;
  residueCount: number;
  chains: string[];
}

const CPK_COLORS: Record<string, string> = {
  H: '#ffffff',
  C: '#909090',
  N: '#3050f8',
  O: '#ff0d0d',
  P: '#ff8000',
  S: '#ffff30',
  FE: '#e06633',
  MG: '#8aff00',
  ZN: '#7d80b0',
  CA: '#3dff00',
  CL: '#1ff01f',
  NA: '#ab5cf2',
  DEFAULT: '#00f0ff',
};

const VDW_RADII: Record<string, number> = {
  H: 1.20,
  C: 1.70,
  N: 1.55,
  O: 1.52,
  P: 1.80,
  S: 1.80,
  FE: 1.80,
  MG: 1.73,
  ZN: 1.39,
  CA: 2.00,
  DEFAULT: 1.50,
};

const BACKBONE_ATOM_NAMES = new Set(['CA', 'N', 'C', 'O', 'P', "O3'", "C3'", "C4'", "C5'", "O5'"]);

export function parsePdb(pdbString: string): ParsedPdb {
  const lines = pdbString.split('\n');
  const atoms: PdbAtom[] = [];
  const serialToIndexMap = new Map<number, number>();
  const explicitBonds: PdbBond[] = [];
  const bondSet = new Set<string>();
  const chainsSet = new Set<string>();
  const residuesSet = new Set<string>();

  let title = 'Biological Macromolecule';

  for (const line of lines) {
    if (line.startsWith('TITLE')) {
      title = line.substring(10).trim();
    } else if (line.startsWith('ATOM') || line.startsWith('HETATM')) {
      const serial = parseInt(line.substring(6, 11).trim(), 10);
      const name = line.substring(12, 16).trim();
      const resName = line.substring(17, 20).trim();
      const chainID = line.substring(21, 22).trim() || 'A';
      const resSeq = parseInt(line.substring(22, 26).trim(), 10) || 1;
      const x = parseFloat(line.substring(30, 38).trim());
      const y = parseFloat(line.substring(38, 46).trim());
      const z = parseFloat(line.substring(46, 54).trim());

      let element = '';
      if (line.length >= 78) {
        element = line.substring(76, 78).trim().toUpperCase();
      }
      if (!element) {
        // Fallback: deduce from atom name
        const cleanName = name.replace(/[^A-Za-z]/g, '');
        element = cleanName.length >= 2 && ['FE', 'MG', 'ZN', 'CA', 'CL', 'NA'].includes(cleanName.substring(0, 2).toUpperCase())
          ? cleanName.substring(0, 2).toUpperCase()
          : cleanName.charAt(0).toUpperCase();
      }

      if (isNaN(x) || isNaN(y) || isNaN(z)) continue;

      const color = CPK_COLORS[element] || CPK_COLORS.DEFAULT;
      const vdwRadius = VDW_RADII[element] || VDW_RADII.DEFAULT;
      const isBackbone = BACKBONE_ATOM_NAMES.has(name);

      const atom: PdbAtom = {
        serial,
        name,
        resName,
        chainID,
        resSeq,
        x,
        y,
        z,
        element,
        color,
        vdwRadius,
        isBackbone,
      };

      serialToIndexMap.set(serial, atoms.length);
      atoms.push(atom);
      chainsSet.add(chainID);
      residuesSet.add(`${chainID}_${resSeq}`);
    } else if (line.startsWith('CONECT')) {
      const parts = line.substring(6).trim().split(/\s+/).map((n) => parseInt(n, 10));
      const sourceSerial = parts[0];
      const sourceIdx = serialToIndexMap.get(sourceSerial);

      if (sourceIdx !== undefined) {
        for (let i = 1; i < parts.length; i++) {
          const targetSerial = parts[i];
          const targetIdx = serialToIndexMap.get(targetSerial);
          if (targetIdx !== undefined && sourceIdx !== targetIdx) {
            const key = sourceIdx < targetIdx ? `${sourceIdx}-${targetIdx}` : `${targetIdx}-${sourceIdx}`;
            if (!bondSet.has(key)) {
              bondSet.add(key);
              explicitBonds.push({ atomIndex1: sourceIdx, atomIndex2: targetIdx });
            }
          }
        }
      }
    }
  }

  // Calculate centroid
  let sumX = 0, sumY = 0, sumZ = 0;
  for (const a of atoms) {
    sumX += a.x;
    sumY += a.y;
    sumZ += a.z;
  }
  const count = atoms.length || 1;
  const centerX = sumX / count;
  const centerY = sumY / count;
  const centerZ = sumZ / count;

  // Center atoms around origin (0, 0, 0) for stable 3D rotation & calculate bounds radius
  let maxDistSq = 0;
  for (const a of atoms) {
    a.x -= centerX;
    a.y -= centerY;
    a.z -= centerZ;
    const distSq = a.x * a.x + a.y * a.y + a.z * a.z;
    if (distSq > maxDistSq) maxDistSq = distSq;
  }
  const boundsRadius = Math.sqrt(maxDistSq);

  // If no CONECT records were found, calculate covalent bonds using proximity
  let bonds = explicitBonds;
  if (bonds.length === 0 && atoms.length <= 1500) {
    // Distance heuristic: typical covalent bond is between 0.9 A and 1.95 A
    for (let i = 0; i < atoms.length; i++) {
      for (let j = i + 1; j < Math.min(atoms.length, i + 40); j++) {
        const dx = atoms[i].x - atoms[j].x;
        const dy = atoms[i].y - atoms[j].y;
        const dz = atoms[i].z - atoms[j].z;
        const distSq = dx * dx + dy * dy + dz * dz;

        // Covalent bond distance window (0.9 to 1.95 Angstroms squared)
        if (distSq > 0.8 && distSq < 3.8) {
          bonds.push({ atomIndex1: i, atomIndex2: j });
        }
      }
    }
  }

  const backboneAtoms = atoms.filter((a) => a.isBackbone && (a.name === 'CA' || a.name === "C3'" || a.name === 'P'));

  return {
    title,
    atoms,
    bonds,
    backboneAtoms: backboneAtoms.length > 0 ? backboneAtoms : atoms.filter((a) => a.isBackbone),
    center: [centerX, centerY, centerZ],
    boundsRadius: Math.max(boundsRadius, 5),
    residueCount: residuesSet.size,
    chains: Array.from(chainsSet),
  };
}
