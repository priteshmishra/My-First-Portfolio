import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundSynth } from '../audio/soundSynth';

export interface BasePairInfo {
  pairIndex: number;
  base1: 'Adenine' | 'Thymine' | 'Guanine' | 'Cytosine';
  base2: 'Adenine' | 'Thymine' | 'Guanine' | 'Cytosine';
  bonds: number;
  biologicalNote: string;
}

interface DNAHelixSceneProps {
  onSelectBasePair?: (info: BasePairInfo) => void;
  speed?: number;
  isPlaying?: boolean;
  length?: number;
}

export const DNAHelixScene: React.FC<DNAHelixSceneProps> = ({
  onSelectBasePair,
  speed = 0.45,
  isPlaying = true,
  length = 28,
}) => {
  const helixGroupRef = useRef<THREE.Group>(null);
  const ionsRef = useRef<THREE.InstancedMesh>(null);

  // Generate continuous spline curves for the dual sugar-phosphate backbones
  const { strand1Curve, strand2Curve, basePairSteps } = useMemo(() => {
    const pts1: THREE.Vector3[] = [];
    const pts2: THREE.Vector3[] = [];
    const steps = [];

    const radius = 2.2;
    const risePerBase = 0.58;
    const twistPerBase = 0.598; // ~34.3 degrees per base (10.5 bp/turn of B-DNA)

    const baseSequence: Array<['A' | 'T' | 'G' | 'C', 'A' | 'T' | 'G' | 'C']> = [
      ['A', 'T'],
      ['G', 'C'],
      ['C', 'G'],
      ['T', 'A'],
      ['G', 'C'],
      ['A', 'T'],
      ['C', 'G'],
      ['T', 'A'],
    ];

    for (let i = 0; i < length; i++) {
      const y = (i - length / 2) * risePerBase;
      const angle = i * twistPerBase;

      // Antiparallel major/minor groove phase shift
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;

      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      pts1.push(new THREE.Vector3(x1, y, z1));
      pts2.push(new THREE.Vector3(x2, y, z2));

      const [b1, b2] = baseSequence[i % baseSequence.length];

      steps.push({
        y,
        angle,
        pos1: [x1, y, z1] as [number, number, number],
        pos2: [x2, y, z2] as [number, number, number],
        base1: b1,
        base2: b2,
        bonds: b1 === 'A' || b1 === 'T' ? 2 : 3,
      });
    }

    const strand1Curve = new THREE.CatmullRomCurve3(pts1);
    const strand2Curve = new THREE.CatmullRomCurve3(pts2);

    return { strand1Curve, strand2Curve, basePairSteps: steps };
  }, [length]);

  // Surrounding hydration shell / counter-ion cloud (Mg2+ / H2O dipoles)
  const ionCount = 60;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const ionOffsets = useMemo(() => {
    const arr = [];
    for (let i = 0; i < ionCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 2.8 + Math.random() * 1.6;
      const y = (Math.random() - 0.5) * 16;
      arr.push({ theta, r, y, speed: 0.25 + Math.random() * 0.35 });
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (helixGroupRef.current && isPlaying) {
      helixGroupRef.current.rotation.y += delta * speed;
      helixGroupRef.current.rotation.z = Math.sin(t * 0.5) * 0.04;
    }

    if (ionsRef.current) {
      for (let i = 0; i < ionCount; i++) {
        const ion = ionOffsets[i];
        const curAngle = ion.theta + t * ion.speed;
        const x = Math.cos(curAngle) * ion.r;
        const z = Math.sin(curAngle) * ion.r;
        const y = ion.y + Math.sin(t * 0.8 + i) * 0.3;
        dummy.position.set(x, y, z);
        dummy.scale.set(0.07, 0.07, 0.07);
        dummy.updateMatrix();
        ionsRef.current.setMatrixAt(i, dummy.matrix);
      }
      ionsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const handleBaseClick = (e: { stopPropagation: () => void }, stepIdx: number) => {
    e.stopPropagation();
    soundSynth.playClick();
    if (!onSelectBasePair) return;

    const step = basePairSteps[stepIdx];
    const nameMap = {
      A: 'Adenine',
      T: 'Thymine',
      G: 'Guanine',
      C: 'Cytosine',
    } as const;

    const b1Name = nameMap[step.base1];
    const b2Name = nameMap[step.base2];
    const note =
      step.bonds === 2
        ? 'Adenine-Thymine pairing forms 2 hydrogen bonds (N1-H...N3 and N6-H...O4). More thermally flexible than GC pairs.'
        : 'Guanine-Cytosine pairing forms 3 hydrogen bonds (O6...H-N4, N1-H...N3, and N2-H...O2). Confers high thermodynamic stability to the double helix.';

    onSelectBasePair({
      pairIndex: stepIdx + 1,
      base1: b1Name,
      base2: b2Name,
      bonds: step.bonds,
      biologicalNote: note,
    });
  };

  // Authentic biochemical color standards
  const baseColors = {
    A: '#10b981', // Adenine (Vibrant Emerald Green)
    T: '#ef4444', // Thymine (Warm Crimson Red)
    G: '#f59e0b', // Guanine (Radiant Golden Amber)
    C: '#3b82f6', // Cytosine (Deep Cobalt Blue)
  };

  return (
    <group ref={helixGroupRef}>
      {/* 1. Strand 1 Continuous Sugar-Phosphate High-Gloss Ribbon (Cyan) */}
      <mesh>
        <tubeGeometry args={[strand1Curve, 140, 0.18, 12, false]} />
        <meshPhysicalMaterial
          color="#00f0ff"
          roughness={0.15}
          metalness={0.25}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          emissive="#00f0ff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* 2. Strand 2 Continuous Sugar-Phosphate High-Gloss Ribbon (Violet) */}
      <mesh>
        <tubeGeometry args={[strand2Curve, 140, 0.18, 12, false]} />
        <meshPhysicalMaterial
          color="#8b5cf6"
          roughness={0.15}
          metalness={0.25}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* 3. Detailed Nucleotide Base Ladder Steps */}
      {basePairSteps.map((step, i) => {
        const x1 = step.pos1[0];
        const y1 = step.pos1[1];
        const z1 = step.pos1[2];

        const x2 = step.pos2[0];
        const y2 = step.pos2[1];
        const z2 = step.pos2[2];

        const isPurine1 = step.base1 === 'A' || step.base1 === 'G';
        const isPurine2 = step.base2 === 'A' || step.base2 === 'G';

        return (
          <group key={`dna-step-${i}`}>
            {/* Base 1 (From Strand 1 toward center) */}
            <group
              position={[x1 * 0.55, y1, z1 * 0.55]}
              rotation={[0, -step.angle, 0]}
              onClick={(e) => handleBaseClick(e, i)}
            >
              {/* Purine (larger two-ring) vs Pyrimidine (single-ring) */}
              <mesh position={[isPurine1 ? 0.18 : 0, 0, 0]}>
                <cylinderGeometry args={[isPurine1 ? 0.42 : 0.3, isPurine1 ? 0.42 : 0.3, 0.13, 6]} />
                <meshStandardMaterial
                  color={baseColors[step.base1]}
                  emissive={baseColors[step.base1]}
                  emissiveIntensity={0.6}
                  roughness={0.2}
                />
              </mesh>
            </group>

            {/* Base 2 (From Strand 2 toward center) */}
            <group
              position={[x2 * 0.55, y2, z2 * 0.55]}
              rotation={[0, -step.angle, 0]}
              onClick={(e) => handleBaseClick(e, i)}
            >
              <mesh position={[isPurine2 ? -0.18 : 0, 0, 0]}>
                <cylinderGeometry args={[isPurine2 ? 0.42 : 0.3, isPurine2 ? 0.42 : 0.3, 0.13, 6]} />
                <meshStandardMaterial
                  color={baseColors[step.base2]}
                  emissive={baseColors[step.base2]}
                  emissiveIntensity={0.6}
                  roughness={0.2}
                />
              </mesh>
            </group>

            {/* Glowing Discrete Hydrogen Bond Bridges (2 or 3 distinct bridges) */}
            {Array.from({ length: step.bonds }).map((_, bIdx) => {
              const yBond = y1 + (bIdx - (step.bonds - 1) / 2) * 0.15;
              return (
                <mesh
                  key={`hbond-${bIdx}`}
                  position={[0, yBond, 0]}
                  rotation={[0, -step.angle, 0]}
                  onClick={(e) => handleBaseClick(e, i)}
                >
                  <cylinderGeometry args={[0.038, 0.038, 0.68, 8]} />
                  <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
                </mesh>
              );
            })}

            {/* Connecting Sugar-Phosphate Deoxyribose Rings */}
            <mesh position={[x1, y1, z1]}>
              <sphereGeometry args={[0.24, 16, 16]} />
              <meshStandardMaterial
                color="#00f0ff"
                emissive="#00f0ff"
                emissiveIntensity={0.6}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[x2, y2, z2]}>
              <sphereGeometry args={[0.24, 16, 16]} />
              <meshStandardMaterial
                color="#8b5cf6"
                emissive="#8b5cf6"
                emissiveIntensity={0.6}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}

      {/* 4. Surrounding Hydration Counter-Ions (Mg2+ / H2O) */}
      <instancedMesh ref={ionsRef} args={[undefined, undefined, ionCount]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color="#a7f3d0" transparent opacity={0.65} />
      </instancedMesh>
    </group>
  );
};
