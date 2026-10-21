import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundSynth } from '../audio/soundSynth';

export interface OrganelleInfo {
  name: string;
  scientificRole: string;
  explanation: string;
  portfolioConnection: string;
}

export const ORGANELLE_DATA: Record<string, OrganelleInfo> = {
  membrane: {
    name: 'Plasma Membrane & Glycocalyx (Phospholipid Bilayer)',
    scientificRole: 'Selective permeability barrier, receptor signaling, and electrochemical ion gradients',
    explanation: 'Self-assembling amphipathic lipid bilayer undergoing dynamic fluid-mosaic ripples. Embedded with transmembrane GPCRs, aquaporin channels, and branching extracellular glycoprotein oligosaccharide trees (glycocalyx).',
    portfolioConnection: 'Molecular dynamics simulations of membrane permeation, lipid raft thermodynamics, and transmembrane alpha-helical bundles.',
  },
  nucleus: {
    name: 'Nuclear Envelope, Chromatin & Nucleolus',
    scientificRole: 'Genomic storage, transcript processing, and ribosomal RNA biogenesis',
    explanation: 'Double-membrane nuclear envelope embedded with 8-fold symmetric nuclear pore complexes (NPCs). Contains linear DNA packaged into 30nm chromatin loops around histone octamers, with a dense central nucleolus producing 40S and 60S ribosomal subunits.',
    portfolioConnection: 'Bioinformatics sequence alignment, transcription factor binding motif analysis, and RNA splicing annotation.',
  },
  mitochondria: {
    name: 'Mitochondrion (Outer Membrane, Intermembrane Space & Cristae)',
    scientificRole: 'Aerobic ATP oxidative phosphorylation, calcium buffering, and apoptosis regulation',
    explanation: 'Semi-autonomous endosymbiotic organelle. Inner membrane is deeply folded into transverse cristae shelves containing respiratory complexes I-IV and FoF1 ATP synthases, driven by an electrochemical proton motive force (~180 mV).',
    portfolioConnection: 'Mitochondrial genome (mtDNA) haplogroup phylogenetics, metabolic flux modeling, and reactive oxygen species (ROS) pathways.',
  },
  rer: {
    name: 'Rough Endoplasmic Reticulum (RER Cisternae & Polysomes)',
    scientificRole: 'Cotranslational peptide translocation, chaperone-assisted folding, and N-glycosylation',
    explanation: 'Interconnected flattened membrane cisternae continuous with the outer nuclear envelope. Outer surface is studded with thousands of 80S ribosomes translating secretory and membrane-spanning proteins into the lumen.',
    portfolioConnection: 'Endoplasmic reticulum stress pathways, unfolded protein response (UPR), and protein chaperone network analysis (BiP/Hsp70).',
  },
  ser: {
    name: 'Smooth Endoplasmic Reticulum (SER Tubular Network)',
    scientificRole: 'Lipid and steroid hormone biosynthesis, xenobiotic detoxification, and calcium sequestration',
    explanation: 'Branching network of smooth tubular membranes devoid of ribosomes. Catalyzes phospholipid synthesis, cytochrome P450 drug hydroxylation, and sarcoplasmic calcium release.',
    portfolioConnection: 'Pharmacogenomics and metabolic pathway reconstruction for lipid processing enzymes.',
  },
  golgi: {
    name: 'Golgi Apparatus (Cis, Medial & Trans Cisternal Stack)',
    scientificRole: 'Glycosylation processing, protein sorting, and clathrin-mediated vesicle budding',
    explanation: 'Polarized stack of 4-8 curved membrane discs. Modifies proteins moving from cis-face to trans-face via sequential glycosyltransferases, packaging cargo into targeted secretory granules or lysosomes.',
    portfolioConnection: 'Post-translational modification (PTM) prediction tools and vesicular transport algorithm modeling.',
  },
  lysosome: {
    name: 'Lysosomes & Peroxisomes (Digestive Vacuoles)',
    scientificRole: 'Macromolecular acid hydrolysis, autophagy, and fatty acid beta-oxidation',
    explanation: 'Acidic single-membrane organelles (pH 4.5-5.0) containing 50+ acid hydrolases (cathepsins, nucleases) for cellular waste digestion, and catalase-rich peroxisomes for hydrogen peroxide detoxification.',
    portfolioConnection: 'Lysosomal storage disorder genetic analysis and autophagic flux bioinformatics.',
  },
  centrosome: {
    name: 'Centrosome & Orthogonal Centrioles',
    scientificRole: 'Microtubule organizing center (MTOC) and mitotic spindle coordination',
    explanation: 'Non-membrane organelle consisting of two barrel-shaped centrioles oriented at 90° to each other, composed of 9 microtubule triplet protofilaments surrounded by pericentriolar matrix.',
    portfolioConnection: 'Cell cycle mitotic checkpoint modeling and biophysical tubulin polymerization mechanics.',
  },
  cytoskeleton: {
    name: 'Cytoskeletal Web (Microtubules & Actin Cortex)',
    scientificRole: 'Structural scaffolding, organelle transport, and cytoplasmic streaming',
    explanation: 'Dense network of 25nm hollow tubulin microtubules and 7nm helical actin microfilaments providing structural rigidity and serving as roadways for kinesin and dynein molecular motors.',
    portfolioConnection: 'Motor protein stepping kinetics and cytoskeletal network graph theory algorithms.',
  },
  hidden_easter_egg: {
    name: 'Quantum Coherence Nanostructure (Easter Egg)',
    scientificRole: 'Quantum mechanical phenomena in biological architecture',
    explanation: 'You discovered the quantum coherence beacon! Modern quantum biology demonstrates excitonic coherence in photosynthetic FMO complexes, cryptochrome magnetoreception, and proton tunneling in enzyme active sites.',
    portfolioConnection: 'Pritesh Mishra — Exploring cutting-edge bio-computational frontiers and quantum biological models.',
  },
};

