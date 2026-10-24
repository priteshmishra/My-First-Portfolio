import React, { useState, useEffect } from 'react';
import { Dna, Menu, X, Sun, Moon } from 'lucide-react';
import { profileData } from '../../data/profile';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { reducedMotion, toggleReducedMotion } = useReducedMotion();
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#education', label: 'Education' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#lab', label: 'Lab' },
    { href: '#cv', label: 'CV' },
    { href: '#research', label: 'Research' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 px-4 sm:px-6 lg:px-8'
          : 'py-4 px-4 sm:px-6 lg:px-8'
      }`}
    >
      <div className="max-w-5xl mx-auto glass-apple rounded-full px-5 py-2.5 flex items-center justify-between shadow-soft border border-white/80 dark:border-white/10">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-cyan rounded-full p-1"
        >
          <div className="w-8 h-8 rounded-full bg-bio-cyan/20 border border-bio-cyan/40 flex items-center justify-center text-bio-cyan-dark group-hover:scale-105 transition-all shadow-sm">
            <Dna className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base tracking-wider text-bio-text leading-tight">
              BIO<span className="text-bio-cyan-dark">VERSE</span>
            </span>
            <span className="text-[9px] font-mono tracking-wider text-bio-muted uppercase leading-tight">
              {profileData.name}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (Apple Floating Pill Style) */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-bio-cyan/20 text-bio-cyan-dark font-semibold border border-bio-cyan/40 shadow-sm scale-105'
                    : 'text-slate-700 hover:text-bio-text hover:bg-white/70 dark:hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          {/* Dark / Light Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-full glass-apple-pill text-slate-700 hover:text-bio-cyan-dark hover:scale-105 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-bio-cyan"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Motion Toggle Button */}
          <button
            onClick={toggleReducedMotion}
            aria-label={reducedMotion ? 'Enable animations' : 'Reduce animations'}
            title={reducedMotion ? 'Animations reduced' : 'Reduce animations'}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono rounded-full border transition-colors ${
              reducedMotion
                ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30'
                : 'glass-apple-pill text-slate-700 hover:bg-white/90 dark:hover:bg-white/10'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${reducedMotion ? 'bg-amber-500' : 'bg-bio-cyan animate-pulse'}`} />
            <span>{reducedMotion ? 'Motion: Off' : 'Motion: On'}</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden p-2 rounded-full text-bio-text hover:bg-white/80 dark:hover:bg-white/10 border border-white/60 dark:border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-cyan"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-5xl mx-auto glass-apple rounded-2xl p-4 shadow-xl animate-fade-in">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-bio-cyan/20 text-bio-cyan-dark font-semibold'
                      : 'text-bio-text hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-xs font-mono text-bio-muted">Theme</span>
              <button
                onClick={toggleTheme}
                className="text-xs font-mono px-3.5 py-1 rounded-full glass-apple-pill flex items-center gap-1.5 text-slate-700"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-mono text-bio-muted">Motion Preference</span>
              <button
                onClick={toggleReducedMotion}
                className="text-xs font-mono px-3.5 py-1 rounded-full glass-apple-pill text-slate-700"
              >
                {reducedMotion ? 'Enable Motion' : 'Reduce Motion'}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
