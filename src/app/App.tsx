import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CursorGlow } from '../components/effects/CursorGlow';
import { PageLoader } from '../components/effects/PageLoader';
import { FullPageDNA } from '../components/three/FullPageDNA';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import { EducationSection } from '../sections/EducationSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { LabSection } from '../sections/LabSection';
import { ResearchSection } from '../sections/ResearchSection';
import { ContactSection } from '../sections/ContactSection';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const { reducedMotion } = useReducedMotion();

  // Track active section for navigation highlighting
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'education', 'skills', 'projects', 'lab', 'research', 'contact'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-bio-bg text-bio-text selection:bg-bio-cyan/20 selection:text-bio-cyan-dark flex flex-col justify-between overflow-x-hidden transition-colors duration-300">
      {/* 0. Page Reload & Initialization Transition Screen */}
      <PageLoader />

      {/* 1. Full-Page Interactive 3D DNA Canvas (Fixed in Background) */}
      <FullPageDNA />

      {/* 2. Desktop Cursor Glow Highlight */}
      <CursorGlow />

      {/* 3. Top Navigation Bar with Apple Frosted Glass Effect */}
      <Header activeSection={activeSection} />

      {/* 4. Main Content Sections with Apple Frosted Glass Styling */}
      <main id="main-content" className="relative z-10 flex-grow">
        <HeroSection
          onExploreJourney={() => scrollToSection('about')}
          onEnterLab={() => scrollToSection('lab')}
        />

        <AboutSection onExploreProjects={() => scrollToSection('projects')} />

        <EducationSection />

        <SkillsSection />

        <ProjectsSection />

        <LabSection />

        <ResearchSection />

        <ContactSection />
      </main>

      {/* 5. Footer with Apple Frosted Glass Surface */}
      <Footer />
    </div>
  );
};
