import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CellScene, OrganelleInfo } from './CellScene';
import { DNAHelixScene, BasePairInfo } from './DNAHelixScene';
import { ParticleField } from './ParticleField';
import { FallbackScene } from '../components/accessibility/FallbackScene';
import { PerformanceTier } from '../hooks/usePerformanceTier';
import { soundSynth } from '../audio/soundSynth';

export type JourneyStage = 'cellular' | 'membrane' | 'nucleus' | 'dna' | 'ambient';

interface InteractiveRigProps {
  stage: JourneyStage;
  reducedMotion: boolean;
  onPointerCoordUpdate: (coords: { x: number; y: number }) => void;
  dragRotation: { x: number; y: number };
}

const InteractiveRig: React.FC<InteractiveRigProps> = ({
  stage,
  reducedMotion,
  onPointerCoordUpdate,
  dragRotation,
}) => {
  const { camera, viewport, pointer } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 14));
  const rigGroupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    switch (stage) {
      case 'cellular':
        targetPos.current.set(0, 0, 13.5);
        break;
      case 'membrane':
        targetPos.current.set(0, 0, 6.2);
        break;
      case 'nucleus':
        targetPos.current.set(0, 0, 3.2);
        break;
      case 'dna':
        targetPos.current.set(0, 0, 8.5);
        break;
      case 'ambient':
      default:
        targetPos.current.set(0, 0, 16.5);
        break;
    }
  }, [stage]);

  useFrame((state, delta) => {
    // Project pointer into 3D world plane at z=0
    const worldX = (state.pointer.x * viewport.width) / 2;
    const worldY = (state.pointer.y * viewport.height) / 2;
    onPointerCoordUpdate({ x: worldX, y: worldY });

    if (reducedMotion) {
      camera.position.copy(targetPos.current);
      camera.lookAt(0, 0, 0);
      return;
    }

    // Camera travel interpolation
    camera.position.lerp(targetPos.current, Math.min(delta * 2.5, 0.15));

    // Subtle parallax
    const px = state.pointer.x * 0.35;
    const py = state.pointer.y * 0.35;
    camera.lookAt(px, py, 0);

    // Apply interactive drag rotation to the rig group
    if (rigGroupRef.current) {
      rigGroupRef.current.rotation.y = THREE.MathUtils.lerp(rigGroupRef.current.rotation.y, dragRotation.y, 0.1);
      rigGroupRef.current.rotation.x = THREE.MathUtils.lerp(rigGroupRef.current.rotation.x, dragRotation.x, 0.1);
    }
  });

  return null;
};

interface MasterCanvasProps {
  stage: JourneyStage;
  performanceTier: PerformanceTier;
  reducedMotion: boolean;
  onSelectOrganelle: (info: OrganelleInfo) => void;
  onSelectBasePair?: (info: BasePairInfo) => void;
  assembleSignature?: boolean;
}

