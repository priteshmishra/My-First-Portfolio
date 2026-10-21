import React from 'react';
import { X, Dna, Volume2, VolumeX, Moon, Sun, Gauge, Sparkles } from 'lucide-react';
import { soundSynth } from '../../audio/soundSynth';
import { PerformanceTier } from '../../hooks/usePerformanceTier';
import { portfolioData } from '../../data/portfolioData';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  qualityTier: PerformanceTier;
  onChangeQuality: (tier: PerformanceTier) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeSection,
  soundEnabled,
  onToggleSound,
  isDarkTheme,
  onToggleTheme,
  qualityTier,
  onChangeQuality,
  reducedMotion,
  onToggleReducedMotion,
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'hero', label: 'Cell View' },
    { id: 'about', label: 'About Pritesh' },
    { id: 'education', label: 'Education & LPU' },
    { id: 'skills', label: 'Skill Constellation' },
    { id: 'projects', label: 'Project Laboratory' },
    { id: 'research', label: 'Research Notebook' },
    { id: 'lab', label: 'Bioinformatics Lab' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    soundSynth.playClick();
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 lg:hidden flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-space-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative ml-auto w-4/5 max-w-sm h-full bg-space-900 border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-bio-cyan/15 border border-bio-cyan/40 flex items-center justify-center text-bio-cyan">
                <Dna className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-sm tracking-wider text-white">
                BIO<span className="text-bio-cyan">VERSE</span>
              </span>
            </div>
            <button
              onClick={() => {
                soundSynth.playClick();
                onClose();
              }}
              aria-label="Close navigation"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-bio-cyan/15 text-bio-cyan border border-bio-cyan/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-bio-cyan" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Quick System Controls */}
        <div className="pt-6 border-t border-white/10 mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onToggleSound();
                soundSynth.playClick();
              }}
              className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-center gap-2 ${
                soundEnabled
                  ? 'bg-bio-cyan/20 border-bio-cyan text-bio-cyan'
                  : 'bg-slate-800 border-white/10 text-slate-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundEnabled ? 'Audio On' : 'Audio Off'}</span>
            </button>

            <button
              onClick={() => {
                onToggleTheme();
                soundSynth.playClick();
              }}
              className="p-2.5 rounded-lg bg-slate-800 border border-white/10 text-xs font-mono text-slate-300 flex items-center justify-center gap-2"
            >
              {isDarkTheme ? <Moon className="w-4 h-4 text-bio-violet" /> : <Sun className="w-4 h-4 text-amber-400" />}
              <span>{isDarkTheme ? 'Dark Lab' : 'Light Lab'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/60 border border-white/5 text-xs text-slate-400 font-mono">
            <span>Quality Tier:</span>
            <div className="flex gap-1">
              {(['low', 'medium', 'high'] as PerformanceTier[]).map((t) => (
                <button
                  key={t}
                  onClick={() => onChangeQuality(t)}
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                    qualityTier === t
                      ? 'bg-bio-cyan text-space-950'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center font-mono">
            {portfolioData.owner.academicProgram}
          </p>
        </div>
      </div>
    </div>
  );
};
