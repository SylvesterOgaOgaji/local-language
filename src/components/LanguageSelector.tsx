import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../types';
import { Globe, Check, ChevronDown, AlertTriangle, BadgeCheck } from 'lucide-react';

interface LanguageSelectorProps {
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ compact = false }) => {
  const { currentLanguage, setLanguage, availableLanguages, languageInfo } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Selected language: ${languageInfo.name}. Click to choose another language.`}
        className={`flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[38px] ${
          compact ? 'px-2.5 py-1' : ''
        }`}
      >
        <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
        <span className="truncate max-w-[130px] md:max-w-[160px] text-left">
          {languageInfo.nativeName}
        </span>
        {languageInfo.status === 'review_required' && (
          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" title="Review required" />
        )}
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          aria-label="Available languages"
          className="absolute right-0 mt-2 w-72 md:w-80 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 mb-1">
            Nigerian Languages & Fallback
          </div>
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {availableLanguages.map((lang) => {
              const isSelected = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code as LanguageCode);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 flex items-start justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors ${
                    isSelected ? 'bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100' : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs md:text-sm">{lang.nativeName}</span>
                      <span className="text-xs text-slate-400 font-normal">({lang.name})</span>
                      {lang.status === 'verified' ? (
                        <span className="inline-flex items-center gap-0.5 text-[10px] bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold px-1.5 py-0.2 rounded border border-emerald-300/60">
                          <BadgeCheck className="w-2.5 h-2.5" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-[10px] bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-semibold px-1.5 py-0.2 rounded border border-amber-300/60">
                          <AlertTriangle className="w-2.5 h-2.5" /> Review Req.
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {lang.region}
                    </p>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="px-3 pt-2 text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 mt-1">
            * Languages marked <em>Review Req.</em> fall back to English for unverified terms.
          </div>
        </div>
      )}
    </div>
  );
};