export const MasterCanvas: React.FC<MasterCanvasProps> = ({
  stage,
  performanceTier,
  reducedMotion,
  onSelectOrganelle,
  onSelectBasePair,
  assembleSignature = false,
}) => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [mouseWorldPos, setMouseWorldPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [shockwave, setShockwave] = useState<{ x: number; y: number; time: number } | null>(null);

  // Drag-to-rotate state for full interactive agency
  const [dragRotation, setDragRotation] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  const particleCounts = {
    low: 2500,
    medium: 6500,
    high: 14000,
  }[performanceTier];

  // Global window pointer listener: guarantees mouse tracking anywhere on screen
  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      // Calculate normalized coords
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      const estWorldX = nx * 11;
      const estWorldY = ny * 7;
      setMouseWorldPos({ x: estWorldX, y: estWorldY });

      // Handle drag rotation
      if (isDraggingRef.current) {
        const dx = e.clientX - lastMousePosRef.current.x;
        const dy = e.clientY - lastMousePosRef.current.y;
        lastMousePosRef.current = { x: e.clientX, y: e.clientY };

        setDragRotation((prev) => ({
          x: Math.max(Math.min(prev.x + dy * 0.005, 0.8), -0.8),
          y: prev.y + dx * 0.006,
        }));
      }
    };

    const handleGlobalPointerDown = (e: PointerEvent) => {
      // Check if user is clicking inside an input or form field
      const target = e.target as HTMLElement;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };

      if (!isInput) {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = -((e.clientY / window.innerHeight) * 2 - 1);
        const estWorldX = nx * 11;
        const estWorldY = ny * 7;

        soundSynth.playImpulse(1.0);
        setShockwave({ x: estWorldX, y: estWorldY, time: performance.now() / 1000 });
      }
    };

    const handleGlobalPointerUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true });
    window.addEventListener('pointerdown', handleGlobalPointerDown, { passive: true });
    window.addEventListener('pointerup', handleGlobalPointerUp, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerdown', handleGlobalPointerDown);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
    };
  }, []);

  const handlePointerUpdate = useCallback((coords: { x: number; y: number }) => {
    setMouseWorldPos(coords);
  }, []);

  if (!hasWebGL) {
    return <FallbackScene />;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-auto overflow-hidden bg-space-950">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 45 }}
        dpr={performanceTier === 'low' ? 1 : performanceTier === 'medium' ? 1.5 : 2}
        gl={{
          antialias: performanceTier !== 'low',
          alpha: false,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl, scene }) => {
          if (!gl) setHasWebGL(false);
          // Atmospheric biological fluid fog
          scene.fog = new THREE.FogExp2('#020617', 0.022);
        }}
      >
        {/* Cinematic Blender-Grade Biological Lighting Architecture */}
        <ambientLight intensity={0.5} color="#0f172a" />
        {/* Luminous Grazing Cyan Rim Light */}
        <directionalLight position={[14, 18, 14]} intensity={2.8} color="#00f0ff" />
        {/* Warm Amber/Coral Front Key Light */}
        <directionalLight position={[8, -10, 10]} intensity={1.5} color="#fb923c" />
        {/* Violet / Ultraviolet Depth Backlight */}
        <directionalLight position={[-14, -14, -12]} intensity={2.4} color="#a855f7" />
        {/* Internal Nucleolus Bioluminescent Core Light */}
        <pointLight position={[0, 0, 0]} intensity={2.6} color="#f97316" distance={10} />
        {/* Sub-surface Cytoplasmic Illumination */}
        <pointLight position={[0, 0, 4]} intensity={1.8} color="#38bdf8" distance={18} />
        <pointLight position={[-2, -2, -2]} intensity={1.4} color="#ec4899" distance={12} />

        <InteractiveRig
          stage={stage}
          reducedMotion={reducedMotion}
          onPointerCoordUpdate={handlePointerUpdate}
          dragRotation={dragRotation}
        />

        {/* Global Reactive Particle Field with Cursor Force Field & Bokeh */}
        <ParticleField
          count={particleCounts}
          pointerForce="repel"
          forceStrength={1.3}
          shockwave={shockwave}
          assembleSignature={assembleSignature}
          mouseWorldPos={mouseWorldPos}
        />

        {/* Biological Interactive Cell Scene */}
        {(stage === 'cellular' || stage === 'membrane' || stage === 'nucleus' || stage === 'ambient') && (
          <group rotation={[dragRotation.x, dragRotation.y, 0]}>
            <CellScene onSelectOrganelle={onSelectOrganelle} />
          </group>
        )}

        {/* Procedural DNA Double Helix Scene */}
        {stage === 'dna' && (
          <group rotation={[dragRotation.x, dragRotation.y, 0]}>
            <DNAHelixScene onSelectBasePair={onSelectBasePair} isPlaying={!reducedMotion} />
          </group>
        )}
      </Canvas>
    </div>
  );
};
