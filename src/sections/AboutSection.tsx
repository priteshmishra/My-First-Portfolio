import React from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { profileData } from '../data/profile';
import { MapPin, Target, BookOpen, Info } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';

interface AboutSectionProps {
  onExploreProjects?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreProjects }) => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="Academic Background & Motivation"
        title={profileData.aboutTitle}
        description="A grounded look at my academic journey, motivations in biotechnology, and foundational learning objectives."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Card & Photo Placeholder (Left column: 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Reveal>
            <div className="glass-apple p-6 sm:p-7 space-y-6">
              {/* Profile Photo Component: Tasteful Initials Placeholder */}
              <div className="flex flex-col sm:flex-row items-center gap-5">
                {/* Initials Placeholder Avatar */}
                <div
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-white/90 via-cyan-50/60 to-violet-50/60 dark:from-[#162030] dark:via-cyan-900/20 dark:to-violet-900/20 border-2 border-bio-cyan/40 flex flex-col items-center justify-center text-center shadow-card shrink-0 relative overflow-hidden group"
                  aria-label="Profile photo placeholder with initials PM"
                >
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-bio-cyan-dark tracking-wider">
                    {profileData.photoPlaceholder.initials}
                  </span>
                  <span className="text-[10px] font-mono text-bio-muted uppercase mt-0.5">
                    Profile
                  </span>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-bio-cyan/30 rounded-tl-lg" />
                </div>

                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold text-bio-text">
                    {profileData.name}
                  </h3>
                  <p className="text-xs font-mono text-bio-cyan-dark font-semibold mt-0.5">
                    {profileData.degree}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-bio-muted mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{profileData.location}</span>
                  </div>
                </div>
              </div>

              {/* Photo replacement documentation notice */}
              <div className="p-3.5 rounded-xl glass-apple-secondary text-[11px] text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-slate-800 font-semibold">
                  <Info className="w-3.5 h-3.5 text-bio-cyan-dark shrink-0" />
                  <span>Replace Photo Placeholder:</span>
                </div>
                <p className="font-mono text-[10px] text-slate-500">
                  {profileData.photoPlaceholder.instructions}
                </p>
              </div>

              {/* Academic Identity Details Panel */}
              <div className="border-t border-slate-200/60 pt-4 space-y-2.5 text-xs">
                <h4 className="font-mono uppercase tracking-wider text-[11px] text-bio-muted font-bold">
                  Academic Identification
                </h4>
                {profileData.academicDetails.map((detail, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-100 last:border-none">
                    <span className="text-slate-500 font-mono text-[11px]">{detail.label}</span>
                    <span className="font-medium text-bio-text text-right">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Biography & Learning Goals (Right column: 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Reveal delayMs={100}>
            {/* Biography narrative */}
            <div className="glass-apple p-6 sm:p-8 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              <h3 className="text-base font-bold text-bio-text font-mono flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-bio-cyan-dark" />
                <span>Foundational Motivation</span>
              </h3>
              {profileData.biography.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delayMs={200}>
            {/* Statement of Learning Goals */}
            <div className="glass-apple p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-bio-violet font-mono text-xs uppercase tracking-wider font-bold">
                <Target className="w-4 h-4" />
                <span>Undergraduate Learning Roadmap Goals</span>
              </div>
              <h4 className="text-base font-bold text-bio-text">
                What I Am Currently Working Toward
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {profileData.learningGoals.map((goal, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl glass-apple-secondary text-xs text-bio-text flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-bio-cyan/20 text-bio-cyan-dark font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed text-slate-700">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
