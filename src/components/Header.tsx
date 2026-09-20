import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { LanguageSelector } from './LanguageSelector';
import { Shield, Eye, Type, Sparkles, AlertCircle } from 'lucide-react';

export const Header: React.FC = () => {
  const { t, isReviewRequired, languageInfo } = useLanguage();
  const { contrastMode, setContrastMode, textSize, setTextSize, simplifiedMode, toggleSimplifiedMode } = useAccessibility();

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800 shadow-sm">
      {/* Skip to Main Content Link for WCAG Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-zinc-900 focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Translation Review Notice Banner if applicable */}
      {isReviewRequired && (
        <div 
          role="status" 
          aria-live="polite"
          className="bg-amber-500/10 border-b border-amber-500/20 text-amber-900 dark:text-amber-200 px-4 py-2 text-xs font-medium"
        >
          <div className="container mx-auto flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            <span>
              <strong>{languageInfo.name} ({languageInfo.nativeName}):</strong> {t('translationReviewRequiredNotice')}
            </span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 shadow-sm">
              <Shield className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base md:text-lg tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <span>ImpactLearn</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold border border-zinc-200 dark:border-zinc-700">
                    Nigeria 🇳🇬
                  </span>
                </h1>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                By <span className="font-semibold text-zinc-700 dark:text-zinc-300">JV ImpactVR Initiative Ltd/Gte</span>
              </p>
            </div>
          </div>

          {/* Mobile Language Selector Toggle */}
          <div className="md:hidden">
            <LanguageSelector compact />
          </div>
        </div>

        {/* Accessibility Quick Controls & Desktop Language Selector */}
        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-end overflow-x-auto pb-1 md:pb-0">
          {/* Text Size Cycler */}
          <button
            type="button"
            onClick={() => {
              if (textSize === 'normal') setTextSize('large');
              else if (textSize === 'large') setTextSize('xlarge');
              else setTextSize('normal');
            }}
            className="px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition-colors"
            title="Cycle text size (Normal / Large / Extra Large)"
            aria-label={`Current text size: ${textSize}. Click to change.`}
          >
            <Type className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
            <span>{textSize === 'normal' ? 'A' : textSize === 'large' ? 'A+' : 'A++'}</span>
          </button>

          {/* High Contrast Toggle */}
          <button
            type="button"
            onClick={() => {
              if (contrastMode === 'default') setContrastMode('high-contrast');
              else if (contrastMode === 'high-contrast') setContrastMode('sepia');
              else setContrastMode('default');
            }}
            className="px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition-colors"
            title="Toggle high contrast / reading mode"
            aria-label={`Current mode: ${contrastMode}. Click to switch.`}
          >
            <Eye className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
            <span className="capitalize">{contrastMode === 'default' ? 'Standard' : contrastMode === 'high-contrast' ? 'High Contrast' : 'Warm'}</span>
          </button>

          {/* Low Cognitive Load / Simplified View */}
          <button
            type="button"
            onClick={toggleSimplifiedMode}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              simplifiedMode
                ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900'
                : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
            title="Toggle low distraction focus mode"
            aria-pressed={simplifiedMode}
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
            <span className="hidden sm:inline">Focus View</span>
          </button>

          {/* Desktop Language Selector */}
          <div className="hidden md:block">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
};
