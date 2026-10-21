import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { parsePdb, ParsedPdb, PdbAtom } from './pdbParser';
import { molecularCatalog, MolecularCatalogItem } from './molecularCatalog';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  RotateCcw,
  Play,
  Pause,
  ExternalLink,
  Layers,
  Atom,
  Info,
  Search,
  Download,
  AlertCircle,
} from 'lucide-react';
import { soundSynth } from '../../audio/soundSynth';

type RepresentationMode = 'ballAndStick' | 'spacefill' | 'ribbon';

interface Molecule3DProps {
  parsed: ParsedPdb;
  representation: RepresentationMode;
  onSelectAtom: (atom: PdbAtom | null) => void;
  selectedAtom: PdbAtom | null;
  autoRotate: boolean;
}

const Molecule3D: React.FC<Molecule3DProps> = ({
  parsed,
  representation,
  onSelectAtom,
  selectedAtom,
  autoRotate,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Backbone curve for ribbon representation
  const ribbonCurve = useMemo(() => {
    if (parsed.backboneAtoms.length < 3) return null;
    const points = parsed.backboneAtoms.map((a) => new THREE.Vector3(a.x, a.y, a.z));
    return new THREE.CatmullRomCurve3(points);
  }, [parsed]);

  return (
    <group ref={groupRef}>
      {/* 1. Ball and Stick Mode */}
      {representation === 'ballAndStick' && (
        <group>
          {/* Atoms */}
          {parsed.atoms.map((atom, idx) => (
            <mesh
              key={`atom-${idx}`}
              position={[atom.x, atom.y, atom.z]}
              onClick={(e) => {
                e.stopPropagation();
                soundSynth.playClick();
                onSelectAtom(atom);
              }}
            >
              <sphereGeometry args={[selectedAtom?.serial === atom.serial ? 0.45 : 0.28, 16, 16]} />
              <meshStandardMaterial
                color={selectedAtom?.serial === atom.serial ? '#ffffff' : atom.color}
                roughness={0.3}
                metalness={0.2}
                emissive={selectedAtom?.serial === atom.serial ? '#00f0ff' : '#000000'}
                emissiveIntensity={selectedAtom?.serial === atom.serial ? 0.5 : 0}
              />
            </mesh>
          ))}

          {/* Covalent Bonds */}
          {parsed.bonds.map((bond, idx) => {
            const a1 = parsed.atoms[bond.atomIndex1];
            const a2 = parsed.atoms[bond.atomIndex2];
            if (!a1 || !a2) return null;

            const p1 = new THREE.Vector3(a1.x, a1.y, a1.z);
            const p2 = new THREE.Vector3(a2.x, a2.y, a2.z);
            const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
            const length = p1.distanceTo(p2);
            const orientation = new THREE.Matrix4();
            orientation.lookAt(p1, p2, new THREE.Vector3(0, 1, 0));

            return (
              <mesh
                key={`bond-${idx}`}
                position={[mid.x, mid.y, mid.z]}
                quaternion={new THREE.Quaternion().setFromRotationMatrix(orientation)}
              >
                <cylinderGeometry args={[0.07, 0.07, length, 8]} />
                <meshStandardMaterial color="#64748b" roughness={0.4} />
              </mesh>
            );
          })}
        </group>
      )}

      {/* 2. Space-filling (Van der Waals) Mode */}
      {representation === 'spacefill' && (
        <group>
          {parsed.atoms.map((atom, idx) => (
            <mesh
              key={`vdw-${idx}`}
              position={[atom.x, atom.y, atom.z]}
              onClick={(e) => {
                e.stopPropagation();
                soundSynth.playClick();
                onSelectAtom(atom);
              }}
            >
              <sphereGeometry args={[atom.vdwRadius * 0.45, 20, 20]} />
              <meshStandardMaterial
                color={selectedAtom?.serial === atom.serial ? '#ffffff' : atom.color}
                roughness={0.25}
                metalness={0.1}
                emissive={selectedAtom?.serial === atom.serial ? '#00f0ff' : '#000000'}
                emissiveIntensity={selectedAtom?.serial === atom.serial ? 0.6 : 0}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* 3. Ribbon / Backbone Mode */}
      {representation === 'ribbon' && ribbonCurve && (
        <group>
          <mesh>
            <tubeGeometry args={[ribbonCurve, 80, 0.35, 12, false]} />
            <meshStandardMaterial color="#8b5cf6" roughness={0.3} metalness={0.3} />
          </mesh>

          {/* Key Backbone Residue Spheres */}
          {parsed.backboneAtoms.map((atom, idx) => (
            <mesh
              key={`ribbon-atom-${idx}`}
              position={[atom.x, atom.y, atom.z]}
              onClick={(e) => {
                e.stopPropagation();
                soundSynth.playClick();
                onSelectAtom(atom);
              }}
            >
              <sphereGeometry args={[0.22, 12, 12]} />
              <meshStandardMaterial color="#00f0ff" />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};

export const MolecularViewer: React.FC = () => {
  const [selectedMoleculeId, setSelectedMoleculeId] = useState<string>('1bna');
  const [representation, setRepresentation] = useState<RepresentationMode>('ballAndStick');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [selectedAtom, setSelectedAtom] = useState<PdbAtom | null>(null);
  const [customPdbQuery, setCustomPdbQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active catalog item
  const currentItem = useMemo(() => {
    return molecularCatalog.find((m) => m.id === selectedMoleculeId) || molecularCatalog[0];
  }, [selectedMoleculeId]);

  // Parsed PDB coordinates
  const parsed = useMemo(() => {
    if (!currentItem.bundledPdb) return null;
    return parsePdb(currentItem.bundledPdb);
  }, [currentItem]);

  const handleSelectMolecule = (item: MolecularCatalogItem) => {
    soundSynth.playClick();
    setSelectedMoleculeId(item.id);
    setRepresentation(item.defaultRepresentation);
    setSelectedAtom(null);
    setErrorMessage(null);
  };

  const handleFetchPdb = async () => {
    const code = customPdbQuery.trim().toUpperCase();
    if (!code || code.length !== 4) {
      setErrorMessage('Please enter a valid 4-character PDB ID (e.g. 1INS, 4HHB).');
      return;
    }
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`https://files.rcsb.org/download/${code}.pdb`);
      if (!response.ok) {
        throw new Error(`Structure ${code} not found on RCSB Protein Data Bank.`);
      }
      const text = await response.text();
      const newCustomItem: MolecularCatalogItem = {
        id: code.toLowerCase(),
        name: `PDB ID: ${code}`,
        pdbId: code,
        classification: 'Protein',
        description: `Live fetched experimental structure ${code} from RCSB Protein Data Bank.`,
        citation: `RCSB PDB Structure ${code}. Berman et al. (2000).`,
        doi: `https://www.rcsb.org/structure/${code}`,
        defaultRepresentation: 'ballAndStick',
        bundledPdb: text,
      };

      // Add to catalog if not present
      if (!molecularCatalog.some((m) => m.id === newCustomItem.id)) {
        molecularCatalog.push(newCustomItem);
      }
      handleSelectMolecule(newCustomItem);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error fetching PDB file.';
      setErrorMessage(`${msg} Using offline bundled reference structure as fallback.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Viewer Header & Molecule Selector */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl bg-space-900/90 border border-white/10">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-bio-cyan" />
            <span>3D Macromolecular Structure Explorer</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real crystallographic coordinate parsing with CPK element rendering and representation switching.
          </p>
        </div>

        {/* Structure Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {molecularCatalog.map((mol) => (
            <button
              key={mol.id}
              onClick={() => handleSelectMolecule(mol)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedMoleculeId === mol.id
                  ? 'bg-bio-cyan/20 text-bio-cyan border border-bio-cyan shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-white/5'
              }`}
            >
              {mol.name.split(' ')[0]} {mol.pdbId ? `(${mol.pdbId})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Canvas + Controls Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* WebGL 3D Canvas */}
        <div className="lg:col-span-8 relative h-[450px] sm:h-[520px] rounded-2xl bg-space-950 border border-white/10 overflow-hidden shadow-2xl">
          {parsed ? (
            <Canvas
              camera={{
                position: [0, 0, Math.max(parsed.boundsRadius * 2.2, 12)],
                fov: 45,
              }}
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[10, 20, 15]} intensity={1.5} />
              <directionalLight position={[-10, -15, -10]} intensity={0.6} color="#8b5cf6" />
              <pointLight position={[0, 0, 10]} intensity={0.8} color="#00f0ff" />

              <Molecule3D
                parsed={parsed}
                representation={representation}
                onSelectAtom={setSelectedAtom}
                selectedAtom={selectedAtom}
                autoRotate={autoRotate}
              />

              <OrbitControls
                autoRotate={autoRotate}
                autoRotateSpeed={1.5}
                enableDamping
                dampingFactor={0.08}
              />
            </Canvas>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono">
              Parsing PDB coordinates...
            </div>
          )}

          {/* Floating Canvas Controls Overlay */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 bg-space-950/80 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
            {(['ballAndStick', 'spacefill', 'ribbon'] as RepresentationMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  soundSynth.playClick();
                  setRepresentation(mode);
                }}
                className={`px-2.5 py-1 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                  representation === mode
                    ? 'bg-bio-cyan text-space-950 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {mode === 'ballAndStick' ? 'Ball & Stick' : mode === 'spacefill' ? 'Spacefill' : 'Ribbon'}
              </button>
            ))}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <button
              onClick={() => {
                soundSynth.playClick();
                setAutoRotate(!autoRotate);
              }}
              className="pointer-events-auto p-2 rounded-lg bg-space-950/80 border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 backdrop-blur-md"
            >
              {autoRotate ? <Pause className="w-3.5 h-3.5 text-bio-cyan" /> : <Play className="w-3.5 h-3.5" />}
              <span>{autoRotate ? 'Pause Rotation' : 'Spin 3D'}</span>
            </button>

            <span className="text-[11px] font-mono text-slate-400 bg-space-950/80 px-2.5 py-1 rounded border border-white/10">
              Drag to rotate &bull; Scroll to zoom
            </span>
          </div>
        </div>

        {/* Structure Info & Atom Inspector */}
        <div className="lg:col-span-4 space-y-4">
          <Card glowColor="violet" className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-mono text-bio-cyan uppercase tracking-wider">
                {currentItem.classification}
              </span>
              {currentItem.pdbId && <Badge variant="cyan">{currentItem.pdbId}</Badge>}
            </div>

            <h4 className="text-base font-bold text-white mb-2">{currentItem.name}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{currentItem.description}</p>

            {currentItem.resolution && (
              <div className="mt-3 text-xs font-mono text-slate-400">
                <span className="text-slate-500">Resolution:</span> {currentItem.resolution}
              </div>
            )}

            {/* Selected Atom Inspection */}
            {selectedAtom ? (
              <div className="mt-4 p-3.5 rounded-xl bg-bio-cyan/10 border border-bio-cyan/30 text-xs space-y-1 font-mono">
                <div className="flex items-center justify-between text-bio-cyan font-bold">
                  <span>Selected Atom: #{selectedAtom.serial}</span>
                  <button onClick={() => setSelectedAtom(null)} className="text-slate-400 hover:text-white">
                    &times;
                  </button>
                </div>
                <p className="text-white">
                  Element: <strong className="text-bio-cyan">{selectedAtom.element}</strong> ({selectedAtom.name})
                </p>
                <p className="text-slate-300">
                  Residue: {selectedAtom.resName} {selectedAtom.resSeq} (Chain {selectedAtom.chainID})
                </p>
                <p className="text-slate-400 text-[11px]">
                  Coords: [{selectedAtom.x.toFixed(2)}, {selectedAtom.y.toFixed(2)}, {selectedAtom.z.toFixed(2)}] Å
                </p>
              </div>
            ) : (
              <div className="mt-4 p-3 rounded-lg bg-slate-900/60 border border-white/5 text-[11px] text-slate-400 font-mono text-center">
                Click any atom in the 3D scene to inspect residue and coordinate details.
              </div>
            )}

            {/* Scientific Citation */}
            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                Primary Literature Citation:
              </span>
              <p className="text-[11px] text-slate-300 font-mono italic leading-normal">
                {currentItem.citation}
              </p>
              {currentItem.doi && (
                <a
                  href={currentItem.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-bio-cyan hover:underline text-[11px] font-mono mt-1"
                >
                  <span>wwPDB Record Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </Card>

          {/* RCSB Live Search / Fetch Input */}
          <Card glowColor="none" className="p-4">
            <h5 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-bio-cyan" />
              <span>Fetch Live PDB (RCSB API)</span>
            </h5>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={4}
                value={customPdbQuery}
                onChange={(e) => setCustomPdbQuery(e.target.value)}
                placeholder="e.g. 1INS, 4HHB"
                className="w-full px-3 py-1.5 rounded-lg bg-space-950 font-mono text-xs uppercase text-white border border-white/10 focus:border-bio-cyan focus:outline-none"
              />
              <Button
                variant="cyan"
                size="sm"
                onClick={handleFetchPdb}
                disabled={loading}
              >
                {loading ? 'Fetching...' : 'Load'}
              </Button>
            </div>

            {errorMessage && (
              <div className="mt-2 text-[11px] text-amber-300 font-mono flex items-start gap-1">
                <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
