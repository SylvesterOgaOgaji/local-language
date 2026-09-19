import React from 'react';
import { PracticalExample } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { AlertOctagon, CheckCircle, Lightbulb, MapPin } from 'lucide-react';

interface PracticalExampleCardProps {
  example: PracticalExample;
}

export const PracticalExampleCard: React.FC<PracticalExampleCardProps> = ({ example }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-50 dark:bg-slate-900/90 border-2 border-emerald-500/30 rounded-2xl p-5 md:p-6 shadow-sm my-6">
      {/* Header Badge */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            <MapPin className="w-4 h-4" aria-hidden="true" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            {t('practicalTipTitle')}
          </span>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          Nigeria Scenario
        </span>
      </div>

      <h4 className="text-base md:text-lg font-extrabold text-slate-900 dark:text-white mb-2">
        {example.title}
      </h4>

      <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800 mb-4 font-normal">
        {example.scenario}
      </p>

      {/* Comparison Grid: Bad Action vs Good Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Bad / Risky Action */}
        <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-xl p-4">
          <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-xs md:text-sm mb-1.5">
            <AlertOctagon className="w-4 h-4 shrink-0 text-rose-600" aria-hidden="true" />
            <span>{t('wrongActionLabel')}</span>
          </div>
          <p className="text-xs md:text-sm text-rose-950 dark:text-rose-200">
            {example.badAction}
          </p>
        </div>

        {/* Good / Safe Action */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-xl p-4">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs md:text-sm mb-1.5">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" aria-hidden="true" />
            <span>{t('safeActionLabel')}</span>
          </div>
          <p className="text-xs md:text-sm text-emerald-950 dark:text-emerald-200">
            {example.goodAction}
          </p>
        </div>
      </div>

      {/* Nigerian Context Note */}
      {example.nigeriaContextTip && (
        <div className="flex items-start gap-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3 text-xs md:text-sm text-amber-950 dark:text-amber-200">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <strong className="font-bold">Nigerian Reality Tip:</strong> {example.nigeriaContextTip}
          </div>
        </div>
      )}
    </div>
  );
};
