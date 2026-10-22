import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface DNAWorldProps {
  pointer: { x: number; y: number };
  scrollY: number;
  reducedMotion: boolean;
}

const DNAWorld: React.FC<DNAWorldProps> = ({ pointer, scrollY, reducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const isDesktop = viewport.width > 9;

  // Procedural elongated B-DNA double helix (40 base pairs)
  const { strand1Curve, strand2Curve, basePairs } = useMemo(() => {
    const pts1: THREE.Vector3[] = [];
    const pts2: THREE.Vector3[] = [];
    const pairs: Array<{
      id: number;
      p1: THREE.Vector3;
      p2: THREE.Vector3;
      center: THREE.Vector3;
      color1: string;
      color2: string;
      b1: string;
      b2: string;
    }> = [];

    const length = 40;
    const radius = 1.75;
    const risePerBase = 0.44;
    const twistPerBase = (Math.PI * 2) / 10.5; // ~34.3 degrees per base pair

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
      T: '#F59E0B', // Amber
      G: '#7966D8', // Violet
      C: '#10B981', // Emerald
    };

    const halfLength = length / 2;

    for (let i = 0; i < length; i++) {
      const y = (i - halfLength) * risePerBase;
      const angle = i * twistPerBase;

      // Antiparallel major/minor groove phase shift (~140 degrees / 2.44 radians)
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
        color1: baseColors[b1],
        color2: baseColors[b2],
        b1,
        b2,
      });
    }

    const strand1Curve = new THREE.CatmullRomCurve3(pts1);
    const strand2Curve = new THREE.CatmullRomCurve3(pts2);

    return { strand1Curve, strand2Curve, basePairs: pairs };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!reducedMotion) {
      // Continuous silky smooth rotation around Y axis
      groupRef.current.rotation.y += delta * 0.16;

      // Pointer tilt reaction with cinematic Apple-style smooth damping
      targetRotation.current.x = THREE.MathUtils.lerp(
        targetRotation.current.x,
        pointer.y * 0.22,
        0.04
      );
      targetRotation.current.y = THREE.MathUtils.lerp(
        targetRotation.current.y,
        pointer.x * 0.22,
        0.04
      );

      groupRef.current.rotation.x = targetRotation.current.x;
      groupRef.current.rotation.z = -targetRotation.current.y * 0.12;

      // Subtle scroll parallax
      const scrollRotation = scrollY * 0.0008;
      groupRef.current.rotation.y += delta * 0.04 + scrollRotation * 0.008;
      
      // Position DNA: slightly offset to the right on desktop for perfect balance with text
      const targetX = isDesktop ? 2.3 : 0;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.04);
      
      // Gentle floating vertical oscillation
      const floatY = Math.sin(state.clock.elapsedTime * 0.7) * 0.18;
      groupRef.current.position.y = floatY;
    }
  });

  return (
    <group ref={groupRef} position={[isDesktop ? 2.3 : 0, 0, 0]}>
      {/* Strand 1 (5' to 3'): Cyan Sugar-Phosphate Backbone */}
      <mesh>
        <tubeGeometry args={[strand1Curve, 140, 0.135, 12, false]} />
        <meshStandardMaterial
          color="#00BCD4"
          roughness={0.22}
          metalness={0.25}
          emissive="#005B66"
          emissiveIntensity={0.28}
        />
      </mesh>

      {/* Strand 2 (3' to 5'): Violet Sugar-Phosphate Backbone */}
      <mesh>
        <tubeGeometry args={[strand2Curve, 140, 0.135, 12, false]} />
        <meshStandardMaterial
          color="#7966D8"
          roughness={0.22}
          metalness={0.25}
          emissive="#3A2E7A"
          emissiveIntensity={0.28}
        />
      </mesh>

      {/* Base-Pair Rungs */}
      {basePairs.map((pair) => {
        const midPoint = pair.center;
        const dir1 = new THREE.Vector3().subVectors(midPoint, pair.p1);
        const len1 = dir1.length();
        const dir2 = new THREE.Vector3().subVectors(pair.p2, midPoint);
        const len2 = dir2.length();

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
            {/* Half 1 */}
            <mesh position={pos1} quaternion={rot1}>
              <cylinderGeometry args={[0.075, 0.075, len1, 8]} />
              <meshStandardMaterial color={pair.color1} roughness={0.28} metalness={0.18} />
            </mesh>
            {/* Half 2 */}
            <mesh position={pos2} quaternion={rot2}>
              <cylinderGeometry args={[0.075, 0.075, len2, 8]} />
              <meshStandardMaterial color={pair.color2} roughness={0.28} metalness={0.18} />
            </mesh>
            {/* Hydrogen bond center sphere */}
            <mesh position={midPoint}>
              <sphereGeometry args={[0.085, 12, 12]} />
              <meshStandardMaterial
                color="#FFFFFF"
                roughness={0.12}
                emissive="#A5F3FC"
                emissiveIntensity={0.4}
              />
            </mesh>
            {/* Backbone junction nodes */}
            <mesh position={pair.p1}>
              <sphereGeometry args={[0.13, 10, 10]} />
              <meshStandardMaterial color="#00BCD4" roughness={0.25} />
            </mesh>
            <mesh position={pair.p2}>
              <sphereGeometry args={[0.13, 10, 10]} />
              <meshStandardMaterial color="#7966D8" roughness={0.25} />
            </mesh>
          </group>
        );
      })}

      {/* Minimal ambient floating particles */}
      {!reducedMotion && (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  -3.4, 4.5, 1.8,
                  3.8, -3.2, -1.9,
                  -2.6, -5.5, 2.5,
                  3.1, 5.8, -1.2,
                  -4.1, 1.4, -2.6,
                  3.6, 2.6, 2.4,
                  1.4, -6.5, -1.6,
                  -3.1, 6.8, 1.3,
                  3.4, -4.8, 2.0,
                  -1.6, 3.4, -3.5,
                  2.6, -1.9, 3.1,
                  -3.2, -2.8, -2.8,
                  -2.0, -7.5, 1.6,
                  2.7, 8.2, -2.1,
                ]),
                3,
              ]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.065}
            color="#00BCD4"
            transparent
            opacity={0.45}
            sizeAttenuation
          />
        </points>
      )}
    </group>
  );
};

export const FullPageDNA: React.FC = () => {
  const { reducedMotion } = useReducedMotion();
  const [pointer, setPointer] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState<number>(0);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Global mouse & scroll tracking
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (reducedMotion) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      setPointer({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible');
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [reducedMotion]);

  if (!hasWebGL) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    >
      {/* Subtle radial lighting vignette in background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          background: 'radial-gradient(circle at 65% 42%, rgba(0, 188, 212, 0.09) 0%, rgba(121, 102, 216, 0.05) 35%, transparent 75%)',
        }}
      />

      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 9.5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          {/* Studio Scientific Lighting */}
          <ambientLight intensity={0.9} />
          <directionalLight position={[6, 8, 6]} intensity={1.35} color="#FFFFFF" />
          <directionalLight position={[-6, -4, 4]} intensity={0.75} color="#00BCD4" />
          <directionalLight position={[0, -6, -4]} intensity={0.55} color="#7966D8" />

          <Suspense fallback={null}>
            <DNAWorld
              pointer={pointer}
              scrollY={scrollY}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};
