import React, { useState } from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { profileData } from '../data/profile';
import { ExternalLink, MessageSquare, Send, CheckCircle2, Info } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/ui/SocialIcons';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';

export const ContactSection: React.FC = () => {
  const [formSent, setFormSent] = useState<boolean>(false);
  const [senderName, setSenderName] = useState<string>('');
  const [senderOrg, setSenderOrg] = useState<string>('');
  const [senderMsg, setSenderMsg] = useState<string>('');

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setSenderName('');
      setSenderOrg('');
      setSenderMsg('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="Academic Dialogue & Inquiries"
        title="Get in Touch"
        description="Open to academic discussions, undergraduate bioinformatics collaboration, and computational biology guidance."
      />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Verified Profiles & Ethical Contact Policy in Apple Frosted Glass */}
        <div className="md:col-span-5 space-y-6">
          <Reveal>
            <div className="glass-apple p-6 sm:p-7 space-y-5">
              <h3 className="text-sm font-bold text-bio-text font-mono uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-bio-cyan-dark" />
                <span>Verified Social Profiles</span>
              </h3>

              <div className="space-y-3">
                {/* GitHub link */}
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl glass-apple-interactive group"
                  aria-label="Visit Pritesh Kumar Mishra on GitHub (opens in new tab)"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white dark:bg-white/10 border border-white/80 dark:border-white/10 text-slate-800 dark:text-slate-200 group-hover:text-black dark:group-hover:text-white shadow-sm">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-bio-text block">GitHub Profile</span>
                      <span className="text-[11px] font-mono text-bio-muted">@priteshmishra</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-bio-muted group-hover:text-bio-cyan-dark" />
                </a>

                {/* LinkedIn link */}
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl glass-apple-interactive group"
                  aria-label="Visit Pritesh Kumar Mishra on LinkedIn (opens in new tab)"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white dark:bg-white/10 border border-white/80 dark:border-white/10 text-[#0A66C2] shadow-sm">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-bio-text block">LinkedIn Network</span>
                      <span className="text-[11px] font-mono text-bio-muted">Pritesh Mishra</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-bio-muted group-hover:text-bio-cyan-dark" />
                </a>
              </div>

              {/* Email Transparency Note in Frosted Container */}
              <div className="p-3.5 rounded-xl glass-apple-secondary text-[11px] text-slate-600 space-y-1.5">
                <div className="flex items-center gap-1.5 text-bio-cyan-dark font-mono font-semibold">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Direct Communication:</span>
                </div>
                <p className="leading-relaxed">
                  To protect against automated crawlers and preserve personal privacy, a direct email address is not published. Academic inquiries and research discussions are warmly welcomed via LinkedIn messaging.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Academic Contact Message Simulator */}
        <div className="md:col-span-7">
          <Reveal delayMs={100}>
            <div className="glass-apple p-6 sm:p-8">
              <h3 className="text-base font-bold text-bio-text font-mono mb-1">
                Send an Academic Inquiry
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Submit an inquiry or discussion topic. For official correspondence, please connect on LinkedIn.
              </p>

              {formSent ? (
                <div className="p-6 rounded-2xl bg-cyan-50/80 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-500/25 text-center space-y-2 animate-fade-in backdrop-blur-md">
                  <CheckCircle2 className="w-8 h-8 text-bio-cyan-dark mx-auto" />
                  <h4 className="font-bold text-sm text-cyan-950 font-mono">
                    Inquiry Simulation Logged
                  </h4>
                  <p className="text-xs text-cyan-800">
                    Thank you, {senderName || 'colleague'}. This client-side form verifies interface responsiveness. Please direct formal messages to LinkedIn.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="space-y-4 text-xs">
                  <div>
                    <label htmlFor="contact-name" className="block font-mono uppercase text-bio-muted font-bold mb-1">
                      Your Name / Designation
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Dr. Jane Doe / Peer Researcher"
                      className="w-full p-3 rounded-xl border border-white/80 glass-apple-secondary text-bio-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-cyan"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-org" className="block font-mono uppercase text-bio-muted font-bold mb-1">
                      Institution / Department
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      value={senderOrg}
                      onChange={(e) => setSenderOrg(e.target.value)}
                      placeholder="e.g. Lovely Professional University / Laboratory"
                      className="w-full p-3 rounded-xl border border-white/80 glass-apple-secondary text-bio-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-cyan"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-msg" className="block font-mono uppercase text-bio-muted font-bold mb-1">
                      Academic Note / Topic
                    </label>
                    <textarea
                      id="contact-msg"
                      rows={4}
                      required
                      value={senderMsg}
                      onChange={(e) => setSenderMsg(e.target.value)}
                      placeholder="Enter details regarding research collaboration, course inquiry, or project feedback..."
                      className="w-full p-3 rounded-xl border border-white/80 glass-apple-secondary text-bio-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-cyan resize-y"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={<Send className="w-3.5 h-3.5" />}
                    className="w-full sm:w-auto shadow-sm"
                  >
                    Send Inquiry Note
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
