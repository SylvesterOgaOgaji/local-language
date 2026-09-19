import React from 'react';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { Volume2, VolumeX, Play, Pause, Square } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AudioPlayerControlProps {
  textToRead: string;
  label?: string;
}

export const AudioPlayerControl: React.FC<AudioPlayerControlProps> = ({ textToRead, label }) => {
  const { t } = useLanguage();
  const { isSupported, isSpeaking, isPaused, speak, pause, resume, stop } = useSpeechSynthesis();

  if (!isSupported) {
    return (
      <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
        <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{t('audioNotSupported')}</span>
      </div>
    );
  }

  return (
    <div 
      className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 rounded-xl p-1.5 shadow-sm"
      role="region"
      aria-label="Audio narration controls"
    >
      <div className="flex items-center gap-1.5 px-2 text-emerald-800 dark:text-emerald-300 font-semibold text-xs">
        <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse text-emerald-600' : ''}`} aria-hidden="true" />
        <span className="hidden sm:inline">{label || t('readAloud')}</span>
      </div>

      {!isSpeaking && !isPaused && (
        <button
          type="button"
          onClick={() => speak(textToRead)}
          aria-label={`${t('readAloud')}: ${label || 'this lesson section'}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg text-xs font-bold transition-all shadow-sm focus:ring-2 focus:ring-emerald-500"
        >
          <Play className="w-3 h-3 fill-current" aria-hidden="true" />
          <span>Play Audio</span>
        </button>
      )}

      {isSpeaking && (
        <button
          type="button"
          onClick={pause}
          aria-label={t('pauseAudio')}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white rounded-lg text-xs font-bold transition-all shadow-sm focus:ring-2 focus:ring-amber-500"
        >
          <Pause className="w-3 h-3 fill-current" aria-hidden="true" />
          <span>Pause</span>
        </button>
      )}

      {isPaused && (
        <button
          type="button"
          onClick={resume}
          aria-label="Resume audio"
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg text-xs font-bold transition-all shadow-sm focus:ring-2 focus:ring-emerald-500"
        >
          <Play className="w-3 h-3 fill-current" aria-hidden="true" />
          <span>Resume</span>
        </button>
      )}

      {(isSpeaking || isPaused) && (
        <button
          type="button"
          onClick={stop}
          aria-label={t('stopAudio')}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold transition-all focus:ring-2 focus:ring-slate-400"
        >
          <Square className="w-3 h-3 fill-current" aria-hidden="true" />
          <span>Stop</span>
        </button>
      )}
    </div>
  );
};
