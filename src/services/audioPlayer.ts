class AudioPlayer {
  private audioCtx: AudioContext | null = null;
  private source: AudioBufferSourceNode | null = null;

  async play(base64Data: string, onEnded?: () => void) {
    this.stop();
    this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const binaryString = window.atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const buffer = this.audioCtx.createBuffer(1, bytes.length / 2, 24000);
    const channelData = buffer.getChannelData(0);
    const dataView = new DataView(bytes.buffer);
    for (let i = 0; i < channelData.length; i++) {
      channelData[i] = dataView.getInt16(i * 2, true) / 32768;
    }
    
    this.source = this.audioCtx.createBufferSource();
    this.source.buffer = buffer;
    this.source.connect(this.audioCtx.destination);
    this.source.onended = () => {
      if (onEnded) onEnded();
    };
    this.source.start();
  }

  stop() {
    if (this.source) {
      try { this.source.stop(); } catch(e) {}
      this.source.disconnect();
      this.source = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
  }
}

export const globalAudioPlayer = new AudioPlayer();
