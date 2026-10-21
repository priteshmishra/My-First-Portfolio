import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  pointerForce?: 'attract' | 'repel';
  forceStrength?: number;
  shockwave?: { x: number; y: number; time: number } | null;
  assembleSignature?: boolean;
  mouseWorldPos?: { x: number; y: number };
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 6000,
  pointerForce = 'repel',
  forceStrength = 1.2,
  shockwave = null,
  assembleSignature = false,
  mouseWorldPos = { x: 0, y: 0 },
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const bokehMeshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  // Multi-layer particle population
  const { origins, positions, velocities, signatureTargets, colors } = useMemo(() => {
    const origins = new Float32Array(count * 3);
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const signatureTargets = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00f0ff');
    const violet = new THREE.Color('#a855f7');
    const teal = new THREE.Color('#14b8a6');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Organic radial distribution with fluid depth
      const r = 3.5 + Math.cbrt(Math.random()) * 24;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = (Math.random() - 0.5) * 22;

      origins[idx] = x;
      origins[idx + 1] = y;
      origins[idx + 2] = z;

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;

      velocities[idx] = 0;
      velocities[idx + 1] = 0;
      velocities[idx + 2] = 0;

      // Stylized Bioverse Quantum Lemniscate Signature
      const t = (i / count) * Math.PI * 2;
      const sigScale = 7.5;
      const denom = 1 + Math.sin(t) * Math.sin(t);
      signatureTargets[idx] = (sigScale * Math.cos(t)) / denom;
      signatureTargets[idx + 1] = (sigScale * Math.sin(t) * Math.cos(t)) / denom;
      signatureTargets[idx + 2] = (Math.random() - 0.5) * 1.5;

      // Bioluminescent biological fluid colors
      const mix = Math.random();
      const col = mix < 0.55 ? cyan : mix < 0.85 ? violet : mix < 0.95 ? teal : white;
      colors[idx] = col.r;
      colors[idx + 1] = col.g;
      colors[idx + 2] = col.b;
    }

    return { origins, positions, velocities, signatureTargets, colors };
  }, [count]);

  // Out-of-focus background bokeh discs
  const bokehCount = 45;
  const bokehPositions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < bokehCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 8 + Math.random() * 18;
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r;
      const z = -12 - Math.random() * 10;
      const scale = 0.8 + Math.random() * 1.6;
      arr.push({ x, y, z, scale, speed: 0.1 + Math.random() * 0.2 });
    }
    return arr;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Set initial instance colors
  useEffect(() => {
    if (!meshRef.current) return;
    const col = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      col.setRGB(colors[idx], colors[idx + 1], colors[idx + 2]);
      meshRef.current.setColorAt(i, col);
    }
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [count, colors]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    // Pointer coordinates in world space (supplied directly from global window tracker)
    const pointerX = mouseWorldPos.x;
    const pointerY = mouseWorldPos.y;

    const shockwaveAge = shockwave ? t - shockwave.time : 999;
    const shockwaveRadius = shockwaveAge * 15; // Expanding shockwave wavefront

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      let targetX = origins[idx];
      let targetY = origins[idx + 1];
      let targetZ = origins[idx + 2];

      if (assembleSignature) {
        targetX = signatureTargets[idx];
        targetY = signatureTargets[idx + 1];
        targetZ = signatureTargets[idx + 2];
      } else {
        // Subtle ambient organic Brownian fluid drift
        targetX += Math.sin(t * 0.4 + i * 0.1) * 0.4;
        targetY += Math.cos(t * 0.35 + i * 0.12) * 0.4;
      }

      // 1. Spring return force toward resting origin / target
      const springK = assembleSignature ? 3.5 : 0.9;
      const fx = (targetX - positions[idx]) * springK;
      const fy = (targetY - positions[idx + 1]) * springK;
      const fz = (targetZ - positions[idx + 2]) * springK;

      velocities[idx] += fx * dt;
      velocities[idx + 1] += fy * dt;
      velocities[idx + 2] += fz * dt;

      // 2. Cursor Force Field (Repulsion / Attraction)
      const dxPointer = positions[idx] - pointerX;
      const dyPointer = positions[idx + 1] - pointerY;
      const distPointerSq = dxPointer * dxPointer + dyPointer * dyPointer;
      const influenceRadiusSq = 25; // 5 units radius

      if (distPointerSq < influenceRadiusSq && distPointerSq > 0.01) {
        const dist = Math.sqrt(distPointerSq);
        const factor = (1 - dist / 5) * forceStrength * 10;
        const sign = pointerForce === 'repel' ? 1 : -1;

        velocities[idx] += (dxPointer / dist) * factor * sign * dt;
        velocities[idx + 1] += (dyPointer / dist) * factor * sign * dt;
        // Subtle z-swirl
        velocities[idx + 2] += Math.sin(dist * 2) * factor * 0.3 * dt;
      }

      // 3. Click Shockwave Wavefront Radial Impulse
      if (shockwave && shockwaveAge < 1.6) {
        const dxShock = positions[idx] - shockwave.x;
        const dyShock = positions[idx + 1] - shockwave.y;
        const distShock = Math.hypot(dxShock, dyShock);
        const ringDist = Math.abs(distShock - shockwaveRadius);

        if (ringDist < 3.0) {
          const impulse = (1 - ringDist / 3.0) * (1 - shockwaveAge / 1.6) * 22;
          velocities[idx] += (dxShock / (distShock || 1)) * impulse * dt;
          velocities[idx + 1] += (dyShock / (distShock || 1)) * impulse * dt;
          velocities[idx + 2] += (Math.random() - 0.5) * impulse * 0.8 * dt;
        }
      }

      // 4. Viscous fluid damping
      const damping = 0.92;
      velocities[idx] *= damping;
      velocities[idx + 1] *= damping;
      velocities[idx + 2] *= damping;

      // Update positions
      positions[idx] += velocities[idx];
      positions[idx + 1] += velocities[idx + 1];
      positions[idx + 2] += velocities[idx + 2];

      // Update instanced matrix
      dummy.position.set(positions[idx], positions[idx + 1], positions[idx + 2]);
      const s = 0.05 + (i % 3) * 0.02;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Animate background bokeh discs
    if (bokehMeshRef.current) {
      for (let b = 0; b < bokehCount; b++) {
        const item = bokehPositions[b];
        const bx = item.x + Math.sin(t * item.speed + b) * 1.5;
        const by = item.y + Math.cos(t * item.speed * 0.8 + b) * 1.5;
        dummy.position.set(bx, by, item.z);
        dummy.scale.set(item.scale, item.scale, item.scale);
        dummy.updateMatrix();
        bokehMeshRef.current.setMatrixAt(b, dummy.matrix);
      }
      bokehMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Bioluminescent Reactive Particles */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial transparent opacity={0.75} />
      </instancedMesh>

      {/* Out-of-Focus Distant Biological Fluid Bokeh Discs */}
      <instancedMesh ref={bokehMeshRef} args={[undefined, undefined, bokehCount]}>
        <circleGeometry args={[1, 16]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
};
