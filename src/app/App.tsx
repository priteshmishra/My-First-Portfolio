import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { MasterCanvas, JourneyStage } from '../scenes/MasterCanvas';
import { JourneyController } from '../scenes/JourneyController';
import { OrganelleInfo } from '../scenes/CellScene';
import { BasePairInfo } from '../scenes/DNAHelixScene';
import { Navbar } from '../components/navigation/Navbar';
import { MobileDrawer } from '../components/navigation/MobileDrawer';
import { Footer } from '../components/layout/Footer';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

// Portfolio Sections
import { HeroSection } from '../portfolio/HeroSection';
import { AboutSection } from '../portfolio/AboutSection';
import { EducationSection } from '../portfolio/EducationSection';
import { SkillsSection } from '../portfolio/SkillsSection';
import { ProjectsSection } from '../portfolio/ProjectsSection';
import { ResearchSection } from '../portfolio/ResearchSection';
import { LabSection, LabTab } from '../portfolio/LabSection';
import { ContactSection } from '../portfolio/ContactSection';

// Hooks & Audio
import { usePerformanceTier, PerformanceTier } from '../hooks/usePerformanceTier';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useKonamiCode } from '../hooks/useKonamiCode';
import { soundSynth } from '../audio/soundSynth';
import { Sparkles, Dna, ExternalLink } from 'lucide-react';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Quality & Accessibility
  const { tier: qualityTier, setTier: setQualityTier } = usePerformanceTier();
  const { reducedMotion, toggleReducedMotion } = useReducedMotion();

  // Cell-to-Genome Journey State
  const [isJourneyMode, setIsJourneyMode] = useState<boolean>(false);
  const [journeyStage, setJourneyStage] = useState<JourneyStage>('cellular');

  // Selected Organelle & Base Pair Inspection Modals
  const [selectedOrganelle, setSelectedOrganelle] = useState<OrganelleInfo | null>(null);
  const [selectedBasePair, setSelectedBasePair] = useState<BasePairInfo | null>(null);

  // Active Lab Workstation Tab
  const [activeLabTab, setActiveLabTab] = useState<LabTab>('sequence');

  // Easter Egg states
  const [assembleSignature, setAssembleSignature] = useState<boolean>(false);
  const [konamiUnlocked, setKonamiUnlocked] = useState<boolean>(false);

  // Handle Theme switching on document element
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkTheme]);

  // Handle Sound Toggle
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundSynth.setEnabled(next);
  };

  // Konami Code Easter Egg
  useKonamiCode(() => {
    soundSynth.playQuantumBurst();
    setKonamiUnlocked(true);
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#8b5cf6', '#ec4899', '#ffffff'],
    });
  });

  // Track active visible section for navbar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'education', 'skills', 'projects', 'research', 'lab', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Primary Actions Handlers
  const handleExploreJourney = () => {
    setIsJourneyMode(true);
    setJourneyStage('cellular');
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleLaunchLabDemo = (tab: LabTab) => {
    setActiveLabTab(tab);
    handleScrollToSection('lab');
  };

  const handleTriggerParticleSignature = () => {
    setAssembleSignature(true);
    setTimeout(() => setAssembleSignature(false), 5000);
  };

  return (
    <div className="relative min-h-screen text-slate-100 overflow-x-hidden selection:bg-bio-cyan/30 selection:text-bio-cyan">
      {/* 1. Global Persistent WebGL Background Canvas */}
      <MasterCanvas
        stage={isJourneyMode ? journeyStage : activeSection === 'hero' ? 'cellular' : 'ambient'}
        performanceTier={qualityTier}
        reducedMotion={reducedMotion}
        onSelectOrganelle={setSelectedOrganelle}
        onSelectBasePair={setSelectedBasePair}
        assembleSignature={assembleSignature}
      />

      {/* 2. Top Header Navigation */}
      <Navbar
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        qualityTier={qualityTier}
        onChangeQuality={setQualityTier}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={toggleReducedMotion}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        activeSection={activeSection}
      />

      {/* 3. Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        qualityTier={qualityTier}
        onChangeQuality={setQualityTier}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={toggleReducedMotion}
      />

      {/* 4. Interactive Biological Journey Controller Bar (when active) */}
      {isJourneyMode && (
        <JourneyController
          currentStage={journeyStage}
          onChangeStage={setJourneyStage}
          onExitToLab={() => {
            setIsJourneyMode(false);
            handleScrollToSection('lab');
          }}
          onCloseJourney={() => setIsJourneyMode(false)}
        />
      )}

      {/* 5. Main Portfolio Content Sections */}
      <main className="relative z-10 pointer-events-none">
        <HeroSection
          onExploreJourney={handleExploreJourney}
          onViewPortfolio={() => handleScrollToSection('about')}
          onEnterLab={() => handleScrollToSection('lab')}
          onTriggerSignature={handleTriggerParticleSignature}
        />

        <AboutSection onContactClick={() => handleScrollToSection('contact')} />

        <EducationSection />

        <SkillsSection onOpenProject={(id) => handleLaunchLabDemo('sequence')} />

        <ProjectsSection onLaunchDemo={handleLaunchLabDemo} />

        <ResearchSection />

        <LabSection activeTab={activeLabTab} onTabChange={setActiveLabTab} />

        <ContactSection />
      </main>

      {/* 6. Footer Credits & Attribution */}
      <Footer />

      {/* 7. Organelle Educational Inspection Modal */}
      <Modal
        isOpen={selectedOrganelle !== null}
        onClose={() => setSelectedOrganelle(null)}
        title={selectedOrganelle?.name || ''}
        subtitle="3D Interactive Cellular Structure Inspection"
      >
        {selectedOrganelle && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-bio-cyan/10 border border-bio-cyan/30 text-xs">
              <span className="font-mono text-bio-cyan uppercase font-bold block mb-1">
                Scientific Role:
              </span>
              <p className="text-slate-200">{selectedOrganelle.scientificRole}</p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Biological Mechanism:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedOrganelle.explanation}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-bio-violet/10 border border-bio-violet/30 text-xs">
              <span className="font-mono text-bio-violet uppercase font-bold block mb-1">
                Computational Biology & Portfolio Link:
              </span>
              <p className="text-slate-200">{selectedOrganelle.portfolioConnection}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* 8. DNA Base Pair Inspection Modal */}
      <Modal
        isOpen={selectedBasePair !== null}
        onClose={() => setSelectedBasePair(null)}
        title={selectedBasePair ? `Base Pair #${selectedBasePair.pairIndex}: ${selectedBasePair.base1} — ${selectedBasePair.base2}` : ''}
        subtitle="Watson-Crick Antiparallel Hydrogen Bonding"
      >
        {selectedBasePair && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-center font-mono">
              <div className="p-3 rounded-xl bg-bio-cyan/15 border border-bio-cyan/30">
                <span className="text-[10px] text-slate-400 block uppercase">5' Strand</span>
                <span className="text-base font-bold text-bio-cyan">{selectedBasePair.base1}</span>
              </div>
              <div className="p-3 rounded-xl bg-bio-violet/15 border border-bio-violet/30">
                <span className="text-[10px] text-slate-400 block uppercase">3' Strand</span>
                <span className="text-base font-bold text-bio-violet">{selectedBasePair.base2}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs space-y-1">
              <span className="text-emerald-400 font-mono font-bold block">
                Thermodynamic Stability: {selectedBasePair.bonds} Hydrogen Bonds
              </span>
              <p className="text-slate-300 leading-relaxed">{selectedBasePair.biologicalNote}</p>
            </div>

            <div className="text-[11px] text-slate-500 font-mono italic">
              Note: Procedural double helix representation designed for educational visualization of base pairing geometry.
            </div>
          </div>
        )}
      </Modal>

      {/* 9. Konami Code Celebration Modal */}
      <Modal
        isOpen={konamiUnlocked}
        onClose={() => setKonamiUnlocked(false)}
        title="Quantum Resonance Activated!"
        subtitle="Konami Secret Sequence Deciphered (↑ ↑ ↓ ↓ ← → ← → B A)"
      >
        <div className="text-center space-y-4 py-2">
          <div className="w-16 h-16 rounded-2xl bg-bio-violet/20 border border-bio-violet text-bio-violet mx-auto flex items-center justify-center animate-bounce">
            <Sparkles className="w-8 h-8" />
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            Congratulations! You have triggered the BIOVERSE quantum resonance sequence. High-frequency particle excitations and ultraviolet chromatic ripples have been synthesized across the 3D space.
          </p>
          <div className="p-3 rounded-xl bg-slate-900 font-mono text-xs text-bio-cyan border border-white/10">
            &gt; quantum_organism_coherence: 100% | LPU BTY100M Academic Verified
          </div>
          <Button variant="cyan" size="sm" onClick={() => setKonamiUnlocked(false)}>
            Resume Exploration
          </Button>
        </div>
      </Modal>
    </div>
  );
};
