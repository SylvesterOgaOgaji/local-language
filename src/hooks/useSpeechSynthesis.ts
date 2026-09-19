import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';

export interface SpeechSynthesisState {
  isSupported: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  speak: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

export const useSpeechSynthesis = (): SpeechSynthesisState => {
  const { currentLanguage } = useLanguage();
  const { speechRate } = useAccessibility();
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  const stop = useCallback(() => {
    if (isSupported && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, [isSupported]);

  const pause = useCallback(() => {
    if (isSupported && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    }
  }, [isSupported]);

  const resume = useCallback(() => {
    if (isSupported && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
    }
  }, [isSupported]);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported || typeof window === 'undefined' || !window.speechSynthesis) {
        return;
      }

      // Stop any active speech
      window.speechSynthesis.cancel();

      if (!text || text.trim() === '') return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speechRate;
      utterance.pitch = 1.0;

      // Select matching voice if available, else default to en-NG / en-GB
      const voices = window.speechSynthesis.getVoices();
      const langMap: Record<string, string> = {
        en: 'en-NG',
        ha: 'ha-NG',
        yo: 'yo-NG',
        ig: 'ig-NG',
        tiv: 'en-NG',
        ikd: 'en-NG',
      };

      const preferredLang = langMap[currentLanguage] || 'en-NG';
      const voice = voices.find(v => v.lang.startsWith(preferredLang) || v.lang.startsWith('en'));
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, currentLanguage, speechRate]
  );

  useEffect(() => {
    return () => {
      if (isSupported && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

  return {
    isSupported,
    isSpeaking,
    isPaused,
    speak,
    pause,
    resume,
    stop,
  };
};
