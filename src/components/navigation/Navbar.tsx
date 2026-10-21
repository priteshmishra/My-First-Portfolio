import React, { useState } from 'react';
import {
  Dna,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Sparkles,
  Zap,
  Menu,
  X,
  Gauge,
} from 'lucide-react';
import { soundSynth } from '../../audio/soundSynth';
import { PerformanceTier } from '../../hooks/usePerformanceTier';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  qualityTier: PerformanceTier;
  onChangeQuality: (tier: PerformanceTier) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenMobileMenu: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  onToggleSound,
  isDarkTheme,
  onToggleTheme,
  qualityTier,
  onChangeQuality,
  reducedMotion,
  onToggleReducedMotion,
  onOpenMobileMenu,
  activeSection,
}) => {
  const navItems = [
    { id: 'hero', label: 'Cell View' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'lab', label: 'Bio Lab' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    soundSynth.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const cycleQuality = () => {
    soundSynth.playClick();
    const next: Record<PerformanceTier, PerformanceTier> = {
      low: 'medium',
      medium: 'high',
      high: 'low',
    };
    onChangeQuality(next[qualityTier]);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-space-950/80 backdrop-blur-lg border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2 group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-cyan rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-lg bg-bio-cyan/15 border border-bio-cyan/40 flex items-center justify-center text-bio-cyan group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
            <Dna className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base tracking-wider text-white">
              BIO<span className="text-bio-cyan">VERSE</span>
            </span>
            <span className="text-[10px] text-bio-violet font-mono tracking-widest uppercase">
              QUANTUM ORGANISM
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                activeSection === item.id
                  ? 'text-bio-cyan bg-bio-cyan/10 border border-bio-cyan/30 shadow-[0_0_10px_rgba(0,240,255,0.15)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Utility Controls (Sound, Theme, Quality, Motion) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundSynth.playClick();
            }}
            aria-label={soundEnabled ? 'Mute procedural audio' : 'Unmute procedural audio'}
            title={soundEnabled ? 'Sound Active' : 'Sound Muted'}
            className={`p-2 rounded-lg border text-xs transition-colors ${
              soundEnabled
                ? 'bg-bio-cyan/20 border-bio-cyan text-bio-cyan shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'bg-slate-900 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme Toggle (Dark Lab vs Light Workspace) */}
          <button
            onClick={() => {
              soundSynth.playClick();
              onToggleTheme();
            }}
            aria-label={isDarkTheme ? 'Switch to light scientific theme' : 'Switch to dark laboratory theme'}
            title={isDarkTheme ? 'Dark Laboratory Theme' : 'Light Workspace Theme'}
            className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-slate-200 transition-colors"
          >
            {isDarkTheme ? <Moon className="w-4 h-4 text-bio-violet" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Quality Tier Selector */}
          <button
            onClick={cycleQuality}
            aria-label={`Cycle graphics quality. Current: ${qualityTier}`}
            title={`Graphics Quality: ${qualityTier.toUpperCase()}`}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:border-bio-cyan/40 transition-colors"
          >
            <Gauge className="w-3.5 h-3.5 text-bio-cyan" />
            <span className="uppercase text-[11px] font-semibold">{qualityTier}</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => {
              soundSynth.playClick();
              onOpenMobileMenu();
            }}
            aria-label="Open mobile navigation menu"
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
