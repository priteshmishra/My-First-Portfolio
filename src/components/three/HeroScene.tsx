import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { DNAHelix } from './DNAHelix';
import { WebGLFallback } from './WebGLFallback';
import { useIntersectionVisibility } from '../../hooks/useIntersectionVisibility';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroSceneProps {
  className?: string;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionVisibility(containerRef);
  const { reducedMotion } = useReducedMotion();
  const [pointer, setPointer] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Check WebGL support safely
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Track pointer on desktop for gentle 3D tilt
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setPointer({ x, y });
  };

  const handlePointerLeave = () => {
    setPointer({ x: 0, y: 0 });
  };

  if (!hasWebGL) {
    return (
      <div ref={containerRef} className={`relative w-full h-full min-h-[380px] ${className}`}>
        <WebGLFallback title="Interactive DNA Helix (Static Representation)" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full h-[380px] sm:h-[460px] lg:h-[540px] rounded-2xl bg-gradient-to-b from-[#101722] to-[#0A0F17] border border-bio-border/30 overflow-hidden shadow-card transition-shadow hover:shadow-card-hover group ${className}`}
      role="region"
      aria-label="Interactive 3D visualization of the DNA double helix"
    >
      {/* Visual Scientific Grid Background */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #00BCD4 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Scientific Orientation Tag */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-bio-cyan animate-pulse" />
        <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase bg-slate-900/80 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-sm">
          3D Procedural B-DNA &bull; Antiparallel
        </span>
      </div>

      {/* Subtle Interaction Hint */}
      <div className="absolute bottom-4 right-4 z-10 pointer-events-none hidden sm:block">
        <span className="text-[10px] font-mono text-slate-400 bg-slate-900/70 px-2 py-0.5 rounded border border-white/5">
          Pointer interactive
        </span>
      </div>

      {/* Three.js R3F Canvas */}
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          onCreated={() => setIsLoaded(true)}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Studio Scientific Lighting */}
          <ambientLight intensity={0.7} />
          {/* Key light */}
          <directionalLight position={[5, 6, 4]} intensity={1.2} color="#FFFFFF" />
          {/* Fill light (cyan tint) */}
          <directionalLight position={[-5, -3, 3]} intensity={0.6} color="#00BCD4" />
          {/* Rim light (violet tint) */}
          <directionalLight position={[0, -5, -4]} intensity={0.4} color="#7966D8" />

          <Suspense fallback={null}>
            <DNAHelix
              pointerPos={pointer}
              reducedMotion={reducedMotion}
              length={26}
              speed={0.2}
            />
          </Suspense>
        </Canvas>
      )}

      {/* Accessible textual explanation for screen readers */}
      <div className="sr-only">
        An interactive, rotatable 3D model of a DNA double helix. It features two helical sugar-phosphate backbones (cyan and violet) wrapped in an antiparallel orientation with interior Watson-Crick base-pair rungs (Adenine, Thymine, Guanine, and Cytosine) held together by hydrogen bonds.
      </div>
    </div>
  );
};
