import '@testing-library/jest-dom/vitest';

// Mock Web Speech API SpeechSynthesis
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'speechSynthesis', {
    value: {
      speak: () => {},
      cancel: () => {},
      pause: () => {},
      resume: () => {},
      getVoices: () => [],
      speaking: false,
      paused: false,
      onvoiceschanged: null,
    },
    writable: true,
  });

  // Mock SpeechSynthesisUtterance
  (globalThis as any).SpeechSynthesisUtterance = class {
    text: string;
    lang = 'en-US';
    rate = 1.0;
    pitch = 1.0;
    voice = null;
    onstart: (() => void) | null = null;
    onend: (() => void) | null = null;
    onerror: (() => void) | null = null;
    constructor(text = '') {
      this.text = text;
    }
  };

  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}
