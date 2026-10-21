import React, { useState } from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { portfolioData } from '../data/portfolioData';
import { Mail, Copy, Check, Send, MapPin, Sparkles } from 'lucide-react';
import { soundSynth } from '../audio/soundSynth';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    soundSynth.playClick();
    navigator.clipboard.writeText(portfolioData.owner.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    soundSynth.playSuccess();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <SectionWrapper
      id="contact"
      title="Contact & Collaboration"
      subtitle="Connect for academic research discussions, computational biology collaborations, or internship opportunities."
      badgeText="Direct Inquiries"
      badgeColor="cyan"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 space-y-6">
          <Card glowColor="cyan">
            <h3 className="text-xl font-bold text-white mb-2">Pritesh Mishra</h3>
            <p className="text-xs text-bio-cyan font-mono mb-4">
              {portfolioData.owner.academicProgram} &bull; {portfolioData.owner.institution}
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{portfolioData.owner.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-bio-cyan shrink-0" />
                <span className="font-mono text-xs">{portfolioData.owner.email}</span>
              </div>
            </div>

            {/* Email Copy Button */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <Button
                variant="cyan"
                size="sm"
                icon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                onClick={handleCopyEmail}
                className="w-full"
              >
                {copied ? 'Email Copied to Clipboard!' : 'Copy Direct Email'}
              </Button>
            </div>

            {/* Social Links */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-around">
              <a
                href={portfolioData.owner.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-bio-cyan transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href={portfolioData.owner.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-bio-violet transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </Card>

          {/* Academic Inquiries Note */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-400 leading-relaxed">
            <span className="text-bio-cyan font-bold block mb-1">Academic Context:</span>
            Inquiries regarding BTY100M portfolio assignments, genomic sequence tools, or open-source scientific tools will receive a response within 24-48 hours.
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="lg:col-span-7">
          <Card glowColor="violet">
            <h3 className="text-lg font-bold text-white mb-1">Send a Message</h3>
            <p className="text-xs text-slate-400 mb-6">
              Inquire about collaborations or research projects.
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <Sparkles className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white">Message Transmitted</h4>
                <p className="text-xs text-slate-300">
                  Thank you! Your inquiry has been locally recorded and simulated. You can also reach Pritesh directly via email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Rosalind Franklin"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-space-950/80 border border-white/10 text-white placeholder-slate-600 text-sm focus:border-bio-cyan focus:outline-none focus:ring-1 focus:ring-bio-cyan transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="researcher@institution.edu"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-space-950/80 border border-white/10 text-white placeholder-slate-600 text-sm focus:border-bio-cyan focus:outline-none focus:ring-1 focus:ring-bio-cyan transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1">
                    Project / Inquiries Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Discuss bioinformatics research, workflow pipelines, or academic opportunities..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-space-950/80 border border-white/10 text-white placeholder-slate-600 text-sm focus:border-bio-cyan focus:outline-none focus:ring-1 focus:ring-bio-cyan transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="violet"
                  size="md"
                  icon={<Send className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Send Inquiry
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </SectionWrapper>
  );
};
