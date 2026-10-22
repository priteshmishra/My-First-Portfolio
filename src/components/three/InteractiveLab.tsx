import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { DNAHelix } from './DNAHelix';
import { WebGLFallback } from './WebGLFallback';
import { RotateCcw, ZoomIn, ZoomOut, Info, Layers, Eye, CheckCircle2 } from 'lucide-react';
import { useIntersectionVisibility } from '../../hooks/useIntersectionVisibility';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Annotation {
  id: string;
  name: string;
  shortDesc: string;
  detailedText: string;
  scientificConcept: string;
}

const ANNOTATIONS: Annotation[] = [
  {
    id: 'backbone',
    name: 'Sugar-Phosphate Backbone',
    shortDesc: 'Structural perimeter of alternating deoxyribose and phosphates',
    detailedText:
      'The outer structural scaffold of DNA is formed by alternating 2\'-deoxyribose sugar rings and phosphate groups connected by phosphodiester linkages. Its negative charge enables electrostatic solubility in aqueous cellular environments.',
    scientificConcept: 'Phosphodiester bonds & Antiparallel orientation (5\' → 3\' / 3\' → 5\')',
  },
  {
    id: 'base-pairing',
    name: 'Watson-Crick Base Pairs',
    shortDesc: 'A-T (2 H-bonds) and G-C (3 H-bonds) complementary matching',
    detailedText:
      'Purine bases (Adenine, Guanine) pair exclusively with pyrimidine bases (Thymine, Cytosine). A pairs with T via 2 hydrogen bonds; G pairs with C via 3 hydrogen bonds. This constant geometry ensures a uniform 2.0 nm (~20 Å) helical diameter.',
    scientificConcept: 'Complementary base pairing & Thermodynamic stability',
  },
  {
    id: 'major-groove',
    name: 'Major Groove',
    shortDesc: 'Wide helical indentation exposing sequence-specific chemical patterns',
    detailedText:
      'Because the glycosidic bonds do not lie directly opposite one another, the double helix features alternating wide (major) and narrow (minor) grooves. The major groove (~22 Å) allows transcription factors and regulatory proteins to recognize specific base sequences without unwinding the helix.',
    scientificConcept: 'Sequence-specific protein-DNA binding & Gene regulation',
  },
  {
    id: 'minor-groove',
    name: 'Minor Groove',
    shortDesc: 'Narrow helical groove (~12 Å) interacting with structural proteins',
    detailedText:
      'The minor groove is narrower (~12 Å wide) and less variable in its hydrogen-bonding signature. It is frequently targeted by non-sequence-specific DNA-bending architectural proteins and certain minor-groove binding therapeutic molecules.',
    scientificConcept: 'Helical pitch & Non-specific chromatin compaction',
  },
];

