import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { soundSynth } from '../../audio/soundSynth';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '2xl',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      // Focus first focusable element inside modal
      setTimeout(() => {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable && focusable.length > 0) {
          focusable[0].focus();
        }
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          soundSynth.playClick();
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
        previouslyFocusedElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  }[maxWidth];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-space-950/80 backdrop-blur-md transition-opacity duration-300"
        onClick={() => {
          soundSynth.playClick();
          onClose();
        }}
      />

      {/* Dialog Window */}
      <div
        ref={modalRef}
        className={`relative w-full ${maxWidthStyles} glass-panel border border-bio-cyan/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.15)] z-10 my-8 max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 mb-6">
          <div>
            <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bio-cyan" />
              {title}
            </h2>
            {subtitle && <p className="text-xs sm:text-sm text-slate-400 mt-1">{subtitle}</p>}
          </div>
          <button
            onClick={() => {
              soundSynth.playClick();
              onClose();
            }}
            aria-label="Close dialog"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-cyan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-slate-200 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};
