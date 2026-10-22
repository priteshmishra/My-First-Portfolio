import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DNAHelixProps {
  pointerPos?: { x: number; y: number };
  reducedMotion?: boolean;
  length?: number;
  speed?: number;
  showAnnotations?: boolean;
  mode?: 'schematic' | 'ribbon' | 'bonds';
  onSelectFeature?: (name: string, description: string) => void;
}

export const DNAHelix: React.FC<DNAHelixProps> = ({
  pointerPos = { x: 0, y: 0 },
  reducedMotion = false,
  length = 24,
  speed = 0.25,
  showAnnotations = false,
  mode = 'schematic',
  onSelectFeature,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  // Procedural B-DNA Parameters (10.5 base pairs per helical turn, 34 Å pitch)
  const { strand1Curve, strand2Curve, basePairs } = useMemo(() => {
    const pts1: THREE.Vector3[] = [];
    const pts2: THREE.Vector3[] = [];
    const pairs: Array<{
      id: number;
      p1: THREE.Vector3;
      p2: THREE.Vector3;
      center: THREE.Vector3;
      b1: string;
      b2: string;
      color1: string;
      color2: string;
      bonds: number;
      y: number;
    }> = [];

    const radius = 1.6;
    const risePerBase = 0.42;
    const twistPerBase = (Math.PI * 2) / 10.5; // ~34.3 degrees per base pair

    // Sequence for alternating bases
    const sequence: Array<['A' | 'T' | 'G' | 'C', 'A' | 'T' | 'G' | 'C']> = [
      ['A', 'T'],
      ['G', 'C'],
      ['T', 'A'],
      ['C', 'G'],
      ['A', 'T'],
      ['C', 'G'],
      ['G', 'C'],
      ['T', 'A'],
    ];

    const baseColors: Record<string, string> = {
      A: '#00BCD4', // Cyan
      T: '#F59E0B', // Muted Amber
      G: '#7966D8', // Violet
      C: '#10B981', // Emerald
    };

    const halfLength = length / 2;

    for (let i = 0; i < length; i++) {
      const y = (i - halfLength) * risePerBase;
      const angle = i * twistPerBase;

      // Antiparallel major/minor groove phase offset (~140 degrees / 2.44 radians)
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;

      const x2 = Math.cos(angle + 2.44) * radius;
      const z2 = Math.sin(angle + 2.44) * radius;

      const p1 = new THREE.Vector3(x1, y, z1);
      const p2 = new THREE.Vector3(x2, y, z2);

      pts1.push(p1);
      pts2.push(p2);

      const [b1, b2] = sequence[i % sequence.length];
      const center = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

      pairs.push({
        id: i,
        p1,
        p2,
        center,
        b1,
        b2,
        color1: baseColors[b1],
        color2: baseColors[b2],
        bonds: b1 === 'A' || b1 === 'T' ? 2 : 3,
        y,
      });
    }

    const strand1Curve = new THREE.CatmullRomCurve3(pts1);
    const strand2Curve = new THREE.CatmullRomCurve3(pts2);

    return { strand1Curve, strand2Curve, basePairs: pairs };
  }, [length]);

  // Smooth rotation & interactive tilt frame loop
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!reducedMotion) {
      // Continuous gentle rotation around Y axis
      groupRef.current.rotation.y += delta * speed;

      // Pointer tilt reaction (smoothed with lerp)
      targetRotation.current.x = THREE.MathUtils.lerp(
        targetRotation.current.x,
        pointerPos.y * 0.35,
        0.05
      );
      targetRotation.current.y = THREE.MathUtils.lerp(
        targetRotation.current.y,
        pointerPos.x * 0.35,
        0.05
      );

      groupRef.current.rotation.x = targetRotation.current.x;
      groupRef.current.rotation.z = -targetRotation.current.y * 0.2;
    } else {
      // Reduced motion: static orientation
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.z = 0;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Strand 1 (5' to 3'): Cyan Sugar-Phosphate Backbone */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelectFeature?.(
            'Sugar-Phosphate Backbone (5\' to 3\')',
            'Composed of alternating deoxyribose sugar and phosphate groups linked by phosphodiester bonds, forming the structural perimeter of DNA.'
          );
        }}
      >
        <tubeGeometry args={[strand1Curve, 72, 0.12, 12, false]} />
        <meshStandardMaterial
          color="#00BCD4"
          roughness={0.25}
          metalness={0.2}
          emissive="#005B66"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Strand 2 (3' to 5'): Violet Sugar-Phosphate Backbone */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelectFeature?.(
            'Sugar-Phosphate Backbone (3\' to 5\')',
            'The complementary strand runs antiparallel to the first, oriented in opposite polarity to permit Watson-Crick hydrogen bonding between internal bases.'
          );
        }}
      >
        <tubeGeometry args={[strand2Curve, 72, 0.12, 12, false]} />
        <meshStandardMaterial
          color="#7966D8"
          roughness={0.25}
          metalness={0.2}
          emissive="#3A2E7A"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Watson-Crick Base Pair Rungs */}
      {basePairs.map((pair) => {
        const midPoint = pair.center;
        const dir1 = new THREE.Vector3().subVectors(midPoint, pair.p1);
        const len1 = dir1.length();
        const dir2 = new THREE.Vector3().subVectors(pair.p2, midPoint);
        const len2 = dir2.length();

        // Calculate rotation quaternions to align cylinders between endpoints
        const rot1 = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir1.clone().normalize()
        );
        const rot2 = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir2.clone().normalize()
        );

        const pos1 = new THREE.Vector3().addVectors(pair.p1, dir1.clone().multiplyScalar(0.5));
        const pos2 = new THREE.Vector3().addVectors(midPoint, dir2.clone().multiplyScalar(0.5));

        return (
          <group key={pair.id}>
            {/* Base 1 half-rung */}
            <mesh
              position={pos1}
              quaternion={rot1}
              onClick={(e) => {
                e.stopPropagation();
                onSelectFeature?.(
                  `Nucleotide Base: ${pair.b1}`,
                  `${pair.b1} forms ${pair.bonds} hydrogen bonds with complementary base ${pair.b2} across the helical axis.`
                );
              }}
            >
              <cylinderGeometry args={[0.07, 0.07, len1, 8]} />
              <meshStandardMaterial
                color={pair.color1}
                roughness={0.3}
                metalness={0.15}
              />
            </mesh>

            {/* Base 2 half-rung */}
            <mesh
              position={pos2}
              quaternion={rot2}
              onClick={(e) => {
                e.stopPropagation();
                onSelectFeature?.(
                  `Nucleotide Base: ${pair.b2}`,
                  `${pair.b2} forms ${pair.bonds} hydrogen bonds with complementary base ${pair.b1} across the helical axis.`
                );
              }}
            >
              <cylinderGeometry args={[0.07, 0.07, len2, 8]} />
              <meshStandardMaterial
                color={pair.color2}
                roughness={0.3}
                metalness={0.15}
              />
            </mesh>

            {/* Hydrogen Bond Junction (Subtle Sphere Marker) */}
            <mesh
              position={midPoint}
              onClick={(e) => {
                e.stopPropagation();
                onSelectFeature?.(
                  `Watson-Crick Hydrogen Bonding (${pair.b1}—${pair.b2})`,
                  `${pair.b1 === 'G' || pair.b1 === 'C' ? '3 hydrogen bonds (high thermodynamic stability)' : '2 hydrogen bonds (moderate thermodynamic stability)'} join this purine-pyrimidine pair.`
                );
              }}
            >
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial
                color="#FFFFFF"
                roughness={0.15}
                metalness={0.1}
                emissive="#A5F3FC"
                emissiveIntensity={0.3}
              />
            </mesh>

            {/* Backbone Junction Nodes */}
            <mesh position={pair.p1}>
              <sphereGeometry args={[0.11, 10, 10]} />
              <meshStandardMaterial color="#00BCD4" roughness={0.3} />
            </mesh>
            <mesh position={pair.p2}>
              <sphereGeometry args={[0.11, 10, 10]} />
              <meshStandardMaterial color="#7966D8" roughness={0.3} />
            </mesh>
          </group>
        );
      })}

      {/* Minimal subtle ambient counter-ion particles (low count for maximum performance) */}
      {!reducedMotion && (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  -2.1, 2.4, 1.2,
                  2.3, -1.8, -1.5,
                  -1.5, -3.2, 2.1,
                  1.9, 3.5, -0.8,
                  -2.4, 0.2, -1.8,
                  2.1, 1.4, 1.9,
                  0.5, -4.1, -1.2,
                  -1.8, 4.2, 0.9,
                  2.0, -2.5, 1.4,
                  -0.8, 1.9, -2.2,
                  1.4, -0.7, 2.0,
                  -2.0, -1.5, -1.6,
                ]),
                3,
              ]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.06}
            color="#00BCD4"
            transparent
            opacity={0.4}
            sizeAttenuation
          />
        </points>
      )}
    </group>
  );
};