export const InteractiveLab: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const isVisible = useIntersectionVisibility(containerRef);
  const { reducedMotion } = useReducedMotion();

  const [activeAnnotation, setActiveAnnotation] = useState<Annotation>(ANNOTATIONS[0]);
  const [displayMode, setDisplayMode] = useState<'schematic' | 'ribbon' | 'bonds'>('schematic');
  const [zoomLevel, setZoomLevel] = useState<number>(7.5);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  React.useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    setZoomLevel(7.5);
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => {
      const next = Math.max(4.5, Math.min(12, prev + delta));
      return next;
    });
  };

  return (
    <div className="w-full glass-apple shadow-card overflow-hidden">
      {/* Laboratory Control Bar Header */}
      <div className="px-5 py-4 border-b border-slate-200/60 glass-apple-secondary flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-bio-cyan animate-pulse" />
          <div>
            <h3 className="text-sm font-semibold text-bio-text">
              3D Macromolecular Visualizer &bull; Schematic B-DNA
            </h3>
            <p className="text-[11px] font-mono text-bio-muted">
              Procedural geometry &bull; 10.5 bp/turn &bull; Antiparallel Watson-Crick Double Helix
            </p>
          </div>
        </div>

        {/* Display Mode Switcher */}
        <div className="flex items-center gap-1 glass-apple-pill p-1 rounded-xl">
          <span className="text-[11px] font-mono text-bio-muted px-2 hidden sm:inline flex items-center gap-1">
            <Layers className="w-3 h-3 text-bio-cyan-dark" /> Mode:
          </span>
          {(['schematic', 'bonds', 'ribbon'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setDisplayMode(mode)}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-colors ${
                displayMode === mode
                  ? 'bg-bio-cyan/20 text-bio-cyan-dark font-semibold border border-bio-cyan/40 shadow-sm'
                  : 'text-slate-600 hover:text-bio-text hover:bg-white/60'
              }`}
            >
              {mode === 'schematic' ? 'Standard' : mode === 'bonds' ? 'Base-Pair Focus' : 'Ribbons'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Lab Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* 3D Dark Scientific Viewport */}
        <div
          ref={containerRef}
          className="lg:col-span-8 relative h-[380px] sm:h-[480px] bg-[#101722] text-slate-200 overflow-hidden"
          role="region"
          aria-label="Interactive 3D molecular canvas"
        >
          {/* Scientific Grid overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #00BCD4 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Viewport Overlay Controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-white/10 backdrop-blur-md shadow-md">
            <button
              onClick={() => handleZoom(-1)}
              aria-label="Zoom in 3D scene"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-bio-cyan hover:bg-white/10 transition-colors focus-visible:ring-1 focus-visible:ring-bio-cyan"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom(1)}
              aria-label="Zoom out 3D scene"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-bio-cyan hover:bg-white/10 transition-colors focus-visible:ring-1 focus-visible:ring-bio-cyan"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <div className="w-full h-px bg-white/10 my-0.5" />
            <button
              onClick={handleResetView}
              aria-label="Reset 3D camera orientation"
              title="Reset View"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-bio-cyan hover:bg-white/10 transition-colors focus-visible:ring-1 focus-visible:ring-bio-cyan"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Interaction Notice */}
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
            <span className="text-[10px] font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
              Drag to rotate &bull; Touch-enabled &bull; No scroll hijacking
            </span>
          </div>

          {/* Canvas */}
          {!hasWebGL ? (
            <WebGLFallback title="Interactive DNA Helix" />
          ) : isVisible ? (
            <Canvas
              camera={{ position: [0, 0, zoomLevel], fov: 45 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[6, 8, 5]} intensity={1.3} color="#FFFFFF" />
              <directionalLight position={[-6, -4, 4]} intensity={0.7} color="#00BCD4" />
              <directionalLight position={[0, -6, -4]} intensity={0.4} color="#7966D8" />

              <OrbitControls
                ref={controlsRef}
                enablePan={false}
                enableZoom={false}
                rotateSpeed={0.8}
                dampingFactor={0.08}
                enableDamping={!reducedMotion}
              />

              <Suspense fallback={null}>
                <DNAHelix
                  reducedMotion={reducedMotion}
                  length={displayMode === 'bonds' ? 18 : 28}
                  speed={reducedMotion ? 0 : 0.15}
                  mode={displayMode}
                  onSelectFeature={(name) => {
                    const matched = ANNOTATIONS.find((a) => name.toLowerCase().includes(a.id));
                    if (matched) {
                      setActiveAnnotation(matched);
                    }
                  }}
                />
              </Suspense>
            </Canvas>
          ) : null}
        </div>

        {/* Right Side: Scientific Components & Clickable Annotations Explorer */}
        <div className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200/60 bg-white/80">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-bio-cyan-dark" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-bio-muted font-bold">
                Clickable Scientific Annotations
              </h4>
            </div>

            {/* Annotation Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 mb-5">
              {ANNOTATIONS.map((ann) => {
                const isSelected = activeAnnotation.id === ann.id;
                return (
                  <button
                    key={ann.id}
                    onClick={() => setActiveAnnotation(ann)}
                    className={`text-left p-3 rounded-xl border transition-all text-xs ${
                      isSelected
                        ? 'bg-bio-cyan/15 border-bio-cyan text-bio-text font-semibold shadow-sm'
                        : 'glass-apple-secondary text-slate-700 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-medium">{ann.name}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-bio-cyan-dark shrink-0" />}
                    </div>
                    <span className="text-[11px] text-slate-500 font-normal block mt-0.5 line-clamp-1">
                      {ann.shortDesc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Component Detailed Inspector Card */}
            <div className="p-4 rounded-xl glass-apple-secondary text-xs space-y-2.5">
              <div className="flex items-center gap-1.5 text-bio-cyan-dark font-mono font-semibold">
                <Eye className="w-3.5 h-3.5" />
                <span>Selected: {activeAnnotation.name}</span>
              </div>
              <p className="text-slate-700 leading-relaxed font-sans text-xs">
                {activeAnnotation.detailedText}
              </p>
              <div className="pt-2 border-t border-slate-200/60">
                <span className="text-[10px] font-mono text-bio-muted uppercase tracking-wider block">
                  Core Scientific Concept:
                </span>
                <span className="text-[11px] font-mono text-bio-text font-medium">
                  {activeAnnotation.scientificConcept}
                </span>
              </div>
            </div>
          </div>

          {/* Scientific Disclaimer Note */}
          <div className="mt-5 pt-3 border-t border-slate-200/60 text-[11px] text-bio-muted font-mono leading-tight">
            <span className="font-semibold text-slate-700">Methodology Note:</span> Rendered as a schematic procedural model to communicate B-DNA conformational geometry and base pairing topology.
          </div>
        </div>
      </div>
    </div>
  );
};
