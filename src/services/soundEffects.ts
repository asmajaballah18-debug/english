class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private bgmGain: GainNode | null = null;
  private bgmInterval: number | null = null;

  public getCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  startBackgroundMusic() {
    if (this.bgmGain) return; // Already playing
    const ctx = this.getCtx();
    this.bgmGain = ctx.createGain();
    this.bgmGain.gain.value = 0.03; // Very subtle volume
    this.bgmGain.connect(ctx.destination);

    const playChord = () => {
      if (!this.bgmGain) return;
      // Uplifting, ambient chord progression
      const chords = [
        [261.63, 329.63, 392.00], // C major
        [349.23, 440.00, 523.25], // F major
        [392.00, 493.88, 587.33], // G major
        [261.63, 349.23, 440.00], // F major inversion
      ];
      
      const chord = chords[Math.floor(Math.random() * chords.length)];
      
      chord.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        // Drop an octave for a warmer, pad-like sound
        osc.frequency.value = freq / 2; 
        
        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0, ctx.currentTime);
        // Slow attack
        oscGain.gain.linearRampToValueAtTime(0.3 / (index + 1), ctx.currentTime + 3);
        // Slow release
        oscGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 9);
        
        osc.connect(oscGain);
        oscGain.connect(this.bgmGain!);
        
        osc.start();
        osc.stop(ctx.currentTime + 9);
      });
    };

    playChord();
    // Play a new chord every 6 seconds, creating a nice overlapping ambient texture
    this.bgmInterval = window.setInterval(playChord, 6000);
  }

  stopBackgroundMusic() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    if (this.bgmGain) {
      const ctx = this.getCtx();
      // Fade out smoothly
      this.bgmGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
      setTimeout(() => {
        if (this.bgmGain) {
          this.bgmGain.disconnect();
          this.bgmGain = null;
        }
      }, 2000);
    }
  }

  playTransition() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }

  playPop() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }

  playHeartbeat() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    const playThump = (time: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.exponentialRampToValueAtTime(50, time + 0.2);
      
      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
      
      osc.start(time);
      osc.stop(time + 0.2);
    };
    playThump(ctx.currentTime);
    playThump(ctx.currentTime + 0.2);
  }

  playChime() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    [523.25, 659.25, 783.99].forEach((freq, i) => { // C E G
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      const startTime = ctx.currentTime + i * 0.1;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
      
      osc.start(startTime);
      osc.stop(startTime + 0.5);
    });
  }

  playFreeze() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }
  
  playHover() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }
}

export const sfx = new SoundEffects();
