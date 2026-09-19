import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { LanguageSelector } from './LanguageSelector';
import { Shield, Eye, Type, Sparkles, AlertCircle } from 'lucide-react';

export const Header: React.FC = () => {
  const { t, isReviewRequired, languageInfo } = useLanguage();
  const { contrastMode, setContrastMode, textSize, setTextSize, simplifiedMode, toggleSimplifiedMode } = useAccessibility();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Skip to Main Content Link for WCAG Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Translation Review Notice Banner if applicable */}
      {isReviewRequired && (
        <div 
          role="status" 
          aria-live="polite"
          className="bg-amber-500 text-slate-950 px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-between shadow-inner"
        >
          <div className="container mx-auto flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-slate-950" aria-hidden="true" />
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md ring-2 ring-emerald-500/30">
              <Shield className="w-6 h-6 text-amber-300" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg md:text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>Impact<span className="text-emerald-600 dark:text-emerald-400">Learn</span></span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-300/60 dark:border-emerald-800">
                    Nigeria 🇳🇬
                  </span>
                </h1>
              </div>
              <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 font-medium">
                By <span className="font-semibold text-slate-700 dark:text-slate-200">JV ImpactVR Initiative Ltd/Gte</span>
              </p>
            </div>
          </div>

          {/* Mobile Language Selector Toggle */}
          <div className="md:hidden">
            <LanguageSelector compact />
          </div>
        </div>

        {/* Accessibility Quick Controls & Desktop Language Selector */}
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-end overflow-x-auto pb-1 md:pb-0">
          {/* Text Size Cycler */}
          <button
            type="button"
            onClick={() => {
              if (textSize === 'normal') setTextSize('large');
              else if (textSize === 'large') setTextSize('xlarge');
              else setTextSize('normal');
            }}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors focus:ring-2 focus:ring-emerald-500"
            title="Cycle text size (Normal / Large / Extra Large)"
            aria-label={`Current text size: ${textSize}. Click to change.`}
          >
            <Type className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
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
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors focus:ring-2 focus:ring-emerald-500"
            title="Toggle high contrast / reading mode"
            aria-label={`Current mode: ${contrastMode}. Click to switch.`}
          >
            <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span className="capitalize">{contrastMode === 'default' ? 'Standard' : contrastMode === 'high-contrast' ? 'High Contrast' : 'Warm'}</span>
          </button>

          {/* Low Cognitive Load / Simplified View */}
          <button
            type="button"
            onClick={toggleSimplifiedMode}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors focus:ring-2 focus:ring-emerald-500 ${
              simplifiedMode
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
            }`}
            title="Toggle low distraction focus mode"
            aria-pressed={simplifiedMode}
          >
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
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
