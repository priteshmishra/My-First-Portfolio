import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Sliders,
  Maximize2,
  Box,
  Eye,
  Zap,
} from 'lucide-react';
import { soundSynth } from '../audio/soundSynth';

interface PhysicalObject {
  id: number;
  type: 'vesicle' | 'capsid' | 'globule';
  position: [number, number, number];
  velocity: [number, number, number];
  radius: number;
  color: string;
  rotation: [number, number, number];
  rotSpeed: [number, number, number];
}

const BOUNDS = 5; // Simulation cube box [-5, 5]

interface PhysicsSimSceneProps {
  objects: PhysicalObject[];
  gravity: number;
  bounciness: number;
  damping: number;
  isPaused: boolean;
  wireframe: boolean;
  onUpdateObjects: (updater: (prev: PhysicalObject[]) => PhysicalObject[]) => void;
}

const PhysicsSimScene: React.FC<PhysicsSimSceneProps> = ({
  objects,
  gravity,
  bounciness,
  damping,
  isPaused,
  wireframe,
  onUpdateObjects,
}) => {
  useFrame((_, delta) => {
    if (isPaused) return;
    const dt = Math.min(delta, 0.05);

    onUpdateObjects((prev) => {
      const next = prev.map((obj) => {
        const vel = [...obj.velocity] as [number, number, number];
        const pos = [...obj.position] as [number, number, number];

        // Apply gravity along Y
        vel[1] -= gravity * dt;

        // Apply drag damping
        vel[0] *= Math.pow(damping, dt);
        vel[1] *= Math.pow(damping, dt);
        vel[2] *= Math.pow(damping, dt);

        // Update position
        pos[0] += vel[0] * dt;
        pos[1] += vel[1] * dt;
        pos[2] += vel[2] * dt;

        // Boundary collisions
        const r = obj.radius;

        // Floor
        if (pos[1] - r < -BOUNDS) {
          pos[1] = -BOUNDS + r;
          vel[1] = -vel[1] * bounciness;
          vel[0] *= 0.95; // floor friction
          vel[2] *= 0.95;
        }
        // Ceiling
        if (pos[1] + r > BOUNDS) {
          pos[1] = BOUNDS - r;
          vel[1] = -vel[1] * bounciness;
        }
        // Left / Right (X)
        if (pos[0] - r < -BOUNDS) {
          pos[0] = -BOUNDS + r;
          vel[0] = -vel[0] * bounciness;
        } else if (pos[0] + r > BOUNDS) {
          pos[0] = BOUNDS - r;
          vel[0] = -vel[0] * bounciness;
        }
        // Front / Back (Z)
        if (pos[2] - r < -BOUNDS) {
          pos[2] = -BOUNDS + r;
          vel[2] = -vel[2] * bounciness;
        } else if (pos[2] + r > BOUNDS) {
          pos[2] = BOUNDS - r;
          vel[2] = -vel[2] * bounciness;
        }

        const rot: [number, number, number] = [
          obj.rotation[0] + obj.rotSpeed[0] * dt,
          obj.rotation[1] + obj.rotSpeed[1] * dt,
          obj.rotation[2] + obj.rotSpeed[2] * dt,
        ];

        return {
          ...obj,
          position: pos,
          velocity: vel,
          rotation: rot,
        };
      });

      // Pairwise inter-object elastic collisions
      for (let i = 0; i < next.length; i++) {
        for (let j = i + 1; j < next.length; j++) {
          const o1 = next[i];
          const o2 = next[j];
          const dx = o2.position[0] - o1.position[0];
          const dy = o2.position[1] - o1.position[1];
          const dz = o2.position[2] - o1.position[2];
          const dist = Math.hypot(dx, dy, dz);
          const minDist = o1.radius + o2.radius;

          if (dist < minDist && dist > 0.001) {
            // Normal vector
            const nx = dx / dist;
            const ny = dy / dist;
            const nz = dz / dist;

            // Separate overlapping objects
            const overlap = (minDist - dist) * 0.5;
            o1.position[0] -= nx * overlap;
            o1.position[1] -= ny * overlap;
            o1.position[2] -= nz * overlap;
            o2.position[0] += nx * overlap;
            o2.position[1] += ny * overlap;
            o2.position[2] += nz * overlap;

            // Relative velocity
            const rvx = o2.velocity[0] - o1.velocity[0];
            const rvy = o2.velocity[1] - o1.velocity[1];
            const rvz = o2.velocity[2] - o1.velocity[2];
            const velAlongNormal = rvx * nx + rvy * ny + rvz * nz;

            if (velAlongNormal < 0) {
              const impulse = -(1 + bounciness) * velAlongNormal * 0.5;
              o1.velocity[0] -= impulse * nx;
              o1.velocity[1] -= impulse * ny;
              o1.velocity[2] -= impulse * nz;
              o2.velocity[0] += impulse * nx;
              o2.velocity[1] += impulse * ny;
              o2.velocity[2] += impulse * nz;
            }
          }
        }
      }

      return next;
    });
  });

  return (
    <group>
      {/* Simulation Wireframe Bounding Box */}
      <mesh>
        <boxGeometry args={[BOUNDS * 2, BOUNDS * 2, BOUNDS * 2]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={wireframe ? 0.4 : 0.1}
        />
      </mesh>

      {/* Render Physical Objects */}
      {objects.map((obj) => (
        <mesh
          key={obj.id}
          position={obj.position}
          rotation={obj.rotation}
          onClick={() => {
            soundSynth.playImpulse(0.8);
            // Apply upward and outward kick impulse
            onUpdateObjects((prev) =>
              prev.map((o) =>
                o.id === obj.id
                  ? {
                      ...o,
                      velocity: [
                        (Math.random() - 0.5) * 8,
                        Math.random() * 8 + 4,
                        (Math.random() - 0.5) * 8,
                      ],
                    }
                  : o
              )
            );
          }}
        >
          {obj.type === 'vesicle' && <sphereGeometry args={[obj.radius, 16, 16]} />}
          {obj.type === 'capsid' && <icosahedronGeometry args={[obj.radius, 0]} />}
          {obj.type === 'globule' && <dodecahedronGeometry args={[obj.radius, 0]} />}

          <meshStandardMaterial
            color={obj.color}
            wireframe={wireframe}
            roughness={0.2}
            metalness={0.3}
            emissive={obj.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

export const CollisionPlayground: React.FC = () => {
  const [gravity, setGravity] = useState<number>(9.8);
  const [bounciness, setBounciness] = useState<number>(0.75);
  const [damping, setDamping] = useState<number>(0.98);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [wireframe, setWireframe] = useState<boolean>(false);

  const [objects, setObjects] = useState<PhysicalObject[]>([
    {
      id: 1,
      type: 'vesicle',
      position: [-2, 3, 0],
      velocity: [1, 0, 0],
      radius: 0.8,
      color: '#00f0ff',
      rotation: [0, 0, 0],
      rotSpeed: [0.5, 0.8, 0],
    },
    {
      id: 2,
      type: 'capsid',
      position: [2, 4, 1],
      velocity: [-1.5, 0, 0.5],
      radius: 0.9,
      color: '#8b5cf6',
      rotation: [0, 0, 0],
      rotSpeed: [0.3, 1, 0.4],
    },
    {
      id: 3,
      type: 'globule',
      position: [0, 2, -1],
      velocity: [0, 1, 1],
      radius: 0.75,
      color: '#ec4899',
      rotation: [0, 0, 0],
      rotSpeed: [0.8, 0.2, 0.5],
    },
    {
      id: 4,
      type: 'vesicle',
      position: [1.5, 1, -2],
      velocity: [-0.8, 2, 0],
      radius: 0.7,
      color: '#14b8a6',
      rotation: [0, 0, 0],
      rotSpeed: [0.4, 0.4, 0.4],
    },
  ]);

  const handleSpawnObject = (type: 'vesicle' | 'capsid' | 'globule') => {
    if (objects.length >= 20) return; // Bounded accumulation protection

    soundSynth.playImpulse(0.6);
    const colors = {
      vesicle: '#00f0ff',
      capsid: '#8b5cf6',
      globule: '#ec4899',
    };

    const newObj: PhysicalObject = {
      id: Date.now() + Math.random(),
      type,
      position: [(Math.random() - 0.5) * 4, 4, (Math.random() - 0.5) * 4],
      velocity: [(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 4],
      radius: 0.6 + Math.random() * 0.35,
      color: colors[type],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      rotSpeed: [Math.random() * 2, Math.random() * 2, Math.random() * 2],
    };

    setObjects((prev) => [...prev, newObj]);
  };

  const handleApplyExplosionImpulse = () => {
    soundSynth.playImpulse(1.5);
    setObjects((prev) =>
      prev.map((o) => ({
        ...o,
        velocity: [
          (Math.random() - 0.5) * 14,
          Math.random() * 12 + 4,
          (Math.random() - 0.5) * 14,
        ],
      }))
    );
  };

  const handleReset = () => {
    soundSynth.playClick();
    setObjects([
      {
        id: 1,
        type: 'vesicle',
        position: [-2, 3, 0],
        velocity: [1, 0, 0],
        radius: 0.8,
        color: '#00f0ff',
        rotation: [0, 0, 0],
        rotSpeed: [0.5, 0.8, 0],
      },
      {
        id: 2,
        type: 'capsid',
        position: [2, 4, 1],
        velocity: [-1.5, 0, 0.5],
        radius: 0.9,
        color: '#8b5cf6',
        rotation: [0, 0, 0],
        rotSpeed: [0.3, 1, 0.4],
      },
      {
        id: 3,
        type: 'globule',
        position: [0, 2, -1],
        velocity: [0, 1, 1],
        radius: 0.75,
        color: '#ec4899',
        rotation: [0, 0, 0],
        rotSpeed: [0.8, 0.2, 0.5],
      },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl bg-space-900/90 border border-white/10">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Box className="w-5 h-5 text-bio-cyan" />
            <span>Rigid-Body Biomolecular Collision Playground</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time physics simulation of biological vesicles, viral capsids, and protein globules with elastic boundary collisions.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="cyan"
            size="sm"
            icon={<Zap className="w-4 h-4" />}
            onClick={handleApplyExplosionImpulse}
          >
            Force Shockwave
          </Button>

          <button
            onClick={() => {
              soundSynth.playClick();
              setIsPaused(!isPaused);
            }}
            className="p-2 rounded-lg bg-slate-800 border border-white/10 text-xs font-mono text-slate-300 hover:text-white"
            title={isPaused ? 'Resume Simulation' : 'Pause Simulation'}
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800 border border-white/10 text-xs font-mono text-slate-300 hover:text-white"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 3D Simulation Canvas + Settings Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas */}
        <div className="lg:col-span-8 relative h-[420px] sm:h-[480px] rounded-2xl bg-space-950 border border-white/10 overflow-hidden shadow-2xl">
          <Canvas camera={{ position: [0, 4, 14], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 20, 10]} intensity={1.4} />
            <pointLight position={[0, -4, 0]} intensity={1} color="#8b5cf6" />
            <pointLight position={[0, 4, 0]} intensity={1} color="#00f0ff" />

            <PhysicsSimScene
              objects={objects}
              gravity={gravity}
              bounciness={bounciness}
              damping={damping}
              isPaused={isPaused}
              wireframe={wireframe}
              onUpdateObjects={setObjects}
            />

            <OrbitControls enableDamping dampingFactor={0.08} />
          </Canvas>

          {/* Canvas Floating Overlay Controls */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => {
                soundSynth.playClick();
                setWireframe(!wireframe);
              }}
              className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 backdrop-blur-md border ${
                wireframe
                  ? 'bg-bio-cyan/20 border-bio-cyan text-bio-cyan'
                  : 'bg-space-950/80 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{wireframe ? 'Solid View' : 'Wireframe'}</span>
            </button>
          </div>

          <div className="absolute top-4 right-4 text-[11px] font-mono text-slate-400 bg-space-950/80 px-2.5 py-1 rounded border border-white/10">
            Active Objects: {objects.length} / 20 &bull; Click object to kick
          </div>
        </div>

        {/* Physics Controls Panel */}
        <div className="lg:col-span-4 space-y-4">
          <Card glowColor="violet" className="p-4 sm:p-5 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-bio-violet flex items-center gap-1.5 border-b border-white/10 pb-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>Simulation Parameters</span>
            </h4>

            {/* Gravity Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>Gravity:</span>
                <span className="text-bio-cyan font-bold">{gravity.toFixed(1)} m/s²</span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                step={0.5}
                value={gravity}
                onChange={(e) => setGravity(parseFloat(e.target.value))}
                className="w-full accent-bio-cyan cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                <span>Zero-G</span>
                <span>Earth (9.8)</span>
                <span>Hyper-G</span>
              </div>
            </div>

            {/* Restitution (Bounciness) Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>Elasticity (Bounciness):</span>
                <span className="text-bio-violet font-bold">{(bounciness * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={0.98}
                step={0.02}
                value={bounciness}
                onChange={(e) => setBounciness(parseFloat(e.target.value))}
                className="w-full accent-bio-violet cursor-pointer"
              />
            </div>

            {/* Drag Damping Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>Viscosity Damping:</span>
                <span className="text-emerald-400 font-bold">{damping.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.8}
                max={0.99}
                step={0.01}
                value={damping}
                onChange={(e) => setDamping(parseFloat(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Spawn Entity Buttons */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Spawn Biological Entity:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleSpawnObject('vesicle')}
                  disabled={objects.length >= 20}
                  className="px-2 py-1.5 rounded-lg bg-bio-cyan/15 hover:bg-bio-cyan/25 border border-bio-cyan/30 text-bio-cyan text-xs font-mono disabled:opacity-40 transition-colors"
                >
                  + Vesicle
                </button>
                <button
                  onClick={() => handleSpawnObject('capsid')}
                  disabled={objects.length >= 20}
                  className="px-2 py-1.5 rounded-lg bg-bio-violet/15 hover:bg-bio-violet/25 border border-bio-violet/30 text-bio-violet text-xs font-mono disabled:opacity-40 transition-colors"
                >
                  + Capsid
                </button>
                <button
                  onClick={() => handleSpawnObject('globule')}
                  disabled={objects.length >= 20}
                  className="px-2 py-1.5 rounded-lg bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-pink-400 text-xs font-mono disabled:opacity-40 transition-colors"
                >
                  + Globule
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
