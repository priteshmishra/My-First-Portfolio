/**
 * Procedural Web Audio API sound synthesizer for BIOVERSE.
 * Produces subtle, scientific harmonic tones without any external audio asset downloads.
 * Sound is strictly disabled by default.
 */

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (enabled) {
      this.initContext();
      this.playTone(520, 0.08, 'sine');
    }
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', gainVal: number = 0.15) {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainVal, this.ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio failed gracefully (e.g. inactive tab)
    }
  }

  public playClick() {
    this.playTone(880, 0.04, 'triangle', 0.08);
  }

  public playImpulse(strength: number = 1) {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const baseFreq = 180 + Math.min(strength * 60, 200);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch {
      // Graceful fallback
    }
  }

  public playSuccess() {
    if (!this.isEnabled) return;
    this.playTone(587.33, 0.1, 'sine', 0.12); // D5
    setTimeout(() => {
      this.playTone(880, 0.2, 'sine', 0.15); // A5
    }, 100);
  }

  public playQuantumBurst() {
    if (!this.isEnabled) return;
    const notes = [329.63, 440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.25, 'triangle', 0.12);
      }, idx * 60);
    });
  }
}

export const soundSynth = new SoundSynthesizer();
