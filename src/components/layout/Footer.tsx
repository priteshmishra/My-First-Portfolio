import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Dna, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-space-950/90 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Academic Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-bio-cyan/15 border border-bio-cyan/40 flex items-center justify-center text-bio-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <Dna className="w-5 h-5 animate-spin" style={{ animationDuration: '12s' }} />
            </div>
            <span className="font-extrabold text-lg tracking-wider text-white">
              BIO<span className="text-bio-cyan">VERSE</span>
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-bio-violet/15 text-bio-violet border border-bio-violet/30 font-mono">
              QUANTUM ORGANISM
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            {portfolioData.owner.academicProgram} &bull; {portfolioData.owner.institution}
          </p>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            {portfolioData.owner.courseCode}
          </p>
        </div>

        {/* Social / Contact Links */}
        <div className="flex items-center gap-3">
          <a
            href={portfolioData.owner.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-bio-cyan transition-colors"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a
            href={portfolioData.owner.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-bio-cyan transition-colors"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z" />
            </svg>
          </a>
          <a
            href={`mailto:${portfolioData.owner.email}`}
            aria-label="Email Pritesh Mishra"
            className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-bio-cyan transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright & Scientific Integrity statement */}
        <div className="text-xs text-slate-500 text-center md:text-right">
          <p>&copy; {currentYear} {portfolioData.owner.name}. All rights reserved.</p>
          <p className="mt-1 text-[11px] text-slate-600">
            Built for educational & scientific portfolio exploration. Zero paid APIs required.
          </p>
        </div>
      </div>
    </footer>
  );
};
