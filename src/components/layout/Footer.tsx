import React from 'react';
import { ArrowUp, Dna } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { profileData } from '../../data/profile';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Footer: React.FC = () => {
  const { reducedMotion } = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto glass-apple p-6 sm:p-8 space-y-6 shadow-soft">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Identity */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-xl bg-bio-cyan/20 border border-bio-cyan/40 flex items-center justify-center text-bio-cyan-dark shadow-sm">
                <Dna className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-wider text-bio-text">
                BIO<span className="text-bio-cyan-dark">VERSE</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 font-sans max-w-sm">
              “BIOVERSE — Exploring Life Through Science and Computation.”
            </p>
            <p className="text-[11px] font-mono text-slate-500 mt-1">
              {profileData.degree} &bull; {profileData.institution} &bull; First Year
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2">
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pritesh Kumar Mishra's GitHub profile"
                className="p-2.5 rounded-xl glass-apple-pill text-slate-700 hover:text-black hover:scale-105 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pritesh Kumar Mishra's LinkedIn profile"
                className="p-2.5 rounded-xl glass-apple-pill text-[#0A66C2] hover:text-[#004182] hover:scale-105 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Back to top of page"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-medium rounded-xl glass-apple-pill text-bio-text hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-bio-cyan-dark" />
            </button>
          </div>
        </div>

        {/* Sleek Apple-style Subfooter Divider & Personal Attribution Line */}
        <div className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-3">
          <span className="text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} BIOVERSE &bull; Academic Portfolio
          </span>

          {/* Requested Personal Attribution with Heart Emoji */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-apple-pill text-slate-800 dark:text-slate-200 font-sans text-xs shadow-sm">
            <span>Made by</span>
            <strong className="font-semibold text-slate-900 dark:text-white">Pritesh Mishra</strong>
            <span className="animate-heart text-sm" role="img" aria-label="love">
              ❤️
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
