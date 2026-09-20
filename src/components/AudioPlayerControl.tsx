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
      <div className="inline-flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg">
        <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{t('audioNotSupported')}</span>
      </div>
    );
  }

  return (
    <div 
      className="inline-flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-xl p-1 shadow-sm"
      role="region"
      aria-label="Audio narration controls"
    >
      <div className="flex items-center gap-1 px-2 text-zinc-700 dark:text-zinc-300 font-medium text-xs">
        <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse text-emerald-600 dark:text-emerald-400' : 'text-zinc-500'}`} aria-hidden="true" />
        <span className="hidden sm:inline">{label || t('readAloud')}</span>
      </div>

      {!isSpeaking && !isPaused && (
        <button
          type="button"
          onClick={() => speak(textToRead)}
          aria-label={`${t('readAloud')}: ${label || 'this lesson section'}`}
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 rounded-lg text-xs font-semibold transition-all shadow-sm active:scale-95"
        >
          <Play className="w-3 h-3 fill-current" aria-hidden="true" />
          <span>Play</span>
        </button>
      )}

      {isSpeaking && (
        <button
          type="button"
          onClick={pause}
          aria-label={t('pauseAudio')}
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg text-xs font-semibold transition-all"
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
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-lg text-xs font-semibold transition-all"
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
          className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 rounded-lg text-xs font-semibold transition-all"
        >
          <Square className="w-3 h-3 fill-current" aria-hidden="true" />
          <span>Stop</span>
        </button>
      )}
    </div>
  );
};