interface CellSceneProps {
  onSelectOrganelle: (info: OrganelleInfo) => void;
  scale?: number;
}

export const CellScene: React.FC<CellSceneProps> = ({ onSelectOrganelle, scale = 1 }) => {
  const cellGroupRef = useRef<THREE.Group>(null);
  const outerMembraneRef = useRef<THREE.Mesh>(null);
  const nucleolusRef = useRef<THREE.Mesh>(null);
  const chromatinGroupRef = useRef<THREE.Group>(null);
  const vesiclesInstancedRef = useRef<THREE.InstancedMesh>(null);
  const golgiVesiclesRef = useRef<THREE.InstancedMesh>(null);

  // Original undeformed vertices of the outer membrane for fluid organic breathing
  const originalMembranePositions = useMemo(() => {
    const geo = new THREE.SphereGeometry(4.6, 80, 80);
    return new Float32Array(geo.attributes.position.array);
  }, []);

  // Glycoprotein antennas and receptors scattered on the outer membrane
  const glycoproteins = useMemo(() => {
    const items = [];
    const count = 56;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 4.6;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      // Skip the cutaway quadrant (x > 0 && y > 0 && z > 0) to keep inside visible
      if (x > 0.5 && y > 0.5 && z > 0.5) continue;

      const colors = ['#00f0ff', '#10b981', '#f59e0b', '#a855f7', '#ec4899'];
      items.push({
        pos: [x, y, z] as [number, number, number],
        rot: [phi, theta, Math.random() * Math.PI] as [number, number, number],
        color: colors[i % colors.length],
        scale: 0.16 + Math.random() * 0.12,
        height: 0.35 + Math.random() * 0.25,
      });
    }
    return items;
  }, []);

  // High-density Chromatin fibers inside the nucleus
  const chromatinLoops = useMemo(() => {
    const curves: THREE.CatmullRomCurve3[] = [];
    for (let c = 0; c < 7; c++) {
      const pts: THREE.Vector3[] = [];
      const numPts = 10;
      const baseAngle = (c / 7) * Math.PI * 2;
      for (let p = 0; p < numPts; p++) {
        const theta = baseAngle + (p / numPts) * Math.PI * 2.2;
        const rad = 0.5 + Math.sin(p * 2.4) * 0.85;
        const y = Math.cos(p * 1.8 + c) * 1.05;
        pts.push(new THREE.Vector3(Math.cos(theta) * rad, y, Math.sin(theta) * rad));
      }
      curves.push(new THREE.CatmullRomCurve3(pts, true));
    }
    return curves;
  }, []);

  // Cytoskeleton Microtubules running through cytoplasm
  const microtubules = useMemo(() => {
    const filaments: THREE.CatmullRomCurve3[] = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const phi = (i / count) * Math.PI;
      const theta = i * 1.45;
      const p0 = new THREE.Vector3(Math.sin(phi) * 1.6, 0.4 + (Math.random() - 0.5) * 0.8, Math.cos(phi) * 1.6);
      const p1 = new THREE.Vector3(
        Math.sin(phi) * 3.0 + Math.sin(theta) * 0.6,
        (Math.random() - 0.5) * 2.5,
        Math.cos(phi) * 3.0 + Math.cos(theta) * 0.6
      );
      const p2 = new THREE.Vector3(Math.sin(phi) * 4.3, Math.sin(theta) * 4.1, Math.cos(phi) * 4.3);
      filaments.push(new THREE.CatmullRomCurve3([p0, p1, p2]));
    }
    return filaments;
  }, []);

  // Cytoplasmic macromolecular soup (ATP, transport vesicles, enzymes)
  const vesicleCount = 110;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const vesiclePositions = useMemo(() => {
    const pos = new Float32Array(vesicleCount * 3);
    for (let i = 0; i < vesicleCount; i++) {
      const r = 2.1 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Organic membrane undulations
    if (outerMembraneRef.current) {
      const posAttr = outerMembraneRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      const orig = originalMembranePositions;

      for (let i = 0; i < orig.length; i += 3) {
        const ox = orig[i];
        const oy = orig[i + 1];
        const oz = orig[i + 2];
        const len = Math.hypot(ox, oy, oz) || 1;

        // Multi-harmonic biological fluid wave displacement
        const wave =
          Math.sin(ox * 1.3 + t * 1.6) * Math.cos(oy * 1.2 + t * 1.3) * 0.18 +
          Math.sin(oz * 2.2 + t * 0.8) * 0.11 +
          Math.cos(ox * 3.1 + oz * 2.6 + t * 2.1) * 0.06;

        const factor = (len + wave) / len;
        arr[i] = ox * factor;
        arr[i + 1] = oy * factor;
        arr[i + 2] = oz * factor;
      }
      posAttr.needsUpdate = true;
      outerMembraneRef.current.geometry.computeVertexNormals();
    }

    // Dense nucleolus breathing pulse
    if (nucleolusRef.current) {
      const s = 1.0 + Math.sin(t * 2.2) * 0.05;
      nucleolusRef.current.scale.set(s, s, s);
    }

    // Slow rotation of chromatin inside the nucleus
    if (chromatinGroupRef.current) {
      chromatinGroupRef.current.rotation.y += delta * 0.1;
      chromatinGroupRef.current.rotation.x = Math.sin(t * 0.4) * 0.06;
    }

    // Animate cytoplasmic soup particles
    if (vesiclesInstancedRef.current) {
      for (let i = 0; i < vesicleCount; i++) {
        const idx = i * 3;
        const x = vesiclePositions[idx] + Math.sin(t * 0.9 + i) * 0.18;
        const y = vesiclePositions[idx + 1] + Math.cos(t * 0.8 + i * 1.1) * 0.18;
        const z = vesiclePositions[idx + 2] + Math.sin(t * 0.7 + i * 0.4) * 0.18;
        dummy.position.set(x, y, z);
        const sc = 0.075 + (i % 3) * 0.035;
        dummy.scale.set(sc, sc, sc);
        dummy.updateMatrix();
        vesiclesInstancedRef.current.setMatrixAt(i, dummy.matrix);
      }
      vesiclesInstancedRef.current.instanceMatrix.needsUpdate = true;
    }

    // Subtle gentle cell buoyancy
    if (cellGroupRef.current) {
      cellGroupRef.current.position.y = Math.sin(t * 0.7) * 0.12;
    }
  });

  const handleSelect = (e: { stopPropagation: () => void }, key: string) => {
    e.stopPropagation();
    soundSynth.playImpulse(1.0);
    const info = ORGANELLE_DATA[key];
    if (info) onSelectOrganelle(info);
  };

  return (
    <group ref={cellGroupRef} scale={[scale, scale, scale]}>
      {/* ============================================================== */}
      {/* 1. HIGH-REALISM PHOSPHOLIPID MEMBRANE (Pearlescent Translucent Shell) */}
      {/* ============================================================== */}
      <mesh
        ref={outerMembraneRef}
        onClick={(e) => handleSelect(e, 'membrane')}
      >
        <sphereGeometry args={[4.6, 80, 80]} />
        <meshPhysicalMaterial
          color="#00f0ff"
          transparent
          opacity={0.25}
          roughness={0.08}
          metalness={0.05}
          transmission={0.88}
          thickness={2.5}
          ior={1.42}
          reflectivity={0.75}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          emissive="#0284c7"
          emissiveIntensity={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Subsurface Inner Lipid Leaflet (Violet-Teal iridescence) */}
      <mesh>
        <sphereGeometry args={[4.48, 64, 64]} />
        <meshPhysicalMaterial
          color="#8b5cf6"
          transparent
          opacity={0.14}
          roughness={0.25}
          transmission={0.92}
          emissive="#a855f7"
          emissiveIntensity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Embedded Transmembrane Receptors, Ion Channels & Glycoprotein Trees */}
      <group>
        {glycoproteins.map((rec, i) => (
          <group key={`glyco-${i}`} position={rec.pos} rotation={rec.rot}>
            {/* Transmembrane Channel Core */}
            <mesh onClick={(e) => handleSelect(e, 'membrane')}>
              <cylinderGeometry args={[rec.scale, rec.scale * 1.3, rec.height, 8]} />
              <meshStandardMaterial
                color={rec.color}
                emissive={rec.color}
                emissiveIntensity={0.7}
                roughness={0.2}
                metalness={0.2}
              />
            </mesh>
            {/* Extracellular Glycoprotein Branch Bulb */}
            <mesh position={[0, rec.height * 0.65, 0]}>
              <sphereGeometry args={[rec.scale * 1.1, 8, 8]} />
              <meshStandardMaterial color="#ffffff" emissive={rec.color} emissiveIntensity={0.9} />
            </mesh>
            {/* Branching Glycan Antennae */}
            <mesh position={[rec.scale * 0.8, rec.height * 0.85, 0]} rotation={[0, 0, 0.4]}>
              <cylinderGeometry args={[0.02, 0.02, 0.25, 4]} />
              <meshBasicMaterial color="#facc15" />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 2. THE NUCLEUS & CHROMATIN (Royal Indigo Double Envelope + Nucleolus) */}
      {/* ============================================================== */}
      <group onClick={(e) => handleSelect(e, 'nucleus')}>
        {/* Outer Nuclear Envelope */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[2.05, 64, 64]} />
          <meshPhysicalMaterial
            color="#3b82f6"
            transparent
            opacity={0.42}
            roughness={0.22}
            metalness={0.15}
            transmission={0.65}
            thickness={1.8}
            emissive="#1d4ed8"
            emissiveIntensity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner Nuclear Lamina (Structural protein meshwork) */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.96, 32, 32]} />
          <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.18} />
        </mesh>

        {/* Golden Nuclear Pore Complexes (NPCs) */}
        {Array.from({ length: 36 }).map((_, i) => {
          const phi = (i / 36) * Math.PI;
          const theta = i * 2.3;
          const r = 2.06;
          const x = r * Math.sin(phi) * Math.cos(theta);
          const y = r * Math.sin(phi) * Math.sin(theta);
          const z = r * Math.cos(phi);
          return (
            <mesh key={`npc-${i}`} position={[x, y, z]} rotation={[phi, theta, 0]}>
              <torusGeometry args={[0.09, 0.03, 8, 16]} />
              <meshStandardMaterial
                color="#f59e0b"
                emissive="#fbbf24"
                emissiveIntensity={0.8}
                roughness={0.2}
              />
            </mesh>
          );
        })}

        {/* Dense Glowing Amber-Coral Nucleolus */}
        <mesh ref={nucleolusRef} position={[0, 0, 0]}>
          <sphereGeometry args={[0.82, 36, 36]} />
          <meshStandardMaterial
            color="#fb923c"
            emissive="#ea580c"
            emissiveIntensity={1.5}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>

        {/* Intricate Magenta-Violet Chromatin Loops */}
        <group ref={chromatinGroupRef}>
          {chromatinLoops.map((curve, idx) => (
            <mesh key={`chromatin-loop-${idx}`}>
              <tubeGeometry args={[curve, 64, 0.075, 8, true]} />
              <meshStandardMaterial
                color="#d946ef"
                emissive="#c084fc"
                emissiveIntensity={0.65}
                roughness={0.3}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* ============================================================== */}
      {/* 3. MITOCHONDRIA (3 Detailed Organelles with Visible Cristae Folds) */}
      {/* ============================================================== */}
      {/* Mitochondrion 1 (Upper Right) */}
      <group position={[2.6, 1.4, 0.8]} rotation={[0.4, 0.6, 0.3]} onClick={(e) => handleSelect(e, 'mitochondria')}>
        {/* Outer Membrane (Deep Crimson) */}
        <mesh>
          <capsuleGeometry args={[0.42, 1.25, 20, 24]} />
          <meshPhysicalMaterial
            color="#e11d48"
            transparent
            opacity={0.55}
            roughness={0.2}
            transmission={0.6}
            emissive="#be123c"
            emissiveIntensity={0.6}
          />
        </mesh>
        {/* Inner Cristae Shelves (Stacked Transverse Respiratory Folds) */}
        {[-0.4, -0.2, 0.0, 0.2, 0.4].map((yOff, cIdx) => (
          <mesh key={`cristae-1-${cIdx}`} position={[0, yOff, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.065, 16]} />
            <meshStandardMaterial color="#f59e0b" emissive="#fbbf24" emissiveIntensity={0.8} />
          </mesh>
        ))}
        {/* Mitochondrial Circular DNA Plasmids */}
        <mesh position={[0, 0, 0.22]} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.16, 0.02, 8, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* Mitochondrion 2 (Lower Left) */}
      <group position={[-2.4, -1.5, 1.1]} rotation={[-0.5, 0.4, -0.6]} onClick={(e) => handleSelect(e, 'mitochondria')}>
        <mesh>
          <capsuleGeometry args={[0.38, 1.1, 20, 24]} />
          <meshPhysicalMaterial
            color="#e11d48"
            transparent
            opacity={0.55}
            roughness={0.2}
            transmission={0.6}
            emissive="#be123c"
            emissiveIntensity={0.6}
          />
        </mesh>
        {[-0.3, -0.1, 0.1, 0.3].map((yOff, cIdx) => (
          <mesh key={`cristae-2-${cIdx}`} position={[0, yOff, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.055, 16]} />
            <meshStandardMaterial color="#f59e0b" emissive="#fbbf24" emissiveIntensity={0.8} />
          </mesh>
        ))}
      </group>

      {/* Mitochondrion 3 (Back Depth) */}
      <group position={[-1.2, -1.8, -1.8]} rotation={[0.6, -0.7, 0.3]} onClick={(e) => handleSelect(e, 'mitochondria')}>
        <mesh>
          <capsuleGeometry args={[0.36, 0.95, 16, 20]} />
          <meshPhysicalMaterial
            color="#e11d48"
            transparent
            opacity={0.5}
            transmission={0.6}
            emissive="#be123c"
            emissiveIntensity={0.5}
          />
        </mesh>
        {[-0.2, 0.0, 0.2].map((yOff, cIdx) => (
          <mesh key={`cristae-3-${cIdx}`} position={[0, yOff, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.24, 0.24, 0.05, 16]} />
            <meshStandardMaterial color="#f59e0b" emissive="#fbbf24" emissiveIntensity={0.8} />
          </mesh>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 4. ROUGH ENDOPLASMIC RETICULUM (Warm Coral Cisternae Studded with Ribosomes) */}
      {/* ============================================================== */}
      <group position={[0.8, -1.4, 1.4]} rotation={[0.55, 0.35, 0.45]} onClick={(e) => handleSelect(e, 'rer')}>
        {/* Layer 1 Inner Sheet */}
        <mesh>
          <torusGeometry args={[1.55, 0.16, 16, 48, Math.PI * 1.55]} />
          <meshStandardMaterial color="#fb923c" emissive="#ea580c" emissiveIntensity={0.5} roughness={0.25} />
        </mesh>
        {/* Layer 2 Mid Sheet */}
        <mesh position={[0.2, 0.35, -0.15]}>
          <torusGeometry args={[1.85, 0.14, 16, 48, Math.PI * 1.35]} />
          <meshStandardMaterial color="#fb923c" emissive="#ea580c" emissiveIntensity={0.5} roughness={0.25} />
        </mesh>
        {/* Layer 3 Outer Sheet */}
        <mesh position={[-0.1, -0.3, 0.2]}>
          <torusGeometry args={[2.1, 0.13, 16, 48, Math.PI * 1.15]} />
          <meshStandardMaterial color="#fb923c" emissive="#ea580c" emissiveIntensity={0.5} roughness={0.25} />
        </mesh>

        {/* Thousands of Polysomal Ribosomes Studded on Surface */}
        {Array.from({ length: 42 }).map((_, i) => {
          const ang = (i / 42) * Math.PI * 1.5;
          const rx = Math.cos(ang) * (1.55 + (i % 2) * 0.3);
          const ry = Math.sin(ang) * (1.55 + (i % 2) * 0.3);
          return (
            <mesh key={`ribo-rer-${i}`} position={[rx, ry, i % 2 === 0 ? 0.19 : -0.19]}>
              <sphereGeometry args={[0.075, 8, 8]} />
              <meshStandardMaterial color="#fde047" emissive="#eab308" emissiveIntensity={0.9} />
            </mesh>
          );
        })}
      </group>

      {/* ============================================================== */}
      {/* 5. SMOOTH ENDOPLASMIC RETICULUM (Mint-Teal Branching Tubules) */}
      {/* ============================================================== */}
      <group position={[-1.5, -2.1, 0.4]} rotation={[0.3, 0.5, -0.4]} onClick={(e) => handleSelect(e, 'ser')}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.9, 0.12, 12, 32, Math.PI * 1.4]} />
          <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0.4, 0.3, 0.3]} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.7, 0.1, 12, 32, Math.PI * 1.2]} />
          <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.5} roughness={0.3} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 6. GOLGI APPARATUS (Stacked Emerald/Cyan Cisternae + Budding Vesicles) */}
      {/* ============================================================== */}
      <group position={[-1.9, 1.9, -0.8]} rotation={[-0.35, 0.85, -0.25]} onClick={(e) => handleSelect(e, 'golgi')}>
        {/* Cisternae Stack (Cis -> Medial -> Trans) */}
        {[-0.3, -0.1, 0.1, 0.3, 0.5].map((zPos, gIdx) => (
          <mesh key={`golgi-disc-${gIdx}`} position={[0, 0, zPos]}>
            <torusGeometry args={[1.05 - gIdx * 0.09, 0.095, 14, 36, Math.PI * 0.85]} />
            <meshStandardMaterial
              color={gIdx < 2 ? '#06b6d4' : '#0891b2'}
              emissive={gIdx < 2 ? '#0284c7' : '#0e7490'}
              emissiveIntensity={0.65}
              roughness={0.25}
            />
          </mesh>
        ))}

        {/* Budding Secretory Transport Vesicles */}
        {[
          [0.8, 0.3, 0.4],
          [0.95, -0.1, 0.2],
          [0.75, 0.6, 0.5],
          [1.1, 0.2, -0.1],
          [0.6, -0.4, 0.3],
        ].map((vPos, vIdx) => (
          <mesh key={`golgi-ves-${vIdx}`} position={vPos as [number, number, number]}>
            <sphereGeometry args={[0.13, 12, 12]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 7. LYSOSOMES & PEROXISOMES (Acidic Digestive Vacuoles) */}
      {/* ============================================================== */}
      <group onClick={(e) => handleSelect(e, 'lysosome')}>
        {/* Lysosome 1 (Translucent Amber with Acid Hydrolase Core) */}
        <group position={[1.8, -2.4, -0.9]}>
          <mesh>
            <sphereGeometry args={[0.38, 20, 20]} />
            <meshPhysicalMaterial
              color="#f59e0b"
              transparent
              opacity={0.6}
              transmission={0.5}
              emissive="#d97706"
              emissiveIntensity={0.6}
            />
          </mesh>
          <mesh>
            <dodecahedronGeometry args={[0.18, 0]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Peroxisome 2 (Amethyst Violet with Crystalline Catalase Core) */}
        <group position={[-2.8, 0.3, -1.6]}>
          <mesh>
            <sphereGeometry args={[0.34, 20, 20]} />
            <meshPhysicalMaterial
              color="#8b5cf6"
              transparent
              opacity={0.6}
              transmission={0.5}
              emissive="#7c3aed"
              emissiveIntensity={0.6}
            />
          </mesh>
          <mesh>
            <octahedronGeometry args={[0.16, 0]} />
            <meshBasicMaterial color="#c084fc" />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 8. CENTROSOME & ORTHOGONAL CENTRIOLES (90-Degree Barrel Triplet Microtubules) */}
      {/* ============================================================== */}
      <group position={[0.4, 1.8, -1.2]} onClick={(e) => handleSelect(e, 'centrosome')}>
        {/* Centriole Mother Barrel */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.55, 9, 1, true]} />
          <meshStandardMaterial color="#6366f1" emissive="#4f46e5" emissiveIntensity={0.8} />
        </mesh>
        {/* Centriole Daughter Barrel (Orthogonal at exactly 90 degrees) */}
        <mesh position={[0.25, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.55, 9, 1, true]} />
          <meshStandardMaterial color="#6366f1" emissive="#4f46e5" emissiveIntensity={0.8} />
        </mesh>
        {/* Pericentriolar Matrix Cloud */}
        <mesh>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.18} wireframe />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 9. CYTOSKELETON STRUCTURAL WEB (Microtubules & Actin Scaffolding) */}
      {/* ============================================================== */}
      <group onClick={(e) => handleSelect(e, 'cytoskeleton')}>
        {microtubules.map((curve, mIdx) => (
          <mesh key={`mt-${mIdx}`}>
            <tubeGeometry args={[curve, 48, 0.042, 8, false]} />
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={0.55}
              transparent
              opacity={0.7}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 10. CYTOPLASMIC VESICLES & MACROMOLECULAR SOUP (Colloidal Fluid) */}
      {/* ============================================================== */}
      <instancedMesh ref={vesiclesInstancedRef} args={[undefined, undefined, vesicleCount]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0ea5e9"
          emissiveIntensity={0.7}
          roughness={0.2}
        />
      </instancedMesh>

      {/* ============================================================== */}
      {/* 11. HIDDEN QUANTUM COHERENCE BEACON (Easter Egg Discovery) */}
      {/* ============================================================== */}
      <group position={[3.2, -2.4, -1.4]} onClick={(e) => handleSelect(e, 'hidden_easter_egg')}>
        <mesh>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#f59e0b"
            emissiveIntensity={1.6}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.48, 0.025, 8, 24]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>
    </group>
  );
};
