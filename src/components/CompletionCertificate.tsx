import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Printer, RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CompletionCertificateProps {
  scorePercentage: number;
  onRestartCourse: () => void;
}

export const CompletionCertificate: React.FC<CompletionCertificateProps> = ({
  scorePercentage,
  onRestartCourse,
}) => {
  const { t, course } = useLanguage();
  const [recipientName, setRecipientName] = useState<string>('');
  const [isNameSet, setIsNameSet] = useState<boolean>(false);

  const completionDate = new Date().toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Certificate Container (Optimized for Screen & Print) */}
      <div 
        id="printable-certificate"
        className="bg-white text-zinc-900 border-4 border-zinc-900 rounded-3xl p-6 md:p-12 shadow-xl relative overflow-hidden text-center space-y-6 max-w-3xl mx-auto"
      >
        {/* Organization Brand Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-zinc-900">
              JV ImpactVR Initiative Ltd/Gte
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 uppercase">
            {t('certificateTitle')}
          </h2>
          <p className="text-xs text-zinc-500 font-medium">
            ImpactLearn Nigeria Vocational & Cyber Safety Initiative
          </p>
        </div>

        {/* Presentation Statement */}
        <div className="space-y-3 py-2">
          <p className="text-xs md:text-sm text-zinc-500 font-medium italic">
            This is proudly awarded to
          </p>

          {!isNameSet ? (
            <div className="max-w-md mx-auto space-y-2 no-print">
              <label htmlFor="student-name-input" className="sr-only">
                {t('recipientNameLabel')}
              </label>
              <input
                id="student-name-input"
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder={t('recipientNamePlaceholder')}
                className="w-full text-center px-4 py-2.5 border border-zinc-300 rounded-xl text-base md:text-lg font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              />
              <button
                type="button"
                disabled={!recipientName.trim()}
                onClick={() => setIsNameSet(true)}
                className="px-5 py-2 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-all"
              >
                Set Name on Certificate
              </button>
            </div>
          ) : (
            <div className="group inline-block">
              <h3 className="text-2xl md:text-4xl font-extrabold text-zinc-900 border-b-2 border-zinc-300 pb-1 px-4 inline-block font-serif tracking-wide">
                {recipientName}
              </h3>
              <button
                type="button"
                onClick={() => setIsNameSet(false)}
                className="text-[10px] text-zinc-400 hover:text-zinc-600 underline block mt-1 mx-auto no-print"
              >
                Edit Name
              </button>
            </div>
          )}

          <p className="text-xs md:text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed pt-2">
            for successfully completing the 5-module vocational course in <strong className="text-zinc-900 font-bold">{course.title}</strong> with an assessed score of <strong className="text-emerald-700 font-bold">{scorePercentage}%</strong>.
          </p>
        </div>

        {/* Signatures & Seal */}
        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-200 max-w-lg mx-auto items-end">
          <div className="space-y-1 text-center">
            <div className="font-serif italic font-bold text-zinc-900 text-sm md:text-base">
              Sylvester Oga Ogaji
            </div>
            <div className="w-32 h-0.5 bg-zinc-300 mx-auto" />
            <p className="text-[10px] md:text-xs font-semibold text-zinc-700 uppercase">
              Founder & Lead Innovator
            </p>
            <p className="text-[9px] text-zinc-400">JV ImpactVR Initiative Ltd/Gte</p>
          </div>

          <div className="space-y-1 text-center">
            <div className="font-medium text-zinc-800 text-xs md:text-sm">
              {completionDate}
            </div>
            <div className="w-32 h-0.5 bg-zinc-300 mx-auto" />
            <p className="text-[10px] md:text-xs font-semibold text-zinc-700 uppercase">
              Date Issued
            </p>
            <p className="text-[9px] text-zinc-400">Federal Republic of Nigeria</p>
          </div>
        </div>

        {/* Verification Footer */}
        <div className="text-[10px] text-zinc-400 pt-2">
          Certificate ID: IMP-NG-{Math.floor(100000 + Math.random() * 900000)} &bull; Verified by ImpactLearn Multilingual Skills Platform
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 no-print">
        <button
          type="button"
          onClick={handlePrint}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-semibold text-xs md:text-sm shadow-sm transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>{t('downloadCertificate')}</span>
        </button>

        <button
          type="button"
          onClick={onRestartCourse}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-xl font-semibold text-xs md:text-sm hover:bg-zinc-50 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t('restartCourse')}</span>
        </button>
      </div>

      {/* Digital Safety Checklist to Keep */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8 dark:border-zinc-800 dark:bg-zinc-900 space-y-4 no-print shadow-sm">
        <h4 className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{t('safetyChecklistTitle')}</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-zinc-700 dark:text-zinc-300">
          <div className="flex items-start gap-2 bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>Never share your 4-digit banking PIN or 6-digit WhatsApp registration code with anyone.</span>
          </div>
          <div className="flex items-start gap-2 bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>Do not click unsolicited links in SMS or forwarded WhatsApp messages claiming free grants.</span>
          </div>
          <div className="flex items-start gap-2 bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>Shield your keypad at POS kiosks and never shout your PIN to agents or bystanders.</span>
          </div>
          <div className="flex items-start gap-2 bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>Know your bank emergency USSD block code (*919*9#, *737*911#, *966*911#) in case your phone is stolen.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
