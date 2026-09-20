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
    <div className="rounded-xl border border-zinc-200/90 bg-zinc-50/70 p-4 md:p-5 dark:border-zinc-800 dark:bg-zinc-950/60 my-4 space-y-3">
      {/* Header Badge */}
      <div className="flex items-center justify-between gap-3 border-b border-zinc-200/60 dark:border-zinc-800 pb-2.5">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span className="font-semibold text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            {t('practicalTipTitle')}
          </span>
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
          Nigeria Scenario
        </span>
      </div>

      <h4 className="text-sm md:text-base font-bold text-zinc-900 dark:text-zinc-100">
        {example.title}
      </h4>

      <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200/70 dark:border-zinc-800 font-normal">
        {example.scenario}
      </p>

      {/* Comparison Grid: Bad Action vs Good Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Bad / Risky Action */}
        <div className="bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-rose-800 dark:text-rose-300 font-semibold text-xs mb-1">
            <AlertOctagon className="w-3.5 h-3.5 shrink-0 text-rose-600" aria-hidden="true" />
            <span>{t('wrongActionLabel')}</span>
          </div>
          <p className="text-xs text-rose-950 dark:text-rose-200 leading-relaxed">
            {example.badAction}
          </p>
        </div>

        {/* Good / Safe Action */}
        <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-semibold text-xs mb-1">
            <CheckCircle className="w-3.5 h-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
            <span>{t('safeActionLabel')}</span>
          </div>
          <p className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed">
            {example.goodAction}
          </p>
        </div>
      </div>

      {/* Nigerian Context Note */}
      {example.nigeriaContextTip && (
        <div className="flex items-start gap-2 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-lg p-2.5 text-xs text-amber-950 dark:text-amber-200">
          <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <strong>Nigerian Reality Note:</strong> {example.nigeriaContextTip}
          </div>
        </div>
      )}
    </div>
  );
};
