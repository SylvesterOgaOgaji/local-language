import React, { createContext, useContext, useState, useEffect } from 'react';
import { TextSize, ContrastMode, AccessibilitySettings } from '../types';

interface AccessibilityContextType extends AccessibilitySettings {
  setTextSize: (size: TextSize) => void;
  setContrastMode: (mode: ContrastMode) => void;
  toggleSimplifiedMode: () => void;
  setSpeechRate: (rate: number) => void;
  resetAccessibility: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSizeState] = useState<TextSize>(() => {
    try {
      const saved = localStorage.getItem('impactlearn_text_size') as TextSize;
      if (saved && ['normal', 'large', 'xlarge'].includes(saved)) return saved;
    } catch {
      // ignore
    }
    return 'normal';
  });

  const [contrastMode, setContrastModeState] = useState<ContrastMode>(() => {
    try {
      const saved = localStorage.getItem('impactlearn_contrast') as ContrastMode;
      if (saved && ['default', 'high-contrast', 'sepia'].includes(saved)) return saved;
    } catch {
      // ignore
    }
    return 'default';
  });

  const [simplifiedMode, setSimplifiedMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('impactlearn_simplified') === 'true';
    } catch {
      return false;
    }
  });

  const [speechRate, setSpeechRateState] = useState<number>(() => {
    try {
      const saved = parseFloat(localStorage.getItem('impactlearn_speech_rate') || '1.0');
      return isNaN(saved) ? 1.0 : saved;
    } catch {
      return 1.0;
    }
  });

  const setTextSize = (size: TextSize) => {
    setTextSizeState(size);
    try {
      localStorage.setItem('impactlearn_text_size', size);
    } catch {
      // ignore
    }
  };

  const setContrastMode = (mode: ContrastMode) => {
    setContrastModeState(mode);
    try {
      localStorage.setItem('impactlearn_contrast', mode);
    } catch {
      // ignore
    }
  };

  const toggleSimplifiedMode = () => {
    setSimplifiedMode(prev => {
      const next = !prev;
      try {
        localStorage.setItem('impactlearn_simplified', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const setSpeechRate = (rate: number) => {
    setSpeechRateState(rate);
    try {
      localStorage.setItem('impactlearn_speech_rate', String(rate));
    } catch {
      // ignore
    }
  };

  const resetAccessibility = () => {
    setTextSize('normal');
    setContrastMode('default');
    setSimplifiedMode(false);
    setSpeechRate(1.0);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('contrast-high', 'contrast-sepia', 'text-scale-large', 'text-scale-xlarge', 'mode-simplified');
    
    if (contrastMode === 'high-contrast') {
      root.classList.add('contrast-high');
    } else if (contrastMode === 'sepia') {
      root.classList.add('contrast-sepia');
    }

    if (textSize === 'large') {
      root.classList.add('text-scale-large');
    } else if (textSize === 'xlarge') {
      root.classList.add('text-scale-xlarge');
    }

    if (simplifiedMode) {
      root.classList.add('mode-simplified');
    }
  }, [contrastMode, textSize, simplifiedMode]);

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        contrastMode,
        simplifiedMode,
        speechRate,
        setTextSize,
        setContrastMode,
        toggleSimplifiedMode,
        setSpeechRate,
        resetAccessibility,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
